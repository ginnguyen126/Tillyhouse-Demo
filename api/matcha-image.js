const sharp=require('sharp');

const FILES={
  banana:'assets/menu/matcha-v4/banana.txt',
  cloud:'assets/menu/matcha-v4/cloud.txt',
  'coco-straw':'assets/menu/matcha-v4/coco-straw.txt',
  coconut:'assets/menu/matcha-v4/coconut.txt',
  coldwhisked:'assets/menu/matcha-v4/coldwhisked.txt',
  'earl-grey':'assets/menu/matcha-v4/earl-grey.txt',
  latte:'assets/menu/matcha-v4/latte.txt',
  pudding:'assets/menu/matcha-v4/pudding.txt',
  ube:'assets/menu/matcha-v4/ube.txt',
  usucha:'assets/menu/matcha-v4/usucha.txt',
  watermelon:'assets/menu/matcha-v4/watermelon.txt'
};

// Known visually broken/truncated source payloads get a safe image from the
// same uploaded Matcha set if strict decoding fails.
const FALLBACK={
  'earl-grey':'coldwhisked',
  cloud:'latte',
  pudding:'banana'
};

const SOURCE_REF='7020441eee682b8c8daf04cbc028e8aa269e9789';
const RAW_BASE=`https://raw.githubusercontent.com/ginnguyen126/Tillyhouse-Demo/${SOURCE_REF}/`;

async function sourceBuffer(key){
  const rel=FILES[key];
  if(!rel) throw new Error('unknown image key');
  const upstream=await fetch(RAW_BASE+rel,{headers:{'User-Agent':'TillyHouse-Matcha-Image'}});
  if(!upstream.ok) throw new Error('source image unavailable');
  const s=(await upstream.text()).replace(/\s+/g,'');
  const data=Buffer.from(s,'base64');
  if(data.length<1000||data.toString('ascii',0,4)!=='RIFF'||data.toString('ascii',8,12)!=='WEBP'){
    throw new Error('invalid webp payload');
  }
  return data;
}

async function render(key){
  const data=await sourceBuffer(key);
  // Strict decode rejects truncated/corrupt WebP instead of allowing browser
  // block artifacts. Re-encode to baseline JPEG for Safari/Brave reliability.
  return sharp(data,{failOn:'warning'})
    .rotate()
    .resize(1000,1000,{fit:'cover',position:'centre',withoutEnlargement:true})
    .jpeg({quality:90,mozjpeg:true,chromaSubsampling:'4:4:4'})
    .toBuffer();
}

module.exports=async(req,res)=>{
  const key=String(req.query&&req.query.key||'');
  if(!FILES[key]) return res.status(404).send('Not found');
  try{
    let out;
    try{
      out=await render(key);
    }catch(primaryError){
      const fallbackKey=FALLBACK[key];
      if(!fallbackKey) throw primaryError;
      console.warn('matcha image fallback',key,primaryError&&primaryError.message);
      out=await render(fallbackKey);
    }
    res.setHeader('Content-Type','image/jpeg');
    res.setHeader('Content-Length',String(out.length));
    res.setHeader('Cache-Control','public,max-age=3600,s-maxage=31536000,stale-while-revalidate=86400');
    return res.status(200).end(out);
  }catch(e){
    console.error('matcha-image',key,e);
    return res.status(500).send('Image unavailable');
  }
};
