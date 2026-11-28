/* ShopLink NG: navigation for every page.
   - Public pages (.nav + .menu-btn): toggles the dropdown menu
   - Dashboard / admin pages (.top + .side): adds the hamburger + drawer */
(function () {
  "use strict";

  /* ---------- PUBLIC SITE MENU ---------- */
  function initPublicMenu() {
    var nav = document.querySelector("header .nav");
    var btn = nav && nav.querySelector(".menu-btn");
    var links = nav && nav.querySelector(".links");
    if (!nav || !btn || !links) return false;

    function set(open) {
      nav.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      set(!nav.classList.contains("open"));
    });

    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) set(false);
    });

    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target)) set(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") set(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 720) set(false);
    });

    /* mark the current page in the menu */
    var here = location.pathname.split("/").pop() || "index.html";
    links.querySelectorAll("a:not(.btn)").forEach(function (a) {
      var target = (a.getAttribute("href") || "").split("#")[0];
      if (target && target === here) a.setAttribute("aria-current", "page");
    });

    return true;
  }

  /* ---------- DASHBOARD / ADMIN DRAWER ---------- */
  function initDrawer() {
    var top = document.querySelector(".top");
    var side = document.querySelector(".side");
    if (!top || !side) return false;

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "burger";
    btn.setAttribute("aria-label", "Open menu");
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
    top.insertBefore(btn, top.firstChild);

    var scrim = document.createElement("div");
    scrim.className = "scrim";
    document.body.appendChild(scrim);

    function set(open) {
      document.body.classList.toggle("menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    btn.addEventListener("click", function () {
      set(!document.body.classList.contains("menu-open"));
    });
    scrim.addEventListener("click", function () { set(false); });
    side.addEventListener("click", function (e) {
      if (e.target.closest("button,a")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") set(false);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) set(false);
    });

    return true;
  }

  function start() {
    initPublicMenu();
    initDrawer();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
