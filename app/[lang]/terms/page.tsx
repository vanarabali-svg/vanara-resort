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
    title: `Vanara Resort & Spa | Terms & Conditions` ,
    description: 'Terms governing reservations, payments, check-in, occupancy, and use of Vanara Resort & Spa services.',
    alternates: {
      canonical: `/${lang}/terms`,
      languages: { en: '/en/terms', id: '/id/terms', ru: '/ru/terms', 'zh-CN': '/cn/terms' },
    },
    openGraph: {
      title: 'Vanara Resort & Spa | Terms & Conditions',
      description: 'Terms governing reservations, payments, check-in, occupancy, and use of Vanara Resort & Spa services.',
      url: `https://vanara.life/${lang}/terms`,
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
    title: 'Reservations & Payment',
    paragraphs: [
      'All reservations must be guaranteed with valid payment.',
      'For direct bookings, full payment is required to confirm the reservation.',
      'For bookings made through third-party platforms (OTA), payment and cancellation terms follow the respective platform policies.',
      'All transactions are processed in Indonesian Rupiah (IDR).',
    ],
  },
  {
    title: 'Pre-Arrival & Confirmation',
    paragraphs: [
      'All booking inquiries will be responded to within 24 hours.',
      'A confirmation email will be issued once the reservation is completed.',
    ],
  },
  {
    title: 'Booking Channels',
    paragraphs: [
      'Vanara Resort & Spa accepts reservations through:',
      'Reservations made through unofficial or unverified third-party platforms may not be recognized by the resort.',
      'Guests are encouraged to book through official or trusted channels to ensure a valid reservation.',
    ],
    list: [
      'Official website (www.vanara.life)',
      'Verified online travel agencies (including Booking.com, Expedia, Trip.com, and other authorized partners)',
    ],
  },
  {
    title: 'Third-Party Bookings',
    paragraphs: [
      'If a reservation is made on behalf of another guest, prior notification is required to arrange billing authorization.',
    ],
  },
  {
    title: 'Rates',
    paragraphs: [
      'All rates are quoted in Indonesian Rupiah (IDR) and include breakfast unless otherwise stated.',
      'Rates may vary based on availability, season, and promotional offers.',
    ],
  },
  {
    title: 'Check-in & Check-out',
    paragraphs: [
      'Check-in: 15:00',
      'Check-out: 12:00',
      'Early check-in and late check-out are subject to availability.',
    ],
  },
  {
    title: 'Late Check-out Policy',
    paragraphs: [],
    list: [
      'Until 16:00: Subject to availability',
      'After 16:00: 50% of nightly rate',
      'After 20:00: Full nightly rate',
    ],
  },
  {
    title: 'Occupancy & Children Policy',
    paragraphs: [
      'Each villa has a maximum occupancy limit.',
      'No extra beds are provided.',
    ],
    list: [
      'Children under 6 years: Complimentary (sharing existing bedding)',
      'Children 6–11 years: IDR 450,000 per night (including breakfast)',
      '12 years and above: Considered adults',
      'Additional adult: IDR 900,000 per night',
    ],
  },
  {
    title: 'Cancellation & No-Show',
    paragraphs: [
      'Direct Bookings:',
    ],
    list: [
      'Free cancellation up to 72 hours before arrival',
      'Late cancellation or no-show: 1 night charge',
      'Non-Refundable Bookings: Full payment required upon booking',
      'No refund for cancellation, modification, or no-show',
      'All times are based on local time (WITA).',
    ],
  },
  {
    title: 'Guest Conduct',
    paragraphs: [
      'Guests are expected to respect the privacy and comfort of others.',
      'Vanara reserves the right to refuse service or terminate a stay in cases of:',
    ],
    list: [
      'Excessive noise',
      'Disruptive behavior',
      'Damage to property',
    ],
  },
  {
    title: 'Smoking Policy',
    paragraphs: [
      'All villas are non-smoking.',
      'Smoking is permitted only in designated outdoor areas.',
      'A cleaning fee applies for violations.',
    ],
  },
  {
    title: 'Alcohol Policy',
    paragraphs: [
      'Alcoholic beverages are served only to guests aged 18 years and above.',
      'Corkage fees apply for outside beverages.',
    ],
  },
  {
    title: 'Pet Policy',
    paragraphs: [
      'We welcome dogs and cats as part of your stay at Vanara.',
      'To ensure comfort for all guests, the following guidelines apply:',
      'A cleaning and/or repair fee will apply for any damage caused by pets.',
      'Vanara reserves the right to request removal of pets that disrupt the safety or comfort of other guests.',
    ],
    list: [
      'Maximum 2 pets per villa',
      'Maximum weight: 17 kg per pet',
      'Pets must be supervised at all times',
      'Pets must be on a leash or in a carrier in public areas',
      'Pets are not allowed in the main swimming pool',
      'Pets are not permitted on furniture or dining surfaces',
      'Owners are responsible for cleaning after their pets',
      'Excessive noise or aggressive behavior is not permitted',
    ],
  },
  {
    title: 'Liability',
    paragraphs: [
      'Guests acknowledge that certain areas of the resort, including natural landscapes and cliffside environments, require personal awareness and care.',
      'Vanara Resort & Spa shall not be held liable for accidents, injuries, or health-related issues occurring during the stay, except where required by applicable law.',
      'Vanara Resort & Spa is not responsible for loss, damage, or theft of personal belongings. Guests are encouraged to use in-room safes for valuables.',
    ],
  },
  {
    title: 'Force Majeure',
    paragraphs: [
      'The resort is not liable for failure to perform obligations due to events beyond its control, including natural disasters, government restrictions, or unforeseen circumstances.',
    ],
  },
  {
    title: 'Changes & Amendments',
    paragraphs: [
      'Vanara reserves the right to update these terms and conditions at any time without prior notice.',
    ],
  },
]

function ContentPage() {
  return (
    <main className="legalPage">
      <div className="container">
        <div className="legalHero">
          <div className="legalMeta">Vanara Resort & Spa</div>
          <h1 className="h2">Terms & Conditions</h1>
          <p className="legalIntro">
            All terms and conditions apply to bookings made through www.vanara.life and all official booking channels.
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
      </div>
    </main>
  )
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params
  const lang = normalizeLocale(raw) as Locale
  return <SiteShell lang={lang}><ContentPage /></SiteShell>
}
