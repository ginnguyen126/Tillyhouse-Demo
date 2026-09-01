const fs = require('fs');
const path = require('path');

const files = {
  'cold-whisked': 'assets/menu/houjicha/cold-whisked-data.txt',
  'earl-grey': 'assets/menu/houjicha/earl-grey-data.txt',
  'pudding-banana': 'assets/menu/houjicha/pudding-banana-data.txt',
  'straw-guava-basil': 'assets/menu/tea-cacao/straw-guava-basil-data.txt',
  'yuzu-peach': 'assets/menu/tea-cacao/yuzu-peach-data.txt'
};

module.exports = (req, res) => {
  try {
    const key = String((req.query && req.query.key) || '');
    const rel = files[key];
    if (!rel) return res.status(404).send('Image not found');
    const source = fs.readFileSync(path.join(process.cwd(), rel), 'utf8').trim();
    const data = Buffer.from(source, 'base64');
    if (data.length < 16 || data.toString('ascii', 0, 4) !== 'RIFF' || data.toString('ascii', 8, 12) !== 'WEBP') {
      return res.status(500).send('Invalid image payload');
    }
    res.setHeader('Content-Type', 'image/webp');
    res.setHeader('Content-Length', String(data.length));
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    return res.status(200).end(data);
  } catch (error) {
    return res.status(500).send('Image unavailable');
  }
};
