'use client';

import { BaseTheme } from '../_base/BaseTheme';
import type { BaseThemeConfig } from '../_base/themeConfig';
import type { WeddingConfig } from '@workspace/types';

// ─── Decorations ──────────────────────────────────────────────────────────────

function RosePetal({ className = '' }: { className?: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className={className}
      style={{ color: 'var(--primary)' }} aria-hidden="true">
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <ellipse key={i} cx="24" cy="13" rx="5" ry="9" fill="currentColor" opacity="0.65"
          transform={`rotate(${deg} 24 24)`} />
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

// ─── Config ───────────────────────────────────────────────────────────────────

const config: BaseThemeConfig = {
  themeClass: 'theme-blush-rose',
  fontDisplay: 'var(--font-great-vibes, cursive)',
  fontHeading: 'var(--font-playfair, Georgia, serif)',
  fontBody: 'var(--font-lato, system-ui, sans-serif)',
  particles: { color: '#E8B4AE', shape: 'petal', count: 18 },
  HeroOrnament: ({ className = '' }) => <RosePetal className={className} />,
  SectionDivider: BlushDivider,
  IntroOrnament: ({ className = '' }) => (
    <div className={`flex gap-2 ${className}`} aria-hidden="true">
      <RosePetal />
      <RosePetal />
      <RosePetal />
    </div>
  ),
};

// ─── Export ───────────────────────────────────────────────────────────────────

interface Props { config: WeddingConfig; guestName?: string }

export function BlushRoseTheme({ config: weddingConfig, guestName }: Props) {
  return <BaseTheme config={weddingConfig} theme={config} guestName={guestName} />;
}
