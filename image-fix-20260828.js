(()=>{
  const version='20260829a';
  const americano='/assets/coffee-americano-20260829.svg';
  const refresh=(root=document)=>{
    root.querySelectorAll?.('img[src*="coffee-americano"],img[src*="coffee-bacxiu.webp"]').forEach(img=>{
      try{
        const current=img.getAttribute('src')||'';
        if(current.includes('coffee-americano')){
          if(!current.includes('coffee-americano-20260829.svg')) img.src=americano+'?v='+version;
        }else{
          const u=new URL(current,location.origin);
          if(u.searchParams.get('v')!==version){u.searchParams.set('v',version);img.src=u.pathname+u.search;}
        }
        img.decoding='async';
      }catch(e){}
    });
  };
  refresh();
  const observer=new MutationObserver(records=>records.forEach(r=>r.addedNodes.forEach(n=>{if(n.nodeType===1){if(n.matches?.('img'))refresh(n.parentElement||document);else refresh(n)}})));
  observer.observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener('load',refresh,{once:true});
})();
