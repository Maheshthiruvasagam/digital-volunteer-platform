"use strict";

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initSmoothScroll();
  initEventFilters();
  initEventLinks();
  initDemoForms();
  initModals();
  initRoleTabs();
  initAdminFilter();
  initPortalDemo();
  initToastFromQuery();
});

const qs = (selector, scope = document) => scope.querySelector(selector);
const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function initMobileNav() {
  const nav = qs(".nav");
  const toggle = qs(".menu-toggle");
  if (!nav || !toggle) return;
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  qsa(".nav-links a", nav).forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));
}

function initSmoothScroll() {
  qsa('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const target = qs(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function initEventFilters() {
  const grid = qs("#eventGrid");
  if (!grid) return;
  const cards = qsa(".event-card", grid);
  const search = qs("#eventSearch");
  const filterButtons = qsa(".filter-btn");
  let category = "All";

  const apply = () => {
    const term = (search?.value || "").trim().toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      const cardCategory = card.dataset.category || "";
      const matchesCategory = category === "All" || cardCategory === category;
      const matchesSearch = !term || text.includes(term);
      const show = matchesCategory && matchesSearch;
      card.classList.toggle("hidden", !show);
      if (show) visible++;
    });
    const empty = qs("#emptyEvents");
    if (empty) empty.classList.toggle("hidden", visible !== 0);
  };

  filterButtons.forEach(btn => btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    category = btn.dataset.filter || "All";
    apply();
  }));
  search?.addEventListener("input", apply);
}

function initEventLinks() {
  qsa("[data-event-link]").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.eventLink || "tree";
      const link = document.createElement("a");
      link.href = `event-details.html?event=${encodeURIComponent(id)}`;
      link.click();
    });
  });
}

function showToast(message) {
  const toast = qs("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 3200);
}

function initDemoForms() {
  qsa("form[data-demo-form]").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const action = form.dataset.demoForm;
      if (action === "login") {
        showToast("Demo login successful. No credentials were transmitted.");
        const role = qs('input[name="role"]:checked', form)?.value || "volunteer";
        window.setTimeout(() => {
          const destinations = {
            volunteer: "volunteer-dashboard.html",
            organization: "organization-portal.html",
            admin: "admin.html"
          };
          const link = document.createElement("a");
          link.href = destinations[role];
          link.click();
        }, 650);
      } else if (action === "register") {
        showToast("Volunteer profile created successfully — Demo Mode.");
        form.reset();
        window.setTimeout(() => { const link = document.createElement("a"); link.href = "volunteer-dashboard.html"; link.click(); }, 700);
      } else if (action === "create-event") {
        showToast("Event created successfully — Demo Mode. No data was saved.");
        form.reset();
      }
    });
  });

  qsa("[data-register-event]").forEach(btn => {
    btn.addEventListener("click", () => {
      showToast("Registration successful! No backend connection — this is a demo.");
    });
  });

  qsa("[data-qr-demo]").forEach(btn => {
    btn.addEventListener("click", () => openModal("qrModal"));
  });
}

function initModals() {
  qsa("[data-modal-open]").forEach(btn => {
    btn.addEventListener("click", () => openModal(btn.dataset.modalOpen));
  });
  qsa("[data-modal-close]").forEach(btn => {
    btn.addEventListener("click", () => closeModal(btn.dataset.modalClose));
  });
  qsa(".modal-backdrop").forEach(backdrop => {
    backdrop.addEventListener("click", event => {
      if (event.target === backdrop) closeModal(backdrop.id);
    });
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") qsa(".modal-backdrop.open").forEach(m => closeModal(m.id));
  });
}

function openModal(id) {
  const modal = qs(`#${id}`);
  if (!modal) return;
  modal.classList.add("open");
  document.body.classList.add("no-scroll");
  qs(".modal-close", modal)?.focus();
}

function closeModal(id) {
  const modal = qs(`#${id}`);
  if (!modal) return;
  modal.classList.remove("open");
  document.body.classList.remove("no-scroll");
}

function initRoleTabs() {
  qsa(".role-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      qsa(".role-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const role = tab.dataset.role;
      const radio = qs(`input[name="role"][value="${role}"]`);
      if (radio) radio.checked = true;
    });
  });
}

function initAdminFilter() {
  const input = qs("#adminSearch");
  const table = qs("#adminTable");
  if (!input || !table) return;
  input.addEventListener("input", () => {
    const term = input.value.toLowerCase().trim();
    qsa("tbody tr", table).forEach(row => {
      row.classList.toggle("hidden", !row.textContent.toLowerCase().includes(term));
    });
  });
}

function initPortalDemo() {
  const generate = qs("[data-generate-qr]");
  if (generate) {
    generate.addEventListener("click", () => {
      const target = qs("#generatedQr");
      if (!target) return;
      target.classList.remove("hidden");
      showToast("Demo QR generated locally. No external QR service used.");
    });
  }
}

function initToastFromQuery() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("registered") === "1") {
    showToast("Registration successful! No backend connection — this is a demo.");
  }
}
