const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
module.exports = async (req, res) => {
  try {
    const f = String((req.query && req.query.f) || '01').replace(/[^0-9]/g, '').padStart(2, '0');
    const file = path.join(process.cwd(), 'asset-inspect', `${f}.webp`);
    if (!fs.existsSync(file)) return res.status(404).json({ error: 'missing' });
    const data = await sharp(file).resize(96, 96, { fit: 'cover' }).jpeg({ quality: 35, chromaSubsampling: '4:2:0' }).toBuffer();
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({ mime: 'image/jpeg', data: data.toString('base64') });
  } catch (e) {
    res.status(500).json({ error: String(e && e.message || e) });
  }
};
