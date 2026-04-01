import Link from 'next/link'

export default function FactsheetPage() {
  return (
    <main className="legalPage">
      <div className="container">
        <div className="legalHero">
          <div className="legalMeta">Vanara Resort & Spa</div>
          <h1 className="h2">Factsheet</h1>
          <p className="legalIntro">Download the Vanara Resort & Spa factsheet.</p>
        </div>
        <section className="legalSection">
          <Link className="textCta" href="/factsheet.pdf" target="_blank">Download Factsheet PDF</Link>
        </section>
      </div>
    </main>
  )
}
