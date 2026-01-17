import Link from "next/link";

export default function ExperiencePage() {
  return (
    <main className="pageA">
      <section className="heroSmall">
        <div className="container">
          <div className="kicker">EXPERIENCE</div>
          <h1>The Experience</h1>
          <p className="sub">
            Vanara unfolds along a cliffside above the open ocean — minimal, organic, and unhurried.
          </p>
        </div>
      </section>

      <div className="ruleA" />

      <section className="sectionA2">
        <div className="container twoColA">
          <div>
            <div className="kicker">THE SPACE</div>
            <h1 style={{ fontSize: 44, marginTop: 10 }}>Space to arrive, remain, and breathe</h1>
          </div>
          <div className="editorialA">
            <ul className="listA">
              <li>An infinity water line that merges with the horizon</li>
              <li>Natural stone, warm sand tones, weathered textures</li>
              <li>Open areas balanced with intimate, quiet corners</li>
            </ul>
            <p style={{ marginTop: 18 }}>
              There are no crowded zones. No forced movement. Only space to arrive, remain, and breathe.
            </p>
          </div>
        </div>
      </section>

      <section className="sectionA2">
        <div className="container">
          <div className="imageBlock" style={{ backgroundImage: "url(/img2.jpg)" }} />
        </div>
      </section>

      <section className="sectionA2">
        <div className="container twoColA">
          <div>
            <div className="kicker">SOUND & ATMOSPHERE</div>
            <h1 style={{ fontSize: 44, marginTop: 10 }}>Atmosphere, not volume</h1>
          </div>
          <div className="editorialA">
            <p>
              Sound at Vanara is supportive — never dominant. The ocean leads. Music follows.
            </p>
            <ul className="listA">
              <li>Ambient and organic soundscapes</li>
              <li>Downtempo rhythms that follow the day</li>
              <li>Occasional live sessions at sunset</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="sectionA2">
        <div className="container twoColA">
          <div>
            <div className="kicker">FOOD & DRINK</div>
            <h1 style={{ fontSize: 44, marginTop: 10 }}>Seasonal, elemental, refined</h1>
          </div>
          <div className="editorialA">
            <p>
              Our offerings are rituals rather than menus: local ingredients, simple compositions,
              natural flavors. Unhurried, thoughtful, enjoyed slowly.
            </p>
          </div>
        </div>
      </section>

      <section className="darkBand">
        <div className="container">
          <div className="kicker">RITUAL MOMENT</div>
          <h2>Sunset — the quiet crescendo</h2>
          <p>
            Vanara does not transform into something else at night. It simply deepens.
          </p>
        </div>
      </section>

      <section className="sectionA2">
        <div className="container">
          <div className="kicker">THE RHYTHM OF THE DAY</div>
          <div style={{ height: 18 }} />

          <div className="timelineA">
            <div className="timeRow">
              <div className="t">Morning</div>
              <div className="d">Soft light, quiet water, gentle arrival.</div>
            </div>
            <div className="timeRow">
              <div className="t">Midday</div>
              <div className="d">Shade, stillness, immersion.</div>
            </div>
            <div className="timeRow">
              <div className="t">Sunset</div>
              <div className="d">The ritual moment.</div>
            </div>
            <div className="timeRow">
              <div className="t">Evening</div>
              <div className="d">Calm conversations under open skies.</div>
            </div>
          </div>

          <div style={{ marginTop: 28 }}>
            <Link className="softLinkA" href="/connect">Request access →</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
