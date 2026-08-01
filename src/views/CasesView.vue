<template>
  <div class="cases-page">
    <SiteHeader @trial="$router.push('/free-trial/')" />

    <main>
      <section class="case-hero">
        <div class="hero-grid" aria-hidden="true"></div>
        <div class="hero-shell">
          <div class="hero-copy">
            <div class="hero-kicker"><LibraryBig :size="16" /> {{ copy.kicker }}</div>
            <h1>{{ copy.title }}</h1>
            <p>{{ copy.subtitle }}</p>
            <div class="hero-source"><ShieldCheck :size="16" />{{ copy.sourceNote }}</div>
          </div>
          <div class="index-board" aria-label="案例库概览">
            <div class="board-heading">
              <span>{{ copy.indexTitle }}</span>
              <small>{{ catalog.generatedAt }}</small>
            </div>
            <div class="board-stats">
              <div><strong>{{ catalog.cases.length }}</strong><span>{{ copy.cases }}</span></div>
              <div><strong>{{ catalog.categories.length }}</strong><span>{{ copy.categories }}</span></div>
              <div><strong>{{ catalog.professions.length }}</strong><span>{{ copy.professions }}</span></div>
              <div><strong>4</strong><span>{{ copy.evidenceLevels }}</span></div>
            </div>
            <div class="evidence-ruler">
              <button v-for="level in evidenceOrder" :key="level" type="button" :class="`evidence-${level.toLowerCase()}`" @click="setEvidence(level)">
                <b>{{ level }}</b>
                <span>{{ catalog.evidence[level].label }}</span>
                <em>{{ evidenceCounts[level] }}</em>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="library-shell">
        <div class="library-intro">
          <div>
            <span>{{ copy.libraryEyebrow }}</span>
            <h2>{{ copy.libraryTitle }}</h2>
          </div>
          <p>{{ copy.libraryCopy }}</p>
        </div>

        <div class="browse-row">
          <div class="mode-switch" role="tablist" :aria-label="copy.browseBy">
            <button type="button" role="tab" :aria-selected="browseMode === 'category'" :class="{ active: browseMode === 'category' }" @click="setBrowseMode('category')">
              <LayoutGrid :size="17" />{{ copy.byCategory }}
            </button>
            <button type="button" role="tab" :aria-selected="browseMode === 'profession'" :class="{ active: browseMode === 'profession' }" @click="setBrowseMode('profession')">
              <BriefcaseBusiness :size="17" />{{ copy.byProfession }}
            </button>
          </div>
          <div class="method-note"><BadgeInfo :size="16" />{{ copy.methodNote }}</div>
        </div>

        <div class="catalog-layout">
          <aside class="taxonomy-panel" :aria-label="copy.filters">
            <div class="taxonomy-head">
              <span>{{ browseMode === 'category' ? copy.categories : copy.professions }}</span>
              <small>{{ activeTaxonomy.length - 1 }}</small>
            </div>
            <div class="taxonomy-list">
              <button v-for="item in activeTaxonomy" :key="item.id" type="button" :class="{ active: selectedTaxonomy === item.id }" @click="selectedTaxonomy = item.id">
                <span><b>{{ item.label }}</b><small v-if="item.description">{{ item.description }}</small></span>
                <em>{{ item.count }}</em>
              </button>
            </div>
            <div class="evidence-guide">
              <div><Scale :size="17" /><strong>{{ copy.evidenceGuide }}</strong></div>
              <p>{{ copy.evidenceGuideCopy }}</p>
              <button type="button" @click="showMethod = !showMethod">{{ showMethod ? copy.hideGuide : copy.showGuide }}<ChevronDown :size="14" :class="{ rotated: showMethod }" /></button>
              <div v-if="showMethod" class="guide-list">
                <p v-for="level in evidenceOrder" :key="level"><b>{{ level }}</b><span>{{ catalog.evidence[level].description }}</span></p>
              </div>
            </div>
          </aside>

          <div class="results-panel">
            <div class="search-toolbar">
              <label class="search-box">
                <Search :size="19" />
                <input ref="searchInput" v-model="query" type="search" :placeholder="copy.search" />
                <kbd>/</kbd>
              </label>
              <label class="select-control">
                <ShieldCheck :size="16" />
                <select v-model="evidenceFilter" :aria-label="copy.evidenceFilter">
                  <option value="all">{{ copy.allEvidence }}</option>
                  <option v-for="level in evidenceOrder" :key="level" :value="level">{{ level }} · {{ catalog.evidence[level].label }}</option>
                </select>
                <ChevronDown :size="14" />
              </label>
              <label class="select-control source-control">
                <Languages :size="16" />
                <select v-model="languageFilter" :aria-label="copy.languageFilter">
                  <option value="all">{{ copy.allSources }}</option>
                  <option value="中文">{{ copy.chineseSources }}</option>
                  <option value="英文译述">{{ copy.englishSources }}</option>
                </select>
                <ChevronDown :size="14" />
              </label>
            </div>

            <div class="results-heading">
              <div>
                <span>{{ currentTaxonomyLabel }}</span>
                <h2>{{ filteredCases.length }} {{ copy.results }}</h2>
              </div>
              <button v-if="hasFilters" type="button" @click="clearFilters"><RotateCcw :size="15" />{{ copy.clear }}</button>
            </div>

            <div v-if="filteredCases.length" class="case-list">
              <article v-for="item in filteredCases" :key="item.id" class="case-card">
                <div class="case-index">
                  <span>{{ item.id }}</span>
                  <i></i>
                </div>
                <div class="case-content">
                  <div class="case-meta">
                    <span>{{ categoryLabel(item.category) }}</span>
                    <span :class="`evidence-chip evidence-${item.evidence.toLowerCase()}`" :title="catalog.evidence[item.evidence].description">{{ item.evidence }} · {{ catalog.evidence[item.evidence].label }}</span>
                  </div>
                  <h3>{{ item.title }}</h3>
                  <div class="role-line"><Building2 :size="14" />{{ item.industry }}<i></i><UserRound :size="14" />{{ item.roles }}</div>
                  <dl class="case-abstract">
                    <div><dt>{{ copy.problem }}</dt><dd>{{ item.problem }}</dd></div>
                    <div><dt>{{ copy.workflow }}</dt><dd>{{ item.workflow }}</dd></div>
                    <div><dt>{{ copy.outcome }}</dt><dd>{{ item.outcome }}</dd></div>
                  </dl>
                  <div class="case-footer">
                    <span><Languages :size="14" />{{ item.sourceLanguage }}</span>
                    <span><BookOpenText :size="14" />{{ item.source.title }}</span>
                    <button type="button" @click="openDetail(item)">{{ copy.readCase }}<ArrowRight :size="15" /></button>
                  </div>
                </div>
              </article>
            </div>

            <div v-else class="empty-state">
              <SearchX :size="30" />
              <h3>{{ copy.emptyTitle }}</h3>
              <p>{{ copy.emptyCopy }}</p>
              <button type="button" @click="clearFilters">{{ copy.clear }}</button>
            </div>
          </div>
        </div>
      </section>
    </main>

    <SiteFooter />

    <Teleport to="body">
      <div v-if="selectedCase" class="drawer-layer" @click.self="closeDetail">
        <aside ref="drawerRef" class="case-drawer" role="dialog" aria-modal="true" tabindex="-1" :aria-labelledby="`case-${selectedCase.id}`">
          <header class="drawer-header">
            <div><span>{{ copy.caseFile }} {{ selectedCase.id }}</span><b>{{ categoryLabel(selectedCase.category) }}</b></div>
            <button type="button" :aria-label="copy.close" :title="copy.close" @click="closeDetail"><X :size="20" /></button>
          </header>

          <div class="drawer-body">
            <section class="drawer-title">
              <div class="case-meta">
                <span>{{ selectedCase.industry }}</span>
                <span :class="`evidence-chip evidence-${selectedCase.evidence.toLowerCase()}`">{{ selectedCase.evidence }} · {{ catalog.evidence[selectedCase.evidence].label }}</span>
              </div>
              <h2 :id="`case-${selectedCase.id}`">{{ selectedCase.title }}</h2>
              <p><UserRound :size="15" />{{ selectedCase.roles }}</p>
            </section>

            <section class="evidence-callout">
              <Scale :size="20" />
              <div><strong>{{ copy.evidenceBasis }}</strong><p>{{ catalog.evidence[selectedCase.evidence].description }}</p></div>
            </section>

            <section class="workflow-file">
              <div class="file-section">
                <div class="file-label"><span>01</span><Target :size="17" />{{ copy.problem }}</div>
                <p>{{ selectedCase.problem }}</p>
              </div>
              <div class="file-section">
                <div class="file-label"><span>02</span><Workflow :size="17" />{{ copy.workflow }}</div>
                <p>{{ selectedCase.workflow }}</p>
              </div>
              <div class="file-section">
                <div class="file-label"><span>03</span><ListChecks :size="17" />{{ copy.outcomeAndBoundary }}</div>
                <p>{{ selectedCase.outcome }}</p>
              </div>
            </section>

            <section class="replicate-section">
              <div class="section-title"><div><span>{{ copy.replicateEyebrow }}</span><h3>{{ copy.replicateTitle }}</h3></div><CopyCheck :size="22" /></div>
              <p>{{ copy.replicateCopy }}</p>
              <div class="prompt-box">
                <pre>{{ taskTemplate(selectedCase) }}</pre>
                <button type="button" :title="copy.copyTemplate" :aria-label="copy.copyTemplate" @click="copyTemplate(selectedCase)">
                  <Check v-if="copied" :size="17" /><Copy v-else :size="17" />
                  {{ copied ? copy.copied : copy.copyTemplate }}
                </button>
              </div>
            </section>

            <section class="source-section">
              <div><BookOpenText :size="18" /><span><small>{{ copy.originalSource }}</small><strong>{{ selectedCase.source.title }}</strong></span></div>
              <p v-if="selectedCase.source.note">{{ selectedCase.source.note }}</p>
              <a v-if="selectedCase.source.url" :href="selectedCase.source.url" target="_blank" rel="noreferrer">{{ copy.openSource }}<ArrowUpRight :size="15" /></a>
            </section>
          </div>
        </aside>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useHead } from '@unhead/vue'
