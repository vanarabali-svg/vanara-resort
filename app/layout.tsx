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

        {/* HEADER */}
        <header className="nav">
          <div className="container navLux">

            {/* LEFT */}
            <button className="menuBtn" aria-label="Open menu">
              MENU
            </button>

            {/* CENTER */}
            <div className="navLogo">
              <Link href="/" aria-label="Vanara Resort & Spa">
                <Image
                  src="/logo.png"
                  alt="Vanara Resort & Spa"
                  width={360}
                  height={44}
                  priority
                  style={{ height: 44, width: 'auto' }}
                />
              </Link>
            </div>

            {/* RIGHT */}
            <div className="navCta">
              <Link href="/book" className="btn btnPrimary">
                RESERVE
              </Link>
            </div>

          </div>
        </header>

        {/* PAGE CONTENT */}
        {children}

        {/* FOOTER */}
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
