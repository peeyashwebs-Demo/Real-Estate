document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  const navLinks = document.querySelectorAll(".main-nav a");
  const revealElements = document.querySelectorAll(".reveal");
  const staggerItems = document.querySelectorAll(".stagger-grid .property-item");
  const heroSearchForm = document.querySelector(".hero-search-form");
  const newsletterForms = document.querySelectorAll(".newsletter-form");
  const parallaxItems = document.querySelectorAll(".parallax-lite");
  const faqItems = document.querySelectorAll(".faq-item");

  /* =========================
     HEADER SCROLL EFFECT
  ========================= */
  function handleHeaderScroll() {
    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleHeaderScroll);
  handleHeaderScroll();

  /* =========================
     MOBILE NAV TOGGLE
  ========================= */
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("show");
      navToggle.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("show");
        navToggle.classList.remove("active");
        document.body.classList.remove("menu-open");
      });
    });

    document.addEventListener("click", (event) => {
      const clickedInsideNav = mainNav.contains(event.target);
      const clickedToggle = navToggle.contains(event.target);

      if (!clickedInsideNav && !clickedToggle) {
        mainNav.classList.remove("show");
        navToggle.classList.remove("active");
        document.body.classList.remove("menu-open");
      }
    });
  }

  /* =========================
     REVEAL ON SCROLL
  ========================= */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -60px 0px",
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

  /* =========================
     STAGGERED CARD REVEAL
  ========================= */
  if (staggerItems.length) {
    const staggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = [...staggerItems];
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add("visible");
              }, index * 120);
            });
            staggerObserver.disconnect();
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    staggerObserver.observe(staggerItems[0]);
  }

  /* =========================
     FAQ ACCORDION FEEL
  ========================= */
  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (item.open) {
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.removeAttribute("open");
          }
        });
      }
    });
  });

  /* =========================
     HERO SEARCH FORM DEMO
  ========================= */
  if (heroSearchForm) {
    heroSearchForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const location = heroSearchForm.querySelector("#location")?.value || "";
      const type = heroSearchForm.querySelector("#type")?.value || "";
      const price = heroSearchForm.querySelector("#price")?.value || "";
      const bedrooms = heroSearchForm.querySelector("#bedrooms")?.value || "";
      const status = heroSearchForm.querySelector("#status")?.value || "";

      const params = new URLSearchParams({
        location,
        type,
        price,
        bedrooms,
        status,
      });

      window.location.href = `properties.html?${params.toString()}`;
    });
  }

  /* =========================
     NEWSLETTER FORM
  ========================= */
  newsletterForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const input = form.querySelector('input[type="email"]');

      if (!input) return;

      const email = input.value.trim();
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !validEmail.test(email)) {
        input.focus();
        input.style.borderColor = "crimson";

        setTimeout(() => {
          input.style.borderColor = "";
        }, 1800);

        return;
      }

      const button = form.querySelector("button");
      const originalText = button ? button.textContent : "";

      if (button) {
        button.textContent = "Subscribed!";
        button.disabled = true;
      }

      input.value = "";

      setTimeout(() => {
        if (button) {
          button.textContent = originalText;
          button.disabled = false;
        }
      }, 2200);
    });
  });

  /* =========================
     SUBTLE PARALLAX EFFECT
  ========================= */
  function handleParallax() {
    if (!parallaxItems.length) return;

    parallaxItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const speed = 0.04;
      const offset = rect.top * speed;

      item.style.transform = `translateY(${offset}px)`;
    });
  }

  window.addEventListener("scroll", handleParallax);
  handleParallax();

  /* =========================
     ACTIVE NAV LINK BY URL
  ========================= */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
});
if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("show");
    navToggle.classList.toggle("active");
    document.body.classList.toggle("menu-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}
const priceFilter = document.getElementById("priceFilter");
const locationFilter = document.getElementById("locationFilter");
const typeFilter = document.getElementById("typeFilter");
const propertyItems = document.querySelectorAll(".property-item");

function filterProperties() {
  if (!priceFilter || !locationFilter || !typeFilter || !propertyItems.length) return;

  const selectedPrice = priceFilter.value;
  const selectedLocation = locationFilter.value;
  const selectedType = typeFilter.value;

  propertyItems.forEach((item) => {
    const itemPrice = item.dataset.price;
    const itemLocation = item.dataset.location;
    const itemType = item.dataset.type;

    const matchesPrice = selectedPrice === "all" || itemPrice === selectedPrice;
    const matchesLocation = selectedLocation === "all" || itemLocation === selectedLocation;
    const matchesType = selectedType === "all" || itemType === selectedType;

    if (matchesPrice && matchesLocation && matchesType) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
}

if (priceFilter && locationFilter && typeFilter) {
  priceFilter.addEventListener("change", filterProperties);
  locationFilter.addEventListener("change", filterProperties);
  typeFilter.addEventListener("change", filterProperties);
}
const openModalButtons = document.querySelectorAll(".open-modal");
const modals = document.querySelectorAll(".modal");
const closeModalButtons = document.querySelectorAll(".close-modal");

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modalId = button.getAttribute("data-modal");
    const targetModal = document.getElementById(modalId);

    if (targetModal) {
      targetModal.classList.add("show");
      document.body.classList.add("menu-open");
    }
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    if (modal) {
      modal.classList.remove("show");
      document.body.classList.remove("menu-open");
    }
  });
});

modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("show");
      document.body.classList.remove("menu-open");
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modals.forEach((modal) => modal.classList.remove("show"));
    document.body.classList.remove("menu-open");
  }
});
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector("button[type='submit']");
    const originalText = submitButton ? submitButton.textContent : "";

    if (submitButton) {
      submitButton.textContent = "Inquiry Sent";
      submitButton.disabled = true;
    }

    contactForm.reset();

    setTimeout(() => {
      if (submitButton) {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    }, 2200);
  });
}