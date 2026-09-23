import { invitationData } from "./data/invitationData.js";
import { AudioPlayer } from "./components/AudioPlayer.js";
import { HeroSection } from "./components/HeroSection.js";
import { WelcomeSection } from "./components/WelcomeSection.js";
import { ScratchCard } from "./components/ScratchCard.js";
import { SaveTheDate } from "./components/SaveTheDate.js";
import { PhotoSlideshow } from "./components/PhotoSlideshow.js";
import { CountdownTimer } from "./components/CountdownTimer.js";
import { ProgramTimeline } from "./components/ProgramTimeline.js";
import { VenueSection } from "./components/VenueSection.js";
import { DressCodeSection } from "./components/DressCodeSection.js";
import { PreWeddingEvents } from "./components/PreWeddingEvents.js";
import { InfoCardsSection } from "./components/InfoCardsSection.js";
import { RsvpSection } from "./components/RsvpSection.js";
import { EndSection } from "./components/EndSection.js";
import { FloatingCta } from "./components/FloatingCta.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  if (!app) return;

  // Lock initial scrolling until invitation is opened
  document.body.style.overflow = "hidden";

  // 1. Audio Player (fixed top right)
  const audioPlayer = new AudioPlayer(invitationData.musicTrack);
  document.body.appendChild(audioPlayer.render());

  // 2. Floating CTA (fixed bottom right)
  const cta = new FloatingCta("royal-grace");
  document.body.appendChild(cta.render());

  // 3. Main Body Wrapper with exact template layered background
  const bodyWrapper = document.createElement("div");
  bodyWrapper.id = "main-content-wrapper";
  bodyWrapper.style.backgroundColor = "rgb(214, 197, 172)";
  bodyWrapper.style.backgroundImage = `url(${invitationData.assets.welcomeBg}), url(${invitationData.assets.generalBg})`;
  bodyWrapper.style.backgroundPosition = "top center, center 140.4888vw";
  bodyWrapper.style.backgroundRepeat = "no-repeat, repeat-y";
  bodyWrapper.style.backgroundSize = "100% auto, 100% auto";
  bodyWrapper.className =
    "[&>section]:px-12 min-[400px]:[&>section]:px-[4.5rem] sm:[&>section]:px-20 md:[&>section]:px-24 transition-opacity duration-1000 opacity-0 pointer-events-none";

  // Callback when user clicks the curtain video and it finishes opening
  const handleUnlock = () => {
    // Reveal and enable the full website
    bodyWrapper.classList.remove("opacity-0", "pointer-events-none");
    bodyWrapper.classList.add("opacity-100", "pointer-events-auto");
    document.body.style.overflow = "";

    // Trigger audio playback
    audioPlayer.play().catch(() => {});

    // Observe scroll reveals
    setupScrollReveal();

    // Start idle scroll nudge
    setupIdleScrollNudge();
  };

  // 4. Hero Section (Fullscreen Video + Gate Overlay)
  const hero = new HeroSection(invitationData, handleUnlock);
  app.appendChild(hero.render());

  // Welcome Section
  const welcome = new WelcomeSection(invitationData);
  bodyWrapper.appendChild(welcome.render());

  // Scratch Card & Save The Date Section
  const scratchSection = document.createElement("section");
  scratchSection.className = "py-16 md:py-20 px-6 relative overflow-hidden section-reveal";
  const scratchCard = new ScratchCard(invitationData);
  const saveTheDate = new SaveTheDate(invitationData);
  scratchSection.appendChild(scratchCard.render());
  scratchSection.appendChild(saveTheDate.render());
  bodyWrapper.appendChild(scratchSection);

  // Photo Slideshow
  const slideshow = new PhotoSlideshow(invitationData.slideshowImages);
  bodyWrapper.appendChild(slideshow.render());

  // Countdown Timer
  const countdown = new CountdownTimer(invitationData.weddingDate, invitationData.weddingTime);
  bodyWrapper.appendChild(countdown.render());

  // Program Timeline
  const timeline = new ProgramTimeline(invitationData.dayProgram);
  bodyWrapper.appendChild(timeline.render());

  // Venue & Google Maps
  const venue = new VenueSection(invitationData);
  bodyWrapper.appendChild(venue.render());

  // Dress Code
  const dressCode = new DressCodeSection(invitationData);
  bodyWrapper.appendChild(dressCode.render());

  // Pre-Wedding Events
  const preEvents = new PreWeddingEvents(invitationData.preWeddingEvents);
  bodyWrapper.appendChild(preEvents.render());

  // Info Cards (Transportation, Accommodation, Gifts)
  const infoCards = new InfoCardsSection(invitationData);
  bodyWrapper.appendChild(infoCards.render());

  // RSVP Section
  const rsvp = new RsvpSection(invitationData);
  bodyWrapper.appendChild(rsvp.render());

  // End Message Section & Footer
  const endSection = new EndSection(invitationData);
  bodyWrapper.appendChild(endSection.render());

  app.appendChild(bodyWrapper);
});

function setupScrollReveal() {
  const reveals = document.querySelectorAll(".section-reveal");
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach((el) => observer.observe(el));
}

function setupIdleScrollNudge(delay = 10000) {
  if (typeof window === "undefined" || window.scrollY > 0) return;

  let cancelled = false;
  let animId = 0;
  let timerId = 0;

  const cancel = () => {
    if (cancelled) return;
    cancelled = true;
    clearTimeout(timerId);
    cancelAnimationFrame(animId);
    removeListeners();
  };

  const events = ["wheel", "touchstart", "touchmove", "pointerdown", "mousedown", "keydown", "scroll"];
  const addListeners = () => events.forEach((ev) => window.addEventListener(ev, cancel, { passive: true }));
  const removeListeners = () => events.forEach((ev) => window.removeEventListener(ev, cancel));

  addListeners();

  const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  const animateScroll = (from, to, duration, done) => {
    const startTime = performance.now();
    const step = (now) => {
      if (cancelled) return;
      const progress = Math.min((now - startTime) / duration, 1);
      const val = from + (to - from) * easeInOutCubic(progress);
      window.scrollTo(0, val);
      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else if (done) {
        done();
      }
    };
    animId = requestAnimationFrame(step);
  };

  timerId = setTimeout(() => {
    if (cancelled || window.scrollY > 0) return;
    animateScroll(0, 90, 1500, () => {
      setTimeout(() => {
        animateScroll(90, 0, 1500, removeListeners);
      }, 300);
    });
  }, delay);
}
