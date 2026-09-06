'use strict';
/* =========================================================
   BOLAJONLAR — app.js
   Barcha ma'lumotlar, navigatsiya, ovoz, quiz va reyting logikasi.
   Tashqi kutubxona yo'q — faqat vanilla JS.
   ========================================================= */

/* ---------------- MA'LUMOTLAR ---------------- */

const LETTERS = [
  ["A","Anor"], ["B","Bola"], ["D","Daraxt"], ["E","Echki"], ["F","Fil"],
  ["G","Gul"], ["H","Hilol"], ["I","It"], ["J","Jajji"], ["K","Kitob"],
  ["L","Limon"], ["M","Mushuk"], ["N","Non"], ["O","Olma"], ["P","Piyoz"],
  ["Q","Qalam"], ["R","Rasm"], ["S","Soat"], ["T","Tuxum"], ["U","Uzum"],
  ["V","Velosiped"], ["X","Xalta"], ["Y","Yulduz"], ["Z","Zebra"],
  ["O‘","O‘rmon"], ["G‘","G‘oz"], ["Sh","Shar"], ["Ch","Choy"], ["Ng","Dengiz"]
].map(([letter, word], i) => ({ id: `letter-${i}`, letter, word, pal: i % 7 }));

const NUMBERS = [
  ["1","bir"], ["2","ikki"], ["3","uch"], ["4","to‘rt"], ["5","besh"],
  ["6","olti"], ["7","yetti"], ["8","sakkiz"], ["9","to‘qqiz"], ["10","o‘n"]
].map(([digit, word], i) => ({ id: `num-${i}`, digit, word, value: i + 1, pal: i % 7 }));

const COLORS = [
  ["Qizil", "#E85D5D"], ["Sariq", "#F6C94B"], ["Yashil", "#5FB56A"], ["Ko‘k", "#4C86D6"],
  ["Pushti", "#F2A0C4"], ["Binafsha", "#A97BD1"], ["To‘q sariq", "#EE8A3D"],
  ["Havorang", "#7FD0E0"], ["Oq", "#F7F5EE"], ["Qora", "#4A4038"]
].map(([name, hex], i) => ({ id: `color-${i}`, name, hex }));

const SHAPES = [
  ["Doira", "circle"], ["Uchburchak", "triangle"], ["Kvadrat", "square"],
  ["To‘g‘ri to‘rtburchak", "rect"], ["Oval", "oval"], ["Yulduz", "star"]
].map(([name, kind], i) => ({ id: `shape-${i}`, name, kind, pal: i % 7 }));

const BODY_PARTS = [
  ["Ko‘z","👁"], ["Quloq","👂"], ["Burun","👃"], ["Og‘iz","👄"],
  ["Qo‘l","✋"], ["Oyoq","🦶"], ["Bosh","🧠"]
].map(([name, emoji], i) => ({ id: `body-${i}`, name, emoji, pal: i % 7 }));

const ANIMALS = [
  ["Mushuk","🐱"], ["It","🐶"], ["Quyon","🐰"], ["Sher","🦁"],
  ["Fil","🐘"], ["Panda","🐼"], ["Kapalak","🦋"], ["Baliq","🐠"]
].map(([name, emoji], i) => ({ id: `animal-${i}`, name, emoji, pal: i % 7 }));

const FRUITS = [
  ["Olma","🍎"], ["Nok","🍐"], ["Apelsin","🍊"], ["Banan","🍌"],
  ["Uzum","🍇"], ["Tarvuz","🍉"], ["Qulupnay","🍓"], ["Kivi","🥝"]
].map(([name, emoji], i) => ({ id: `fruit-${i}`, name, emoji, pal: i % 7 }));

const NATURE = [
  ["Quyosh","☀️"], ["Oy","🌙"], ["Bulut","☁️"], ["Yomg‘ir","🌧"],
  ["Daraxt","🌳"], ["Gul","🌸"], ["Tog‘","⛰"], ["Dengiz","🌊"]
].map(([name, emoji], i) => ({ id: `nature-${i}`, name, emoji, pal: i % 7 }));

const TRANSPORT = [
  ["Mashina","🚗"], ["Avtobus","🚌"], ["Poyezd","🚆"],
  ["Samolyot","✈️"], ["Kema","🚢"], ["Velosiped","🚲"]
].map(([name, emoji], i) => ({ id: `transport-${i}`, name, emoji, pal: i % 7 }));

