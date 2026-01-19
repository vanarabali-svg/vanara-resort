export default function HomePage() {
  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <video className="heroMedia" src="/hero.mp4" autoPlay muted loop playsInline />
        <div className="heroShade" />

        <div className="heroContent">
          <div className="heroKicker">ULUWATU · BALI</div>

          <h1 className="heroTitle">Vanara Resort &amp; Spa</h1>

          <p className="heroSub">
            Minimalist luxury above the ocean — a sanctuary shaped by nature.
          </p>

          <div className="heroLinks">
            <a className="heroLink" href="/accommodation">Explore accommodation</a>
            <a className="heroLink" href="/experience">Discover experiences</a>
          </div>
        </div>
      </section>

      {/* THE RESORT */}
      <section className="resort">
        <div className="resortInner">
          <div className="resortLabel">THE RESORT</div>

          <h2 className="resortTitle">A sanctuary of quiet strength</h2>

          <div className="resortText">
            <p>
              Perched above the Indian Ocean, Vanara is shaped by wind, stone, and warm light —
              a retreat where architecture dissolves into landscape.
            </p>
            <p>
              Days unfold slowly: salt air, soft linen, the sound of water below.
              Private villas, thoughtful rituals, and a calm that stays with you.
            </p>
          </div>

          <div className="resortRule" />
        </div>
      </section>

      {/* GALLERY — STACKED (smaller + better focus) */}
      <section className="gallery">
        <div className="galleryInner">
          <div className="galleryHeader">
            <div className="galleryLabel">GLIMPSES</div>
            <h3 className="galleryTitle">Light, water, and texture</h3>
          </div>

          <div className="galleryStack">
            <figure className="galleryItem ocean">
              <img src="/gallery-1.jpg" alt="Ocean view" />
            </figure>

            <figure className="galleryItem villa">
              <img src="/gallery-2.jpg" alt="Villa ritual" />
            </figure>

            <figure className="galleryItem dine">
              <img src="/gallery-3.jpg" alt="Dining atmosphere" />
            </figure>
          </div>
        </div>
      </section>
    </div>
  )
}
