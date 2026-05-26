'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        boxShadow: scrolled ? '0 1px 20px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded">
          <span className="text-xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)', color: '#C41E3A' }}>
            a<span style={{ color: '#D4AF37' }}>Wedding</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 sm:flex" aria-label="Điều hướng chính">
          <Link href="/mau-thiep" className="text-sm font-medium text-gray-600 transition-colors hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded">
            Mẫu thiệp
          </Link>
          <Link href="/bang-gia" className="text-sm font-medium text-gray-600 transition-colors hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded">
            Bảng giá
          </Link>
          {/* TODO: thay link Zalo thật */}
          <a
            href="https://zalo.me/0000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-5 py-2 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            style={{ background: '#C41E3A' }}
          >
            Đặt ngay
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg sm:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="border-t bg-white px-4 py-4 sm:hidden">
          <nav className="flex flex-col gap-3" aria-label="Điều hướng mobile">
            <Link href="/mau-thiep" onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-gray-700 hover:text-red-600">Mẫu thiệp</Link>
            <Link href="/bang-gia" onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-gray-700 hover:text-red-600">Bảng giá</Link>
            {/* TODO: thay link Zalo thật */}
            <a href="https://zalo.me/0000000000" target="_blank" rel="noopener noreferrer"
              className="rounded-full py-2.5 text-center text-sm font-semibold text-white"
              style={{ background: '#C41E3A' }}>
              Đặt ngay qua Zalo
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
