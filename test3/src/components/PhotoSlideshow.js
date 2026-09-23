export class PhotoSlideshow {
  constructor(images) {
    this.images = images || [];
    this.currentIndex = 0;
    this.container = null;
    this.timer = null;
    this.startX = 0;
    this.currentX = 0;
    this.isDragging = false;
  }

  render() {
    this.container = document.createElement("section");
    this.container.className =
      "py-16 md:py-20 px-6 relative overflow-hidden section-reveal";

    this.container.innerHTML = `
      <div class="text-center mb-6">
        <!-- Divider Hn -->
        <div class="flex items-center justify-center gap-3 my-4">
          <div class="w-16 h-px bg-primary/30"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="text-primary opacity-50"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <div class="w-16 h-px bg-primary/30"></div>
        </div>
      </div>

      <!-- Slideshow Carousel Container -->
      <div
        id="slideshow-box"
        class="relative w-full max-w-3xl mx-auto aspect-[3/2] rounded-xl overflow-hidden shadow-elegant select-none cursor-grab active:cursor-grabbing"
      >
        <!-- Slides -->
        <div id="slides-wrapper" class="absolute inset-0">
          ${this.images
            .map(
              (src, idx) => `
            <img
              src="${src}"
              alt="Wedding moment ${idx + 1}"
              class="slide-img absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-1000 ease-in-out ${
                idx === 0 ? "opacity-100 z-10" : "opacity-0 z-0"
              }"
              loading="lazy"
            />
          `
            )
            .join("")}
        </div>

        <!-- Gradient Vignette -->
        <div class="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent pointer-events-none z-20"></div>

        <!-- Pagination Indicators -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none z-30">
          ${this.images
            .map(
              (_, idx) => `
            <span
              id="slide-dot-${idx}"
              class="slide-dot h-2 rounded-full transition-all duration-300 ${
                idx === 0 ? "bg-primary w-4" : "bg-foreground/30 w-2"
              }"
            ></span>
          `
            )
            .join("")}
        </div>
      </div>
    `;

    this.initSlider();

    return this.container;
  }

  goToSlide(index) {
    const total = this.images.length;
    this.currentIndex = (index % total + total) % total;

    const slides = this.container.querySelectorAll(".slide-img");
    const dots = this.container.querySelectorAll(".slide-dot");

    slides.forEach((slide, idx) => {
      if (idx === this.currentIndex) {
        slide.classList.remove("opacity-0", "z-0");
        slide.classList.add("opacity-100", "z-10");
      } else {
        slide.classList.remove("opacity-100", "z-10");
        slide.classList.add("opacity-0", "z-0");
      }
    });

    dots.forEach((dot, idx) => {
      if (idx === this.currentIndex) {
        dot.className = "slide-dot h-2 rounded-full transition-all duration-300 bg-primary w-4";
      } else {
        dot.className = "slide-dot h-2 rounded-full transition-all duration-300 bg-foreground/30 w-2";
      }
    });
  }

  nextSlide() {
    this.goToSlide(this.currentIndex + 1);
  }

  prevSlide() {
    this.goToSlide(this.currentIndex - 1);
  }

  startAutoCycle() {
    this.stopAutoCycle();
    this.timer = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  stopAutoCycle() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  initSlider() {
    const box = this.container.querySelector("#slideshow-box");
    if (!box) return;

    this.startAutoCycle();

    // Mouse drag support
    box.addEventListener("mousedown", (e) => {
      this.isDragging = true;
      this.startX = e.clientX;
      this.currentX = e.clientX;
      this.stopAutoCycle();
    });

    window.addEventListener("mousemove", (e) => {
      if (!this.isDragging) return;
      this.currentX = e.clientX;
    });

    window.addEventListener("mouseup", () => {
      if (!this.isDragging) return;
      this.isDragging = false;
      const diff = this.currentX - this.startX;
      if (diff < -50) {
        this.nextSlide();
      } else if (diff > 50) {
        this.prevSlide();
      }
      this.startAutoCycle();
    });

    // Touch swipe support
    box.addEventListener(
      "touchstart",
      (e) => {
        this.isDragging = true;
        this.startX = e.touches[0].clientX;
        this.currentX = e.touches[0].clientX;
        this.stopAutoCycle();
      },
      { passive: true }
    );

    box.addEventListener(
      "touchmove",
      (e) => {
        if (!this.isDragging) return;
        this.currentX = e.touches[0].clientX;
      },
      { passive: true }
    );

    box.addEventListener("touchend", () => {
      if (!this.isDragging) return;
      this.isDragging = false;
      const diff = this.currentX - this.startX;
      if (diff < -40) {
        this.nextSlide();
      } else if (diff > 40) {
        this.prevSlide();
      }
      this.startAutoCycle();
    });
  }
}
