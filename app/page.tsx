'use client'
import { useEffect, useMemo, useRef, useState } from 'react'

function HeroSlider() {
  const slides = useMemo(
    () => [
      { src: '/hero1.jpg', alt: 'Vanara hero 1' },
      { src: '/hero2.jpg', alt: 'Vanara hero 2' },
      { src: '/hero3.jpg', alt: 'Vanara hero 3' },
      { src: '/hero4.jpg', alt: 'Vanara hero 4' },
      { src: '/hero5.jpg', alt: 'Vanara hero 5' },
    ],
    []
  )

  const [active, setActive] = useState(0)
  const [tick, setTick] = useState(0) // restart zoom animation
  const pausedRef = useRef(false)
  const touchStartX = useRef<number | null>(null)

  const total = slides.length

  const go = (next: number) => {
    const n = (next + total) % total
    setActive(n)
    setTick((t) => t + 1)
  }

  const next = () => go(active + 1)
  const prev = () => go(active - 1)

  useEffect(() => {
    const id = window.setInterval(() => {
      if (pausedRef.current) return
      next()
    }, 7800)
    return () => window.clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  const onTouchStart = (e: React.TouchEvent) => {
    pausedRef.current = true
    touchStartX.current = e.touches[0]?.clientX ?? null
  }
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return
    const x = e.touches[0]?.clientX ?? touchStartX.current
    const dx = x - touchStartX.current
    if (Math.abs(dx) > 42) {
      if (dx > 0) prev()
      else next()
      touchStartX.current = null
    }
  }
  const onTouchEnd = () => {
    touchStartX.current = null
    pausedRef.current = false
  }

  return (
    <section
      className="hero hero--ss"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="ssHeroStage" aria-hidden="true">
        {slides.map((s, i) => (
          <div
            key={`${i}-${active}-${tick}`}
            className={`ssHeroSlide ${i === active ? 'is-active' : ''}`}
            style={{ backgroundImage: `url(${s.src})` }}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="heroShade" />

      <button className="ssHeroNav ssHeroNav--prev" aria-label="Previous photo" onClick={prev} />
      <button className="ssHeroNav ssHeroNav--next" aria-label="Next photo" onClick={next} />

      <div className="ssHeroDots" aria-label="Hero pagination">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`ssDot ${i === active ? 'is-active' : ''}`}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => go(i)}
          />
        ))}
      </div>

      <div className="heroContent">
        <div className="heroKicker">ULUWATU · BALI</div>
        <h1 className="heroTitle">Vanara Resort &amp; Spa</h1>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div className="home">
      {/* HERO */}
                  <HeroSlider />

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
              Here, luxury is not loud. It lives in spaciousness, in discreet service, and in the way each view is framed.
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

      {/* EXPERIENCE PREVIEW */}
      <section className="section sectionExperience">
        <div className="container">
          <div className="split">
            <div>
              <div className="eyebrow">EXPERIENCE</div>
              <h3 className="h3">The day, unhurried</h3>
              <div className="copy">
                <p>
                  Sunrise silence. Warm water. Slow dining. Evenings that arrive softly.
                  Choose a rhythm that feels like you — and let everything else fall away.
                </p>
              </div>

              <ul className="bullets">
                <li>Cliffside sunrise meditation</li>
                <li>Ocean sound bathing</li>
                <li>Private chef’s table</li>
                <li>Handcrafted local excursions</li>
              </ul>

              <a className="textCta" href="/experience">Explore experiences</a>
            </div>

            <div className="imagePlaceholder" aria-label="Experience image">
              <img className="experienceImg" src="/experience.jpg" alt="Experience at Vanara" />
            </div>
          </div>
        </div>
      </section>

      {/* ✅ WEDDINGS — NEW (Luxury / Aman-style) */}
      <section className="section sectionWeddings" id="weddings">
        <div className="container">
          <div className="split">
            <div>
              <div className="eyebrow">WEDDINGS</div>
              <h3 className="h3">Celebrations, quietly elevated</h3>

              <div className="copy">
                <p>
                  Vanara is an intimate setting for weddings and private celebrations — a ceremony above the ocean,
                  followed by candlelit dining in a calm, private atmosphere.
                </p>
                <p>
                  We curate the details with discretion: timing, sound, florals, lighting, and service —
                  refined, minimal, and never excessive.
                </p>
              </div>

              <ul className="bullets">
                <li>Cliffside ceremony at golden hour</li>
                <li>Private dinner reception (chef-led)</li>
                <li>Minimal floral styling &amp; table design</li>
                <li>Sound, lighting &amp; sunset setup</li>
                <li>Villa buyout options (upon request)</li>
                <li>Photography-friendly pacing (no rush)</li>
              </ul>

              <a className="textCta" href="/connect">Enquire about weddings</a>
            </div>

            <div className="imagePlaceholder" aria-label="Wedding image">
              {/* Add /public/wedding.jpg (or replace with your filename) */}
              <img className="experienceImg" src="/wedding.jpg" alt="Wedding at Vanara" />
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
