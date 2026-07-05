// Zámek scrollspy během programového scrollu (proti problikávání menu)
let spyLock = false, spyTimer;
function lockSpy(targetHref){
  spyLock = true;
  const navLinks = document.querySelectorAll('.topbar nav a[href^="#"]');
  navLinks.forEach(a=>a.classList.toggle('active', a.getAttribute('href') === targetHref));
  clearTimeout(spyTimer);
  const unlock = ()=>{ spyLock = false; removeEventListener('scroll', onScroll); };
  const onScroll = ()=>{ clearTimeout(spyTimer); spyTimer = setTimeout(unlock, 150); };
  addEventListener('scroll', onScroll, {passive:true});
  spyTimer = setTimeout(unlock, 1200); // pojistka
}

// Decode efekt na řádku nad nadpisem
function decodeText(el){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const finalText = el.textContent;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&/=';
  const t0 = performance.now(), dur = 1100;
  (function step(now){
    const p = Math.min((now - t0)/dur, 1);
    const fixed = Math.floor(finalText.length * p);
    el.textContent = finalText.slice(0, fixed) +
      [...finalText.slice(fixed)].map(ch => ch === ' ' ? ' ' : chars[Math.random()*chars.length|0]).join('');
    if(p < 1) requestAnimationFrame(step);
    else el.textContent = finalText;
  })(performance.now());
}
decodeText(document.querySelector('[data-i18n="eyebrow"]'));

// Logo v liště -> zpět nahoru
document.getElementById('brandHome').addEventListener('click', e=>{
  e.preventDefault();
  lockSpy(null);
  scrollTo({top:0, behavior:'smooth'});
});

// Plynulé scrollování na sekce
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    const target = document.querySelector(href);
    if(target){
      e.preventDefault();
      lockSpy(href);
      target.scrollIntoView({behavior:'smooth'});
    }
  });
});

// ===== PŘEKLADY CZ / EN =====
const I18N = {
  cs: {
    nav1:"Služby", nav_w:"Tvorba", nav2:"Platformy", nav3:"Kontakt",
    c5_h:"Upscale videí", c5_p:"Staré nebo rozmazané záběry proženu Topazem a vytáhnu z nich čisté 4K. Funguje to líp, než bys čekal.", c5_k:"Topaz Video · až 4K",
    up_h:"Upscale", u_b:"PŘED", u_a:"PO",
    up_p:"Potáhni posuvníkem a mrkni na ten rozdíl.",
    w_h:"Tvorba",
    w_p:"Ukázka přímo ze střižny. Víc videí najdeš na mých profilech níž.",
    eyebrow:"VIDEO EDITOR & DIGITÁLNÍ TVŮRCE",
    av:"OTEVŘENO PRO NOVÉ ZAKÁZKY", tags:"STŘIH · GRAFIKA · OBSAH · SPRÁVA SÍTÍ",
    cta1:"Napiš mi", cta2:"Kde mě najdeš ↓",
    st1:"let zkušeností", st2:"zhlédnutí", st3:"odpověď na poptávku",
    s_h:"Služby",
    c1_h:"YouTube videa", c1_p:"Klasická dlouhá videa. Pohlídám tempo, ať lidi neodkliknou po první minutě.",
    c2_p:"Rychlé střihy, titulky a hook hned v úvodu. Formát, který se dneska sleduje nejvíc.", c2_k:"9:16 · titulky · SFX",
    c3_h:"Motion & grafika", c3_p:"Intra, přechody, animované texty a efekty v After Effects, ať tvoje video nevypadá jako každé druhé.",
    c4_h:"Grafika", c4_p:"Thumbnaily, bannery a kompletní vizuál pro kanál nebo značku.",
    c6_h:"Správa sociálních sítí", c6_p:"Vezmu si na starost celý profil — plán obsahu, publikaci i konzistentní vizuál, aby sítě rostly.", c6_k:"IG · TikTok · YT",
    p_h:"Platformy",
    p_yt:"Sleduj mě na YouTube", p_ig:"Sleduj mě na Instagramu", p_tt:"Sleduj mě na TikToku",
    k_h1:"Máš materiál?", k_h2:"Pojď do toho.",
    k_p:"Napiš mi, co potřebuješ nastříhat — video, grafiku nebo celé sítě.",
    k_btn:"Napsat e-mail", k_note:"Odpovídám do 24 hodin.",
    f1:"© 2026 BeneG — video editor"
  },
  en: {
    nav1:"Services", nav_w:"My work", nav2:"Platforms", nav3:"Contact",
    c5_h:"Video upscaling", c5_p:"I run old or blurry footage through Topaz and pull clean 4K out of it. Works better than you'd expect.", c5_k:"Topaz Video · up to 4K",
    up_h:"Upscaling", u_b:"BEFORE", u_a:"AFTER",
    up_p:"Drag the slider and see the difference.",
    w_h:"My work",
    w_p:"A sample straight from the timeline. More videos on my profiles below.",
    eyebrow:"VIDEO EDITOR & DIGITAL CREATOR",
    av:"OPEN FOR NEW PROJECTS", tags:"EDITING · DESIGN · CONTENT · SOCIAL MEDIA",
    cta1:"Get in touch", cta2:"Where to find me ↓",
    st1:"years of experience", st2:"views", st3:"reply time",
    s_h:"Services",
    c1_h:"YouTube videos", c1_p:"Classic long-form videos. I keep the pacing tight so people don't click away after the first minute.",
    c2_p:"Fast cuts, captions and a hook right at the start. The format everyone watches these days.", c2_k:"9:16 · captions · SFX",
    c3_h:"Motion & graphics", c3_p:"Intros, transitions, animated text and After Effects work, so your video doesn't look like everyone else's.",
    c4_h:"Graphics", c4_p:"Thumbnails, banners and complete visuals for your channel or brand.",
    c6_h:"Social media management", c6_p:"I take care of the whole profile — content planning, publishing and a consistent look that helps it grow.", c6_k:"IG · TikTok · YT",
    p_h:"Platforms",
    p_yt:"Follow me on YouTube", p_ig:"Follow me on Instagram", p_tt:"Follow me on TikTok",
    k_h1:"Got footage?", k_h2:"Let's do this.",
    k_p:"Tell me what you need — a video, graphics or your whole socials.",
    k_btn:"Send an e-mail", k_note:"I reply within 24 hours.",
    f1:"© 2026 BeneG — video editor"
  }
};

