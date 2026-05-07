// ============ i18n + theme ============
const root = document.documentElement;
const LANG_KEY = "techne-lang";
const THEME_KEY = "techne-theme";

function applyLang(lang) {
  root.setAttribute("data-lang", lang);
  document.querySelectorAll(".lang-toggle button").forEach(b => {
    b.classList.toggle("active", b.dataset.langSet === lang);
  });
  document.querySelectorAll("[data-en-placeholder]").forEach(el => {
    el.placeholder = el.getAttribute(`data-${lang}-placeholder`) || el.placeholder;
  });
  try { localStorage.setItem(LANG_KEY, lang); } catch (_) {}
}
function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  document.querySelectorAll(".theme-toggle button").forEach(b => {
    b.classList.toggle("active", b.dataset.themeSet === theme);
  });
  try { localStorage.setItem(THEME_KEY, theme); } catch (_) {}
}
const initLang = (() => {
  try { const s = localStorage.getItem(LANG_KEY); if (s) return s; } catch (_) {}
  return (navigator.language || "en").toLowerCase().startsWith("zh") ? "zh" : "en";
})();
applyLang(initLang);
applyTheme(localStorage.getItem(THEME_KEY) || "dark");

document.querySelectorAll(".lang-toggle button").forEach(btn =>
  btn.addEventListener("click", () => applyLang(btn.dataset.langSet)));
document.querySelectorAll(".theme-toggle button").forEach(btn =>
  btn.addEventListener("click", () => applyTheme(btn.dataset.themeSet)));

