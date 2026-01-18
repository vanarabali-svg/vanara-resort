export default function HomePage() {
  return (
    <div className="home">
      {/* HERO VIDEO */}
      <section className="hero">
        <video className="heroMedia" src="/hero.mp4" autoPlay muted loop playsInline />
        <div className="heroShade" />

        <div className="heroContent">
          <div className="heroKicker">ULUWATU · BALI</div>

          <h1 className="heroH1">Vanara Resort &amp; Spa</h1>

          <p className="heroP">
            Minimalist luxury above the ocean — a sanctuary shaped by nature.
          </p>

          <div className="heroCtas">
            <a className="heroCta" href="/accommodation">
              Explore accommodation
            </a>
            <a className="heroCta" href="/experience">
              Discover experiences
            </a>
          </div>
        </div>
      </section>

      {/* INTRO / FEATURE */}
      <section className="homeHero">
        <div className="homeHeroInner">
          <h2 className="homeTitle">A sanctuary of quiet strength</h2>
          <p className="homeLead">
            Set on the cliffs of Uluwatu, Vanara offers refined architecture, ocean air, and restorative rituals — calm,
            deliberate, and deeply private.
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
              <p>Seasonal cuisine shaped by fire, salt, and the sea.</p>
              <span>Visit</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
