import type { Metadata } from 'next'
import { locales, normalizeLocale } from '../../../lib/i18n'

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params
  const lang = normalizeLocale(raw)
  return {
    title: 'Vanara Resort & Spa | Factsheet',
    description: 'Quick facts and contact information for Vanara Resort & Spa.',
    alternates: {
      canonical: `/${lang}/factsheet`,
      languages: { en: '/en/factsheet', id: '/id/factsheet', ru: '/ru/factsheet', 'zh-CN': '/cn/factsheet' },
    },
  }
}

export default function FactsheetPage() {
  return (
    <main className="legalPage">
      <div className="container">
        <div className="legalHero">
          <div className="legalMeta">Vanara Resort &amp; Spa</div>
          <h1 className="h2">Factsheet</h1>
          <p className="legalIntro">A quick overview of Vanara Resort &amp; Spa, its location, contact information, and guest-facing details.</p>
        </div>

        <section className="legalSection">
          <h2 className="legalSectionTitle">Property Overview</h2>
          <p>Vanara Resort &amp; Spa is a clifftop resort in Uluwatu, Bali, above the Indian Ocean and close to Nunggalan Beach.</p>
          <p>The resort offers contemporary villas, cliffside dining at Kokoon, curated experiences, and wedding settings above the ocean.</p>
        </section>

        <section className="legalSection">
          <h2 className="legalSectionTitle">Contact</h2>
          <div className="legalContactCard">
            <p><strong>Vanara Resort &amp; Spa</strong></p>
            <p>PT. UWSUN ECO RESORT</p>
            <p>Jl. Batu Nunggalan No.9, Pecatu, Uluwatu, Bali 80361</p>
            <p>Phone / WhatsApp: +62 813 5356 240</p>
            <p>Email: info@vanara.life</p>
            <p>Website: www.vanara.life</p>
          </div>
        </section>

        <section className="legalSection">
          <h2 className="legalSectionTitle">Guest Information</h2>
          <p>Check-in: 15:00</p>
          <p>Check-out: 12:00</p>
          <p>Direct bookings are available through the official Vanara booking page.</p>
        </section>
      </div>
    </main>
  )
}
