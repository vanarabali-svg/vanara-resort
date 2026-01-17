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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }

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
        {/* Aman-style serif */}
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
            {/* LEFT */}
            <button
              className="menuBtn"
              onClick={openMenu}
              aria-label="Open menu"
            >
              MENU
            </button>

            {/* CENTER LOGO */}
            <div className="navLogo">
              <Link href="/" aria-label="Vanara Resort & Spa">
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

            {/* RIGHT */}
            <div className="navCta">
              <Link href="/book" className="btnReserve">
                RESERVE
              </Link>
            </div>
          </div>
        </header>

        {/* FULLSCREEN MENU OVERLAY */}
        <div
          id="lux-menu"
          className="menuOverlay"
          data-open="false"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeMenu()
          }}
        >
          <div className="menuPanel">
            <div className="menuTop">
              <div className="menuKicker">Vanara Resort & Spa</div>
              <button className="menuClose" onClick={closeMenu}>
                CLOSE
              </button>
            </div>

            <div className="menuLinks">
              <Link href="/" onClick={closeMenu}>
                Home
              </Link>

              <Link href="/about" onClick={closeMenu}>
                About
              </Link>

              <Link href="/experience" onClick={closeMenu}>
                Experience
              </Link>

              {/* DINE (external restaurant site) */}
              <a
                href="https://YOUR-RESTAURANT-URL.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                Dine
              </a>

              <Link href="/accommodation" onClick={closeMenu}>
                Accommodation
              </Link>

              <Link href="/connect" onClick={closeMenu}>
                Connect
              </Link>

              <Link href="/book" onClick={closeMenu}>
                Reserve
              </Link>
            </div>

            <div className="menuBottom">
              <div>Uluwatu, Bali</div>
              <div className="menuDot">•</div>
              <div>Quiet luxury by the ocean</div>
            </div>
          </div>
        </div>

        {children}
      </body>
    </html>
  )
}
