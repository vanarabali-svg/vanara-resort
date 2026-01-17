'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function HomePage() {
  const [videoOk, setVideoOk] = useState(true)

  return (
    <main className="home">
      <section className="hero">
        {/* Fallback image shows ONLY if video fails */}
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
              A sanctuary of calm above the ocean — minimalist luxury shaped by nature.
            </p>

            <div className="heroLinks">
              <Link className="heroLink" href="/book">
                Reserve
              </Link>
              <Link className="heroLink" href="/accommodation">
                Explore accommodation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
