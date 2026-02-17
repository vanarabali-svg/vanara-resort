'use client'
import { useEffect, useMemo, useRef, useState, type TouchEvent as ReactTouchEvent } from 'react'

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

  const [showVideo, setShowVideo] = useState(true)
  const [active, setActive] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [zoomKey, setZoomKey] = useState(0) // restart zoom only on the active slide
  const pausedRef = useRef(false)
  const touchStartX = useRef<number | null>(null)
  const total = slides.length

  const go = (nextIndex: number) => {
    const n = (nextIndex + total) % total
    setPrev(active)
    setActive(n)
    setZoomKey((k) => k + 1)
    window.setTimeout(() => setPrev(null), 1400)
  }

  const next = () => go(active + 1)
  const prevSlide = () => go(active - 1)

  // Auto-advance (slow, luxury pacing)
  useEffect(() => {
    if (showVideo) return
    const id = window.setInterval(() => {
      if (pausedRef.current) return
      next()
    }, 9000)
    return () => window.clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, showVideo])

  // Preload hero images after intro video finishes
  useEffect(() => {
    if (showVideo) return
    slides.forEach((s) => {
      const img = new Image()
      img.src = s.src
    })
  }, [slides, showVideo])

  // Keyboard arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (showVideo) return
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prevSlide()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, showVideo])

  // Touch swipe
  const onTouchStart = (e: ReactTouchEvent<HTMLElement>) => {
    if (showVideo) return
    pausedRef.current = true
    touchStartX.current = e.touches[0]?.clientX ?? null
  }
  const onTouchMove = (e: ReactTouchEvent<HTMLElement>) => {
    if (showVideo) return
    if (touchStartX.current == null) return
    const x = e.touches[0]?.clientX ?? touchStartX.current
    const dx = x - touchStartX.current
    if (Math.abs(dx) > 42) {
      if (dx > 0) prevSlide()
      else next()
      touchStartX.current = null
    }
  }
  const onTouchEnd = () => {
    touchStartX.current = null
    pausedRef.current = false
  }

  const onVideoEnded = () => {
    setShowVideo(false)
    setPrev(null)
    setActive(0)
    setZoomKey((k) => k + 1)
  }

  return (
    <section
      className={`hero hero--ss ${showVideo ? 'is-video' : 'is-photos'}`}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <video
        className={`ssHeroVideo ${showVideo ? 'is-active' : ''}`}
        src="/hero.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={onVideoEnded}
        aria-label="Vanara hero video"
      />

      <div className="ssHeroStage" aria-hidden="true">
        {slides.map((s, i) => {
          const isActive = i === active
          const isPrev = prev !== null && i === prev
          return (
            <div
              key={isActive ? `${i}-${zoomKey}` : i}
              className={`ssHeroSlide ${isActive ? 'is-active' : ''} ${isPrev ? 'is-prev' : ''}`}
              style={{ backgroundImage: `url(${s.src})` }}
              aria-hidden="true"
            />
          )
        })}
      </div>

      <div className="heroShade" />

      {!showVideo && (
        <>
          <button className="ssHeroNav ssHeroNav--prev" aria-label="Previous photo" onClick={prevSlide} />
          <button className="ssHeroNav ssHeroNav--next" aria-label="Next photo" onClick={next} />
        </>
      )}

      {!showVideo && (
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
      )}

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
      <HeroSlider />

      <section className="section sectionIntro">
        <div className="container">
          <div className="eyebrow">THE RESORT</div>
          <h2 className="h2">A sanctuary of quiet strength</h2>

          <div className="copy">
            <p>
              Perched above the Indian Ocean, Vanara is shaped by wind, stone, and warm light — a retreat where
              architecture dissolves into landscape.
            </p>
            <p>Luxury is quiet here: spaciousness, discreet service, and views framed with restraint.</p>
          </div>

          <div className="rule" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="eyebrow">PHILOSOPHY</div>
          <h3 className="h3">Designed for stillness</h3>
          <div className="copy">
            <p>
              Vanara is built around a simple idea: the ocean is the main event. Interiors remain quiet so nature can
              speak — warm neutrals, natural textures, and soft edges that invite you to slow down.
            </p>
            <p>Days are intentionally unhurried — a swim, a ritual, a calm table, then silence.</p>
          </div>
          <div className="rule" />
        </div>
      </section>
      <section className="section sectionVillasFeature">
        <div className="container">
          <div className="split split--rev">
            <div className="imagePlaceholder" aria-label="Villas image">
              <img className="experienceImg" src="/villas.jpg" alt="Villas at Vanara" />
            </div>

            <div>
              <div className="eyebrow">VILLAS</div>
              <h3 className="h3">Private, ocean-facing living</h3>

              <div className="copy">
                <p>
                  Spacious villas shaped by warm stone, soft linen, and calm shadows — designed to disappear into the view.
                </p>
                <p>
                  Mornings arrive quietly, afternoons slow down, evenings soften. Everything is discreet, effortless, unhurried.
                </p>
              </div>

              <ul className="bullets">
                <li>Ocean views &amp; private terraces</li>
                <li>Minimal interiors, natural textures</li>
                <li>In‑villa dining and curated rituals (upon request)</li>
              </ul>

              <a className="textCta" href="/accommodation">
                Explore villas
              </a>

              <div className="smallprint" style={{ marginTop: 12 }}>
                Replace <code>/villas.jpg</code> with your preferred villa photo.
              </div>
            </div>
          </div>
        </div>
      </section>
<section className="section sectionDiningFeature">
        <div className="container">
          <div className="split split--rev">
            <div className="imagePlaceholder" aria-label="Dining image">
              <img className="experienceImg" src="/dining.jpg" alt="Dining at Vanara" />
            </div>

            <div>
              <div className="eyebrow">DINING</div>
              <h3 className="h3">A calm table by the ocean</h3>

              <div className="copy">
                <p>
                  Thoughtful cuisine, served with unhurried attention. From sunrise breakfasts to candlelit dinners,
                  Vanara’s dining is guided by season, ocean air, and a minimalist sense of place.
                </p>
                <p>Clean flavors, warm fire cooking, and a quiet rhythm — never performative.</p>
              </div>

              <ul className="bullets">
                <li>Cliffside breakfasts &amp; slow morning coffee</li>
                <li>Fresh seafood, local harvests, and clean grilling</li>
                <li>Private dining in-villa (upon request)</li>
              </ul>

              <a className="textCta" href="/dine">
                Explore dining
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section sectionYoga">
        <div className="container">
          <div className="split split--rev">
            <div className="imagePlaceholder" aria-label="Experience image">
              <img className="experienceImg" src="/yoga.jpg" alt="Yoga at Vanara" />
            </div>

            <div>
              <div className="eyebrow">YOGA</div>
              <h3 className="h3">Move slowly. Breathe deeper.</h3>
              <div className="copy">
                <p>
                  Begin with ocean air and soft light. Our yoga and breathwork sessions are designed to quiet the nervous
                  system — gentle flow, grounded strength, and long exhale.
                </p>
                <p>Choose sunrise on the terrace, deep rest after the spa, or a short meditation before dinner.</p>
              </div>

              <ul className="bullets">
                <li>Sunrise &amp; sunset yoga (all levels)</li>
                <li>Breathwork &amp; guided meditation</li>
                <li>Sound healing and deep rest</li>
                <li>Private sessions in-villa (upon request)</li>
              </ul>

              <a className="textCta" href="/experience">
                Explore experiences
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section sectionWeddings" id="weddings">
        <div className="container">
          <div className="split split--rev">
            <div className="imagePlaceholder" aria-label="Wedding image">
              <img className="experienceImg" src="/wedding.jpg" alt="Wedding at Vanara" />
            </div>

            <div>
              <div className="eyebrow">WEDDINGS</div>
              <h3 className="h3">Celebrations, quietly elevated</h3>

              <div className="copy">
                <p>
                  Vanara is an intimate setting for weddings and private celebrations — a ceremony above the ocean,
                  followed by candlelit dining in a calm, private atmosphere.
                </p>
                <p>Details are curated with discretion — refined, minimal, never excessive.</p>
              </div>

              <ul className="bullets">
                <li>Cliffside ceremony at golden hour</li>
                <li>Chef-led private dinner</li>
                <li>Minimal floral + table styling</li>
                <li>Villa buyout options (upon request)</li>
              </ul>

              <a className="textCta" href="/connect">
                Enquire about weddings
              </a>
            </div>
          </div>
        </div>
      </section>

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
              <a className="textCta" href="/connect">
                Plan your arrival
              </a>
            </div>

            <div className="panel">
              <div className="eyebrow">NEWSLETTER</div>
              <h3 className="h3">A note from the coast</h3>
              <p className="panelText">Seasonal openings, villa stories, and experiences — sent rarely, always calm.</p>

              <form className="newsletter" action="#" method="post">
                <input className="newsletterInput" type="email" placeholder="Email address" />
                <button className="newsletterBtn" type="submit">
                  Subscribe
                </button>
              </form>

              <div className="smallprint">No spam. Unsubscribe anytime.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
