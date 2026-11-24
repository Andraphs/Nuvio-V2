import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { BackgroundGlow } from './components/BackgroundGlow.jsx';
import { Scene1Intro } from './scenes/Scene1Intro.jsx';
import { Scene2Metrics } from './scenes/Scene2Metrics.jsx';
import { Scene3Analytics } from './scenes/Scene3Analytics.jsx';
import { Scene4Outro } from './scenes/Scene4Outro.jsx';

export const NuvioVideo = () => {
  return (
    <AbsoluteFill className="bg-[#000000] text-on-surface font-body select-none overflow-hidden">
      {/* Persistent Atmospheric Ambient Layer */}
      <BackgroundGlow />

      {/* Scene 1: Brand Reveal & Value Proposition (0 - 3s) */}
      <Sequence from={0} durationInFrames={180} name="Brand Intro">
        <Scene1Intro />
      </Sequence>

      {/* Scene 2: High-Level Wealth Metrics & Liquidity (2.8s - 6.6s) */}
      <Sequence from={170} durationInFrames={230} name="Financial Metrics">
        <Scene2Metrics />
      </Sequence>

      {/* Scene 3: Cash Flow Dynamics Chart & Accounts (6.5s - 9.8s) */}
      <Sequence from={390} durationInFrames={200} name="Cash Flow Dynamics">
        <Scene3Analytics />
      </Sequence>

      {/* Scene 4: Premium Outro & Call to Action (9.6s - 12s) */}
      <Sequence from={580} durationInFrames={140} name="Brand Outro & CTA">
        <Scene4Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
