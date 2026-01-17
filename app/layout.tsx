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
        {/* ================= HEADER ================= */}
        <header className="v-nav">
          <div className="v-nav__inner">
            {/* LEFT */}
            <div className="v-nav__left">
              <button className="v-iconBtn" onClick={openMenu} aria-label="Open menu">
                {/* palm-style hamburger */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 4V20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  <path d="M6 8.5C8.2 7.2 10.1 7 12 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  <path d="M6.8 12C9 10.9 10.7 10.7 12 10.7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  <path d="M7.4 15.5C9.4 14.7 10.8 14.6 12 14.6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </button>

              <button className="v-iconBtn" onClick={openSearch} aria-label="Search">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1" />
                  <line x1="15" y1="15" x2="20" y2="20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* CENTER LOGO (IMAGE, NOT TEXT) */}
            <div className="v-nav__center">
              <Link href="/" aria-label="Vanara Resort & Spa">
                <Image
                  src="/logo.png"     /* MUST EXIST in /public */
                  alt="Vanara Resort & Spa"
                  width={220}
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

        {/* ================= MENU OVERLAY ================= */}
        <div
          className="v-overlay"
          data-overlay="menu"
          onClick={(e) => e.target === e.currentTarget && closeMenu()}
        >
          <div className="v-panel">
            <nav className="v-menu">
              <Link href="/" onClick={closeMenu}>Home</Link>
              <Link href="/about" onClick={closeMenu}>About</Link>
              <Link href="/experience" onClick={closeMenu}>Experience</Link>
              <Link href="/accommodation" onClick={closeMenu}>Accommodation</Link>
              <a href="https://YOUR-RESTAURANT-URL.com" target="_blank" onClick={closeMenu}>Dine</a>
              <Link href="/connect" onClick={closeMenu}>Connect</Link>
            </nav>
          </div>
        </div>

        {/* ================= SEARCH OVERLAY ================= */}
        <div
          className="v-overlay"
          data-overlay="search"
          onClick={(e) => e.target === e.currentTarget && closeSearch()}
        >
          <div className="v-panel v-panel--search">
            <input className="v-search" placeholder="Search…" />
          </div>
        </div>

        <main>{children}</main>
      </body>
    </html>
  )
}
