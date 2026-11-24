import { useEffect, useRef } from 'react';

export function StarfieldCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function drawStars() {
      const w = (canvas.width = window.innerWidth);
      const h = (canvas.height = window.innerHeight);
      ctx.clearRect(0, 0, w, h);
      const count = Math.min(180, Math.floor((w * h) / 9500));
      for (let i = 0; i < count; i++) {
        const x = (((Math.sin(i * 12.9898) * 43758.5453) % 1) + 1) % 1 * w;
        const y = (((Math.sin(i * 78.233) * 24634.6345) % 1) + 1) % 1 * (h * 0.78);
        const r = i % 5 === 0 ? 1.4 : 0.85;
        const alpha = 0.18 + ((i * 37) % 60) / 100;
        ctx.fillStyle =
          i % 9 === 0 ? `rgba(224, 179, 255, ${alpha})` : `rgba(247, 247, 248, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    drawStars();
    window.addEventListener('resize', drawStars);
    return () => window.removeEventListener('resize', drawStars);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="starfield-canvas"
      className="pointer-events-none fixed inset-0 w-full h-full z-0"
      aria-hidden="true"
    />
  );
}
