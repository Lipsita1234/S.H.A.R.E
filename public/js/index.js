document.addEventListener("DOMContentLoaded", () => {
  // Toggle Menu
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const menuLinks = document.querySelectorAll(".menu-link");

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
    });
  });

  // How It Works Card Animation
  const cards = document.querySelectorAll(".card");

  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.style.transform = entry.isIntersecting
          ? "translateY(0)"
          : "translateY(100px)";
        entry.target.style.opacity = entry.isIntersecting ? "1" : "0";
      });
    },
    {
      threshold: 0.1,
    }
  );

  cards.forEach((card) => {
    cardObserver.observe(card);
  });

  // Data Cards Slider
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const slides = document.querySelectorAll(".slide");
  let currentIndex = 0;

  slides.forEach((slide, index) => {
    slide.style.left = `${index * 100}%`;
  });

  function showSlide() {
    slides.forEach((slide) => {
      slide.style.transform = `translateX(-${currentIndex * 100}%)`;
    });
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
    showSlide();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
    showSlide();
  });

  setInterval(() => {
    nextBtn.click();
  }, 8000);

  // Fade In Animation for Data Section
  const dataSection = document.querySelector(".data-section");
  const dataObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          dataSection.classList.add("fade-in");
        }
      });
    },
    { threshold: 0.1 }
  );

  dataObserver.observe(dataSection);

  // Text Overlay Animation
  slides.forEach((slide) => {
    const textOverlay = slide.querySelector(".text-overlay");
    if (textOverlay) {
      textOverlay.style.opacity = "0";
      textOverlay.style.transition = "opacity 0.5s ease-in-out";
    }
  });

  const textObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const textOverlay = entry.target.querySelector(".text-overlay");
        if (textOverlay) {
          textOverlay.style.opacity = entry.isIntersecting ? "1" : "0";
        }
      });
    },
    { threshold: 0.1 }
  );

  slides.forEach((slide) => {
    textObserver.observe(slide);
  });
});
//adding the script for highlighting navbar links
// Get the current page URL
var currentPage = window.location.pathname.split("/").pop();

// Select all navbar links
var navLinks = document.querySelectorAll("nav div a");

// Loop through links to find the matching link
navLinks.forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});
//adding the script for highlighting navbar links
// Get the current page URL
var currentPage = window.location.pathname.split("/").pop();

// Select all navbar links
var navLinks = document.querySelectorAll("nav div a");

// Loop through links to find the matching link
navLinks.forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});
