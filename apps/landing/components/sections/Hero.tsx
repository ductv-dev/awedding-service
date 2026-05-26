'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';

// Phone mockup hiển thị thiệp mẫu Song Hỷ bằng CSS thuần
function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[200px] sm:w-[220px]" aria-hidden="true">
      {/* Khung điện thoại */}
      <div className="relative overflow-hidden rounded-[32px] shadow-2xl"
        style={{ background: '#1C0A00', border: '6px solid #2A1A0A', aspectRatio: '9/19' }}>
        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 h-3 w-16 rounded-full bg-black/60 z-10" />

        {/* Màn hình nội dung */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center"
          style={{ background: 'linear-gradient(160deg,#2D0A00,#1C0A00)' }}>

          {/* 囍 character */}
          <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, repeat: Infinity }}
            className="text-2xl" style={{ color: '#D4AF37' }}>囍</motion.div>

          {/* Tên cặp đôi */}
          <p className="text-xs font-bold leading-tight" style={{ fontFamily: 'Georgia, serif', color: '#FFF8DC' }}>
            Việt Đức &amp; Ngọc Anh
          </p>

          {/* Ngày */}
          <p className="text-[9px] tracking-widest opacity-60" style={{ color: '#D4AF37' }}>27.07.2026</p>

          {/* Divider hoa văn */}
          <div className="flex items-center gap-1 w-full">
            <div className="h-px flex-1" style={{ background: '#D4AF3755' }} />
            <span className="text-[8px]" style={{ color: '#D4AF37' }}>❈</span>
            <div className="h-px flex-1" style={{ background: '#D4AF3755' }} />
          </div>

          {/* Fake ảnh bìa */}
          <div className="w-full rounded-lg overflow-hidden" style={{ height: 56, background: '#3D1A1A' }}>
            <div className="h-full w-full opacity-40"
              style={{ background: 'url(https://picsum.photos/200/100?random=10) center/cover' }} />
          </div>

          {/* Thông tin sự kiện */}
          <div className="w-full rounded bg-white/5 px-2 py-1.5 text-left">
            <p className="text-[8px] font-semibold" style={{ color: '#D4AF37' }}>⏰ 11:00 • 27/07/2026</p>
            <p className="text-[7px] opacity-50 mt-0.5" style={{ color: '#FFF8DC' }}>White Palace, TP.HCM</p>
          </div>

          {/* Nút mở thiệp */}
          <div className="w-full rounded-full py-1.5 text-center text-[9px] font-bold"
            style={{ background: '#C41E3A', color: '#FFF8DC' }}>
            Mở Thiệp ✉
          </div>
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 -z-10 rounded-[32px] blur-2xl opacity-30"
        style={{ background: '#C41E3A' }} />
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-20" aria-label="Giới thiệu aWedding">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10"
        style={{ background: 'linear-gradient(135deg, #fff5f5 0%, #fff 50%, #fffbf0 100%)' }} />

      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full opacity-10 -z-10"
        style={{ background: '#C41E3A', filter: 'blur(80px)' }} aria-hidden="true" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full opacity-10 -z-10"
        style={{ background: '#D4AF37', filter: 'blur(60px)' }} aria-hidden="true" />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text content */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              {/* Badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
                style={{ background: '#FFF0F0', border: '1px solid #C41E3A33', color: '#C41E3A' }}>
                ✨ Đã có hơn 100+ cặp đôi tin dùng
              </div>

              <h1 className="mb-4 font-bold leading-tight text-gray-900"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                Thiệp cưới online —{' '}
                <span style={{ color: '#C41E3A' }}>Đẹp, nhanh</span>,{' '}
                chỉ từ{' '}
                <span style={{ color: '#D4AF37' }}>99k</span>
              </h1>

              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                Website cưới riêng với đường link gửi thẳng qua Zalo. 6 giao diện đẹp, nhạc nền, album ảnh và tên khách mời cá nhân hóa.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link href="/mau-thiep"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                  style={{ background: '#C41E3A' }}>
                  Xem mẫu thiệp
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>

                {/* TODO: thay link Zalo thật */}
                <a href="https://zalo.me/0000000000" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border-2 px-6 py-3 text-sm font-semibold transition-all hover:bg-gray-50 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                  style={{ borderColor: '#C41E3A', color: '#C41E3A' }}>
                  <MessageCircle size={16} aria-hidden="true" />
                  Đặt ngay qua Zalo
                </a>
              </div>

              {/* Trust indicators */}
              <div className="mt-8 flex flex-wrap gap-4 text-sm text-gray-500">
                <span>✓ Giao trong 2 giờ</span>
                <span>✓ Hoạt động 6 tháng</span>
                <span>✓ Subdomain riêng</span>
              </div>
            </motion.div>
          </div>

          {/* Phone mockup */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <PhoneMockup />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
