import type { WeddingConfig } from '@workspace/types';
import { MapEmbed } from '@workspace/ui';
import { SectionBlock, SectionTitle, formatDateVi, type TemplateTokens } from './TemplateLayout';
import {
  BlushCalendar,
  ChampagneCalendar,
  EmeraldCalendar,
  InkCalendar,
  SageCalendar,
  TraditionalCalendar,
} from './ThemeCalendars';

function dateParts(date: string) {
  const d = new Date(date + 'T00:00:00');
  const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  return {
    dayName: days[d.getDay()],
    day: d.getDate(),
    month: d.getMonth() + 1,
    year: d.getFullYear(),
  };
}

function EventCopy({ event }: { event: WeddingConfig['events'][number] }) {
  return (
    <div className="min-w-0">
      <p className="mb-1 text-[11px] font-bold uppercase" style={{ color: 'var(--primary)', letterSpacing: '0.12em' }}>
        {event.label}
      </p>
      <h3 className="text-base font-bold leading-snug sm:text-lg" style={{ color: 'var(--text)', overflowWrap: 'anywhere' }}>
        {event.venue}
      </h3>
      <p className="mt-2 text-sm" style={{ color: 'var(--accent)' }}>
        {event.time} · {formatDateVi(event.date)}
      </p>
      <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)', overflowWrap: 'anywhere' }}>
        {event.address}
      </p>
    </div>
  );
}

export function EmeraldEvents({ config, tokens }: { config: WeddingConfig; tokens: TemplateTokens }) {
  if (config.events.length === 0) return null;
  return (
    <SectionBlock tokens={tokens}>
      <SectionTitle tokens={tokens}>Thời Gian & Địa Điểm</SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2">
        {config.events.map((event, index) => {
          const d = dateParts(event.date);
          return (
            <article key={index} className="rounded-2xl p-5" style={{ background: 'color-mix(in srgb, var(--accent) 8%, transparent)' }}>
              <EmeraldCalendar date={event.date} />
              <div className="mb-4 flex items-center gap-4">
                <div className="text-center">
                  <p className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>{d.dayName}</p>
                  <p className="text-4xl font-bold" style={{ color: 'var(--accent)' }}>{d.day}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Tháng {d.month}</p>
                </div>
                <EventCopy event={event} />
              </div>
              {event.mapEmbedUrl && <MapEmbed url={event.mapEmbedUrl} address={event.address} />}
            </article>
          );
        })}
      </div>
    </SectionBlock>
  );
}

export function TraditionalEvents({ config, tokens }: { config: WeddingConfig; tokens: TemplateTokens }) {
  if (config.events.length === 0) return null;
  return (
    <SectionBlock tokens={tokens} alt>
      <SectionTitle tokens={tokens}>Thời Gian & Địa Điểm</SectionTitle>
      <div className="space-y-4">
        {config.events.map((event, index) => {
          const d = dateParts(event.date);
          return (
            <article key={index} className="border-y py-5">
              <div className="grid gap-4 sm:grid-cols-[170px_1fr]">
                <div className="text-center sm:text-left">
                  <p className="text-xs font-bold uppercase" style={{ color: 'var(--primary)', letterSpacing: '0.2em' }}>{event.label}</p>
                  <p className="mt-2 text-3xl font-black" style={{ color: 'var(--primary)' }}>{d.day}/{d.month}</p>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{d.year}</p>
                  <TraditionalCalendar date={event.date} />
                </div>
                <EventCopy event={event} />
              </div>
              {event.mapEmbedUrl && <MapEmbed url={event.mapEmbedUrl} address={event.address} className="mt-4" />}
            </article>
          );
        })}
      </div>
    </SectionBlock>
  );
}

