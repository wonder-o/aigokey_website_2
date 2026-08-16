export const enterpriseFdeZh = {
  close: '关闭',
  principles: ['业务结果驱动', '生产环境交付', '评测与安全治理', '企业团队最终接管'],
  meta: {
    title: '企业 FDE 服务 - AIGOKEY',
    description: 'AIGOKEY 企业 FDE 服务，让前线部署工程师与业务、技术团队并肩工作，从高价值 AI 场景诊断到生产部署、评测治理与能力移交。',
    keywords: 'AIGOKEY 企业FDE服务, Forward Deployed Engineer, 前线部署工程师, 企业AI落地, AI Agent部署, AI生产化',
  },
  hero: {
    eyebrow: 'ENTERPRISE FDE / FORWARD DEPLOYED ENGINEERING',
    title: '把 AI 从演示，推进到生产现场',
    summary: 'AIGOKEY FDE 直接进入你的业务与技术现场，与业务负责人、一线团队和 IT 共同完成机会诊断、系统集成、评测治理、生产上线与能力移交。不只交付方案，而是交付团队能用、企业能管、结果能衡量的系统。',
    primary: '预约需求诊断', secondary: '查看交付流程',
    note: '先聚焦 1–3 个高价值工作流，再按生产证据扩展。',
  },
  trace: {
    label: '一次 FDE 任务如何推进', live: 'JOINT DELIVERY',
    steps: [
      { code: '01', title: '业务现场', text: '定义问题、用户与成功指标', state: '对齐' },
      { code: '02', title: '系统现场', text: '连接数据、工具、权限与流程', state: '构建' },
      { code: '03', title: '生产现场', text: '评测、灰度、监控与迭代', state: '运行' },
    ],
    outcomeLabel: '目标状态', outcome: '可上线、可观测、可接管',
  },
  signals: {
    eyebrow: '先判断是不是 FDE 问题',
    head: '当难点不在模型，而在穿过组织与系统',
    desc: 'FDE 适合复杂、高价值、需要真正上线的 AI 任务。我们会先判断问题是否值得用 FDE 方式解决。',
    fitTitle: '适合开始一次 FDE 合作',
    fit: ['已经有 AI 试点，但一直停在 Demo，难以进入日常业务', '任务跨 CRM、ERP、知识库、代码库或内部工具，集成复杂', '需要对准确率、处理时长、转化或产能建立可验证指标', '必须同时解决数据边界、权限、审批、日志与回滚'],
    notTitle: '这些需求通常不需要 FDE',
    notFit: ['只需要购买账号或提高模型额度', '只做一次性培训或通用知识分享', '没有真实用户、流程负责人和结果指标的展示项目'],
  },
  capabilities: {
    eyebrow: 'FDE 负责什么', head: '从业务目标到生产系统，端到端承接',
    desc: '与你的团队共同负责发现、定义、构建、上线和迭代，避免方案、开发与业务脱节。',
    items: [
      { title: '业务诊断与优先级', text: '跟访真实流程，找出高频、高成本、高价值节点，用影响、可行性与风险确定先后顺序。', output: '产出：机会地图、基线指标、项目范围' },
      { title: '架构、集成与工程实现', text: '把模型连到企业数据、业务系统和现有工具，构建用户真正能用的 Agent、应用或自动化流程。', output: '产出：可运行系统、接口、部署架构' },
      { title: '评测、治理与可靠性', text: '建立样本集和失败分类，配置最小权限、人工审批、审计日志、监控和回滚，用数据决定是否上线。', output: '产出：评测集、权限矩阵、上线门槛' },
      { title: '采用、运营与能力移交', text: '与一线用户共创，跟踪真实使用与业务影响，把可用做法固化成文档、工具、运营机制和内部能力。', output: '产出：运营手册、培训、扩展路线图' },
    ],
  },
  process: {
    eyebrow: '交付流程', head: '每一阶段都有证据，再进入下一步',
    desc: '周期与投入按场景复杂度确定。核心原则是小范围验证、生产数据决策、清晰的继续或停止条件。',
    phases: [
      { num: '00', title: '需求诊断', text: '采访业务负责人与一线用户，复盘现有流程、数据、系统和风险。', gate: '门槛：问题值得解决，且有明确负责人' },
      { num: '01', title: '聚焦范围', text: '选定 1–3 个优先流程，确定成功指标、技术边界、安全要求与交付节奏。', gate: '门槛：范围、指标与验收标准已对齐' },
      { num: '02', title: '共创构建', text: 'FDE 与业务、产品和技术团队一起写代码、做集成，用真实样本快速迭代。', gate: '门槛：核心路径可运行，主要失败模式已识别' },
      { num: '03', title: '评测与治理', text: '运行离线评测和流程模拟，补齐权限、审批、日志、隐私、异常与回滚机制。', gate: '门槛：质量、安全和法务审查可通过' },
      { num: '04', title: '灰度上线', text: '向受控用户与流量发布，观测质量、采用、成本与业务指标，逐步扩大范围。', gate: '门槛：生产证据达到预设标准' },
      { num: '05', title: '移交与扩展', text: '完成系统、文档、运营与培训移交，沉淀可复用组件，决定下一批场景。', gate: '门槛：内部团队能独立运行与迭代' },
    ],
  },
  delivery: {
    eyebrow: '交付不是一份 PPT', head: '最终留下的，是企业可以继续运行的能力',
    desc: '具体交付物按项目范围确定，但必须覆盖业务、工程、治理和组织四个层面。',
    items: [
      { label: 'BUSINESS', title: '业务结果', text: '基线、目标、使用量与影响指标，能回答系统是否真正创造价值。' },
      { label: 'ENGINEERING', title: '生产系统', text: '可部署的应用或 Agent、系统集成、评测链路、监控与技术文档。' },
      { label: 'GOVERNANCE', title: '可控运行', text: '数据边界、权限矩阵、人工审批、审计记录、发布和回滚机制。' },
      { label: 'OWNERSHIP', title: '团队接管', text: '运营手册、故障处理、维护边界、关键人员培训与后续扩展路线图。' },
    ],
    standard: '验收标准：用户能用、管理者能观测、技术团队能接管。',
  },
  engagement: {
    eyebrow: '合作方式', head: '按问题成熟度进入，不用先承诺一个大项目',
    desc: '先从真实流程和约束出发，共同确定合作范围、投入节奏与双方责任。',
    modes: [
      { label: 'DISCOVER', title: '需求诊断', text: '梳理工作流、数据、系统、安全约束和成功指标，判断是否适合启动 FDE。', bestFor: '适合：有问题，但优先级和边界尚未明确' },
      { label: 'DEPLOY', title: '单场景共创', text: '围绕一条高价值流程，从原型、评测到受控上线，验证技术可行性和业务影响。', bestFor: '适合：已有明确负责人、用户和成功指标' },
      { label: 'SCALE', title: '持续嵌入与扩展', text: 'FDE 与企业团队并肩运行，持续优化已上线系统，沉淀平台能力并扩展到更多流程。', bestFor: '适合：首个场景已验证，准备建立长期能力' },
    ],
    note: '每种方式都会在启动前确认负责人、交付边界、验收指标、数据权限和风险分工。',
  },
  faq: {
    eyebrow: '常见问题', head: '在开始之前，先把合作边界说清楚',
    items: [
      { q: 'FDE 和传统咨询有什么不同？', a: '传统咨询可以给出方向与方案；FDE 会继续进入系统与现场，写代码、做集成、建评测、推上线，并用生产数据验证结果。' },
      { q: 'FDE 和外包开发有什么不同？', a: 'FDE 不只按固定需求写功能。我们会与业务和技术团队共同界定问题，根据用户反馈和评测证据调整方案，并在合作中完成能力移交。' },
      { q: '必须更换现有系统或模型吗？', a: '不是。诊断会先盘点已有系统、数据、工具和安全边界，优先复用有效投资。模型、部署方式与集成方案按任务与约束选择。' },
      { q: '企业需要提前准备什么？', a: '建议准备一个具体工作流、业务负责人、一线用户、现状数据、涉及系统、安全或合规约束，以及希望改善的一个可衡量指标。' },
    ],
  },
  contact: {
    eyebrow: '从一个真实工作流开始', head: '把现在卡住的问题，带到需求诊断',
    text: '扫码添加客服，备注「企业 FDE」。我们会先了解业务目标、当前流程、技术环境和必须遵守的边界，再判断是否适合用 FDE 方式推进。',
    briefLabel: '为了让首次沟通更有效，建议一并说明：',
    list: ['企业、部门与你的角色', '想改造的具体工作流和当前做法', '涉及的数据、系统、安全或部署约束', '希望改善的结果指标与时间要求'],
    qrLabel: '微信扫码沟通', qrText: '备注「企业 FDE」，便于快速识别需求。',
    promise: '首次沟通不预设方案，先确认问题、边界和是否值得做。',
  },
}

