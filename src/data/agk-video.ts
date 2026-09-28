export const agkVideoRepository = 'https://github.com/wonder-o/agk2video'

export const videoModels = [
  { id: 'doubao-seedance-2.0-mini', name: 'Seedance 2.0 Mini' },
  { id: 'doubao-seedance-2.0', name: 'Seedance 2.0' },
  { id: 'doubao-seedance-2.0-fast', name: 'Seedance 2.0 Fast' },
  { id: 'doubao-seedance-2.5', name: 'Seedance 2.5' },
] as const

export const videoZh = {
  meta: { title: 'AGK视频生成 Skill 配置', description: '配置 agk2video，在 Codex 中使用 AIGOKEY 视频 API 完成文生视频、图生视频、视频编辑与续写。查看安装步骤、API Key 配置、Seedance 模型切换和任务管理指令。' },
  hero: { title: '让想象，', highlight: '从这一帧开始。', copy: '用 agk2video，把文字、图片与参考素材变成视频。在熟悉的 Codex 对话里，完成生成、等待与保存。', action: '配置视频 Skill', source: '查看 GitHub', tags: ['文生视频', '图生视频', '视频编辑与续写'], caption: '分镜示意 · 纸飞机穿过夕阳下的云层', frames: ['起始画面', '镜头推进', '延续动作'], strip: '一次配置，在本机的不同项目中持续创作。', stripAction: '查看使用指令' },
  setup: {
    title: '配置一次，\n下一句就开始创作', copy: '先安装 Skill，再保存 API Key。接口地址已内置，工作模型与密钥会在本机跨项目复用。', requires: '准备好 Codex、Python 3.9+、Git，以及可访问 AIGOKEY 视频服务的 API Key。', guide: 'Codex 安装教程', endpoint: '内置 API 地址', storage: '本机共享配置', storageNote: 'Windows：%USERPROFILE%\\.aigokey-video\\config.json',
    steps: [
      { title: '安装 agk2video', text: '将下面的指令复制到 Codex。', prompt: 'https://github.com/wonder-o/agk2video 安装这个skill到本机' },
      { title: '创建视频服务 API Key', text: '登录 AIGOKEY，在密钥管理中创建或选择可访问视频服务的 API Key。', prompt: '' },
      { title: '保存密钥，检查连接', text: '把这句话发给 Codex，配置密钥（密钥为网站上的API密钥即可）。设置完成后，检查配置和接口连通性。', prompt: '帮我配置 agk2video 的 API key为sk-*******，然后检查配置与接口连通性。' },
      { title: '生成你的第一段视频', text: '直接描述画面、运动、比例和时长。完成后将视频保存到当前项目。', prompt: '用 agk2video 生成 5 秒、16:9 横屏视频：一只纸飞机穿过夕阳下的云层，镜头缓慢跟随。完成后保存到 output/videogen/paper-plane.mp4。' },
    ],
    keyAction: '登录并创建 API Key', note: '密钥只需在本机设置一次。更新时让 Codex 使用 configure --update-key，已有工作模型会保留。',
  },
  models: { title: '选好模型，继续你的创作', copy: '默认使用 Seedance 2.0 Mini。选择下方模型，复制对应指令到 Codex，即可保存为后续项目的工作模型。', default: '默认模型', selected: '已选择', promptLabel: '模型设置指令', promptBefore: '把 agk2video 的工作模型设置为 ', promptAfter: '，以后都使用这个模型，保留已有 API Key。', note: '此处选择用于生成配置指令；在 Codex 执行后才会保存到本机。各模型的时长、分辨率、音频、编辑和 Draft 支持情况以服务端为准。', once: '只想本次使用？生成时说“这次用指定模型”，不会更改已保存的工作模型。' },
  capabilities: { title: '从一句描述，到一段完整画面', copy: '按创作意图选择输入，再把镜头与动作说清楚。', items: [
    { title: '文生视频', text: '描述主体、环境、动作与镜头运动，从文字开始构建画面。' },
    { title: '图生视频与首尾帧', text: '让静态图像动起来，或用两张图片指定镜头的起点与终点。' },
    { title: '多模态参考', text: '使用图片、视频或音频作为参考，明确素材的角色与创作方向。' },
    { title: '视频编辑与续写', text: '围绕源视频调整画面，或沿已有动作继续创作后续镜头。' },
  ], note: '参考素材需使用服务端可访问的 URL、支持的 data: 输入或 asset:// ID；CLI 不会自动上传本地文件。编辑、续写等能力取决于所选模型。' },
  commands: { title: '像描述创意一样，发出指令', copy: '复制到 Codex 即可使用。也可以通过 $agk2video 明确调用；任务 ID 和参考素材请换成你的实际内容。', groups: [
    { title: '安装与配置', prompts: ['把已安装的 agk2video 更新到最新版本，保留现有配置。', '帮我更新 agk2video 的 API key，使用本地终端隐藏输入。', '检查 agk2video 的配置和接口连通性。'] },
    { title: '模型选择', prompts: ['agk2video 现在用的是什么模型？有哪些可选模型？', '把 agk2video 的模型切换成快速版，以后都用它。', '恢复 agk2video 的默认模型，保留 API Key。'] },
    { title: '生成与参考', prompts: ['用 agk2video 生成 5 秒竖屏视频：雨后的街道倒映霓虹，镜头缓慢向前。', '第一张图当首帧，第二张图当尾帧，生成自然的过渡。', '参考这张人物图生成视频，保留人物外观和服装。'] },
    { title: '编辑、续写与 Draft', prompts: ['将这段视频的天空改成日落，保留人物与动作。', '接着这段视频往后续写，人物继续沿海边向前走。', '用 agk2video 先生成一个 Draft 草稿任务，先确认当前模型是否支持。'] },
    { title: '查询与保存', prompts: ['查一下任务 cgt-... 进行到哪了。', '继续等待任务 cgt-...，完成后保存到 output/videogen/result.mp4。', '重新下载任务 cgt-... 的结果，不要重新生成。'] },
    { title: '预览与任务管理', prompts: ['先给我看看这次视频生成的请求参数，不要提交。', '列出 agk2video 最近成功的视频任务。', '取消这个排队中的任务：cgt-...。'] },
  ] },
  faq: { title: '开始之前，你可能还想知道', items: [
    { question: '换一个项目，需要重新配置吗？', answer: '同一本机用户会自动读取 ~/.aigokey-video/config.json 中的密钥和工作模型。换项目或重启后都可继续使用；无需在每个项目里重复设置。' },
    { question: '需要设置 Base URL 吗？', answer: '不需要。agk2video 使用固定地址 https://llm.aigokey.cn/api/v3，目前没有 --base-url 参数。设置可访问该网关的 API Key 即可。' },
    { question: '等到超时或下载失败，要重新生成吗？', answer: '先查询原任务。已知任务 ID 时，可以继续等待或重新下载，远程任务可能仍在运行。生成成功后及时保存视频，并留存任务 ID，方便后续查询。' },
    { question: '检查连通性会创建视频任务吗？', answer: '不会。doctor 查看本地配置；doctor --check 额外发送只读任务列表请求检查鉴权与连通性。需要预览生成参数时，可以使用 create --dry-run --pretty。' },
  ] },
  cta: { title: '让下一段视频，\n从你的第一句话开始。', action: '开始配置', source: '完整使用文档' },
  copy: '复制指令', copied: '已复制', copyFailed: '复制失败，请选中文字手动复制。',
}

