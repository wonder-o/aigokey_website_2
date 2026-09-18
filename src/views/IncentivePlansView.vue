<template>
  <div class="incentives-page" :class="{ 'incentives-page--embedded': embedded }">
    <SiteHeader v-if="!embedded" @trial="$router.push('/free-trial/')" />
    <main>
      <section class="hero">
        <div class="shell">
          <div class="hero-top">
            <div class="hero-copy">
              <p class="eyebrow">AIGOKEY · CREATOR PROGRAMS</p>
              <h1>激励扶持计划</h1>
              <p class="hero-sub">三个活动，三张免费的 AI token 卡。挑一个，动手。</p>
              <p class="intro">有想法就动手，喜欢就画出来，想玩就自己做一个。唯一的共同要求是：真的把它做出来。</p>
              <div class="hero-actions">
                <a class="action action-primary" href="#activities">浏览三个活动<ArrowDown :size="16" aria-hidden="true" /></a>
                <a class="action action-ghost" :href="`mailto:${applicationEmails[0]}`">发送申请邮件<Mail :size="16" aria-hidden="true" /></a>
              </div>
            </div>
            <aside class="hero-facts" aria-label="计划要点">
              <p class="hero-facts-title">计划要点</p>
              <dl class="hero-facts-list">
                <div v-for="fact in heroFacts" :key="fact.label">
                  <dt>{{ fact.label }}</dt>
                  <dd>{{ fact.value }}</dd>
                </div>
              </dl>
              <p class="hero-facts-note">申请不收费 · 版权归创作者 · 三个活动任选其一</p>
            </aside>
          </div>
          <ul class="hero-tags">
            <li v-for="tag in heroTags" :key="tag"><CircleCheckBig :size="14" aria-hidden="true" />{{ tag }}</li>
          </ul>
        </div>
      </section>

      <section id="activities" class="section section-activities">
        <div class="shell">
          <div class="section-heading">
            <div><p class="eyebrow">01 · ACTIVITIES</p><h2>全部活动 <span>{{ incentivePlans.length }}</span></h2></div>
            <p>三个活动，三件小事。点开看条件、要交什么，以及怎么开始。</p>
          </div>
          <div class="activity-grid">
            <router-link v-for="plan in incentivePlans" :key="plan.slug" class="activity-card" :style="accentStyle(plan)" :to="`/incentive-plans/${plan.slug}/`">
              <IncentivePoster :plan="plan" />
              <div class="card-copy">
                <div class="card-head">
                  <h3>{{ plan.title }}</h3>
                  <ArrowUpRight :size="19" aria-hidden="true" />
                </div>
                <p class="card-tagline">{{ plan.tagline }}</p>
                <div class="card-meta">
                  <span><Users :size="14" aria-hidden="true" />{{ plan.audienceShort }}</span>
                  <span><Clock :size="14" aria-hidden="true" />{{ plan.duration }}</span>
                </div>
                <ul class="card-points">
                  <li v-for="point in plan.highlights" :key="point.title"><CircleCheckBig :size="15" aria-hidden="true" />{{ point.title }}</li>
                </ul>
                <p class="card-deliverable"><Package :size="14" aria-hidden="true" />交付：{{ plan.deliverable }}</p>
                <div class="card-bottom">
                  <span class="benefit"><Gift :size="13" aria-hidden="true" />{{ plan.benefit }}</span>
                  <span class="details-link">查看活动<ArrowRight :size="14" aria-hidden="true" /></span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </section>

      <section class="section section-soft">
        <div class="shell">
          <div class="section-heading">
            <div><p class="eyebrow">02 · WHAT YOU GET</p><h2>我们提供什么</h2></div>
            <p>不只是发额度，还顺手把「不知道怎么开始」这件事一起解决。</p>
          </div>
          <div class="support-grid">
            <article v-for="item in supportItems" :key="item.title" class="support-card">
              <span class="support-icon"><component :is="item.icon" :size="20" aria-hidden="true" /></span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="shell">
          <div class="section-heading">
            <div><p class="eyebrow">03 · HOW IT WORKS</p><h2>参与流程</h2></div>
            <p>五步：挑一个、发邮件、领额度、动手做、被看见。</p>
          </div>
          <ol class="flow-grid">
            <li v-for="(step, index) in flowSteps" :key="step.title">
              <span class="flow-index">{{ String(index + 1).padStart(2, '0') }}</span>
              <h3>{{ step.title }}</h3>
              <p>{{ step.text }}</p>
            </li>
          </ol>
        </div>
      </section>

      <section class="section section-soft">
        <div class="shell materials-grid">
          <div class="materials-copy">
            <p class="eyebrow">04 · APPLICATION</p>
            <h2>申请邮件写什么</h2>
            <p class="materials-lead">不用作品集，也不用写得漂亮。把下面五件事说清楚，我们就能判断这件事能不能在一个周期里做完。</p>
            <div class="materials-mails">
              <span>申请邮箱</span>
              <a v-for="email in applicationEmails" :key="email" :href="`mailto:${email}`">{{ email }}<ArrowUpRight :size="14" aria-hidden="true" /></a>
            </div>
          </div>
          <ol class="materials-list">
            <li v-for="(item, index) in applicationMaterials" :key="item.label">
              <span class="materials-index">{{ String(index + 1).padStart(2, '0') }}</span>
              <strong>{{ item.label }}</strong>
              <p>{{ item.text }}</p>
            </li>
          </ol>
        </div>
      </section>

      <section class="section">
        <div class="shell faq-grid">
          <div class="faq-heading">
            <p class="eyebrow">05 · FAQ</p>
            <h2>常见问题</h2>
            <p>申请、额度、周期、版权，先看这里；还有问题就直接发邮件问我们。</p>
          </div>
          <div class="faq-list">
            <details v-for="(item, index) in listFaqs" :key="item.q" :open="index === 0">
              <summary><span>{{ String(index + 1).padStart(2, '0') }}</span>{{ item.q }}</summary>
              <p>{{ item.a }}</p>
            </details>
          </div>
        </div>
      </section>

      <section class="closing">
        <div class="shell closing-grid">
          <div>
            <p class="eyebrow">READY WHEN YOU ARE</p>
            <h2>挑一个最想做的，这周就开始。</h2>
            <p class="closing-note">申请不收费，作品版权归你。我们只在意一件事：你有没有真的把它做出来。</p>
          </div>
          <div class="closing-actions">
            <a class="action action-primary" :href="applicationMailto(incentivePlans[0])">发送申请邮件<ArrowUpRight :size="17" aria-hidden="true" /></a>
            <div class="closing-mails">
              <a v-for="email in applicationEmails" :key="email" :href="`mailto:${email}`">{{ email }}</a>
            </div>
          </div>
        </div>
      </section>
    </main>
    <SiteFooter v-if="!embedded" />
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { useHead } from '@unhead/vue'
import { ArrowDown, ArrowRight, ArrowUpRight, CircleCheckBig, Clock, Gift, Mail, Megaphone, MessagesSquare, Package, Route, ShieldCheck, Trophy, Users } from '@lucide/vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import IncentivePoster from '@/components/IncentivePoster.vue'
import { applicationEmails, applicationMailto, applicationMaterials, incentivePlans, themeAccent, type IncentivePlan } from '@/data/incentive-plans'

