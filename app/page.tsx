import Link from 'next/link'
import Image from 'next/image'
import { sanityClient } from '@/lib/sanity.client'
import { urlFor } from '@/lib/sanity.image'

export default async function HomePage() {
  // Pull 1 villa for hero image (simple + dynamic)
  const heroVilla = await sanityClient.fetch(`
    *[_type=="accommodation"] | order(_createdAt desc)[0]{
      title,
      subtitle,
      "slug": slug.current,
      heroImage
    }
  `)

  const heroImageUrl = heroVilla?.heroImage
    ? urlFor(heroVilla.heroImage).width(2400).height(1500).url()
    : null

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        {heroImageUrl && (
          <Image
            src={heroImageUrl}
            alt={heroVilla?.title || 'Vanara Uluwatu'}
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        )}
        <div className="heroOverlay" />

        <div className="heroContent">
          <div className="container">
            <div className="kicker" style={{ color: 'rgba(255,255,255,.80)' }}>
              Uluwatu • Bali
            </div>

            <h1
              className="heroTitle"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Quiet luxury on the edge of the ocean
            </h1>

            <p className="heroSub">
              A private collection of villas shaped by nature—sandstone, water,
              and light. Designed for space, silence, and unforgettable sunsets.
            </p>

            <div style={{ marginTop: 22, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
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

      {/* INTRO */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 860 }}>
            <div className="kicker">Vanara Uluwatu</div>
            <div className="hr" style={{ maxWidth: 160 }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 44, lineHeight: 1.1 }}>
              A sanctuary of stillness
            </h2>
            <p style={{ marginTop: 14, lineHeight: 1.9, maxWidth: 720 }}>
              Elevated above the shoreline, Vanara is a calm retreat where
              indoor–outdoor living meets refined craftsmanship. Every detail is
              intentional—natural textures, soft light, and privacy in every
              direction.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid grid3">
            <article className="card">
              <div className="cardInner">
                <div className="kicker">Design</div>
                <div className="hr" />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28 }}>
                  Minimal, tactile, cinematic
                </h3>
                <p style={{ marginTop: 10, lineHeight: 1.8 }}>
                  Sandstone tones, cool water hues, and quiet contrast—crafted to
                  feel open, calm, and timeless.
                </p>
              </div>
            </article>

            <article className="card">
              <div className="cardInner">
                <div className="kicker">Location</div>
                <div className="hr" />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28 }}>
                  Uluwatu at its most private
                </h3>
                <p style={{ marginTop: 10, lineHeight: 1.8 }}>
                  Near iconic cliffs and beaches, yet hidden from crowds—perfect
                  for restorative days and golden-hour rituals.
                </p>
              </div>
            </article>

            <article className="card">
              <div className="cardInner">
                <div className="kicker">Service</div>
                <div className="hr" />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28 }}>
                  Effortless, discreet, personal
                </h3>
                <p style={{ marginTop: 10, lineHeight: 1.8 }}>
                  Thoughtful hospitality, curated experiences, and in-villa
                  dining—always present, never intrusive.
                </p>
              </div>
            </article>
          </div>

          <div style={{ marginTop: 34, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link className="btn btnPrimary" href="/accommodation">
              Explore Accommodation
            </Link>
            <Link className="btn" href="/experiences">
              Explore Experiences
            </Link>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div
            className="card"
            style={{
              background: 'linear-gradient(135deg, rgba(20,20,20,.92), rgba(20,20,20,.72))',
              color: '#fff',
            }}
          >
            <div className="cardInner" style={{ padding: 34, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
              <div style={{ maxWidth: 720 }}>
                <div className="kicker" style={{ color: 'rgba(255,255,255,.75)' }}>Reserve</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 34, lineHeight: 1.1, marginTop: 8 }}>
                  Your stay begins with a view
                </h3>
                <p style={{ marginTop: 10, color: 'rgba(255,255,255,.82)', lineHeight: 1.8 }}>
                  Choose a villa, select your dates, and we’ll take care of the rest.
                </p>
              </div>

              <Link className="btn btnPrimary" href="/book">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
