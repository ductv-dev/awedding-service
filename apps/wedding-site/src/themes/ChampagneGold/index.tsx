'use client';

import { BaseTheme } from '../_base/BaseTheme';
import type { BaseThemeConfig } from '../_base/themeConfig';
import type { WeddingConfig } from '@workspace/types';

// ─── Decorations ──────────────────────────────────────────────────────────────

function GoldDiamond({ className = '' }: { className?: string }) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className={className}
      style={{ color: 'var(--primary)' }} aria-hidden="true">
      <rect x="22" y="3" width="26" height="26" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2"
        transform="rotate(45 22 22)" opacity="0.9" />
      <rect x="22" y="9" width="18" height="18" rx="1" fill="none" stroke="currentColor" strokeWidth="0.8"
        transform="rotate(45 22 22)" opacity="0.5" />
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

// ─── Config ───────────────────────────────────────────────────────────────────

const config: BaseThemeConfig = {
  themeClass: 'theme-champagne-gold',
  fontDisplay: 'var(--font-great-vibes, cursive)',
  fontHeading: 'var(--font-cormorant, "Times New Roman", serif)',
  fontBody: 'var(--font-montserrat, system-ui, sans-serif)',
  particles: { color: '#B5924C', shape: 'particle', count: 14 },
  HeroOrnament: ({ className = '' }) => <GoldDiamond className={className} />,
  SectionDivider: ChampagneDivider,
  IntroOrnament: ({ className = '' }) => (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <div className="h-px w-10" style={{ background: 'var(--primary)' }} />
      <GoldDiamond />
      <div className="h-px w-10" style={{ background: 'var(--primary)' }} />
    </div>
  ),
};

// ─── Export ───────────────────────────────────────────────────────────────────

interface Props { config: WeddingConfig; guestName?: string }

export function ChampagneGoldTheme({ config: weddingConfig, guestName }: Props) {
  return <BaseTheme config={weddingConfig} theme={config} guestName={guestName} />;
}
