'use client';

import { cn } from '../lib/cn';

interface TimelineItem {
  time: string;
  title: string;
  description?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  accentColor?: string;
  className?: string;
}

export function Timeline({ items, accentColor = '#C41E3A', className }: TimelineProps) {
  return (
    <ol className={cn('relative', className)} aria-label="Lịch trình ngày cưới">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <li
            key={i}
            className="relative flex gap-4 pb-8 last:pb-0"
            style={
              {
                '--accent': accentColor,
              } as React.CSSProperties
            }
          >
            {/* Đường dọc nối các điểm */}
            {!isLast && (
              <div
                className="absolute left-[19px] top-10 bottom-0 w-px"
                style={{ background: `${accentColor}33` }}
                aria-hidden="true"
              />
            )}

            {/* Điểm tròn + giờ */}
            <div className="flex flex-col items-center gap-1 pt-1">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-md"
                style={{ background: accentColor }}
                aria-hidden="true"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
            </div>

            {/* Nội dung */}
            <div className="flex-1 min-w-0">
              <time className="text-sm font-bold" style={{ color: accentColor }}>
                {item.time}
              </time>
              <h3 className="mt-0.5 text-base font-semibold leading-snug">{item.title}</h3>
              {item.description && (
                <p className="mt-1 text-sm opacity-70">{item.description}</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
