import Link from 'next/link';
import { getDemoUrl } from '@/lib/demoLinks';

export function Footer() {
  return (
    <footer className="border-t bg-gray-50" role="contentinfo">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="mb-2 text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              <span style={{ color: '#C41E3A' }}>a</span>
              <span style={{ color: '#D4AF37' }}>Wedding</span>
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Thiệp cưới online đẹp, nhanh, chỉ từ 99k. Giao trong 2 giờ.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">Khám phá</p>
            <nav className="flex flex-col gap-2" aria-label="Footer navigation">
              <Link href="/mau-thiep" className="text-sm text-gray-600 hover:text-red-600 transition-colors">Xem mẫu thiệp</Link>
              <Link href="/bang-gia" className="text-sm text-gray-600 hover:text-red-600 transition-colors">Bảng giá dịch vụ</Link>
              <a
                href={getDemoUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-red-600 transition-colors"
              >
                Demo thiệp cưới
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">Liên hệ</p>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              {/* TODO: thay link Zalo thật */}
              <a href="https://zalo.me/0000000000" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
                📱 Zalo: 0900 000 000
              </a>
              {/* TODO: thay email thật */}
              <a href="mailto:hello@awedding.online" className="hover:text-red-600 transition-colors">
                📧 hello@awedding.online
              </a>
              <p className="text-xs text-gray-400">Phản hồi trong 30 phút · 7am–10pm</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} aWedding. Thiết kế với ❤️ tại Việt Nam.
        </div>
      </div>
    </footer>
  );
}
