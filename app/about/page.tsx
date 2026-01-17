export default function AboutPage() {
  return (
    <main className="page">
      <section className="sectionA">
        <div className="container">
          <div className="splitA">
            <div>
              <div className="kicker">ABOUT</div>
              <div className="hr" />
              <h1 className="h2A">A Philosophy of Quiet Luxury</h1>
            </div>

            <div>
              <p className="leadA">
                Vanara was created as a response to excess. To crowded spaces, loud moments, and places that demand
                attention instead of offering refuge.
              </p>
              <p className="leadA">
                Every element of Vanara is designed to feel intentional yet effortless — from the way water meets the
                horizon, to the textures of sand, stone, and wood beneath your feet.
              </p>
              <p className="leadA">
                We believe luxury should feel calm. Unforced. Grounded.
              </p>
            </div>
          </div>

          <div className="rule" style={{ marginTop: 64 }} />
        </div>
      </section>

      <section className="sectionA noTop">
        <div className="container">
          <div className="pillars">
            <div className="pillar">Nature is the main character</div>
            <div className="pillar">Space is a form of luxury</div>
            <div className="pillar">Silence is an experience</div>
          </div>
        </div>
      </section>

      <section className="sectionA">
        <div className="container">
          <div className="kicker">THE MEANING</div>
          <div className="hr" />
          <h2 className="h2A">The Meaning of Vanara</h2>

          <div className="meaningBlock">
            <p className="leadA">
              Vanara draws inspiration from ancient mythologies where nature, spirit, and instinct exist in balance.
              It represents freedom without chaos. Strength without noise. Presence without performance.
            </p>
            <p className="leadA">
              Vanara is not meant to impress. It is meant to be felt.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
