const FILES = {
  'cold-whisked': 'assets/menu/houjicha/cold-whisked-data.txt',
  'earl-grey': 'assets/menu/houjicha/earl-grey-data.txt',
  'pudding-banana': 'assets/menu/houjicha/pudding-banana-data.txt',
  'straw-guava-basil': 'assets/menu/tea-cacao/straw-guava-basil-data.txt',
  'yuzu-peach': 'assets/menu/tea-cacao/yuzu-peach-data.txt'
};

const SOURCE_REF = '53270332ef0634615e08502e994c5dd28ee946da';
const RAW_BASE = `https://raw.githubusercontent.com/ginnguyen126/Tillyhouse-Demo/${SOURCE_REF}/`;

module.exports = async (req, res) => {
  try {
    const key = String((req.query && req.query.key) || '');
    const rel = FILES[key];
    if (!rel) return res.status(404).send('Image not found');

    const upstream = await fetch(RAW_BASE + rel, {
      headers: { 'User-Agent': 'TillyHouse-Vercel-Image-Proxy' }
    });
    if (!upstream.ok) return res.status(502).send('Source image unavailable');

    const source = (await upstream.text()).replace(/\s+/g, '');
    const data = Buffer.from(source, 'base64');
    const isWebp = data.length > 16 && data.toString('ascii', 0, 4) === 'RIFF' && data.toString('ascii', 8, 12) === 'WEBP';
    if (!isWebp) return res.status(500).send('Invalid image payload');

    res.setHeader('Content-Type', 'image/webp');
    res.setHeader('Content-Length', String(data.length));
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400');
    return res.status(200).end(data);
  } catch (error) {
    console.error('menu-image error', error);
    return res.status(500).send('Image unavailable');
  }
};
