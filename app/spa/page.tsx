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
        text: 'A slow, full-body ritual using warm minerals and rhythmic massage — designed to soften the nervous system.',
        meta: '90 min',
      },
      {
        label: 'HEAT',
        title: 'Warm Stone Release',
        text: 'Basalt warmth, long strokes, and quiet pressure to dissolve tension from shoulders, back, and hips.',
        meta: '75 min',
      },
      {
        label: 'BREATH',
        title: 'Breath & Bodywork',
        text: 'A grounding blend of breathwork, stretching, and bodywork — steadying, calming, and deeply restorative.',
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
        subtitle: 'Slow, traditional, unhurried.',
        body:
          'Long, continuous strokes and gentle acupressure calm the body and smooth the breath. A quiet, classic treatment that feels like being returned to balance.',
        idealFor: ['Jet lag', 'Restless sleep', 'First day reset'],
        includes: ['Foot cleanse + warm towel', 'Aromatherapy selection', 'Calming tea in the lounge'],
      },
      {
        title: 'Deep Tissue & Stretch',
        duration: '75 / 90 min',
        subtitle: 'Focused pressure for true release.',
        body:
          'Targeted work for shoulders, back, hips, and legs — paired with slow assisted stretches. Stronger where needed, always controlled and mindful.',
        idealFor: ['Training fatigue', 'Long travel', 'Neck + shoulder tension'],
      },
      {
        title: 'Mineral Body Polish',
        duration: '60 min',
        subtitle: 'Glow without noise.',
        body:
          'A gentle exfoliation with ocean minerals and botanical oils, followed by a hydrating finish. Skin feels clean, warm, and quietly radiant.',
        idealFor: ['Pre-dinner glow', 'Dry coastal skin', 'A fresh start'],
      },
      {
        title: 'Botanical Facial',
        duration: '60 / 75 min',
        subtitle: 'Clean care, calm touch.',
        body:
          'A tailored facial that focuses on hydration, barrier support, and circulation. Expect slow massage, warm compresses, and simple, effective steps.',
        idealFor: ['Dehydration', 'Sensitivity', 'Travel-worn skin'],
      },
      {
        title: 'After-Surf Recovery',
        duration: '60 / 90 min',
        subtitle: 'Legs, back, and salt-tired muscles.',
        body:
          'Cooling-to-warm contrast, focused leg work, and gentle mobility. Built for those who spent the day in sun, sea, and movement.',
        idealFor: ['Surf + swim recovery', 'Sun fatigue', 'Lower-body tightness'],
      },
      {
        title: 'Couples Ritual',
        duration: '75 / 90 min',
        subtitle: 'Two tables, one pace.',
        body:
          'Side-by-side bodywork in a quiet suite — aligned pressure, shared silence, and an unhurried finish. A simple, intimate ritual.',
        idealFor: ['Anniversaries', 'A calm shared reset', 'Honeymoon stays'],
      },
    ],
    []
  )

  const addOns = useMemo(
    () => [
      { title: 'Scalp & Temple Release', duration: '15 min', note: 'A quiet finish for clarity and calm.' },
      { title: 'Foot Ritual', duration: '20 min', note: 'Warm soak, scrub, and slow pressure points.' },
      { title: 'Thermal Circuit', duration: '45 min', note: 'Steam, rinse, cold, mineral warmth — guided and unhurried.' },
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
          <p className="heroSub">Restorative therapies guided by warmth, breath, and ocean minerals.</p>

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
          <h2 className="h2">Restoration, without rush</h2>

          <div className="copy">
            <p>
              Vanara Spa is a quiet refuge of stone, shade, and sea air. Treatments are slow and intentional — designed
              to settle the nervous system, soften the body, and return you to an easier breath.
            </p>
            <p>
              Choose bodywork, mineral therapies, and botanicals — each ritual is tailored to your pace. We begin with a
              simple arrival: warm towel, foot cleanse, calm guidance.
            </p>
          </div>

          <div className="rule" />
        </div>
      </section>

      {/* SIGNATURE */}
      <section className="section" id="signature" style={anchorStyle}>
        <div className="container">
          <div className="eyebrow">SIGNATURE</div>
          <h3 className="h3">Quiet essentials</h3>

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
          <h2 className="h2">Treatments &amp; rituals</h2>
          <div className="copy">
            <p>
              A calm collection of bodywork, minerals, and botanicals. If you’re unsure what to choose, tell us how you
              feel — we’ll recommend the right pace, pressure, and focus.
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

                    {item.includes?.length ? (
                      <div className={styles.detailsRow}>
                        <div className={styles.detailsLabel}>Includes</div>
                        <ul className={styles.detailsBullets}>
                          {item.includes.map((x) => (
                            <li key={x}>{x}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    <div className={styles.detailsCtaRow}>
                      <a className="textCta" href="/book">Reserve this ritual</a>
                      <span className={styles.detailsHint}>
                        or <a href="/connect">ask for a recommendation</a>
                      </span>
                    </div>
                  </div>
                </details>
              ))}
            </div>

            <aside className={styles.detailsAside} aria-label="Spa notes">
              <div className="panel">
                <div className="eyebrow">ADD-ONS</div>
                <h3 className="h3" style={{ fontSize: 28, marginBottom: 10 }}>Quiet refinements</h3>
                <p className="panelText">
                  Add a small ritual to your treatment — simple, precise, and deeply satisfying.
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
                  For pregnancy, injuries, or sensitivities, share details in advance so we can tailor safely.
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
          <h2 className="h2">Heat, cold, and stillness</h2>

          <div className="split">
            <div>
              <div className="copy">
                <p>
                  A simple circuit of warmth and contrast can change everything — muscles soften, breath deepens, and the
                  mind becomes quieter.
                </p>
                <p>
                  We guide you through an unhurried sequence: steam, rinse, cold plunge, mineral warmth, then rest.
                  Arrive early or add it after bodywork.
                </p>
              </div>

              <div className="eyebrow" style={{ marginTop: 22 }}>INCLUDES</div>
              <ul className="bullets">
                <li>Aromatic steam + warm rinse</li>
                <li>Cold plunge (optional intensity)</li>
                <li>Mineral warmth + hydration ritual</li>
                <li>Quiet lounge with tea</li>
              </ul>

              <a className="textCta" href="/book">Book thermal circuit</a>
              <div className="smallprint" style={{ marginTop: 10 }}>
                Tip: Pair with Deep Tissue &amp; Stretch for the most complete reset.
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
            <h2 className="h2">Light, water, texture</h2>
            <div className="copy">
              <p>
                A quiet sequence — stone warmth, soft linen, and the ocean always nearby. Scroll gently.
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
              <h3 className="h3">Before your ritual</h3>

              <div className={styles.detailsList} aria-label="Spa FAQ">
                <details className={styles.detailsItem}>
                  <summary className={styles.detailsSummary}>
                    <span className={styles.detailsTitle}>When should I arrive?</span>
                    <span className={styles.detailsMeta}>Timing</span>
                  </summary>
                  <div className={styles.detailsBody}>
                    <p className={styles.detailsText}>
                      Arrive 10–15 minutes early to settle, choose aromatherapy, and begin slowly. If you’re adding the
                      thermal circuit, arrive 30 minutes early.
                    </p>
                  </div>
                </details>

                <details className={styles.detailsItem}>
                  <summary className={styles.detailsSummary}>
                    <span className={styles.detailsTitle}>What if I’m pregnant or have an injury?</span>
                    <span className={styles.detailsMeta}>Care</span>
                  </summary>
                  <div className={styles.detailsBody}>
                    <p className={styles.detailsText}>
                      Let us know in advance. We can adjust positioning, pressure, and products — or recommend a better
                      fit.
                    </p>
                  </div>
                </details>

                <details className={styles.detailsItem}>
                  <summary className={styles.detailsSummary}>
                    <span className={styles.detailsTitle}>Can you tailor pressure and focus?</span>
                    <span className={styles.detailsMeta}>Yes</span>
                  </summary>
                  <div className={styles.detailsBody}>
                    <p className={styles.detailsText}>
                      Always. Tell us if you prefer light, medium, or deep pressure — and where you hold tension. We’ll
                      build the session around you.
                    </p>
                  </div>
                </details>
              </div>
            </div>

            <div className="panel">
              <div className="eyebrow">BOOK</div>
              <h3 className="h3">Reserve a session</h3>
              <p className="panelText">
                For the calmest schedule, book in advance — especially at sunset. If you’d like a full plan (spa,
                dining, experiences), we can curate your stay quietly.
              </p>

              <a className="textCta" href="/book">Reserve now</a>
              <div className="smallprint" style={{ marginTop: 10 }}>
                Prefer to speak with our team? <a href="/connect">Contact us</a>.
              </div>

              <div className="rule" style={{ marginTop: 18 }} />

              <div className="eyebrow" style={{ marginTop: 18 }}>SUGGESTED COMBINATIONS</div>
              <ul className="bullets" style={{ marginTop: 8 }}>
                <li>Thermal Circuit + Deep Tissue &amp; Stretch</li>
                <li>Mineral Body Polish + Botanical Facial</li>
                <li>Warm Stone Release + Scalp &amp; Temple Add-on</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
