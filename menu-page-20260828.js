(()=>{
  const renderMenuV2=(cat='Coffee')=>{
    const grid=document.querySelector('#menuGrid'),cats=document.querySelector('#menuCats');
    if(!grid||!cats||typeof menuData==='undefined')return;
    const categories=['Matcha','Houjicha','Tea & Cacao','Coffee','Pastries','Combo','Extras'];
    cats.innerHTML=categories.map(c=>`<button type="button" class="${c===cat?'active':''}" onclick="renderMenu('${c.replaceAll("'","\\'")}')">${c}</button>`).join('');
    let items=menuData.map((x,i)=>({x,i})).filter(o=>o.x[0]===cat);
    if(cat==='Coffee'){
      const priority=['AMERICANO','BẠC XỈU','CÀ PHÊ SỮA'];
      items.sort((a,b)=>{const ai=priority.indexOf(a.x[1]),bi=priority.indexOf(b.x[1]);return (ai<0?99:ai)-(bi<0?99:bi)});
    }
    grid.innerHTML=items.map(o=>{
      const img=productImages[o.x[1]];
      return `<article class="menu-item${img?' has-image':''}"><div class="menu-visual">${img?`<img class="menu-thumb" src="${img}?v=20260828c" alt="${o.x[2]} at Tilly House" loading="lazy" decoding="async">`:''}</div><div class="menu-item-body"><div class="eyebrow">${o.x[0]}</div><h3>${o.x[1]}</h3><div class="en">${o.x[2]}</div><div class="menu-item-foot"><b>${fmt(o.x[3])}</b><button type="button" class="round-add" aria-label="Customize and add ${o.x[1]}" onclick="showProduct(${o.i})">+</button></div></div></article>`;
    }).join('');
  };
  window.renderMenu=renderMenuV2;
  document.addEventListener('DOMContentLoaded',()=>{
    if(document.body.classList.contains('menu-page'))renderMenuV2('Coffee');
  });
})();
