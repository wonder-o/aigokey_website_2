<template>
  <div class="skills-page" :class="{ 'skills-page--embedded': embedded }">
    <SiteHeader v-if="!embedded" @trial="$router.push('/free-trial/')" />

    <main>
      <section v-if="!embedded" class="intro-band">
        <div class="intro-inner">
          <div class="intro-copy">
            <div class="update-pill">
              <span class="live-dot"></span>
              {{ copy.daily }} · {{ syncDate }}
            </div>
            <h1>{{ copy.title }}</h1>
            <p>{{ copy.subtitle }}</p>
          </div>
          <div class="intro-stats" aria-label="索引数据概览">
            <div>
              <strong>{{ catalog.skills.length }}</strong>
              <span>{{ copy.curated }}</span>
            </div>
            <div>
              <strong>{{ categoryItems.length - 1 }}</strong>
              <span>{{ copy.categories }}</span>
            </div>
            <div>
              <strong>{{ professionItems.length - 1 }}</strong>
              <span>{{ copy.professions }}</span>
            </div>
            <div>
              <strong>{{ sourceCount }}</strong>
              <span>{{ copy.sources }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="catalog-shell">
        <div class="mode-row">
          <div class="mode-switch" role="tablist" :aria-label="copy.browseBy">
            <button :class="{ active: browseMode === 'category' }" type="button" role="tab" :aria-selected="browseMode === 'category'" @click="setBrowseMode('category')">
              <Grid2X2 :size="17" />
              {{ copy.byCategory }}
            </button>
            <button :class="{ active: browseMode === 'profession' }" type="button" role="tab" :aria-selected="browseMode === 'profession'" @click="setBrowseMode('profession')">
              <BriefcaseBusiness :size="17" />
              {{ copy.byProfession }}
            </button>
          </div>
          <p>{{ copy.signalNote }}</p>
        </div>

        <div class="catalog-grid">
          <aside class="filter-panel" :aria-label="copy.filters">
            <div class="filter-title">
              <SlidersHorizontal :size="17" />
              <span>{{ browseMode === 'category' ? copy.categories : copy.professions }}</span>
            </div>
            <div class="filter-list">
              <button
                v-for="item in activeFilters"
                :key="item.id"
                type="button"
                :class="{ active: selectedFilter === item.id }"
                @click="selectedFilter = item.id"
              >
                <span>{{ item.label }}</span>
                <span class="filter-count">{{ item.count }}</span>
              </button>
            </div>
            <div class="editorial-note">
              <ShieldCheck :size="19" />
              <div>
                <strong>{{ copy.editorialTitle }}</strong>
                <span>{{ copy.editorialCopy }}</span>
              </div>
            </div>
          </aside>

          <div class="results-panel">
            <div class="toolbar">
              <label class="search-box">
                <Search :size="19" />
                <input v-model="query" type="search" :placeholder="copy.search" />
                <kbd>/</kbd>
              </label>
              <label class="sort-control">
                <span>{{ copy.sort }}</span>
                <select v-model="sortBy">
                  <option value="rating">{{ copy.sortRating }}</option>
                  <option value="stars">GitHub Stars</option>
                  <option value="updated">{{ copy.sortUpdated }}</option>
                  <option value="setup">{{ copy.sortSetup }}</option>
                </select>
                <ChevronDown :size="15" />
              </label>
            </div>

            <div class="attribute-filters" :aria-label="copy.attributeFilters">
              <label class="compact-select">
                <Gauge :size="15" />
                <select v-model="difficultyFilter" :aria-label="copy.difficulty">
                  <option value="all">{{ copy.allDifficulties }}</option>
                  <option value="starter">{{ difficultyLabel('starter') }}</option>
                  <option value="intermediate">{{ difficultyLabel('intermediate') }}</option>
                  <option value="advanced">{{ difficultyLabel('advanced') }}</option>
                </select>
                <ChevronDown :size="13" />
              </label>
              <label class="compact-select">
                <ShieldAlert :size="15" />
                <select v-model="riskFilter" :aria-label="copy.risk">
                  <option value="all">{{ copy.allRisks }}</option>
                  <option value="low">{{ riskLabel('low') }}</option>
                  <option value="medium">{{ riskLabel('medium') }}</option>
                  <option value="high">{{ riskLabel('high') }}</option>
                </select>
                <ChevronDown :size="13" />
              </label>
              <label class="compact-select">
                <Layers3 :size="15" />
                <select v-model="sourceFilter" :aria-label="copy.source">
                  <option value="all">{{ copy.allSources }}</option>
                  <option v-for="source in sourceOptions" :key="source" :value="source">{{ source }}</option>
                </select>
                <ChevronDown :size="13" />
              </label>
              <label class="official-toggle">
                <input v-model="officialOnly" type="checkbox" />
                <span aria-hidden="true"><Check :size="12" /></span>
                {{ copy.officialOnly }}
              </label>
            </div>

            <div class="results-head">
              <div>
                <h2>{{ currentFilterLabel }}</h2>
                <span>{{ filteredSkills.length }} {{ copy.results }}</span>
              </div>
              <button v-if="hasActiveFilters" class="clear-button" type="button" @click="clearFilters">
                <RotateCcw :size="15" />
                {{ copy.clear }}
              </button>
            </div>

            <div v-if="filteredSkills.length" class="skills-grid">
              <article v-for="skill in filteredSkills" :key="skill.id" class="skill-card">
                <div class="card-topline">
                  <div class="source-mark" :style="sourceStyle(skill.source)">{{ sourceInitials(skill.source) }}</div>
                  <div class="source-copy">
                    <span>{{ skill.source }}</span>
                    <small>{{ skill.repo }}</small>
                  </div>
                  <div v-if="skill.official" class="verified" :title="copy.verifiedTitle">
                    <BadgeCheck :size="16" />
                    {{ copy.verified }}
                  </div>
                </div>

                <div class="card-title-row">
                  <div>
                    <h3>{{ skill.name }}</h3>
                    <span class="category-label">{{ categoryLabel(skill.category) }}</span>
                  </div>
                  <div class="rating-badge" :aria-label="`${copy.aigoRating} ${skill.rating}`">
                    <Sparkles :size="14" />
                    {{ skill.rating }}
                  </div>
                </div>

                <p class="description">{{ localized(skill.description) }}</p>

                <div class="quick-facts">
                  <span :class="`difficulty-${skill.difficulty}`"><Gauge :size="13" />{{ difficultyLabel(skill.difficulty) }}</span>
                  <span><Timer :size="13" />{{ formatSetupTime(skill.setupTimeMinutes) }}</span>
                  <span :class="`risk-${skill.risk}`"><ShieldAlert :size="13" />{{ riskLabel(skill.risk) }}</span>
                </div>

                <div class="tag-row">
                  <span v-for="tag in skill.tags.slice(0, 3)" :key="tag">{{ tag }}</span>
                </div>

                <div class="meta-row">
                  <span><Star :size="15" />{{ compactNumber(skill.stars) }}</span>
                  <span><GitFork :size="15" />{{ compactNumber(skill.forks) }}</span>
                  <span><Clock3 :size="15" />{{ relativeDate(skill.repoUpdatedAt) }}</span>
                </div>

                <div class="card-actions">
                  <button class="detail-button" type="button" @click="openDetail(skill)">{{ copy.details }}</button>
                  <button class="install-button" type="button" @click="openDetail(skill, true)">
                    <Download :size="16" />
                    {{ copy.install }}
                  </button>
                </div>
              </article>
            </div>

            <div v-else class="empty-state">
              <SearchX :size="28" />
              <h3>{{ copy.emptyTitle }}</h3>
              <p>{{ copy.emptyCopy }}</p>
              <button type="button" @click="clearFilters">{{ copy.clear }}</button>
            </div>
          </div>
        </div>
      </section>
    </main>

    <SiteFooter v-if="!embedded" />

    <Teleport to="body">
      <div v-if="selectedSkill" class="drawer-layer" @click.self="closeDetail">
        <aside ref="drawerRef" class="detail-drawer" role="dialog" aria-modal="true" tabindex="-1" :aria-labelledby="`detail-${selectedSkill.id}`">
          <div class="drawer-header">
            <div class="drawer-source">
              <div class="source-mark" :style="sourceStyle(selectedSkill.source)">{{ sourceInitials(selectedSkill.source) }}</div>
              <div>
                <span>{{ selectedSkill.source }}</span>
                <small>{{ selectedSkill.repo }}</small>
              </div>
            </div>
            <button class="icon-button" type="button" :aria-label="copy.close" title="关闭" @click="closeDetail"><X :size="20" /></button>
          </div>

          <div class="drawer-body">
            <div class="drawer-title">
              <span>{{ categoryLabel(selectedSkill.category) }} <i>·</i> <b :class="selectedSkill.available ? 'available' : 'unavailable'">{{ selectedSkill.available ? copy.available : copy.unavailable }}</b></span>
              <h2 :id="`detail-${selectedSkill.id}`">{{ selectedSkill.name }}</h2>
              <p>{{ localized(selectedSkill.description) }}</p>
            </div>

            <section class="score-section">
              <div class="score-summary">
                <div>
                  <strong>{{ selectedSkill.rating }}</strong>
                  <span>/ 10</span>
                </div>
                <p><Sparkles :size="16" />{{ copy.aigoRating }}</p>
              </div>
              <div class="score-list">
                <div v-for="(value, key) in selectedSkill.dimensions" :key="key">
                  <div><span>{{ dimensionLabel(key) }}</span><strong>{{ value }}</strong></div>
                  <div class="score-track"><i :style="{ width: `${value * 10}%` }"></i></div>
                </div>
              </div>
            </section>

            <section class="attribute-section">
              <div class="attribute-grid">
                <div><span>{{ copy.difficulty }}</span><strong>{{ difficultyLabel(selectedSkill.difficulty) }}</strong></div>
                <div><span>{{ copy.maturity }}</span><strong>{{ maturityLabel(selectedSkill.maturity) }}</strong></div>
                <div><span>{{ copy.setupTime }}</span><strong>{{ formatSetupTime(selectedSkill.setupTimeMinutes) }}</strong></div>
                <div><span>{{ copy.risk }}</span><strong :class="`risk-text-${selectedSkill.risk}`">{{ riskLabel(selectedSkill.risk) }}</strong></div>
                <div><span>{{ copy.license }}</span><strong>{{ licenseLabel(selectedSkill.license) }}</strong></div>
                <div><span>{{ copy.openIssues }}</span><strong>{{ compactNumber(selectedSkill.openIssues) }}</strong></div>
              </div>
              <div class="capability-list">
                <div>
                  <ListChecks :size="16" />
                  <span>{{ copy.taskTypes }}</span>
                  <p>{{ selectedSkill.taskTypes.map(taskTypeLabel).join(' · ') }}</p>
                </div>
                <div>
                  <Monitor :size="16" />
                  <span>{{ copy.platforms }}</span>
                  <p>{{ selectedSkill.platforms.map(platformLabel).join(' · ') }}</p>
                </div>
                <div>
                  <KeyRound :size="16" />
                  <span>{{ copy.permissions }}</span>
                  <p>{{ selectedSkill.permissions.map(permissionLabel).join(' · ') }}</p>
                </div>
                <div>
                  <BriefcaseBusiness :size="16" />
                  <span>{{ copy.roles }}</span>
                  <p>{{ selectedSkill.professions.slice(0, 5).map(professionLabel).join(' · ') }}</p>
                </div>
              </div>
            </section>

            <section class="review-section">
              <h3>{{ copy.editorReview }}</h3>
              <blockquote>{{ localized(selectedSkill.review) }}</blockquote>
              <dl>
                <div><dt>{{ copy.bestFor }}</dt><dd>{{ localized(selectedSkill.bestFor) }}</dd></div>
                <div><dt>{{ copy.prerequisites }}</dt><dd>{{ localized(selectedSkill.prerequisites) }}</dd></div>
                <div><dt>{{ copy.outputs }}</dt><dd>{{ localized(selectedSkill.outputs) }}</dd></div>
                <div><dt>{{ copy.notice }}</dt><dd>{{ localized(selectedSkill.caution) }}</dd></div>
              </dl>
            </section>

            <section class="install-section" :class="{ highlighted: installFocused }">
              <div class="section-heading">
                <div>
                  <span>{{ copy.installStep }}</span>
                  <h3>{{ copy.installTitle }}</h3>
                </div>
                <CodexIcon />
              </div>
              <p>{{ copy.installCopy }}</p>
              <div class="command-box">
                <code>{{ installCommand(selectedSkill) }}</code>
                <button type="button" :title="copy.copy" :aria-label="copy.copy" @click="copyInstall(selectedSkill)">
                  <Check v-if="copied" :size="17" />
                  <Copy v-else :size="17" />
                </button>
              </div>
              <div class="install-actions">
                <button class="install-primary" type="button" @click="copyInstall(selectedSkill)">
                  <Check v-if="copied" :size="17" />
                  <Copy v-else :size="17" />
                  {{ copied ? copy.copied : copy.copyCommand }}
                </button>
                <a :href="githubUrl(selectedSkill)" target="_blank" rel="noreferrer">
                  GitHub
                  <ArrowUpRight :size="15" />
                </a>
              </div>
            </section>

            <div class="repo-metrics">
              <span><Star :size="16" />{{ compactNumber(selectedSkill.stars) }} stars</span>
              <span><GitFork :size="16" />{{ compactNumber(selectedSkill.forks) }} forks</span>
              <span><CircleDot :size="16" />{{ compactNumber(selectedSkill.openIssues) }} issues</span>
              <span><RefreshCw :size="16" />{{ relativeDate(selectedSkill.repoUpdatedAt) }}</span>
            </div>
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
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Clock3,
  Copy,
  Download,
  GitFork,
  Grid2X2,
  Gauge,
  KeyRound,
  Layers3,
  ListChecks,
  Monitor,
  CircleDot,
  RefreshCw,
  RotateCcw,
  Search,
  SearchX,
  ShieldCheck,
  ShieldAlert,
  SlidersHorizontal,
  Sparkles,
  Star,
  Timer,
  X,
} from '@lucide/vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import CodexIcon from '@/components/CodexIcon.vue'
import { useI18n } from '@/composables/useI18n'
import rawCatalog from '@/data/skills.json'
import type { LocalizedText, SkillItem, SkillsCatalog } from '@/types/skills'

