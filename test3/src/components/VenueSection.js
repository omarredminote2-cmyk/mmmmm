export class VenueSection {
  constructor(data) {
    this.data = data;
  }

  render() {
    const section = document.createElement("section");
    section.className = "py-16 md:py-20 px-6 relative overflow-hidden section-reveal";

    const fullAddress = [this.data.venueName, this.data.venueAddress].filter(Boolean).join(", ");
    const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
      fullAddress
    )}&t=m&z=14&output=embed`;
    const mapDirectUrl =
      this.data.googleMapsLink ||
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

    section.innerHTML = `
      <div class="max-w-2xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-6">
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
            class="mx-auto text-primary mb-4"
          >
            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
            <circle cx="12" cy="10" r="3" />
          </svg>

          <h2 class="font-calligraphy text-4xl md:text-5xl text-primary mb-2 text-center">
            Venue
          </h2>

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

        <!-- Venue Name & Address -->
        <div class="text-center mb-8">
          <p class="font-display text-xl font-semibold mb-2 text-foreground">
            ${this.data.venueName}
          </p>
          <p class="text-muted-foreground text-sm sm:text-base">
            ${this.data.venueAddress}
          </p>
        </div>

        <!-- Embedded Map -->
        <div class="max-w-2xl mx-auto rounded-xl overflow-hidden shadow-elegant mb-8 border border-primary/20">
          <iframe
            src="${mapEmbedUrl}"
            width="100%"
            height="300"
            style="border: 0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Venue Map"
          ></iframe>
        </div>

        <!-- Ornate Palace Arch Vector & CTA Button -->
        <div class="max-w-sm mx-auto text-center">
          <svg
            viewBox="0 0 800 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="w-full text-primary opacity-20 mb-4"
          >
            <rect x="100" y="250" width="600" height="10" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"></rect>
            <path d="M350 250 V160 Q350 80 400 60 Q450 80 450 160 V250" stroke="currentColor" stroke-width="1.5" fill="none"></path>
            <circle cx="400" cy="55" r="4" fill="currentColor"></circle>
            <path d="M375 250 V175 Q375 110 400 95 Q425 110 425 175 V250" stroke="currentColor" stroke-width="1" fill="none"></path>
            <line x1="200" y1="250" x2="200" y2="180" stroke="currentColor" stroke-width="1.5"></line>
            <line x1="600" y1="250" x2="600" y2="180" stroke="currentColor" stroke-width="1.5"></line>
            <path d="M180 180 H220 V160 Q200 145 180 160 Z" stroke="currentColor" stroke-width="1.5" fill="none"></path>
            <path d="M580 180 H620 V160 Q600 145 580 160 Z" stroke="currentColor" stroke-width="1.5" fill="none"></path>
          </svg>

          <a
            href="${mapDirectUrl}"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block px-8 py-3 rounded-lg bg-primary text-primary-foreground font-display font-medium text-sm shadow-gold hover:opacity-90 transition-all duration-300"
          >
            View on Google Maps
          </a>
        </div>
      </div>
    `;

    return section;
  }
}
