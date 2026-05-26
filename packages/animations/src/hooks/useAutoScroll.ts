'use client';

import { useRef, useCallback, useState } from 'react';

interface UseAutoScrollOptions {
  speed?: number;
  onStop?: () => void;
}

export function useAutoScroll({ speed = 0.5, onStop }: UseAutoScrollOptions = {}) {
  const rafRef = useRef<number | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const stop = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setIsScrolling(false);
    onStop?.();
  }, [onStop]);

  const start = useCallback(() => {
    const stopEvents = ['wheel', 'touchstart', 'keydown', 'mousedown'] as const;
    const handleUserInteraction = () => {
      stop();
      stopEvents.forEach(e => window.removeEventListener(e, handleUserInteraction));
    };
    stopEvents.forEach(e => window.addEventListener(e, handleUserInteraction, { passive: true }));

    setIsScrolling(true);

    const scroll = () => {
      window.scrollBy(0, speed);
      // Dừng nếu đến cuối trang
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 10) {
        stop();
        stopEvents.forEach(e => window.removeEventListener(e, handleUserInteraction));
        return;
      }
      rafRef.current = requestAnimationFrame(scroll);
    };

    rafRef.current = requestAnimationFrame(scroll);
  }, [speed, stop]);

  return { start, stop, isScrolling };
}
