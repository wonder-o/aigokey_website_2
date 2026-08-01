<template>
  <header class="site-header">
    <div class="header-grid" aria-hidden="true"></div>
    <div class="header-shell">
      <router-link to="/" class="brand" aria-label="AigoKey">
        <img src="/assets/aigokey-logo.png" alt="AigoKey Logo" />
        <span>AigoKey</span>
        <i>AI</i>
      </router-link>

      <nav class="primary-nav" aria-label="Primary navigation">
        <div class="image-menu" @mouseenter="imageMenuOpen = true" @mouseleave="imageMenuOpen = false" @focusin="imageMenuOpen = true" @focusout="closeImageMenu" @keydown.esc="imageMenuOpen = false">
          <button class="nav-image-trigger" :class="{ 'is-active': imageMenuOpen || isImageSectionActive }" type="button" :aria-expanded="imageMenuOpen" aria-haspopup="menu" aria-controls="image-menu" @click="imageMenuOpen = !imageMenuOpen">
            {{ t.navButtons.imageCreation }}
            <ChevronDown :size="14" aria-hidden="true" />
          </button>
          <Transition name="image-panel">
            <div v-show="imageMenuOpen" id="image-menu" class="image-popover" role="menu">
              <router-link class="download-option image-option image-option--creation" to="/image-creation/cc-switch/" role="menuitem" @click="imageMenuOpen = false">
                <span class="download-option-icon"><Images :size="19" aria-hidden="true" /></span>
                <span class="download-option-copy"><strong>{{ t.navButtons.imageCreation }}</strong></span>
                <span class="download-option-arrow"><ArrowUpRight :size="15" aria-hidden="true" /></span>
              </router-link>
              <router-link class="download-option image-option image-option--skill" to="/image-creation/" role="menuitem" @click="imageMenuOpen = false">
                <span class="download-option-icon"><WandSparkles :size="19" aria-hidden="true" /></span>
                <span class="download-option-copy"><strong>{{ t.navButtons.imageSkill }}</strong></span>
                <span class="download-option-arrow"><ArrowUpRight :size="15" aria-hidden="true" /></span>
              </router-link>
              <router-link class="download-option image-option image-option--prompts" to="/image-prompts/" role="menuitem" @click="imageMenuOpen = false">
                <span class="download-option-icon"><BookOpen :size="19" aria-hidden="true" /></span>
                <span class="download-option-copy"><strong>{{ t.navButtons.promptLibrary }}</strong></span>
                <span class="download-option-arrow"><ArrowUpRight :size="15" aria-hidden="true" /></span>
              </router-link>
            </div>
          </Transition>
        </div>
        <router-link to="/skills/">{{ t.navButtons.skills }}</router-link>
        <router-link to="/workflows/">{{ t.navButtons.workflows }}</router-link>
        <router-link to="/blog/">{{ t.navButtons.blog }}</router-link>
        <div class="download-menu" @mouseenter="downloadMenuOpen = true" @mouseleave="downloadMenuOpen = false" @focusin="downloadMenuOpen = true" @focusout="closeDownloadMenu" @keydown.esc="downloadMenuOpen = false">
          <button class="nav-download-trigger" type="button" :aria-expanded="downloadMenuOpen" aria-controls="download-menu" @click="downloadMenuOpen = !downloadMenuOpen">
            {{ t.navButtons.download }}
            <ChevronDown :size="14" aria-hidden="true" />
          </button>
          <Transition name="download-panel">
            <div v-show="downloadMenuOpen" id="download-menu" class="download-popover" role="menu">
              <div class="download-popover-head">
                <span>{{ t.navButtons.downloadPanel }}</span>
                <i aria-hidden="true"></i>
              </div>
              <a class="download-option download-option--codex" href="https://openai.com/zh-Hans-CN/codex/" target="_blank" rel="noopener" role="menuitem">
                <span class="download-option-icon"><Command :size="19" aria-hidden="true" /></span>
                <span class="download-option-copy">
                  <strong>{{ t.navButtons.downloadCodex }}</strong>
                  <small>{{ t.navButtons.downloadCodexMeta }}</small>
                </span>
                <span class="download-option-arrow"><ArrowUpRight :size="15" aria-hidden="true" /></span>
              </a>
              <a class="download-option download-option--switch" href="https://github.com/farion1231/cc-switch/releases" target="_blank" rel="noopener" role="menuitem">
                <span class="download-option-icon"><GitBranch :size="19" aria-hidden="true" /></span>
                <span class="download-option-copy">
                  <strong>{{ t.navButtons.downloadCcSwitch }}</strong>
                  <small>{{ t.navButtons.downloadCcSwitchMeta }}</small>
                </span>
                <span class="download-option-arrow"><ArrowUpRight :size="15" aria-hidden="true" /></span>
              </a>
            </div>
          </Transition>
        </div>
        <router-link to="/codex-help/">{{ t.navButtons.help }}</router-link>
        <router-link to="/enterprise-service/">{{ t.navButtons.enterprise }}</router-link>
      </nav>

      <div class="header-actions">
        <LanguageMenu />
        <a class="auth-link register-link" :href="registerUrl" target="_top">{{ t.navButtons.register }}</a>
        <a class="auth-link" :href="loginUrl" target="_top">{{ t.navButtons.login }}</a>
        <button class="trial-link" type="button" @click="$emit('trial')">
          <span>{{ t.navButtons.trial }}</span>
          <ArrowUpRight :size="15" aria-hidden="true" />
        </button>
      </div>
    </div>
  </header>
  <div class="header-spacer" aria-hidden="true"></div>
