import Link from 'next/link'
import { getDictionary, type Locale, withLang } from '../lib/i18n'

export default function InfoPage({ lang, page }: { lang: Locale; page: 'kokoon' | 'weddingsPage' }) {
  const t = getDictionary(lang)
  const content = t.home.pages[page]
  const isWeddings = page === 'weddingsPage'

  return (
    <div className="legalPage">
      <div className="container">
        <div className="legalHero">
          <div className="legalMeta">{content.eyebrow}</div>
          <h1 className="h2">{content.title}</h1>
          <p className="legalIntro">{content.p1}</p>
        </div>

        <section className="legalSection">
          <h2 className="legalSectionTitle">{content.title}</h2>
          <p>{content.p2}</p>
          {isWeddings && <p>{(content as any).p3}</p>}
        </section>

        <section className="legalSection">
          <div className="legalContactCard">
            <p><strong>Vanara Resort &amp; Spa</strong></p>
            <p>{content.cta}</p>
            <p>
              <Link className="textCta" href={withLang(lang, '/connect')}>
                {isWeddings ? t.home.weddingsCta : t.home.kokoonCta}
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
