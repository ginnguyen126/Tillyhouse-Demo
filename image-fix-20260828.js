(()=>{
  const version='20260829c';
  const refresh=(root=document)=>{
    root.querySelectorAll?.('img[src*="coffee-americano"],img[data-product="americano"]').forEach(img=>{
      if(img.dataset.tillyAmericano===version) return;
      img.dataset.tillyAmericano=version;
      img.src='/assets/coffee-americano-20260829.webp?v='+version;
      img.removeAttribute('srcset');
      img.decoding='async';
      img.onerror=null;
    });

    root.querySelectorAll?.('img[src*="coffee-bacxiu.webp"]').forEach(img=>{
      try{
        const u=new URL(img.getAttribute('src'),location.origin);
        if(u.searchParams.get('v')!==version){u.searchParams.set('v',version);img.src=u.pathname+u.search;}
        img.decoding='async';
      }catch(e){}
    });
  };

  const run=()=>refresh(document);
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run,{once:true}); else run();
  const observer=new MutationObserver(records=>records.forEach(r=>r.addedNodes.forEach(n=>{if(n.nodeType===1){refresh(n.matches?.('img') ? n.parentElement||document : n)}})));
  observer.observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener('load',run,{once:true});
})();
