<template>
  <div class="workflows-page">
    <SiteHeader v-if="!embedded" @trial="$router.push('/free-trial')" />

    <main>
      <section class="workflow-hero">
        <div class="hero-grid" aria-hidden="true"></div>
        <div class="hero-shell">
          <div class="hero-copy">
            <div class="hero-kicker"><span></span>CODEX · WORKFLOW INDEX</div>
            <h1>{{ copy.title }}</h1>
            <p>{{ copy.subtitle }}</p>
            <div class="hero-actions">
              <button type="button" class="primary-action" @click="scrollToLibrary"><Search :size="17" />{{ copy.start }}</button>
              <button type="button" @click="openRandom"><Shuffle :size="17" />{{ copy.random }}</button>
            </div>
          </div>

          <div class="workflow-board" aria-label="Codex 工作流结构">
            <div class="board-head"><span>{{ copy.boardTitle }}</span><b>{{ catalog.cases.length }} / SOURCED</b></div>
            <div class="board-steps">
              <div v-for="(phase, index) in phases" :key="phase.label" class="pipeline-step">
                <span>0{{ index + 1 }}</span>
                <div><strong>{{ phase.label }}</strong><small>{{ phase.detail }}</small></div>
                <ArrowRight v-if="index < phases.length - 1" :size="17" aria-hidden="true" />
                <ClipboardCheck v-else :size="17" aria-hidden="true" />
              </div>
            </div>
            <div class="board-foot"><span>{{ copy.boardFoot }}</span><i></i></div>
          </div>

          <div class="hero-stats" :aria-label="copy.statsLabel">
            <div><strong>{{ catalog.cases.length }}</strong><span>{{ copy.examples }}</span></div>
            <div><strong>{{ catalog.categories.length }}</strong><span>{{ copy.categories }}</span></div>
            <div><strong>{{ catalog.professions.length }}</strong><span>{{ copy.professions }}</span></div>
            <div><strong>{{ sourceCount }}</strong><span>{{ copy.sources }}</span></div>
          </div>
        </div>
      </section>

      <section ref="libraryRef" class="library-shell">
        <div class="catalog-head">
          <div class="mode-switch" role="tablist" :aria-label="copy.browseBy">
            <button type="button" role="tab" :aria-selected="browseMode === 'category'" :class="{ active: browseMode === 'category' }" @click="setBrowseMode('category')">
              <LayoutGrid :size="17" />{{ copy.byCategory }}
            </button>
            <button type="button" role="tab" :aria-selected="browseMode === 'profession'" :class="{ active: browseMode === 'profession' }" @click="setBrowseMode('profession')">
              <BriefcaseBusiness :size="17" />{{ copy.byProfession }}
            </button>
          </div>
          <p>{{ copy.libraryCopy }}</p>
        </div>

        <div class="catalog-layout">
          <aside class="taxonomy-panel" :aria-label="copy.filters">
            <div class="taxonomy-title"><SlidersHorizontal :size="17" /><span>{{ browseMode === 'category' ? copy.categories : copy.professions }}</span></div>
            <div class="taxonomy-list">
              <button v-for="item in activeTaxonomy" :key="item.id" type="button" :class="{ active: selectedTaxonomy === item.id }" @click="selectedTaxonomy = item.id">
                <span><b>{{ item.label }}</b><small v-if="item.description">{{ item.description }}</small></span>
                <em>{{ item.count }}</em>
              </button>
            </div>
            <div class="method-card">
              <ShieldCheck :size="19" />
              <div><strong>{{ copy.methodTitle }}</strong><p>{{ copy.methodCopy }}</p></div>
            </div>
          </aside>

          <div class="results-panel">
            <div class="search-row">
              <label class="search-box">
                <Search :size="19" />
                <input ref="searchInput" v-model="query" type="search" :placeholder="copy.search" />
                <kbd>/</kbd>
              </label>
              <label class="evidence-select">
                <ShieldCheck :size="16" />
                <select v-model="evidenceFilter" :aria-label="copy.evidenceFilter">
                  <option value="all">{{ copy.allEvidence }}</option>
                  <option v-for="level in evidenceOrder" :key="level" :value="level">{{ level }} · {{ catalog.evidence[level].label }}</option>
                </select>
                <ChevronDown :size="14" />
              </label>
            </div>

            <div class="results-head">
              <div><span>{{ currentTaxonomyLabel }}</span><h2>{{ filteredWorkflows.length }} {{ copy.results }}</h2></div>
              <button v-if="hasFilters" type="button" @click="clearFilters"><RotateCcw :size="15" />{{ copy.clear }}</button>
            </div>

            <div v-if="visibleWorkflows.length" class="workflow-list">
              <article v-for="item in visibleWorkflows" :key="item.id" class="workflow-record">
                <div class="record-topline">
                  <div class="record-index"><span>WF</span><strong>{{ item.id }}</strong></div>
                  <div class="record-meta">
                    <span>{{ categoryLabel(item.category) }}</span>
                    <b :class="`evidence-${item.evidence.toLowerCase()}`">{{ item.evidence }}</b>
                  </div>
                </div>
                <div class="record-body">
                  <h3>{{ item.title }}</h3>
                  <p class="record-roles"><BriefcaseBusiness :size="15" />{{ item.roles }}<i></i>{{ item.industry }}</p>

                  <div class="record-grid">
                    <section>
                      <div class="record-label"><Target :size="15" />{{ copy.scenario }}</div>
                      <p>{{ item.problem }}</p>
                    </section>
                    <section>
                      <div class="record-label"><Workflow :size="15" />{{ copy.description }}</div>
                      <p>{{ item.workflow }}</p>
                    </section>
                    <section>
                      <div class="record-label"><ClipboardCheck :size="15" />{{ copy.example }}</div>
                      <p>{{ item.outcome }}</p>
                    </section>
                  </div>

                  <div class="record-footer">
                    <span><BookOpenText :size="14" />{{ item.source.title }}</span>
                    <button type="button" @click="openDetail(item)"><PanelRightOpen :size="16" />{{ copy.open }}</button>
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

            <button v-if="hasMore" class="load-more" type="button" @click="visibleCount += 12">
              <Plus :size="17" />{{ copy.loadMore }}<span>{{ filteredWorkflows.length - visibleWorkflows.length }}</span>
            </button>
          </div>
        </div>
      </section>
    </main>

    <SiteFooter v-if="!embedded" />

    <Teleport to="body">
      <div v-if="selectedWorkflow" class="drawer-layer" @click.self="closeDetail">
        <aside ref="drawerRef" class="workflow-drawer" role="dialog" aria-modal="true" tabindex="-1" :aria-labelledby="`workflow-${selectedWorkflow.id}`">
          <header class="drawer-header">
            <div><span>WORKFLOW / {{ selectedWorkflow.id }}</span><b>{{ categoryLabel(selectedWorkflow.category) }}</b></div>
            <button type="button" :aria-label="copy.close" :title="copy.close" @click="closeDetail"><X :size="20" /></button>
          </header>
          <div class="drawer-body">
            <div class="drawer-title">
              <div class="record-meta"><span>{{ selectedWorkflow.industry }}</span><b :class="`evidence-${selectedWorkflow.evidence.toLowerCase()}`">{{ selectedWorkflow.evidence }} · {{ catalog.evidence[selectedWorkflow.evidence].label }}</b></div>
              <h2 :id="`workflow-${selectedWorkflow.id}`">{{ selectedWorkflow.title }}</h2>
              <p><BriefcaseBusiness :size="15" />{{ selectedWorkflow.roles }}</p>
            </div>

            <div class="drawer-sections">
              <section><span>01</span><div><h3>{{ copy.scenario }}</h3><p>{{ selectedWorkflow.problem }}</p></div></section>
              <section><span>02</span><div><h3>{{ copy.description }}</h3><p>{{ selectedWorkflow.workflow }}</p></div></section>
              <section><span>03</span><div><h3>{{ copy.example }}</h3><p>{{ selectedWorkflow.outcome }}</p></div></section>
            </div>

            <section class="prompt-section">
              <div class="prompt-heading"><div><span>{{ copy.reuseEyebrow }}</span><h3>{{ copy.reuseTitle }}</h3></div><Sparkles :size="19" /></div>
              <p>{{ copy.reuseCopy }}</p>
              <pre>{{ taskTemplate(selectedWorkflow) }}</pre>
              <button type="button" @click="copyTemplate(selectedWorkflow)">
                <CopyCheck v-if="copied" :size="16" /><Copy v-else :size="16" />{{ copied ? copy.copied : copy.copy }}
              </button>
            </section>

            <section class="source-section">
              <BookOpenText :size="19" />
              <div><span>{{ copy.originalSource }}</span><strong>{{ selectedWorkflow.source.title }}</strong><p>{{ selectedWorkflow.source.note }}</p></div>
              <a :href="selectedWorkflow.source.url" target="_blank" rel="noopener">{{ copy.openSource }}<ArrowUpRight :size="15" /></a>
            </section>
          </div>
        </aside>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useHead } from '@unhead/vue'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenText,
  BriefcaseBusiness,
  ChevronDown,
  ClipboardCheck,
  Copy,
  CopyCheck,
  LayoutGrid,
  PanelRightOpen,
  Plus,
  RotateCcw,
  Search,
  SearchX,
  ShieldCheck,
  Shuffle,
  SlidersHorizontal,
  Sparkles,
  Target,
  Workflow,
  X,
} from '@lucide/vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import { useI18n } from '@/composables/useI18n'
import rawCatalog from '@/data/codex-cases.json'
import extraCatalog from '@/data/codex-workflows-extra.json'
import type { CaseTaxonomyItem, CasesCatalog, CodexCase, EvidenceLevel } from '@/types/cases'

