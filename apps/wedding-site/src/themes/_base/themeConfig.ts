import type React from 'react';
import type { WeddingConfig } from '@workspace/types';

export interface ThemeParticles {
  /** Hex color for canvas API */
  color: string;
  shape: 'petal' | 'leaf' | 'particle';
  count: number;
}

export interface BaseThemeConfig {
  /** CSS class applied to root div — defines all CSS variables for the theme */
  themeClass: string;
  /** Script/serif font for couple names, e.g. 'var(--font-great-vibes)' */
  fontDisplay: string;
  /** Serif font for section headings, e.g. 'var(--font-cormorant)' */
  fontHeading: string;
  /** Sans-serif font for body text, e.g. 'var(--font-lato)' */
  fontBody: string;
  /** null = no particles (ink-minimal theme) */
  particles: ThemeParticles | null;
  HeroOrnament: React.ComponentType<{ className?: string }>;
  SectionDivider: React.ComponentType<{ className?: string }>;
  IntroOrnament: React.ComponentType<{ className?: string }>;
  /** Optional: replaces the default full-screen BaseHero with a custom layout */
  HeroOverride?: React.ComponentType<{ config: WeddingConfig; theme: BaseThemeConfig; guestName?: string }>;
}
