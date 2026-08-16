<template>
  <div class="fde-page">
    <SiteHeader @trial="showModal = true" />

    <main>
      <section class="hero-section">
        <div class="hero-grid">
          <div class="hero-copy">
            <p class="eyebrow">{{ page.hero.eyebrow }}</p>
            <h1>{{ page.hero.title }}</h1>
            <p class="hero-summary">{{ page.hero.summary }}</p>
            <div class="hero-actions">
              <a class="action action-primary" href="#contact">{{ page.hero.primary }}<ArrowRight :size="18" aria-hidden="true" /></a>
              <a class="action action-secondary" href="#process">{{ page.hero.secondary }}</a>
            </div>
            <p class="hero-note"><CircleDot :size="15" aria-hidden="true" />{{ page.hero.note }}</p>
          </div>

          <aside class="deployment-trace" :aria-label="page.trace.label">
            <header class="trace-head"><span>{{ page.trace.label }}</span><i><span></span>{{ page.trace.live }}</i></header>
            <div class="trace-body">
              <div v-for="item in page.trace.steps" :key="item.code" class="trace-step">
                <span class="trace-code">{{ item.code }}</span>
                <div><strong>{{ item.title }}</strong><p>{{ item.text }}</p></div>
                <span class="trace-state">{{ item.state }}</span>
              </div>
            </div>
            <footer class="trace-outcome"><span>{{ page.trace.outcomeLabel }}</span><strong>{{ page.trace.outcome }}</strong></footer>
          </aside>
        </div>
        <div class="principle-strip" aria-label="FDE principles">
          <span v-for="item in page.principles" :key="item"><Check :size="15" aria-hidden="true" />{{ item }}</span>
        </div>
      </section>

      <section class="section section-signals">
        <div class="shell split-layout">
          <div class="section-intro sticky-intro"><p class="eyebrow">{{ page.signals.eyebrow }}</p><h2>{{ page.signals.head }}</h2><p>{{ page.signals.desc }}</p></div>
          <div class="fit-checker">
            <div class="fit-group fit-group-positive">
              <h3><Target :size="20" aria-hidden="true" />{{ page.signals.fitTitle }}</h3>
              <ul><li v-for="item in page.signals.fit" :key="item"><Check :size="16" aria-hidden="true" />{{ item }}</li></ul>
            </div>
            <div class="fit-group fit-group-neutral">
              <h3>{{ page.signals.notTitle }}</h3>
              <ul><li v-for="item in page.signals.notFit" :key="item"><span aria-hidden="true">-</span>{{ item }}</li></ul>
            </div>
          </div>
        </div>
      </section>

      <section class="section section-capabilities">
        <div class="shell">
          <div class="section-intro wide-intro"><p class="eyebrow">{{ page.capabilities.eyebrow }}</p><h2>{{ page.capabilities.head }}</h2><p>{{ page.capabilities.desc }}</p></div>
          <div class="capability-list">
            <article v-for="(item, index) in page.capabilities.items" :key="item.title" class="capability-row">
              <div class="capability-mark"><component :is="capabilityIcons[index]" :size="23" aria-hidden="true" /></div>
              <div class="capability-copy"><span>{{ String(index + 1).padStart(2, '0') }}</span><h3>{{ item.title }}</h3><p>{{ item.text }}</p></div>
              <p class="capability-output">{{ item.output }}</p>
            </article>
          </div>
        </div>
      </section>

      <section id="process" class="section section-process">
        <div class="shell">
          <div class="section-intro process-intro"><p class="eyebrow">{{ page.process.eyebrow }}</p><h2>{{ page.process.head }}</h2><p>{{ page.process.desc }}</p></div>
          <ol class="process-list">
            <li v-for="phase in page.process.phases" :key="phase.num">
              <span class="phase-num">{{ phase.num }}</span>
              <div class="phase-copy"><h3>{{ phase.title }}</h3><p>{{ phase.text }}</p></div>
              <p class="phase-gate"><ClipboardCheck :size="16" aria-hidden="true" />{{ phase.gate }}</p>
            </li>
          </ol>
        </div>
      </section>

      <section class="section section-delivery">
        <div class="shell">
          <div class="delivery-heading"><div class="section-intro"><p class="eyebrow">{{ page.delivery.eyebrow }}</p><h2>{{ page.delivery.head }}</h2></div><p>{{ page.delivery.desc }}</p></div>
          <div class="delivery-grid"><article v-for="item in page.delivery.items" :key="item.label"><span>{{ item.label }}</span><h3>{{ item.title }}</h3><p>{{ item.text }}</p></article></div>
          <p class="delivery-standard"><Gauge :size="18" aria-hidden="true" />{{ page.delivery.standard }}</p>
        </div>
      </section>

      <section class="section section-engagement">
        <div class="shell">
          <div class="section-intro wide-intro"><p class="eyebrow">{{ page.engagement.eyebrow }}</p><h2>{{ page.engagement.head }}</h2><p>{{ page.engagement.desc }}</p></div>
          <div class="engagement-grid">
            <article v-for="(mode, index) in page.engagement.modes" :key="mode.label">
              <header><span>0{{ index + 1 }}</span><i>{{ mode.label }}</i></header><h3>{{ mode.title }}</h3><p>{{ mode.text }}</p><strong>{{ mode.bestFor }}</strong>
            </article>
          </div>
          <p class="engagement-note"><ShieldCheck :size="18" aria-hidden="true" />{{ page.engagement.note }}</p>
        </div>
      </section>

      <section class="section section-faq">
        <div class="shell split-layout">
          <div class="section-intro sticky-intro"><p class="eyebrow">{{ page.faq.eyebrow }}</p><h2>{{ page.faq.head }}</h2></div>
          <div class="faq-list">
            <details v-for="(item, index) in page.faq.items" :key="item.q" :open="index === 0">
              <summary><span>{{ String(index + 1).padStart(2, '0') }}</span>{{ item.q }}</summary><p>{{ item.a }}</p>
            </details>
          </div>
        </div>
      </section>

      <section id="contact" class="contact-section">
        <div class="shell contact-grid">
          <div class="contact-copy">
            <p class="eyebrow">{{ page.contact.eyebrow }}</p><h2>{{ page.contact.head }}</h2><p>{{ page.contact.text }}</p>
            <div class="contact-brief"><span>{{ page.contact.briefLabel }}</span><ul><li v-for="item in page.contact.list" :key="item"><Check :size="15" aria-hidden="true" />{{ item }}</li></ul></div>
            <p class="contact-promise"><ShieldCheck :size="17" aria-hidden="true" />{{ page.contact.promise }}</p>
          </div>
          <aside class="qr-panel" :aria-label="page.contact.qrLabel">
            <div class="qr-head"><Building2 :size="20" aria-hidden="true" /><strong>{{ page.contact.qrLabel }}</strong></div>
            <img src="/assets/customer-service-qr.png" :alt="page.contact.qrLabel" /><p>{{ page.contact.qrText }}</p>
          </aside>
        </div>
      </section>
    </main>

    <SiteFooter />

    <Teleport to="body">
      <div v-if="showModal" class="trial-modal" @click.self="showModal = false">
        <div class="trial-dialog" role="dialog" aria-modal="true" :aria-label="t.modal.title">
          <header><h2>{{ t.modal.title }}</h2><button type="button" :aria-label="page.close" @click="showModal = false">&times;</button></header>
          <div><img src="/assets/customer-service-qr.png" alt="QR" /><p>{{ t.modal.text }}</p></div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { ArrowRight, Building2, Check, CircleDot, ClipboardCheck, Gauge, Layers3, ShieldCheck, Target, Workflow } from '@lucide/vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import { toTraditionalText, useI18n } from '@/composables/useI18n'
