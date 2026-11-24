import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export const BackgroundGlow = () => {
  const frame = useCurrentFrame();

  // Subtle breathing pulse for violet planet glow
  const pulse = Math.sin((frame / 60) * Math.PI) * 0.15 + 0.85;
  const rotateOrbs = (frame * 0.2) % 360;

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#000000] pointer-events-none select-none">
      {/* Deep space radial ambient */}
      <div
        className="absolute w-[1200px] h-[700px] -top-[250px] left-1/2 -translate-x-1/2 rounded-full opacity-60 filter blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(147, 18, 255, 0.45) 0%, rgba(122, 28, 248, 0.2) 50%, transparent 75%)',
          transform: `translateX(-50%) scale(${pulse})`,
        }}
      />

      {/* Secondary accent orb (bottom right) */}
      <div
        className="absolute w-[800px] h-[500px] -bottom-[150px] -right-[100px] rounded-full opacity-30 filter blur-[140px]"
        style={{
          background: 'radial-gradient(circle, rgba(177, 78, 255, 0.3) 0%, rgba(38, 17, 71, 0.2) 60%, transparent 80%)',
        }}
      />

      {/* Third ambient glow (bottom left) */}
      <div
        className="absolute w-[600px] h-[400px] -bottom-[100px] -left-[100px] rounded-full opacity-25 filter blur-[110px]"
        style={{
          background: 'radial-gradient(circle, rgba(122, 28, 248, 0.3) 0%, transparent 70%)',
        }}
      />

      {/* Grid Pattern overlay with low opacity */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Horizon top rim line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#9312ff]/60 to-transparent" />
    </div>
  );
};
