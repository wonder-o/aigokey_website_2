<template>
  <div class="prompt-page">
    <SiteHeader v-if="!embedded" @trial="$router.push('/free-trial')" />

    <main>
      <section class="library-intro">
        <div class="intro-grid" aria-hidden="true"></div>
        <div class="intro-shell">
          <div class="intro-copy">
            <div class="model-line"><span></span>GPT IMAGE 2 · CURATED INDEX</div>
            <h1>{{ copy.title }}</h1>
            <p>{{ copy.subtitle }}</p>
            <div class="intro-actions">
              <a class="primary-action" href="#catalog"><Search :size="17" />{{ copy.explore }}</a>
              <button type="button" @click="openRandom"><Shuffle :size="17" />{{ copy.random }}</button>
            </div>
          </div>

          <div class="contact-sheet">
            <button v-for="prompt in heroPrompts" :key="prompt.id" type="button" @click="openDetail(prompt)">
              <img :src="prompt.image" :alt="prompt.title" />
              <span>{{ prompt.number }}</span>
            </button>
          </div>

          <div class="intro-stats" :aria-label="copy.statsLabel">
            <div><strong>{{ catalog.prompts.length }}</strong><span>{{ copy.examples }}</span></div>
            <div><strong>{{ categoryItems.length - 1 }}</strong><span>{{ copy.categories }}</span></div>
            <div><strong>{{ professionItems.length - 1 }}</strong><span>{{ copy.professions }}</span></div>
          </div>
        </div>
      </section>

      <section id="catalog" class="catalog-shell">
        <div class="catalog-head">
          <div class="browse-switch" role="tablist" :aria-label="copy.browseBy">
            <button :class="{ active: browseMode === 'category' }" type="button" role="tab" :aria-selected="browseMode === 'category'" @click="setBrowseMode('category')">
              <LayoutGrid :size="16" />{{ copy.byCategory }}
            </button>
            <button :class="{ active: browseMode === 'profession' }" type="button" role="tab" :aria-selected="browseMode === 'profession'" @click="setBrowseMode('profession')">
              <BriefcaseBusiness :size="16" />{{ copy.byProfession }}
            </button>
          </div>
          <p>{{ copy.guide }}</p>
        </div>

        <div class="workspace" :class="{ 'profession-workspace': browseMode === 'profession' }">
          <aside class="filter-rail" :aria-label="copy.filters">
            <div class="rail-title"><SlidersHorizontal :size="16" />{{ browseMode === 'category' ? copy.categories : copy.professions }}</div>
            <div class="filter-list" :class="{ 'profession-list': browseMode === 'profession' }">
              <button v-for="item in activeFilterItems" :key="item.id" type="button" :class="{ active: selectedFilter === item.id, 'without-color': !item.color }" @click="selectFilter(item.id)">
                <i v-if="item.color" :style="{ background: item.color }"></i>
                <span>{{ item.label }}</span>
                <b>{{ item.count }}</b>
              </button>
            </div>
            <div class="source-note">
              <BadgeCheck :size="18" />
              <div><strong>{{ copy.sourceTitle }}</strong><span>{{ copy.sourceCopy }}</span></div>
            </div>
          </aside>

          <div class="results-panel">
            <div class="toolbar">
              <label class="search-field">
                <Search :size="18" />
                <input ref="searchInput" v-model="query" type="search" :placeholder="copy.search" />
                <kbd>/</kbd>
              </label>
              <label class="select-field">
                <Ratio :size="15" />
                <select v-model="ratioFilter" :aria-label="copy.ratio">
                  <option value="all">{{ copy.allRatios }}</option>
                  <option v-for="ratio in ratioOptions" :key="ratio" :value="ratio">{{ ratio }}</option>
                </select>
                <ChevronDown :size="14" />
              </label>
              <label class="select-field">
                <SwatchBook :size="15" />
                <select v-model="styleFilter" :aria-label="copy.style">
                  <option value="all">{{ copy.allStyles }}</option>
                  <option v-for="style in styleOptions" :key="style" :value="style">{{ style }}</option>
                </select>
                <ChevronDown :size="14" />
              </label>
            </div>

            <div class="result-line">
              <div><strong>{{ currentFilterLabel }}</strong><span>{{ filteredPrompts.length }} {{ copy.results }}</span></div>
              <button v-if="hasFilters" type="button" @click="clearFilters"><RotateCcw :size="14" />{{ copy.clear }}</button>
            </div>

            <div v-if="visiblePrompts.length" class="prompt-grid">
              <article v-for="prompt in visiblePrompts" :key="prompt.id" class="prompt-card">
                <button class="image-button" type="button" @click="openDetail(prompt)">
                  <img :src="prompt.image" :alt="prompt.title" loading="lazy" />
                  <span class="card-number">{{ prompt.number }}</span>
                  <span class="image-expand"><Maximize2 :size="16" /></span>
                </button>
                <div class="card-body">
                  <div class="card-label"><i :style="{ background: prompt.color }"></i>{{ prompt.categoryLabel }}<span>{{ prompt.ratio }}</span></div>
                  <h2>{{ prompt.title }}</h2>
                  <p>{{ prompt.description }}</p>
                  <div class="tag-row"><span>{{ prompt.profession }}</span><span>{{ prompt.style }}</span></div>
                  <div class="prompt-preview">{{ localizedPrompt(prompt) }}</div>
                  <div class="card-actions">
                    <button type="button" :title="copy.copy" @click="copyPrompt(prompt)"><Copy :size="16" /><span>{{ copy.copy }}</span></button>
                    <button type="button" :title="copy.details" @click="openDetail(prompt)"><PanelRightOpen :size="16" /><span>{{ copy.details }}</span></button>
                  </div>
                </div>
              </article>
            </div>

            <div v-else class="empty-state">
              <SearchX :size="28" />
              <h2>{{ copy.emptyTitle }}</h2>
              <p>{{ copy.emptyCopy }}</p>
              <button type="button" @click="clearFilters">{{ copy.clear }}</button>
            </div>

            <button v-if="hasMore" class="load-more" type="button" @click="visibleCount += 24">
              <Plus :size="17" />{{ copy.loadMore }}<span>{{ filteredPrompts.length - visiblePrompts.length }}</span>
            </button>
          </div>
        </div>
      </section>

      <section class="source-band">
        <div>
          <div><FileCheck2 :size="20" /><strong>{{ copy.licenseTitle }}</strong></div>
          <p>{{ catalog.source.note }}</p>
        </div>
        <a :href="catalog.source.url" target="_blank" rel="noopener">{{ copy.viewSource }}<ArrowUpRight :size="16" /></a>
      </section>
    </main>

    <SiteFooter v-if="!embedded" />

    <Teleport to="body">
      <div v-if="selectedPrompt" class="drawer-layer" @click.self="closeDetail">
        <aside ref="drawerRef" class="prompt-drawer" role="dialog" aria-modal="true" tabindex="-1" :aria-labelledby="`prompt-title-${selectedPrompt.id}`">
          <div class="drawer-bar">
            <div><span :style="{ background: selectedPrompt.color }"></span>{{ selectedPrompt.categoryLabel }} · {{ selectedPrompt.number }}</div>
            <button type="button" :title="copy.close" @click="closeDetail"><X :size="20" /></button>
          </div>
          <div class="drawer-image"><img :src="selectedPrompt.image" :alt="selectedPrompt.title" /></div>
          <div class="drawer-content">
            <div class="drawer-meta"><span>{{ selectedPrompt.profession }}</span><span>{{ selectedPrompt.style }}</span><span>{{ selectedPrompt.ratio }}</span><span>{{ promptLanguageLabel }}</span></div>
            <h2 :id="`prompt-title-${selectedPrompt.id}`">{{ selectedPrompt.title }}</h2>
            <p class="drawer-description">{{ selectedPrompt.description }}</p>

            <section class="prompt-section">
              <div><strong>{{ copy.promptLabel }}</strong><button type="button" @click="copyPrompt(selectedPrompt)"><Copy :size="15" />{{ copiedId === selectedPrompt.id ? copy.copied : copy.copy }}</button></div>
              <pre>{{ localizedPrompt(selectedPrompt) }}</pre>
            </section>

            <div class="drawer-actions">
              <button type="button" @click="copyPrompt(selectedPrompt)"><Copy :size="17" />{{ copiedId === selectedPrompt.id ? copy.copied : copy.copyPrompt }}</button>
              <router-link to="/image-creation"><Sparkles :size="17" />{{ copy.create }}</router-link>
            </div>

            <div class="attribution">
              <div><span>{{ copy.creator }}</span><a :href="selectedPrompt.authorUrl" target="_blank" rel="noopener">{{ selectedPrompt.author }}<ArrowUpRight :size="13" /></a></div>
              <div><span>{{ copy.original }}</span><a :href="selectedPrompt.sourceUrl" target="_blank" rel="noopener">{{ selectedPrompt.source }}<ArrowUpRight :size="13" /></a></div>
              <div><span>{{ copy.license }}</span><a :href="catalog.source.licenseUrl" target="_blank" rel="noopener">{{ catalog.source.license }}<ArrowUpRight :size="13" /></a></div>
            </div>
          </div>
        </aside>
      </div>
    </Teleport>

    <Transition name="toast"><div v-if="toastVisible" class="copy-toast"><Check :size="17" />{{ copy.copied }}</div></Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useHead } from '@unhead/vue'
