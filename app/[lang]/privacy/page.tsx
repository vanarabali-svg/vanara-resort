import type { Metadata } from 'next'
import SiteShell from '../../../components/SiteShell'
import { locales, normalizeLocale, type Locale } from '../../../lib/i18n'

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params
  const lang = normalizeLocale(raw)
  return {
    title: `Vanara Resort & Spa | Privacy Policy` ,
    description: 'How Vanara Resort & Spa collects, uses, and protects personal information.',
    alternates: {
      canonical: `/${lang}/privacy`,
      languages: { en: '/en/privacy', id: '/id/privacy', ru: '/ru/privacy', 'zh-CN': '/cn/privacy' },
    },
    openGraph: {
      title: 'Vanara Resort & Spa | Privacy Policy',
      description: 'How Vanara Resort & Spa collects, uses, and protects personal information.',
      url: `https://vanara.life/${lang}/privacy`,
    },
  }
}

type Section = {
  title: string
  paragraphs: string[]
  list?: string[]
}

const sections: Section[] = [
  {
    title: 'Information We Collect',
    paragraphs: ['We may collect the following types of information:'],
    list: [
      'Name, email address, and phone number',
      'Booking details and stay information',
      'Payment details (processed securely via third-party providers)',
      'Communication records (email, WhatsApp, or other channels)',
    ],
  },
  {
    title: 'How We Use Your Information',
    paragraphs: ['Your information is used to:'],
    list: [
      'Process reservations and payments',
      'Provide and personalize your stay experience',
      'Communicate before, during, and after your stay',
      'Improve our services and guest experience',
    ],
  },
  {
    title: 'Data Sharing',
    paragraphs: [
      'We do not sell or rent your personal data.',
      'Your information may be shared only when necessary with:',
    ],
    list: [
      'Payment processing providers',
      'Booking platforms (e.g., OTA partners)',
      'Service providers supporting your stay',
      'Legal authorities when required by law',
    ],
  },
  {
    title: 'Data Security',
    paragraphs: [
      'We take reasonable measures to protect your personal information from unauthorized access, misuse, or disclosure.',
      'While we strive to safeguard your data, no system can guarantee absolute security.',
    ],
  },
  {
    title: 'Marketing Communication',
    paragraphs: [
      'With your consent, we may send updates, offers, or newsletters related to Vanara Resort & Spa.',
      'You may unsubscribe at any time using the link provided in our communications or by contacting us directly.',
    ],
  },
  {
    title: 'Cookies',
    paragraphs: ['Our website may use cookies and similar technologies to:'],
    list: [
      'Improve website functionality',
      'Analyze website traffic and usage',
      'Enhance user experience',
      'You may disable cookies through your browser settings if preferred.',
    ],
  },
  {
    title: 'Your Rights',
    paragraphs: ['Depending on applicable laws, you may have the right to:'],
    list: [
      'Access your personal data',
      'Request correction or updates',
      'Request deletion of your data',
      'To exercise these rights, please contact us using the details below.',
    ],
  },
  {
    title: 'Data Retention',
    paragraphs: [
      'We retain personal data only as long as necessary for operational, legal, and service purposes.',
    ],
  },
  {
    title: 'Third-Party Links',
    paragraphs: [
      'Our website may contain links to third-party websites.',
      'We are not responsible for the privacy practices or content of these external sites.',
    ],
  },
]

function ContentPage() {
  return (
    <main className="legalPage">
      <div className="container">
        <div className="legalHero">
          <div className="legalMeta">Vanara Resort & Spa</div>
          <h1 className="h2">Privacy Policy</h1>
          <p className="legalIntro">
            Vanara Resort & Spa respects your privacy and is committed to protecting your personal information.
            This Privacy Policy explains how we collect, use, and safeguard your data when you interact with us through our website,
            booking channels, or during your stay.
          </p>
        </div>

        {sections.map((section) => (
          <section className="legalSection" key={section.title}>
            <h2 className="legalSectionTitle">{section.title}</h2>
            {section.paragraphs.map((paragraph, index) => (
              <p key={`${section.title}-p-${index}`}>{paragraph}</p>
            ))}
            {section.list ? (
              <ul className="legalList">
                {section.list.map((item, index) => (
                  <li key={`${section.title}-li-${index}`}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        <section className="legalSection">
          <h2 className="legalSectionTitle">Contact</h2>
          <div className="legalContactCard">
            <p>Vanara Resort & Spa</p>
            <p>info@vanara.life</p>
            <p>+62 813 5356 240</p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params
  const lang = normalizeLocale(raw) as Locale
  return <SiteShell lang={lang}><ContentPage /></SiteShell>
}
