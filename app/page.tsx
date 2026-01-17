import Link from "next/link"

export default function HomePage() {
  return (
    <main className="home">
      {/* HERO */}
      <section className="hero">
        <video
          className="heroVideo"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-poster.jpg"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        <div className="heroShade" />

        <div className="heroContent">
          <div className="container">
            <div className="heroKicker">ULUWATU · BALI</div>
            <h1 className="heroH1">Vanara Resort & Spa</h1>
            <p className="heroP">
              A nature-first sanctuary above the tide — warm stone, cool water,
              and space to breathe.
            </p>

            <div className="heroLinks">
              <Link className="heroLink" href="/accommodation">Explore accommodation</Link>
              <span />
              <Link className="heroLink" href="/book">Request access</Link>
            </div>

            <div className="heroHint">Scroll to arrive</div>
          </div>
        </div>
      </section>

      {/* EDITORIAL */}
      <section className="sectionA2">
        <div className="container twoColA">
          <div>
            <div className="kicker">THE ESSENCE</div>
            <h2 className="h2A">Quiet luxury, without performance</h2>
          </div>

          <div className="editorialA">
            <p>
              Vanara is not designed to impress. It is designed to restore —
              through silence, texture, and a slower rhythm of time.
            </p>
            <p>
              Elevated above the ocean in Uluwatu, days unfold gently,
              ending in a sunset that deepens rather than concludes.
            </p>
          </div>
        </div>
      </section>

      <div className="ruleA" />

      {/* GALLERY FLOW */}
      <section className="sectionA2">
        <div className="container">
          <div className="stackGallery">
            <div className="imageBlock" style={{ backgroundImage: "url(/img1.jpg)" }} />
            <div className="imageBlock" style={{ backgroundImage: "url(/img2.jpg)" }} />
            <div className="imageBlock" style={{ backgroundImage: "url(/img3.jpg)" }} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sectionA2">
        <div className="container twoColA">
          <div>
            <div className="kicker">CONNECT</div>
            <h2 className="h2A">Request access</h2>
          </div>

          <div className="editorialA">
            <p>
              Limited capacity. Private by design.
            </p>
            <Link className="softLinkA" href="/connect">Enquire →</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
