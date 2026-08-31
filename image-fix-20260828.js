(()=>{
  const prepare=(root=document)=>{
    root.querySelectorAll?.('.menu-thumb,#modalImage').forEach(img=>{
      img.decoding='async';
      img.removeAttribute('srcset');
    });
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>prepare(document),{once:true});
  else prepare(document);
})();
