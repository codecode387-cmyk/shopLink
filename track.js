/* Counts a visit to a public page. Add before </body> on index.html and other public pages:
   <script src="track.js" defer></script>  (once per browser per page per day).
   Do not add it to store.html, dashboard.html or admin.html. */
(function () {
  var page = (location.pathname.replace(/\/+$/, "") || "/home").slice(0, 60);
  try {
    var k = "sv:" + page + ":" + new Date().toISOString().slice(0, 10);
    if (localStorage.getItem(k)) return; localStorage.setItem(k, "1");
  } catch (e) {}
  fetch("https://grrotfpoalxvkkrkgzpg.supabase.co/rest/v1/rpc/record_site_visit", {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: "sb_publishable_rHcD1gDpdwT5jT1CscnGGA_2rV8baSw" },
    body: JSON.stringify({ p_page: page }), keepalive: true
  }).catch(function () {});
})();
