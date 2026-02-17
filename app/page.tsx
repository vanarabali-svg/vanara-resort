'use client'
import { useEffect, useMemo, useRef, useState, type TouchEvent as ReactTouchEvent } from 'react'

function LuxGallery() {
  const slides = useMemo(
    () => [
      { src: '/hero1.jpg', alt: 'Vanara ocean view' },
      { src: '/hero2.jpg', alt: 'Vanara architecture' },
      { src: '/hero3.jpg', alt: 'Vanara pool and sea' },
      { src: '/hero4.jpg', alt: 'Vanara calm interiors' },
      { src: '/hero5.jpg', alt: 'Vanara coastline at dusk' },
    ],
    []
  )

  const trackRef = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const items = Array.from(track.querySelectorAll<HTMLElement>('[data-lux-slide]'))
    if (!items.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0]
        if (!visible) return
        const idx = Number((visible.target as HTMLElement).dataset.luxSlide ?? '0')
        if (!Number.isNaN(idx)) setActive(idx)
      },
      { root: track, threshold: [0.55, 0.65, 0.75] }
    )

    items.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section className="section sectionLuxGallery" aria-label="Gallery">
      <div className="container">
        <div className="luxGalleryHead">
          <div className="eyebrow">GALLERY</div>
          <h3 className="h3">A quiet sequence of light</h3>
        </div>

        <div className="luxCarousel">
          <div className="luxCarouselTop" aria-hidden="true">
            <div className="luxCounter">
              {String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </div>
            <div className="luxLine" />
          </div>

          <div className="luxCarouselFade luxCarouselFadeLeft" aria-hidden="true" />
          <div className="luxCarouselFade luxCarouselFadeRight" aria-hidden="true" />

          <div className="luxCarouselTrack" ref={trackRef}>
            {slides.map((s, i) => (
              <div key={s.src} className={`luxSlide ${i === active ? 'is-active' : ''}`} data-lux-slide={i}>
                <img src={s.src} alt={s.alt} loading={i === 0 ? 'eager' : 'lazy'} />
              </div>
            ))}
          </div>
        </div>

        <div className="luxHint">Drag to explore</div>
      </div>
    </section>
  )
}

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
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const total = slides.length

  const go = (nextIndex: number) => {
    const n = (nextIndex + total) % total
    setPrev(active)
    setActive(n)
    setZoomKey((k) => k + 1)
    // clear prev after fade duration so it can fade out cleanly
    window.setTimeout(() => setPrev(null), 1500)
  }

  const next = () => go(active + 1)
  const prevSlide = () => go(active - 1)

  // Auto-advance (Six Senses pacing)
  useEffect(() => {
    if (showVideo) return
    const id = window.setInterval(() => {
      if (pausedRef.current) return
      next()
    }, 8200)
    return () => window.clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, showVideo])

  // Preload hero images after the intro video finishes (user request)
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

  // When the intro video ends, switch to photos
  const onVideoEnded = () => {
    setShowVideo(false)
    // start first photo cleanly
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
      {/* Intro video first (hero.mp4). After it ends, photos crossfade like Six Senses. */}
      <video
        ref={videoRef}
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

      {/* click zones (only when photos are active) */}
      {!showVideo && (
        <>
          <button className="ssHeroNav ssHeroNav--prev" aria-label="Previous photo" onClick={prevSlide} />
          <button className="ssHeroNav ssHeroNav--next" aria-label="Next photo" onClick={next} />
        </>
      )}

      {/* dots (only when photos are active; CSS may hide for minimal style) */}
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

      {/* LUX PHOTO STRIP (editorial, Six Senses / Aman feel) */}
      <LuxGallery />

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

      {/* DINING FEATURE (Seascape-style block) */}
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
                <p>
                  Expect clean flavors, warm fire cooking, and a quiet rhythm — the kind of meal that feels like a pause
                  in the day rather than an event.
                </p>
              </div>

              <ul className="bullets">
                <li>Cliffside breakfasts &amp; slow morning coffee</li>
                <li>Fresh seafood, local harvests, and clean grilling</li>
                <li>Private dining in-villa (upon request)</li>
              </ul>

              <a className="textCta" href="/dine">Explore dining</a>
            </div>
          </div>
        </div>
      </section>

      {/* YOGA */}
      <section className="section sectionYoga">
        <div className="container">
          <div className="split">
            <div>
              <div className="eyebrow">YOGA</div>
              <h3 className="h3">Move slowly. Breathe deeper.</h3>
              <div className="copy">
                <p>
                  Begin with ocean air and soft light. Our yoga and breathwork sessions are designed to quiet the nervous
                  system — gentle flow, grounded strength, and long exhale.
                </p>
                <p>
                  Practice is unhurried and private. Choose sunrise on the terrace, a restorative session after the spa,
                  or guided meditation before dinner.
                </p>
              </div>

              <ul className="bullets">
                <li>Sunrise &amp; sunset yoga (all levels)</li>
                <li>Breathwork &amp; guided meditation</li>
                <li>Sound healing and deep rest</li>
                <li>Private sessions in-villa (upon request)</li>
              </ul>

              <a className="textCta" href="/experience">Explore experiences</a>
            </div>

            <div className="imagePlaceholder" aria-label="Experience image">
              {/* Add /public/yoga.jpg (or replace with your filename) */}
              <img className="experienceImg" src="/yoga.jpg" alt="Yoga at Vanara" />
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

      </section>
    </div>
  )
}
