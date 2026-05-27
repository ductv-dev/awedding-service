import { SITE_URL } from './seo';

const DEFAULT_WEDDING_SITE_URL = 'http://localhost:3001';

export const WEDDING_SITE_URL = (
  process.env.NEXT_PUBLIC_WEDDING_SITE_URL || (SITE_URL === 'http://localhost:3000' ? DEFAULT_WEDDING_SITE_URL : SITE_URL)
).replace(/\/$/, '');

export function getDemoUrl(slug = 'demo') {
  let baseUrl = WEDDING_SITE_URL;

  if (typeof window !== 'undefined' && baseUrl.startsWith('http://localhost')) {
    const { hostname, origin } = window.location;
    baseUrl = hostname === 'localhost' || hostname === '127.0.0.1' ? DEFAULT_WEDDING_SITE_URL : origin;
  }

  return `${baseUrl}/${slug.replace(/^\//, '')}`;
}
