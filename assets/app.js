document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    navLinks.querySelectorAll("a[href^='#']").forEach(a => {
      a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }
  document.documentElement.style.scrollBehavior = "smooth";
  document.querySelectorAll("a[href^='#']").forEach(a => {
    a.addEventListener("click", e => {
      const id = a.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get("name") || "";
      const email = data.get("email") || "";
      const company = data.get("company") || "";
      const message = data.get("message") || "";
      const subject = encodeURIComponent("Discovery Call Request");
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\nMessage:\n${message}`
      );
      window.location.href = `mailto:hello@ailogik.co.uk?subject=${subject}&body=${body}`;
    });
  }

  const ctaEmailInput = document.getElementById("email-input");
  const ctaSubmit = document.getElementById("cta-submit");
  const ctaMsg = document.getElementById("form-msg");
  const submitCta = () => {
    if (!ctaEmailInput || !ctaMsg) return;
    const value = String(ctaEmailInput.value || "").trim();
    const ok = value.includes("@") && value.includes(".");
    if (ok) {
      ctaMsg.classList.remove("hidden");
      ctaEmailInput.value = "";
      ctaEmailInput.style.borderColor = "";
      return;
    }
    ctaEmailInput.style.borderColor = "#ff4444";
    window.setTimeout(() => {
      ctaEmailInput.style.borderColor = "";
    }, 1500);
  };
  if (ctaSubmit) ctaSubmit.addEventListener("click", submitCta);
  if (ctaEmailInput) {
    ctaEmailInput.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        submitCta();
      }
    });
  }

  const counters = Array.from(document.querySelectorAll(".count-num[data-target]"));
  const animateCounter = (el, target) => {
    const duration = 1800;
    const start = performance.now();
    const from = 0;
    const to = Number.isFinite(target) ? target : 0;
    const tick = now => {
      const t = Math.min(1, (now - start) / duration);
      const value = Math.floor(from + (to - from) * t);
      el.textContent = String(value);
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = String(to);
    };
    requestAnimationFrame(tick);
  };
  if (counters.length) {
    const counterObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = Number(el.getAttribute("data-target"));
          animateCounter(el, target);
          counterObserver.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(el => counterObserver.observe(el));
  }
});
