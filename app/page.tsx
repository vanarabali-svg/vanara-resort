import Image from 'next/image'
import Link from 'next/link'
import { sanityClient } from '@/lib/sanity.client'
import { urlFor } from '@/lib/sanity.image'

export default async function HomePage() {
  const heroVilla = await sanityClient.fetch(`
    *[_type=="accommodation"] | order(_createdAt desc)[0]{
      title,
      subtitle,
      "slug": slug.current,
      heroImage
    }
  `)

  const heroUrl = heroVilla?.heroImage
    ? urlFor(heroVilla.heroImage).width(2600).height(1600).url()
    : null

  return (
    <main>
      {/* AMAN HERO */}
      <section className="heroA">
        {heroUrl && (
          <Image
            src={heroUrl}
            alt={heroVilla?.title || 'Vanara Resort & Spa'}
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        )}

        <div className="heroAInner">
          <div className="container">
            <div className="heroAKicker">Vanara Resort & Spa • Uluwatu</div>

            <h1 className="heroATitle">
              Quiet luxury <span>by the ocean</span>
            </h1>

            <p className="heroASub">
              An intimate collection of villas shaped by nature—sand textures, cool water tones,
              and open horizons. Designed for stillness and privacy.
            </p>

            <div className="heroAActions">
              <Link className="btn btnPrimary" href="/accommodation">Explore Villas</Link>
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
              <h2 className="h2A">A sanctuary of stillness</h2>
            </div>

            <div>
              <p className="leadA">
                Elevated above the shoreline, Vanara is a calm retreat where indoor–outdoor living
                meets refined craftsmanship. Every detail is intentional—natural textures, soft light,
                and privacy in every direction.
              </p>

              <div style={{ marginTop: 20, display:'flex', gap: 12, flexWrap:'wrap' }}>
                <Link className="btn" href="/experiences">Experiences</Link>
                <Link className="btn" href="/dining">Dining</Link>
                <Link className="btn btnPrimary" href="/book">Reserve</Link>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 64 }} className="rule" />
        </div>
      </section>

      {/* MINIMAL FEATURES */}
      <section className="sectionA noTop">
        <div className="container">
          <div className="featureGridA">
            <div className="featureA">
              <div className="kicker">Design</div>
              <div className="hr" />
              <div className="featureATitle">Minimal. Tactile. Cinematic.</div>
              <p className="featureAText">
                Warm sand tones, cool emerald water hues, and soft white accents—quiet contrast with space to breathe.
              </p>
            </div>

            <div className="featureA">
              <div className="kicker">Location</div>
              <div className="hr" />
              <div className="featureATitle">Uluwatu, privately.</div>
              <p className="featureAText">
                Near iconic cliffs and beaches, yet secluded—perfect for restorative days and golden-hour rituals.
              </p>
            </div>

            <div className="featureA">
              <div className="kicker">Service</div>
              <div className="hr" />
              <div className="featureATitle">Discreet & personal.</div>
              <p className="featureAText">
                Thoughtful hospitality and curated experiences—always present, never intrusive.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
