'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxModalProps {
  photos: string[];
  currentIndex: number;
  onClose: () => void;
}

export function LightboxModal({ photos, currentIndex, onClose }: LightboxModalProps) {
  const [index, setIndex] = useState(currentIndex);

  // Touch swipe state
  const touchStartX = useRef<number | null>(null);

  const prev = useCallback(
    () => setIndex(i => (i - 1 + photos.length) % photos.length),
    [photos.length],
  );
  const next = useCallback(() => setIndex(i => (i + 1) % photos.length), [photos.length]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, prev, next]);

  // Ngăn scroll body khi lightbox mở
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    if (Math.abs(diff) > 50) {
      diff < 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  const currentPhoto = photos[index];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      role="dialog"
      aria-modal="true"
      aria-label="Xem ảnh"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Nút đóng */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Đóng"
      >
        <X size={22} />
      </button>

      {/* Số thứ tự */}
      <span className="absolute left-1/2 top-4 -translate-x-1/2 text-sm text-white/70">
        {index + 1} / {photos.length}
      </span>

      {/* Ảnh */}
      <div className="relative h-[80vh] w-[90vw] max-w-4xl">
        {currentPhoto && (
          <Image
            src={currentPhoto}
            alt={`Ảnh ${index + 1}`}
            fill
            sizes="90vw"
            className="object-contain"
            priority
          />
        )}
      </div>

      {/* Nút prev/next — chỉ hiện khi có nhiều hơn 1 ảnh */}
      {photos.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-4"
            aria-label="Ảnh trước"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={next}
            className="absolute right-2 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-4"
            aria-label="Ảnh tiếp"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Click nền để đóng */}
      <div className="absolute inset-0 -z-10" onClick={onClose} aria-hidden="true" />
    </div>
  );
}
