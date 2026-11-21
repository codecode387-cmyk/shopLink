/* Shrinks any store logo / product photo to a light 1200x630 JPEG so WhatsApp, Facebook, X etc. will show it.
   Used by api/store.js:  /api/og?u=<encoded image url> */
module.exports = async (req, res) => {
  let target;
  try { target = new URL(String(req.query.u || "")); } catch (e) { return res.status(400).end("bad url"); }
  /* only allow images from your Supabase storage */
  if (target.protocol !== "https:" || !/\.supabase\.co$/.test(target.hostname)) return res.status(400).end("not allowed");

  try {
    const r = await fetch(target.href);
    if (!r.ok) throw new Error("fetch " + r.status);
    const input = Buffer.from(await r.arrayBuffer());
    const sharp = require("sharp");

    let out, q = 80;
    do {
      out = await sharp(input)
        .rotate()
        .flatten({ background: "#ffffff" })
        .resize(1200, 630, { fit: "contain", background: "#ffffff" })
        .jpeg({ quality: q, mozjpeg: true })
        .toBuffer();
      q -= 20;
    } while (out.length > 250 * 1024 && q >= 30);

    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=604800, immutable");
    res.status(200).send(out);
  } catch (e) {
    /* if resizing fails for any reason, hand over the original image */
    res.statusCode = 302;
    res.setHeader("Location", target.href);
    res.end();
  }
};
