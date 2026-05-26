const DEFAULT_WEDDING_SITE_URL = 'http://localhost:3001';

export const WEDDING_SITE_URL = (
  process.env.NEXT_PUBLIC_WEDDING_SITE_URL || DEFAULT_WEDDING_SITE_URL
).replace(/\/$/, '');

export function getDemoUrl(slug = 'demo') {
  return `${WEDDING_SITE_URL}/${slug.replace(/^\//, '')}`;
}