import {
  ArrowRight,
  ArrowUpRight,
  BadgeInfo,
  BookOpenText,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronDown,
  Copy,
  CopyCheck,
  Languages,
  LayoutGrid,
  LibraryBig,
  ListChecks,
  RotateCcw,
  Scale,
  Search,
  SearchX,
  ShieldCheck,
  Target,
  UserRound,
  Workflow,
  X,
} from '@lucide/vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import { useI18n } from '@/composables/useI18n'
import rawCatalog from '@/data/codex-cases.json'
import type { CaseTaxonomyItem, CasesCatalog, CodexCase, EvidenceLevel } from '@/types/cases'

type BrowseMode = 'category' | 'profession'
type FilterItem = CaseTaxonomyItem & { count: number }

const catalog = rawCatalog as CasesCatalog
const evidenceOrder: EvidenceLevel[] = ['A1', 'A2', 'B', 'C']
const { lang } = useI18n()
const browseMode = ref<BrowseMode>('category')
const selectedTaxonomy = ref('all')
const evidenceFilter = ref<'all' | EvidenceLevel>('all')
const languageFilter = ref('all')
const query = ref('')
const selectedCase = ref<CodexCase | null>(null)
const copied = ref(false)
const showMethod = ref(false)
const searchInput = ref<HTMLInputElement | null>(null)
const drawerRef = ref<HTMLElement | null>(null)

