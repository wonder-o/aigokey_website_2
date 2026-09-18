export const applicationEmails = ['tinjapp@gmail.com', 'tinjapp@qq.com']

export type IncentiveTheme = 'coding' | 'hometown' | 'game'

export interface IncentivePoint {
  title: string
  text: string
}

export interface IncentiveTool {
  name: string
  note: string
}

export interface IncentiveFaq {
  q: string
  a: string
}

/** 画报类活动的页面结构（可选，仅在有明确分页时填写）。 */
export interface IncentivePageBlueprint {
  page: string
  title: string
  text: string
}

export interface IncentivePlan {
  slug: string
  theme: IncentiveTheme
  index: string
  title: string
  posterTitle: [string, string]
  tagline: string
  category: string
  audience: string
  audienceShort: string
  benefit: string
  duration: string
  deliverable: string
  mode: string
  keywords: string[]
  description: string
  longIntro: string
  goal: string
  highlights: IncentivePoint[]
  requirements: string[]
  deliverables: string[]
  blueprint?: IncentivePageBlueprint[]
  inspirations: IncentivePoint[]
  steps: IncentivePoint[]
  toolkit: IncentiveTool[]
  criteria: string[]
  faq: IncentiveFaq[]
}

export const themeAccent: Record<IncentiveTheme, { label: string; color: string; ink: string; soft: string; line: string }> = {
  coding: { label: 'Vibe Coding', color: '#3860db', ink: '#172d81', soft: '#eef3ff', line: '#c9d9fb' },
  hometown: { label: 'AI 视觉创作', color: '#326e63', ink: '#254f46', soft: '#eff6f0', line: '#c6ded3' },
  game: { label: '独立游戏', color: '#6545aa', ink: '#30254f', soft: '#f5f0ff', line: '#d8ccf5' },
}

/** 申请邮件里需要写清的信息，列表页与详情页共用。 */
export const applicationMaterials = [
  { label: '活动名称', text: '想申请的活动，例如「大学生有想法」。' },
  { label: '你的身份', text: '学校 / 专业 / 年级；组队参加请注明队友与分工。' },
  { label: '你的想法', text: '一句话说清给谁用、解决什么问题，越具体越容易通过。' },
  { label: '你的目标', text: '在一个周期内想做到什么程度，先定一个能做完的小范围。' },
  { label: '联系方式', text: '常用邮箱或微信号，方便我们回复、发额度和跟进进度。' },
]

