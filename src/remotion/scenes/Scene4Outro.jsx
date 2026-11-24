import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { NuvioLogoMark } from '../../components/common/NuvioLogo.jsx';

export const Scene4Outro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterProgress = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.7 },
  });

  const ctaSpring = spring({
    frame: frame - 18,
    fps,
    config: { damping: 14 },
  });

  // Final fade-out to black at the end (last 20 frames: 130 to 150)
  const fadeOut = interpolate(frame, [130, 150], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(enterProgress, [0, 1], [0.92, 1]);

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center text-center p-16"
      style={{
        opacity: Math.min(enterProgress, fadeOut),
        transform: `scale(${scale})`,
      }}
    >
      {/* Brand Icon Badge */}
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-2xl bg-primary/40 filter blur-xl animate-pulse" />
        <div className="relative w-20 h-20 rounded-2xl obsidian-panel border border-primary/60 flex items-center justify-center shadow-[0_0_40px_rgba(147,18,255,0.5)]">
          <NuvioLogoMark className="w-11 h-11 text-on-surface" />
        </div>
      </div>

      {/* Main Headline */}
      <h2 className="text-[64px] leading-[72px] font-display font-bold text-on-surface mb-4 max-w-4xl">
        Take Control of Your Wealth
      </h2>

      {/* Subtitle */}
      <p className="text-[22px] leading-[32px] font-body text-on-surface-variant max-w-2xl mb-10">
        Experience total cash flow intelligence with the obsidian glass design system built for peak clarity.
      </p>

      {/* Glowing Call to Action Button */}
      <div
        style={{
          opacity: Math.max(0, ctaSpring),
          transform: `translateY(${interpolate(ctaSpring, [0, 1], [20, 0])}px)`,
        }}
        className="flex flex-col items-center gap-5"
      >
        <div className="relative group">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-secondary to-primary opacity-70 blur-md" />
          <button
            type="button"
            className="relative px-8 py-4 rounded-full bg-[#14101F] border border-primary/60 text-on-surface font-body text-title-md font-semibold flex items-center gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          >
            <span>Get Started with Nuvio</span>
            <span className="material-symbols-outlined text-secondary">arrow_forward</span>
          </button>
        </div>

        <div className="flex items-center gap-3 text-body-sm text-on-surface-variant font-mono">
          <span>nuvio.finance</span>
          <span>•</span>
          <span>Design System v2.0</span>
          <span>•</span>
          <span>100% Privacy Focused</span>
        </div>
      </div>
    </div>
  );
};
