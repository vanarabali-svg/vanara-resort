'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

export default function ExperiencePage() {
  const gallery = useMemo(
    () => [
      { src: '/gallery-1.jpg', alt: 'Ocean horizon at Vanara' },
      { src: '/gallery-2.jpg', alt: 'Architecture and texture' },
      { src: '/gallery-3.jpg', alt: 'Dining ritual at sunset' },
      { src: '/experience.jpg', alt: 'Cliffside atmosphere' },
      { src: '/wedding.jpg', alt: 'Intimate wedding above the ocean' },
    ],
    []
  )

  const trackRef = useRef<HTMLDivElement | null>(null)
  const slideRefs = useRef<(HTMLElement | null)[]>([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const root = trackRef.current
    if (!root) return

    const items = slideRefs.current.filter(Boolean) as HTMLElement[]
    if (!items.length) return

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the most visible slide
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0]

        if (!visible) return
        const idx = items.indexOf(visible.target as HTMLElement)
        if (idx >= 0) setActive(idx)
      },
      {
        root,
        threshold: [0.35, 0.5, 0.65, 0.8],
      }
    )

    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [gallery.length])

  const counter = `${String(active + 1).padStart(2, '0')} / ${String(gallery.length).padStart(2, '0')}`

  return (
    <main className="home">
      {/* HERO */}
      <section className="hero hero--short">
        <img className="heroImage" src="/experience.jpg" alt="Vanara experiences" />
        <div className="heroShade" />

        <div className="heroContent">
          <span className="heroKicker">EXPERIENCE</span>
          <h1 className="heroTitle">The Rhythm of Vanara</h1>
          <p className="heroSub">Curated moments — calm, private, unforgettable.</p>

          <div className="heroLinks">
            <a className="heroLink" href="#signature">Signature</a>
            <a className="heroLink" href="#gallery">Gallery</a>
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
              Experiences at Vanara are shaped by the coastline — sunrise and salt air, shaded afternoons, and evenings
              that arrive softly. Everything is unhurried, discreet, and tailored to your pace.
            </p>
            <p>
              Choose a rhythm: movement or silence, adventure or restoration. We handle the details quietly — timing,
              transfers, reservations, and pacing — so the day feels effortless.
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
            <div className="card" style={{ cursor: 'default' }}>
              <div className="cardLabel">SUNRISE</div>
              <h3 className="cardTitle">Cliffside meditation</h3>
              <p className="cardText">Gentle guidance, ocean air, and an unbroken horizon — a calm beginning.</p>
              <span className="cardLink">By request</span>
            </div>

            <div className="card" style={{ cursor: 'default' }}>
              <div className="cardLabel">OCEAN</div>
              <h3 className="cardTitle">Sound bathing</h3>
              <p className="cardText">A slow reset — breath, vibration, and sea rhythm, designed for restoration.</p>
              <span className="cardLink">Restorative</span>
            </div>

            <div className="card" style={{ cursor: 'default' }}>
              <div className="cardLabel">DINING</div>
              <h3 className="cardTitle">Private chef’s table</h3>
              <p className="cardText">Seasonal menus, candlelight, and precise service — intimate and unhurried.</p>
              <span className="cardLink">Quietly elevated</span>
            </div>
          </div>
        </div>
      </section>

      {/* LUXURY GALLERY CAROUSEL — AMAN FEEL */}
      <section className="section sectionLuxGallery" id="gallery">
        <div className="container">
          <div className="luxGalleryHead">
            <div className="eyebrow">GALLERY</div>
            <h2 className="h2">A slow sequence of light</h2>
            <div className="copy">
              <p>
                Scroll gently — place first. Horizon, texture, water, ritual. No arrows, no noise — just a quiet
                progression.
              </p>
            </div>
          </div>

          <div className="luxCarousel" aria-label="Vanara photo gallery">
            <div className="luxCarouselTop" aria-hidden="true">
              <div className="luxCounter">{counter}</div>
              <div className="luxLine" />
            </div>

            <div className="luxCarouselTrack" ref={trackRef}>
              {gallery.map((item, i) => (
                <figure
                  key={item.src}
                  className={`luxSlide${i === active ? ' is-active' : ''}`}
                  ref={(el) => { slideRefs.current[i] = el }}
                >
                  <img src={item.src} alt={item.alt} loading="lazy" />
                </figure>
              ))}
            </div>

            <div className="luxCarouselFade luxCarouselFadeLeft" aria-hidden="true" />
            <div className="luxCarouselFade luxCarouselFadeRight" aria-hidden="true" />
          </div>

          <div className="luxHint">Drag / scroll to explore</div>
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
                  We curate details with discretion: timing, sound, florals, lighting, dining, and service — refined,
                  minimal, and never excessive.
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

              <a className="textCta" href="/connect">Enquire about weddings</a>
              <div className="smallprint" style={{ marginTop: 10 }}>
                Share your preferred dates, estimated guest count, and ceremony time (sunset / daytime).
              </div>
            </div>

            <div className="imagePlaceholder" aria-label="Wedding image">
              <img className="experienceImg" src="/wedding.jpg" alt="Wedding at Vanara" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
