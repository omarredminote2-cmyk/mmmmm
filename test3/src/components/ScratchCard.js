import { formatDate, formatDay, formatTime } from "../utils/calendar.js";

export class ScratchCard {
  constructor(data, onRevealed) {
    this.data = data;
    this.onRevealed = onRevealed;
    this.container = null;
    this.canvas = null;
    this.ctx = null;
    this.isRevealed = false;
    this.isDrawing = false;
    this.lastPoint = null;
  }

  render() {
    this.container = document.createElement("div");
    this.container.className = "text-center relative select-none";

    const formattedDate = formatDate(this.data.weddingDate);
    const dayOfWeek = formatDay(this.data.weddingDate);
    const formattedTime = formatTime(this.data.weddingTime);

    this.container.innerHTML = `
      <!-- SVG Clip Path for Heart -->
      <svg width="0" height="0" style="position: absolute;" aria-hidden="true">
        <defs>
          <clipPath id="royal-heart-clip" clipPathUnits="objectBoundingBox">
            <path d="M0.5,0.96 C0.5,0.96 0.06,0.70 0.06,0.36 C0.06,0.18 0.20,0.06 0.32,0.06 C0.42,0.06 0.48,0.14 0.5,0.24 C0.52,0.14 0.58,0.06 0.68,0.06 C0.80,0.06 0.94,0.18 0.94,0.36 C0.94,0.70 0.5,0.96 0.5,0.96 Z" />
          </clipPath>
        </defs>
      </svg>

      <!-- Section Title -->
      <div id="scratch-header" class="transition-opacity duration-500">
        <h2 id="scratch-title" class="font-calligraphy text-4xl md:text-5xl mb-3 text-[#37482b] animate-pulse-scale">
          Scratch to Reveal
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
      </div>

      <!-- Heart Card Container -->
      <div class="relative mx-auto aspect-[13/12] w-full max-w-[220px] sm:max-w-[260px]">
        <!-- Shadow element -->
        <div
          aria-hidden="true"
          class="absolute inset-0 pointer-events-none"
          style="clip-path: url(#royal-heart-clip); filter: drop-shadow(0 10px 18px rgba(74, 85, 64, 0.30));"
        ></div>

        <!-- Clipped Content Wrapper -->
        <div
          class="absolute inset-0 overflow-hidden"
          style="clip-path: url(#royal-heart-clip); -webkit-clip-path: url(#royal-heart-clip);"
        >
          <!-- Revealed Date Background & Typography -->
          <div
            class="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            style="background-color: hsl(45, 40%, 96%); background-image: radial-gradient(ellipse at center, hsla(45, 45%, 99%, 0.9) 0%, hsla(45, 30%, 90%, 0.5) 70%, hsla(90, 20%, 84%, 0.6) 100%), radial-gradient(circle at 1px 1px, hsla(95, 25%, 28%, 0.10) 1px, transparent 1.5px), repeating-linear-gradient(45deg, rgba(0,0,0,0.04) 0 1px, transparent 1px 8px), repeating-linear-gradient(-45deg, rgba(0,0,0,0.03) 0 1px, transparent 1px 10px); background-size: auto, 12px 12px, auto, auto;"
          >
            <p
              id="scratch-invited-msg"
              class="font-calligraphic text-xl mb-1 italic text-[hsl(40,40%,36%)] transition-all duration-700"
            >
              You're Invited!
            </p>
            <p class="font-display text-base font-bold text-[hsl(95,25%,22%)]">
              ${formattedDate}
            </p>
            <p class="font-calligraphic text-sm text-[hsl(95,20%,30%)]">
              ${dayOfWeek}
            </p>
            <p class="text-[10px] mt-1 text-[hsl(95,15%,35%)]">
              ${formattedTime}
            </p>
          </div>

          <!-- Scratch Canvas Surface -->
          <canvas
            id="scratch-canvas"
            class="absolute inset-0 w-full h-full cursor-pointer touch-none transition-opacity duration-700"
          ></canvas>

          <!-- Vignette shading overlay -->
          <div
            aria-hidden="true"
            class="absolute inset-0 pointer-events-none"
            style="background: radial-gradient(ellipse at center, rgba(0,0,0,0) 78%, rgba(20,8,0,0.55) 92%, rgba(10,4,0,0.85) 100%); mix-blend-mode: multiply;"
          ></div>
          <div
            aria-hidden="true"
            class="absolute inset-0 pointer-events-none"
            style="background: radial-gradient(ellipse at 38% 22%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 32%);"
          ></div>
        </div>

        <!-- Outer Heart Stroke -->
        <svg
          viewBox="0 0 100 100"
          class="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M50,96 C50,96 6,70 6,36 C6,18 20,6 32,6 C42,6 48,14 50,24 C52,14 58,6 68,6 C80,6 94,18 94,36 C94,70 50,96 50,96 Z"
            fill="none"
            stroke="hsla(95, 20%, 35%, 0.35)"
            stroke-width="1.2"
            vector-effect="non-scaling-stroke"
            opacity="0.7"
          />
        </svg>
      </div>

      <!-- Confetti Container -->
      <div id="scratch-confetti" class="fixed inset-0 pointer-events-none z-[80] hidden"></div>
    `;

    this.canvas = this.container.querySelector("#scratch-canvas");
    this.initCanvas();

    return this.container;
  }