import {
  ArrowUpRight, BadgeCheck, BriefcaseBusiness, Check, ChevronDown, Copy, FileCheck2, LayoutGrid,
  Maximize2, PanelRightOpen, Plus, Ratio, RotateCcw, Search, SearchX, Shuffle, SlidersHorizontal,
  Sparkles, SwatchBook, X,
} from '@lucide/vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import { toTraditionalText, useI18n } from '@/composables/useI18n'
import catalogData from '@/data/image-prompts.json'

type PromptItem = (typeof catalogData.prompts)[number]
type BrowseMode = 'category' | 'profession'
type FilterItem = { id: string; label: string; count: number; color?: string }

withDefaults(defineProps<{
  embedded?: boolean
}>(), {
  embedded: false,
})

const { lang } = useI18n()
const catalog = catalogData
const browseMode = ref<BrowseMode>('category')
const selectedFilter = ref('all')
const query = ref('')
const ratioFilter = ref('all')
const styleFilter = ref('all')
const visibleCount = ref(24)
const selectedPrompt = ref<PromptItem | null>(null)
const copiedId = ref('')
const toastVisible = ref(false)
const searchInput = ref<HTMLInputElement | null>(null)
const drawerRef = ref<HTMLElement | null>(null)
let toastTimer: ReturnType<typeof setTimeout> | undefined

