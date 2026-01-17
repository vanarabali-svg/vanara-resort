'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function HomePage() {
  const [videoOk, setVideoOk] = useState(true)

  return (
    <main className="home">
      {/* HERO */}
      <section className="hero">
        {!videoOk && <div className="heroFallback" aria-hidden="true" />}

        <video
          className="heroVideo"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
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
              Minimalist luxury above the ocean — a sanctuary of calm shaped by nature.
            </p>

            <div className="heroLinks">
              <Link className="heroLink" href="/accommodation">Explore accommodation</Link>
              <Link className="heroLink" href="/experience">Discover experiences</Link>
            </div>
          </div>
        </div>
      </section>

      {/* BELOW HERO (THIS CREATES SCROLL) */}
      <section className="sectionA">
        <div className="container gridA">
          <div>
            <h2 className="h2A">A sanctuary of quiet strength</h2>
            <div className="ruleA" />
            <p className="pA">
              Set on the cliffs of Uluwatu, Vanara blends refined architecture, ocean air,
              and restorative rituals into a calm rhythm of stay.
            </p>
          </div>

          <div className="cardsA">
            <Link className="cardA" href="/accommodation">
              <div className="cardTitleA">Accommodation</div>
              <div className="cardTextA">Villas and suites designed for privacy and views.</div>
              <div className="cardCtaA">Explore</div>
            </Link>

            <Link className="cardA" href="/experience">
              <div className="cardTitleA">Experience</div>
              <div className="cardTextA">Ocean rituals, sunset paths, and curated moments.</div>
              <div className="cardCtaA">Discover</div>
            </Link>

            <a className="cardA" href="https://YOUR-RESTAURANT-URL.com" target="_blank" rel="noopener noreferrer">
              <div className="cardTitleA">Dine</div>
              <div className="cardTextA">Seasonal cuisine shaped by fire, salt, and the sea.</div>
              <div className="cardCtaA">Visit</div>
            </a>
          </div>
        </div>
      </section>

      <section className="sectionB">
        <div className="container">
          <div className="ctaRowA">
            <div>
              <div className="kickerA">RESERVATIONS</div>
              <div className="ctaTitleA">Begin your stay</div>
              <div className="ctaTextA">Check availability and reserve your preferred villa.</div>
            </div>
            <Link className="btnSolidA" href="/book">Reserve</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