const { embedded = false } = defineProps<{ embedded?: boolean }>()

type BrowseMode = 'category' | 'profession'
type SortMode = 'rating' | 'stars' | 'updated' | 'setup'
type FilterItem = { id: string; label: string; count: number }

const catalog = rawCatalog as SkillsCatalog
const { lang } = useI18n()
const browseMode = ref<BrowseMode>('category')
const selectedFilter = ref('all')
const query = ref('')
const sortBy = ref<SortMode>('rating')
const difficultyFilter = ref<'all' | SkillItem['difficulty']>('all')
const riskFilter = ref<'all' | SkillItem['risk']>('all')
const sourceFilter = ref('all')
const officialOnly = ref(false)
const selectedSkill = ref<SkillItem | null>(null)
const installFocused = ref(false)
const copied = ref(false)
const drawerRef = ref<HTMLElement | null>(null)

const zhCopy = {
  home: '首页', help: '使用帮助', daily: '每日自动更新', title: '找到值得安装的 Skills',
  subtitle: '从可信 GitHub 来源中筛选、评估并分类，让 Codex 更快具备适合你工作与生活的专业能力。',
  curated: '个精选 Skills', categories: '个能力类别', sources: '个可信来源', browseBy: '浏览方式',
  byCategory: '按类别', byProfession: '按职业', signalNote: 'GitHub 指标每日同步，编辑评价独立维护', filters: '筛选', professions: '职业',
  editorialTitle: '人工策展 + 客观信号', editorialCopy: '综合实用性、可靠性、易用性、维护度与社区活跃度。',
  search: '搜索名称、功能、标签或来源', sort: '排序', sortRating: 'Aigo 评分', sortUpdated: '最近活跃', sortSetup: '配置时间最短', results: '个结果', clear: '清除筛选',
  attributeFilters: '属性筛选', difficulty: '上手难度', allDifficulties: '全部难度', risk: '权限风险', allRisks: '全部风险', source: '来源', allSources: '全部来源', officialOnly: '仅官方',
  verified: '官方', verifiedTitle: '来源仓库由工具官方维护', aigoRating: 'AigoKey 编辑评分', details: '查看详情', install: '安装',
  emptyTitle: '没有找到匹配的 Skill', emptyCopy: '试试更短的关键词，或清除当前分类。',
  disclaimer: '评分用于发现与比较，不代表 GitHub 或项目作者背书。安装前请检查权限与源码。', close: '关闭详情',
  editorReview: '编辑评价', bestFor: '适合', notice: '使用提示', installStep: '在 Codex 中使用', installTitle: '一条指令完成安装',
  maturity: '成熟度', setupTime: '预计配置', license: '许可证', openIssues: '仓库开放问题', taskTypes: '任务类型', platforms: '支持平台', permissions: '所需权限', roles: '适用职业', prerequisites: '前置条件', outputs: '主要产出', undeclared: '未声明', available: '路径已验证', unavailable: '路径待确认',
  installCopy: '复制下面的内容到 Codex 新任务中，Skill Installer 会从对应 GitHub 路径完成安装。', copy: '复制安装指令', copyCommand: '复制安装指令', copied: '已复制',
}

