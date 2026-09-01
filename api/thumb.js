const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
module.exports = async (req, res) => {
  try {
    const f = String((req.query && req.query.f) || '01').replace(/[^0-9]/g, '').padStart(2, '0');
    const file = path.join(process.cwd(), 'asset-inspect', `${f}.webp`);
    if (!fs.existsSync(file)) return res.status(404).json({ error: 'missing' });
    const { data, info } = await sharp(file).resize(24, 24, { fit: 'cover' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({ width: info.width, height: info.height, channels: info.channels, data: data.toString('base64') });
  } catch (e) {
    res.status(500).json({ error: String(e && e.message || e) });
  }
};