const zhCopy = {
  kicker: 'Codex 实际工作档案', title: '100 个案例，找到你的 Codex 工作流', subtitle: '按行业场景和职业角色浏览真实案例。每条案例都保留问题、执行链路、验收方式、结果边界与原始出处，帮助你从“能做什么”走到“该怎么做”。',
  sourceNote: '基于一手组织资料、官方可复现实操与明确标注的流程模板整理，不把宣传表述改写成未经证实的结论。', indexTitle: '案例索引 / CASE INDEX', cases: '个案例', categories: '个类别', professions: '类职业', evidenceLevels: '级证据',
  libraryEyebrow: '浏览案例库', libraryTitle: '从相似工作出发，而不是从功能清单出发', libraryCopy: '先选你的工作领域或职业，再看相近团队如何准备上下文、连接工具、执行任务和验证结果。', browseBy: '浏览方式', byCategory: '按类别', byProfession: '按职业', methodNote: '案例结果只在原始环境中成立，复刻时请重新验证', filters: '案例筛选',
  evidenceGuide: '如何理解证据等级', evidenceGuideCopy: '等级描述信息来源和可复现程度，不是对案例价值的打分。', showGuide: '查看分级说明', hideGuide: '收起分级说明',
  search: '搜索场景、岗位、问题、工作流或组织', evidenceFilter: '证据等级', allEvidence: '全部证据等级', languageFilter: '来源语种', allSources: '全部来源语种', chineseSources: '中文实操与模板', englishSources: '英文一手资料译述', results: '个匹配案例', clear: '清除筛选',
  problem: '要解决的问题', workflow: 'Codex 工作流', outcome: '结果与边界', outcomeAndBoundary: '验收、结果与边界', readCase: '查看完整档案', emptyTitle: '没有找到匹配案例', emptyCopy: '尝试更短的关键词，或清除当前类别与证据筛选。',
  caseFile: '案例档案', close: '关闭案例', evidenceBasis: '这条案例的证据基础', replicateEyebrow: '迁移到你的工作', replicateTitle: '可直接改写的任务骨架', replicateCopy: '下面的文本由本案例原始信息重组。请替换为你的真实数据、工具权限和验收标准后再交给 Codex。', copyTemplate: '复制任务骨架', copied: '已复制', originalSource: '原始来源', openSource: '打开原始资料',
}

const enCopy = {
  kicker: 'Codex work files', title: '100 cases. Find your Codex workflow.', subtitle: 'Browse real cases by work domain or role. Every file keeps the problem, execution chain, validation, boundaries, and original source intact.', sourceNote: 'Compiled from first-party reports and reproducible walkthroughs without inflating reported outcomes.', indexTitle: 'CASE INDEX', cases: 'cases', categories: 'categories', professions: 'role groups', evidenceLevels: 'evidence levels',
  libraryEyebrow: 'Case library', libraryTitle: 'Start from comparable work, not a feature list', libraryCopy: 'Choose a domain or role, then inspect how similar teams prepared context, connected tools, executed tasks, and verified results.', browseBy: 'Browse by', byCategory: 'Category', byProfession: 'Profession', methodNote: 'Reported outcomes apply to their original environments and require fresh validation', filters: 'Filters',
  evidenceGuide: 'Understanding evidence', evidenceGuideCopy: 'Levels describe provenance and reproducibility, not the value of a case.', showGuide: 'Show definitions', hideGuide: 'Hide definitions',
  search: 'Search scenarios, roles, problems, workflows, or organizations', evidenceFilter: 'Evidence level', allEvidence: 'All evidence', languageFilter: 'Source language', allSources: 'All source languages', chineseSources: 'Chinese walkthroughs', englishSources: 'Translated first-party reports', results: 'matching cases', clear: 'Clear filters',
  problem: 'Problem', workflow: 'Codex workflow', outcome: 'Outcome and boundary', outcomeAndBoundary: 'Validation, outcome, and boundary', readCase: 'Open full case', emptyTitle: 'No matching cases', emptyCopy: 'Try a shorter query or clear the current filters.', caseFile: 'CASE FILE', close: 'Close case', evidenceBasis: 'Evidence basis', replicateEyebrow: 'Adapt it to your work', replicateTitle: 'Editable task brief', replicateCopy: 'This brief only reorganizes the source case. Replace it with your own data, permissions, and acceptance criteria before using it with Codex.', copyTemplate: 'Copy task brief', copied: 'Copied', originalSource: 'Original source', openSource: 'Open source',
}

