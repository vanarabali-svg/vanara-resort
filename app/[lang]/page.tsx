import type { Metadata } from 'next'
import HomePage from '../../components/HomePage'
import SiteShell from '../../components/SiteShell'
import { getDictionary, locales, normalizeLocale, type Locale } from '../../lib/i18n'

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params
  const lang = normalizeLocale(raw)
  const t = getDictionary(lang)
  return {
    title: `Vanara Resort & Spa | ${t.home.introTitle}`,
    description: t.home.introP1,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: '/en',
        id: '/id',
        ru: '/ru',
        'zh-CN': '/cn',
      },
    },
    openGraph: {
      title: 'Vanara Resort & Spa',
      description: t.home.introP1,
      url: `https://vanara.life/${lang}`,
    },
  }
}

export default async function LocaleHome({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params
  const lang = normalizeLocale(raw) as Locale
  return <SiteShell lang={lang}><HomePage lang={lang} /></SiteShell>
}