withDefaults(defineProps<{
  embedded?: boolean
}>(), {
  embedded: false,
})

const heroTags = ['免费 AI token 周卡 / 月卡', '邮件申请，1–3 个工作日回复', '作品版权 100% 归创作者', '邮件答疑与作品展示位']

const heroFacts = [
  { label: '扶持额度', value: '两张周卡 + 一张月卡' },
  { label: '申请方式', value: '一封邮件，说清五件事' },
  { label: '回复时间', value: '1–3 个工作日' },
  { label: '作品版权', value: '100% 归创作者' },
]

const supportItems = [
  { icon: Gift, title: 'AI token 额度', text: '两张周卡加一张月卡，从想法到交付刚好够用，申请通过就发。' },
  { icon: Route, title: '接入指引', text: 'Codex、DeepSeek Harness、Claude Code 和图像工作流都有现成配置说明，照着做就能开始。' },
  { icon: MessagesSquare, title: '邮件答疑', text: '遇到报错、卡在思路或者不知道下一步做什么，把上下文写清楚发邮件，我们会告诉你往哪走。' },
  { icon: Megaphone, title: '展示与署名', text: '完成的作品进 AIGOKEY 展示位并署你的名字，成为简历和作品集里能点开的一项。' },
  { icon: Trophy, title: '进阶扶持', text: '好作品还能拿到额外额度、案例访谈和长期合作机会，从一次活动变成持续创作。' },
  { icon: ShieldCheck, title: '版权归你', text: '作品版权完全归创作者本人，我们只在你同意后用于展示和宣传。' },
]