</template>

<script setup lang="ts">
import { ArrowUpRight, BookOpen, ChevronDown, Command, GitBranch, Images, WandSparkles } from '@lucide/vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import LanguageMenu from '@/components/LanguageMenu.vue'
import { useI18n } from '@/composables/useI18n'
import { useHostUrl } from '@/composables/useHostUrl'

defineEmits<{ trial: [] }>()
const { t } = useI18n()
const { loginUrl, registerUrl } = useHostUrl()
const route = useRoute()
const imageMenuOpen = ref(false)
const downloadMenuOpen = ref(false)

const isImageSectionActive = computed(() => route.path === '/image-prompts' || route.path.startsWith('/image-creation'))

function closeImageMenu(event: FocusEvent) {
  const menu = event.currentTarget as HTMLElement
  if (!(event.relatedTarget instanceof Node) || !menu.contains(event.relatedTarget)) {
    imageMenuOpen.value = false
  }
}

function closeDownloadMenu(event: FocusEvent) {
  const menu = event.currentTarget as HTMLElement
  if (!(event.relatedTarget instanceof Node) || !menu.contains(event.relatedTarget)) {
    downloadMenuOpen.value = false
  }
}
</script>

<style scoped>
.site-header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 60;
  min-height: 76px;
  overflow: visible;
  border-bottom: 1px solid rgba(74, 132, 191, 0.2);
  color: #1b3448;
  background: rgba(249, 252, 255, 0.93);
  box-shadow: 0 10px 32px rgba(38, 83, 122, 0.1);
  backdrop-filter: blur(20px);
}

.header-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.56;
  background-image: linear-gradient(90deg, rgba(55, 120, 195, 0.08) 1px, transparent 1px);
  background-size: 44px 100%;
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}

.header-shell {
  position: relative;
  width: min(1240px, calc(100% - 48px));
  min-height: 76px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 30px;
}

