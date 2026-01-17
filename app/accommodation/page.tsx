import Link from 'next/link'
import Image from 'next/image'
import { sanityClient } from '@/lib/sanity.client'
import { urlFor } from '@/lib/sanity.image'

export default async function AccommodationPage() {
  const villas = await sanityClient.fetch(`
    *[_type=="accommodation"] | order(title asc) {
      title,
      subtitle,
      "slug": slug.current,
      heroImage,
      shortDescription
    }
  `)

  return (
    <main>
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="kicker">Accommodation</div>
          <div className="hr" style={{ maxWidth: 140, margin: '18px auto' }} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 56, lineHeight: 1.05 }}>
            Private villas designed for stillness
          </h1>
          <p style={{ marginTop: 14, maxWidth: 720, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.8 }}>
            Ocean-facing retreats with curated details, natural materials, and quiet luxury.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid grid3">
            {villas
              .filter((v: any) => v?.slug)
              .map((villa: any) => (
                <Link key={villa.slug} href={`/accommodation/${villa.slug}`} style={{ textDecoration: 'none' }}>
                  <article className="card">
                    <div style={{ position: 'relative', height: 320 }}>
                      {villa.heroImage && (
                        <Image
                          src={urlFor(villa.heroImage).width(1600).height(1100).url()}
                          alt={villa.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      )}
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.42), rgba(0,0,0,0))' }} />
                      <div style={{ position: 'absolute', left: 18, bottom: 18, color: '#fff' }}>
                        <div className="kicker" style={{ color: 'rgba(255,255,255,.8)' }}>Villa</div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, lineHeight: 1.05 }}>{villa.title}</div>
                        {villa.subtitle && <div style={{ marginTop: 8, color: 'rgba(255,255,255,.85)', fontSize: 14 }}>{villa.subtitle}</div>}
                      </div>
                    </div>

                    <div className="cardInner">
                      {villa.shortDescription && (
                        <p style={{ lineHeight: 1.7 }}>
                          {villa.shortDescription}
                        </p>
                      )}
                      <div style={{ marginTop: 16 }}>
                        <span className="btn">Explore</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  )
}