const enCopy = {
  home: 'Home', help: 'Help', daily: 'Updated daily', title: 'Find skills worth installing',
  subtitle: 'Curated, evaluated, and organized from trusted GitHub sources so Codex can gain the right capabilities for your work and life.',
  curated: 'curated skills', categories: 'capability groups', sources: 'trusted sources', browseBy: 'Browse by',
  byCategory: 'Category', byProfession: 'Profession', signalNote: 'GitHub signals sync daily; editorial reviews are maintained independently', filters: 'Filters', professions: 'Professions',
  editorialTitle: 'Editorial + objective signals', editorialCopy: 'Combines usefulness, reliability, ease, maintenance, and community activity.',
  search: 'Search names, functions, tags, or sources', sort: 'Sort', sortRating: 'Aigo rating', sortUpdated: 'Recently active', sortSetup: 'Shortest setup', results: 'results', clear: 'Clear filters',
  attributeFilters: 'Attribute filters', difficulty: 'Difficulty', allDifficulties: 'All levels', risk: 'Permission risk', allRisks: 'All risks', source: 'Source', allSources: 'All sources', officialOnly: 'Official only',
  verified: 'Official', verifiedTitle: 'Maintained by the tool publisher', aigoRating: 'AigoKey editorial rating', details: 'Details', install: 'Install',
  emptyTitle: 'No matching skills', emptyCopy: 'Try a shorter query or clear the current filter.',
  disclaimer: 'Ratings support discovery and comparison; they are not GitHub or author endorsements. Review source and permissions before installing.', close: 'Close details',
  editorReview: 'Editorial review', bestFor: 'Best for', notice: 'Watch for', installStep: 'Use in Codex', installTitle: 'Install with one instruction',
  maturity: 'Maturity', setupTime: 'Setup time', license: 'License', openIssues: 'Repository issues', taskTypes: 'Task types', platforms: 'Platforms', permissions: 'Permissions', roles: 'Roles', prerequisites: 'Prerequisites', outputs: 'Outputs', undeclared: 'Undeclared', available: 'Path verified', unavailable: 'Path unverified',
  installCopy: 'Paste this into a new Codex task. Skill Installer will install it from the matching GitHub path.', copy: 'Copy install instruction', copyCommand: 'Copy instruction', copied: 'Copied',
}

const categoryNames: Record<string, LocalizedText> = {
  all: { zh: '全部 Skills', en: 'All skills' },
  development: { zh: '开发与工程', en: 'Development' },
  productivity: { zh: '效率与协作', en: 'Productivity' },
  documents: { zh: '文档与办公', en: 'Documents' },
  data: { zh: '数据与分析', en: 'Data & analysis' },
  design: { zh: '设计与创意', en: 'Design & creative' },
  research: { zh: '研究与知识', en: 'Research' },
  security: { zh: '安全与合规', en: 'Security' },
  content: { zh: '内容与写作', en: 'Content & writing' },
  sales: { zh: '销售与增长', en: 'Sales & growth' },
  testing: { zh: '测试与质量', en: 'Testing & quality' },
  'ai-agents': { zh: 'AI 与 Agent', en: 'AI & agents' },
  deployment: { zh: '部署与云服务', en: 'Deployment & cloud' },
  project: { zh: '项目与规划', en: 'Projects & planning' },
  communication: { zh: '沟通与会议', en: 'Communication' },
  media: { zh: '音视频与媒体', en: 'Media' },
  monitoring: { zh: '监控与排障', en: 'Monitoring' },
  marketing: { zh: '市场与增长', en: 'Marketing & growth' },
  finance: { zh: '财务与票据', en: 'Finance' },
  career: { zh: '职业与求职', en: 'Career' },
}

