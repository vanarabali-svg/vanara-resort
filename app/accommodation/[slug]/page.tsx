import groq from 'groq'
import Image from 'next/image'
import Link from 'next/link'
import { sanityClient } from '@/lib/sanity.client'
import { urlFor } from '@/lib/sanity.image'

type PageProps = {
  // IMPORTANT: Next 15/16 can provide params as a Promise
  params: Promise<{ slug: string }>
}

const query = groq`*[_type=="accommodation" && slug.current==$slug][0]{
  title,
  locationLabel,
  subtitle,
  shortDescription,
  fromPrice,
  heroImage,
  gallery,
  highlights,
  amenities
}`

export default async function VillaPage({ params }: PageProps) {
  const { slug } = await params
  const v = await sanityClient.fetch(query, { slug })

  if (!v) {
    return (
      <main className="section">
        <div className="container">
          <div className="kicker">Not found</div>
          <div className="hr" style={{ maxWidth: 160 }} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 54 }}>Villa not found</h1>
          <p style={{ marginTop: 14, lineHeight: 1.9 }}>
            No accommodation found for slug: <strong>{slug}</strong>
          </p>
          <div style={{ marginTop: 18 }}>
            <Link className="btn" href="/accommodation">Back to accommodation</Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        {v.heroImage && (
          <Image
            src={urlFor(v.heroImage).width(2600).height(1600).url()}
            alt={v.title}
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        )}
        <div className="heroOverlay" />

        <div className="heroContent">
          <div className="container">
            <div className="kicker" style={{ color: 'rgba(255,255,255,.80)' }}>
              {v.locationLabel || 'Uluwatu • Bali'}
            </div>

            <h1 className="heroTitle" style={{ fontFamily: 'var(--font-display)' }}>
              {v.title}
            </h1>

            {v.subtitle && <p className="heroSub">{v.subtitle}</p>}

            <div style={{ marginTop: 22, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link className="btn btnPrimary" href="/book">Book Now</Link>
              <Link className="btn" href="/accommodation">All Villas</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr .8fr', gap: 34, alignItems: 'start' }}>
            {/* LEFT */}
            <div>
              <div className="kicker">Overview</div>
              <div className="hr" />

              {v.shortDescription && (
                <p style={{ fontSize: 18, lineHeight: 1.9, maxWidth: 860 }}>
                  {v.shortDescription}
                </p>
              )}

              {/* Highlights */}
              <div style={{ marginTop: 34 }}>
                <div className="kicker">Highlights</div>
                <div className="hr" />
                <div className="card" style={{ boxShadow: 'none', border: '1px solid var(--line)' }}>
                  <div className="cardInner">
                    <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--muted)', lineHeight: 1.9 }}>
                      {(v.highlights || []).map((x: string, i: number) => (
                        <li key={i} style={{ marginBottom: 6 }}>{x}</li>
                      ))}
                      {(!v.highlights || v.highlights.length === 0) && (
                        <li>Add highlights in Sanity to show here.</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div style={{ marginTop: 26 }}>
                <div className="kicker">Amenities</div>
                <div className="hr" />
                <div className="card" style={{ boxShadow: 'none', border: '1px solid var(--line)' }}>
                  <div className="cardInner">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 10 }}>
                      {(v.amenities || []).map((x: string, i: number) => (
                        <div
                          key={i}
                          style={{
                            padding: '10px 12px',
                            borderRadius: 14,
                            border: '1px solid var(--line)',
                            color: 'var(--muted)',
                            background: 'rgba(255,255,255,.6)',
                            lineHeight: 1.4,
                          }}
                        >
                          {x}
                        </div>
                      ))}
                      {(!v.amenities || v.amenities.length === 0) && (
                        <div style={{ color: 'var(--muted)' }}>Add amenities in Sanity to show here.</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT (STICKY BOOKING CARD) */}
            <aside style={{ position: 'sticky', top: 92 }}>
              <div className="card" style={{ boxShadow: 'none', border: '1px solid var(--line)' }}>
                <div className="cardInner">
                  <div className="kicker">Reserve</div>
                  <div className="hr" />

                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, lineHeight: 1.1 }}>
                    {v.title}
                  </div>

                  <p style={{ marginTop: 10, lineHeight: 1.8 }}>
                    {v.fromPrice ? v.fromPrice : 'Flexible dates, best available rate.'}
                  </p>

                  <div style={{ marginTop: 18, display: 'grid', gap: 10 }}>
                    <Link className="btn btnPrimary" href="/book">Book Now</Link>
                    <Link className="btn" href="/accommodation">Explore other villas</Link>
                  </div>

                  <div style={{ marginTop: 16, color: 'var(--muted)', fontSize: 13, lineHeight: 1.7 }}>
                    Tip: later we’ll connect your real booking engine here (Cloudbeds, Siteminder, WhatsApp, etc).
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="kicker">Gallery</div>
          <div className="hr" />

          <div
            className="grid"
            style={{
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: 16,
            }}
          >
            {(v.gallery || []).map((img: any, i: number) => (
              <div
                key={i}
                className="card"
                style={{
                  boxShadow: 'none',
                  border: '1px solid var(--line)',
                  position: 'relative',
                  height: 260,
                }}
              >
                <Image
                  src={urlFor(img).width(1600).height(1100).url()}
                  alt={`${v.title} image ${i + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}

            {(!v.gallery || v.gallery.length === 0) && (
              <p style={{ gridColumn: '1 / -1', lineHeight: 1.9 }}>
                Add gallery images in Sanity to show them here.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
