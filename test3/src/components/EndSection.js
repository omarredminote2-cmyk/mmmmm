export class EndSection {
  constructor(data) {
    this.data = data;
  }

  render() {
    const container = document.createElement("div");
    container.className = "relative select-none section-reveal";
    container.style.backgroundImage = `url(${this.data.assets.endBg})`;
    container.style.backgroundPosition = "bottom center";
    container.style.backgroundRepeat = "no-repeat";
    container.style.backgroundSize = "100% auto";

    container.innerHTML = `
      <!-- End Message Section -->
      <section class="py-16 md:py-24 px-6 relative overflow-hidden text-center">
        <div class="max-w-lg mx-auto text-center">
          <!-- Top Wave Ornament _d -->
          <svg viewBox="0 0 400 40" class="w-full text-primary mb-8 max-w-md mx-auto opacity-70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 20 Q50 5 100 20 Q150 35 200 20 Q250 5 300 20 Q350 35 400 20" stroke="currentColor" stroke-width="1" opacity="0.3"></path>
            <path d="M0 20 Q50 10 100 20 Q150 30 200 20 Q250 10 300 20 Q350 30 400 20" stroke="currentColor" stroke-width="0.5" opacity="0.6"></path>
            <circle cx="200" cy="20" r="3" fill="currentColor"></circle>
            <circle cx="100" cy="20" r="2" fill="currentColor" opacity="0.5"></circle>
            <circle cx="300" cy="20" r="2" fill="currentColor" opacity="0.5"></circle>
          </svg>

          <!-- Main End Message -->
          <p class="font-calligraphy text-4xl md:text-5xl text-primary leading-relaxed mb-4 whitespace-pre-line">
            ${this.data.endMessage}
          </p>

          <!-- Couple Sub Closing -->
          <p class="font-calligraphy text-2xl text-muted-foreground whitespace-pre-line mt-3">
            ${this.data.subClosing}
          </p>

          <!-- Bottom Wave Ornament _d (Rotated 180deg) -->
          <svg viewBox="0 0 400 40" class="w-full text-primary mt-8 rotate-180 max-w-md mx-auto opacity-70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 20 Q50 5 100 20 Q150 35 200 20 Q250 5 300 20 Q350 35 400 20" stroke="currentColor" stroke-width="1" opacity="0.3"></path>
            <path d="M0 20 Q50 10 100 20 Q150 30 200 20 Q250 10 300 20 Q350 30 400 20" stroke="currentColor" stroke-width="0.5" opacity="0.6"></path>
            <circle cx="200" cy="20" r="3" fill="currentColor"></circle>
            <circle cx="100" cy="20" r="2" fill="currentColor" opacity="0.5"></circle>
            <circle cx="300" cy="20" r="2" fill="currentColor" opacity="0.5"></circle>
          </svg>
        </div>
      </section>

      <!-- Footer -->
      <footer class="py-10 px-9 md:px-12 text-center border-t border-border relative">
        <!-- Corner Ornaments ji -->
        <svg
          viewBox="0 0 100 100"
          class="absolute top-2 left-2 w-12 h-12 text-primary opacity-15 pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 5C5 5 20 10 30 25C40 40 35 55 25 60C15 65 10 55 15 45C20 35 35 30 45 35C55 40 50 55 40 60" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.5" />
          <path d="M10 2C10 2 25 8 32 20C39 32 36 42 30 46" stroke="currentColor" stroke-width="0.7" stroke-linecap="round" opacity="0.3" />
          <circle cx="5" cy="5" r="2" fill="currentColor" opacity="0.6" />
        </svg>

        <svg
          viewBox="0 0 100 100"
          class="absolute top-2 right-2 w-12 h-12 text-primary opacity-15 -scale-x-100 pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 5C5 5 20 10 30 25C40 40 35 55 25 60C15 65 10 55 15 45C20 35 35 30 45 35C55 40 50 55 40 60" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.5" />
          <path d="M10 2C10 2 25 8 32 20C39 32 36 42 30 46" stroke="currentColor" stroke-width="0.7" stroke-linecap="round" opacity="0.3" />
          <circle cx="5" cy="5" r="2" fill="currentColor" opacity="0.6" />
        </svg>

        <p class="font-calligraphy text-xl text-primary whitespace-pre-line mb-2">
          ${this.data.subClosing}
        </p>

        <p class="text-xs text-muted-foreground mt-2">
          Create your own Invitation on
          <a
            href="https://zareqia.com"
            target="_blank"
            rel="noopener noreferrer"
            class="font-calligraphic text-base gold-gradient-text font-semibold hover:opacity-80 transition-opacity ml-1"
          >
            Zareqia
          </a>
        </p>
      </footer>
    `;

    return container;
  }
}
