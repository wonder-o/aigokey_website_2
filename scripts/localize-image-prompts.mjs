import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { spawn } from 'node:child_process'

const dataPath = path.join(process.cwd(), 'src', 'data', 'image-prompts.json')
const batchConcurrency = 1
const batchCharacterLimit = 45000
const batchItemLimit = 50
const manualChineseOverrides = {
  'prompt-045': '为 4 种孩子讨厌吃的蔬菜分别制作一张 1080x1080 图像：隐形蔬菜妙招 =（用口感伪装技巧把[蔬菜]藏进[舒适食物] x 1.7）+（用酸甜咸平衡法遮盖[蔬菜]味道 x 1.5）+（让[蔬菜]看起来像[舒适食物]的视觉欺骗指南 x 1.4）+（针对[蔬菜]不同烹饪方式的营养保留计算 x 1.2）+（不同摆盘方式对挑食者影响的 A/B 测试结果 x 1.3）+（快速搅拌与精细切碎[蔬菜]的准备时间对比 x 1.1）-（盘中水煮软烂蔬菜 / 4.2）-（强迫进食场景 / 3.9）-（人工食用色素图像 / 3.5）',
  'prompt-049': '2x2 网格，1080x1080，为 4 种日常物品分别制作：物品演变内容 =（[日常物品]从古代到现代的年代等距浮雕，标注专利年份 x 1.7）+（永久改变[日常物品]的材料创新里程碑 x 1.5）+（经典版[日常物品]剖面与机制揭示 x 1.4）+（各时代[日常物品]解决了什么问题的用户需求图 x 1.3）+（基于纳米技术、可持续性和人工智能的[日常物品]未来概念渲染 x 1.1）+（[日常物品]过去与现在制造流程的分屏对比 x 1.2）+（博物馆式排版展示[日常物品]的收藏变体和文化设计图标 x 1.0）+（[日常物品]处置与回收挑战的闭环图 x 0.9）-（缺乏视觉动线的沉闷古董照片 / 3.0）-（适用时忽视[日常物品]的非西方发明史 / 3.4）-（没有人物故事、过度学术化的时间线 / 2.7）',
}
const powershellScript = `
$ErrorActionPreference = 'Stop'
[Console]::InputEncoding = [Text.UTF8Encoding]::new($false)
[Console]::OutputEncoding = [Text.UTF8Encoding]::new($false)
$items = @(([Console]::In.ReadToEnd() | ConvertFrom-Json))
$token = Invoke-RestMethod -Uri 'https://edge.microsoft.com/translate/auth' -TimeoutSec 40
$target = [Uri]::EscapeDataString($env:AIGOKEY_TRANSLATE_TARGET)
$uri = "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=$target"
$body = @($items | ForEach-Object { @{ Text = $_.Text } }) | ConvertTo-Json -Depth 3 -Compress
if ($items.Count -eq 1) { $body = "[$body]" }
$headers = @{ Authorization = "Bearer $token" }
$payload = Invoke-RestMethod -Method Post -Uri $uri -Headers $headers -ContentType 'application/json; charset=utf-8' -Body ([Text.Encoding]::UTF8.GetBytes($body)) -TimeoutSec 60
$output = @{ translations = @($payload | ForEach-Object { $_.translations[0].text }) }
[Console]::Out.Write(($output | ConvertTo-Json -Depth 3 -Compress))
`

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

function isEnglishHeavy(text) {
  const chineseCharacters = text.match(/[\u3400-\u9fff]/g)?.length || 0
  const latinCharacters = text.match(/[A-Za-z]/g)?.length || 0
  return latinCharacters > chineseCharacters * 2
}

