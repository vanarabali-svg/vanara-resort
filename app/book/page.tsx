export default function BookPage() {
  return (
    <main className="section">
      <div className="container">
        <div className="kicker">Book</div>
        <div className="hr" style={{ maxWidth: 160 }} />
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 54 }}>Reserve your stay</h1>
        <p style={{ marginTop: 14, lineHeight: 1.9, maxWidth: 720 }}>
          Next step: we’ll connect your booking engine (link or embedded widget).
        </p>
      </div>
    </main>
  )
}