const copy = computed(() => lang.value === 'en' ? enCopy : zhCopy)

const categoryItems = computed<FilterItem[]>(() => [
  { id: 'all', label: lang.value === 'en' ? 'All categories' : '全部类别', description: lang.value === 'en' ? `Browse all ${catalog.cases.length} documented workflows` : `浏览全部 ${catalog.cases.length} 条工作流`, count: catalog.cases.length },
  ...catalog.categories.map((item) => ({ ...item, count: catalog.cases.filter((entry) => entry.category === item.id).length })),
])

const professionItems = computed<FilterItem[]>(() => [
  { id: 'all', label: lang.value === 'en' ? 'All professions' : '全部职业', description: lang.value === 'en' ? 'Cases may appear in more than one role' : '同一案例可对应多个职业角色', count: catalog.cases.length },
  ...catalog.professions.map((item) => ({ ...item, count: catalog.cases.filter((entry) => entry.professions.includes(item.id)).length })),
])

const activeTaxonomy = computed(() => browseMode.value === 'category' ? categoryItems.value : professionItems.value)
const currentTaxonomyLabel = computed(() => activeTaxonomy.value.find((item) => item.id === selectedTaxonomy.value)?.label || activeTaxonomy.value[0].label)
const evidenceCounts = computed(() => Object.fromEntries(evidenceOrder.map((level) => [level, catalog.cases.filter((item) => item.evidence === level).length])) as Record<EvidenceLevel, number>)
const hasFilters = computed(() => selectedTaxonomy.value !== 'all' || evidenceFilter.value !== 'all' || languageFilter.value !== 'all' || query.value.trim().length > 0)

const filteredCases = computed(() => {
  const needle = query.value.trim().toLocaleLowerCase()
  return catalog.cases.filter((item) => {
    const taxonomyMatch = selectedTaxonomy.value === 'all' || (browseMode.value === 'category' ? item.category === selectedTaxonomy.value : item.professions.includes(selectedTaxonomy.value))
    const evidenceMatch = evidenceFilter.value === 'all' || item.evidence === evidenceFilter.value
    const languageMatch = languageFilter.value === 'all' || item.sourceLanguage === languageFilter.value
    const searchable = [item.title, item.industry, item.roles, item.problem, item.workflow, item.outcome, item.source.title].join(' ').toLocaleLowerCase()
    return taxonomyMatch && evidenceMatch && languageMatch && (!needle || searchable.includes(needle))
  }).sort((a, b) => Number(a.id) - Number(b.id))
})

function categoryLabel(id: string) {
  return catalog.categories.find((item) => item.id === id)?.label || id
}

function setBrowseMode(mode: BrowseMode) {
  browseMode.value = mode
  selectedTaxonomy.value = 'all'
}