const flowSteps = [
  { title: '挑一个', text: '三个活动看一眼，选和你现在最想做的事最接近的那个。' },
  { title: '发邮件', text: '按材料清单写一封邮件：你是谁、想做什么、做到什么程度。' },
  { title: '领额度', text: '1–3 个工作日内回复，通过后拿到 token 周卡或月卡和接入指引。' },
  { title: '动手做', text: '在周期内把作品做出来，按各活动要求的形式交。' },
  { title: '被看见', text: '作品进展示位，我们给反馈，好的还能拿到进阶扶持。' },
]

const listFaqs = [
  { q: '三个活动可以同时申请吗？', a: '建议先专注一个。把一件作品做完，比同时开三个更容易被看见，也更容易拿到进阶扶持。' },
  { q: '申请后多久有结果？', a: '一般 1–3 个工作日邮件回复，节假日会稍慢。没收到的话先翻翻垃圾邮件，再换另一个邮箱重发一次。' },
  { q: '申请需要付费吗？', a: '不用。申请、额度、接入指引和邮件答疑都由 AIGOKEY 免费提供，不会以任何理由收费。' },
  { q: '没有通过怎么办？', a: '邮件里会说明原因。按建议把想法写具体、把目标缩小到一个周期能做完的程度，再交一次就行。' },
  { q: '作品版权归谁？', a: '全部归创作者本人。我们只在你同意后用于展示和宣传，你随时可以要求下架。' },
  { q: '已经在用 AIGOKEY 套餐，还能申请吗？', a: '可以。这份额度独立发放，不影响你已有的套餐，两边不冲突。' },
]

function accentStyle(plan: IncentivePlan) {
  const accent = themeAccent[plan.theme]
  return {
    '--accent': accent.color,
    '--accent-ink': accent.ink,
    '--accent-soft': accent.soft,
    '--accent-line': accent.line,
  } as CSSProperties
}

useHead({ title: '激励扶持计划｜AIGOKEY', meta: [{ name: 'description', content: 'AIGOKEY 创作者激励扶持计划：大学生有想法、我眼中的家乡、我爱独立游戏。三个活动，三张免费的 AI token 周卡或月卡，把想法真的做出来。' }] })
</script>