export const incentivePlans: IncentivePlan[] = [
  {
    slug: 'campus-spark',
    theme: 'coding',
    index: '01',
    title: '大学生有想法',
    posterTitle: ['大学生', '有想法'],
    tagline: '有想法，就让它跑起来。',
    category: 'Vibe Coding',
    audience: '计算机类相关专业的在校大学生',
    audienceShort: '计算机类在校生',
    benefit: '免费 AI token 周卡',
    duration: '建议 1 周',
    deliverable: '一个可运行的产品原型',
    mode: '邮件申请',
    keywords: ['Vibe Coding', '大学生', '有想法', '产品原型', '免费 token 周卡'],
    description: '有想法就报个名。面向计算机类相关专业的在校大学生，提交申请就能拿到一张免费的 AI token 周卡，用 Vibe Coding 把脑子里那句「要是有人做过就好了」，做成真能点开的东西。',
    longIntro: '大学里最常见的剧情是：半夜两点冒出一个特别妙的点子，第二天醒来觉得「算了，做不出来」。这个活动就是来拆掉那个「算了」的。一张免费的 AI token 周卡，加上现成的接入指引，一周时间足够你把它从一句话变成能运行的页面、脚本或者小工具。不用先学会写代码，也不用想得多宏大——你有想法，代码交给 AI，你负责挑剔。',
    goal: '把个人的想法，用 Vibe Coding 变成一个能运行的产品。',
    highlights: [
      { title: '7 天，从念头到链接', text: '周卡覆盖从零到一的完整周期：说需求、生成代码、跑起来、发出去。一周后你手里会多一个能发给朋友的链接。' },
      { title: '不会写代码也能交', text: '用 Vibe Coding 把需求讲清楚，让 AI 去写。你只需要做一件事：跑一遍，然后说「不对，我要的是这个」。' },
      { title: '作品能塞进简历', text: '完成的 Demo 可以进 AIGOKEY 学生作品展示，配上一句你自己的说明，成为简历和面试里能点开的那一项。' },
    ],
    requirements: [
      '计算机类相关专业在校生：软件工程、计算机科学、人工智能、数据科学、网络工程、电子信息等，专科 / 本科 / 硕士都行。',
      '能装个编辑器、会跑命令行、看得懂报错——这就够了。',
      '想法不用大，但要说得清：给谁用、解决什么、一周做到什么程度。',
      '做完愿意写两句说明：一段文字、一张截图或者一个能点开的链接。',
    ],
    deliverables: [
      '能跑起来的产品原型：网页、桌面小工具、命令行脚本、自动化流程，都算。',
      '一个能点开的 Demo 链接或者一张运行截图，别人一眼能看到效果。',
      '200 字以内的作品说明：解决什么问题、怎么用、下一步想加什么。',
      '可选：源码仓库和 README，方便直接丢进作品集。',
    ],
    inspirations: [
      { title: '校园效率工具', text: '课表冲突检查、绩点计算与预测、四六级和考研倒计时，先解决你自己每天都在烦的那一件事。' },
      { title: '课件变问答', text: '把一学期的课件 PDF 变成能追问的学习助手，期末复习时它比翻文件夹快多了。' },
      { title: '校园数据可视化', text: '把图书馆座位、食堂排队、校车时刻这类公开信息做成一张实时看板，顺手就是一个完整项目。' },
      { title: '个人主页与作品集', text: '做一个能自动同步项目、简历和文章的网站，投实习的时候直接甩链接。' },
      { title: '自动化小脚本', text: '批量整理课程资料、重命名归档实验报告、把每周两小时的周报压到两分钟。' },
    ],
    steps: [
      { title: '提交申请', text: '邮件写清专业、年级、你的想法和一周目标，标题写上「大学生有想法」。' },
      { title: '领取周卡', text: '通过后收到免费 AI token 周卡和接入指引，Codex、DeepSeek Harness、Claude Code 任选。' },
      { title: '开始 Vibe Coding', text: '把需求拆成小任务交给 AI，你负责运行、验收和迭代；卡住时把报错原文和上下文一起丢给模型，通常很快就能定位。' },
      { title: '交付作品', text: '提交 Demo 链接或者运行截图，附上 200 字以内的作品说明。' },
      { title: '展示与反馈', text: '作品进入学生作品展示，优秀的还能拿到额外曝光和进阶扶持。' },
    ],
    toolkit: [
      { name: 'ChatGPT Codex / Codex CLI', note: '把需求写成任务，让 Agent 直接读写项目、跑测试、改代码。' },
      { name: 'DeepSeek Harness', note: '国产模型驱动的 Agent 工作流，适合长时间连续开发和中文语境需求。' },
      { name: 'Claude Code', note: '读旧代码、重构、补测试、排查报错的稳定选择。' },
      { name: 'GitHub / Vercel', note: '托管源码并一键部署 Demo，把能点开的链接写进作品集。' },
      { name: 'AIGOKEY 控制台', note: '创建 API Key、查看 token 用量，随时知道周卡还剩多少。' },
    ],
    criteria: [
      '问题是真的：你身边确实有人需要它，不是为了让简历多一行。',
      '跑得起来：能当场演示、能重复运行，而不是只有一张截图。',
      '过程讲得清：说得出哪一步卡住、后来怎么绕过去的。',
      '不卷难度：解决自己问题的百行脚本，和一个小程序一样算数。',
    ],
    faq: [
      { q: '不是计算机专业可以申请吗？', a: '这个活动面向计算机类相关专业在校生。其他专业的同学可以看看「我眼中的家乡」，或者在邮件里说说你的技术基础和做过的项目，我们会单独评估。' },
      { q: '一周时间不够做完怎么办？', a: '周卡是按完整周期给的额度，先保证有个「能跑起来」的版本。确实没做完，就在邮件里说说进度和剩下多少活，可以申请续期或者顺延到下一期。' },
      { q: '必须做出商用级产品吗？', a: '不用。能运行、能演示、说清用途的原型就合格。我们更在意你有没有真的把它推进到「能打开」的那一步。' },
      { q: '可以用别的模型吗？', a: '可以。不过额度是 AIGOKEY 提供的，建议先用我们配好的模型和工具链，接入步骤在配置文档里都有现成答案。' },
      { q: '作品的版权归谁？', a: '归你。我们只会在你同意之后，用于作品展示和活动宣传。' },
      { q: '卡住了怎么办？', a: '把报错原文、你的目标和已经试过的做法一起写下来交给 AI 继续排查；实在推不动，就邮件说明卡点，我们会告诉你下一步往哪走。' },
    ],
  },
  {
    slug: 'hometown-posters',
    theme: 'hometown',
    index: '02',
    title: '我眼中的家乡',
    posterTitle: ['我眼中的', '家乡'],
    tagline: '家乡没有标准答案，创作你眼中的那一个。',
    category: 'AI 视觉创作',
    audience: '设计类专业的在校大学生',
    audienceShort: '设计类在校生',
    benefit: '免费 AI token 周卡',
    duration: '建议 1 周',
    deliverable: '一本 8 页的家乡电子画报',
    mode: '邮件申请',
    keywords: ['AI 视觉创作', '我眼中的家乡', '电子画报', '设计专业', '免费 token 周卡'],
    description: '一千个人眼中有一千个哈姆雷特，每个人眼中的家乡也不相同。面向设计类专业的在校大学生，提交申请即可获得免费的 AI token 周卡，用 AI 创作一本 8 页电子画报，让别人看见只属于你的家乡。',
    longIntro: '家乡不是一个标准地名，也不是千篇一律的地标合集。它可能是外婆灶台升起的热气，是放学路上总会经过的旧招牌，也是离开以后才听懂的一句方言。就像一千个人眼中有一千个哈姆雷特，每个人眼中的家乡都不相同。这一次，请从自己的记忆、感受和观察出发，用 AI 把它做成一本 8 页画报。生成底图、统一风格、扩图补比例交给 AI，你来决定看见什么、留下什么，以及怎样讲述这个只属于你的家乡。',
    goal: '用 AI 创作一本 8 页电子画报，以独特的个人视角讲出你眼中的家乡。',
    highlights: [
      { title: '同一个家乡，不同的答案', text: '不追求百科式介绍，也不用复刻城市宣传片。一个人、一条街、一种味道，都可以成为你理解家乡的入口。' },
      { title: 'AI 生成画面，你表达观点', text: '底图、风格统一、扩图和修图交给 AI；观察、取舍、版式和文字由你决定，让工具服务于真正的个人表达。' },
      { title: '交的是一本完整画报', text: '用封面、引言、2 组跨页、内文单页和封底组成 8 页叙事，导出 PDF 或长图，成为能发布、能打印、能放进作品集的作品。' },
    ],
    requirements: [
      '设计类相关专业在校生：视觉传达、数字媒体、动画、工业设计、环境设计、服装设计等，专科 / 本科 / 硕士都行。',
      '会用 Photoshop、Illustrator、InDesign、Figma、Procreate 里任意一个，懂图层、网格和排版就够。',
      '申请时把视角说具体：家乡在哪里，你记得最深的是什么，为什么只有你会这样看它。',
      '愿意交整套画报（PDF 或图片序列）和一份创作说明，并同意作品在确认后署名展示。',
    ],
    deliverables: [
      '一本 8 页的家乡电子画报：封面 1 页、引言 1 页、跨页 2 组（共 4 页）、内文 1 页、封底 1 页，尺寸统一（如 210×297mm 竖版）。',
      '一份能复用的视觉规范：主色板、字体、网格和图片处理规则。',
      '200 字以内的创作说明：家乡在哪里、你从什么视角讲述、希望读者看见什么。',
      '附赠：从画报素材里裁 2–3 张手机或电脑壁纸，随手就能用。',
      '可选：15 秒动态封面，或者一段 30 秒以内的方言旁白。',
    ],
    blueprint: [
      { page: 'P1', title: '封面', text: '一张主视觉压住整版，加上画报名和期号。' },
      { page: 'P2', title: '引言', text: '写下你为什么这样看家乡，也可以配一句只有当地人才懂的话。' },
      { page: 'P3–P4', title: '跨页 · 开场', text: '场景铺满两页，比如清晨的早市或放学的那条路。' },
      { page: 'P5–P6', title: '跨页 · 主体', text: '人物、街道或工序，信息量最大的一组。' },
      { page: 'P7', title: '内文单页', text: '细节特写配一段短文，给读者一个停顿。' },
      { page: 'P8', title: '封底', text: '署名、创作说明和一句收尾的话。' },
    ],
    inspirations: [
      { title: '一条街的一天', text: '早市的蒸汽、正午的蝉鸣、傍晚放学的自行车、深夜还亮着灯的面馆，用你的时间线重新认识熟悉的街道。' },
      { title: '一种味道', text: '食材、灶台、出锅、桌边，把家乡的一道菜做成一期专题。' },
      { title: '一个人', text: '外婆的一天、守店二十年的老板、总在同一个路口下棋的人，人物专题最容易被记住。' },
      { title: '记忆中的地标', text: '不必只画著名景点。那座桥、旧站台或楼下小店，只要承载了你的记忆，就值得成为画面主角。' },
      { title: '节气与风物', text: '家乡的季节特产、方言词和老手艺做成一组节气专题，传统题材最考验排版。' },
      { title: '从照片取色', text: '从自己拍的家乡照片里提取 5 个颜色，做成整本画报的主色板，统一感立刻出现。' },
      { title: '城市字体', text: '把地名、招牌字、方言拼音做成字体实验，让文字本身成为画面主体。' },
    ],
    steps: [
      { title: '提交申请', text: '邮件说说你的专业、家乡和创作视角：你看见了什么，又想让别人看见什么。标题写上「我眼中的家乡」。' },
      { title: '领取周卡', text: '收到免费 AI token 周卡和图像创作接入指引，用 agk2img skill 在 Codex 里批量生成。' },
      { title: 'Day 1–2 寻找视角', text: '翻出照片与记忆，选定一个只属于你的观察入口，再确定主色、风格关键词和页面尺寸。' },
      { title: 'Day 3–4 批量出图', text: '按页面清单生成底图、统一风格，扩图补齐跨页和封面需要的比例。' },
      { title: 'Day 5–6 排版成册', text: '套网格排标题、正文和信息层，8 页连起来读一遍，删掉不好看的那页。' },
      { title: 'Day 7 导出交付', text: '导出 PDF 或长图，顺手裁 2–3 张壁纸，附上创作说明一起交。' },
      { title: '署名展示', text: '入选作品将在 AIGOKEY 展示位署名发布，让更多人看见你眼中的家乡。' },
    ],
    toolkit: [
      { name: 'agk2img skill', note: '在 ChatGPT Codex App 里用自然语言批量生成、改图和统一风格。' },
      { name: '图像模型', note: 'gpt-image 系列、Gemini 图像系列、Seedream 等，按画面风格挑一个用到熟。' },
      { name: 'InDesign / Illustrator', note: '网格、母版、页码和字体层级，8 页共用一套版式规则。' },
      { name: 'Figma', note: '不装专业排版软件也能排画报：用 Frame 当页面，组件当页眉页脚，导出 PDF 一样能用。' },
      { name: 'Photoshop', note: '扩图、修图、统一色调，把 AI 底图处理成能上版面的素材。' },
      { name: '取色工具', note: '从家乡照片提取主色板，保证整本画报处在同一个世界里。' },
    ],
    criteria: [
      '叙事成立：8 页翻下来是一条完整的线，而不是八张随机作品。',
      '版式站得住：网格、层级、留白都清楚，标题不抢戏。',
      '视角属于你：画面和文字里有真实的个人记忆与在地细节，不是换一个城市名也能成立的内容。',
      '真的能发出去：导出的 PDF 能直接看、能发布，附赠的壁纸能真的设成桌面。',
    ],
    faq: [
      { q: '一周真的做得完 8 页吗？', a: '8 页里有 3 页是封面、目录、封底这类结构页，AI 负责出图，你负责排版。按节奏表走，一周紧但能做完；确实来不及，就在邮件里说说进度，可以申请顺延。' },
      { q: '不会手绘可以吗？', a: '可以。AI 负责画，你负责挑。选题、取舍、版式和文字才是设计师真正值钱的部分；会手绘当然是加分项。' },
      { q: '必须用 InDesign 吗？', a: '不必须。Figma、Illustrator 甚至 PPT 都能排出 8 页，关键是网格和层级，不是软件。' },
      { q: '壁纸是必须交的吗？', a: '不是。壁纸是从画报素材里顺手裁出来的附赠品，有它更好传播，没有也不影响评审。' },
      { q: '可以用网上的参考图吗？', a: '建议用自己拍的照片。别直接拿别人受版权保护的摄影作品去生成；画面里出现人物，请先取得对方同意。' },
      { q: '生成的图有水印吗？', a: '用 AIGOKEY 额度生成的作品不加水印，版权归你。' },
      { q: '家乡在国外可以吗？', a: '当然可以。海外华人的家乡同样欢迎，方言、街景和食物都是很好的素材。' },
    ],
  },
  {
    slug: 'indie-game-anthem',
    theme: 'game',
    index: '03',
    title: '我爱独立游戏',
    posterTitle: ['我爱', '独立游戏'],
    tagline: '想玩的游戏没人做？那就自己做。',
    category: '独立游戏',
    audience: '独立游戏爱好者',
    audienceShort: '独立游戏爱好者',
    benefit: '免费 AI token 月卡',
    duration: '建议 4 周',
    deliverable: '一个可玩的游戏原型',
    mode: '邮件申请',
    keywords: ['独立游戏', 'Vibe Coding', '游戏原型', 'Game Jam', '免费 token 月卡'],
    description: '爱玩游戏，也想自己做一个。面向独立游戏爱好者，提交申请就能拿到一张免费的 AI token 月卡，用 Vibe Coding 把脑子里的那个游戏 idea，做成真的能玩的东西。',
    longIntro: '做游戏最难的从来不是技术，是「做完」。一个人、一个月、一张免费的 AI token 月卡，我们不想看你写满三十页设定文档，只想看到一个别人拿到就能玩、三十秒内就懂好玩在哪里的版本。代码、美术、音效这些体力活交给 AI，你守住两件事就行：这个机制好不好玩，以及它有没有被做完。',
    goal: '把脑子里的游戏 idea，用 Vibe Coding 做成一个真的能玩的游戏。',
    highlights: [
      { title: '一个月，做出能玩的', text: '月卡按完整开发周期给额度：原型、关卡、手感、美术、音效到打包，一份额度全包。' },
      { title: '一个机制就够', text: '不用开放世界。把一个操作打磨到让人忍不住再来一局，这就是一个成立的独立游戏。' },
      { title: '做完真的有人玩', text: '完成的版本会进 AIGOKEY 展示位，我们也会给试玩反馈，好玩的还能拿到额外展示和扶持。' },
    ],
    requirements: [
      '独立游戏爱好者，一个人或者 2–4 人小队都行，什么专业、什么职业都不限。',
      '提交申请时说清游戏 idea 和核心玩法，组队请注明谁负责什么。',
      '一个月里每天能挤出一两个小时——关键是别停在「设定阶段」。',
      '做完交出能跑的试玩版本，加 200 字以内的说明。',
    ],
    deliverables: [
      '一个能玩的游戏原型：可执行文件、网页版链接或者 itch.io 页面。',
      '一个说得清的核心机制：玩家 30 秒内知道要干什么、为什么好玩。',
      '200 字以内的说明：玩法、操作、灵感来源和后续计划。',
      '可选：开发日志、美术设定、音效和商店页素材。',
    ],
    inspirations: [
      { title: '一个机制的极限', text: '只做「推箱子」「弹反」「爬塔」里的一件事，把它打磨到不能再好。' },
      { title: '三十秒体验', text: '一局只要半分钟，但让人想再来一次：跑酷、节奏、躲避、消除都成立。' },
      { title: '小空间叙事', text: '一个房间、一辆夜班车、一间便利店，用细节讲一个完整的故事。' },
      { title: '现实规则的抽象', text: '把排队、加班、通勤、菜市场讲价变成玩法，玩家一看就懂。' },
      { title: '反向设计', text: '先做音效和手感，再让画面和玩法围着它生长，往往比先画概念图更快出效果。' },
      { title: 'Game Jam 命题', text: '用 48 小时的限制逼出一个完整循环，再把最好玩的那部分扩展成一个月。' },
    ],
    steps: [
      { title: '提交申请', text: '邮件说说你的 idea、核心玩法和一个月目标，标题写上「我爱独立游戏」。' },
      { title: '领取月卡', text: '通过后收到免费 AI token 月卡和开发接入指引。' },
      { title: '先做原型', text: '第一周只做核心操作：能动、能玩、能分输赢，美术先放着。' },
      { title: '打磨循环', text: '补关卡、手感、音效和失败反馈，把「再来一次」做出来。' },
      { title: '打包交付', text: '输出能跑的版本和 200 字说明，按邮件回复的方式交给我们。' },
      { title: '试玩与展示', text: '我们会给出试玩反馈，好玩的进入展示位和后续扶持。' },
    ],
    toolkit: [
      { name: 'Unity / Godot', note: '两个主流引擎任选：Godot 更轻、上手更快，Unity 资源和教程更多。' },
      { name: 'HTML5 + Canvas', note: '零安装、链接即玩，适合三十秒一局的小体量玩法。' },
      { name: 'ChatGPT Codex / Claude Code', note: '写玩法脚本、修 bug、做数值和关卡编辑器，体力活交给 AI。' },
      { name: 'AI 美术与音效', note: '先用模型产出占位素材让游戏尽快跑起来，最后一周再逐步替换。' },
      { name: 'itch.io / GitHub Pages', note: '一键发布可试玩版本，把链接发给朋友和玩家，收集真实反馈。' },
    ],
    criteria: [
      '机制立得住：30 秒能上手，5 分钟内有变化。',
      '真的能玩：能打包、能启动、不崩溃。',
      '手感有回应：按键有反应，失败有提示，赢了有奖励。',
      '做完最重要：一个做完的小游戏，胜过一堆没做完的大项目。',
    ],
    faq: [
      { q: '完全不会写代码可以做吗？', a: '可以。用 Vibe Coding 让 AI 写玩法脚本，你负责设计规则和试玩反馈；引擎建议从 Godot 或 HTML5 起步，第一天就能看到画面动起来。' },
      { q: '月卡够一个月的开发吗？', a: '月卡按完整开发周期给额度，覆盖从原型到打包。项目超出预期的话，邮件说说进度就能申请额外支持。' },
      { q: '可以组队参加吗？', a: '可以。2–4 人小队（程序 / 美术 / 策划）同样欢迎，申请时写清分工就行。' },
      { q: '必须用 AI 生成美术吗？', a: '不用。方块和几何图形做占位完全没问题，先把玩法做出来，美术留到最后再补。' },
      { q: '做出来的游戏能商用吗？', a: '版权归你，可以上架销售。我们只希望在作品页注明一句「由 AIGOKEY 激励扶持计划支持」。' },
      { q: '什么程度算「可玩」？', a: '别人拿到你的文件，不用你讲解就能开始玩，而且知道怎么算赢、怎么算输。' },
    ],
  },
]

export function applicationMailto(plan: IncentivePlan, email: string = applicationEmails.join(',')) {
  const body = [
    `活动名称：${plan.title}`,
    '姓名 / 昵称：',
    '学校 / 专业 / 年级（组队请注明分工）：',
    '我的想法（给谁用、解决什么问题）：',
    `计划周期内想做到什么程度（${plan.duration}）：`,
    '联系方式（邮箱 / 微信）：',
  ].join('\n')
  return `mailto:${email}?subject=${encodeURIComponent(`${plan.title}申请`)}&body=${encodeURIComponent(body)}`
}