function requestTranslations(texts, targetLanguage) {
  return new Promise((resolve, reject) => {
    const child = spawn('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', powershellScript], {
      env: { ...process.env, AIGOKEY_TRANSLATE_TARGET: targetLanguage },
      stdio: ['pipe', 'pipe', 'pipe'],
      windowsHide: true,
    })
    const stdout = []
    const stderr = []
    child.stdout.on('data', (chunk) => stdout.push(chunk))
    child.stderr.on('data', (chunk) => stderr.push(chunk))
    child.on('error', reject)
    child.on('close', (code) => {
      const output = Buffer.concat(stdout).toString('utf8').replace(/^\uFEFF/, '').trim()
      if (code !== 0) {
        reject(new Error(Buffer.concat(stderr).toString('utf8').trim() || `PowerShell exited with code ${code}`))
        return
      }
      try {
        const translations = JSON.parse(output).translations
        if (!Array.isArray(translations) || translations.length !== texts.length) {
          throw new Error(`Expected ${texts.length} translations, received ${translations?.length || 0}`)
        }
        resolve(translations)
      } catch (error) {
        reject(new Error(`Invalid translation response: ${error.message}`))
      }
    })
    child.stdin.end(JSON.stringify(texts.map((text) => ({ Text: text }))), 'utf8')
  })
}

async function translateBatch(texts, targetLanguage) {
  let lastError
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    try {
      return await requestTranslations(texts, targetLanguage)
    } catch (error) {
      lastError = error
      if (attempt < 5) await wait(3000 * 2 ** (attempt - 1))
    }
  }
  throw lastError
}

function createBatches(tasks) {
  const batches = []
  for (const target of [...new Set(tasks.map((task) => task.target))]) {
    let current = []
    let characterCount = 0
    for (const task of tasks.filter((item) => item.target === target)) {
      const sourceText = target === 'zh-Hans' ? task.prompt.prompt.replaceAll('_', ' ') : task.prompt.prompt
      if (current.length && (current.length >= batchItemLimit || characterCount + sourceText.length > batchCharacterLimit)) {
        batches.push({ target, tasks: current })
        current = []
        characterCount = 0
      }
      current.push({ ...task, sourceText })
      characterCount += sourceText.length
    }
    if (current.length) batches.push({ target, tasks: current })
  }
  return batches
}

async function main() {
  const catalog = JSON.parse(await fs.readFile(dataPath, 'utf8'))
  const pending = []

  for (const prompt of catalog.prompts) {
    if (manualChineseOverrides[prompt.id]) prompt.promptZh = manualChineseOverrides[prompt.id]
    if (!prompt.promptEn) {
      if (prompt.language === 'EN') prompt.promptEn = prompt.prompt
      else pending.push({ prompt, field: 'promptEn', target: 'en' })
    }
    if (!prompt.promptZh || (prompt.prompt.includes('_') && isEnglishHeavy(prompt.promptZh))) {
      pending.push({ prompt, field: 'promptZh', target: 'zh-Hans' })
    }
  }

  const batches = createBatches(pending)
  let nextBatch = 0
  let completed = 0
  let flushQueue = Promise.resolve()

  function flush() {
    flushQueue = flushQueue.then(() => fs.writeFile(dataPath, `${JSON.stringify(catalog, null, 2)}\n`, 'utf8'))
    return flushQueue
  }

  async function worker() {
    while (nextBatch < batches.length) {
      const batch = batches[nextBatch]
      nextBatch += 1
      const translations = await translateBatch(batch.tasks.map((task) => task.sourceText), batch.target)
      batch.tasks.forEach((task, index) => { task.prompt[task.field] = translations[index].trim() })
      completed += batch.tasks.length
      console.log(`[${completed}/${pending.length}] ${batch.tasks.length} prompts -> ${batch.target}`)
      await flush()
      await wait(1500)
    }
  }

  await Promise.all(Array.from({ length: Math.min(batchConcurrency, batches.length || 1) }, () => worker()))
  await flush()

  const complete = catalog.prompts.filter((prompt) => prompt.promptEn && prompt.promptZh).length
  if (complete !== catalog.prompts.length) {
    throw new Error(`Only ${complete}/${catalog.prompts.length} prompts have both localized versions`)
  }
  console.log(`Localized ${complete} prompts in English and Simplified Chinese.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
