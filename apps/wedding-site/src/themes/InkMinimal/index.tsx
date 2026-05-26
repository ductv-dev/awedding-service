'use client';

import { BaseTheme } from '../_base/BaseTheme';
import type { BaseThemeConfig } from '../_base/themeConfig';
import type { WeddingConfig } from '@workspace/types';

// ─── Decorations — animated stroke lines ──────────────────────────────────────

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

// ─── Config ───────────────────────────────────────────────────────────────────

const config: BaseThemeConfig = {
  themeClass: 'theme-ink-minimal',
  fontDisplay: 'var(--font-cormorant, "Times New Roman", serif)',
  fontHeading: 'var(--font-cormorant, "Times New Roman", serif)',
  fontBody: 'var(--font-tenor, system-ui, sans-serif)',
  particles: null,
  HeroOrnament: ({ className = '' }) => <InkLine className={className} />,
  SectionDivider: InkDivider,
  IntroOrnament: ({ className = '' }) => <InkLine className={className} />,
};

// ─── Export ───────────────────────────────────────────────────────────────────

interface Props { config: WeddingConfig; guestName?: string }

export function InkMinimalTheme({ config: weddingConfig, guestName }: Props) {
  return <BaseTheme config={weddingConfig} theme={config} guestName={guestName} />;
}
