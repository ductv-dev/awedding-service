import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Check, X } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Bảng giá thiệp cưới online — aWedding',
  description: 'Gói Cơ Bản 99k hoặc Cá Nhân Hóa 149k. Minh bạch, không phí ẩn — dùng 6 tháng với subdomain riêng.',
};

const COMPARISON = [
  { feature: 'Subdomain riêng (ten-cap-doi.awedding.online)', basic: true, personal: true },
  { feature: '6 giao diện đẹp để chọn', basic: true, personal: true },
  { feature: 'Ảnh bìa + album ảnh (tối đa 20 ảnh)', basic: true, personal: true },
  { feature: 'Thông tin gia đình, thời gian, địa điểm', basic: true, personal: true },
  { feature: 'Lịch trình ngày cưới', basic: true, personal: true },
  { feature: 'Form gửi lời chúc', basic: true, personal: true },
  { feature: 'Phong bao QR mừng cưới', basic: true, personal: true },
  { feature: 'Nhạc nền tự động', basic: true, personal: true },
  { feature: 'Bản đồ Google Maps', basic: true, personal: true },
  { feature: 'Hoạt động 6 tháng', basic: true, personal: true },
  { feature: 'Tên khách mời cá nhân hóa qua URL', basic: false, personal: true },
  { feature: '"Kính mời Anh Minh" — hiệu ứng đánh máy', basic: false, personal: true },
  { feature: 'File hướng dẫn tạo link từng khách', basic: false, personal: true },
];

const FAQS = [
  {
    q: 'Link thiệp hoạt động bao lâu?',
    a: '6 tháng kể từ ngày kích hoạt. Sau đó gia hạn thêm 6 tháng với giá 30k.',
  },
  {
    q: 'Tôi cần chuẩn bị gì để đặt?',
    a: 'Ảnh bìa, album ảnh, thông tin gia đình hai bên, thời gian & địa điểm tổ chức, thông tin tài khoản ngân hàng để nhận mừng cưới.',
  },
  {
    q: 'Giao trong bao lâu sau khi đặt?',
    a: 'Tối đa 2 giờ trong khung 7am – 10pm mỗi ngày. Trường hợp đặt ngoài giờ sẽ được giao vào sáng hôm sau.',
  },
  {
    q: 'Tôi có thể thay đổi thông tin sau khi nhận link không?',
    a: 'Có — trong vòng 7 ngày sau khi giao, bạn có thể yêu cầu sửa thông tin miễn phí (tối đa 3 lần).',
  },
  {
    q: 'Gói Cá Nhân Hóa hoạt động thế nào?',
    a: 'Chúng tôi cung cấp file Excel + hướng dẫn tạo link riêng cho từng khách. Ví dụ: ten-cap-doi.awedding.online/demo?guest=Anh-Minh sẽ hiển thị "Kính mời Anh Minh".',
  },
  {
    q: 'Có hỗ trợ nhạc nền riêng không?',
    a: 'Hiện tại chúng tôi cung cấp bộ nhạc nền có sẵn phù hợp với từng theme. Nhạc tùy chỉnh đang được phát triển.',
  },
];