  initCanvas() {
    const canvas = this.canvas;
    if (!canvas) return;

    requestAnimationFrame(() => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (!w || !h) {
        setTimeout(() => this.initCanvas(), 100);
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      this.ctx = canvas.getContext("2d");
      this.ctx.scale(dpr, dpr);

      // Radial metallic background
      const grad = this.ctx.createRadialGradient(
        w * 0.4,
        h * 0.35,
        10,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.75
      );
      grad.addColorStop(0, "#eee6d2");
      grad.addColorStop(0.45, "#9aa584");
      grad.addColorStop(1, "#4a5540");
      this.ctx.fillStyle = grad;
      this.ctx.fillRect(0, 0, w, h);

      // Gold specks
      const numSpecks = Math.floor(w * h * 0.22);
      for (let i = 0; i < numSpecks; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const r = Math.random();
        let color;
        if (r < 0.55) {
          color = `rgba(238, 230, 210, ${0.35 + Math.random() * 0.55})`;
        } else if (r < 0.85) {
          color = `rgba(154, 165, 132, ${0.4 + Math.random() * 0.5})`;
        } else if (r < 0.95) {
          color = `rgba(74, 85, 64, ${0.4 + Math.random() * 0.4})`;
        } else {
          color = `rgba(255, 255, 255, ${0.55 + Math.random() * 0.4})`;
        }
        this.ctx.fillStyle = color;
        const size = Math.random() < 0.92 ? 1 : 1.5;
        this.ctx.fillRect(x, y, size, size);
      }

      // 80 circular sparkles
      for (let i = 0; i < 80; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        this.ctx.fillStyle = `rgba(247, 242, 230, ${0.7 + Math.random() * 0.3})`;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 1.2 + Math.random() * 0.8, 0, Math.PI * 2);
        this.ctx.fill();
      }

      // Vignette
      const vignette = this.ctx.createRadialGradient(
        w / 2,
        h / 2,
        Math.min(w, h) * 0.2,
        w / 2,
        h / 2,
        Math.max(w, h) * 0.7
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.35)");
      this.ctx.fillStyle = vignette;
      this.ctx.fillRect(0, 0, w, h);

      this.bindEvents();
    });
  }

  getCoords(e) {
    const rect = this.canvas.getBoundingClientRect();
    const touch = e.touches ? e.touches[0] : e;
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    };
  }

  scratch(x, y) {
    if (!this.ctx || this.isRevealed) return;
    this.ctx.globalCompositeOperation = "destination-out";
    this.ctx.lineWidth = 44;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";

    if (this.lastPoint) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    } else {
      this.ctx.beginPath();
      this.ctx.arc(x, y, 22, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.lastPoint = { x, y };
    this.checkScratchPercentage();
  }

  checkScratchPercentage() {
    if (this.isRevealed) return;
    const imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    let transparent = 0;
    const total = imgData.data.length / 16;
    for (let i = 3; i < imgData.data.length; i += 16) {
      if (imgData.data[i] < 200) {
        transparent++;
      }
    }

    if (transparent / total >= 0.4) {
      this.reveal();
    }
  }

  reveal() {
    if (this.isRevealed) return;
    this.isRevealed = true;

    // Fade out canvas
    if (this.canvas) {
      this.canvas.style.opacity = "0";
      this.canvas.style.pointerEvents = "none";
    }

    // Switch title
    const title = this.container.querySelector("#scratch-title");
    if (title) {
      title.classList.remove("animate-pulse-scale");
      title.textContent = "Our forever begins";
    }

    // Trigger celebration confetti
    this.launchConfetti();

    if (this.onRevealed) {
      this.onRevealed();
    }
  }

  launchConfetti() {
    const confettiContainer = this.container.querySelector("#scratch-confetti");
    if (!confettiContainer) return;
    confettiContainer.classList.remove("hidden");

    const colors = [
      "#d4af37", "#f3e5ab", "#8a9a5b", "#556b2f", "#eedc82",
      "#e6c280", "#b8860b", "#fff8dc", "#5c6650"
    ];

    for (let i = 0; i < 100; i++) {
      const piece = document.createElement("div");
      piece.className = "absolute pointer-events-none";
      const isRibbon = i < 12;
      const left = Math.random() * 100;
      const top = -5 - Math.random() * 10;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const w = isRibbon ? 3 : 6 + Math.random() * 6;
      const h = isRibbon ? 20 + Math.random() * 30 : 6 + Math.random() * 6;
      const duration = 2.5 + Math.random() * 2;
      const delay = Math.random() * 0.8;

      piece.style.cssText = `
        left: ${left}%;
        top: ${top}%;
        width: ${w}px;
        height: ${h}px;
        background: ${color};
        border-radius: ${isRibbon ? "2px" : "50%"};
        opacity: 1;
        transition: transform ${duration}s cubic-bezier(0.25, 1, 0.5, 1) ${delay}s, opacity ${duration}s ease-out ${delay}s;
      `;

      confettiContainer.appendChild(piece);

      requestAnimationFrame(() => {
        const fallDist = window.innerHeight * 1.1;
        const drift = (Math.random() - 0.5) * 200;
        const rot = (Math.random() - 0.5) * 720;
        piece.style.transform = `translate(${drift}px, ${fallDist}px) rotate(${rot}deg)`;
        piece.style.opacity = "0";
      });
    }

    setTimeout(() => {
      confettiContainer.innerHTML = "";
      confettiContainer.classList.add("hidden");
    }, 5500);
  }

  bindEvents() {
    const canvas = this.canvas;
    if (!canvas) return;

    const start = (e) => {
      e.preventDefault();
      this.isDrawing = true;
      const coords = this.getCoords(e);
      this.lastPoint = coords;
      this.scratch(coords.x, coords.y);
    };

    const move = (e) => {
      if (!this.isDrawing) return;
      e.preventDefault();
      const coords = this.getCoords(e);
      this.scratch(coords.x, coords.y);
    };

    const stop = () => {
      this.isDrawing = false;
      this.lastPoint = null;
    };

    canvas.addEventListener("mousedown", start);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);

    canvas.addEventListener("touchstart", start, { passive: false });
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", stop);
  }
}
