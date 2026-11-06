/* ═══════════ 心灵街机 · 逻辑 ═══════════ */
"use strict";
const $ = (id) => document.getElementById(id);

/* ---------- 题库（每题 4 选项，分值不同） ---------- */
const GAMES = {
  mbti: {
    name: "性格迷宫", unit: "外向能量",
    qs: [
      { q: "周末的夜晚，你更想做什么？", o: ["组局！人越多越嗨", "约两三好友小聚", "窝在家补剧打游戏", "独自出门夜跑散步"], s: [4, 3, 1, 2] },
      { q: "在陌生聚会上，你的状态是？", o: ["主动搭话，认识新朋友", "有人聊就聊，随缘", "安静吃点心等熟人捞", "能不去就不去"], s: [4, 3, 2, 1] },
      { q: "遇到烦心事，你会？", o: ["立刻找人说个痛快", "挑一个最信任的人讲", "发条朋友圈发泄", "自己消化完就翻篇"], s: [4, 3, 2, 1] },
      { q: "群聊里你的角色更像？", o: ["话题发起者/斗图王", "气氛组活跃分子", "偶尔冒泡的潜水员", "已读不回型选手"], s: [4, 3, 2, 1] },
      { q: "上台演讲前你的心跳？", o: ["有点兴奋，跃跃欲试", "小紧张但能扛", "手心冒汗脑子空白", "连夜写好辞职信"], s: [4, 3, 2, 1] },
      { q: "旅行方式你偏爱？", o: ["呼朋唤友组车队", "和最搭的一人走", "报团省心跟着走", "独自说走就走"], s: [4, 3, 2, 1] },
      { q: "加班后的深夜地铁，你？", o: ["还在群里语音侃大山", "回朋友消息聊聊今天", "戴耳机进入结界", "谁也别理我"], s: [4, 3, 2, 1] },
      { q: "新同事入职第一天，你？", o: ["第一个过去自我介绍", "对方需要帮忙时搭手", "点头微笑示意", "祈祷别被分到同组"], s: [4, 3, 2, 1] }
    ]
  },
  eq: {
    name: "情商战机", unit: "情绪战力",
    qs: [
      { q: "朋友吐槽工作，TA 真正想要的是？", o: ["你帮 TA 骂老板出气", "认真听完并共情", "理性分析利弊", "讲个笑话岔开话题"], s: [3, 4, 2, 1] },
      { q: "被领导当众批评，你会？", o: ["当场怼回去", "先记下，私下沟通澄清", "表面认错内心翻涌", "emo 一整天啥也干不进"], s: [1, 4, 3, 2] },
      { q: "对方说「我没事」，你会？", o: ["那就当没事", "再观察语气和表情", "直接问到底怎么了", "给 TA 独处空间再说"], s: [1, 4, 3, 2] },
      { q: "团队功劳被同事抢了，你？", o: ["群里公开对线", "私下找对方+向上汇报", "忍了但记一笔", "自我怀疑是不是自己不行"], s: [2, 4, 3, 1] },
      { q: "好友深夜借钱，你第一反应？", o: ["多少？马上转", "先问清缘由再决定", "找借口缓缓", "装睡不回"], s: [3, 4, 2, 1] },
      { q: "吵架到气头上，你会？", o: ["嗓门盖过对方", "深呼吸，说「我们都冷静下」", "冷战等对方低头", "摔门走人"], s: [1, 4, 3, 2] },
      { q: "别人夸你其实做得一般的作品？", o: ["全盘照收美滋滋", "笑着道谢，心里有数", "自嘲贬低一番", "怀疑对方在阴阳怪气"], s: [2, 4, 3, 1] },
      { q: "感觉最近情绪低落，你会？", o: ["找人倾诉", "运动/写日记排解", "刷手机麻痹自己", "硬扛，会过去的"], s: [4, 3, 2, 1] }
    ]
  },
  idea: {
    name: "脑洞派对", unit: "想象力像素",
    qs: [
      { q: "如果动物会说话，最先开口的是？", o: ["鹦鹉（已就绪多年）", "家里的猫（一直憋着）", "动物园的大象", "深海里的鲸"], s: [4, 3, 2, 1] },
      { q: "给你一个「暂停世界」遥控器，你会？", o: ["暂停三小时补觉", "暂停着把仇家冰箱吃空", "研究遥控器本身", "不用，怕按坏世界"], s: [3, 4, 2, 1] },
      { q: "云朵摸起来最像什么？", o: ["棉花糖", "刚晒过的被子", "剃须泡沫", "巨大的史莱姆"], s: [1, 3, 4, 2] },
      { q: "外星人来地球第一站会去？", o: ["联合国总部", "成都（火锅味太香）", "信号最强的基站", "先绕月球观察三天"], s: [1, 4, 2, 3] },
      { q: "如果能给十年前的自己发一条短信？", o: ["「买比特币」", "「对楼下同学好一点」", "「别剪那个发型」", "发了也白发，我不会听的"], s: [3, 4, 2, 1] },
      { q: "文具里最有「江湖地位」的是？", o: ["涂改带（救场王）", "自动铅笔（扫地僧）", "圆规（暗器高手）", "橡皮（牺牲最多）"], s: [2, 3, 4, 1] },
      { q: "梦境最合理的商业模式是？", o: ["梦境剪辑课程", "噩梦保险理赔", "清醒梦体验馆", "给梦里的你代购早餐"], s: [2, 3, 1, 4] },
      { q: "如果颜色有声音，红色听起来？", o: ["炸裂的电吉他", "持续的高温警报", "过年放的鞭炮", "火锅沸腾的咕嘟声"], s: [3, 2, 4, 1] }
    ]
  }
};

