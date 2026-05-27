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
import { BlushCountdown } from '../_shared/ThemeCountdowns';
import { BlushEvents } from '../_shared/ThemeEventSections';

function RosePetal({ className = '' }: { className?: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className={className}
      style={{ color: 'var(--primary)' }} aria-hidden="true">
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <ellipse key={i} cx="24" cy="13" rx="5" ry="9" fill="currentColor" opacity="0.65" transform={`rotate(${deg} 24 24)`} />
      ))}
      <circle cx="24" cy="24" r="4" fill="currentColor" opacity="0.9" />
      <circle cx="24" cy="24" r="2" fill="white" opacity="0.5" />
    </svg>
  );
}

function BlushDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
      <RosePetal />
      <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
    </div>
  );
}

const tokens: TemplateTokens = {
  themeClass: 'theme-blush-rose',
  fontDisplay: 'var(--font-great-vibes, cursive)',
  fontHeading: 'var(--font-playfair, Georgia, serif)',
  fontBody: 'var(--font-lato, system-ui, sans-serif)',
  particles: { color: '#E8B4AE', shape: 'petal', count: 18 },
  SectionDivider: BlushDivider,
  IntroOrnament: ({ className = '' }) => (
    <div className={`flex gap-2 ${className}`} aria-hidden="true">
      <RosePetal />
      <RosePetal />
      <RosePetal />
    </div>
  ),
};

function BlushHero({ config, guestName }: { config: WeddingConfig; guestName?: string }) {
  const date = config.events[0]?.date;
  return (
    <section className="relative overflow-hidden px-4 py-16 text-center" style={{ background: 'linear-gradient(180deg, var(--bg), var(--bg-card))' }}>
      <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mx-auto max-w-2xl">
        <div className="relative mx-auto mb-8 h-72 w-72 overflow-hidden rounded-full sm:h-96 sm:w-96" style={{ border: '10px solid var(--bg-card)', boxShadow: '0 20px 70px color-mix(in srgb, var(--primary) 25%, transparent)' }}>
          <Image src={config.coverPhoto} alt="" fill priority sizes="420px" className="object-cover" />
        </div>
        <RosePetal className="mx-auto mb-4" />
        <p className="mb-3 text-xs font-bold uppercase" style={{ color: 'var(--primary)', letterSpacing: '0.32em' }}>Save The Date</p>
        <h1 style={{ fontFamily: tokens.fontDisplay, color: 'var(--text)', fontSize: 'clamp(3.4rem, 16vw, 6.5rem)', lineHeight: 1.1 }}>
          {config.groom.name}
          <span className="mx-3" style={{ color: 'var(--primary)' }}>&</span>
          {config.bride.name}
        </h1>
        {date && <p className="mt-6 text-sm uppercase" style={{ color: 'var(--text-muted)', letterSpacing: '0.2em' }}>{formatDateVi(date)}</p>}
        {guestName && <p className="mt-4 text-sm font-semibold" style={{ color: 'var(--primary)' }}>Kính mời {guestName}</p>}
      </motion.div>
    </section>
  );
}

export function BlushRoseTheme({ config, guestName }: TemplateProps) {
  return (
    <TemplateShell config={config} tokens={tokens}>
      <BlushHero config={config} guestName={guestName} />
      <BlushCountdown config={config} tokens={tokens} />
      <GallerySection config={config} tokens={tokens} />
      <FamilySection config={config} tokens={tokens} alt />
      <BlushEvents config={config} tokens={tokens} />
      <WishesSection tokens={tokens} alt />
      <TimelineSection config={config} tokens={tokens} />
      <GiftSection config={config} tokens={tokens} />
      <ClosingSection config={config} tokens={tokens} />
    </TemplateShell>
  );
}
