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
        alt: 'Handcrafted local excursion',
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
    }, 7200)
  }

  useEffect(() => {
    play()
    return pause
  }, [])

  return (
    <div className="page page-experience">
      {/* HERO */}
      <section className="experienceHero">
        <img className="experienceHeroImg" src="/experience-hero.jpg" alt="Vanara experiences" />
        <div className="experienceHeroShade" />
        <div className="experienceHeroGrain" aria-hidden="true" />

        <div className="experienceHeroContent">
          <div className="heroKicker">EXPERIENCE</div>
          <h1 className="experienceHeroTitle">Curated days, quietly unforgettable</h1>
          <p className="experienceHeroLead">
            Sunrise rituals, ocean stillness, firelit dinners — designed with restraint and guided by the rhythm of the
            coast.
          </p>
        </div>
      </section>

      {/* CAROUSEL (no arrows) */}
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

              <div className="carouselDots" aria-label="Slides">
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
            </div>
          </div>
        </div>
      </section>

      {/* ADD 1: THE RHYTHM OF THE DAY (recommended) */}
      <section className="section sectionExperienceRhythm">
        <div className="container">
          <div className="eyebrow">THE RHYTHM</div>
          <h2 className="h2">The rhythm of the day</h2>

          <div className="copy">
            <p>
              Days at Vanara are not scheduled — they unfold.
            </p>
            <p>
              Morning is light and air, when the cliffs are still cool and the ocean moves slowly below. Midday belongs
              to shade, water, and rest. Evenings arrive with warmth, low voices, and firelight.
            </p>
            <p>
              Everything is available. Nothing is imposed.
            </p>
          </div>

          <div className="rule" />
        </div>
      </section>

      {/* ADD 2: OUR APPROACH (recommended) */}
      <section className="section sectionExperienceApproach">
        <div className="container">
          <div className="eyebrow">APPROACH</div>
          <h3 className="h3">Our approach</h3>

          <div className="copy">
            <p>
              We believe experiences should feel personal, not programmed.
            </p>
            <p>
              Some guests arrive seeking restoration. Others arrive curious, or celebratory. Many arrive unsure — and
              leave lighter.
            </p>
            <p>
              Our role is simple: to listen carefully, and arrange quietly.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