const copies = {
  zh: {
    metaTitle: 'GPT Image 2 提示词库', metaDescription: '300 个 GPT Image 2 提示词与图片案例，按创作类别和职业岗位筛选。',
    title: 'GPT Image 2 提示词库', subtitle: '从公开社区案例中筛选 300 组提示词与对应生成图，按创作类别和职业用途重新索引。', explore: '浏览素材', random: '随机灵感',
    statsLabel: '提示词库数据', examples: '图文案例', categories: '创作类别', professions: '职业岗位', browseBy: '浏览方式', byCategory: '按类别', byProfession: '按职业',
    guide: '从用途出发选案例，保留结构，再替换主体、文案和品牌约束。', filters: '提示词筛选', sourceTitle: '真实社区案例', sourceCopy: '保留原创作者与帖子来源',
    search: '搜索主题、风格、职业或提示词', ratio: '画幅比例', allRatios: '全部画幅', style: '视觉风格', allStyles: '全部风格', results: '个案例', clear: '清除筛选', all: '全部案例',
    copy: '复制', details: '查看详情', emptyTitle: '没有匹配的案例', emptyCopy: '换一个关键词，或者清除画幅和风格筛选。', loadMore: '继续加载',
    licenseTitle: '来源与使用说明', viewSource: '查看原始图库', close: '关闭', promptLabel: '完整提示词', copied: '已复制提示词', copyPrompt: '复制完整提示词', create: '查看图像创作',
    creator: '创作者', original: '原始帖子', license: '素材许可',
  },
  en: {
    metaTitle: 'GPT Image 2 Prompt Library', metaDescription: '300 GPT Image 2 prompts with generated examples, indexed by creative category and profession.',
    title: 'GPT Image 2 Prompt Library', subtitle: '300 prompt-and-output pairs curated from public community examples, re-indexed by creative category and professional use.', explore: 'Explore library', random: 'Random idea',
    statsLabel: 'Library statistics', examples: 'prompt examples', categories: 'categories', professions: 'professions', browseBy: 'Browse prompts', byCategory: 'By category', byProfession: 'By profession',
    guide: 'Start from a use case, keep the structure, then replace the subject, copy, and brand constraints.', filters: 'Prompt filters', sourceTitle: 'Real community examples', sourceCopy: 'Creator and original post links retained',
    search: 'Search topic, style, profession, or prompt', ratio: 'Aspect ratio', allRatios: 'All ratios', style: 'Visual style', allStyles: 'All styles', results: 'examples', clear: 'Clear filters', all: 'All examples',
    copy: 'Copy', details: 'View details', emptyTitle: 'No matching examples', emptyCopy: 'Try another keyword or clear the ratio and style filters.', loadMore: 'Load more',
    licenseTitle: 'Source and usage', viewSource: 'View source library', close: 'Close', promptLabel: 'Full prompt', copied: 'Prompt copied', copyPrompt: 'Copy full prompt', create: 'Image creation guide',
    creator: 'Creator', original: 'Original post', license: 'Asset license',
  },
}

const traditionalCopy = Object.fromEntries(
  Object.entries(copies.zh).map(([key, value]) => [key, toTraditionalText(value)]),
) as typeof copies.zh

const copy = computed(() => {
  if (lang.value === 'en') return copies.en
  if (lang.value === 'zh-TW') return traditionalCopy
  return copies.zh
})

const promptLanguageLabel = computed(() => {
  if (lang.value === 'en') return 'English'
  if (lang.value === 'zh-TW') return '繁體中文'
  return '简体中文'
})

const localizedPrompts = computed(() => new Map(catalog.prompts.map((prompt) => {
  if (lang.value === 'en') return [prompt.id, prompt.promptEn]
  if (lang.value === 'zh-TW') return [prompt.id, toTraditionalText(prompt.promptZh)]
  return [prompt.id, prompt.promptZh]
})))

function localizedPrompt(prompt: PromptItem) {
  return localizedPrompts.value.get(prompt.id) || prompt.promptZh
}

