'use client';

import { useEffect, useState } from 'react';
import type { WeddingConfig } from '@workspace/types';
import { SectionBlock, SectionTitle, type TemplateTokens } from './TemplateLayout';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTargetDate(config: WeddingConfig) {
  const firstEvent = config.events[0];
  if (!firstEvent) return null;
  return new Date(`${firstEvent.date}T${firstEvent.time || '00:00'}:00`);
}

function useCountdown(targetDate: Date | null) {
  const targetTime = targetDate?.getTime() ?? null;
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (targetTime === null) return;
    const calc = () => {
      const diff = targetTime - Date.now();
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
  }, [targetTime]);

  return timeLeft;
}

const units: Array<{ key: keyof TimeLeft; label: string }> = [
  { key: 'days', label: 'Ngày' },
  { key: 'hours', label: 'Giờ' },
  { key: 'minutes', label: 'Phút' },
  { key: 'seconds', label: 'Giây' },
];

function CountUnit({
  value,
  label,
  className = '',
  valueClassName = '',
}: {
  value: number;
  label: string;
  className?: string;
  valueClassName?: string;
}) {
  return (
    <div className={className}>
      <p className={valueClassName}>{String(value).padStart(2, '0')}</p>
      <p className="mt-1 text-[10px] font-bold uppercase" style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}>{label}</p>
    </div>
  );
}

function Subcopy({ config }: { config: WeddingConfig }) {
  const firstEvent = config.events[0];
  if (!firstEvent) return null;
  return (
    <p className="mt-5 text-sm" style={{ color: 'var(--text-muted)' }}>
      Còn lại đến {firstEvent.label.toLowerCase()} của {config.groom.name} và {config.bride.name}
    </p>
  );
}

export function EmeraldCountdown({ config, tokens }: { config: WeddingConfig; tokens: TemplateTokens }) {
  const time = useCountdown(getTargetDate(config));
  return (
    <SectionBlock tokens={tokens} className="text-center">
      <SectionTitle tokens={tokens}>Đếm Ngược Ngày Vui</SectionTitle>
      <div className="mx-auto grid max-w-sm grid-cols-4 gap-2">
        {units.map((unit) => (
          <CountUnit
            key={unit.key}
            value={time[unit.key]}
            label={unit.label}
            className="rounded-xl px-2 py-4"
            valueClassName="text-3xl font-bold"
          />
        ))}
      </div>
      <Subcopy config={config} />
    </SectionBlock>
  );
}

export function TraditionalCountdown({ config, tokens }: { config: WeddingConfig; tokens: TemplateTokens }) {
  const time = useCountdown(getTargetDate(config));
  return (
    <SectionBlock tokens={tokens} alt className="text-center">
      <SectionTitle tokens={tokens}>Đếm Ngược Ngày Vui</SectionTitle>
      <div className="mx-auto flex max-w-md justify-center gap-2">
        {units.map((unit) => (
          <CountUnit
            key={unit.key}
            value={time[unit.key]}
            label={unit.label}
            className="min-w-16 border-y py-3"
            valueClassName="text-2xl font-black"
          />
        ))}
      </div>
      <Subcopy config={config} />
    </SectionBlock>
  );
}

export function ChampagneCountdown({ config, tokens }: { config: WeddingConfig; tokens: TemplateTokens }) {
  const time = useCountdown(getTargetDate(config));
  return (
    <SectionBlock tokens={tokens} alt className="text-center">
      <SectionTitle tokens={tokens}>Đếm Ngược Ngày Vui</SectionTitle>
      <div className="mx-auto grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-4">
        {units.map((unit) => (
          <CountUnit
            key={unit.key}
            value={time[unit.key]}
            label={unit.label}
            className="rounded-t-full px-3 pb-4 pt-7 shadow-sm"
            valueClassName="text-4xl font-semibold"
          />
        ))}
      </div>
      <Subcopy config={config} />
    </SectionBlock>
  );
}

export function SageCountdown({ config, tokens }: { config: WeddingConfig; tokens: TemplateTokens }) {
  const time = useCountdown(getTargetDate(config));
  return (
    <SectionBlock tokens={tokens} className="text-center">
      <SectionTitle tokens={tokens}>Đếm Ngược Ngày Vui</SectionTitle>
      <div className="mx-auto grid max-w-md grid-cols-4 gap-3">
        {units.map((unit) => (
          <CountUnit
            key={unit.key}
            value={time[unit.key]}
            label={unit.label}
            className="rounded-2xl px-2 py-4"
            valueClassName="text-3xl font-bold"
          />
        ))}
      </div>
      <Subcopy config={config} />
    </SectionBlock>
  );
}

export function BlushCountdown({ config, tokens }: { config: WeddingConfig; tokens: TemplateTokens }) {
  const time = useCountdown(getTargetDate(config));
  return (
    <SectionBlock tokens={tokens} className="text-center">
      <SectionTitle tokens={tokens}>Đếm Ngược Ngày Vui</SectionTitle>
      <div className="mx-auto flex max-w-md flex-wrap justify-center gap-3">
        {units.map((unit) => (
          <CountUnit
            key={unit.key}
            value={time[unit.key]}
            label={unit.label}
            className="h-24 w-24 rounded-full px-2 py-5"
            valueClassName="text-3xl font-bold"
          />
        ))}
      </div>
      <Subcopy config={config} />
    </SectionBlock>
  );
}

export function InkCountdown({ config, tokens }: { config: WeddingConfig; tokens: TemplateTokens }) {
  const time = useCountdown(getTargetDate(config));
  return (
    <SectionBlock tokens={tokens} alt className="text-center">
      <SectionTitle tokens={tokens}>Đếm Ngược Ngày Vui</SectionTitle>
      <div className="mx-auto grid max-w-lg grid-cols-4 divide-x" style={{ borderColor: 'var(--border)' }}>
        {units.map((unit) => (
          <CountUnit
            key={unit.key}
            value={time[unit.key]}
            label={unit.label}
            className="px-2 py-2"
            valueClassName="text-3xl font-light"
          />
        ))}
      </div>
      <Subcopy config={config} />
    </SectionBlock>
  );
}
