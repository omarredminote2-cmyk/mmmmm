export class InfoCardsSection {
  constructor(data) {
    this.data = data;
  }

  render() {
    const fragment = document.createDocumentFragment();

    // 1. Transportation
    if (this.data.showTransportation && this.data.transportation) {
      const transSection = document.createElement("section");
      transSection.className = "py-16 md:py-20 px-6 relative overflow-hidden section-reveal";
      transSection.innerHTML = `
        <div class="max-w-md mx-auto text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="mx-auto text-primary mb-3"
          >
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
            <circle cx="7" cy="17" r="2" />
            <path d="M9 17h6" />
            <circle cx="17" cy="17" r="2" />
          </svg>

          <h2 class="font-calligraphy text-4xl md:text-5xl text-primary mb-2 text-center">
            Transportation
          </h2>

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

          <p class="text-muted-foreground whitespace-pre-line leading-relaxed mt-4">
            ${this.data.transportation}
          </p>
        </div>
      `;
      fragment.appendChild(transSection);
    }

    // 2. Accommodation
    if (this.data.showAccommodation && this.data.accommodation) {
      const accomSection = document.createElement("section");
      accomSection.className = "py-16 md:py-20 px-6 relative overflow-hidden section-reveal";
      accomSection.innerHTML = `
        <div class="max-w-md mx-auto text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="mx-auto text-primary mb-3"
          >
            <path d="M10 22v-6.57" />
            <path d="M12 11h.01" />
            <path d="M12 7h.01" />
            <path d="M14 15.43V22" />
            <path d="M15 11h.01" />
            <path d="M15 7h.01" />
            <path d="M16 16h2a2 2 0 0 0 2-2V3a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2h2" />
            <path d="M20 22v-4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4" />
            <path d="M9 11h.01" />
            <path d="M9 7h.01" />
          </svg>

          <h2 class="font-calligraphy text-4xl md:text-5xl text-primary mb-2 text-center">
            Accommodation
          </h2>

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

          <p class="text-muted-foreground whitespace-pre-line leading-relaxed mt-4">
            ${this.data.accommodation}
          </p>
        </div>
      `;
      fragment.appendChild(accomSection);
    }

    // 3. Gifts
    if (this.data.showGift && this.data.giftMessage) {
      const giftSection = document.createElement("section");
      giftSection.className = "py-16 md:py-20 px-6 relative overflow-hidden section-reveal";
      giftSection.innerHTML = `
        <div class="max-w-md mx-auto text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="mx-auto text-primary mb-3"
          >
            <rect x="3" y="8" width="18" height="4" rx="1" />
            <path d="M12 8v13" />
            <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
            <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
          </svg>

          <h2 class="font-calligraphy text-4xl md:text-5xl text-primary mb-2 text-center">
            Gifts
          </h2>

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

          <p class="text-muted-foreground whitespace-pre-line leading-relaxed break-words mt-4">
            ${this.data.giftMessage}
          </p>
        </div>
      `;
      fragment.appendChild(giftSection);
    }

    return fragment;
  }
}
