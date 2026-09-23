import { formatDateTime } from "../utils/calendar.js";

export class PreWeddingEvents {
  constructor(events) {
    this.events = events || [];
  }

  render() {
    const section = document.createElement("section");
    section.className = "py-16 md:py-20 px-6 relative overflow-hidden section-reveal";

    section.innerHTML = `
      <div class="max-w-md mx-auto text-center">
        <!-- PartyPopper Icon -->
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
          <path d="M5.8 11.3 2 22l10.7-3.79" />
          <path d="M4 3h.01" />
          <path d="M22 8h.01" />
          <path d="M15 2h.01" />
          <path d="M22 20h.01" />
          <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" />
          <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.7 1.22-1.4 1.22H17" />
          <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.91 9 5.5 9 6.2V7" />
          <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z" />
        </svg>

        <!-- Title -->
        <h2 class="font-calligraphy text-4xl md:text-5xl text-primary mb-2 text-center">
          Pre-Wedding Events
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

        <!-- Events List -->
        <div class="space-y-6 mt-8">
          ${this.events
            .map((item) => {
              const formattedTime = formatDateTime(item.dateTime);
              return `
              <div class="text-center py-4 border-b border-primary/20 last:border-b-0">
                <p class="font-display font-semibold text-primary text-lg leading-tight">
                  ${item.name}
                </p>
                ${
                  formattedTime
                    ? `<p class="text-sm text-foreground mt-1 font-medium">${formattedTime}</p>`
                    : ""
                }
                ${
                  item.description
                    ? `<p class="text-sm text-muted-foreground mt-1 whitespace-pre-wrap break-words">${item.description}</p>`
                    : ""
                }
              </div>
            `;
            })
            .join("")}
        </div>
      </div>
    `;

    return section;
  }
}
