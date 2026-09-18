<template>
  <div class="incentive-poster" :class="`poster--${plan.theme}`" aria-hidden="true">
    <span class="poster-texture"></span>
    <span class="poster-brand">AIGOKEY <span>激励扶持计划</span></span>
    <span class="poster-index">NO.{{ plan.index }}</span>
    <div class="poster-copy">
      <span class="poster-category">{{ plan.category }}</span>
      <strong><span v-for="line in plan.posterTitle" :key="line">{{ line }}</span></strong>
    </div>

    <svg v-if="plan.theme === 'coding'" class="poster-art" viewBox="0 0 600 340" fill="none">
      <circle cx="470" cy="164" r="133" stroke="currentColor" opacity=".2" />
      <circle cx="470" cy="164" r="106" stroke="currentColor" opacity=".2" />
      <g transform="rotate(9 460 170)">
        <rect x="336" y="75" width="233" height="170" rx="12" fill="#f3f7ff" stroke="#172d81" stroke-width="3" />
        <path d="M336 104H569" stroke="#172d81" stroke-width="3" />
        <circle cx="352" cy="89" r="3" fill="#3860db" /><circle cx="365" cy="89" r="3" fill="#3860db" /><circle cx="378" cy="89" r="3" fill="#3860db" />
        <path d="m386 146-20 20 20 20m127-40 20 20-20 20" stroke="#3860db" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
        <path d="m456 111-47 70h39l-15 50 66-85h-40l16-35z" fill="#eaff73" stroke="#172d81" stroke-width="3" stroke-linejoin="round" />
      </g>
      <path d="M550 39v22m-11-11h22M321 239v18m-9-9h18" stroke="currentColor" stroke-width="3" />
      <path d="m419 269 15 14-15 14" stroke="currentColor" stroke-width="3" />
    </svg>

    <svg v-else-if="plan.theme === 'hometown'" class="poster-art" viewBox="0 0 600 340" fill="none">
      <g transform="rotate(10 454 173)">
        <path d="M344 31h224v267H344z" fill="#fff8e8" />
        <path d="M356 44h200v220H356z" fill="#bddce4" />
        <circle cx="496" cy="90" r="26" fill="#f57941" />
        <path d="m356 163 58-60 64 69 38-41 40 43v90H356z" fill="#709e91" />
        <path d="m356 187 62-36 59 54 41-40 38 32v67H356z" fill="#326e63" />
        <path d="M356 240c60-72 99 16 200-27v51H356z" fill="#e6ca86" />
        <path d="M356 253c61-35 132 6 200-28v39H356z" fill="#67b9cb" />
        <path d="M395 202h32v28h-32z" fill="#fff4de" /><path d="m388 202 23-21 23 21z" fill="#c46040" />
        <path d="M408 214h8v16h-8z" fill="#326e63" />
        <path d="M364 280h89m63 0h31" stroke="#326e63" stroke-width="3" />
      </g>
      <path d="m304 73 13-6 13 6m-6-23 10-5 10 5" stroke="#326e63" stroke-width="2" />
    </svg>

    <svg v-else class="poster-art" viewBox="0 0 600 340" fill="none" shape-rendering="crispEdges">
      <path d="M332 258h49v-24h67v28h60v-42h69v25h23v95H332z" fill="#4d448a" />
      <path d="M332 258h49v-24h67v28h60v-42h69v25h23" stroke="#a59bed" stroke-width="8" />
      <path d="M403 122h112v16h16v68h-16v16h-32v-16h-48v16h-32v-16h-16v-68h16z" fill="#f4b7de" />
      <path d="M416 146v44m-22-22h44" stroke="#3e3068" stroke-width="12" />
      <path d="M490 148h13v13h-13zM507 171h13v13h-13z" fill="#6545aa" />
      <path d="M454 184h20" stroke="#3e3068" stroke-width="7" />
      <path d="M447 61h10V51h20v10h10v20h-10v10h-20V81h-10z" fill="#ffdc76" />
      <path d="M340 102h8V94h8v8h8v8h-8v8h-8v-8h-8zM538 70h8v-8h8v8h8v8h-8v8h-8v-8h-8z" fill="#c8bafa" />
      <path d="M560 167h7v7h-7zM363 193h6v6h-6zM509 37h6v6h-6z" fill="#ffdc76" />
    </svg>
    <span class="poster-benefit">{{ plan.benefit }}</span>
  </div>
</template>

<script setup lang="ts">
import type { IncentivePlan } from '@/data/incentive-plans'
defineProps<{ plan: IncentivePlan }>()
</script>

<style scoped>
.incentive-poster { position: relative; aspect-ratio: 1.85; overflow: hidden; container-type: inline-size; }
.poster--coding { color: #fff; background: #3860db; }
.poster--hometown { color: #254f46; background: #e8eddb; }
.poster--game { color: #f7eafb; background: #30254f; }
.poster-texture { position: absolute; inset: 0; pointer-events: none; }
.poster--coding .poster-texture { background-image: linear-gradient(rgba(255, 255, 255, .08) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, .08) 1px, transparent 1px); background-size: 5cqw 5cqw; }
.poster--hometown .poster-texture { background-image: repeating-linear-gradient(45deg, rgba(50, 110, 99, .07) 0 1px, transparent 1px 7px); }
.poster--game .poster-texture { background-image: radial-gradient(rgba(255, 220, 118, .22) 1px, transparent 1px), radial-gradient(rgba(200, 186, 250, .18) 1px, transparent 1px); background-size: 4.5cqw 4.5cqw, 6.5cqw 6.5cqw; background-position: 0 0, 2cqw 2cqw; }
.poster-brand { position: absolute; top: 7%; left: 5%; z-index: 1; font: 900 3cqw/1.2 Consolas, monospace; letter-spacing: -.04em; }
.poster-brand span { margin-left: 8px; font: 500 2cqw/1.2 'Microsoft YaHei', sans-serif; letter-spacing: .04em; opacity: .8; }
.poster-index { position: absolute; bottom: 7%; right: 5%; z-index: 1; padding: .7cqw 2cqw; border: 1px solid currentColor; border-radius: 999px; background: rgba(255, 255, 255, .14); font: 700 1.9cqw/1.5 Consolas, monospace; letter-spacing: .12em; opacity: .82; }
.poster-copy { position: absolute; top: 28%; left: 6%; z-index: 1; }
.poster-category { display: block; margin-bottom: 2.5cqw; font: 600 2.3cqw/1.2 Consolas, 'Microsoft YaHei', sans-serif; letter-spacing: .08em; }
.poster-copy strong { display: grid; gap: 1.2cqw; font: 900 7.7cqw/1.08 'Microsoft YaHei', sans-serif; letter-spacing: -.045em; }
.poster--hometown .poster-copy strong { font-family: 'STKaiti', 'KaiTi', 'Microsoft YaHei', sans-serif; font-size: 8.5cqw; }
.poster--game .poster-copy strong { color: #ffdc76; }
.poster-art { position: absolute; inset: 0; width: 100%; height: 100%; }
.poster-benefit { position: absolute; bottom: 7%; left: 6%; z-index: 1; padding: .9cqw 2.4cqw; border: 1px solid currentColor; border-radius: 999px; font-size: 2.2cqw; font-weight: 700; letter-spacing: .04em; }
</style>
