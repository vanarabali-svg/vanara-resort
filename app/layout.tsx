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
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: '0 auto',
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* LOGO */}
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Vanara Resort & Spa"
                width={140}
                height={40}
                priority
              />
            </Link>

            {/* NAV */}
            <nav style={{ display: 'flex', gap: 24 }}>
              <Link href="/accommodation">Villas</Link>
              <Link href="/experiences">Experiences</Link>
              <Link href="/dining">Dining</Link>
              <Link href="/book" style={{ fontWeight: 600 }}>
                Book
              </Link>
            </nav>
          </div>
        </header>

        {/* PAGE */}
        {children}
      </body>
    </html>
  )
}
