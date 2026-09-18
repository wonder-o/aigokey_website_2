<template>
  <div class="plan-detail-page" :style="accentStyle">
    <SiteHeader @trial="$router.push('/free-trial/')" />
    <main>
      <div class="shell topbar">
        <router-link class="back-link" to="/incentive-plans/"><ArrowLeft :size="16" aria-hidden="true" />全部激励计划</router-link>
        <span v-if="plan" class="plan-code">NO.{{ plan.index }} · {{ plan.category }}</span>
      </div>

      <template v-if="plan">
        <section class="hero">
          <div class="shell hero-grid">
            <div class="hero-copy">
              <span class="hero-chip"><Sparkles :size="14" aria-hidden="true" />{{ plan.category }}</span>
              <h1>{{ plan.title }}</h1>
              <p class="tagline">{{ plan.tagline }}</p>
              <ul class="hero-tags">
                <li v-for="keyword in plan.keywords" :key="keyword">{{ keyword }}</li>
              </ul>
              <div class="hero-actions">
                <a class="action action-primary" :href="applicationMailto(plan)">申请这个活动<ArrowUpRight :size="17" aria-hidden="true" /></a>
                <a class="action action-ghost" href="#plan-faq">常见问题<ChevronDown :size="16" aria-hidden="true" /></a>
              </div>
            </div>
            <IncentivePoster :plan="plan" />
          </div>
        </section>

        <section class="facts" aria-label="活动关键信息">
          <div class="shell fact-grid">
            <div v-for="fact in facts" :key="fact.label">
              <span>{{ fact.label }}</span>
              <strong>{{ fact.value }}</strong>
            </div>
          </div>
        </section>

        <section class="section highlights-section">
          <div class="shell">
            <div class="section-heading">
              <div><p class="eyebrow">HIGHLIGHTS</p><h2>活动亮点</h2></div>
              <p>三个理由，说明这件事为什么值得占掉你一个周期。</p>
            </div>
            <div class="highlight-grid">
              <article v-for="(point, index) in plan.highlights" :key="point.title" class="highlight-card">
                <span class="highlight-index">{{ String(index + 1).padStart(2, '0') }}</span>
                <h3>{{ point.title }}</h3>
                <p>{{ point.text }}</p>
              </article>
            </div>
          </div>
        </section>

        <div class="shell detail-layout">
          <article class="plan-content">
            <section id="about" class="content-section">
              <p class="eyebrow">01 · ABOUT</p>
              <h2>关于这个活动</h2>
              <p class="lead">{{ plan.description }}</p>
              <p>{{ plan.longIntro }}</p>
              <div class="goal-card">
                <span class="goal-icon"><Target :size="20" aria-hidden="true" /></span>
                <div><strong>创作目标</strong><p>{{ plan.goal }}</p></div>
              </div>
            </section>

            <section id="who" class="content-section">
              <p class="eyebrow">02 · WHO CAN JOIN</p>
              <h2>谁可以参加</h2>
              <p class="lead">{{ plan.audience }}。条件就下面几条，不用作品集，也不用先做出成品。</p>
              <ul class="check-list">
                <li v-for="item in plan.requirements" :key="item"><CircleCheckBig :size="17" aria-hidden="true" /><span>{{ item }}</span></li>
              </ul>
            </section>

            <section id="deliverables" class="content-section">
              <p class="eyebrow">03 · DELIVERABLES</p>
              <h2>交付什么</h2>
              <p class="lead">一个周期结束时，你手里会多出这些东西：<strong>{{ plan.deliverable }}</strong>。</p>
              <ul class="deliverable-list">
                <li v-for="(item, index) in plan.deliverables" :key="item"><span>{{ String(index + 1).padStart(2, '0') }}</span><p>{{ item }}</p></li>
              </ul>
              <div v-if="plan.blueprint" class="blueprint">
                <p class="blueprint-label">8 页怎么排</p>
                <div class="blueprint-grid">
                  <article v-for="page in plan.blueprint" :key="page.page">
                    <span>{{ page.page }}</span>
                    <strong>{{ page.title }}</strong>
                    <p>{{ page.text }}</p>
                  </article>
                </div>
              </div>
            </section>

            <section id="inspirations" class="content-section">
              <p class="eyebrow">04 · IDEAS</p>
              <h2>创作方向</h2>
              <p class="lead">不知道从哪下手？下面这些方向都是往期最容易做完的题目，挑一个改成你自己的版本。</p>
              <div class="idea-grid">
                <article v-for="idea in plan.inspirations" :key="idea.title" class="idea-card">
                  <h3>{{ idea.title }}</h3>
                  <p>{{ idea.text }}</p>
                </article>
              </div>
            </section>

            <section id="toolkit" class="content-section">
              <p class="eyebrow">05 · TOOLKIT</p>
              <h2>推荐工具链</h2>
              <p class="lead">额度可以用在 AIGOKEY 支持的模型和工具上，这条链路是往期创作者跑得最顺的。</p>
              <ul class="tool-list">
                <li v-for="tool in plan.toolkit" :key="tool.name">
                  <strong>{{ tool.name }}</strong>
                  <p>{{ tool.note }}</p>
                </li>
              </ul>
            </section>

            <section id="flow" class="content-section">
              <p class="eyebrow">06 · PROCESS</p>
              <h2>参与流程</h2>
              <ol class="step-list">
                <li v-for="(step, index) in plan.steps" :key="step.title">
                  <span class="step-index">{{ String(index + 1).padStart(2, '0') }}</span>
                  <div><h3>{{ step.title }}</h3><p>{{ step.text }}</p></div>
                </li>
              </ol>
            </section>

            <section id="criteria" class="content-section">
              <p class="eyebrow">07 · REVIEW</p>
              <h2>我们看什么</h2>
              <p class="lead">不比较技术难度，也不看设备和预算。四条标准，其实都指向同一件事：你有没有真的把它做出来。</p>
              <ul class="criteria-list">
                <li v-for="item in plan.criteria" :key="item"><span>{{ item }}</span></li>
              </ul>
            </section>

            <section id="plan-faq" class="content-section">
              <p class="eyebrow">08 · FAQ</p>
              <h2>常见问题</h2>
              <div class="faq-list">
                <details v-for="(item, index) in plan.faq" :key="item.q" :open="index === 0">
                  <summary><span>{{ String(index + 1).padStart(2, '0') }}</span>{{ item.q }}</summary>
                  <p>{{ item.a }}</p>
                </details>
              </div>
            </section>
          </article>

          <aside class="side-column">
            <div class="application-panel">
              <span class="mail-icon"><Mail :size="22" aria-hidden="true" /></span>
              <h2 id="apply-title">申请这个活动</h2>
              <p>发一封邮件就行，标题写上活动名称「{{ plan.title }}」。申请和额度都不收费。</p>
              <div class="panel-facts">
                <div><span>申请方式</span><strong>{{ plan.mode }}</strong></div>
                <div><span>扶持额度</span><strong>{{ plan.benefit }}</strong></div>
                <div><span>建议周期</span><strong>{{ plan.duration }}</strong></div>
              </div>
              <p class="panel-label">邮件里写清这五件事</p>
              <ol class="panel-materials">
                <li v-for="item in applicationMaterials" :key="item.label"><strong>{{ item.label }}</strong>{{ item.text }}</li>
              </ol>
              <div class="email-list">
                <a v-for="email in applicationEmails" :key="email" class="email-address" :href="applicationMailto(plan, email)">{{ email }}</a>
              </div>
              <a class="apply-button" :href="applicationMailto(plan)">发送申请邮件<ArrowUpRight :size="17" aria-hidden="true" /></a>
              <p class="mail-hint">点击会打开邮件应用，主题和正文已经帮你填好；也可以复制上面的邮箱自己发。</p>
              <p class="panel-note"><Lightbulb :size="14" aria-hidden="true" />{{ applyHint }}</p>
            </div>
          </aside>
        </div>

        <section class="other-plans">
          <div class="shell">
            <div class="section-heading">
              <div><p class="eyebrow">KEEP EXPLORING</p><h2>探索其他活动</h2></div>
              <p>额度和周期各不相同，挑一个和你现在最想做的事最接近的。</p>
            </div>
            <div class="other-grid">
              <router-link v-for="other in otherPlans" :key="other.slug" :style="styleFor(other)" :to="`/incentive-plans/${other.slug}/`">
                <span class="other-index">{{ other.index }}</span>
                <span class="other-copy">
                  <strong>{{ other.title }}</strong>
                  <small>{{ other.tagline }}</small>
                  <em>{{ other.category }} · {{ other.duration }} · {{ other.benefit }}</em>
                </span>
                <ArrowRight :size="20" aria-hidden="true" />
              </router-link>
            </div>
          </div>
        </section>
      </template>

      <div v-else class="shell missing-plan">
        <h1>未找到该活动</h1>
        <p>请返回全部激励计划，查看当前活动。</p>
        <router-link class="action action-primary" to="/incentive-plans/">返回激励计划<ArrowRight :size="16" aria-hidden="true" /></router-link>
      </div>
    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import { useHead } from '@unhead/vue'
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, CircleCheckBig, Lightbulb, Mail, Sparkles, Target } from '@lucide/vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import IncentivePoster from '@/components/IncentivePoster.vue'
import { applicationEmails, applicationMailto, applicationMaterials, incentivePlans, themeAccent, type IncentivePlan, type IncentiveTheme } from '@/data/incentive-plans'

