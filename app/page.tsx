'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

function useScrollZoom(
  ref: any,
  opts?: { min?: number; max?: number; start?: number; end?: number }
) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const min = opts?.min ?? 1.0
    const max = opts?.max ?? 1.06
    // start/end are viewport progress positions (0..1). 0.15 means start zoom when element enters a bit.
    const start = opts?.start ?? 0.15
    const end = opts?.end ?? 0.85

    let raf: number | null = null

    const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n))

    const update = () => {
      raf = null
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1

      // progress: 0 when top is below viewport, 1 when bottom is above viewport
      const raw = 1 - rect.top / vh
      // normalize within [start,end]
      const t = clamp((raw - start) / (end - start), 0, 1)

      // Six Senses-like: very subtle ease-out
      const eased = 1 - Math.pow(1 - t, 3)
      const scale = max - (max - min) * eased
      el.style.setProperty('--scrollZoom', String(scale))
    }

    const onScroll = () => {
      if (raf != null) return
      raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (raf != null) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ref, opts?.min, opts?.max, opts?.start, opts?.end])
}

/**
 * Dining gallery — Jumeirah-inspired: large immersive frames,
 * horizontal scroll with snap, and optional mouse drag (desktop).
 * Mobile uses native swipe.
 */
function DiningUlamanCarousel4() {
  const photos = useMemo(
    () => [
      { src: '/dining-1.jpg', alt: 'Dining at Vanara' },
      { src: '/dining-2.jpg', alt: 'Dining setting' },
      { src: '/dining-3.jpg', alt: 'Chef & fresh cuisine' },
      { src: '/dining-4.jpg', alt: 'Sunset dining' },
    ],
    []
  )

  const [active, setActive] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const pausedRef = useRef(false)
  const touchRef = useRef<{ x: number; y: number } | null>(null)
  const zoomRef = useRef<HTMLDivElement | null>(null)
  useScrollZoom(zoomRef as any, { min: 1.0, max: 1.06, start: 0.15, end: 0.85 })
const go = (i: number) => {
    const idx = (i + photos.length) % photos.length
    setPrev(active)
    setActive(idx)
    window.setTimeout(() => setPrev(null), 650)
  }

  useEffect(() => {
    const id = window.setInterval(() => {
      if (pausedRef.current) return
      go(active + 1)
    }, 5200)
    return () => window.clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, photos.length])

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0]
    touchRef.current = { x: t.clientX, y: t.clientY }
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchRef.current
    touchRef.current = null
    if (!start) return
    const t = e.changedTouches[0]
    const dx = t.clientX - start.x
    const dy = t.clientY - start.y
    if (Math.abs(dx) < 44 || Math.abs(dx) < Math.abs(dy)) return
    if (dx < 0) go(active + 1)
    else go(active - 1)
  }

  return (
    <section className="uDining" aria-label="Dining">
      <div className="uDiningIntro">
        <div className="uDiningEyebrow">DINING</div>
        <h3 className="uDiningTitle">A refined coastal table</h3>
        <p className="uDiningText">
          Seasonal ingredients, open views, and understated service — an experience shaped by light and ocean air.
        </p>
      </div>

      <div
        className="uDiningCarousel" ref={zoomRef}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-label="Dining carousel"
      >
        <div className="uDiningStage" aria-hidden="true">
          {photos.map((p, i) => {
            const isActive = i === active
            const isPrev = prev !== null && i === prev
            return (
              <div key={p.src} className={`uDiningSlide ${isActive ? 'is-active' : ''} ${isPrev ? 'is-prev' : ''}`}>
                <img className="uDiningImg" src={p.src} alt={p.alt} draggable={false} />
              </div>
            )
          })}
        </div>

        <div className="uDiningShade" aria-hidden="true" />

        <div className="uDiningDots" aria-label="Dining carousel navigation">
          {photos.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`uDiningDot ${i === active ? 'is-active' : ''}`}
              aria-label={`Show dining photo ${i + 1}`}
              onClick={() => go(i)}
            />
          ))}
        </div>

        <div className="uDiningHint" aria-hidden="true">Swipe • Tap dots</div>
      </div>
    </section>
  )
}


