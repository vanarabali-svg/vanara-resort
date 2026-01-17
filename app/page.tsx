import Link from "next/link";

export default function HomePage() {
  return (
    <main className="home">
      {/* HERO */}
      <section className="hero">
        {/* Video (if /public/hero.mp4 exists). If not, keep the <video> and also add fallback poster. */}
        <video
          className="heroVideo"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/img1.jpg"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* If video cannot load, this image will still show through as the poster */}
        <div className="heroShade" />

        <div className="heroContent">
          <div className="container">
            <div className="heroKicker">VANARA • ULUWATU</div>

            <h1 className="heroH1">
              Vanara Ocean Sanctuary
            </h1>

            <p className="heroP">
              A quiet place above the tide — shaped by stone, water, wind, and time.
            </p>

            <div className="heroLinks">
              <Link className="heroLink" href="/accommodation">
                Explore accommodation →
              </Link>
              <span style={{ display: "inline-block", width: 18 }} />
              <Link className="heroLink" href="/experience">
                Discover the experience →
              </Link>
            </div>

            <div style={{ marginTop: 18 }}>
              <span style={{
                fontSize: 11,
                letterSpacing: 3.2,
                textTransform: "uppercase",
                color: "rgba(255,255,255,.62)"
              }}>
                Scroll to arrive
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL INTRO */}
      <section className="editorial">
        <div className="container editorialInner">
          <p>
            Vanara is not a beach club. It is a sanctuary — calm, minimal, and intentional.
          </p>
          <p>
            Hidden along the cliffs of Uluwatu, it exists for those who seek stillness rather than spectacle —
            presence rather than noise.
          </p>
          <p className="quietLine">Limited capacity. Quiet by design.</p>
        </div>
      </section>

      {/* FLOW GALLERY — Aman style (big images, no slider) */}
      <section className="imageStrip">
        <div className="container">
          <div className="kicker" style={{ marginBottom: 18 }}>THE FLOW</div>

          <div style={{ display: "grid", gap: 16 }}>
            <div className="imageBlock" style={{ backgroundImage: "url(/img1.jpg)" }} />
            <div className="imageBlock" style={{ backgroundImage: "url(/img2.jpg)" }} />
            <div className="imageBlock" style={{ backgroundImage: "url(/img3.jpg)" }} />
          </div>
        </div>
      </section>

      {/* TWO-COL EDITORIAL */}
      <section className="sectionA2">
        <div className="container twoColA">
          <div>
            <div className="kicker">THE ATMOSPHERE</div>
            <h1 style={{ fontSize: 44, marginTop: 10, fontFamily: "var(--serif)", fontWeight: 500 }}>
              Atmosphere, not volume
            </h1>
          </div>

          <div className="editorialA">
            <p>
              The ocean leads. Music follows. Light is soft. Space is generous.
            </p>
            <p>
              Everything is designed to feel effortless — refined, quiet, and deeply present.
            </p>

            <div style={{ marginTop: 22 }}>
              <Link className="softLinkA" href="/connect">Connect →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="closing">
        <div className="container closingInner">
          <div className="closingLine">
            For those who listen to the ocean — not over it.
          </div>
          <Link href="/book" className="softLinkA">
            Request access →
          </Link>
        </div>
      </section>
    </main>
  );
}
