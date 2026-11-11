/* ShopLink NG: "Bookings" tab for service providers (vendor dashboard).
   In dashboard.html add after analytics.js:  <script src="bookings.js"></script> */
(function () {
  if (!window.supabase) return;
  var sb = window.supabase.createClient("https://grrotfpoalxvkkrkgzpg.supabase.co", "sb_publishable_rHcD1gDpdwT5jT1CscnGGA_2rV8baSw");
  var DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var SEL = 'style="display:block;width:100%;margin-top:.35rem;padding:.65rem .8rem;border:1px solid #cfd6de;border-radius:10px;font:inherit;background:#fff"';
  function $(s, r) { return (r || document).querySelector(s); }
  function esc(s) { var d = document.createElement("div"); d.textContent = s == null ? "" : s; return d.innerHTML; }
  function naira(n) { return "₦" + Number(n || 0).toLocaleString("en-NG"); }
  function say(el, t, ok) { el.textContent = t; el.className = "msg" + (ok ? " ok" : ""); }
  function phone(v) { var d = String(v).replace(/\D/g, ""); if (d.indexOf("234") === 0) return d; if (d.charAt(0) === "0") return "234" + d.slice(1); return d; }
  function today() { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function when(s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]).toLocaleDateString("en-NG", { weekday: "short", day: "numeric", month: "short" }); }

  function addTab(label, id, title) {
    var side = $(".side"), content = $(".content"), first = side && side.querySelector("button");
    if (!side || !content || !first) return null;
    var btn = document.createElement("button"); btn.type = "button"; btn.dataset.v = id; btn.textContent = label;
    first.insertAdjacentElement("afterend", btn);
    var view = document.createElement("section"); view.className = "view"; view.id = "v-" + id; content.appendChild(view);
    btn.addEventListener("click", function () {
      document.querySelectorAll(".view").forEach(function (s) { s.classList.toggle("on", s === view); });
      document.querySelectorAll(".side button").forEach(function (b) { b.classList.toggle("on", b === btn); });
      var h = document.getElementById("title"); if (h) h.textContent = title;
      window.scrollTo(0, 0);
    });
    return view;
  }

  function start() {
    if (!$('.side button[data-v="billing"]')) return;
    var root = addTab("Bookings", "bookings", "Bookings"); if (!root) return;
    var uid, vendor, services = [], bookings = [];
    function q(s) { return $(s, root); }
    root.innerHTML =
      '<div class="card"><h2>Store type</h2><p class="sub">Choose Services if customers book you (hair, makeup, photography, cleaning, tutoring). Your store link then shows a booking page instead of products.</p>' +
      '<label class="f">Type<select id="bType" ' + SEL + '><option value="products">Products (customers order)</option><option value="services">Services (customers book)</option></select></label>' +
      '<button class="btn p" id="bTypeSave" type="button" style="margin-top:.8rem">Save</button><p class="msg" id="bTypeMsg" role="alert"></p></div>' +
      '<div class="card"><h2>Working hours</h2><p class="sub">Customers can only book inside these times.</p>' +
      '<div class="two"><label class="f">Opens<input type="time" id="bOpen"></label><label class="f">Closes<input type="time" id="bClose"></label></div>' +
      '<label class="f">Length of each booking slot<select id="bSlot" ' + SEL + '><option value="30">30 minutes</option><option value="60">1 hour</option><option value="90">1 hour 30 minutes</option><option value="120">2 hours</option></select></label>' +
      '<p class="sub" style="margin-top:.9rem"><b>Days you work</b></p><div id="bDays">' +
      DAYS.map(function (d, i) { return '<label class="tick" style="display:inline-flex;margin:.2rem 1rem .2rem 0"><input type="checkbox" data-d="' + i + '" checked>' + d + "</label>"; }).join("") +
      '</div><button class="btn p" id="bHrsSave" type="button" style="margin-top:.8rem">Save hours</button><p class="msg" id="bHrsMsg" role="alert"></p></div>' +
      '<div class="card"><h2>Your services</h2><p class="sub">Add each service with its price and how long it takes.</p>' +
      '<div class="two"><label class="f">Service name<input id="sName" maxlength="80" placeholder="Bridal makeup"></label><label class="f">Price in naira<input id="sPrice" type="number" inputmode="numeric" min="0"></label></div>' +
      '<div class="two"><label class="f">Duration (minutes)<input id="sDur" type="number" inputmode="numeric" min="15" value="60"></label><label class="f">Short description (optional)<input id="sDesc" maxlength="200"></label></div>' +
      '<button class="btn p" id="sAdd" type="button" style="margin-top:.8rem">Add service</button><p class="msg" id="sMsg" role="alert"></p>' +
      '<div class="tw"><table><tbody id="sList"></tbody></table></div></div>' +
      '<div class="card"><h2>Bookings</h2><p class="sub">Confirm a booking to message the customer on WhatsApp.</p><p class="msg" id="bkMsg" role="alert"></p>' +
      '<div class="tw"><table><thead><tr><th>When</th><th>Customer</th><th>Service</th><th>Status</th><th></th></tr></thead><tbody id="bkList"></tbody></table></div></div>';

    q("#bTypeSave").onclick = function () {
      var t = q("#bType").value;
      sb.from("vendors").update({ store_type: t }).eq("owner_id", uid).then(function (r) {
        if (r.error) return say(q("#bTypeMsg"), "Could not save. Ask the site owner to run setup-13.sql.");
        say(q("#bTypeMsg"), t === "services" ? "Saved. Your store link now shows the booking page. Add at least one service below." : "Saved. Your store link shows your products.", true);
      });
    };
    q("#bHrsSave").onclick = function () {
      var o = q("#bOpen").value, c = q("#bClose").value, off = [], m = q("#bHrsMsg");
      root.querySelectorAll("#bDays input").forEach(function (x) { if (!x.checked) off.push(+x.dataset.d); });
      if (!o || !c || o >= c) return say(m, "Closing time must be after opening time.");
      sb.from("vendors").update({ open_time: o, close_time: c, slot_minutes: +q("#bSlot").value, off_days: off }).eq("owner_id", uid).then(function (r) {
        say(m, r.error ? "Could not save. Ask the site owner to run setup-13.sql." : "Hours saved.", !r.error);
      });
    };

    function loadServices() {
      sb.from("services").select("*").eq("owner_id", uid).order("created_at").then(function (r) {
        services = r.data || [];
        q("#sList").innerHTML = services.map(function (s) {
          return "<tr><td><b>" + esc(s.name) + '</b><div class="sub">' + esc(s.description || "") + "</div></td><td>" + naira(s.price) + "</td><td>" + s.duration_min + ' min</td><td class="act"><button class="btn d sm" type="button" data-del="' + esc(s.id) + '">Delete</button></td></tr>';
        }).join("") || '<tr><td class="sub" style="padding:1rem 0">No services yet.</td></tr>';
        window.SL_SVC = services.length; if (window.SL_refresh) window.SL_refresh();
      });
    }
    q("#sAdd").onclick = function () {
      var m = q("#sMsg"), name = q("#sName").value.trim(), price = parseFloat(q("#sPrice").value), dur = parseInt(q("#sDur").value, 10) || 60;
      if (!name) return say(m, "Enter the service name.");
      if (isNaN(price) || price < 0) return say(m, "Enter a price in naira.");
      sb.from("services").insert({ owner_id: uid, name: name, price: price, duration_min: dur, description: q("#sDesc").value.trim() }).then(function (r) {
        if (r.error) return say(m, "Could not save. Ask the site owner to run setup-13.sql.");
        q("#sName").value = ""; q("#sPrice").value = ""; q("#sDesc").value = ""; say(m, "Service added.", true); loadServices();
      });
    };
    q("#sList").addEventListener("click", function (e) {
      var b = e.target.closest("button[data-del]"); if (!b || !confirm("Delete this service?")) return;
      sb.from("services").delete().eq("id", b.dataset.del).then(loadServices);
    });

    function loadBookings() {
      sb.from("bookings").select("*").eq("owner_id", uid).gte("book_date", today()).order("book_date").order("book_time").limit(100).then(function (r) {
        bookings = r.data || [];
        q("#bkList").innerHTML = bookings.map(function (b) {
          var pill = b.status === "confirmed" ? '<span class="pill ok">Confirmed</span>' : b.status === "cancelled" ? '<span class="pill bad">Cancelled</span>' : '<span class="pill wait">Pending</span>';
          var act = b.status === "cancelled" ? "" : (b.status === "pending" ? '<button class="btn p sm" type="button" data-a="confirm" data-id="' + esc(b.id) + '">Confirm</button>' : "") + '<button class="btn d sm" type="button" data-a="cancel" data-id="' + esc(b.id) + '">Cancel</button>';
          return "<tr><td><b>" + esc(when(b.book_date)) + "</b><br>" + esc(b.book_time) + "</td><td>" + esc(b.customer_name) + '<div class="sub">' + esc(b.customer_phone) + (b.note ? "<br>" + esc(b.note) : "") + "</div></td><td>" + esc(b.service_name || "") + "</td><td>" + pill + '</td><td class="act">' + act + "</td></tr>";
        }).join("") || '<tr><td colspan="5" class="sub" style="padding:1.2rem 0">No upcoming bookings yet.</td></tr>';
      });
    }
    q("#bkList").addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-a]"); if (!btn) return;
      var b = bookings.filter(function (x) { return x.id === btn.dataset.id; })[0]; if (!b) return;
      var confirmIt = btn.dataset.a === "confirm", name = vendor ? vendor.store_name : "us";
      if (!confirmIt && !confirm("Cancel this booking?")) return;
      var text = confirmIt ? "Hello " + b.customer_name + ", your booking with " + name + " for " + b.service_name + " on " + when(b.book_date) + " at " + b.book_time + " is confirmed. See you then!"
        : "Hello " + b.customer_name + ", sorry, we have to cancel your booking for " + b.service_name + " on " + when(b.book_date) + " at " + b.book_time + ". Please pick another time.";
      window.open("https://wa.me/" + phone(b.customer_phone) + "?text=" + encodeURIComponent(text), "_blank", "noopener");
      sb.from("bookings").update({ status: confirmIt ? "confirmed" : "cancelled" }).eq("id", b.id).then(function (r) {
        if (r.error) return say(q("#bkMsg"), "Could not update. Try again.");
        loadBookings();
      });
    });

    sb.auth.getSession().then(function (s) {
      if (!s.data.session) return; uid = s.data.session.user.id;
      sb.from("vendors").select("*").eq("owner_id", uid).maybeSingle().then(function (r) {
        vendor = r.data; if (!vendor) return;
        q("#bType").value = vendor.store_type || "products";
        q("#bOpen").value = vendor.open_time || "09:00"; q("#bClose").value = vendor.close_time || "17:00"; q("#bSlot").value = String(vendor.slot_minutes || 60);
        var off = vendor.off_days || [0];
        root.querySelectorAll("#bDays input").forEach(function (x) { x.checked = off.indexOf(+x.dataset.d) < 0; });
        loadServices(); loadBookings();
      });
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
