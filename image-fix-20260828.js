(()=>{
  const VERSION='20260903-stable-v2';
  const FINAL_MATCHA={
    'MATCHA BỒNG BỀNH':'/assets/menu/matcha-final/cloud-20260903.jpg?v='+VERSION,
    'MATCHA PUDDING CHUỐI':'/assets/menu/matcha-final/pudding-banana-20260903.jpg?v='+VERSION,
    'MATCHA TRÀ BÁ TƯỚC':'/assets/menu/matcha-final/earl-grey-20260903.jpg?v='+VERSION
  };

  const prepareImages=(root=document)=>{
    root.querySelectorAll?.('.menu-thumb,#modalImage,.home-matcha-final img').forEach(img=>{
      img.decoding='async';
      img.removeAttribute('srcset');
    });
  };

  const injectHomeMatcha=()=>{
    if(!(location.pathname==='/'||location.pathname==='/index.html')||document.querySelector('.home-matcha-final'))return;
    const main=document.querySelector('main');
    if(!main)return;
    if(!document.querySelector('#home-matcha-final-style')){
      const style=document.createElement('style');
      style.id='home-matcha-final-style';
      style.textContent=`
        .home-matcha-final{padding:88px 0;background:#eef2e7}.home-matcha-final .hm-head{display:flex;justify-content:space-between;gap:30px;align-items:end;margin-bottom:28px}.home-matcha-final .hm-head p{max-width:460px;margin:0}.home-matcha-final .hm-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.home-matcha-final .hm-card{display:block;background:#fffdf8;border:1px solid #d8d0c4;border-radius:20px;overflow:hidden;color:inherit;text-decoration:none;transition:transform .22s ease,box-shadow .22s ease}.home-matcha-final .hm-card:hover{transform:translateY(-5px);box-shadow:0 18px 44px rgba(44,56,29,.11)}.home-matcha-final .hm-card img{display:block;width:100%;aspect-ratio:1/1;object-fit:cover;background:#e8eddf}.home-matcha-final .hm-copy{padding:20px 21px 22px}.home-matcha-final .hm-copy h3{margin:6px 0 4px;font:600 25px/1.05 var(--serif)}.home-matcha-final .hm-en{font-size:13px;color:#696b63}.home-matcha-final .hm-foot{display:flex;justify-content:space-between;align-items:center;margin-top:20px;font-weight:800}.home-matcha-final .hm-arrow{width:38px;height:38px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;background:#3A4A20;color:#fff}.home-matcha-final .hm-cta{margin-top:24px}@media(max-width:820px){.home-matcha-final{padding:62px 0}.home-matcha-final .hm-head{display:block}.home-matcha-final .hm-head p{margin-top:12px}.home-matcha-final .hm-grid{grid-template-columns:1fr}}`;
      document.head.appendChild(style);
    }
    const retry=`this.onerror=null;this.src=this.src.split('?')[0]+'?v='+Date.now()`;
    const html=`<section class="home-matcha-final"><div class="container"><div class="hm-head"><div><div class="eyebrow">Tilly Matcha · featured</div><h2 class="h2">Three cups<br>to slow down with.</h2></div><p class="muted">Three Matcha signatures from the current Tilly House menu, shown with their final product imagery.</p></div><div class="hm-grid"><a class="hm-card" href="/menu" aria-label="View Matcha Bồng Bềnh in the menu"><img src="${FINAL_MATCHA['MATCHA BỒNG BỀNH']}" alt="Matcha Bồng Bềnh at Tilly House" loading="lazy" decoding="async" onerror="${retry}"><div class="hm-copy"><div class="eyebrow">Matcha · 85K</div><h3>Matcha Bồng Bềnh</h3><div class="hm-en">Cloudy Matcha</div><div class="hm-foot"><span>Featured Matcha</span><span class="hm-arrow">→</span></div></div></a><a class="hm-card" href="/menu" aria-label="View Matcha Pudding Chuối in the menu"><img src="${FINAL_MATCHA['MATCHA PUDDING CHUỐI']}" alt="Matcha Pudding Chuối at Tilly House" loading="lazy" decoding="async" onerror="${retry}"><div class="hm-copy"><div class="eyebrow">Matcha · 85K</div><h3>Matcha Pudding Chuối</h3><div class="hm-en">Banana Pudding Matcha</div><div class="hm-foot"><span>Featured Matcha</span><span class="hm-arrow">→</span></div></div></a><a class="hm-card" href="/menu" aria-label="View Matcha Trà Bá Tước in the menu"><img src="${FINAL_MATCHA['MATCHA TRÀ BÁ TƯỚC']}" alt="Matcha Trà Bá Tước at Tilly House" loading="lazy" decoding="async" onerror="${retry}"><div class="hm-copy"><div class="eyebrow">Matcha · 85K</div><h3>Matcha Trà Bá Tước</h3><div class="hm-en">Earl Grey Matcha</div><div class="hm-foot"><span>Featured Matcha</span><span class="hm-arrow">→</span></div></div></a></div><p class="hm-cta"><a class="btn" href="/menu">Explore the full Matcha menu →</a></p></div></section>`;
    const coffeeBand=main.querySelector('.band');
    if(coffeeBand)coffeeBand.insertAdjacentHTML('beforebegin',html);else main.insertAdjacentHTML('beforeend',html);
  };

  const run=()=>{injectHomeMatcha();prepareImages(document);};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
  window.addEventListener('load',()=>prepareImages(document),{once:true});
})();