useHead(computed(() => ({
  title: `${copy.value.metaTitle} | AigoKey`,
  meta: [
    { name: 'description', content: copy.value.metaDescription },
    { name: 'keywords', content: 'GPT Image 2, image prompts, AI image generation, prompt library, AigoKey' },
  ],
})))

const categoryItems = computed<FilterItem[]>(() => {
  const items = new Map<string, FilterItem>()
  for (const prompt of catalog.prompts) {
    const current = items.get(prompt.category)
    if (current) current.count += 1
    else items.set(prompt.category, { id: prompt.category, label: prompt.categoryLabel, count: 1, color: prompt.color })
  }
  return [{ id: 'all', label: copy.value.all, count: catalog.prompts.length }, ...items.values()]
})

const professionItems = computed<FilterItem[]>(() => {
  const counts = new Map<string, number>()
  for (const prompt of catalog.prompts) counts.set(prompt.profession, (counts.get(prompt.profession) || 0) + 1)
  return [{ id: 'all', label: copy.value.all, count: catalog.prompts.length }, ...[...counts].map(([label, count]) => ({ id: label, label, count, color: undefined }))]
})

const activeFilterItems = computed(() => browseMode.value === 'category' ? categoryItems.value : professionItems.value)
const ratioOptions = computed(() => [...new Set(catalog.prompts.map((prompt) => prompt.ratio))])
const styleOptions = computed(() => [...new Set(catalog.prompts.map((prompt) => prompt.style))])
const heroPrompts = computed(() => [catalog.prompts[0], catalog.prompts[74], catalog.prompts[149], catalog.prompts[224], catalog.prompts[299]])

const filteredPrompts = computed(() => {
  const normalizedQuery = query.value.trim().toLocaleLowerCase()
  return catalog.prompts.filter((prompt) => {
    const modeMatch = selectedFilter.value === 'all' || (browseMode.value === 'category' ? prompt.category === selectedFilter.value : prompt.profession === selectedFilter.value)
    const ratioMatch = ratioFilter.value === 'all' || prompt.ratio === ratioFilter.value
    const styleMatch = styleFilter.value === 'all' || prompt.style === styleFilter.value
    const queryMatch = !normalizedQuery || [prompt.title, prompt.description, localizedPrompt(prompt), prompt.profession, prompt.categoryLabel, ...prompt.tags].join(' ').toLocaleLowerCase().includes(normalizedQuery)
    return modeMatch && ratioMatch && styleMatch && queryMatch
  })
})

const visiblePrompts = computed(() => filteredPrompts.value.slice(0, visibleCount.value))
const hasMore = computed(() => visiblePrompts.value.length < filteredPrompts.value.length)
const hasFilters = computed(() => selectedFilter.value !== 'all' || query.value || ratioFilter.value !== 'all' || styleFilter.value !== 'all')
const currentFilterLabel = computed(() => activeFilterItems.value.find((item) => item.id === selectedFilter.value)?.label || copy.value.all)

watch([query, ratioFilter, styleFilter], () => { visibleCount.value = 24 })

function setBrowseMode(mode: BrowseMode) {
  browseMode.value = mode
  selectedFilter.value = 'all'
  visibleCount.value = 24
}

function selectFilter(id: string) {
  selectedFilter.value = id
  visibleCount.value = 24
}

function clearFilters() {
  selectedFilter.value = 'all'
  query.value = ''
  ratioFilter.value = 'all'
  styleFilter.value = 'all'
  visibleCount.value = 24
}

function openDetail(prompt: PromptItem) {
  selectedPrompt.value = prompt
  document.body.style.overflow = 'hidden'
  nextTick(() => drawerRef.value?.focus())
}

function openRandom() {
  openDetail(catalog.prompts[Math.floor(Math.random() * catalog.prompts.length)])
}

function closeDetail() {
  selectedPrompt.value = null
  document.body.style.overflow = ''
}

async function copyPrompt(prompt: PromptItem) {
  await navigator.clipboard.writeText(localizedPrompt(prompt))
  copiedId.value = prompt.id
  toastVisible.value = true
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toastVisible.value = false
    copiedId.value = ''
  }, 1800)
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && selectedPrompt.value) closeDetail()
  if (event.key === '/' && !(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement)) {
    event.preventDefault()
    searchInput.value?.focus()
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
  if (toastTimer) clearTimeout(toastTimer)
})
</script>