export const enterpriseFdeEn = {
  close: 'Close',
  principles: ['Business outcome led', 'Production delivery', 'Evaluation and governance', 'Customer team ownership'],
  meta: {
    title: 'Enterprise FDE Services - AIGOKEY',
    description: 'AIGOKEY Forward Deployed Engineers work alongside business and technical teams to take high-value AI workflows from diagnosis to production, governance, and handover.',
    keywords: 'AIGOKEY Enterprise FDE, Forward Deployed Engineer, enterprise AI deployment, AI agent deployment, production AI',
  },
  hero: {
    eyebrow: 'ENTERPRISE FDE / FORWARD DEPLOYED ENGINEERING', title: 'Move AI from the demo into production',
    summary: 'AIGOKEY FDEs embed with your business and technical teams to diagnose opportunities, integrate systems, establish evaluations and controls, launch into production, and transfer ownership. The deliverable is not a proposal. It is a system people use, the business can govern, and leaders can measure.',
    primary: 'Book a discovery call', secondary: 'See the delivery process', note: 'Start with 1-3 high-value workflows, then scale with production evidence.',
  },
  trace: {
    label: 'How an FDE engagement moves', live: 'JOINT DELIVERY',
    steps: [
      { code: '01', title: 'Business context', text: 'Define the problem, users, and success measures', state: 'Align' },
      { code: '02', title: 'System context', text: 'Connect data, tools, permissions, and workflows', state: 'Build' },
      { code: '03', title: 'Production context', text: 'Evaluate, roll out, monitor, and improve', state: 'Run' },
    ],
    outcomeLabel: 'TARGET STATE', outcome: 'Deployable, observable, and owned',
  },
  signals: {
    eyebrow: 'FIRST, CHECK THE FIT', head: 'When the hard part is crossing systems and organizations',
    desc: 'FDE is designed for complex, high-value AI work that must reach real users. We start by deciding whether the problem is worth solving with an embedded engineering model.',
    fitTitle: 'A good fit for an FDE engagement',
    fit: ['An AI pilot exists but remains stuck as a demo', 'The workflow spans CRM, ERP, knowledge bases, code, or internal tools', 'Success must be measured in quality, cycle time, conversion, or capacity', 'Data boundaries, permissions, approvals, logs, and rollback all matter'],
    notTitle: 'Usually not an FDE problem',
    notFit: ['Buying accounts or increasing model quota', 'One-off training or general knowledge sharing', 'A showcase without real users, an owner, or measurable outcomes'],
  },
  capabilities: {
    eyebrow: 'WHAT THE FDE OWNS', head: 'End-to-end delivery from business goal to production system',
    desc: 'We discover, define, build, launch, and iterate with your team so strategy, engineering, and operations stay connected.',
    items: [
      { title: 'Business discovery and prioritization', text: 'Observe real workflows, identify high-cost and high-value steps, and prioritize by impact, feasibility, and risk.', output: 'Outputs: opportunity map, baseline metrics, project scope' },
      { title: 'Architecture, integration, and implementation', text: 'Connect models to enterprise data, systems, and tools, then build agents, applications, or automations that users can operate.', output: 'Outputs: running system, integrations, deployment architecture' },
      { title: 'Evaluation, governance, and reliability', text: 'Create test sets and failure taxonomies, then add least-privilege access, human approval, audit logs, monitoring, and rollback.', output: 'Outputs: eval suite, permission matrix, launch gates' },
      { title: 'Adoption, operations, and handover', text: 'Co-design with frontline users, track adoption and impact, and codify what works into tools, operating routines, and internal capability.', output: 'Outputs: runbook, training, expansion roadmap' },
    ],
  },
  process: {
    eyebrow: 'DELIVERY PROCESS', head: 'Evidence at every stage before moving forward',
    desc: 'Timing and effort depend on workflow complexity. The operating principle stays consistent: validate narrowly, decide with production evidence, and keep explicit continue-or-stop criteria.',
    phases: [
      { num: '00', title: 'Discovery', text: 'Interview the business owner and frontline users, then review the current workflow, data, systems, and risks.', gate: 'Gate: the problem is valuable and has a clear owner' },
      { num: '01', title: 'Scope', text: 'Select 1-3 priority workflows and agree on success metrics, technical boundaries, security requirements, and delivery cadence.', gate: 'Gate: scope, metrics, and acceptance criteria are aligned' },
      { num: '02', title: 'Co-build', text: 'FDEs write code and integrate systems with business, product, and technical teams, iterating on real examples.', gate: 'Gate: core paths run and major failure modes are known' },
      { num: '03', title: 'Evaluate and govern', text: 'Run offline evaluations and simulations, then complete permissions, approvals, logging, privacy, exceptions, and rollback.', gate: 'Gate: quality, security, and legal reviews can pass' },
      { num: '04', title: 'Controlled launch', text: 'Release to controlled users and traffic, observing quality, adoption, cost, and business metrics before expanding.', gate: 'Gate: production evidence reaches the agreed bar' },
      { num: '05', title: 'Handover and scale', text: 'Transfer systems, documentation, operations, and training, then decide which workflow comes next.', gate: 'Gate: the internal team can run and improve it' },
    ],
  },
  delivery: {
    eyebrow: 'NOT A SLIDE DECK', head: 'The lasting deliverable is an operating capability your team can own',
    desc: 'Exact artifacts depend on scope, but every engagement must cover business, engineering, governance, and ownership.',
    items: [
      { label: 'BUSINESS', title: 'Measured outcomes', text: 'Baselines, targets, adoption, and impact metrics that show whether the system creates real value.' },
      { label: 'ENGINEERING', title: 'Production system', text: 'A deployable app or agent, integrations, evaluation pipeline, monitoring, and technical documentation.' },
      { label: 'GOVERNANCE', title: 'Controlled operations', text: 'Data boundaries, permissions, human approvals, audit records, release, and rollback procedures.' },
      { label: 'OWNERSHIP', title: 'Team handover', text: 'Runbooks, incident handling, maintenance boundaries, key-person training, and an expansion roadmap.' },
    ],
    standard: 'Acceptance standard: users can use it, managers can observe it, and the technical team can own it.',
  },
  engagement: {
    eyebrow: 'WAYS TO ENGAGE', head: 'Enter at the maturity of the problem without committing to a large program first',
    desc: 'We begin with a real workflow and its constraints, then agree on scope, cadence, and responsibilities together.',
    modes: [
      { label: 'DISCOVER', title: 'Problem discovery', text: 'Map workflows, data, systems, security constraints, and success metrics to decide whether FDE is the right model.', bestFor: 'Best for: a real problem with unclear priority or boundaries' },
      { label: 'DEPLOY', title: 'Single-workflow co-build', text: 'Take one high-value workflow from prototype and evaluation to a controlled production launch.', bestFor: 'Best for: a clear owner, users, and success measure' },
      { label: 'SCALE', title: 'Embedded delivery and scale', text: 'Operate alongside your team, improve live systems, codify shared capabilities, and expand to more workflows.', bestFor: 'Best for: a proven first workflow and a long-term capability goal' },
    ],
    note: 'Before kickoff, every mode confirms ownership, delivery boundaries, acceptance metrics, data access, and risk responsibilities.',
  },
  faq: {
    eyebrow: 'COMMON QUESTIONS', head: 'Make the engagement boundaries clear before work begins',
    items: [
      { q: 'How is FDE different from consulting?', a: 'Consulting can define a direction and plan. FDE continues into the systems and workflow: writing code, integrating tools, building evaluations, launching, and measuring the result with production evidence.' },
      { q: 'How is FDE different from outsourced development?', a: 'FDE does more than implement a fixed specification. We define the problem with business and technical teams, change the approach using user and evaluation evidence, and transfer capability throughout the engagement.' },
      { q: 'Must we replace our current systems or models?', a: 'No. Discovery starts by mapping existing systems, data, tools, and security boundaries. We reuse sound investments and choose models, deployment, and integrations for the task and constraints.' },
      { q: 'What should our team prepare?', a: 'Bring one concrete workflow, a business owner, frontline users, current-state data, involved systems, security or compliance constraints, and one measurable result you want to improve.' },
    ],
  },
  contact: {
    eyebrow: 'START WITH ONE REAL WORKFLOW', head: 'Bring the problem that is currently stuck into discovery',
    text: 'Scan the WeChat QR code and note "Enterprise FDE." We will first understand the business goal, current workflow, technical environment, and non-negotiable boundaries, then decide whether FDE is the right way forward.',
    briefLabel: 'For a productive first conversation, include:',
    list: ['Company, team, and your role', 'The specific workflow and how it works today', 'Data, systems, security, or deployment constraints', 'The outcome metric and timing you want to improve'],
    qrLabel: 'Talk with us on WeChat', qrText: 'Add the note "Enterprise FDE" so we can route the request quickly.',
    promise: 'The first conversation starts with the problem and constraints, not a predetermined solution.',
  },
}
