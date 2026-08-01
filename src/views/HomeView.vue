<template>
  <div class="page overflow-hidden">
    <SiteHeader @trial="showModal = true" />

    <main>
      <!-- Full-width hero carousel -->
      <section class="hero-carousel" :class="`hero-carousel--${activeBanner.id}`" @mouseenter="pauseBanner" @mouseleave="resumeBanner">
        <div class="hero-grid-pattern" aria-hidden="true"></div>
        <Transition name="hero-slide" mode="out-in">
          <article :key="activeBanner.id" class="hero-slide max-w-[1180px] mx-auto px-6 max-[720px]:px-4">
            <div class="hero-copy">
              <div class="hero-eyebrow"><span></span>{{ activeBanner.eyebrow }}</div>
              <h1>{{ activeBanner.titleBefore }}<em>{{ activeBanner.titleHighlight }}</em>{{ activeBanner.titleAfter }}</h1>
              <p class="hero-description">{{ activeBanner.copy }}</p>
              <div class="flex items-center gap-3 flex-wrap mt-8">
                <a v-if="activeBanner.target === 'login'" class="btn btn-primary" :href="loginUrl" target="_top">{{ activeBanner.primary }} <ArrowRight :size="17" aria-hidden="true" /></a>
                <router-link v-else class="btn btn-primary" :to="activeBanner.target === 'image' ? '/image-creation/' : '/codex-help/'">{{ activeBanner.primary }} <ArrowRight :size="17" aria-hidden="true" /></router-link>
                <button class="btn btn-green" type="button" @click="showModal = true">{{ activeBanner.secondary }}</button>
              </div>
              <p class="hero-note">{{ activeBanner.note }}</p>
              <div class="hero-proof-grid">
                <div v-for="item in activeBanner.proof" :key="item.strong"><strong>{{ item.strong }}</strong><span>{{ item.text }}</span></div>
              </div>
            </div>

            <div class="hero-visual" :class="`hero-visual--${activeBanner.id}`">
              <template v-if="activeBanner.id === 'plan'">
                <div class="visual-topbar"><div class="visual-dots"><i></i><i></i><i></i></div><span>{{ t.consoleTitle }}</span><b><i></i>{{ t.liveText }}</b></div>
                <div class="quota-visual">
                  <div class="flex items-center justify-between gap-3 text-white/70 text-[13px] font-extrabold"><span>{{ t.quotaHeadLeft }}</span><span>{{ t.quotaHeadRight }}</span></div>
                  <strong>{{ t.quotaMain }} <small>{{ t.quotaUnit }}</small></strong>
                  <div class="quota-meter"><i></i></div>
                  <div class="grid grid-cols-2 gap-3 mt-3.5"><span><b>{{ t.metricLeft.strong }}</b>{{ t.metricLeft.text }}</span><span><b>{{ t.metricRight.strong }}</b>{{ t.metricRight.text }}</span></div>
                </div>
                <div class="plan-visual-list"><div v-for="item in t.usage" :key="item.strong"><i>✓</i><span><b>{{ item.strong }}</b><small>{{ item.text }}</small></span><em>{{ item.tag }}</em></div></div>
              </template>

              <template v-else-if="activeBanner.id === 'image'">
                <div class="image-visual-main"><img src="/assets/image-creation-hero.png" alt="GPT-Image-2 creative preview" /><span><Sparkles :size="16" aria-hidden="true" /> GPT-Image-2</span></div>
                <div class="image-visual-card image-visual-card--top"><Images :size="20" aria-hidden="true" /><b>插画 · 漫画 · 彩漫</b><small>Visual ideas, rendered</small></div>
                <div class="image-visual-card image-visual-card--bottom"><span class="image-swatch image-swatch--orange"></span><span class="image-swatch image-swatch--blue"></span><span class="image-swatch image-swatch--green"></span><b>广告图 · 电商图</b></div>
              </template>

              <template v-else>
                <div class="code-visual-header"><span><Terminal :size="17" aria-hidden="true" /> Codex Agent</span><b>main</b></div>
                <div class="code-visual-tabs"><span class="active">project/</span><span>plan.md</span><span>preview.tsx</span></div>
                <div class="code-lines"><span><i>01</i>const <b>idea</b> = await agent.plan();</span><span><i>02</i>await agent.readProject();</span><span><i>03</i>await agent.editAndVerify();</span><span><i>04</i><b>return</b> ship({ assets: image });</span></div>
                <div class="code-visual-tasks"><div><i>01</i><span><b>Read project</b><small>Mapping files and context</small></span><em>done</em></div><div><i>02</i><span><b>Implement change</b><small>Editing source files</small></span><em>running</em></div><div><i>03</i><span><b>Verify output</b><small>Checking the result</small></span><em>next</em></div></div>
              </template>
            </div>
          </article>
        </Transition>

        <div class="hero-controls max-w-[1180px] mx-auto px-6 max-[720px]:px-4">
          <div class="flex items-center gap-2" role="tablist" aria-label="Hero banner">
            <button v-for="(slide, index) in bannerSlides" :key="slide.id" type="button" role="tab" :aria-selected="activeBannerIndex === index" :aria-label="slide.eyebrow" :class="{ active: activeBannerIndex === index }" @click="selectBanner(index)"><span>0{{ index + 1 }}</span><b>{{ slide.eyebrow }}</b></button>
          </div>
          <div class="flex items-center gap-2">
            <button class="hero-control-button" type="button" :aria-label="bannerPaused ? 'Play banner' : 'Pause banner'" :title="bannerPaused ? 'Play banner' : 'Pause banner'" @click="toggleBanner"><Play v-if="bannerPaused" :size="16" aria-hidden="true" /><Pause v-else :size="16" aria-hidden="true" /></button>
            <button class="hero-control-button" type="button" aria-label="Next banner" title="Next banner" @click="nextBanner"><ArrowRight :size="16" aria-hidden="true" /></button>
          </div>
        </div>
      </section>

      <!-- Pain Points -->
      <section class="py-[86px] px-6 bg-white max-[720px]:px-4">
        <div class="max-w-[1180px] mx-auto">
          <div class="flex items-end justify-between gap-7 mb-8 max-[1020px]:flex-col max-[1020px]:items-start">
            <h2 class="max-w-[780px] text-[clamp(30px,4vw,48px)] leading-[1.15] font-black">{{ t.pain.head }}</h2>
            <p class="max-w-[460px] text-muted text-[16px] leading-[1.75]">{{ t.pain.desc }}</p>
          </div>
          <div class="grid grid-cols-4 gap-4 max-[1020px]:grid-cols-2 max-[720px]:grid-cols-1">
            <article v-for="(card, i) in t.pain.cards" :key="i" class="min-h-[220px] p-6 border border-line rounded-lg bg-[#fbfdff]">
              <div class="grid w-[42px] h-[42px] place-items-center rounded-lg text-blue bg-cyan font-black">{{ card.icon }}</div>
              <h3 class="mt-[18px] text-[20px]">{{ card.title }}</h3>
              <p class="mt-[11px] text-muted text-[15px] leading-[1.72]">{{ card.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <!-- Value -->
      <section class="py-[86px] px-6 bg-[#f2f7fb] max-[720px]:px-4">
        <div class="max-w-[1180px] mx-auto">
          <div class="flex items-end justify-between gap-7 mb-8 max-[1020px]:flex-col max-[1020px]:items-start">
            <h2 class="max-w-[780px] text-[clamp(30px,4vw,48px)] leading-[1.15] font-black">{{ t.value.head }}</h2>
            <p class="max-w-[460px] text-muted text-[16px] leading-[1.75]">{{ t.value.desc }}</p>
          </div>
          <div class="grid grid-cols-3 gap-4 max-[1020px]:grid-cols-1">
            <article v-for="(card, i) in t.value.cards" :key="i" class="min-h-[220px] p-6 border border-line rounded-lg bg-white">
              <div class="grid w-[42px] h-[42px] place-items-center rounded-lg text-blue bg-cyan font-black">{{ card.icon }}</div>
              <h3 class="mt-[18px] text-[20px]">{{ card.title }}</h3>
              <p class="mt-[11px] text-muted text-[15px] leading-[1.72]">{{ card.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <!-- Pricing -->
      <section class="py-[86px] px-6 text-white max-[720px]:px-4" style="background: linear-gradient(135deg, rgba(19,34,49,0.98), rgba(36,104,242,0.88)), #132231;">
        <div class="max-w-[1180px] mx-auto">
          <div class="flex items-end justify-between gap-7 mb-8 max-[1020px]:flex-col max-[1020px]:items-start">
            <h2 class="max-w-[780px] text-[clamp(30px,4vw,48px)] leading-[1.15] font-black text-white">{{ t.price.head }}</h2>
            <p class="max-w-[460px] text-white/70 text-[16px] leading-[1.75]">{{ t.price.desc }}</p>
          </div>
          <div class="grid gap-6">
            <div class="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3.5 max-[1020px]:grid-cols-1">
              <article v-for="(plan, i) in t.plans" :key="i" class="relative grid content-start p-6 border rounded-lg bg-white/10" :class="{ 'border-[rgba(159,235,139,0.68)] bg-white/[0.13] shadow-[0_22px_48px_rgba(0,0,0,0.18)]': plan.featured, 'border-white/15': !plan.featured }">
                <div v-if="plan.badge" class="absolute top-4 right-4 inline-flex items-center min-h-[28px] px-2.5 rounded-full text-[#123412] bg-[#9feb8b] text-[12px] font-black">{{ plan.badge }}</div>
                <div class="text-[#9feb8b] font-black">{{ plan.label }}</div>
                <div class="mt-3.5 text-[clamp(36px,4vw,48px)] leading-none font-black">{{ plan.price }} <span class="text-[18px] text-white/70">{{ plan.unit }}</span></div>
                <p class="mt-4 text-white/75 text-[15px] leading-[1.68]">{{ plan.sub }}</p>
                <div class="grid gap-2.5 mt-5">
                  <div v-for="(q, j) in plan.quotas" :key="j" class="grid gap-0.5 py-3.5 px-4 border border-white/15 rounded-lg bg-white/10">
                    <span class="text-white/60 text-[13px] font-extrabold">{{ q.label }}</span>
                    <strong class="text-[22px]">{{ q.value }}</strong>
                  </div>
                </div>
                <ul class="grid gap-[11px] mt-6 p-0 list-none">
                  <li v-for="(check, k) in plan.checks" :key="k" class="grid grid-cols-[24px_1fr] gap-2.5 items-start text-white/85 leading-[1.55]">
                    <span class="grid w-6 h-6 place-items-center rounded-full text-[#0f2e13] bg-[#9feb8b] text-[13px] font-black before:content-['✓']"></span>
                    {{ check }}
                  </li>
                </ul>
              </article>
            </div>
            <!-- Compare -->
            <div class="grid gap-3.5">
              <div v-for="(item, i) in t.compare" :key="i" class="grid grid-cols-[1fr_auto] gap-[18px] items-center min-h-[78px] py-[18px] px-5 border border-white/15 rounded-lg bg-white/10 max-[720px]:grid-cols-1">
                <div>
                  <strong class="block text-[16px]">{{ item.title }}</strong>
                  <span class="block mt-1 text-white/70 text-[14px] leading-[1.55]">{{ item.text }}</span>
                </div>
                <div class="px-2.5 py-2 rounded-full text-[13px] font-black whitespace-nowrap" :class="item.good ? 'text-[#123412] bg-[#9feb8b]' : 'text-[#1d3144] bg-[#dce8f5]'">{{ item.tag }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Audience -->
      <section class="py-[86px] px-6 bg-white max-[720px]:px-4">
        <div class="max-w-[1180px] mx-auto">
          <div class="flex items-end justify-between gap-7 mb-8 max-[1020px]:flex-col max-[1020px]:items-start">
            <h2 class="max-w-[780px] text-[clamp(30px,4vw,48px)] leading-[1.15] font-black">{{ t.audience.head }}</h2>
            <p class="max-w-[460px] text-muted text-[16px] leading-[1.75]">{{ t.audience.desc }}</p>
          </div>
          <div class="grid grid-cols-5 gap-3.5 max-[1020px]:grid-cols-2 max-[720px]:grid-cols-1">
            <article v-for="(card, i) in t.audience.cards" :key="i" class="min-h-[220px] p-6 border border-line rounded-lg bg-[#fbfdff]">
              <span class="inline-flex items-center min-h-[30px] px-2.5 rounded-full text-[#184ab7] bg-cyan text-[12px] font-black">{{ card.pill }}</span>
              <h3 class="mt-[18px] text-[20px]">{{ card.title }}</h3>
              <p class="mt-[11px] text-muted text-[15px] leading-[1.72]">{{ card.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <!-- Promise -->
      <section class="py-[86px] px-6 bg-[#f2f7fb] max-[720px]:px-4">
        <div class="max-w-[1180px] mx-auto">
          <div class="flex items-end justify-between gap-7 mb-8 max-[1020px]:flex-col max-[1020px]:items-start">
            <h2 class="max-w-[780px] text-[clamp(30px,4vw,48px)] leading-[1.15] font-black">{{ t.promise.head }}</h2>
            <p class="max-w-[460px] text-muted text-[16px] leading-[1.75]">{{ t.promise.desc }}</p>
          </div>
          <div class="grid grid-cols-4 gap-4 max-[1020px]:grid-cols-2 max-[720px]:grid-cols-1">
            <article v-for="(card, i) in t.promise.cards" :key="i" class="min-h-[230px] p-[26px] border border-line rounded-lg bg-white">
              <div class="text-green-dark text-[30px] font-black">{{ card.num }}</div>
              <h3 class="mt-4 text-[20px]">{{ card.title }}</h3>
              <p class="mt-[11px] text-muted leading-[1.72]">{{ card.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section class="py-[86px] px-6 bg-white max-[720px]:px-4">
        <div class="max-w-[1180px] mx-auto">
          <div class="flex items-end justify-between gap-7 mb-8 max-[1020px]:flex-col max-[1020px]:items-start">
            <h2 class="max-w-[780px] text-[clamp(30px,4vw,48px)] leading-[1.15] font-black">{{ t.faq.head }}</h2>
            <p class="max-w-[460px] text-muted text-[16px] leading-[1.75]">{{ t.faq.desc }}</p>
          </div>
          <div class="grid gap-3 max-w-[920px]">
            <details v-for="(item, i) in t.faq.items" :key="i" class="border border-line rounded-lg bg-white" :open="i === 0">
              <summary class="cursor-pointer py-5 px-[22px] font-black">{{ item.q }}</summary>
              <p class="px-[22px] pb-[22px] text-muted leading-[1.75]">{{ item.a }}</p>
            </details>
          </div>
        </div>
      </section>

      <!-- Contact CTA -->
      <section class="py-[72px] px-6 text-white max-[720px]:px-4" style="background: linear-gradient(135deg, #111b24, #173d74 72%, #216a1f);">
        <div class="grid grid-cols-[minmax(0,1fr)_auto] gap-7 items-center max-w-[1180px] mx-auto max-[1020px]:grid-cols-1 max-[1020px]:items-start">
          <div>
            <h2 class="max-w-[720px] text-[clamp(30px,4vw,48px)] leading-[1.15] font-black">{{ t.contact.head }}</h2>
            <p class="max-w-[660px] mt-3.5 text-white/75 leading-[1.75]">{{ t.contact.text }}</p>
          </div>
          <div class="flex items-center gap-3 flex-wrap justify-end max-[1020px]:justify-start">
            <a class="btn btn-primary" :href="loginUrl" target="_top">{{ t.contact.buttons.login }}</a>
            <router-link class="btn border-white/20 bg-white/10 text-white" to="/codex-help/">{{ t.contact.buttons.help }}</router-link>
            <button class="btn btn-green" type="button" @click="showModal = true">{{ t.contact.buttons.trial }}</button>
          </div>
        </div>
      </section>
    </main>

    <SiteFooter />

    <!-- Trial Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[rgba(17,27,36,0.56)] backdrop-blur-[10px]" @click.self="showModal = false">
        <div class="w-full max-w-[420px] border border-line/90 rounded-lg bg-white shadow-[0_28px_80px_rgba(17,27,36,0.28)]">
          <div class="flex items-center justify-between gap-3.5 py-[18px] px-5 border-b border-line">
            <h2 class="text-[20px] leading-[1.3]">{{ t.modal.title }}</h2>
            <button class="grid w-9 h-9 place-items-center border border-line rounded-lg text-muted bg-white cursor-pointer text-[22px] leading-none" type="button" @click="showModal = false">×</button>
          </div>
          <div class="grid justify-items-center gap-3.5 px-6 pt-6 pb-7 text-center">
            <img class="w-full max-w-[280px] aspect-square border border-line rounded-lg object-contain bg-white" src="/assets/customer-service-qr.png" alt="QR" />
            <p class="text-muted text-[14px] leading-[1.65]">{{ t.modal.text }}</p>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { ArrowRight, Images, Pause, Play, Sparkles, Terminal } from '@lucide/vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import { useI18n } from '@/composables/useI18n'
import { useHostUrl } from '@/composables/useHostUrl'

useHead({
  title: 'AigoKey - Codex Agent + GPT + Image 稳定 AI 套餐',
  meta: [
    { name: 'description', content: 'AigoKey 是稳定可靠的 AI Token 套餐，5 元/天起，覆盖 Codex Agent、GPT 系列模型和 Image 系列模型，日卡、周卡和三档月卡可选，每天 30-200 美元额度。' },
    { name: 'keywords', content: 'AigoKey, AI Token, Codex Agent, GPT, Image, AI套餐, 稳定AI, 日卡, 周卡, 月卡' },
    { property: 'og:title', content: 'AigoKey - Codex Agent + GPT + Image 稳定 AI 套餐' },
    { property: 'og:description', content: 'AigoKey 是稳定可靠的 AI Token 套餐，5 元/天起，覆盖 Codex Agent、GPT 系列模型和 Image 系列模型。' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'AigoKey' },
  ],
})

const { t } = useI18n()
const { loginUrl, registerUrl } = useHostUrl()
const showModal = ref(false)
const activeBannerIndex = ref(0)
const bannerPaused = ref(false)
let bannerTimer: ReturnType<typeof setInterval> | undefined

const bannerSlides = computed(() => t.value.heroBanners)
const activeBanner = computed(() => bannerSlides.value[activeBannerIndex.value])

function nextBanner() {
  activeBannerIndex.value = (activeBannerIndex.value + 1) % bannerSlides.value.length
}

function selectBanner(index: number) {
  activeBannerIndex.value = index
  bannerPaused.value = true
}

function startBanner() {
  if (bannerTimer || bannerPaused.value) return
  bannerTimer = setInterval(nextBanner, 5200)
}

function stopBanner() {
  if (!bannerTimer) return
  clearInterval(bannerTimer)
  bannerTimer = undefined
}

function pauseBanner() {
  bannerPaused.value = true
  stopBanner()
}

function resumeBanner() {
  bannerPaused.value = false
  startBanner()
}

function toggleBanner() {
  bannerPaused.value = !bannerPaused.value
  if (bannerPaused.value) stopBanner()
  else startBanner()
}

onMounted(startBanner)
onBeforeUnmount(stopBanner)
</script>

<style scoped>
.hero-banner {
  min-height: 560px;
  overflow: hidden;
  border: 1px solid rgba(220, 229, 236, 0.95);
  border-radius: 8px;
  background: #fff;
  box-shadow: var(--shadow);
}

.banner-topbar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 12px;
  min-height: 58px;
  padding: 0 18px;
  border-bottom: 1px solid #dce5ec;
  color: #677783;
  background: #fbfdff;
  font-size: 13px;
  font-weight: 750;
}

.banner-topbar > div:last-child { justify-self: end; }
.banner-scene { min-height: 438px; padding: 28px; }
.banner-kicker { color: #2468f2; font-size: 13px; font-weight: 900; }
.banner-scene h2 { margin: 11px 0 0; color: #111b24; font-size: clamp(28px, 3vw, 38px); line-height: 1.15; font-weight: 900; }
.banner-copy { margin-top: 12px; color: #5b6874; font-size: 14px; line-height: 1.65; }
.banner-quota { margin-top: 23px; padding: 22px; border-radius: 8px; color: #fff; background: linear-gradient(135deg, rgba(36,104,242,.92), rgba(19,34,49,.98) 58%); }
.banner-quota strong { display: block; margin-top: 14px; font-size: clamp(35px, 4vw, 54px); line-height: 1; white-space: nowrap; }
.banner-quota strong small { color: rgba(255,255,255,.7); font-size: 15px; }
.banner-quota i { display: block; width: 78%; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #44c928, #7df05f); }
.banner-quota > div:last-child span { min-height: 78px; padding: 13px; border: 1px solid rgba(255,255,255,.15); border-radius: 7px; background: rgba(255,255,255,.1); font-size: 11px; line-height: 1.45; }.banner-quota b { display: block; margin-bottom: 5px; font-size: 21px; }
.banner-scene--image { display: grid; grid-template-columns: minmax(0,.9fr) minmax(190px,1.1fr); gap: 18px; align-items: center; background: #f8fbff; }.image-banner-copy > span, .code-banner-copy > span { display: inline-flex; align-items: center; gap: 7px; color: #2468f2; font-size: 13px; font-weight: 850; }.image-banner-copy p, .code-banner-copy p { margin-top: 12px; color: #5b6874; font-size: 14px; line-height: 1.65; }.image-banner-art { position: relative; min-height: 308px; overflow: hidden; border-radius: 8px; background: #dce8f5; }.image-banner-art img { width: 100%; height: 100%; object-fit: cover; }.image-banner-art > div { position: absolute; right: 12px; bottom: 12px; display: inline-flex; align-items: center; gap: 6px; padding: 8px 10px; border: 1px solid rgba(255,255,255,.45); border-radius: 6px; color: #fff; background: rgba(17,27,36,.64); backdrop-filter: blur(8px); font-size: 11px; font-weight: 850; }
.banner-scene--codex { background: #f8fbfd; }.code-banner-panel { display: grid; gap: 9px; margin-top: 24px; padding: 14px; border: 1px solid #dce5ec; border-radius: 8px; background: #fff; }.code-task { display: grid; grid-template-columns: 25px minmax(0,1fr) auto; gap: 10px; align-items: center; padding: 10px; border-radius: 6px; background: #f5f8fa; }.code-task > span { color: #2468f2; font-size: 11px; font-weight: 900; }.code-task b, .code-task small { display: block; }.code-task b { overflow: hidden; color: #263944; font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }.code-task small { margin-top: 3px; overflow: hidden; color: #6e7d88; font-size: 11px; text-overflow: ellipsis; white-space: nowrap; }.code-task i { padding: 4px 6px; border-radius: 4px; color: #276d17; background: #edfbe9; font-size: 10px; font-style: normal; font-weight: 850; }.code-terminal { padding: 12px; border-radius: 6px; color: #cbe4d7; background: #132231; font: 12px/1.4 Consolas, monospace; }.code-terminal > span { color: #7df05f; }.code-terminal b { color: #7df05f; animation: blink 1s steps(1) infinite; }
.banner-controls { display: flex; align-items: center; justify-content: space-between; min-height: 62px; padding: 0 20px; border-top: 1px solid #dce5ec; background: #fff; }.banner-controls [role='tab'] { display: grid; width: 27px; height: 24px; place-items: center; padding: 0; border: 0; background: transparent; cursor: pointer; }.banner-controls [role='tab'] span { width: 19px; height: 4px; border-radius: 99px; background: #d5e0e8; transition: width .2s ease, background .2s ease; }.banner-controls [role='tab'].active span { width: 27px; background: #2468f2; }.banner-icon-button { display: grid; width: 32px; height: 32px; place-items: center; padding: 0; border: 1px solid #dce5ec; border-radius: 6px; color: #3b4e59; background: #fff; cursor: pointer; }.banner-icon-button:hover { border-color: #2468f2; color: #2468f2; }
.banner-fade-enter-active, .banner-fade-leave-active { transition: opacity .26s ease, transform .26s ease; }.banner-fade-enter-from { opacity: 0; transform: translateX(16px); }.banner-fade-leave-to { opacity: 0; transform: translateX(-16px); }
@keyframes blink { 50% { opacity: 0; } }
@media (max-width: 1020px) { .hero-banner { min-height: auto; }.banner-scene { min-height: 390px; } }
@media (max-width: 720px) { .hero-banner { margin-top: 24px; }.banner-topbar { grid-template-columns: auto 1fr auto; padding: 0 14px; font-size: 11px; }.banner-topbar > span { overflow: hidden; text-align: center; text-overflow: ellipsis; white-space: nowrap; }.banner-scene { min-height: 390px; padding: 20px; }.banner-scene--image { grid-template-columns: 1fr; }.image-banner-art { min-height: 190px; }.banner-quota { padding: 18px; }.banner-quota > div:last-child span { min-height: 66px; padding: 10px; }.code-task { grid-template-columns: 22px minmax(0,1fr); }.code-task i { display: none; } }

.hero-carousel {
  position: relative;
  min-height: 700px;
  overflow: hidden;
  border-bottom: 1px solid #dce5ec;
  background: linear-gradient(115deg, rgba(36,104,242,.09), transparent 38%), linear-gradient(180deg, #fff 0%, #eef6ff 100%);
}

.hero-carousel--image { background: linear-gradient(115deg, rgba(112,54,234,.11), transparent 43%), linear-gradient(180deg, #fff 0%, #f5f1ff 100%); }
.hero-carousel--codex { background: linear-gradient(115deg, rgba(33,106,31,.1), transparent 42%), linear-gradient(180deg, #fff 0%, #eff8f2 100%); }
.hero-grid-pattern { position: absolute; inset: 0; pointer-events: none; background-image: linear-gradient(rgba(36,104,242,.075) 1px, transparent 1px), linear-gradient(90deg, rgba(36,104,242,.075) 1px, transparent 1px); background-size: 56px 56px; mask-image: linear-gradient(180deg, rgba(0,0,0,.44), transparent 78%); }
.hero-slide { position: relative; z-index: 1; display: grid; grid-template-columns: minmax(0,1.06fr) minmax(390px,.94fr); gap: clamp(42px,7vw,100px); align-items: center; min-height: 650px; padding-top: 58px; padding-bottom: 105px; }
.hero-copy { max-width: 710px; }.hero-eyebrow { display: inline-flex; align-items: center; gap: 9px; padding: 8px 11px; border: 1px solid rgba(36,104,242,.15); border-radius: 999px; color: #183d77; background: rgba(255,255,255,.85); font-size: 14px; font-weight: 850; }.hero-eyebrow span { width: 8px; height: 8px; border-radius: 50%; background: #44c928; box-shadow: 0 0 0 5px rgba(68,201,40,.16); }.hero-copy h1 { max-width: 720px; margin-top: 20px; color: #111b24; font-size: clamp(42px,6vw,76px); line-height: 1.04; letter-spacing: 0; font-weight: 900; }.hero-copy h1 em { color: #2468f2; font-style: normal; }.hero-carousel--image .hero-copy h1 em { color: #7547d8; }.hero-carousel--codex .hero-copy h1 em { color: #248752; }.hero-description { max-width: 690px; margin-top: 20px; color: #5b6874; font-size: 19px; line-height: 1.8; }.hero-copy .btn { gap: 8px; }.hero-note { margin-top: 16px; color: #687784; font-size: 14px; line-height: 1.7; }.hero-proof-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 13px; margin-top: 28px; }.hero-proof-grid > div { min-height: 95px; padding: 14px; border: 1px solid rgba(220,229,236,.92); border-radius: 8px; background: rgba(255,255,255,.78); box-shadow: 0 16px 42px rgba(17,27,36,.05); }.hero-proof-grid strong, .hero-proof-grid span { display: block; }.hero-proof-grid strong { font-size: clamp(17px,1.7vw,22px); line-height: 1.2; }.hero-proof-grid span { margin-top: 8px; color: #65747f; font-size: 12px; line-height: 1.45; }

.hero-visual { position: relative; min-height: 478px; overflow: hidden; border: 1px solid rgba(220,229,236,.95); border-radius: 9px; background: #fff; box-shadow: 0 26px 70px rgba(17,27,36,.14); }.hero-visual--plan { padding: 0 0 21px; }.visual-topbar { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; min-height: 55px; padding: 0 17px; border-bottom: 1px solid #dce5ec; color: #6b7a85; background: #fbfdff; font-size: 12px; font-weight: 800; }.visual-dots { display: flex; gap: 7px; }.visual-dots i { width: 9px; height: 9px; border-radius: 50%; background: #f45f5f; }.visual-dots i:nth-child(2) { background: #f2bd3f; }.visual-dots i:last-child { background: #44c928; }.visual-topbar b { justify-self: end; display: inline-flex; align-items: center; gap: 6px; color: #276d17; font-size: 11px; }.visual-topbar b i { width: 7px; height: 7px; border-radius: 50%; background: #44c928; }.quota-visual { margin: 22px 22px 0; padding: 22px; border-radius: 8px; color: #fff; background: linear-gradient(135deg, rgba(36,104,242,.92), rgba(19,34,49,.98) 58%); }.quota-visual > strong { display: block; margin-top: 14px; font-size: clamp(35px,4vw,56px); line-height: 1; white-space: nowrap; }.quota-visual > strong small { color: rgba(255,255,255,.7); font-size: 15px; }.quota-meter { height: 9px; margin-top: 21px; overflow: hidden; border-radius: 999px; background: rgba(255,255,255,.16); }.quota-meter i { display: block; width: 78%; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #44c928, #7df05f); }.quota-visual > div:last-child span { min-height: 76px; padding: 13px; border: 1px solid rgba(255,255,255,.15); border-radius: 7px; background: rgba(255,255,255,.1); color: rgba(255,255,255,.7); font-size: 11px; line-height: 1.45; }.quota-visual b { display: block; margin-bottom: 5px; color: #fff; font-size: 20px; }.plan-visual-list { display: grid; gap: 8px; margin: 13px 22px 0; }.plan-visual-list > div { display: grid; grid-template-columns: 24px minmax(0,1fr) auto; align-items: center; gap: 10px; padding: 9px 10px; border: 1px solid #dce5ec; border-radius: 7px; background: #fff; }.plan-visual-list > div > i { display: grid; width: 23px; height: 23px; place-items: center; border-radius: 50%; color: #fff; background: #2468f2; font-size: 12px; font-style: normal; font-weight: 900; }.plan-visual-list b, .plan-visual-list small { display: block; }.plan-visual-list b { overflow: hidden; color: #263944; font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }.plan-visual-list small { margin-top: 2px; overflow: hidden; color: #6e7d88; font-size: 10px; text-overflow: ellipsis; white-space: nowrap; }.plan-visual-list em { padding: 4px 6px; border-radius: 4px; color: #276d17; background: #edfbe9; font-size: 10px; font-style: normal; font-weight: 850; }

.hero-visual--image { isolation: isolate; border-color: #ddd3f4; background: #f8f5ff; }.image-visual-main { position: absolute; inset: 34px 30px 28px 105px; overflow: hidden; border-radius: 8px; box-shadow: 0 18px 38px rgba(47,28,91,.2); }.image-visual-main img { width: 100%; height: 100%; object-fit: cover; }.image-visual-main span { position: absolute; right: 12px; bottom: 12px; display: inline-flex; align-items: center; gap: 6px; padding: 8px 10px; border: 1px solid rgba(255,255,255,.5); border-radius: 6px; color: #fff; background: rgba(25,15,49,.68); backdrop-filter: blur(8px); font-size: 11px; font-weight: 850; }.image-visual-card { position: absolute; z-index: 1; border: 1px solid rgba(255,255,255,.8); border-radius: 8px; background: rgba(255,255,255,.92); box-shadow: 0 18px 36px rgba(52,33,94,.16); backdrop-filter: blur(10px); }.image-visual-card--top { top: 58px; left: 22px; display: grid; gap: 6px; width: 176px; padding: 15px; color: #3c2765; }.image-visual-card--top svg { color: #7547d8; }.image-visual-card--top b { font-size: 14px; }.image-visual-card--top small { color: #7e7398; font-size: 11px; }.image-visual-card--bottom { bottom: 30px; left: 24px; display: flex; flex-wrap: wrap; align-items: center; gap: 7px; width: 205px; padding: 13px; color: #3c2765; }.image-visual-card--bottom b { width: 100%; margin-top: 3px; font-size: 12px; }.image-swatch { width: 27px; height: 27px; border-radius: 5px; }.image-swatch--orange { background: #f79a54; }.image-swatch--blue { background: #5378ea; }.image-swatch--green { background: #78bf75; }

.hero-visual--codex { padding: 0 20px 19px; border-color: #cce4d2; background: #f7fcf8; }.code-visual-header { display: flex; align-items: center; justify-content: space-between; min-height: 54px; color: #4d6b59; font-size: 12px; font-weight: 800; }.code-visual-header span { display: inline-flex; align-items: center; gap: 7px; color: #248752; }.code-visual-header b { padding: 5px 7px; border-radius: 4px; color: #278057; background: #e5f5e9; }.code-visual-tabs { display: flex; align-items: end; gap: 15px; min-height: 38px; border-bottom: 1px solid #d9e8dc; color: #73857a; font: 11px/1.2 Consolas, monospace; }.code-visual-tabs span { padding: 0 0 10px; }.code-visual-tabs .active { border-bottom: 2px solid #2c9d5b; color: #1b5735; }.code-lines { display: grid; gap: 8px; margin-top: 20px; padding: 17px; border-radius: 7px; color: #5c6d67; background: #132231; font: 12px/1.5 Consolas, monospace; }.code-lines i { display: inline-block; width: 28px; color: #718680; font-style: normal; }.code-lines b { color: #8de5ad; }.code-visual-tasks { display: grid; gap: 8px; margin-top: 13px; }.code-visual-tasks > div { display: grid; grid-template-columns: 24px minmax(0,1fr) auto; align-items: center; gap: 9px; padding: 9px 10px; border: 1px solid #dce8df; border-radius: 7px; background: #fff; }.code-visual-tasks > div > i { color: #2a9b5c; font-size: 11px; font-style: normal; font-weight: 900; }.code-visual-tasks b, .code-visual-tasks small { display: block; }.code-visual-tasks b { color: #334b3b; font-size: 12px; }.code-visual-tasks small { margin-top: 2px; color: #74857a; font-size: 10px; }.code-visual-tasks em { padding: 4px 6px; border-radius: 4px; color: #278057; background: #e6f6e9; font-size: 10px; font-style: normal; font-weight: 850; }

.hero-controls { position: absolute; right: 0; bottom: 23px; left: 0; z-index: 2; display: flex; align-items: center; justify-content: space-between; }.hero-controls [role='tab'] { display: inline-flex; align-items: center; gap: 7px; min-height: 31px; padding: 0 9px; border: 0; border-radius: 5px; color: #788792; background: transparent; font: inherit; font-size: 11px; font-weight: 800; cursor: pointer; }.hero-controls [role='tab'] b { display: none; }.hero-controls [role='tab'].active { color: #184ab7; background: rgba(255,255,255,.8); box-shadow: 0 6px 16px rgba(17,27,36,.07); }.hero-controls [role='tab'].active b { display: block; max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }.hero-control-button { display: grid; width: 33px; height: 33px; place-items: center; padding: 0; border: 1px solid #d7e1e7; border-radius: 6px; color: #3b4e59; background: rgba(255,255,255,.84); cursor: pointer; }.hero-control-button:hover { border-color: #2468f2; color: #2468f2; }.hero-slide-enter-active, .hero-slide-leave-active { transition: opacity .32s ease, transform .32s ease; }.hero-slide-enter-from { opacity: 0; transform: translateX(22px); }.hero-slide-leave-to { opacity: 0; transform: translateX(-22px); }

@media (max-width: 1020px) { .hero-carousel { min-height: 0; }.hero-slide { grid-template-columns: 1fr; gap: 38px; min-height: 0; padding-top: 52px; padding-bottom: 98px; }.hero-copy { max-width: 760px; }.hero-visual { width: min(100%,560px); min-height: 460px; justify-self: center; }.hero-controls { position: relative; bottom: auto; padding-top: 0; padding-bottom: 20px; } }
@media (max-width: 720px) { .hero-slide { padding-top: 38px; }.hero-copy h1 { font-size: clamp(42px,13vw,59px); }.hero-description { font-size: 16px; }.hero-proof-grid { grid-template-columns: 1fr; gap: 9px; }.hero-proof-grid > div { display: grid; grid-template-columns: minmax(130px,.8fr) 1.2fr; align-items: start; gap: 9px; min-height: auto; }.hero-proof-grid span { margin-top: 0; }.hero-visual { min-height: 400px; }.quota-visual { margin: 16px 16px 0; padding: 16px; }.quota-visual > strong { font-size: 38px; }.plan-visual-list { margin: 10px 16px 0; }.image-visual-main { inset: 23px 18px 18px 62px; }.image-visual-card--top { top: 39px; left: 13px; width: 156px; padding: 12px; }.image-visual-card--bottom { bottom: 20px; left: 13px; width: 177px; }.hero-controls [role='tab'] { padding: 0 7px; }.hero-controls [role='tab'].active b { display: none; } }
</style>
