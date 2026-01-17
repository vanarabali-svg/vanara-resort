'use client'

import './globals.css'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  const openMenu = () => {
    document.getElementById('lux-menu')?.setAttribute('data-open', 'true')
  }
  const closeMenu = () => {
    document.getElementById('lux-menu')?.setAttribute('data-open', 'false')
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeMenu()
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
        {/* Elegant brand + minimalist UI */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Italiana&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className={[scrolled ? 'scrolled' : '', !isHome ? 'inner' : ''].join(' ')}>
        <header className="nav">
          <div className="container navLux">
            {/* LEFT */}
            <button className="hamburgerBtn" onClick={openMenu} aria-label="Open menu">
              <span className="hamburgerLines" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>

            {/* CENTER */}
            <div className="navLogo">
              <Link href="/" aria-label="Vanara Resort & Spa">
                <Image
                  src="/logo.png"
                  alt="Vanara Resort & Spa"
                  width={300}
                  height={40}
                  priority
                  className="navLogoImg"
                  style={{
                    height: 40,
                    width: 'auto',
                    filter: !isHome || scrolled ? 'none' : 'brightness(0) invert(1)',
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

        {/* MENU OVERLAY */}
        <div
          id="lux-menu"
          className="menuOverlay"
          data-open="false"
          onClick={(e) => e.target === e.currentTarget && closeMenu()}
        >
          <div className="menuPanel">
            <div className="menuTop">
              <div className="menuBrand">Vanara Resort &amp; Spa</div>
              <button className="menuClose" onClick={closeMenu} aria-label="Close menu">
                ×
              </button>
            </div>

            <nav className="menuLinks" aria-label="Site">
              <Link href="/" onClick={closeMenu}>Home</Link>
              <Link href="/about" onClick={closeMenu}>About</Link>
              <Link href="/experience" onClick={closeMenu}>Experience</Link>

              <a
                href="https://YOUR-RESTAURANT-URL.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                Dine
              </a>

              <Link href="/accommodation" onClick={closeMenu}>Accommodation</Link>
              <Link href="/connect" onClick={closeMenu}>Connect</Link>
              <Link href="/book" onClick={closeMenu}>Reserve</Link>
            </nav>

            <div className="menuBottom">
              <span>Uluwatu, Bali</span>
              <span className="menuDot">•</span>
              <span>Refined seclusion by the ocean</span>
            </div>
          </div>
        </div>

        <main className="siteMain">{children}</main>
      </body>
    </html>
  )
}
