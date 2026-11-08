/* Portfolio behaviour: nav, scroll effects, modal, mailto form. Vanilla JS only. */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---- EDIT THIS: the address that receives contact form messages ---- */
  const CONTACT_EMAIL = "your.email@example.com";

  const nav = $("#nav"), bar = $("#progress"), totop = $("#totop");
  const burger = $("#burger"), menu = $("#menu");

  // Theme switch (dark/light). Choice is saved; first visit follows the system setting.
  const root = document.documentElement, toggle = $("#theme-toggle"), meta = $('meta[name="theme-color"]');
  const applyTheme = (t, save) => {
    root.dataset.theme = t;
    meta.content = t === "light" ? "#F7F9FC" : "#0A0C10";
    toggle.setAttribute("aria-label", t === "light" ? "Switch to dark theme" : "Switch to light theme");
    if (save) try { localStorage.setItem("theme", t); } catch (e) {}
  };
  applyTheme(root.dataset.theme || "dark");
  toggle.addEventListener("click", () => applyTheme(root.dataset.theme === "light" ? "dark" : "light", true));
  matchMedia("(prefers-color-scheme: light)").addEventListener("change", e => {
    try { if (localStorage.getItem("theme")) return; } catch (err) {}
    applyTheme(e.matches ? "light" : "dark");
  });

  // Scroll state: sticky nav style, progress bar, back-to-top
  const onScroll = () => {
    const y = window.scrollY, max = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle("is-scrolled", y > 40);
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    totop.classList.toggle("show", y > 700);
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  totop.addEventListener("click", () => scrollTo({ top: 0 }));

  // Mobile menu
  const setMenu = open => {
    menu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
  $$("a", menu).forEach(a => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", e => e.key === "Escape" && setMenu(false));
  matchMedia("(min-width:1001px)").addEventListener("change", () => setMenu(false));

  // Scroll reveals (run once)
  const revealer = new IntersectionObserver((entries, obs) => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("is-in"); obs.unobserve(en.target); }
  }), { threshold: 0.12, rootMargin: "0px 0px -40px" });
  $$(".reveal").forEach((el, i) => {
    if (el.parentElement.matches(".skills,.project-grid,.about__cards")) el.style.transitionDelay = (i % 4) * 80 + "ms";
    revealer.observe(el);
  });

  // Active nav link follows the section in view
  const links = $$(".nav__links a[href^='#']:not(.btn)");
  const spy = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    links.forEach(l => l.classList.toggle("is-active", l.getAttribute("href") === "#" + en.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach(s => spy.observe(s));

  // Cursor-following highlight on the featured project
  const proj = $("#featured");
  proj.addEventListener("pointermove", e => {
    const r = proj.getBoundingClientRect();
    proj.style.setProperty("--mx", e.clientX - r.left + "px");
    proj.style.setProperty("--my", e.clientY - r.top + "px");
  });

  // Project details modal (native <dialog> handles focus trap and Esc)
  const modal = $("#modal");
  $$("[data-open='modal']").forEach(b => b.addEventListener("click", () => modal.showModal()));
  $$("[data-close]", modal).forEach(b => b.addEventListener("click", () => modal.close()));
  modal.addEventListener("click", e => { if (e.target === modal) modal.close(); });

  // Contact form -> opens the visitor's email app (mailto). See README to switch to a form service.
  const form = $("#form"), status = $("#form-status");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const f = new FormData(form);
    let ok = true;
    $$("input,textarea", form).forEach(i => {
      const bad = !i.value.trim() || (i.type === "email" && !/^\S+@\S+\.\S+$/.test(i.value));
      i.classList.toggle("invalid", bad); i.setAttribute("aria-invalid", bad); if (bad) ok = false;
    });
    if (!ok) { status.textContent = "Please complete every field with a valid email address."; return; }
    const body = `${f.get("message")}\n\nFrom: ${f.get("name")} (${f.get("email")})`;
    location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(f.get("subject"))}&body=${encodeURIComponent(body)}`;
    status.textContent = "Opening your email app. If nothing opens, write to " + CONTACT_EMAIL + ".";
  });

  $("#year").textContent = new Date().getFullYear();
})();
