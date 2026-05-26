'use client';

import { cn } from '../lib/cn';

interface CalendarWidgetProps {
  /** Định dạng "YYYY-MM-DD" */
  date: string;
  className?: string;
}

const DAYS_VI = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
const MONTHS_VI = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
  'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
  'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
];

// Mỗi ô ngày 36px → 7 cột = 252px tổng chiều rộng
const CELL = 36;
const GRID_STYLE: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: `repeat(7, ${CELL}px)`,
};

export function CalendarWidget({ date, className }: CalendarWidgetProps) {
  const target = new Date(date + 'T00:00:00');
  const year = target.getFullYear();
  const month = target.getMonth();
  const day = target.getDate();
  const dayOfWeek = DAYS_VI[target.getDay()] ?? '';
  const monthLabel = MONTHS_VI[month] ?? '';

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array<null>(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className={cn('inline-block overflow-hidden rounded-xl shadow-md', className)}>
      {/* Header tháng */}
      <div
        className="flex items-center justify-between px-4 py-2 text-white text-sm font-medium"
        style={{ background: 'var(--primary)', width: CELL * 7 }}
      >
        <span>{monthLabel}</span>
        <span>{year}</span>
      </div>

      {/* Tên ngày — CN T2 T3... */}
      <div style={{ ...GRID_STYLE, background: 'var(--bg-card)' }}>
        {DAYS_VI.map(d => (
          <div
            key={d}
            style={{
              textAlign: 'center',
              padding: '4px 0',
              fontSize: 10,
              fontWeight: 600,
              color: 'var(--text-muted)',
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Các ô ngày — chiều cao cố định để grid không bị lệch */}
      <div style={{ ...GRID_STYLE, background: 'var(--bg-card)' }}>
        {cells.map((cell, i) => {
          const isWedding = cell === day;
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingTop: 2,
                height: 40,
                visibility: cell === null ? 'hidden' : 'visible',
              }}
              aria-hidden={cell === null}
            >
              {/* Số ngày */}
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 28,
                  width: 28,
                  borderRadius: '50%',
                  fontSize: 13,
                  fontWeight: isWedding ? 700 : 400,
                  color: isWedding ? 'var(--primary)' : 'var(--text-muted)',
                }}
                aria-current={isWedding ? 'date' : undefined}
              >
                {cell}
              </span>
              {/* ♥ — luôn chiếm chỗ, ẩn nếu không phải ngày cưới */}
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 12,
                  fontSize: 8,
                  lineHeight: 1,
                  color: 'var(--primary)',
                  opacity: isWedding ? 1 : 0,
                }}
                aria-label={isWedding ? 'Ngày cưới' : undefined}
                aria-hidden={!isWedding}
              >
                ♥
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div
        style={{
          borderTop: '1px solid var(--border)',
          background: 'var(--bg-card)',
          padding: '6px 12px',
          textAlign: 'center',
          width: CELL * 7,
        }}
      >
        <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--primary)', margin: 0 }}>
          {dayOfWeek}, {day}/{month + 1}/{year}
        </p>
      </div>
    </div>
  );
}
