'use client'

import './globals.css'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      document.body.classList.toggle('is-scrolled', window.scrollY > 10)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
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
        {/* HEADER */}
        <header className="nav">
          <div className="nav-inner">
            {/* LEFT */}
            <div className="nav-left">
              <button className="icon-btn" onClick={() => setMenuOpen(true)}>
                <span className="burger" />
              </button>

              <button className="icon-btn">
                <svg viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.5" y1="16.5" x2="21" y2="21" />
                </svg>
              </button>
            </div>

            {/* CENTER */}
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

            {/* RIGHT */}
            <div className="nav-right">
              <Link href="/book" className="reserve-btn">
                Reserve
              </Link>
            </div>
          </div>
        </header>

        {/* MENU OVERLAY */}
        {menuOpen && (
          <div className="menu-overlay" onClick={() => setMenuOpen(false)}>
            <nav className="menu-panel" onClick={(e) => e.stopPropagation()}>
              <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
              <Link href="/experience" onClick={() => setMenuOpen(false)}>Experience</Link>
              <Link href="/dine" onClick={() => setMenuOpen(false)}>Dine</Link>
              <Link href="/accommodation" onClick={() => setMenuOpen(false)}>Accommodation</Link>
              <Link href="/connect" onClick={() => setMenuOpen(false)}>Connect</Link>
            </nav>
          </div>
        )}

        <main>{children}</main>

        {/* FOOTER */}
        <footer className="footer">
          <div>
            <strong>Vanara Resort & Spa</strong>
            <div>Uluwatu, Bali</div>
          </div>

          <div className="footer-social">
            <a aria-label="Instagram">◎</a>
            <a aria-label="Facebook">◉</a>
          </div>

          <div className="footer-copy">
            © {new Date().getFullYear()} Vanara Resort & Spa
          </div>
        </footer>
      </body>
    </html>
  )
}
