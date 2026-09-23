export class HeroSection {
  constructor(data, onUnlock) {
    this.data = data;
    this.onUnlock = onUnlock;
    this.section = null;
    this.video = null;
    this.content = null;
    this.scrollIndicator = null;
    this.hasUnlocked = false;
    this.started = false;
  }

  render() {
    this.section = document.createElement("section");
    this.section.className =
      "relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-[#0f0f0f] cursor-pointer select-none";

    this.section.innerHTML = `
      <!-- Pure Video (Clean, no overlays/icons/extra text) -->
      <video
        id="hero-video"
        src="${this.data.assets.heroVideo}"
        class="absolute inset-0 h-full w-full cursor-pointer object-cover"
        playsinline
        muted
        preload="auto"
        disablepictureinpicture
        controlslist="nodownload noplaybackrate noremoteplayback nofullscreen"
      ></video>

      <!-- Center Couple Reveal Content (Animates in after curtains open) -->
      <div
        id="hero-content"
        class="relative -top-12 md:-top-16 z-10 flex w-full flex-col items-center justify-center px-6 text-center pointer-events-none transition-all duration-1000 opacity-0 translate-y-8"
      >
        <!-- Heart Emblem -->
        <div class="mb-3 transition-all duration-1000 delay-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="1"
            class="mx-auto text-[#3b4432]"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </div>

        <!-- Invitation Message -->
        <p
          class="mb-3 whitespace-pre-line font-dancing text-2xl md:text-4xl text-[#3b4432] transition-all duration-1000 delay-300"
          style="text-shadow: 0 2px 12px rgba(255,255,255,0.6);"
          data-invitation-message="true"
        >
          ${this.data.message}
        </p>

        <!-- Divider with heart -->
        <div class="my-3 flex items-center justify-center gap-3 transition-all duration-1000 delay-400">
          <div class="h-px w-16 bg-[#3b4432]/45"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="1"
            class="text-[#3b4432]"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <div class="h-px w-16 bg-[#3b4432]/45"></div>
        </div>

        <!-- Groom Name -->
        <h1
          data-couple-name="groom"
          class="font-dancing text-6xl leading-none md:text-9xl text-[#3b4432] transition-all duration-1000 delay-500"
          style="text-shadow: 0 2px 14px rgba(255,255,255,0.6);"
        >
          ${this.data.groomName}
        </h1>

        <!-- Ampersand -->
        <p
          data-couple-amp="true"
          class="my-2 font-dancing text-3xl md:text-4xl text-[#3b4432]/85 transition-all duration-1000 delay-700"
          style="text-shadow: 0 2px 10px rgba(255,255,255,0.55);"
        >
          &
        </p>

        <!-- Bride Name -->
        <h1
          data-couple-name="bride"
          class="font-dancing text-6xl leading-none md:text-9xl text-[#3b4432] transition-all duration-1000 delay-900"
          style="text-shadow: 0 2px 14px rgba(255,255,255,0.6);"
        >
          ${this.data.brideName}
        </h1>
      </div>

      <!-- Bouncing Scroll Down Indicator -->
      <div
        id="hero-scroll"
        class="absolute inset-x-0 bottom-20 z-10 flex flex-col items-center gap-2 pointer-events-none transition-all duration-1000 delay-1000 opacity-0"
      >
        <div class="animate-scroll-bounce flex flex-col items-center gap-2">
          <span
            class="text-xs uppercase tracking-widest text-[#3b4432]/70 font-semibold"
            style="text-shadow: 0 1px 6px rgba(255,255,255,0.6);"
          >
            Scroll
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3b4432"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-5 h-5 text-[#3b4432]"
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </div>
      </div>
    `;

    this.video = this.section.querySelector("#hero-video");
    this.content = this.section.querySelector("#hero-content");
    this.scrollIndicator = this.section.querySelector("#hero-scroll");

    this.bindEvents();

    return this.section;
  }

  showContent() {
    if (this.content) {
      this.content.classList.remove("opacity-0", "translate-y-8");
      this.content.classList.add("opacity-100", "translate-y-0");
    }
    if (this.scrollIndicator) {
      this.scrollIndicator.classList.remove("opacity-0");
      this.scrollIndicator.classList.add("opacity-100");
    }
    if (this.onUnlock && !this.hasUnlocked) {
      this.hasUnlocked = true;
      this.onUnlock();
    }
  }

  bindEvents() {
    const video = this.video;
    const section = this.section;
    if (!video || !section) return;

    const startPresentation = async () => {
      if (this.started) return;
      this.started = true;

      try {
        video.muted = true;
        await video.play();
      } catch (e) {
        console.log("Video playback error:", e);
      }

      // Reveal names and unlock website after curtain opening (5.5s)
      window.setTimeout(() => {
        this.showContent();
      }, 5500);
    };

    section.addEventListener("click", startPresentation);
    video.addEventListener("click", startPresentation);

    video.addEventListener("ended", () => {
      this.showContent();
      try {
        video.pause();
      } catch {}
    });
  }
}
