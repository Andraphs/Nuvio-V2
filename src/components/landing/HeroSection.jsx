import { useState } from 'react';
import { motion } from 'framer-motion';
import { StarfieldCanvas } from './StarfieldCanvas';
import { LandingNavbar } from './LandingNavbar';

const heroTransition = (delay = 0) => ({
  duration: 0.68,
  delay,
  ease: [0.16, 1, 0.3, 1],
});

export function HeroSection({ onOpenDashboard, onOpenVideo }) {
  const [videoReady, setVideoReady] = useState(false);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen overflow-hidden bg-surface flex flex-col justify-between pt-20 sm:pt-24 pb-0"
    >
      {/* Procedural Starfield Canvas */}
      <StarfieldCanvas />

      {/* Atmospheric Royal Violet Planet Rim Glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[620px] planet-horizon-top z-0"
        aria-hidden="true"
      />

      {/* Optional Desktop Video Layer */}
      <video
        id="hero-glow-video"
        onCanPlay={() => setVideoReady(true)}
        className={`hero-video-layer hidden md:block pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 w-[1672px] max-w-none h-[717px] object-cover mix-blend-screen transition-opacity duration-700 z-0 ${
          videoReady ? 'opacity-90' : 'opacity-70'
        }`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source
          src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e859f229-8ebd-43fb-a5a0-58006ba75327.mp4"
          type="video/mp4"
        />
      </video>

      {/* Fixed Top Navigation */}
      <LandingNavbar onOpenDashboard={onOpenDashboard} />

      {/* Centered Hero Copy + CTA */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-10 flex flex-col items-center text-center gap-5">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={heroTransition(0.06)}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full obsidian-nav-capsule border"
        >
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" aria-hidden="true" />
          <span data-design-text-token="label-sm" className="font-body text-label-sm text-[#d6adff]">
            Personal Finance OS · Real-Time Read-Only Sync
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={heroTransition(0.14)}
          data-design-text-token="display-lg"
          className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-on-surface text-balance leading-[1.08] drop-shadow-[0_2px_18px_rgba(0,0,0,0.85)]"
        >
          <span className="bg-gradient-to-r from-[#f7f7f8] via-[#e0b3ff] to-[#9312ff] bg-clip-text text-transparent">
            Nuvio
          </span>{' '}
          Track Smarter,
          <br className="hidden sm:inline" /> Save Faster, Stay Clear.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={heroTransition(0.22)}
          data-design-text-token="body-md"
          className="font-body text-body-md sm:text-title-md font-normal text-[#b3b0af] max-w-2xl text-pretty drop-shadow-[0_1px_10px_rgba(0,0,0,0.9)]"
        >
          The first unified personal finance workspace built for dark-mode clarity. Connect your
          banks, track annual cash flow, and control recurring subscriptions in one obsidian-glass
          dashboard.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={heroTransition(0.3)}
          className="flex flex-wrap items-center justify-center gap-3 pt-1"
        >
          <button
            type="button"
            onClick={onOpenDashboard}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full obsidian-violet-btn font-body text-label-lg transition-all duration-state-change focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          >
            <span data-design-text-token="label-lg">Get Started Free</span>
            <span className="material-symbols-outlined text-title-md hover-arrow" aria-hidden="true">
              arrow_forward
            </span>
          </button>
          <button
            type="button"
            onClick={onOpenVideo}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full obsidian-dark-btn font-body text-label-lg transition-all duration-state-change focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary group"
          >
            <span className="material-symbols-outlined text-title-md text-[#d6adff] group-hover:scale-110 transition-transform" aria-hidden="true">
              play_circle
            </span>
            <span data-design-text-token="label-lg">Watch Video (12s)</span>
          </button>
        </motion.div>
      </div>

      {/* Rising Nuvio Product Dashboard Preview */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={heroTransition(0.4)}
        className="relative z-10 w-full max-w-[1204px] mx-auto px-4 sm:px-6 pt-2"
      >
        <div
          className="pointer-events-none mx-auto w-3/4 h-12 -mb-6 bg-gradient-to-b from-primary/35 to-transparent blur-2xl"
          aria-hidden="true"
        />

        <div
          onClick={onOpenDashboard}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpenDashboard();
            }
          }}
          aria-label="Open live Nuvio dashboard"
          className="relative rounded-t-xl overflow-hidden bg-[#0b0911] border border-b-0 border-[#9312ff]/35 shadow-[0_32px_80px_rgba(0,0,0,0.8),0_0_60px_rgba(147,18,255,0.14)] max-h-[380px] sm:max-h-[460px] lg:max-h-[500px] cursor-pointer group"
        >
          {/* Thin Glowing Violet Light Line Along Top Edge */}
          <div className="top-violet-rim-line absolute inset-x-0 top-0 z-20" aria-hidden="true" />

          <img
            src={`${import.meta.env.BASE_URL}nuvio-dashboard-preview.png`}
            alt="Nuvio Personal Finance Dashboard preview showing Total Balance, Annual Cash Flow, and Connected Accounts"
            className="w-full h-auto block select-none transition-transform duration-500 group-hover:scale-[1.008]"
          />

          {/* Smooth Bottom Fade Mask */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#000000] via-[#000000]/75 to-transparent z-20"
            aria-hidden="true"
          />
        </div>
      </motion.div>
    </section>
  );
}