export const videoEn: typeof videoZh = {
  meta: { title: 'AGK Video Generation Skill Setup', description: 'Set up agk2video to generate, edit, and extend videos with the AIGOKEY API in Codex. Install the skill, configure your API key, choose a Seedance model, and manage video tasks.' },
  hero: { title: 'An idea.', highlight: 'Then, a moving frame.', copy: 'Turn words, images, and references into video with agk2video. Generate, wait, and save, all from your conversation in Codex.', action: 'Set up the video skill', source: 'View on GitHub', tags: ['Text to video', 'Image to video', 'Edit & extend'], caption: 'Storyboard illustration · A paper plane through sunset clouds', frames: ['Opening frame', 'Camera follows', 'Action continues'], strip: 'Set up once. Keep creating across projects on your computer.', stripAction: 'Explore requests' },
  setup: {
    title: 'Set it up once.\nStart with a sentence.', copy: 'Install the skill and save your API key. The API address is built in, and your key and model selection are shared across local projects.', requires: 'You need Codex, Python 3.9+, Git, and an API key with access to AIGOKEY video services.', guide: 'Codex installation guide', endpoint: 'Built-in API address', storage: 'Shared local configuration', storageNote: 'Windows: %USERPROFILE%\\.aigokey-video\\config.json',
    steps: [
      { title: 'Install agk2video', text: 'Copy this request into Codex. Install the agk2video subdirectory inside the repository.', prompt: 'Install the agk2video directory from https://github.com/wonder-o/agk2video into my local skills directory.' },
      { title: 'Create a video API key', text: 'Sign in to AIGOKEY and create or choose an API key with access to the video service.', prompt: '' },
      { title: 'Save your key and check the connection', text: 'Ask Codex to guide you through hidden input in your local terminal, then check the configuration and connection.', prompt: 'Configure the agk2video API key using hidden input in my local terminal, then check the configuration and API connectivity.' },
      { title: 'Generate your first video', text: 'Describe the scene, movement, aspect ratio, and duration. Save the finished video to your current project.', prompt: 'Use agk2video to generate a 5-second, 16:9 video: a paper plane passes through sunset clouds as the camera slowly follows. Save it to output/videogen/paper-plane.mp4.' },
    ],
    keyAction: 'Sign in and create an API key', note: 'Save your key once on this computer. To update it, ask Codex to use configure --update-key. Your model selection is preserved.',
  },
  models: { title: 'Choose a model. Keep creating.', copy: 'Seedance 2.0 Mini is the default. Select a model below and copy the request into Codex to save it for future projects.', default: 'Default model', selected: 'Selected', promptLabel: 'Model setup request', promptBefore: 'Set the agk2video working model to ', promptAfter: ' for future tasks, keeping my existing API key.', note: 'This selection prepares a setup request. Run it in Codex to save the model locally. Duration, resolution, audio, editing, and Draft availability depend on the model and service.', once: 'For a single task, say “use this model for this video.” Your saved model stays the same.' },
  capabilities: { title: 'From a description to a moving scene', copy: 'Choose your inputs, then describe the camera and the action.', items: [
    { title: 'Text to video', text: 'Describe the subject, setting, action, and camera movement to build a scene from words.' },
    { title: 'Images and keyframes', text: 'Animate a still image or use two images to define the first and last frames.' },
    { title: 'Multimodal references', text: 'Use images, video, or audio as references, specifying what each source contributes.' },
    { title: 'Edit and extend', text: 'Change a scene in an existing video or continue the action into a new shot.' },
  ], note: 'References need accessible URLs, supported data: input, or asset:// IDs. The CLI does not upload local files automatically. Editing and extension depend on the selected model.' },
  commands: { title: 'Say what you want to create', copy: 'Copy a request into Codex, or invoke $agk2video explicitly. Replace task IDs and references with your own.', groups: [
    { title: 'Install and configure', prompts: ['Update agk2video to the latest version, keeping my existing configuration.', 'Update my agk2video API key using hidden input in the local terminal.', 'Check my agk2video configuration and API connection.'] },
    { title: 'Choose a model', prompts: ['Which model is agk2video using, and which models are available?', 'Switch agk2video to the Fast model for future tasks.', 'Restore the default agk2video model and keep my API key.'] },
    { title: 'Generate with references', prompts: ['Generate a 5-second portrait video of neon reflections on a rainy street, with a slow forward camera move.', 'Use the first image as the opening frame and the second as the ending frame for a smooth transition.', 'Use this character image as a reference, keeping their appearance and clothing.'] },
    { title: 'Edit, extend, and Draft', prompts: ['Change the sky in this video to sunset, keeping the person and their actions.', 'Extend this video as the person continues walking along the beach.', 'Create a Draft video task with agk2video after checking that the current model supports it.'] },
    { title: 'Check and save', prompts: ['Check the progress of task cgt-....', 'Keep waiting for task cgt-... and save it to output/videogen/result.mp4 when complete.', 'Download the result of task cgt-... again without generating a new video.'] },
    { title: 'Preview and manage tasks', prompts: ['Show the video request parameters without submitting a task.', 'List my recent successful agk2video tasks.', 'Cancel this queued task: cgt-....'] },
  ] },
  faq: { title: 'A few things before you start', items: [
    { question: 'Do I need to configure each project?', answer: 'Projects under the same local user read the key and model from ~/.aigokey-video/config.json. Your settings remain available when switching projects or restarting.' },
    { question: 'Do I need to set a Base URL?', answer: 'No. agk2video uses https://llm.aigokey.cn/api/v3 and currently has no --base-url option. Configure an API key that can access this gateway.' },
    { question: 'Should I regenerate after a timeout or failed download?', answer: 'Check the original task first; it may still be running remotely. With its task ID, you can resume waiting or download again. Save completed videos promptly and keep the task ID for later.' },
    { question: 'Does checking connectivity create a video?', answer: 'No. doctor reads local settings; doctor --check also makes a read-only task-list request to check authentication and connectivity. Use create --dry-run --pretty to preview generation parameters.' },
  ] },
  cta: { title: 'Your next video\nstarts with a sentence.', action: 'Start setup', source: 'Full documentation' },
  copy: 'Copy request', copied: 'Copied', copyFailed: 'Could not copy. Select the text and copy it manually.',
}
