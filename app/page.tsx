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
      {/* HERO */}
      <section className="heroLux">
        {heroUrl && (
          <Image
            src={heroUrl}
            alt={heroVilla?.title || 'Vanara Resort & Spa'}
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        )}

        <div className="heroShade" />

        <div className="heroInner">
          <div className="container">
            <div className="heroKicker">Uluwatu • Bali</div>

            <h1 className="heroH1">
              Quiet luxury <span className="heroH1Light">on the edge of the ocean</span>
            </h1>

            <p className="heroP">
              A private collection of villas shaped by nature—sandstone, water, and light.
              Designed for space, silence, and unforgettable sunsets.
            </p>

            <div className="heroActions">
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
      <section className="sectionLux">
        <div className="container">
          <div className="split">
            <div>
              <div className="kicker">Vanara Resort & Spa</div>
              <div className="hr" style={{ maxWidth: 180 }} />
              <h2 className="h2">
                A sanctuary of stillness
              </h2>
            </div>

            <div>
              <p className="lead">
                Elevated above the shoreline, Vanara is a calm retreat where indoor–outdoor
                living meets refined craftsmanship. Every detail is intentional—natural
                textures, soft light, and privacy in every direction.
              </p>

              <div style={{ marginTop: 18, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link className="btn" href="/experiences">Explore Experiences</Link>
                <Link className="btn" href="/dining">Discover Dining</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 FEATURE CARDS */}
      <section className="sectionLux" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid3">
            <div className="featureCard">
              <div className="kicker">Design</div>
              <div className="hr" />
              <div className="featureTitle">Minimal. Tactile. Cinematic.</div>
              <p className="featureText">
                Warm sand tones below, cool emerald water above, soft white foam accents—quiet,
                open, and timeless.
              </p>
            </div>

            <div className="featureCard">
              <div className="kicker">Location</div>
              <div className="hr" />
              <div className="featureTitle">Uluwatu, privately.</div>
              <p className="featureText">
                Close to iconic cliffs and beaches, yet secluded—perfect for restorative days
                and golden-hour rituals.
              </p>
            </div>

            <div className="featureCard">
              <div className="kicker">Service</div>
              <div className="hr" />
              <div className="featureTitle">Discreet & personal.</div>
              <p className="featureText">
                Thoughtful hospitality, curated experiences, and in-villa dining—always present,
                never intrusive.
              </p>
            </div>
          </div>

          <div style={{ marginTop: 28 }}>
            <Link className="btn btnPrimary" href="/book">Reserve</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
