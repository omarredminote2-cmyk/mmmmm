export class AudioPlayer {
  constructor(audioSrc) {
    this.audioSrc = audioSrc;
    this.isPlaying = false;
    this.audio = null;
    this.button = null;
  }

  render() {
    // Audio element
    this.audio = document.createElement("audio");
    this.audio.src = this.audioSrc;
    this.audio.loop = true;
    this.audio.preload = "auto";
    document.body.appendChild(this.audio);

    // Floating Button
    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.setAttribute("aria-label", "Toggle background music");
    this.button.className =
      "fixed top-4 right-4 z-50 flex items-center justify-center w-10 h-10 rounded-full border border-primary/50 text-primary-foreground bg-primary hover:bg-primary/90 backdrop-blur-sm shadow-gold transition-all duration-300 active:scale-95";

    this.updateIcon();

    this.button.addEventListener("click", () => {
      this.toggle();
    });

    // Auto-attempt playback on first global user interaction if not started yet
    const startAudioOnInteraction = () => {
      if (!this.isPlaying && this.audio) {
        this.play().catch(() => {});
      }
      window.removeEventListener("click", startAudioOnInteraction);
      window.removeEventListener("touchstart", startAudioOnInteraction);
    };

    window.addEventListener("click", startAudioOnInteraction, { once: true });
    window.addEventListener("touchstart", startAudioOnInteraction, { once: true });

    return this.button;
  }

  updateIcon() {
    if (this.isPlaying) {
      // Volume2 icon
      this.button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
        </svg>
      `;
    } else {
      // VolumeX icon
      this.button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="22" y1="9" x2="16" y2="15"></line>
          <line x1="16" y1="9" x2="22" y2="15"></line>
        </svg>
      `;
    }
  }

  async play() {
    if (!this.audio) return;
    try {
      await this.audio.play();
      this.isPlaying = true;
      this.updateIcon();
    } catch (e) {
      console.log("Audio autoplay prevented or failed:", e);
    }
  }

  pause() {
    if (!this.audio) return;
    this.audio.pause();
    this.isPlaying = false;
    this.updateIcon();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }
}
