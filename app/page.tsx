export default function HomePage() {
  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <video className="heroMedia" src="/hero.mp4" autoPlay muted loop playsInline />
        <div className="heroShade" />

        <div className="heroContent">
          <div className="heroKicker">ULUWATU · BALI</div>

          <h1 className="heroTitle">Vanara Resort &amp; Spa</h1>

          <p className="heroSub">
            Minimalist luxury above the ocean — a sanctuary shaped by nature.
          </p>

          <div className="heroLinks">
            <a className="heroLink" href="/accommodation">Explore villas</a>
            <a className="heroLink" href="/experience">Discover experiences</a>
            <a className="heroLink" href="/spa">Spa &amp; rituals</a>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="section sectionIntro">
        <div className="container">
          <div className="eyebrow">THE RESORT</div>
          <h2 className="h2">A sanctuary of quiet strength</h2>

          <div className="copy">
            <p>
              Perched above the Indian Ocean, Vanara is shaped by wind, stone, and warm light — a retreat where
              architecture dissolves into landscape and time slows to a breath.
            </p>
            <p>
              Private villas open to sea air; pathways lead to shaded courts, cliffside pools, and restorative spaces.
              Everything is intentional: calm lines, natural textures, and moments of silence between waves.
            </p>
            <p>
              Here, luxury is not loud. It is felt in spaciousness, in careful service, and in the way each view is
              framed — sunrise over water, afternoon shade across stone, and evenings that arrive softly.
            </p>
          </div>

          <div className="rule" />
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="section">
        <div className="container">
          <div className="eyebrow">PHILOSOPHY</div>
          <h3 className="h3">Designed for stillness</h3>
          <div className="copy">
            <p>
              Vanara is built around a simple idea: the ocean is the main event. Interiors remain quiet so nature can
              speak — warm neutrals, natural textures, and soft edges that invite you to slow down.
            </p>
            <p>
              Days are intentionally unhurried. You can do very little and feel completely full — a long swim, a spa
              ritual, a meal by candlelight, then silence.
            </p>
          </div>
          <div className="rule" />
        </div>
      </section>

      {/* SIGNATURES */}
      <section className="section sectionSignatures">
        <div className="container">
          <div className="grid3">
            <a className="card" href="/accommodation">
              <div className="cardLabel">VILLAS</div>
              <h3 className="cardTitle">Private, ocean-facing living</h3>
              <p className="cardText">
                Minimal interiors, warm stone, soft linen — designed to disappear into the view.
              </p>
              <span className="cardLink">Explore</span>
            </a>

            <a className="card" href="/spa">
              <div className="cardLabel">SPA</div>
              <h3 className="cardTitle">Rituals for body and breath</h3>
              <p className="cardText">
                Slow therapies, ocean minerals, and restorative heat — guided by quiet expertise.
              </p>
              <span className="cardLink">Discover</span>
            </a>

            <a className="card" href="/dine">
              <div className="cardLabel">DINE</div>
              <h3 className="cardTitle">Seasonal cuisine by the sea</h3>
              <p className="cardText">
                Fire, salt, and local harvests — elegant meals that feel effortless.
              </p>
              <span className="cardLink">Visit</span>
            </a>
          </div>
        </div>
      </section>

      {/* GALLERY — STACKED */}
      <section className="section sectionGallery">
        <div className="container">
          <div className="galleryHeader">
            <div className="eyebrow">GLIMPSES</div>
            <h3 className="h3">Light, water, and texture</h3>
          </div>

          <div className="galleryStack">
            <figure className="galleryItem ocean is-left">
              <img src="/gallery-1.jpg" alt="Ocean view" />
            </figure>

            <figure className="galleryItem villa is-right">
              <img src="/gallery-2.jpg" alt="Villa ritual" />
            </figure>

            <figure className="galleryItem dine is-center">
              <img src="/gallery-3.jpg" alt="Dining atmosphere" />
            </figure>
          </div>

          <div className="copy" style={{ marginTop: 22 }}>
            <p>
              A palette of sand, stone, and sea. Minimalism here is not an aesthetic — it is a way to create room for
              breath, light, and the quiet rhythm of tides.
            </p>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="section sectionExperience">
        <div className="container">
          <div className="split">
            <div>
              <div className="eyebrow">EXPERIENCE</div>
              <h3 className="h3">Curated days, quietly unforgettable</h3>
              <div className="copy">
                <p>
                  Sunset cliff walks, ocean rituals, private dining, and guided stillness — choose a rhythm that feels
                  like you.
                </p>
                <p>
                  Whether you arrive to celebrate or simply to disappear for a while, every detail is tailored: the
                  timing, the tone, the temperature of a room at night.
                </p>
              </div>

              <ul className="bullets">
                <li>Cliffside sunrise meditation</li>
                <li>Ocean sound bathing</li>
                <li>Private chef’s table</li>
                <li>Handcrafted local excursions</li>
                <li>In-villa floating breakfast</li>
                <li>Sunset fire &amp; tea ceremony</li>
              </ul>

              <a className="textCta" href="/experience">Explore experiences</a>
            </div>

            <div className="imagePlaceholder" aria-label="Experience image">
              <img className="experienceImg" src="/experience.jpg" alt="Experience at Vanara" />
            </div>
          </div>
        </div>
      </section>

      {/* WHY VANARA */}
      <section className="section">
        <div className="container">
          <div className="eyebrow">DETAILS</div>
          <h3 className="h3">Small moments, done perfectly</h3>
          <div className="copy">
            <p>
              Every element of the stay is made to feel effortless: discreet arrivals, in-villa dining, bespoke
              itineraries, and service that anticipates without interrupting.
            </p>
          </div>

          <div className="grid3">
            <div className="card" style={{ cursor: 'default' }}>
              <div className="cardLabel">ARRIVAL</div>
              <h3 className="cardTitle">Curated transfers</h3>
              <p className="cardText">Private arrivals, luggage handled quietly, timing built around your flight.</p>
              <span className="cardLink">Seamless</span>
            </div>

            <div className="card" style={{ cursor: 'default' }}>
              <div className="cardLabel">PRIVACY</div>
              <h3 className="cardTitle">Space to disappear</h3>
              <p className="cardText">Villas designed for privacy, with ocean air and soft light at every hour.</p>
              <span className="cardLink">Uninterrupted</span>
            </div>

            <div className="card" style={{ cursor: 'default' }}>
              <div className="cardLabel">SERVICE</div>
              <h3 className="cardTitle">Quiet precision</h3>
              <p className="cardText">Warm, attentive, and invisible when you want it to be.</p>
              <span className="cardLink">By intention</span>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION + NEWSLETTER */}
      <section className="section sectionBottom">
        <div className="container">
          <div className="grid2">
            <div className="panel">
              <div className="eyebrow">LOCATION</div>
              <h3 className="h3">Uluwatu, Bali</h3>
              <p className="panelText">
                A quiet edge of the island — limestone cliffs, turquoise water, and warm evenings. Transfers and curated
                arrivals available upon request.
              </p>
              <p className="panelText">
                Close enough for exploration, far enough to feel private. We can arrange drivers, surf breaks, temple
                visits, and hidden coastal paths.
              </p>
              <a className="textCta" href="/connect">Plan your arrival</a>
            </div>

            <div className="panel">
              <div className="eyebrow">NEWSLETTER</div>
              <h3 className="h3">A note from the coast</h3>
              <p className="panelText">
                Seasonal openings, villa stories, and experiences — sent rarely, always calm.
              </p>
              <p className="panelText">
                Receive first access to limited dates and new rituals as they are introduced.
              </p>

              <form className="newsletter" action="#" method="post">
                <input className="newsletterInput" type="email" placeholder="Email address" />
                <button className="newsletterBtn" type="submit">Subscribe</button>
              </form>

              <div className="smallprint">No spam. Unsubscribe anytime.</div>
            </div>
          </div>
        </div>

        {/* MAP */}
        <div className="mapBlock">
          <div className="mapShell">
            <div className="mapPin" aria-hidden="true"><span /></div>
            <iframe
              className="mapFrame"
              title="Vanara Resort & Spa location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=-8.84194133249861,115.11168032877258&z=17&output=embed"
            />
          </div>

          <div className="mapLinks">
            <a
              className="textCta"
              href="https://www.google.com/maps/place/VANARA+Resort+%26+Spa/@-8.8421164,115.1117122,17z"
              target="_blank"
              rel="noreferrer"
            >
              View on Google Maps
            </a>
          </div>
        </div>

      </section>
    </div>
  )
}
