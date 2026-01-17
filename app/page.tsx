import Link from "next/link"

export default function HomePage() {
  return (
    <main className="home">
      {/* HERO (video optional) */}
      <section className="hero">
        {/* If you have /public/hero.mp4 it will play. If not, it falls back to image */}
        <video className="heroVideo" autoPlay muted loop playsInline>
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        <div
          className="heroPoster"
          aria-hidden="true"
          style={{ backgroundImage: "url(/img1.jpg)" }}
        />

        <div className="heroShade" />

        <div className="heroContent">
          <div className="container">
            <div className="heroKicker">ULUWATU · BALI</div>
            <h1 className="heroH1">Vanara Resort & Spa</h1>
            <p className="heroP">
              Nature-first quiet luxury above the tide — warm sand tones, cool water, and space to breathe.
            </p>

            <div className="heroLinks">
              <Link className="heroLink" href="/accommodation">Explore accommodation</Link>
              <span style={{ display: "inline-block", width: 18 }} />
              <Link className="heroLink" href="/book">Request access</Link>
            </div>

            <div className="heroHint">Scroll to arrive</div>
          </div>
        </div>
      </section>

      {/* Editorial intro */}
      <section className="sectionA2">
        <div className="container twoColA">
          <div>
            <div className="kicker">THE ESSENCE</div>
            <h1 style={{ fontSize: 44, marginTop: 10 }}>
              Quiet luxury, without performance
            </h1>
          </div>

          <div className="editorialA">
            <p>
              Vanara is designed to be felt — through ocean air, warm textures, and silence that restores.
              Space is not empty here. It is the experience.
            </p>
            <p>
              Elevated above the sea in Uluwatu, Vanara offers a slower rhythm: sunrise calm, midday stillness,
              and a sunset ritual that deepens into night.
            </p>
          </div>
        </div>
      </section>

      <div className="ruleA" />

      {/* Big image / gallery flow */}
      <section className="sectionA2">
        <div className="container">
          <div className="kicker">A GLIMPSE</div>
          <div style={{ height: 18 }} />
          <div className="stackGallery">
            <div className="imageBlock" style={{ backgroundImage: "url(/img1.jpg)" }} />
            <div className="imageBlock" style={{ backgroundImage: "url(/img2.jpg)" }} />
            <div className="imageBlock" style={{ backgroundImage: "url(/img3.jpg)" }} />
          </div>
        </div>
      </section>

      {/* Minimal CTA */}
      <section className="sectionA2">
        <div className="container twoColA">
          <div>
            <div className="kicker">CONNECT</div>
            <h1 style={{ fontSize: 44, marginTop: 10 }}>Request access</h1>
          </div>

          <div className="editorialA">
            <p>
              Limited capacity. Private seating. Quiet by design.
            </p>
            <div style={{ marginTop: 18 }}>
              <Link className="softLinkA" href="/connect">Enquire →</Link>
              <span style={{ display: "inline-block", width: 18 }} />
              <Link className="softLinkA" href="/book">Reserve →</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
