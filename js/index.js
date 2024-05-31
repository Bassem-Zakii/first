"use strict";

// header navbar

const navBtn = document.querySelector("header .nav-btn");
const headerNav = document.querySelector("header");

navBtn.addEventListener("click", () => {
  navBtn.classList.toggle("active");
  headerNav.classList.toggle("active");
});

window.onscroll = () => {
  this.scrollY > 20
    ? headerNav.classList.add("headerBgColor")
    : headerNav.classList.remove("headerBgColor");
};

// carousal function control

const carousal = function (name) {
  const carousalList = document.querySelector(`${name} .carousal-list`);
  const carousalItems = document.querySelectorAll(`${name} .carousal-list li`);
  const carousalDots = document.querySelector(`${name} .carousal-dots`);

  let currentSlide = 0;

  // Create dots and add event listeners
  carousalItems.forEach((item, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    carousalDots.appendChild(dot);

    dot.addEventListener("click", () => {
      goToSlide(index);
    });
  });

  // Initialize the first dot as active
  const dots = document.querySelectorAll(`${name} .dot`);
  dots[currentSlide].classList.add("active");

  // Auto slider function
  function nextSlide() {
    currentSlide = (currentSlide + 1) % carousalItems.length;
    goToSlide(currentSlide);
  }

  // Go to a specific slide
  function goToSlide(slideIndex) {
    carousalList.style.transform = `translateX(-${slideIndex * 100}%)`;

    // Update active dot
    dots.forEach((dot, index) => {
      if (index === slideIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  // Set an interval for auto sliding
  const autoSlideInterval = setInterval(nextSlide, 5000); // Change the delay as needed

  // Pause auto sliding on touch
  let touchStartX = 0;
  let touchEndX = 0;

  carousalList.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    clearInterval(autoSlideInterval);
  });

  carousalList.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      currentSlide =
        (currentSlide - 1 + carousalItems.length) % carousalItems.length;
      goToSlide(currentSlide);
    }

    // Restart auto sliding
    autoSlideInterval = setInterval(nextSlide, 5000);
  });
};

carousal(".quote");
carousal(".vista");

// quote section disclosures

const disclosures = function () {
  const showDisclosuresBtn = document.querySelector(
    ".quote .disclosures button"
  );
  const closeDisclosuresBtn = document.querySelector(
    ".quote .disclosures span.close"
  );
  const disclosuresContent = document.querySelector(
    ".quote .disclosures .disclosures-content"
  );

  showDisclosuresBtn.addEventListener("click", () => {
    disclosuresContent.classList.add("active");
  });
  closeDisclosuresBtn.addEventListener("click", () => {
    disclosuresContent.classList.remove("active");
  });
};

disclosures();