// ============ Civilization Simulator ============
const SIMULATOR = {
  printing: {
    en: [
      ["1ST · ECONOMY", `Cost of producing a book drops ~99% within a generation. The publishing industry as a category is born — a new occupational class with capital, distribution, and a national readership.`],
      ["2ND · WARFARE", `Standardized manuals (drill, tactics, gunnery) make armies trainable at scale. Treatises on fortification — von Vauban, Stevin — circulate empire-wide. <em>The same army at twice the speed.</em>`],
      ["3RD · GOVERNANCE", `Statutes printed and posted change the meaning of "law." Pamphlets enable mass politics. The Reformation is a printing event. The 1789 French revolution is downstream of two centuries of printed political theory.`],
      ["4TH · POPULATION", `Literacy spreads from clerks to townsmen to peasants over three centuries. Female literacy lags — but rises. The shape of the modern individual ("the reader") emerges here.`],
      ["5TH · CULTURE", `Mass duplication of identical content creates "the public" as a category. Authorship becomes individuated. The novel — a peculiarly print form — emerges. National vernaculars displace Latin in scholarship.`]
    ],
    zh: [
      ["一阶 · 经济", `一代人之内，书的生产成本下降约 99%。出版业作为一个范畴诞生 —— 拥有资本、分销、与全国读者群的新职业阶层。`],
      ["二阶 · 战争", `标准化手册（操练、战术、火炮）让军队可大规模训练。沃邦、斯蒂文的筑城论著在帝国范围内流通。<em>同样的军队，行进速度翻倍。</em>`],
      ["三阶 · 治理", `成文法律被印刷并张贴 —— 改变了"法"的含义。小册子使大众政治成为可能。宗教改革是一次印刷事件；1789 年法国大革命是两百年印刷政治论著的下游。`],
      ["四阶 · 人口", `识字从文吏扩散到市民再到农民，历时三个世纪。女性识字滞后 —— 但在上升。现代个体（"<em>读者</em>"）的形状，从此开始浮现。`],
      ["五阶 · 文化", `相同内容的大规模复制，使"<em>公众</em>"成为一个范畴。作者身份个体化。"小说"——一种特别的印刷形式 —— 在此出现。各国本族语在学术中取代拉丁语。`]
    ]
  },
  steam: {
    en: [
      ["1ST · ECONOMY", `Energy density per worker rises 50–100×. Factories displace cottage industry. The first sustained per-capita economic growth in human history begins. <em>The Malthusian ceiling, broken in living memory.</em>`],
      ["2ND · WARFARE", `Railway logistics make continental-scale warfare possible. The 1866 Austro-Prussian war is decided by Prussian railway timetables. The 1914–1918 industrial-scale slaughter is a steam-coal product before it is anything else.`],
      ["3RD · GOVERNANCE", `Time zones become necessary (rail timetables); national bureaus of standards become necessary (interchangeable parts); the modern regulatory state is born to handle externalities (factory acts, public health acts). The state grows because the technology requires it.`],
      ["4TH · POPULATION", `Cities surpass countryside for the first time in modern history (Britain, ~1851). Urban mortality is initially horrifying; then sanitation catches up. Mass migration to industrial centers becomes the dominant demographic event of the 19th century.`],
      ["5TH · CULTURE", `Industrial discipline reshapes the working day, the calendar, and identity. Romanticism is the cultural reaction to industrialism — and the start of a long argument that has not ended.`]
    ],
    zh: [
      ["一阶 · 经济", `每位工人的能量密度上升 50—100 倍。工厂取代家庭手工业。人类历史上第一次持续性的人均经济增长开始。<em>马尔萨斯上限，在记忆所及的时代被打破。</em>`],
      ["二阶 · 战争", `铁路后勤使大陆级战争成为可能。1866 年普奥战争由普鲁士的铁路时刻表决定。1914—1918 年的工业化级屠杀，首先是煤与蒸汽的产物，其次才是别的。`],
      ["三阶 · 治理", `时区成为必要（铁路时刻表）；国家标准局成为必要（互换零件）；现代监管国家诞生以处理外部性（工厂法、公共卫生法）。国家变大 —— 因为技术要求它变大。`],
      ["四阶 · 人口", `城市人口在现代史上第一次超过乡村（英国，约 1851）。城市死亡率最初是骇人的，之后卫生跟上。向工业中心的大规模迁移，成为 19 世纪首要的人口事件。`],
      ["五阶 · 文化", `工业纪律重塑工作日、日历与身份。浪漫主义是对工业主义的文化反应 —— 也是一场至今未结束的长辩论的开端。`]
    ]
  },
  electricity: {
    en: [
      ["1ST · ECONOMY", `Electricity is the first energy source that can be transmitted, divided, and switched on demand. The factory is reorganized — line layout based on electric drives, not on a single shaft from a central engine. Productivity per worker doubles again.`],
      ["2ND · WARFARE", `Radio (1900s), radar (1935), then nuclear weapons (1945). Each is an electrical-physics product. The strategic logic of the 20th century — air power, deterrence, intelligence — runs on electricity.`],
      ["3RD · GOVERNANCE", `Mass media (radio, then television) reshapes the relationship between rulers and ruled. The dictator's voice in every kitchen is a 20th-century invention. Modern advertising — and modern political campaigning — depend on the electric grid.`],
      ["4TH · POPULATION", `The post-1900 lifespan extension is largely electrical: refrigeration of food, sterilization of water, hospital equipment, household labor reduction. Women's labor force participation rises with electrification of the home.`],
      ["5TH · CULTURE", `Night becomes optional. The 8-hour day-shift loses its hold on the rhythm of life. Cinema, the LP, the radio drama, then television — a new culture of vicarious experience emerges.`]
    ],
    zh: [
      ["一阶 · 经济", `电是第一种可<em>传输、可分割、可按需开关</em>的能源。工厂被重新组织 —— 流水线布局基于"电力驱动"，而非来自中央蒸汽机的单根传动轴。劳动生产率再次倍增。`],
      ["二阶 · 战争", `无线电（1900s）、雷达（1935）、核武器（1945）。每一项都是电学—物理的产物。20 世纪的战略逻辑 —— 空军、威慑、情报 —— 运行在电之上。`],
      ["三阶 · 治理", `大众媒介（先广播，后电视）改写了统治者与被统治者之间的关系。"<em>独裁者的声音出现在每一个厨房</em>"，是 20 世纪的发明。现代广告 —— 与现代竞选 —— 都依赖于电网。`],
      ["四阶 · 人口", `1900 年之后的寿命延长，很大程度上是电学的：食物冷藏、水的消毒、医院设备、家务劳动减负。家庭电气化与女性劳动参与率同步上升。`],
      ["五阶 · 文化", `夜晚变成可选。八小时日班对生活节奏的支配松动。电影、唱片、广播剧、之后是电视 —— 一种新的"<em>替代体验</em>"文化浮现。`]
    ]
  },
  internet: {
    en: [
      ["1ST · ECONOMY", `The marginal cost of distributing information drops to ~zero. Whole industries are reorganized: retail, music, news, education, finance, dating, taxis. New monopoly forms — platforms — that earn rents from being the coordination point itself.`],
      ["2ND · WARFARE", `Cyber becomes a domain co-equal with land, sea, air, space. Information operations and influence campaigns become a permanent feature of geopolitics. The line between war and peacetime degrades.`],
      ["3RD · GOVERNANCE", `Politics globalizes information access while polarizing audiences. The "public" that printing created is partially dis-aggregated by recommender systems. New regulatory categories (data protection, platform liability) appear over a decade.`],
      ["4TH · POPULATION", `For the first time, friendship and partnership formation are mediated by software for a majority. Adolescent socialization moves online; some metrics improve, some metrics fall. The cohort raised on smartphones (~2007 onward) shows distinct mental-health and attention statistics from prior cohorts.`],
      ["5TH · CULTURE", `Authorship becomes universal: anyone with a device is a publisher. Truth-vetting, the previous job of editors and curators, becomes a problem each user must solve themselves. <em>Cultural production is more abundant; cultural consensus is harder.</em>`]
    ],
    zh: [
      ["一阶 · 经济", `信息分发的边际成本趋近于零。整个行业被重组：零售、音乐、新闻、教育、金融、约会、出租车。新的垄断形式 —— "<em>平台</em>" —— 因充当"协调点"本身而收取租金。`],
      ["二阶 · 战争", `"<em>赛博空间</em>"成为与陆海空、太空并列的战域。信息行动与影响活动，成为地缘政治的常态特征。战与和的边界，被磨损。`],
      ["三阶 · 治理", `政治在全球范围共享信息接入，但在受众层面被推荐系统部分<em>解聚</em>。"印刷创造的'公众'"——被部分切片。新的监管范畴（数据保护、平台责任）在十年间生成。`],
      ["四阶 · 人口", `第一次，对多数人而言，友情与伴侣的形成由软件中介。青少年的社会化转移到线上；一些指标改善，一些指标恶化。"<em>智能手机时代</em>"出生的同龄群体（约 2007 起），在心理健康与注意力统计上，与之前同龄群体明显不同。`],
      ["五阶 · 文化", `作者身份普及：任何持有设备者都是出版者。真伪审定 —— 过去由编辑与策展人承担 —— 现在成为每个使用者必须自己解决的问题。<em>文化生产更丰沛；文化共识更困难。</em>`]
    ]
  },
  ai: {
    en: [
      ["1ST · ECONOMY", `Cognitive labor — drafting, summarizing, debugging, designing, planning — becomes radically cheaper. White-collar productivity could rise 1.5—5× in tasks already piloted. The new bottleneck shifts from "can someone do it" to "what is worth doing."`],
      ["2ND · WARFARE", `Decision speed matters more than firepower. Autonomous targeting, drone swarms, algorithmic logistics, and synthetic information operations are already deployed in current conflicts. Strategic stability is being renegotiated under pressure.`],
      ["3RD · GOVERNANCE", `States face the question of whether to be platforms (control compute, models, data) or referees (regulate them). Different societies are choosing differently. The result will not be uniform; the long arc of the 21st century will be partially shaped by which choice ages best.`],
      ["4TH · POPULATION", `Skills bundles are revalued in real time. Tasks within professions are automatable selectively; whole professions less so. The career half-life of a single skill bundle declines. Continuous re-skilling becomes the default — but is unevenly available.`],
      ["5TH · CULTURE", `For the first time, content production exceeds human consumption capacity. The scarce resource shifts from "who can make this?" to "who can decide what is worth attending to?" Curatorial authority becomes a center of gravity in cultural life.`]
    ],
    zh: [
      ["一阶 · 经济", `认知性劳动 —— 起草、总结、调试、设计、规划 —— 大幅变便宜。已被试点的任务上，白领生产率可能上升 1.5—5 倍。新的瓶颈，从"<em>有没有人能做</em>"转为"<em>什么值得做</em>"。`],
      ["二阶 · 战争", `决策速度比火力更重要。自主目标识别、无人机蜂群、算法化后勤、合成信息行动，已在当前冲突中部署。战略稳定性正在压力下被重新协商。`],
      ["三阶 · 治理", `国家面临一个问题：要做"<em>平台</em>"（控制算力、模型、数据），还是做"<em>裁判</em>"（监管它们）。不同社会做出不同选择。结果不会统一；21 世纪的长弧，将部分由"哪种选择老化得更好"塑造。`],
      ["四阶 · 人口", `技能组合实时重估。<em>职业内的任务</em>可被选择性自动化；整个职业则不太能。单一技能组合的"<em>职业半衰期</em>"缩短。持续再训练成为默认 —— 但分布不均。`],
      ["五阶 · 文化", `第一次，内容生产超过人类消费能力。稀缺资源从"<em>谁能做出来</em>"转为"<em>谁能决定什么值得被注意</em>"。策展性权威，成为文化生活中的引力中心。`]
    ]
  }
};

