import Link from "next/link"
import { sanityClient } from "@/lib/sanity.client"
import { urlFor } from "@/lib/sanity.image"
import type { Metadata } from "next"

export const revalidate = 60

type AccDetail = {
  title: string
  subtitle?: string
  locationLabel?: string
  shortDescription?: string
  fromPrice?: string
  seoTitle?: string
  seoDescription?: string
  heroImage?: any
  gallery?: any[]
  highlights?: string[]
  amenities?: string[]
}

const DETAIL_QUERY = `*[_type=="accommodation" && slug.current==$slug][0]{
  title,
  subtitle,
  locationLabel,
  shortDescription,
  fromPrice,
  seoTitle,
  seoDescription,
  heroImage,
  gallery,
  highlights,
  amenities
}`

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const data = await sanityClient.fetch<AccDetail>(DETAIL_QUERY, { slug })

  if (!data) return { title: "Accommodation — Vanara" }

  return {
    title: data.seoTitle || `${data.title} — Vanara`,
    description: data.seoDescription || data.shortDescription || "Quiet luxury in Uluwatu, Bali.",
  }
}

export default async function AccommodationSlugPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  const data = await sanityClient.fetch<AccDetail>(DETAIL_QUERY, { slug })

  if (!data) {
    return (
      <main className="pageA">
        <section className="heroSmall">
          <div className="container">
            <div className="kicker">NOT FOUND</div>
            <h1>Accommodation not found</h1>
            <p className="sub">Return to the list.</p>
            <div style={{ marginTop: 22 }}>
              <Link className="softLinkA" href="/accommodation">Back →</Link>
            </div>
          </div>
        </section>
      </main>
    )
  }

  const heroUrl = data.heroImage
    ? urlFor(data.heroImage).width(2400).height(1600).fit("crop").url()
    : ""

  const galleryUrls = (data.gallery || [])
    .slice(0, 8)
    .map((img) => urlFor(img).width(2400).height(1600).fit("crop").url())

  return (
    <main className="detailHero">
      {/* HERO MEDIA (Aman style) */}
      <section className="detailHeroMedia">
        <div className="img" style={{ backgroundImage: heroUrl ? `url(${heroUrl})` : "none" }} />
        <div className="shade" />
        <div className="detailHeroContent">
          <div className="container">
            <div className="heroKicker">ACCOMMODATION</div>

            <div className="detailHeroTitle">{data.title}</div>

            <div className="detailHeroSub">
              {data.subtitle || data.shortDescription || "A quiet place above the tide."}
              {data.locationLabel ? ` · ${data.locationLabel}` : ""}
            </div>

            <div style={{ marginTop: 18 }}>
              <span style={{
                fontSize: 11,
                letterSpacing: 3.2,
                textTransform: "uppercase",
                color: "rgba(255,255,255,.74)"
              }}>
                {data.fromPrice ? `From ${data.fromPrice}` : "Limited availability"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL DETAILS */}
      <section className="sectionA2">
        <div className="container twoColA">
          <div className="editorialA">
            <p>
              {data.shortDescription ||
                "A calm private space above the tide — designed for still mornings and slow sunsets."}
            </p>

            <div style={{ marginTop: 22 }}>
              <Link className="softLinkA" href="/book">Request access →</Link>
            </div>

            <div style={{ marginTop: 22 }}>
              <Link className="softLinkA" href="/accommodation">Back to accommodation →</Link>
            </div>
          </div>

          <div>
            {data.highlights?.length ? (
              <>
                <div className="kicker">HIGHLIGHTS</div>
                <div style={{ height: 10 }} />
                <ul className="listA">
                  {data.highlights.map((x) => <li key={x}>{x}</li>)}
                </ul>
                <div style={{ height: 28 }} />
              </>
            ) : null}

            {data.amenities?.length ? (
              <>
                <div className="kicker">AMENITIES</div>
                <div style={{ height: 10 }} />
                <ul className="listA">
                  {data.amenities.map((x) => <li key={x}>{x}</li>)}
                </ul>
              </>
            ) : null}
          </div>
        </div>
      </section>

      {/* GALLERY — vertical, calm, no slider */}
      {galleryUrls.length ? (
        <section className="sectionA2">
          <div className="container">
            <div className="kicker">GALLERY</div>
            <div style={{ height: 18 }} />
            <div style={{ display: "grid", gap: 16 }}>
              {galleryUrls.map((src, i) => (
                <div
                  key={src + i}
                  className="imageBlock"
                  style={{ backgroundImage: `url(${src})` }}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* FINAL CTA */}
      <section className="sectionA2">
        <div className="container">
          <div className="ruleA" />
          <div style={{ marginTop: 22 }}>
            <Link className="softLinkA" href="/book">Reserve / Request access →</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
