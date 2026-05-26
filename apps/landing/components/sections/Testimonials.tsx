"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const TESTIMONIALS = [
  {
    name: "Ngọc Anh & Viết Đức",
    date: "Tháng 6, 2025",
    avatar: "NA",
    avatarBg: "#C41E3A",
    content:
      "Thiệp cưới online quá đẹp, mình gửi link qua Zalo cho cả họ hàng và bạn bè. Ai cũng khen ngợi và hỏi làm ở đâu. Dịch vụ nhanh, chỉ 2 tiếng là có link.",
    theme: "Song Hỷ",
  },
  {
    name: "Minh Thư & Hoàng Nam",
    date: "Tháng 4, 2025",
    avatar: "MT",
    avatarBg: "#D4688A",
    content:
      "Mình chọn gói 149k để tên khách mời hiện trên thiệp. Khách rất thích khi nhận được link có tên riêng của mình. Rẻ hơn nhiều so với in thiệp giấy mà lại độc đáo hơn.",
    theme: "Anh Đào",
  },
  {
    name: "Thanh Hà & Quốc Bảo",
    date: "Tháng 3, 2025",
    avatar: "TH",
    avatarBg: "#4A7C59",
    content:
      "Giao diện Vườn Xuân cực kỳ đẹp và lãng mạn. Nhạc nền tự động phát khi mở thiệp, khách nghe xong ai cũng nhắn tin khen. Rất hài lòng với dịch vụ!",
    theme: "Vườn Xuân",
  },
  {
    name: "Kim Ngân & Tuấn Anh",
    date: "Tháng 2, 2025",
    avatar: "KN",
    avatarBg: "#C9A84C",
    content:
      "Làm thiệp online chỉ mất 2 tiếng, tiết kiệm được mấy triệu so với in thiệp giấy. Bạn bè ở nước ngoài cũng dễ dàng xem và xem đếm ngược đến ngày cưới.",
    theme: "Hoàng Kim",
  },
]

function Avatar({ initials, bg }: { initials: string; bg: string }) {
  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
      style={{ background: bg }}
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      className="px-4 py-20"
      style={{ background: "#FFF5F5" }}
      aria-labelledby="testimonials-title"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2
            id="testimonials-title"
            className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Khách hàng nói gì?
          </h2>
        </div>

        <div ref={ref} className="grid gap-4 sm:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm"
              style={{ border: "1px solid #F0E8E8" }}
            >
              {/* Quote */}
              <blockquote className="flex-1 text-sm leading-relaxed text-gray-600">
                "{t.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 border-t pt-4">
                <Avatar initials={t.avatar} bg={t.avatarBg} />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {t.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {t.date} · Theme {t.theme}
                  </p>
                </div>
                <div className="ml-auto flex gap-0.5" aria-label="5 sao">
                  {[...Array(5)].map((_, j) => (
                    <span
                      key={j}
                      className="text-sm text-yellow-400"
                      aria-hidden="true"
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
