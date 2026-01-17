export default function ConnectPage() {
  return (
    <main className="pageA">
      <section className="heroSmall">
        <div className="container">
          <div className="kicker">CONNECT</div>
          <h1>Connect with Vanara</h1>
          <p className="sub">
            Vanara is not a place you stumble upon. It is a place you choose.
          </p>
        </div>
      </section>

      <div className="ruleA" />

      <section className="sectionA2">
        <div className="container twoColA">
          <div>
            <div className="kicker">VISIT</div>
            <h1 style={{ fontSize: 44, marginTop: 10 }}>Request access</h1>
          </div>
          <div className="editorialA">
            <p>
              For reservations, day access, and sunset rituals. Limited capacity ensures a calm and intimate experience.
            </p>
            <p>
              Email: <strong>hello@vanara.com</strong>
            </p>
            <p>
              WhatsApp: Available upon request<br />
              Instagram: @vanara
            </p>
          </div>
        </div>
      </section>

      <section className="sectionA2">
        <div className="container twoColA">
          <div>
            <div className="kicker">COLLABORATE</div>
            <h1 style={{ fontSize: 44, marginTop: 10 }}>Partnerships</h1>
          </div>
          <div className="editorialA">
            <ul className="listA">
              <li>Like-minded brands</li>
              <li>Artists and creatives</li>
              <li>Wellness and cultural partners</li>
            </ul>
            <p style={{ marginTop: 18 }}>
              If your vision aligns with nature, stillness, and intention, we would love to connect.
            </p>
          </div>
        </div>
      </section>

      <section className="sectionA2">
        <div className="container twoColA">
          <div>
            <div className="kicker">PRIVATE</div>
            <h1 style={{ fontSize: 44, marginTop: 10 }}>Private enquiries</h1>
          </div>
          <div className="editorialA">
            <ul className="listA">
              <li>Private gatherings</li>
              <li>Intimate celebrations</li>
              <li>Retreats and full buyouts</li>
            </ul>
            <p style={{ marginTop: 18 }}>
              Each experience is curated individually and respectfully.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
