import type { WeddingConfig } from '@workspace/types';

export async function getWeddingData(slug: string): Promise<WeddingConfig | null> {
  try {
    // Dynamic import từ file JSON tĩnh theo slug
    const data = await import(`../data/${slug}.json`);
    return data.default as WeddingConfig;
  } catch {
    return null;
  }
}
