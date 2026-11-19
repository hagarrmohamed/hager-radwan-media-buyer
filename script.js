/* Hager Radwan — portfolio interactions (no dependencies) */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasIO = "IntersectionObserver" in window;

  /* ---------- 50 products tested → 15 kept (case 03) ---------- */
  var grid = document.querySelector(".funnel__grid");
  if (grid) {
    // 15 winners spread across the field, purely illustrative positions
    var winners = [2, 5, 9, 13, 16, 21, 24, 28, 31, 35, 38, 40, 44, 46, 49];
    var frag = document.createDocumentFragment();
    var order = 0;
    for (var i = 0; i < 50; i++) {
      var dot = document.createElement("i");
      if (winners.indexOf(i) !== -1) {
        dot.className = "win";
        dot.style.setProperty("--d", order++);
      }
      frag.appendChild(dot);
    }
    grid.appendChild(frag);
  }

  /* ---------- Reveal on scroll ---------- */
  var revealables = document.querySelectorAll(".reveal, .funnel");
  if (!hasIO || reduceMotion) {
    revealables.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          revealer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    revealables.forEach(function (el) { revealer.observe(el); });
  }

  /* ---------- Active section in the nav ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav__links a"));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  function setActive() {
    var line = window.innerHeight * 0.35;
    var current = null;
    sections.forEach(function (s) {
      if (s.getBoundingClientRect().top <= line) current = s;
    });
    // The contact block is short; mark it once the page bottom is reached
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = sections[sections.length - 1];
    }
    navLinks.forEach(function (a) {
      if (current && a.getAttribute("href") === "#" + current.id) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  }
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { setActive(); ticking = false; });
  }, { passive: true });
  setActive();

  /* ---------- Screenshot lightbox ---------- */
  var dialog = document.querySelector(".lightbox");
  if (dialog && typeof dialog.showModal === "function") {
    var img = dialog.querySelector("img");
    var lastTrigger = null;

    document.querySelectorAll("[data-zoom]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        lastTrigger = btn;
        img.src = btn.getAttribute("data-zoom");
        img.alt = btn.getAttribute("data-alt") || "";
        dialog.showModal();
      });
    });

    dialog.querySelector(".lightbox__close").addEventListener("click", function () { dialog.close(); });
    // Click on the backdrop closes it
    dialog.addEventListener("click", function (e) { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener("close", function () { if (lastTrigger) lastTrigger.focus(); });
  } else {
    // Old browsers: open the image in a new tab instead
    document.querySelectorAll("[data-zoom]").forEach(function (btn) {
      btn.addEventListener("click", function () { window.open(btn.getAttribute("data-zoom"), "_blank", "noopener"); });
    });
  }
})();
