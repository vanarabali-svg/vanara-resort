import Link from "next/link";

export default function ConnectPage() {
  return (
    <main className="page">
      <section className="sectionA">
        <div className="container narrow">
          <div className="kicker">CONNECT</div>
          <div className="hr" />
          <h1 className="h2A">Connect with Vanara</h1>
          <p className="leadA">
            Vanara is not a place you stumble upon. It is a place you choose.
          </p>
          <p className="leadA">
            We welcome connections that align with our values and rhythm.
          </p>
        </div>
      </section>

      <section className="sectionA noTop">
        <div className="container">
          <div className="connectGrid">
            <div className="connectCard">
              <div className="kicker">VISIT VANARA</div>
              <div className="hr" />
              <p className="leadA">
                For reservations, day access, and sunset rituals. Private seating and limited capacity ensure a calm and intimate experience.
              </p>
              <Link className="softCta" href="/book">Request access →</Link>
            </div>

            <div className="connectCard">
              <div className="kicker">COLLABORATE</div>
              <div className="hr" />
              <ul className="luxList">
                <li>Like-minded brands</li>
                <li>Artists and creatives</li>
                <li>Wellness and cultural partners</li>
              </ul>
              <p className="leadA">
                If your vision aligns with nature, stillness, and intention, we would love to connect.
              </p>
              <a className="softCta" href="mailto:hello@vanara.com">Enquire →</a>
            </div>

            <div className="connectCard connectCardEmph">
              <div className="kicker">PRIVATE ENQUIRIES</div>
              <div className="hr" />
              <ul className="luxList">
                <li>Private gatherings</li>
                <li>Intimate celebrations</li>
                <li>Retreats and full buyouts</li>
              </ul>
              <p className="leadA">
                Each experience is curated individually and respectfully.
              </p>
              <a className="softCta" href="mailto:hello@vanara.com">Private enquiries →</a>
            </div>
          </div>
        </div>
      </section>

      <section className="sectionA">
        <div className="container narrow">
          <div className="kicker">CONTACT</div>
          <div className="hr" />
          <div className="contactList">
            <div><strong>Email:</strong> hello@vanara.com</div>
            <div><strong>WhatsApp:</strong> Available upon request</div>
            <div><strong>Instagram:</strong> @vanara</div>
          </div>
        </div>
      </section>
    </main>
  );
}
