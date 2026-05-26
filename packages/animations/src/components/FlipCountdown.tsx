'use client';

import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function FlipUnit({ value, label }: { value: number; label: string }) {
  const formatted = String(value).padStart(2, '0');
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg bg-black text-4xl font-bold text-white shadow-lg md:h-20 md:w-20 md:text-5xl"
        style={{ fontFamily: 'var(--font-display, monospace)', perspective: '300px' }}
      >
        {formatted}
      </div>
      <span className="mt-1 text-xs uppercase tracking-widest opacity-70">{label}</span>
    </div>
  );
}

interface FlipCountdownProps {
  targetDate: Date;
}

export function FlipCountdown({ targetDate }: FlipCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      };
    };

    setTimeLeft(calc());
    const id = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div className="flex gap-3 md:gap-4" role="timer" aria-label="Đếm ngược đến ngày cưới">
      <FlipUnit value={timeLeft.days} label="Ngày" />
      <FlipUnit value={timeLeft.hours} label="Giờ" />
      <FlipUnit value={timeLeft.minutes} label="Phút" />
      <FlipUnit value={timeLeft.seconds} label="Giây" />
    </div>
  );
}
