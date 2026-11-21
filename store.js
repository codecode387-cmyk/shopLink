const SUPA = "https://grrotfpoalxvkkrkgzpg.supabase.co";
const KEY = "sb_publishable_rHcD1gDpdwT5jT1CscnGGA_2rV8baSw";
const SITE = "https://www.shoplinkng.shop"; /* your real address: shoplinkng.shop redirects to www */
const H = { apikey: KEY, Authorization: "Bearer " + KEY, "Content-Type": "application/json" };

const esc = (s) =>
  String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* replace the content="" of one <meta> tag */
function setTag(html, attr, name, value) {
  const re = new RegExp('(<meta[^>]*' + attr + '="' + name + '"[^>]*content=")[^"]*(")', "i");
  return html.replace(re, (_, a, b) => a + esc(value) + b);
}

module.exports = async (req, res) => {
  const slug = String(req.query.slug || "").replace(/\.html$/, "").toLowerCase();
  const pid = req.query.p ? String(req.query.p) : "";
  const host = req.headers["x-forwarded-host"] || req.headers.host || "www.shoplinkng.shop";
  let debug = "start";

  /* read the store page from this same deployment (no redirect to www needed) */
  let html;
  try {
    const r = await fetch("https://" + host + "/store.html", { redirect: "follow" });
    if (!r.ok) throw new Error("page-" + r.status);
    html = await r.text();
    debug = "page-" + r.status;
  } catch (e) {
    res.statusCode = 302;
    res.setHeader("Location", "/store.html" + (slug ? "?s=" + encodeURIComponent(slug) : ""));
    return res.end();
  }

  try {
    const vr = await fetch(
      SUPA + "/rest/v1/vendors?slug=eq." + encodeURIComponent(slug) + "&select=store_name,description,city,logo_url&limit=1",
      { headers: H }
    );
    const rows = await vr.json();
    const vendor = Array.isArray(rows) ? rows[0] : null;
    debug += vendor ? "|vendor-ok" : "|vendor-none";

    if (vendor) {
      let title = vendor.store_name + " – ShopLink NG";
      let desc = vendor.description || "Shop " + vendor.store_name + " online and send your order on WhatsApp.";
      let img = vendor.logo_url;
      let url = SITE + "/" + slug;

      if (pid) {
        const pr = await fetch(SUPA + "/rest/v1/rpc/store_products", {
          method: "POST", headers: H, body: JSON.stringify({ p_slug: slug })
        });
        const list = await pr.json();
        const p = (Array.isArray(list) ? list : []).find((x) => String(x.id) === pid);
        debug += p ? "|product-ok" : "|product-none";
        if (p) {
          title = p.name + " – " + vendor.store_name;
          desc = (p.description || p.name) + " · ₦" + Number(p.price).toLocaleString("en-NG");
          img = p.image_url || img;
          url += "?p=" + encodeURIComponent(pid);
        }
      }
      desc = desc.replace(/\s+/g, " ").slice(0, 155);
      if (img && !/^https?:\/\//i.test(img)) img = SITE + "/" + String(img).replace(/^\//, "");

      html = html.replace(/<title>[^<]*<\/title>/, () => "<title>" + esc(title) + "</title>");
      html = setTag(html, "name", "description", desc);
      html = setTag(html, "property", "og:title", title);
      html = setTag(html, "property", "og:description", desc);
      html = setTag(html, "property", "og:url", url);
      html = setTag(html, "name", "twitter:title", title);
      html = setTag(html, "name", "twitter:description", desc);
      html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, (_, a, b) => a + esc(url) + b);

      if (img) {
        /* run the photo through /api/og so it is a small JPEG that WhatsApp accepts */
        const ogImg = SITE + "/api/og?u=" + encodeURIComponent(img);
        html = setTag(html, "property", "og:image", ogImg);
        html = setTag(html, "name", "twitter:image", ogImg);
        html = setTag(html, "property", "og:image:type", "image/jpeg");
        html = setTag(html, "property", "og:image:width", "1200");
        html = setTag(html, "property", "og:image:height", "630");
        html = setTag(html, "property", "og:image:alt", title);
        debug += "|img-set";
      } else debug += "|no-image";
    }
  } catch (e) {
    debug += "|error-" + String(e && e.message).slice(0, 60);
  }

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
  res.setHeader("X-Preview-Debug", debug);
  res.status(200).send(html);
};
