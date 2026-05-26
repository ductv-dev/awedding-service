'use client';

import { useEffect, useState } from 'react';

interface ScrollProgressProps {
  color?: string;
}

export function ScrollProgress({ color = '#C41E3A' }: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-50 h-0.5 w-full origin-left"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Tiến trình đọc trang"
    >
      <div
        className="h-full transition-[width] duration-100"
        style={{ width: `${progress}%`, background: color }}
      />
    </div>
  );
}
