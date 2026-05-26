'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const POINTS = [
  {
    icon: '💬',
    title: 'Gửi qua Zalo ngay',
    desc: 'Chia sẻ link thiệp qua Zalo, Messenger hay SMS — không cần in ấn, không cần cài app.',
  },
  {
    icon: '✍️',
    title: 'Cá nhân hóa từng khách',
    desc: 'Gói 149k cho phép mỗi link hiển thị đúng tên khách mời. "Kính mời Anh Minh" — chỉ link đó có.',
  },
  {
    icon: '⚡',
    title: 'Giao trong 2 giờ',
    desc: 'Gửi thông tin qua Zalo, nhận link thiệp trong vòng 2 giờ. Gấp cũng kịp.',
  },
  {
    icon: '💰',
    title: 'Rẻ hơn in thiệp giấy',
    desc: 'In thiệp giấy 200 tờ tốn 1–2 triệu. Thiệp online 99k, gửi không giới hạn người.',
  },
];

export function WhyUs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-20 px-4 bg-white" aria-labelledby="why-us-title">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 id="why-us-title"
            className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl"
            style={{ fontFamily: 'var(--font-display)' }}>
            Tại sao chọn aWedding?
          </h2>
        </div>

        <div ref={ref} className="grid gap-6 sm:grid-cols-2">
          {POINTS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm"
              style={{ border: '1px solid #F0E8E8' }}
            >
              <span className="text-3xl shrink-0" role="img" aria-label={p.title}>{p.icon}</span>
              <div>
                <h3 className="mb-1 font-semibold text-gray-900">{p.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
