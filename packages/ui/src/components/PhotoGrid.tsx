'use client';

import { useState } from 'react';
import Image from 'next/image';
import { LightboxModal } from './LightboxModal';
import { cn } from '../lib/cn';

interface PhotoGridProps {
  photos: string[];
  className?: string;
}

export function PhotoGrid({ photos, className }: PhotoGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const preview = photos.slice(0, 4);
  const extra = photos.length - 4;

  return (
    <>
      <div className={cn('space-y-3', className)}>
        {/* Grid 2x2 */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {preview.map((src, i) => (
            <button
              key={i}
              onClick={() => setLightboxIndex(i)}
              className="group relative aspect-square overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={`Xem ảnh ${i + 1}`}
            >
              <Image
                src={src}
                alt={`Ảnh cưới ${i + 1}`}
                fill
                sizes="(max-width: 640px) 45vw, 300px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay thêm ảnh trên ô thứ 4 */}
              {i === 3 && extra > 0 && !showAll && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <span className="text-2xl font-bold text-white">+{extra}</span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Nút xem thêm */}
        {extra > 0 && (
          <button
            onClick={() => {
              setShowAll(true);
              setLightboxIndex(4);
            }}
            className="w-full rounded-lg border border-current py-2.5 text-sm font-medium transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2"
            aria-label={`Xem thêm ${extra} ảnh`}
          >
            Xem thêm {extra} ảnh
          </button>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <LightboxModal
          photos={photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
