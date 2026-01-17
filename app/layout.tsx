'use client'

import './globals.css'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [scrolled, setScrolled] = useState(false)

  const openMenu = () => {
    document.getElementById('lux-menu')?.setAttribute('data-open', 'true')
  }

  const closeMenu = () => {
    document.getElementById('lux-menu')?.setAttribute('data-open', 'false')
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeMenu() }

    window.addEventListener('scroll', onScroll)
    window.addEventListener('keydown', onKey)
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className={scrolled ? 'scrolled' : ''}>
        {/* HEADER */}
        <header className="nav">
          <div className="container navLux">
            <button className="menuBtn" onClick={openMenu}>MENU</button>

            <div className="navLogo">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Vanara Resort & Spa"
                  width={260}
                  height={34}
                  priority
                  style={{
                    height: 34,
                    width: 'auto',
                    filter: scrolled ? 'none' : 'brightness(0) invert(1)',
                  }}
                />
              </Link>
            </div>

            <div className="navCta">
              <Link href="/book" className="btnReserve">RESERVE</Link>
            </div>
          </div>
        </header>

        {/* MENU OVERLAY */}
        <div
          id="lux-menu"
          className="menuOverlay"
          data-open="false"
          onClick={(e) => e.target === e.currentTarget && closeMenu()}
        >
          <div className="menuPanel">
            <div className="menuTop">
              <div className="menuKicker">Vanara Resort & Spa</div>
              <button className="menuClose" onClick={closeMenu}>CLOSE</button>
            </div>

            <div className="menuLinks">
              <Link href="/" onClick={closeMenu}>Home</Link>
              <Link href="/about" onClick={closeMenu}>About</Link>
              <Link href="/experience" onClick={closeMenu}>Experience</Link>
              <Link href="/accommodation" onClick={closeMenu}>Accommodation</Link>
              <Link href="/connect" onClick={closeMenu}>Connect</Link>
              <Link href="/book" onClick={closeMenu}>Reserve</Link>
            </div>

            <div className="menuBottom">
              <span>Uluwatu, Bali</span>
              <span className="menuDot">•</span>
              <span>Quiet luxury by the ocean</span>
            </div>
          </div>
        </div>

        {children}
      </body>
    </html>
  )
}
