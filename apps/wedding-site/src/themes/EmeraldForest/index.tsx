'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { WeddingConfig } from '@workspace/types';
import {
  ClosingSection,
  FamilySection,
  GallerySection,
  GiftSection,
  TemplateShell,
  TimelineSection,
  WishesSection,
  formatDateVi,
  type TemplateProps,
  type TemplateTokens,
} from '../_shared/TemplateLayout';
import { EmeraldCountdown } from '../_shared/ThemeCountdowns';
import { EmeraldEvents } from '../_shared/ThemeEventSections';

function LeafSprig({ className = '' }: { className?: string }) {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" className={className}
      style={{ color: 'var(--accent)' }} aria-hidden="true">
      <path d="M26 6 C18 14 14 24 18 36 C22 48 38 48 42 36 C46 24 42 14 26 6Z" fill="currentColor" opacity="0.7" />
      <path d="M26 6 L26 46" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path d="M19 22 C19 22 26 18 33 22" stroke="currentColor" strokeWidth="1" opacity="0.5" fill="none" />
      <path d="M16 30 C16 30 26 25 36 30" stroke="currentColor" strokeWidth="1" opacity="0.5" fill="none" />
    </svg>
  );
}

function EmeraldDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
      <LeafSprig />
      <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
    </div>
  );
}

const tokens: TemplateTokens = {
  themeClass: 'theme-emerald-forest',
  fontDisplay: 'var(--font-great-vibes, cursive)',
  fontHeading: 'var(--font-cormorant, "Times New Roman", serif)',
  fontBody: 'var(--font-lato, system-ui, sans-serif)',
  particles: { color: '#C9A84C', shape: 'petal', count: 16 },
  IntroOrnament: ({ className = '' }) => (
    <div className={`flex gap-3 ${className}`} aria-hidden="true">
      <LeafSprig />
      <LeafSprig className="scale-x-[-1]" />
    </div>
  ),
  SectionDivider: EmeraldDivider,
};

function EmeraldHero({ config, guestName }: { config: WeddingConfig; guestName?: string }) {
  const date = config.events[0]?.date;

  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-16" style={{ background: 'var(--bg)' }}>
      <div className="absolute inset-0">
        <Image src={config.coverPhoto} alt="" fill priority sizes="100vw" className="object-cover opacity-35" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, color-mix(in srgb, var(--bg) 30%, transparent), var(--bg) 88%)' }} />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] max-w-3xl flex-col items-center justify-center text-center">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <LeafSprig className="mx-auto mb-6 opacity-80" />
          <p className="mb-4 text-xs font-bold uppercase" style={{ color: 'var(--accent)', letterSpacing: '0.35em' }}>
            Thiệp Mời Cưới
          </p>
          <h1
            className="font-bold"
            style={{ fontFamily: tokens.fontDisplay, color: 'var(--text)', fontSize: 'clamp(3rem, 16vw, 6rem)', lineHeight: 1.1 }}
          >
            {config.groom.name}
            <span className="block text-3xl opacity-70" style={{ color: 'var(--accent)' }}>&</span>
            {config.bride.name}
          </h1>
          {date && <p className="mt-6 text-sm uppercase" style={{ color: 'var(--accent)', letterSpacing: '0.2em' }}>{formatDateVi(date)}</p>}
          {guestName && <p className="mt-5 text-sm font-semibold" style={{ color: 'var(--text)' }}>Kính mời {guestName}</p>}
        </motion.div>
      </div>
    </section>
  );
}

export function EmeraldForestTheme({ config, guestName }: TemplateProps) {
  return (
    <TemplateShell config={config} tokens={tokens}>
      <EmeraldHero config={config} guestName={guestName} />
      <EmeraldCountdown config={config} tokens={tokens} />
      <GallerySection config={config} tokens={tokens} />
      <FamilySection config={config} tokens={tokens} alt />
      <EmeraldEvents config={config} tokens={tokens} />
      <TimelineSection config={config} tokens={tokens} alt />
      <WishesSection tokens={tokens} />
      <GiftSection config={config} tokens={tokens} />
      <ClosingSection config={config} tokens={tokens} />
    </TemplateShell>
  );
}
