import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Vanara Resort & Spa',
  description:
    'Vanara is a coastal sanctuary in Uluwatu, Bali — minimalist luxury shaped by silence, horizon, and honest materials.',
}

export default function AboutPage() {
  return (
    <main className="home">
      {/* HERO */}
      <section className="hero hero--short">
        <img className="heroImage" src="/about-1.jpg" alt="Ocean horizon at Vanara" />
        <div className="heroShade" />

        <div className="heroContent">
          <span className="heroKicker">ABOUT</span>
          <h1 className="heroTitle">A Coastal Sanctuary</h1>
          <p className="heroSub">
            Minimalist luxury above the ocean — built around silence, horizon, and honest materials.
          </p>

          <div className="heroLinks">
            <a className="heroLink" href="#story">Story</a>
            <a className="heroLink" href="#design">Design</a>
            <a className="heroLink" href="#values">Values</a>
            <a className="heroLink" href="#team">Team</a>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="section" id="story">
        <div className="container">
          <div className="eyebrow">THE RESORT</div>
          <h2 className="h2">A sanctuary of quiet strength</h2>

          <div className="copy">
            <p>
              Set on the cliffs of Uluwatu, Vanara is designed as a retreat where architecture recedes — and the sea
              becomes the main event. Spaces are open, calm, and intentionally unhurried.
            </p>
            <p>
              The resort unfolds as a sequence of light and shade: shaded courts, open-air pathways, restorative spaces,
              and private villas that hold the sound of the tide.
            </p>
            <p>
              Luxury here is not loud. It lives in spaciousness, in quiet service, and in the simple feeling of time
              slowing down.
            </p>
          </div>

          <div className="rule" />
        </div>
      </section>

      {/* DESIGN */}
      <section className="section" id="design">
        <div className="container">
          <div className="split">
            <div>
              <div className="eyebrow">DESIGN</div>
              <h2 className="h2">Honest materials, calm lines</h2>

              <div className="copy">
                <p>
                  Vanara is shaped by a restrained palette — warm stone, soft timber, linen, and shadow. Interiors stay
                  quiet so nature can speak: wind through palms, the ocean’s rhythm, and changing light.
                </p>
                <p>
                  Every space is composed for ease: gentle transitions between inside and outside, discreet lighting,
                  and framed views that invite you to pause.
                </p>
              </div>

              <div className="eyebrow" style={{ marginTop: 26 }}>DETAILS</div>
              <ul className="bullets">
                <li>Natural textures and warm, neutral tones</li>
                <li>Open-air living designed around sea breeze</li>
                <li>Quiet acoustics — fewer hard edges, more softness</li>
                <li>Views treated as architecture, not decoration</li>
              </ul>

              <a className="textCta" href="/accommodation">Explore villas</a>
            </div>

            <div className="imagePlaceholder" aria-label="Architecture image">
              <img className="experienceImg" src="/about-2.jpg" alt="Architecture and texture" />
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section" id="values">
        <div className="container">
          <div className="eyebrow">VALUES</div>
          <h3 className="h3">The Vanara way</h3>

          <div className="grid3">
            <div className="card" style={{ cursor: 'default' }}>
              <div className="cardLabel">STILLNESS</div>
              <h3 className="cardTitle">Space to exhale</h3>
              <p className="cardText">
                Calm is designed in — uncluttered rooms, softened sound, and time left intentionally open.
              </p>
              <span className="cardLink">Unhurried</span>
            </div>

            <div className="card" style={{ cursor: 'default' }}>
              <div className="cardLabel">CRAFT</div>
              <h3 className="cardTitle">Made with intention</h3>
              <p className="cardText">
                Honest materials, careful finishing, and a subtle hand in every detail — quiet, not performative.
              </p>
              <span className="cardLink">Considered</span>
            </div>

            <div className="card" style={{ cursor: 'default' }}>
              <div className="cardLabel">DISCRETION</div>
              <h3 className="cardTitle">Service without noise</h3>
              <p className="cardText">
                Thoughtful hospitality that anticipates, then steps back — refined pacing, gentle presence.
              </p>
              <span className="cardLink">Quietly precise</span>
            </div>
          </div>
        </div>
      </section>

            {/* TEAM */}
      <section className="section" id="team" style={{ paddingTop: 92, paddingBottom: 92 }}>
        <div className="container">
          <div className="split" style={{ alignItems: 'center', gap: 40 }}>
            <div>
              <div className="eyebrow">THE RESORT</div>
              <h2 className="h2">Quiet people. Quiet excellence.</h2>

              <div className="copy" style={{ maxWidth: 560 }}>
                <p>
                  Vanara is cared for by a small team with calm attention — present when you need us, invisible when you
                  don’t.
                </p>
                <p style={{ marginTop: 18, opacity: 0.9 }}>
                  Warmth, discretion, and an unhurried rhythm — so your days feel spacious.
                </p>
              </div>

              <div style={{ height: 18 }} />

              <div className="smallprint" style={{ maxWidth: 520 }}>
                Add your team photo as <strong>/team.jpg</strong> in the <strong>/public</strong> folder.
              </div>
            </div>

            <div className="imagePlaceholder" aria-label="Team photo" style={{ minHeight: 520 }}>
              <img
                className="experienceImg"
                src="/team.jpg"
                alt="Vanara team"
                loading="lazy"
                style={{ borderRadius: 22, objectFit: 'cover', height: '100%', width: '100%' }}
              />
            </div>
          </div>
        </div>
      </section>

{/* GLIMPSES */}
      <section className="section sectionGallery">
        <div className="container">
          <div className="galleryHeader">
            <div className="eyebrow">GLIMPSES</div>
            <h3 className="h3">Light, water, and texture</h3>
          </div>

          <div className="galleryStack">
            <figure className="galleryItem ocean is-left">
              <img src="/about-1.jpg" alt="Ocean view" loading="lazy" />
            </figure>

            <figure className="galleryItem villa is-right">
              <img src="/about-2.jpg" alt="Villa atmosphere" loading="lazy" />
            </figure>

            <figure className="galleryItem dine is-center">
              <img src="/about-3.jpg" alt="Dining atmosphere" loading="lazy" />
            </figure>
          </div>

          <div className="copy" style={{ marginTop: 22 }}>
            <p>
              A palette of sand, stone, and sea. Minimalism here is not an aesthetic — it’s a way to create room for
              breath, light, and the quiet rhythm of tides.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="grid2">
            <div className="panel">
              <div className="eyebrow">ARRIVAL</div>
              <h3 className="h3">Plan your stay</h3>
              <p className="panelText">
                For transfers, timings, and tailored itineraries, our team will arrange the details with calm
                precision — so the day feels effortless.
              </p>
              <a className="textCta" href="/connect">Connect with us</a>
            </div>

            <div className="panel">
              <div className="eyebrow">RESERVATIONS</div>
              <h3 className="h3">Reserve, quietly</h3>
              <p className="panelText">
                Choose your dates and villa preference, then let everything else fall away — ocean, light, and a slower
                rhythm.
              </p>
              <a className="textCta" href="/book">Reserve</a>
              <div className="smallprint">If you need guidance, we’re happy to recommend the right villa and timing.</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