<style scoped>
.prompt-page { min-height: 100vh; color: #161a1a; background: #f4f7f6; }
.library-intro { min-height: 392px; position: relative; overflow: hidden; border-bottom: 1px solid #cfd6d3; color: #fff; background: #171b1b; }
.intro-grid { position: absolute; inset: 0; opacity: .16; background-image: linear-gradient(rgba(255,255,255,.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.16) 1px, transparent 1px); background-size: 42px 42px; mask-image: linear-gradient(90deg, #000, transparent 66%); }
.intro-shell { width: min(1280px, calc(100% - 48px)); min-height: 392px; margin: 0 auto; position: relative; display: grid; grid-template-columns: minmax(390px,.9fr) minmax(460px,1.1fr); align-items: center; gap: 58px; padding: 48px 0 74px; }
.model-line { display: flex; align-items: center; gap: 9px; color: #bdf166; font-size: 11px; font-weight: 900; letter-spacing: .12em; }
.model-line span { width: 8px; height: 8px; border-radius: 50%; background: #bdf166; box-shadow: 0 0 0 5px rgba(189,241,102,.12); }
.intro-copy h1 { max-width: 620px; margin: 20px 0 0; font-size: clamp(42px, 5.2vw, 68px); line-height: 1; letter-spacing: 0; }
.intro-copy p { max-width: 610px; margin: 22px 0 0; color: rgba(255,255,255,.67); font-size: 16px; line-height: 1.75; }
.intro-actions { margin-top: 26px; display: flex; flex-wrap: wrap; gap: 10px; }
.intro-actions a, .intro-actions button { min-height: 42px; padding: 9px 15px; border: 1px solid rgba(255,255,255,.28); border-radius: 6px; display: inline-flex; align-items: center; gap: 8px; color: #fff; background: transparent; font: inherit; font-size: 13px; font-weight: 850; cursor: pointer; }
.intro-actions .primary-action { border-color: #ff6746; color: #1d1210; background: #ff6746; }
.contact-sheet { height: 246px; display: grid; grid-template-columns: repeat(5, 1fr); gap: 7px; transform: rotate(-2deg); }
.contact-sheet button { min-width: 0; padding: 0; border: 0; position: relative; overflow: hidden; background: #292f2e; cursor: pointer; }
.contact-sheet button:nth-child(2), .contact-sheet button:nth-child(4) { transform: translateY(18px); }
.contact-sheet img { width: 100%; height: 100%; display: block; object-fit: cover; filter: saturate(.88); transition: filter .25s, transform .35s; }
.contact-sheet button:hover img { filter: saturate(1.08); transform: scale(1.045); }
.contact-sheet span { position: absolute; right: 6px; bottom: 6px; padding: 3px 5px; color: #111; background: #bdf166; font: 800 9px/1 ui-monospace, monospace; }
.intro-stats { position: absolute; right: 0; bottom: 0; left: 0; min-height: 56px; display: flex; align-items: center; gap: 0; border-top: 1px solid rgba(255,255,255,.15); }
.intro-stats div { min-width: 150px; display: flex; align-items: baseline; gap: 8px; padding-right: 28px; }
.intro-stats strong { color: #fff; font-size: 20px; }
.intro-stats span { color: rgba(255,255,255,.48); font-size: 11px; }
.catalog-shell { width: min(1280px, calc(100% - 48px)); margin: 0 auto; padding: 28px 0 76px; scroll-margin-top: 118px; }
.catalog-head { min-height: 58px; display: flex; align-items: center; justify-content: space-between; gap: 30px; }
.catalog-head > p { max-width: 610px; margin: 0; color: #6c7773; font-size: 12px; line-height: 1.6; text-align: right; }
.browse-switch { display: inline-flex; padding: 3px; border: 1px solid #d0d7d4; border-radius: 7px; background: #fff; }
.browse-switch button { min-height: 35px; padding: 7px 12px; border: 0; border-radius: 5px; display: inline-flex; align-items: center; gap: 7px; color: #66716d; background: transparent; font: inherit; font-size: 12px; font-weight: 800; cursor: pointer; }
.browse-switch button.active { color: #fff; background: #1a1e1d; }
.workspace { display: grid; grid-template-columns: 220px minmax(0,1fr); gap: 26px; }
.workspace.profession-workspace { grid-template-columns: 260px minmax(0,1fr); }
.filter-rail { position: sticky; top: 96px; align-self: start; max-height: calc(100vh - 116px); padding-right: 10px; overflow: auto; scrollbar-gutter: stable; scrollbar-width: thin; scrollbar-color: #bcc6c2 transparent; }
.rail-title { min-height: 48px; display: flex; align-items: center; gap: 8px; border-bottom: 2px solid #1b201e; font-size: 13px; font-weight: 900; }
.filter-list { padding: 8px 0; display: grid; gap: 2px; }
.filter-list button { min-height: 40px; width: 100%; padding: 8px; border: 0; border-radius: 5px; display: grid; grid-template-columns: 8px minmax(0,1fr) auto; align-items: center; gap: 9px; color: #59645f; background: transparent; font: inherit; font-size: 13px; line-height: 1.35; text-align: left; cursor: pointer; }
.filter-list button.without-color { grid-template-columns: minmax(0,1fr) auto; }
.filter-list button i { width: 7px; height: 7px; border-radius: 2px; background: #c6ceca; }
.filter-list button span { min-width: 0; overflow-wrap: anywhere; }
.filter-list button b { color: #7d8883; font-size: 11px; }
.profession-list button.without-color { min-height: 44px; padding: 9px 9px 9px 12px; grid-template-columns: minmax(0,1fr) minmax(28px,auto); gap: 12px; }
.profession-list button span { font-size: 14px; line-height: 1.45; overflow-wrap: break-word; word-break: normal; }
.profession-list button b { min-width: 28px; padding: 2px 6px; border-radius: 999px; background: #e7ecea; font-size: 11px; line-height: 1.35; text-align: center; }
.filter-list button:hover { background: #e8edeb; }
.filter-list button.active { color: #151918; background: #dfe6e3; font-weight: 900; }
.filter-list button.active b { color: #151918; }
.profession-list button.active b { background: #fff; }
.source-note { margin-top: 18px; padding: 14px; border: 1px solid #d2d9d6; border-radius: 6px; display: grid; grid-template-columns: 19px 1fr; gap: 9px; color: #15735f; background: #edf7f3; }
.source-note strong, .source-note span { display: block; }
.source-note strong { font-size: 12px; }
.source-note span { margin-top: 4px; color: #66756f; font-size: 11px; line-height: 1.55; }
.toolbar { min-height: 52px; display: grid; grid-template-columns: minmax(260px,1fr) 150px 170px; gap: 8px; }
.search-field, .select-field { min-width: 0; min-height: 42px; padding: 0 12px; border: 1px solid #ccd4d1; border-radius: 6px; display: flex; align-items: center; gap: 8px; color: #78827e; background: #fff; }
.search-field:focus-within, .select-field:focus-within { border-color: #5e6a65; box-shadow: 0 0 0 3px rgba(40,56,50,.08); }
.search-field input { min-width: 0; flex: 1; border: 0; outline: 0; color: #1b201e; background: transparent; font: inherit; font-size: 12px; }
.search-field kbd { padding: 2px 6px; border: 1px solid #d5dcda; border-radius: 4px; color: #8c9692; background: #f4f6f5; font-size: 10px; }
.select-field { position: relative; }
.select-field select { min-width: 0; width: 100%; border: 0; outline: 0; appearance: none; color: #4b5752; background: transparent; font: inherit; font-size: 11px; font-weight: 750; cursor: pointer; }
.select-field > svg:last-child { pointer-events: none; }
.result-line { min-height: 54px; display: flex; align-items: center; justify-content: space-between; gap: 15px; }
.result-line > div { display: flex; align-items: baseline; gap: 8px; }
.result-line strong { font-size: 16px; }
.result-line span { color: #74807b; font-size: 11px; }
.result-line button { padding: 5px 0; border: 0; display: inline-flex; align-items: center; gap: 5px; color: #65706c; background: transparent; font: inherit; font-size: 11px; font-weight: 800; cursor: pointer; }
.prompt-grid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 14px; }
.prompt-card { min-width: 0; border: 1px solid #d3dad7; border-radius: 7px; overflow: hidden; display: flex; flex-direction: column; background: #fff; box-shadow: 0 2px 8px rgba(20,29,26,.035); transition: transform .2s, box-shadow .2s, border-color .2s; }
.prompt-card:hover { border-color: #adb8b3; box-shadow: 0 14px 30px rgba(20,29,26,.09); transform: translateY(-2px); }
.image-button { width: 100%; aspect-ratio: 4 / 3; padding: 0; border: 0; position: relative; overflow: hidden; background: #e5e9e7; cursor: zoom-in; }
.image-button img { width: 100%; height: 100%; display: block; object-fit: cover; transition: transform .35s; }
.prompt-card:hover .image-button img { transform: scale(1.025); }
.card-number { position: absolute; top: 8px; left: 8px; padding: 4px 6px; border-radius: 3px; color: #fff; background: rgba(20,24,23,.78); font: 800 9px/1 ui-monospace, monospace; backdrop-filter: blur(6px); }
.image-expand { width: 30px; height: 30px; position: absolute; right: 8px; bottom: 8px; border-radius: 5px; display: grid; place-items: center; color: #171b1a; background: rgba(255,255,255,.9); opacity: 0; transform: translateY(4px); transition: opacity .2s, transform .2s; }
.image-button:hover .image-expand { opacity: 1; transform: none; }
.card-body { min-height: 314px; padding: 17px; display: flex; flex-direction: column; }
.card-label { min-height: 20px; display: flex; align-items: center; gap: 7px; color: #5d6864; font-size: 11px; font-weight: 850; }
.card-label i { width: 7px; height: 7px; border-radius: 2px; }
.card-label span { margin-left: auto; color: #8b9591; font-family: ui-monospace, monospace; }
.card-body h2 { margin: 9px 0 0; font-size: 18px; line-height: 1.4; letter-spacing: 0; }
.card-body > p { min-height: 62px; margin: 9px 0 0; color: #596560; font-size: 13px; line-height: 1.65; }
.tag-row { margin-top: 10px; display: flex; flex-wrap: wrap; gap: 6px; }
.tag-row span { padding: 5px 7px; border-radius: 4px; color: #4f5b56; background: #edf1ef; font-size: 11px; }
.prompt-preview { height: 72px; margin-top: 11px; padding: 10px 11px; overflow: hidden; border-left: 2px solid #bfc9c5; color: #66716d; background: #f6f8f7; font: 11px/1.65 ui-monospace, SFMono-Regular, Consolas, monospace; }
.card-actions { margin-top: auto; padding-top: 12px; display: grid; grid-template-columns: 1fr 1fr; gap: 7px; }
.card-actions button { min-height: 38px; border: 1px solid #d0d7d4; border-radius: 5px; display: flex; align-items: center; justify-content: center; gap: 6px; color: #48534f; background: #fff; font: inherit; font-size: 12px; font-weight: 850; cursor: pointer; }
.card-actions button:first-child { border-color: #202523; color: #fff; background: #202523; }
.empty-state { min-height: 420px; border: 1px dashed #c5ceca; border-radius: 7px; display: grid; place-items: center; align-content: center; gap: 9px; color: #7b8681; background: #fff; text-align: center; }
.empty-state h2, .empty-state p { margin: 0; }
.empty-state h2 { color: #303936; font-size: 17px; }
.empty-state p { max-width: 400px; font-size: 11px; }
.empty-state button { min-height: 34px; padding: 7px 12px; border: 1px solid #ccd4d1; border-radius: 5px; color: #39443f; background: #fff; font: inherit; font-size: 10px; font-weight: 850; cursor: pointer; }
.load-more { min-height: 44px; margin: 24px auto 0; padding: 9px 14px; border: 1px solid #bfc8c4; border-radius: 6px; display: flex; align-items: center; gap: 8px; color: #303a36; background: #fff; font: inherit; font-size: 11px; font-weight: 850; cursor: pointer; }
.load-more span { min-width: 22px; padding: 3px 5px; border-radius: 4px; color: #5a6561; background: #e8edeb; font-size: 9px; }
.source-band { width: min(1280px, calc(100% - 48px)); margin: 0 auto 58px; padding: 25px 0; border-top: 1px solid #cbd3d0; border-bottom: 1px solid #cbd3d0; display: flex; align-items: center; justify-content: space-between; gap: 30px; }
.source-band > div > div { display: flex; align-items: center; gap: 8px; }
.source-band strong { font-size: 13px; }
.source-band p { max-width: 850px; margin: 8px 0 0; color: #6b7671; font-size: 11px; line-height: 1.6; }
.source-band > a { min-height: 38px; padding: 8px 11px; border: 1px solid #c5ceca; border-radius: 5px; display: flex; align-items: center; gap: 7px; color: #33403b; background: #fff; font-size: 11px; font-weight: 850; white-space: nowrap; }
.drawer-layer { position: fixed; inset: 0; z-index: 100; display: flex; justify-content: flex-end; background: rgba(10,14,13,.55); backdrop-filter: blur(4px); }
.prompt-drawer { width: min(680px, 100vw); height: 100%; overflow-y: auto; outline: 0; background: #f5f7f6; box-shadow: -24px 0 70px rgba(10,14,13,.22); animation: drawer-in .24s ease-out; }
.drawer-bar { min-height: 58px; padding: 10px 18px; position: sticky; top: 0; z-index: 3; border-bottom: 1px solid #d1d8d5; display: flex; align-items: center; justify-content: space-between; color: #4f5b56; background: rgba(250,251,250,.94); font-size: 12px; font-weight: 850; backdrop-filter: blur(12px); }
.drawer-bar > div { display: flex; align-items: center; gap: 7px; }
.drawer-bar span { width: 8px; height: 8px; border-radius: 2px; }
.drawer-bar button { width: 36px; height: 36px; border: 1px solid #d0d7d4; border-radius: 5px; display: grid; place-items: center; color: #48534f; background: #fff; cursor: pointer; }
.drawer-image { min-height: 360px; max-height: 610px; overflow: hidden; background: #dfe4e2; }
.drawer-image img { width: 100%; height: 100%; max-height: 610px; display: block; object-fit: contain; }
.drawer-content { padding: 28px 30px 44px; }
.drawer-meta { display: flex; flex-wrap: wrap; gap: 6px; }
.drawer-meta span { padding: 6px 8px; border: 1px solid #d4dbd8; border-radius: 4px; color: #52605a; background: #fff; font-size: 11px; font-weight: 800; }
.drawer-content > h2 { margin: 17px 0 0; font-size: 30px; line-height: 1.15; }
.drawer-description { margin: 13px 0 0; color: #55615c; font-size: 15px; line-height: 1.75; }
.prompt-section { margin-top: 24px; border: 1px solid #ccd4d1; border-radius: 7px; overflow: hidden; background: #fff; }
.prompt-section > div { min-height: 48px; padding: 8px 12px; border-bottom: 1px solid #d9dfdc; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.prompt-section strong { font-size: 13px; }
.prompt-section button { min-height: 32px; padding: 6px 9px; border: 1px solid #d0d7d4; border-radius: 4px; display: flex; align-items: center; gap: 5px; color: #43504b; background: #f6f8f7; font: inherit; font-size: 11px; font-weight: 850; cursor: pointer; }
.prompt-section pre { max-height: 440px; margin: 0; padding: 18px; overflow: auto; color: #2f3b37; background: #fbfcfb; font: 13px/1.75 ui-monospace, SFMono-Regular, Consolas, monospace; white-space: pre-wrap; overflow-wrap: anywhere; }
.drawer-actions { margin-top: 14px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.drawer-actions button, .drawer-actions a { min-height: 44px; border: 1px solid #202523; border-radius: 5px; display: flex; align-items: center; justify-content: center; gap: 7px; color: #fff; background: #202523; font: inherit; font-size: 12px; font-weight: 850; cursor: pointer; }
.drawer-actions a { border-color: #ff6746; color: #231412; background: #ff6746; }
.attribution { margin-top: 22px; border-top: 1px solid #d4dbd8; }
.attribution > div { min-height: 44px; border-bottom: 1px solid #dce1df; display: grid; grid-template-columns: 92px 1fr; align-items: center; gap: 12px; font-size: 12px; }
.attribution span { color: #84908b; }
.attribution a { display: inline-flex; align-items: center; gap: 5px; color: #46524d; font-weight: 800; }
.copy-toast { min-height: 42px; padding: 9px 14px; position: fixed; right: 22px; bottom: 22px; z-index: 120; border-radius: 6px; display: flex; align-items: center; gap: 8px; color: #14221d; background: #bdf166; box-shadow: 0 16px 34px rgba(17,25,22,.18); font-size: 11px; font-weight: 900; }
.toast-enter-active, .toast-leave-active { transition: opacity .18s, transform .18s; }.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(8px); }
@keyframes drawer-in { from { opacity: .6; transform: translateX(36px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; transition-duration: .01ms !important; } }
@media (max-width: 1080px) {
  .intro-shell { grid-template-columns: minmax(340px,.9fr) minmax(380px,1.1fr); gap: 34px; }
  .prompt-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
  .toolbar { grid-template-columns: minmax(240px,1fr) 145px; }.toolbar .select-field:last-child { grid-column: 1 / -1; }
}
@media (max-width: 820px) {
  .intro-shell { width: min(100% - 32px, 1280px); grid-template-columns: 1fr; gap: 28px; padding: 40px 0 86px; }
  .library-intro, .intro-shell { min-height: 620px; }.contact-sheet { height: 190px; }.intro-copy h1 { font-size: 46px; }
  .catalog-shell, .source-band { width: min(100% - 32px, 1280px); }.catalog-head { align-items: flex-start; flex-direction: column; gap: 10px; padding: 10px 0 16px; }.catalog-head > p { text-align: left; }
  .workspace, .workspace.profession-workspace { grid-template-columns: 1fr; gap: 12px; }.filter-rail { position: static; max-height: none; padding: 0; overflow: hidden; scrollbar-gutter: auto; }.rail-title, .source-note { display: none; }
  .filter-list { display: flex; gap: 6px; overflow-x: auto; scrollbar-width: none; }.filter-list::-webkit-scrollbar { display: none; }.filter-list button { width: auto; min-width: max-content; grid-template-columns: 8px auto auto; border: 1px solid #d2d9d6; background: #fff; }.filter-list button.without-color { grid-template-columns: auto auto; }.filter-list button span { overflow-wrap: normal; white-space: nowrap; }
}
@media (max-width: 590px) {
  .intro-shell { width: min(100% - 28px, 1280px); padding-top: 34px; }.library-intro, .intro-shell { min-height: 590px; }.intro-copy h1 { margin-top: 16px; font-size: 39px; }.intro-copy p { margin-top: 16px; font-size: 14px; }.contact-sheet { height: 160px; gap: 4px; }.contact-sheet button:nth-child(2), .contact-sheet button:nth-child(4) { transform: translateY(10px); }
  .intro-stats div { min-width: 0; flex: 1; padding-right: 8px; }.intro-stats strong { font-size: 17px; }.intro-stats span { font-size: 9px; }
  .catalog-shell, .source-band { width: min(100% - 28px, 1280px); }.browse-switch { width: 100%; }.browse-switch button { flex: 1; justify-content: center; }.toolbar { grid-template-columns: 1fr; }.toolbar .select-field:last-child { grid-column: auto; }
  .prompt-grid { grid-template-columns: 1fr; }.prompt-card { max-width: none; }.card-body { min-height: 300px; }.image-expand { opacity: 1; transform: none; }
  .source-band { align-items: flex-start; flex-direction: column; }.source-band > a { width: 100%; justify-content: center; }
  .drawer-image { min-height: 260px; }.drawer-content { padding: 23px 18px 34px; }.drawer-content > h2 { font-size: 26px; }.drawer-actions { grid-template-columns: 1fr; }.prompt-section pre { max-height: 360px; padding: 15px; font-size: 12px; line-height: 1.7; }
  .copy-toast { right: 14px; bottom: 14px; left: 14px; justify-content: center; }
}
</style>
