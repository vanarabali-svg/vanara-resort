export default function HomePage() {
  return (
    <main className="home">
      {/* HERO VIDEO */}
      <section className="heroVideo">
        <video
          className="heroVideoMedia"
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="heroVideoShade" />

        <div className="heroVideoContent">
          <div className="heroKicker">ULUWATU · BALI</div>

          <h1 className="heroTitle">A sanctuary of quiet strength</h1>

          <p className="heroSub">
            Cliffside villas shaped by nature, silence, and the ocean below.
          </p>

          <div className="heroLinks">
            <a href="/accommodation">Explore accommodation</a>
            <a href="/experience">Discover experience</a>
            <a href="/dine">Dine</a>
          </div>
        </div>
      </section>

      {/* RETREAT + CARDS */}
      <section className="homeHero">
        <div className="homeHeroInner">
          <h2 className="homeTitle">The retreat</h2>
          <div className="homeRule" />
          <p className="homeLead">
            Vanara is a place of stillness above the Indian Ocean, where
            architecture dissolves into landscape and time slows to a breath.
          </p>

          <div className="homeCards">
            <a className="homeCard" href="/accommodation">
              <h3>Accommodation</h3>
              <p>Villas and suites designed for privacy and views.</p>
              <span>Explore</span>
            </a>

            <a className="homeCard" href="/experience">
              <h3>Experience</h3>
              <p>Ocean rituals, sunset paths, and curated moments.</p>
              <span>Discover</span>
            </a>

            <a className="homeCard" href="/dine">
              <h3>Dine</h3>
              <p>A coastal table shaped by fire, freshness, and place.</p>
              <span>View</span>
            </a>

            <a className="homeCard" href="/connect">
              <h3>Connect</h3>
              <p>Location, contact, and quiet arrangements.</p>
              <span>Contact</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
