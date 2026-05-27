'use client';

import { useEffect, useRef, useState } from 'react';
import type React from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Share2 } from 'lucide-react';
import {
  AudioPlayer,
  PhotoGrid,
  QRModal,
  ScrollProgress,
  WeddingFamilyGrid,
} from '@workspace/ui';
import { PetalsCanvas, useAutoScroll } from '@workspace/animations';
import type { WeddingConfig } from '@workspace/types';

interface ThemeParticles {
  color: string;
  shape: 'petal' | 'leaf' | 'particle';
  count: number;
}

export interface TemplateProps {
  config: WeddingConfig;
  guestName?: string;
}

export interface TemplateTokens {
  themeClass: string;
  fontDisplay: string;
  fontHeading: string;
  fontBody: string;
  particles: ThemeParticles | null;
  IntroOrnament: React.ComponentType<{ className?: string }>;
  SectionDivider: React.ComponentType<{ className?: string }>;
}

export const INVITE_OPENED_EVENT = 'awedding:invite-opened';

const SESSION_KEY = (slug: string) => `hasOpenedInvite_${slug}`;

export function formatDateVi(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00');
  const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  return `${days[d.getDay()]}, ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

function IntroScreen({
  config,
  tokens,
  onOpened,
}: {
  config: WeddingConfig;
  tokens: TemplateTokens;
  onOpened: () => void;
}) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const { start: startScroll } = useAutoScroll({ speed: isMobile ? 0.8 : 0.5 });
  const weddingDate = config.events[0]?.date ?? '';
  const openedRef = useRef(false);

  const handleEnter = () => {
    if (openedRef.current) return;
    openedRef.current = true;
    onOpened();
    window.dispatchEvent(new Event(INVITE_OPENED_EVENT));
    const shouldAutoScroll = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
    if (shouldAutoScroll) setTimeout(() => startScroll(), 800);
  };

  return (
    <motion.div
      className="fixed inset-0 z-100 flex cursor-pointer items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.7 } }}
      style={{ background: 'var(--bg)', zIndex: 100 }}
      onClick={handleEnter}
      onPointerUp={handleEnter}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') handleEnter();
      }}
      role="dialog"
      tabIndex={-1}
      aria-label="Thiệp cưới - nhấn để xem"
    >
      <div className="absolute inset-0 opacity-25">
        <Image src={config.coverPhoto} alt="" fill className="object-cover" priority sizes="100vw" />
      </div>
      <div className="absolute inset-0" style={{ background: 'color-mix(in srgb, var(--bg) 80%, transparent)' }} />

      <motion.div
        className="relative z-10 mx-5 w-full max-w-xs overflow-hidden rounded-2xl shadow-2xl"
        initial={{ opacity: 0, y: 32, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: 'var(--bg-card)', border: '1px solid color-mix(in srgb, var(--primary) 27%, transparent)' }}
      >
        <div className="relative h-48">
          <Image src={config.coverPhoto} alt="" fill className="object-cover" sizes="320px" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--bg), transparent 60%)' }} />
        </div>
        <div className="flex flex-col items-center gap-3 px-6 pb-8 pt-5 text-center">
          <tokens.IntroOrnament className="opacity-70" />
          <div>
            <p className="mb-1 text-[10px] font-semibold uppercase opacity-50" style={{ color: 'var(--text-muted)', letterSpacing: '0.3em' }}>
              Thiệp Mời
            </p>
            <h1 style={{ fontFamily: tokens.fontDisplay, color: 'var(--text)', fontSize: 'clamp(1.4rem, 5vw, 1.8rem)', lineHeight: 1.25 }}>
              {config.groom.name}
              <span className="mx-2 opacity-60" style={{ color: 'var(--accent)' }}>&</span>
              {config.bride.name}
            </h1>
            {weddingDate && (
              <p className="mt-2 text-xs uppercase opacity-50" style={{ color: 'var(--text-muted)', letterSpacing: '0.18em' }}>
                {formatDateVi(weddingDate)}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleEnter}
            onPointerUp={handleEnter}
            className="mt-1 w-full rounded-full py-3 text-sm font-semibold tracking-wide transition-all hover:opacity-90 active:scale-95"
            style={{ background: 'var(--primary)', color: '#fff' }}
          >
            Xem Thiệp
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function TemplateShell({
  config,
  tokens,
  children,
}: {
  config: WeddingConfig;
  tokens: TemplateTokens;
  children: React.ReactNode;
}) {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setShowIntro(!sessionStorage.getItem(SESSION_KEY(config.slug)));
    });
  }, [config.slug]);

  const handleIntroOpened = () => {
    sessionStorage.setItem(SESSION_KEY(config.slug), '1');
    setShowIntro(false);
  };

  return (
    <div
      className={tokens.themeClass}
      style={{
        background: 'var(--bg-body, var(--bg))',
        color: 'var(--text)',
        fontFamily: tokens.fontBody,
        minHeight: '100vh',
      }}
    >
      <div className="theme-texture fixed inset-0 pointer-events-none z-0" aria-hidden="true" />
      {config.isDemo && (
        <div
          className="fixed top-0 left-0 right-0 z-50 py-1.5 text-center text-xs font-bold uppercase"
          style={{ background: 'var(--primary)', color: '#fff', letterSpacing: '0.2em' }}
          role="banner"
        >
          TRANG MẪU - DEMO aWedding
        </div>
      )}
      <ScrollProgress color="var(--primary)" />
      <AnimatePresence>
        {showIntro && <IntroScreen key="intro" config={config} tokens={tokens} onOpened={handleIntroOpened} />}
      </AnimatePresence>
      {!showIntro && tokens.particles && (
        <PetalsCanvas count={tokens.particles.count} color={tokens.particles.color} shape={tokens.particles.shape} />
      )}
      <main className={config.isDemo ? 'pt-8' : ''}>{children}</main>
      {config.music && (
        <AudioPlayer
          src={config.music.url}
          title={config.music.title}
          autoplay={config.music.autoplay}
          autoplayEventName={INVITE_OPENED_EVENT}
          accentColor="var(--primary)"
        />
      )}
    </div>
  );
}

export function SectionBlock({
  children,
  tokens,
  alt = false,
  className = '',
}: {
  children: React.ReactNode;
  tokens: TemplateTokens;
  alt?: boolean;
  className?: string;
}) {
  return (
    <section className={`relative px-4 py-16 ${className}`} style={{ background: alt ? 'var(--bg-card)' : 'var(--bg)' }}>
      <tokens.SectionDivider className="absolute left-4 right-4 top-0 opacity-30" />
      <div className="mx-auto max-w-3xl">{children}</div>
      <tokens.SectionDivider className="absolute bottom-0 left-4 right-4 opacity-30" />
    </section>
  );
}

export function SectionTitle({ children, tokens }: { children: React.ReactNode; tokens: TemplateTokens }) {
  return (
    <h2
      className="mb-8 text-center font-bold uppercase"
      style={{
        fontFamily: tokens.fontHeading,
        color: 'var(--heading-color)',
        fontSize: 'clamp(1.1rem, 3vw, 1.6rem)',
        letterSpacing: '0.15em',
      }}
    >
      {children}
    </h2>
  );
}

export function GallerySection({ config, tokens, alt = false }: { config: WeddingConfig; tokens: TemplateTokens; alt?: boolean }) {
  if (config.galleryPhotos.length === 0) return null;
  return (
    <SectionBlock tokens={tokens} alt={alt}>
      <SectionTitle tokens={tokens}>Khoảnh Khắc Của Chúng Tôi</SectionTitle>
      <PhotoGrid photos={config.galleryPhotos} />
    </SectionBlock>
  );
}

export function FamilySection({ config, tokens, alt = false }: { config: WeddingConfig; tokens: TemplateTokens; alt?: boolean }) {
  return (
    <SectionBlock tokens={tokens} alt={alt}>
      <SectionTitle tokens={tokens}>Thông Tin Gia Đình</SectionTitle>
      <WeddingFamilyGrid groom={config.groom} bride={config.bride} fontDisplay={tokens.fontDisplay} />
    </SectionBlock>
  );
}

export function TimelineSection({ config, tokens, alt = false }: { config: WeddingConfig; tokens: TemplateTokens; alt?: boolean }) {
  if (config.timeline.length === 0) return null;
  return (
    <SectionBlock tokens={tokens} alt={alt}>
      <SectionTitle tokens={tokens}>Chương Trình Ngày Cưới</SectionTitle>
      <ol className="relative mx-auto max-w-md space-y-6" aria-label="Lịch trình">
        {config.timeline.map((item, i) => (
          <li key={`${item.time}-${i}`} className="relative flex gap-4 pb-6 last:pb-0">
            {i < config.timeline.length - 1 && (
              <div className="absolute bottom-0 top-10 w-px" style={{ left: 19, background: 'color-mix(in srgb, var(--primary) 27%, transparent)' }} aria-hidden="true" />
            )}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-md" style={{ background: 'var(--primary)' }}>
              <span className="text-xs font-bold">{i + 1}</span>
            </div>
            <div className="pt-1">
              <time className="text-sm font-bold tracking-wide" style={{ color: 'var(--accent)' }}>{item.time}</time>
              <h3 className="mt-0.5 font-semibold" style={{ color: 'var(--text)' }}>{item.title}</h3>
              {item.description && <p className="mt-0.5 text-sm opacity-70" style={{ color: 'var(--text)' }}>{item.description}</p>}
            </div>
          </li>
        ))}
      </ol>
    </SectionBlock>
  );
}

const SAMPLE_WISHES = [
  { name: 'Anh Minh & Chị Lan', content: 'Chúc mừng đám cưới! Chúc hai bạn trăm năm hạnh phúc.' },
  { name: 'Gia đình Chú Hùng', content: 'Kính chúc cô dâu chú rể vạn sự như ý, hạnh phúc viên mãn!' },
  { name: 'Bạn bè Đại học', content: 'Cuối cùng ngày này cũng đến! Mãi mãi hạnh phúc nhé!' },
];

export function WishesSection({ tokens, alt = false }: { tokens: TemplateTokens; alt?: boolean }) {
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) return;
    setToast(`Cảm ơn ${name.trim()}! Lời chúc của bạn đã được ghi nhận.`);
    setName('');
    setMsg('');
    setTimeout(() => setToast(null), 4000);
  };

  const inputStyle: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid color-mix(in srgb, var(--accent) 27%, transparent)',
    color: 'var(--text)',
    borderRadius: 8,
    padding: '10px 14px',
    width: '100%',
    outline: 'none',
    fontSize: 14,
    fontFamily: tokens.fontBody,
  };

  return (
    <SectionBlock tokens={tokens} alt={alt}>
      <SectionTitle tokens={tokens}>Gửi Lời Chúc</SectionTitle>
      <form onSubmit={handleSubmit} className="mx-auto mb-8 max-w-md space-y-3">
        <input type="text" placeholder="Tên của bạn" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} maxLength={60} required />
        <textarea placeholder="Chúc hai bạn trăm năm hạnh phúc..." value={msg} onChange={(e) => setMsg(e.target.value)} style={{ ...inputStyle, minHeight: 90, resize: 'vertical' }} maxLength={300} required />
        <button type="submit" className="w-full rounded-full py-3 text-sm font-bold tracking-wide text-white transition-all hover:opacity-90" style={{ background: 'var(--primary)' }}>
          Gửi Lời Chúc
        </button>
      </form>
      <div className="space-y-3">
        {SAMPLE_WISHES.map((wish, i) => (
          <div key={i} className="rounded-xl p-4" style={{ background: 'var(--bg-card)', border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)' }}>
            <p className="mb-1 text-sm font-semibold" style={{ color: 'var(--accent)' }}>{wish.name}</p>
            <p className="text-sm leading-relaxed opacity-80" style={{ color: 'var(--text)' }}>{wish.content}</p>
          </div>
        ))}
      </div>
      {toast && <p className="fixed bottom-24 left-1/2 z-60 -translate-x-1/2 rounded-full px-5 py-3 text-sm font-medium text-white shadow-lg" style={{ background: 'var(--primary)' }}>{toast}</p>}
    </SectionBlock>
  );
}

export function GiftSection({ config, tokens }: { config: WeddingConfig; tokens: TemplateTokens }) {
  const [showQR, setShowQR] = useState(false);
  return (
    <section className="relative overflow-hidden px-4 py-20 text-center" style={{ background: 'linear-gradient(160deg, var(--bg-card), var(--bg))' }}>
      <div className="relative z-10 mx-auto max-w-sm">
        <div className="mb-6 text-6xl" aria-hidden="true">🧧</div>
        <h2 className="mb-2 font-bold" style={{ fontFamily: tokens.fontHeading, color: 'var(--heading-color)', fontSize: 'clamp(1.5rem, 5vw, 2.2rem)' }}>
          Phong Bao Mừng Cưới
        </h2>
        <p className="mb-8 text-sm leading-relaxed" style={{ color: 'var(--text-muted)', opacity: 0.85 }}>
          Sự hiện diện của quý khách là món quà quý giá nhất. Nếu muốn gửi thêm tấm lòng, vui lòng sử dụng mã QR bên dưới.
        </p>
        <button onClick={() => setShowQR(true)} className="rounded-full px-8 py-3.5 text-sm font-bold tracking-wide text-white transition-all hover:scale-105 active:scale-95" style={{ background: 'var(--primary)' }}>
          Mừng Cưới
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

export function ClosingSection({ config, tokens }: { config: WeddingConfig; tokens: TemplateTokens }) {
  const [toast, setToast] = useState<string | null>(null);
  const closing = config.closingText ?? {
    vi: 'Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!',
    en: 'Your presence would be the greatest gift we could receive!',
  };
  const weddingDate = config.events[0]?.date ?? '';

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: `Thiệp cưới ${config.groom.name} & ${config.bride.name}`, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setToast('Đã sao chép link thiệp!');
        setTimeout(() => setToast(null), 4000);
      }
    } catch { /* user cancelled */ }
  };

  return (
    <section className="relative px-4 py-20 text-center" style={{ background: 'var(--bg)' }}>
      <tokens.SectionDivider className="mb-10 opacity-30" />
      <div className="mx-auto max-w-lg">
        <h2 className="mb-2 font-bold" style={{ fontFamily: tokens.fontDisplay, color: 'var(--text)', fontSize: 'clamp(1.6rem, 6vw, 2.8rem)' }}>
          {config.groom.name} &amp; {config.bride.name}
        </h2>
        {weddingDate && <p className="mb-6 text-sm uppercase opacity-60" style={{ color: 'var(--accent)', letterSpacing: '0.2em' }}>{weddingDate.split('-').reverse().join('/')}</p>}
        <p className="mb-2 text-base italic leading-relaxed sm:text-lg" style={{ color: 'var(--text)', opacity: 0.85 }}>&quot;{closing.vi}&quot;</p>
        <p className="mb-8 text-sm italic opacity-50" style={{ color: 'var(--text-muted)' }}>&quot;{closing.en}&quot;</p>
        <button onClick={handleShare} className="inline-flex items-center gap-2 rounded-full border px-7 py-3 text-sm font-semibold tracking-wide transition-all hover:scale-105 active:scale-95" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
          <Share2 size={16} aria-hidden="true" />
          Chia Sẻ Thiệp
        </button>
      </div>
      <tokens.SectionDivider className="mt-10 opacity-30" />
      <p className="mt-8 text-xs opacity-30" style={{ color: 'var(--text-muted)' }}>
        Tạo bởi <span className="font-semibold" style={{ color: 'var(--accent)' }}>aWedding</span>
      </p>
      {toast && <p className="fixed bottom-24 left-1/2 z-60 -translate-x-1/2 rounded-full px-5 py-3 text-sm font-medium text-white shadow-lg" style={{ background: 'var(--primary)' }}>{toast}</p>}
    </section>
  );
}
