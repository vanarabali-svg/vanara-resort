'use client'

import './globals.css'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)

  const openMenu = () => document.documentElement.setAttribute('data-menu', 'open')
  const closeMenu = () => document.documentElement.setAttribute('data-menu', 'closed')

  const openSearch = () => document.documentElement.setAttribute('data-search', 'open')
  const closeSearch = () => document.documentElement.setAttribute('data-search', 'closed')

  useEffect(() => {
    document.documentElement.setAttribute('data-menu', 'closed')
    document.documentElement.setAttribute('data-search', 'closed')

    const onScroll = () => setScrolled(window.scrollY > 24)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu()
        closeSearch()
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
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
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className={`${scrolled ? 'scrolled' : ''} ${!isHome ? 'inner' : ''}`}>
        {/* HEADER */}
        <header className="v-nav">
          <div className="v-nav__inner">
            {/* LEFT: menu + search */}
            <div className="v-nav__left">
              <button className="v-iconBtn" onClick={openMenu} aria-label="Open menu">
                {/* Jumeirah-style: 2 lines */}
                <span className="v-burger2" aria-hidden="true">
                  <span />
                  <span />
                </span>
              </button>

              <button className="v-iconBtn" onClick={openSearch} aria-label="Search">
                {/* Aman-like thin search */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="11" cy="11" r="6.25" stroke="currentColor" strokeWidth="1" />
                  <line x1="16.2" y1="16.2" x2="20" y2="20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* CENTER LOGO */}
            <div className="v-nav__center">
              <Link href="/" aria-label="Vanara Resort & Spa">
                <Image
                  src="/logo.png"
                  alt="Vanara Resort & Spa"
                  width={240}
                  height={34}
                  priority
                  style={{
                    height: 34,
                    width: 'auto',
                    filter: !isHome || scrolled ? 'none' : 'brightness(0) invert(1)',
                  }}
                />
              </Link>
            </div>

            {/* RIGHT */}
            <div className="v-nav__right">
              <Link href="/book" className="v-reserve">Reserve</Link>
            </div>
          </div>
        </header>

        {/* MENU OVERLAY */}
        <div
          className="v-overlay"
          data-overlay="menu"
          onClick={(e) => e.target === e.currentTarget && closeMenu()}
        >
          <div className="v-panel">
            <button className="v-x" onClick={closeMenu} aria-label="Close menu">
              <span />
              <span />
            </button>

            <div className="v-panelKicker">Uluwatu · Bali</div>

            <nav className="v-menu" aria-label="Site menu">
              <Link href="/" onClick={closeMenu}>Home</Link>
              <Link href="/about" onClick={closeMenu}>About</Link>
              <Link href="/experience" onClick={closeMenu}>Experience</Link>
              <a href="https://YOUR-RESTAURANT-URL.com" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                Dine
              </a>
              <Link href="/accommodation" onClick={closeMenu}>Accommodation</Link>
              <Link href="/connect" onClick={closeMenu}>Connect</Link>
            </nav>

            <div className="v-panelFoot">
              <span>Vanara Resort &amp; Spa</span>
              <span className="v-dot">•</span>
              <span>A sanctuary of quiet strength</span>
            </div>
          </div>
        </div>

        {/* SEARCH OVERLAY */}
        <div
          className="v-overlay"
          data-overlay="search"
          onClick={(e) => e.target === e.currentTarget && closeSearch()}
        >
          <div className="v-panel v-panel--search">
            <button className="v-x" onClick={closeSearch} aria-label="Close search">
              <span />
              <span />
            </button>

            <div className="v-panelKicker">Search</div>
            <input className="v-search" placeholder="Search…" />
          </div>
        </div>

        <main>{children}</main>
      </body>
    </html>
  )
}
