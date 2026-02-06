export default function HomePage() {
  return (
    <main className="home">

      {/* HERO — PLACE FIRST */}
      <section className="hero">
        <video
          className="heroMedia"
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="heroShade" />

        <div className="heroContent">
          <span className="heroKicker">ULUWATU · BALI</span>
          <h1 className="heroTitle">Vanara Ocean Sanctuary</h1>
          <p className="heroSub">A quiet place above the tide.</p>
        </div>
      </section>

      {/* INTRO — SHORT, HEAVY */}
      <section className="section">
        <div className="container">
          <p className="copy" style={{ maxWidth: 760, fontSize: 16 }}>
            Vanara is not a destination designed to impress.
            <br />
            It is a sanctuary shaped by ocean, stone, wind, and time.
          </p>

          <p className="copy" style={{ maxWidth: 760 }}>
            Hidden along the cliffs of Uluwatu, Vanara exists for those
            who seek stillness rather than spectacle, presence rather than noise.
          </p>
        </div>
      </section>

      {/* SILENCE SECTION — VERY IMPORTANT */}
      <section className="section">
        <div style={{ height: 120 }} />
      </section>

      {/* PLACE / LANDSCAPE IMAGE */}
      <section className="sectionGallery">
        <div className="galleryStack">
          <figure className="galleryItem ocean is-center">
            <img src="/gallery-1.jpg" alt="Cliff and ocean horizon" />
          </figure>
        </div>
      </section>

      {/* PHILOSOPHY — MANIFESTO STYLE */}
      <section className="section">
        <div className="container">
          <h2 className="h2">Quiet luxury, by design</h2>

          <div className="copy">
            <p>Nature is the main character.</p>
            <p>Space is a form of luxury.</p>
            <p>Silence is an experience.</p>
          </div>

          <p className="copy">
            Every element of Vanara is designed to feel intentional
            yet effortless — from the way water meets the horizon,
            to the textures of sand, stone, and wood beneath your feet.
          </p>
        </div>
      </section>

      {/* VISUAL FLOW — NO STORY */}
      <section className="sectionGallery">
        <div className="galleryStack">
          <figure className="galleryItem villa is-left">
            <img src="/gallery-2.jpg" alt="Architecture and water" />
          </figure>

          <figure className="galleryItem dine is-right">
            <img src="/gallery-3.jpg" alt="Dining ritual at sunset" />
          </figure>
        </div>
      </section>

      {/* EXPERIENCE — REDUCED, DEEPER */}
      <section className="section">
        <div className="container">
          <h2 className="h2">The rhythm of the day</h2>

          <div className="copy">
            <p>Morning begins with salt air and soft light.</p>
            <p>Afternoons dissolve into water, shade, and silence.</p>
            <p>Sunsets arrive without announcement — and linger.</p>
          </div>

          <p className="copy">
            Vanara does not transform into something else at night.
            It simply deepens.
          </p>
        </div>
      </section>

      {/* DETAILS — NO SALES */}
      <section className="section">
        <div className="container">
          <div className="grid3">
            <div className="card">
              <div className="cardLabel">SPACE</div>
              <h3 className="cardTitle">Room to arrive</h3>
              <p className="cardText">
                Open areas balanced with intimate, quiet corners.
                No forced movement. No crowding.
              </p>
            </div>

            <div className="card">
              <div className="cardLabel">SOUND</div>
              <h3 className="cardTitle">Atmosphere, not noise</h3>
              <p className="cardText">
                Ambient soundscapes that follow the day —
                present, never dominant.
              </p>
            </div>

            <div className="card">
              <div className="cardLabel">FOOD</div>
              <h3 className="cardTitle">Ritual, not menu</h3>
              <p className="cardText">
                Seasonal, elemental, and refined.
                Designed to be enjoyed slowly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION — STATIC, CALM */}
      <section className="section">
        <div className="container">
          <h2 className="h2">Location</h2>

          <p className="copy">
            Perched above the Indian Ocean,
            on a quiet edge of the island where cliffs meet open water.
          </p>
        </div>

        <div className="mapBlock">
          <img
            className="mapImage"
            src="/map-vanara.jpg"
            alt="Vanara Resort & Spa location"
          />
          <div className="mapMeta">
            <span className="mapTitle">Vanara Resort & Spa</span>
            <span className="mapLocation">Uluwatu · Bali</span>
          </div>
        </div>
      </section>

      {/* SINGLE CTA — AUTHORITY */}
      <section className="section">
        <div className="container" style={{ textAlign: "center" }}>
          <a className="textCta" href="/connect">
            Enquire
          </a>
        </div>
      </section>

      {/* FOOTER LINE */}
      <footer className="footer">
        <p className="footer-copy">
          For those who listen to the ocean — not over it.
        </p>
      </footer>

    </main>
  );
}
