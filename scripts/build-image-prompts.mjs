import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'
import { createHash } from 'node:crypto'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import sharp from 'sharp'

const exec = promisify(execFile)
const SOURCE_REPO = 'https://github.com/erickkkyt/awesome-gptimage2-prompts'
const LICENSE_URL = 'https://creativecommons.org/publicdomain/zero/1.0/'
const root = process.cwd()
const cacheDir = path.join(os.tmpdir(), 'awesome-gptimage2-prompts')
const outputDir = path.join(root, 'public', 'assets', 'image-prompts')
const outputData = path.join(root, 'src', 'data', 'image-prompts.json')

const categories = [
  { id: 'photography', target: 34, label: '摄影与人像', color: '#ff6746', pattern: /photograph|portrait|selfie|35mm|cinematic studio|editorial fashion/i, roles: ['商业摄影师', '时尚编辑', '个人 IP 主理人'] },
  { id: 'product', target: 38, label: '电商与产品', color: '#167fbe', pattern: /product|packaging|e-commerce|ecommerce|bottle|perfume|cosmetic|headphone|watch|sneaker/i, roles: ['电商运营', '产品摄影师', '包装设计师'] },
  { id: 'poster', target: 34, label: '海报与品牌', color: '#e24765', pattern: /poster|typograph|flyer|campaign|billboard|cover art|brand identity/i, roles: ['视觉设计师', '品牌设计师', '广告创意'] },
  { id: 'infographic', target: 34, label: '信息图与知识', color: '#2d6cdf', pattern: /infographic|diagram|explainer|chart|blueprint|educational|encyclopedia|cutaway/i, roles: ['课程设计师', '数据分析师', '产品经理'] },
  { id: 'social', target: 29, label: '社交媒体', color: '#00a68c', pattern: /social media|instagram|youtube|thumbnail|feed|mobile app|app screen|ui mockup|screenshot/i, roles: ['新媒体运营', '视频博主', '内容策划'] },
  { id: 'illustration', target: 26, label: '插画与艺术', color: '#f2b705', pattern: /illustration|watercolor|vector art|paper cut|picture book|line art|ink painting/i, roles: ['插画师', '出版编辑', '内容设计师'] },
  { id: 'character', target: 14, label: '角色设计', color: '#5662c7', pattern: /character sheet|character design|reference sheet|expression grid|turnaround|turn around/i, roles: ['角色设计师', '游戏美术', '动画师'] },
  { id: 'storyboard', target: 31, label: '漫画与分镜', color: '#b35bd6', pattern: /storyboard|comic|manga|panel story|comic strip|story illustration/i, roles: ['分镜师', '影视导演', '漫画师'] },
  { id: 'game', target: 29, label: '游戏与像素', color: '#667052', pattern: /\bgame\b|pixel art|sprite|\brpg\b|isometric|gameplay|game ui|game asset/i, roles: ['游戏美术', '独立游戏开发者', '技术美术'] },
  { id: 'space', target: 31, label: '建筑与空间', color: '#9a693f', pattern: /architect|interior|building|floor plan|cityscape|landscape design|storefront|exterior|pavilion|apartment|living room/i, roles: ['建筑设计师', '室内设计师', '空间策划师'] },
]

const blocked = /\b(child|young girl|schoolgirl|minor|nude|naked|lingerie|bikini|erotic|cleavage|breast|celebrity|donald trump|elon musk|sam altman|biden|obama|taylor swift|zendaya|ghibli|pixar|disney|minecraft|gta|ikea|apple park)\b/i

const themeRules = [
  [/night|neon|cyberpunk/i, '霓虹夜景'], [/food|coffee|drink|beverage/i, '美食饮品'],
  [/fashion|outfit|clothing|editorial/i, '时尚编辑'], [/beauty|cosmetic|skincare|perfume/i, '美妆护肤'],
  [/tech|phone|computer|ai |technology/i, '科技产品'], [/travel|city|street|map/i, '城市旅行'],
  [/nature|forest|flower|garden|landscape/i, '自然生态'], [/retro|vintage|film|35mm/i, '复古胶片'],
  [/minimal|clean/i, '极简风格'], [/luxury|premium/i, '高端商业'],
  [/anime|manga/i, '动漫视觉'], [/chinese|ink|oriental/i, '东方美学'],
]

const categoryTitles = {
  photography: '摄影创作', product: '产品主图', poster: '品牌海报', infographic: '知识信息图', social: '社媒视觉',
  illustration: '艺术插画', character: '角色设定', storyboard: '分镜叙事', game: '游戏素材', space: '空间概念',
}

async function ensureSource() {
  try {
    await fs.access(path.join(cacheDir, 'prompts', 'prompts.json'))
    return
  } catch { /* clone below */ }
  await exec('git', ['clone', '--depth', '1', `${SOURCE_REPO}.git`, cacheDir], { maxBuffer: 10 * 1024 * 1024 })
}

function classify(entry) {
  const text = `${entry.prompt} ${entry.image}`
  const priority = ['character', 'storyboard', 'game', 'infographic', 'product', 'social', 'space', 'poster', 'illustration', 'photography']
  return priority.map((id) => categories.find((category) => category.id === id)).find((category) => category.pattern.test(text))
}

function themeFor(text) {
  return themeRules.find(([pattern]) => pattern.test(text))?.[1] || '商业创意'
}

