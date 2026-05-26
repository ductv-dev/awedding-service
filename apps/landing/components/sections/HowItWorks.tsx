'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const STEPS = [
  {
    number: '01',
    icon: '🎨',
    title: 'Chọn mẫu & gói dịch vụ',
    desc: 'Xem 6 giao diện đẹp và chọn gói phù hợp (99k hoặc 149k). Không cần đăng ký, không phức tạp.',
  },
  {
    number: '02',
    icon: '📸',
    title: 'Gửi thông tin qua Zalo',
    desc: 'Gửi ảnh cặp đôi, thông tin gia đình, thời gian & địa điểm tổ chức qua Zalo cho chúng tôi.',
  },
  {
    number: '03',
    icon: '🔗',
    title: 'Nhận link trong 2 giờ',
    desc: 'Chúng tôi tạo website cưới riêng cho bạn. Gửi link qua Zalo — chia sẻ ngay cho người thân!',
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-20 px-4" style={{ background: '#FAFAFA' }} aria-labelledby="how-it-works-title">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 id="how-it-works-title"
            className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl"
            style={{ fontFamily: 'var(--font-display)' }}>
            Chỉ 3 bước đơn giản
          </h2>
          <p className="text-gray-500">Không cần kỹ thuật, không cần thiết kế — chúng tôi làm tất cả</p>
        </div>

        <div ref={ref} className="grid gap-6 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm"
              style={{ border: '1px solid #F0E8E8' }}
            >
              {/* Số thứ tự */}
              <span className="absolute -top-3 -left-1 text-6xl font-black opacity-5 select-none" style={{ color: '#C41E3A' }}>
                {step.number}
              </span>
              <span className="text-4xl" role="img" aria-label={step.title}>{step.icon}</span>
              <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{step.desc}</p>

              {/* Connector arrow (không hiện trên mobile) */}
              {i < STEPS.length - 1 && (
                <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 sm:block" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="#C41E3A" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
