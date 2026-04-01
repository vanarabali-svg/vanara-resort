const sections = [
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
    ],
    tail: ['You may disable cookies through your browser settings if preferred.'],
  },
  {
    title: 'Your Rights',
    paragraphs: ['Depending on applicable laws, you may have the right to:'],
    list: [
      'Access your personal data',
      'Request correction or updates',
      'Request deletion of your data',
    ],
    tail: ['To exercise these rights, please contact us using the details below.'],
  },
  {
    title: 'Data Retention',
    paragraphs: ['We retain personal data only as long as necessary for operational, legal, and service purposes.'],
  },
  {
    title: 'Third-Party Links',
    paragraphs: [
      'Our website may contain links to third-party websites.',
      'We are not responsible for the privacy practices or content of these external sites.',
    ],
  },
  {
    title: 'Contact',
    paragraphs: [
      'For any privacy-related inquiries or requests, please contact:',
      'Vanara Resort & Spa',
      'info@vanara.life',
      '+62 813 5356 240',
    ],
  },
] as const

export default function PrivacyPage() {
  return (
    <main className="legalPage">
      <div className="container">
        <div className="legalMeta">Vanara Resort &amp; Spa</div>
        <h1 className="h2">Privacy Policy</h1>
        <p className="legalIntro">
          Vanara Resort &amp; Spa respects your privacy and is committed to protecting your personal information.
          This Privacy Policy explains how we collect, use, and safeguard your data when you interact with us through our website,
          booking channels, or during your stay.
        </p>

        {sections.map((section) => (
          <section className="legalSection" key={section.title}>
            <h2 className="legalSectionTitle">{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.list ? (
              <ul className="legalList">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {section.tail?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
    </main>
  )
}
