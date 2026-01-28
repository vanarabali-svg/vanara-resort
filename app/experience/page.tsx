'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

type Slide = {
  src: string
  alt: string
  kicker: string
  title: string
  text: string
}

export default function ExperiencePage() {
  const slides: Slide[] = useMemo(
    () => [
      {
        src: '/experience-1.jpg',
        alt: 'Cliffside sunrise ritual',
        kicker: 'DAWN',
        title: 'Cliffside dawn ritual',
        text:
          'Begin above the waterline — a quiet sequence of breath, warm stone, and the first light on the horizon.',
      },
      {
        src: '/experience-2.jpg',
        alt: 'Ocean sound bathing',
        kicker: 'WATER',
        title: 'Ocean sound bathing',
        text:
          'A slow immersion in tone and tide. Hear the coast; let the body soften, then settle into stillness.',
      },
      {
        src: '/experience-3.jpg',
        alt: 'Private dining experience',
        kicker: 'EVENING',
        title: 'Private dining by firelight',
        text:
          'Seasonal plates, minimal gesture, perfect timing — served where the air is warm and the ocean stays close.',
      },
      {
        src: '/experience-4.jpg',
        alt: 'Guided local excursion',
        kicker: 'BEYOND',
        title: 'Handcrafted local excursions',
        text:
          'Quiet routes to hidden beaches, limestone paths, and cultural moments — curated gently, never rushed.',
      },
    ],
    []
  )

  const [index, setIndex] = useState(0)
  const total = slides.length
  const timerRef = useRef<number | null>(null)

  const go = (next: number) => setIndex((next + total) % total)

  const pause = () => {
    if (timerRef.current) window.clearInterval(timerRef.current)
    timerRef.current = null
  }

  const play = () => {
    pause()
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % total)
    }, 6500)
  }

  useEffect(() => {
    play()
    return pause
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(index + 1)
      if (e.key === 'ArrowLeft') go(index - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  return (
    <div className="page page-experience">
      <section className="pageHero">
        <div className="pageHeroInner">
          <div className="eyebrow">EXPERIENCE</div>
          <h1 className="pageTitle">Curated days, quietly unforgettable</h1>
          <p className="pageLead">
            From sunrise rituals to firelit dinners — experiences designed with restraint, guided by nature, and shaped
            by the rhythm of the coast.
          </p>
        </div>
      </section>

      <section className="section sectionExperienceCarousel">
        <div className="container">
          <div className="carouselShell" onMouseEnter={pause} onMouseLeave={play}>
            <div className="carouselMedia">
              {slides.map((s, i) => (
                <img
                  key={s.src}
                  src={s.src}
                  alt={s.alt}
                  className={`carouselImg ${i === index ? 'is-active' : ''}`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              ))}
              <div className="carouselShade" />
            </div>

            <div className="carouselContent">
              <div className="carouselKicker">{slides[index].kicker}</div>
              <div className="carouselTitle">{slides[index].title}</div>
              <div className="carouselText">{slides[index].text}</div>

              <div className="carouselControls">
                <button className="carouselBtn" type="button" onClick={() => go(index - 1)} aria-label="Previous">
                  <span aria-hidden="true">‹</span>
                </button>

                <div className="carouselDots" role="tablist" aria-label="Slides">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`dot ${i === index ? 'is-active' : ''}`}
                      onClick={() => go(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      aria-current={i === index ? 'true' : 'false'}
                    />
                  ))}
                </div>

                <button className="carouselBtn" type="button" onClick={() => go(index + 1)} aria-label="Next">
                  <span aria-hidden="true">›</span>
                </button>
              </div>

              <div className="carouselHint">
                Add images to <code>/public/experience-1.jpg</code> … <code>experience-4.jpg</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section sectionExperienceContent">
        <div className="container">
          <div className="grid2">
            <div className="panel">
              <div className="eyebrow">RITUALS</div>
              <h3 className="h3">A slower way to arrive</h3>
              <p className="panelText">
                Morning begins with salt air and soft movement. Afternoon is shade, water, and quiet attention. Evening
                arrives gently — with warm light and low voices.
              </p>
              <ul className="bullets">
                <li>Sunrise breathwork &amp; meditation</li>
                <li>Ocean mineral bathing</li>
                <li>Restorative heat &amp; bodywork</li>
                <li>Private dining moments</li>
              </ul>
            </div>

            <div className="panel">
              <div className="eyebrow">BEYOND</div>
              <h3 className="h3">Uluwatu, in detail</h3>
              <p className="panelText">
                Explore with discretion — hidden beaches, limestone paths, artisan workshops, and cultural sites — all
                curated to feel personal, never touristic.
              </p>
              <p className="panelText">
                If you prefer, we’ll design a day with almost no schedule — just a direction, and the freedom to linger.
              </p>
            </div>
          </div>

          <div className="rule" />
        </div>
      </section>

      <section className="section sectionCta">
        <div className="container">
          <div className="ctaBlock">
            <div className="ctaText">
              <div className="eyebrow">PLAN</div>
              <h3 className="h3">Tell us what you’re seeking</h3>
              <p className="panelText">
                Stillness, celebration, restoration — we’ll shape a simple itinerary around your pace.
              </p>
            </div>

            <a className="reserve-pill reserve-dark" href="/connect">
              Connect
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
