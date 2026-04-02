import type { Metadata } from 'next'
import InfoPage from '../../../components/InfoPage'
import SiteShell from '../../../components/SiteShell'
import { getDictionary, locales, normalizeLocale, type Locale } from '../../../lib/i18n'

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params
  const lang = normalizeLocale(raw)
  const t = getDictionary(lang)
  return {
    title: `Vanara Resort & Spa | ${t.home.pages.kokoon.title}`,
    description: t.home.pages.kokoon.p1,
    alternates: {
      canonical: `/${lang}/kokoon`,
      languages: { en: '/en/kokoon', id: '/id/kokoon', ru: '/ru/kokoon', 'zh-CN': '/cn/kokoon' },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params
  const lang = normalizeLocale(raw) as Locale
  return <SiteShell lang={lang}><InfoPage lang={lang} page="kokoon" /></SiteShell>
}
