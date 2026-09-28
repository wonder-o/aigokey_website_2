<template>
  <div class="video-page">
    <SiteHeader v-if="!embedded" @trial="$router.push('/free-trial/')" />
    <main>
      <section class="video-hero">
        <div class="page-width hero-grid">
          <div class="hero-copy">
            <p class="eyebrow">AIGOKEY / VIDEO CREATION</p>
            <h1><span class="page-name">{{ t.navButtons.agkVideo }}</span>{{ page.hero.title }}<br /><em>{{ page.hero.highlight }}</em></h1>
            <p class="intro">{{ page.hero.copy }}</p>
            <div class="actions">
              <a class="btn coral-button" href="#setup">{{ page.hero.action }}<ArrowDown :size="17" aria-hidden="true" /></a>
              <a class="source-link" :href="agkVideoRepository" target="_blank" rel="noopener noreferrer">{{ page.hero.source }}<ArrowUpRight :size="16" aria-hidden="true" /></a>
            </div>
            <ul class="hero-tags"><li v-for="tag in page.hero.tags" :key="tag">{{ tag }}</li></ul>
          </div>
          <figure class="storyboard">
            <div class="storyboard-top"><span><Clapperboard :size="16" aria-hidden="true" />AGK2VIDEO</span><span>16:9 / 00:05</span></div>
            <div class="storyboard-scene" aria-hidden="true">
              <svg viewBox="0 0 640 400" fill="none">
                <defs>
                  <linearGradient id="video-sky" x1="320" y1="0" x2="320" y2="400" gradientUnits="userSpaceOnUse"><stop stop-color="#263e61" /><stop offset=".57" stop-color="#c98380" /><stop offset="1" stop-color="#ffcca8" /></linearGradient>
                  <linearGradient id="video-cloud" x1="0" y1="260" x2="0" y2="410" gradientUnits="userSpaceOnUse"><stop stop-color="#ffe8d8" /><stop offset="1" stop-color="#b58383" /></linearGradient>
                </defs>
                <path fill="url(#video-sky)" d="M0 0h640v400H0z" />
                <circle cx="440" cy="173" r="65" fill="#ffd7ac" opacity=".85" />
                <path d="M0 220c50-24 70 12 120 0s60-27 117-6 90 28 137 15 77-25 128-5 109 21 138-3v179H0Z" fill="#f9bfa9" opacity=".5" />
                <path d="M-20 326c10-45 44-62 88-43 9-44 82-60 114-19 55-19 90 9 96 43 33-16 66-9 82 14 27-61 105-79 141-40 39-14 59 4 69 28 34-20 62-13 89 15v91H-20Z" fill="url(#video-cloud)" />
                <path d="M-20 370c51-36 102-17 121 11 26-36 81-39 124-2 46-30 78-10 101 8 53-44 105-37 136-12 39-26 101-30 178 5v35H-20Z" fill="#6d667e" opacity=".6" />
                <path d="M90 248c54 35 134 18 181-21" stroke="#fff1dd" stroke-width="1.5" stroke-dasharray="5 7" opacity=".65" />
                <g class="paper-plane"><path d="m262 190 168-51-80 113-26-43-62-19Z" fill="#fff8ed" /><path d="m324 209 106-70-80 113-26-43Z" fill="#c7cbd9" /><path d="m324 209 106-70-93 83-13-13Z" fill="#eff0f7" /><path d="m337 222-10 25-3-38 13 13Z" fill="#8995ad" /></g>
                <path d="M24 52V24h28m536 0h28v28M24 348v28h28m536 0h28v-28" stroke="white" stroke-opacity=".6" />
              </svg>
              <span class="frame-time">00:00:02:12</span>
            </div>
            <div class="storyboard-timeline" aria-hidden="true"><span>00:00</span><div><i></i></div><span>00:05</span></div>
            <div class="frame-labels"><span v-for="(frame, index) in page.hero.frames" :key="frame"><b>0{{ index + 1 }}</b>{{ frame }}</span></div>
            <figcaption>{{ page.hero.caption }}</figcaption>
          </figure>
        </div>
      </section>

      <div class="intro-strip"><div class="page-width"><p>{{ page.hero.strip }}</p><a href="#commands">{{ page.hero.stripAction }}<ArrowDown :size="15" aria-hidden="true" /></a></div></div>

      <section id="setup" class="setup-section section-space">
        <div class="page-width setup-grid">
          <div class="setup-intro">
            <p class="eyebrow">SETUP IN CODEX</p>
            <h2>{{ page.setup.title }}</h2>
            <p class="section-copy">{{ page.setup.copy }}</p>
            <p class="requirements">{{ page.setup.requires }} <router-link to="/codex-help/">{{ page.setup.guide }}<ArrowUpRight :size="14" aria-hidden="true" /></router-link></p>
            <dl class="config-facts">
              <div><dt>{{ page.setup.endpoint }}</dt><dd><code>https://llm.aigokey.cn/api/v3</code></dd></div>
              <div><dt>{{ page.setup.storage }}</dt><dd><code>~/.aigokey-video/config.json</code><small>{{ page.setup.storageNote }}</small></dd></div>
            </dl>
          </div>
          <ol class="setup-steps">
            <li v-for="(step, index) in page.setup.steps" :key="index">
              <span class="step-number">0{{ index + 1 }}</span>
              <div>
                <h3>{{ step.title }}</h3><p>{{ step.text }}</p>
                <div v-if="step.prompt" class="request-block">
                  <p>{{ step.prompt }}</p>
                  <button type="button" :aria-label="`${page.copy} · ${step.title}`" @click="copyRequest(step.prompt, `step-${index}`)"><Check v-if="copied === `step-${index}`" :size="15" aria-hidden="true" /><Copy v-else :size="15" aria-hidden="true" />{{ copied === `step-${index}` ? page.copied : page.copy }}</button>
                </div>
                <a v-else class="inline-link" :href="loginUrl" target="_top">{{ page.setup.keyAction }}<ArrowUpRight :size="15" aria-hidden="true" /></a>
              </div>
            </li>
          </ol>
          <p class="setup-note"><KeyRound :size="17" aria-hidden="true" />{{ page.setup.note }}</p>
        </div>
      </section>

      <section class="model-section section-space">
        <div class="page-width">
          <p class="eyebrow">YOUR WORKING MODEL</p>
          <h2>{{ page.models.title }}</h2><p class="section-copy model-copy">{{ page.models.copy }}</p>
          <div class="model-options" role="group" :aria-label="page.models.title">
            <button v-for="(model, index) in videoModels" :key="model.id" class="model-option" :class="{ selected: selectedModel === model.id }" :aria-pressed="selectedModel === model.id" type="button" @click="selectedModel = model.id">
              <span class="model-option-top"><span>{{ index === 0 ? page.models.default : 'SEEDANCE' }}</span><Check v-if="selectedModel === model.id" :size="17" :aria-label="page.models.selected" /><span v-else class="model-radio" aria-hidden="true"></span></span>
              <strong>{{ model.name }}</strong><code>{{ model.id }}</code>
            </button>
          </div>
          <div class="model-request request-block"><div><span class="request-label">{{ page.models.promptLabel }}</span><p>{{ modelPrompt }}</p></div><button type="button" :aria-label="`${page.copy} · ${page.models.promptLabel}`" @click="copyRequest(modelPrompt, 'model')"><Check v-if="copied === 'model'" :size="16" aria-hidden="true" /><Copy v-else :size="16" aria-hidden="true" />{{ copied === 'model' ? page.copied : page.copy }}</button></div>
          <p class="small-copy">{{ page.models.note }}</p><p class="small-copy">{{ page.models.once }}</p>
        </div>
      </section>

      <section class="capabilities-section section-space">
        <div class="page-width capabilities-grid">
          <div><p class="eyebrow">FROM PROMPT TO MOTION</p><h2>{{ page.capabilities.title }}</h2><p class="section-copy">{{ page.capabilities.copy }}</p></div>
          <div class="capability-list"><article v-for="(item, index) in page.capabilities.items" :key="item.title"><component :is="capabilityIcons[index]" :size="23" aria-hidden="true" /><h3>{{ item.title }}</h3><p>{{ item.text }}</p></article></div>
          <p class="small-copy capabilities-note">{{ page.capabilities.note }}</p>
        </div>
      </section>

      <section id="commands" class="commands-section section-space">
        <div class="page-width">
          <p class="eyebrow">TALK TO CODEX</p><h2>{{ page.commands.title }}</h2><p class="section-copy">{{ page.commands.copy }}</p>
          <div class="command-grid">
            <article v-for="(group, groupIndex) in page.commands.groups" :key="group.title" class="command-group">
              <h3>{{ group.title }}</h3>
              <ul><li v-for="(prompt, index) in group.prompts" :key="prompt"><p>{{ prompt }}</p><button type="button" :title="page.copy" :aria-label="`${page.copy} · ${prompt}`" @click="copyRequest(prompt, `command-${groupIndex}-${index}`)"><Check v-if="copied === `command-${groupIndex}-${index}`" :size="16" aria-hidden="true" /><Copy v-else :size="16" aria-hidden="true" /></button></li></ul>
            </article>
          </div>
        </div>
      </section>

      <section class="faq-section section-space"><div class="page-width faq-grid"><div><p class="eyebrow">GOOD TO KNOW</p><h2>{{ page.faq.title }}</h2></div><div class="faq-list"><details v-for="item in page.faq.items" :key="item.question"><summary>{{ item.question }}<Plus :size="18" aria-hidden="true" /></summary><p>{{ item.answer }}</p></details></div></div></section>

      <section class="cta-section"><div class="page-width cta-grid"><div><p class="eyebrow">READY WHEN YOU ARE</p><h2>{{ page.cta.title }}</h2></div><div class="actions"><a class="btn coral-button" href="#setup">{{ page.cta.action }}<ArrowUpRight :size="17" aria-hidden="true" /></a><a class="source-link" :href="agkVideoRepository" target="_blank" rel="noopener noreferrer">{{ page.cta.source }}<ArrowUpRight :size="16" aria-hidden="true" /></a></div></div></section>
    </main>
    <SiteFooter v-if="!embedded" />
    <p class="copy-status" :class="{ visible: copyStatus }" role="status" aria-live="polite">{{ copyStatus }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useHead } from '@unhead/vue'
