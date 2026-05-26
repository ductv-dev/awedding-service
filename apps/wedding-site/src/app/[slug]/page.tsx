import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getWeddingData } from '@/lib/getWeddingData';
import { decodeGuestName } from '@/lib/decodeGuestName';
import { WEDDING_SITE_NAME, WEDDING_SITE_URL } from '@/lib/seo';
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
  const title = `Thiệp cưới ${config.groom.name} & ${config.bride.name}`;
  const description = `Kính mời quý khách đến dự đám cưới của ${config.groom.name} và ${config.bride.name}. Xem thời gian, địa điểm, album ảnh và gửi lời chúc.`;
  const url = `${WEDDING_SITE_URL}/${slug}`;
  const images = config.coverPhoto ? [{ url: config.coverPhoto, alt: title }] : [];

  return {
    title,
    description,
    alternates: {
      canonical: `/${slug}`,
    },
    openGraph: {
      type: 'website',
      locale: 'vi_VN',
      url,
      siteName: WEDDING_SITE_NAME,
      title: `${config.groom.name} & ${config.bride.name}`,
      description,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${config.groom.name} & ${config.bride.name}`,
      description,
      images: config.coverPhoto ? [config.coverPhoto] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'wedding:groom': config.groom.name,
      'wedding:bride': config.bride.name,
      'wedding:date': config.events[0]?.date ?? '',
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
