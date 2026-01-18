'use client'

import './globals.css'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      document.body.classList.toggle('is-scrolled', window.scrollY > 10)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen, searchOpen])

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        {/* HEADER */}
        <header className="nav">
          <div className="nav-inner">
            <div className="nav-left">
              <button className="icon-btn" onClick={() => setMenuOpen(true)} aria-label="Open menu">
                <span className="burger" />
              </button>

              <button className="icon-btn" onClick={() => setSearchOpen(true)} aria-label="Search">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.5" y1="16.5" x2="21" y2="21" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="nav-center">
              <Link href="/" aria-label="Vanara Resort & Spa">
                <Image
                  src="/logo-white.png"
                  alt="Vanara Resort & Spa"
                  width={260}
                  height={60}
                  priority
                  className="logo logo-white"
                />
                <Image
                  src="/logo.png"
                  alt="Vanara Resort & Spa"
                  width={260}
                  height={60}
                  priority
                  className="logo logo-dark"
                />
              </Link>
            </div>

            <div className="nav-right">
              <Link href="/book" className="reserve-btn">
                Reserve
              </Link>
            </div>
          </div>
        </header>

        {/* MENU OVERLAY */}
        {menuOpen && (
          <div className="menu-overlay" onClick={() => setMenuOpen(false)} role="dialog" aria-modal="true">
            <div className="menu-panel" onClick={(e) => e.stopPropagation()}>
              <button className="menu-x" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>

              <nav className="menu-links">
                {/* Home removed */}
                <Link href="/about" onClick={() => setMenuOpen(false)}>
                  About
                </Link>
                <Link href="/experience" onClick={() => setMenuOpen(false)}>
                  Experience
                </Link>
                <Link href="/dine" onClick={() => setMenuOpen(false)}>
                  Dine
                </Link>
                <Link href="/accommodation" onClick={() => setMenuOpen(false)}>
                  Villas
                </Link>
                <Link href="/connect" onClick={() => setMenuOpen(false)}>
                  Connect
                </Link>
              </nav>

              <div className="menu-foot">
                <div>Uluwatu, Bali</div>
                <div className="dot">•</div>
                <div>For those who listen to the ocean — not over it.</div>
              </div>
            </div>
          </div>
        )}

        {/* SEARCH OVERLAY */}
        {searchOpen && (
          <div className="search-overlay" onClick={() => setSearchOpen(false)} role="dialog" aria-modal="true">
            <div className="search-panel" onClick={(e) => e.stopPropagation()}>
              <button className="menu-x" onClick={() => setSearchOpen(false)} aria-label="Close search">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>

              <div className="search-title">Search</div>
              <input className="search-input" placeholder="Search villas, experiences…" />
            </div>
          </div>
        )}

        <main>{children}</main>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-brand">
              <strong>Vanara Resort &amp; Spa</strong>
              <div className="footer-sub">Uluwatu, Bali</div>

              <div className="footer-social" aria-label="Social media">
                <a href="#" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" />
                  </svg>
                </a>

                <a href="#" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 9h3V6h-3c-2 0-4 2-4 4v3H7v3h3v5h3v-5h3l1-3h-4v-3c0-.6.4-1 1-1z" />
                  </svg>
                </a>

                <a href="#" aria-label="X">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 4l16 16M20 4L4 20" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-col">
              <div className="footer-head">Contact</div>
              <a className="footer-link" href="mailto:info@vanara.life">
                info@vanara.life
              </a>
              <div className="footer-text">+62 (xxx) xxx xxxx</div>
            </div>

            <div className="footer-col">
              <div className="footer-head">Explore</div>
              <Link className="footer-link" href="/accommodation">
                Villas
              </Link>
              <Link className="footer-link" href="/experience">
                Experience
              </Link>
              <Link className="footer-link" href="/connect">
                Connect
              </Link>
            </div>
          </div>

          <div className="footer-copy">© {new Date().getFullYear()} Vanara Resort &amp; Spa</div>
        </footer>
      </body>
    </html>
  )
}
