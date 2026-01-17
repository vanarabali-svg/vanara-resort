import Link from "next/link";

export default function HomePage() {
  return (
    <main className="home">
      {/* HERO */}
      <section className="hero">
        <video className="heroVideo" autoPlay muted loop playsInline preload="metadata">
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        <div className="heroShade" />

        <div className="heroContent">
          <div className="container">
            <div className="heroKicker">VANARA • ULUWATU</div>
            <h1 className="heroH1">Vanara Ocean Sanctuary</h1>
            <p className="heroP">A quiet place above the tide.</p>

            <div className="heroLinks">
              <Link href="/experience" className="heroLink">
                Explore the experience
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL INTRO */}
      <section className="editorial">
        <div className="container editorialInner">
          <p>
            Vanara is not a beach club. It is a sanctuary shaped by ocean, stone,
            wind, and time.
          </p>
          <p>
            Hidden along the cliffs of Uluwatu, Vanara exists for those who seek
            stillness rather than spectacle — presence rather than noise.
          </p>
          <p className="quietLine">Limited capacity. Quiet by design.</p>
        </div>
      </section>

      {/* SINGLE FULL-WIDTH IMAGE STRIP (minimal) */}
      <section className="imageStrip">
        <div className="stripImage" style={{ backgroundImage: "url(/img1.jpg)" }} />
      </section>

      {/* FINAL SOFT CTA */}
      <section className="closing">
        <div className="container closingInner">
          <div className="closingLine">For those who listen to the ocean — not over it.</div>
          <Link href="/connect" className="heroLink">
            Request access
          </Link>
        </div>
      </section>
    </main>
  );
}
