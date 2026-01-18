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
        {/* ================= HEADER ================= */}
        <header className="nav">
          <div className="nav-inner">
            <div className="nav-left">
              <button className="icon-btn" onClick={() => setMenuOpen(true)}>
                <span className="burger" />
              </button>

              <button className="icon-btn" onClick={() => setSearchOpen(true)}>
                <svg viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.5" y1="16.5" x2="21" y2="21" />
                </svg>
              </button>
            </div>

            <div className="nav-center">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Vanara Resort & Spa"
                  width={200}
                  height={36}
                  priority
                />
              </Link>
            </div>

            <div className="nav-right">
              <Link href="/book" className="reserve-btn">Reserve</Link>
            </div>
          </div>
        </header>

        {/* ================= MENU ================= */}
        {menuOpen && (
          <div className="menu-overlay" onClick={() => setMenuOpen(false)}>
            <div className="menu-panel" onClick={e => e.stopPropagation()}>
              <button className="menu-close" onClick={() => setMenuOpen(false)}>
                <svg viewBox="0 0 24 24">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>

              <nav className="menu-links">
                <Link href="/">Home</Link>
                <Link href="/experience">Experience</Link>
                <Link href="/dine">Dine</Link>
                <Link href="/accommodation">Accommodation</Link>
                <Link href="/connect">Connect</Link>
                <Link href="/book">Reserve</Link>
              </nav>
            </div>
          </div>
        )}

        {/* ================= SEARCH ================= */}
        {searchOpen && (
          <div className="search-overlay" onClick={() => setSearchOpen(false)}>
            <div className="search-panel" onClick={e => e.stopPropagation()}>
              <button className="menu-close" onClick={() => setSearchOpen(false)}>
                <svg viewBox="0 0 24 24">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>

              <h2>Search</h2>
              <input placeholder="Search Vanara…" />
            </div>
          </div>
        )}

        <main>{children}</main>

        {/* ================= FOOTER ================= */}
        <footer className="footer">
          <strong>Vanara Resort & Spa</strong>

          <div className="footer-social">
            <a href="#"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/></svg></a>
            <a href="#"><svg viewBox="0 0 24 24"><path d="M14 9h3V6h-3c-2 0-4 2-4 4v3H7v3h3v5h3v-5h3l1-3h-4v-3c0-.6.4-1 1-1z"/></svg></a>
            <a href="#"><svg viewBox="0 0 24 24"><path d="M4 4l16 16M20 4L4 20"/></svg></a>
          </div>

          <div className="footer-copy">
            © {new Date().getFullYear()} Vanara Resort & Spa · Uluwatu, Bali
          </div>
        </footer>
      </body>
    </html>
  )
}
