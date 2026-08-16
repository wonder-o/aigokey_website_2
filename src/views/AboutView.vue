<template>
  <div class="about-page">
    <SiteHeader @trial="showModal = true" />

    <main>
      <section class="hero-section">
        <div class="hero-shell">
          <div class="hero-copy">
            <p class="eyebrow">{{ page.hero.eyebrow }}</p>
            <h1>{{ page.hero.title }}</h1>
            <p class="hero-summary">{{ page.hero.summary }}</p>
            <div class="hero-actions">
              <router-link class="action action-primary" to="/subscription/">
                {{ page.hero.primary }}<ArrowRight :size="18" aria-hidden="true" />
              </router-link>
              <router-link class="action action-secondary" to="/enterprise-service/">
                {{ page.hero.secondary }}
              </router-link>
            </div>
          </div>

          <aside class="brand-system" :aria-label="page.hero.signal">
            <header>
              <span class="brand-mark"><img src="/assets/aigokey-logo.png" alt="AIGOKEY Logo" /></span>
              <div><span>{{ page.hero.signal }}</span></div>
              <i><span></span>ACTIVE</i>
            </header>
            <ol>
              <li v-for="stage in page.hero.stages" :key="stage.code">
                <span class="stage-code">{{ stage.code }}</span>
                <div><strong>{{ stage.title }}</strong><p>{{ stage.text }}</p></div>
                <Check :size="17" aria-hidden="true" />
              </li>
            </ol>
          </aside>
        </div>
      </section>

      <section class="section position-section">
        <div class="shell">
          <div class="section-heading position-heading">
            <div><p class="eyebrow">{{ page.position.eyebrow }}</p><h2>{{ page.position.title }}</h2></div>
            <p>{{ page.position.intro }}</p>
          </div>
          <div class="audience-grid">
            <article v-for="(item, index) in page.position.audiences" :key="item.label">
              <header><span>0{{ index + 1 }}</span><i>{{ item.label }}</i></header>
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="section path-section">
        <div class="shell">
          <div class="section-heading path-heading">
            <div><p class="eyebrow">{{ page.path.eyebrow }}</p><h2>{{ page.path.title }}</h2></div>
            <p>{{ page.path.intro }}</p>
          </div>
          <div class="path-board">
            <ol>
              <li v-for="step in page.path.steps" :key="step.code">
                <span class="path-code">{{ step.code }}</span>
                <div><strong>{{ step.title }}</strong><p>{{ step.text }}</p></div>
                <ArrowRight :size="17" aria-hidden="true" />
              </li>
            </ol>
            <footer><span>{{ page.path.outcomeLabel }}</span><strong>{{ page.path.outcome }}</strong></footer>
          </div>
        </div>
      </section>

      <section class="section principles-section">
        <div class="shell principles-layout">
          <div class="section-heading principles-heading">
            <p class="eyebrow">{{ page.principles.eyebrow }}</p>
            <h2>{{ page.principles.title }}</h2>
            <p>{{ page.principles.intro }}</p>
          </div>
          <div class="principle-list">
            <article v-for="(item, index) in page.principles.items" :key="item.title">
              <span class="principle-icon"><component :is="principleIcons[index]" :size="21" aria-hidden="true" /></span>
              <div><h3>{{ item.title }}</h3><p>{{ item.text }}</p></div>
              <span class="principle-num">0{{ index + 1 }}</span>
            </article>
          </div>
        </div>
      </section>

      <section class="direction-section">
        <div class="shell direction-grid">
          <div>
            <p class="eyebrow">{{ page.direction.eyebrow }}</p>
            <h2>{{ page.direction.title }}</h2>
            <p>{{ page.direction.text }}</p>
          </div>
          <ol class="direction-formula">
            <li v-for="(item, index) in page.direction.formula" :key="item">
              <span>0{{ index + 1 }}</span><strong>{{ item }}</strong>
            </li>
          </ol>
        </div>
      </section>

      <section class="cta-section">
        <div class="shell cta-shell">
          <div><p class="eyebrow">{{ page.cta.eyebrow }}</p><h2>{{ page.cta.title }}</h2><p>{{ page.cta.text }}</p></div>
          <div class="cta-actions">
            <router-link class="action action-primary" to="/subscription/">{{ page.cta.plans }}<ArrowRight :size="18" aria-hidden="true" /></router-link>
            <router-link class="action action-secondary" to="/enterprise-service/">{{ page.cta.enterprise }}</router-link>
            <router-link class="support-link" to="/codex-help/#support">{{ page.cta.support }}<ArrowRight :size="16" aria-hidden="true" /></router-link>
          </div>
        </div>
      </section>
    </main>

    <SiteFooter />

    <Teleport to="body">
      <div v-if="showModal" class="trial-modal" @click.self="showModal = false">
        <div class="trial-dialog" role="dialog" aria-modal="true" :aria-label="t.modal.title">
          <header><h2>{{ t.modal.title }}</h2><button type="button" :aria-label="lang === 'en' ? 'Close' : '关闭'" @click="showModal = false"><X :size="19" aria-hidden="true" /></button></header>
          <div><img src="/assets/customer-service-qr.png" alt="QR" /><p>{{ t.modal.text }}</p></div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { ArrowRight, Check, CircleDot, Gauge, Layers3, ShieldCheck, Workflow, X } from '@lucide/vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import { toTraditionalText, useI18n } from '@/composables/useI18n'
