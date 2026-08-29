(()=>{
  const version='20260829d';
  const refresh=(root=document)=>{
    root.querySelectorAll?.('img[src*="coffee-americano"],img[data-product="americano"]').forEach(img=>{
      if(img.dataset.tillyAmericano===version) return;
      img.dataset.tillyAmericano=version;
      img.src='/assets/coffee-americano-20260829.webp?v='+version;
      img.removeAttribute('srcset');
      img.decoding='async';
      img.onerror=null;
    });

    root.querySelectorAll?.('img[src*="coffee-bacxiu.webp"],img[data-product="bacxiu"],img[alt*="Bạc Xỉu"],img[alt*="Bac Xiu"]').forEach(img=>{
      if(img.dataset.tillyBacxiu===version) return;
      img.dataset.tillyBacxiu=version;
      img.src='/assets/coffee-bacxiu.webp?v='+version;
      img.removeAttribute('srcset');
      img.decoding='async';
      img.onerror=null;
    });
  };

  const run=()=>refresh(document);
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run,{once:true}); else run();
  const observer=new MutationObserver(records=>records.forEach(r=>r.addedNodes.forEach(n=>{if(n.nodeType===1){refresh(n.matches?.('img') ? n.parentElement||document : n)}})));
  observer.observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener('load',run,{once:true});
})();
