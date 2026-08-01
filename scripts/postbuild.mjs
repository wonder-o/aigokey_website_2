import sharp from 'sharp'
import { readdirSync, mkdirSync, renameSync, statSync, readFileSync, writeFileSync, unlinkSync } from 'fs'
import { join, basename, relative, resolve } from 'path'

const distDir = resolve('dist')
const distAssets = join(distDir, 'assets')

// Files to keep as PNG (icons, favicons, unhashed logo for favicon ref)
const keepPng = new Set(['favicon-64x64.png', 'apple-touch-icon.png', 'aigokey-logo.png'])

async function convertToWebp() {
  if (!statSync(distAssets, { throwIfNoEntry: false })) return

  const pngFiles = readdirSync(distAssets).filter(f => f.endsWith('.png') && !keepPng.has(f) && !f.startsWith('favicon'))
  const converted = []

  for (const file of pngFiles) {
    const pngPath = join(distAssets, file)
    const webpPath = pngPath.replace(/\.png$/, '.webp')
    const originalSize = readFileSync(pngPath).length

    try {
      const buf = await sharp(pngPath).webp({ quality: 80 }).toBuffer()
      writeFileSync(webpPath, buf)
      converted.push(pngPath)
      const savings = ((1 - buf.length / originalSize) * 100).toFixed(0)
      console.log(`  ${basename(file).padEnd(40)} ${(originalSize / 1024).toFixed(0).padEnd(5)}KB → ${(buf.length / 1024).toFixed(0).padStart(5)}KB  (-${savings}%)`)
    } catch (e) {
      console.log(`  ${basename(file)} error: ${e.message}`)
    }
  }

  // Step 1: Replace all .png → .webp in HTML/JS/CSS
  function replaceInDir(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name)
      if (entry.isDirectory()) replaceInDir(full)
      else if (entry.name.endsWith('.html') || entry.name.endsWith('.js') || entry.name.endsWith('.css')) {
        let content = readFileSync(full, 'utf-8')
        // Replace all .png → .webp
        content = content.replace(/\.png/g, '.webp')
        // Step 2: Restore exact favicon/icon/logo references back to .png
        content = content.replace(/\/assets\/aigokey-logo\.webp/g, '/assets/aigokey-logo.png')
        content = content.replace(/\/assets\/apple-touch-icon\.webp/g, '/assets/apple-touch-icon.png')
        content = content.replace(
          /href="\/assets\/favicon[^"]*\.webp"/g,
          (match) => match.replace('.webp', '.png')
        )
        writeFileSync(full, content)
      }
    }
  }
  replaceInDir(distDir)

  // Delete converted PNGs
  for (const pngPath of converted) {
    unlinkSync(pngPath)
  }
  console.log(`\nRemoved ${converted.length} original PNG files`)
}

function moveHtmlToDirs(dir = distDir) {
  const entries = readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    if (entry.isDirectory()) moveHtmlToDirs(join(dir, entry.name))
  }

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.html')) continue
    const name = basename(entry.name, '.html')
    if (name === 'index' || name === '404') continue

    const source = join(dir, entry.name)
    const targetDir = join(dir, name)
    const target = join(targetDir, 'index.html')
    mkdirSync(targetDir, { recursive: true })
    renameSync(source, target)
    console.log(`  ${relative(distDir, source)} → ${relative(distDir, target)}`)
  }
}

function collectIndexFiles(dir = distDir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) return collectIndexFiles(full)
    return entry.name === 'index.html' ? [full] : []
  })
}

function htmlAttribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}=["']([^"']+)["']`, 'i'))?.[1] || ''
}

function writeSeoFiles() {
  const urls = []

  for (const file of collectIndexFiles()) {
    const html = readFileSync(file, 'utf-8')
    const robotsTag = (html.match(/<meta\b[^>]*>/gi) || [])
      .find((tag) => htmlAttribute(tag, 'name').toLowerCase() === 'robots')
    if (robotsTag && htmlAttribute(robotsTag, 'content').toLowerCase().includes('noindex')) continue

    const canonicalTag = (html.match(/<link\b[^>]*>/gi) || [])
      .find((tag) => htmlAttribute(tag, 'rel').toLowerCase() === 'canonical')
    const href = canonicalTag ? htmlAttribute(canonicalTag, 'href') : ''
    if (href) urls.push(href)
  }

  const uniqueUrls = [...new Set(urls)].sort()
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...uniqueUrls.map((url) => `  <url><loc>${url.replace(/&/g, '&amp;')}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n')

  writeFileSync(join(distDir, 'sitemap.xml'), sitemap)
  writeFileSync(
    join(distDir, 'robots.txt'),
    'User-agent: *\nAllow: /\n\nSitemap: https://www.aigokey.com/sitemap.xml\n',
  )
  console.log(`  sitemap.xml (${uniqueUrls.length} canonical URLs)`)
  console.log('  robots.txt')
}

async function main() {
  console.log('[1/4] Converting images to WebP...')
  await convertToWebp()

  console.log('\n[2/4] Moving HTML to subdirectories...')
  moveHtmlToDirs()

  console.log('\n[3/4] Writing SEO discovery files...')
  writeSeoFiles()

  // Summary
  const allFiles = readdirSync(distAssets)
  const webpFiles = allFiles.filter(f => f.endsWith('.webp'))
  const pngFiles = allFiles.filter(f => f.endsWith('.png'))
  let webpSize = 0, pngSize = 0
  for (const f of webpFiles) webpSize += statSync(join(distAssets, f)).size
  for (const f of pngFiles) pngSize += statSync(join(distAssets, f)).size
  console.log(`\n[4/4] Final: ${pngFiles.length} PNG (${(pngSize/1024).toFixed(0)}KB) + ${webpFiles.length} WebP (${(webpSize/1024).toFixed(0)}KB) = ${((pngSize+webpSize)/1024).toFixed(0)}KB`)
}

main().catch(console.error)
