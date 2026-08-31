(()=>{
  const officialImages={
    'AMERICANO':'/assets/menu/coffee/americano.webp',
    'BẠC XỈU':'/assets/menu/coffee/bac-xiu.webp',
    'CÀ PHÊ MẬT ONG':'/assets/menu/coffee/honey-latte.webp',
    'CÀ PHÊ 0°C':'/assets/menu/coffee/kori-kohi.webp',
    'CÀ PHÊ SỮA TƯƠI':'/assets/menu/coffee/coffee-latte.webp',
    'CÀ PHÊ SỮA':'/assets/menu/coffee/vietnamese-milk-coffee.webp',
    'CÀ PHÊ THANH YÊN':'/assets/menu/coffee/yuzu-espresso.webp',
    'CÀ PHÊ ĐEN':'/assets/menu/coffee/vietnamese-black-coffee.webp',
    'HOUJICHA CHUỐI':'/assets/menu/houjicha/banana.webp',
    'HOUJICHA SỮA':'/assets/menu/houjicha/cold-whisked.webp',
    'HOUJICHA TRÀ BÁ TƯỚC':'/assets/menu/houjicha/earl-grey.webp',
    'HOUJICHA PUDDING CHUỐI':'/assets/menu/houjicha/pudding-banana.webp',
    'TRÀ DÂU ỔI BASIL':'/assets/menu/tea-cacao/straw-guava-basil.webp',
    'TRÀ ĐÀO THANH YÊN':'/assets/menu/tea-cacao/yuzu-peach.webp',
    'CHOCOLATE NÓNG/LẠNH':'/assets/menu/tea-cacao/cacao.webp'
  };
  const imageFor=name=>officialImages[name]||(typeof productImages!=='undefined'?productImages[name]:null);
  const originalShowProduct=window.showProduct;
  if(typeof originalShowProduct==='function'){
    window.showProduct=(i)=>{
      originalShowProduct(i);
      const p=typeof menuData!=='undefined'?menuData[i]:null;
      const im=document.querySelector('#modalImage');
      const src=p?imageFor(p[1]):null;
      if(im){im.hidden=!src;if(src){im.src=src+'?v=20260831-houjicha-tea';im.alt=p[1]+' at Tilly House';im.removeAttribute('srcset')}}
    };
  }
  const renderMenuV3=(cat='Coffee')=>{
    const grid=document.querySelector('#menuGrid'),cats=document.querySelector('#menuCats');
    if(!grid||!cats||typeof menuData==='undefined')return;
    const categories=['Matcha','Houjicha','Tea & Cacao','Coffee','Pastries','Combo','Extras'];
    cats.innerHTML=categories.map(c=>`<button type="button" class="${c===cat?'active':''}" onclick="renderMenu('${c.replaceAll("'","\\'")}')">${c}</button>`).join('');
    let items=menuData.map((x,i)=>({x,i})).filter(o=>o.x[0]===cat);
    if(cat==='Coffee'){
      const priority=['AMERICANO','BẠC XỈU','CÀ PHÊ SỮA','CÀ PHÊ ĐEN','CÀ PHÊ 0°C','CÀ PHÊ THANH YÊN','CÀ PHÊ SỮA TƯƠI','CÀ PHÊ MẬT ONG'];
      items.sort((a,b)=>priority.indexOf(a.x[1])-priority.indexOf(b.x[1]));
    }
    grid.innerHTML=items.map(o=>{
      const img=imageFor(o.x[1]);
      return `<article class="menu-item${img?' has-image':''}"><div class="menu-visual">${img?`<img class="menu-thumb" src="${img}?v=20260831-houjicha-tea" alt="${o.x[2]} at Tilly House" loading="lazy" decoding="async" data-product-name="${o.x[1]}">`:''}</div><div class="menu-item-body"><div class="eyebrow">${o.x[0]}</div><h3>${o.x[1]}</h3><div class="en">${o.x[2]}</div><div class="menu-item-foot"><b>${fmt(o.x[3])}</b><button type="button" class="round-add" aria-label="Customize and add ${o.x[1]}" onclick="showProduct(${o.i})">+</button></div></div></article>`;
    }).join('');
  };
  window.renderMenu=renderMenuV3;
  document.addEventListener('DOMContentLoaded',()=>{
    if(document.body.classList.contains('menu-page'))renderMenuV3('Coffee');
  });
})();
