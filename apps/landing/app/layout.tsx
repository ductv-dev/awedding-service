import type { Metadata } from 'next';
import { Playfair_Display, Open_Sans } from 'next/font/google';
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from '@/lib/seo';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['vietnamese', 'latin'],
  variable: '--font-display',
  weight: ['400', '600', '700'],
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['vietnamese', 'latin'],
  variable: '--font-sans',
  weight: ['300', '400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'thiep cuoi online',
    'website thiep cuoi',
    'thiep moi dam cuoi',
    'thiep cuoi dien tu',
    'aWedding',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: '/',
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${playfair.variable} ${openSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
