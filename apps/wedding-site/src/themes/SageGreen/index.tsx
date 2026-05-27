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
import { SageCountdown } from '../_shared/ThemeCountdowns';
import { SageEvents } from '../_shared/ThemeEventSections';

function LeafBranch({ className = '' }: { className?: string }) {
  return (
    <svg width="56" height="40" viewBox="0 0 56 40" fill="none" className={className}
      style={{ color: 'var(--primary)' }} aria-hidden="true">
      <path d="M28 36 C28 36 28 8 28 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M28 20 C22 16 14 16 10 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
      <path d="M28 28 C22 24 14 24 8 28" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
      <path d="M28 20 C34 16 42 16 46 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
      <path d="M28 28 C34 24 42 24 48 28" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
      <ellipse cx="28" cy="12" rx="4" ry="7" fill="currentColor" opacity="0.5" />
      <ellipse cx="14" cy="16" rx="4" ry="7" fill="currentColor" opacity="0.4" transform="rotate(-30 14 16)" />
      <ellipse cx="42" cy="16" rx="4" ry="7" fill="currentColor" opacity="0.4" transform="rotate(30 42 16)" />
    </svg>
  );
}

function SageDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
      <LeafBranch />
      <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
    </div>
  );
}

const tokens: TemplateTokens = {
  themeClass: 'theme-sage-green',
  fontDisplay: 'var(--font-playfair, Georgia, serif)',
  fontHeading: 'var(--font-lora, Georgia, serif)',
  fontBody: 'var(--font-source-sans, system-ui, sans-serif)',
  particles: { color: '#7D9B76', shape: 'leaf', count: 14 },
  SectionDivider: SageDivider,
  IntroOrnament: ({ className = '' }) => <LeafBranch className={className} />,
};

function SageHero({ config, guestName }: { config: WeddingConfig; guestName?: string }) {
  const date = config.events[0]?.date;
  return (
    <section className="relative overflow-hidden px-4 py-14" style={{ background: 'var(--bg)' }}>
      <div className="mx-auto max-w-4xl rounded-[32px] p-4 sm:p-8" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
        <div className="grid min-h-[680px] items-center gap-6 sm:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="order-2 text-center sm:order-1 sm:text-left">
            <LeafBranch className="mx-auto mb-5 sm:mx-0" />
            <p className="mb-4 text-xs font-bold uppercase" style={{ color: 'var(--primary)', letterSpacing: '0.28em' }}>Garden Ceremony</p>
            <h1 style={{ fontFamily: tokens.fontDisplay, color: 'var(--text)', fontSize: 'clamp(2.7rem, 11vw, 5.5rem)', lineHeight: 1 }}>
              {config.groom.name}
              <span className="block text-2xl" style={{ color: 'var(--primary)' }}>and</span>
              {config.bride.name}
            </h1>
            {date && <p className="mt-6 text-sm uppercase" style={{ color: 'var(--text-muted)', letterSpacing: '0.16em' }}>{formatDateVi(date)}</p>}
            {guestName && <p className="mt-4 font-semibold" style={{ color: 'var(--primary)' }}>Kính mời {guestName}</p>}
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="order-1 sm:order-2">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[28px]" style={{ border: '8px solid var(--bg)' }}>
              <Image src={config.coverPhoto} alt="" fill priority sizes="420px" className="object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function SageGreenTheme({ config, guestName }: TemplateProps) {
  return (
    <TemplateShell config={config} tokens={tokens}>
      <SageHero config={config} guestName={guestName} />
      <FamilySection config={config} tokens={tokens} />
      <SageCountdown config={config} tokens={tokens} />
      <SageEvents config={config} tokens={tokens} />
      <TimelineSection config={config} tokens={tokens} />
      <GallerySection config={config} tokens={tokens} alt />
      <WishesSection tokens={tokens} />
      <GiftSection config={config} tokens={tokens} />
      <ClosingSection config={config} tokens={tokens} />
    </TemplateShell>
  );
}