function setLang(lang){
  const dict = I18N[lang];
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.dataset.i18n;
    if(dict[key] !== undefined) el.textContent = dict[key];
  });
  document.documentElement.lang = lang;
  document.title = lang === 'cs' ? 'BeneG — Video Editor' : 'BeneG — Video Editor';
  document.querySelectorAll('.lang-btn').forEach(b=>{
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  document.querySelector('.lang-switch').classList.toggle('en', lang === 'en');
  decodeText(document.querySelector('[data-i18n="eyebrow"]'));
}
document.querySelectorAll('.lang-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>setLang(btn.dataset.lang));
});





// Upscale — porovnávací slajdr + galerie více ukázek
// Sem přidávej svoje dvojice (stejný frame: pred = originál, po = po upscalu):
const BA_PAIRS = [
  { before: 'img/pred1.webp', after: 'img/po1.webp' },
  { before: 'img/pred2.webp', after: 'img/po2.webp' },
  { before: 'img/pred3.webp', after: 'img/po3.webp' },
  // další ukázku přidáš dalším řádkem, soubory patří do složky img/
];

(function(){
  const ba = document.getElementById('baSlider');
  if(!ba) return;
  const range = ba.querySelector('.ba-range');
  const imgB = document.getElementById('baImgBefore');
  const imgA = document.getElementById('baImgAfter');
  const count = document.getElementById('baCount');
  let idx = 0;

  function setPos(v){ ba.style.setProperty('--pos', v + '%'); }
  range.addEventListener('input', ()=>setPos(range.value));
  ba.addEventListener('pointermove', e=>{
    if(e.buttons !== 1 && e.pointerType === 'mouse') return;
    const r = ba.getBoundingClientRect();
    const v = Math.min(100, Math.max(0, (e.clientX - r.left) / r.width * 100));
    range.value = v; setPos(v);
  });

  function show(i){
    idx = (i + BA_PAIRS.length) % BA_PAIRS.length;
    imgB.src = BA_PAIRS[idx].before;
    imgA.src = BA_PAIRS[idx].after;
    count.textContent = String(idx+1).padStart(2,'0') + ' / ' + String(BA_PAIRS.length).padStart(2,'0');
    range.value = 50; setPos(50);
  }
  document.getElementById('baPrev').addEventListener('click', ()=>show(idx-1));
  document.getElementById('baNext').addEventListener('click', ()=>show(idx+1));

  // s jedinou ukázkou nemá přepínání smysl — schovat
  if(BA_PAIRS.length < 2){
    document.querySelector('.ba-nav').style.display = 'none';
  }

  // celá obrazovka
  const fullBtn = document.getElementById('baFull');
  fullBtn.addEventListener('click', ()=>{
    if(document.fullscreenElement){ document.exitFullscreen(); }
    else if(ba.requestFullscreen){ ba.requestFullscreen(); }
  });

  // přednačtení, ať přepínání neblikne
  BA_PAIRS.forEach(p=>{ new Image().src = p.before; new Image().src = p.after; });
  show(0);
})();

// Dopočítávání statistik
(function(){
  const nums = document.querySelectorAll('.stat-n');
  if(!nums.length) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      io.unobserve(e.target);
      const el = e.target;
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      if(reduce){ el.textContent = target + suffix; return; }
      const t0 = performance.now(), dur = 1600;
      (function step(now){
        const p = Math.min((now - t0)/dur, 1);
        const eased = 1 - Math.pow(1-p, 4);
        el.textContent = Math.round(target * eased) + suffix;
        if(p < 1) requestAnimationFrame(step);
      })(performance.now());
    });
  },{threshold:.6});
  nums.forEach(n=>io.observe(n));
})();

// Aktivní sekce v menu při scrollování
(function(){
  const links = [...document.querySelectorAll('.topbar nav a[href^="#"]')];
  const map = new Map();
  links.forEach(a=>{
    const sec = document.querySelector(a.getAttribute('href'));
    if(sec) map.set(sec, a);
  });
  const hero = document.querySelector('.hero');
  const spy = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting || spyLock) return;
      links.forEach(a=>a.classList.remove('active'));
      if(e.target !== hero) map.get(e.target)?.classList.add('active');
      // v hero (úplně nahoře) nesvítí nic
    });
  },{rootMargin:'-35% 0px -55% 0px'});
  map.forEach((_,sec)=>spy.observe(sec));
  if(hero) spy.observe(hero);
})();

// Šipka zpět nahoru
(function(){
  const btn = document.querySelector('.totop');
  addEventListener('scroll', ()=>{
    btn.classList.toggle('show', scrollY > 600);
  }, {passive:true});
  btn.addEventListener('click', ()=>{ lockSpy(null); scrollTo({top:0, behavior:'smooth'}); });
})();

// Render bar — průběh scrollu
(function(){
  const bar = document.querySelector('.renderbar');
  function upd(){
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
  }
  addEventListener('scroll', upd, {passive:true});
  upd();
})();

// Reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
  });
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
