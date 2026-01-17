import Link from "next/link"
import { sanityClient } from "@/lib/sanity.client"
import { urlFor } from "@/lib/sanity.image"

export const revalidate = 60

type AccItem = {
  slug: string
  title: string
  subtitle?: string
  shortDescription?: string
  fromPrice?: string
  heroImage?: any
}

const LIST_QUERY = `*[_type=="accommodation" && defined(slug.current)]
| order(_createdAt desc){
  "slug": slug.current,
  title,
  subtitle,
  shortDescription,
  fromPrice,
  heroImage
}`

export default async function AccommodationIndex() {
  const items = await sanityClient.fetch<AccItem[]>(LIST_QUERY)

  return (
    <main className="pageA">
      {/* HERO */}
      <section className="heroSmall">
        <div className="container">
          <div className="kicker">ACCOMMODATION</div>
          <h1>Spaces to stay</h1>
          <p className="sub">
            Minimal design, natural textures, and silence that restores.
          </p>
        </div>
      </section>

      <div className="ruleA" />

      {/* LIST */}
      <section className="sectionA2">
        <div className="container accGrid">
          {items.map((a) => {
            const img =
              a.heroImage ? urlFor(a.heroImage).width(1600).height(1100).fit("crop").url() : ""

            return (
              <Link key={a.slug} href={`/accommodation/${a.slug}`} className="accCard">
                <div className="accThumb" style={{ overflow: "hidden" }}>
                  {img ? (
                    <img
                      src={img}
                      alt={a.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      loading="lazy"
                    />
                  ) : (
                    <div style={{ width: "100%", height: "100%", background: "rgba(20,20,20,.06)" }} />
                  )}
                </div>

                <div className="accMeta">
                  <div className="accTitle">{a.title}</div>
                  <div className="accSub">
                    {a.subtitle || a.shortDescription || "A quiet place above the tide."}
                  </div>
                  <div className="accPrice">{a.fromPrice ? `From ${a.fromPrice}` : "Limited availability"}</div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* SOFT CTA */}
      <section className="sectionA2">
        <div className="container">
          <a className="softLinkA" href="/book">
            Request access →
          </a>
        </div>
      </section>
    </main>
  )
}
