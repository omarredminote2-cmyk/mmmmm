export class CountdownTimer {
  constructor(dateStr, timeStr) {
    this.targetDate = this.parseTarget(dateStr, timeStr);
    this.container = null;
    this.interval = null;
  }

  parseTarget(dateStr, timeStr) {
    const [y, m, d] = (dateStr || "2026-06-15").split("-").map(Number);
    const [h, min] = (timeStr || "17:00").split(":").map(Number);
    return new Date(y, (m || 1) - 1, d || 1, h || 0, min || 0, 0).getTime();
  }

  render() {
    this.container = document.createElement("section");
    this.container.className =
      "py-16 md:py-20 px-6 relative overflow-hidden text-center section-reveal";

    this.container.innerHTML = `
      <div class="max-w-xl mx-auto text-center relative">
        <!-- Title -->
        <h2 class="font-calligraphy text-4xl md:text-5xl text-primary mb-3">
          Counting Down to Forever
        </h2>

        <!-- Divider Hn -->
        <div class="flex items-center justify-center gap-3 my-6">
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

        <!-- 4 Countdown Cards -->
        <div class="flex justify-center gap-2 sm:gap-4 md:gap-6">
          <!-- Days -->
          <div class="text-center">
            <div class="w-14 sm:w-20 md:w-24 px-1 py-2 sm:px-3 sm:py-3 md:py-4 mb-2 rounded-lg border border-primary/20 bg-primary/10 backdrop-blur-sm shadow-sm">
              <span id="countdown-days" class="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-foreground tabular-nums block">00</span>
            </div>
            <p class="text-[10px] sm:text-xs md:text-sm text-muted-foreground uppercase tracking-wider font-medium">Days</p>
          </div>

          <!-- Hours -->
          <div class="text-center">
            <div class="w-14 sm:w-20 md:w-24 px-1 py-2 sm:px-3 sm:py-3 md:py-4 mb-2 rounded-lg border border-primary/20 bg-primary/10 backdrop-blur-sm shadow-sm">
              <span id="countdown-hours" class="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-foreground tabular-nums block">00</span>
            </div>
            <p class="text-[10px] sm:text-xs md:text-sm text-muted-foreground uppercase tracking-wider font-medium">Hours</p>
          </div>

          <!-- Minutes -->
          <div class="text-center">
            <div class="w-14 sm:w-20 md:w-24 px-1 py-2 sm:px-3 sm:py-3 md:py-4 mb-2 rounded-lg border border-primary/20 bg-primary/10 backdrop-blur-sm shadow-sm">
              <span id="countdown-minutes" class="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-foreground tabular-nums block">00</span>
            </div>
            <p class="text-[10px] sm:text-xs md:text-sm text-muted-foreground uppercase tracking-wider font-medium">Minutes</p>
          </div>

          <!-- Seconds -->
          <div class="text-center">
            <div class="w-14 sm:w-20 md:w-24 px-1 py-2 sm:px-3 sm:py-3 md:py-4 mb-2 rounded-lg border border-primary/20 bg-primary/10 backdrop-blur-sm shadow-sm">
              <span id="countdown-seconds" class="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-foreground tabular-nums block">00</span>
            </div>
            <p class="text-[10px] sm:text-xs md:text-sm text-muted-foreground uppercase tracking-wider font-medium">Seconds</p>
          </div>
        </div>
      </div>
    `;

    this.startTimer();

    return this.container;
  }

  pad(num) {
    return String(Math.max(0, num)).padStart(2, "0");
  }

  update() {
    const now = Date.now();
    const diff = this.targetDate - now;

    const daysEl = this.container.querySelector("#countdown-days");
    const hoursEl = this.container.querySelector("#countdown-hours");
    const minutesEl = this.container.querySelector("#countdown-minutes");
    const secondsEl = this.container.querySelector("#countdown-seconds");

    if (diff <= 0) {
      if (daysEl) daysEl.textContent = "00";
      if (hoursEl) hoursEl.textContent = "00";
      if (minutesEl) minutesEl.textContent = "00";
      if (secondsEl) secondsEl.textContent = "00";
      if (this.interval) clearInterval(this.interval);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = this.pad(days);
    if (hoursEl) hoursEl.textContent = this.pad(hours);
    if (minutesEl) minutesEl.textContent = this.pad(minutes);
    if (secondsEl) secondsEl.textContent = this.pad(seconds);
  }

  startTimer() {
    this.update();
    this.interval = setInterval(() => this.update(), 1000);
  }
}