export default function BangGiaPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: '#FAFAFA' }}>
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
            Bảng Giá Dịch Vụ
          </h1>
          <p className="text-base opacity-70 text-white">
            Minh bạch, không phí ẩn — trả một lần dùng 6 tháng
          </p>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-16">
          {/* Pricing cards */}
          <div className="mb-16 grid gap-6 sm:grid-cols-2">
            {/* Basic */}
            <div className="flex flex-col rounded-2xl bg-white p-6 sm:p-8 shadow-sm" style={{ border: '2px solid #F0E8E8' }}>
              <p className="mb-1 text-sm font-semibold uppercase tracking-widest" style={{ color: '#C41E3A' }}>
                Cơ Bản
              </p>
              <div className="mb-2 flex items-baseline gap-1">
                <span className="text-5xl font-black" style={{ color: '#1A1A1A' }}>99k</span>
                <span className="text-sm text-gray-400">/ thiệp</span>
              </div>
              <p className="mb-6 text-sm text-gray-500">Đầy đủ tính năng cần thiết cho một đám cưới đẹp.</p>
              {/* TODO: thay link Zalo thật */}
              <a
                href="https://zalo.me/0000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="mb-3 block w-full rounded-full py-3.5 text-center text-sm font-bold tracking-wide transition-all hover:scale-105 active:scale-95"
                style={{ background: '#C41E3A', color: '#fff' }}
              >
                Đặt ngay qua Zalo →
              </a>
              <p className="text-center text-xs text-gray-400">Gia hạn thêm 6 tháng: 30k</p>
            </div>

            {/* Personal */}
            <div
              className="relative flex flex-col rounded-2xl p-6 sm:p-8"
              style={{ background: '#C41E3A', boxShadow: '0 8px 40px #C41E3A33' }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold text-white"
                style={{ background: '#D4AF37' }}>
                Phổ biến nhất
              </div>
              <p className="mb-1 text-sm font-semibold uppercase tracking-widest" style={{ color: '#FFB7C5' }}>
                Cá Nhân Hóa
              </p>
              <div className="mb-2 flex items-baseline gap-1">
                <span className="text-5xl font-black text-white">149k</span>
                <span className="text-sm" style={{ color: '#FFB7C5' }}>/ thiệp</span>
              </div>
              <p className="mb-6 text-sm" style={{ color: '#FFB7C5' }}>
                Tạo link riêng với tên khách mời, ấn tượng hơn nhiều.
              </p>
              {/* TODO: thay link Zalo thật */}
              <a
                href="https://zalo.me/0000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="mb-3 block w-full rounded-full py-3.5 text-center text-sm font-bold tracking-wide transition-all hover:scale-105 active:scale-95"
                style={{ background: '#fff', color: '#C41E3A' }}
              >
                Đặt ngay qua Zalo →
              </a>
              <p className="text-center text-xs" style={{ color: '#FFB7C599' }}>Gia hạn thêm 6 tháng: 30k</p>
            </div>
          </div>

          {/* Comparison table */}
          <div className="mb-16">
            <h2 className="mb-6 text-xl font-bold text-gray-900 text-center" style={{ fontFamily: 'var(--font-display)' }}>
              So sánh chi tiết
            </h2>
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              {/* Table header */}
              <div className="grid grid-cols-3 border-b border-gray-100">
                <div className="p-4 text-sm font-semibold text-gray-500">Tính năng</div>
                <div className="p-4 text-center text-sm font-bold" style={{ color: '#C41E3A' }}>Cơ Bản<br /><span className="text-lg font-black">99k</span></div>
                <div className="p-4 text-center text-sm font-bold text-white rounded-tr-2xl" style={{ background: '#C41E3A' }}>
                  Cá Nhân Hóa<br /><span className="text-lg font-black">149k</span>
                </div>
              </div>

              {COMPARISON.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 border-b border-gray-50 last:border-0"
                  style={{ background: i % 2 === 0 ? '#fff' : '#FFF9F9' }}
                >
                  <div className="p-4 text-sm text-gray-600">{row.feature}</div>
                  <div className="flex items-center justify-center p-4">
                    {row.basic
                      ? <Check size={16} className="text-green-500" aria-label="Có" />
                      : <X size={16} className="text-gray-300" aria-label="Không" />}
                  </div>
                  <div className="flex items-center justify-center p-4">
                    {row.personal
                      ? <Check size={16} style={{ color: '#C41E3A' }} aria-label="Có" />
                      : <X size={16} className="text-gray-300" aria-label="Không" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-16">
            <h2 className="mb-6 text-xl font-bold text-gray-900 text-center" style={{ fontFamily: 'var(--font-display)' }}>
              Câu hỏi thường gặp
            </h2>
            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <div key={i} className="rounded-xl bg-white p-5 shadow-sm" style={{ border: '1px solid #F0E8E8' }}>
                  <h3 className="mb-2 font-semibold text-gray-900">{faq.q}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="rounded-2xl p-8 text-center" style={{ background: 'linear-gradient(135deg, #1C0A00, #3D0A0A)' }}>
            <h2 className="mb-2 font-bold text-white text-xl" style={{ fontFamily: 'var(--font-display)' }}>
              Vẫn còn thắc mắc?
            </h2>
            <p className="mb-6 text-sm opacity-70 text-white">
              Nhắn Zalo — chúng tôi tư vấn miễn phí và không push sale.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              {/* TODO: thay link Zalo thật */}
              <a
                href="https://zalo.me/0000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold transition-all hover:scale-105"
                style={{ background: '#0068FF', color: '#fff' }}
              >
                📱 Zalo tư vấn
              </a>
              <Link
                href="/mau-thiep"
                className="inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-sm font-bold transition-all hover:scale-105"
                style={{ borderColor: '#D4AF37', color: '#D4AF37' }}
              >
                Xem mẫu thiệp →
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