function renderSim(tech) {
  const data = SIMULATOR[tech];
  if (!data) return;
  const el = document.getElementById("sim-outcome");
  const head = `
    <div class="head"><span lang="en">PROJECTED EFFECTS · five dimensions</span><span lang="zh">推演效应 · 五个维度</span></div>
  `;
  const rows = data.en.map((row, i) => `
    <div class="sim-row">
      <div class="axis"><span lang="en">${row[0]}</span><span lang="zh">${data.zh[i][0]}</span></div>
      <div class="text"><span lang="en">${row[1]}</span><span lang="zh">${data.zh[i][1]}</span></div>
    </div>
  `).join("");
  el.innerHTML = head + rows;
}
renderSim("printing");
document.querySelectorAll("#sim-picker .sim-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#sim-picker .sim-btn").forEach(b => b.classList.toggle("active", b === btn));
    renderSim(btn.dataset.tech);
  });
});

// ============ Philosopher Q&A ============
const PHILOSOPHER = {
  essence: {
    q: { en: `If technology is so central, why don't we feel it most of the time?`, zh: `如果技术这么关键，为什么我们多半感觉不到？` },
    a: {
      en: [
        `<strong>Because the most successful technologies become invisible.</strong> A technology you notice is one that is still adapting to you. A technology that has fully adapted to you adapts <em>through</em> you — and at that point you stop perceiving it as a tool at all.`,
        `<div class="quoted">Glasses are technology. Once worn for a week, they become an invisible extension of vision. The phenomenology shifts from "I am using a tool" to "I see clearly."</div>`,
        `<div class="quoted">Writing is technology. To a literate adult, the printed page is not a layer between mind and meaning; it <em>is</em> meaning. Yet a 6-year-old struggling to decode "cat" is having a recognizably technical experience.</div>`,
        `<strong>This is why most technology critique fails.</strong> By the time a technology is critiqued, it is already invisible to its users — and the critic looks like someone complaining about something everyone else simply <em>does</em>. Heidegger called this "the questioning concerning technology" — the basic move is to make the invisible visible again, briefly, by asking what it has done to the people who can no longer see it.`,
        `<strong>The practical implication:</strong> if you want to know what a technology is actually doing to you, look at what your grandparents could do that you cannot. Some of those losses are evidence; some are romanticism. Distinguishing them is the work.`
      ],
      zh: [
        `<strong>因为最成功的技术会变得隐形。</strong>你能察觉的技术，是仍在适应你的技术。已经完全适应你的技术 —— 是通过<em>你</em>来适应的；到了那一步，你就不再把它感知为"工具"了。`,
        `<div class="quoted">眼镜是技术。戴一周之后，它成为视觉的"<em>不可见延伸</em>"。现象学从"我在使用一个工具"转为"<em>我看得清</em>"。</div>`,
        `<div class="quoted">文字是技术。对识字的成年人而言，印刷页不是心智与意义之间的一层；它<em>就是</em>意义。但一个 6 岁孩子吃力地拼读"猫"——他正在有可识别的"<em>技术性</em>"体验。</div>`,
        `<strong>所以多数技术批评失败。</strong>当一项技术被批评时，它对其使用者而言已经隐形 —— 批评者看起来就像在抱怨"<em>大家都自然在做的事</em>"。海德格尔把这称作"对技术的追问" —— 它的基本动作是：通过追问"它对那些已经看不见它的人做了什么"，让隐形之物<em>短暂地</em>再次可见。`,
        `<strong>实际含义：</strong>若想知道某项技术实际对你做了什么，看看你的祖辈能做、而你已经不能做的事。有些丢失是证据，有些是浪漫主义。区分它们 —— 才是真正的功课。`
      ]
    }
  },
  "ai-difference": {
    q: { en: `Is AI fundamentally different from prior technology?`, zh: `AI 与之前的技术，<em>根本上</em>不同吗？` },
    a: {
      en: [
        `<strong>Two honest answers, both partial.</strong>`,
        `<div class="quoted">In one sense, no — AI is on the same five-axis schema as every prior technology: applied knowledge controlling energy, processing information, coordinating action, with a cognitive externalization. The structural pattern repeats. It is the sixth wave by the same logic that brought us the fifth.</div>`,
        `<div class="quoted">In another sense, yes — for the first time, the externalized faculty is the one we use to <em>understand</em> the externalization. When we externalized memory, we still had judgment. When we externalized perception (microscopes, telescopes), we still had understanding. With AI, we are externalizing judgment and understanding themselves. The reflexive loop is new.</div>`,
        `<strong>What this means in practice:</strong> the first five waves changed what humans <em>did</em>. The sixth, if fully realized, also changes who <em>decides</em> — not necessarily what AI decides, but how. The deliberative habit of "stopping to think before acting" depends on a cost-of-thought that AI may dramatically reduce. Whether the result is better collective thinking or thinner thinking depends on choices not yet made.`,
        `<strong>Wisdom from the prior waves:</strong> printing initially looked like a labor-saving device for monks. It became the substrate of a new culture. AI looks today like a labor-saving device for cognitive workers. The substrate question — what new culture, if any, this becomes — is decided over decades, not press releases.`
      ],
      zh: [
        `<strong>两种诚实回答 —— 都是部分的。</strong>`,
        `<div class="quoted">一种意义上，否 —— AI 落在与之前每一项技术相同的五轴图式里：用以控制能量、处理信息、协调行动的应用知识 + 认知性外化。结构图案重复。按同一逻辑，AI 是"<em>第六波</em>" —— 与带来第五波的逻辑相同。</div>`,
        `<div class="quoted">另一种意义上，是 —— 第一次，被外化的能力，是我们用以<em>理解外化本身</em>的那种能力。外化记忆时，我们仍保有判断力；外化知觉（显微、望远）时，我们仍保有理解力。AI 外化的是<em>判断与理解</em>本身。这种自反性循环 —— 是新的。</div>`,
        `<strong>实践含义：</strong>前五波改变人<em>做什么</em>；第六波若全面实现，也改变"<em>谁来决定</em>" —— 不一定是 AI 来决定，而是改变"<em>如何决定</em>"。"<em>行动前停下来想一下</em>"这个深思习惯，依赖于"<em>思考成本</em>"——而 AI 可能戏剧性降低这个成本。结局是更好的集体思考、还是更稀薄的思考 —— 取决于尚未做出的选择。`,
        `<strong>从前几波得来的智慧：</strong>印刷术起初看起来像"<em>替修士省力的设备</em>"。后来它成了一种新文化的基底。AI 今天看起来像"<em>替认知工作者省力的设备</em>"。底基问题 —— 它是否会成为某种新文化 —— 在数十年中被决定，不是在新闻稿里。`
      ]
    }
  },
  determinism: {
    q: { en: `Does technology determine society, or does society determine technology?`, zh: `是技术决定社会，还是社会决定技术？` },
    a: {
      en: [
        `<strong>Both — and asking which one wins is the wrong frame.</strong> The honest answer is that they co-determine on different time horizons.`,
        `<div class="quoted">Short term (years): society chooses among already-existing technologies. Different countries chose different telephone monopolies, different power grid voltages, different car-vs-rail balances. <em>Society wins on adoption.</em></div>`,
        `<div class="quoted">Medium term (decades): once a society has adopted a technology, the technology selects which other technologies, institutions, and habits will fit alongside it. The car selected suburbs; the suburb did not select the car. <em>Technology wins on co-evolution.</em></div>`,
        `<div class="quoted">Long term (centuries): society shapes which technologies are pursued in the first place. Chinese imperial bureaucracy could fund printing; Athenian polities could not have. The deep institutional substrate decides what the next century's technology can even <em>be</em>. <em>Society wins on possibility space.</em></div>`,
        `<strong>The popular debate</strong> usually picks one horizon and treats it as the whole answer. Marxists tend toward technological determinism on medium-term effects. Liberal historians tend toward social determinism on short-term choices. Both are right, on different time scales — and both are wrong if extended outside their range.`
      ],
      zh: [
        `<strong>两者都会 —— 而问"哪一个赢"本身就是错误的框架。</strong>诚实的回答是：在不同的时间尺度上，它们<em>共同决定</em>。`,
        `<div class="quoted">短期（年）：社会在既有技术中选择。不同国家选择不同的电话垄断、不同的电网电压、不同的"<em>汽车 vs 铁路</em>"平衡。<em>社会赢在"采纳"层面。</em></div>`,
        `<div class="quoted">中期（数十年）：一旦社会采纳了某项技术，技术开始选择"<em>哪些其他技术、制度、习惯能与它并行</em>"。汽车选择了郊区；郊区并没有选择汽车。<em>技术赢在"协同进化"层面。</em></div>`,
        `<div class="quoted">长期（世纪）：社会决定<em>哪些技术从一开始就被追求</em>。中国帝国官僚可以资助印刷；雅典城邦做不到这件事。深层的制度底基，决定下一个世纪的技术<em>能是什么</em>。<em>社会赢在"可能性空间"层面。</em></div>`,
        `<strong>大众辩论</strong>通常挑一个尺度，把它当作整个答案。马克思主义者在中期效应上偏向技术决定论；自由派史学家在短期选择上偏向社会决定论。两者在不同时间尺度上都对 —— 也都在被推出本来范围时变错。`
      ]
    }
  },
  reversal: {
    q: { en: `Can a civilization step back from a technology?`, zh: `一个文明能从某项技术"<em>退回去</em>"吗？` },
    a: {
      en: [
        `<strong>Rarely, and only under specific conditions.</strong> The historical record is more interesting than either techno-utopian or techno-pessimist views suggest.`,
        `<div class="quoted">Yes, sometimes. Tokugawa Japan banned firearms for ~250 years (~1600–1850). Imperial China abandoned the ocean-going treasure fleet after 1433 — by deliberate court policy. Industrial Britain shut down its civilian nuclear-power program for political reasons after the 1980s. Reversal is possible.</div>`,
        `<div class="quoted">But the conditions are narrow. Reversal seems to require: a centralized political authority capable of enforcing the ban; a stable enough economic surplus to absorb the productivity loss; relative geographic isolation from rivals who would exploit the asymmetry; and a dominant cultural narrative that frames the abandonment as a virtue, not a defeat. Few periods have all four.</div>`,
        `<div class="quoted">For most of history, "rolling back" looks like external defeat. The Bronze Age collapse was a reversal — but not a chosen one. The 5th-century western Roman fall reversed many technologies (Roman concrete, hot baths, urban water) — also unchosen.</div>`,
        `<strong>For our era specifically:</strong> a planet-scale ban on a high-leverage technology requires cooperation that has not been achieved. Smaller-scope rollbacks are achievable: nuclear test ban (1996), CFC ban (1987), CRISPR-on-embryos restraint (still mostly intact). These are useful precedents — but they involve technologies whose deploying parties were each willing to accept symmetric restraint.`,
        `<strong>The honest answer about a hypothetical AI rollback:</strong> structurally similar to nuclear control. Technically possible if all major capabilities-holders accept symmetric constraint. Politically extremely difficult. Has happened before; usually doesn't.`
      ],
      zh: [
        `<strong>偶尔可以 —— 在特定条件下。</strong>历史记录比"技术乌托邦"或"技术悲观"两边说的都更有意思。`,
        `<div class="quoted">是的，有时可以。德川日本禁绝火器约 250 年（约 1600—1850）；明朝在 1433 年后停止远洋宝船 —— 出于朝廷有意决策；工业化的英国在 1980 年代后基于政治原因关闭民用核电计划。"<em>退回去</em>"是可能的。</div>`,
        `<div class="quoted">但条件很窄。"<em>退回去</em>"似乎需要：能强制执行禁令的集中政治权威；足够稳定的经济剩余以吸收生产力损失；相对的地理孤立 —— 不至于被对手利用不对称；以及一种把"<em>放弃</em>"叙述为"<em>美德而非失败</em>"的主导文化叙事。同时具备四者的时期不多。</div>`,
        `<div class="quoted">在大部分历史中，"<em>退回去</em>"看起来更像<em>外部失败</em>。青铜时代崩溃是一次退回去 —— 但不是被选择的；5 世纪西罗马陷落使许多技术（罗马混凝土、温浴、城市供水）退回去 —— 也不是被选择的。</div>`,
        `<strong>对我们这个时代而言：</strong>对一项高杠杆技术的星球级禁令，需要尚未达成的协作。规模较小的回退是可达的：核试验禁令（1996）、氟氯烃禁令（1987）、对胚胎 CRISPR 的克制（至今基本完好）。这些是有用的先例 —— 但它们涉及的，是各部署方都愿意接受<em>对称约束</em>的技术。`,
        `<strong>关于"<em>假设性 AI 回退</em>"的诚实回答：</strong>结构上类似于核管制。在所有主要能力持有者都接受对称约束时，技术上可行；政治上极其困难。曾经发生过；通常不会发生。`
      ]
    }
  },
  human: {
    q: { en: `What does it mean to remain "human" through all of this?`, zh: `在这一切中，保持"<em>人</em>"是什么意思？` },
    a: {
      en: [
        `<strong>The honest answer is that "human" has been a moving target the entire time.</strong> Anyone who can read this sentence is already a substantially extended creature compared to a 30,000-year-old hunter-gatherer. The question is not whether to extend, but how — and which extensions cost more than they give.</strong>`,
        `<div class="quoted">A definition that survives the technology question: "human" is the part that <em>chooses</em> what to extend, refuses what should not be extended, and grieves what is lost in the process. By this definition, remaining human is an active discipline — not a default state preserved by avoidance.</div>`,
        `<div class="quoted">Three concrete practices that have aged well across waves: (a) maintaining capacities the technology now does for you (writing by hand sometimes; mental arithmetic; cooking from raw ingredients) so that you know what the technology is replacing; (b) staying present to other humans in modes the technology cannot fully mediate (long conversation, shared physical work, in-person grief); (c) noticing what the technology is doing to your attention, reactions, and sense of agency, and adjusting.</div>`,
        `<strong>What rarely works:</strong> total abstinence (impossible at scale, and hubristic), and total surrender (you are then not making the choice — the technology is). The interesting middle is staying in the conversation between the human substrate and each successive technological layer, knowing that the layers will keep arriving and that the substrate is more durable than any single one.`,
        `<strong>One more note.</strong> "Remaining human" is not a private project. The capacities and habits that survive depend on which capacities and habits are valued in the institutions a person lives in — the school, the workplace, the public square. So the deeper question is institutional, not personal: <em>are we building institutions that protect the parts of being human worth protecting?</em>`
      ],
      zh: [
        `<strong>诚实的回答是：</strong>"<em>人</em>"一直就是一个移动靶。任何能阅读这句话的存在，相对 3 万年前的狩猎采集者来说，已经是一种<em>显著被延伸</em>的生物。问题不是"<em>要不要延伸</em>"，而是<em>如何延伸</em> —— 以及哪些延伸的代价超过其给予。`,
        `<div class="quoted">一个能在"技术之问"下幸存的定义："<em>人</em>"是那一部分 —— <em>选择</em>要延伸什么、<em>拒绝</em>不该延伸的东西、并在过程中<em>哀悼</em>失去之物。按这个定义，"<em>保持为人</em>"是一种主动纪律 —— 不是靠回避维持的默认状态。</div>`,
        `<div class="quoted">三种在波次更替中一直老化得好的具体做法：（甲）保持那些技术现在替你做的能力（偶尔手写；心算；从原料烹饪），这样你才知道技术替换的是什么；（乙）以技术无法充分中介的方式与他人在场（长对话、共同的体力劳动、面对面的哀悼）；（丙）察觉技术正在对你的注意力、反应、能动感做什么，并调整。</div>`,
        `<strong>很少奏效的：</strong>完全戒断（在规模上不可能，且傲慢）与完全交出（那么决定不在你这里 —— 在技术那里）。有意思的中间地带，是<em>留在</em>"<em>人之底基</em>"与每一道继起技术层之间的对话里 —— 知道层会继续到来、而底基比任何单一层都更耐久。`,
        `<strong>再补一条。</strong>"<em>保持为人</em>"不是私人项目。能存活下来的能力与习惯，取决于一个人所处的制度（学校、工作、公共领域）<em>重视</em>哪些能力与习惯。所以更深的问题是制度性的，不是个人性的：<em>我们是否在建造保护"值得保护的那部分人性"的制度？</em>`
      ]
    }
  }
};