.brand { display: inline-flex; align-items: center; gap: 9px; color: #142a3c; font-size: 20px; font-weight: 900; white-space: nowrap; }
.brand img { width: 36px; height: 36px; border-radius: 8px; object-fit: cover; box-shadow: 0 8px 22px rgba(71, 133, 235, 0.24); }
.brand i { margin-left: 2px; padding: 3px 5px; border: 1px solid rgba(48, 125, 217, 0.26); border-radius: 4px; color: #1769c2; background: rgba(65, 145, 238, 0.09); font-size: 9px; font-style: normal; font-weight: 850; }

.primary-nav { display: flex; justify-content: center; gap: clamp(15px, 2vw, 28px); height: 76px; }
.primary-nav a, .nav-download-trigger, .nav-image-trigger { position: relative; display: inline-flex; align-items: center; color: #5d7385; font: inherit; font-size: 14px; font-weight: 760; transition: color 0.2s ease; }
.primary-nav a::after, .nav-download-trigger::after, .nav-image-trigger::after { position: absolute; right: 0; bottom: 0; left: 0; height: 2px; background: #47b9ff; box-shadow: 0 0 12px rgba(71,185,255,.85); content: ''; transform: scaleX(0); transition: transform 0.2s ease; }
.primary-nav a:hover, .primary-nav a.router-link-active, .nav-download-trigger:hover, .download-menu:focus-within .nav-download-trigger, .nav-image-trigger:hover, .nav-image-trigger.is-active, .image-menu:focus-within .nav-image-trigger { color: #142a3c; }.primary-nav a:hover::after, .primary-nav a.router-link-active::after, .nav-download-trigger:hover::after, .download-menu:focus-within .nav-download-trigger::after, .nav-image-trigger:hover::after, .nav-image-trigger.is-active::after, .image-menu:focus-within .nav-image-trigger::after { transform: scaleX(1); }
.image-menu { position: relative; display: flex; align-items: stretch; }.nav-image-trigger { gap: 4px; padding: 0; border: 0; background: transparent; cursor: pointer; }.nav-image-trigger svg { transition: transform .24s ease; }.image-menu:hover .nav-image-trigger svg, .image-menu:focus-within .nav-image-trigger svg { transform: rotate(180deg); }
.image-popover { position: absolute; top: calc(100% + 10px); left: 50%; z-index: 90; display: grid; width: 248px; gap: 5px; padding: 8px; border: 1px solid rgba(71,132,196,.28); border-radius: 8px; background: linear-gradient(145deg, #ffffff 0%, #f1f8fe 100%); box-shadow: 0 24px 52px rgba(32,77,119,.22), 0 2px 8px rgba(32,77,119,.08); transform: translateX(-50%); }.image-popover::before { position: absolute; top: -6px; left: calc(50% - 6px); width: 11px; height: 11px; border-top: 1px solid rgba(71,132,196,.28); border-left: 1px solid rgba(71,132,196,.28); background: #ffffff; content: ''; transform: rotate(45deg); }.image-option--creation::before { background: #1b84d7; }.image-option--skill::before { background: #16866e; }.image-option--skill .download-option-icon { border-color: rgba(22,134,110,.22); background: #e8f7f2; color: #14745f; }.image-option--prompts::before { background: #8e63d9; }.image-option--prompts .download-option-icon { border-color: rgba(142,99,217,.22); background: #f3edff; color: #7650c3; }
.download-menu { position: relative; display: flex; align-items: stretch; }.nav-download-trigger { gap: 4px; padding: 0; border: 0; background: transparent; cursor: pointer; }.nav-download-trigger svg { transition: transform .24s ease; }.download-menu:hover .nav-download-trigger svg, .download-menu:focus-within .nav-download-trigger svg { transform: rotate(180deg); }
.download-popover { position: absolute; top: calc(100% + 10px); left: 50%; z-index: 90; display: grid; width: 304px; gap: 5px; padding: 8px; border: 1px solid rgba(71,132,196,.28); border-radius: 8px; background: linear-gradient(145deg, #ffffff 0%, #f1f8fe 100%); box-shadow: 0 24px 52px rgba(32,77,119,.22), 0 2px 8px rgba(32,77,119,.08); transform: translateX(-50%); }.download-popover::before { position: absolute; top: -6px; left: calc(50% - 6px); width: 11px; height: 11px; border-top: 1px solid rgba(71,132,196,.28); border-left: 1px solid rgba(71,132,196,.28); background: #ffffff; content: ''; transform: rotate(45deg); }.download-popover-head { display: flex; align-items: center; justify-content: space-between; min-height: 29px; padding: 0 5px 2px 7px; color: #527289; font-size: 10px; font-weight: 850; letter-spacing: .08em; text-transform: uppercase; }.download-popover-head i { width: 7px; height: 7px; border-radius: 50%; background: #24bd78; box-shadow: 0 0 0 4px rgba(36,189,120,.13); }
.download-option { position: relative; display: grid; grid-template-columns: 40px minmax(0, 1fr) 26px; align-items: center; gap: 10px; min-height: 66px; padding: 8px; border-radius: 6px; color: #1d3b50; overflow: hidden; transition: transform .22s ease, background .22s ease, box-shadow .22s ease; }.download-option::after { display: none; }.download-option::before { position: absolute; top: 14px; bottom: 14px; left: 0; width: 2px; border-radius: 2px; content: ''; transform: scaleY(.4); transition: transform .22s ease; }.download-option--codex::before { background: #1b84d7; }.download-option--switch::before { background: #f28442; }.download-option:hover, .download-option:focus-visible { color: #142a3c; background: rgba(255,255,255,.9); box-shadow: 0 8px 18px rgba(44,99,137,.12); outline: none; transform: translateX(3px); }.download-option:hover::before, .download-option:focus-visible::before { transform: scaleY(1); }.download-option-icon { display: grid; width: 40px; height: 40px; place-items: center; border: 1px solid rgba(47,123,186,.18); border-radius: 6px; background: #e8f5ff; color: #1677c4; transition: transform .22s ease, background .22s ease; }.download-option--switch .download-option-icon { border-color: rgba(238,131,67,.22); background: #fff2e9; color: #d96721; }.download-option:hover .download-option-icon, .download-option:focus-visible .download-option-icon { transform: scale(1.07) rotate(-4deg); }.download-option-copy { display: grid; min-width: 0; gap: 3px; }.download-option-copy strong { overflow: hidden; color: inherit; font-size: 13px; font-weight: 850; text-overflow: ellipsis; white-space: nowrap; }.download-option-copy small { color: #718a9b; font-size: 11px; font-weight: 650; }.download-option-arrow { display: grid; width: 26px; height: 26px; place-items: center; border-radius: 50%; color: #6f91aa; background: rgba(77,143,199,.09); transition: color .22s ease, background .22s ease, transform .22s ease; }.download-option:hover .download-option-arrow, .download-option:focus-visible .download-option-arrow { color: #ffffff; background: #2180d6; transform: translate(2px, -2px); }.download-panel-enter-active, .download-panel-leave-active { transition: opacity .18s ease, transform .18s ease; }.download-panel-enter-from, .download-panel-leave-to { opacity: 0; transform: translateY(-8px); }

.image-panel-enter-active, .image-panel-leave-active { transition: opacity .18s ease, transform .18s ease; }.image-panel-enter-from, .image-panel-leave-to { opacity: 0; transform: translateY(-8px); }

.header-actions { display: flex; align-items: center; gap: 16px; }.auth-link { color: #5d7385; font-size: 13px; font-weight: 760; transition: color .2s ease; }.auth-link:hover { color: #142a3c; }.trial-link { min-height: 34px; display: inline-flex; align-items: center; gap: 7px; padding: 0; border: 0; color: #1769c2; background: transparent; font: inherit; font-size: 13px; font-weight: 850; cursor: pointer; }.trial-link::before { width: 1px; height: 17px; margin-right: 2px; background: rgba(69,125,177,.22); content: ''; }.trial-link:hover { color: #0f4f97; }.trial-link svg { transition: transform .2s ease; }.trial-link:hover svg { transform: translate(2px, -2px); }

.header-spacer { height: 76px; }
:deep(.language-trigger) { min-height: auto; min-width: 0; padding: 0; border: 0; border-radius: 0; color: #5d7385; background: transparent; box-shadow: none; font-size: 13px; font-weight: 760; }
:deep(.language-trigger:hover) { color: #142a3c; background: transparent; transform: none; }
:deep(.language-trigger svg) { width: 15px; height: 15px; }
:deep(.language-menu) { z-index: 80; }
:deep(.language-popover) { top: calc(100% + 16px); z-index: 90; border-color: rgba(71,132,196,.25); color: #142231; box-shadow: 0 18px 40px rgba(32,77,119,.2); }

@media (max-width: 1120px) { .header-shell { gap: 19px; }.primary-nav { gap: 15px; }.header-actions { gap: 12px; }.register-link { display: none; } }
@media (max-width: 820px) { .site-header { min-height: 118px; }.header-shell { width: min(100% - 32px, 1240px); min-height: 118px; grid-template-columns: 1fr auto; grid-template-rows: 58px 44px; gap: 0; }.brand { font-size: 18px; }.brand img { width: 32px; height: 32px; }.primary-nav { grid-column: 1 / -1; grid-row: 2; justify-content: flex-start; gap: 20px; height: 44px; overflow-x: auto; scrollbar-width: none; }.primary-nav::-webkit-scrollbar { display: none; }.primary-nav a, .nav-download-trigger, .nav-image-trigger { flex: 0 0 auto; font-size: 13px; }.primary-nav a::after, .nav-download-trigger::after, .nav-image-trigger::after { bottom: 3px; }.download-popover { left: 0; width: min(304px, calc(100vw - 32px)); transform: none; }.download-popover::before { left: 18px; }.image-popover { left: 0; width: min(248px, calc(100vw - 32px)); transform: none; }.image-popover::before { left: 18px; }.header-actions { justify-content: flex-end; }.auth-link { display: none; }.trial-link::before { display: none; }.header-spacer { height: 118px; } }
@media (max-width: 440px) { .header-shell { width: min(100% - 24px, 1240px); }.brand i { display: none; }.trial-link span { display: none; }.trial-link { width: 30px; height: 30px; justify-content: center; border: 1px solid rgba(69,125,177,.3); border-radius: 5px; }.primary-nav { gap: 17px; } }
</style>