function styleFor(text) {
  if (/3d|render|isometric/i.test(text)) return '3D 渲染'
  if (/infographic|diagram|chart|blueprint/i.test(text)) return '信息设计'
  if (/anime|manga|comic/i.test(text)) return '动漫插画'
  if (/watercolor|ink painting|oil paint|hand.drawn/i.test(text)) return '艺术插画'
  if (/ui|interface|app screen/i.test(text)) return 'UI 样机'
  if (/poster|typograph|flyer|cover art/i.test(text)) return '平面设计'
  if (/film|35mm|vintage|retro/i.test(text)) return '复古胶片'
  return '写实摄影'
}

function ratioFor(width, height) {
  const ratio = width / height
  if (ratio > 1.55) return '16:9'
  if (ratio > 1.15) return '4:3'
  if (ratio < 0.72) return '9:16'
  if (ratio < 0.9) return '3:4'
  return '1:1'
}

async function selectEntries(entries) {
  const buckets = new Map(categories.map((category) => [category.id, []]))
  const seenPrompts = new Set()
  const seenImages = new Set()
  for (const entry of entries) {
    if (!entry.prompt || !entry.image || entry.model !== 'gpt-image-2' || entry.source_url === 'local-user-reference' || blocked.test(entry.prompt)) continue
    const normalizedPrompt = entry.prompt.trim()
    if (seenPrompts.has(normalizedPrompt)) continue
    const category = classify(entry)
    if (!category) continue
    const assetPath = path.join(cacheDir, entry.image)
    const imageHash = createHash('sha256').update(await fs.readFile(assetPath)).digest('hex')
    if (seenImages.has(imageHash)) continue
    seenPrompts.add(normalizedPrompt)
    seenImages.add(imageHash)
    buckets.get(category.id).push({ ...entry, category, assetPath })
  }
  const counts = Object.fromEntries([...buckets].map(([id, values]) => [id, values.length]))
  for (const category of categories) {
    if (buckets.get(category.id).length < category.target) throw new Error(`Not enough ${category.id} entries: ${JSON.stringify(counts)}`)
  }
  const selectedByCategory = categories.map((category) => buckets.get(category.id).slice(0, category.target))
  const maxTarget = Math.max(...categories.map((category) => category.target))
  return Array.from({ length: maxTarget }, (_, index) => selectedByCategory.map((items) => items[index]).filter(Boolean)).flat()
}

async function main() {
  let cachedTranslations = new Map()
  try {
    const existingCatalog = JSON.parse(await fs.readFile(outputData, 'utf8'))
    cachedTranslations = new Map(existingCatalog.prompts.map((prompt) => [prompt.prompt, {
      promptEn: prompt.promptEn,
      promptZh: prompt.promptZh,
    }]))
  } catch { /* The first build has no translation cache. */ }

  await ensureSource()
  const entries = JSON.parse(await fs.readFile(path.join(cacheDir, 'prompts', 'prompts.json'), 'utf8'))
  const selected = await selectEntries(entries)
  await fs.rm(outputDir, { recursive: true, force: true })
  await fs.mkdir(outputDir, { recursive: true })

  const prompts = []
  const categoryNumbers = {}
  for (let index = 0; index < selected.length; index += 1) {
    const entry = selected[index]
    const number = String(index + 1).padStart(3, '0')
    const filename = `${number}.webp`
    const text = `${entry.prompt} ${entry.image}`
    const theme = themeFor(text)
    const style = styleFor(text)
    const profession = entry.category.roles[index % entry.category.roles.length]
    categoryNumbers[entry.category.id] = (categoryNumbers[entry.category.id] || 0) + 1
    await sharp(entry.assetPath)
      .rotate()
      .resize({ width: 960, height: 960, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 78, effort: 4 })
      .toFile(path.join(outputDir, filename))

    const originalPrompt = entry.prompt.trim()
    const cached = cachedTranslations.get(originalPrompt)
    prompts.push({
      id: `prompt-${number}`,
      number,
      title: `${theme}${categoryTitles[entry.category.id]} ${String(categoryNumbers[entry.category.id]).padStart(2, '0')}`,
      description: `适合${profession}制作${entry.category.label}素材，重点控制${style}、构图和信息层级。`,
      prompt: originalPrompt,
      ...(cached?.promptEn && cached?.promptZh ? cached : {}),
      image: `/assets/image-prompts/${filename}`,
      category: entry.category.id,
      categoryLabel: entry.category.label,
      color: entry.category.color,
      profession,
      ratio: ratioFor(entry.image_width, entry.image_height),
      style,
      tags: [theme, style, profession],
      language: entry.languages?.[0]?.toUpperCase() || 'EN',
      author: entry.author_name || entry.author || '社区创作者',
      authorUrl: entry.author ? `https://x.com/${entry.author}` : SOURCE_REPO,
      sourceUrl: entry.source_url || SOURCE_REPO,
      source: entry.source || 'Community',
      date: entry.date || '',
    })
  }

  const catalog = {
    source: {
      name: 'erickkkyt / awesome-gptimage2-prompts',
      url: SOURCE_REPO,
      license: 'CC0 1.0',
      licenseUrl: LICENSE_URL,
      note: `从公开社区案例中筛选 ${prompts.length} 例，新增中文分类、职业标签与检索元数据；保留原作者和帖子链接。`,
      updatedAt: new Date().toISOString().slice(0, 10),
    },
    prompts,
  }
  await fs.writeFile(outputData, `${JSON.stringify(catalog, null, 2)}\n`, 'utf8')
  console.log(`Wrote ${prompts.length} prompts across ${categories.length} categories.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
