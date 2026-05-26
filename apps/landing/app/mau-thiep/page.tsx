import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getDemoUrl } from '@/lib/demoLinks';

export const metadata: Metadata = {
  title: '6 mẫu thiệp cưới đẹp — aWedding',
  description: 'Khám phá 6 giao diện thiệp cưới online: Emerald Forest, Traditional Red, Champagne Gold, Sage Green, Blush Rose, Ink Minimal.',
};

const THEMES = [
  {
    id: 'emerald-forest',
    name: 'Emerald Forest',
    desc: 'Xanh Rừng Vàng Gold',
    longDesc: 'Nền xanh rừng đậm với texture lá mờ và gradient chiều sâu. Tên cặp đôi dùng script Great Vibes sang trọng, điểm xuyết màu vàng gold ấm áp. Phù hợp cho những cặp đôi yêu thiên nhiên và vẻ đẹp huyền bí.',
    bg: '#1B3A2D',
    primary: '#C9A84C',
    accent: '#E8D5A3',
    text: '#E8D5A3',
    ornament: '🌿',
    tags: ['Nền tối', 'Xanh rừng', 'Vàng gold'],
    demoSlug: 'demo',
  },
  {
    id: 'traditional-red',
    name: 'Traditional Red',
    desc: 'Đỏ Kem Truyền Thống',
    longDesc: 'Nền kem trắng ấm với điểm nhấn đỏ trầm truyền thống. Biểu tượng Song Hỷ (囍) đặc trưng, font Playfair Display thanh lịch. Dành cho những cặp đôi yêu phong cách cổ điển Á Đông trang trọng.',
    bg: '#FAF3EC',
    primary: '#8B1A1A',
    accent: '#C9A84C',
    text: '#1A1A1A',
    ornament: '囍',
    tags: ['Nền sáng', 'Đỏ truyền thống', 'Cổ điển'],
    demoSlug: 'demo-red',
  },
  {
    id: 'champagne-gold',
    name: 'Champagne Gold',
    desc: 'Kem Vàng Champagne',
    longDesc: 'Tông kem nhạt tinh tế với vàng champagne sang trọng. Tên cặp đôi hiệu ứng shimmer ánh kim, font Cormorant Garamond cổ điển Pháp. Lựa chọn lý tưởng cho đám cưới phong cách châu Âu.',
    bg: '#FAF8F2',
    primary: '#B5924C',
    accent: '#D4B483',
    text: '#2A2015',
    ornament: '◆',
    tags: ['Nền sáng', 'Vàng champagne', 'Sang trọng'],
    demoSlug: 'demo-champagne',
  },
  {
    id: 'sage-green',
    name: 'Sage Green',
    desc: 'Xanh Sage Thiên Nhiên',
    longDesc: 'Màu xanh sage tươi mát gợi lên vẻ đẹp của đồng cỏ và hoa dại. Font Lora serif ấm áp, họa tiết lá cành SVG trang trí. Hoàn hảo cho đám cưới ngoài trời hay phong cách rustic.',
    bg: '#F4F7F2',
    primary: '#7D9B76',
    accent: '#4A6741',
    text: '#2C3E2D',
    ornament: '🌱',
    tags: ['Nền sáng', 'Xanh sage', 'Thiên nhiên'],
    demoSlug: 'demo-sage',
  },
  {
    id: 'blush-rose',
    name: 'Blush Rose',
    desc: 'Hồng Dusty Rose',
    longDesc: 'Hồng dusty rose nhẹ nhàng, nữ tính với nền kem trắng ấm. Tên cặp đôi script Great Vibes lãng mạn, cánh hoa rơi nhẹ nhàng. Lựa chọn yêu thích của các cô dâu yêu sự dịu dàng.',
    bg: '#FDF6F0',
    primary: '#C9847A',
    accent: '#E8B4AE',
    text: '#3D2020',
    ornament: '🌸',
    tags: ['Nền sáng', 'Hồng pastel', 'Lãng mạn'],
    demoSlug: 'demo-blush',
  },
  {
    id: 'ink-minimal',
    name: 'Ink Minimal',
    desc: 'Trắng Tối Giản',
    longDesc: 'Whitespace cực nhiều, đường kẻ mảnh 1px, không particles. Font Cormorant Garamond italic kích thước lớn cho tên cặp đôi. Dành cho những cặp đôi yêu phong cách tối giản, thanh lịch hiện đại.',
    bg: '#FAFAFA',
    primary: '#1A1A1A',
    accent: '#8B7355',
    text: '#1A1A1A',
    ornament: '✦',
    tags: ['Nền sáng', 'Tối giản', 'Hiện đại'],
    demoSlug: 'demo-ink',
  },
];

