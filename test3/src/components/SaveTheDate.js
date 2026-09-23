import { downloadIcs, getCalendarUrls } from "../utils/calendar.js";

export class SaveTheDate {
  constructor(data) {
    this.data = data;
    this.isOpen = false;
    this.isSaved = false;
    this.container = null;
    this.button = null;
    this.menu = null;
  }

  render() {
    this.container = document.createElement("div");
    this.container.className = "mt-8 flex flex-col items-center relative select-none";

    const urls = getCalendarUrls(this.data);

    this.container.innerHTML = `
      <!-- Save The Date Main Button -->
      <button
        id="save-date-btn"
        type="button"
        aria-expanded="false"
        class="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs md:text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-300 active:scale-95 bg-primary text-primary-foreground hover:opacity-95"
        style="box-shadow: 0 12px 30px -12px rgba(0,0,0,0.45);"
      >
        <svg
          id="cal-icon-default"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-4 h-4"
        >
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>

        <svg
          id="cal-icon-saved"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-4 h-4 hidden"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>

        <span id="save-date-label">Save the Date</span>
      </button>

      <!-- Calendar Options Dropdown Menu -->
      <div
        id="calendar-menu"
        class="absolute top-full mt-3 z-50 w-72 rounded-xl border border-primary/30 bg-card/95 backdrop-blur-md p-2 shadow-elegant transition-all duration-200 opacity-0 pointer-events-none translate-y-2"
      >
        <button
          data-type="google"
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium text-foreground hover:bg-primary/10 transition-colors text-left"
        >
          <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          Google Calendar
        </button>

        <button
          data-type="apple"
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium text-foreground hover:bg-primary/10 transition-colors text-left"
        >
          <svg class="w-4 h-4 shrink-0 text-foreground" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.56.64-.99 1.7-.87 2.73.99.08 1.98-.49 2.6-1.23"/>
          </svg>
          Apple Calendar (.ics)
        </button>

        <button
          data-type="outlook"
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium text-foreground hover:bg-primary/10 transition-colors text-left"
        >
          <svg class="w-4 h-4 shrink-0 text-[#0078D4]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 4h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zm5 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
          </svg>
          Outlook / Office 365
        </button>

        <button
          data-type="yahoo"
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium text-foreground hover:bg-primary/10 transition-colors text-left"
        >
          <svg class="w-4 h-4 shrink-0 text-[#6001D2]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-4H9V10h4v6zm-1-8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
          </svg>
          Yahoo Calendar
        </button>
      </div>
    `;

    this.button = this.container.querySelector("#save-date-btn");
    this.menu = this.container.querySelector("#calendar-menu");

    this.bindEvents(urls);

    return this.container;
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.button.setAttribute("aria-expanded", String(this.isOpen));

    if (this.isOpen) {
      this.menu.classList.remove("opacity-0", "pointer-events-none", "translate-y-2");
      this.menu.classList.add("opacity-100", "translate-y-0");
    } else {
      this.menu.classList.remove("opacity-100", "translate-y-0");
      this.menu.classList.add("opacity-0", "pointer-events-none", "translate-y-2");
    }
  }

  markSaved() {
    this.isSaved = true;
    const defaultIcon = this.container.querySelector("#cal-icon-default");
    const savedIcon = this.container.querySelector("#cal-icon-saved");
    const label = this.container.querySelector("#save-date-label");

    if (defaultIcon) defaultIcon.classList.add("hidden");
    if (savedIcon) savedIcon.classList.remove("hidden");
    if (label) label.textContent = "Date Saved";

    setTimeout(() => {
      this.isSaved = false;
      if (defaultIcon) defaultIcon.classList.remove("hidden");
      if (savedIcon) savedIcon.classList.add("hidden");
      if (label) label.textContent = "Save the Date";
    }, 2800);
  }

  bindEvents(urls) {
    this.button.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleMenu();
    });

    document.addEventListener("click", (e) => {
      if (this.isOpen && !this.container.contains(e.target)) {
        this.toggleMenu();
      }
    });

    this.menu.querySelectorAll("button[data-type]").forEach((item) => {
      item.addEventListener("click", () => {
        const type = item.getAttribute("data-type");
        if (type === "google" && urls.google) {
          window.open(urls.google, "_blank", "noopener,noreferrer");
        } else if (type === "outlook" && urls.outlook) {
          window.open(urls.outlook, "_blank", "noopener,noreferrer");
        } else if (type === "yahoo" && urls.yahoo) {
          window.open(urls.yahoo, "_blank", "noopener,noreferrer");
        } else {
          downloadIcs(this.data);
        }

        this.toggleMenu();
        this.markSaved();
      });
    });
  }
}