import { aboutEn, aboutZh } from '@/data/about'
import { SITE_ORIGIN } from '@/config/site'

const { lang, t } = useI18n()
const showModal = ref(false)
const principleIcons = [Gauge, CircleDot, ShieldCheck, Workflow, Layers3]

function localizeTraditional<T>(value: T): T {
  if (typeof value === 'string') return toTraditionalText(value) as T
  if (Array.isArray(value)) return value.map((item) => localizeTraditional(item)) as T
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, nested]) => [key, localizeTraditional(nested)])) as T
  return value
}

const page = computed(() => lang.value === 'en' ? aboutEn : lang.value === 'zh-TW' ? localizeTraditional(aboutZh) : aboutZh)
const aboutSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'AboutPage', name: 'About AIGOKEY', url: `${SITE_ORIGIN}/about/`, mainEntity: { '@id': `${SITE_ORIGIN}/#organization` } },
    { '@type': 'Organization', '@id': `${SITE_ORIGIN}/#organization`, name: 'AIGOKEY', url: `${SITE_ORIGIN}/`, logo: `${SITE_ORIGIN}/assets/aigokey-logo.png`, description: 'Standardized AI access and enterprise Forward Deployed Engineering.' },
  ],
})

useHead(() => ({
  title: page.value.meta.title,
  meta: [
    { name: 'description', content: page.value.meta.description },
    { name: 'keywords', content: page.value.meta.keywords },
    { property: 'og:title', content: page.value.meta.title },
    { property: 'og:description', content: page.value.meta.description },
    { property: 'og:type', content: 'website' },
  ],
  script: [{ type: 'application/ld+json', children: aboutSchema }],
}))
</script>

<style scoped>
.about-page {
  --about-ink: #14293a;
  --about-muted: #5d7283;
  --about-line: #d7e3e9;
  --about-blue: #176fc1;
  --about-green: #16835b;
  --about-canvas: #f7fafc;
  --about-mint: #f2f8f6;
  --about-sky: #eef5fa;
  min-height: 100vh;
  overflow: clip;
  color: var(--about-ink);
  background: var(--about-canvas);
  font-family: "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
}
.about-page :where(h1, h2, h3, p) { margin: 0; }
.about-page :where(a) { color: inherit; text-decoration: none; }
.shell { width: min(1180px, calc(100% - 48px)); margin: 0 auto; }
.section { padding: 104px 0; }
.eyebrow { color: var(--about-blue); font-family: "Cascadia Code", "SFMono-Regular", monospace; font-size: 12px; font-weight: 800; line-height: 1.5; }
.section-heading h2, .principles-heading h2, .direction-section h2, .cta-section h2 { margin-top: 13px; font-size: 42px; font-weight: 900; line-height: 1.2; }
.section-heading > p, .principles-heading > p:last-child, .direction-section div > p:last-child, .cta-shell > div > p:last-child { color: var(--about-muted); font-size: 16px; line-height: 1.8; }

