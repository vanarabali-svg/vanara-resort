'use client'

import './globals.css'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // Always default closed (important)
    document.documentElement.setAttribute('data-menu', 'closed')
    document.documentElement.setAttribute('data-search', 'closed')

    const onScroll = () => setScrolled(window.scrollY > 24)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        document.documentElement.setAttribute('data-menu', 'closed')
        document.documentElement.setAttribute('data-search', 'closed')
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

  const openMenu = () => document.documentElement.setAttribute('data-menu', 'open')
  const closeMenu = () => document.documentElement.setAttribute('data-menu', 'closed')
  const openSearch = () => document.documentElement.setAttribute('data-search', 'open')
  const closeSearch = () => document.documentElement.setAttribute('data-search', 'closed')

  // White logo on hero, black on scrolled + inner pages
  const logoStyle = {
    height: 34,
    width: 'auto' as const,
    filter: !isHome || scrolled ? 'none' : 'brightness(0) invert(1)',
  }

  return (
    <html lang="en" data-menu="closed" data-search="closed">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className={`${scrolled ? 'is-scrolled' : ''} ${!isHome ? 'is-inner' : ''}`}>
        {/* HEADER */}
        <header className="v-nav" aria-label="Primary">
          <div className="v-nav__inner">
            {/* LEFT */}
            <div className="v-nav__left">
              <button className="v-iconBtn" onClick={openMenu} aria-label="Open menu">
                <span className="v-burger2" aria-hidden="true">
                  <span />
                  <span />
                </span>
              </button>

              <button className="v-iconBtn" onClick={openSearch} aria-label="Search">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="11" cy="11" r="6.25" stroke="currentColor" strokeWidth="1" />
                  <line
                    x1="16.2"
                    y1="16.2"
                    x2="20"
                    y2="20"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* CENTER */}
            <div className="v-nav__center">
              <Link href="/" aria-label="Vanara Resort & Spa">
                <Image
                  src="/logo.png"
                  alt="Vanara Resort & Spa"
                  width={240}
                  height={34}
                  priority
                  style={logoStyle}
                />
              </Link>
            </div>

            {/* RIGHT */}
            <div className="v-nav__right">
              <Link href="/book" className="v-reserve">
                Reserve
              </Link>
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
            {/* X only */}
            <button className="v-x" onClick={closeMenu} aria-label="Close menu">
              <span />
              <span />
            </button>

            <div className="v-panelKicker">Uluwatu · Bali</div>

            <nav className="v-menu" aria-label="Menu">
              <Link href="/" onClick={closeMenu}>
                Home
              </Link>
              <Link href="/about" onClick={closeMenu}>
                About
              </Link>
              <Link href="/experience" onClick={closeMenu}>
                Experience
              </Link>
              <a href="https://example.com" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                Dine
              </a>
              <Link href="/accommodation" onClick={closeMenu}>
                Accommodation
              </Link>
              <Link href="/connect" onClick={closeMenu}>
                Connect
              </Link>
            </nav>

            <div className="v-panelFoot">
              <span>Vanara Resort &amp; Spa</span>
              <span className="v-dot">•</span>
              <span>For those who listen to the ocean — not over it.</span>
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

        {/* PAGE */}
        <main>{children}</main>

        {/* FOOTER (simple, Aman-like with icons) */}
        <footer className="v-footer">
          <div className="container v-footer__inner">
            <div className="v-footer__brand">Vanara Resort &amp; Spa</div>

            <div className="v-footer__icons" aria-label="Social">
              <a className="v-social" href="#" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="7" y="7" width="10" height="10" rx="3" stroke="currentColor" strokeWidth="1" />
                  <circle cx="12" cy="12" r="2.7" stroke="currentColor" strokeWidth="1" />
                  <circle cx="16.8" cy="7.2" r="0.8" fill="currentColor" />
                  <rect x="5" y="5" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1" />
                </svg>
              </a>

              <a className="v-social" href="#" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M14 8.5V7.3c0-.7.4-1.1 1.2-1.1H17V4h-2.2C12.8 4 12 5.2 12 7.1v1.4H10v2.4h2V20h2.8v-9.1H17l.4-2.4H14z"
                    fill="currentColor"
                  />
                </svg>
              </a>

              <a className="v-social" href="#" aria-label="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 4a8 8 0 0 0-6.9 12l-.7 4 4-1.1A8 8 0 1 0 12 4z"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <path
                    d="M9.3 9.2c.2-.3.5-.3.7-.2l.7.3c.2.1.3.3.2.5l-.3.8c-.1.2 0 .4.1.5.5.7 1.2 1.4 2 1.8.2.1.4.1.5 0l.7-.4c.2-.1.4-.1.6 0l.6.4c.2.1.2.4.1.6-.3.8-1.1 1.3-2 1.1-1.6-.4-3.9-2.6-4.3-4.1-.2-.8.3-1.7 1.1-2z"
                    fill="currentColor"
                    opacity=".9"
                  />
                </svg>
              </a>
            </div>

            <div className="v-footer__copy">© {new Date().getFullYear()} Vanara · Uluwatu, Bali</div>
          </div>
        </footer>
      </body>
    </html>
  )
}