const professionNames: Record<string, LocalizedText> = {
  all: { zh: '全部职业', en: 'All professions' }, developer: { zh: '开发工程师', en: 'Developer' },
  product: { zh: '产品经理', en: 'Product manager' }, designer: { zh: '设计师', en: 'Designer' }, qa: { zh: '测试工程师', en: 'QA engineer' },
  operations: { zh: '运营人员', en: 'Operations' }, researcher: { zh: '研究人员', en: 'Researcher' }, marketing: { zh: '市场营销', en: 'Marketing' },
  sales: { zh: '销售人员', en: 'Sales' }, analyst: { zh: '数据分析师', en: 'Data analyst' }, finance: { zh: '财务人员', en: 'Finance' },
  devops: { zh: '运维工程师', en: 'DevOps' }, security: { zh: '安全工程师', en: 'Security engineer' }, architect: { zh: '技术架构师', en: 'Architect' },
  creator: { zh: '内容创作者', en: 'Creator' }, founder: { zh: '创业者', en: 'Founder' }, hr: { zh: '人力资源', en: 'HR' },
  student: { zh: '学生', en: 'Student' }, teacher: { zh: '教师', en: 'Teacher' },
  'data-scientist': { zh: '数据科学家', en: 'Data scientist' }, 'mobile-developer': { zh: '移动端工程师', en: 'Mobile developer' },
  manager: { zh: '团队管理者', en: 'Manager' }, executive: { zh: '企业管理者', en: 'Executive' }, support: { zh: '客户支持', en: 'Customer support' },
  accessibility: { zh: '无障碍专家', en: 'Accessibility specialist' }, writer: { zh: '专业写作者', en: 'Writer' }, legal: { zh: '法务人员', en: 'Legal' },
  accountant: { zh: '会计人员', en: 'Accountant' }, 'job-seeker': { zh: '求职者', en: 'Job seeker' }, recruiter: { zh: '招聘人员', en: 'Recruiter' },
}

const dimensionNames: Record<string, LocalizedText> = {
  usefulness: { zh: '实用性', en: 'Usefulness' }, reliability: { zh: '可靠性', en: 'Reliability' },
  ease: { zh: '易用性', en: 'Ease of use' }, maintenance: { zh: '维护活跃度', en: 'Maintenance' },
  documentation: { zh: '文档完整度', en: 'Documentation' }, safety: { zh: '安全边界', en: 'Safety' },
}

const difficultyNames: Record<SkillItem['difficulty'], LocalizedText> = {
  starter: { zh: '入门', en: 'Starter' }, intermediate: { zh: '进阶', en: 'Intermediate' }, advanced: { zh: '高级', en: 'Advanced' },
}
const maturityNames: Record<SkillItem['maturity'], LocalizedText> = {
  established: { zh: '成熟', en: 'Established' }, growing: { zh: '成长中', en: 'Growing' }, experimental: { zh: '实验性', en: 'Experimental' },
}
const riskNames: Record<SkillItem['risk'], LocalizedText> = {
  low: { zh: '低风险', en: 'Low risk' }, medium: { zh: '中风险', en: 'Medium risk' }, high: { zh: '高风险', en: 'High risk' },
}
const platformNames: Record<string, LocalizedText> = {
  'cross-platform': { zh: '跨平台', en: 'Cross-platform' }, windows: { zh: 'Windows', en: 'Windows' }, macos: { zh: 'macOS', en: 'macOS' },
  linux: { zh: 'Linux', en: 'Linux' }, web: { zh: 'Web', en: 'Web' }, ios: { zh: 'iOS', en: 'iOS' }, android: { zh: 'Android', en: 'Android' },
}
const permissionNames: Record<string, LocalizedText> = {
  none: { zh: '无需额外权限', en: 'No extra access' }, filesystem: { zh: '文件系统', en: 'Filesystem' }, shell: { zh: '终端命令', en: 'Shell' },
  network: { zh: '网络访问', en: 'Network' }, browser: { zh: '浏览器', en: 'Browser' }, screen: { zh: '屏幕读取', en: 'Screen capture' },
  github: { zh: 'GitHub', en: 'GitHub' }, notion: { zh: 'Notion', en: 'Notion' }, linear: { zh: 'Linear', en: 'Linear' }, figma: { zh: 'Figma', en: 'Figma' },
  sentry: { zh: 'Sentry', en: 'Sentry' }, vercel: { zh: 'Vercel', en: 'Vercel' }, python: { zh: 'Python 环境', en: 'Python runtime' },
  'api-key': { zh: 'API Key', en: 'API key' }, 'cloud-account': { zh: '云平台账号', en: 'Cloud account' }, git: { zh: 'Git 仓库', en: 'Git repository' },
}
const taskTypeNames: Record<string, LocalizedText> = {
  build: { zh: '构建', en: 'Build' }, integrate: { zh: '集成', en: 'Integrate' }, integration: { zh: '集成', en: 'Integrate' }, test: { zh: '测试', en: 'Test' }, verify: { zh: '验证', en: 'Verify' },
  review: { zh: '审查', en: 'Review' }, fix: { zh: '修复', en: 'Fix' }, debug: { zh: '调试', en: 'Debug' }, analyze: { zh: '分析', en: 'Analyze' }, report: { zh: '报告', en: 'Report' },
  plan: { zh: '规划', en: 'Plan' }, organize: { zh: '整理', en: 'Organize' }, update: { zh: '更新', en: 'Update' }, execute: { zh: '执行', en: 'Execute' }, document: { zh: '文档化', en: 'Document' },
  write: { zh: '写作', en: 'Write' }, edit: { zh: '编辑', en: 'Edit' }, design: { zh: '设计', en: 'Design' }, generate: { zh: '生成', en: 'Generate' }, capture: { zh: '采集', en: 'Capture' },
  summarize: { zh: '总结', en: 'Summarize' }, configure: { zh: '配置', en: 'Configure' }, migrate: { zh: '迁移', en: 'Migrate' }, deploy: { zh: '部署', en: 'Deploy' }, monitor: { zh: '监控', en: 'Monitor' },
  optimize: { zh: '优化', en: 'Optimize' }, convert: { zh: '转换', en: 'Convert' }, transcribe: { zh: '转录', en: 'Transcribe' }, research: { zh: '研究', en: 'Research' }, extract: { zh: '提取', en: 'Extract' },
  download: { zh: '下载', en: 'Download' }, move: { zh: '移动文件', en: 'Move files' }, audit: { zh: '审计', en: 'Audit' }, ideate: { zh: '构思', en: 'Ideate' }, automation: { zh: '自动化', en: 'Automate' },
}

const copy = computed(() => lang.value === 'en' ? enCopy : zhCopy)
const isEnglish = computed(() => lang.value === 'en')
const sourceCount = new Set(catalog.skills.map((skill) => skill.repo)).size
const sourceOptions = [...new Set(catalog.skills.map((skill) => skill.source))].sort()
const syncDate = computed(() => new Intl.DateTimeFormat(isEnglish.value ? 'en-US' : 'zh-CN', { month: 'short', day: 'numeric' }).format(new Date(catalog.lastSyncedAt)))

function localized(value: LocalizedText) { return isEnglish.value ? value.en : value.zh }
function categoryLabel(id: string) { return localized(categoryNames[id] || { zh: id, en: id }) }
function dimensionLabel(id: string) { return localized(dimensionNames[id] || { zh: id, en: id }) }
function professionLabel(id: string) { return localized(professionNames[id] || { zh: id, en: id }) }
function difficultyLabel(id: SkillItem['difficulty']) { return localized(difficultyNames[id]) }
function maturityLabel(id: SkillItem['maturity']) { return localized(maturityNames[id]) }
function riskLabel(id: SkillItem['risk']) { return localized(riskNames[id]) }
function platformLabel(id: string) { return localized(platformNames[id] || { zh: id, en: id }) }
function permissionLabel(id: string) { return localized(permissionNames[id] || { zh: id, en: id }) }
function taskTypeLabel(id: string) { return localized(taskTypeNames[id] || { zh: id, en: id }) }
function formatSetupTime(minutes: number) { return isEnglish.value ? `${minutes} min` : `约 ${minutes} 分钟` }
function licenseLabel(value: string) { return value === 'NOASSERTION' ? copy.value.undeclared : value }

