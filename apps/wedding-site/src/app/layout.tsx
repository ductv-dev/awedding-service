import type { Metadata } from 'next';
import {
  Noto_Serif, Crimson_Text,
  Playfair_Display, Lato,
  Cormorant_Garamond, Montserrat,
  Lora, Source_Sans_3,
  Libre_Baskerville, EB_Garamond,
  Great_Vibes, Tenor_Sans,
} from 'next/font/google';
import './globals.css';

const notoSerif = Noto_Serif({ subsets: ['vietnamese', 'latin'], variable: '--font-serif-var', weight: ['400', '700'], display: 'swap' });
const crimsonText = Crimson_Text({ subsets: ['latin'], variable: '--font-sans-var', weight: ['400', '600'], display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', weight: ['400', '600', '700'], display: 'swap' });
const lato = Lato({ subsets: ['latin'], variable: '--font-lato', weight: ['300', '400', '700'], display: 'swap' });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-cormorant', weight: ['300', '400', '600'], display: 'swap' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', weight: ['300', '400', '500'], display: 'swap' });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora', weight: ['400', '600', '700'], display: 'swap' });
const sourceSans = Source_Sans_3({ subsets: ['latin'], variable: '--font-source-sans', weight: ['300', '400', '600'], display: 'swap' });
const baskerville = Libre_Baskerville({ subsets: ['latin'], variable: '--font-baskerville', weight: ['400', '700'], display: 'swap' });
const ebGaramond = EB_Garamond({ subsets: ['latin', 'vietnamese'], variable: '--font-garamond', weight: ['400', '500', '600'], display: 'swap' });
// New theme fonts
const greatVibes = Great_Vibes({ subsets: ['latin'], variable: '--font-great-vibes', weight: ['400'], display: 'swap' });
const tenorSans = Tenor_Sans({ subsets: ['latin'], variable: '--font-tenor', weight: ['400'], display: 'swap' });

export const metadata: Metadata = {
  title: 'aWedding — Thiệp cưới online',
  description: 'Tạo website thiệp cưới online đẹp, nhanh, chỉ từ 99k',
};

const fontVars = [
  notoSerif.variable, crimsonText.variable,
  playfair.variable, lato.variable,
  cormorant.variable, montserrat.variable,
  lora.variable, sourceSans.variable,
  baskerville.variable, ebGaramond.variable,
  greatVibes.variable, tenorSans.variable,
].join(' ');

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={fontVars}>
      <body>{children}</body>
    </html>
  );
}
