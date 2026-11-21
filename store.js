const SUPA = "https://grrotfpoalxvkkrkgzpg.supabase.co";
const KEY = "sb_publishable_rHcD1gDpdwT5jT1CscnGGA_2rV8baSw";
const BASE = "https://shoplinkng.shop";
const H = { apikey: KEY, Authorization: "Bearer " + KEY, "Content-Type": "application/json" };

const esc = (s) =>
  String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* replace the content="" of one <meta> tag, e.g. setTag(html, "property", "og:title", "Hello") */
function setTag(html, attr, name, value) {
  const re = new RegExp('(<meta[^>]*' + attr + '="' + name + '"[^>]*content=")[^"]*(")', "i");
  return html.replace(re, (_, a, b) => a + esc(value) + b);
}

module.exports = async (req, res) => {
  const slug = String(req.query.slug || "").replace(/\.html$/, "").toLowerCase();
  const pid = req.query.p ? String(req.query.p) : "";

  /* the normal store page (static file, so the rewrite does not loop) */
  let html = await (await fetch(BASE + "/store.html")).text();

  try {
    const vr = await fetch(
      SUPA + "/rest/v1/vendors?slug=eq." + encodeURIComponent(slug) + "&select=store_name,description,city,logo_url&limit=1",
      { headers: H }
    );
    const vendor = (await vr.json())[0];

    if (vendor) {
      let title = vendor.store_name + " – ShopLink NG";
      let desc = vendor.description || "Shop " + vendor.store_name + " online and send your order on WhatsApp.";
      let img = vendor.logo_url;
      let url = BASE + "/" + slug;

      /* product link: /store-name?p=PRODUCT_ID */
      if (pid) {
        const pr = await fetch(SUPA + "/rest/v1/rpc/store_products", {
          method: "POST",
          headers: H,
          body: JSON.stringify({ p_slug: slug }),
        });
        const list = await pr.json();
        const p = (Array.isArray(list) ? list : []).find((x) => String(x.id) === pid);
        if (p) {
          title = p.name + " – " + vendor.store_name;
          desc = (p.description || p.name) + " · ₦" + Number(p.price).toLocaleString("en-NG");
          img = p.image_url || img;
          url += "?p=" + encodeURIComponent(pid);
        }
      }
      desc = desc.replace(/\s+/g, " ").slice(0, 155);

      html = html.replace(/<title>[^<]*<\/title>/, () => "<title>" + esc(title) + "</title>");
      html = setTag(html, "name", "description", desc);
      html = setTag(html, "property", "og:title", title);
      html = setTag(html, "property", "og:description", desc);
      html = setTag(html, "property", "og:url", url);
      html = setTag(html, "name", "twitter:title", title);
      html = setTag(html, "name", "twitter:description", desc);
      html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, (_, a, b) => a + esc(url) + b);

      if (img) {
        html = setTag(html, "property", "og:image", img);
        html = setTag(html, "name", "twitter:image", img);
        /* the fallback's 1200x630 size, type and alt no longer match this image */
        html = html.replace(/<meta property="og:image:(width|height|type|alt)"[^>]*>\n?/g, "");
      }
    }
  } catch (e) {
    /* on any error, serve the fallback page */
  }

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
  res.status(200).send(html);
};
