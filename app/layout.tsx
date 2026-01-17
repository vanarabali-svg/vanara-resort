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

  const openMenu = () => document.documentElement.setAttribute('data-menu', 'open')
  const closeMenu = () => document.documentElement.setAttribute('data-menu', 'closed')

  const openSearch = () => document.documentElement.setAttribute('data-search', 'open')
  const closeSearch = () => document.documentElement.setAttribute('data-search', 'closed')

  useEffect(() => {
    // ensure closed on first load (prevents “stuck” state)
    document.documentElement.setAttribute('data-menu', 'closed')
    document.documentElement.setAttribute('data-search', 'closed')

    const onScroll = () => setScrolled(window.scrollY > 24)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu()
        closeSearch()
      }
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
        {/* Elegant brand + clean UI */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Italiana&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className={[scrolled ? 'scrolled' : '', !isHome ? 'inner' : ''].join(' ')}>
        {/* HEADER */}
        <header className="nav">
          <div className="container navBar">
            {/* LEFT: HAMBURGER */}
            <button className="iconBtn" onClick={openMenu} aria-label="Open menu">
              <span className="hamburger" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>

            {/* CENTER: LOGO */}
            <div className="navCenter">
              <Link href="/" aria-label="Vanara Resort & Spa" className="brandLockup">
                <Image
                  src="/logo.png"
                  alt="Vanara Resort & Spa"
                  width={280}
                  height={40}
                  priority
                  className="navLogoImg"
                  style={{
                    height: 40,
                    width: 'auto',
                    filter: !isHome || scrolled ? 'none' : 'brightness(0) invert(1)',
                  }}
                />
                {/* Optional: if you want text under logo later, we can add it here */}
              </Link>
            </div>

            {/* RIGHT: SEARCH + RESERVE */}
            <div className="navRight">
              <button className="iconBtn" onClick={openSearch} aria-label="Search">
                {/* Search icon (SVG) */}
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Zm0-2a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Zm7.8 5.2-4.2-4.2 1.4-1.4 4.2 4.2-1.4 1.4Z"
                    fill="currentColor"
                  />
                </svg>
              </button>

              <Link href="/book" className="btnReserve">
                Reserve
              </Link>
            </div>
          </div>
        </header>

        {/* MENU OVERLAY */}
        <div className="overlay" data-overlay="menu" onClick={(e) => e.target === e.currentTarget && closeMenu()}>
          <div className="panel">
            <div className="panelTop">
              <div className="panelBrand">Vanara Resort &amp; Spa</div>
              <button className="panelClose" onClick={closeMenu} aria-label="Close menu">
                Close
              </button>
            </div>

            <nav className="panelLinks" aria-label="Site menu">
              <Link href="/" onClick={closeMenu}>Home</Link>
              <Link href="/about" onClick={closeMenu}>About</Link>
              <Link href="/experience" onClick={closeMenu}>Experience</Link>
              <a href="https://YOUR-RESTAURANT-URL.com" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                Dine
              </a>
              <Link href="/accommodation" onClick={closeMenu}>Accommodation</Link>
              <Link href="/connect" onClick={closeMenu}>Connect</Link>
            </nav>

            <div className="panelBottom">
              <span>Uluwatu, Bali</span>
              <span className="dot">•</span>
              <span className="muted">Minimalist luxury by the ocean</span>
            </div>
          </div>
        </div>

        {/* SEARCH OVERLAY */}
        <div
          className="overlay"
          data-overlay="search"
          onClick={(e) => e.target === e.currentTarget && closeSearch()}
        >
          <div className="panel panelSearch">
            <div className="panelTop">
              <div className="panelBrand">Search</div>
              <button className="panelClose" onClick={closeSearch} aria-label="Close search">
                Close
              </button>
            </div>

            <div className="searchBox">
              <input
                className="searchInput"
                placeholder="Search accommodation, experience, pages…"
                aria-label="Search"
              />
              <div className="searchHint">
                Tip: we can connect this to Sanity later. For now it’s a luxury UI element.
              </div>
            </div>
          </div>
        </div>

        <main className="siteMain">{children}</main>
      </body>
    </html>
  )
}