/* 结算档位（按得分率） */
function rankOf(score, max) {
  const r = score / max;
  if (r >= .9)  return ["S", "传说段位", "满级玩家！你的这项能力已经点满，是人群里闪闪发光的存在。适度凡尔赛，注意友军感受。"];
  if (r >= .75) return ["A", "高手段位", "表现出色！离顶端只差一步，保持这个状态，偶尔装一把无伤大雅。"];
  if (r >= .55) return ["B", "进阶段位", "中坚力量！天赋不错但还没完全发力，多练习就能上分。"];
  if (r >= .35) return ["C", "青铜段位", "潜力股一枚！现在只是没找到发力点，别灰心，青铜也是段位。"];
  return ["D", "新手教学关", "系统检测到你在装弱（或真的很佛）。没关系，游戏才刚开始，restart 一局就好。"];
}

/* ---------- 游戏流程 ---------- */
let cur = null, qi = 0, score = 0;

function show(scene) {
  ["sceneTitle", "scenePlay", "sceneResult"].forEach(s => $(s).hidden = s !== scene);
  window.scrollTo(0, 0);
}

document.querySelectorAll(".cabinet").forEach(btn => btn.addEventListener("click", () => {
  cur = GAMES[btn.dataset.game]; cur.key = btn.dataset.game;
  qi = 0; score = 0;
  $("hudGame").textContent = cur.name;
  show("scenePlay");
  renderQ();
  beep(660, .07);
}));

function renderQ() {
  const item = cur.qs[qi];
  $("hudNo").textContent = qi + 1;
  $("hudScore").textContent = score;
  $("hpFill").style.width = `${(qi / cur.qs.length) * 100}%`;
  $("qText").textContent = `Q${qi + 1}. ${item.q}`;
  $("qOpts").innerHTML = item.o.map((t, i) =>
    `<button class="opt" data-i="${i}">${t}</button>`).join("");
}

$("qOpts").addEventListener("click", (e) => {
  const opt = e.target.closest(".opt");
  if (!opt) return;
  opt.classList.add("picked");
  beep(880, .06);
  score += cur.qs[qi].s[+opt.dataset.i];
  $("hudScore").textContent = score;
  $("hpFill").style.width = `${((qi + 1) / cur.qs.length) * 100}%`;
  setTimeout(() => {
    qi++;
    if (qi < cur.qs.length) renderQ();
    else finish();
  }, 240);
});

function finish() {
  const max = cur.qs.length * 4;
  const [rank, title, desc] = rankOf(score, max);
  $("resRank").textContent = rank;
  $("resTitle").textContent = `${cur.name} · ${title}`;
  $("resDesc").textContent = desc;
  $("resScore").textContent = `${score} / ${max}`;
  const bk = `arcade-best-${cur.key}`;
  const best = Math.max(score, +(localStorage.getItem(bk) || 0));
  localStorage.setItem(bk, best);
  $("resBest").textContent = `${best} / ${max}`;
  show("sceneResult");
  [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => beep(f, .12), i * 130));
}

$("btnAgain").addEventListener("click", () => {
  qi = 0; score = 0; show("scenePlay"); renderQ();
});
$("btnHome").addEventListener("click", () => show("sceneTitle"));
$("btnQuit").addEventListener("click", () => show("sceneTitle"));

/* ---------- 8-bit 音效 ---------- */
function beep(freq, dur) {
  try {
    const ctx = beep.ctx || (beep.ctx = new (window.AudioContext || window.webkitAudioContext)());
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = "square"; o.frequency.value = freq;
    g.gain.setValueAtTime(.08, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + dur);
    o.connect(g).connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + dur);
  } catch (e) { /* 静默 */ }
}
