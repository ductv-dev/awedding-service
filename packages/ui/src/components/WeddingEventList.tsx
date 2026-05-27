import type { WeddingConfig } from '@workspace/types';
import { cn } from '../lib/cn';
import { MapEmbed } from './MapEmbed';

interface WeddingEventListProps {
  events: WeddingConfig['events'];
  className?: string;
  eventClassName?: string;
}

function formatDateVi(date: string) {
  const d = new Date(date + 'T00:00:00');
  const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  return `${days[d.getDay()]}, ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

function EventDateBadge({ date }: { date: string }) {
  const d = new Date(date + 'T00:00:00');
  const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  return (
    <div
      className="flex w-20 shrink-0 flex-col overflow-hidden rounded-xl text-center sm:w-24"
      style={{ border: '1px solid color-mix(in srgb, var(--primary) 27%, transparent)', background: 'color-mix(in srgb, var(--bg) 60%, transparent)' }}
    >
      <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white" style={{ background: 'var(--primary)' }}>
        {days[d.getDay()]}
      </div>
      <div className="px-2 py-2">
        <p className="text-2xl font-bold leading-none sm:text-3xl" style={{ color: 'var(--accent)' }}>{d.getDate()}</p>
        <p className="mt-1 text-[10px] font-semibold uppercase" style={{ color: 'var(--text-muted)' }}>
          Tháng {d.getMonth() + 1}
        </p>
        <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{d.getFullYear()}</p>
      </div>
    </div>
  );
}

export function WeddingEventList({ events, className, eventClassName }: WeddingEventListProps) {
  return (
    <div className={cn('grid gap-4', events.length > 1 ? 'sm:grid-cols-2' : 'mx-auto max-w-md', className)}>
      {events.map((event, index) => (
        <article
          key={`${event.label}-${index}`}
          className={cn('rounded-2xl p-4', eventClassName)}
          style={{ background: 'var(--bg-card)', border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)' }}
        >
          <div className="flex gap-3 sm:gap-4">
            <EventDateBadge date={event.date} />
            <div className="min-w-0 flex-1">
              <p
                className="mb-1 text-[11px] font-bold uppercase sm:text-xs"
                style={{ color: 'var(--primary)', letterSpacing: '0.1em' }}
              >
                {event.label}
              </p>
              <h3 className="text-base font-bold leading-snug sm:text-lg" style={{ color: 'var(--text)', overflowWrap: 'anywhere' }}>
                {event.venue}
              </h3>
              <div className="mt-3 space-y-2 text-sm" style={{ color: 'var(--text)' }}>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }}>⏰</span>
                  <span style={{ overflowWrap: 'anywhere' }}>
                    <strong style={{ color: 'var(--accent)' }}>{event.time}</strong> · {formatDateVi(event.date)}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }}>📍</span>
                  <span style={{ color: 'var(--text-muted)', overflowWrap: 'anywhere' }}>{event.address}</span>
                </div>
              </div>
            </div>
          </div>
          {event.mapEmbedUrl && (
            <MapEmbed url={event.mapEmbedUrl} address={event.address} className="mt-4 w-full" />
          )}
        </article>
      ))}
    </div>
  );
}
