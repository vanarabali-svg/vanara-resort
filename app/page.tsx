'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function HomePage() {
  const [videoOk, setVideoOk] = useState(true)

  return (
    <main className="home">
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

            <div className="heroLinks">
              <Link className="heroLink" href="/accommodation">Explore accommodation</Link>
              <Link className="heroLink" href="/experience">Discover experiences</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sectionAlt">
        <div className="container grid2">
          <div>
            <h2 className="hLux" style={{ fontSize: 44 }}>A sanctuary of quiet strength</h2>
            <div className="rule" />
            <p className="pLux">
              Set on the cliffs of Uluwatu, Vanara offers refined architecture, ocean air,
              and restorative rituals — calm, deliberate, and deeply private.
            </p>
          </div>

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

            <a className="card" href="https://YOUR-RESTAURANT-URL.com" target="_blank" rel="noopener noreferrer">
              <div className="cardTitle">Dine</div>
              <div className="cardText">Seasonal cuisine shaped by fire, salt, and the sea.</div>
              <div className="cardCta">Visit</div>
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footerRow">
          <div className="footerBrand">Vanara Resort &amp; Spa</div>
          <div>Uluwatu, Bali</div>
          <div>Reservations: +62 (xxx) xxx xxxx</div>
        </div>
      </footer>
    </main>
  )
}
