'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const THEMES = [
  {
    id: 'emerald-forest',
    name: 'Emerald Forest',
    desc: 'Xanh Rừng Vàng Gold',
    bg: '#1B3A2D',
    primary: '#C9A84C',
    accent: '#E8D5A3',
    ornament: '🌿',
    demoSlug: 'demo',
  },
  {
    id: 'traditional-red',
    name: 'Traditional Red',
    desc: 'Đỏ Kem Truyền Thống',
    bg: '#FAF3EC',
    primary: '#8B1A1A',
    accent: '#C9A84C',
    ornament: '囍',
    demoSlug: 'demo-red',
  },
  {
    id: 'champagne-gold',
    name: 'Champagne Gold',
    desc: 'Kem Vàng Champagne',
    bg: '#FAF8F2',
    primary: '#B5924C',
    accent: '#D4B483',
    ornament: '◆',
    demoSlug: 'demo-champagne',
  },
  {
    id: 'sage-green',
    name: 'Sage Green',
    desc: 'Xanh Sage Thiên Nhiên',
    bg: '#F4F7F2',
    primary: '#7D9B76',
    accent: '#4A6741',
    ornament: '🌱',
    demoSlug: 'demo-sage',
  },
  {
    id: 'blush-rose',
    name: 'Blush Rose',
    desc: 'Hồng Dusty Rose',
    bg: '#FDF6F0',
    primary: '#C9847A',
    accent: '#E8B4AE',
    ornament: '🌸',
    demoSlug: 'demo-blush',
  },
  {
    id: 'ink-minimal',
    name: 'Ink Minimal',
    desc: 'Trắng Tối Giản',
    bg: '#FAFAFA',
    primary: '#1A1A1A',
    accent: '#8B7355',
    ornament: '✦',
    demoSlug: 'demo-ink',
  },
];

function ThemeCard({ theme, delay }: { theme: typeof THEMES[number]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="group overflow-hidden rounded-2xl shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
      style={{ border: `1px solid ${theme.primary}33` }}
    >
      {/* Preview màu sắc */}
      <div className="flex h-32 items-center justify-center" style={{ background: theme.bg }}>
        <div className="flex flex-col items-center gap-2">
          <span className="text-3xl" style={{ color: theme.accent }} aria-hidden="true">{theme.ornament}</span>
          <div className="flex gap-1.5">
            {[theme.primary, theme.accent].map((c, i) => (
              <div key={i} className="h-3 w-3 rounded-full" style={{ background: c }} aria-hidden="true" />
            ))}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex items-center justify-between px-4 py-3 bg-white">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{theme.name}</h3>
          <p className="text-xs text-gray-500">{theme.desc}</p>
        </div>
        <a
          href={`http://localhost:3001/${theme.demoSlug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-white transition-all group-hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          style={{ background: theme.primary }}
          aria-label={`Xem demo theme ${theme.name}`}
        >
          Xem demo <ArrowRight size={11} />
        </a>
      </div>
    </motion.div>
  );
}

export function ThemeSamples() {
  return (
    <section className="py-20 px-4" aria-labelledby="themes-title">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 id="themes-title"
            className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl"
            style={{ fontFamily: 'var(--font-display)' }}>
            6 giao diện thiệp cưới
          </h2>
          <p className="mb-4 text-gray-500">Từ truyền thống đến hiện đại — bạn chọn phong cách, chúng tôi tạo nên câu chuyện</p>
          <Link href="/mau-thiep"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded"
            style={{ color: '#C41E3A' }}>
            Xem chi tiết tất cả mẫu <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {THEMES.map((theme, i) => (
            <ThemeCard key={theme.id} theme={theme} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
