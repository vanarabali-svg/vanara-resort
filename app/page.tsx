'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function HomePage() {
  const [videoOk, setVideoOk] = useState(true)

  return (
    <main className="home">
      {/* HERO */}
      <section className="hero">
        <video
          className="heroVideo"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero.jpg"
          onError={() => setVideoOk(false)}
          onCanPlay={() => setVideoOk(true)}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        <div className="heroShade" />

        <div className="heroContent">
          <div className="container">
            <div className="heroKicker">ULUWATU · BALI</div>

            <h1 className="heroH1">Vanara Resort &amp; Spa</h1>

            <p className="heroP">
              Minimalist luxury above the ocean — a sanctuary shaped by nature.
            </p>

            {/* LINKS: slightly smaller + slightly lower */}
            <div className="heroLinks" style={{ marginTop: 34 }}>
              <Link
                className="heroLink"
                href="/accommodation"
                style={{ fontSize: 10, letterSpacing: 3.6 }}
              >
                Explore accommodation
              </Link>

              <Link
                className="heroLink"
                href="/experience"
                style={{ fontSize: 10, letterSpacing: 3.6 }}
              >
                Discover experiences
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="sectionAlt">
        <div className="container grid2">
          {/* LEFT TEXT: more centered + smaller */}
          <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
            <h2 className="hLux" style={{ fontSize: 34, lineHeight: 1.2 }}>
              A sanctuary of quiet strength
            </h2>

            <div className="rule" style={{ marginLeft: 'auto', marginRight: 'auto', width: 140 }} />

            <p className="pLux">
              Set on the cliffs of Uluwatu, Vanara offers refined architecture, ocean air,
              and restorative rituals — calm, deliberate, and deeply private.
            </p>
          </div>

          {/* RIGHT CARDS */}
          <div className="cards">
            <Link className="card" href="/accommodation">
              <div className="cardTitle">Accommodation</div>
              <div className="cardText">Villas and suites designed for privacy and views.</div>
              <div className="cardCta">Explore</div>
            </Link>

            <Link className="card" href="/experience">
              <div className="cardTitle">Experience</div>
              <div className="cardText">Ocean rituals, sunset paths, and curated moments.</div>
              <div className="cardCta">Discover</div>
            </Link>

            <a
              className="card"
              href="https://YOUR-RESTAURANT-URL.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="cardTitle">Dine</div>
              <div className="cardText">Seasonal cuisine shaped by fire, salt, and the sea.</div>
              <div className="cardCta">Visit</div>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footerRow">
          <div>
            <div className="footerTitle">Vanara Resort &amp; Spa</div>
            <div className="footerText">Uluwatu, Bali</div>
          </div>

          <div>
            <div className="footerTitle">Contact</div>
            <div className="footerText">
              <a className="footerLink" href="mailto:info@vanara.life">info@vanara.life</a>
              <br />
              <a className="footerLink" href="tel:+62XXXXXXXXXX">+62 (xxx) xxx xxxx</a>
            </div>
          </div>

          <div>
            <div className="footerTitle">Explore</div>
            <div className="footerText">
              <a className="footerLink" href="/accommodation">Accommodation</a>
              <br />
              <a className="footerLink" href="/experience">Experience</a>
              <br />
              <a className="footerLink" href="/connect">Connect</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
