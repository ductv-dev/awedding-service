import type { MetadataRoute } from 'next';
import { WEDDING_SITE_URL } from '@/lib/seo';

const slugs = ['demo', 'demo-red', 'demo-champagne', 'demo-sage', 'demo-blush', 'demo-ink'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return slugs.map((slug) => ({
    url: `${WEDDING_SITE_URL}/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: slug === 'demo' ? 0.9 : 0.7,
  }));
}
