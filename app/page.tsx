'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function HomePage() {
  const [videoOk, setVideoOk] = useState(true)

  return (
    <main className="home">
      {/* HERO */}
      <section className="hero">
        {!videoOk && <div className="heroFallback" />}

        <video
          className="heroVideo luxuryVideo"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero.jpg"
          onError={() => setVideoOk(false)}
          onCanPlay={() => setVideoOk(true)}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* Cinematic layers */}
        <div className="heroVignette" />
        <div className="heroFilmGrain" />
        <div className="heroShade" />

        <div className="heroContent">
          <div className="container">
            <div className="heroKicker">ULUWATU · BALI</div>
            <h1 className="heroH1">Vanara Resort &amp; Spa</h1>
            <p className="heroP">
              Minimalist luxury above the ocean — a sanctuary shaped by silence,
              stone, and sea.
            </p>

            <div className="heroLinks">
              <Link className="heroLink" href="/accommodation">Explore accommodation</Link>
              <Link className="heroLink" href="/experience">Discover experiences</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT BELOW (SCROLL ENABLED) */}
      <section className="sectionA">
        <div className="container gridA">
          <div>
            <h2 className="h2A">A sanctuary of quiet strength</h2>
            <div className="ruleA" />
            <p className="pA">
              Set on the cliffs of Uluwatu, Vanara is designed as a place of calm —
              where architecture dissolves into landscape and time slows.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
