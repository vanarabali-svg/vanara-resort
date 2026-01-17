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
          <div className="container navRow">
            {/* LOGO */}
            <Link href="/" aria-label="Vanara Resort & Spa" className="brand">
              <Image
                src="/logo.png"
                alt="Vanara Resort & Spa"
                width={220}
                height={28}
                priority
                style={{ width: 'auto', height: 28 }}
              />
            </Link>

            {/* NAVIGATION */}
            <nav className="navLinks">
              <Link href="/accommodation">Villas</Link>
              <Link href="/experiences">Experiences</Link>
              <Link href="/dining">Dining</Link>
              <Link href="/book" className="btn btnPrimary">
                Book
              </Link>
            </nav>
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
