import type { Metadata } from 'next';
import { Playfair_Display, Lato } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700'],
});

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '700'],
});

export const metadata: Metadata = {
  title: 'aWedding — Thiệp cưới online đẹp, nhanh, chỉ từ 99k',
  description:
    'Tạo website thiệp cưới online với subdomain riêng, 6 giao diện đẹp, nhạc nền, album ảnh. Giao trong 2 giờ, chỉ từ 99k.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${playfair.variable} ${lato.variable}`}>
      <body>{children}</body>
    </html>
  );
}
