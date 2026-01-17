import Link from "next/link";

const ACC = [
  {
    slug: "cliff-pool-villa",
    title: "Cliff Pool Villa",
    subtitle: "Private cliffside villa with ocean-facing pool and quiet interior warmth.",
    fromPrice: "From IDR — / night",
    img: "/img3.jpg",
  },
  {
    slug: "ocean-suite",
    title: "Ocean Suite",
    subtitle: "A wide, calm space designed for still mornings and slow sunsets.",
    fromPrice: "From IDR — / night",
    img: "/img2.jpg",
  },
];

export default function AccommodationIndex() {
  return (
    <main className="pageA">
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

      <section className="sectionA2">
        <div className="container accGrid">
          {ACC.map((a) => (
            <Link key={a.slug} href={`/accommodation/${a.slug}`} className="accCard">
              <div className="accThumb" style={{ backgroundImage: `url(${a.img})` }} />
              <div className="accMeta">
                <div className="accTitle">{a.title}</div>
                <div className="accSub">{a.subtitle}</div>
                <div className="accPrice">{a.fromPrice}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