export default function MauThiepPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: '#FFF9F9' }}>
        {/* Header */}
        <div className="py-16 px-4 text-center" style={{ background: 'linear-gradient(135deg, #1C0A00, #3D0A0A)' }}>
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: '#D4AF37' }}
          >
            <ArrowLeft size={14} /> Về trang chủ
          </Link>
          <h1
            className="mb-3 font-bold text-white"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            6 Mẫu Thiệp Cưới
          </h1>
          <p className="text-base opacity-70 text-white max-w-xl mx-auto">
            Từ truyền thống đến hiện đại — chọn phong cách phù hợp với câu chuyện tình yêu của bạn
          </p>
        </div>

        {/* Theme list */}
        <div className="mx-auto max-w-5xl px-4 py-16 space-y-12">
          {THEMES.map((theme, i) => (
            <div
              key={theme.id}
              className="overflow-hidden rounded-2xl shadow-sm"
              style={{ border: `1px solid ${theme.primary}33` }}
            >
              {/* Preview bar */}
              <div
                className="flex h-48 items-center justify-center relative"
                style={{ background: theme.bg }}
              >
                <div className="flex flex-col items-center gap-3">
                  <span className="text-6xl" style={{ color: theme.accent }} aria-hidden="true">
                    {theme.ornament}
                  </span>
                  <p
                    className="text-sm font-semibold tracking-widest uppercase"
                    style={{ color: theme.text, opacity: 0.6 }}
                  >
                    {theme.name}
                  </p>
                  <div className="flex gap-2">
                    {[theme.primary, theme.accent, theme.text].map((c, j) => (
                      <div
                        key={j}
                        className="h-4 w-4 rounded-full"
                        style={{ background: c, border: '1px solid rgba(128,128,128,0.2)' }}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full font-medium"
                  style={{ background: `${theme.primary}22`, color: theme.primary, border: `1px solid ${theme.primary}44` }}>
                  {String(i + 1).padStart(2, '0')} / 06
                </div>
              </div>

              {/* Info */}
              <div className="bg-white p-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <h2 className="mb-1 text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
                    {theme.name}
                  </h2>
                  <p className="mb-3 text-sm font-medium" style={{ color: theme.primary }}>
                    {theme.desc}
                  </p>
                  <p className="text-sm leading-relaxed text-gray-500 max-w-lg">{theme.longDesc}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {theme.tags.map(tag => (
                      <span key={tag} className="rounded-full px-3 py-1 text-xs font-medium"
                        style={{ background: `${theme.primary}15`, color: theme.primary }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:ml-6 sm:shrink-0">
                  <a
                    href={getDemoUrl(theme.demoSlug)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-all hover:scale-105 active:scale-95"
                    style={{ background: theme.primary }}
                    aria-label={`Xem demo theme ${theme.name}`}
                  >
                    Xem demo <ArrowRight size={13} />
                  </a>
                  {/* TODO: thay link Zalo thật */}
                  <a
                    href="https://zalo.me/0000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all hover:scale-105 active:scale-95"
                    style={{ borderColor: theme.primary, color: theme.primary }}
                  >
                    Đặt theme này
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="py-16 px-4 text-center" style={{ background: 'linear-gradient(135deg, #1C0A00, #3D0A0A)' }}>
          <h2
            className="mb-3 font-bold text-white"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}
          >
            Chưa chắc nên chọn mẫu nào?
          </h2>
          <p className="mb-8 text-sm opacity-70 text-white">
            Nhắn Zalo — chúng tôi sẽ tư vấn miễn phí và tạo demo thử cho bạn xem trước.
          </p>
          {/* TODO: thay link Zalo thật */}
          <a
            href="https://zalo.me/0000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold transition-all hover:scale-105 active:scale-95"
            style={{ background: '#D4AF37', color: '#1C0A00' }}
          >
            📱 Nhắn Zalo tư vấn miễn phí →
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
