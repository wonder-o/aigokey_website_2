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
      <section class="home-band home-band--pain py-[86px] px-6 max-[720px]:px-4">
        <div class="max-w-[1180px] mx-auto">
          <div class="flex items-end justify-between gap-7 mb-8 max-[1020px]:flex-col max-[1020px]:items-start">
            <h2 class="max-w-[780px] text-[clamp(30px,4vw,48px)] leading-[1.15] font-black">{{ t.pain.head }}</h2>
            <p class="max-w-[460px] text-muted text-[16px] leading-[1.75]">{{ t.pain.desc }}</p>
          </div>
          <div class="grid grid-cols-4 gap-4 max-[1020px]:grid-cols-2 max-[720px]:grid-cols-1">
            <article v-for="(card, i) in t.pain.cards" :key="i" class="home-card min-h-[220px] p-6 border rounded-lg">
              <div class="grid w-[42px] h-[42px] place-items-center rounded-lg text-blue bg-cyan font-black">{{ card.icon }}</div>
              <h3 class="mt-[18px] text-[20px]">{{ card.title }}</h3>
              <p class="mt-[11px] text-muted text-[15px] leading-[1.72]">{{ card.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <!-- Value -->
      <section class="home-band home-band--value py-[86px] px-6 max-[720px]:px-4">
        <div class="max-w-[1180px] mx-auto">
          <div class="flex items-end justify-between gap-7 mb-8 max-[1020px]:flex-col max-[1020px]:items-start">
            <h2 class="max-w-[780px] text-[clamp(30px,4vw,48px)] leading-[1.15] font-black">{{ t.value.head }}</h2>
            <p class="max-w-[460px] text-muted text-[16px] leading-[1.75]">{{ t.value.desc }}</p>
          </div>
          <div class="grid grid-cols-3 gap-4 max-[1020px]:grid-cols-1">
            <article v-for="(card, i) in t.value.cards" :key="i" class="home-card min-h-[220px] p-6 border rounded-lg">
              <div class="grid w-[42px] h-[42px] place-items-center rounded-lg text-blue bg-cyan font-black">{{ card.icon }}</div>
              <h3 class="mt-[18px] text-[20px]">{{ card.title }}</h3>
              <p class="mt-[11px] text-muted text-[15px] leading-[1.72]">{{ card.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <!-- Pricing -->
      <section class="pricing-section">
        <div class="pricing-inner">
          <div class="pricing-head">
            <div>
              <span class="pricing-eyebrow">{{ t.price.eyebrow }}</span>
              <h2>{{ t.price.head }}</h2>
            </div>
            <p>{{ t.price.desc }}</p>
          </div>

          <div class="plan-family-grid">
            <article v-for="plan in t.plans" :key="plan.id" class="plan-family" :class="`plan-family--${plan.id}`">
              <header class="plan-family-head">
                <div>
                  <span>{{ plan.kicker }}</span>
                  <h3>{{ plan.label }}</h3>
                </div>
                <b>{{ plan.period }}</b>
              </header>
              <p class="plan-family-summary">{{ plan.summary }}</p>
              <div class="plan-tier-labels" aria-hidden="true"><span>{{ t.price.quotaLabel }}</span><span>{{ t.price.priceLabel }}</span></div>
              <div class="plan-tier-list">
                <div v-for="tier in plan.tiers" :key="tier.quota" class="plan-tier" :class="{ 'is-recommended': tier.badge }">
                  <div class="plan-tier-quota">
                    <strong>{{ tier.quota }}</strong>
                    <small>{{ tier.total }}</small>
                  </div>
                  <div class="plan-tier-price">
                    <span v-if="tier.badge">{{ tier.badge }}</span>
                    <strong>{{ tier.price }}</strong>
                  </div>
                </div>
              </div>
              <p class="plan-family-note">{{ plan.note }}</p>
            </article>
          </div>

          <div class="enterprise-plan-rail">
            <div class="enterprise-plan-icon"><Building2 :size="24" aria-hidden="true" /></div>
            <div class="enterprise-plan-copy">
              <span>{{ t.enterprisePlan.eyebrow }}</span>
              <h3>{{ t.enterprisePlan.title }}</h3>
              <p>{{ t.enterprisePlan.text }}</p>
            </div>
            <div class="enterprise-plan-tags">
              <span v-for="tag in t.enterprisePlan.tags" :key="tag">{{ tag }}</span>
            </div>
            <router-link class="enterprise-plan-link" to="/enterprise-service/">{{ t.enterprisePlan.action }} <ArrowRight :size="17" aria-hidden="true" /></router-link>
          </div>
        </div>
      </section>

      <!-- Audience -->
      <section class="home-band home-band--audience py-[86px] px-6 max-[720px]:px-4">
        <div class="max-w-[1180px] mx-auto">
          <div class="flex items-end justify-between gap-7 mb-8 max-[1020px]:flex-col max-[1020px]:items-start">
            <h2 class="max-w-[780px] text-[clamp(30px,4vw,48px)] leading-[1.15] font-black">{{ t.audience.head }}</h2>
            <p class="max-w-[460px] text-muted text-[16px] leading-[1.75]">{{ t.audience.desc }}</p>
          </div>
          <div class="grid grid-cols-5 gap-3.5 max-[1020px]:grid-cols-2 max-[720px]:grid-cols-1">
            <article v-for="(card, i) in t.audience.cards" :key="i" class="home-card min-h-[220px] p-6 border rounded-lg">
              <span class="inline-flex items-center min-h-[30px] px-2.5 rounded-full text-[#184ab7] bg-cyan text-[12px] font-black">{{ card.pill }}</span>
              <h3 class="mt-[18px] text-[20px]">{{ card.title }}</h3>
              <p class="mt-[11px] text-muted text-[15px] leading-[1.72]">{{ card.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <!-- Promise -->
      <section class="home-band home-band--promise py-[86px] px-6 max-[720px]:px-4">
        <div class="max-w-[1180px] mx-auto">
          <div class="flex items-end justify-between gap-7 mb-8 max-[1020px]:flex-col max-[1020px]:items-start">
            <h2 class="max-w-[780px] text-[clamp(30px,4vw,48px)] leading-[1.15] font-black">{{ t.promise.head }}</h2>
            <p class="max-w-[460px] text-muted text-[16px] leading-[1.75]">{{ t.promise.desc }}</p>
          </div>
          <div class="grid grid-cols-4 gap-4 max-[1020px]:grid-cols-2 max-[720px]:grid-cols-1">
            <article v-for="(card, i) in t.promise.cards" :key="i" class="home-card min-h-[230px] p-[26px] border rounded-lg">
              <div class="text-green-dark text-[30px] font-black">{{ card.num }}</div>
              <h3 class="mt-4 text-[20px]">{{ card.title }}</h3>
              <p class="mt-[11px] text-muted leading-[1.72]">{{ card.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section class="home-band home-band--faq py-[86px] px-6 max-[720px]:px-4">
        <div class="max-w-[1180px] mx-auto">
          <div class="flex items-end justify-between gap-7 mb-8 max-[1020px]:flex-col max-[1020px]:items-start">
            <h2 class="max-w-[780px] text-[clamp(30px,4vw,48px)] leading-[1.15] font-black">{{ t.faq.head }}</h2>
            <p class="max-w-[460px] text-muted text-[16px] leading-[1.75]">{{ t.faq.desc }}</p>
          </div>
          <div class="grid gap-3 max-w-[920px]">
            <details v-for="(item, i) in t.faq.items" :key="i" class="home-faq-item border rounded-lg" :open="i === 0">
              <summary class="cursor-pointer py-5 px-[22px] font-black">{{ item.q }}</summary>
              <p class="px-[22px] pb-[22px] text-muted leading-[1.75]">{{ item.a }}</p>
            </details>
          </div>
        </div>
      </section>

      <!-- Contact CTA -->
      <section class="home-contact py-[72px] px-6 max-[720px]:px-4">
        <div class="grid grid-cols-[minmax(0,1fr)_auto] gap-7 items-center max-w-[1180px] mx-auto max-[1020px]:grid-cols-1 max-[1020px]:items-start">
          <div>
            <h2 class="max-w-[720px] text-[clamp(30px,4vw,48px)] leading-[1.15] font-black">{{ t.contact.head }}</h2>
            <p class="max-w-[660px] mt-3.5 text-[#587080] leading-[1.75]">{{ t.contact.text }}</p>
          </div>
          <div class="flex items-center gap-3 flex-wrap justify-end max-[1020px]:justify-start">
            <a class="btn btn-primary" :href="loginUrl" target="_top">{{ t.contact.buttons.login }}</a>
            <router-link class="btn home-contact-secondary" to="/codex-help/">{{ t.contact.buttons.help }}</router-link>
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
import { ArrowRight, Building2, Images, Pause, Play, Sparkles, Terminal } from '@lucide/vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import { useI18n } from '@/composables/useI18n'
import { useHostUrl } from '@/composables/useHostUrl'

useHead({
  title: 'AIGOKEY - Codex Agent + GPT + Image 稳定 AI 套餐',
  meta: [
    { name: 'description', content: 'AIGOKEY 提供 14 档 AI Token 标准套餐，日额度从 $30 到 $1000，覆盖日卡、周卡和月卡，并支持企业定制额度。' },
    { name: 'keywords', content: 'AIGOKEY, AI Token, Codex Agent, GPT, Image, AI套餐, 日卡, 周卡, 月卡, 企业定制额度' },
    { property: 'og:title', content: 'AIGOKEY - Codex Agent + GPT + Image 稳定 AI 套餐' },
    { property: 'og:description', content: '14 档日卡、周卡和月卡可选，日额度 $30-$1000，并支持企业定制额度套餐。' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'AIGOKEY' },
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
.page {
  color: #14293a;
  background: #f7fafc;
}

.home-band {
  position: relative;
  border-top: 1px solid rgba(207, 221, 230, .72);
}

.home-band--pain { background: #fbfdfe; }
.home-band--value { background: #f2f8f6; }
.home-band--audience { background: #fbfdfe; }
.home-band--promise { background: #f2f7fa; }
.home-band--faq { background: #f7fafc; }

.home-card {
  border-color: #d8e4ea;
  background: #ffffff;
  box-shadow: 0 8px 26px rgba(37, 72, 96, .045);
}

.home-faq-item {
  border-color: #d7e3ea;
  background: #ffffff;
  box-shadow: 0 5px 18px rgba(37, 72, 96, .035);
}

.home-contact {
  border-top: 1px solid #d4e3eb;
  border-bottom: 1px solid #d4e3eb;
  color: #14293a;
  background: #eaf3f8;
}

.home-contact h2 { color: #14293a; }
.home-contact-secondary { border-color: #c8dae5; color: #28485d; background: #ffffff; }
.home-contact-secondary:hover { border-color: #8bb7d2; color: #174f77; background: #f8fcfe; }

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
  background: linear-gradient(180deg, #fbfdff 0%, #f1f7fb 100%);
}

.hero-carousel--image { background: linear-gradient(180deg, #fcfbff 0%, #f4f3fa 100%); }
.hero-carousel--codex { background: linear-gradient(180deg, #fbfefc 0%, #f1f8f4 100%); }
.hero-grid-pattern { position: absolute; inset: 0; pointer-events: none; background-image: linear-gradient(rgba(56,111,153,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(56,111,153,.045) 1px, transparent 1px); background-size: 56px 56px; mask-image: linear-gradient(180deg, rgba(0,0,0,.32), transparent 78%); }
.hero-slide { position: relative; z-index: 1; display: grid; grid-template-columns: minmax(0,1.06fr) minmax(390px,.94fr); gap: clamp(42px,7vw,100px); align-items: center; min-height: 650px; padding-top: 58px; padding-bottom: 105px; }
.hero-copy { max-width: 710px; }.hero-eyebrow { display: inline-flex; align-items: center; gap: 9px; padding: 8px 11px; border: 1px solid rgba(36,104,242,.15); border-radius: 999px; color: #183d77; background: rgba(255,255,255,.85); font-size: 14px; font-weight: 850; }.hero-eyebrow span { width: 8px; height: 8px; border-radius: 50%; background: #44c928; box-shadow: 0 0 0 5px rgba(68,201,40,.16); }.hero-copy h1 { max-width: 720px; margin-top: 20px; color: #111b24; font-size: clamp(42px,6vw,76px); line-height: 1.04; letter-spacing: 0; font-weight: 900; }.hero-copy h1 em { color: #2468f2; font-style: normal; }.hero-carousel--image .hero-copy h1 em { color: #7547d8; }.hero-carousel--codex .hero-copy h1 em { color: #248752; }.hero-description { max-width: 690px; margin-top: 20px; color: #5b6874; font-size: 19px; line-height: 1.8; }.hero-copy .btn { gap: 8px; }.hero-note { margin-top: 16px; color: #687784; font-size: 14px; line-height: 1.7; }.hero-proof-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 13px; margin-top: 28px; }.hero-proof-grid > div { min-height: 95px; padding: 14px; border: 1px solid rgba(220,229,236,.92); border-radius: 8px; background: rgba(255,255,255,.78); box-shadow: 0 16px 42px rgba(17,27,36,.05); }.hero-proof-grid strong, .hero-proof-grid span { display: block; }.hero-proof-grid strong { font-size: clamp(17px,1.7vw,22px); line-height: 1.2; }.hero-proof-grid span { margin-top: 8px; color: #65747f; font-size: 12px; line-height: 1.45; }

.hero-visual { position: relative; min-height: 478px; overflow: hidden; border: 1px solid rgba(213,225,233,.96); border-radius: 9px; background: #fff; box-shadow: 0 24px 60px rgba(37,72,96,.1); }.hero-visual--plan { padding: 0 0 21px; }.visual-topbar { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; min-height: 55px; padding: 0 17px; border-bottom: 1px solid #dce5ec; color: #6b7a85; background: #fbfdff; font-size: 12px; font-weight: 800; }.visual-dots { display: flex; gap: 7px; }.visual-dots i { width: 9px; height: 9px; border-radius: 50%; background: #f45f5f; }.visual-dots i:nth-child(2) { background: #f2bd3f; }.visual-dots i:last-child { background: #44c928; }.visual-topbar b { justify-self: end; display: inline-flex; align-items: center; gap: 6px; color: #276d17; font-size: 11px; }.visual-topbar b i { width: 7px; height: 7px; border-radius: 50%; background: #44c928; }.quota-visual { margin: 22px 22px 0; padding: 22px; border-radius: 8px; color: #fff; background: linear-gradient(135deg, rgba(36,104,242,.92), rgba(19,34,49,.98) 58%); }.quota-visual > strong { display: block; margin-top: 14px; font-size: clamp(35px,4vw,56px); line-height: 1; white-space: nowrap; }.quota-visual > strong small { color: rgba(255,255,255,.7); font-size: 15px; }.quota-meter { height: 9px; margin-top: 21px; overflow: hidden; border-radius: 999px; background: rgba(255,255,255,.16); }.quota-meter i { display: block; width: 78%; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #44c928, #7df05f); }.quota-visual > div:last-child span { min-height: 76px; padding: 13px; border: 1px solid rgba(255,255,255,.15); border-radius: 7px; background: rgba(255,255,255,.1); color: rgba(255,255,255,.7); font-size: 11px; line-height: 1.45; }.quota-visual b { display: block; margin-bottom: 5px; color: #fff; font-size: 20px; }.plan-visual-list { display: grid; gap: 8px; margin: 13px 22px 0; }.plan-visual-list > div { display: grid; grid-template-columns: 24px minmax(0,1fr) auto; align-items: center; gap: 10px; padding: 9px 10px; border: 1px solid #dce5ec; border-radius: 7px; background: #fff; }.plan-visual-list > div > i { display: grid; width: 23px; height: 23px; place-items: center; border-radius: 50%; color: #fff; background: #2468f2; font-size: 12px; font-style: normal; font-weight: 900; }.plan-visual-list b, .plan-visual-list small { display: block; }.plan-visual-list b { overflow: hidden; color: #263944; font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }.plan-visual-list small { margin-top: 2px; overflow: hidden; color: #6e7d88; font-size: 10px; text-overflow: ellipsis; white-space: nowrap; }.plan-visual-list em { padding: 4px 6px; border-radius: 4px; color: #276d17; background: #edfbe9; font-size: 10px; font-style: normal; font-weight: 850; }

.hero-visual--image { isolation: isolate; border-color: #ddd3f4; background: #f8f5ff; }.image-visual-main { position: absolute; inset: 34px 30px 28px 105px; overflow: hidden; border-radius: 8px; box-shadow: 0 18px 38px rgba(47,28,91,.2); }.image-visual-main img { width: 100%; height: 100%; object-fit: cover; }.image-visual-main span { position: absolute; right: 12px; bottom: 12px; display: inline-flex; align-items: center; gap: 6px; padding: 8px 10px; border: 1px solid rgba(255,255,255,.5); border-radius: 6px; color: #fff; background: rgba(25,15,49,.68); backdrop-filter: blur(8px); font-size: 11px; font-weight: 850; }.image-visual-card { position: absolute; z-index: 1; border: 1px solid rgba(255,255,255,.8); border-radius: 8px; background: rgba(255,255,255,.92); box-shadow: 0 18px 36px rgba(52,33,94,.16); backdrop-filter: blur(10px); }.image-visual-card--top { top: 58px; left: 22px; display: grid; gap: 6px; width: 176px; padding: 15px; color: #3c2765; }.image-visual-card--top svg { color: #7547d8; }.image-visual-card--top b { font-size: 14px; }.image-visual-card--top small { color: #7e7398; font-size: 11px; }.image-visual-card--bottom { bottom: 30px; left: 24px; display: flex; flex-wrap: wrap; align-items: center; gap: 7px; width: 205px; padding: 13px; color: #3c2765; }.image-visual-card--bottom b { width: 100%; margin-top: 3px; font-size: 12px; }.image-swatch { width: 27px; height: 27px; border-radius: 5px; }.image-swatch--orange { background: #f79a54; }.image-swatch--blue { background: #5378ea; }.image-swatch--green { background: #78bf75; }

.hero-visual--codex { padding: 0 20px 19px; border-color: #cce4d2; background: #f7fcf8; }.code-visual-header { display: flex; align-items: center; justify-content: space-between; min-height: 54px; color: #4d6b59; font-size: 12px; font-weight: 800; }.code-visual-header span { display: inline-flex; align-items: center; gap: 7px; color: #248752; }.code-visual-header b { padding: 5px 7px; border-radius: 4px; color: #278057; background: #e5f5e9; }.code-visual-tabs { display: flex; align-items: end; gap: 15px; min-height: 38px; border-bottom: 1px solid #d9e8dc; color: #73857a; font: 11px/1.2 Consolas, monospace; }.code-visual-tabs span { padding: 0 0 10px; }.code-visual-tabs .active { border-bottom: 2px solid #2c9d5b; color: #1b5735; }.code-lines { display: grid; gap: 8px; margin-top: 20px; padding: 17px; border-radius: 7px; color: #5c6d67; background: #132231; font: 12px/1.5 Consolas, monospace; }.code-lines i { display: inline-block; width: 28px; color: #718680; font-style: normal; }.code-lines b { color: #8de5ad; }.code-visual-tasks { display: grid; gap: 8px; margin-top: 13px; }.code-visual-tasks > div { display: grid; grid-template-columns: 24px minmax(0,1fr) auto; align-items: center; gap: 9px; padding: 9px 10px; border: 1px solid #dce8df; border-radius: 7px; background: #fff; }.code-visual-tasks > div > i { color: #2a9b5c; font-size: 11px; font-style: normal; font-weight: 900; }.code-visual-tasks b, .code-visual-tasks small { display: block; }.code-visual-tasks b { color: #334b3b; font-size: 12px; }.code-visual-tasks small { margin-top: 2px; color: #74857a; font-size: 10px; }.code-visual-tasks em { padding: 4px 6px; border-radius: 4px; color: #278057; background: #e6f6e9; font-size: 10px; font-style: normal; font-weight: 850; }

.hero-controls { position: absolute; right: 0; bottom: 23px; left: 0; z-index: 2; display: flex; align-items: center; justify-content: space-between; }.hero-controls [role='tab'] { display: inline-flex; align-items: center; gap: 7px; min-height: 31px; padding: 0 9px; border: 0; border-radius: 5px; color: #788792; background: transparent; font: inherit; font-size: 11px; font-weight: 800; cursor: pointer; }.hero-controls [role='tab'] b { display: none; }.hero-controls [role='tab'].active { color: #184ab7; background: rgba(255,255,255,.8); box-shadow: 0 6px 16px rgba(17,27,36,.07); }.hero-controls [role='tab'].active b { display: block; max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }.hero-control-button { display: grid; width: 33px; height: 33px; place-items: center; padding: 0; border: 1px solid #d7e1e7; border-radius: 6px; color: #3b4e59; background: rgba(255,255,255,.84); cursor: pointer; }.hero-control-button:hover { border-color: #2468f2; color: #2468f2; }.hero-slide-enter-active, .hero-slide-leave-active { transition: opacity .32s ease, transform .32s ease; }.hero-slide-enter-from { opacity: 0; transform: translateX(22px); }.hero-slide-leave-to { opacity: 0; transform: translateX(-22px); }

.pricing-section {
  position: relative;
  padding: 86px 24px;
  overflow: hidden;
  color: #172935;
  background: #eef5fa;
}
.pricing-section::before {
  position: absolute;
  inset: 0 0 auto;
  height: 1px;
  background: #dce5ec;
  content: '';
}
.pricing-inner { width: min(100%, 1180px); margin: 0 auto; }
.pricing-head { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(320px, .75fr); gap: 48px; align-items: end; margin-bottom: 32px; }
.pricing-eyebrow { display: block; margin-bottom: 13px; color: #197a59; font-size: 12px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
.pricing-head h2 { max-width: 760px; color: #111b24; font-size: clamp(30px, 4vw, 48px); line-height: 1.15; font-weight: 900; }
.pricing-head p { color: #5b6874; font-size: 16px; line-height: 1.75; }
.plan-family-grid { display: grid; grid-template-columns: minmax(0, .95fr) minmax(0, .95fr) minmax(0, 1.14fr); gap: 14px; align-items: start; }
.plan-family { position: relative; overflow: hidden; border: 1px solid #d8e4ec; border-radius: 8px; background: #ffffff; box-shadow: 0 12px 34px rgba(37,72,96,.07); }
.plan-family::before { position: absolute; inset: 0 0 auto; height: 3px; background: #4aa6df; content: ''; }
.plan-family--week::before { background: #29c88a; }
.plan-family--month::before { background: #f0b458; }
.plan-family-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; padding: 23px 22px 0; }
.plan-family-head span { color: #277eb8; font-size: 12px; font-weight: 850; }
.plan-family--week .plan-family-head span { color: #16835f; }
.plan-family--month .plan-family-head span { color: #ad6b17; }
.plan-family-head h3 { margin-top: 5px; color: #172935; font-size: 25px; line-height: 1.2; }
.plan-family-head > b { flex: 0 0 auto; padding: 6px 8px; border: 1px solid #d7e3eb; border-radius: 5px; color: #506574; background: #f5f8fa; font-size: 12px; }
.plan-family-summary { min-height: 72px; padding: 13px 22px 17px; color: #637481; font-size: 13px; line-height: 1.65; }
.plan-tier-labels { display: grid; grid-template-columns: 1fr auto; gap: 16px; margin: 0 16px; padding: 9px 12px; border-top: 1px solid #e2eaf0; border-bottom: 1px solid #e2eaf0; color: #7a8b97; font-size: 10px; font-weight: 850; }
.plan-tier-list { position: relative; padding: 6px 16px 8px 31px; }
.plan-tier-list::before { position: absolute; top: 21px; bottom: 23px; left: 22px; width: 1px; background: #9bdcc5; content: ''; }
.plan-tier { position: relative; display: grid; grid-template-columns: minmax(0,1fr) auto; gap: 13px; align-items: center; min-height: 63px; padding: 10px 10px 10px 12px; border-bottom: 1px solid #e9eff3; }
.plan-tier:last-child { border-bottom: 0; }
.plan-tier::before { position: absolute; top: 50%; left: -13px; width: 7px; height: 7px; border: 2px solid #ffffff; border-radius: 50%; background: #35b889; box-shadow: 0 0 0 1px #72cbae; content: ''; transform: translateY(-50%); }
.plan-tier.is-recommended { margin: 3px 0; border: 1px solid #8fd8bd; border-radius: 6px; background: #edf9f5; }
.plan-tier.is-recommended::before { left: -14px; width: 9px; height: 9px; background: #e8a940; box-shadow: 0 0 0 3px rgba(232,169,64,.14); }
.plan-tier-quota strong, .plan-tier-quota small { display: block; font-variant-numeric: tabular-nums; }
.plan-tier-quota strong { color: #172935; font-size: 15px; line-height: 1.2; }
.plan-tier-quota small { margin-top: 5px; color: #71838f; font-size: 10px; }
.plan-tier-price { display: grid; justify-items: end; gap: 4px; }
.plan-tier-price > span { padding: 2px 5px; border-radius: 4px; color: #155c45; background: #c9f1e2; font-size: 9px; font-weight: 900; }
.plan-tier-price strong { color: #102d42; font-size: 20px; font-variant-numeric: tabular-nums; }
.plan-family-note { min-height: 64px; padding: 15px 22px 18px; border-top: 1px solid #e2eaf0; color: #657784; background: #f8fafb; font-size: 12px; line-height: 1.55; }
.enterprise-plan-rail { display: grid; grid-template-columns: 48px minmax(0,1.35fr) minmax(260px,.85fr) auto; gap: 20px; align-items: center; margin-top: 16px; padding: 22px; border: 1px solid #d8e4ec; border-radius: 8px; color: #172935; background: #ffffff; box-shadow: 0 12px 34px rgba(37,72,96,.07); }
.enterprise-plan-icon { display: grid; width: 48px; height: 48px; place-items: center; border-radius: 7px; color: #ffffff; background: #2468f2; }
.enterprise-plan-copy > span { color: #207d5d; font-size: 11px; font-weight: 900; }
.enterprise-plan-copy h3 { margin-top: 4px; font-size: 21px; line-height: 1.3; }
.enterprise-plan-copy p { margin-top: 7px; color: #637481; font-size: 13px; line-height: 1.6; }
.enterprise-plan-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.enterprise-plan-tags span { padding: 6px 8px; border: 1px solid #d9e5e2; border-radius: 5px; color: #26634f; background: #edf8f4; font-size: 11px; font-weight: 800; }
.enterprise-plan-link { display: inline-flex; align-items: center; justify-content: center; gap: 7px; min-height: 42px; padding: 0 14px; border-radius: 6px; color: #ffffff; background: #2468f2; font-size: 13px; font-weight: 850; white-space: nowrap; transition: background .2s ease, transform .2s ease; }
.enterprise-plan-link::after { display: none; }
.enterprise-plan-link:hover { color: #ffffff; background: #174fbd; transform: translateY(-1px); }
.enterprise-plan-link:focus-visible { outline: 3px solid rgba(74,166,223,.4); outline-offset: 3px; }

@media (max-width: 1020px) { .hero-carousel { min-height: 0; }.hero-slide { grid-template-columns: 1fr; gap: 38px; min-height: 0; padding-top: 52px; padding-bottom: 98px; }.hero-copy { max-width: 760px; }.hero-visual { width: min(100%,560px); min-height: 460px; justify-self: center; }.hero-controls { position: relative; bottom: auto; padding-top: 0; padding-bottom: 20px; } }
@media (max-width: 1020px) { .pricing-head { grid-template-columns: 1fr; gap: 16px; align-items: start; }.pricing-head p { max-width: 680px; }.plan-family-grid { grid-template-columns: 1fr 1fr; }.plan-family--month { grid-column: 1 / -1; }.plan-family--month .plan-tier-list { display: grid; grid-template-columns: 1fr 1fr; column-gap: 18px; }.plan-family--month .plan-tier-list::before { display: none; }.plan-family--month .plan-tier::before { left: -2px; }.enterprise-plan-rail { grid-template-columns: 48px minmax(0,1fr) auto; }.enterprise-plan-tags { grid-column: 2 / 3; }.enterprise-plan-link { grid-column: 3; grid-row: 1 / 3; } }
@media (max-width: 720px) { .hero-slide { padding-top: 38px; }.hero-copy h1 { font-size: clamp(42px,13vw,59px); }.hero-description { font-size: 16px; }.hero-proof-grid { grid-template-columns: 1fr; gap: 9px; }.hero-proof-grid > div { display: grid; grid-template-columns: minmax(130px,.8fr) 1.2fr; align-items: start; gap: 9px; min-height: auto; }.hero-proof-grid span { margin-top: 0; }.hero-visual { min-height: 400px; }.quota-visual { margin: 16px 16px 0; padding: 16px; }.quota-visual > strong { font-size: 38px; }.plan-visual-list { margin: 10px 16px 0; }.image-visual-main { inset: 23px 18px 18px 62px; }.image-visual-card--top { top: 39px; left: 13px; width: 156px; padding: 12px; }.image-visual-card--bottom { bottom: 20px; left: 13px; width: 177px; }.hero-controls [role='tab'] { padding: 0 7px; }.hero-controls [role='tab'].active b { display: none; }.pricing-section { padding: 68px 16px; }.plan-family-grid { grid-template-columns: 1fr; }.plan-family--month { grid-column: auto; }.plan-family--month .plan-tier-list { display: block; }.plan-family--month .plan-tier-list::before { display: block; }.plan-family--month .plan-tier::before { left: -13px; }.plan-family-summary { min-height: auto; }.enterprise-plan-rail { grid-template-columns: 42px minmax(0,1fr); padding: 18px; }.enterprise-plan-icon { width: 42px; height: 42px; }.enterprise-plan-copy { grid-column: 2; }.enterprise-plan-tags, .enterprise-plan-link { grid-column: 1 / -1; }.enterprise-plan-link { grid-row: auto; width: 100%; }.enterprise-plan-tags { margin-top: 2px; } }
</style>