const stream = document.getElementById("phil-stream");
function pushMsg(role, en, zh) {
  const msg = document.createElement("div");
  msg.className = "msg" + (role === "user" ? " user" : "");
  msg.innerHTML = `
    <div class="role">${role === "user"
      ? `<span lang="en">You</span><span lang="zh">你</span>`
      : `<span lang="en">Philosopher</span><span lang="zh">哲学家</span>`}</div>
    <div class="bubble">
      <div lang="en">${en}</div>
      <div lang="zh">${zh}</div>
    </div>
  `;
  stream.appendChild(msg);
  stream.scrollTo({ top: stream.scrollHeight, behavior: "smooth" });
}
function answer(key) {
  const item = PHILOSOPHER[key];
  if (!item) return;
  pushMsg("user", item.q.en, item.q.zh);
  setTimeout(() => {
    const wrap = arr => arr.map(p => p.startsWith("<div") ? p : `<p>${p}</p>`).join("");
    pushMsg("philosopher", wrap(item.a.en), wrap(item.a.zh));
  }, 320);
}
document.querySelectorAll(".phil-pill").forEach(p =>
  p.addEventListener("click", () => answer(p.dataset.q)));

document.getElementById("phil-send").addEventListener("click", sendCustom);
document.getElementById("phil-input").addEventListener("keydown", e => {
  if (e.key === "Enter") sendCustom();
});
function sendCustom() {
  const input = document.getElementById("phil-input");
  const text = input.value.trim();
  if (!text) return;
  pushMsg("user", text, text);
  input.value = "";
  const t = text.toLowerCase();
  let key = null;
  if (/(invisible|don't feel|essence|notice|why don't we)/.test(t) || /感觉不到|隐形|察觉|本质/.test(text)) key = "essence";
  else if (/(ai.*different|different from prior|sixth wave|generative.*unique)/.test(t) || /AI.*不同|根本不同|第六波|生成式/.test(text)) key = "ai-difference";
  else if (/(determine|determinism|society.*technology|technology.*society)/.test(t) || /决定|社会.*技术|技术.*社会|决定论/.test(text)) key = "determinism";
  else if (/(reverse|step back|abandon|undo|rollback|forbid)/.test(t) || /退回|放弃|逆转|撤回/.test(text)) key = "reversal";
  else if (/(human|humanity|stay human|remain|identity)/.test(t) || /人性|为人|保持人|身份/.test(text)) key = "human";

  if (key) {
    setTimeout(() => {
      const item = PHILOSOPHER[key];
      const wrap = arr => arr.map(p => p.startsWith("<div") ? p : `<p>${p}</p>`).join("");
      pushMsg("philosopher", wrap(item.a.en), wrap(item.a.zh));
    }, 320);
  } else {
    setTimeout(() => {
      pushMsg("philosopher",
        `<p>To make this productive rather than generic, name <strong>which technology</strong> (a specific one — printing, electricity, AI, BCI…) and <strong>at what scale</strong> you are asking about: individual cognition, institution, civilization. The technology question is fractal — the same question at different scales has different honest answers.</p>`,
        `<p>为让这次对话有生产性而非泛泛，请命名你问的是<strong>哪一项具体技术</strong>（印刷、电、AI、脑机接口……）以及<strong>哪个尺度</strong>：个人认知、制度、还是文明。技术之问是分形的 —— 同一问题在不同尺度上，有不同的诚实回答。</p>`
      );
    }, 320);
  }
}

// ============ Reveal on scroll ============
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
}, { rootMargin: "0px 0px -10% 0px" });
document.querySelectorAll(".section-head, .def-cell, .example, .cap-row, .energy-step, .info-cell, .coord-item, .consc-cell, .wave-card, .future-cell, .risks-list li").forEach(el => {
  el.classList.add("fade-in");
  io.observe(el);
});