function makeFilters(type: BrowseMode): FilterItem[] {
  const names = type === 'category' ? categoryNames : professionNames
  const counts = new Map<string, number>()
  for (const skill of catalog.skills) {
    const values = type === 'category' ? [skill.category] : skill.professions
    for (const value of values) counts.set(value, (counts.get(value) || 0) + 1)
  }
  return [
    { id: 'all', label: localized(names.all), count: catalog.skills.length },
    ...[...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([id, count]) => ({ id, count, label: localized(names[id] || { zh: id, en: id }) })),
  ]
}

const categoryItems = computed(() => makeFilters('category'))
const professionItems = computed(() => makeFilters('profession'))
const activeFilters = computed(() => browseMode.value === 'category' ? categoryItems.value : professionItems.value)
const currentFilterLabel = computed(() => activeFilters.value.find((item) => item.id === selectedFilter.value)?.label || copy.value.title)
const hasActiveFilters = computed(() => Boolean(query.value || selectedFilter.value !== 'all' || difficultyFilter.value !== 'all' || riskFilter.value !== 'all' || sourceFilter.value !== 'all' || officialOnly.value))

const filteredSkills = computed(() => {
  const normalizedQuery = query.value.trim().toLowerCase()
  const items = catalog.skills.filter((skill) => {
    const filterMatch = selectedFilter.value === 'all' || (browseMode.value === 'category'
      ? skill.category === selectedFilter.value
      : skill.professions.includes(selectedFilter.value))
    if (!filterMatch) return false
    if (difficultyFilter.value !== 'all' && skill.difficulty !== difficultyFilter.value) return false
    if (riskFilter.value !== 'all' && skill.risk !== riskFilter.value) return false
    if (sourceFilter.value !== 'all' && skill.source !== sourceFilter.value) return false
    if (officialOnly.value && !skill.official) return false
    if (!normalizedQuery) return true
    const haystack = [skill.name, skill.source, skill.repo, ...skill.tags, ...skill.taskTypes, ...skill.professions, ...skill.platforms, skill.description.zh, skill.description.en, skill.review.zh, skill.review.en].join(' ').toLowerCase()
    return haystack.includes(normalizedQuery)
  })
  return [...items].sort((a, b) => {
    if (sortBy.value === 'stars') return b.stars - a.stars || b.rating - a.rating
    if (sortBy.value === 'updated') return Date.parse(b.repoUpdatedAt) - Date.parse(a.repoUpdatedAt)
    if (sortBy.value === 'setup') return a.setupTimeMinutes - b.setupTimeMinutes || b.rating - a.rating
    return b.rating - a.rating || Number(b.featured) - Number(a.featured)
  })
})

function setBrowseMode(mode: BrowseMode) { browseMode.value = mode; selectedFilter.value = 'all' }
function clearFilters() {
  query.value = ''
  selectedFilter.value = 'all'
  difficultyFilter.value = 'all'
  riskFilter.value = 'all'
  sourceFilter.value = 'all'
  officialOnly.value = false
}
function compactNumber(value: number) { return new Intl.NumberFormat(isEnglish.value ? 'en-US' : 'zh-CN', { notation: 'compact', maximumFractionDigits: 1 }).format(value) }
function relativeDate(value: string) {
  const days = Math.max(0, Math.floor((Date.now() - Date.parse(value)) / 86400000))
  if (isEnglish.value) return days === 0 ? 'today' : `${days}d ago`
  return days === 0 ? '今天活跃' : `${days} 天前`
}
function githubUrl(skill: SkillItem) { return `https://github.com/${skill.repo}/tree/${skill.branch}/${skill.path}` }
function installCommand(skill: SkillItem) { return `$skill-installer 安装这个 Skill：${githubUrl(skill)}` }
function sourceInitials(source: string) { return source.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase() }
function sourceStyle(source: string) {
  const styles: Record<string, string> = {
    OpenAI: 'background:#111827;color:#fff', Anthropic: 'background:#d97757;color:#fff',
    'Vercel Labs': 'background:#fff;color:#111827;border-color:#cfd6dc', Superpowers: 'background:#176b5b;color:#fff', Composio: 'background:#5c4fbd;color:#fff',
  }
  return styles[source] || 'background:#2468f2;color:#fff'
}

function openDetail(skill: SkillItem, focusInstall = false) {
  selectedSkill.value = skill
  installFocused.value = focusInstall
  copied.value = false
  document.body.style.overflow = 'hidden'
  nextTick(() => drawerRef.value?.focus())
}
function closeDetail() {
  selectedSkill.value = null
  installFocused.value = false
  document.body.style.overflow = ''
}
async function copyInstall(skill: SkillItem) {
  const command = installCommand(skill)
  try {
    await navigator.clipboard.writeText(command)
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = command
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const didCopy = document.execCommand('copy')
    textarea.remove()
    if (!didCopy) return
  }
  copied.value = true
  window.setTimeout(() => { copied.value = false }, 1800)
}
function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && selectedSkill.value) closeDetail()
  if (event.key === '/' && !selectedSkill.value && !(event.target instanceof HTMLInputElement)) {
    event.preventDefault()
    document.querySelector<HTMLInputElement>('.search-box input')?.focus()
  }
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => { document.removeEventListener('keydown', onKeydown); document.body.style.overflow = '' })

useHead({
  title: embedded ? 'Skills List - AigoKey' : 'AigoKey Skills - 找到值得安装的 Codex Skills',
  meta: [
    { name: 'description', content: 'AigoKey Skills 每日整理 GitHub 上高质量 Codex Skills，按类别和职业筛选，提供评分、评价与安装指令。' },
    { name: 'keywords', content: 'Codex Skills, Skills 索引, AI 工作流, Codex 安装, AigoKey' },
  ],
})
</script>

