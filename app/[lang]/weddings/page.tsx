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
    title: `Vanara Resort & Spa | ${t.home.pages.weddingsPage.title}`,
    description: t.home.pages.weddingsPage.p1,
    alternates: {
      canonical: `/${lang}/weddings`,
      languages: { en: '/en/weddings', id: '/id/weddings', ru: '/ru/weddings', 'zh-CN': '/cn/weddings' },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params
  const lang = normalizeLocale(raw) as Locale
  return <SiteShell lang={lang}><InfoPage lang={lang} page="weddingsPage" /></SiteShell>
}