import { enterpriseFdeEn, enterpriseFdeZh } from '@/data/enterprise-fde'
import { SITE_ORIGIN } from '@/config/site'

const { lang, t } = useI18n()
const showModal = ref(false)
const capabilityIcons = [Target, Layers3, ShieldCheck, Workflow]

function localizeTraditional<T>(value: T): T {
  if (typeof value === 'string') return toTraditionalText(value) as T
  if (Array.isArray(value)) return value.map((item) => localizeTraditional(item)) as T
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, nested]) => [key, localizeTraditional(nested)])) as T
  return value
}

const page = computed(() => lang.value === 'en' ? enterpriseFdeEn : lang.value === 'zh-TW' ? localizeTraditional(enterpriseFdeZh) : enterpriseFdeZh)
const serviceSchema = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Service', name: 'AIGOKEY Enterprise FDE Service', provider: { '@type': 'Organization', name: 'AIGOKEY', url: `${SITE_ORIGIN}/` }, serviceType: 'Forward Deployed Engineering', areaServed: 'Worldwide', url: `${SITE_ORIGIN}/enterprise-service/` })

useHead(() => ({
  title: page.value.meta.title,
  meta: [
    { name: 'description', content: page.value.meta.description },
    { name: 'keywords', content: page.value.meta.keywords },
    { property: 'og:title', content: page.value.meta.title },
    { property: 'og:description', content: page.value.meta.description },
    { property: 'og:type', content: 'website' },
  ],
  script: [{ type: 'application/ld+json', children: serviceSchema }],
}))
</script>

