import type { Metadata } from 'next'
import Link from 'next/link'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400','500','600'],
  variable: '--font-display',
})

const text = Inter({
  subsets: ['latin'],
  weight: ['300','400','500','600'],
  variable: '--font-text',
})

export const metadata: Metadata = {
  title: 'Vanara Uluwatu',
  description: 'Luxury villas in Uluwatu, Bali.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable}`}>
      <body style={{ fontFamily: 'var(--font-text), system-ui, -apple-system, Segoe UI, Roboto, Arial' }}>
        <header className="nav">
          <div className="container">
            <div className="navRow">
              <Link className="brand" href="/">
                <span className="brandTop" style={{ fontFamily: 'var(--font-display)' }}>VANARA</span>
                <span className="brandBottom">Uluwatu • Bali</span>
              </Link>

              <nav className="navLinks">
                <Link href="/accommodation">Accommodation</Link>
                <Link href="/dining">Dining</Link>
                <Link href="/experiences">Experiences</Link>
                <Link className="btn btnPrimary" href="/book">Book</Link>
              </nav>
            </div>
          </div>
        </header>

        {children}

        <footer className="footer">
          <div className="container" style={{ display:'flex', justifyContent:'space-between', gap: 18, flexWrap:'wrap' }}>
            <div>© {new Date().getFullYear()} Vanara Resort</div>
            <div style={{ display:'flex', gap: 16 }}>
              <span>Uluwatu, Bali</span>
              <span>•</span>
              <span>Privacy. Nature. Calm.</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
