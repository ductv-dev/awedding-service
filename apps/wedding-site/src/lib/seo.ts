function normalizeUrl(value?: string) {
  if (!value) return undefined;
  const trimmed = value.replace(/\/$/, '');
  return /^https?:\/\//.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export const WEDDING_SITE_URL = (
  process.env.NEXT_PUBLIC_WEDDING_SITE_URL ||
  normalizeUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ||
  normalizeUrl(process.env.VERCEL_URL) ||
  'http://localhost:3001'
).replace(/\/$/, '');

export const WEDDING_SITE_NAME = 'aWedding Invite';
export const WEDDING_SITE_DESCRIPTION =
  'Thiệp cưới online với ảnh cưới, album, thời gian địa điểm, bản đồ, lời chúc và nhạc nền.';
