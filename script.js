/* ============================================================
   نظام إدارة المركز الصحي — Landing Page scripts
   إعدادات التنزيل والإصدار تُدار من هنا فقط (لا روابط مكررة).

   ملف التنزيل موجود فعليًا داخل المجلد: downloads/
   وهذان الزرّان يفتحان الملف الحقيقي مباشرة.
   ============================================================ */

/* ---------- إعدادات قابلة للتعديل ---------- */
const APP_CONFIG = {
  name: "نظام إدارة المركز الصحي",
  version: "1.0.0",
  buildDate: "25 أكتوبر 2026",
  os: "Windows",
  type: "Desktop Application",
  appFile: "downloads/HealthCenter-Portable-1.0.0.exe",
  appDownloadName: "HealthCenter-Portable-1.0.0.exe",
  guideFile: "downloads/دليل-الاستخدام-نظام-المركز-الصحي.pdf",
  guideDownloadName: "دليل-الاستخدام-نظام-المركز-الصحي.pdf",
  sizeMB: "91.6",
  whatsapp: "249125000574"
};

/* إن رفعت ملف EXE إلى GitHub Releases بدل مستودع الصفحة، ضع رابط الأصل هنا.
   اتركه فارغًا ليبقى التنزيل من الملف المحلي داخل downloads/.
   مثال: "https://github.com/USER/REPO/releases/latest/download/HealthCenter-Portable-1.0.0.exe" */
const RELEASE_URL = "";

function isConfigured(url) {
  return typeof url === "string" && url.trim() !== "" && !/^YOUR_/i.test(url.trim());
}

/* ---------- تطبيق الإعدادات على الصفحة ---------- */
(function applyConfig() {
  document.querySelectorAll("[data-version]").forEach(function (el) { el.textContent = APP_CONFIG.version; });
  document.querySelectorAll("[data-os]").forEach(function (el) { el.textContent = APP_CONFIG.os; });
  document.querySelectorAll("[data-type]").forEach(function (el) { el.textContent = APP_CONFIG.type; });
  document.querySelectorAll("[data-build-date]").forEach(function (el) { el.textContent = APP_CONFIG.buildDate; });
  document.querySelectorAll("[data-size]").forEach(function (el) { el.textContent = APP_CONFIG.sizeMB; });
})();

/* ---------- روابط التنزيل الحقيقية ---------- */
(function wireDownloads() {
  const appLinks = Array.from(document.querySelectorAll("[data-download]"));
  const guideLinks = Array.from(document.querySelectorAll("[data-guide]"));

  const appUrl = isConfigured(RELEASE_URL) ? RELEASE_URL.trim() : APP_CONFIG.appFile;

  appLinks.forEach(function (el) {
    el.setAttribute("href", appUrl);
    el.setAttribute("download", APP_CONFIG.appDownloadName);
    if (/^https?:/i.test(appUrl)) { el.setAttribute("rel", "noopener"); }
  });

  guideLinks.forEach(function (el) {
    el.setAttribute("href", APP_CONFIG.guideFile);
    el.setAttribute("download", APP_CONFIG.guideDownloadName);
  });

  /* فحص توفّر الملفات: لا نترك زرًا يفتح صفحة غير موجودة بصمت */
  function verify(link, label) {
    const url = link.getAttribute("href");
    if (!url || typeof fetch !== "function") return;
    /* عند فتح الصفحة من القرص (file://) لا يوجد خادم لفحصه — نترك الرابط كما هو */
    if (location.protocol === "file:") return;
    fetch(url, { method: "HEAD" })
      .then(function (res) {
        const type = (res.headers.get("content-type") || "").toLowerCase();
        const looksLikeHtml = type.indexOf("text/html") === 0;
        if (!res.ok || looksLikeHtml) throw new Error("missing " + label + " (" + res.status + ")");
        return true;
      })
      .catch(function () {
        const card = document.querySelector(".download-card");
        if (!card || card.querySelector(".download-warn")) return;
        const warn = document.createElement("p");
        warn.className = "download-warn";
        warn.textContent = "ملف " + label + " غير موجود على هذا الاستضافة حاليًا. تأكد من رفع مجلد downloads/ كاملًا مع الصفحة.";
        card.appendChild(warn);
      });
  }
  if (appLinks[0]) verify(appLinks[0], "التطبيق");
  if (guideLinks[0]) verify(guideLinks[0], "دليل الاستخدام");
})();

/* ---------- تنبيه الهاتف: الموقع يعمل، لكن التطبيق لـ Windows ---------- */
(function mobileHint() {
  const hint = document.querySelector("[data-mobile-hint]");
  if (!hint) return;
  const coarse = window.matchMedia("(pointer: coarse)");
  const narrow = window.matchMedia("(max-width: 760px)");

  function apply() {
    const isPhone = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || coarse.matches || narrow.matches;
    hint.hidden = !isPhone;
  }

  apply();
  if (narrow.addEventListener) { narrow.addEventListener("change", apply); coarse.addEventListener("change", apply); }
  else if (narrow.addListener) { narrow.addListener(apply); coarse.addListener(apply); }
  window.addEventListener("resize", apply);
})();

/* ---------- قائمة الجوال ---------- */
(function mobileNav() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "إغلاق القائمة" : "فتح القائمة");
  }

  toggle.addEventListener("click", function () {
    setOpen(!nav.classList.contains("open"));
  });

  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 960) setOpen(false);
  });
})();

/* ---------- ظل الهيدر عند التمرير ---------- */
(function headerScroll() {
  const header = document.getElementById("siteHeader");
  if (!header) return;

  let ticking = false;
  function update() {
    header.classList.toggle("scrolled", window.scrollY > 8);
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
})();

/* ---------- تمييز قسم الصفحة الحالي في التنقل ---------- */
(function activeSection() {
  const links = Array.from(document.querySelectorAll(".main-nav ul a[href^='#']"));
  const sections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);
  if (!("IntersectionObserver" in window) || !sections.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (a) {
        a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
      });
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  sections.forEach(function (s) { observer.observe(s); });
})();

/* ---------- ظهور الأقسام عند التمرير ---------- */
(function revealOnScroll() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("visible"); });
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  items.forEach(function (el) { observer.observe(el); });
})();

/* ---------- فتح سؤال واحد فقط في الأسئلة الشائعة ---------- */
(function singleFaqOpen() {
  const items = document.querySelectorAll(".faq-item");
  if (items.length < 2) return;

  items.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      items.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });
})();
