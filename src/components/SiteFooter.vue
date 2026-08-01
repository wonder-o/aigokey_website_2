<template>
  <footer class="site-footer">
    <div class="footer-grid" aria-hidden="true"></div>
    <div class="footer-shell">
      <section class="footer-brand">
        <router-link to="/" class="brand-link" aria-label="AigoKey">
          <img src="/assets/aigokey-logo.png" alt="AigoKey Logo" />
          <span>AigoKey</span>
        </router-link>
        <p>{{ t.footer.text }}</p>
        <div class="service-status"><i></i>{{ t.footerNav.status }}</div>
      </section>

      <nav class="footer-column" :aria-label="t.footerNav.product">
        <h2><Sparkles :size="16" aria-hidden="true" />{{ t.footerNav.product }}</h2>
        <router-link to="/subscription/">{{ t.footerNav.plans }}<ArrowUpRight :size="14" aria-hidden="true" /></router-link>
        <a href="https://openai.com/zh-Hans-CN/codex/" target="_blank" rel="noopener">{{ t.footerNav.codex }}<ArrowUpRight :size="14" aria-hidden="true" /></a>
        <router-link to="/image-creation/cc-switch/">{{ t.footerNav.image }}<ArrowUpRight :size="14" aria-hidden="true" /></router-link>
        <router-link to="/image-creation/">{{ t.footerNav.imageSkill }}<ArrowUpRight :size="14" aria-hidden="true" /></router-link>
      </nav>

      <nav class="footer-column" :aria-label="t.footerNav.resources">
        <h2><Terminal :size="16" aria-hidden="true" />{{ t.footerNav.resources }}</h2>
        <router-link to="/skills/">{{ t.footerNav.skills }}<ArrowUpRight :size="14" aria-hidden="true" /></router-link>
        <router-link to="/workflows/">{{ t.footerNav.workflows }}<ArrowUpRight :size="14" aria-hidden="true" /></router-link>
        <router-link to="/image-prompts/">{{ t.footerNav.cases }}<ArrowUpRight :size="14" aria-hidden="true" /></router-link>
        <router-link to="/blog/">{{ t.footerNav.blog }}<ArrowUpRight :size="14" aria-hidden="true" /></router-link>
        <router-link to="/codex-help/">{{ t.footerNav.help }}<ArrowUpRight :size="14" aria-hidden="true" /></router-link>
      </nav>

      <nav class="footer-column" :aria-label="t.footerNav.service">
        <h2><Building2 :size="16" aria-hidden="true" />{{ t.footerNav.service }}</h2>
        <router-link to="/enterprise-service/">{{ t.footerNav.enterprise }}<ArrowUpRight :size="14" aria-hidden="true" /></router-link>
        <router-link to="/free-trial/">{{ t.footerNav.trial }}<ArrowUpRight :size="14" aria-hidden="true" /></router-link>
        <router-link to="/codex-help/#support">{{ t.footerNav.support }}<ArrowUpRight :size="14" aria-hidden="true" /></router-link>
      </nav>
    </div>

    <div class="footer-bottom">
      <div class="footer-bottom-shell">
        <span>{{ t.footer.copyright }}</span>
        <span class="network-label"><Bot :size="14" aria-hidden="true" />{{ t.footerNav.network }}</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ArrowUpRight, Bot, Building2, Sparkles, Terminal } from '@lucide/vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>

<style scoped>
.site-footer {
  position: relative;
  overflow: hidden;
  color: #2c465a;
  background: #f4f9fd;
}

.footer-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: .72;
  background-image: linear-gradient(rgba(58,126,194,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(58,126,194,.07) 1px, transparent 1px);
  background-size: 52px 52px;
  mask-image: linear-gradient(180deg, #000, transparent 86%);
}

.footer-shell {
  position: relative;
  width: min(1180px, calc(100% - 48px));
  margin: 0 auto;
  padding: 64px 0 52px;
  display: grid;
  grid-template-columns: minmax(250px, 1.5fr) repeat(3, minmax(135px, .7fr));
  gap: 46px;
}

.brand-link { display: inline-flex; align-items: center; gap: 10px; color: #142a3c; font-size: 22px; font-weight: 900; }.brand-link img { width: 42px; height: 42px; border-radius: 9px; object-fit: cover; }.footer-brand > p { max-width: 290px; margin: 17px 0 0; color: #667d8f; font-size: 14px; line-height: 1.7; }.service-status { display: inline-flex; align-items: center; gap: 8px; margin-top: 22px; color: #198253; font-size: 12px; font-weight: 800; }.service-status i { width: 7px; height: 7px; border-radius: 50%; background: #2fbd72; box-shadow: 0 0 0 5px rgba(47,189,114,.12); }
.footer-column { display: grid; align-content: start; gap: 13px; }.footer-column h2 { display: inline-flex; align-items: center; gap: 8px; margin: 0 0 6px; color: #1769c2; font-size: 13px; font-weight: 850; }.footer-column a { display: inline-flex; align-items: center; justify-content: space-between; gap: 8px; color: #5c7284; font-size: 13px; font-weight: 700; transition: color .2s ease, transform .2s ease; }.footer-column a:hover { color: #142a3c; transform: translateX(3px); }.footer-column a svg { color: #2180d6; opacity: .75; }
.footer-bottom { position: relative; border-top: 1px solid rgba(77,137,194,.16); background: rgba(232,242,250,.7); }.footer-bottom-shell { width: min(1180px, calc(100% - 48px)); min-height: 59px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 20px; color: #778d9e; font-size: 12px; }.network-label { display: inline-flex; align-items: center; gap: 7px; color: #3977a8; font-weight: 750; }

@media (max-width: 820px) { .footer-shell { grid-template-columns: minmax(220px, 1fr) repeat(2, minmax(130px, 1fr)); gap: 38px 28px; }.footer-brand { grid-column: 1 / -1; }.footer-brand > p { max-width: 460px; } }
@media (max-width: 560px) { .footer-shell, .footer-bottom-shell { width: min(100% - 32px, 1180px); }.footer-shell { padding: 49px 0 41px; grid-template-columns: 1fr; gap: 28px; }.footer-brand { grid-column: auto; }.footer-column { gap: 11px; }.footer-bottom-shell { min-height: 74px; align-items: flex-start; flex-direction: column; justify-content: center; gap: 6px; } }
</style>
