import type { Metadata } from 'next';
import {
  Noto_Serif, Crimson_Text,
  Playfair_Display, Open_Sans,
  Cormorant_Garamond, Montserrat,
  Lora, Source_Sans_3,
  Libre_Baskerville, EB_Garamond,
  Dancing_Script, Tenor_Sans,
} from 'next/font/google';
import { WEDDING_SITE_DESCRIPTION, WEDDING_SITE_NAME, WEDDING_SITE_URL } from '@/lib/seo';
import './globals.css';

// Fonts có Vietnamese subset
const notoSerif = Noto_Serif({ subsets: ['vietnamese', 'latin'], variable: '--font-serif-var', weight: ['400', '700'], display: 'swap' });
const crimsonText = Crimson_Text({ subsets: ['vietnamese', 'latin'], variable: '--font-sans-var', weight: ['400', '600'], display: 'swap' });
const playfair = Playfair_Display({ subsets: ['vietnamese', 'latin'], variable: '--font-playfair', weight: ['400', '600', '700'], display: 'swap' });
const openSans = Open_Sans({ subsets: ['vietnamese', 'latin'], variable: '--font-lato', weight: ['300', '400', '700'], display: 'swap' });
const cormorant = Cormorant_Garamond({ subsets: ['vietnamese', 'latin'], variable: '--font-cormorant', weight: ['300', '400', '600'], display: 'swap' });
const montserrat = Montserrat({ subsets: ['vietnamese', 'latin'], variable: '--font-montserrat', weight: ['300', '400', '500'], display: 'swap' });
const lora = Lora({ subsets: ['vietnamese', 'latin'], variable: '--font-lora', weight: ['400', '600', '700'], display: 'swap' });
const sourceSans = Source_Sans_3({ subsets: ['vietnamese', 'latin'], variable: '--font-source-sans', weight: ['300', '400', '600'], display: 'swap' });
const baskerville = Libre_Baskerville({ subsets: ['latin', 'latin-ext'], variable: '--font-baskerville', weight: ['400', '700'], display: 'swap' });
const ebGaramond = EB_Garamond({ subsets: ['vietnamese', 'latin'], variable: '--font-garamond', weight: ['400', '500', '600'], display: 'swap' });
// Dancing Script thay thế Great Vibes — hỗ trợ tiếng Việt, cùng phong cách cursive
const dancingScript = Dancing_Script({ subsets: ['vietnamese', 'latin'], variable: '--font-great-vibes', weight: ['400'], display: 'swap' });
const tenorSans = Tenor_Sans({ subsets: ['latin', 'latin-ext'], variable: '--font-tenor', weight: ['400'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(WEDDING_SITE_URL),
  applicationName: WEDDING_SITE_NAME,
  title: {
    default: 'Thiệp cưới online | aWedding',
    template: `%s | ${WEDDING_SITE_NAME}`,
  },
  description: WEDDING_SITE_DESCRIPTION,
  keywords: ['thiep cuoi online', 'thiep moi dam cuoi', 'wedding invitation', 'aWedding'],
  creator: 'aWedding',
  publisher: 'aWedding',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: '/',
    siteName: WEDDING_SITE_NAME,
    title: 'Thiệp cưới online | aWedding',
    description: WEDDING_SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thiệp cưới online | aWedding',
    description: WEDDING_SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

const fontVars = [
  notoSerif.variable, crimsonText.variable,
  playfair.variable, openSans.variable,
  cormorant.variable, montserrat.variable,
  lora.variable, sourceSans.variable,
  baskerville.variable, ebGaramond.variable,
  dancingScript.variable, tenorSans.variable,
].join(' ');

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={fontVars}>
      <body>{children}</body>
    </html>
  );
}