type BrowseMode = 'category' | 'profession'
type FilterItem = CaseTaxonomyItem & { count: number }

withDefaults(defineProps<{
  embedded?: boolean
}>(), {
  embedded: false,
})

const baseCatalog = rawCatalog as CasesCatalog
const catalog: CasesCatalog = {
  ...baseCatalog,
  cases: [...baseCatalog.cases, ...(extraCatalog.workflows as CodexCase[])],
}
const workflowTotal = catalog.cases.length
const evidenceOrder: EvidenceLevel[] = ['A1', 'A2', 'B', 'C']
const { lang } = useI18n()
const browseMode = ref<BrowseMode>('category')
const selectedTaxonomy = ref('all')
const evidenceFilter = ref<'all' | EvidenceLevel>('all')
const query = ref('')
const visibleCount = ref(12)
const selectedWorkflow = ref<CodexCase | null>(null)
const copied = ref(false)
const searchInput = ref<HTMLInputElement | null>(null)
const libraryRef = ref<HTMLElement | null>(null)
const drawerRef = ref<HTMLElement | null>(null)

const zhCopy = {
  workflowCount: '条已溯源工作流', kicker: 'Codex 工作流库', title: '从工作场景出发，找到可复用的 Codex 工作流', subtitle: `${workflowTotal} 条工作流覆盖研发、产品、数据、运营、销售、市场、财务与专业服务。每条都说明适用场景、执行方式、使用案例与原始来源。`, start: '开始浏览', random: '随机探索', boardTitle: '一条可复用工作流的组成', boardFoot: '从相似场景开始，再替换成你的真实上下文', statsLabel: '工作流库数据概览', examples: '工作流', sources: '原始来源',
  phases: [['准备上下文', '文件、数据与权限'], ['交给 Codex', '明确任务与产物'], ['人工验收', '核对事实与边界'], ['沉淀复用', '技能、模板或自动化']],
  eyebrow: 'WORKFLOW DIRECTORY', libraryTitle: '按类别或职业定位你的下一条工作流', libraryCopy: '从相似任务出发，保留流程结构，再替换成你的真实上下文与验收标准。', browseBy: '浏览方式', byCategory: '按类别', byProfession: '按职业', sourceNote: `${workflowTotal} 条记录均保留原始出处与证据等级`, filters: '工作流筛选', categories: '工作类别', professions: '职业岗位', methodTitle: '资料口径', methodCopy: 'A1/A2 为一手案例，B 为可复现实操，C 为可执行模板。等级描述证据，不代表价值高低。', search: '搜索工作流、场景、岗位或组织', evidenceFilter: '证据等级', allEvidence: '全部证据等级', results: '条匹配工作流', clear: '清除筛选', scenario: '适用场景', description: '工作流说明', example: '使用案例与边界', open: '查看工作流', emptyTitle: '没有找到匹配工作流', emptyCopy: '尝试缩短关键词，或清除当前类别和证据筛选。', loadMore: '加载更多', close: '关闭工作流', reuseEyebrow: '带回你的工作', reuseTitle: '可复用任务模板', reuseCopy: '替换其中的业务背景、文件、权限与验收条件，再交给 Codex 执行。', copy: '复制任务模板', copied: '已复制', originalSource: '原始资料', openSource: '打开来源',
}