function VillasUlamanCarousel() {
  const photos = useMemo(
    () => [
      { src: '/villas-1.jpg', alt: 'Villa at Vanara' },
      { src: '/villas-2.jpg', alt: 'Villa terrace' },
      { src: '/villas-3.jpg', alt: 'Ocean view villa' },
    ],
    []
  )

  const [active, setActive] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const pausedRef = useRef(false)
  const touchRef = useRef<{ x: number; y: number } | null>(null)

  const zoomRef = useRef<HTMLDivElement | null>(null)
  useScrollZoom(zoomRef as any, { min: 1.0, max: 1.06, start: 0.15, end: 0.85 })
  const go = (i: number) => {
    const idx = (i + photos.length) % photos.length
    setPrev(active)
    setActive(idx)
    window.setTimeout(() => setPrev(null), 650)
  }

  useEffect(() => {
    const id = window.setInterval(() => {
      if (pausedRef.current) return
      go(active + 1)
    }, 5600)
    return () => window.clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, photos.length])

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0]
    touchRef.current = { x: t.clientX, y: t.clientY }
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchRef.current
    touchRef.current = null
    if (!start) return
    const t = e.changedTouches[0]
    const dx = t.clientX - start.x
    const dy = t.clientY - start.y
    if (Math.abs(dx) < 44 || Math.abs(dx) < Math.abs(dy)) return
    if (dx < 0) go(active + 1)
    else go(active - 1)
  }

  return (
    <div
      className="uVillasCarousel" ref={zoomRef}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-label="Villas carousel"
    >
      <div className="uVillasStage" aria-hidden="true">
        {photos.map((p, i) => {
          const isActive = i === active
          const isPrev = prev !== null && i === prev
          return (
            <div key={p.src} className={`uVillasSlide ${isActive ? 'is-active' : ''} ${isPrev ? 'is-prev' : ''}`}>
              <img className="uVillasImg" src={p.src} alt={p.alt} draggable={false} />
            </div>
          )
        })}
      </div>

      <div className="uVillasShade" aria-hidden="true" />

      <div className="uVillasDots" aria-label="Villas carousel navigation">
        {photos.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`uVillasDot ${i === active ? 'is-active' : ''}`}
            aria-label={`Show villa photo ${i + 1}`}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </div>
  )
}


export default function HomePage() {
  const [heroVideoOk, setHeroVideoOk] = useState(true)
  const [needsTap, setNeedsTap] = useState(false)
  const heroVideoRef = useRef<HTMLVideoElement | null>(null)

  // Try to start playback (some phones block autoplay even when muted)
  useEffect(() => {
    const v = heroVideoRef.current
    if (!v) return
    const tryPlay = async () => {
      try {
        await v.play()
        setNeedsTap(false)
      } catch {
        setNeedsTap(true)
      }
    }
    const id = window.setTimeout(tryPlay, 50)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <div className="home">
      
      <section className="hero hero--video" aria-label="Hero">
        <div className="heroVideo" aria-label="Vanara hero media">
          {heroVideoOk ? (
            <video
              key="hero"
              ref={heroVideoRef}
              className="heroVideoEl"
              autoPlay
              muted
              playsInline
              loop
              preload="auto"
              controls={false}
              disablePictureInPicture
              // @ts-ignore - supported by most browsers
              controlsList="nodownload noplaybackrate noremoteplayback"
              poster="/hero-poster.jpg"
              onError={() => {
                setHeroVideoOk(false)
                setNeedsTap(false)
              }}
              onCanPlay={() => {
                setHeroVideoOk(true)
              }}
            >
              <source src="/hero.mp4" type="video/mp4" />
            </video>
          ) : (
            <img className="heroVideoFallback" src="/hero-fallback.jpg" alt="Vanara Resort & Spa" />
          )}

          {needsTap && heroVideoOk && (
            <button
              type="button"
              className="heroVideoTap"
              aria-label="Play intro video"
              onClick={() => {
                const v = heroVideoRef.current
                if (!v) return
                v.play()
                  .then(() => setNeedsTap(false))
                  .catch(() => setNeedsTap(true))
              }}
            >
              Tap to play
            </button>
          )}
        </div>

        <div className="heroShade" aria-hidden="true" />

        <div className="heroContent">
          <div className="heroKicker">ULUWATU · BALI</div>
          <h1 className="heroTitle">VANARA RESORT &amp; SPA</h1>
        </div>
      </section>


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
            <VillasUlamanCarousel />

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
            <DiningUlamanCarousel4 />

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
