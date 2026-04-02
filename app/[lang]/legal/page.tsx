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
    title: `Vanara Resort & Spa | Legal Notice` ,
    description: 'Legal information, ownership details, and website use terms for Vanara Resort & Spa.',
    alternates: {
      canonical: `/${lang}/legal`,
      languages: { en: '/en/legal', id: '/id/legal', ru: '/ru/legal', 'zh-CN': '/cn/legal' },
    },
    openGraph: {
      title: 'Vanara Resort & Spa | Legal Notice',
      description: 'Legal information, ownership details, and website use terms for Vanara Resort & Spa.',
      url: `https://vanara.life/${lang}/legal`,
    },
  }
}

type Section = {
  title: string
  paragraphs: string[]
}

const sections: Section[] = [
  {
    title: 'Company Information',
    paragraphs: [
      'Vanara Resort & Spa',
      'Operated by PT. UWSUN ECO RESORT',
      'Address:',
      'Jl. Batu Nunggalan No.9',
      'Pecatu, Kuta Selatan',
      'Badung, Bali 80361',
      'Indonesia',
      'Phone / WhatsApp: +62 813 5356 240',
      'Email: info@vanara.life',
      'Website: www.vanara.life',
    ],
  },
  {
    title: 'Website Ownership',
    paragraphs: [
      'This website is owned and operated by PT. UWSUN ECO RESORT.',
      'By accessing and using this website, you agree to comply with applicable laws and these legal terms.',
    ],
  },
  {
    title: 'Intellectual Property',
    paragraphs: [
      'All content on this website, including but not limited to text, images, logos, design, and branding, is the property of Vanara Resort & Spa unless otherwise stated.',
      'Any reproduction, distribution, or use without prior written consent is strictly prohibited.',
    ],
  },
  {
    title: 'Accuracy of Information',
    paragraphs: [
      'While we strive to ensure that all information on this website is accurate and up to date, Vanara Resort & Spa does not guarantee completeness or accuracy at all times.',
      'Details such as pricing, availability, services, and facilities may change without prior notice.',
    ],
  },
  {
    title: 'Limitation of Liability',
    paragraphs: [
      'Vanara Resort & Spa shall not be held liable for any direct or indirect damages arising from the use of this website or reliance on its content.',
      'This includes, but is not limited to, technical issues, inaccuracies, or temporary unavailability of the website.',
    ],
  },
  {
    title: 'External Links',
    paragraphs: [
      'This website may contain links to third-party websites.',
      'Vanara Resort & Spa is not responsible for the content, accuracy, or practices of these external sites.',
    ],
  },
  {
    title: 'Governing Law',
    paragraphs: [
      'This Legal Notice is governed by and interpreted in accordance with the laws of the Republic of Indonesia.',
    ],
  },
]

function ContentPage() {
  return (
    <main className="legalPage">
      <div className="container">
        <div className="legalHero">
          <div className="legalMeta">Vanara Resort & Spa</div>
          <h1 className="h2">Legal Notice</h1>
          <p className="legalIntro">
            This page outlines the legal information, ownership details, and general terms governing the use of this website.
          </p>
        </div>

        {sections.map((section) => (
          <section className="legalSection" key={section.title}>
            <h2 className="legalSectionTitle">{section.title}</h2>
            {section.paragraphs.map((paragraph, index) => (
              <p key={`${section.title}-p-${index}`}>{paragraph}</p>
            ))}
          </section>
        ))}

        <section className="legalSection">
          <h2 className="legalSectionTitle">Contact</h2>
          <div className="legalContactCard">
            <p>For any legal or general inquiries, please contact:</p>
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
