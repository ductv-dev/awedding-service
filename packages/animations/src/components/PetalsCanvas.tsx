'use client';

import { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speed: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  sway: number;
  swaySpeed: number;
  swayOffset: number;
}

interface PetalsCanvasProps {
  count?: number;
  color?: string;
  shape?: 'petal' | 'leaf' | 'particle';
  className?: string;
}

export function PetalsCanvas({
  count = 20,
  color = '#FFB7C5',
  shape = 'petal',
  className = '',
}: PetalsCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.matchMedia('(max-width: 640px)').matches;
    const particleCount = Math.min(count, isMobile ? 8 : 14);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.5);

    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * pixelRatio);
      canvas.height = Math.floor(window.innerHeight * pixelRatio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const petals: Petal[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * -window.innerHeight,
      size: Math.random() * (isMobile ? 5 : 8) + (isMobile ? 4 : 6),
      speed: Math.random() * 0.8 + 0.35,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.05,
      opacity: Math.random() * 0.45 + 0.25,
      sway: Math.random() * (isMobile ? 18 : 30) + 8,
      swaySpeed: Math.random() * 0.02 + 0.01,
      swayOffset: Math.random() * Math.PI * 2,
    }));

    let frame = 0;
    let rafId: number;
    let lastDraw = 0;
    let isVisible = !document.hidden;

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = color;

      if (shape === 'petal') {
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (shape === 'leaf') {
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size, -p.size * 0.5, p.size, p.size * 0.5, 0, p.size);
        ctx.bezierCurveTo(-p.size, p.size * 0.5, -p.size, -p.size * 0.5, 0, -p.size);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const animate = (time: number) => {
      rafId = requestAnimationFrame(animate);
      if (!isVisible || time - lastDraw < 33) return;

      lastDraw = time;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      frame++;

      petals.forEach(p => {
        p.y += p.speed;
        p.x += Math.sin(frame * p.swaySpeed + p.swayOffset) * 0.5;
        p.rotation += p.rotationSpeed;

        if (p.y > window.innerHeight + 20) {
          p.y = -20;
          p.x = Math.random() * window.innerWidth;
        }

        drawPetal(p);
      });

    };

    const handleVisibility = () => {
      isVisible = !document.hidden;
    };

    document.addEventListener('visibilitychange', handleVisibility);
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [count, color, shape]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-10 ${className}`}
      aria-hidden="true"
    />
  );
}