<style scoped>
.skills-page { min-height: 100vh; color: #17202a; background: #f6f8fa; }
.skills-page--embedded .catalog-shell { max-width: none; padding: 20px 24px 48px; }
.skills-page--embedded .mode-row { margin-bottom: 18px; }
.skills-page--embedded .filter-panel { top: 20px; max-height: calc(100vh - 40px); }
.site-header { position: sticky; top: 0; z-index: 30; border-bottom: 1px solid #dfe4e8; background: rgba(255,255,255,.94); backdrop-filter: blur(16px); }
.header-inner { max-width: 1280px; min-height: 64px; margin: 0 auto; padding: 0 24px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 24px; }
.brand { justify-self: start; display: inline-flex; align-items: center; gap: 10px; font-size: 19px; font-weight: 900; }
.brand img { width: 40px; height: 40px; border-radius: 8px; object-fit: cover; }
.header-nav { display: flex; align-items: center; gap: 6px; padding: 4px; border-radius: 7px; background: #f2f4f6; }
.header-nav a { min-height: 34px; padding: 7px 13px; border-radius: 5px; color: #5d6872; font-size: 14px; font-weight: 700; }
.header-nav a.active { color: #17202a; background: #fff; box-shadow: 0 1px 4px rgba(17,27,36,.11); }
.language-control { justify-self: end; }
.intro-band { border-bottom: 1px solid #dfe4e8; background: #fff; }
.intro-inner { max-width: 1280px; margin: 0 auto; padding: 48px 24px 40px; display: grid; grid-template-columns: minmax(0,1fr) auto; align-items: end; gap: 52px; }
.update-pill { display: inline-flex; align-items: center; gap: 8px; margin-bottom: 16px; color: #315543; font-size: 13px; font-weight: 800; }
.live-dot { width: 8px; height: 8px; border-radius: 50%; background: #22a559; box-shadow: 0 0 0 5px rgba(34,165,89,.12); }
.intro-copy h1 { margin: 0; max-width: 760px; font-size: clamp(36px, 5vw, 58px); line-height: 1.08; font-weight: 900; }
.intro-copy p { max-width: 760px; margin: 16px 0 0; color: #5c6873; font-size: 17px; line-height: 1.7; }
.intro-stats { display: grid; grid-template-columns: repeat(4, 104px); border: 1px solid #dfe4e8; border-radius: 8px; background: #fbfcfd; }
.intro-stats div { min-height: 94px; padding: 18px; border-right: 1px solid #dfe4e8; display: flex; flex-direction: column; justify-content: center; }
.intro-stats div:last-child { border-right: 0; }
.intro-stats strong { font-size: 25px; line-height: 1; }
.intro-stats span { margin-top: 8px; color: #6c7780; font-size: 12px; line-height: 1.3; }
.catalog-shell { max-width: 1280px; margin: 0 auto; padding: 28px 24px 72px; }
.mode-row { min-height: 50px; margin-bottom: 22px; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
.mode-row > p { margin: 0; color: #727c85; font-size: 12px; }
.mode-switch { display: inline-flex; padding: 4px; border: 1px solid #d9e0e5; border-radius: 7px; background: #fff; }
.mode-switch button { min-height: 38px; padding: 8px 15px; border: 0; border-radius: 5px; display: inline-flex; align-items: center; gap: 8px; color: #65717b; background: transparent; font: inherit; font-size: 14px; font-weight: 800; cursor: pointer; }
.mode-switch button.active { color: #fff; background: #1c5ee5; }
.catalog-grid { display: grid; grid-template-columns: 218px minmax(0,1fr); gap: 28px; align-items: start; }
.filter-panel { position: sticky; top: 88px; max-height: calc(100vh - 110px); padding-right: 6px; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #cbd4da transparent; }
.filter-title { height: 36px; display: flex; align-items: center; gap: 8px; color: #35414b; font-size: 13px; font-weight: 900; }
.filter-list { display: grid; gap: 3px; }
.filter-list button { width: 100%; min-height: 38px; padding: 8px 9px 8px 12px; border: 0; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; color: #59656f; background: transparent; font: inherit; font-size: 14px; text-align: left; cursor: pointer; }
.filter-list button:hover { background: #edf1f4; }
.filter-list button.active { color: #164eb9; background: #e7efff; font-weight: 800; }
.filter-count { min-width: 25px; padding: 2px 6px; border-radius: 999px; color: #75808a; background: #e9edf0; font-size: 11px; text-align: center; }
.filter-list button.active .filter-count { color: #164eb9; background: #fff; }
.editorial-note { margin-top: 24px; padding: 14px; border: 1px solid #dce3e8; border-radius: 7px; display: grid; grid-template-columns: auto 1fr; gap: 10px; color: #25634a; background: #f2f8f5; }
.editorial-note strong, .editorial-note span { display: block; }
.editorial-note strong { font-size: 12px; }
.editorial-note span { margin-top: 5px; color: #5d7469; font-size: 11px; line-height: 1.55; }
.results-panel { min-width: 0; }
.toolbar { display: grid; grid-template-columns: minmax(260px,1fr) auto; gap: 12px; }
.search-box { min-height: 46px; padding: 0 12px; border: 1px solid #cfd7dd; border-radius: 7px; display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 10px; color: #74808a; background: #fff; box-shadow: 0 1px 2px rgba(17,27,36,.04); }
.search-box:focus-within { border-color: #4b79e5; box-shadow: 0 0 0 3px rgba(36,104,242,.1); }
.search-box input { width: 100%; border: 0; outline: 0; color: #17202a; background: transparent; font: inherit; font-size: 14px; }
.search-box kbd { padding: 2px 7px; border: 1px solid #d5dce1; border-radius: 4px; color: #8a949c; background: #f6f8fa; font: 11px/1.5 inherit; }
.sort-control { min-width: 190px; min-height: 46px; padding: 0 10px 0 13px; border: 1px solid #cfd7dd; border-radius: 7px; display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 7px; color: #7b858e; background: #fff; font-size: 12px; }
.sort-control select { border: 0; outline: 0; appearance: none; color: #27333d; background: transparent; font: inherit; font-size: 13px; font-weight: 800; cursor: pointer; }
.attribute-filters { margin-top: 10px; display: flex; flex-wrap: wrap; gap: 8px; }
.compact-select { min-height: 36px; padding: 0 9px; border: 1px solid #d5dde3; border-radius: 6px; display: grid; grid-template-columns: auto minmax(0,1fr) auto; align-items: center; gap: 6px; color: #66727c; background: #fff; }
.compact-select select { max-width: 145px; border: 0; outline: 0; appearance: none; color: #3f4c56; background: transparent; font: inherit; font-size: 11px; font-weight: 800; cursor: pointer; }
.official-toggle { min-height: 36px; padding: 0 10px; border: 1px solid #d5dde3; border-radius: 6px; display: inline-flex; align-items: center; gap: 7px; color: #4e5b65; background: #fff; font-size: 11px; font-weight: 800; cursor: pointer; }
.official-toggle input { position: absolute; opacity: 0; pointer-events: none; }
.official-toggle > span { width: 17px; height: 17px; border: 1px solid #bfc9d1; border-radius: 4px; display: grid; place-items: center; color: transparent; background: #fff; }
.official-toggle:has(input:checked) { border-color: #a9c2f8; color: #164eb9; background: #edf3ff; }
.official-toggle input:checked + span { border-color: #2468f2; color: #fff; background: #2468f2; }
.results-head { min-height: 68px; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
.results-head > div { display: flex; align-items: baseline; gap: 9px; }
.results-head h2 { margin: 0; font-size: 18px; }
.results-head span { color: #7a858e; font-size: 12px; }
.clear-button { min-height: 32px; padding: 5px 9px; border: 0; display: inline-flex; align-items: center; gap: 6px; color: #586570; background: transparent; font: inherit; font-size: 12px; cursor: pointer; }
.skills-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 14px; }
.skill-card { min-width: 0; min-height: 352px; padding: 20px; border: 1px solid #dce2e7; border-radius: 8px; display: flex; flex-direction: column; background: #fff; box-shadow: 0 2px 8px rgba(17,27,36,.035); transition: border-color .18s, box-shadow .18s, transform .18s; }
.skill-card:hover { border-color: #bfcad2; box-shadow: 0 12px 28px rgba(17,27,36,.08); transform: translateY(-2px); }
.card-topline { min-height: 35px; display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 9px; }
.source-mark { width: 32px; height: 32px; border: 1px solid transparent; border-radius: 7px; display: grid; place-items: center; flex: 0 0 auto; font-size: 11px; font-weight: 900; }
.source-copy { min-width: 0; }
.source-copy span, .source-copy small { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.source-copy span { color: #3a4650; font-size: 12px; font-weight: 800; }
.source-copy small { margin-top: 2px; color: #87919a; font-size: 10px; }
.verified { min-height: 24px; padding: 3px 7px; border-radius: 5px; display: inline-flex; align-items: center; gap: 4px; color: #216447; background: #e9f6ef; font-size: 10px; font-weight: 900; }
.card-title-row { min-height: 61px; margin-top: 17px; display: grid; grid-template-columns: minmax(0,1fr) auto; align-items: start; gap: 12px; }
.card-title-row h3 { margin: 0; overflow-wrap: anywhere; font-size: 19px; line-height: 1.25; }
.category-label { display: block; margin-top: 5px; color: #7b858e; font-size: 11px; }
.rating-badge { min-width: 52px; min-height: 28px; padding: 5px 8px; border: 1px solid #d8e2fb; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; gap: 5px; color: #174cb8; background: #edf3ff; font-size: 12px; font-weight: 900; }
.description { min-height: 66px; margin: 8px 0 0; color: #59656f; font-size: 13px; line-height: 1.65; }
.quick-facts { min-height: 25px; margin-top: 8px; display: flex; flex-wrap: wrap; gap: 5px; }
.quick-facts span { min-height: 24px; padding: 4px 7px; border: 1px solid #e0e5e9; border-radius: 5px; display: inline-flex; align-items: center; gap: 4px; color: #596670; background: #fafbfc; font-size: 10px; font-weight: 800; }
.quick-facts .risk-high { border-color: #f2c6c6; color: #a52b2b; background: #fff4f4; }
.quick-facts .risk-medium { border-color: #ecd9b5; color: #82550d; background: #fff9ed; }
.quick-facts .risk-low { border-color: #c9e7d6; color: #26704d; background: #f2faf6; }
.quick-facts .difficulty-advanced { color: #6546a4; background: #f7f3ff; }
.tag-row { min-height: 25px; margin-top: 10px; display: flex; flex-wrap: wrap; gap: 5px; }
.tag-row span { padding: 4px 7px; border-radius: 4px; color: #66727c; background: #f0f3f5; font-size: 10px; }
.meta-row { min-height: 38px; margin-top: 11px; padding-top: 12px; border-top: 1px solid #edf0f2; display: flex; align-items: flex-start; gap: 15px; color: #66727c; font-size: 11px; }
.meta-row span { display: inline-flex; align-items: center; gap: 5px; }
.card-actions { margin-top: auto; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.card-actions button { min-height: 38px; border-radius: 6px; font: inherit; font-size: 12px; font-weight: 900; cursor: pointer; }
.detail-button { border: 1px solid #d3dbe1; color: #3f4b55; background: #fff; }
.install-button { border: 1px solid #1c5ee5; display: inline-flex; align-items: center; justify-content: center; gap: 7px; color: #fff; background: #1c5ee5; }
.detail-button:hover { background: #f3f5f7; }
.install-button:hover { background: #144dbf; }
.empty-state { min-height: 360px; border: 1px dashed #cfd7dd; border-radius: 8px; display: grid; place-items: center; align-content: center; gap: 10px; color: #73808a; background: #fff; text-align: center; }
.empty-state h3, .empty-state p { margin: 0; }
.empty-state h3 { color: #2c3842; font-size: 17px; }
.empty-state p { font-size: 13px; }
.empty-state button { min-height: 36px; padding: 7px 14px; border: 1px solid #cfd7dd; border-radius: 6px; color: #384550; background: #fff; font: inherit; font-size: 12px; font-weight: 800; cursor: pointer; }
.site-footer { max-width: 1280px; min-height: 88px; margin: 0 auto; padding: 20px 24px; border-top: 1px solid #dfe4e8; display: flex; align-items: center; justify-content: space-between; gap: 24px; color: #7c8790; font-size: 11px; }
.site-footer > div { display: flex; align-items: center; gap: 18px; }
.site-footer p { max-width: 620px; margin: 0; line-height: 1.5; }
.site-footer a { display: inline-flex; align-items: center; gap: 4px; color: #41505c; font-weight: 800; }
.drawer-layer { position: fixed; inset: 0; z-index: 100; display: flex; justify-content: flex-end; background: rgba(12,20,28,.46); backdrop-filter: blur(3px); }
.detail-drawer { width: min(570px, 100vw); height: 100%; overflow-y: auto; background: #fff; box-shadow: -20px 0 60px rgba(11,20,29,.2); animation: slide-in .22s ease-out; }
.drawer-header { position: sticky; top: 0; z-index: 2; min-height: 70px; padding: 14px 22px; border-bottom: 1px solid #e0e5e9; display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,.96); backdrop-filter: blur(12px); }
.drawer-source { min-width: 0; display: flex; align-items: center; gap: 10px; }
.drawer-source span, .drawer-source small { display: block; }
.drawer-source span { font-size: 13px; font-weight: 900; }
.drawer-source small { margin-top: 2px; color: #7d8891; font-size: 10px; }
.icon-button { width: 38px; height: 38px; border: 1px solid #d8dfe4; border-radius: 6px; display: grid; place-items: center; color: #53606b; background: #fff; cursor: pointer; }
.drawer-body { padding: 28px 28px 36px; }
.drawer-title > span { color: #1d5bcf; font-size: 12px; font-weight: 900; }
.drawer-title > span i { color: #a5afb7; font-style: normal; }
.drawer-title > span b { font-size: 10px; }
.drawer-title > span b.available { color: #26704d; }
.drawer-title > span b.unavailable { color: #a52b2b; }
.drawer-title h2 { margin: 8px 0 0; font-size: 30px; line-height: 1.15; }
.drawer-title p { margin: 12px 0 0; color: #59656f; font-size: 14px; line-height: 1.7; }
.score-section { margin-top: 25px; padding: 19px; border: 1px solid #dfe5ea; border-radius: 8px; display: grid; grid-template-columns: 120px 1fr; gap: 22px; background: #f8fafb; }
.score-summary { border-right: 1px solid #dde3e7; }
.score-summary > div { display: flex; align-items: baseline; gap: 5px; }
.score-summary strong { font-size: 34px; line-height: 1; }
.score-summary span { color: #84909a; font-size: 12px; }
.score-summary p { margin: 9px 0 0; display: flex; align-items: center; gap: 6px; color: #2258c6; font-size: 10px; font-weight: 900; }
.score-list { display: grid; gap: 9px; }
.score-list > div > div:first-child { display: flex; align-items: center; justify-content: space-between; color: #68747e; font-size: 10px; }
.score-list strong { color: #26323c; }
.score-track { height: 5px; margin-top: 4px; overflow: hidden; border-radius: 99px; background: #dde4e9; }
.score-track i { display: block; height: 100%; border-radius: inherit; background: #2468f2; }
.attribute-section { margin-top: 22px; }
.attribute-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); border: 1px solid #dfe5ea; border-radius: 8px; overflow: hidden; background: #fff; }
.attribute-grid > div { min-height: 66px; padding: 12px; border-right: 1px solid #e5e9ec; border-bottom: 1px solid #e5e9ec; display: flex; flex-direction: column; justify-content: center; }
.attribute-grid > div:nth-child(3n) { border-right: 0; }
.attribute-grid > div:nth-last-child(-n+3) { border-bottom: 0; }
.attribute-grid span, .attribute-grid strong { display: block; }
.attribute-grid span { color: #7a858e; font-size: 10px; }
.attribute-grid strong { margin-top: 6px; overflow-wrap: anywhere; color: #35424c; font-size: 12px; }
.risk-text-low { color: #26704d !important; }
.risk-text-medium { color: #82550d !important; }
.risk-text-high { color: #a52b2b !important; }
.capability-list { margin-top: 10px; border: 1px solid #dfe5ea; border-radius: 8px; overflow: hidden; background: #fafbfc; }
.capability-list > div { min-height: 51px; padding: 10px 12px; border-bottom: 1px solid #e5e9ec; display: grid; grid-template-columns: 20px 68px 1fr; align-items: center; gap: 6px; }
.capability-list > div:last-child { border-bottom: 0; }
.capability-list svg { color: #5271b8; }
.capability-list span { color: #79848d; font-size: 10px; font-weight: 800; }
.capability-list p { margin: 0; color: #3f4c56; font-size: 11px; line-height: 1.5; }
.review-section, .install-section { margin-top: 28px; }
.review-section h3, .install-section h3 { margin: 0; font-size: 16px; }
.review-section blockquote { margin: 11px 0 0; padding: 14px 16px; border-left: 3px solid #2468f2; color: #45525d; background: #f5f8fc; font-size: 13px; line-height: 1.7; }
.review-section dl { margin: 14px 0 0; display: grid; gap: 10px; }
.review-section dl div { display: grid; grid-template-columns: 72px 1fr; gap: 10px; font-size: 12px; line-height: 1.55; }
.review-section dt { color: #7b8790; font-weight: 800; }
.review-section dd { margin: 0; color: #3e4b56; }
.install-section { padding: 20px; border: 1px solid #cfd9e3; border-radius: 8px; background: #f7f9fb; transition: box-shadow .2s, border-color .2s; }
.install-section.highlighted { border-color: #5d87e7; box-shadow: 0 0 0 4px rgba(36,104,242,.1); }
.section-heading { display: flex; justify-content: space-between; align-items: center; gap: 16px; }
.section-heading span { display: block; margin-bottom: 5px; color: #2468f2; font-size: 10px; font-weight: 900; text-transform: uppercase; }
.section-heading :deep(svg) { width: 29px; height: 29px; }
.install-section > p { margin: 12px 0 0; color: #66727c; font-size: 12px; line-height: 1.6; }
.command-box { min-height: 74px; margin-top: 14px; padding: 12px 44px 12px 13px; border: 1px solid #ccd5dd; border-radius: 6px; position: relative; display: flex; align-items: center; background: #fff; }
.command-box code { color: #273540; font: 11px/1.55 ui-monospace, SFMono-Regular, Consolas, monospace; overflow-wrap: anywhere; }
.command-box button { position: absolute; top: 8px; right: 8px; width: 30px; height: 30px; border: 0; border-radius: 5px; display: grid; place-items: center; color: #54616c; background: #eef2f5; cursor: pointer; }
.install-actions { margin-top: 11px; display: grid; grid-template-columns: 1fr auto; gap: 8px; }
.install-actions button, .install-actions a { min-height: 38px; padding: 8px 13px; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; gap: 7px; font: inherit; font-size: 12px; font-weight: 900; cursor: pointer; }
.install-primary { border: 1px solid #1c5ee5; color: #fff; background: #1c5ee5; }
.install-actions a { border: 1px solid #cbd4dc; color: #394650; background: #fff; }
.repo-metrics { margin-top: 18px; display: flex; flex-wrap: wrap; gap: 8px; }
.repo-metrics span { min-height: 29px; padding: 5px 9px; border: 1px solid #dce2e7; border-radius: 5px; display: inline-flex; align-items: center; gap: 5px; color: #68747e; background: #fff; font-size: 10px; }
@keyframes slide-in { from { transform: translateX(40px); opacity: .5; } to { transform: translateX(0); opacity: 1; } }
@media (max-width: 980px) {
  .header-inner { grid-template-columns: 1fr auto; }
  .header-nav { display: none; }
  .intro-inner { grid-template-columns: 1fr; gap: 28px; }
  .intro-stats { width: 100%; grid-template-columns: repeat(3,1fr); }
  .catalog-grid { grid-template-columns: minmax(0,1fr); gap: 18px; }
  .filter-panel { position: static; width: 100%; min-width: 0; max-height: none; padding-right: 0; overflow: hidden; }
  .skills-page--embedded .filter-panel { top: auto; max-height: none; }
  .filter-title, .editorial-note { display: none; }
  .filter-list { width: 100%; padding: 0 0 5px; display: flex; gap: 7px; overflow-x: auto; scrollbar-width: none; }
  .filter-list::-webkit-scrollbar { display: none; }
  .filter-list button { width: auto; min-width: max-content; padding: 8px 9px 8px 12px; border: 1px solid #d9e0e5; background: #fff; }
  .filter-list button.active { border-color: #bdd0fb; }
}
@media (max-width: 720px) {
  .header-inner { min-height: 60px; padding: 0 16px; }
  .brand { font-size: 17px; }
  .brand img { width: 38px; height: 38px; }
  .language-control :deep(.language-trigger) { width: auto; min-width: 0; }
  .language-control :deep(.language-trigger span) { display: none; }
  .intro-inner { padding: 34px 16px 30px; }
  .intro-copy h1 { font-size: 37px; }
  .intro-copy p { font-size: 15px; }
  .intro-stats { grid-template-columns: repeat(2,1fr); }
  .intro-stats div { min-height: 82px; padding: 12px; }
  .intro-stats div:nth-child(2) { border-right: 0; }
  .intro-stats div:nth-child(n+3) { border-top: 1px solid #dfe4e8; }
  .intro-stats strong { font-size: 21px; }
  .catalog-shell { padding: 20px 16px 52px; }
  .skills-page--embedded .catalog-shell { padding: 16px 16px 40px; }
  .mode-row { align-items: flex-start; flex-direction: column; gap: 10px; }
  .mode-row > p { line-height: 1.5; }
  .mode-switch { width: 100%; }
  .mode-switch button { flex: 1; justify-content: center; }
  .toolbar { grid-template-columns: 1fr; }
  .sort-control { min-width: 0; }
  .attribute-filters { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); }
  .compact-select, .official-toggle { width: 100%; }
  .compact-select select { width: 100%; max-width: none; }
  .skills-grid { grid-template-columns: 1fr; }
  .skill-card { min-height: 344px; }
  .site-footer { padding: 20px 16px; align-items: flex-start; }
  .site-footer > div { display: grid; gap: 7px; }
  .drawer-body { padding: 24px 18px 30px; }
  .drawer-header { padding-inline: 18px; }
  .drawer-title h2 { font-size: 27px; }
  .score-section { grid-template-columns: 1fr; gap: 16px; }
  .score-summary { padding-bottom: 14px; border-right: 0; border-bottom: 1px solid #dde3e7; }
  .attribute-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
  .attribute-grid > div:nth-child(3n) { border-right: 1px solid #e5e9ec; }
  .attribute-grid > div:nth-child(2n) { border-right: 0; }
  .attribute-grid > div:nth-last-child(-n+3) { border-bottom: 1px solid #e5e9ec; }
  .attribute-grid > div:nth-last-child(-n+2) { border-bottom: 0; }
  .capability-list > div { grid-template-columns: 20px 62px 1fr; }
  .install-actions { grid-template-columns: 1fr; }
}
</style>
