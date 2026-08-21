<template>
  <div class="min-h-screen overflow-x-hidden bg-white text-[#111b24]">
    <SiteHeader v-if="!embedded" @trial="$router.push('/free-trial/')" />

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
                  <p class="mt-2 whitespace-pre-line text-[15px] leading-[1.7] text-[#586068]">{{ step.text }}</p>
                </div>
              </li>
            </ol>
          </div>

          <section class="mt-14 overflow-hidden border border-[#b8d1ef] bg-white shadow-[0_22px_56px_rgba(36,104,242,0.1)]">
            <div class="flex items-center gap-2 border-b border-[#dce8f5] px-5 py-4"><span class="h-2.5 w-2.5 rounded-full bg-blue"></span><span class="h-2.5 w-2.5 rounded-full bg-[#79d478]"></span><span class="h-2.5 w-2.5 rounded-full bg-[#f4c45d]"></span><span class="ml-3 text-[13px] font-black tracking-[0.08em] text-[#486078]">CC-SWITCH / CONFIG.TOML</span></div>
            <div class="p-6 max-[760px]:p-5">
              <h3 class="text-[24px] font-black">{{ page.config.title }}</h3>
              <p class="mt-3 text-[16px] leading-[1.7] text-[#586068]">{{ page.config.copy }}</p>

              <figure class="mt-6 overflow-hidden border border-[#dce8f5] bg-[#f8fbfd]">
                <img class="block h-auto w-full" src="/assets/cc-switch-provider-edit.png" :alt="page.config.editImageAlt" />
                <figcaption class="border-t border-[#dce8f5] px-4 py-3 text-[13px] leading-[1.6] text-[#586068]">{{ page.config.editCaption }}</figcaption>
              </figure>

              <div class="mt-6 overflow-hidden border border-[#263d52] bg-[#101820]">
                <div class="flex min-h-[46px] items-center justify-between gap-4 border-b border-white/10 px-4 text-[13px] font-black text-white/70">
                  <span>TOML</span>
                  <button class="inline-flex min-h-8 items-center gap-2 rounded-md border border-white/20 bg-white/5 px-3 font-sans text-[13px] font-black text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8dc8ff]" type="button" @click="copyConfig">
                    <Check v-if="copied" :size="15" aria-hidden="true" />
                    <Clipboard v-else :size="15" aria-hidden="true" />
                    {{ copied ? page.config.copied : page.config.copyAction }}
                  </button>
                </div>
                <pre class="m-0 overflow-x-auto p-5 font-mono text-[13px] leading-[1.8] text-[#b9d9f4] max-[760px]:p-4 max-[760px]:text-[12px]"><code>{{ configSnippet }}</code></pre>
              </div>

              <figure class="mt-6 overflow-hidden border border-[#dce8f5] bg-[#f8fbfd]">
                <img class="block h-auto w-full" src="/assets/cc-switch-config-toml.png" :alt="page.config.tomlImageAlt" />
                <figcaption class="border-t border-[#dce8f5] px-4 py-3 text-[13px] leading-[1.6] text-[#586068]">{{ page.config.tomlCaption }}</figcaption>
              </figure>
            </div>
          </section>

          <section class="mt-6 overflow-hidden border border-[#b8d1ef] bg-white shadow-[0_22px_56px_rgba(36,104,242,0.1)]">
            <div class="flex items-center gap-2 border-b border-[#dce8f5] px-5 py-4"><span class="h-2.5 w-2.5 rounded-full bg-blue"></span><span class="h-2.5 w-2.5 rounded-full bg-[#79d478]"></span><span class="h-2.5 w-2.5 rounded-full bg-[#f4c45d]"></span><span class="ml-3 text-[13px] font-black tracking-[0.08em] text-[#486078]">CHATGPT CODEX APP</span></div>
            <div class="p-6 max-[760px]:p-5">
              <h3 class="text-[24px] font-black">{{ page.commands.title }}</h3>
              <p class="mt-3 text-[16px] leading-[1.7] text-[#586068]">{{ page.commands.copy }}</p>
              <ul class="mt-4 grid list-none gap-2 bg-[#f4f8fd] p-5 font-mono text-[15px] leading-[1.75] text-[#172a3d] max-[760px]:p-4">
                <li v-for="prompt in page.commands.prompts" :key="prompt" class="grid grid-cols-[auto_1fr] gap-2">
                  <span class="font-bold text-[#4775b7]">-</span>
                  <span>{{ prompt }}</span>
                </li>
              </ul>
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

    <SiteFooter v-if="!embedded" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { Check, Clipboard } from '@lucide/vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import { useHostUrl } from '@/composables/useHostUrl'
import { useI18n } from '@/composables/useI18n'

withDefaults(defineProps<{
  embedded?: boolean
}>(), {
  embedded: false,
})