const CLOCKS = [
  ["1:00", 1, 0], ["3:00", 3, 0], ["6:00", 6, 0], ["9:00", 9, 0], ["12:00", 12, 0]
].map(([label, h, m], i) => ({ id: `clock-${i}`, label, h, m, pal: i % 7 }));

const CATEGORIES = [
  { id: "letters",    label: "Harflar",            icon: "letters",    cls: "c1"  },
  { id: "numbers",    label: "Sonlar",              icon: "numbers",    cls: "c2"  },
  { id: "colors",     label: "Ranglar",             icon: "colors",     cls: "c3"  },
  { id: "shapes",     label: "Geometrik shakllar",  icon: "shapes",     cls: "c4"  },
  { id: "body",       label: "Tana a’zolari",       icon: "body",       cls: "c5"  },
  { id: "time",       label: "Vaqt",                icon: "time",       cls: "c6"  },
  { id: "animals",    label: "Hayvonlar",           icon: "animals",    cls: "c7"  },
  { id: "fruits",     label: "Mevalar",             icon: "fruits",     cls: "c8"  },
  { id: "nature",     label: "Tabiat",              icon: "nature",     cls: "c9"  },
  { id: "transport",  label: "Transport",           icon: "transport",  cls: "c10" },
  { id: "quiz",       label: "Quiz",                icon: "quiz",       cls: "c11" }
];

/* ---------------- OVOZ (SpeechSynthesis) ---------------- */

function speak(text){
  try{
    if(!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'uz-UZ';
    utter.rate = 0.9;
    utter.pitch = 1.05;
    const voices = window.speechSynthesis.getVoices();
    const uzVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith('uz'));
    if(uzVoice) utter.voice = uzVoice;
    window.speechSynthesis.speak(utter);
  }catch(e){ /* ovoz mavjud bo'lmasa jim o'tkazamiz */ }
}
if('speechSynthesis' in window){
  window.speechSynthesis.onvoiceschanged = () => {};
}

/* ---------------- NAVIGATSIYA ---------------- */

const state = {
  currentView: 'home',
  history: [],
  quiz: null
};

