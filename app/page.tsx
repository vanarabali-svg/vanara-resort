import Link from 'next/link'
import { sanityClient } from '@/lib/sanity.client'

export default async function HomePage() {
  // optional: used later if you want dynamic CTA
  const heroVilla = await sanityClient.fetch(`
    *[_type=="accommodation"] | order(_createdAt desc)[0]{
      title,
      "slug": slug.current
    }
  `)

  return (
    <main>
      {/* HERO VIDEO (AMAN STYLE) */}
      <section className="heroA">
        <video
          className="heroVideo"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* Dark cinematic overlay */}
        <div className="heroAInner">
          <div className="container">
            <div className="heroAKicker">
              Vanara Resort & Spa • Uluwatu
            </div>

            <h1 className="heroATitle">
              Quiet luxury <span>by the ocean</span>
            </h1>

            <p className="heroASub">
              An intimate collection of villas shaped by nature — sandstone,
              water, and open horizons. Designed for stillness, privacy,
              and uninterrupted views.
            </p>

            <div className="heroAActions">
              <Link className="btn btnPrimary" href="/accommodation">
                Explore Villas
              </Link>

              {heroVilla?.slug && (
                <Link className="btn" href={`/accommodation/${heroVilla.slug}`}>
                  View {heroVilla.title}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL INTRO */}
      <section className="sectionA">
        <div className="container">
          <div className="splitA">
            <div>
              <div className="kicker">The Resort</div>
              <div className="hr" style={{ maxWidth: 180 }} />
              <h2 className="h2A">
                A sanctuary of stillness
              </h2>
            </div>

            <div>
              <p className="leadA">
                Elevated above the shoreline, Vanara is a calm retreat where
                indoor–outdoor living meets refined craftsmanship.
                Every detail is intentional — natural textures, soft light,
                and privacy in every direction.
              </p>

              <div style={{ marginTop: 22, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link className="btn" href="/experiences">Experiences</Link>
                <Link className="btn" href="/dining">Dining</Link>
                <Link className="btn btnPrimary" href="/book">Reserve</Link>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 64 }} className="rule" />
        </div>
      </section>

      {/* FEATURES */}
      <section className="sectionA noTop">
        <div className="container">
          <div className="featureGridA">
            <div className="featureA">
              <div className="kicker">Design</div>
              <div className="hr" />
              <div className="featureATitle">
                Minimal. Tactile. Cinematic.
              </div>
              <p className="featureAText">
                Warm sand tones below, cool emerald water above, and
                generous negative space throughout.
              </p>
            </div>

            <div className="featureA">
              <div className="kicker">Location</div>
              <div className="hr" />
              <div className="featureATitle">
                Uluwatu, privately
              </div>
              <p className="featureAText">
                Close to iconic cliffs and beaches, yet hidden from crowds —
                ideal for restorative days and golden-hour rituals.
              </p>
            </div>

            <div className="featureA">
              <div className="kicker">Service</div>
              <div className="hr" />
              <div className="featureATitle">
                Discreet & personal
              </div>
              <p className="featureAText">
                Thoughtful hospitality and curated experiences —
                always present, never intrusive.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
