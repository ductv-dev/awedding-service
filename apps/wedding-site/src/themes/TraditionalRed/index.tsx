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
  type TemplateProps,
  type TemplateTokens,
} from '../_shared/TemplateLayout';
import { TraditionalCountdown } from '../_shared/ThemeCountdowns';
import { TraditionalEvents } from '../_shared/ThemeEventSections';

// ─── Decorations ──────────────────────────────────────────────────────────────

function DoubleHappiness({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center font-bold leading-none select-none ${className}`}
      style={{ color: 'var(--primary)', fontSize: 40, fontFamily: 'serif' }}
      aria-hidden="true"
    >
      囍
    </div>
  );
}

function RedDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
      <span style={{ color: 'var(--primary)', fontSize: 14 }}>◆</span>
      <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
    </div>
  );
}

// ─── Custom Hero ──────────────────────────────────────────────────────────────

function TraditionalHero({
  config, tokens, guestName,
}: { config: WeddingConfig; tokens: TemplateTokens; guestName?: string }) {
  const groomPhoto = config.groom.photo ?? config.galleryPhotos[0] ?? config.coverPhoto;
  const bridePhoto = config.bride.photo ?? config.galleryPhotos[2] ?? config.coverPhoto;

  return (
    <section style={{ background: 'var(--bg)' }}>
      {/* Top border bar */}
      <div style={{ height: 6, background: 'var(--primary)' }} />

      {/* Couple avatars */}
      <div className="px-4 py-10">
        <motion.div
          className="mx-auto flex max-w-md items-center justify-center gap-4 sm:gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Groom */}
          <div className="flex flex-col items-center gap-2 text-center">
            <div
              className="relative overflow-hidden"
              style={{
                width: 100, height: 100,
                borderRadius: '50%',
                border: '3px solid var(--primary)',
                boxShadow: '0 0 0 4px var(--bg), 0 0 0 6px var(--primary)',
              }}
            >
              <Image
                src={groomPhoto}
                alt={config.groom.name}
                fill
                className="object-cover"
                sizes="100px"
              />
            </div>
            <p
              className="text-[10px] font-semibold tracking-widest uppercase"
              style={{ color: 'var(--text-muted)' }}
            >
              {config.groom.role}
            </p>
            <p
              className="font-bold"
              style={{
                fontFamily: tokens.fontDisplay,
                color: 'var(--primary)',
                fontSize: 'clamp(1rem, 3vw, 1.3rem)',
              }}
            >
              {config.groom.name}
            </p>
          </div>

          {/* Center ornament */}
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1"
          >
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold"
              style={{
                background: 'var(--primary)',
                color: '#fff',
                fontFamily: 'serif',
              }}
              aria-hidden="true"
            >
              囍
            </div>
            <div className="h-px w-8" style={{ background: 'var(--border)' }} />
          </motion.div>

          {/* Bride */}
          <div className="flex flex-col items-center gap-2 text-center">
            <div
              className="relative overflow-hidden"
              style={{
                width: 100, height: 100,
                borderRadius: '50%',
                border: '3px solid var(--primary)',
                boxShadow: '0 0 0 4px var(--bg), 0 0 0 6px var(--primary)',
              }}
            >
              <Image
                src={bridePhoto}
                alt={config.bride.name}
                fill
                className="object-cover"
                sizes="100px"
              />
            </div>
            <p
              className="text-[10px] font-semibold tracking-widest uppercase"
              style={{ color: 'var(--text-muted)' }}
            >
              {config.bride.role}
            </p>
            <p
              className="font-bold"
              style={{
                fontFamily: tokens.fontDisplay,
                color: 'var(--primary)',
                fontSize: 'clamp(1rem, 3vw, 1.3rem)',
              }}
            >
              {config.bride.name}
            </p>
          </div>
        </motion.div>

        {/* Guest greeting */}
        {guestName && (
          <motion.p
            className="mt-6 text-center text-sm font-medium tracking-wide"
            style={{ color: 'var(--primary)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          >
            Kính mời: <span className="font-bold">{guestName}</span>
          </motion.p>
        )}
      </div>

      {/* Dark red announcement banner */}
      <div
        className="py-3 text-center"
        style={{ background: 'var(--primary)' }}
      >
        <p className="text-xs font-bold tracking-[0.25em] uppercase text-white/70">
          Trân Trọng Báo Tin
        </p>
        <p className="text-sm font-bold tracking-[0.15em] uppercase text-white">
          Lễ Thành Hôn Của Con Chúng Tôi
        </p>
      </div>

      {/* Couple names large */}
      <motion.div
        className="py-10 px-4 text-center"
        style={{ background: 'var(--bg)' }}
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
      >
        <p
          className="font-bold"
          style={{
            fontFamily: tokens.fontDisplay,
            color: 'var(--text)',
            fontSize: 'clamp(2rem, 8vw, 3.5rem)',
            lineHeight: 1.1,
          }}
        >
          {config.groom.name}
        </p>
        <p className="my-2 text-sm font-semibold tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
          {config.groom.role}
        </p>
        <p className="my-4 text-2xl" style={{ color: 'var(--primary)' }}>&</p>
        <p
          className="font-bold"
          style={{
            fontFamily: tokens.fontDisplay,
            color: 'var(--text)',
            fontSize: 'clamp(2rem, 8vw, 3.5rem)',
            lineHeight: 1.1,
          }}
        >
          {config.bride.name}
        </p>
        <p className="mt-2 text-sm font-semibold tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
          {config.bride.role}
        </p>

        {/* Date */}
        {config.events[0] && (
          <motion.div
            className="mt-6 flex items-center justify-center gap-3"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          >
            <div className="h-px w-12" style={{ background: 'var(--border)' }} />
            <span className="text-sm tracking-[0.25em] uppercase" style={{ color: 'var(--text-muted)' }}>
              {config.events[0].date.split('-').reverse().join('/')}
            </span>
            <div className="h-px w-12" style={{ background: 'var(--border)' }} />
          </motion.div>
        )}
      </motion.div>

      {/* Bottom accent bar */}
      <div style={{ height: 4, background: 'var(--primary)' }} />
    </section>
  );
}

// ─── Config ───────────────────────────────────────────────────────────────────

const tokens: TemplateTokens = {
  themeClass: 'theme-traditional-red',
  fontDisplay: 'var(--font-playfair, Georgia, serif)',
  fontHeading: 'var(--font-playfair, Georgia, serif)',
  fontBody: 'var(--font-source-sans, system-ui, sans-serif)',
  particles: { color: '#C9A84C', shape: 'particle', count: 10 },
  SectionDivider: RedDivider,
  IntroOrnament: ({ className = '' }) => <DoubleHappiness className={className} />,
};

// ─── Export ───────────────────────────────────────────────────────────────────

export function TraditionalRedTheme({ config, guestName }: TemplateProps) {
  return (
    <TemplateShell config={config} tokens={tokens}>
      <TraditionalHero config={config} tokens={tokens} guestName={guestName} />
      <TraditionalCountdown config={config} tokens={tokens} />
      <FamilySection config={config} tokens={tokens} />
      <TraditionalEvents config={config} tokens={tokens} />
      <GallerySection config={config} tokens={tokens} />
      <TimelineSection config={config} tokens={tokens} alt />
      <GiftSection config={config} tokens={tokens} />
      <WishesSection tokens={tokens} alt />
      <ClosingSection config={config} tokens={tokens} />
    </TemplateShell>
  );
}
