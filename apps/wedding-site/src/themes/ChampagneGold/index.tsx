'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { WeddingConfig } from '@workspace/types';
import {
  ClosingSection,
  FamilySection,
  GallerySection,
  GiftSection,
  SectionBlock,
  TemplateShell,
  TimelineSection,
  WishesSection,
  formatDateVi,
  type TemplateProps,
  type TemplateTokens,
} from '../_shared/TemplateLayout';
import { ChampagneCountdown } from '../_shared/ThemeCountdowns';
import { ChampagneEvents } from '../_shared/ThemeEventSections';

function GoldDiamond({ className = '' }: { className?: string }) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className={className}
      style={{ color: 'var(--primary)' }} aria-hidden="true">
      <rect x="22" y="3" width="26" height="26" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2" transform="rotate(45 22 22)" opacity="0.9" />
      <rect x="22" y="9" width="18" height="18" rx="1" fill="none" stroke="currentColor" strokeWidth="0.8" transform="rotate(45 22 22)" opacity="0.5" />
      <circle cx="22" cy="22" r="3" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

function ChampagneDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, var(--border))' }} />
      <GoldDiamond />
      <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, var(--border))' }} />
    </div>
  );
}

const tokens: TemplateTokens = {
  themeClass: 'theme-champagne-gold',
  fontDisplay: 'var(--font-great-vibes, cursive)',
  fontHeading: 'var(--font-cormorant, "Times New Roman", serif)',
  fontBody: 'var(--font-montserrat, system-ui, sans-serif)',
  particles: { color: '#B5924C', shape: 'particle', count: 14 },
  SectionDivider: ChampagneDivider,
  IntroOrnament: ({ className = '' }) => (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <div className="h-px w-10" style={{ background: 'var(--primary)' }} />
      <GoldDiamond />
      <div className="h-px w-10" style={{ background: 'var(--primary)' }} />
    </div>
  ),
};

function ChampagneHero({ config, guestName }: { config: WeddingConfig; guestName?: string }) {
  const date = config.events[0]?.date;

  return (
    <section className="relative overflow-hidden px-4 py-20" style={{ background: 'var(--bg)' }}>
      <div className="mx-auto grid sm:min-h-190 max-w-4xl items-center gap-8 sm:grid-cols-[1fr_1.1fr]">
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="text-center sm:text-left">
          <p className="mb-4 text-xs font-bold uppercase" style={{ color: 'var(--primary)', letterSpacing: '0.3em' }}>
            Champagne Wedding
          </p>
          <h1 style={{ fontFamily: tokens.fontDisplay, color: 'var(--text)', fontSize: 'clamp(3.8rem, 15vw, 7rem)', lineHeight: 1.05 }}>
            {config.groom.name}
            <span className="block text-4xl" style={{ color: 'var(--primary)' }}>&</span>
            {config.bride.name}
          </h1>
          {date && <p className="mt-8 text-sm uppercase" style={{ color: 'var(--text-muted)', letterSpacing: '0.2em' }}>{formatDateVi(date)}</p>}
          {guestName && <p className="mt-5 text-sm font-semibold" style={{ color: 'var(--primary)' }}>Kính mời {guestName}</p>}
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }} className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-5 rotate-3 rounded-full" style={{ border: '1px solid var(--primary)' }} />
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[140px] shadow-2xl" style={{ border: '6px solid var(--bg-card)' }}>
            <Image src={config.coverPhoto} alt="" fill priority sizes="420px" className="object-cover" />
          </div>
          <GoldDiamond className="absolute -bottom-5 left-1/2 -translate-x-1/2" />
        </motion.div>
      </div>
    </section>
  );
}

function ChampagneIntroCopy({ config }: { config: WeddingConfig }) {
  return (
    <SectionBlock tokens={tokens} className="text-center">
      <p className="mx-auto max-w-xl text-lg italic leading-relaxed" style={{ color: 'var(--text)' }}>
        Trân trọng kính mời quý khách đến chung vui cùng gia đình chúng tôi trong ngày hạnh phúc của {config.groom.name} và {config.bride.name}.
      </p>
    </SectionBlock>
  );
}

export function ChampagneGoldTheme({ config, guestName }: TemplateProps) {
  return (
    <TemplateShell config={config} tokens={tokens}>
      <ChampagneHero config={config} guestName={guestName} />
      <ChampagneIntroCopy config={config} />
      <ChampagneCountdown config={config} tokens={tokens} />
      <ChampagneEvents config={config} tokens={tokens} />
      <GallerySection config={config} tokens={tokens} />
      <FamilySection config={config} tokens={tokens} alt />
      <TimelineSection config={config} tokens={tokens} />
      <GiftSection config={config} tokens={tokens} />
      <WishesSection tokens={tokens} alt />
      <ClosingSection config={config} tokens={tokens} />
    </TemplateShell>
  );
}
