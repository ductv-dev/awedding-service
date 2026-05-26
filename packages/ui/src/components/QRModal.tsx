'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { cn } from '../lib/cn';

interface QRPerson {
  name: string;
  qrImageUrl?: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
}

interface QRModalProps {
  groom: QRPerson;
  bride: QRPerson;
  onClose: () => void;
}

type Tab = 'groom' | 'bride';

function FakeQR({ name }: { name: string }) {
  return (
    <div
      className="flex h-48 w-48 flex-col items-center justify-center rounded-lg bg-white p-2 shadow-inner"
      aria-label={`QR code cho ${name}`}
    >
      {/* QR giả lập bằng CSS grid */}
      <div
        className="grid gap-px"
        style={{ gridTemplateColumns: 'repeat(11, 1fr)', width: 160, height: 160 }}
      >
        {Array.from({ length: 121 }, (_, i) => {
          // Giữ các góc nhìn như QR thật
          const row = Math.floor(i / 11);
          const col = i % 11;
          const inCorner =
            (row < 3 && col < 3) ||
            (row < 3 && col > 7) ||
            (row > 7 && col < 3);
          const isBorder =
            (row === 0 || row === 10 || col === 0 || col === 10) ||
            (row < 3 && (col === 2 || col === 8)) ||
            (col < 3 && row === 2) ||
            (row > 7 && col < 3 && (row === 8 || col === 2));
          const isDark = inCorner || isBorder || (Math.sin(i * 7.3 + name.length) > 0.2);
          return (
            <div
              key={i}
              className={cn('rounded-sm', isDark ? 'bg-black' : 'bg-white')}
            />
          );
        })}
      </div>
      <p className="mt-1 text-center text-xs font-medium text-gray-500">Quét để chuyển khoản</p>
    </div>
  );
}

export function QRModal({ groom, bride, onClose }: QRModalProps) {
  const [tab, setTab] = useState<Tab>('groom');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const current = tab === 'groom' ? groom : bride;
  const label = tab === 'groom' ? 'Chú Rể' : 'Cô Dâu';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Phong bao mừng cưới"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-lg font-semibold">Mừng Cưới 🧧</h2>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2"
            aria-label="Đóng"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          {(['groom', 'bride'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                'flex-1 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none',
                tab === t
                  ? 'border-b-2 border-red-600 text-red-600'
                  : 'text-gray-500 hover:text-gray-800',
              )}
            >
              {t === 'groom' ? 'Chú Rể' : 'Cô Dâu'}
            </button>
          ))}
        </div>

        {/* Nội dung */}
        <div className="flex flex-col items-center gap-4 px-5 py-6">
          <p className="text-sm text-gray-500">{label}: {current.name}</p>

          {/* QR image hoặc QR giả */}
          <button
            className="transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2"
            aria-label="Bấm để phóng to QR"
            onClick={() => {
              if (current.qrImageUrl) window.open(current.qrImageUrl, '_blank');
            }}
          >
            {current.qrImageUrl ? (
              <div className="relative h-48 w-48 overflow-hidden rounded-lg shadow-md">
                <Image
                  src={current.qrImageUrl}
                  alt={`QR chuyển khoản ${current.name}`}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <FakeQR name={current.name} />
            )}
          </button>

          {/* Thông tin tài khoản */}
          <div className="w-full space-y-1 rounded-lg bg-gray-50 px-4 py-3 text-sm">
            {current.bankName && (
              <div className="flex justify-between">
                <span className="text-gray-500">Ngân hàng</span>
                <span className="font-medium">{current.bankName}</span>
              </div>
            )}
            {current.accountNumber && (
              <div className="flex justify-between">
                <span className="text-gray-500">Số TK</span>
                <span className="font-mono font-medium">{current.accountNumber}</span>
              </div>
            )}
            {current.accountName && (
              <div className="flex justify-between">
                <span className="text-gray-500">Chủ TK</span>
                <span className="font-medium">{current.accountName}</span>
              </div>
            )}
          </div>

          <p className="text-center text-xs text-gray-400">
            Bấm vào ảnh QR để phóng to
          </p>
        </div>
      </div>
    </div>
  );
}
