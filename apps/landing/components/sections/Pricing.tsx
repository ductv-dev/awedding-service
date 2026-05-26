'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Check, Zap } from 'lucide-react';

const BASIC_FEATURES = [
  'Subdomain riêng (ten-cap-doi.awedding.online)',
  'Chọn 1 trong 6 giao diện đẹp',
  'Ảnh bìa + album ảnh (tối đa 20 ảnh)',
  'Thông tin gia đình, thời gian, địa điểm',
  'Lịch trình ngày cưới',
  'Form gửi lời chúc',
  'Phong bao QR mừng cưới',
  'Nhạc nền tự động',
  'Bản đồ Google Maps',
  'Hoạt động 6 tháng',
];

const PERSONAL_EXTRAS = [
  'Tất cả tính năng gói Cơ Bản',
  'Tên khách mời cá nhân hóa qua URL',
  '"Kính mời Anh Minh" — hiệu ứng đánh máy',
  'File hướng dẫn tạo link từng người',
];

function PricingCard({
  plan, price, features, badge, highlight, delay,
}: {
  plan: string; price: string; features: string[];
  badge?: string; highlight?: boolean; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="relative flex flex-col rounded-2xl p-6 sm:p-8"
      style={{
        background: highlight ? '#C41E3A' : '#fff',
        border: highlight ? 'none' : '2px solid #F0E8E8',
        boxShadow: highlight ? '0 8px 40px #C41E3A33' : '0 2px 12px rgba(0,0,0,0.06)',
      }}
    >
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold text-white"
          style={{ background: '#D4AF37' }}>
          {badge}
        </div>
      )}

      <div className="mb-6">
        <p className="mb-1 text-sm font-semibold uppercase tracking-widest"
          style={{ color: highlight ? '#FFB7C5' : '#C41E3A' }}>
          {plan}
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-black" style={{ color: highlight ? '#fff' : '#1A1A1A' }}>
            {price}
          </span>
          <span className="text-sm" style={{ color: highlight ? '#FFB7C5' : '#888' }}>/ thiệp</span>
        </div>
      </div>

      <ul className="mb-8 flex-1 space-y-3" role="list">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm"
            style={{ color: highlight ? '#fff' : '#444' }}>
            <Check size={15} className="mt-0.5 shrink-0"
              style={{ color: highlight ? '#FFB7C5' : '#C41E3A' }} aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      {/* TODO: thay link Zalo thật */}
      <a
        href="https://zalo.me/0000000000"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full rounded-full py-3.5 text-center text-sm font-bold tracking-wide transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={highlight
          ? { background: '#fff', color: '#C41E3A' }
          : { background: '#C41E3A', color: '#fff' }}
      >
        Đặt ngay qua Zalo →
      </a>

      {/* Ghi chú gia hạn */}
      <p className="mt-3 text-center text-xs" style={{ color: highlight ? '#FFB7C599' : '#aaa' }}>
        Gia hạn thêm 6 tháng: 30k
      </p>
    </motion.div>
  );
}

export function Pricing() {
  return (
    <section className="py-20 px-4" style={{ background: '#FAFAFA' }} aria-labelledby="pricing-title">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 id="pricing-title"
            className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl"
            style={{ fontFamily: 'var(--font-display)' }}>
            Bảng giá dịch vụ
          </h2>
          <p className="text-gray-500">Minh bạch, không phí ẩn — trả một lần dùng 6 tháng</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <PricingCard
            plan="Cơ Bản"
            price="99k"
            features={BASIC_FEATURES}
            delay={0}
          />
          <PricingCard
            plan="Cá Nhân Hóa"
            price="149k"
            features={PERSONAL_EXTRAS}
            badge="Phổ biến nhất"
            highlight
            delay={0.15}
          />
        </div>

        <p className="mt-8 text-center text-sm text-gray-400">
          Không rõ nên chọn gói nào?{' '}
          {/* TODO: thay link Zalo thật */}
          <a href="https://zalo.me/0000000000" target="_blank" rel="noopener noreferrer"
            className="font-medium underline hover:text-red-600" style={{ color: '#C41E3A' }}>
            Nhắn Zalo để được tư vấn miễn phí
          </a>
        </p>
      </div>
    </section>
  );
}
