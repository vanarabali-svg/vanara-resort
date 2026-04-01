import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const langs = ['en', 'id', 'ru', 'cn']
  return langs.map((lang) => ({
    url: `https://vanara.life/${lang}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: lang === 'en' ? 1 : 0.9,
  }))
}
