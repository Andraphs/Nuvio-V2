import React from 'react';
import { Player } from '@remotion/player';
import { NuvioVideo } from '../NuvioVideo.jsx';

export function VideoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-opacity duration-200"
    >
      <div
        className="relative w-full max-w-5xl rounded-2xl obsidian-panel border border-primary/40 p-4 sm:p-6 shadow-[0_32px_90px_rgba(0,0,0,0.9),0_0_80px_rgba(147,18,255,0.25)] flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200"
      >
        <header className="flex items-center justify-between gap-4 pb-2 border-b border-outline-variant">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
            <h3
              id="video-modal-title"
              className="font-display text-title-md sm:text-headline-md font-bold text-on-surface"
            >
              Nuvio Product Showcase (1080p @ 60fps)
            </h3>
            <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full bg-primary/20 border border-primary/40 text-violet-link text-body-sm font-mono">
              12s • 720 frames
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full obsidian-surface border border-outline hover:border-secondary flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
            aria-label="Close video preview"
          >
            <span className="material-symbols-outlined text-title-md">close</span>
          </button>
        </header>

        {/* Remotion Player Container */}
        <div className="w-full relative rounded-xl overflow-hidden bg-black border border-outline-variant shadow-inner aspect-video">
          <Player
            component={NuvioVideo}
            durationInFrames={720}
            compositionWidth={1920}
            compositionHeight={1080}
            fps={60}
            controls
            autoPlay
            loop
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-2 text-body-sm text-on-surface-variant font-body pt-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-body-md">movie</span>
            <span>Remotion Video Composition running natively in React</span>
          </div>
          <div className="text-body-sm font-mono text-violet-muted">
            npm run remotion:studio
          </div>
        </footer>
      </div>
    </div>
  );
}
