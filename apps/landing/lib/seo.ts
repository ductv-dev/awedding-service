function normalizeUrl(value?: string) {
  if (!value) return undefined;
  const trimmed = value.replace(/\/$/, '');
  return /^https?:\/\//.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  normalizeUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ||
  normalizeUrl(process.env.VERCEL_URL) ||
  'http://localhost:3000'
).replace(/\/$/, '');

export const SITE_NAME = 'aWedding';
export const SITE_TITLE = 'aWedding - Thiệp cưới online đẹp, nhanh, chỉ từ 99k';
export const SITE_DESCRIPTION =
  'Tạo website thiệp cưới online với subdomain riêng, mẫu giao diện đẹp, album ảnh, nhạc nền, bản đồ và link mời cá nhân hóa.';
