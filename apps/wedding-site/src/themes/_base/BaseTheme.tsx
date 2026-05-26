'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Share2 } from 'lucide-react';
import {
  AudioPlayer, ScrollProgress, PhotoGrid, QRModal,
  CalendarWidget, MapEmbed,
} from '@workspace/ui';
import { PetalsCanvas, useAutoScroll, useTypewriter } from '@workspace/animations';
import type { WeddingConfig } from '@workspace/types';
import type { BaseThemeConfig } from './themeConfig';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDateVi(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00');
  const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  return `${days[d.getDay()]}, ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

// CSS variable helpers — avoids repeating the color-mix() pattern
const cv = {
  bg: 'var(--bg)',
  card: 'var(--bg-card)',
  primary: 'var(--primary)',
  accent: 'var(--accent)',
  text: 'var(--text)',
  muted: 'var(--text-muted)',
  border: 'var(--border)',
  heading: 'var(--heading-color)',
  // Alpha variants via color-mix()
  primary13: 'color-mix(in srgb, var(--primary) 13%, transparent)',
  primary27: 'color-mix(in srgb, var(--primary) 27%, transparent)',
  primary33: 'color-mix(in srgb, var(--primary) 33%, transparent)',
  accent09: 'color-mix(in srgb, var(--accent) 9%, transparent)',
  accent20: 'color-mix(in srgb, var(--accent) 20%, transparent)',
  accent27: 'color-mix(in srgb, var(--accent) 27%, transparent)',
  accent33: 'color-mix(in srgb, var(--accent) 33%, transparent)',
  bg53: 'color-mix(in srgb, var(--bg) 53%, transparent)',
  bg33: 'color-mix(in srgb, var(--bg) 33%, transparent)',
  bg60: 'color-mix(in srgb, var(--bg) 60%, transparent)',
  bg80: 'color-mix(in srgb, var(--bg) 80%, transparent)',
} as const;

// ─── Toast ───────────────────────────────────────────────────────────────────

function Toast({ message, onHide }: { message: string; onHide: () => void }) {
  return (
    <div
      className="fixed bottom-24 left-1/2 z-[60] -translate-x-1/2 rounded-full px-5 py-3 text-sm font-medium text-white shadow-lg"
      style={{ background: cv.primary, maxWidth: '90vw' }}
      role="status" aria-live="polite"
    >
      {message}
      <button onClick={onHide} className="ml-3 opacity-70 hover:opacity-100 focus-visible:outline-none" aria-label="Đóng">×</button>
    </div>
  );
}

// ─── Intro Screen ─────────────────────────────────────────────────────────────

function BaseIntroScreen({
  config, theme, onOpened,
}: { config: WeddingConfig; theme: BaseThemeConfig; onOpened: () => void }) {
  const { start: startScroll } = useAutoScroll({ speed: 0.5 });
  const weddingDate = config.events[0]?.date ?? '';

  const handleEnter = () => {
    onOpened();
    setTimeout(() => startScroll(), 800);
  };

  return (
    <motion.div
      className="fixed inset-0 z-100 flex cursor-pointer items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.7 } }}
      style={{ background: cv.bg }}
      onClick={handleEnter}
      role="dialog"
      aria-label="Thiệp cưới — nhấn để xem"
    >
      {/* Background photo */}
      <div className="absolute inset-0 opacity-25">
        <Image src={config.coverPhoto} alt="" fill className="object-cover" priority sizes="100vw" />
      </div>
      <div className="absolute inset-0" style={{ background: cv.bg80 }} />

      {/* Card */}
      <motion.div
        className="relative z-10 mx-5 w-full max-w-xs overflow-hidden rounded-2xl shadow-2xl"
        initial={{ opacity: 0, y: 32, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: cv.card, border: `1px solid ${cv.primary27}` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cover photo */}
        <div className="relative h-48">
          <Image src={config.coverPhoto} alt="" fill className="object-cover" sizes="320px" />
          <div className="absolute inset-0" style={{
            background: `linear-gradient(to top, ${cv.bg} 0%, transparent 60%)`,
          }} />
        </div>

        {/* Names */}
        <div className="flex flex-col items-center gap-3 px-6 pb-8 pt-5 text-center">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <theme.IntroOrnament className="opacity-70" />
          </motion.div>

          <div>
            <p className="mb-1 text-[10px] font-semibold tracking-[0.3em] uppercase opacity-50" style={{ color: cv.muted }}>
              Thiệp Mời
            </p>
            <h1
              style={{
                fontFamily: theme.fontDisplay,
                color: cv.text,
                fontSize: 'clamp(1.4rem, 5vw, 1.8rem)',
                lineHeight: 1.25,
              }}
            >
              {config.groom.name}
              <span className="mx-2 opacity-60" style={{ color: cv.accent }}>&</span>
              {config.bride.name}
            </h1>
            {weddingDate && (
              <p className="mt-2 text-xs tracking-[0.18em] uppercase opacity-50" style={{ color: cv.muted }}>
                {formatDateVi(weddingDate)}
              </p>
            )}
          </div>

          <motion.button
            onClick={handleEnter}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-1 w-full rounded-full py-3 text-sm font-semibold tracking-wide transition-all hover:opacity-90 active:scale-95 focus-visible:outline-none focus-visible:ring-2"
            style={{ background: cv.primary, color: '#fff' }}
            aria-label="Mở thiệp cưới"
          >
            Xem Thiệp ✦
          </motion.button>
        </div>
      </motion.div>

      {/* Hint */}
      <motion.p
        className="absolute bottom-8 left-0 right-0 text-center text-xs tracking-widest"
        initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 1 }}
        style={{ color: cv.muted }}
      >
        Nhấn để mở thiệp cưới
      </motion.p>
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function BaseHero({ config, theme, guestName }: { config: WeddingConfig; theme: BaseThemeConfig; guestName?: string }) {
  const [namesVisible, setNamesVisible] = useState(false);
  const [guestVisible, setGuestVisible] = useState(false);
  const typedGuest = useTypewriter(guestName ? `Kính mời ${guestName}` : '', 80);

  useEffect(() => {
    const t1 = setTimeout(() => setNamesVisible(true), 500);
    const t2 = setTimeout(() => setGuestVisible(true), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <section className="relative flex h-screen min-h-[600px] items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={config.coverPhoto}
          alt={`Ảnh cưới ${config.groom.name} & ${config.bride.name}`}
          fill priority sizes="100vw" className="object-cover"
          style={{ animation: 'kenBurns 20s ease-in-out infinite' }}
        />
      </div>
      <div className="absolute inset-0" style={{
        background: `linear-gradient(180deg, ${cv.bg53} 0%, ${cv.bg33} 40%, ${cv.bg60} 100%)`,
      }} />

      {theme.particles && (
        <PetalsCanvas count={theme.particles.count} color={theme.particles.color} shape={theme.particles.shape} />
      )}

      <div className="absolute left-4 top-4 opacity-20 sm:left-8 sm:top-8" aria-hidden="true">
        <theme.HeroOrnament />
      </div>
      <div className="absolute right-4 top-4 opacity-20 sm:right-8 sm:top-8" aria-hidden="true">
        <theme.HeroOrnament />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4 px-4 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
          <theme.HeroOrnament className="opacity-70" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={namesVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-bold drop-shadow-lg"
          style={{
            fontFamily: theme.fontDisplay,
            color: cv.text,
            fontSize: 'clamp(2.2rem, 9vw, 5rem)',
            lineHeight: 1.1,
          }}
        >
          {config.groom.name}
          <span className="mx-3 opacity-70" style={{ color: cv.accent }}>&</span>
          {config.bride.name}
        </motion.h1>

        {guestName && (
          <motion.p
            initial={{ opacity: 0 }} animate={guestVisible ? { opacity: 1 } : {}}
            className="min-h-[1.8em] text-sm font-medium tracking-[0.2em] uppercase sm:text-base"
            style={{ color: cv.accent }} aria-live="polite"
          >
            {typedGuest}<span className="animate-pulse">|</span>
          </motion.p>
        )}

        {config.events[0] && (
          <motion.div
            initial={{ opacity: 0 }} animate={namesVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3"
          >
            <div className="h-px w-10" style={{ background: cv.accent }} />
            <span className="text-sm tracking-[0.25em] uppercase opacity-80" style={{ color: cv.text }}>
              {config.events[0].date.split('-').reverse().join('/')}
            </span>
            <div className="h-px w-10" style={{ background: cv.accent }} />
          </motion.div>
        )}
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
        aria-hidden="true"
      >
        <div className="h-10 w-6 rounded-full border-2 flex items-start justify-center pt-1.5"
          style={{ borderColor: cv.accent33 }}>
          <motion.div className="h-2 w-1 rounded-full" style={{ background: cv.accent }}
            animate={{ y: [0, 12, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────

function Section({
  children, alt = false, Divider, id,
}: {
  children: React.ReactNode;
  alt?: boolean;
  id?: string;
  Divider: BaseThemeConfig['SectionDivider'];
}) {
  return (
    <section id={id} className="relative py-16 px-4" style={{ background: alt ? cv.card : cv.bg }}>
      <Divider className="absolute top-0 left-4 right-4 opacity-30" />
      <div className="mx-auto max-w-3xl">{children}</div>
      <Divider className="absolute bottom-0 left-4 right-4 opacity-30" />
    </section>
  );
}

function SectionLabel({ children, fontHeading }: { children: React.ReactNode; fontHeading: string }) {
  return (
    <h2
      className="mb-8 text-center font-bold tracking-[0.15em] uppercase"
      style={{
        fontFamily: fontHeading,
        color: cv.heading,
        fontSize: 'clamp(1.1rem, 3vw, 1.6rem)',
        letterSpacing: '0.15em',
      }}
    >
      {children}
    </h2>
  );
}

// ─── Album ───────────────────────────────────────────────────────────────────

function BaseAlbum({ photos, theme }: { photos: string[]; theme: BaseThemeConfig }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <Section Divider={theme.SectionDivider}>
      <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
        <SectionLabel fontHeading={theme.fontHeading}>Khoảnh Khắc Của Chúng Tôi</SectionLabel>
        <PhotoGrid photos={photos} />
      </motion.div>
    </Section>
  );
}

// ─── Family Info ─────────────────────────────────────────────────────────────

function BaseFamilyInfo({ config, theme }: { config: WeddingConfig; theme: BaseThemeConfig }) {
  const FamilyCol = ({
    person, title, delay,
  }: { person: WeddingConfig['groom'] | WeddingConfig['bride']; title: string; delay: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    return (
      <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay }} className="flex flex-col items-center gap-4 text-center"
      >
        <div className="rounded-full px-4 py-1 text-xs font-bold tracking-widest uppercase"
          style={{
            background: cv.primary13,
            border: `1px solid ${cv.primary27}`,
            color: cv.primary,
          }}>
          {title}
        </div>
        <div className="space-y-1">
          <p className="font-medium" style={{ color: cv.text }}>{person.fatherName}</p>
          <p className="font-medium" style={{ color: cv.text }}>{person.motherName}</p>
        </div>
        <p className="text-sm" style={{ color: cv.muted }}>📍 {person.address}</p>
        <div className="w-full rounded-xl px-4 py-3"
          style={{ background: cv.accent09, border: `1px solid ${cv.accent27}` }}>
          <p className="text-[10px] tracking-widest uppercase mb-0.5" style={{ color: cv.muted }}>
            {title === 'Nhà Trai' ? 'Chú Rể' : 'Cô Dâu'}
          </p>
          <p className="text-lg font-bold" style={{ fontFamily: theme.fontDisplay, color: cv.accent }}>
            {person.name}
          </p>
          <p className="text-xs mt-0.5" style={{ color: cv.muted }}>{person.role}</p>
        </div>
      </motion.div>
    );
  };

  return (
    <Section alt Divider={theme.SectionDivider}>
      <SectionLabel fontHeading={theme.fontHeading}>Thông Tin Gia Đình</SectionLabel>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1fr_auto_1fr]">
        <FamilyCol person={config.groom} title="Nhà Trai" delay={0} />
        <div className="hidden sm:flex flex-col items-center gap-2 py-4" aria-hidden="true">
          <div className="flex-1 w-px" style={{
            background: `linear-gradient(to bottom, transparent, ${cv.accent}, transparent)`,
          }} />
          <span style={{ color: cv.accent, fontSize: 20, opacity: 0.4 }}>✦</span>
          <div className="flex-1 w-px" style={{
            background: `linear-gradient(to bottom, transparent, ${cv.accent}, transparent)`,
          }} />
        </div>
        <FamilyCol person={config.bride} title="Nhà Gái" delay={0.15} />
      </div>
    </Section>
  );
}

// ─── Events ──────────────────────────────────────────────────────────────────

function BaseEvents({ events, theme }: { events: WeddingConfig['events']; theme: BaseThemeConfig }) {
  return (
    <Section Divider={theme.SectionDivider}>
      <SectionLabel fontHeading={theme.fontHeading}>Thời Gian & Địa Điểm</SectionLabel>
      <div className={`grid gap-5 ${events.length > 1 ? 'sm:grid-cols-2' : 'max-w-sm mx-auto'}`}>
        {events.map((event, i) => {
          const ref = useRef<HTMLDivElement>(null);
          const inView = useInView(ref, { once: true, margin: '-60px' });
          return (
            <motion.div key={i} ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="overflow-hidden rounded-2xl"
              style={{ background: cv.card, border: `1px solid ${cv.accent20}` }}
            >
              <div className="px-5 py-3 text-center text-xs font-bold tracking-[0.15em] uppercase"
                style={{ background: cv.primary, color: '#fff' }}>
                {event.label}
              </div>
              <div className="flex flex-col items-center gap-4 p-5">
                <CalendarWidget date={event.date} />
                <div className="w-full space-y-2 text-sm" style={{ color: cv.text }}>
                  <div className="flex items-center gap-2">
                    <span style={{ color: cv.accent }}>⏰</span>
                    <span>
                      <strong style={{ color: cv.accent }}>{event.time}</strong> — {event.venue}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span style={{ color: cv.accent }}>📍</span>
                    <span style={{ color: cv.muted }}>{event.address}</span>
                  </div>
                </div>
                {event.mapEmbedUrl && (
                  <MapEmbed url={event.mapEmbedUrl} address={event.address} className="w-full" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

// ─── Timeline ─────────────────────────────────────────────────────────────────

function BaseTimeline({ items, theme }: { items: WeddingConfig['timeline']; theme: BaseThemeConfig }) {
  return (
    <Section alt Divider={theme.SectionDivider}>
      <SectionLabel fontHeading={theme.fontHeading}>Chương Trình Ngày Cưới</SectionLabel>
      <ol className="relative mx-auto max-w-md space-y-6" aria-label="Lịch trình">
        {items.map((item, i) => {
          const ref = useRef<HTMLLIElement>(null);
          const inView = useInView(ref, { once: true, margin: '-50px' });
          return (
            <motion.li key={i} ref={ref} initial={{ opacity: 0, x: -28 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative flex gap-4 pb-6 last:pb-0"
            >
              {i < items.length - 1 && (
                <div className="absolute left-[19px] top-10 bottom-0 w-px"
                  style={{ background: cv.primary27 }} aria-hidden="true" />
              )}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-md"
                style={{ background: cv.primary }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="pt-1">
                <time className="text-sm font-bold tracking-wide" style={{ color: cv.accent }}>{item.time}</time>
                <h3 className="mt-0.5 font-semibold" style={{ color: cv.text }}>{item.title}</h3>
                {item.description && (
                  <p className="mt-0.5 text-sm opacity-60" style={{ color: cv.text }}>{item.description}</p>
                )}
              </div>
            </motion.li>
          );
        })}
      </ol>
    </Section>
  );
}

// ─── Wishes ───────────────────────────────────────────────────────────────────

const SAMPLE_WISHES = [
  { name: 'Anh Minh & Chị Lan', content: 'Chúc mừng đám cưới! Chúc hai bạn trăm năm hạnh phúc 💕' },
  { name: 'Gia đình Chú Hùng', content: 'Kính chúc cô dâu chú rể vạn sự như ý, sớm có tin vui!' },
  { name: 'Bạn bè Đại học', content: '🎉 Cuối cùng ngày này cũng đến! Mãi mãi hạnh phúc nhé!' },
];

function BaseWishes({ theme }: { theme: BaseThemeConfig }) {
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) return;
    setToast(`Cảm ơn ${name.trim()}! Lời chúc của bạn đã được ghi nhận 💌`);
    setName(''); setMsg('');
    setTimeout(() => setToast(null), 4000);
  };

  const inputStyle: React.CSSProperties = {
    background: cv.card,
    border: `1px solid ${cv.accent27}`,
    color: cv.text,
    borderRadius: 8,
    padding: '10px 14px',
    width: '100%',
    outline: 'none',
    fontSize: 14,
    fontFamily: theme.fontBody,
  };

  return (
    <Section Divider={theme.SectionDivider}>
      <SectionLabel fontHeading={theme.fontHeading}>Gửi Lời Chúc</SectionLabel>
      <form onSubmit={handleSubmit} className="mx-auto mb-8 max-w-md space-y-3">
        <div>
          <label htmlFor="base-wish-name" className="mb-1 block text-xs font-medium uppercase tracking-widest"
            style={{ color: cv.muted }}>Tên của bạn</label>
          <input id="base-wish-name" type="text" placeholder="Nguyễn Văn A" value={name}
            onChange={e => setName(e.target.value)} style={inputStyle} maxLength={60} required />
        </div>
        <div>
          <label htmlFor="base-wish-msg" className="mb-1 block text-xs font-medium uppercase tracking-widest"
            style={{ color: cv.muted }}>Lời chúc</label>
          <textarea id="base-wish-msg" placeholder="Chúc hai bạn trăm năm hạnh phúc..." value={msg}
            onChange={e => setMsg(e.target.value)}
            style={{ ...inputStyle, minHeight: 90, resize: 'vertical' }} maxLength={300} required />
        </div>
        <button type="submit"
          className="w-full rounded-full py-3 text-sm font-bold tracking-wide transition-all hover:opacity-90 active:scale-95"
          style={{ background: cv.primary, color: '#fff' }}>
          Gửi Lời Chúc 💌
        </button>
        <p className="text-center text-xs opacity-40" style={{ color: cv.muted }}>
          Lời chúc sẽ được hiển thị sau khi xét duyệt
        </p>
      </form>
      <div className="space-y-3">
        {SAMPLE_WISHES.map((w, i) => (
          <div key={i} className="rounded-xl p-4"
            style={{ background: cv.card, border: `1px solid ${cv.accent20}` }}>
            <p className="text-sm font-semibold mb-1" style={{ color: cv.accent }}>{w.name}</p>
            <p className="text-sm leading-relaxed opacity-80" style={{ color: cv.text }}>{w.content}</p>
          </div>
        ))}
      </div>
      {toast && <Toast message={toast} onHide={() => setToast(null)} />}
    </Section>
  );
}

// ─── Gift ─────────────────────────────────────────────────────────────────────

function BaseGift({ config, theme }: { config: WeddingConfig; theme: BaseThemeConfig }) {
  const [showQR, setShowQR] = useState(false);

  return (
    <section
      className="relative overflow-hidden py-20 px-4 text-center"
      style={{ background: `linear-gradient(160deg, ${cv.card}, ${cv.bg})` }}
    >
      <div className="relative z-10 mx-auto max-w-sm">
        <motion.div
          animate={{ y: [0, -14, 0] }} transition={{ duration: 2.5, repeat: Infinity }}
          className="mb-6 text-7xl" aria-label="Phong bao đỏ"
        >
          🧧
        </motion.div>
        <h2 className="mb-2 font-bold"
          style={{ fontFamily: theme.fontHeading, color: cv.heading, fontSize: 'clamp(1.5rem, 5vw, 2.2rem)' }}>
          Phong Bao Mừng Cưới
        </h2>
        <p className="mb-8 text-sm leading-relaxed" style={{ color: cv.muted, opacity: 0.8 }}>
          Sự hiện diện của quý khách là món quà quý giá nhất. Nếu muốn gửi thêm tấm lòng, vui lòng sử dụng mã QR bên dưới.
        </p>
        <button
          onClick={() => setShowQR(true)}
          className="rounded-full px-8 py-3.5 text-sm font-bold tracking-wide transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2"
          style={{ background: cv.primary, color: '#fff', boxShadow: `0 4px 20px ${cv.primary33}` }}
        >
          Mừng Cưới 🧧
        </button>
      </div>
      {showQR && (
        <QRModal
          groom={{ name: config.groom.name, qrImageUrl: config.groom.qrImageUrl }}
          bride={{ name: config.bride.name, qrImageUrl: config.bride.qrImageUrl }}
          onClose={() => setShowQR(false)}
        />
      )}
    </section>
  );
}

// ─── Closing ──────────────────────────────────────────────────────────────────

const DEFAULT_CLOSING = {
  vi: 'Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!',
  en: 'Your presence would be the greatest gift we could receive!',
};

function BaseClosing({ config, theme }: { config: WeddingConfig; theme: BaseThemeConfig }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [toast, setToast] = useState<string | null>(null);
  const closing = config.closingText ?? DEFAULT_CLOSING;
  const weddingDate = config.events[0]?.date ?? '';

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: `Thiệp cưới ${config.groom.name} & ${config.bride.name}`, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setToast('Đã sao chép link thiệp! Gửi ngay cho người thân nhé 💌');
        setTimeout(() => setToast(null), 4000);
      }
    } catch { /* user cancelled */ }
  };

  return (
    <section className="relative py-20 px-4 text-center" style={{ background: cv.bg }}>
      <theme.SectionDivider className="mb-10 opacity-30" />
      <motion.div
        ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }} className="mx-auto max-w-lg"
      >
        <theme.IntroOrnament className="mb-6 opacity-50" />
        <h2
          className="mb-2 font-bold"
          style={{ fontFamily: theme.fontDisplay, color: cv.text, fontSize: 'clamp(1.6rem, 6vw, 2.8rem)' }}
        >
          {config.groom.name} &amp; {config.bride.name}
        </h2>
        {weddingDate && (
          <p className="mb-6 text-sm tracking-[0.2em] uppercase opacity-60" style={{ color: cv.accent }}>
            {weddingDate.split('-').reverse().join('/')}
          </p>
        )}
        <p className="mb-2 text-base italic leading-relaxed sm:text-lg" style={{ color: cv.text, opacity: 0.85 }}>
          "{closing.vi}"
        </p>
        <p className="mb-8 text-sm italic opacity-50" style={{ color: cv.muted }}>"{closing.en}"</p>
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 rounded-full border px-7 py-3 text-sm font-semibold tracking-wide transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2"
          style={{ borderColor: cv.accent, color: cv.accent }}
        >
          <Share2 size={16} aria-hidden="true" />
          Chia Sẻ Thiệp
        </button>
      </motion.div>
      <theme.SectionDivider className="mt-10 opacity-30" />
      <p className="mt-8 text-xs opacity-30" style={{ color: cv.muted }}>
        Tạo bởi <span className="font-semibold" style={{ color: cv.accent }}>aWedding</span> — awedding.online
      </p>
      {toast && <Toast message={toast} onHide={() => setToast(null)} />}
    </section>
  );
}

// ─── Main BaseTheme Export ────────────────────────────────────────────────────

interface BaseThemeProps {
  config: WeddingConfig;
  theme: BaseThemeConfig;
  guestName?: string;
}

const SESSION_KEY = (slug: string) => `hasOpenedInvite_${slug}`;

export function BaseTheme({ config, theme, guestName }: BaseThemeProps) {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem(SESSION_KEY(config.slug))) setShowIntro(true);
  }, [config.slug]);

  const handleIntroOpened = () => {
    sessionStorage.setItem(SESSION_KEY(config.slug), '1');
    setShowIntro(false);
  };

  return (
    <div
      className={theme.themeClass}
      style={{
        background: 'var(--bg-body, var(--bg))',
        color: cv.text,
        fontFamily: theme.fontBody,
        minHeight: '100vh',
      }}
    >
      {/* Texture overlay — applies only when theme CSS defines .theme-xxx .theme-texture */}
      <div className="theme-texture fixed inset-0 pointer-events-none z-0" aria-hidden="true" />

      {config.isDemo && (
        <div
          className="fixed top-0 left-0 right-0 z-50 py-1.5 text-center text-xs font-bold tracking-[0.2em] uppercase"
          style={{ background: cv.primary, color: '#fff' }}
          role="banner"
        >
          ★ TRANG MẪU — DEMO aWedding ★
        </div>
      )}

      <ScrollProgress color="var(--primary)" />

      <AnimatePresence>
        {showIntro && (
          <BaseIntroScreen key="intro" config={config} theme={theme} onOpened={handleIntroOpened} />
        )}
      </AnimatePresence>

      <main className={config.isDemo ? 'pt-8' : ''}>
        {theme.HeroOverride
          ? <theme.HeroOverride config={config} theme={theme} guestName={guestName} />
          : <BaseHero config={config} theme={theme} guestName={guestName} />
        }
        {config.galleryPhotos.length > 0 && <BaseAlbum photos={config.galleryPhotos} theme={theme} />}
        <BaseFamilyInfo config={config} theme={theme} />
        {config.events.length > 0 && <BaseEvents events={config.events} theme={theme} />}
        {config.timeline.length > 0 && <BaseTimeline items={config.timeline} theme={theme} />}
        <BaseWishes theme={theme} />
        <BaseGift config={config} theme={theme} />
        <BaseClosing config={config} theme={theme} />
      </main>

      {config.music && (
        <AudioPlayer
          src={config.music.url}
          title={config.music.title}
          autoplay={config.music.autoplay}
          accentColor="var(--primary)"
        />
      )}
    </div>
  );
}
