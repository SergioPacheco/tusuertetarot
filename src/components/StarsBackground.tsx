'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  r: number;
  a: number;
  sp: number;
  drift: number;
  gold: boolean;
}

export function StarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;

    let w: number, h: number, stars: Star[], dpr: number;
    let animId: number;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c!.width = innerWidth * dpr;
      h = c!.height = innerHeight * dpr;
      c!.style.width = innerWidth + 'px';
      c!.style.height = innerHeight + 'px';
      const count = Math.round((innerWidth * innerHeight) / 9000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: (Math.random() * 1.3 + 0.3) * dpr,
        a: Math.random(),
        sp: Math.random() * 0.015 + 0.004,
        drift: (Math.random() * 0.06 + 0.01) * dpr,
        gold: Math.random() < 0.18,
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.a += s.sp;
        const tw = 0.45 + Math.abs(Math.sin(s.a)) * 0.55;
        s.y -= s.drift;
        if (s.y < -2) s.y = h + 2;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, 6.283);
        ctx!.fillStyle = s.gold
          ? `rgba(244,215,138,${tw})`
          : `rgba(245,240,225,${tw * 0.9})`;
        if (s.gold) {
          ctx!.shadowBlur = 6 * dpr;
          ctx!.shadowColor = 'rgba(244,215,138,.6)';
        }
        ctx!.fill();
        ctx!.shadowBlur = 0;
      }
      if (!reduce) {
        animId = requestAnimationFrame(draw);
      }
    }

    resize();
    draw();

    let rt: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(rt);
      rt = setTimeout(resize, 200);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="stars"
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