import { ArrowDown, ArrowUpRight, Check, Clapperboard, Copy, Film, Images, KeyRound, Plus, ScanLine, WandSparkles } from '@lucide/vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import { toTraditionalText, useI18n } from '@/composables/useI18n'
import { useHostUrl } from '@/composables/useHostUrl'
import { agkVideoRepository, videoEn, videoModels, videoZh } from '@/data/agk-video'

withDefaults(defineProps<{
  embedded?: boolean
}>(), {
  embedded: false,
})

function translateTree<T>(value: T): T {
  if (typeof value === 'string') return toTraditionalText(value) as T
  if (Array.isArray(value)) return value.map(translateTree) as T
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, translateTree(item)])) as T
  return value
}

const { lang, t } = useI18n()
const { loginUrl } = useHostUrl()
const page = computed(() => lang.value === 'en' ? videoEn : lang.value === 'zh-TW' ? translateTree(videoZh) : videoZh)
const selectedModel = ref<string>(videoModels[0].id)
const modelPrompt = computed(() => `${page.value.models.promptBefore}${selectedModel.value}${page.value.models.promptAfter}`)
const capabilityIcons = [WandSparkles, Images, ScanLine, Film]
const copied = ref('')
const copyStatus = ref('')
let copyTimer: ReturnType<typeof setTimeout> | undefined

