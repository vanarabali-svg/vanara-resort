export default function AboutPage() {
  return (
    <main className="pageA">
      <section className="heroSmall">
        <div className="container">
          <div className="kicker">ABOUT</div>
          <h1>A Philosophy of Quiet Luxury</h1>
          <p className="sub">
            Vanara was created as a response to excess — a place of stillness, space, and presence.
          </p>
        </div>
      </section>

      <div className="ruleA" />

      <section className="sectionA2">
        <div className="container twoColA">
          <div className="editorialA">
            <p>
              Vanara is not designed to impress. It is designed to be felt — through ocean air,
              warm textures, and silence that restores.
            </p>
            <p>
              Every element is intentional yet effortless: the line of water meeting the horizon,
              the calm movement of light, and the quiet confidence of material.
            </p>
          </div>

          <div>
            <ul className="listA">
              <li>Nature is the main character</li>
              <li>Space is a form of luxury</li>
              <li>Silence is an experience</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="sectionA2">
        <div className="container">
          <div className="imageBlock" style={{ backgroundImage: "url(/img1.jpg)" }} />
        </div>
      </section>

      <section className="sectionA2">
        <div className="container twoColA">
          <div>
            <div className="kicker">THE MEANING</div>
            <h1 style={{ fontSize: 42, marginTop: 10 }}>The Meaning of Vanara</h1>
          </div>
          <div className="editorialA">
            <p>
              Vanara draws from old mythologies where nature, spirit, and instinct exist in balance:
              freedom without chaos, strength without noise, presence without performance.
            </p>
            <p>
              It is not a concept. It is a feeling.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
