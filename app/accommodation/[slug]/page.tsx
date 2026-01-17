import groq from 'groq'
import Image from 'next/image'
import Link from 'next/link'
import { sanityClient } from '@/lib/sanity.client'
import { urlFor } from '@/lib/sanity.image'

type PageProps = {
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
      <main className="sectionA">
        <div className="container">
          <div className="kicker">Not found</div>
          <div className="hr" style={{ maxWidth: 180 }} />
          <h1 className="h2A">Villa not found</h1>
          <p className="leadA">No accommodation found for slug: <strong>{slug}</strong></p>
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
      <section className="heroA" style={{ minHeight: '74vh' }}>
        {v.heroImage && (
          <Image
            src={urlFor(v.heroImage).width(2600).height(1600).url()}
            alt={v.title}
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        )}

        <div className="heroAInner">
          <div className="container">
            <div className="heroAKicker">{v.locationLabel || 'Uluwatu • Bali'}</div>
            <h1 className="heroATitle" style={{ fontSize: 56 }}>
              {v.title}
            </h1>
            {v.subtitle && <p className="heroASub">{v.subtitle}</p>}

            <div className="heroAActions">
              <Link className="btn btnPrimary" href="/book">Reserve</Link>
              <Link className="btn" href="/accommodation">All Villas</Link>
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL BODY */}
      <section className="villaWrap">
        <div className="container">
          <div className="villaGrid">
            {/* LEFT */}
            <div>
              <div className="kicker">Overview</div>
              <div className="hr" style={{ maxWidth: 220 }} />

              {v.shortDescription && (
                <p className="villaIntro">{v.shortDescription}</p>
              )}

              {/* Highlights */}
              <div style={{ marginTop: 34 }}>
                <div className="kicker">Highlights</div>
                <div className="hr" style={{ maxWidth: 220 }} />

                <div className="cardA">
                  <div className="cardAInner">
                    <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2.0, color: 'var(--muted)' }}>
                      {(v.highlights || []).map((x: string, i: number) => (
                        <li key={i} style={{ marginBottom: 6 }}>{x}</li>
                      ))}
                      {(!v.highlights || v.highlights.length === 0) && <li>Add highlights in Sanity.</li>}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div style={{ marginTop: 26 }}>
                <div className="kicker">Amenities</div>
                <div className="hr" style={{ maxWidth: 220 }} />

                <div className="cardA">
                  <div className="cardAInner">
                    <div className="pillGrid">
                      {(v.amenities || []).map((x: string, i: number) => (
                        <div key={i} className="pill">{x}</div>
                      ))}
                      {(!v.amenities || v.amenities.length === 0) && <div className="pill">Add amenities in Sanity.</div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT sticky reserve */}
            <aside className="sticky">
              <div className="cardA">
                <div className="cardAInner">
                  <div className="kicker">Reserve</div>
                  <div className="hr" />

                  <div style={{ fontFamily: 'var(--font-display, serif)', fontSize: 28, lineHeight: 1.1 }}>
                    {v.title}
                  </div>

                  <p style={{ marginTop: 10, lineHeight: 1.9, color: 'var(--muted)' }}>
                    {v.fromPrice ? v.fromPrice : 'Select your dates for best available rate.'}
                  </p>

                  <div style={{ marginTop: 16, display:'grid', gap: 10 }}>
                    <Link className="btn btnPrimary" href="/book">Reserve</Link>
                    <Link className="btn" href="/accommodation">Explore other villas</Link>
                  </div>

                  <div style={{ marginTop: 16, fontSize: 13, lineHeight: 1.8, color: 'var(--muted)' }}>
                    We can connect your booking engine here next (direct link, widget, or WhatsApp).
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* AMAN-LIKE GALLERY */}
      <section className="sectionA noTop">
        <div className="container">
          <div className="kicker">Gallery</div>
          <div className="hr" style={{ maxWidth: 220 }} />

          <div className="galleryA">
            {(v.gallery || []).slice(0, 1).map((img: any, i: number) => (
              <div key={`g1-${i}`} className="cardA g1" style={{ position:'relative', overflow:'hidden' }}>
                <Image src={urlFor(img).width(2000).height(1400).url()} alt={`${v.title} image`} fill style={{ objectFit:'cover' }} />
              </div>
            ))}

            {(v.gallery || []).slice(1, 2).map((img: any, i: number) => (
              <div key={`g2-${i}`} className="cardA g2" style={{ position:'relative', overflow:'hidden' }}>
                <Image src={urlFor(img).width(2000).height(1400).url()} alt={`${v.title} image`} fill style={{ objectFit:'cover' }} />
              </div>
            ))}

            {(v.gallery || []).slice(2, 8).map((img: any, i: number) => (
              <div key={`g3-${i}`} className="cardA g3" style={{ position:'relative', overflow:'hidden' }}>
                <Image src={urlFor(img).width(1600).height(1100).url()} alt={`${v.title} image ${i+3}`} fill style={{ objectFit:'cover' }} />
              </div>
            ))}

            {(!v.gallery || v.gallery.length === 0) && (
              <p style={{ gridColumn: '1 / -1', lineHeight: 2.0, color: 'var(--muted)' }}>
                Add gallery images in Sanity to show them here.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
