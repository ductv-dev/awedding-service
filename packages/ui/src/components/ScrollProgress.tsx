'use client';

import { useEffect, useRef } from 'react';

interface ScrollProgressProps {
  color?: string;
}

export function ScrollProgress({ color = '#C41E3A' }: ScrollProgressProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      const progress = total > 0 ? scrollTop / total : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
        barRef.current.parentElement?.setAttribute('aria-valuenow', String(Math.round(progress * 100)));
      }
      rafRef.current = null;
    };

    const onScroll = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-50 h-0.5 w-full origin-left"
      role="progressbar"
      aria-valuenow={0}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Tiến trình đọc trang"
    >
      <div
        ref={barRef}
        className="h-full origin-left"
        style={{ transform: 'scaleX(0)', background: color }}
      />
    </div>
  );
}
