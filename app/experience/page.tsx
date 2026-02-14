export default function ExperiencePage() {
  return (
    <main className="home">
      {/* HERO */}
      <section className="hero hero--short">
        <img className="heroImage" src="/experience.jpg" alt="Vanara experiences" />
        <div className="heroShade" />

        <div className="heroContent">
          <span className="heroKicker">EXPERIENCE</span>
          <h1 className="heroTitle">The Rhythm of Vanara</h1>
          <p className="heroSub">
            Curated moments — calm, private, unforgettable.
          </p>

          <div className="heroLinks">
            <a className="heroLink" href="#signature">Signature</a>
            <a className="heroLink" href="#rituals">Rituals</a>
            <a className="heroLink" href="#weddings">Weddings</a>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="section">
        <div className="container">
          <div className="eyebrow">THE DAY</div>
          <h2 className="h2">Designed for stillness</h2>

          <div className="copy">
            <p>
              Experiences at Vanara are shaped by the coastline — sunrise and salt air, shaded afternoons,
              and evenings that arrive softly. Everything is unhurried, discreet, and tailored to your pace.
            </p>
            <p>
              Choose a rhythm: movement or silence, adventure or restoration. We handle the details quietly —
              timing, transfers, reservations, and pacing — so the day feels effortless.
            </p>
          </div>

          <div className="rule" />
        </div>
      </section>

      {/* SIGNATURE */}
      <section className="section" id="signature">
        <div className="container">
          <div className="eyebrow">SIGNATURE</div>
          <h3 className="h3">Quiet highlights</h3>

          <div className="grid3">
            <div className="card" style={{ cursor: "default" }}>
              <div className="cardLabel">SUNRISE</div>
              <h3 className="cardTitle">Cliffside meditation</h3>
              <p className="cardText">
                Gentle guidance, ocean air, and an unbroken horizon — a calm beginning.
              </p>
              <span className="cardLink">By request</span>
            </div>

            <div className="card" style={{ cursor: "default" }}>
              <div className="cardLabel">OCEAN</div>
              <h3 className="cardTitle">Sound bathing</h3>
              <p className="cardText">
                A slow reset — breath, vibration, and sea rhythm, designed for deep restoration.
              </p>
              <span className="cardLink">Restorative</span>
            </div>

            <div className="card" style={{ cursor: "default" }}>
              <div className="cardLabel">DINING</div>
              <h3 className="cardTitle">Private chef’s table</h3>
              <p className="cardText">
                Seasonal menus, candlelight, and precise service — intimate and unhurried.
              </p>
              <span className="cardLink">Quietly elevated</span>
            </div>
          </div>
        </div>
      </section>

      {/* RITUALS */}
      <section className="section" id="rituals">
        <div className="container">
          <div className="eyebrow">RITUALS</div>
          <h2 className="h2">Small ceremonies for the senses</h2>

          <div className="split">
            <div>
              <div className="copy">
                <p>
                  Vanara rituals are intentionally simple — warm water, mineral salt, botanical touch, and quiet time.
                  We keep it minimal so you can feel the place: the air, the light, the sound of the ocean.
                </p>
                <p>
                  Each ritual can be arranged in-villa or in dedicated spaces, guided by calm expertise and discreet timing.
                </p>
              </div>

              <ul className="bullets">
                <li>Sunset tea ceremony (firelight &amp; calm pacing)</li>
                <li>Salt &amp; mineral renewal (ocean-inspired)</li>
                <li>Heat ritual (slow, restorative)</li>
                <li>Signature massage (grounding, minimal fragrance)</li>
                <li>Breathwork &amp; gentle movement</li>
                <li>In-villa floating breakfast (by request)</li>
              </ul>

              <a className="textCta" href="/spa">Explore spa rituals</a>
            </div>

            <div className="imagePlaceholder" aria-label="Rituals image">
              <img className="experienceImg" src="/gallery-2.jpg" alt="Vanara rituals" />
            </div>
          </div>

          <div className="rule" style={{ marginTop: 34 }} />
        </div>
      </section>

      {/* ADVENTURE / CULTURE */}
      <section className="section" id="explore">
        <div className="container">
          <div className="eyebrow">EXPLORE</div>
          <h2 className="h2">Bali, privately</h2>

          <div className="copy">
            <p>
              We arrange curated experiences beyond the resort — always calm, never rushed.
              Think early departures, quiet access, and return timing aligned with light.
            </p>
          </div>

          <div className="grid3">
            <div className="card" style={{ cursor: "default" }}>
              <div className="cardLabel">COAST</div>
              <h3 className="cardTitle">Hidden beaches &amp; cliffs</h3>
              <p className="cardText">
                Scenic coastal routes, quiet viewpoints, and short walks above the tide.
              </p>
              <span className="cardLink">Curated</span>
            </div>

            <div className="card" style={{ cursor: "default" }}>
              <div className="cardLabel">SURF</div>
              <h3 className="cardTitle">Private surf session</h3>
              <p className="cardText">
                Lesson or guided break selection — timing based on swell and comfort.
              </p>
              <span className="cardLink">By conditions</span>
            </div>

            <div className="card" style={{ cursor: "default" }}>
              <div className="cardLabel">CULTURE</div>
              <h3 className="cardTitle">Temple &amp; craft route</h3>
              <p className="cardText">
                Quiet temple visits and artisan stops — with space to linger.
              </p>
              <span className="cardLink">Private driver</span>
            </div>
          </div>
        </div>
      </section>

      {/* ROMANCE */}
      <section className="section" id="romance">
        <div className="container">
          <div className="eyebrow">ROMANCE</div>
          <h2 className="h2">Evenings for two</h2>

          <div className="split">
            <div>
              <div className="copy">
                <p>
                  Romance at Vanara is quiet — not performative. We can arrange private dining,
                  a sunset table, or a gentle surprise that feels natural to the setting.
                </p>
              </div>

              <ul className="bullets">
                <li>Cliffside sunset dinner (candlelight, minimal styling)</li>
                <li>Private in-villa dining (chef-led, curated menu)</li>
                <li>Proposal setup (discreet, photography optional)</li>
                <li>Champagne &amp; dessert ritual (sunset timing)</li>
                <li>Post-dinner fire &amp; tea (quiet closure)</li>
              </ul>

              <a className="textCta" href="/connect">Plan a romantic evening</a>
            </div>

            <div className="imagePlaceholder" aria-label="Romance image">
              <img className="experienceImg" src="/gallery-3.jpg" alt="Romantic dining" />
            </div>
          </div>

          <div className="rule" style={{ marginTop: 34 }} />
        </div>
      </section>

      {/* WEDDINGS */}
      <section className="section" id="weddings">
        <div className="container">
          <div className="eyebrow">WEDDINGS</div>
          <h2 className="h2">Celebrations, quietly elevated</h2>

          <div className="split">
            <div>
              <div className="copy">
                <p>
                  Vanara is an intimate setting for weddings and private celebrations — a ceremony above the ocean,
                  followed by candlelit dining in a calm, private atmosphere.
                </p>
                <p>
                  We curate details with discretion: timing, sound, florals, lighting, dining, and service —
                  refined, minimal, and never excessive.
                </p>
              </div>

              <div className="eyebrow" style={{ marginTop: 26 }}>HIGHLIGHTS</div>
              <ul className="bullets">
                <li>Cliffside ceremony at golden hour</li>
                <li>Minimal floral styling (white / natural textures)</li>
                <li>Chef-led reception dinner (private table or buyout)</li>
                <li>Sound, lighting &amp; sunset setup</li>
                <li>Villa buyout options (upon request)</li>
                <li>Photography-friendly pacing (no rush)</li>
              </ul>

              <div className="eyebrow" style={{ marginTop: 26 }}>FORMAT OPTIONS</div>
              <div className="grid3">
                <div className="card" style={{ cursor: "default" }}>
                  <div className="cardLabel">INTIMATE</div>
                  <h3 className="cardTitle">Ceremony &amp; dinner</h3>
                  <p className="cardText">
                    A quiet ceremony, then a chef-led dinner for close guests — simple, beautiful, unhurried.
                  </p>
                  <span className="cardLink">Most requested</span>
                </div>

                <div className="card" style={{ cursor: "default" }}>
                  <div className="cardLabel">WEEKEND</div>
                  <h3 className="cardTitle">Two-day celebration</h3>
                  <p className="cardText">
                    Welcome sunset ritual, ceremony day, and relaxed recovery brunch — paced by light.
                  </p>
                  <span className="cardLink">Curated flow</span>
                </div>

                <div className="card" style={{ cursor: "default" }}>
                  <div className="cardLabel">BUYOUT</div>
                  <h3 className="cardTitle">Private sanctuary</h3>
                  <p className="cardText">
                    For maximum privacy: villas, dining, timings — the resort becomes your setting.
                  </p>
                  <span className="cardLink">Upon request</span>
                </div>
              </div>

              <a className="textCta" href="/connect">Enquire about weddings</a>
              <div className="smallprint" style={{ marginTop: 10 }}>
                Share your preferred dates, estimated guest count, and ceremony time (sunset / daytime).
              </div>
            </div>

            <div className="imagePlaceholder" aria-label="Wedding image">
              <img className="experienceImg" src="/wedding.jpg" alt="Wedding at Vanara" />
            </div>
          </div>

          <div className="rule" style={{ marginTop: 34 }} />
        </div>
      </section>

      {/* ESSENTIALS */}
      <section className="section" id="essentials">
        <div className="container">
          <div className="eyebrow">ESSENTIALS</div>
          <h2 className="h2">Arranged quietly</h2>

          <div className="copy">
            <p>
              For every experience — from a short ritual to a wedding weekend — our team can arrange transfers,
              timing, reservations, and personalized touches with minimal messaging and maximal clarity.
            </p>
          </div>

          <div className="grid3">
            <div className="card" style={{ cursor: "default" }}>
              <div className="cardLabel">TRANSFER</div>
              <h3 className="cardTitle">Curated arrivals</h3>
              <p className="cardText">
                Private driver options, timing aligned with flights, discreet luggage handling.
              </p>
              <span className="cardLink">Seamless</span>
            </div>

            <div className="card" style={{ cursor: "default" }}>
              <div className="cardLabel">DINING</div>
              <h3 className="cardTitle">Dietary tailoring</h3>
              <p className="cardText">
                Vegetarian, vegan, allergy-aware menus — prepared with care and minimal fuss.
              </p>
              <span className="cardLink">Thoughtful</span>
            </div>

            <div className="card" style={{ cursor: "default" }}>
              <div className="cardLabel">PRIVACY</div>
              <h3 className="cardTitle">Discreet planning</h3>
              <p className="cardText">
                Quiet scheduling, optional photography, and privacy-first coordination.
              </p>
              <span className="cardLink">By design</span>
            </div>
          </div>

          <a className="textCta" href="/connect">Connect with our team</a>
        </div>
      </section>
    </main>
  )
}
