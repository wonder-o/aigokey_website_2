import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const catalogPath = fileURLToPath(new URL('../src/data/skills.json', import.meta.url))
const catalog = JSON.parse(await readFile(catalogPath, 'utf8'))
const minimumCatalogSize = 100
const token = process.env.GITHUB_TOKEN
const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'AIGOKEY-Skills-Indexer',
  'X-GitHub-Api-Version': '2022-11-28',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
}

const repositories = [...new Set(catalog.skills.map((skill) => skill.repo))]
const metrics = new Map()
const repositoryFiles = new Map()

for (const repo of repositories) {
  const response = await fetch(`https://api.github.com/repos/${repo}`, { headers })
  if (!response.ok) {
    throw new Error(`GitHub request failed for ${repo}: ${response.status} ${response.statusText}`)
  }
  const data = await response.json()
  metrics.set(repo, {
    stars: data.stargazers_count,
    forks: data.forks_count,
    openIssues: data.open_issues_count,
    license: data.license?.spdx_id || 'NOASSERTION',
    repoUpdatedAt: data.updated_at,
    branch: data.default_branch,
  })

  const treeResponse = await fetch(`https://api.github.com/repos/${repo}/git/trees/${data.default_branch}?recursive=1`, { headers })
  if (!treeResponse.ok) {
    throw new Error(`GitHub tree request failed for ${repo}: ${treeResponse.status} ${treeResponse.statusText}`)
  }
  const tree = await treeResponse.json()
  if (tree.truncated) throw new Error(`GitHub tree response was truncated for ${repo}`)
  repositoryFiles.set(repo, new Set(tree.tree.map((entry) => entry.path)))
}

for (const skill of catalog.skills) {
  const repo = metrics.get(skill.repo)
  if (!repo) continue
  Object.assign(skill, repo)
  const files = repositoryFiles.get(skill.repo)
  skill.available = Boolean(files?.has(`${skill.path}/SKILL.md`))

  const community = Math.min(10, 5.8 + Math.log10(Math.max(1, repo.stars)) * 0.72)
  const dimensionValues = Object.values(skill.dimensions)
  const editorial = dimensionValues.reduce((sum, value) => sum + value, 0) / dimensionValues.length
  skill.rating = Number((editorial * 0.82 + community * 0.18).toFixed(1))
}

catalog.lastSyncedAt = new Date().toISOString()
catalog.skills.sort((a, b) => b.rating - a.rating || b.stars - a.stars)

const invalid = catalog.skills.filter((skill) => (
  !skill.id || !skill.description?.zh || !skill.description?.en || !skill.category || !skill.professions?.length ||
  !skill.repo || !skill.path || !skill.difficulty || !skill.maturity || !skill.risk || !skill.platforms?.length ||
  !skill.permissions?.length || !skill.taskTypes?.length || !skill.prerequisites?.zh || !skill.outputs?.zh ||
  Object.keys(skill.dimensions || {}).length < 6
))
if (invalid.length) throw new Error(`Catalog validation failed for: ${invalid.map((skill) => skill.id || 'unknown').join(', ')}`)

const duplicateIds = catalog.skills.filter((skill, index, skills) => skills.findIndex((candidate) => candidate.id === skill.id) !== index)
const duplicatePaths = catalog.skills.filter((skill, index, skills) => skills.findIndex((candidate) => candidate.repo === skill.repo && candidate.path === skill.path) !== index)
if (duplicateIds.length) throw new Error(`Duplicate skill ids: ${duplicateIds.map((skill) => skill.id).join(', ')}`)
if (duplicatePaths.length) throw new Error(`Duplicate GitHub skill paths: ${duplicatePaths.map((skill) => `${skill.repo}/${skill.path}`).join(', ')}`)
if (catalog.skills.length < minimumCatalogSize) throw new Error(`Catalog must contain at least ${minimumCatalogSize} skills; found ${catalog.skills.length}`)

await writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`)

const available = catalog.skills.filter((skill) => skill.available).length
console.log(`Updated ${catalog.skills.length} skills from ${repositories.length} GitHub repositories; ${available} install paths verified.`)
