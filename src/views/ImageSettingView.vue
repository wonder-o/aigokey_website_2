<template>
  <div class="min-h-screen overflow-x-hidden bg-[#f8fbfd] text-[#111b24]">
    <main>
      <section class="bg-[#eef6ff] px-6 py-[92px] max-[760px]:px-4 max-[760px]:py-16" style="background-image: linear-gradient(rgba(36,104,242,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(36,104,242,0.07) 1px, transparent 1px); background-size: 56px 56px;">
        <div class="mx-auto max-w-[1280px]">
          <div class="grid grid-cols-[minmax(0,0.92fr)_minmax(420px,1.08fr)] gap-12 max-[1020px]:grid-cols-1">
            <div>
              <p class="text-[13px] font-black tracking-[0.16em] text-[#db4b32]">SETUP IN CODEX</p>
              <h1 class="mt-4 max-w-[560px] text-[clamp(34px,4.3vw,58px)] font-black leading-[1.08]">配置一次，就能在 Codex 中开始创作</h1>
              <p class="mt-5 max-w-[510px] text-[17px] leading-[1.8] text-[#586068]">按照 agk2img-skill 的流程，在 ChatGPT Codex App 中用自然语言完成 Base URL 与 API Key 配置。它们只用于图像生成，不会覆盖你的其他 OpenAI 配置。</p>
              <div class="mt-6 inline-flex items-center gap-3 border border-[#b8d1ef] bg-white px-4 py-3 text-[14px] shadow-[0_8px_22px_rgba(36,104,242,0.08)]"><span class="font-black text-[#486078]">支持模型</span><span class="rounded-md bg-[#e9f3ff] px-2.5 py-1 font-mono font-bold text-blue">gpt-image-2</span></div>
            </div>
            <ol class="grid gap-0 border-t border-black/15">
              <li v-for="step in steps" :key="step.number" class="grid grid-cols-[72px_1fr] gap-4 border-b border-black/15 py-5 max-[560px]:grid-cols-[54px_1fr]">
                <span class="text-[15px] font-black text-[#db4b32]">{{ step.number }}</span>
                <div>
                  <h2 class="text-[19px] font-black">{{ step.title }}</h2>
                  <template v-if="step.number === '01'">
                    <p class="mt-2 text-[15px] leading-[1.7] text-[#586068]">打开 <a class="font-bold text-[#db4b32] underline decoration-2 underline-offset-4" href="https://github.com/wonder-o/agk2img-skill" target="_blank" rel="noopener">https://github.com/wonder-o/agk2img-skill</a>，复制下面这句话到 ChatGPT Codex 即可快速安装：</p>
                    <p class="mt-3 border-l-2 border-[#db4b32] pl-4 text-[16px] font-bold leading-[1.7] text-[#252a2e]">https://github.com/wonder-o/agk2img-skill，帮我安装这个 skill，进行快速安装。</p>
                  </template>
                  <p v-else class="mt-2 whitespace-pre-line text-[15px] leading-[1.7] text-[#586068]">{{ step.text }}</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section class="bg-white px-6 py-[92px] max-[760px]:px-4 max-[760px]:py-16">
        <div class="mx-auto max-w-[1280px]">
          <div class="overflow-hidden border border-[#b8d1ef] bg-white shadow-[0_22px_56px_rgba(36,104,242,0.1)]">
            <div class="flex items-center gap-2 border-b border-[#dce8f5] px-5 py-4"><span class="h-2.5 w-2.5 rounded-full bg-blue"></span><span class="h-2.5 w-2.5 rounded-full bg-[#79d478]"></span><span class="h-2.5 w-2.5 rounded-full bg-[#f4c45d]"></span><span class="ml-3 text-[13px] font-black tracking-[0.08em] text-[#486078]">CHATGPT CODEX APP</span></div>
            <div class="p-6 max-[760px]:p-5">
              <h2 class="text-[24px] font-black">支持指令</h2>
              <p class="mt-3 text-[16px] leading-[1.7] text-[#586068]">用自然语言跟 ChatGPT Codex 说：</p>
              <div class="mt-4 grid gap-5 bg-[#f4f8fd] p-5 font-mono text-[15px] leading-[1.75] text-[#172a3d] max-[760px]:p-4">
                <section v-for="group in commandGroups" :key="group.title">
                  <h3 class="font-sans text-[15px] font-black text-blue">{{ group.title }}</h3>
                  <ul class="mt-2 grid list-none gap-1.5 p-0">
                    <li v-for="prompt in group.prompts" :key="prompt" class="grid grid-cols-[auto_1fr] gap-2"><span class="font-bold text-[#4775b7]">-</span><span>{{ prompt }}</span></li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
          <p class="mt-4 text-[14px] leading-[1.7] text-[#586068]">API Key 可在 AigoKey 的密钥管理中创建。ChatGPT Codex App 会在需要时引导你安全输入密钥；不要把密钥写入截图、代码仓库或公开文档。</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

const steps = [
  { number: '01', title: '安装 agk2img-skill', text: '通过 GitHub 仓库在 ChatGPT Codex 中快速安装 agk2img-skill。' },
  { number: '02', title: '创建 AigoKey API Key', text: '登录 AigoKey，可与现有的密钥共用，也可在密钥管理中创建专用于图像创作的 API Key。' },
  { number: '03', title: '用自然语言配置端点与密钥', text: '在 ChatGPT Codex App 中依次说\n帮我配置 agk2img 的 base url 为 https://llm.aigokey.cn\n帮我配置 agk2img 的 api key 为 sk-*******\napi key为 网站上的API密钥即可。' },
  { number: '04', title: '重启ChatGPT Codex App 后进行创作', text: '重启ChatGPT Codex App后，即可在ChatGPT Codex 中直接描述你要生成、修改或批量制作的画面。skill 会根据任务选择生成、编辑、参考图或批量工作流。' },
]

const commandGroups = [
  { title: '安装：', prompts: ['把 agk2img-skill 安装到 Codex skills 目录', '把 agk2img-skill 放到当前项目里使用'] },
  { title: '配置：', prompts: ['帮我配置 agk2img 的 base url', '帮我更新 agk2img 的 api key', '帮我清空 agk2img 的配置', '帮我检查 agk2img 是否配置好了'] },
  { title: '使用：', prompts: ['用 agk2img 生成一张 xxx 图', '用 agk2img 修改这张图片里的 xxx', '用 agk2img 把我上传的图片改成 xxx 风格', '用 agk2img 批量生成一组 xxx 素材'] },
]

useHead({
  title: '图像配置 - AigoKey',
  meta: [
    { name: 'description', content: '在 ChatGPT Codex App 中配置 agk2img 的 Base URL 与 API Key。' },
    { name: 'keywords', content: 'AigoKey, 图像配置, agk2img, ChatGPT Codex App, API Key' },
  ],
})
</script>
