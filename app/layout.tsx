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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className={`${scrolled ? 'scrolled' : ''} ${!isHome ? 'inner' : ''}`}>
        <header className="v-nav">
          <div className="v-nav__inner">
            <div className="v-nav__left">
              <button className="v-iconBtn" onClick={openMenu} aria-label="Open menu">
                <span className="v-burger" aria-hidden="true">
                  <span />
                  <span />
                </span>
              </button>

              <button className="v-iconBtn" onClick={openSearch} aria-label="Search">
                {/* palm search icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1" />
                  <path
                    d="M7.5 9.5
                       C9 7.5, 11 7.5, 12.5 9
                       C11.5 8.8, 10.5 9.4, 9.5 10.6
                       C10.8 10.2, 11.8 10.4, 13 11.5
                       C11 11.2, 9.8 11.8, 8.8 12.8"
                    stroke="currentColor"
                    strokeWidth="0.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line x1="15" y1="15" x2="20" y2="20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="v-nav__center">
              <Link href="/" aria-label="Vanara Resort & Spa">
                <Image
                  src="/logo.png"
                  alt="Vanara Resort & Spa"
                  width={240}
                  height={34}
                  priority
                  className="v-logo"
                  style={{
                    height: 34,
                    width: 'auto',
                    filter: !isHome || scrolled ? 'none' : 'brightness(0) invert(1)',
                  }}
                />
              </Link>
            </div>

            <div className="v-nav__right">
              <Link href="/book" className="v-reserve">Reserve</Link>
              <span className="v-nav__ghost" aria-hidden="true" />
            </div>
          </div>
        </header>

        {/* overlays are separate and safe */}
        <div className="v-overlay" data-overlay="menu" onClick={(e) => e.target === e.currentTarget && closeMenu()}>
          <div className="v-panel">
            <button className="v-x" onClick={closeMenu} aria-label="Close menu">
              <span />
              <span />
            </button>

            <nav className="v-menu">
              <Link href="/" onClick={closeMenu}>Home</Link>
              <Link href="/about" onClick={closeMenu}>About</Link>
              <Link href="/experience" onClick={closeMenu}>Experience</Link>
              <a href="https://YOUR-RESTAURANT.com" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                Dine
              </a>
              <Link href="/accommodation" onClick={closeMenu}>Accommodation</Link>
              <Link href="/connect" onClick={closeMenu}>Connect</Link>
            </nav>

            <div className="v-panel__foot">
              <span>Uluwatu, Bali</span>
              <span className="v-dot">•</span>
              <span className="v-muted">A sanctuary of quiet strength</span>
            </div>
          </div>
        </div>

        <div className="v-overlay" data-overlay="search" onClick={(e) => e.target === e.currentTarget && closeSearch()}>
          <div className="v-panel v-panel--search">
            <button className="v-x" onClick={closeSearch} aria-label="Close search">
              <span />
              <span />
            </button>

            <input className="v-search" placeholder="Search…" />
          </div>
        </div>

        <main className="v-main">{children}</main>
      </body>
    </html>
  )
}