const enCopy = {
  workflowCount: 'sourced workflows', kicker: 'Codex workflow library', title: 'Start with the work. Find a Codex workflow you can reuse.', subtitle: `${workflowTotal} workflows across engineering, product, data, operations, sales, marketing, finance, and professional services. Each includes a scenario, execution pattern, example, and original source.`, start: 'Browse workflows', random: 'Surprise me', boardTitle: 'Anatomy of a reusable workflow', boardFoot: 'Start with comparable work, then replace the real context', statsLabel: 'Workflow library overview', examples: 'workflows', sources: 'sources',
  phases: [['Prepare context', 'Files, data, and access'], ['Delegate to Codex', 'Task and deliverable'], ['Review', 'Facts and boundaries'], ['Reuse', 'Skill, template, or automation']],
  eyebrow: 'WORKFLOW DIRECTORY', libraryTitle: 'Find your next workflow by domain or profession', libraryCopy: 'Start from a comparable task, keep the workflow structure, then replace it with your own context and acceptance criteria.', browseBy: 'Browse by', byCategory: 'Category', byProfession: 'Profession', sourceNote: `All ${workflowTotal} records retain their source and evidence level`, filters: 'Workflow filters', categories: 'Work domains', professions: 'Professions', methodTitle: 'Evidence guide', methodCopy: 'A1/A2 are first-party cases, B is a reproducible walkthrough, and C is an executable template. The level describes evidence, not value.', search: 'Search workflows, scenarios, roles, or organizations', evidenceFilter: 'Evidence level', allEvidence: 'All evidence levels', results: 'matching workflows', clear: 'Clear filters', scenario: 'When to use it', description: 'Workflow', example: 'Example and boundary', open: 'Open workflow', emptyTitle: 'No matching workflows', emptyCopy: 'Try a shorter keyword or clear the current filters.', loadMore: 'Load more', close: 'Close workflow', reuseEyebrow: 'Bring it to your work', reuseTitle: 'Reusable task brief', reuseCopy: 'Replace the business context, files, permissions, and acceptance criteria before handing it to Codex.', copy: 'Copy task brief', copied: 'Copied', originalSource: 'Original source', openSource: 'Open source',
}

const copy = computed(() => lang.value === 'en' ? enCopy : zhCopy)
const phases = computed(() => copy.value.phases.map(([label, detail]) => ({ label, detail })))
const sourceCount = computed(() => new Set(catalog.cases.map((item) => item.source.url)).size)

const categoryItems = computed<FilterItem[]>(() => [
  { id: 'all', label: lang.value === 'en' ? 'All domains' : '全部类别', description: lang.value === 'en' ? 'Browse all workflows' : '浏览全部工作流', count: catalog.cases.length },
  ...catalog.categories.map((item) => ({ ...item, count: catalog.cases.filter((entry) => entry.category === item.id).length })),
])

const professionItems = computed<FilterItem[]>(() => [
  { id: 'all', label: lang.value === 'en' ? 'All professions' : '全部职业', description: lang.value === 'en' ? 'A workflow may fit several roles' : '同一工作流可对应多个岗位', count: catalog.cases.length },
  ...catalog.professions.map((item) => ({ ...item, count: catalog.cases.filter((entry) => entry.professions.includes(item.id)).length })),
])

const activeTaxonomy = computed(() => browseMode.value === 'category' ? categoryItems.value : professionItems.value)
const currentTaxonomyLabel = computed(() => activeTaxonomy.value.find((item) => item.id === selectedTaxonomy.value)?.label || activeTaxonomy.value[0].label)
const hasFilters = computed(() => selectedTaxonomy.value !== 'all' || evidenceFilter.value !== 'all' || query.value.trim().length > 0)

const filteredWorkflows = computed(() => {
  const needle = query.value.trim().toLocaleLowerCase()
  return catalog.cases.filter((item) => {
    const taxonomyMatch = selectedTaxonomy.value === 'all' || (browseMode.value === 'category' ? item.category === selectedTaxonomy.value : item.professions.includes(selectedTaxonomy.value))
    const evidenceMatch = evidenceFilter.value === 'all' || item.evidence === evidenceFilter.value
    const searchable = [item.title, item.industry, item.roles, item.problem, item.workflow, item.outcome, item.source.title].join(' ').toLocaleLowerCase()
    return taxonomyMatch && evidenceMatch && (!needle || searchable.includes(needle))
  }).sort((a, b) => Number(a.id) - Number(b.id))
})
const visibleWorkflows = computed(() => filteredWorkflows.value.slice(0, visibleCount.value))
const hasMore = computed(() => visibleWorkflows.value.length < filteredWorkflows.value.length)

watch([browseMode, selectedTaxonomy, evidenceFilter, query], () => { visibleCount.value = 12 })

function categoryLabel(id: string) {
  return catalog.categories.find((item) => item.id === id)?.label || id
}

function setBrowseMode(mode: BrowseMode) {
  browseMode.value = mode
  selectedTaxonomy.value = 'all'
}

function clearFilters() {
  selectedTaxonomy.value = 'all'
  evidenceFilter.value = 'all'
  query.value = ''
}

function scrollToLibrary() {
  libraryRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function openRandom() {
  openDetail(catalog.cases[Math.floor(Math.random() * catalog.cases.length)])
}

function openDetail(item: CodexCase) {
  selectedWorkflow.value = item
  copied.value = false
  document.body.style.overflow = 'hidden'
  nextTick(() => drawerRef.value?.focus())
}

function closeDetail() {
  selectedWorkflow.value = null
  copied.value = false
  document.body.style.overflow = ''
}

function taskTemplate(item: CodexCase) {
  return `目标：${item.title}\n\n适用场景：\n${item.problem}\n\n执行方式：\n${item.workflow}\n\n验收标准与边界：\n${item.outcome}\n\n请先检查当前可用的文件、数据、工具与权限，列出缺失信息和执行计划；未经确认不要扩大权限或跳过人工复核。`
}

async function copyTemplate(item: CodexCase) {
  await navigator.clipboard.writeText(taskTemplate(item))
  copied.value = true
  window.setTimeout(() => { copied.value = false }, 1800)
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && selectedWorkflow.value) closeDetail()
  if (event.key === '/' && !selectedWorkflow.value && !(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement)) {
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
  title: `Codex 工作流库｜${workflowTotal} 个跨岗位实战工作流 - AigoKey`,
  meta: [
    { name: 'description', content: `浏览 ${workflowTotal} 个 Codex 工作流，按类别与职业筛选，查看工作流说明、适用场景、使用案例、证据等级和原始来源。` },
    { property: 'og:title', content: `Codex 工作流库｜${workflowTotal} 个跨岗位工作流` },
    { property: 'og:description', content: '从真实工作场景出发，找到可迁移、可验证、可复用的 Codex 工作流。' },
  ],
})
</script>