export function ChampagneEvents({ config, tokens }: { config: WeddingConfig; tokens: TemplateTokens }) {
  if (config.events.length === 0) return null;
  return (
    <SectionBlock tokens={tokens} alt>
      <SectionTitle tokens={tokens}>Thời Gian & Địa Điểm</SectionTitle>
      <div className="grid gap-5 sm:grid-cols-2">
        {config.events.map((event, index) => {
          const d = dateParts(event.date);
          return (
            <article key={index} className="rounded-t-full px-5 pb-5 pt-10 text-center shadow-sm" style={{ background: 'var(--bg-card)' }}>
              <p className="text-5xl font-semibold" style={{ color: 'var(--primary)' }}>{d.day}</p>
              <p className="mb-5 text-xs uppercase" style={{ color: 'var(--text-muted)', letterSpacing: '0.2em' }}>Tháng {d.month} · {d.year}</p>
              <ChampagneCalendar date={event.date} />
              <EventCopy event={event} />
              {event.mapEmbedUrl && <MapEmbed url={event.mapEmbedUrl} address={event.address} className="mt-4" />}
            </article>
          );
        })}
      </div>
    </SectionBlock>
  );
}

export function SageEvents({ config, tokens }: { config: WeddingConfig; tokens: TemplateTokens }) {
  if (config.events.length === 0) return null;
  return (
    <SectionBlock tokens={tokens} alt>
      <SectionTitle tokens={tokens}>Thời Gian & Địa Điểm</SectionTitle>
      <div className="space-y-5">
        {config.events.map((event, index) => {
          const d = dateParts(event.date);
          return (
            <article key={index} className="grid gap-4 rounded-3xl p-5 sm:grid-cols-[180px_1fr]" style={{ background: 'color-mix(in srgb, var(--primary) 9%, transparent)' }}>
              <div>
                <div className="mb-3 flex h-24 w-24 flex-col items-center justify-center rounded-full" style={{ background: 'var(--bg-card)' }}>
                <p className="text-3xl font-bold" style={{ color: 'var(--primary)' }}>{d.day}</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Tháng {d.month}</p>
                </div>
                <SageCalendar date={event.date} />
              </div>
              <div>
                <EventCopy event={event} />
                {event.mapEmbedUrl && <MapEmbed url={event.mapEmbedUrl} address={event.address} className="mt-4" />}
              </div>
            </article>
          );
        })}
      </div>
    </SectionBlock>
  );
}

export function BlushEvents({ config, tokens }: { config: WeddingConfig; tokens: TemplateTokens }) {
  if (config.events.length === 0) return null;
  return (
    <SectionBlock tokens={tokens}>
      <SectionTitle tokens={tokens}>Thời Gian & Địa Điểm</SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2">
        {config.events.map((event, index) => {
          const d = dateParts(event.date);
          return (
            <article key={index} className="rounded-[28px] p-5 text-center" style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}>
              <p className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full text-3xl font-bold" style={{ color: 'var(--primary)', background: 'var(--bg-card)' }}>
                {d.day}
              </p>
              <BlushCalendar date={event.date} />
              <EventCopy event={event} />
              {event.mapEmbedUrl && <MapEmbed url={event.mapEmbedUrl} address={event.address} className="mt-4" />}
            </article>
          );
        })}
      </div>
    </SectionBlock>
  );
}

export function InkEvents({ config, tokens }: { config: WeddingConfig; tokens: TemplateTokens }) {
  if (config.events.length === 0) return null;
  return (
    <SectionBlock tokens={tokens}>
      <SectionTitle tokens={tokens}>Thời Gian & Địa Điểm</SectionTitle>
      <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
        {config.events.map((event, index) => {
          const d = dateParts(event.date);
          return (
            <article key={index} className="grid gap-4 py-6 sm:grid-cols-[90px_1fr]">
              <div>
                <p className="text-4xl font-light" style={{ color: 'var(--text)' }}>{d.day}</p>
                <p className="text-xs uppercase" style={{ color: 'var(--text-muted)', letterSpacing: '0.16em' }}>T{d.month} / {d.year}</p>
                <InkCalendar date={event.date} />
              </div>
              <div>
                <EventCopy event={event} />
                {event.mapEmbedUrl && <MapEmbed url={event.mapEmbedUrl} address={event.address} className="mt-4" />}
              </div>
            </article>
          );
        })}
      </div>
    </SectionBlock>
  );
}
