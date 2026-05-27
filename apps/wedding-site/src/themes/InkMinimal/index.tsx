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
import { InkCountdown } from '../_shared/ThemeCountdowns';
import { InkEvents } from '../_shared/ThemeEventSections';

function InkLine({ className = '' }: { className?: string }) {
  return (
    <svg width="120" height="24" viewBox="0 0 120 24" fill="none" className={className}
      style={{ color: 'var(--accent)' }} aria-hidden="true">
      <line x1="0" y1="12" x2="50" y2="12" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
      <circle cx="60" cy="12" r="3" fill="currentColor" opacity="0.7" />
      <line x1="70" y1="12" x2="120" y2="12" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
    </svg>
  );
}

function InkDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`} aria-hidden="true">
      <div className="w-full max-w-sm" style={{ height: 1, background: 'var(--border)' }} />
    </div>
  );
}

const tokens: TemplateTokens = {
  themeClass: 'theme-ink-minimal',
  fontDisplay: 'var(--font-cormorant, "Times New Roman", serif)',
  fontHeading: 'var(--font-cormorant, "Times New Roman", serif)',
  fontBody: 'var(--font-tenor, system-ui, sans-serif)',
  particles: null,
  SectionDivider: InkDivider,
  IntroOrnament: ({ className = '' }) => <InkLine className={className} />,
};

function InkHero({ config, guestName }: { config: WeddingConfig; guestName?: string }) {
  const date = config.events[0]?.date;
  return (
    <section className="grid min-h-screen items-center px-4 py-16" style={{ background: 'var(--bg)' }}>
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mx-auto max-w-3xl text-center">
        <p className="mb-10 text-xs uppercase" style={{ color: 'var(--accent)', letterSpacing: '0.4em' }}>Wedding Invitation</p>
        <h1 style={{ fontFamily: tokens.fontDisplay, color: 'var(--text)', fontSize: 'clamp(3.6rem, 16vw, 8rem)', lineHeight: 1.0, fontStyle: 'italic' }}>
          {config.groom.name}
          <span className="block text-3xl not-italic" style={{ color: 'var(--accent)' }}>&</span>
          {config.bride.name}
        </h1>
        <InkLine className="mx-auto my-10" />
        {date && <p className="text-sm uppercase" style={{ color: 'var(--text-muted)', letterSpacing: '0.18em' }}>{formatDateVi(date)}</p>}
        {guestName && <p className="mt-5 text-sm" style={{ color: 'var(--accent)' }}>Kính mời {guestName}</p>}
        <div className="relative mx-auto mt-12 aspect-16/10 max-w-lg overflow-hidden grayscale" style={{ border: '1px solid var(--border)' }}>
          <Image src={config.coverPhoto} alt="" fill priority sizes="520px" className="object-cover" />
        </div>
      </motion.div>
    </section>
  );
}

export function InkMinimalTheme({ config, guestName }: TemplateProps) {
  return (
    <TemplateShell config={config} tokens={tokens}>
      <InkHero config={config} guestName={guestName} />
      <InkEvents config={config} tokens={tokens} />
      <InkCountdown config={config} tokens={tokens} />
      <FamilySection config={config} tokens={tokens} alt />
      <GallerySection config={config} tokens={tokens} />
      <TimelineSection config={config} tokens={tokens} alt />
      <WishesSection tokens={tokens} />
      <GiftSection config={config} tokens={tokens} />
      <ClosingSection config={config} tokens={tokens} />
    </TemplateShell>
  );
}
