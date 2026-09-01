(()=>{
  const canonicalMatcha=[
    ['Matcha','MATCHA DÂU DỪA','Matcha Coconut Strawberry',85,'85K'],
    ['Matcha','MATCHA KHOAI LANG TÍM','Ube Matcha',85,'85K'],
    ['Matcha','MATCHA DƯA HẤU','Watermelon Matcha',85,'85K'],
    ['Matcha','MATCHA CHUỐI','Banana Matcha',79,'79K'],
    ['Matcha','MATCHA TRÀ BÁ TƯỚC','Earl Grey Matcha',85,'85K'],
    ['Matcha','MATCHA SỮA','Latte/Cold-whisked Matcha',75,'75K'],
    ['Matcha','MATCHA TRUYỀN THỐNG','Usucha',75,'75K / 85K'],
    ['Matcha','MATCHA BỒNG BỀNH','Cloudy Matcha',85,'85K'],
    ['Matcha','MATCHA PUDDING CHUỐI','Banana Pudding Matcha',85,'85K']
  ];

  if(typeof menuData!=='undefined'){
    const nonMatcha=menuData.filter(x=>x[0]!=='Matcha');
    menuData.splice(0,menuData.length,...canonicalMatcha,...nonMatcha);
  }

  const officialImages={
    'MATCHA DÂU DỪA':'/api/matcha-image?key=coco-straw',
    'MATCHA KHOAI LANG TÍM':'/api/matcha-image?key=ube',
    'MATCHA DƯA HẤU':'/api/matcha-image?key=watermelon',
    'MATCHA CHUỐI':'/api/matcha-image?key=banana',
    'MATCHA TRÀ BÁ TƯỚC':'/api/matcha-image?key=earl-grey',
    'MATCHA SỮA':'/api/matcha-image?key=latte',
    'MATCHA TRUYỀN THỐNG':'/api/matcha-image?key=usucha',
    'MATCHA BỒNG BỀNH':'/api/matcha-image?key=cloud',
    'MATCHA PUDDING CHUỐI':'/api/matcha-image?key=pudding',
    'AMERICANO':'/assets/menu/coffee/americano.webp',
    'BẠC XỈU':'/assets/menu/coffee/bac-xiu.webp',
    'CÀ PHÊ MẬT ONG':'/assets/menu/coffee/honey-latte.webp',
    'CÀ PHÊ 0°C':'/assets/menu/coffee/kori-kohi.webp',
    'CÀ PHÊ SỮA TƯƠI':'/assets/menu/coffee/coffee-latte.webp',
    'CÀ PHÊ SỮA':'/assets/menu/coffee/vietnamese-milk-coffee.webp',
    'CÀ PHÊ THANH YÊN':'/assets/menu/coffee/yuzu-espresso.webp',
    'CÀ PHÊ ĐEN':'/assets/menu/coffee/vietnamese-black-coffee.webp',
    'HOUJICHA CHUỐI':'/api/menu-image-v3?key=banana',
    'HOUJICHA SỮA':'/api/menu-image?key=cold-whisked',
    'HOUJICHA TRÀ BÁ TƯỚC':'/api/menu-image?key=earl-grey',
    'HOUJICHA PUDDING CHUỐI':'/api/menu-image?key=pudding-banana',
    'TRÀ DÂU ỔI BASIL':'/api/menu-image?key=straw-guava-basil',
    'TRÀ ĐÀO THANH YÊN':'/api/menu-image?key=yuzu-peach',
    'CHOCOLATE NÓNG/LẠNH':'/api/menu-image-v3?key=cacao'
  };

  const secondaryImages={
    'MATCHA DÂU DỪA':'/api/matcha-image?key=coconut',
    'MATCHA SỮA':'/api/matcha-image?key=coldwhisked'
  };

  const imageFor=name=>officialImages[name]||(typeof productImages!=='undefined'?productImages[name]:null);
  const versioned=src=>src?src+(src.includes('?')?'&':'?')+'v=20260901-matcha-original-v5':src;
  const priceLabel=x=>x&&x[4]?x[4]:fmt(x[3]);
  const originalShowProduct=window.showProduct;

  if(typeof originalShowProduct==='function'){
    window.showProduct=(i)=>{
      originalShowProduct(i);
      const p=typeof menuData!=='undefined'?menuData[i]:null;
      const im=document.querySelector('#modalImage');
      const src=p?imageFor(p[1]):null;
      if(im){
        im.hidden=!src;
        if(src){
          im.src=versioned(src);
          im.alt=p[2]+' at Tilly House';
          im.removeAttribute('srcset');
        }
      }
    };
  }

  const renderMenuV4=(cat='Matcha')=>{
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
      const img=imageFor(o.x[1]),secondary=secondaryImages[o.x[1]];
      const hover=secondary?` data-primary-src="${versioned(img)}" data-secondary-src="${versioned(secondary)}" onmouseenter="this.src=this.dataset.secondarySrc" onmouseleave="this.src=this.dataset.primarySrc"`:'';
      return `<article class="menu-item${img?' has-image':''}"><div class="menu-visual">${img?`<img class="menu-thumb" src="${versioned(img)}" alt="${o.x[2]} at Tilly House" loading="lazy" decoding="async" data-product-name="${o.x[1]}"${hover}>`:''}</div><div class="menu-item-body"><div class="eyebrow">${o.x[0]}</div><h3>${o.x[1]}</h3><div class="en">${o.x[2]}</div><div class="menu-item-foot"><b>${priceLabel(o.x)}</b><button type="button" class="round-add" aria-label="Customize and add ${o.x[1]}" onclick="showProduct(${o.i})">+</button></div></div></article>`;
    }).join('');
  };

  window.renderMenu=renderMenuV4;
  document.addEventListener('DOMContentLoaded',()=>{
    if(document.body.classList.contains('menu-page'))renderMenuV4('Matcha');
  });
})();
