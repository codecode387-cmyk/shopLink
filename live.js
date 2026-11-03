/* ShopLink NG live visitor signal.
   Add <script src="live.js" defer></script> to every PUBLIC page (home, store, signup, login, about...).
   Do NOT add it to admin.html or dashboard.html. */
(function () {
  var path = location.pathname;
  if (/(^|\/)(admin|dashboard)(\.html)?\/?$/.test(path)) return;

  var URL_ = "https://grrotfpoalxvkkrkgzpg.supabase.co";
  var KEY = "sb_publishable_rHcD1gDpdwT5jT1CscnGGA_2rV8baSw";

  function makeId() {
    return (window.crypto && crypto.randomUUID) ? crypto.randomUUID()
      : Math.random().toString(36).slice(2) + Date.now().toString(36) + Math.random().toString(36).slice(2);
  }
  var vid;
  try {
    vid = sessionStorage.getItem("sl_vid");
    if (!vid) { vid = makeId(); sessionStorage.setItem("sl_vid", vid); }
  } catch (e) { vid = makeId(); }

  function beat() {
    if (document.hidden) return;
    var store = window.SL_STORE || "";
    var page = store ? "/" + store : (path.replace(/index(\.html)?$/, "").replace(/\.html$/, "") || "/");
    fetch(URL_ + "/rest/v1/rpc/heartbeat", {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json", apikey: KEY },
      body: JSON.stringify({ p_vid: vid, p_kind: store ? "store" : "site", p_slug: store || null, p_page: page })
    }).catch(function () {});
  }

  setTimeout(beat, 1200);
  setInterval(beat, 25000);
  document.addEventListener("visibilitychange", function () { if (!document.hidden) beat(); });
})();
