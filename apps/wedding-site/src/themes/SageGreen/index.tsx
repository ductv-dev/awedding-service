'use client';

import { BaseTheme } from '../_base/BaseTheme';
import type { BaseThemeConfig } from '../_base/themeConfig';
import type { WeddingConfig } from '@workspace/types';

// ─── Decorations ──────────────────────────────────────────────────────────────

function LeafBranch({ className = '' }: { className?: string }) {
  return (
    <svg width="56" height="40" viewBox="0 0 56 40" fill="none" className={className}
      style={{ color: 'var(--primary)' }} aria-hidden="true">
      <path d="M28 36 C28 36 28 8 28 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M28 20 C22 16 14 16 10 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
      <path d="M28 28 C22 24 14 24 8 28" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
      <path d="M28 20 C34 16 42 16 46 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
      <path d="M28 28 C34 24 42 24 48 28" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
      <ellipse cx="28" cy="12" rx="4" ry="7" fill="currentColor" opacity="0.5"
        transform="rotate(0 28 12)" />
      <ellipse cx="14" cy="16" rx="4" ry="7" fill="currentColor" opacity="0.4"
        transform="rotate(-30 14 16)" />
      <ellipse cx="42" cy="16" rx="4" ry="7" fill="currentColor" opacity="0.4"
        transform="rotate(30 42 16)" />
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

// ─── Config ───────────────────────────────────────────────────────────────────

const config: BaseThemeConfig = {
  themeClass: 'theme-sage-green',
  fontDisplay: 'var(--font-playfair, Georgia, serif)',
  fontHeading: 'var(--font-lora, Georgia, serif)',
  fontBody: 'var(--font-source-sans, system-ui, sans-serif)',
  particles: { color: '#7D9B76', shape: 'leaf', count: 14 },
  HeroOrnament: ({ className = '' }) => <LeafBranch className={className} />,
  SectionDivider: SageDivider,
  IntroOrnament: ({ className = '' }) => <LeafBranch className={className} />,
};

// ─── Export ───────────────────────────────────────────────────────────────────

interface Props { config: WeddingConfig; guestName?: string }

export function SageGreenTheme({ config: weddingConfig, guestName }: Props) {
  return <BaseTheme config={weddingConfig} theme={config} guestName={guestName} />;
}
