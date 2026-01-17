export default function ExperiencePage() {
  return (
    <main className="page">
      <section className="sectionA">
        <div className="container">
          <div className="kicker">EXPERIENCE</div>
          <div className="hr" />
          <h1 className="h2A">The Experience</h1>
          <p className="leadA">
            Vanara unfolds across a cliffside overlooking the open ocean — designed to feel minimal, organic, and unhurried.
          </p>
        </div>
      </section>

      {/* THE SPACE */}
      <section className="sectionA noTop">
        <div className="container">
          <div className="splitA">
            <div>
              <div className="kicker">THE SPACE</div>
              <div className="hr" />
              <h2 className="h2A">Space to arrive, remain, and breathe</h2>
            </div>
            <div>
              <ul className="luxList">
                <li>An infinity water line that merges with the horizon</li>
                <li>Natural stone, warm sand tones, and weathered textures</li>
                <li>Open areas balanced with intimate, quiet corners</li>
              </ul>
              <p className="leadA">
                There are no crowded zones. No forced movement. Only space to arrive, remain, and breathe.
              </p>
              <p className="whisper">Private seating and limited capacity ensure a calm and intimate experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SOUND */}
      <section className="sectionA">
        <div className="container narrow">
          <div className="kicker">SOUND & ATMOSPHERE</div>
          <div className="hr" />
          <p className="leadA">
            Sound at Vanara is atmospheric, not dominant. Music exists to support the moment — never to overpower it.
          </p>
          <ul className="luxList">
            <li>Ambient and organic soundscapes</li>
            <li>Downtempo rhythms that follow the day</li>
            <li>Occasional live sessions at sunset</li>
          </ul>
        </div>
      </section>

      {/* FOOD */}
      <section className="sectionA noTop">
        <div className="container narrow">
          <div className="kicker">FOOD & DRINK</div>
          <div className="hr" />
          <p className="leadA">
            Our offerings are seasonal, elemental, and refined — presented as rituals rather than menus.
          </p>
          <ul className="luxList">
            <li>Local ingredients</li>
            <li>Simple compositions</li>
            <li>Natural flavors</li>
          </ul>
          <p className="whisper">Unhurried. Thoughtful. Designed to be enjoyed slowly.</p>
        </div>
      </section>

      {/* RITUAL MOMENTS (darker section) */}
      <section className="ritualSection">
        <div className="container">
          <div className="kicker ritualKicker">RITUAL MOMENTS</div>
          <div className="hr ritualHr" />
          <h2 className="ritualTitle">Sunset — The ritual moment</h2>
          <p className="ritualText">
            Vanara does not transform into something else at night. It simply deepens.
          </p>
        </div>
      </section>

      {/* RHYTHM OF THE DAY */}
      <section className="sectionA">
        <div className="container">
          <div className="kicker">THE RHYTHM OF THE DAY</div>
          <div className="hr" />

          <div className="timeline">
            <div className="timeItem">
              <div className="timeLabel">Morning</div>
              <div className="timeText">Soft light, quiet water, gentle arrival</div>
            </div>
            <div className="timeItem">
              <div className="timeLabel">Midday</div>
              <div className="timeText">Shade, stillness, immersion</div>
            </div>
            <div className="timeItem">
              <div className="timeLabel">Sunset</div>
              <div className="timeText">The ritual moment</div>
            </div>
            <div className="timeItem">
              <div className="timeLabel">Evening</div>
              <div className="timeText">Calm conversations under open skies</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