async function copyRequest(text: string, id: string) {
  clearTimeout(copyTimer)
  copied.value = ''
  try {
    await navigator.clipboard.writeText(text)
    copied.value = id
    copyStatus.value = page.value.copied
  } catch {
    copyStatus.value = page.value.copyFailed
  }
  copyTimer = setTimeout(() => { copied.value = ''; copyStatus.value = '' }, 3000)
}

watch([lang, selectedModel], () => { copied.value = ''; copyStatus.value = '' })
onBeforeUnmount(() => clearTimeout(copyTimer))
useHead(() => ({
  title: `${page.value.meta.title} - AIGOKEY`,
  meta: [
    { name: 'description', content: page.value.meta.description },
    { property: 'og:title', content: `${page.value.meta.title} - AIGOKEY` },
    { property: 'og:description', content: page.value.meta.description },
  ],
}))
</script>

<style scoped>
.video-page { --video-coral: #ff8065; --video-accent: #bc4931; --video-ink: #132231; --video-muted: #586877; color: var(--video-ink); background: #fff; }
.page-width { width: min(1240px, calc(100% - 48px)); margin-inline: auto; }
.section-space { padding-block: 88px; }
.video-page h1, .video-page h2, .video-page h3, .video-page p, .video-page figure { margin: 0; }
.video-page h2 { font-size: clamp(30px, 3.5vw, 46px); font-weight: 900; line-height: 1.2; letter-spacing: -.035em; white-space: pre-line; }
.video-page h3 { font-size: 19px; font-weight: 850; line-height: 1.5; }
.video-page .eyebrow { margin-bottom: 20px; color: var(--video-accent); font: 700 12px/1.5 Consolas, monospace; letter-spacing: .15em; }
.video-page .section-copy { max-width: 700px; margin-top: 22px; color: var(--video-muted); font-size: 16px; line-height: 1.85; }
.video-page .small-copy { margin-top: 15px; color: var(--video-muted); font-size: 13px; line-height: 1.85; }
.video-page a:focus-visible, .video-page button:focus-visible, .video-page summary:focus-visible { outline: 3px solid #2468f2; outline-offset: 5px; }
.video-page code { overflow-wrap: anywhere; font-family: Consolas, monospace; }
.video-page button { cursor: pointer; }
.video-page svg { flex-shrink: 0; }
.video-hero { overflow: hidden; color: white; background: #132231; }
.hero-grid { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 64px; min-height: 610px; padding-block: 80px; }
.video-hero .eyebrow, .cta-section .eyebrow { color: #ffb49f; }
.hero-copy { position: relative; z-index: 1; }
.video-page h1 { font-size: clamp(42px, 4.3vw, 64px); font-weight: 900; line-height: 1.16; letter-spacing: -.045em; }
.page-name { display: block; margin-bottom: 20px; color: #c2cdd8; font-size: 16px; font-weight: 650; letter-spacing: .03em; }
.video-page h1 em { color: var(--video-coral); font-style: normal; }
.video-page .intro { margin-top: 25px; color: #c2cdd8; font-size: 17px; line-height: 1.85; }
.actions { display: flex; align-items: center; flex-wrap: wrap; gap: 22px; margin-top: 30px; }
.coral-button { gap: 14px; min-height: 48px; background: var(--video-coral); color: #2a1815; }
.coral-button:hover { background: #ff9b83; }
.source-link { display: inline-flex; align-items: center; gap: 8px; padding-block: 10px; font-size: 14px; font-weight: 700; }
.source-link:hover { text-decoration: underline; text-underline-offset: 5px; }
.hero-tags { display: flex; flex-wrap: wrap; gap: 10px 18px; margin: 32px 0 0; padding: 0; list-style: none; color: #a7b8c8; font-size: 12px; }
.hero-tags li + li::before { margin-right: 18px; color: #617588; content: '/'; }
.storyboard { min-width: 0; padding: 18px; border: 1px solid #496073; border-radius: 8px; background: #1a2c3b; box-shadow: 16px 20px 0 #0e1c28; transform: rotate(2deg); }
.storyboard-top { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 15px; color: #c6d2dc; font: 12px/1.4 Consolas, monospace; }
.storyboard-top > span:first-child { display: flex; gap: 8px; align-items: center; }
.storyboard-scene { position: relative; overflow: hidden; aspect-ratio: 16 / 10; border-radius: 3px; }
.storyboard-scene > svg { display: block; width: 100%; height: 100%; }
.frame-time { position: absolute; bottom: 14px; right: 16px; font: 11px/1.5 Consolas, monospace; letter-spacing: .04em; color: #fff8ed; }
.paper-plane { animation: plane-drift 8s ease-in-out infinite; }
.storyboard-timeline { display: flex; align-items: center; gap: 12px; margin-top: 17px; color: #adbdcc; font: 10px/1.5 Consolas, monospace; }
.storyboard-timeline > div { flex: 1; height: 15px; background: repeating-linear-gradient(90deg, #506578 0 1px, transparent 1px 12px) left bottom / 100% 6px no-repeat; border-top: 2px solid #53687b; }
.storyboard-timeline i { display: block; position: relative; width: 48%; height: 2px; margin-top: -2px; background: var(--video-coral); }
.storyboard-timeline i::after { position: absolute; right: 0; top: -4px; width: 2px; height: 20px; background: var(--video-coral); content: ''; }
.frame-labels { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 14px; color: #d2dce4; font-size: 11px; }
.frame-labels span { border-top: 1px solid #40576a; padding-top: 10px; }
.frame-labels b { display: block; margin-bottom: 5px; color: #ffb49f; font: 11px/1.5 Consolas, monospace; }
.storyboard figcaption { margin-top: 18px; color: #a7b8c8; font-size: 11px; line-height: 1.5; }
.intro-strip { border-bottom: 1px solid #dce5ec; }
.intro-strip > div { display: flex; align-items: center; justify-content: space-between; gap: 25px; padding-block: 22px; font-size: 14px; font-weight: 650; }
.intro-strip a, .inline-link { display: inline-flex; align-items: center; gap: 8px; flex-shrink: 0; color: var(--video-accent); font-weight: 750; text-decoration: underline; text-underline-offset: 4px; }
#setup, #commands { scroll-margin-top: 100px; }
.setup-section { background-color: #eef6ff; background-image: linear-gradient(#2468f208 1px, transparent 1px), linear-gradient(90deg, #2468f208 1px, transparent 1px); background-size: 56px 56px; }
.setup-grid { display: grid; grid-template-columns: minmax(0, .87fr) minmax(0, 1.13fr); gap: 36px 80px; }
.video-page .requirements { margin-top: 25px; color: var(--video-muted); font-size: 13px; line-height: 1.85; }
.requirements a { display: inline-flex; align-items: center; gap: 3px; color: #245ca1; text-decoration: underline; text-underline-offset: 3px; }
.config-facts { margin: 30px 0 0; border: 1px solid #c9dcec; border-radius: 6px; background: #ffffffbd; }
.config-facts > div { padding: 18px; }
.config-facts > div + div { border-top: 1px solid #dce5ec; }
.config-facts dt { color: var(--video-muted); font-size: 12px; font-weight: 700; }
.config-facts dd { margin: 8px 0 0; font-size: 13px; }
.config-facts small { display: block; margin-top: 10px; color: #637789; font-size: 11px; overflow-wrap: anywhere; }
.setup-steps { margin: 0; padding: 0; list-style: none; border-top: 1px solid #b8ccdd; }
.setup-steps > li { display: grid; grid-template-columns: 34px minmax(0, 1fr); gap: 18px; border-bottom: 1px solid #c9dcec; padding-block: 24px; }
.step-number { padding-top: 4px; color: var(--video-accent); font: 700 14px/1.6 Consolas, monospace; }
.setup-steps p { margin-top: 7px; color: var(--video-muted); font-size: 14px; line-height: 1.8; }
.inline-link { margin-top: 14px; font-size: 13px; }
.request-block { margin-top: 16px; padding: 16px; border: 1px solid #cadbea; border-radius: 5px; background: #fff; }
.request-block p { margin: 0; color: #253f56; font-size: 14px; line-height: 1.85; overflow-wrap: anywhere; }
.request-block button { display: inline-flex; align-items: center; justify-content: center; gap: 7px; min-height: 36px; margin-top: 10px; padding: 6px 10px; border: 1px solid #d0dfea; border-radius: 4px; background: #f1f7fc; color: #36556e; font-size: 12px; font-weight: 700; }
.request-block button:hover { background: #e2edf7; }
.video-page .setup-note { grid-column: 1 / -1; display: flex; gap: 10px; align-items: flex-start; padding-top: 5px; color: var(--video-muted); font-size: 13px; line-height: 1.8; }
.setup-note svg { margin-top: 3px; }
.model-options { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; margin-top: 32px; }
.model-option { padding: 22px 18px; border: 1px solid #d5dfe7; border-radius: 6px; background: #fff; text-align: left; }
.model-option:hover { border-color: #d18b7b; }
.model-option.selected { border-color: var(--video-accent); background: #fff6f2; box-shadow: inset 0 0 0 1px var(--video-accent); }
.model-option-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; min-height: 18px; margin-bottom: 24px; color: var(--video-accent); font: 700 11px/1.5 Consolas, monospace; }
.model-radio { width: 15px; height: 15px; border: 1px solid #bac9d4; border-radius: 50%; }
.model-option strong { display: block; color: var(--video-ink); font-size: 19px; font-weight: 800; }
.model-option code { display: block; margin-top: 8px; color: #667580; font-size: 11px; }
.model-request { display: flex; align-items: center; justify-content: space-between; gap: 24px; margin-top: 22px; padding: 20px 24px; background: #f4f8fb; }
.request-label { display: block; margin-bottom: 7px; color: #667580; font-size: 11px; font-weight: 750; }
.model-request button { flex-shrink: 0; margin: 0; background: #fff; }
.capabilities-section { background: #f4f8fb; border-block: 1px solid #e0e7ed; }
.capabilities-grid { display: grid; grid-template-columns: minmax(0, .85fr) minmax(0, 1.15fr); gap: 40px 90px; }
.capability-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 32px; }
.capability-list article { border-top: 1px solid #b5c4ce; padding-top: 18px; }
.capability-list svg { margin-bottom: 18px; color: #315875; }
.capability-list p { margin-top: 10px; color: var(--video-muted); font-size: 14px; line-height: 1.8; }
.video-page .capabilities-note { grid-column: 1 / -1; margin-top: 0; }
.commands-section { background: #132231; color: #fff; }
.commands-section .eyebrow { color: #ffb49f; }
.commands-section .section-copy { color: #b8c7d4; }
.command-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; margin-top: 40px; }
.command-group { min-width: 0; border: 1px solid #3e5364; border-radius: 6px; padding: 24px 20px 8px; background: #1a2c3b; }
.command-group h3 { margin-bottom: 15px; color: #ffb49f; font-size: 16px; }
.command-group ul { margin: 0; padding: 0; list-style: none; }
.command-group li { display: grid; grid-template-columns: minmax(0, 1fr) 34px; align-items: start; gap: 12px; padding-block: 15px; border-top: 1px solid #344c60; }
.command-group p { color: #d1dce5; font-size: 13px; line-height: 1.85; overflow-wrap: anywhere; }
.command-group button { display: grid; place-items: center; width: 34px; height: 34px; margin-top: -4px; border: 1px solid #496073; border-radius: 4px; color: #bdd0e0; background: transparent; }
.command-group button:hover { color: #fff; border-color: #ffb49f; }
.faq-grid { display: grid; grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr); gap: 80px; }
.faq-list details { border-bottom: 1px solid #dce5ec; }
.faq-list details:first-child { border-top: 1px solid #dce5ec; }
.faq-list summary { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding-block: 22px; font-size: 16px; font-weight: 750; cursor: pointer; list-style: none; }
.faq-list summary::-webkit-details-marker { display: none; }
.faq-list details[open] svg { transform: rotate(45deg); }
.faq-list p { padding-bottom: 22px; color: var(--video-muted); font-size: 14px; line-height: 1.85; overflow-wrap: anywhere; }
.cta-section { padding-block: 66px; color: #fff; background: #1d3448; }
.cta-grid { display: flex; justify-content: space-between; align-items: end; gap: 40px; }
.cta-grid .actions { flex-shrink: 0; }
.copy-status { position: fixed; z-index: 100; bottom: 24px; left: 50%; max-width: calc(100% - 32px); padding: 12px 20px; border: 1px solid #496073; border-radius: 6px; background: #132231; color: white; box-shadow: 0 8px 25px #13223126; font-size: 14px; opacity: 0; pointer-events: none; transform: translateX(-50%); }
.copy-status.visible { opacity: 1; }
@keyframes plane-drift { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(9px, -7px); } }
@media (max-width: 1080px) { .hero-grid { gap: 35px; } .setup-grid, .capabilities-grid, .faq-grid { gap: 36px; } .model-options { grid-template-columns: repeat(2, minmax(0, 1fr)); } .command-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .cta-grid { align-items: start; flex-direction: column; } .cta-grid .actions { margin-top: 0; } }
@media (max-width: 820px) { #setup, #commands { scroll-margin-top: 138px; } .section-space { padding-block: 60px; } .hero-grid { grid-template-columns: 1fr; padding-block: 55px; gap: 48px; } .hero-copy { max-width: 600px; } .video-page h1 { font-size: clamp(40px, 7vw, 60px); } .storyboard { width: min(540px, 95%); justify-self: center; margin-bottom: 15px; } .setup-grid, .capabilities-grid, .faq-grid { grid-template-columns: 1fr; } .setup-note, .capabilities-note { grid-column: auto; } .intro-strip > div { align-items: start; } .intro-strip p { line-height: 1.7; } }
@media (max-width: 560px) { .page-width { width: calc(100% - 32px); } .hero-grid { padding-block: 40px; } .video-page h1 { font-size: 40px; } .video-page .intro { font-size: 16px; } .hero-tags { gap: 9px 12px; } .hero-tags li + li::before { margin-right: 12px; } .storyboard { padding: 12px; box-shadow: 8px 10px 0 #0e1c28; } .frame-labels { font-size: 10px; } .intro-strip > div { flex-direction: column; gap: 12px; } .setup-steps > li { grid-template-columns: 25px minmax(0, 1fr); gap: 11px; } .request-block { padding: 13px; } .model-options { gap: 10px; } .model-option { padding: 17px 12px; } .model-option strong { font-size: 16px; } .model-option code { font-size: 10px; } .model-option-top { margin-bottom: 18px; font-size: 10px; } .model-request { align-items: start; flex-direction: column; gap: 15px; } .capability-list { gap: 25px 18px; } .video-page h3 { font-size: 17px; } .command-grid { grid-template-columns: 1fr; } .command-group { padding-inline: 17px; } .cta-section { padding-block: 48px; } }
@media (prefers-reduced-motion: reduce) { .paper-plane { animation: none; } .video-page *, .video-page *::before, .video-page *::after { transition: none !important; scroll-behavior: auto !important; } }
</style>
