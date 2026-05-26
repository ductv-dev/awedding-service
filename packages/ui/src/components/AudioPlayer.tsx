'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Music, Pause, Play } from 'lucide-react';
import { cn } from '../lib/cn';

interface AudioPlayerProps {
  src: string;
  title: string;
  autoplay?: boolean;
  accentColor?: string;
}

export function AudioPlayer({
  src,
  title,
  autoplay = false,
  accentColor = '#C41E3A',
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const howlRef = useRef<import('howler').Howl | null>(null);

  // Khởi tạo Howl sau khi mount (tránh SSR)
  useEffect(() => {
    let isMounted = true;

    import('howler').then(({ Howl }) => {
      if (!isMounted) return;

      const sound = new Howl({
        src: [src],
        loop: true,
        volume: 0.6,
        onload: () => {
          if (isMounted) setIsReady(true);
        },
        onplay: () => { if (isMounted) setIsPlaying(true); },
        onpause: () => { if (isMounted) setIsPlaying(false); },
        onstop: () => { if (isMounted) setIsPlaying(false); },
      });

      howlRef.current = sound;
    });

    return () => {
      isMounted = false;
      howlRef.current?.unload();
    };
  }, [src]);

  // Autoplay sau gesture đầu tiên (chỉ gói personal)
  useEffect(() => {
    if (!autoplay || !isReady) return;

    const handleFirstGesture = () => {
      howlRef.current?.play();
      cleanup();
    };
    const cleanup = () => {
      ['click', 'touchstart', 'keydown'].forEach(e =>
        window.removeEventListener(e, handleFirstGesture),
      );
    };
    ['click', 'touchstart', 'keydown'].forEach(e =>
      window.addEventListener(e, handleFirstGesture, { once: true, passive: true }),
    );

    return cleanup;
  }, [autoplay, isReady]);

  const toggle = useCallback(() => {
    const howl = howlRef.current;
    if (!howl) return;
    if (isPlaying) {
      howl.pause();
    } else {
      howl.play();
    }
  }, [isPlaying]);

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full px-3 py-2 shadow-lg backdrop-blur-sm',
        'max-w-[200px]',
      )}
      style={{ background: `${accentColor}ee` }}
      role="complementary"
      aria-label="Trình phát nhạc"
    >
      {/* Icon nhạc */}
      <Music size={14} className="shrink-0 text-white/70" aria-hidden="true" />

      {/* Tên bài — marquee khi tên dài */}
      <span className="flex-1 truncate text-xs font-medium text-white" title={title}>
        {title}
      </span>

      {/* Nút play/pause */}
      <button
        onClick={toggle}
        disabled={!isReady}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50"
        aria-label={isPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc'}
      >
        {isPlaying ? <Pause size={14} /> : <Play size={14} />}
      </button>
    </div>
  );
}
