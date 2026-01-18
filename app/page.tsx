export default function HomePage() {
  return (
    <>
      {/* HERO MEDIA (keeps your video/photo hero behind header) */}
      <section className="hero">
        <video
          className="heroVideo"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero.jpg"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="heroShade" />
      </section>

      {/* CONTENT (this is the “like screenshot” part) */}
      <section className="paper">
        <div className="container">
          <div className="centerHero">
            <h1 className="centerHeroTitle">A sanctuary of quiet strength</h1>
            <div className="centerHeroRule" />
            <p className="centerHeroText">
              Set on the cliffs of Uluwatu, Vanara offers refined architecture, ocean air,
              and restorative rituals — calm, deliberate, and deeply private.
            </p>
          </div>

          <div className="cardStack">
            <a className="luxCard" href="/accommodation">
              <div className="luxCardTitle">Accommodation</div>
              <div className="luxCardText">Villas and suites designed for privacy and views.</div>
              <div className="luxCardCta">Explore</div>
            </a>

            <a className="luxCard" href="/experience">
              <div className="luxCardTitle">Experience</div>
              <div className="luxCardText">Ocean rituals, sunset paths, and curated moments.</div>
              <div className="luxCardCta">Discover</div>
            </a>

            {/* Change this link to your restaurant site */}
            <a
              className="luxCard"
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="luxCardTitle">Dine</div>
              <div className="luxCardText">A coastal table shaped by fire, freshness, and place.</div>
              <div className="luxCardCta">View</div>
            </a>

            <a className="luxCard" href="/connect">
              <div className="luxCardTitle">Connect</div>
              <div className="luxCardText">Location, contact, and quiet arrangements.</div>
              <div className="luxCardCta">Open</div>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
