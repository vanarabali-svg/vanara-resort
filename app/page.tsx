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
    const start = opts?.start ?? 0.15
    const end = opts?.end ?? 0.85

    let raf: number | null = null

    const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n))

    const update = () => {
      raf = null
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const raw = 1 - rect.top / vh
      const t = clamp((raw - start) / (end - start), 0, 1)
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

function startOfDay(date: Date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1)
}

function addDays(date: Date, amount: number) {
  const d = new Date(date)
  d.setDate(d.getDate() + amount)
  return d
}

function formatDateInput(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function parseDateInput(value: string) {
  const [y, m, d] = value.split('-').map(Number)
  return new Date(y, (m || 1) - 1, d || 1)
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function nightsBetween(start: string, end: string) {
  if (!start || !end) return 0
  const a = startOfDay(parseDateInput(start)).getTime()
  const b = startOfDay(parseDateInput(end)).getTime()
  return Math.max(0, Math.round((b - a) / 86400000))
}

function buildMonthGrid(month: Date) {
  const first = startOfMonth(month)
  const monthIndex = first.getMonth()
  const mondayOffset = (first.getDay() + 6) % 7
  const gridStart = addDays(first, -mondayOffset)

  return Array.from({ length: 42 }, (_, i) => {
    const date = addDays(gridStart, i)
    return {
      date,
      inMonth: date.getMonth() === monthIndex,
    }
  })
}

function clampCount(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function formatDisplayDate(value: string) {
  if (!value) return 'Add date'
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(parseDateInput(value))
}



function DiningUlamanCarousel4() {
  const photos = useMemo(
    () => [
      { src: '/dining-1.webp', alt: 'Dining at Vanara' },
      { src: '/dining-2.webp', alt: 'Dining setting' },
      { src: '/dining-3.webp', alt: 'Chef & fresh cuisine' },
      { src: '/dining-4.webp', alt: 'Sunset dining' },
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

  const prevSlide = () => go(active - 1)
  const nextSlide = () => go(active + 1)

  useEffect(() => {
    const id = window.setInterval(() => {
      if (pausedRef.current) return
      go(active + 1)
    }, 5200)
    return () => window.clearInterval(id)
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
    if (dx < 0) nextSlide()
    else prevSlide()
  }

  return (
    <section className="uDining" aria-label="Dining">
      <div
        className="uDiningCarousel revealBlock"
        ref={zoomRef}
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

        <button
          type="button"
          className="carouselArrow carouselArrow--prev"
          aria-label="Previous dining photo"
          onClick={prevSlide}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          type="button"
          className="carouselArrow carouselArrow--next"
          aria-label="Next dining photo"
          onClick={nextSlide}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>

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
      </div>
    </section>
  )
}

function VillasUlamanCarousel() {
  const photos = useMemo(
    () => [
      { src: '/villas-1.webp', alt: 'Villa at Vanara' },
      { src: '/villas-2.webp', alt: 'Villa terrace' },
      { src: '/villas-3.webp', alt: 'Ocean view villa' },
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

  const prevSlide = () => go(active - 1)
  const nextSlide = () => go(active + 1)

  useEffect(() => {
    const id = window.setInterval(() => {
      if (pausedRef.current) return
      go(active + 1)
    }, 5600)
    return () => window.clearInterval(id)
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
    if (dx < 0) nextSlide()
    else prevSlide()
  }

  return (
    <div
      className="uVillasCarousel revealBlock"
      ref={zoomRef}
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

      <button
        type="button"
        className="carouselArrow carouselArrow--prev"
        aria-label="Previous villa photo"
        onClick={prevSlide}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        type="button"
        className="carouselArrow carouselArrow--next"
        aria-label="Next villa photo"
        onClick={nextSlide}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>

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

function ExperienceMosaicGrid() {
  const items = useMemo(
    () => [
      {
        src: '/experience-honeymoon.jpg',
        alt: 'Honeymoon and romantic experiences at Vanara',
        title: 'Honeymoon & Romantic Experiences',
        size: 'hero',
      },
      {
        src: '/experience-dining.jpg',
        alt: 'In-Villa Dining',
        title: 'In-Villa Dining',
        size: 'square',
      },
      {
        src: '/experience-sunset.jpg',
        alt: 'Sunset Moments',
        title: 'Sunset Moments',
        size: 'tall',
      },
      {
        src: '/experience-paragliding.jpg',
        alt: 'Paragliding above the cliffs',
        title: 'Paragliding',
        size: 'square',
      },
      {
        src: '/experience-yoga.jpg',
        alt: 'Yoga at Vanara',
        title: 'Yoga',
        size: 'portrait',
      },
      {
        src: '/experience-nunggalan.jpg',
        alt: 'Nunggalan Beach',
        title: 'Nunggalan Beach',
        size: 'portrait',
      },
    ],
    []
  )

  return (
    <div className="experienceMosaicWrap">
      <div className="experienceMosaic" aria-label="Experiences gallery">
        {items.map((item, index) => (
          <article className={`experienceMosaicItem experienceMosaicItem--${item.size} revealBlock`} key={`${item.title}-${index}`}>
            <img src={item.src} alt={item.alt} draggable={false} />
            <div className="experienceMosaicOverlay" aria-hidden="true" />
            <div className="experienceMosaicLabel">{item.title}</div>
          </article>
        ))}
      </div>

      <div className="experienceMosaicCtaWrap">
        <a className="experienceMosaicCta" href="/experience">
          Discover all experiences
        </a>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [heroVideoOk, setHeroVideoOk] = useState(true)
  const [needsTap, setNeedsTap] = useState(false)
  const heroVideoRef = useRef<HTMLVideoElement | null>(null)

  const today = startOfDay(new Date())
  const [bookCheckIn, setBookCheckIn] = useState(formatDateInput(today))
  const [bookCheckOut, setBookCheckOut] = useState(formatDateInput(addDays(today, 1)))
  const [bookAdults, setBookAdults] = useState(2)
  const [bookRooms, setBookRooms] = useState(1)

  const bookingUrl = useMemo(() => {
    const params = new URLSearchParams()
    params.set('arrival', bookCheckIn)
    params.set('departure', bookCheckOut)
    params.set('checkInDate', bookCheckIn)
    params.set('checkOutDate', bookCheckOut)
    params.set('rooms', String(bookRooms))
    params.set('adults', String(bookAdults))
    params.set('children', '0')
    params.set('items[0][adults]', String(bookAdults))
    params.set('items[0][children]', '0')
    params.set('items[0][infants]', '0')
    params.set('items[0][rooms]', String(bookRooms))
    params.set('currency', 'IDR')
    params.set('locale', 'en')
    return `https://book-directonline.com/properties/vanararesortspa?${params.toString()}`
  }, [bookAdults, bookCheckIn, bookCheckOut, bookRooms])

  useEffect(() => {
    const v = heroVideoRef.current
    if (!v) return

    let resumeTimer: number | null = null
    const clearResumeTimer = () => {
      if (resumeTimer != null) window.clearTimeout(resumeTimer)
      resumeTimer = null
    }

    const tryPlay = async () => {
      clearResumeTimer()
      try {
        v.muted = true
        await v.play()
        setNeedsTap(false)
      } catch {
        setNeedsTap(true)
      }
    }

    const scheduleResume = () => {
      clearResumeTimer()
      resumeTimer = window.setTimeout(() => {
        if (document.hidden) return
        if (v.paused) tryPlay()
      }, 350)
    }

    const onVisibility = () => {
      if (!document.hidden) tryPlay()
    }

    const id = window.setTimeout(tryPlay, 60)

    document.addEventListener('visibilitychange', onVisibility)
    v.addEventListener('pause', scheduleResume)
    v.addEventListener('waiting', scheduleResume)
    v.addEventListener('stalled', scheduleResume)
    v.addEventListener('canplay', tryPlay)

    return () => {
      window.clearTimeout(id)
      clearResumeTimer()
      document.removeEventListener('visibilitychange', onVisibility)
      v.removeEventListener('pause', scheduleResume)
      v.removeEventListener('waiting', scheduleResume)
      v.removeEventListener('stalled', scheduleResume)
      v.removeEventListener('canplay', tryPlay)
    }
  }, [])

useEffect(() => {
  const elements = Array.from(document.querySelectorAll('.revealBlock')) as HTMLElement[]
  if (!elements.length) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement
          el.classList.add('is-revealed')
          observer.unobserve(el)
        }
      })
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -8% 0px',
    }
  )

  elements.forEach((el) => observer.observe(el))
  return () => observer.disconnect()
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
              // @ts-ignore
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
          <h2 className="h2">A refined escape above the ocean</h2>

                    <div className="copy" style={{ marginTop: 22 }}>
            <p>
              Vanara Resort & Spa is a cliffside destination in Uluwatu, where modern villas, open space, and uninterrupted views of the Indian Ocean come together in a natural balance.
            </p>
            <p>
              Set above Nunggalan Beach, a rare stretch of untouched coastline, the resort is shaped by its surroundings, where land, sky, and ocean meet effortlessly.
            </p>
            <p>
              The atmosphere is private and unhurried, defined by architecture, light, and a strong connection to the landscape.
            </p>
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
              <h3 className="h3">Private spaces shaped by design and landscape</h3>

              <div className="copy">
                <p>Modern architecture, open space, and a strong connection to the surroundings define each villa at Vanara.</p>
                <p>
                  Positioned across the cliffs and within carefully designed gardens, the villas offer privacy and flexibility, where indoor and outdoor living come together effortlessly.
                </p>
                <p>
                 Some villas open toward the ocean, others are immersed in lush greenery, while select villas feature
               private pools or elevated rooftop views.
                </p>
              </div>

              <a className="textCta" href="/accommodation">
                Explore villas
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section sectionDiningFeature">
        <div className="container">
          <div className="split split--rev">
            <DiningUlamanCarousel4 />

            <div>
              <div className="eyebrow">KOKOON</div>
              <h3 className="h3">Cliffside dining shaped by light, flavour, and the ocean</h3>

              <div className="copy">
                <p>
                  Kokoon brings together modern cuisine with a refined atmosphere, where French and Japanese
                  techniques meet Mediterranean influences, complemented by locally sourced Indonesian ingredients.
                </p>
                <p>From daytime dining to sunset and evening, the setting evolves naturally, defined by flavour, setting,
                   and atmosphere.</p>
              </div>

              <a className="textCta" href="/dine">
                Explore Kokoon
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section sectionYoga">
        <div className="container">
          <div className="split split--rev">
            <div className="imagePlaceholder revealBlock" aria-label="Experience image">
              <img className="experienceImg" src="/experiences-main.jpg" alt="Experiences at Vanara" />
            </div>

            <div>
              <div className="eyebrow">EXPERIENCES</div>
              <h3 className="h3">Moments shaped by the island</h3>
              <div className="copy">
                <p>
                  At Vanara, each day moves between moments of ease and exploration, shaped by the setting and the surrounding landscape.
                </p>
                <p>
                  From the shoreline of Nunggalan Beach to the cultural and coastal experiences of Uluwatu, each activity unfolds naturally, connected to place and atmosphere.
                </p>
              </div>

            </div>
          </div>

          <ExperienceMosaicGrid />
        </div>
      </section>

      <section className="section sectionWeddings" id="weddings">
        <div className="container">
          <div className="split split--rev">
            <div className="imagePlaceholder revealBlock" aria-label="Wedding image">
              <img className="experienceImg" src="/wedding.jpg" alt="Wedding at Vanara" />
            </div>

            <div>
              <div className="eyebrow">WEDDINGS</div>
              <h3 className="h3">Celebrate above the ocean</h3>

              <div className="copy">
                <p>
                  Set along the cliffs above the Indian Ocean, Vanara offers a distinctive setting for weddings and private celebrations.
                </p>
                <p>Ceremonies unfold in open-air spaces with uninterrupted views, where the light transitions naturally 
                   into sunset and evening.</p>
                <p>
                  Each celebration is shaped by the setting, with a focus on atmosphere, space, and seamless flow.
                </p>
              </div>
              <a className="textCta" href="/connect">
                Discover weddings
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section sectionBookingFeature" id="booking">
        <div className="container">
          <div className="bookingFeature revealBlock">
            <div className="bookingFeatureIntro">
              <h3 className="h3">Experience space, comfort, and the rhyhm of the ocean</h3>
              <a className="bookingFeatureButton bookingFeatureButtonIntro" href={bookingUrl} target="_blank" rel="noreferrer">
                Book your stay
              </a>
            </div>

            <div className="bookingFeatureCard">
              <div className="bookingFeatureGrid">
                <label className="bookingField bookingFieldCheckIn">
                  <span>Check in</span>
                  <input
                    type="date"
                    min={formatDateInput(today)}
                    value={bookCheckIn}
                    onChange={(e) => {
                      const next = e.target.value
                      setBookCheckIn(next)
                      if (next && bookCheckOut && parseDateInput(bookCheckOut) <= parseDateInput(next)) {
                        setBookCheckOut(formatDateInput(addDays(parseDateInput(next), 1)))
                      }
                    }}
                  />
                </label>

                <label className="bookingField">
                  <span>Check out</span>
                  <input
                    type="date"
                    min={formatDateInput(addDays(parseDateInput(bookCheckIn), 1))}
                    value={bookCheckOut}
                    onChange={(e) => setBookCheckOut(e.target.value)}
                  />
                </label>

                <label className="bookingField">
                  <span>Adults</span>
                  <select value={bookAdults} onChange={(e) => setBookAdults(Number(e.target.value))}>
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="bookingField">
                  <span>Rooms</span>
                  <select value={bookRooms} onChange={(e) => setBookRooms(Number(e.target.value))}>
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="bookingFeatureMeta">
                <div>
                  <div className="bookingFeatureSmall">Stay summary</div>
                  <div className="bookingFeatureSummary">
                    {formatDisplayDate(bookCheckIn)} — {formatDisplayDate(bookCheckOut)} · {nightsBetween(bookCheckIn, bookCheckOut)} night{nightsBetween(bookCheckIn, bookCheckOut) === 1 ? '' : 's'}
                  </div>
                </div>

                <a className="bookingFeatureButton" href={bookingUrl} target="_blank" rel="noreferrer">
                  Check availability
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section sectionBottom">
        <div className="container">
          <div className="grid2">
            <div className="panel panel--mapLuxury">
              <div className="eyebrow">LOCATION</div>
              <h3 className="h3">Uluwatu, Bali</h3>
              <p className="panelText">
                Set in Uluwatu, above the Indian Ocean and just moments from Nunggalan Beach, Vanara is positioned within one of Bali’s most sought-after coastal landscapes.
              </p>

              <div className="luxMapWrap" aria-label="Vanara location map">
                <div className="luxMapFrame">
                  <iframe
                    src="https://www.google.com/maps?q=-8.8421164,115.1117122&z=16&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Vanara Resort & Spa map"
                  />
                  <div className="luxMapTone" aria-hidden="true" />
                  <div className="luxMapGrain" aria-hidden="true" />
                  <div className="luxMapPulse" aria-hidden="true" />
                  <div className="luxMapPin" aria-hidden="true">
                    <span className="luxMapPinDot" />
                  </div>
                  <div className="luxMapCard">
                    <div className="luxMapCardKicker">The Map</div>
                    <div className="luxMapCardTitle">Vanara Resort &amp; Spa</div>
                    <div className="luxMapCardText">Clifftop setting in Uluwatu, Bali</div>
                  </div>
                </div>

                <div className="luxMapActions">
                  <a
                    className="luxMapLink"
                    href="https://www.google.com/maps/@-8.8421164,115.1117122,17z?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open map
                  </a>
                  <a
                    className="luxMapButton"
                    href="https://www.google.com/maps/dir/?api=1&destination=-8.8421164,115.1117122"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Get directions
                  </a>
                </div>
              </div>
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