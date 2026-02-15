'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import styles from './spa.module.css'

type MenuItem = {
  title: string
  duration: string
  subtitle: string
  body: string
  idealFor: string[]
  includes?: string[]
}

export default function SpaPage() {
  const signature = useMemo(
    () => [
      {
        label: 'MINERALS',
        title: 'Ocean Mineral Reset',
        text: 'Warm minerals and slow massage. A long exhale.',
        meta: '90 min',
      },
      {
        label: 'HEAT',
        title: 'Warm Stone Release',
        text: 'Basalt heat, long strokes, quiet release.',
        meta: '75 min',
      },
      {
        label: 'BREATH',
        title: 'Breath & Bodywork',
        text: 'Breathwork with gentle stretch. Settle and soften.',
        meta: '60 min',
      },
    ],
    []
  )

  const menu = useMemo<MenuItem[]>(
    () => [
      {
        title: 'Balinese Flow Massage',
        duration: '60 / 90 min',
        subtitle: 'Slow and traditional.',
        body: 'Long strokes and gentle pressure to return the body to calm.',
        idealFor: ['Jet lag', 'Restless sleep'],
      },
      {
        title: 'Deep Tissue & Stretch',
        duration: '75 / 90 min',
        subtitle: 'Precise and grounded.',
        body: 'Focused work for back, shoulders, hips, and legs — with assisted stretch.',
        idealFor: ['Tension', 'Training fatigue'],
      },
      {
        title: 'Mineral Body Polish',
        duration: '60 min',
        subtitle: 'Clean glow.',
        body: 'Ocean minerals and botanical oils. Smooth skin, warm finish.',
        idealFor: ['Dry skin', 'Fresh start'],
      },
      {
        title: 'Botanical Facial',
        duration: '60 / 75 min',
        subtitle: 'Simple, effective care.',
        body: 'Hydration, barrier support, and slow facial massage.',
        idealFor: ['Dehydration', 'Sensitivity'],
      },
      {
        title: 'After-Surf Recovery',
        duration: '60 / 90 min',
        subtitle: 'For salt-tired muscles.',
        body: 'Cooling-to-warm contrast and lower-body release after sun and sea.',
        idealFor: ['Soreness', 'Sun fatigue'],
      },
      {
        title: 'Couples Ritual',
        duration: '75 / 90 min',
        subtitle: 'Two tables, one pace.',
        body: 'Side-by-side bodywork in a quiet suite. Unhurried and intimate.',
        idealFor: ['Anniversaries', 'Honeymoon'],
      },
    ],
    []
  )

  const addOns = useMemo(
    () => [
      { title: 'Scalp & Temple', duration: '15 min', note: 'Clear the mind.' },
      { title: 'Foot Ritual', duration: '20 min', note: 'Warm soak + pressure points.' },
      { title: 'Thermal Circuit', duration: '45 min', note: 'Steam, cold, warmth, rest.' },
    ],
    []
  )

  const gallery = useMemo(
    () => [
      { src: '/gallery-2.jpg', alt: 'Spa textures and warm stone' },
      { src: '/experience-1.jpg', alt: 'Quiet architecture and light' },
      { src: '/gallery-1.jpg', alt: 'Ocean horizon and calm water' },
      { src: '/experience-2.jpg', alt: 'Candlelight and ritual atmosphere' },
      { src: '/gallery-3.jpg', alt: 'Evening calm at Vanara' },
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
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0]

        if (!visible) return
        const idx = items.indexOf(visible.target as HTMLElement)
        if (idx >= 0) setActive(idx)
      },
      { root, threshold: [0.35, 0.5, 0.65, 0.8] }
    )

    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [gallery.length])

  const counter = `${String(active + 1).padStart(2, '0')} / ${String(gallery.length).padStart(2, '0')}`
  const anchorStyle: CSSProperties = { scrollMarginTop: 'calc(var(--navH) + 24px)' }

  return (
    <main className="home">
      {/* HERO */}
      <section className="hero hero--short">
        <img className="heroImage" src="/gallery-2.jpg" alt="Vanara Spa" />
        <div className="heroShade" />

        <div className="heroContent">
          <span className="heroKicker">SPA</span>
          <h1 className="heroTitle">Spa &amp; Rituals</h1>
          <p className="heroSub">Quiet restoration. Warmth, breath, minerals.</p>

          <div className="heroLinks">
            <a className="heroLink" href="#signature">Signature</a>
            <a className="heroLink" href="#menu">Menu</a>
            <a className="heroLink" href="#thermal">Thermal</a>
            <a className="heroLink" href="#gallery">Gallery</a>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="section">
        <div className="container">
          <div className="eyebrow">PHILOSOPHY</div>
          <h2 className="h2">A calm place to return</h2>

          <div className="copy">
            <p>
              Stone, shade, sea air. Treatments are slow and tailored — designed to settle the body and quiet the mind.
            </p>
          </div>

          <div className="rule" />
        </div>
      </section>

      {/* SIGNATURE */}
      <section className="section" id="signature" style={anchorStyle}>
        <div className="container">
          <div className="eyebrow">SIGNATURE</div>
          <h3 className="h3">Essentials</h3>

          <div className="grid3">
            {signature.map((s) => (
              <div key={s.title} className="card" style={{ cursor: 'default' }}>
                <div className="cardLabel">{s.label}</div>
                <h3 className="cardTitle">{s.title}</h3>
                <p className="cardText">{s.text}</p>
                <span className="cardLink">{s.meta}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MENU */}
      <section className="section" id="menu" style={anchorStyle}>
        <div className="container">
          <div className="eyebrow">MENU</div>
          <h2 className="h2">Treatments</h2>
          <div className="copy">
            <p>
              Tell us how you feel — we’ll guide the pace, pressure, and focus.
            </p>
          </div>

          <div className={styles.detailsGrid}>
            <div className={styles.detailsList} aria-label="Spa treatment menu">
              {menu.map((item) => (
                <details key={item.title} className={styles.detailsItem}>
                  <summary className={styles.detailsSummary}>
                    <span className={styles.detailsTitle}>{item.title}</span>
                    <span className={styles.detailsMeta}>{item.duration}</span>
                  </summary>

                  <div className={styles.detailsBody}>
                    <div className={styles.detailsSubtitle}>{item.subtitle}</div>
                    <p className={styles.detailsText}>{item.body}</p>

                    <div className={styles.detailsRow}>
                      <div className={styles.detailsLabel}>Ideal for</div>
                      <div className={styles.chipRow}>
                        {item.idealFor.map((t) => (
                          <span key={t} className={styles.chip}>{t}</span>
                        ))}
                      </div>
                    </div>

                    <div className={styles.detailsCtaRow}>
                      <a className="textCta" href="/book">Reserve</a>
                      <span className={styles.detailsHint}>
                        or <a href="/connect">ask us</a>
                      </span>
                    </div>
                  </div>
                </details>
              ))}
            </div>

            <aside className={styles.detailsAside} aria-label="Spa notes">
              <div className="panel">
                <div className="eyebrow">ADD-ONS</div>
                <h3 className="h3" style={{ fontSize: 28, marginBottom: 10 }}>Small rituals</h3>
                <p className="panelText">
                  Add a quiet finish.
                </p>

                <div className={styles.miniList}>
                  {addOns.map((a) => (
                    <div key={a.title} className={styles.miniItem}>
                      <div className={styles.miniTop}>
                        <div className={styles.miniTitle}>{a.title}</div>
                        <div className={styles.miniMeta}>{a.duration}</div>
                      </div>
                      <div className={styles.miniText}>{a.note}</div>
                    </div>
                  ))}
                </div>

                <div className="rule" style={{ marginTop: 18 }} />

                <div className="smallprint" style={{ marginTop: 12 }}>
                  Please share pregnancy, injuries, or sensitivities in advance.
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* THERMAL */}
      <section className="section" id="thermal" style={anchorStyle}>
        <div className="container">
          <div className="eyebrow">THERMAL</div>
          <h2 className="h2">Heat. Cold. Rest.</h2>

          <div className="split">
            <div>
              <div className="copy">
                <p>
                  An unhurried circuit to soften muscles and steady the breath.
                </p>
              </div>

              <div className="eyebrow" style={{ marginTop: 22 }}>SEQUENCE</div>
              <ul className="bullets">
                <li>Steam</li>
                <li>Cold plunge (optional)</li>
                <li>Mineral warmth</li>
                <li>Quiet lounge + tea</li>
              </ul>

              <a className="textCta" href="/book">Book thermal</a>
              <div className="smallprint" style={{ marginTop: 10 }}>
                Pair with Deep Tissue &amp; Stretch for deeper release.
              </div>
            </div>

            <div className="imagePlaceholder" aria-label="Thermal suite image">
              <img className="experienceImg" src="/gallery-1.jpg" alt="Ocean horizon and calm water" />
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section sectionLuxGallery" id="gallery" style={anchorStyle}>
        <div className="container">
          <div className="luxGalleryHead">
            <div className="eyebrow">GLIMPSES</div>
            <h2 className="h2">Light &amp; water</h2>
            <div className="copy">
              <p>
                A few quiet moments.
              </p>
            </div>
          </div>

          <div className="luxCarousel" aria-label="Vanara Spa gallery">
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

          <div className="luxHint">Scroll</div>
        </div>
      </section>

      {/* FAQ + BOOKING */}
      <section className="section">
        <div className="container">
          <div className="grid2">
            <div className="panel">
              <div className="eyebrow">FAQ</div>
              <h3 className="h3">Before you arrive</h3>

              <div className={styles.detailsList} aria-label="Spa FAQ">
                <details className={styles.detailsItem}>
                  <summary className={styles.detailsSummary}>
                    <span className={styles.detailsTitle}>Arrival time</span>
                    <span className={styles.detailsMeta}>10–15 min</span>
                  </summary>
                  <div className={styles.detailsBody}>
                    <p className={styles.detailsText}>
                      Arrive early to settle. For thermal, arrive 30 minutes early.
                    </p>
                  </div>
                </details>

                <details className={styles.detailsItem}>
                  <summary className={styles.detailsSummary}>
                    <span className={styles.detailsTitle}>Pregnancy or injury</span>
                    <span className={styles.detailsMeta}>Tell us</span>
                  </summary>
                  <div className={styles.detailsBody}>
                    <p className={styles.detailsText}>
                      We’ll adjust the session — or suggest the right alternative.
                    </p>
                  </div>
                </details>

                <details className={styles.detailsItem}>
                  <summary className={styles.detailsSummary}>
                    <span className={styles.detailsTitle}>Pressure &amp; focus</span>
                    <span className={styles.detailsMeta}>Tailored</span>
                  </summary>
                  <div className={styles.detailsBody}>
                    <p className={styles.detailsText}>
                      Light to deep. Tell us where you hold tension.
                    </p>
                  </div>
                </details>
              </div>
            </div>

            <div className="panel">
              <div className="eyebrow">BOOK</div>
              <h3 className="h3">Reserve</h3>
              <p className="panelText">
                Sunset is popular. Book ahead for the calmest schedule.
              </p>

              <a className="textCta" href="/book">Reserve now</a>
              <div className="smallprint" style={{ marginTop: 10 }}>
                Prefer guidance? <a href="/connect">Contact us</a>.
              </div>

              <div className="rule" style={{ marginTop: 18 }} />

              <div className="eyebrow" style={{ marginTop: 18 }}>PAIRINGS</div>
              <ul className="bullets" style={{ marginTop: 8 }}>
                <li>Thermal + Deep Tissue</li>
                <li>Mineral Polish + Facial</li>
                <li>Warm Stone + Scalp</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