function setEvidence(level: EvidenceLevel) {
  evidenceFilter.value = evidenceFilter.value === level ? 'all' : level
  document.querySelector('.library-shell')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function clearFilters() {
  selectedTaxonomy.value = 'all'
  evidenceFilter.value = 'all'
  languageFilter.value = 'all'
  query.value = ''
}

function openDetail(item: CodexCase) {
  selectedCase.value = item
  copied.value = false
  document.body.style.overflow = 'hidden'
  nextTick(() => drawerRef.value?.focus())
}

function closeDetail() {
  selectedCase.value = null
  copied.value = false
  document.body.style.overflow = ''
}

function taskTemplate(item: CodexCase) {
  return `目标：${item.title}\n\n业务背景：\n${item.problem}\n\n执行要求：\n${item.workflow}\n\n验收标准与边界：\n${item.outcome}\n\n请先检查当前可用的文件、数据、工具与权限，列出缺失信息和执行计划；未经确认不要扩大权限或跳过专业人员复核。`
}

async function copyTemplate(item: CodexCase) {
  await navigator.clipboard.writeText(taskTemplate(item))
  copied.value = true
  window.setTimeout(() => { copied.value = false }, 1800)
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && selectedCase.value) closeDetail()
  if (event.key === '/' && !selectedCase.value && !(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement)) {
    event.preventDefault()
    searchInput.value?.focus()
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

useHead({
  title: 'Codex 案例库｜100 个跨行业实战案例 - AigoKey',
  meta: [
    { name: 'description', content: '浏览 100 个 Codex 跨行业、跨岗位使用案例，按类别和职业筛选，查看问题、工作流、结果边界、证据等级与原始来源。' },
    { property: 'og:title', content: 'Codex 案例库｜100 个跨行业实战案例' },
    { property: 'og:description', content: '从真实工作出发，找到可以参考和迁移的 Codex 工作流。' },
  ],
})
</script>

<style scoped>
.cases-page { min-height: 100vh; color: #142231; background: #f7fafc; }
.case-hero { position: relative; overflow: hidden; border-bottom: 1px solid #d9e4ec; color: #f7fbff; background: #13283a; }
.hero-grid { position: absolute; inset: 0; opacity: .22; background-image: linear-gradient(rgba(119,190,242,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(119,190,242,.18) 1px, transparent 1px); background-size: 44px 44px; mask-image: linear-gradient(90deg, #000, #000 70%, transparent); }
.hero-shell { position: relative; width: min(1180px, calc(100% - 48px)); min-height: 410px; margin: 0 auto; padding: 68px 0 56px; display: grid; grid-template-columns: minmax(0, .92fr) minmax(520px, 1.08fr); align-items: center; gap: 62px; }
.hero-copy { max-width: 570px; }.hero-kicker { display: flex; align-items: center; gap: 9px; color: #91d8ff; font-size: 13px; font-weight: 850; }.hero-copy h1 { max-width: 610px; margin: 19px 0 0; color: #fff; font-size: clamp(38px, 4.4vw, 56px); line-height: 1.06; letter-spacing: 0; font-weight: 920; }.hero-copy > p { max-width: 590px; margin: 22px 0 0; color: #c2d2df; font-size: 16px; line-height: 1.8; }.hero-source { display: flex; align-items: flex-start; gap: 8px; max-width: 570px; margin-top: 24px; color: #8fb0c7; font-size: 12px; line-height: 1.6; }.hero-source svg { flex: 0 0 auto; margin-top: 2px; color: #7dde72; }
.index-board { border: 1px solid rgba(142,199,235,.3); border-radius: 8px; background: rgba(8,23,35,.72); box-shadow: 0 28px 70px rgba(0,0,0,.28); backdrop-filter: blur(12px); }.board-heading { min-height: 48px; padding: 0 18px; border-bottom: 1px solid rgba(142,199,235,.2); display: flex; align-items: center; justify-content: space-between; gap: 18px; color: #9fc3d9; font-size: 11px; font-weight: 850; }.board-heading small { color: #6f93aa; font-family: Consolas, monospace; }.board-stats { display: grid; grid-template-columns: repeat(4, 1fr); }.board-stats div { min-width: 0; padding: 22px 17px 20px; border-right: 1px solid rgba(142,199,235,.18); }.board-stats div:last-child { border-right: 0; }.board-stats strong { display: block; color: #fff; font: 800 27px/1 Consolas, monospace; }.board-stats span { display: block; margin-top: 7px; color: #81a2b8; font-size: 11px; font-weight: 750; }
.evidence-ruler { display: grid; border-top: 1px solid rgba(142,199,235,.18); }.evidence-ruler button { position: relative; min-height: 52px; padding: 0 16px; border: 0; border-bottom: 1px solid rgba(142,199,235,.14); display: grid; grid-template-columns: 42px 1fr auto; align-items: center; gap: 12px; color: #b7ccda; background: transparent; font: inherit; text-align: left; cursor: pointer; transition: background .18s ease; }.evidence-ruler button:last-child { border-bottom: 0; }.evidence-ruler button:hover { background: rgba(255,255,255,.055); }.evidence-ruler b { font: 800 13px Consolas, monospace; }.evidence-ruler span { font-size: 12px; font-weight: 740; }.evidence-ruler em { color: #63869c; font: normal 12px Consolas, monospace; }.evidence-ruler button::before { position: absolute; left: 0; width: 3px; height: 22px; content: ''; background: currentColor; }.evidence-a1 { color: #74db91 !important; }.evidence-a2 { color: #7dccff !important; }.evidence-b { color: #f0bd5e !important; }.evidence-c { color: #b5a3ef !important; }
.library-shell { width: min(1180px, calc(100% - 48px)); margin: 0 auto; padding: 74px 0 92px; scroll-margin-top: 88px; }.library-intro { display: grid; grid-template-columns: minmax(0, 1fr) minmax(300px, 480px); gap: 60px; align-items: end; }.library-intro span { color: #287bc0; font-size: 12px; font-weight: 900; }.library-intro h2 { max-width: 710px; margin: 10px 0 0; font-size: clamp(28px, 3.5vw, 43px); line-height: 1.14; letter-spacing: 0; }.library-intro p { margin: 0; color: #617384; line-height: 1.75; }
.browse-row { min-height: 76px; margin-top: 38px; padding: 0 0 14px; border-bottom: 1px solid #d9e4ec; display: flex; align-items: center; justify-content: space-between; gap: 24px; }.mode-switch { display: inline-grid; grid-template-columns: 1fr 1fr; padding: 4px; border: 1px solid #d3e0e9; border-radius: 8px; background: #edf3f7; }.mode-switch button { min-height: 39px; padding: 0 18px; border: 0; border-radius: 5px; display: flex; align-items: center; justify-content: center; gap: 8px; color: #5a7182; background: transparent; font: inherit; font-size: 13px; font-weight: 820; cursor: pointer; }.mode-switch button.active { color: #155b99; background: #fff; box-shadow: 0 3px 11px rgba(42,78,104,.12); }.method-note { display: flex; align-items: center; gap: 8px; color: #738696; font-size: 12px; }.method-note svg { color: #4c8bb8; }
.catalog-layout { margin-top: 28px; display: grid; grid-template-columns: 270px minmax(0, 1fr); align-items: start; gap: 30px; }.taxonomy-panel { position: sticky; top: 96px; border-right: 1px solid #d9e4ec; padding-right: 24px; }.taxonomy-head { min-height: 38px; border-bottom: 1px solid #d9e4ec; display: flex; align-items: flex-start; justify-content: space-between; color: #29485e; font-size: 12px; font-weight: 900; }.taxonomy-head small { color: #8495a2; font: 12px Consolas, monospace; }.taxonomy-list { display: grid; gap: 3px; margin-top: 9px; }.taxonomy-list button { width: 100%; min-height: 48px; padding: 9px 10px; border: 0; border-radius: 6px; display: grid; grid-template-columns: minmax(0,1fr) auto; align-items: center; gap: 10px; color: #52697a; background: transparent; font: inherit; text-align: left; cursor: pointer; }.taxonomy-list button:hover { background: #eef4f8; }.taxonomy-list button.active { color: #174f7c; background: #e6f2fa; }.taxonomy-list span { min-width: 0; }.taxonomy-list b { display: block; font-size: 13px; line-height: 1.3; }.taxonomy-list small { display: block; margin-top: 3px; overflow: hidden; color: #8a9aa7; font-size: 10px; font-weight: 500; line-height: 1.35; white-space: nowrap; text-overflow: ellipsis; }.taxonomy-list em { font: normal 11px Consolas, monospace; }
.evidence-guide { margin-top: 24px; padding-top: 20px; border-top: 1px solid #d9e4ec; }.evidence-guide > div:first-child { display: flex; align-items: center; gap: 8px; color: #35566d; font-size: 12px; }.evidence-guide > p { margin: 9px 0 0; color: #7b8d9b; font-size: 11px; line-height: 1.55; }.evidence-guide > button { margin-top: 10px; padding: 0; border: 0; display: flex; align-items: center; gap: 5px; color: #2171ac; background: transparent; font: inherit; font-size: 11px; font-weight: 820; cursor: pointer; }.evidence-guide > button svg { transition: transform .2s ease; }.evidence-guide > button svg.rotated { transform: rotate(180deg); }.guide-list { display: grid; gap: 8px; margin-top: 13px; }.guide-list p { margin: 0; display: grid; grid-template-columns: 28px 1fr; gap: 7px; color: #748694; font-size: 10px; line-height: 1.45; }.guide-list b { color: #35566d; font-family: Consolas, monospace; }
.search-toolbar { display: grid; grid-template-columns: minmax(240px, 1fr) auto auto; gap: 10px; }.search-box, .select-control { min-height: 46px; border: 1px solid #d2dee7; border-radius: 7px; display: flex; align-items: center; color: #6d8191; background: #fff; }.search-box { padding: 0 13px; gap: 10px; }.search-box:focus-within, .select-control:focus-within { border-color: #65a9d8; box-shadow: 0 0 0 3px rgba(75,151,205,.1); }.search-box input { min-width: 0; flex: 1; border: 0; outline: 0; color: #1c3345; background: transparent; font: inherit; font-size: 13px; }.search-box input::placeholder { color: #9aa8b3; }.search-box kbd { padding: 2px 7px; border: 1px solid #d5dfe6; border-radius: 4px; color: #8b9aa5; background: #f4f7f9; font: 11px Consolas, monospace; }.select-control { position: relative; padding-left: 11px; }.select-control select { min-height: 44px; padding: 0 31px 0 7px; border: 0; outline: 0; appearance: none; color: #415c6f; background: transparent; font: inherit; font-size: 12px; font-weight: 750; cursor: pointer; }.select-control > svg:last-child { position: absolute; right: 10px; pointer-events: none; }.results-heading { min-height: 82px; border-bottom: 1px solid #d9e4ec; display: flex; align-items: center; justify-content: space-between; gap: 18px; }.results-heading span { color: #718594; font-size: 11px; font-weight: 800; }.results-heading h2 { margin: 4px 0 0; font-size: 21px; }.results-heading > button { padding: 7px 0; border: 0; display: flex; align-items: center; gap: 6px; color: #3177a8; background: transparent; font: inherit; font-size: 11px; font-weight: 800; cursor: pointer; }
.case-list { display: grid; }.case-card { min-width: 0; padding: 30px 0; border-bottom: 1px solid #d9e4ec; display: grid; grid-template-columns: 54px minmax(0, 1fr); gap: 20px; }.case-index { display: flex; flex-direction: column; align-items: center; gap: 9px; color: #75a2c2; font: 800 13px Consolas, monospace; }.case-index i { width: 1px; flex: 1; min-height: 48px; background: #d9e4ec; }.case-content { min-width: 0; }.case-meta { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; color: #4383b2; font-size: 11px; font-weight: 850; }.case-meta > span:first-child { padding-right: 9px; border-right: 1px solid #cad7e0; }.evidence-chip { padding: 3px 7px; border: 1px solid currentColor; border-radius: 4px; background: #fff; font-size: 10px; }.case-content h3 { max-width: 760px; margin: 10px 0 0; color: #132a3c; font-size: 22px; line-height: 1.35; }.role-line { margin-top: 10px; display: flex; align-items: center; flex-wrap: wrap; gap: 6px; color: #788b99; font-size: 11px; line-height: 1.4; }.role-line i { width: 3px; height: 3px; margin: 0 4px; border-radius: 50%; background: #a9b8c2; }
.case-abstract { margin: 20px 0 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border: 1px solid #d9e4ec; border-radius: 7px; background: #fff; }.case-abstract div { min-width: 0; padding: 15px; border-right: 1px solid #e2eaf0; }.case-abstract div:last-child { border-right: 0; }.case-abstract dt { color: #286c9e; font-size: 10px; font-weight: 900; }.case-abstract dd { margin: 7px 0 0; display: -webkit-box; overflow: hidden; color: #5e7281; font-size: 12px; line-height: 1.65; -webkit-box-orient: vertical; -webkit-line-clamp: 4; }.case-footer { min-height: 42px; margin-top: 12px; display: flex; align-items: center; gap: 18px; color: #8796a2; font-size: 10px; }.case-footer > span { display: flex; align-items: center; gap: 5px; min-width: 0; }.case-footer > span:nth-child(2) { flex: 1; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }.case-footer button { min-height: 34px; padding: 0 2px; border: 0; display: flex; align-items: center; gap: 7px; color: #1769a5; background: transparent; font: inherit; font-size: 12px; font-weight: 860; cursor: pointer; }.case-footer button svg { transition: transform .18s ease; }.case-footer button:hover svg { transform: translateX(3px); }
.empty-state { min-height: 360px; display: grid; place-content: center; justify-items: center; text-align: center; color: #78909f; }.empty-state h3 { margin: 13px 0 0; color: #29485e; font-size: 19px; }.empty-state p { max-width: 390px; margin: 8px 0 0; font-size: 13px; line-height: 1.6; }.empty-state button { margin-top: 18px; min-height: 38px; padding: 0 15px; border: 1px solid #bad0df; border-radius: 6px; color: #246a9c; background: #fff; font: inherit; font-weight: 800; cursor: pointer; }
.drawer-layer { position: fixed; inset: 0; z-index: 100; display: flex; justify-content: flex-end; background: rgba(8,22,34,.5); backdrop-filter: blur(5px); }.case-drawer { width: min(720px, 94vw); height: 100%; overflow-y: auto; outline: 0; color: #1b3141; background: #f8fafb; box-shadow: -24px 0 70px rgba(5,19,30,.26); }.drawer-header { position: sticky; top: 0; z-index: 4; min-height: 64px; padding: 0 22px; border-bottom: 1px solid #d7e1e8; display: flex; align-items: center; justify-content: space-between; gap: 18px; background: rgba(248,250,251,.96); backdrop-filter: blur(16px); }.drawer-header > div { display: flex; align-items: center; gap: 11px; }.drawer-header span { color: #2c79ad; font: 800 11px Consolas, monospace; }.drawer-header b { padding-left: 11px; border-left: 1px solid #cbd7df; color: #6f8290; font-size: 11px; }.drawer-header button { width: 36px; height: 36px; border: 1px solid #d1dde5; border-radius: 6px; display: grid; place-items: center; color: #536b7c; background: #fff; cursor: pointer; }.drawer-body { padding: 36px 38px 60px; }.drawer-title { padding-bottom: 28px; border-bottom: 1px solid #d7e1e8; }.drawer-title h2 { margin: 14px 0 0; color: #10283a; font-size: clamp(27px, 4vw, 38px); line-height: 1.2; }.drawer-title > p { margin: 14px 0 0; display: flex; align-items: flex-start; gap: 7px; color: #667c8c; font-size: 13px; line-height: 1.6; }.drawer-title > p svg { flex: 0 0 auto; margin-top: 3px; }
.evidence-callout { margin-top: 22px; padding: 16px 18px; border-left: 3px solid #3d94c9; display: grid; grid-template-columns: auto 1fr; gap: 12px; color: #39627d; background: #eaf4f9; }.evidence-callout strong { font-size: 12px; }.evidence-callout p { margin: 4px 0 0; color: #658092; font-size: 11px; line-height: 1.55; }
.workflow-file { margin-top: 28px; border-top: 1px solid #d7e1e8; }.file-section { padding: 23px 0; border-bottom: 1px solid #d7e1e8; }.file-label { display: flex; align-items: center; gap: 8px; color: #245f88; font-size: 12px; font-weight: 900; }.file-label > span { margin-right: 4px; color: #96a8b4; font: 800 11px Consolas, monospace; }.file-section > p { margin: 13px 0 0 35px; color: #4f6879; font-size: 14px; line-height: 1.85; }
.replicate-section { margin-top: 30px; padding: 24px; border: 1px solid #ccdce6; border-radius: 8px; background: #fff; }.section-title { display: flex; justify-content: space-between; gap: 16px; color: #2473a9; }.section-title span { color: #4587b3; font-size: 10px; font-weight: 900; }.section-title h3 { margin: 5px 0 0; color: #17364b; font-size: 20px; }.replicate-section > p { margin: 13px 0 0; color: #708390; font-size: 12px; line-height: 1.65; }.prompt-box { margin-top: 18px; border: 1px solid #28465a; border-radius: 6px; overflow: hidden; background: #13283a; }.prompt-box pre { max-height: 330px; margin: 0; padding: 18px; overflow: auto; white-space: pre-wrap; color: #c7d7e2; font: 12px/1.75 "Cascadia Code", Consolas, monospace; }.prompt-box button { width: 100%; min-height: 42px; padding: 0 14px; border: 0; border-top: 1px solid #2c4b60; display: flex; align-items: center; justify-content: center; gap: 8px; color: #b8e6ff; background: #193348; font: inherit; font-size: 12px; font-weight: 850; cursor: pointer; }.prompt-box button:hover { background: #204058; }
.source-section { margin-top: 22px; padding: 19px 0 0; border-top: 1px solid #d7e1e8; }.source-section > div { display: grid; grid-template-columns: auto 1fr; gap: 10px; color: #327caa; }.source-section small, .source-section strong { display: block; }.source-section small { color: #7f909b; font-size: 9px; font-weight: 900; }.source-section strong { margin-top: 3px; color: #334f62; font-size: 12px; }.source-section > p { margin: 10px 0 0 28px; color: #7c8d98; font-size: 11px; line-height: 1.55; }.source-section > a { min-height: 34px; margin: 14px 0 0 28px; display: inline-flex; align-items: center; gap: 6px; color: #1e70a9; font-size: 12px; font-weight: 850; }
@media (max-width: 1040px) { .hero-shell { grid-template-columns: 1fr; gap: 38px; }.hero-copy { max-width: 760px; }.index-board { max-width: 680px; }.catalog-layout { grid-template-columns: 230px minmax(0,1fr); gap: 24px; }.search-toolbar { grid-template-columns: 1fr 1fr; }.search-box { grid-column: 1 / -1; }.case-abstract { grid-template-columns: 1fr; }.case-abstract div { border-right: 0; border-bottom: 1px solid #e2eaf0; }.case-abstract div:last-child { border-bottom: 0; }.case-abstract dd { -webkit-line-clamp: 3; } }
@media (max-width: 760px) { .hero-shell, .library-shell { width: min(100% - 32px, 1180px); }.hero-shell { min-height: auto; padding: 38px 0 28px; gap: 24px; }.hero-copy h1 { margin-top: 15px; font-size: 39px; }.hero-copy > p { margin-top: 16px; font-size: 15px; line-height: 1.72; }.hero-source { margin-top: 15px; }.board-heading { min-height: 40px; }.board-stats { grid-template-columns: repeat(4, 1fr); }.board-stats div { padding: 15px 8px 14px; border-bottom: 0; text-align: center; }.board-stats div:nth-child(2) { border-right: 1px solid rgba(142,199,235,.18); }.board-stats strong { font-size: 22px; }.board-stats span { font-size: 9px; }.evidence-ruler { grid-template-columns: 1fr 1fr; }.evidence-ruler button { min-height: 44px; padding: 0 10px; grid-template-columns: 25px 1fr auto; gap: 6px; }.evidence-ruler button:nth-child(odd) { border-right: 1px solid rgba(142,199,235,.14); }.evidence-ruler span { font-size: 10px; }.library-shell { padding: 55px 0 70px; }.library-intro { grid-template-columns: 1fr; gap: 16px; }.browse-row { align-items: flex-start; flex-direction: column; padding: 0 0 18px; }.method-note { line-height: 1.5; }.catalog-layout { grid-template-columns: 1fr; }.taxonomy-panel { position: static; padding: 0 0 19px; border-right: 0; border-bottom: 1px solid #d9e4ec; overflow: hidden; }.taxonomy-head, .evidence-guide { display: none; }.taxonomy-list { display: flex; padding-bottom: 5px; overflow-x: auto; scrollbar-width: none; }.taxonomy-list::-webkit-scrollbar { display: none; }.taxonomy-list button { width: auto; min-width: max-content; min-height: 39px; grid-template-columns: auto auto; border: 1px solid #d4e0e8; padding: 6px 10px; }.taxonomy-list button.active { border-color: #8fc2e2; }.taxonomy-list small { display: none; }.search-toolbar { grid-template-columns: 1fr; }.search-box { grid-column: auto; }.select-control select { width: 100%; }.case-card { grid-template-columns: 34px minmax(0,1fr); gap: 10px; padding: 25px 0; }.case-content h3 { font-size: 19px; }.case-footer { flex-wrap: wrap; gap: 8px 13px; }.case-footer > span:nth-child(2) { flex: 1 1 70%; }.case-footer button { width: 100%; justify-content: flex-end; }.drawer-body { padding: 28px 20px 48px; }.file-section > p { margin-left: 0; }.replicate-section { padding: 19px; } }
@media (max-width: 440px) { .mode-switch { width: 100%; }.mode-switch button { padding: 0 10px; }.board-heading { padding: 0 13px; }.evidence-ruler button { padding: 0 12px; grid-template-columns: 34px 1fr auto; gap: 8px; }.case-abstract dd { -webkit-line-clamp: 4; }.case-index { align-items: flex-start; }.case-index i { margin-left: 8px; }.drawer-header { padding: 0 14px; }.drawer-header b { display: none; } }
@media (prefers-reduced-motion: reduce) { * { scroll-behavior: auto !important; transition: none !important; } }
</style>
