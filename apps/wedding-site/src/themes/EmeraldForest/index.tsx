'use client';

import { BaseTheme } from '../_base/BaseTheme';
import type { BaseThemeConfig } from '../_base/themeConfig';
import type { WeddingConfig } from '@workspace/types';

// ─── Decorations ──────────────────────────────────────────────────────────────

function LeafSprig({ className = '' }: { className?: string }) {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" className={className}
      style={{ color: 'var(--accent)' }} aria-hidden="true">
      <path d="M26 6 C18 14 14 24 18 36 C22 48 38 48 42 36 C46 24 42 14 26 6Z"
        fill="currentColor" opacity="0.7" />
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

// ─── Config ───────────────────────────────────────────────────────────────────

const config: BaseThemeConfig = {
  themeClass: 'theme-emerald-forest',
  fontDisplay: 'var(--font-great-vibes, cursive)',
  fontHeading: 'var(--font-cormorant, "Times New Roman", serif)',
  fontBody: 'var(--font-lato, system-ui, sans-serif)',
  particles: { color: '#C9A84C', shape: 'petal', count: 16 },
  HeroOrnament: ({ className = '' }) => <LeafSprig className={className} />,
  SectionDivider: EmeraldDivider,
  IntroOrnament: ({ className = '' }) => (
    <div className={`flex gap-3 ${className}`} aria-hidden="true">
      <LeafSprig />
      <LeafSprig className="scale-x-[-1]" />
    </div>
  ),
};

// ─── Export ───────────────────────────────────────────────────────────────────

interface Props { config: WeddingConfig; guestName?: string }

export function EmeraldForestTheme({ config: weddingConfig, guestName }: Props) {
  return <BaseTheme config={weddingConfig} theme={config} guestName={guestName} />;
}
