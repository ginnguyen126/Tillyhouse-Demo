const fs = require('fs');
const path = require('path');
module.exports = (req, res) => {
  const f = String((req.query && req.query.f) || '01').replace(/[^0-9]/g, '').padStart(2, '0');
  const file = path.join(process.cwd(), 'asset-inspect', `${f}.webp`);
  if (!fs.existsSync(file)) return res.status(404).send('missing');
  const data = fs.readFileSync(file);
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).send(data.toString('base64'));
};
