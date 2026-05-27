const DAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

function getCalendar(date: string) {
  const target = new Date(date + 'T00:00:00');
  const year = target.getFullYear();
  const month = target.getMonth();
  const day = target.getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<number | null> = [
    ...Array<null>(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);
  return { year, month: month + 1, day, cells };
}

interface ThemeCalendarProps {
  date: string;
  compact?: boolean;
}

function CalendarGrid({
  date,
  dayClassName,
  activeClassName,
  cellStyle,
}: {
  date: string;
  dayClassName?: string;
  activeClassName?: string;
  cellStyle?: React.CSSProperties;
}) {
  const { day, cells } = getCalendar(date);

  return (
    <>
      <div className="grid grid-cols-7 gap-1">
        {DAYS.map((d) => (
          <div key={d} className="py-1 text-center text-[9px] font-bold uppercase" style={{ color: 'var(--text-muted)' }}>
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, index) => {
          const active = cell === day;
          return (
            <div
              key={index}
              className={[
                'flex aspect-square items-center justify-center text-[11px]',
                dayClassName,
                active ? activeClassName : '',
              ].filter(Boolean).join(' ')}
              style={{
                color: active ? '#fff' : 'var(--text-muted)',
                opacity: cell ? 1 : 0,
                ...cellStyle,
                ...(active ? { background: 'var(--primary)', color: '#fff' } : null),
              }}
            >
              {cell}
            </div>
          );
        })}
      </div>
    </>
  );
}

export function EmeraldCalendar({ date }: ThemeCalendarProps) {
  const { month, year } = getCalendar(date);
  return (
    <div className="rounded-2xl p-3" style={{ background: 'color-mix(in srgb, var(--accent) 8%, transparent)' }}>
      <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase" style={{ color: 'var(--accent)' }}>
        <span>Tháng {month}</span>
        <span>{year}</span>
      </div>
      <CalendarGrid date={date} dayClassName="rounded-lg" />
    </div>
  );
}

export function TraditionalCalendar({ date }: ThemeCalendarProps) {
  const { month, year } = getCalendar(date);
  return (
    <div className="p-3" style={{ borderTop: '2px solid var(--primary)', borderBottom: '2px solid var(--primary)' }}>
      <p className="mb-2 text-center text-xs font-bold uppercase" style={{ color: 'var(--primary)', letterSpacing: '0.18em' }}>
        Tháng {month} / {year}
      </p>
      <CalendarGrid date={date} dayClassName="rounded-full" />
    </div>
  );
}

export function ChampagneCalendar({ date }: ThemeCalendarProps) {
  const { month, year } = getCalendar(date);
  return (
    <div className="rounded-t-full px-4 pb-4 pt-8 shadow-sm" style={{ background: 'var(--bg-card)' }}>
      <p className="mb-3 text-center text-xs font-semibold uppercase" style={{ color: 'var(--primary)', letterSpacing: '0.16em' }}>
        Tháng {month} · {year}
      </p>
      <CalendarGrid date={date} dayClassName="rounded-full" />
    </div>
  );
}

export function SageCalendar({ date }: ThemeCalendarProps) {
  const { month, year } = getCalendar(date);
  return (
    <div className="rounded-3xl p-3" style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}>
      <p className="mb-2 text-center text-xs font-bold uppercase" style={{ color: 'var(--primary)' }}>
        Tháng {month}, {year}
      </p>
      <CalendarGrid date={date} dayClassName="rounded-md" />
    </div>
  );
}

export function BlushCalendar({ date }: ThemeCalendarProps) {
  const { month, year } = getCalendar(date);
  return (
    <div className="rounded-[28px] p-3" style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}>
      <p className="mb-2 text-center text-xs font-bold uppercase" style={{ color: 'var(--primary)', letterSpacing: '0.14em' }}>
        Tháng {month} · {year}
      </p>
      <CalendarGrid date={date} dayClassName="rounded-full" />
    </div>
  );
}

export function InkCalendar({ date }: ThemeCalendarProps) {
  const { month, year } = getCalendar(date);
  return (
    <div className="p-3" style={{ border: '1px solid var(--border)' }}>
      <p className="mb-2 text-center text-xs uppercase" style={{ color: 'var(--text-muted)', letterSpacing: '0.2em' }}>
        {month} / {year}
      </p>
      <CalendarGrid date={date} dayClassName="rounded-none" cellStyle={{ fontFamily: 'var(--font-tenor, system-ui, sans-serif)' }} />
    </div>
  );
}
