export class RsvpSection {
  constructor(data) {
    this.data = data;
    this.isSubmitted = false;
    this.container = null;
    this.form = null;
  }

  render() {
    this.container = document.createElement("section");
    this.container.className =
      "py-16 md:py-20 px-6 relative overflow-hidden section-reveal";

    this.container.innerHTML = `
      <!-- Corner Flourish SVGs -->
      <svg
        viewBox="0 0 100 100"
        class="absolute bottom-4 left-4 w-16 h-16 text-primary opacity-20 -scale-y-100 pointer-events-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M5 5C5 5 20 10 30 25C40 40 35 55 25 60C15 65 10 55 15 45C20 35 35 30 45 35C55 40 50 55 40 60" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.5" />
        <path d="M10 2C10 2 25 8 32 20C39 32 36 42 30 46" stroke="currentColor" stroke-width="0.7" stroke-linecap="round" opacity="0.3" />
        <circle cx="5" cy="5" r="2" fill="currentColor" opacity="0.6" />
      </svg>

      <svg
        viewBox="0 0 100 100"
        class="absolute bottom-4 right-4 w-16 h-16 text-primary opacity-20 -scale-x-100 -scale-y-100 pointer-events-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M5 5C5 5 20 10 30 25C40 40 35 55 25 60C15 65 10 55 15 45C20 35 35 30 45 35C55 40 50 55 40 60" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.5" />
        <path d="M10 2C10 2 25 8 32 20C39 32 36 42 30 46" stroke="currentColor" stroke-width="0.7" stroke-linecap="round" opacity="0.3" />
        <circle cx="5" cy="5" r="2" fill="currentColor" opacity="0.6" />
      </svg>

      <div class="max-w-md mx-auto text-center mb-8">
        <!-- Mail Icon -->
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
          <rect width="20" height="16" x="2" y="4" rx="2"></rect>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
        </svg>

        <!-- Title -->
        <h2 class="font-calligraphy text-4xl md:text-5xl text-primary mb-3 text-center">
          RSVP
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

      <!-- Form Container -->
      <div id="rsvp-content" class="max-w-md mx-auto">
        <form id="rsvp-form" class="space-y-4">
          <!-- Name Field -->
          <div class="space-y-2 text-left">
            <label class="text-sm font-medium text-foreground block">
              Your Name <span class="text-destructive ml-0.5">*</span>
            </label>
            <input
              type="text"
              id="rsvp-name"
              required
              placeholder="Your full name"
              class="w-full rounded-md border border-border bg-card text-card-foreground px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/60"
            />
          </div>

          <!-- Attending Select -->
          <div class="space-y-2 text-left">
            <label class="text-sm font-medium text-foreground flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              Will you be attending? <span class="text-destructive ml-0.5">*</span>
            </label>
            <select
              id="rsvp-attending"
              required
              class="w-full rounded-md border border-border bg-card text-card-foreground px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/60 cursor-pointer"
            >
              <option value="" disabled selected>Select...</option>
              <option value="yes">Yes, I'll be there!</option>
              <option value="no">Sorry, I can't make it</option>
            </select>
          </div>

          <!-- Guest Count (conditional) -->
          <div id="rsvp-guest-box" class="space-y-2 text-left hidden">
            <label class="text-sm font-medium text-foreground block">
              How many guests?
            </label>
            <input
              type="number"
              id="rsvp-guests"
              min="1"
              max="20"
              value="1"
              class="w-full rounded-md border border-border bg-card text-card-foreground px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/60"
            />
          </div>

          <!-- Message Field -->
          <div class="space-y-2 text-left">
            <label class="text-sm font-medium text-foreground block">
              Your Message
            </label>
            <textarea
              id="rsvp-message"
              rows="3"
              placeholder="Write your wishes..."
              class="w-full rounded-md border border-border bg-card text-card-foreground px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/60"
            ></textarea>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            id="rsvp-submit-btn"
            class="w-full rounded-md bg-primary text-primary-foreground py-2.5 px-4 font-semibold text-sm shadow-gold hover:opacity-90 active:scale-[0.99] transition-all duration-200"
          >
            Send Message
          </button>
        </form>

        <!-- Success Message (Initially Hidden) -->
        <div id="rsvp-success" class="text-center py-8 hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="mx-auto text-primary mb-3"
          >
            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
          </svg>
          <p class="font-calligraphy text-2xl text-primary font-bold">
            Message sent successfully!
          </p>
          <p class="text-sm text-muted-foreground mt-2">
            The couple will receive your message.
          </p>
        </div>
      </div>
    `;

    this.bindEvents();

    return this.container;
  }

  bindEvents() {
    const attendingSelect = this.container.querySelector("#rsvp-attending");
    const guestBox = this.container.querySelector("#rsvp-guest-box");
    const form = this.container.querySelector("#rsvp-form");
    const successBox = this.container.querySelector("#rsvp-success");

    attendingSelect.addEventListener("change", () => {
      if (attendingSelect.value === "yes") {
        guestBox.classList.remove("hidden");
      } else {
        guestBox.classList.add("hidden");
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = this.container.querySelector("#rsvp-submit-btn");
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      setTimeout(() => {
        form.classList.add("hidden");
        successBox.classList.remove("hidden");
      }, 600);
    });
  }
}
