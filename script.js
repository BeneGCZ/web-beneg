// Plynulé scrollování na sekce
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const target = document.querySelector(a.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth'});
    }
  });
});

// ===== PŘEKLADY CZ / EN =====
const I18N = {
  cs: {
    nav1:"Střih", nav_w:"Tvorba", nav2:"Platformy", nav3:"Kontakt",
    c5_h:"Upscale videí", c5_p:"Staré nebo rozmazané záběry proženu Topazem a vytáhnu z nich čisté 4K. Funguje to líp, než bys čekal.", c5_k:"Topaz Video · až 4K",
    up_h:"Upscale — před a po", u_b:"PŘED", u_a:"PO",
    up_p:"Potáhni posuvníkem a mrkni na ten rozdíl.",
    w_h:"Ukázky tvorby",
    w_p:"Ukázka přímo ze střižny. Víc videí najdeš na mých profilech níž.",
    eyebrow:"VIDEO EDITOR / POST-PRODUKCE",
    h1a:"Střih. Motion.", h1b:"Upscale.",
    lead:"Jsem BeneG. Stříhám videa pro YouTube, Reels a TikTok — od surových záběrů po finální export. Všechno na mých profilech jsem si stříhal sám, takže přesně vidíš, co ode mě dostaneš.",
    cta1:"Napiš mi", cta2:"Kde mě najdeš ↓",
    s_h:"Co pro tebe nastříhám",
    c1_h:"YouTube videa", c1_p:"Klasická dlouhá videa. Pohlídám tempo, ať lidi neodkliknou po první minutě.",
    c2_p:"Rychlé střihy, titulky a hook hned v úvodu. Formát, který se dneska sleduje nejvíc.", c2_k:"9:16 · titulky · SFX",
    c3_h:"Motion & grafika", c3_p:"Intra, přechody, animované texty a efekty v After Effects, ať tvoje video nevypadá jako každé druhé.",
    c4_h:"Thumbnaily & grafika", c4_p:"Náhledy, na které se kliká, plus bannery a grafika na kanál.",
    p_h:"Kde působím",
    p_yt:"Sleduj mě na YouTube", p_ig:"Sleduj mě na Instagramu", p_tt:"Sleduj mě na TikToku",
    k_h1:"Máš materiál?", k_h2:"Pojď do toho.",
    k_p:"Napiš mi, co potřebuješ nastříhat, a ozvu se ti zpátky — většinou do 24 hodin.",
    f1:"© 2026 BeneG — video editor"
  },
  en: {
    nav1:"Editing", nav_w:"My work", nav2:"Platforms", nav3:"Contact",
    c5_h:"Video upscaling", c5_p:"I run old or blurry footage through Topaz and pull clean 4K out of it. Works better than you'd expect.", c5_k:"Topaz Video · up to 4K",
    up_h:"Upscaling — before & after", u_b:"BEFORE", u_a:"AFTER",
    up_p:"Drag the slider and see the difference.",
    w_h:"Selected work",
    w_p:"A sample straight from the timeline. More videos on my profiles below.",
    eyebrow:"VIDEO EDITOR / POST-PRODUCTION",
    h1a:"Editing. Motion.", h1b:"Upscaling.",
    lead:"I'm BeneG. I edit videos for YouTube, Reels and TikTok — from raw footage to final export. Everything on my profiles is my own editing, so you can see exactly what you'll get.",
    cta1:"Get in touch", cta2:"Where to find me ↓",
    s_h:"What I can cut for you",
    c1_h:"YouTube videos", c1_p:"Classic long-form videos. I keep the pacing tight so people don't click away after the first minute.",
    c2_p:"Fast cuts, captions and a hook right at the start. The format everyone watches these days.", c2_k:"9:16 · captions · SFX",
    c3_h:"Motion & graphics", c3_p:"Intros, transitions, animated text and After Effects work, so your video doesn't look like everyone else's.",
    c4_h:"Thumbnails & graphics", c4_p:"Thumbnails that get clicks, plus banners and channel graphics.",
    p_h:"Where you can find me",
    p_yt:"Follow me on YouTube", p_ig:"Follow me on Instagram", p_tt:"Follow me on TikTok",
    k_h1:"Got footage?", k_h2:"Let's do this.",
    k_p:"Tell me what you need edited and I'll get back to you — usually within 24 hours.",
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
}
document.querySelectorAll('.lang-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>setLang(btn.dataset.lang));
});





// Upscale — porovnávací slajdr + galerie více ukázek
// Sem přidávej svoje dvojice (stejný frame: pred = originál, po = po upscalu):
const BA_PAIRS = [
  { before: 'img/pred1.webp', after: 'img/po1.webp' },
  // další ukázky přidáš takhle (soubory dej do složky img/):
  // { before: 'img/pred2.webp', after: 'img/po2.webp' },
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

// Šipka zpět nahoru
(function(){
  const btn = document.querySelector('.totop');
  addEventListener('scroll', ()=>{
    btn.classList.toggle('show', scrollY > 600);
  }, {passive:true});
  btn.addEventListener('click', ()=>scrollTo({top:0, behavior:'smooth'}));
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
