import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getWeddingData } from '@/lib/getWeddingData';
import { decodeGuestName } from '@/lib/decodeGuestName';
import { EmeraldForestTheme } from '@/themes/EmeraldForest';
import { TraditionalRedTheme } from '@/themes/TraditionalRed';
import { ChampagneGoldTheme } from '@/themes/ChampagneGold';
import { SageGreenTheme } from '@/themes/SageGreen';
import { BlushRoseTheme } from '@/themes/BlushRose';
import { InkMinimalTheme } from '@/themes/InkMinimal';
import type { ThemeName, WeddingConfig } from '@workspace/types';

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ guest?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const config = await getWeddingData(slug);
  if (!config) return {};
  return {
    title: `Thiệp cưới ${config.groom.name} & ${config.bride.name}`,
    description: `Kính mời quý khách đến dự đám cưới của ${config.groom.name} & ${config.bride.name}`,
    openGraph: {
      title: `${config.groom.name} & ${config.bride.name} 💍`,
      images: config.coverPhoto ? [{ url: config.coverPhoto }] : [],
    },
  };
}

type ThemeComponent = React.ComponentType<{ config: WeddingConfig; guestName?: string }>;

const THEME_MAP: Record<ThemeName, ThemeComponent> = {
  'emerald-forest': EmeraldForestTheme,
  'traditional-red': TraditionalRedTheme,
  'champagne-gold': ChampagneGoldTheme,
  'sage-green': SageGreenTheme,
  'blush-rose': BlushRoseTheme,
  'ink-minimal': InkMinimalTheme,
};

export default async function WeddingPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { guest } = await searchParams;

  const config = await getWeddingData(slug);
  if (!config) notFound();

  const guestName = guest ? decodeGuestName(guest) : undefined;
  const ThemeComponent = THEME_MAP[config.theme];

  return <ThemeComponent config={config} guestName={guestName} />;
}