const props = defineProps<{ slug: string }>()
const plan = computed(() => incentivePlans.find((item) => item.slug === props.slug))
const otherPlans = computed(() => incentivePlans.filter((item) => item.slug !== props.slug))

const facts = computed(() => {
  const current = plan.value
  if (!current) return []
  return [
    { label: '参与对象', value: current.audience },
    { label: '扶持额度', value: current.benefit },
    { label: '建议周期', value: current.duration },
    { label: '交付形式', value: current.deliverable },
  ]
})

const applyHints: Record<IncentiveTheme, string> = {
  coding: '顺手在邮件里写一句你的技术栈和用过的工具，我们能给你一条更省时间的接入路线。',
  hometown: '邮件里说清选题（一个人 / 一条街 / 一种味道）和想用的主色，越具体越容易通过，我们也更好准备参考方向。',
  game: '「我爱独立游戏」周期比较长，邮件里写清一个月内的几个里程碑，我们会按阶段跟进并给反馈。',
}
const applyHint = computed(() => (plan.value ? applyHints[plan.value.theme] : ''))

function styleFor(target: IncentivePlan) {
  const accent = themeAccent[target.theme]
  return {
    '--accent': accent.color,
    '--accent-ink': accent.ink,
    '--accent-soft': accent.soft,
    '--accent-line': accent.line,
  } as CSSProperties
}

