import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { NuvioLogoMark } from '../../components/common/NuvioLogo.jsx';

export const Scene1Intro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring entrance for Logo
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 100 },
  });

  // Spring entrance for Title
  const titleSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  // Spring entrance for Subtitle
  const subSpring = spring({
    frame: frame - 28,
    fps,
    config: { damping: 16 },
  });

  // Staggered Badges
  const badge1 = spring({ frame: frame - 42, fps, config: { damping: 14 } });
  const badge2 = spring({ frame: frame - 50, fps, config: { damping: 14 } });
  const badge3 = spring({ frame: frame - 58, fps, config: { damping: 14 } });

  // Scene exit transition (frames 150-180)
  const exitOpacity = interpolate(frame, [150, 180], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exitScale = interpolate(frame, [150, 180], [1, 1.05], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-12"
      style={{
        opacity: exitOpacity,
        transform: `scale(${exitScale})`,
      }}
    >
      {/* Floating Category Tag */}
      <div
        className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full obsidian-nav-capsule border border-primary/40 mb-8"
        style={{
          opacity: Math.max(0, titleSpring),
          transform: `translateY(${interpolate(titleSpring, [0, 1], [-20, 0])}px)`,
        }}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#B14EFF] animate-pulse" />
        <span className="font-body text-label-sm uppercase tracking-wider text-violet-link font-semibold">
          Personal Wealth Operating System
        </span>
      </div>

      {/* Central Brand Lockup with Glowing Halo */}
      <div
        className="relative flex items-center justify-center mb-6"
        style={{
          transform: `scale(${logoScale})`,
          opacity: Math.max(0, logoScale),
        }}
      >
        {/* Violet Halo Glow */}
        <div className="absolute w-36 h-36 rounded-full bg-primary/40 filter blur-2xl -z-10 animate-pulse" />

        <div className="w-28 h-28 rounded-2xl obsidian-panel border border-primary/50 flex items-center justify-center shadow-[0_0_50px_rgba(147,18,255,0.4)]">
          <NuvioLogoMark className="w-16 h-16 text-on-surface" />
        </div>
      </div>

      {/* Main Title */}
      <h1
        className="text-[88px] leading-[96px] tracking-tight font-display font-bold text-on-surface mb-4"
        style={{
          opacity: Math.max(0, titleSpring),
          transform: `translateY(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
        }}
      >
        NUVIO
      </h1>

      {/* Subtitle */}
      <p
        className="text-[26px] leading-[36px] font-body text-on-surface-variant max-w-2xl mb-10"
        style={{
          opacity: Math.max(0, subSpring),
          transform: `translateY(${interpolate(subSpring, [0, 1], [25, 0])}px)`,
        }}
      >
        Financial clarity at the speed of thought. Powered by obsidian glass aesthetics & dynamic cash flow intelligence.
      </p>

      {/* Feature Badges Stagger */}
      <div className="flex items-center justify-center gap-4">
        <div
          className="px-5 py-2 rounded-full obsidian-surface border border-outline-variant flex items-center gap-2.5"
          style={{
            opacity: Math.max(0, badge1),
            transform: `translateY(${interpolate(badge1, [0, 1], [20, 0])}px)`,
          }}
        >
          <span className="material-symbols-outlined text-secondary text-title-md">sync</span>
          <span className="text-body-md font-body text-on-surface font-medium">Real-Time Sync</span>
        </div>

        <div
          className="px-5 py-2 rounded-full obsidian-surface border border-primary/40 flex items-center gap-2.5 shadow-[0_0_20px_rgba(147,18,255,0.25)]"
          style={{
            opacity: Math.max(0, badge2),
            transform: `translateY(${interpolate(badge2, [0, 1], [20, 0])}px)`,
          }}
        >
          <span className="material-symbols-outlined text-secondary text-title-md">auto_awesome</span>
          <span className="text-body-md font-body text-on-surface font-medium">Obsidian Glass UI</span>
        </div>

        <div
          className="px-5 py-2 rounded-full obsidian-surface border border-outline-variant flex items-center gap-2.5"
          style={{
            opacity: Math.max(0, badge3),
            transform: `translateY(${interpolate(badge3, [0, 1], [20, 0])}px)`,
          }}
        >
          <span className="material-symbols-outlined text-secondary text-title-md">insights</span>
          <span className="text-body-md font-body text-on-surface font-medium">Predictive Cash Flow</span>
        </div>
      </div>
    </div>
  );
};