<style scoped>
.incentives-page { color: #172d40; background: #fff; }
.shell { width: min(1240px, calc(100% - 64px)); margin: 0 auto; }
.eyebrow { color: #2468f2; font: 700 11px/1.5 Consolas, monospace; letter-spacing: .12em; }

/* Hero */
.hero { position: relative; overflow: hidden; padding: 52px 0 44px; background: linear-gradient(180deg, #f7faff 0%, #ffffff 82%); }
.hero::after { position: absolute; top: -160px; right: -120px; width: 620px; height: 620px; border-radius: 50%; background: radial-gradient(circle, rgba(36, 104, 242, .1), rgba(36, 104, 242, 0) 68%); content: ""; pointer-events: none; }
.hero .shell { position: relative; z-index: 1; }
.hero-top { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(300px, .85fr); align-items: start; gap: 40px 56px; }
.hero-copy h1 { margin: 14px 0 12px; font-size: clamp(34px, 4.4vw, 52px); font-weight: 850; letter-spacing: -.04em; line-height: 1.12; }
.hero-sub { color: #24405c; font-size: 18px; font-weight: 700; line-height: 1.7; }
.intro { margin-top: 12px; color: #637382; font-size: 15px; line-height: 1.85; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
.hero-facts { padding: 24px 24px 20px; border: 1px solid #e2eaf6; border-radius: 16px; background: linear-gradient(180deg, #fff, #f8fbff); box-shadow: 0 18px 40px rgba(23, 45, 64, .06); }
.hero-facts-title { color: #2468f2; font: 700 11px/1.5 Consolas, monospace; letter-spacing: .12em; }
.hero-facts-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px 20px; margin: 18px 0 0; padding: 0; }
.hero-facts-list dt { color: #93a1ad; font: 700 11px/1.5 Consolas, monospace; letter-spacing: .08em; }
.hero-facts-list dd { margin-top: 6px; color: #1d3144; font-size: 14px; font-weight: 750; line-height: 1.55; }
.hero-facts-note { margin-top: 20px; padding-top: 16px; border-top: 1px dashed #dfe4ea; color: #7d8b98; font-size: 12px; line-height: 1.7; }
.hero-tags { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; margin: 40px 0 0; padding: 0; list-style: none; }
.hero-tags li { display: inline-flex; align-items: center; gap: 7px; padding: 11px 14px; border: 1px solid #dbe6f8; border-radius: 11px; color: #33526f; background: #fff; font-size: 12.5px; font-weight: 650; line-height: 1.5; }
.hero-tags svg { flex-shrink: 0; color: #2468f2; }
.action { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 46px; padding: 0 20px; border: 1px solid transparent; border-radius: 9px; font-size: 14px; font-weight: 750; transition: background .2s, border-color .2s, transform .2s; }
.action-primary { color: #fff; background: #2468f2; box-shadow: 0 14px 30px rgba(36, 104, 242, .2); }
.action-primary:hover { background: #184ab7; transform: translateY(-1px); }
.action-ghost { border-color: #d8e2ee; color: #1d3144; background: #fff; }
.action-ghost:hover { border-color: rgba(36, 104, 242, .35); transform: translateY(-1px); }

/* Sections */
.section { padding: 78px 0; scroll-margin-top: 96px; }
.section-activities { padding-top: 56px; }
.section-soft { background: #f7f9fb; }
.section-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 32px; margin-bottom: 34px; }
.section-heading h2 { margin-top: 12px; font-size: clamp(26px, 3vw, 36px); font-weight: 850; letter-spacing: -.03em; }
.section-heading h2 span { margin-left: 10px; color: #93a1ad; font: 14px Consolas, monospace; }
.section-heading > p { max-width: 380px; color: #7d8b98; font-size: 13px; line-height: 1.75; text-align: right; }

/* Activity cards */
.activity-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
.activity-card { display: flex; flex-direction: column; min-width: 0; padding: 10px; border: 1px solid #eceff3; border-radius: 20px; background: #f6f7f8; transition: transform .2s, box-shadow .2s, border-color .2s; }
.activity-card:hover { transform: translateY(-4px); border-color: var(--accent-line); box-shadow: 0 16px 38px #172d4014; }
.activity-card :deep(.incentive-poster) { border-radius: 13px; }
.card-copy { display: flex; flex-direction: column; flex: 1; padding: 18px 12px 10px; }
.card-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.card-head h3 { font-size: 20px; font-weight: 800; letter-spacing: -.02em; }
.card-head svg { flex-shrink: 0; color: var(--accent); }
.card-tagline { margin-top: 9px; color: #61717e; font-size: 13px; line-height: 1.7; }
.card-meta { display: flex; flex-wrap: wrap; gap: 7px 8px; margin-top: 14px; }
.card-meta span { display: inline-flex; align-items: center; gap: 5px; padding: 4px 9px; border: 1px solid var(--accent-line); border-radius: 999px; color: var(--accent-ink); background: var(--accent-soft); font-size: 11px; font-weight: 650; }
.card-points { display: grid; gap: 9px; margin: 18px 0 0; padding: 16px 0 0; border-top: 1px dashed #dfe4ea; list-style: none; }
.card-points li { display: flex; align-items: flex-start; gap: 8px; color: #3f5262; font-size: 12.5px; font-weight: 650; line-height: 1.6; }
.card-points svg { flex-shrink: 0; margin-top: 2px; color: var(--accent); }
.card-deliverable { display: flex; align-items: flex-start; gap: 8px; margin-top: 16px; color: #7d8b98; font-size: 11.5px; line-height: 1.6; }
.card-deliverable svg { flex-shrink: 0; margin-top: 2px; color: var(--accent); }
.card-bottom { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; margin-top: auto; padding-top: 18px; }
.benefit { display: inline-flex; align-items: center; gap: 6px; padding: 5px 10px; border: 1px solid var(--accent-line); border-radius: 6px; color: var(--accent-ink); background: var(--accent-soft); font-size: 11px; font-weight: 700; }
.details-link { display: inline-flex; align-items: center; gap: 5px; color: #647583; font-size: 12px; font-weight: 650; }
.activity-card:hover .details-link { color: var(--accent); }

/* Support */
.support-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
.support-card { padding: 26px 24px; border: 1px solid #e6ecf2; border-radius: 14px; background: #fff; transition: transform .2s, box-shadow .2s, border-color .2s; }
.support-card:hover { transform: translateY(-3px); border-color: #c9d9fb; box-shadow: 0 14px 32px #172d4010; }
.support-icon { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 10px; color: #2468f2; background: #eef3ff; }
.support-card h3 { margin-top: 16px; font-size: 16px; font-weight: 800; }
.support-card p { margin-top: 9px; color: #6b7b89; font-size: 13px; line-height: 1.8; }

/* Flow */
.flow-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 0; margin: 0; padding: 0; list-style: none; }
.flow-grid li { padding: 24px 20px 0 0; border-top: 2px solid #e6ecf2; }
.flow-grid li:first-child { border-top-color: #2468f2; }
.flow-index { color: #2468f2; font: 800 12px Consolas, monospace; letter-spacing: .1em; }
.flow-grid h3 { margin-top: 12px; font-size: 16px; font-weight: 800; }
.flow-grid p { margin-top: 8px; padding-right: 12px; color: #6b7b89; font-size: 12.5px; line-height: 1.8; }

/* Materials */
.materials-grid { display: grid; grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr); gap: 64px; align-items: start; }
.materials-copy h2 { margin-top: 12px; font-size: clamp(26px, 3vw, 36px); font-weight: 850; letter-spacing: -.03em; }
.materials-lead { margin-top: 18px; color: #6b7b89; font-size: 14px; line-height: 1.9; }
.materials-mails { display: grid; gap: 9px; margin-top: 26px; padding-top: 22px; border-top: 1px solid #e6ecf2; }
.materials-mails span { color: #93a1ad; font: 11px Consolas, monospace; letter-spacing: .1em; }
.materials-mails a { display: inline-flex; align-items: center; gap: 7px; color: #285cbb; font-size: 14px; font-weight: 700; }
.materials-list { display: grid; gap: 12px; margin: 0; padding: 0; list-style: none; }
.materials-list li { display: grid; grid-template-columns: 34px minmax(0, 1fr); gap: 4px 14px; padding: 18px 22px; border: 1px solid #e6ecf2; border-radius: 12px; background: #fff; }
.materials-index { grid-row: span 2; color: #2468f2; font: 800 12px Consolas, monospace; }
.materials-list strong { font-size: 14px; font-weight: 800; }
.materials-list p { color: #6b7b89; font-size: 12.5px; line-height: 1.75; }

/* FAQ */
.faq-grid { display: grid; grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr); gap: 64px; align-items: start; }
.faq-heading h2 { margin-top: 12px; font-size: clamp(26px, 3vw, 36px); font-weight: 850; letter-spacing: -.03em; }
.faq-heading > p:last-child { max-width: 320px; margin-top: 16px; color: #6b7b89; font-size: 13px; line-height: 1.85; }
.faq-list { border-top: 1px solid #dbe3ea; }
.faq-list details { border-bottom: 1px solid #eceff3; }
.faq-list summary { display: grid; grid-template-columns: 36px minmax(0, 1fr) auto; align-items: center; gap: 12px; min-height: 68px; padding: 12px 0; font-size: 15px; font-weight: 800; cursor: pointer; list-style: none; }
.faq-list summary::-webkit-details-marker { display: none; }
.faq-list summary span { color: #2468f2; font: 800 11px Consolas, monospace; }
.faq-list summary::after { content: "+"; color: #2468f2; font: 22px/1 Consolas, monospace; }
.faq-list details[open] summary::after { content: "−"; }
.faq-list details p { padding: 0 44px 22px 48px; color: #6b7b89; font-size: 13.5px; line-height: 1.85; }

/* Closing */
.closing { padding: 72px 0; color: #eaf1f8; background: #132231; }
.closing-grid { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(280px, .6fr); align-items: center; gap: 48px; }
.closing .eyebrow { color: #7fb0ff; }
.closing h2 { margin-top: 14px; font-size: clamp(24px, 3vw, 34px); font-weight: 850; letter-spacing: -.03em; line-height: 1.3; }
.closing-note { margin-top: 16px; color: #9fb3c4; font-size: 13.5px; line-height: 1.85; }
.closing-actions { display: grid; gap: 14px; justify-items: start; }
.closing-mails { display: flex; flex-wrap: wrap; gap: 8px 18px; }
.closing-mails a { color: #cfe0f2; font-size: 13px; font-weight: 650; border-bottom: 1px solid rgba(207, 224, 242, .3); }
.closing-mails a:hover { color: #fff; }

a:focus-visible { outline: 3px solid #2468f2; outline-offset: 5px; }

/* Embedded (/incentive-plans/embed/): no header/footer, and the global focus
   outline is not loaded for embedded routes. */
.incentives-page--embedded .hero { padding-top: 26px; }
.incentives-page--embedded .section-activities { padding-top: 44px; }
.incentives-page--embedded :deep(a:focus-visible), .incentives-page--embedded :deep(summary:focus-visible) { outline: 3px solid #2468f2; outline-offset: 4px; }

@media (max-width: 1100px) {
  .hero-top { grid-template-columns: minmax(0, 1fr); gap: 30px; }
  .activity-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .support-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .flow-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
  .flow-grid li { padding-right: 0; }
  .materials-grid, .faq-grid { grid-template-columns: minmax(0, 1fr); gap: 34px; }
  .closing-grid { grid-template-columns: minmax(0, 1fr); gap: 30px; }
}
@media (max-width: 780px) {
  .shell { width: calc(100% - 36px); }
  .hero { padding: 40px 0 38px; }
  .hero-facts { padding: 20px 18px 16px; }
  .hero-tags { grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 28px; }
  .section { padding: 56px 0; }
  .section-heading { flex-direction: column; align-items: flex-start; gap: 14px; margin-bottom: 26px; }
  .section-heading > p { text-align: left; }
  .section-activities { padding-top: 44px; }
  .activity-grid { grid-template-columns: 1fr; gap: 22px; }
  .support-grid { grid-template-columns: 1fr; }
  .flow-grid { grid-template-columns: 1fr; gap: 22px; }
  .flow-grid p { padding-right: 0; }
  .faq-list summary { grid-template-columns: 30px minmax(0, 1fr) auto; font-size: 14px; }
  .faq-list details p { padding: 0 0 20px 42px; }
  .closing { padding: 54px 0; }
}
@media (max-width: 520px) {
  .hero-facts-list { grid-template-columns: minmax(0, 1fr); gap: 14px; }
  .hero-tags { grid-template-columns: minmax(0, 1fr); }
}
@media (max-width: 420px) {
  .hero-actions { flex-direction: column; align-items: stretch; }
  .action { width: 100%; }
  .closing-actions { justify-items: stretch; }
  .closing-actions .action { width: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .activity-card, .support-card, .action { transition: none; }
  .activity-card:hover, .support-card:hover, .action:hover { transform: none; }
}
</style>
