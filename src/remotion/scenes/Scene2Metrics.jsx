import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { MetricCards } from '../../components/dashboard/MetricCards.jsx';
import { PERIOD_DATA } from '../../data/dashboardData.js';
import { NuvioLogoMark } from '../../components/common/NuvioLogo.jsx';

export const Scene2Metrics = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterProgress = spring({
    frame,
    fps,
    config: { damping: 15, mass: 0.8 },
  });

  // Scene exit transition (towards frame 220-250)
  const exitOpacity = interpolate(frame, [210, 240], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exitTranslateY = interpolate(frame, [210, 240], [0, -30], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Subtle camera pan / zoom over time
  const scale = interpolate(frame, [0, 240], [0.97, 1.02]);
  const translateY = interpolate(enterProgress, [0, 1], [40, 0]) + exitTranslateY;

  // Use real data from Nuvio
  const metricsData = {
    ...PERIOD_DATA['2026-11'],
    balance: 84230.5,
    compareFallback: 'No prior comparison',
  };

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center p-16"
      style={{
        opacity: Math.min(enterProgress, exitOpacity),
        transform: `scale(${scale}) translateY(${translateY}px)`,
      }}
    >
      {/* Dashboard Top Header Bar in Video */}
      <div className="w-full max-w-[1500px] mb-8 flex items-center justify-between obsidian-nav-capsule border border-outline px-6 py-3.5 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-container border border-primary/40 flex items-center justify-center">
            <NuvioLogoMark className="w-4 h-4 text-on-surface" />
          </div>
          <span className="font-display text-headline-md font-bold text-on-surface">
            Nuvio Overview
          </span>
          <span className="px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant text-label-sm font-body text-secondary">
            Live Preview
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#45b558]/10 border border-[#45b558]/30 text-[#45b558] text-label-sm font-body">
            <span className="w-2 h-2 rounded-full bg-[#45b558] animate-ping" />
            <span>Synced 2m ago</span>
          </div>
          <span className="text-body-sm font-body text-on-surface-variant font-mono">
            Period: Nov 2026
          </span>
        </div>
      </div>

      {/* Main Dashboard Window Frame with Obsidian Glass */}
      <div className="w-full max-w-[1500px] rounded-2xl obsidian-panel border border-primary/30 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.9),0_0_60px_rgba(147,18,255,0.18)]">
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-outline-variant">
          <div>
            <div className="text-body-sm text-secondary uppercase font-semibold tracking-wider font-body mb-1">
              Core Financial Engine
            </div>
            <h2 className="text-display-lg-mobile lg:text-headline-lg font-display font-bold text-on-surface">
              Financial Summary & Liquidity
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-4 py-1.5 rounded-lg bg-surface-container border border-outline-variant text-label-sm font-body text-on-surface">
              Currency: USD ($)
            </span>
            <span className="px-4 py-1.5 rounded-lg bg-primary/20 border border-primary/40 text-label-sm font-body text-secondary font-semibold">
              All Accounts Consolidated
            </span>
          </div>
        </div>

        {/* Real Nuvio MetricCards Component */}
        <div className="w-full">
          <MetricCards metrics={metricsData} />
        </div>
      </div>
    </div>
  );
};