const accentStyle = computed(() => (plan.value ? styleFor(plan.value) : {}))

useHead(() => ({
  title: `${plan.value?.title || '未找到该活动'}｜激励扶持计划｜AIGOKEY`,
  meta: [{ name: 'description', content: plan.value?.description || '查看 AIGOKEY 创作者激励扶持计划。' }],
}))
</script>

<style scoped>
.plan-detail-page { color: #172d40; background: #fff; }
.shell { width: min(1180px, calc(100% - 64px)); margin: 0 auto; }
.eyebrow { color: var(--accent); font: 700 11px/1.5 Consolas, monospace; letter-spacing: .12em; }
.action { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 46px; padding: 0 20px; border: 1px solid transparent; border-radius: 9px; font-size: 14px; font-weight: 750; transition: background .2s, border-color .2s, transform .2s; }
.action-primary { color: #fff; background: var(--accent); box-shadow: 0 14px 30px rgba(23, 45, 64, .16); }
.action-primary:hover { background: var(--accent-ink); transform: translateY(-1px); }
.action-ghost { border-color: #d8e2ee; color: #1d3144; background: #fff; }
.action-ghost:hover { border-color: var(--accent-line); transform: translateY(-1px); }

/* Topbar */
.topbar { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding-top: 30px; }
.back-link { display: inline-flex; align-items: center; gap: 8px; min-height: 40px; color: #61717e; font-size: 13px; }
.back-link:hover { color: var(--accent); }
.plan-code { color: #93a1ad; font: 11px Consolas, monospace; letter-spacing: .1em; }

/* Hero */
.hero { padding: 22px 0 46px; }
.hero-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); align-items: center; gap: 52px; }
.hero-grid :deep(.incentive-poster) { border-radius: 18px; box-shadow: 0 22px 50px rgba(23, 45, 64, .12); }
.hero-chip { display: inline-flex; align-items: center; gap: 7px; padding: 6px 12px; border: 1px solid var(--accent-line); border-radius: 999px; color: var(--accent-ink); background: var(--accent-soft); font-size: 12px; font-weight: 750; }
.hero-copy h1 { margin: 18px 0 16px; font-size: clamp(32px, 4vw, 48px); font-weight: 850; letter-spacing: -.04em; line-height: 1.16; }
.tagline { color: #5c6d7b; font-size: 17px; line-height: 1.8; }
.hero-tags { display: flex; flex-wrap: wrap; gap: 8px; margin: 20px 0 0; padding: 0; list-style: none; }
.hero-tags li { padding: 4px 10px; border: 1px solid #e6ecf2; border-radius: 6px; color: #6b7b89; background: #fafbfc; font-size: 11.5px; font-weight: 650; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }

/* Facts */
.facts { border-top: 1px solid #eef2f6; border-bottom: 1px solid #eef2f6; background: #fafbfc; }
.fact-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); }
.fact-grid div { display: grid; gap: 8px; padding: 22px 24px; border-left: 1px solid #eef2f6; }
.fact-grid div:first-child { border-left: 0; padding-left: 0; }
.fact-grid span { color: #93a1ad; font: 11px Consolas, monospace; letter-spacing: .08em; }
.fact-grid strong { font-size: 14.5px; font-weight: 750; line-height: 1.6; }

/* Sections */
.section { padding: 66px 0; }
.highlights-section { padding-bottom: 20px; }
.section-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 32px; margin-bottom: 28px; }
.section-heading h2 { margin-top: 10px; font-size: clamp(24px, 2.8vw, 32px); font-weight: 850; letter-spacing: -.03em; }
.section-heading > p { max-width: 360px; color: #7d8b98; font-size: 13px; line-height: 1.75; text-align: right; }

.highlight-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
.highlight-card { padding: 26px 24px; border: 1px solid var(--accent-line); border-radius: 14px; background: var(--accent-soft); }
.highlight-index { color: var(--accent); font: 800 12px Consolas, monospace; letter-spacing: .1em; }
.highlight-card h3 { margin-top: 12px; font-size: 17px; font-weight: 800; }
.highlight-card p { margin-top: 10px; color: #5c6d7b; font-size: 13px; line-height: 1.85; }

/* Detail layout */
.detail-layout { display: grid; grid-template-columns: minmax(0, 1fr) 348px; align-items: start; gap: 72px; padding: 34px 0 0; }
.plan-content { display: grid; gap: 54px; min-width: 0; }
.content-section { scroll-margin-top: 96px; }
.content-section h2 { margin-top: 10px; font-size: 24px; font-weight: 850; letter-spacing: -.02em; }
.content-section .lead { margin-top: 16px; color: #3f5262; font-size: 15.5px; font-weight: 600; line-height: 1.9; }
.content-section > p:not(.eyebrow):not(.lead) { margin-top: 14px; color: #6b7b89; font-size: 14.5px; line-height: 1.95; }
.content-section .lead strong { color: var(--accent-ink); }

.goal-card { display: flex; align-items: flex-start; gap: 16px; margin-top: 22px; padding: 20px 22px; border: 1px solid var(--accent-line); border-left: 3px solid var(--accent); border-radius: 12px; background: var(--accent-soft); }
.goal-icon { display: inline-flex; flex-shrink: 0; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 10px; color: #fff; background: var(--accent); }
.goal-card strong { font-size: 13px; font-weight: 800; letter-spacing: .02em; }
.goal-card p { margin-top: 6px; color: #3f5262; font-size: 14px; line-height: 1.8; }

.check-list { display: grid; gap: 12px; margin: 20px 0 0; padding: 0; list-style: none; }
.check-list li { display: flex; align-items: flex-start; gap: 10px; color: #5c6d7b; font-size: 13.5px; line-height: 1.8; }
.check-list svg { flex-shrink: 0; margin-top: 4px; color: var(--accent); }

.deliverable-list { display: grid; gap: 0; margin: 18px 0 0; padding: 0; list-style: none; border-top: 1px solid #eceff3; }
.deliverable-list li { display: grid; grid-template-columns: 34px minmax(0, 1fr); gap: 14px; padding: 16px 0; border-bottom: 1px solid #eceff3; }
.deliverable-list span { color: var(--accent); font: 800 11px Consolas, monospace; }
.deliverable-list p { color: #5c6d7b; font-size: 13.5px; line-height: 1.8; }

.blueprint { margin-top: 22px; }
.blueprint-label { color: var(--accent); font: 700 11px/1.6 Consolas, monospace; letter-spacing: .08em; }
.blueprint-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-top: 12px; }
.blueprint-grid article { padding: 16px 18px; border: 1px solid var(--accent-line); border-radius: 11px; background: var(--accent-soft); }
.blueprint-grid span { color: var(--accent); font: 800 11px Consolas, monospace; letter-spacing: .08em; }
.blueprint-grid strong { display: block; margin-top: 8px; font-size: 13.5px; font-weight: 800; }
.blueprint-grid p { margin-top: 6px; color: #5c6d7b; font-size: 12px; line-height: 1.75; }

.idea-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; margin-top: 20px; }
.idea-card { padding: 18px 20px; border: 1px solid #e6ecf2; border-radius: 12px; background: #fff; transition: border-color .2s, transform .2s; }
.idea-card:hover { border-color: var(--accent-line); transform: translateY(-2px); }
.idea-card h3 { display: flex; align-items: center; gap: 8px; font-size: 14.5px; font-weight: 800; }
.idea-card h3::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }
.idea-card p { margin-top: 8px; color: #6b7b89; font-size: 12.5px; line-height: 1.8; }

.tool-list { display: grid; gap: 12px; margin: 20px 0 0; padding: 0; list-style: none; }
.tool-list li { display: grid; grid-template-columns: minmax(0, 200px) minmax(0, 1fr); gap: 6px 20px; padding: 15px 20px; border: 1px solid #e6ecf2; border-radius: 11px; background: #fafbfc; }
.tool-list strong { color: var(--accent-ink); font-size: 13.5px; font-weight: 800; }
.tool-list p { color: #6b7b89; font-size: 12.5px; line-height: 1.8; }

.step-list { display: grid; gap: 0; margin: 20px 0 0; padding: 0; list-style: none; counter-reset: step; }
.step-list li { display: grid; grid-template-columns: 46px minmax(0, 1fr); gap: 18px; padding: 0 0 22px; }
.step-list li:last-child { padding-bottom: 0; }
.step-index { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border: 1px solid var(--accent-line); border-radius: 50%; color: var(--accent-ink); background: var(--accent-soft); font: 800 12px Consolas, monospace; }
.step-list li > div { padding-top: 6px; }
.step-list h3 { font-size: 15.5px; font-weight: 800; }
.step-list p { margin-top: 7px; color: #6b7b89; font-size: 13px; line-height: 1.85; }

.criteria-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin: 20px 0 0; padding: 0; list-style: none; }
.criteria-list li { padding: 16px 18px; border-left: 3px solid var(--accent); border-radius: 8px; color: #5c6d7b; background: #fafbfc; font-size: 13px; line-height: 1.8; }

.faq-list { margin-top: 20px; border-top: 1px solid #dbe3ea; }
.faq-list details { border-bottom: 1px solid #eceff3; }
.faq-list summary { display: grid; grid-template-columns: 36px minmax(0, 1fr) auto; align-items: center; gap: 12px; min-height: 64px; padding: 12px 0; font-size: 14.5px; font-weight: 800; cursor: pointer; list-style: none; }
.faq-list summary::-webkit-details-marker { display: none; }
.faq-list summary span { color: var(--accent); font: 800 11px Consolas, monospace; }
.faq-list summary::after { content: "+"; color: var(--accent); font: 20px/1 Consolas, monospace; }
.faq-list details[open] summary::after { content: "−"; }
.faq-list details p { padding: 0 40px 20px 48px; color: #6b7b89; font-size: 13px; line-height: 1.85; }

/* Side panel */
.side-column { position: sticky; top: 96px; }
.application-panel { padding: 26px; border: 1px solid var(--accent-line); border-radius: 16px; background: var(--accent-soft); }
.mail-icon { display: inline-flex; align-items: center; justify-content: center; width: 42px; height: 42px; border-radius: 11px; color: #fff; background: var(--accent); }
.application-panel h2 { margin-top: 16px; font-size: 19px; font-weight: 850; }
.application-panel > p { margin-top: 10px; color: #5c6d7b; font-size: 13px; line-height: 1.8; }
.panel-facts { display: grid; gap: 8px; margin-top: 18px; padding: 16px 0; border-top: 1px solid var(--accent-line); border-bottom: 1px solid var(--accent-line); }
.panel-facts div { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
.panel-facts span { color: #7d8b98; font-size: 11.5px; }
.panel-facts strong { color: var(--accent-ink); font-size: 12.5px; font-weight: 800; text-align: right; }
.application-panel > p.panel-label { color: #93a1ad; font: 700 11px/1.6 Consolas, monospace; letter-spacing: .08em; }
.panel-materials { display: grid; gap: 9px; margin: 12px 0 0; padding: 0; list-style: none; }
.panel-materials li { position: relative; padding-left: 16px; color: #6b7b89; font-size: 11.5px; line-height: 1.7; }
.panel-materials li::before { content: ""; position: absolute; top: 7px; left: 0; width: 5px; height: 5px; border-radius: 50%; background: var(--accent); }
.panel-materials strong { display: block; color: #3f5262; font-size: 12px; font-weight: 800; }
.email-list { display: flex; flex-wrap: wrap; gap: 6px 14px; margin-top: 18px; }
.email-address { color: var(--accent-ink); font-size: 13.5px; font-weight: 700; }
.email-address:hover { text-decoration: underline; }
.apply-button { display: flex; align-items: center; justify-content: center; gap: 10px; min-height: 48px; margin-top: 20px; border-radius: 9px; color: #fff; background: var(--accent); font-size: 14px; font-weight: 750; transition: background .2s; }
.apply-button:hover { background: var(--accent-ink); }
.application-panel > p.mail-hint { color: #7d8b98; font-size: 11px; }
.application-panel > p.panel-note { display: flex; align-items: flex-start; gap: 8px; margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--accent-line); color: #5c6d7b; font-size: 11.5px; line-height: 1.75; }
.panel-note svg { flex-shrink: 0; margin-top: 2px; color: var(--accent); }

/* Other plans */
.other-plans { margin-top: 20px; padding: 66px 0 84px; background: #f7f9fb; }
.other-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.other-grid a { display: grid; grid-template-columns: 34px minmax(0, 1fr) 20px; align-items: center; gap: 16px; padding: 22px 24px; border: 1px solid #e6ecf2; border-radius: 14px; background: #fff; transition: border-color .2s, transform .2s, box-shadow .2s; }
.other-grid a:hover { border-color: var(--accent-line); transform: translateY(-3px); box-shadow: 0 14px 32px #172d4010; }
.other-index { color: var(--accent); font: 800 13px Consolas, monospace; }
.other-copy strong { display: block; font-size: 16px; font-weight: 850; }
.other-copy small { display: block; margin-top: 7px; color: #6b7b89; font-size: 12.5px; line-height: 1.7; }
.other-copy em { display: block; margin-top: 10px; color: #93a1ad; font-size: 11.5px; font-style: normal; }
.other-grid svg { color: var(--accent); }

.missing-plan { padding: 70px 0 90px; }
.missing-plan h1 { font-size: 32px; font-weight: 850; }
.missing-plan p { margin: 18px 0 26px; color: #6b7b89; font-size: 14px; }

a:focus-visible { outline: 3px solid var(--accent); outline-offset: 5px; }

@media (max-width: 1050px) {
  .detail-layout { grid-template-columns: minmax(0, 1fr); gap: 44px; }
  .side-column { position: static; }
  .highlight-grid { grid-template-columns: 1fr; }
}
@media (max-width: 900px) {
  .hero-grid { grid-template-columns: minmax(0, 1fr); gap: 30px; }
  .fact-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .fact-grid div { padding: 18px 18px; border-left: 0; }
  .fact-grid div:first-child { padding-left: 0; }
  .fact-grid div:nth-child(even) { border-left: 1px solid #eef2f6; padding-left: 18px; }
  .fact-grid div:nth-child(n + 3) { border-top: 1px solid #eef2f6; }
  .idea-grid, .criteria-list { grid-template-columns: 1fr; }
  .blueprint-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .other-grid { grid-template-columns: 1fr; }
  .section-heading { flex-direction: column; align-items: flex-start; gap: 12px; }
  .section-heading > p { text-align: left; }
}
@media (max-width: 640px) {
  .shell { width: calc(100% - 32px); }
  .topbar { padding-top: 18px; }
  .hero { padding: 16px 0 34px; }
  .hero-copy h1 { font-size: 31px; }
  .tagline { font-size: 15px; }
  .section, .other-plans { padding: 48px 0; }
  .detail-layout { padding-top: 26px; }
  .plan-content { gap: 42px; }
  .tool-list li { grid-template-columns: minmax(0, 1fr); }
  .faq-list summary { grid-template-columns: 30px minmax(0, 1fr) auto; font-size: 13.5px; }
  .faq-list details p { padding: 0 0 18px 42px; }
  .step-list li { grid-template-columns: 40px minmax(0, 1fr); gap: 14px; }
  .hero-actions { flex-direction: column; align-items: stretch; }
  .action { width: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .action, .idea-card, .other-grid a { transition: none; }
  .action:hover, .idea-card:hover, .other-grid a:hover { transform: none; }
}
</style>
