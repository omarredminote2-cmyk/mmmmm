import { formatDateTime } from "../utils/calendar.js";

export class ProgramTimeline {
  constructor(items) {
    this.items = items || [];
  }

  render() {
    const section = document.createElement("section");
    section.className = "py-16 md:py-20 px-6 relative overflow-hidden section-reveal";

    section.innerHTML = `
      <div class="text-center mb-10">
        <!-- Clock Icon -->
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
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>

        <!-- Title -->
        <h2 class="font-calligraphy text-4xl md:text-5xl text-primary mb-2">
          Program Timeline
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

      <!-- Timeline Items -->
      <div class="max-w-md mx-auto">
        ${this.items
          .map((item, idx) => {
            const isLast = idx === this.items.length - 1;
            const timeFormatted = formatDateTime(item.dateTime);

            return `
            <div class="flex gap-4 mb-6 last:mb-0">
              <!-- Left Marker -->
              <div class="flex flex-col items-center pt-1.5">
                <div class="w-3 h-3 rounded-full bg-primary shadow-gold"></div>
                ${!isLast ? '<div class="w-px flex-1 bg-primary/30 mt-1 min-h-[40px]"></div>' : ""}
              </div>

              <!-- Right Content -->
              <div class="pb-4 flex-1">
                <p class="text-primary font-display font-semibold text-lg leading-tight">
                  ${item.name}
                </p>
                ${
                  timeFormatted
                    ? `<p class="text-sm text-foreground mt-1 font-medium">${timeFormatted}</p>`
                    : ""
                }
                ${
                  item.description
                    ? `<p class="text-sm text-muted-foreground mt-1 whitespace-pre-wrap break-words leading-relaxed">${item.description}</p>`
                    : ""
                }
              </div>
            </div>
          `;
          })
          .join("")}
      </div>
    `;

    return section;
  }
}
