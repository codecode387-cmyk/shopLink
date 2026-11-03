/* ShopLink NG analytics.
   Used by dashboard.html (vendor "Analytics" tab) and admin.html ("Live & orders" tab).
   Load it AFTER the Supabase script and BEFORE menu.js:
     <script src="analytics.js"></script>
*/
(function () {
  if (!window.supabase) return;
  var sb = window.supabase.createClient("https://grrotfpoalxvkkrkgzpg.supabase.co", "sb_publishable_rHcD1gDpdwT5jT1CscnGGA_2rV8baSw");
  var GREEN = "#16794a", MINT = "#2bb673", MAXDAYS = 30;

  /* ---------- helpers ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function esc(s) { var d = document.createElement("div"); d.textContent = s == null ? "" : s; return d.innerHTML; }
  function num(n) { return Number(n || 0).toLocaleString("en-NG"); }
  function naira(n) { return "₦" + num(Math.round(Number(n || 0))); }
  function short(n) { n = Number(n); return n >= 1e6 ? +(n / 1e6).toFixed(1) + "M" : n >= 1e3 ? +(n / 1e3).toFixed(1) + "k" : String(n); }
  function sum(a) { return a.reduce(function (x, y) { return x + Number(y || 0); }, 0); }
  function tail(a, n) { return a.slice(Math.max(0, a.length - n)); }
  function pad(a, n) { a = a.map(Number); while (a.length < n) a.unshift(0); return tail(a, n); }
  function dlabel(s) { var d = new Date(s + "T00:00:00"); return isNaN(d) ? String(s) : d.toLocaleDateString("en-NG", { day: "numeric", month: "short" }); }
  function stat(label, value, note) { return '<div class="stat"><span>' + label + "</span><b>" + value + "</b>" + (note ? "<small>" + note + "</small>" : "") + "</div>"; }

  /* ---------- SVG chart: type "line" (area) or "bar", with hover tooltip ---------- */
  function chart(box, labels, series, o) {
    o = o || {};
    var W = 640, H = 230, L = 40, R = 10, T = 12, B = 26, n = labels.length, bar = o.type === "bar";
    var mx = 1; series.forEach(function (s) { s.values.forEach(function (v) { if (v > mx) mx = v; }); });
    var st = 1, k = 0, m = [1, 2, 5];
    while (mx / st > 4) { k++; st = m[k % 3] * Math.pow(10, Math.floor(k / 3)); }
    var top = st * Math.ceil(mx / st), iw = W - L - R, sw = iw / Math.max(n, 1);
    function X(i) { return bar ? L + sw * (i + 0.5) : L + (n > 1 ? i * iw / (n - 1) : iw / 2); }
    function Y(v) { return T + (H - T - B) * (1 - v / top); }
    var g = "", t, i;
    for (t = 0; t <= top; t += st) g += '<line class="gl" x1="' + L + '" x2="' + (W - R) + '" y1="' + Y(t) + '" y2="' + Y(t) + '"/><text class="ax" x="' + (L - 6) + '" y="' + (Y(t) + 4) + '" text-anchor="end">' + short(t) + "</text>";
    var every = Math.ceil(n / 6);
    for (i = 0; i < n; i++) if ((n - 1 - i) % every === 0) g += '<text class="ax" x="' + X(i) + '" y="' + (H - 7) + '" text-anchor="middle">' + esc(labels[i]) + "</text>";
    series.forEach(function (s) {
      var c = s.color;
      if (bar) {
        var bw = Math.max(3, Math.min(34, sw * 0.62));
        s.values.forEach(function (v, j) { g += '<rect x="' + (X(j) - bw / 2) + '" y="' + Y(v) + '" width="' + bw + '" height="' + Math.max(v > 0 ? 2 : 0, (H - B) - Y(v)) + '" rx="3" fill="' + c + '"/>'; });
      } else {
        var pts = s.values.map(function (v, j) { return X(j).toFixed(1) + "," + Y(v).toFixed(1); });
        g += '<polygon points="' + X(0).toFixed(1) + "," + Y(0) + " " + pts.join(" ") + " " + X(n - 1).toFixed(1) + "," + Y(0) + '" fill="' + c + '" opacity=".12"/>' +
             '<polyline points="' + pts.join(" ") + '" fill="none" stroke="' + c + '" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>';
      }
    });
    box.innerHTML = '<div class="ch"><svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(o.label || "Chart") + '">' + g +
      '<line class="gd" y1="' + T + '" y2="' + (H - B) + '"/></svg><div class="tt"></div></div>';
    var svg = $("svg", box), tip = $(".tt", box), gd = $(".gd", box);
    function over(e) {
      var r = svg.getBoundingClientRect(), px = (e.clientX - r.left) / r.width * W;
      var j = bar ? Math.floor((px - L) / sw) : Math.round((px - L) / iw * (n - 1));
      j = Math.max(0, Math.min(n - 1, j));
      gd.setAttribute("x1", X(j)); gd.setAttribute("x2", X(j)); gd.style.opacity = 1;
      tip.innerHTML = "<b>" + esc(labels[j]) + "</b>" + series.map(function (s) {
        return '<span><i style="background:' + s.color + '"></i>' + esc(s.name) + ": " + (s.fmt || num)(s.values[j]) + "</span>";
      }).join("");
      tip.style.left = Math.min(Math.max(X(j) / W * r.width, 70), r.width - 70) + "px"; tip.style.opacity = 1;
    }
    svg.addEventListener("pointermove", over); svg.addEventListener("pointerdown", over);
    svg.addEventListener("pointerleave", function () { tip.style.opacity = 0; gd.style.opacity = 0; });
  }

  /* ---------- add a tab to the sidebar + a view in the page ---------- */
  function addTab(label, id, title) {
    var side = $(".side"), content = $(".content"), first = side && side.querySelector("button");
    if (!side || !content || !first) return null;
    var btn = document.createElement("button"); btn.type = "button"; btn.dataset.v = id; btn.textContent = label;
    first.insertAdjacentElement("afterend", btn);
    var view = document.createElement("section"); view.className = "view"; view.id = "v-" + id; content.appendChild(view);
    function open() {
      document.querySelectorAll(".view").forEach(function (s) { s.classList.toggle("on", s === view); });
      document.querySelectorAll(".side button").forEach(function (b) { b.classList.toggle("on", b === btn); });
      var h = document.getElementById("title"); if (h) h.textContent = title;
      window.scrollTo(0, 0);
    }
    btn.addEventListener("click", open);
    return { view: view, open: open };
  }

  /* ---------- range control: chips + custom number of days (1-30) ---------- */
  function rangeControl(box, start, onChange) {
    var days = start;
    box.innerHTML = [7, 14, 30].map(function (d) { return '<button type="button" class="chip" data-d="' + d + '">' + d + " days</button>"; }).join("") +
      '<label class="rin">Custom <input type="number" min="1" max="' + MAXDAYS + '" inputmode="numeric"> days</label>';
    var inp = $("input", box);
    function set(d, fromInput) {
      days = d; if (!fromInput) inp.value = d;
      box.querySelectorAll(".chip").forEach(function (c) { c.classList.toggle("on", +c.dataset.d === days); });
      onChange(days);
    }
    box.addEventListener("click", function (e) { var b = e.target.closest("[data-d]"); if (b) set(+b.dataset.d); });
    inp.addEventListener("input", function () { var v = parseInt(inp.value, 10); if (v >= 1 && v <= MAXDAYS) set(v, true); });
    inp.addEventListener("change", function () { set(Math.max(1, Math.min(MAXDAYS, parseInt(inp.value, 10) || start))); });
    set(start);
    return function () { return days; };
  }

  /* =====================================================
     VENDOR DASHBOARD: Analytics tab
     ===================================================== */
  function vendorModule() {
    var tab = addTab("Analytics", "analytics", "Analytics"); if (!tab) return;
    var root = tab.view, V = [], O = [], days = 7, loaded = false;
    root.innerHTML =
      '<div class="ahead"><div><h2 class="pt">Store analytics</h2><p class="sub">How many people visit your store and how many orders reach your WhatsApp.</p></div><div class="range" id="aRg"></div></div>' +
      '<div class="grid four" id="aK"></div>' +
      '<div class="card"><h3 class="ct">Visitors, last 30 days</h3><div id="aV"></div></div>' +
      '<div class="card"><h3 class="ct" id="aOt"></h3><div id="aO"></div></div>' +
      '<div class="card"><h3 class="ct">Day by day</h3><div class="tw"><table><thead><tr><th>Date</th><th>Visitors</th><th>Orders sent</th><th>Order value</th></tr></thead><tbody id="aT"></tbody></table></div></div>' +
      '<p class="tip">An order is counted when a shopper taps "Send order on WhatsApp". Confirm the sale with your customer in the chat.</p>';

    function draw() {
      if (!loaded) return;
      if (!O.length) { $("#aK").innerHTML = '<div class="card" style="grid-column:1/-1"><b>Analytics is not switched on yet.</b><p class="sub">The site owner needs to run setup-11.sql in Supabase.</p></div>'; return; }
      var n = O.length, labels = O.map(function (r) { return dlabel(r.day); });
      var ov = O.map(function (r) { return Number(r.orders); }), oa = O.map(function (r) { return Number(r.amount); });
      var vis = pad(V.map(function (r) { return r.visits; }), n);
      var vN = tail(vis, days), oN = tail(ov, days), aN = tail(oa, days), lN = tail(labels, days);
      var visits = sum(vN), orders = sum(oN), value = sum(aN);
      $("#aK").innerHTML =
        stat("Visitors, 30 days", num(sum(vis))) +
        stat("Visitors, last " + days + (days === 1 ? " day" : " days"), num(visits)) +
        stat("Orders sent, last " + days + (days === 1 ? " day" : " days"), num(orders), visits ? (orders / visits * 100).toFixed(1) + "% of visitors" : "") +
        stat("Order value", naira(value), orders ? "Average " + naira(value / orders) + " per order" : "");
      chart($("#aV"), labels, [{ name: "Visitors", color: GREEN, values: vis }], { label: "Visitors per day" });
      $("#aOt").textContent = "WhatsApp orders, last " + days + (days === 1 ? " day" : " days");
      chart($("#aO"), lN, [{ name: "Orders", color: MINT, values: oN }], { type: "bar", label: "Orders per day" });
      $("#aT").innerHTML = lN.map(function (l, i) { return "<tr><td>" + esc(l) + "</td><td>" + num(vN[i]) + "</td><td>" + num(oN[i]) + "</td><td>" + naira(aN[i]) + "</td></tr>"; }).reverse().join("");
    }
    rangeControl($("#aRg", root), 7, function (d) { days = d; draw(); });

    sb.auth.getSession().then(function (s) {
      if (!s.data.session) return;
      Promise.all([sb.rpc("vendor_visits"), sb.rpc("vendor_orders", { p_days: MAXDAYS })]).then(function (res) {
        V = res[0].error ? [] : (res[0].data || []);
        O = res[1].error ? [] : (res[1].data || []);
        loaded = true; draw();
      });
    });
  }

  /* =====================================================
     ADMIN PORTAL: Live visitors + orders tab
     ===================================================== */
  function adminModule() {
    var tab = addTab("Live & orders", "live", "Live & orders"); if (!tab) return;
    var root = tab.view, O = [], days = 7, loaded = false;
    root.innerHTML =
      '<div class="card lv"><div class="lv-top"><span class="dot"></span><span class="lv-lbl">Online right now</span><span class="sub" id="lvT">Connecting…</span></div>' +
      '<div class="lv-num" id="lvNow">0</div>' +
      '<div class="lv-row"><div><b id="lvS">0</b><span>on vendor stores</span></div><div><b id="lvW">0</b><span>on the ShopLink site</span></div><div><b id="lvH">0</b><span>in the last hour</span></div><div><b id="lvD">0</b><span>visitors today</span></div></div></div>' +
      '<div class="cols2"><div class="card"><h3 class="ct">Stores being viewed now</h3><table><tbody id="lvSt"></tbody></table></div>' +
      '<div class="card"><h3 class="ct">Site pages open now</h3><table><tbody id="lvPg"></tbody></table></div></div>' +
      '<div class="ahead"><div><h2 class="pt">Orders sent to vendors\' WhatsApp</h2><p class="sub">Across every store on ShopLink NG.</p></div><div class="range" id="oRg"></div></div>' +
      '<div class="grid four" id="oK"></div>' +
      '<div class="card"><h3 class="ct" id="oT"></h3><div id="oC"></div></div>' +
      '<div class="card"><h3 class="ct" id="oSt"></h3><div class="tw"><table><thead><tr><th>Store</th><th>Orders</th><th>Value</th></tr></thead><tbody id="oS"></tbody></table></div></div>' +
      '<p class="tip">"Online" means a page was open in the last 90 seconds. An order is counted when a shopper taps "Send order on WhatsApp".</p>';

    /* live pill in the top bar */
    var top = $(".top"), pill = null;
    if (top) {
      pill = document.createElement("button"); pill.type = "button"; pill.className = "livepill"; pill.title = "Visitors on ShopLink right now";
      pill.innerHTML = '<i></i><b>0</b> online'; top.appendChild(pill); pill.addEventListener("click", tab.open);
    }
    function none(msg) { return '<tr><td class="sub" style="padding:.8rem 0">' + msg + "</td></tr>"; }
    function poll() {
      if (document.hidden) return;
      sb.rpc("admin_live").then(function (r) {
        if (r.error) { $("#lvT").textContent = "Not available. Run setup-11.sql and check your admin email in it."; return; }
        var d = r.data || {};
        $("#lvNow").textContent = num(d.now); $("#lvS").textContent = num(d.stores_now); $("#lvW").textContent = num(d.site_now);
        $("#lvH").textContent = num(d.last_hour); $("#lvD").textContent = num(d.today);
        $("#lvT").textContent = "Updated " + new Date().toLocaleTimeString("en-NG", { hour: "numeric", minute: "2-digit", second: "2-digit" });
        if (pill) $("b", pill).textContent = num(d.now);
        $("#lvSt").innerHTML = (d.stores || []).map(function (s) { return "<tr><td><b>" + esc(s.store_name) + '</b><br><span class="sub">/' + esc(s.slug) + '</span></td><td class="r"><b>' + num(s.n) + "</b></td></tr>"; }).join("") || none("Nobody is on a store right now.");
        $("#lvPg").innerHTML = (d.pages || []).map(function (p) { return "<tr><td>" + esc(p.page) + '</td><td class="r"><b>' + num(p.n) + "</b></td></tr>"; }).join("") || none("Nobody is on the site right now.");
      });
    }
    poll(); setInterval(poll, 10000);
    document.addEventListener("visibilitychange", function () { if (!document.hidden) poll(); });

    function drawOrders() {
      if (!loaded) return;
      if (!O.length) { $("#oK").innerHTML = '<div class="card" style="grid-column:1/-1"><b>Order tracking is not switched on yet.</b><p class="sub">Run setup-11.sql in Supabase.</p></div>'; return; }
      var labels = O.map(function (r) { return dlabel(r.day); }), ov = O.map(function (r) { return Number(r.orders); }), oa = O.map(function (r) { return Number(r.amount); });
      var lN = tail(labels, days), oN = tail(ov, days), aN = tail(oa, days), orders = sum(oN), word = days + (days === 1 ? " day" : " days");
      $("#oK").innerHTML = stat("Orders, last " + word, num(orders)) + stat("Order value", naira(sum(aN)), orders ? "Average " + naira(sum(aN) / orders) : "") +
        stat("Orders today", num(ov[ov.length - 1])) + stat("Daily average", (orders / days).toFixed(1));
      $("#oT").textContent = "Orders per day, last " + word;
      chart($("#oC"), lN, [{ name: "Orders", color: MINT, values: oN }], { type: "bar", label: "Orders per day" });
      $("#oSt").textContent = "Top stores by orders, last " + word;
      sb.rpc("admin_order_stores", { p_days: days }).then(function (r) {
        var rows = r.error ? [] : (r.data || []);
        $("#oS").innerHTML = rows.map(function (s) { return "<tr><td><b>" + esc(s.store_name) + '</b><br><span class="sub">/' + esc(s.slug) + "</span></td><td>" + num(s.orders) + "</td><td>" + naira(s.amount) + "</td></tr>"; }).join("") ||
          '<tr><td colspan="3" class="sub" style="padding:1rem 0">No orders in this period.</td></tr>';
      });
    }
    rangeControl($("#oRg", root), 7, function (d) { days = d; drawOrders(); });
    sb.rpc("admin_order_days", { p_days: MAXDAYS }).then(function (r) { O = r.error ? [] : (r.data || []); loaded = true; drawOrders(); });
  }

  function start() {
    if ($('.side button[data-v="billing"]')) vendorModule();
    else if ($('.side button[data-v="payments"]')) adminModule();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
