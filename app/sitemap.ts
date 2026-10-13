import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap { return [{ url: 'https://www.clearstone-ventures.com', changeFrequency: 'monthly', priority: 1 }]; }