function $(sel, root=document){ return root.querySelector(sel); }
function $all(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }
function el(tag, attrs={}, ...children){
  const node = document.createElement(tag);
  for(const [k,v] of Object.entries(attrs)){
    if(k === 'class') node.className = v;
    else if(k === 'html') node.innerHTML = v;
    else if(k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v);
  }
  children.flat().forEach(c => {
    if(c === null || c === undefined) return;
    node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return node;
}

function showView(viewId, opts={}){
  $all('.view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById(`view-${viewId}`);
  if(target) target.classList.add('active');
  state.currentView = viewId;
  document.getElementById('main-scroll').scrollTop = 0;
  updateBackButton();
  updateBottomNav();
  if(!opts.silentHistory){
    state.history.push(viewId);
  }
}

function goBack(){
  state.history.pop();
  const prev = state.history.pop() || 'home';
  navigateTo(prev, true);
}

function updateBackButton(){
  const btn = document.getElementById('back-btn');
  btn.style.visibility = (state.currentView === 'home') ? 'hidden' : 'visible';
}

function updateBottomNav(){
  const map = { home: 'nav-home', lessons: 'nav-lessons', quiz: 'nav-quiz', ranking: 'nav-ranking' };
  $all('.nav-btn').forEach(b => b.classList.remove('active'));
  let key = null;
  if(state.currentView === 'home') key = 'home';
  else if(state.currentView === 'quiz-run' || state.currentView === 'quiz-result') key = 'quiz';
  else if(state.currentView === 'ranking') key = 'ranking';
  else key = 'lessons';
  const activeBtn = document.getElementById(map[key]);
  if(activeBtn) activeBtn.classList.add('active');
}

/* ---------------- SAHIFA SARLAVHASI ---------------- */

function setTitle(text){
  document.getElementById('screen-title').textContent = text;
}

/* ---------------- BOSH SAHIFA ---------------- */

function renderHome(){
  const grid = document.getElementById('home-grid');
  grid.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const card = el('button', { class: `cat-card ${cat.cls}`, onclick: () => openCategory(cat.id) },
      el('img', { src: `assets/icons/${cat.icon}.svg`, alt: '', width: 56, height: 56 }),
      el('span', { class: 'cat-label' }, cat.label)
    );
    grid.appendChild(card);
  });
}

function openCategory(id){
  if(id === 'quiz'){ startQuiz(); return; }
  const opener = CATEGORY_OPENERS[id];
  if(opener) opener();
}

/* ---------------- KATEGORIYA SAHIFALARI ---------------- */

function paletteClass(i){ return `p${i % 7}`; }

function renderTileGrid(containerId, items, opts){
  const wrap = document.getElementById(containerId);
  wrap.innerHTML = '';
  const grid = el('div', { class: 'item-grid' });
  items.forEach(item => {
    const label = opts.tileLabel(item);
    const sub = opts.tileSub ? opts.tileSub(item) : null;
    const style = opts.tileStyle ? opts.tileStyle(item) : '';
    const cls = opts.swatch ? 'yarn-tile swatch' : `yarn-tile ${paletteClass(item.pal ?? 0)}`;
    const tile = el('button', { class: cls, style, onclick: () => opts.onOpen(item) },
      el('span', {}, label),
      sub ? el('small', {}, sub) : null
    );
    grid.appendChild(tile);
  });
  wrap.appendChild(grid);
}

function renderDetail(containerId, opts){
  const wrap = document.getElementById(containerId);
  wrap.innerHTML = '';
  const panel = el('div', { class: 'detail-panel' },
    opts.clockSvg ? el('div', { class: 'clock-face-wrap', html: opts.clockSvg }) : null,
    el('div', { class: 'big-glyph' }, opts.glyph),
    el('div', { class: 'big-word' }, opts.word),
    opts.sub ? el('div', { class: 'big-sub' }, opts.sub) : null,
    el('button', { class: 'speak-btn', onclick: () => speak(opts.speech) }, '🔊 Tinglash')
  );
  wrap.appendChild(panel);
}

/* ---- Harflar ---- */
function openLettersList(){
  setTitle('Harflar');
  renderTileGrid('letters-grid', LETTERS, {
    tileLabel: l => l.letter,
    onOpen: l => openLetterDetail(l)
  });
  navigateTo('cat-letters');
}
function openLetterDetail(l){
  setTitle(l.letter);
  renderDetail('letter-detail', {
    glyph: l.letter,
    word: `${l.letter} — ${l.word}`,
    speech: `${l.letter}. ${l.word}`
  });
  navigateTo('letter-detail-view');
  speak(`${l.letter}. ${l.word}`);
}

/* ---- Sonlar ---- */
function openNumbersList(){
  setTitle('Sonlar');
  renderTileGrid('numbers-grid', NUMBERS, {
    tileLabel: n => n.digit,
    onOpen: n => openNumberDetail(n)
  });
  navigateTo('cat-numbers');
}
function openNumberDetail(n){
  setTitle(n.digit);
  renderDetail('number-detail', {
    glyph: n.digit,
    word: n.word[0].toUpperCase() + n.word.slice(1),
    speech: n.word
  });
  navigateTo('number-detail-view');
  speak(n.word);
}

/* ---- Ranglar ---- */
function openColorsList(){
  setTitle('Ranglar');
  const wrap = document.getElementById('colors-grid');
  wrap.innerHTML = '';
  const grid = el('div', { class: 'item-grid' });
  COLORS.forEach(c => {
    const tile = el('button', {
      class: 'yarn-tile swatch',
      style: `background-color:${c.hex};`,
      onclick: () => openColorDetail(c)
    }, el('small', { style: c.hex === '#F7F5EE' || c.hex === '#F6C94B' ? 'color:#4a3626' : 'color:#fff;font-weight:800;' }, c.name));
    grid.appendChild(tile);
  });
  wrap.appendChild(grid);
  navigateTo('cat-colors');
}
function openColorDetail(c){
  setTitle(c.name);
  const wrap = document.getElementById('color-detail');
  wrap.innerHTML = '';
  const panel = el('div', { class: 'detail-panel' },
    el('div', { style: `width:110px;height:110px;border-radius:50%;background:${c.hex};margin:0 auto 14px;border:6px dashed rgba(255,255,255,0.7);box-shadow:0 5px 0 rgba(90,64,50,0.2);` }),
    el('div', { class: 'big-word' }, c.name),
    el('button', { class: 'speak-btn', onclick: () => speak(c.name) }, '🔊 Tinglash')
  );
  wrap.appendChild(panel);
  navigateTo('color-detail-view');
  speak(c.name);
}

/* ---- Geometrik shakllar ---- */
function shapeSVG(kind, color){
  const s = 90;
  switch(kind){
    case 'circle': return `<svg viewBox="0 0 100 100" width="${s}" height="${s}"><circle cx="50" cy="50" r="38" fill="${color}" stroke="#5A4032" stroke-width="4"/></svg>`;
    case 'triangle': return `<svg viewBox="0 0 100 100" width="${s}" height="${s}"><polygon points="50,12 88,86 12,86" fill="${color}" stroke="#5A4032" stroke-width="4" stroke-linejoin="round"/></svg>`;
    case 'square': return `<svg viewBox="0 0 100 100" width="${s}" height="${s}"><rect x="14" y="14" width="72" height="72" rx="8" fill="${color}" stroke="#5A4032" stroke-width="4"/></svg>`;
    case 'rect': return `<svg viewBox="0 0 100 100" width="${s}" height="${s}"><rect x="8" y="26" width="84" height="48" rx="8" fill="${color}" stroke="#5A4032" stroke-width="4"/></svg>`;
    case 'oval': return `<svg viewBox="0 0 100 100" width="${s}" height="${s}"><ellipse cx="50" cy="50" rx="42" ry="28" fill="${color}" stroke="#5A4032" stroke-width="4"/></svg>`;
    case 'star': return `<svg viewBox="0 0 100 100" width="${s}" height="${s}"><polygon points="50,8 61,38 93,38 67,57 77,88 50,69 23,88 33,57 7,38 39,38" fill="${color}" stroke="#5A4032" stroke-width="3.5" stroke-linejoin="round"/></svg>`;
    default: return '';
  }
}
const PALETTE_HEX = ['#F6B9CF','#F8D77E','#A9DED2','#A9CDF0','#D3B8F0','#F3AA82','#7FD6C9'];

function openShapesList(){
  setTitle('Geometrik shakllar');
  const wrap = document.getElementById('shapes-grid');
  wrap.innerHTML = '';
  const grid = el('div', { class: 'item-grid' });
  SHAPES.forEach(s => {
    const tile = el('button', { class: `yarn-tile ${paletteClass(s.pal)}`, onclick: () => openShapeDetail(s) },
      el('span', { html: shapeSVG(s.kind, '#fff') })
    );
    grid.appendChild(tile);
  });
  wrap.appendChild(grid);
  navigateTo('cat-shapes');
}
function openShapeDetail(s){
  setTitle(s.name);
  const wrap = document.getElementById('shape-detail');
  wrap.innerHTML = '';
  const panel = el('div', { class: 'detail-panel' },
    el('div', { html: shapeSVG(s.kind, PALETTE_HEX[s.pal]) }),
    el('div', { class: 'big-word' }, s.name),
    el('button', { class: 'speak-btn', onclick: () => speak(s.name) }, '🔊 Tinglash')
  );
  wrap.appendChild(panel);
  navigateTo('shape-detail-view');
  speak(s.name);
}

/* ---- Tana a'zolari ---- */
function openBodyList(){
  setTitle('Tana a’zolari');
  renderTileGrid('body-grid', BODY_PARTS, {
    tileLabel: b => b.emoji,
    tileSub: b => b.name,
    onOpen: b => openBodyDetail(b)
  });
  navigateTo('cat-body');
}
function openBodyDetail(b){
  setTitle(b.name);
  renderDetail('body-detail', { glyph: b.emoji, word: b.name, speech: b.name });
  navigateTo('body-detail-view');
  speak(b.name);
}

/* ---- Vaqt ---- */
function clockSVG(h, m){
  const minAngle = m * 6;
  const hourAngle = (h % 12) * 30 + m * 0.5;
  return `<svg viewBox="0 0 160 160" width="150" height="150">
    <circle cx="80" cy="80" r="66" fill="#FFFDF6" stroke="#D89A2C" stroke-width="8" stroke-dasharray="3 8"/>
    ${[...Array(12)].map((_,i)=>{
      const a = i*30*Math.PI/180;
      const x1 = 80+52*Math.sin(a), y1 = 80-52*Math.cos(a);
      const x2 = 80+60*Math.sin(a), y2 = 80-60*Math.cos(a);
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#8a5a2b" stroke-width="3" stroke-linecap="round"/>`;
    }).join('')}
    <line x1="80" y1="80" x2="${80+32*Math.sin(hourAngle*Math.PI/180)}" y2="${80-32*Math.cos(hourAngle*Math.PI/180)}" stroke="#5A4032" stroke-width="7" stroke-linecap="round"/>
    <line x1="80" y1="80" x2="${80+48*Math.sin(minAngle*Math.PI/180)}" y2="${80-48*Math.cos(minAngle*Math.PI/180)}" stroke="#E8799F" stroke-width="5" stroke-linecap="round"/>
    <circle cx="80" cy="80" r="6" fill="#5A4032"/>
  </svg>`;
}
function openTimeList(){
  setTitle('Vaqt');
  const wrap = document.getElementById('time-grid');
  wrap.innerHTML = '';
  const grid = el('div', { class: 'item-grid' });
  CLOCKS.forEach(c => {
    const tile = el('button', { class: `yarn-tile ${paletteClass(c.pal)}`, onclick: () => openClockDetail(c) },
      el('span', {}, c.label)
    );
    grid.appendChild(tile);
  });
  wrap.appendChild(grid);
  navigateTo('cat-time');
}
function openClockDetail(c){
  setTitle(c.label);
  const wrap = document.getElementById('clock-detail');
  wrap.innerHTML = '';
  const panel = el('div', { class: 'detail-panel' },
    el('div', { class: 'clock-face-wrap', html: clockSVG(c.h, c.m) }),
    el('div', { class: 'big-word' }, `Bu soat ${c.label} bo‘ldi`),
    el('div', { class: 'helper-text' }, 'Bu soat nechchi bo‘ldi? 🤔'),
    el('button', { class: 'speak-btn', onclick: () => speak(`Soat ${c.label.replace(':00','')}`) }, '🔊 Tinglash')
  );
  wrap.appendChild(panel);
  navigateTo('clock-detail-view');
}

/* ---- Umumiy emoji-ro'yxat generatori (Hayvonlar/Mevalar/Tabiat/Transport) ---- */
function makeEmojiSection(key, title, data){
  return {
    openList(){
      setTitle(title);
      renderTileGrid(`${key}-grid`, data, {
        tileLabel: it => it.emoji,
        tileSub: it => it.name,
        onOpen: it => this.openDetail(it)
      });
      navigateTo(`cat-${key}`);
    },
    openDetail(it){
      setTitle(it.name);
      renderDetail(`${key}-detail`, { glyph: it.emoji, word: it.name, speech: it.name });
      navigateTo(`${key}-detail-view`);
      speak(it.name);
    }
  };
}
const animalsSection    = makeEmojiSection('animals', 'Hayvonlar', ANIMALS);
const fruitsSection     = makeEmojiSection('fruits', 'Mevalar', FRUITS);
const natureSection     = makeEmojiSection('nature', 'Tabiat', NATURE);
const transportSection  = makeEmojiSection('transport', 'Transport', TRANSPORT);

/* ---------------- NAVIGATE ROUTER ---------------- */

/* Bosh sahifadagi kartochka bosilganda tegishli bo'limni ochadigan funksiyalar.
   Kalit — CATEGORIES ro'yxatidagi category.id bilan bir xil. */
const CATEGORY_OPENERS = {
  letters: openLettersList,
  numbers: openNumbersList,
  colors: openColorsList,
  shapes: openShapesList,
  body: openBodyList,
  time: openTimeList,
  animals: () => animalsSection.openList(),
  fruits: () => fruitsSection.openList(),
  nature: () => natureSection.openList(),
  transport: () => transportSection.openList()
};

function navigateTo(viewId, isBack=false){
  const openers = {
    home: () => { renderHome(); showView('home'); },
    'cat-letters': openLettersList,
    'cat-numbers': openNumbersList,
    'cat-colors': openColorsList,
    'cat-shapes': openShapesList,
    'cat-body': openBodyList,
    'cat-time': openTimeList,
    'cat-animals': () => animalsSection.openList(),
    'cat-fruits': () => fruitsSection.openList(),
    'cat-nature': () => natureSection.openList(),
    'cat-transport': () => transportSection.openList(),
    ranking: () => { renderRanking(); showView('ranking'); }
  };
  if(isBack && openers[viewId]){
    openers[viewId]();
    return;
  }
  showView(viewId);
}

/* ---------------- QUIZ ---------------- */

function buildQuestionBank(){
  const bank = [];
  LETTERS.forEach(l => bank.push({
    text: `“${l.word}” so‘zi qaysi harfdan boshlanadi?`,
    correct: l.letter,
    pool: LETTERS.map(x => x.letter),
    glyph: '🔤'
  }));
  NUMBERS.forEach(n => bank.push({
    text: `“${n.word}” soni raqamda qanday yoziladi?`,
    correct: n.digit,
    pool: NUMBERS.map(x => x.digit),
    glyph: '🔢'
  }));
  COLORS.forEach(c => bank.push({
    text: `Ekrandagi rang qanday nomlanadi?`,
    correct: c.name,
    pool: COLORS.map(x => x.name),
    glyph: '🎨',
    swatchHex: c.hex
  }));
  SHAPES.forEach(s => bank.push({
    text: `Bu qaysi shakl?`,
    correct: s.name,
    pool: SHAPES.map(x => x.name),
    glyph: shapeSVG(s.kind, '#F6B9CF')
  }));
  FRUITS.forEach(f => bank.push({
    text: `Bu qaysi meva?`,
    correct: f.name,
    pool: FRUITS.map(x => x.name),
    glyph: f.emoji
  }));
  ANIMALS.forEach(a => bank.push({
    text: `Bu qaysi hayvon?`,
    correct: a.name,
    pool: ANIMALS.map(x => x.name),
    glyph: a.emoji
  }));
  CLOCKS.forEach(c => bank.push({
    text: `Bu soat nechchi bo‘ldi?`,
    correct: c.label,
    pool: CLOCKS.map(x => x.label),
    glyph: clockSVG(c.h, c.m)
  }));
  return bank;
}

function shuffle(arr){
  const a = arr.slice();
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickOptions(correct, pool){
  const others = shuffle(pool.filter(p => p !== correct)).slice(0, 3);
  return shuffle([correct, ...others]);
}

function startQuiz(){
  const bank = shuffle(buildQuestionBank()).slice(0, 10);
  state.quiz = { questions: bank, index: 0, score: 0 };
  setTitle('Quiz');
  navigateTo('quiz-run');
  renderQuizQuestion();
}

function renderQuizQuestion(){
  const q = state.quiz;
  const wrap = document.getElementById('quiz-body');
  wrap.innerHTML = '';
  const question = q.questions[q.index];
  const options = pickOptions(question.correct, question.pool);

  wrap.appendChild(el('div', { class: 'quiz-progress' },
    el('span', {}, `Savol ${q.index + 1}/10`),
    el('span', {}, `⭐ Ball: ${q.score}/10`)
  ));

  const isSvgGlyph = typeof question.glyph === 'string' && question.glyph.trim().startsWith('<svg');
  const qCard = el('div', { class: 'quiz-question-card' },
    el('div', { class: 'qtext' }, question.text),
    question.swatchHex
      ? el('div', { style: `width:70px;height:70px;border-radius:50%;background:${question.swatchHex};margin:8px auto;border:5px dashed rgba(0,0,0,0.15);` })
      : el('div', { class: 'qglyph', html: isSvgGlyph ? question.glyph : '' }, isSvgGlyph ? null : question.glyph)
  );
  wrap.appendChild(qCard);

  const optWrap = el('div', { class: 'quiz-options' });
  options.forEach(opt => {
    const btn = el('button', { class: 'quiz-opt', onclick: (e) => answerQuiz(e.currentTarget, opt, question.correct) }, opt);
    optWrap.appendChild(btn);
  });
  wrap.appendChild(optWrap);
}

function answerQuiz(btnEl, chosen, correct){
  const allBtns = $all('.quiz-opt', btnEl.parentElement);
  allBtns.forEach(b => b.disabled = true);
  const isCorrect = chosen === correct;
  if(isCorrect){
    btnEl.classList.add('correct');
    state.quiz.score += 1;
    speak('To‘g‘ri javob!');
  } else {
    btnEl.classList.add('wrong');
    allBtns.forEach(b => { if(b.textContent === correct) b.classList.add('correct'); });
    speak('Keyingi safar to‘g‘ri bo‘ladi');
  }
  setTimeout(() => {
    state.quiz.index += 1;
    if(state.quiz.index >= state.quiz.questions.length){
      showQuizResult();
    } else {
      renderQuizQuestion();
    }
  }, 950);
}

function showQuizResult(){
  setTitle('Natija');
  navigateTo('quiz-result');
  const score = state.quiz.score;
  let msg, trophy;
  if(score >= 9){ msg = `${score}/10 — Ajoyib!`; trophy = '🏆'; }
  else if(score >= 7){ msg = `${score}/10 — Juda yaxshi!`; trophy = '🥇'; }
  else if(score >= 5){ msg = `${score}/10 — Yaxshi, davom eting!`; trophy = '🥈'; }
  else { msg = `${score}/10 — Yana mashq qilamiz!`; trophy = '💪'; }

  const wrap = document.getElementById('quiz-result-body');
  wrap.innerHTML = '';
  wrap.appendChild(el('div', { class: 'quiz-result' },
    el('div', { class: 'trophy' }, trophy),
    el('h2', {}, 'TABRIKLAYMIZ!'),
    el('p', {}, msg),
    el('div', { class: 'name-input-row' },
      el('input', { id: 'player-name', type: 'text', maxlength: '16', placeholder: 'Ismingizni kiriting' }),
    ),
    el('button', { class: 'primary-btn', style: 'margin-top:14px;width:100%;', onclick: () => submitRanking(score) }, '🏆 Reytingga qo‘shish'),
    el('button', { class: 'secondary-btn', onclick: () => startQuiz() }, '🔁 Qayta boshlash')
  ));
}

/* ---------------- REYTING (localStorage) ---------------- */

const RANK_KEY = 'bolajonlar_ranking_v1';

function loadRanking(){
  try{
    const raw = localStorage.getItem(RANK_KEY);
    return raw ? JSON.parse(raw) : [];
  }catch(e){ return []; }
}
function saveRanking(list){
  try{ localStorage.setItem(RANK_KEY, JSON.stringify(list)); }catch(e){ /* xotira to'liq bo'lishi mumkin */ }
}
function submitRanking(score){
  const input = document.getElementById('player-name');
  let name = (input && input.value || '').trim();
  if(!name) name = 'Mehmon';
  const list = loadRanking();
  list.push({ name: name.slice(0, 16), score, ts: Date.now() });
  list.sort((a, b) => b.score - a.score || a.ts - b.ts);
  saveRanking(list.slice(0, 10));
  setTitle('Reyting');
  navigateTo('ranking');
}

function renderRanking(){
  setTitle('Reyting');
  const list = loadRanking();
  const wrap = document.getElementById('ranking-body');
  wrap.innerHTML = '';
  if(list.length === 0){
    wrap.appendChild(el('div', { class: 'empty-note' }, '🧶 Hali hech kim quiz topshirmagan. Birinchi bo‘ling!'));
    return;
  }
  const medals = ['🥇','🥈','🥉'];
  const rows = el('div', { class: 'rank-list' });
  list.forEach((r, i) => {
    rows.appendChild(el('div', { class: 'rank-row' },
      el('span', { class: 'rank-medal' }, medals[i] || `${i + 1}`),
      el('span', { class: 'rank-name' }, r.name),
      el('span', { class: 'rank-score' }, `${r.score}/10`)
    ));
  });
  wrap.appendChild(rows);
}

/* ---------------- INIT ---------------- */

function initNav(){
  document.getElementById('back-btn').addEventListener('click', goBack);
  document.getElementById('nav-home').addEventListener('click', () => { setTitle('Bolajonlar'); navigateTo('home'); });
  document.getElementById('nav-lessons').addEventListener('click', () => { setTitle('Darslar'); navigateTo('home'); });
  document.getElementById('nav-quiz').addEventListener('click', () => startQuiz());
  document.getElementById('nav-ranking').addEventListener('click', () => { setTitle('Reyting'); navigateTo('ranking'); });
}

function init(){
  renderHome();
  initNav();
  showView('home', { silentHistory: true });
  state.history = ['home'];

  if('serviceWorker' in navigator){
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }
}

document.addEventListener('DOMContentLoaded', init);
