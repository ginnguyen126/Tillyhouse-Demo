(()=>{
  const version='20260828c';
  const refresh=(root=document)=>{
    root.querySelectorAll?.('img[src*="/assets/coffee-americano.webp"],img[src*="/assets/coffee-bacxiu.webp"]').forEach(img=>{
      try{
        const u=new URL(img.getAttribute('src'),location.origin);
        if(u.searchParams.get('v')!==version){u.searchParams.set('v',version);img.src=u.pathname+u.search;}
        img.decoding='async';
      }catch(e){}
    });
  };
  refresh();
  const observer=new MutationObserver(records=>records.forEach(r=>r.addedNodes.forEach(n=>{if(n.nodeType===1){if(n.matches?.('img'))refresh(n.parentElement||document);else refresh(n)}})));
  observer.observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener('load',refresh,{once:true});
})();
