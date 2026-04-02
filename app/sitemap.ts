import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const langs = ['en', 'id', 'ru', 'cn']
  const paths = ['', '/accommodation', '/kokoon', '/weddings', '/privacy', '/terms', '/legal']

  return langs.flatMap((lang) =>
    paths.map((path) => ({
      url: `https://vanara.life/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: path === '' ? (lang === 'en' ? 1 : 0.9) : 0.8,
    }))
  )
}