const imageCopy = {
  'zh-CN': {
    meta: { title: '图像创作', description: '使用 AIGOKEY 套餐和 CC-Switch，在 ChatGPT Codex App 中完成插画、漫画、广告图与电商图等图像创作。', keywords: 'AIGOKEY, 图像创作, AI 绘图, CC-Switch, Codex, config.toml' },
    hero: { imageAlt: '插画、漫画、广告和电商产品的图像创作拼贴', eyebrow: 'AIGOKEY IMAGE CREATION', titleBefore: '把想象，变成', titleHighlight: '可以交付的画面', copy: '使用 AIGOKEY 套餐中的图像能力，在 ChatGPT Codex App 里完成插画、漫画、彩漫、广告图、电商图与更多视觉创作。', action: '配置图像能力' },
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
      eyebrow: 'SETUP IN CODEX', title: '配置一次，就能在 Codex 中开始创作', copy: '在 CC-Switch 的密钥编辑面板中修改 config.toml，将 AIGOKEY 设为 Codex 的自定义模型提供商。', modelLabel: '支持模型', note: '只修改 [model_providers.custom] 对应的配置，保留文件中其他已有设置。编辑前建议备份现有 TOML 内容。',
      steps: [
        { number: '01', title: '打开 CC-Switch 密钥编辑', text: '在 CC-Switch 主界面找到正在使用的 AIGOKEY 配置，点击右侧的铅笔形编辑按钮。' },
        { number: '02', title: '进入 config.toml（TOML）编辑区', text: '在编辑面板中找到 config.toml（TOML），确认顶部 model_provider 已设为 "custom"。' },
        { number: '03', title: '修改配置参数', text: '把 [model_providers.custom] 下的参数替换为需要更新的配置参数，配置参数可以下面步骤一键复制配置。' },
        { number: '04', title: '保存并重启 Codex', text: '保存编辑内容，返回 CC-Switch 主界面并启用该配置，然后重启 Codex 使新设置生效。' },
      ],
    },
    config: { title: '按照截图写入 config.toml', copy: '红框标出了需要操作的入口和配置区。复制 TOML 后粘贴到对应位置。', copyAction: '复制配置', copied: '已复制', editImageAlt: 'CC-Switch 密钥列表，编辑按钮已用红色方框标出', editCaption: '在 CC-Switch 密钥列表中点击红框标出的编辑按钮。', tomlImageAlt: 'CC-Switch config.toml 编辑区，自定义模型提供商配置已用红框标出', tomlCaption: '红框内是需要添加或修改的 [model_providers.custom] 配置。' },
    commands: { title: '支持指令', copy: '直接使用自然语言：', prompts: ['生成一张 xxx 图', '修改这张图片里的 xxx', '把我上传的图片改成 xxx 风格', '批量生成一组 xxx 素材'] },
    cta: { eyebrow: 'READY TO CREATE', title: '用 AIGOKEY 套餐，把图像创作纳入你的日常工作流。', action: '登录并创建 API Key' },
  },
  'zh-TW': {
    meta: { title: '圖像創作', description: '使用 AIGOKEY 方案與 CC-Switch，在 ChatGPT Codex App 中完成插畫、漫畫、廣告圖與電商圖等圖像創作。', keywords: 'AIGOKEY, 圖像創作, AI 繪圖, CC-Switch, Codex, config.toml' },
    hero: { imageAlt: '插畫、漫畫、廣告和電商產品的圖像創作拼貼', eyebrow: 'AIGOKEY IMAGE CREATION', titleBefore: '把想像，變成', titleHighlight: '可以交付的畫面', copy: '使用 AIGOKEY 方案中的圖像能力，在 ChatGPT Codex App 裡完成插畫、漫畫、彩漫、廣告圖、電商圖與更多視覺創作。', action: '設定圖像能力' },
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
      eyebrow: 'SETUP IN CODEX', title: '設定一次，就能在 Codex 中開始創作', copy: '在 CC-Switch 的金鑰編輯面板中修改 config.toml，將 AIGOKEY 設為 Codex 的自訂模型提供商。', modelLabel: '支援模型', note: '只修改 [model_providers.custom] 對應的設定，保留檔案中其他已有設定。編輯前建議備份現有 TOML 內容。',
      steps: [
        { number: '01', title: '開啟 CC-Switch 金鑰編輯', text: '在 CC-Switch 主畫面找到正在使用的 AIGOKEY 設定，點擊右側的鉛筆形編輯按鈕。' },
        { number: '02', title: '進入 config.toml（TOML）編輯區', text: '在編輯面板中找到 config.toml（TOML），確認頂部 model_provider 已設為 "custom"。' },
        { number: '03', title: '修改設定參數', text: '把 [model_providers.custom] 下的參數替換為需要更新的設定參數，設定參數可以在下面步驟一鍵複製。' },
        { number: '04', title: '儲存並重新啟動 Codex', text: '儲存編輯內容，返回 CC-Switch 主畫面並啟用該設定，然後重新啟動 Codex 使新設定生效。' },
      ],
    },
    config: { title: '按照截圖寫入 config.toml', copy: '紅框標出了需要操作的入口和設定區。複製 TOML 後貼到對應位置。', copyAction: '複製設定', copied: '已複製', editImageAlt: 'CC-Switch 金鑰清單，編輯按鈕已用紅色方框標出', editCaption: '在 CC-Switch 金鑰清單中點擊紅框標出的編輯按鈕。', tomlImageAlt: 'CC-Switch config.toml 編輯區，自訂模型提供商設定已用紅框標出', tomlCaption: '紅框內是需要新增或修改的 [model_providers.custom] 設定。' },
    commands: { title: '支援指令', copy: '直接使用自然語言：', prompts: ['生成一張 xxx 圖', '修改這張圖片裡的 xxx', '把我上傳的圖片改成 xxx 風格', '批量生成一組 xxx 素材'] },
    cta: { eyebrow: 'READY TO CREATE', title: '用 AIGOKEY 方案，把圖像創作納入你的日常工作流程。', action: '登入並建立 API Key' },
  },
  en: {
    meta: { title: 'Image Creation', description: 'Use AIGOKEY plans and CC-Switch to create illustrations, comics, ads, ecommerce images, and more in the ChatGPT Codex App.', keywords: 'AIGOKEY, image creation, AI image generation, CC-Switch, Codex, config.toml' },
    hero: { imageAlt: 'A creative collage of illustration, comics, advertising, and ecommerce products', eyebrow: 'AIGOKEY IMAGE CREATION', titleBefore: 'Turn imagination into', titleHighlight: 'visual work you can deliver', copy: 'Use the image capabilities in your AIGOKEY plan to create illustrations, comics, color comics, ad creatives, ecommerce images, and more in the ChatGPT Codex App.', action: 'Set up image creation' },
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
      eyebrow: 'SETUP IN CODEX', title: 'Set it up once, then create in Codex', copy: 'Edit config.toml in the CC-Switch key editor and configure AIGOKEY as a custom model provider for Codex.', modelLabel: 'Supported model', note: 'Only change the settings under [model_providers.custom] and preserve the rest of the file. Back up the existing TOML before editing.',
      steps: [
        { number: '01', title: 'Open the CC-Switch key editor', text: 'Find the AIGOKEY configuration currently in use and click the pencil-shaped edit button on the right.' },
        { number: '02', title: 'Open the config.toml (TOML) editor', text: 'Locate config.toml (TOML) and confirm that model_provider at the top is set to "custom".' },
        { number: '03', title: 'Update configuration parameters', text: 'Replace the parameters under [model_providers.custom] with the required configuration. You can copy the complete configuration in one click in the next section.' },
        { number: '04', title: 'Save and restart Codex', text: 'Save the changes, enable the configuration from the CC-Switch home screen, and restart Codex so the new settings take effect.' },
      ],
    },
    config: { title: 'Add the settings shown below to config.toml', copy: 'The red outlines mark the edit control and the relevant configuration block. Copy the TOML and paste it into the matching section.', copyAction: 'Copy config', copied: 'Copied', editImageAlt: 'CC-Switch key list with the edit button outlined in red', editCaption: 'Click the edit button outlined in red in the CC-Switch key list.', tomlImageAlt: 'CC-Switch config.toml editor with the custom model provider settings outlined in red', tomlCaption: 'The red outline marks the [model_providers.custom] settings to add or update.' },
    commands: { title: 'Supported requests', copy: 'Use natural language directly:', prompts: ['Generate a xxx image', 'Edit xxx in this image', 'Restyle my uploaded image as xxx', 'Batch-generate a set of xxx assets'] },
    cta: { eyebrow: 'READY TO CREATE', title: 'Bring image creation into your everyday workflow with an AIGOKEY plan.', action: 'Sign in and create an API Key' },
  },
} as const

const { lang } = useI18n()
const page = computed(() => imageCopy[lang.value])
const { loginUrl } = useHostUrl()
const copied = ref(false)

const configSnippet = `approval_policy = "on-request"
approvals_reviewer = "user"
model_provider = "custom"
model = "gpt-5.6-sol"
review_model = "gpt-5.6-sol"
model_reasoning_effort = "high"

[model_providers.custom]
name = "AIGOKEY"
wire_api = "responses"
base_url = "https://llm.aigokey.cn"
requires_openai_auth = false
experimental_bearer_token = "sk-你的API密钥"
http_headers = { "x-openai-actor-authorization" = "llm.aigokey.cn" }`

const creationTypes = computed(() => page.value.creationTypes)
const setupSteps = computed(() => page.value.setup.steps)

async function copyConfig() {
  try {
    await navigator.clipboard.writeText(configSnippet)
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = configSnippet
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
  }

  copied.value = true
  window.setTimeout(() => { copied.value = false }, 1800)
}

useHead({
  title: computed(() => `${page.value.meta.title} - AIGOKEY`),
  meta: [
    { name: 'description', content: computed(() => page.value.meta.description) },
    { name: 'keywords', content: computed(() => page.value.meta.keywords) },
  ],
})
</script>
