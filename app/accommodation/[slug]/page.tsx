import Link from "next/link";

const DATA: Record<string, any> = {
  "cliff-pool-villa": {
    title: "Cliff Pool Villa",
    subtitle: "Private cliffside villa with ocean-facing pool and quiet interior warmth.",
    hero: "/img3.jpg",
    description:
      "A calm private space above the tide. Natural stone, warm sand tones, and open air — designed for stillness.",
    highlights: [
      "Ocean-facing private pool",
      "Natural stone and warm textures",
      "Quiet, spacious interior",
    ],
    amenities: [
      "High-speed Wi-Fi",
      "Air conditioning",
      "Private pool",
      "Daily housekeeping",
    ],
  },
  "ocean-suite": {
    title: "Ocean Suite",
    subtitle: "A wide, calm space designed for still mornings and slow sunsets.",
    hero: "/img2.jpg",
    description:
      "A refined suite with generous space, minimal detail, and an uninterrupted ocean feeling.",
    highlights: [
      "Wide ocean views",
      "Minimal calm interior",
      "Soft morning light",
    ],
    amenities: [
      "High-speed Wi-Fi",
      "Air conditioning",
      "Ocean view terrace",
      "Daily housekeeping",
    ],
  },
};

export default async function AccommodationSlug({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = DATA[slug];

  if (!a) {
    return (
      <main className="pageA">
        <section className="heroSmall">
          <div className="container">
            <div className="kicker">NOT FOUND</div>
            <h1>Accommodation not found</h1>
            <p className="sub">Return to accommodation list.</p>
            <div style={{ marginTop: 22 }}>
              <Link className="softLinkA" href="/accommodation">Back →</Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="detailHero">
      <section className="detailHeroMedia">
        <div className="img" style={{ backgroundImage: `url(${a.hero})` }} />
        <div className="shade" />
        <div className="detailHeroContent">
          <div className="container">
            <div className="heroKicker">ACCOMMODATION</div>
            <div className="detailHeroTitle">{a.title}</div>
            <div className="detailHeroSub">{a.subtitle}</div>
          </div>
        </div>
      </section>

      <section className="sectionA2">
        <div className="container twoColA">
          <div className="editorialA">
            <p>{a.description}</p>
            <div style={{ marginTop: 22 }}>
              <Link className="softLinkA" href="/book">Request access →</Link>
            </div>
          </div>

          <div>
            <div className="kicker">HIGHLIGHTS</div>
            <div style={{ height: 10 }} />
            <ul className="listA">
              {a.highlights.map((x: string) => <li key={x}>{x}</li>)}
            </ul>

            <div style={{ height: 26 }} />

            <div className="kicker">AMENITIES</div>
            <div style={{ height: 10 }} />
            <ul className="listA">
              {a.amenities.map((x: string) => <li key={x}>{x}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="sectionA2">
        <div className="container">
          <div className="ruleA" />
          <div style={{ marginTop: 22 }}>
            <Link className="softLinkA" href="/accommodation">Back to accommodation →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
