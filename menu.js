/* ShopLink NG: adds the hamburger button + dim overlay to any page with .top and .side */
(function () {
  var top = document.querySelector(".top"), side = document.querySelector(".side");
  if (!top || !side) return;

  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "burger";
  btn.setAttribute("aria-label", "Open menu");
  btn.setAttribute("aria-expanded", "false");
  btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
  top.insertBefore(btn, top.firstChild);

  var scrim = document.createElement("div");
  scrim.className = "scrim";
  document.body.appendChild(scrim);

  function set(open) {
    document.body.classList.toggle("menu-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  btn.addEventListener("click", function () { set(!document.body.classList.contains("menu-open")); });
  scrim.addEventListener("click", function () { set(false); });
  side.addEventListener("click", function (e) { if (e.target.closest("button,a")) set(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  window.addEventListener("resize", function () { if (window.innerWidth > 860) set(false); });
})();
