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
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Khởi tạo các cánh hoa (tối đa count items theo spec)
    const petals: Petal[] = Array.from({ length: Math.min(count, 20) }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * -window.innerHeight,
      size: Math.random() * 8 + 6,
      speed: Math.random() * 1 + 0.5,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.05,
      opacity: Math.random() * 0.6 + 0.3,
      sway: Math.random() * 30 + 10,
      swaySpeed: Math.random() * 0.02 + 0.01,
      swayOffset: Math.random() * Math.PI * 2,
    }));

    let frame = 0;
    let rafId: number;

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

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      petals.forEach(p => {
        p.y += p.speed;
        p.x += Math.sin(frame * p.swaySpeed + p.swayOffset) * 0.5;
        p.rotation += p.rotationSpeed;

        // Reset khi ra khỏi màn hình
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }

        drawPetal(p);
      });

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
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
