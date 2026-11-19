/* =========================================================
   EDIT YOUR DETAILS HERE
   These values are applied to every matching link/label on the page.
   (index.html contains the same values as a fallback for search engines
   and for visitors with JavaScript turned off — if you change them here,
   use Find & Replace in index.html to update them there too.)
   ========================================================= */
const SITE = {
  name: "Hager Radwan",
  role: "Media Buyer",
  email: "Hajjarrmohamed@gmail.com",
  phoneDisplay: "+20 11 5668 5718",   // how the number is shown
  phoneIntl: "201156685718",          // country code + number, digits only (used for tel: and WhatsApp)
  whatsappMessage: "Hi Hager, I saw your portfolio and I'd like to talk about running ads for my business."
};

(function () {
  "use strict";

  /* ---------- Apply site details ---------- */
  const links = {
    email: "mailto:" + SITE.email,
    phone: "tel:+" + SITE.phoneIntl,
    whatsapp: "https://wa.me/" + SITE.phoneIntl +
      (SITE.whatsappMessage ? "?text=" + encodeURIComponent(SITE.whatsappMessage) : "")
  };
  document.querySelectorAll("[data-contact]").forEach(function (a) {
    const href = links[a.dataset.contact];
    if (href) a.href = href;
  });
  const texts = { email: SITE.email, phone: SITE.phoneDisplay };
  document.querySelectorAll("[data-contact-text]").forEach(function (el) {
    const t = texts[el.dataset.contactText];
    if (t) el.textContent = t;
  });
  document.querySelectorAll("[data-site]").forEach(function (el) {
    const t = SITE[el.dataset.site];
    if (t) el.textContent = t;
  });
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Header: border on scroll ---------- */
  const header = document.querySelector(".site-header");
  const quick = document.querySelector(".quick-contact");
  const hero = document.querySelector(".hero");
  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 8);
    if (quick && hero) quick.classList.toggle("is-visible", y > hero.offsetHeight * 0.6);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  }
  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) { setMenu(false); toggle.focus(); }
  });
  window.matchMedia("(min-width: 821px)").addEventListener("change", function (m) {
    if (m.matches) setMenu(false);
  });

  /* ---------- Highlight current section in nav ---------- */
  const navLinks = Array.from(nav.querySelectorAll('a[href^="#"]:not(.btn)'));
  if ("IntersectionObserver" in window) {
    const byId = {};
    navLinks.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.remove("is-active"); a.removeAttribute("aria-current"); });
        const a = byId[en.target.id];
        if (a) { a.classList.add("is-active"); a.setAttribute("aria-current", "true"); }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["about", "skills", "case-studies", "contact"].forEach(function (id) {
      const s = document.getElementById(id);
      if (s) io.observe(s);
    });
  }

  /* ---------- Screenshot viewer ---------- */
  const box = document.getElementById("lightbox");
  if (box && typeof box.showModal === "function") {
    const img = box.querySelector("img");
    let opener = null;
    document.querySelectorAll("[data-zoom]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        opener = btn;
        img.src = btn.dataset.zoom;
        img.alt = btn.dataset.zoomAlt || "";
        box.showModal();
      });
    });
    box.querySelector(".lightbox-close").addEventListener("click", function () { box.close(); });
    box.addEventListener("click", function (e) { if (e.target === box) box.close(); });
    box.addEventListener("close", function () { if (opener) opener.focus(); });
  } else {
    // Older browsers: open the image in a new tab instead
    document.querySelectorAll("[data-zoom]").forEach(function (btn) {
      btn.addEventListener("click", function () { window.open(btn.dataset.zoom, "_blank", "noopener"); });
    });
  }
})();