<style scoped>
.fde-page {
  --fde-ink: #101a20;
  --fde-muted: #53636f;
  --fde-line: #d8e1e6;
  --fde-paper: #fff;
  --fde-frost: #eef4f7;
  --fde-blue: #1265e8;
  --fde-green: #168b5c;
  --fde-mint: #dff5e9;
  min-height: 100vh;
  color: var(--fde-ink);
  background: var(--fde-paper);
  font-family: "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
}
.fde-page :where(h1, h2, h3, p) { margin: 0; }
.fde-page :where(a) { color: inherit; text-decoration: none; }
.shell { width: min(1180px, calc(100% - 48px)); margin: 0 auto; }
.section { padding: 104px 0; }
.eyebrow { color: var(--fde-blue); font-family: "Cascadia Code", "SFMono-Regular", monospace; font-size: 12px; font-weight: 750; line-height: 1.5; }

.hero-section { position: relative; overflow: hidden; padding: 78px 0 0; border-bottom: 1px solid var(--fde-line); background: #f7fafb; }
.hero-section::before { content: ""; position: absolute; inset: 0; pointer-events: none; background-image: linear-gradient(rgba(16,26,32,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(16,26,32,.045) 1px,transparent 1px); background-size: 48px 48px; mask-image: linear-gradient(to bottom,#000,transparent 78%); }
.hero-grid { position: relative; width: min(1180px, calc(100% - 48px)); margin: 0 auto; display: grid; grid-template-columns: minmax(0,1.12fr) minmax(390px,.88fr); gap: 72px; align-items: center; padding-bottom: 72px; }
.hero-copy h1 { max-width: 720px; margin-top: 18px; font-family: "Arial Black", "HarmonyOS Sans SC", "PingFang SC", sans-serif; font-size: 64px; font-weight: 900; line-height: 1.08; }
.hero-summary { max-width: 720px; margin-top: 24px; color: var(--fde-muted); font-size: 17px; line-height: 1.85; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
.action { min-height: 48px; display: inline-flex; align-items: center; justify-content: center; gap: 10px; padding: 0 20px; border: 1px solid transparent; border-radius: 7px; font-size: 15px; font-weight: 800; transition: transform .2s ease,background-color .2s ease,border-color .2s ease; }
.action:hover { transform: translateY(-2px); }
.action:focus-visible { outline: 3px solid rgba(18,101,232,.28); outline-offset: 3px; }
.action-primary { color: #fff; background: var(--fde-blue); box-shadow: 0 14px 28px rgba(18,101,232,.2); }
.action-primary:hover { background: #0a48ad; }
.action-secondary { border-color: #bbc8cf; background: rgba(255,255,255,.72); }
.hero-note { display: flex; align-items: flex-start; gap: 8px; margin-top: 18px; color: #60727e; font-size: 13px; line-height: 1.6; }
.hero-note svg { flex: 0 0 auto; margin-top: 3px; color: var(--fde-green); }

.deployment-trace { overflow: hidden; border: 1px solid #cfd9df; border-radius: 8px; background: rgba(255,255,255,.92); box-shadow: 0 28px 72px rgba(16,26,32,.12); }
.trace-head { min-height: 54px; display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 0 20px; border-bottom: 1px solid var(--fde-line); color: #31444f; font-size: 13px; font-weight: 800; }
.trace-head i { display: inline-flex; align-items: center; gap: 7px; color: var(--fde-green); font-family: "Cascadia Code",monospace; font-size: 10px; font-style: normal; }
.trace-head i span { width: 7px; height: 7px; border-radius: 50%; background: #26a96c; box-shadow: 0 0 0 5px rgba(38,169,108,.12); }
.trace-body { padding: 9px 20px; }
.trace-step { position: relative; min-height: 92px; display: grid; grid-template-columns: 34px minmax(0,1fr) auto; gap: 13px; align-items: center; border-bottom: 1px solid #e2e8eb; }
.trace-step:last-child { border-bottom: 0; }
.trace-step:not(:last-child)::after { content: ""; position: absolute; left: 16px; top: 62px; width: 1px; height: 60px; background: #9ab8d0; }
.trace-code { position: relative; z-index: 1; display: grid; width: 34px; height: 34px; place-items: center; border: 1px solid #9bb8d0; border-radius: 50%; color: var(--fde-blue); background: #fff; font-family: "Cascadia Code",monospace; font-size: 10px; font-weight: 800; }
.trace-step strong { font-size: 15px; }
.trace-step p { margin-top: 5px; color: var(--fde-muted); font-size: 12px; line-height: 1.5; }
.trace-state { padding: 5px 8px; border-radius: 4px; color: #166e4e; background: var(--fde-mint); font-size: 11px; font-weight: 800; }
.trace-outcome { display: grid; gap: 5px; padding: 18px 20px; border-top: 1px solid #cbd7dc; color: #fff; background: var(--fde-ink); }
.trace-outcome span { color: #9fb0ba; font-family: "Cascadia Code",monospace; font-size: 10px; }
.trace-outcome strong { font-size: 18px; }
.principle-strip { position: relative; width: min(1180px, calc(100% - 48px)); min-height: 66px; margin: 0 auto; display: grid; grid-template-columns: repeat(4,1fr); border-top: 1px solid var(--fde-line); }
.principle-strip span { display: flex; align-items: center; gap: 9px; padding: 0 20px; border-right: 1px solid var(--fde-line); color: #42545f; font-size: 13px; font-weight: 750; }
.principle-strip span:first-child { padding-left: 0; }
.principle-strip span:last-child { border-right: 0; }
.principle-strip svg { color: var(--fde-green); }

.section-intro h2 { margin-top: 13px; font-family: "Arial Black", "HarmonyOS Sans SC", "PingFang SC", sans-serif; font-size: 42px; font-weight: 900; line-height: 1.18; }
.section-intro > p:last-child { margin-top: 18px; color: var(--fde-muted); font-size: 16px; line-height: 1.8; }
.wide-intro { max-width: 850px; }
.wide-intro > p:last-child { max-width: 680px; }
.split-layout { display: grid; grid-template-columns: minmax(280px,.78fr) minmax(0,1.22fr); gap: 92px; align-items: start; }
.sticky-intro { position: sticky; top: 116px; }

.fit-checker { border-top: 1px solid #aebdc5; }
.fit-group { padding: 30px 0; border-bottom: 1px solid var(--fde-line); }
.fit-group h3 { display: flex; align-items: center; gap: 10px; font-size: 18px; }
.fit-group-positive h3 { color: #116a48; }
.fit-group ul { display: grid; gap: 15px; margin: 21px 0 0; padding: 0; list-style: none; }
.fit-group li { display: grid; grid-template-columns: 20px minmax(0,1fr); gap: 11px; color: #3d4e58; font-size: 15px; line-height: 1.7; }
.fit-group-positive li svg { margin-top: 5px; color: var(--fde-green); }
.fit-group-neutral { padding-bottom: 0; border-bottom: 0; }
.fit-group-neutral h3,.fit-group-neutral li { color: #687780; }

.section-capabilities { background: var(--fde-frost); }
.capability-list { margin-top: 54px; border-top: 1px solid #acbcc5; }
.capability-row { min-height: 184px; display: grid; grid-template-columns: 66px minmax(0,1fr) minmax(260px,.58fr); gap: 28px; align-items: center; padding: 28px 0; border-bottom: 1px solid #cbd6dc; }
.capability-mark { display: grid; width: 50px; height: 50px; place-items: center; border: 1px solid #a9bdc8; border-radius: 7px; color: var(--fde-blue); background: #fff; }
.capability-copy > span { color: var(--fde-blue); font-family: "Cascadia Code",monospace; font-size: 11px; font-weight: 800; }
.capability-copy h3 { margin-top: 6px; font-size: 23px; }
.capability-copy p { max-width: 620px; margin-top: 11px; color: var(--fde-muted); font-size: 15px; line-height: 1.72; }
.capability-output { padding: 16px 18px; border-left: 3px solid var(--fde-green); color: #36504a; background: rgba(255,255,255,.74); font-size: 13px; font-weight: 700; line-height: 1.6; }

.section-process { color: #f6fafc; background: var(--fde-ink); }
.process-intro { max-width: 860px; }
.process-intro .eyebrow { color: #6da3ff; }
.process-intro > p:last-child { max-width: 720px; color: #a8b6be; }
.process-list { margin: 58px 0 0; padding: 0; border-top: 1px solid #3e505a; list-style: none; }
.process-list li { min-height: 148px; display: grid; grid-template-columns: 70px minmax(0,1fr) minmax(280px,.7fr); gap: 30px; align-items: center; padding: 25px 0; border-bottom: 1px solid #34454e; }
.phase-num { color: #6da3ff; font-family: "Cascadia Code",monospace; font-size: 13px; font-weight: 800; }
.phase-copy h3 { font-size: 22px; }
.phase-copy p { max-width: 610px; margin-top: 9px; color: #a8b6be; font-size: 14px; line-height: 1.7; }
.phase-gate { display: flex; align-items: flex-start; gap: 9px; padding: 14px 16px; border: 1px solid #42555f; border-radius: 6px; color: #cad5da; background: #17252c; font-size: 13px; line-height: 1.55; }
.phase-gate svg { flex: 0 0 auto; margin-top: 2px; color: #63c895; }

.section-delivery { background: #eaf6f0; }
.delivery-heading { display: grid; grid-template-columns: minmax(0,1.25fr) minmax(280px,.75fr); gap: 60px; align-items: end; }
.delivery-heading > p { color: #4d655b; font-size: 15px; line-height: 1.75; }
.delivery-grid { display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); margin-top: 50px; border-top: 1px solid #aac9bb; border-bottom: 1px solid #aac9bb; }
.delivery-grid article { min-height: 250px; padding: 28px 24px; border-right: 1px solid #aac9bb; }
.delivery-grid article:first-child { padding-left: 0; }
.delivery-grid article:last-child { padding-right: 0; border-right: 0; }
.delivery-grid span { color: #15744f; font-family: "Cascadia Code",monospace; font-size: 10px; font-weight: 800; }
.delivery-grid h3 { margin-top: 24px; font-size: 21px; }
.delivery-grid p { margin-top: 13px; color: #496158; font-size: 14px; line-height: 1.75; }
.delivery-standard,.engagement-note { display: flex; align-items: flex-start; gap: 10px; margin-top: 28px; font-size: 14px; font-weight: 750; line-height: 1.6; }
.delivery-standard svg,.engagement-note svg { flex: 0 0 auto; margin-top: 2px; color: var(--fde-green); }

.engagement-grid { display: grid; grid-template-columns: repeat(3,1fr); margin-top: 52px; border-top: 1px solid #acbbc3; border-bottom: 1px solid #acbbc3; }
.engagement-grid article { min-height: 315px; display: flex; flex-direction: column; padding: 28px; border-right: 1px solid var(--fde-line); }
.engagement-grid article:first-child { padding-left: 0; }
.engagement-grid article:last-child { padding-right: 0; border-right: 0; }
.engagement-grid header { display: flex; align-items: center; justify-content: space-between; gap: 15px; }
.engagement-grid header span { color: #91a0a8; font-family: "Cascadia Code",monospace; font-size: 12px; }
.engagement-grid header i { color: var(--fde-blue); font-family: "Cascadia Code",monospace; font-size: 10px; font-style: normal; font-weight: 800; }
.engagement-grid h3 { margin-top: 44px; font-size: 23px; }
.engagement-grid p { margin-top: 14px; color: var(--fde-muted); font-size: 14px; line-height: 1.75; }
.engagement-grid strong { margin-top: auto; padding-top: 28px; color: #40545f; font-size: 13px; line-height: 1.6; }

.section-faq { background: #f7fafb; }
.faq-list { border-top: 1px solid #9fafb8; }
.faq-list details { border-bottom: 1px solid var(--fde-line); }
.faq-list summary { display: grid; grid-template-columns: 42px minmax(0,1fr) auto; align-items: center; gap: 12px; padding: 23px 0; cursor: pointer; font-size: 17px; font-weight: 800; list-style: none; }
.faq-list summary::-webkit-details-marker { display: none; }
.faq-list summary::after { content: "+"; color: var(--fde-blue); font-family: monospace; font-size: 22px; }
.faq-list details[open] summary::after { content: "-"; }
.faq-list summary span { color: #8899a3; font-family: "Cascadia Code",monospace; font-size: 11px; }
.faq-list details > p { padding: 0 44px 24px 54px; color: var(--fde-muted); font-size: 15px; line-height: 1.8; }

.contact-section { padding: 98px 0; color: #fff; background: #16252c; }
.contact-grid { display: grid; grid-template-columns: minmax(0,1fr) 340px; gap: 84px; align-items: center; }
.contact-copy .eyebrow { color: #6da3ff; }
.contact-copy h2 { max-width: 760px; margin-top: 14px; font-family: "Arial Black", "HarmonyOS Sans SC", "PingFang SC", sans-serif; font-size: 44px; line-height: 1.18; }
.contact-copy > p:not(.eyebrow,.contact-promise) { max-width: 740px; margin-top: 20px; color: #b1bfc6; font-size: 16px; line-height: 1.8; }
.contact-brief { max-width: 760px; margin-top: 28px; padding: 22px 0; border-top: 1px solid #40525b; border-bottom: 1px solid #40525b; }
.contact-brief > span { color: #dbe4e8; font-size: 14px; font-weight: 800; }
.contact-brief ul { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 12px 22px; margin: 18px 0 0; padding: 0; list-style: none; }
.contact-brief li { display: grid; grid-template-columns: 18px minmax(0,1fr); gap: 8px; color: #adbbc2; font-size: 13px; line-height: 1.6; }
.contact-brief li svg { margin-top: 3px; color: #63c895; }
.contact-promise { display: flex; align-items: flex-start; gap: 9px; max-width: 700px; margin-top: 20px; color: #93a5ae; font-size: 13px; line-height: 1.6; }
.contact-promise svg { flex: 0 0 auto; margin-top: 2px; color: #63c895; }
.qr-panel { padding: 20px; border: 1px solid #455a65; border-radius: 8px; background: #fff; box-shadow: 0 28px 64px rgba(0,0,0,.22); }
.qr-head { display: flex; align-items: center; gap: 10px; padding: 0 2px 15px; color: var(--fde-ink); font-size: 15px; }
.qr-head svg { color: var(--fde-blue); }
.qr-panel img { display: block; width: 100%; aspect-ratio: 1; object-fit: contain; border: 1px solid #e1e7ea; }
.qr-panel p { padding: 14px 3px 2px; color: var(--fde-muted); font-size: 13px; line-height: 1.6; text-align: center; }

.trial-modal { position: fixed; z-index: 60; inset: 0; display: grid; place-items: center; padding: 24px; background: rgba(12,20,25,.66); backdrop-filter: blur(9px); }
.trial-dialog { width: min(420px,100%); overflow: hidden; border-radius: 8px; background: #fff; box-shadow: 0 30px 90px rgba(0,0,0,.28); }
.trial-dialog > header { min-height: 62px; display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 0 20px; border-bottom: 1px solid var(--fde-line); }
.trial-dialog h2 { font-size: 19px; }
.trial-dialog button { width: 36px; height: 36px; border: 1px solid var(--fde-line); border-radius: 7px; color: var(--fde-muted); background: #fff; cursor: pointer; font-size: 22px; }
.trial-dialog > div { display: grid; justify-items: center; gap: 14px; padding: 24px; text-align: center; }
.trial-dialog img { width: min(280px,100%); aspect-ratio: 1; object-fit: contain; }
.trial-dialog p { color: var(--fde-muted); font-size: 14px; line-height: 1.65; }

@media (max-width: 1040px) {
  .hero-grid { grid-template-columns: 1fr; gap: 46px; }
  .hero-copy h1 { font-size: 54px; }
  .deployment-trace { max-width: 680px; }
  .split-layout { gap: 54px; }
  .capability-row { grid-template-columns: 58px minmax(0,1fr); }
  .capability-output,.phase-gate { grid-column: 2; }
  .process-list li { grid-template-columns: 50px minmax(0,1fr); }
  .delivery-grid { grid-template-columns: repeat(2,1fr); }
  .delivery-grid article { border-bottom: 1px solid #aac9bb; }
  .delivery-grid article:nth-child(2) { border-right: 0; }
  .delivery-grid article:nth-child(3) { padding-left: 0; border-bottom: 0; }
  .delivery-grid article:nth-child(4) { border-bottom: 0; }
}
@media (max-width: 760px) {
  .shell,.hero-grid,.principle-strip { width: min(100% - 32px,1180px); }
  .section { padding: 76px 0; }
  .hero-section { padding-top: 54px; }
  .hero-grid { padding-bottom: 52px; }
  .hero-copy h1 { font-size: 42px; line-height: 1.12; }
  .hero-summary { font-size: 16px; }
  .hero-actions { display: grid; }
  .action { width: 100%; }
  .principle-strip { grid-template-columns: repeat(2,1fr); padding: 12px 0; }
  .principle-strip span,.principle-strip span:first-child { min-height: 48px; padding: 0 10px; border: 0; }
  .section-intro h2,.contact-copy h2 { font-size: 34px; }
  .split-layout,.delivery-heading,.contact-grid { grid-template-columns: 1fr; gap: 42px; }
  .sticky-intro { position: static; }
  .capability-row { grid-template-columns: 46px minmax(0,1fr); gap: 18px; align-items: start; }
  .capability-mark { width: 42px; height: 42px; }
  .capability-copy h3 { font-size: 20px; }
  .capability-output,.phase-gate { grid-column: 1 / -1; }
  .process-list li { grid-template-columns: 36px minmax(0,1fr); gap: 16px; align-items: start; }
  .engagement-grid { grid-template-columns: 1fr; }
  .engagement-grid article,.engagement-grid article:first-child,.engagement-grid article:last-child { min-height: 0; padding: 28px 0; border-right: 0; border-bottom: 1px solid var(--fde-line); }
  .engagement-grid article:last-child { border-bottom: 0; }
  .engagement-grid h3 { margin-top: 28px; }
  .engagement-grid strong { margin-top: 24px; }
  .qr-panel { width: min(340px,100%); }
}
@media (max-width: 500px) {
  .hero-copy h1 { font-size: 38px; }
  .trace-head { align-items: flex-start; flex-direction: column; padding: 14px 16px; }
  .trace-body { padding: 7px 14px; }
  .trace-step { grid-template-columns: 32px minmax(0,1fr); }
  .trace-state { grid-column: 2; justify-self: start; margin: -12px 0 12px; }
  .trace-step:not(:last-child)::after { left: 15px; }
  .delivery-grid { grid-template-columns: 1fr; }
  .delivery-grid article,.delivery-grid article:first-child,.delivery-grid article:nth-child(3),.delivery-grid article:last-child { min-height: 0; padding: 25px 0; border-right: 0; border-bottom: 1px solid #aac9bb; }
  .delivery-grid article:last-child { border-bottom: 0; }
  .contact-brief ul { grid-template-columns: 1fr; }
  .faq-list summary { grid-template-columns: 30px minmax(0,1fr) auto; font-size: 15px; }
  .faq-list details > p { padding-left: 42px; padding-right: 0; }
}
@media (prefers-reduced-motion: reduce) { .action { transition: none; } .action:hover { transform: none; } }
</style>