.hero-section { position: relative; overflow: hidden; border-bottom: 1px solid var(--about-line); background: #fbfdfe; }
.hero-section::before { content: ""; position: absolute; inset: 0; pointer-events: none; opacity: .8; background-image: linear-gradient(rgba(54,117,158,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(54,117,158,.055) 1px,transparent 1px); background-size: 52px 52px; mask-image: linear-gradient(180deg,#000,transparent 92%); }
.hero-shell { position: relative; width: min(1180px, calc(100% - 48px)); min-height: 680px; margin: 0 auto; padding: 86px 0 94px; display: grid; grid-template-columns: minmax(0,1.08fr) minmax(400px,.92fr); gap: 74px; align-items: center; }
.hero-copy h1 { max-width: 710px; margin-top: 18px; font-size: 58px; font-weight: 950; line-height: 1.1; }
.hero-summary { max-width: 700px; margin-top: 25px; color: var(--about-muted); font-size: 18px; line-height: 1.85; }
.hero-actions, .cta-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-top: 32px; }
.action { min-height: 48px; display: inline-flex; align-items: center; justify-content: center; gap: 10px; padding: 0 20px; border: 1px solid transparent; border-radius: 7px; font-size: 14px; font-weight: 850; transition: transform .2s ease, background-color .2s ease, border-color .2s ease; }
.action:hover { transform: translateY(-2px); }
.action:focus-visible, .support-link:focus-visible { outline: 3px solid rgba(23,111,193,.24); outline-offset: 3px; }
.action-primary { color: #fff; background: #176fc1; box-shadow: 0 14px 30px rgba(23,111,193,.18); }
.action-primary:hover { background: #125a9d; }
.action-secondary { border-color: #bdd0db; background: rgba(255,255,255,.82); }
.action-secondary:hover { border-color: #7fa7bd; background: #fff; }

.brand-system { overflow: hidden; border: 1px solid #ccdae1; border-radius: 8px; background: rgba(255,255,255,.92); box-shadow: 0 28px 70px rgba(26,67,91,.12); }
.brand-system > header { min-height: 78px; display: grid; grid-template-columns: auto minmax(0,1fr) auto; gap: 13px; align-items: center; padding: 13px 18px; border-bottom: 1px solid var(--about-line); }
.brand-mark { display: block; width: 39px; height: 39px; overflow: hidden; }
.brand-mark img { display: block; width: 39px; height: 39px; object-fit: cover; }
.brand-system header div { min-width: 0; display: grid; gap: 3px; }
.brand-system header div span { overflow: hidden; color: #718595; font-family: "Cascadia Code",monospace; font-size: 9px; white-space: nowrap; text-overflow: ellipsis; }
.brand-system header i { display: flex; align-items: center; gap: 7px; color: var(--about-green); font-family: "Cascadia Code",monospace; font-size: 9px; font-style: normal; font-weight: 800; }
.brand-system header i span { width: 7px; height: 7px; border-radius: 50%; background: #2bb978; box-shadow: 0 0 0 5px rgba(43,185,120,.12); }
.brand-system ol { margin: 0; padding: 8px 20px; list-style: none; }
.brand-system li { min-height: 100px; display: grid; grid-template-columns: 38px minmax(0,1fr) auto; gap: 14px; align-items: center; border-bottom: 1px solid #e2eaee; }
.brand-system li:last-child { border-bottom: 0; }
.stage-code { display: grid; width: 36px; height: 36px; place-items: center; border: 1px solid #a9c1cf; border-radius: 50%; color: var(--about-blue); font-family: "Cascadia Code",monospace; font-size: 10px; font-weight: 850; }
.brand-system li strong { font-size: 15px; }
.brand-system li p { margin-top: 6px; color: var(--about-muted); font-size: 12px; line-height: 1.55; }
.brand-system li > svg { color: var(--about-green); }

.position-section { background: #fff; }
.position-heading, .path-heading { display: grid; grid-template-columns: minmax(0,.9fr) minmax(340px,.68fr); gap: 90px; align-items: end; }
.audience-grid { margin-top: 64px; display: grid; grid-template-columns: repeat(3,1fr); border-top: 1px solid #b9ccd6; border-bottom: 1px solid var(--about-line); }
.audience-grid article { min-height: 284px; padding: 32px 30px 34px; border-right: 1px solid var(--about-line); }
.audience-grid article:first-child { padding-left: 0; }
.audience-grid article:last-child { padding-right: 0; border-right: 0; }
.audience-grid header { display: flex; align-items: center; justify-content: space-between; gap: 16px; color: var(--about-blue); font-family: "Cascadia Code",monospace; font-size: 10px; font-style: normal; font-weight: 800; }
.audience-grid header i { font-style: normal; }
.audience-grid h3 { margin-top: 46px; font-size: 23px; }
.audience-grid article > p { margin-top: 15px; color: var(--about-muted); font-size: 14px; line-height: 1.75; }

.path-section { background: var(--about-sky); }
.path-heading > p { max-width: 500px; }
.path-board { margin-top: 58px; border: 1px solid #c8d9e2; border-radius: 8px; background: rgba(255,255,255,.76); box-shadow: 0 22px 55px rgba(31,78,105,.08); }
.path-board ol { margin: 0; padding: 0; display: grid; grid-template-columns: repeat(6,1fr); list-style: none; }
.path-board li { position: relative; min-height: 198px; padding: 27px 21px 24px; border-right: 1px solid var(--about-line); }
.path-board li:last-child { border-right: 0; }
.path-code { display: inline-grid; width: 32px; height: 32px; place-items: center; border-radius: 50%; color: #fff; background: var(--about-blue); font-family: "Cascadia Code",monospace; font-size: 9px; font-weight: 850; }
.path-board li div { margin-top: 33px; }
.path-board li strong { font-size: 15px; }
.path-board li p { margin-top: 8px; color: var(--about-muted); font-size: 12px; line-height: 1.55; }
.path-board li > svg { position: absolute; z-index: 1; top: 35px; right: -9px; padding: 3px; color: #6b94ad; background: #f5f9fb; }
.path-board li:last-child > svg { display: none; }
.path-board footer { min-height: 70px; display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 16px 22px; border-top: 1px solid #bdced8; color: #fff; background: #183447; }
.path-board footer span { color: #9fb8c8; font-family: "Cascadia Code",monospace; font-size: 10px; font-weight: 800; }
.path-board footer strong { font-size: 18px; }

.principles-section { background: #fbfdfe; }
.principles-layout { display: grid; grid-template-columns: minmax(280px,.72fr) minmax(0,1.28fr); gap: 96px; align-items: start; }
.principles-heading { position: sticky; top: 112px; }
.principles-heading > p:last-child { margin-top: 19px; }
.principle-list { border-top: 1px solid #b8cbd5; }
.principle-list article { min-height: 132px; display: grid; grid-template-columns: 45px minmax(0,1fr) auto; gap: 18px; align-items: center; padding: 23px 0; border-bottom: 1px solid var(--about-line); }
.principle-icon { display: grid; width: 43px; height: 43px; place-items: center; border: 1px solid #b8ced9; border-radius: 7px; color: var(--about-blue); background: var(--about-sky); }
.principle-list h3 { font-size: 18px; }
.principle-list p { margin-top: 8px; color: var(--about-muted); font-size: 13px; line-height: 1.65; }
.principle-num { align-self: start; padding-top: 7px; color: #96aebd; font-family: "Cascadia Code",monospace; font-size: 10px; }

.direction-section { padding: 98px 0; border-top: 1px solid var(--about-line); border-bottom: 1px solid var(--about-line); background: var(--about-mint); }
.direction-grid { display: grid; grid-template-columns: minmax(0,1fr) minmax(380px,.9fr); gap: 100px; align-items: center; }
.direction-section div > p:last-child { max-width: 680px; margin-top: 19px; }
.direction-formula { margin: 0; padding: 0; border-top: 1px solid #afc8bd; list-style: none; }
.direction-formula li { min-height: 72px; display: grid; grid-template-columns: 40px minmax(0,1fr); gap: 15px; align-items: center; border-bottom: 1px solid #cbded5; }
.direction-formula span { color: var(--about-green); font-family: "Cascadia Code",monospace; font-size: 10px; font-weight: 850; }
.direction-formula strong { font-size: 15px; }

.cta-section { padding: 90px 0; background: #fff; }
.cta-shell { display: grid; grid-template-columns: minmax(0,1fr) auto; gap: 70px; align-items: center; }
.cta-shell > div:first-child { max-width: 720px; }
.cta-shell > div > p:last-child { margin-top: 17px; }
.cta-actions { max-width: 390px; justify-content: flex-end; margin-top: 0; }
.support-link { display: inline-flex; align-items: center; gap: 7px; padding: 10px 4px; color: var(--about-blue); font-size: 13px; font-weight: 850; }

.trial-modal { position: fixed; z-index: 1000; inset: 0; display: grid; place-items: center; padding: 20px; background: rgba(16,35,48,.58); backdrop-filter: blur(5px); }
.trial-dialog { width: min(410px,100%); overflow: hidden; border-radius: 8px; background: #fff; box-shadow: 0 26px 80px rgba(13,32,44,.28); }
.trial-dialog > header { min-height: 58px; display: flex; align-items: center; justify-content: space-between; gap: 18px; padding: 0 20px; border-bottom: 1px solid #dce6eb; }
.trial-dialog h2 { font-size: 17px; }
.trial-dialog button { width: 36px; height: 36px; display: grid; place-items: center; padding: 0; border: 0; border-radius: 6px; color: #506777; background: transparent; cursor: pointer; }
.trial-dialog button:hover { background: #edf4f7; }
.trial-dialog > div { padding: 26px; text-align: center; }
.trial-dialog img { width: 210px; max-width: 100%; }
.trial-dialog p { margin-top: 14px; color: var(--about-muted); font-size: 14px; line-height: 1.7; }

@media (max-width: 1020px) {
  .hero-shell { min-height: auto; grid-template-columns: 1fr; gap: 48px; padding: 72px 0 78px; }
  .hero-copy { max-width: 780px; }
  .brand-system { max-width: 700px; }
  .path-board ol { grid-template-columns: repeat(3,1fr); }
  .path-board li:nth-child(3) { border-right: 0; }
  .path-board li:nth-child(-n+3) { border-bottom: 1px solid var(--about-line); }
  .path-board li:nth-child(3) > svg { display: none; }
  .direction-grid { gap: 64px; }
}

@media (max-width: 780px) {
  .shell, .hero-shell { width: min(100% - 36px,1180px); }
  .section { padding: 78px 0; }
  .hero-copy h1 { font-size: 43px; }
  .section-heading h2, .principles-heading h2, .direction-section h2, .cta-section h2 { font-size: 34px; }
  .position-heading, .path-heading, .principles-layout, .direction-grid, .cta-shell { grid-template-columns: 1fr; gap: 28px; }
  .audience-grid { grid-template-columns: 1fr; }
  .audience-grid article, .audience-grid article:first-child, .audience-grid article:last-child { min-height: auto; padding: 28px 0 31px; border-right: 0; border-bottom: 1px solid var(--about-line); }
  .audience-grid article:last-child { border-bottom: 0; }
  .audience-grid h3 { margin-top: 27px; }
  .principles-heading { position: static; }
  .direction-formula { margin-top: 8px; }
  .cta-actions { max-width: none; justify-content: flex-start; }
}

@media (max-width: 560px) {
  .hero-shell { padding: 59px 0 64px; }
  .hero-copy h1 { font-size: 36px; line-height: 1.14; }
  .hero-summary { font-size: 16px; }
  .hero-actions, .cta-actions { align-items: stretch; flex-direction: column; }
  .action { width: 100%; white-space: normal; text-align: center; }
  .brand-system > header { grid-template-columns: auto minmax(0,1fr); }
  .brand-system header i { display: none; }
  .brand-system li { min-height: 112px; grid-template-columns: 34px minmax(0,1fr); gap: 12px; }
  .brand-system li > svg { display: none; }
  .path-board ol { grid-template-columns: 1fr; }
  .path-board li, .path-board li:nth-child(3) { min-height: 128px; display: grid; grid-template-columns: 40px minmax(0,1fr); gap: 13px; align-items: center; padding: 22px; border-right: 0; border-bottom: 1px solid var(--about-line); }
  .path-board li:last-child { border-bottom: 0; }
  .path-board li div { margin-top: 0; }
  .path-board li > svg { display: none; }
  .path-board footer { align-items: flex-start; flex-direction: column; }
  .path-board footer strong { font-size: 16px; }
  .principle-list article { grid-template-columns: 43px minmax(0,1fr); }
  .principle-num { display: none; }
  .direction-section { padding: 75px 0; }
  .cta-section { padding: 74px 0; }
  .support-link { justify-content: center; }
}

@media (prefers-reduced-motion: reduce) {
  .action { transition: none; }
  .action:hover { transform: none; }
}
</style>
