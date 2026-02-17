'use client'

import './globals.css'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [lang, setLang] = useState<'EN' | 'ID' | 'RU'>('EN')
    // Transparent header until scroll (adds body.is-scrolled)
  useEffect(() => {
    const onScroll = () => {
      document.body.classList.toggle('is-scrolled', window.scrollY > 10)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        setLangOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen || langOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen, langOpen])

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        {/* TOP BAR (transparent until scroll) */}
        <header className="nav">
          <div className="nav-inner">
            <div className="nav-left">
              <button className="ss-menuBtn" type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
                <span className="ss-burger" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
              </button>

              <button className="lang-pill" type="button" onClick={() => setLangOpen(true)} aria-label="Change language">
                <span className="lang-pillText">{lang}</span> <span className="palmIcon" aria-hidden="true">
  <svg viewBox="0 0 24 24">
    <path d="M12 21v-7" />
    <path d="M12 14c-1.8 0-3.4.7-4.6 1.9" />
    <path d="M12 14c1.8 0 3.4.7 4.6 1.9" />
    <path d="M12 14c-2.8-1.6-4.7-4.4-4.9-7.7 2.3.1 4.2 1.2 5.4 2.9" />
    <path d="M12 14c2.8-1.6 4.7-4.4 4.9-7.7-2.3.1-4.2 1.2-5.4 2.9" />
  </svg>
</span>
              </button>
            </div>

            <div className="nav-center">
              <Link href="/" aria-label="Vanara">
                <Image
                  src="/logo-white.png"
                  alt="Vanara Resort & Spa"
                  width={320}
                  height={70}
                  priority
                  className="logo-top logo-white"
                />
                <Image
                  src="/logo.png"
                  alt="Vanara Resort & Spa"
                  width={260}
                  height={64}
                  priority
                  className="logo-top logo-dark"
                />
              </Link>
            </div>

            <div className="nav-right">
              <Link href="/book" className="reserve-pill"><span className="reserveText"><span className="reserveLong">Reserve</span><span className="reserveShort">Reserve</span></span> <span className="palmIcon reservePalm" aria-hidden="true">
  <svg viewBox="0 0 24 24">
    <path d="M12 21v-7" />
    <path d="M12 14c-1.8 0-3.4.7-4.6 1.9" />
    <path d="M12 14c1.8 0 3.4.7 4.6 1.9" />
    <path d="M12 14c-2.8-1.6-4.7-4.4-4.9-7.7 2.3.1 4.2 1.2 5.4 2.9" />
    <path d="M12 14c2.8-1.6 4.7-4.4 4.9-7.7-2.3.1-4.2 1.2-5.4 2.9" />
  </svg>
</span></Link>
            </div>
          </div>
        </header>

        {/* MENU OVERLAY */}
        {menuOpen && (
          <div className="menu-overlay" onClick={() => setMenuOpen(false)} role="dialog" aria-modal="true">
            <div className="menu-panel" onClick={(e) => e.stopPropagation()}>
              <button className="menu-x" type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>

              <nav className="menu-links" aria-label="Primary">
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
                </Link>                <Link href="/connect" onClick={() => setMenuOpen(false)}>
                  Connect
                </Link>
              </nav>

              <div className="menu-foot" aria-hidden="true">
                <div>Uluwatu, Bali</div>
                <div className="dot">•</div>
                <div>For those who listen to the ocean — not over it.</div>
              </div>
            </div>
          </div>
        )}


        {/* LANGUAGE OVERLAY */}
        {langOpen && (
          <div className="lang-overlay" onClick={() => setLangOpen(false)} role="dialog" aria-modal="true">
            <div className="lang-panel" onClick={(e) => e.stopPropagation()}>
              <button className="lang-x" type="button" onClick={() => setLangOpen(false)} aria-label="Close language">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>

              <div className="lang-title">Language</div>

              <div className="lang-options" role="list">
                {(['EN', 'ID', 'RU'] as const).map((code) => (
                  <button
                    key={code}
                    type="button"
                    className={`lang-option ${lang === code ? 'is-active' : ''}`}
                    onClick={() => {
                      setLang(code)
                      setLangOpen(false)
                    }}
                  >
                    <span className="lang-code">{code}</span>
                    <span className="lang-name">
                      {code === 'EN' ? 'English' : code === 'ID' ? 'Bahasa Indonesia' : 'Русский'}
                    </span>
                  </button>
                ))}
              </div>

              <div className="lang-hint">This changes the interface label only (text translation can be added next).</div>
            </div>
          </div>
        )}

        {/* SEARCH OVERLAY */}
        <main>{children}</main>

        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-brand">
              <div className="footer-name">Vanara Resort &amp; Spa</div>
              <div className="footer-sub">Uluwatu, Bali</div>

              <div className="footer-social" aria-label="Social media">
                <a href="#" aria-label="Instagram" className="social-btn">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" />
                  </svg>
                </a>

                <a href="#" aria-label="Facebook" className="social-btn">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 9h3V6h-3c-2 0-4 2-4 4v3H7v3h3v5h3v-5h3l1-3h-4v-3c0-.6.4-1 1-1z" />
                  </svg>
                </a>

                <a href="#" aria-label="X" className="social-btn">
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
              <div className="footer-text">Uluwatu, Bali</div>
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
              <Link className="footer-link" href="/dine">
                Dine
              </Link>            </div>
          </div>

          <div className="footer-copy">© {new Date().getFullYear()} Vanara Resort &amp; Spa</div>
        </footer>
      </body>
    </html>
  )
}
