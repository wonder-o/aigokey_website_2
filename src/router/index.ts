export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/subscription/',
    name: 'subscription',
    component: () => import('@/views/SubscriptionView.vue'),
  },
  {
    path: '/codex-help/',
    name: 'codex-help',
    component: () => import('@/views/CodexHelpView.vue'),
  },
  {
    path: '/codex-help/embed/',
    name: 'codex-help-embed',
    component: () => import('@/views/CodexHelpView.vue'),
    props: { embedded: true },
    meta: { noindex: true },
  },
  {
    path: '/skills/',
    name: 'skills',
    component: () => import('@/views/SkillsView.vue'),
  },
  {
    path: '/codex-cases/',
    name: 'codex-cases',
    component: () => import('@/views/CasesView.vue'),
  },
  {
    path: '/workflows/',
    name: 'workflows',
    component: () => import('@/views/WorkflowsView.vue'),
  },
  {
    path: '/workflows/embed/',
    name: 'workflows-embed',
    component: () => import('@/views/WorkflowsView.vue'),
    props: { embedded: true },
    meta: { noindex: true },
  },
  {
    path: '/skills-list/',
    name: 'skills-list',
    component: () => import('@/views/SkillsListView.vue'),
    meta: { noindex: true },
  },
  {
    path: '/image-creation/',
    name: 'image-creation',
    component: () => import('@/views/ImageCreationView.vue'),
  },
  {
    path: '/image-prompts/',
    name: 'image-prompts',
    component: () => import('@/views/ImagePromptLibraryView.vue'),
  },
  {
    path: '/image-prompts/embed/',
    name: 'image-prompts-embed',
    component: () => import('@/views/ImagePromptLibraryView.vue'),
    props: { embedded: true },
    meta: { noindex: true },
  },
  {
    path: '/image-creation/cc-switch/',
    name: 'image-creation-cc-switch',
    component: () => import('@/views/ImageCreationCcSwitchView.vue'),
  },
  {
    path: '/image-creation/cc-switch/embed/',
    name: 'image-creation-cc-switch-embed',
    component: () => import('@/views/ImageCreationCcSwitchView.vue'),
    props: { embedded: true },
    meta: { noindex: true },
  },
  {
    path: '/image-setting/',
    name: 'image-setting',
    component: () => import('@/views/ImageSettingView.vue'),
  },
  {
    path: '/enterprise-service/',
    name: 'enterprise-service',
    component: () => import('@/views/EnterpriseServiceView.vue'),
  },
  {
    path: '/about/',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
  },
  {
    path: '/free-trial/',
    name: 'free-trial',
    component: () => import('@/views/FreeTrialView.vue'),
  },
  {
    path: '/blog/',
    name: 'blog',
    component: () => import('@/views/BlogView.vue'),
  },
  {
    path: '/blog/embed/',
    name: 'blog-embed',
    component: () => import('@/views/BlogView.vue'),
    props: { embedded: true },
    meta: { noindex: true },
  },
  {
    path: '/blog/:slug/',
    name: 'blog-article',
    component: () => import('@/views/BlogArticleView.vue'),
  },
]
