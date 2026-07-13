<template>
  <div class="min-h-screen overflow-x-hidden bg-[#f8fbfd] text-[#111b24]">
    <header class="sticky top-0 z-30 border-b border-line/80 bg-[#f8fbfd]/92 backdrop-blur-[18px]">
      <div class="mx-auto flex min-h-[72px] max-w-[1280px] items-center justify-between gap-5 px-6 max-[760px]:flex-col max-[760px]:items-start max-[760px]:py-3.5 max-[760px]:px-4">
        <router-link to="/" class="inline-flex items-center gap-3 text-[21px] font-black" aria-label="AigoKey">
          <img src="/assets/aigokey-logo.png" alt="AigoKey Logo" class="h-[42px] w-[42px] rounded-lg object-cover shadow-[0_10px_24px_rgba(36,104,242,0.16)]" />
          <span>AigoKey</span>
        </router-link>
        <nav class="flex items-center gap-3 max-[760px]:grid max-[760px]:w-full max-[760px]:grid-cols-[repeat(auto-fit,minmax(76px,1fr))] max-[760px]:gap-2" :aria-label="page.navLabel">
          <LanguageMenu />
          <a class="btn btn-ghost max-[760px]:min-h-[40px] max-[760px]:px-2.5 max-[760px]:text-[13px]" :href="registerUrl" target="_top">{{ t.navButtons.register }}</a>
          <a class="btn btn-ghost max-[760px]:min-h-[40px] max-[760px]:px-2.5 max-[760px]:text-[13px]" :href="loginUrl" target="_top">{{ t.navButtons.login }}</a>
          <router-link class="btn border-blue bg-blue text-white shadow-[0_12px_28px_rgba(36,104,242,0.22)] max-[760px]:min-h-[40px] max-[760px]:px-2.5 max-[760px]:text-[13px]" to="/image-creation">{{ t.navButtons.imageCreation }}</router-link>
          <router-link class="btn btn-ghost max-[760px]:min-h-[40px] max-[760px]:px-2.5 max-[760px]:text-[13px]" to="/codex-help">{{ t.navButtons.help }}</router-link>
          <router-link class="btn btn-ghost max-[760px]:min-h-[40px] max-[760px]:px-2.5 max-[760px]:text-[13px]" to="/enterprise-service">{{ t.navButtons.enterprise }}</router-link>
        </nav>
      </div>
    </header>

    <main>
      <section class="relative isolate min-h-[min(720px,calc(100vh-72px))] overflow-hidden bg-[#0c1017] text-white">
        <img src="/assets/image-creation-hero.png" :alt="page.hero.imageAlt" class="absolute inset-0 h-full w-full object-cover object-center" />
        <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,12,18,0.96)_0%,rgba(8,12,18,0.82)_31%,rgba(8,12,18,0.22)_65%,rgba(8,12,18,0.08)_100%)]"></div>
        <div class="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(0deg,rgba(8,12,18,0.96),transparent)]"></div>
        <div class="relative mx-auto flex min-h-[min(720px,calc(100vh-72px))] max-w-[1280px] items-center px-6 py-20 max-[760px]:items-end max-[760px]:px-4 max-[760px]:py-12">
          <div class="max-w-[660px]">
            <p class="mb-5 text-[13px] font-black tracking-[0.18em] text-[#ffb49a]">{{ page.hero.eyebrow }}</p>
            <h1 class="text-[clamp(44px,6vw,82px)] font-black leading-[0.98]">{{ page.hero.titleBefore }}<br /><span class="text-[#ff8065]">{{ page.hero.titleHighlight }}</span></h1>
            <p class="mt-7 max-w-[560px] text-[18px] leading-[1.8] text-white/76 max-[760px]:text-[16px]">{{ page.hero.copy }}</p>
            <div class="mt-8 flex flex-wrap gap-3">
              <a class="btn border-[#ff8065] bg-[#ff8065] text-[#25120f] shadow-[0_14px_34px_rgba(255,128,101,0.25)]" href="#setup">{{ page.hero.action }}</a>
            </div>
          </div>
        </div>
      </section>

      <section class="border-b border-line bg-white px-6 py-5 max-[760px]:px-4">
        <div class="mx-auto flex max-w-[1280px] items-center justify-between gap-6 max-[760px]:items-start">
          <p class="text-[14px] font-bold leading-[1.55] text-[#3f454a]">{{ page.strip.copy }}</p>
          <a href="#setup" class="shrink-0 text-[14px] font-black text-[#db4b32] underline decoration-2 underline-offset-4">{{ page.strip.action }}</a>
        </div>
      </section>

      <section class="px-6 py-[92px] max-[760px]:px-4 max-[760px]:py-16" style="background-image: linear-gradient(rgba(36,104,242,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(36,104,242,0.06) 1px, transparent 1px); background-size: 56px 56px;">
        <div class="mx-auto max-w-[1280px]">
          <div class="grid grid-cols-[minmax(0,0.85fr)_minmax(420px,1.15fr)] gap-12 max-[1020px]:grid-cols-1">
            <div>
              <p class="text-[13px] font-black tracking-[0.16em] text-[#db4b32]">{{ page.creation.eyebrow }}</p>
              <h2 class="mt-4 max-w-[500px] text-[clamp(34px,4.3vw,58px)] font-black leading-[1.08]">{{ page.creation.title }}</h2>
              <p class="mt-5 max-w-[470px] text-[17px] leading-[1.8] text-[#586068]">{{ page.creation.copy }}</p>
            </div>
            <div class="grid grid-cols-2 gap-x-8 gap-y-10 max-[560px]:grid-cols-1">
              <article v-for="item in creationTypes" :key="item.number" class="border-t-2 border-[#151719] pt-4">
                <div class="flex items-baseline justify-between gap-3"><h3 class="text-[22px] font-black">{{ item.title }}</h3><span class="text-[13px] font-black text-[#db4b32]">{{ item.number }}</span></div>
                <p class="mt-3 text-[15px] leading-[1.75] text-[#586068]">{{ item.text }}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-[#151719] px-6 py-[92px] text-white max-[760px]:px-4 max-[760px]:py-16">
        <div class="mx-auto max-w-[1280px]">
          <div class="grid grid-cols-[minmax(0,1fr)_minmax(360px,0.78fr)] gap-12 max-[1020px]:grid-cols-1">
            <div>
              <p class="text-[13px] font-black tracking-[0.16em] text-[#f6a68d]">{{ page.prompt.eyebrow }}</p>
              <h2 class="mt-4 max-w-[720px] text-[clamp(34px,4.2vw,56px)] font-black leading-[1.1]">{{ page.prompt.title }}</h2>
            </div>
            <p class="self-end text-[17px] leading-[1.8] text-white/65">{{ page.prompt.copy }}</p>
          </div>
          <div class="mt-12 grid grid-cols-3 gap-4 max-[1020px]:grid-cols-1">
            <div v-for="card in page.prompt.cards" :key="card.label" class="min-h-[230px] border border-white/15 p-6">
              <div class="text-[13px] font-black text-[#f6a68d]">{{ card.label }}</div>
              <p class="mt-6 text-[22px] font-black leading-[1.35]">{{ card.text }}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="setup" class="scroll-mt-24 bg-[#eef6ff] px-6 py-[92px] max-[760px]:px-4 max-[760px]:py-16" style="background-image: linear-gradient(rgba(36,104,242,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(36,104,242,0.07) 1px, transparent 1px); background-size: 56px 56px;">
        <div class="mx-auto max-w-[1280px]">
          <div class="grid grid-cols-[minmax(0,0.92fr)_minmax(420px,1.08fr)] gap-12 max-[1020px]:grid-cols-1">
            <div>
              <p class="text-[13px] font-black tracking-[0.16em] text-[#db4b32]">{{ page.setup.eyebrow }}</p>
              <h2 class="mt-4 max-w-[560px] text-[clamp(34px,4.3vw,58px)] font-black leading-[1.08]">{{ page.setup.title }}</h2>
              <p class="mt-5 max-w-[510px] text-[17px] leading-[1.8] text-[#586068]">{{ page.setup.copy }}</p>
              <div class="mt-6 inline-flex items-center gap-3 border border-[#b8d1ef] bg-white px-4 py-3 text-[14px] shadow-[0_8px_22px_rgba(36,104,242,0.08)]"><span class="font-black text-[#486078]">{{ page.setup.modelLabel }}</span><span class="rounded-md bg-[#e9f3ff] px-2.5 py-1 font-mono font-bold text-blue">gpt-image-2</span></div>
            </div>
            <ol class="grid gap-0 border-t border-black/15">
              <li v-for="step in setupSteps" :key="step.number" class="grid grid-cols-[72px_1fr] gap-4 border-b border-black/15 py-5 max-[560px]:grid-cols-[54px_1fr]">
                <span class="text-[15px] font-black text-[#db4b32]">{{ step.number }}</span>
                <div>
                  <h3 class="text-[19px] font-black">{{ step.title }}</h3>
                  <template v-if="step.number === '01'">
                    <p class="mt-2 text-[15px] leading-[1.7] text-[#586068]">{{ page.setup.githubBefore }} <a class="font-bold text-[#db4b32] underline decoration-2 underline-offset-4" href="https://github.com/wonder-o/agk2img-skill" target="_blank" rel="noopener">https://github.com/wonder-o/agk2img-skill</a>{{ page.setup.githubAfter }}</p>
                    <p class="mt-3 border-l-2 border-[#db4b32] pl-4 text-[16px] font-bold leading-[1.7] text-[#252a2e]">{{ page.setup.installPrompt }}</p>
                  </template>
                  <p v-else class="mt-2 whitespace-pre-line text-[15px] leading-[1.7] text-[#586068]">{{ step.text }}</p>
                </div>
              </li>
            </ol>
          </div>

          <section class="mt-14 overflow-hidden border border-[#b8d1ef] bg-white shadow-[0_22px_56px_rgba(36,104,242,0.1)]">
            <div class="flex items-center gap-2 border-b border-[#dce8f5] px-5 py-4"><span class="h-2.5 w-2.5 rounded-full bg-blue"></span><span class="h-2.5 w-2.5 rounded-full bg-[#79d478]"></span><span class="h-2.5 w-2.5 rounded-full bg-[#f4c45d]"></span><span class="ml-3 text-[13px] font-black tracking-[0.08em] text-[#486078]">CHATGPT CODEX APP</span></div>
            <div class="p-6 max-[760px]:p-5">
              <h3 class="text-[24px] font-black">{{ page.commands.title }}</h3>
              <p class="mt-3 text-[16px] leading-[1.7] text-[#586068]">{{ page.commands.copy }}</p>
              <div class="mt-4 grid gap-5 bg-[#f4f8fd] p-5 font-mono text-[15px] leading-[1.75] text-[#172a3d] max-[760px]:p-4">
                <section v-for="group in commandGroups" :key="group.title">
                  <h4 class="font-sans text-[15px] font-black text-blue">{{ group.title }}</h4>
                  <ul class="mt-2 grid gap-1.5 p-0 list-none">
                    <li v-for="prompt in group.prompts" :key="prompt" class="grid grid-cols-[auto_1fr] gap-2"><span class="font-bold text-[#4775b7]">-</span><span>{{ prompt }}</span></li>
                  </ul>
                </section>
              </div>
            </div>
          </section>
          <p class="mt-4 text-[14px] leading-[1.7] text-[#586068]">{{ page.setup.note }}</p>
        </div>
      </section>

      <section class="bg-[#132231] px-6 py-[78px] text-white max-[760px]:px-4 max-[760px]:py-14">
        <div class="mx-auto grid max-w-[1280px] grid-cols-[minmax(0,1fr)_auto] items-end gap-8 max-[900px]:grid-cols-1">
          <div><p class="text-[13px] font-black tracking-[0.16em] text-[#9feb8b]">{{ page.cta.eyebrow }}</p><h2 class="mt-4 max-w-[780px] text-[clamp(34px,4.4vw,60px)] font-black leading-[1.08]">{{ page.cta.title }}</h2></div>
          <a class="btn border-green bg-green text-[#123412] shadow-[0_14px_28px_rgba(68,201,40,0.2)]" :href="loginUrl" target="_top">{{ page.cta.action }}</a>
        </div>
      </section>
    </main>

    <footer class="border-t border-line bg-white px-6 py-8 text-[#667583]">
      <div class="mx-auto grid max-w-[1180px] grid-cols-[1fr_auto_1fr] items-center gap-4 text-[14px] max-[720px]:grid-cols-1 max-[720px]:justify-items-center max-[720px]:text-center">
        <router-link to="/" class="inline-flex items-center gap-3 text-[21px] font-black text-[#111b24]">
          <img src="/assets/aigokey-logo.png" alt="AigoKey Logo" class="h-[42px] w-[42px] rounded-[10px] object-cover" />
          <span>AigoKey</span>
        </router-link>
        <div class="text-[13px] text-[#83909c]">{{ t.footer.copyright }}</div>
        <div class="justify-self-end max-[720px]:justify-self-center">{{ t.footer.text }}</div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import LanguageMenu from '@/components/LanguageMenu.vue'
import { useHostUrl } from '@/composables/useHostUrl'
import { useI18n } from '@/composables/useI18n'

const imageCopy = {
  'zh-CN': {
    meta: { title: '图像创作', description: '使用 AigoKey 套餐和 agk2img-skill，在 ChatGPT Codex App 中完成插画、漫画、广告图与电商图等图像创作。', keywords: 'AigoKey, 图像创作, AI 绘图, 插画, 漫画, 广告图, 电商图, ChatGPT Codex App, agk2img-skill' },
    navLabel: '主导航',
    hero: { imageAlt: '插画、漫画、广告和电商产品的图像创作拼贴', eyebrow: 'AIGOKEY IMAGE CREATION', titleBefore: '把想象，变成', titleHighlight: '可以交付的画面', copy: '使用 AigoKey 套餐中的图像能力，在 ChatGPT Codex App 里完成插画、漫画、彩漫、广告图、电商图与更多视觉创作。', action: '配置图像能力' },
    strip: { copy: '一个配置，让创作工作流留在你熟悉的 ChatGPT Codex App 内。', action: '查看配置步骤' },
    creation: { eyebrow: 'CREATIVE DIRECTIONS', title: '从一个灵感，展开不同的视觉表达', copy: '让模型承担画面探索和首稿生成，把你的时间留给选题、判断、修改与交付。' },
    creationTypes: [
      { number: '01', title: '插画与视觉概念', text: '为品牌故事、文章配图、角色和世界观探索不同的绘画语言与画面气质。' },
      { number: '02', title: '漫画与彩漫', text: '从单格情绪图到系列分镜，用角色、场景、镜头和色彩推动叙事。' },
      { number: '03', title: '广告与内容投放', text: '快速生成海报方向、社媒封面、活动主视觉与适配不同媒介的创意素材。' },
      { number: '04', title: '电商与产品展示', text: '探索主图构图、场景化展示、材质氛围和详情页所需的视觉素材。' },
    ],
    prompt: { eyebrow: 'FROM PROMPT TO OUTPUT', title: '把图像任务说清楚，剩下的交给生成能力', copy: '适合从概念草图到成品视觉的连续尝试。可以描述主体、画面比例、材质、光线、构图和需要避免的内容。', cards: [{ label: '01 / 画面方向', text: '插画、漫画、彩漫、摄影感产品图' }, { label: '02 / 使用场景', text: '社媒封面、广告投放、电商详情页、提案与分镜' }, { label: '03 / 画面约束', text: '主体、构图、色彩、比例，以及不希望出现的元素' }] },
    setup: {
      eyebrow: 'SETUP IN CODEX', title: '配置一次，就能在 Codex 中开始创作', copy: '按照 agk2img-skill 的流程，在 ChatGPT Codex App 中用自然语言完成 Base URL 与 API Key 配置。它们只用于图像生成，不会覆盖你的其他 OpenAI 配置。', modelLabel: '支持模型', githubBefore: '打开', githubAfter: '，复制下面这句话到 ChatGPT Codex 即可快速安装：', installPrompt: 'https://github.com/wonder-o/agk2img-skill，帮我安装这个 skill，进行快速安装。', note: 'API Key 可在 AigoKey 的密钥管理中创建。ChatGPT Codex App 会在需要时引导你安全输入密钥；不要把密钥写入截图、代码仓库或公开文档。',
      steps: [
        { number: '01', title: '安装 agk2img-skill', text: '通过 GitHub 仓库在 ChatGPT Codex 中快速安装 agk2img-skill。' },
        { number: '02', title: '创建 AigoKey API Key', text: '登录 AigoKey，可与现有的密钥共用，也可在密钥管理中创建专用于图像创作的 API Key。' },
        { number: '03', title: '用自然语言配置端点与密钥', text: '在 ChatGPT Codex App 中依次说\n帮我配置 agk2img 的 base url 为 https://llm.aigokey.cn\n帮我配置 agk2img 的 api key 为 sk-*******\napi key为 网站上的API密钥即可。' },
        { number: '04', title: '重启ChatGPT Codex App 后进行创作', text: '重启ChatGPT Codex App后，即可在ChatGPT Codex 中直接描述你要生成、修改或批量制作的画面。skill 会根据任务选择生成、编辑、参考图或批量工作流。' },
      ],
    },
    commands: { title: '支持指令', copy: '用自然语言跟 ChatGPT Codex 说：', groups: [{ title: '安装：', prompts: ['把 agk2img-skill 安装到 Codex skills 目录', '把 agk2img-skill 放到当前项目里使用'] }, { title: '配置：', prompts: ['帮我配置 agk2img 的 base url', '帮我更新 agk2img 的 api key', '帮我清空 agk2img 的配置', '帮我检查 agk2img 是否配置好了'] }, { title: '使用：', prompts: ['用 agk2img 生成一张 xxx 图', '用 agk2img 修改这张图片里的 xxx', '用 agk2img 把我上传的图片改成 xxx 风格', '用 agk2img 批量生成一组 xxx 素材'] }] },
    cta: { eyebrow: 'READY TO CREATE', title: '用 AigoKey 套餐，把图像创作纳入你的日常工作流。', action: '登录并创建 API Key' },
  },
  'zh-TW': {
    meta: { title: '圖像創作', description: '使用 AigoKey 方案與 agk2img-skill，在 ChatGPT Codex App 中完成插畫、漫畫、廣告圖與電商圖等圖像創作。', keywords: 'AigoKey, 圖像創作, AI 繪圖, 插畫, 漫畫, 廣告圖, 電商圖, ChatGPT Codex App, agk2img-skill' },
    navLabel: '主導覽',
    hero: { imageAlt: '插畫、漫畫、廣告和電商產品的圖像創作拼貼', eyebrow: 'AIGOKEY IMAGE CREATION', titleBefore: '把想像，變成', titleHighlight: '可以交付的畫面', copy: '使用 AigoKey 方案中的圖像能力，在 ChatGPT Codex App 裡完成插畫、漫畫、彩漫、廣告圖、電商圖與更多視覺創作。', action: '設定圖像能力' },
    strip: { copy: '一次設定，讓創作工作流程留在你熟悉的 ChatGPT Codex App 內。', action: '查看設定步驟' },
    creation: { eyebrow: 'CREATIVE DIRECTIONS', title: '從一個靈感，展開不同的視覺表達', copy: '讓模型承擔畫面探索和首稿生成，把你的時間留給選題、判斷、修改與交付。' },
    creationTypes: [
      { number: '01', title: '插畫與視覺概念', text: '為品牌故事、文章配圖、角色和世界觀探索不同的繪畫語言與畫面氣質。' },
      { number: '02', title: '漫畫與彩漫', text: '從單格情緒圖到系列分鏡，用角色、場景、鏡頭和色彩推動敘事。' },
      { number: '03', title: '廣告與內容投放', text: '快速生成海報方向、社群封面、活動主視覺與適配不同媒介的創意素材。' },
      { number: '04', title: '電商與產品展示', text: '探索主圖構圖、情境化展示、材質氛圍和詳情頁所需的視覺素材。' },
    ],
    prompt: { eyebrow: 'FROM PROMPT TO OUTPUT', title: '把圖像任務說清楚，剩下的交給生成能力', copy: '適合從概念草圖到成品視覺的連續嘗試。可以描述主體、畫面比例、材質、光線、構圖和需要避免的內容。', cards: [{ label: '01 / 畫面方向', text: '插畫、漫畫、彩漫、攝影感產品圖' }, { label: '02 / 使用情境', text: '社群封面、廣告投放、電商詳情頁、提案與分鏡' }, { label: '03 / 畫面約束', text: '主體、構圖、色彩、比例，以及不希望出現的元素' }] },
    setup: {
      eyebrow: 'SETUP IN CODEX', title: '設定一次，就能在 Codex 中開始創作', copy: '按照 agk2img-skill 的流程，在 ChatGPT Codex App 中用自然語言完成 Base URL 與 API Key 設定。它們只用於圖像生成，不會覆蓋你的其他 OpenAI 設定。', modelLabel: '支援模型', githubBefore: '開啟', githubAfter: '，複製下方這句話到 ChatGPT Codex 即可快速安裝：', installPrompt: 'https://github.com/wonder-o/agk2img-skill，幫我安裝這個 skill，進行快速安裝。', note: 'API Key 可在 AigoKey 的金鑰管理中建立。ChatGPT Codex App 會在需要時引導你安全輸入金鑰；不要把金鑰寫入截圖、程式碼儲存庫或公開文件。',
      steps: [
        { number: '01', title: '安裝 agk2img-skill', text: '透過 GitHub 儲存庫在 ChatGPT Codex 中快速安裝 agk2img-skill。' },
        { number: '02', title: '建立 AigoKey API Key', text: '登入 AigoKey，在金鑰管理中建立專用於圖像創作的 API Key，並妥善保管。' },
        { number: '03', title: '用自然語言設定端點與金鑰', text: '在 ChatGPT Codex App 中依序說「幫我設定 agk2img 的 base url」和「幫我更新 agk2img 的 api key。」此 skill 不使用 OPENAI_API_KEY。' },
        { number: '04', title: '在 ChatGPT Codex App 中創作', text: '直接描述你要生成、修改或批量製作的畫面。skill 會根據任務選擇生成、編輯、參考圖或批量工作流程。' },
      ],
    },
    commands: { title: '支援指令', copy: '用自然語言跟 ChatGPT Codex 說：', groups: [{ title: '安裝：', prompts: ['把 agk2img-skill 安裝到 Codex skills 目錄', '把 agk2img-skill 放到目前專案裡使用'] }, { title: '設定：', prompts: ['幫我設定 agk2img 的 base url', '幫我更新 agk2img 的 api key', '幫我清空 agk2img 的設定', '幫我檢查 agk2img 是否設定好了'] }, { title: '使用：', prompts: ['用 agk2img 生成一張 xxx 圖', '用 agk2img 修改這張圖片裡的 xxx', '用 agk2img 把我上傳的圖片改成 xxx 風格', '用 agk2img 批量生成一組 xxx 素材'] }] },
    cta: { eyebrow: 'READY TO CREATE', title: '用 AigoKey 方案，把圖像創作納入你的日常工作流程。', action: '登入並建立 API Key' },
  },
  en: {
    meta: { title: 'Image Creation', description: 'Use AigoKey plans and agk2img-skill to create illustrations, comics, ads, ecommerce images, and more in the ChatGPT Codex App.', keywords: 'AigoKey, image creation, AI image generation, illustration, comics, advertising images, ecommerce images, ChatGPT Codex App, agk2img-skill' },
    navLabel: 'Main navigation',
    hero: { imageAlt: 'A creative collage of illustration, comics, advertising, and ecommerce products', eyebrow: 'AIGOKEY IMAGE CREATION', titleBefore: 'Turn imagination into', titleHighlight: 'visual work you can deliver', copy: 'Use the image capabilities in your AigoKey plan to create illustrations, comics, color comics, ad creatives, ecommerce images, and more in the ChatGPT Codex App.', action: 'Set up image creation' },
    strip: { copy: 'One setup keeps your creative workflow inside the ChatGPT Codex App you already know.', action: 'View setup steps' },
    creation: { eyebrow: 'CREATIVE DIRECTIONS', title: 'Expand one idea into many visual expressions', copy: 'Let the model explore visual directions and generate first drafts, while you focus on selection, judgment, refinement, and delivery.' },
    creationTypes: [
      { number: '01', title: 'Illustration and concepts', text: 'Explore distinct visual languages and moods for brand stories, editorial images, characters, and world-building.' },
      { number: '02', title: 'Comics and color comics', text: 'Move from single-panel emotion studies to sequential storyboards with characters, settings, framing, and color.' },
      { number: '03', title: 'Ads and campaign content', text: 'Rapidly explore poster directions, social covers, campaign key visuals, and creative assets for different channels.' },
      { number: '04', title: 'Ecommerce and products', text: 'Explore hero-image composition, lifestyle displays, material mood, and visual assets for product detail pages.' },
    ],
    prompt: { eyebrow: 'FROM PROMPT TO OUTPUT', title: 'Describe the image task clearly, then let generation do the rest', copy: 'Designed for continuous exploration from concept sketches to finished visuals. Describe the subject, aspect ratio, materials, lighting, composition, and anything to avoid.', cards: [{ label: '01 / Visual direction', text: 'Illustration, comics, color comics, and photographic product imagery' }, { label: '02 / Use case', text: 'Social covers, ad campaigns, ecommerce pages, proposals, and storyboards' }, { label: '03 / Constraints', text: 'Subject, composition, palette, aspect ratio, and elements to exclude' }] },
    setup: {
      eyebrow: 'SETUP IN CODEX', title: 'Set it up once, then create in Codex', copy: 'Follow the agk2img-skill workflow and use natural language in the ChatGPT Codex App to configure the Base URL and API Key. They are used only for image generation and do not override other OpenAI settings.', modelLabel: 'Supported model', githubBefore: 'Open', githubAfter: ', then copy the sentence below into ChatGPT Codex for a quick installation:', installPrompt: 'https://github.com/wonder-o/agk2img-skill, install this skill for me with a quick setup.', note: 'Create an API Key in AigoKey key management. ChatGPT Codex App will guide you to enter it securely when needed; never put keys in screenshots, repositories, or public documents.',
      steps: [
        { number: '01', title: 'Install agk2img-skill', text: 'Install agk2img-skill quickly in ChatGPT Codex from the GitHub repository.' },
        { number: '02', title: 'Create an AigoKey API Key', text: 'Sign in to AigoKey, create an API Key dedicated to image creation in key management, and store it safely.' },
        { number: '03', title: 'Configure the endpoint and key naturally', text: 'In the ChatGPT Codex App, say “Configure the agk2img base URL for me” and “Update the agk2img API key for me.” This skill does not use OPENAI_API_KEY.' },
        { number: '04', title: 'Create in ChatGPT Codex App', text: 'Describe the image you want to generate, edit, or batch-produce. The skill selects the appropriate generation, editing, reference-image, or batch workflow.' },
      ],
    },
    commands: { title: 'Supported requests', copy: 'Use natural language with ChatGPT Codex:', groups: [{ title: 'Install:', prompts: ['Install agk2img-skill in the Codex skills directory', 'Use agk2img-skill in this project'] }, { title: 'Configure:', prompts: ['Configure the agk2img base URL for me', 'Update the agk2img API key for me', 'Clear the agk2img configuration for me', 'Check whether agk2img is configured correctly'] }, { title: 'Create:', prompts: ['Generate a xxx image with agk2img', 'Edit xxx in this image with agk2img', 'Restyle my uploaded image as xxx with agk2img', 'Batch-generate a set of xxx assets with agk2img'] }] },
    cta: { eyebrow: 'READY TO CREATE', title: 'Bring image creation into your everyday workflow with an AigoKey plan.', action: 'Sign in and create an API Key' },
  },
} as const

const { t, lang } = useI18n()
const page = computed(() => imageCopy[lang.value])

useHead({
  title: computed(() => `${page.value.meta.title} - AigoKey`),
  meta: [
    { name: 'description', content: computed(() => page.value.meta.description) },
    { name: 'keywords', content: computed(() => page.value.meta.keywords) },
  ],
})

const { loginUrl, registerUrl } = useHostUrl()

const creationTypes = computed(() => page.value.creationTypes)
const setupSteps = computed(() => page.value.setup.steps)
const commandGroups = computed(() => page.value.commands.groups)
</script>
