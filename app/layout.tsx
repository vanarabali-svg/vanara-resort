'use client'
import './globals.css'
import Image from 'next/image'
import Link from 'next/link'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header className="nav">
          <div className="container navLux">
            {/* LEFT: MENU BUTTON */}
            <button
              className="menuBtn"
              aria-label="Open menu"
              onClick={() => {
                const el = document.getElementById('lux-menu')
                if (el) el.setAttribute('data-open', 'true')
              }}
            >
              MENU
            </button>

            {/* CENTER: LOGO */}
            <div className="navLogo">
              <Link href="/" aria-label="Vanara Resort & Spa">
                <Image
                  src="/logo.png"
                  alt="Vanara Resort & Spa"
                  width={320}
                  height={40}
                  priority
                  style={{ width: 'auto', height: 40 }}
                />
              </Link>
            </div>

            {/* RIGHT: RESERVE */}
            <div className="navCta">
              <Link className="btn btnPrimary" href="/book">
                Reserve
              </Link>
            </div>
          </div>
        </header>

        {/* FULLSCREEN LUX MENU */}
        <div
          id="lux-menu"
          className="menuOverlay"
          data-open="false"
          onClick={(e) => {
            // click outside closes
            if (e.target === e.currentTarget) {
              e.currentTarget.setAttribute('data-open', 'false')
            }
          }}
        >
          <div className="menuPanel">
            <div className="menuTop">
              <div className="menuKicker">Vanara Resort & Spa</div>
              <button
                className="menuClose"
                aria-label="Close menu"
                onClick={() => {
                  const el = document.getElementById('lux-menu')
                  if (el) el.setAttribute('data-open', 'false')
                }}
              >
                CLOSE
              </button>
            </div>

            <div className="menuLinks">
              <Link
                href="/accommodation"
                onClick={() => document.getElementById('lux-menu')?.setAttribute('data-open', 'false')}
              >
                Accommodation
              </Link>
              <Link
                href="/experiences"
                onClick={() => document.getElementById('lux-menu')?.setAttribute('data-open', 'false')}
              >
                Experiences
              </Link>
              <Link
                href="/dining"
                onClick={() => document.getElementById('lux-menu')?.setAttribute('data-open', 'false')}
              >
                Dining
              </Link>
              <Link
                href="/book"
                onClick={() => document.getElementById('lux-menu')?.setAttribute('data-open', 'false')}
              >
                Reserve
              </Link>
            </div>

            <div className="menuBottom">
              <div>Uluwatu, Bali</div>
              <div className="menuDot">•</div>
              <div>Quiet Luxury</div>
            </div>
          </div>
        </div>

        {children}

        <footer className="footer">
          <div className="container footerRow">
            <div>© {new Date().getFullYear()} Vanara Resort & Spa</div>
            <div className="footerRight">
              <span>Uluwatu, Bali</span>
              <span className="dot">•</span>
              <span>Quiet Luxury</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
