export class WelcomeSection {
  constructor(data) {
    this.data = data;
  }

  render() {
    const section = document.createElement("section");
    section.className = "relative px-10 py-24 md:px-14 md:py-32 overflow-hidden section-reveal";

    section.innerHTML = `
      <div class="max-w-2xl mx-auto text-center relative">
        <!-- Top Ornament -->
        <div class="flex items-center justify-center gap-3 mb-8">
          <div class="h-px w-20" style="background: linear-gradient(to right, transparent, #8a7a4e);"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="1"
            class="text-[#8a7a4e]"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <div class="h-px w-20" style="background: linear-gradient(to left, transparent, #8a7a4e);"></div>
        </div>

        <!-- Welcome Text -->
        <p
          class="font-calligraphic text-2xl md:text-3xl leading-relaxed italic whitespace-pre-wrap break-words text-[#3b4432]"
          style="text-shadow: 0 1px 6px rgba(255,255,255,0.5);"
        >
          ${this.data.welcomeMessage}
        </p>

        <!-- Bottom Ornament -->
        <div class="flex items-center justify-center gap-3 mt-8">
          <div class="h-px w-20" style="background: linear-gradient(to right, transparent, #8a7a4e);"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="1"
            class="text-[#8a7a4e]"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <div class="h-px w-20" style="background: linear-gradient(to left, transparent, #8a7a4e);"></div>
        </div>
      </div>
    `;

    return section;
  }
}
