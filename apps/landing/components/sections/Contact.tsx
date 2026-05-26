'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageCircle, Mail, Phone } from 'lucide-react';

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      className="py-20 px-4 text-center"
      style={{ background: 'linear-gradient(135deg, #1C0A00, #3D0A0A)' }}
      aria-labelledby="contact-title"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-2xl"
      >
        {/* Badge */}
        <div className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold"
          style={{ background: '#D4AF3722', border: '1px solid #D4AF3744', color: '#D4AF37' }}>
          ✉ Liên hệ ngay hôm nay
        </div>

        <h2 id="contact-title"
          className="mb-3 font-bold text-white sm:text-4xl"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}>
          Sẵn sàng tạo thiệp cưới của bạn?
        </h2>
        <p className="mb-10 text-base leading-relaxed opacity-70 text-white">
          Chỉ cần nhắn tin — chúng tôi sẽ tư vấn và tạo thiệp trong vòng 2 giờ.
        </p>

        {/* 3 nút liên hệ */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          {/* TODO: thay SĐT Zalo thật */}
          <a href="https://zalo.me/0000000000" target="_blank" rel="noopener noreferrer"
            className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full px-7 py-3 text-sm font-bold transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            style={{ background: '#0068FF', color: '#fff' }}
            aria-label="Liên hệ qua Zalo">
            <Phone size={16} aria-hidden="true" />
            📱 Zalo: 0900 000 000
          </a>

          {/* TODO: thay link Messenger thật */}
          <a href="https://m.me/awedding" target="_blank" rel="noopener noreferrer"
            className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full px-7 py-3 text-sm font-bold transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            style={{ background: '#006AFF', color: '#fff' }}
            aria-label="Liên hệ qua Messenger">
            <MessageCircle size={16} aria-hidden="true" />
            💬 Messenger
          </a>

          {/* TODO: thay email thật */}
          <a href="mailto:hello@awedding.online"
            className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full px-7 py-3 text-sm font-bold transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            style={{ background: '#fff', color: '#C41E3A' }}
            aria-label="Gửi email">
            <Mail size={16} aria-hidden="true" />
            📧 Email
          </a>
        </div>

        <p className="mt-8 text-xs opacity-50 text-white">
          Phản hồi trong 30 phút · 7am – 10pm mỗi ngày
        </p>
      </motion.div>
    </section>
  );
}