<style scoped>
.workflows-page { min-height: 100vh; color: #142433; background: #f7fafc; }
.workflow-hero { position: relative; overflow: hidden; color: #f6fbff; background: #0d2130; }
.hero-grid { position: absolute; inset: 0; opacity: .28; background-image: linear-gradient(rgba(135,189,220,.13) 1px, transparent 1px), linear-gradient(90deg, rgba(135,189,220,.13) 1px, transparent 1px); background-size: 42px 42px; mask-image: linear-gradient(90deg, #000 0%, #000 78%, transparent); }
.hero-shell { position: relative; width: min(1180px, calc(100% - 48px)); min-height: 326px; margin: 0 auto; padding: 48px 0 38px; display: grid; grid-template-columns: 300px minmax(0, 1fr); align-items: center; gap: 74px; }
.hero-count { align-self: stretch; min-height: 220px; padding: 22px 28px; border-left: 1px solid rgba(173,219,245,.35); display: flex; flex-direction: column; justify-content: center; background: rgba(6,20,30,.42); }
.hero-count > span { color: #8bb5cc; font: 700 11px/1.2 Consolas, monospace; }.hero-count strong { margin-top: 14px; color: #d9f45b; font: 800 96px/.88 Consolas, monospace; letter-spacing: 0; }.hero-count small { margin-top: 17px; color: #aec4d1; font-size: 13px; font-weight: 750; }
.hero-copy { max-width: 740px; }.hero-kicker { display: flex; align-items: center; gap: 9px; color: #8ed9ff; font-size: 13px; font-weight: 850; }.hero-copy h1 { max-width: 760px; margin: 17px 0 0; font-size: clamp(36px, 4vw, 54px); line-height: 1.09; letter-spacing: 0; }.hero-copy > p { max-width: 690px; margin: 18px 0 0; color: #b6cbd7; font-size: 15px; line-height: 1.8; }.hero-action { min-height: 40px; margin-top: 22px; padding: 0; border: 0; display: inline-flex; align-items: center; gap: 9px; color: #dff766; background: transparent; font: inherit; font-size: 13px; font-weight: 850; cursor: pointer; }.hero-action svg { transition: transform .2s ease; }.hero-action:hover svg { transform: translateX(4px); }
.pipeline-shell { position: relative; width: min(1180px, calc(100% - 48px)); min-height: 88px; margin: 0 auto; border-top: 1px solid rgba(142,194,222,.25); display: grid; grid-template-columns: repeat(4, 1fr); }
.pipeline-step { position: relative; min-width: 0; padding: 18px 34px 17px 0; display: grid; grid-template-columns: 31px minmax(0,1fr) auto; align-items: center; gap: 10px; }.pipeline-step + .pipeline-step { padding-left: 24px; border-left: 1px solid rgba(142,194,222,.19); }.pipeline-step > span { color: #d9f45b; font: 800 11px Consolas, monospace; }.pipeline-step strong, .pipeline-step small { display: block; }.pipeline-step strong { color: #eef8fd; font-size: 13px; }.pipeline-step small { margin-top: 4px; overflow: hidden; color: #7898aa; font-size: 10px; white-space: nowrap; text-overflow: ellipsis; }.pipeline-step > svg { color: #4d7287; }
.library-shell { width: min(1180px, calc(100% - 48px)); margin: 0 auto; padding: 68px 0 92px; scroll-margin-top: 84px; }.library-heading { display: grid; grid-template-columns: minmax(0,1.2fr) minmax(300px,.8fr); align-items: end; gap: 60px; }.library-heading span { color: #1f78b4; font: 800 11px Consolas, monospace; }.library-heading h2 { max-width: 690px; margin: 10px 0 0; color: #10283a; font-size: clamp(28px, 3.1vw, 42px); line-height: 1.16; }.library-heading p { margin: 0; color: #647888; font-size: 14px; line-height: 1.78; }
.browse-bar { min-height: 77px; margin-top: 38px; padding-bottom: 14px; border-bottom: 1px solid #d7e2e9; display: flex; align-items: center; justify-content: space-between; gap: 24px; }.mode-switch { display: inline-grid; grid-template-columns: 1fr 1fr; padding: 4px; border: 1px solid #cedce5; border-radius: 7px; background: #eaf1f5; }.mode-switch button { min-height: 39px; padding: 0 18px; border: 0; border-radius: 4px; display: flex; align-items: center; justify-content: center; gap: 8px; color: #5d7281; background: transparent; font: inherit; font-size: 13px; font-weight: 820; cursor: pointer; }.mode-switch button.active { color: #155f91; background: #fff; box-shadow: 0 4px 13px rgba(35,76,103,.12); }.source-note { display: flex; align-items: center; gap: 8px; color: #718693; font-size: 11px; }.source-note svg { color: #278b65; }
.catalog-layout { margin-top: 28px; display: grid; grid-template-columns: 264px minmax(0,1fr); align-items: start; gap: 34px; }.taxonomy-panel { position: sticky; top: 94px; padding-right: 23px; border-right: 1px solid #d7e2e9; }.taxonomy-title { min-height: 36px; border-bottom: 1px solid #d7e2e9; display: flex; justify-content: space-between; color: #355166; font-size: 11px; font-weight: 900; }.taxonomy-title small { color: #8b9ba6; font: 11px Consolas, monospace; }.taxonomy-list { margin-top: 9px; display: grid; gap: 3px; }.taxonomy-list button { width: 100%; min-height: 47px; padding: 8px 10px; border: 0; border-radius: 5px; display: grid; grid-template-columns: minmax(0,1fr) auto; align-items: center; gap: 9px; color: #566d7c; background: transparent; font: inherit; text-align: left; cursor: pointer; }.taxonomy-list button:hover { background: #eef4f7; }.taxonomy-list button.active { color: #174f74; background: #e3f0f7; }.taxonomy-list b, .taxonomy-list small { display: block; }.taxonomy-list b { font-size: 12px; line-height: 1.35; }.taxonomy-list small { margin-top: 3px; overflow: hidden; color: #8a9aa5; font-size: 9px; font-weight: 500; white-space: nowrap; text-overflow: ellipsis; }.taxonomy-list em { color: #668397; font: normal 11px Consolas, monospace; }.method-card { margin-top: 24px; padding-top: 19px; border-top: 1px solid #d7e2e9; display: grid; grid-template-columns: auto 1fr; gap: 10px; color: #3b6d8e; }.method-card strong { color: #355166; font-size: 11px; }.method-card p { margin: 6px 0 0; color: #83939e; font-size: 10px; line-height: 1.55; }
.search-row { display: grid; grid-template-columns: minmax(250px,1fr) auto; gap: 10px; }.search-box, .evidence-select { min-height: 46px; border: 1px solid #cedbe4; border-radius: 6px; display: flex; align-items: center; color: #708592; background: #fff; }.search-box { padding: 0 13px; gap: 10px; }.search-box:focus-within, .evidence-select:focus-within { border-color: #5da2ce; box-shadow: 0 0 0 3px rgba(54,139,190,.1); }.search-box input { min-width: 0; flex: 1; border: 0; outline: 0; color: #193247; background: transparent; font: inherit; font-size: 13px; }.search-box input::placeholder { color: #98a6af; }.search-box kbd { padding: 2px 7px; border: 1px solid #d4dfe6; border-radius: 3px; background: #f4f7f9; font: 10px Consolas, monospace; }.evidence-select { position: relative; padding-left: 11px; }.evidence-select select { min-height: 44px; padding: 0 31px 0 7px; border: 0; outline: 0; appearance: none; color: #425c6d; background: transparent; font: inherit; font-size: 12px; font-weight: 750; cursor: pointer; }.evidence-select > svg:last-child { position: absolute; right: 10px; pointer-events: none; }.results-head { min-height: 79px; border-bottom: 1px solid #d7e2e9; display: flex; align-items: center; justify-content: space-between; gap: 16px; }.results-head span { color: #748895; font-size: 10px; font-weight: 800; }.results-head h2 { margin: 4px 0 0; color: #183447; font-size: 20px; }.results-head button { border: 0; display: flex; align-items: center; gap: 6px; color: #2675a5; background: transparent; font: inherit; font-size: 11px; font-weight: 800; cursor: pointer; }
.workflow-list { display: grid; }.workflow-record { min-width: 0; padding: 30px 0 34px; border-bottom: 1px solid #d7e2e9; display: grid; grid-template-columns: 52px minmax(0,1fr); gap: 20px; }.record-index { display: flex; flex-direction: column; align-items: flex-start; gap: 2px; color: #7a9db3; font-family: Consolas, monospace; }.record-index span { font-size: 9px; }.record-index strong { color: #2c719d; font-size: 18px; }.record-body { min-width: 0; }.record-meta { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; color: #2b7cad; font-size: 10px; font-weight: 820; }.record-meta i { color: #7c8e99; font-style: normal; font-weight: 650; }.record-meta b { padding: 2px 6px; border: 1px solid currentColor; border-radius: 3px; font: 800 9px Consolas, monospace; }.evidence-a1 { color: #22875b !important; }.evidence-a2 { color: #1b79b5 !important; }.evidence-b { color: #aa6a13 !important; }.evidence-c { color: #7150a6 !important; }.record-body > h3 { max-width: 780px; margin: 9px 0 0; color: #122c3e; font-size: 22px; line-height: 1.35; }.record-roles { margin: 8px 0 0; display: flex; align-items: center; gap: 7px; color: #7a8d99; font-size: 11px; }.record-grid { margin-top: 20px; border-top: 1px solid #dce5eb; border-bottom: 1px solid #dce5eb; display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); }.record-grid section { min-width: 0; padding: 15px 16px 17px; }.record-grid section + section { border-left: 1px solid #dce5eb; }.record-label { display: flex; align-items: center; gap: 7px; color: #2375a8; font-size: 10px; font-weight: 900; }.record-grid p { margin: 9px 0 0; display: -webkit-box; overflow: hidden; color: #5c7180; font-size: 12px; line-height: 1.66; -webkit-box-orient: vertical; -webkit-line-clamp: 5; }.record-footer { min-height: 40px; margin-top: 10px; display: flex; align-items: center; justify-content: space-between; gap: 18px; color: #85949e; font-size: 10px; }.record-footer > span { min-width: 0; display: flex; align-items: center; gap: 6px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }.record-footer button { flex: 0 0 auto; border: 0; display: flex; align-items: center; gap: 7px; color: #176fa6; background: transparent; font: inherit; font-size: 11px; font-weight: 850; cursor: pointer; }.record-footer button svg { transition: transform .18s ease; }.record-footer button:hover svg { transform: translateX(3px); }
.empty-state { min-height: 390px; display: grid; place-content: center; justify-items: center; color: #7b919f; text-align: center; }.empty-state h3 { margin: 13px 0 0; color: #2a495d; font-size: 19px; }.empty-state p { max-width: 380px; margin: 8px 0 0; font-size: 12px; line-height: 1.6; }.empty-state button { min-height: 37px; margin-top: 17px; padding: 0 14px; border: 1px solid #bfd1dc; border-radius: 5px; color: #226d9d; background: #fff; font: inherit; font-weight: 800; cursor: pointer; }
.drawer-layer { position: fixed; inset: 0; z-index: 100; display: flex; justify-content: flex-end; background: rgba(7,20,30,.55); backdrop-filter: blur(5px); }.workflow-drawer { width: min(720px, 94vw); height: 100%; overflow-y: auto; outline: 0; color: #193142; background: #f8fafb; box-shadow: -24px 0 70px rgba(3,15,24,.28); }.drawer-header { position: sticky; top: 0; z-index: 4; min-height: 63px; padding: 0 22px; border-bottom: 1px solid #d4e0e7; display: flex; align-items: center; justify-content: space-between; background: rgba(248,250,251,.96); backdrop-filter: blur(16px); }.drawer-header > div { display: flex; align-items: center; gap: 11px; }.drawer-header span { color: #2677a8; font: 800 10px Consolas, monospace; }.drawer-header b { padding-left: 11px; border-left: 1px solid #cbd7df; color: #72848f; font-size: 10px; }.drawer-header button { width: 36px; height: 36px; border: 1px solid #ccd9e1; border-radius: 5px; display: grid; place-items: center; color: #526b7b; background: #fff; cursor: pointer; }.drawer-body { padding: 34px 38px 58px; }.drawer-title { padding-bottom: 27px; border-bottom: 1px solid #d5e0e7; }.drawer-title h2 { margin: 13px 0 0; color: #102a3d; font-size: clamp(27px, 4vw, 38px); line-height: 1.2; }.drawer-title > p { margin: 14px 0 0; display: flex; align-items: center; gap: 7px; color: #687d8b; font-size: 12px; }.drawer-sections { border-bottom: 1px solid #d5e0e7; }.drawer-sections section { padding: 23px 0; border-bottom: 1px solid #d5e0e7; display: grid; grid-template-columns: 36px minmax(0,1fr); gap: 10px; }.drawer-sections section:last-child { border-bottom: 0; }.drawer-sections section > span { color: #2b7cab; font: 800 11px Consolas, monospace; }.drawer-sections h3 { margin: 0; color: #245c80; font-size: 12px; }.drawer-sections p { margin: 10px 0 0; color: #4e6878; font-size: 14px; line-height: 1.85; }.prompt-section { margin-top: 29px; padding: 23px; border: 1px solid #cbdbe4; border-radius: 7px; background: #fff; }.prompt-heading { display: flex; justify-content: space-between; color: #2b80b4; }.prompt-heading span { font-size: 9px; font-weight: 900; }.prompt-heading h3 { margin: 5px 0 0; color: #18394f; font-size: 19px; }.prompt-section > p { margin: 12px 0 0; color: #748792; font-size: 11px; line-height: 1.6; }.prompt-section pre { max-height: 320px; margin: 17px 0 0; padding: 17px; overflow: auto; border-radius: 5px; white-space: pre-wrap; color: #c7d7e1; background: #102838; font: 11px/1.75 "Cascadia Code", Consolas, monospace; }.prompt-section > button { width: 100%; min-height: 40px; margin-top: 9px; border: 1px solid #cad9e1; border-radius: 5px; display: flex; align-items: center; justify-content: center; gap: 8px; color: #1f6f9f; background: #f7fafb; font: inherit; font-size: 11px; font-weight: 850; cursor: pointer; }.source-section { margin-top: 24px; padding-top: 21px; border-top: 1px solid #d5e0e7; display: grid; grid-template-columns: auto minmax(0,1fr) auto; align-items: start; gap: 10px; color: #2d7aa8; }.source-section span, .source-section strong { display: block; }.source-section span { color: #81919b; font-size: 9px; font-weight: 900; }.source-section strong { margin-top: 4px; color: #355165; font-size: 12px; }.source-section p { margin: 7px 0 0; color: #80909a; font-size: 10px; line-height: 1.5; }.source-section a { min-height: 31px; display: flex; align-items: center; gap: 5px; color: #1f70a2; font-size: 10px; font-weight: 850; }
@media (max-width: 980px) { .hero-shell { grid-template-columns: 220px minmax(0,1fr); gap: 42px; }.hero-count strong { font-size: 77px; }.catalog-layout { grid-template-columns: 226px minmax(0,1fr); gap: 25px; }.record-grid { grid-template-columns: 1fr; }.record-grid section + section { border-top: 1px solid #dce5eb; border-left: 0; }.record-grid p { -webkit-line-clamp: 3; } }
@media (max-width: 760px) { .hero-shell, .pipeline-shell, .library-shell { width: min(100% - 32px, 1180px); }.hero-shell { min-height: auto; padding: 34px 0 26px; grid-template-columns: 1fr; gap: 25px; }.hero-count { min-height: 112px; padding: 15px 18px; display: grid; grid-template-columns: 1fr auto; align-items: center; }.hero-count > span { grid-column: 1; }.hero-count strong { grid-column: 2; grid-row: 1 / 3; margin: 0; font-size: 63px; }.hero-count small { margin-top: 7px; }.hero-copy h1 { font-size: 37px; }.hero-copy > p { font-size: 14px; }.pipeline-shell { min-height: auto; grid-template-columns: 1fr 1fr; }.pipeline-step { min-height: 66px; padding: 12px; grid-template-columns: 25px 1fr; }.pipeline-step + .pipeline-step { padding-left: 12px; }.pipeline-step:nth-child(3) { border-left: 0; border-top: 1px solid rgba(142,194,222,.19); }.pipeline-step:nth-child(4) { border-top: 1px solid rgba(142,194,222,.19); }.pipeline-step > svg { display: none; }.library-shell { padding: 52px 0 70px; }.library-heading { grid-template-columns: 1fr; gap: 15px; }.browse-bar { align-items: flex-start; flex-direction: column; padding: 15px 0 18px; }.source-note { line-height: 1.5; }.catalog-layout { grid-template-columns: 1fr; }.taxonomy-panel { position: static; padding: 0 0 18px; border-right: 0; border-bottom: 1px solid #d7e2e9; overflow: hidden; }.taxonomy-title, .method-card { display: none; }.taxonomy-list { display: flex; padding-bottom: 5px; overflow-x: auto; scrollbar-width: none; }.taxonomy-list::-webkit-scrollbar { display: none; }.taxonomy-list button { width: auto; min-width: max-content; min-height: 39px; grid-template-columns: auto auto; border: 1px solid #d3e0e7; padding: 6px 10px; }.taxonomy-list small { display: none; }.search-row { grid-template-columns: 1fr; }.evidence-select select { width: 100%; }.workflow-record { grid-template-columns: 35px minmax(0,1fr); gap: 10px; padding: 25px 0; }.record-body > h3 { font-size: 19px; }.record-grid p { -webkit-line-clamp: 4; }.record-footer { align-items: flex-end; flex-direction: column; }.drawer-body { padding: 27px 20px 46px; }.source-section { grid-template-columns: auto minmax(0,1fr); }.source-section a { grid-column: 2; } }
@media (max-width: 440px) { .mode-switch { width: 100%; }.mode-switch button { padding: 0 10px; }.record-index span { display: none; }.record-grid section { padding: 14px 12px 16px; }.drawer-header { padding: 0 14px; }.drawer-header b { display: none; }.prompt-section { padding: 18px; } }
@media (prefers-reduced-motion: reduce) { * { scroll-behavior: auto !important; transition: none !important; } }

/* Keep the workflow library in the same visual system as the prompt library. */
.workflows-page { color: #161a1a; background: #f4f7f6; }
.workflow-hero { min-height: 430px; border-bottom: 1px solid #cfd6d3; color: #fff; background: #171b1b; }
.hero-grid { opacity: .16; background-image: linear-gradient(rgba(255,255,255,.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.16) 1px, transparent 1px); background-size: 42px 42px; mask-image: linear-gradient(90deg, #000, transparent 70%); }
.hero-shell { width: min(1280px, calc(100% - 48px)); min-height: 430px; padding: 48px 0 74px; grid-template-columns: minmax(420px,.92fr) minmax(460px,1.08fr); gap: 66px; }
.hero-copy { max-width: 640px; }
.hero-kicker { color: #bdf166; font-size: 12px; font-weight: 900; letter-spacing: .12em; }
.hero-kicker span { width: 8px; height: 8px; border-radius: 50%; background: #bdf166; box-shadow: 0 0 0 5px rgba(189,241,102,.12); }
.hero-copy h1 { max-width: 650px; margin-top: 20px; font-size: clamp(44px, 5.1vw, 68px); line-height: 1.02; }
.hero-copy > p { max-width: 620px; margin-top: 22px; color: rgba(255,255,255,.7); font-size: 17px; line-height: 1.75; }
.hero-actions { margin-top: 27px; display: flex; flex-wrap: wrap; gap: 10px; }
.hero-actions button { min-height: 44px; padding: 9px 16px; border: 1px solid rgba(255,255,255,.28); border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; color: #fff; background: transparent; font: inherit; font-size: 14px; font-weight: 850; cursor: pointer; }
.hero-actions .primary-action { border-color: #ff6746; color: #1d1210; background: #ff6746; }
.workflow-board { height: 282px; border: 1px solid rgba(255,255,255,.22); overflow: hidden; background: rgba(33,39,38,.82); box-shadow: 0 24px 60px rgba(0,0,0,.25); transform: rotate(-1deg); }
.board-head, .board-foot { min-height: 44px; padding: 0 16px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.board-head { border-bottom: 1px solid rgba(255,255,255,.15); color: rgba(255,255,255,.78); font-size: 12px; font-weight: 850; }
.board-head b { color: #bdf166; font: 800 10px ui-monospace, Consolas, monospace; }
.board-steps { display: grid; grid-template-columns: 1fr 1fr; }
.pipeline-step { min-height: 86px; padding: 15px 17px; grid-template-columns: 30px minmax(0,1fr) auto; gap: 10px; }
.pipeline-step + .pipeline-step { padding-left: 17px; border-left: 1px solid rgba(255,255,255,.12); }
.pipeline-step:nth-child(3) { border-left: 0; border-top: 1px solid rgba(255,255,255,.12); }
.pipeline-step:nth-child(4) { border-top: 1px solid rgba(255,255,255,.12); }
.pipeline-step > span { color: #bdf166; font-size: 12px; }.pipeline-step strong { font-size: 15px; }.pipeline-step small { margin-top: 6px; color: rgba(255,255,255,.48); font-size: 12px; }.pipeline-step > svg { color: #ff6746; }
.board-foot { min-height: 48px; border-top: 1px solid rgba(255,255,255,.15); color: rgba(255,255,255,.52); font-size: 11px; }
.board-foot i { width: 8px; height: 8px; border-radius: 50%; background: #bdf166; box-shadow: 0 0 0 5px rgba(189,241,102,.1); }
.hero-stats { position: absolute; right: 0; bottom: 0; left: 0; min-height: 58px; border-top: 1px solid rgba(255,255,255,.15); display: flex; align-items: center; }
.hero-stats div { min-width: 150px; display: flex; align-items: baseline; gap: 8px; padding-right: 30px; }.hero-stats strong { color: #fff; font-size: 21px; }.hero-stats span { color: rgba(255,255,255,.5); font-size: 12px; }
.library-shell { width: min(1280px, calc(100% - 48px)); padding: 28px 0 84px; scroll-margin-top: 112px; }
.catalog-head { min-height: 62px; display: flex; align-items: center; justify-content: space-between; gap: 30px; }
.catalog-head > p { max-width: 650px; margin: 0; color: #65716c; font-size: 14px; line-height: 1.65; text-align: right; }
.mode-switch { display: inline-flex; padding: 3px; border-color: #d0d7d4; background: #fff; }
.mode-switch button { min-height: 38px; padding: 7px 14px; color: #66716d; font-size: 13px; }
.mode-switch button.active { color: #fff; background: #1a1e1d; box-shadow: none; }
.catalog-layout { margin-top: 0; grid-template-columns: 220px minmax(0,1fr); gap: 26px; }
.taxonomy-panel { top: 96px; max-height: calc(100vh - 116px); padding-right: 8px; border-right: 0; overflow: auto; }
.taxonomy-title { min-height: 50px; border-bottom: 2px solid #1b201e; display: flex; align-items: center; justify-content: flex-start; gap: 8px; color: #1b201e; font-size: 14px; }
.taxonomy-list { margin-top: 0; padding: 8px 0; gap: 2px; }
.taxonomy-list button { min-height: 44px; padding: 8px; color: #59645f; font-size: 14px; }
.taxonomy-list button:hover { background: #e8edeb; }.taxonomy-list button.active { color: #151918; background: #dfe6e3; font-weight: 900; }
.taxonomy-list b { font-size: 14px; }.taxonomy-list small { margin-top: 4px; color: #7d8883; font-size: 11px; }.taxonomy-list em { color: #737f7a; font-size: 12px; }
.method-card { margin-top: 18px; padding: 15px; border: 1px solid #d2d9d6; border-radius: 6px; grid-template-columns: 20px 1fr; color: #15735f; background: #edf7f3; }
.method-card strong { color: #245f51; font-size: 13px; }.method-card p { margin-top: 6px; color: #5f716a; font-size: 12px; line-height: 1.65; }
.search-row { min-height: 54px; grid-template-columns: minmax(280px,1fr) 210px; gap: 8px; }
.search-box, .evidence-select { min-height: 46px; border-color: #ccd4d1; color: #78827e; }
.search-box:focus-within, .evidence-select:focus-within { border-color: #5e6a65; box-shadow: 0 0 0 3px rgba(40,56,50,.08); }
.search-box input { color: #1b201e; font-size: 14px; }.search-box kbd { font-size: 11px; }.evidence-select select { min-height: 44px; color: #4b5752; font-size: 13px; }
.results-head { min-height: 62px; border-bottom: 0; }.results-head span { color: #74807b; font-size: 12px; }.results-head h2 { color: #1b201e; font-size: 19px; }.results-head button { color: #65706c; font-size: 12px; }
.workflow-list { grid-template-columns: repeat(2,minmax(0,1fr)); align-items: stretch; gap: 16px; }
.workflow-record { min-width: 0; padding: 0; border: 1px solid #d3dad7; border-radius: 7px; overflow: hidden; display: flex; flex-direction: column; gap: 0; background: #fff; box-shadow: 0 2px 8px rgba(20,29,26,.035); transition: transform .2s, box-shadow .2s, border-color .2s; }
.workflow-record:hover { border-color: #adb8b3; box-shadow: 0 14px 30px rgba(20,29,26,.09); transform: translateY(-2px); }
.record-topline { min-height: 52px; padding: 0 20px; border-bottom: 1px solid #d9dfdc; display: flex; align-items: center; justify-content: space-between; gap: 14px; background: #fbfcfb; }
.record-index { flex-direction: row; align-items: baseline; gap: 6px; color: #79847f; }.record-index span { font-size: 10px; }.record-index strong { color: #1f2925; font-size: 17px; }
.record-meta { gap: 9px; color: #596660; font-size: 12px; }.record-meta b { padding: 4px 7px; font-size: 10px; background: #fff; }
.record-body { min-height: 660px; padding: 22px; display: flex; flex-direction: column; }
.record-body > h3 { max-width: none; margin: 0; color: #171d1b; font-size: 22px; line-height: 1.42; }
.record-roles { min-height: 42px; margin-top: 11px; align-items: flex-start; flex-wrap: wrap; color: #68746f; font-size: 13px; line-height: 1.55; }.record-roles i { width: 3px; height: 3px; margin: 8px 2px 0; border-radius: 50%; background: #a6b0ac; }
.record-grid { margin-top: 16px; border-top: 1px solid #dce2df; border-bottom: 0; display: block; }
.record-grid section { padding: 15px 0; }.record-grid section + section { border-top: 1px solid #e1e6e4; border-left: 0; }
.record-label { color: #405c52; font-size: 12px; }.record-label svg { color: #15735f; }
.record-grid p { margin-top: 9px; color: #505d58; font-size: 14px; line-height: 1.78; -webkit-line-clamp: 3; }.record-grid section:nth-child(2) p { -webkit-line-clamp: 4; }.record-grid section:nth-child(3) p { -webkit-line-clamp: 4; }
.record-footer { min-height: 48px; margin-top: auto; padding-top: 14px; border-top: 1px solid #e1e6e4; color: #7b8681; font-size: 11px; }
.record-footer button { min-height: 40px; padding: 0 12px; border: 1px solid #202523; border-radius: 5px; color: #fff; background: #202523; font-size: 12px; }
.empty-state { min-height: 420px; border: 1px dashed #c5ceca; border-radius: 7px; background: #fff; }.empty-state h3 { color: #303936; font-size: 20px; }.empty-state p { font-size: 14px; }
.load-more { min-height: 46px; margin: 26px auto 0; padding: 9px 15px; border: 1px solid #bfc8c4; border-radius: 6px; display: flex; align-items: center; gap: 8px; color: #303a36; background: #fff; font: inherit; font-size: 13px; font-weight: 850; cursor: pointer; }.load-more span { min-width: 25px; padding: 3px 6px; border-radius: 4px; color: #5a6561; background: #e8edeb; font-size: 10px; }
.workflow-drawer { width: min(720px, 100vw); color: #26332e; background: #f5f7f6; }.drawer-header { min-height: 62px; border-color: #d1d8d5; background: rgba(250,251,250,.95); }.drawer-header span { color: #4f5b56; font-size: 12px; }.drawer-header b { color: #68746f; font-size: 12px; }.drawer-body { padding: 36px 40px 60px; }.drawer-title h2 { color: #18201d; font-size: 38px; }.drawer-title > p { color: #64716b; font-size: 14px; }
.drawer-sections section { padding: 26px 0; grid-template-columns: 40px minmax(0,1fr); }.drawer-sections section > span { color: #15735f; font-size: 12px; }.drawer-sections h3 { color: #315e50; font-size: 14px; }.drawer-sections p { color: #495852; font-size: 16px; line-height: 1.85; }
.prompt-section { border-color: #ccd4d1; }.prompt-heading { color: #15735f; }.prompt-heading h3 { color: #1f332b; font-size: 21px; }.prompt-section > p { color: #66756f; font-size: 13px; }.prompt-section pre { max-height: none; overflow: visible; color: #d8e1dd; background: #202523; font-size: 13px; line-height: 1.78; }.prompt-section > button { min-height: 42px; color: #fff; background: #202523; font-size: 13px; }
.source-section span { font-size: 11px; }.source-section strong { font-size: 14px; }.source-section p { font-size: 12px; }.source-section a { font-size: 12px; }
.workflows-page button:focus-visible, .workflows-page a:focus-visible, .workflows-page input:focus-visible, .workflows-page select:focus-visible { outline: 3px solid rgba(255,103,70,.35); outline-offset: 2px; }

@media (max-width: 1080px) {
  .hero-shell { grid-template-columns: minmax(360px,.9fr) minmax(400px,1.1fr); gap: 36px; }
  .workflow-list { grid-template-columns: 1fr; }.record-body { min-height: auto; }
}
@media (max-width: 820px) {
  .hero-shell, .library-shell { width: min(100% - 32px, 1280px); }
  .hero-shell { min-height: 720px; padding: 40px 0 92px; grid-template-columns: 1fr; gap: 30px; }
  .workflow-hero { min-height: 720px; }.hero-copy { max-width: 720px; }.hero-copy h1 { font-size: 48px; }.workflow-board { height: 250px; transform: none; }
  .hero-stats div { min-width: 0; flex: 1; padding-right: 10px; }
  .catalog-head { min-height: auto; padding: 14px 0 18px; align-items: flex-start; flex-direction: column; gap: 12px; }.catalog-head > p { text-align: left; }
  .catalog-layout { grid-template-columns: 1fr; gap: 14px; }.taxonomy-panel { position: static; max-height: none; padding: 0; overflow: hidden; }.taxonomy-title, .method-card { display: none; }
  .taxonomy-list { display: flex; gap: 7px; overflow-x: auto; scrollbar-width: none; }.taxonomy-list::-webkit-scrollbar { display: none; }.taxonomy-list button { width: auto; min-width: max-content; grid-template-columns: auto auto; border: 1px solid #d2d9d6; padding: 8px 11px; background: #fff; }.taxonomy-list small { display: none; }
}
@media (max-width: 590px) {
  .hero-shell, .library-shell { width: min(100% - 28px, 1280px); }.hero-shell { min-height: 650px; padding: 28px 0 78px; gap: 22px; }.workflow-hero { min-height: 650px; }
  .hero-copy h1 { margin-top: 17px; font-size: 39px; }.hero-copy > p { margin-top: 15px; font-size: 15px; }.hero-actions { margin-top: 22px; }.hero-actions button { flex: 1; }
  .workflow-board { height: 190px; }.board-head { min-height: 38px; padding: 0 12px; }.board-head span { max-width: 190px; }.pipeline-step { min-height: 56px; padding: 8px 11px; grid-template-columns: 23px minmax(0,1fr); }.pipeline-step + .pipeline-step { padding-left: 11px; }.pipeline-step > svg { display: none; }.pipeline-step strong { font-size: 13px; }.pipeline-step small { margin-top: 3px; font-size: 10px; }.board-foot { min-height: 39px; padding: 0 12px; }
  .hero-stats strong { font-size: 18px; }.hero-stats span { font-size: 10px; }
  .mode-switch { width: 100%; }.mode-switch button { flex: 1; }.search-row { grid-template-columns: 1fr; }.evidence-select select { width: 100%; }
  .record-body { padding: 19px; }.record-topline { padding: 0 17px; }.record-body > h3 { font-size: 21px; }.record-grid p { font-size: 14px; -webkit-line-clamp: 4; }.record-footer { align-items: stretch; flex-direction: column; }.record-footer button { width: 100%; justify-content: center; }
  .drawer-body { padding: 28px 20px 48px; }.drawer-title h2 { font-size: 31px; }.drawer-sections p { font-size: 15px; }.prompt-section { padding: 19px; }.prompt-section pre { font-size: 12px; }
}
</style>
