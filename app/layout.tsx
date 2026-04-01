'use client'

import './globals.css'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'

function startOfDay(date: Date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1)
}

function addDays(date: Date, amount: number) {
  const d = new Date(date)
  d.setDate(d.getDate() + amount)
  return d
}

function formatDateInput(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function parseDateInput(value: string) {
  const [y, m, d] = value.split('-').map(Number)
  return new Date(y, (m || 1) - 1, d || 1)
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function nightsBetween(start: string, end: string) {
  if (!start || !end) return 0
  const a = startOfDay(parseDateInput(start)).getTime()
  const b = startOfDay(parseDateInput(end)).getTime()
  return Math.max(0, Math.round((b - a) / 86400000))
}

function buildMonthGrid(month: Date) {
  const first = startOfMonth(month)
  const monthIndex = first.getMonth()
  const mondayOffset = (first.getDay() + 6) % 7
  const gridStart = addDays(first, -mondayOffset)

  return Array.from({ length: 42 }, (_, i) => {
    const date = addDays(gridStart, i)
    return { date, inMonth: date.getMonth() === monthIndex }
  })
}

function formatDisplayDate(value: string) {
  if (!value) return 'Add date'
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(parseDateInput(value))
}

function clampCount(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const today = startOfDay(new Date())
  const defaultCheckIn = formatDateInput(today)
  const defaultCheckOut = formatDateInput(addDays(today, 1))

  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [activeField, setActiveField] = useState<'checkIn' | 'checkOut'>('checkIn')
  const [visibleMonth, setVisibleMonth] = useState(startOfMonth(today))
  const [checkIn, setCheckIn] = useState(defaultCheckIn)
  const [checkOut, setCheckOut] = useState(defaultCheckOut)
  const [rooms, setRooms] = useState(1)
  const [adults, setAdults] = useState(2)
  const [childrenGuests, setChildrenGuests] = useState(0)
  const [lang, setLang] = useState<'EN' | 'ID' | 'RU'>('EN')

  const monthA = visibleMonth
  const monthB = addMonths(visibleMonth, 1)
  const monthAGrid = useMemo(() => buildMonthGrid(monthA), [monthA])
  const monthBGrid = useMemo(() => buildMonthGrid(monthB), [monthB])

  const openBooking = () => {
    setBookingOpen(true)
    setCalendarOpen(false)
    setActiveField('checkIn')
    setVisibleMonth(startOfMonth(parseDateInput(checkIn || defaultCheckIn)))
  }

  const closeBooking = () => {
    setBookingOpen(false)
    setCalendarOpen(false)
  }

  const openCalendarFor = (field: 'checkIn' | 'checkOut') => {
    setActiveField(field)
    setCalendarOpen(true)
    setVisibleMonth(startOfMonth(parseDateInput(field === 'checkIn' ? checkIn : checkOut)))
  }

  const buildBookingUrl = () => {
    const params = new URLSearchParams()
    params.set('arrival', checkIn)
    params.set('departure', checkOut)
    params.set('checkInDate', checkIn)
    params.set('checkOutDate', checkOut)
    params.set('rooms', String(rooms))
    params.set('adults', String(adults))
    params.set('children', String(childrenGuests))
    params.set('items[0][adults]', String(adults))
    params.set('items[0][children]', String(childrenGuests))
    params.set('items[0][infants]', '0')
    params.set('items[0][rooms]', String(rooms))
    params.set('currency', 'IDR')
    params.set('locale', 'en')
    return `https://book-directonline.com/properties/vanararesortspa?${params.toString()}`
  }

  const handleDaySelect = (date: Date) => {
    const picked = startOfDay(date)
    const pickedValue = formatDateInput(picked)

    if (activeField === 'checkIn') {
      setCheckIn(pickedValue)
      if (!checkOut || startOfDay(parseDateInput(checkOut)).getTime() <= picked.getTime()) {
        setCheckOut(formatDateInput(addDays(picked, 1)))
      }
      setActiveField('checkOut')
      return
    }

    const start = startOfDay(parseDateInput(checkIn))
    if (picked.getTime() <= start.getTime()) {
      setCheckIn(pickedValue)
      setCheckOut(formatDateInput(addDays(picked, 1)))
      setActiveField('checkOut')
      return
    }

    setCheckOut(pickedValue)
    setCalendarOpen(false)
  }

  const renderMonth = (month: Date, days: Array<{ date: Date; inMonth: boolean }>) => {
    const start = startOfDay(parseDateInput(checkIn))
    const end = startOfDay(parseDateInput(checkOut))
    const todayValue = startOfDay(new Date())

    return (
      <div className="rwCalendarMonth" key={month.toISOString()}>
        <div className="rwCalendarMonthTitle">
          {new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(month)}
        </div>
        <div className="rwCalendarWeekdays">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="rwCalendarGrid">
          {days.map(({ date, inMonth }) => {
            const ts = startOfDay(date).getTime()
            const isStart = isSameDay(date, start)
            const isEnd = isSameDay(date, end)
            const isInRange = ts > start.getTime() && ts < end.getTime()
            const isToday = isSameDay(date, todayValue)

            return (
              <button
                key={date.toISOString()}
                type="button"
                className={[
                  'rwDay',
                  !inMonth ? 'is-outside' : '',
                  isToday ? 'is-today' : '',
                  isStart ? 'is-start' : '',
                  isEnd ? 'is-end' : '',
                  isInRange ? 'is-range' : '',
                ].filter(Boolean).join(' ')}
                onClick={() => handleDaySelect(date)}
              >
                <span>{date.getDate()}</span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  useEffect(() => {
    const shouldForceScrolled = pathname !== '/'
    const onScroll = () => {
      document.body.classList.toggle('is-scrolled', shouldForceScrolled || window.scrollY > 10)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        setLangOpen(false)
        closeBooking()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [bookingOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen || langOpen || bookingOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen, langOpen, bookingOpen])

  return (
    <html lang="en">
      <head>
        <link rel="preload" as="video" href="/hero-light.mp4" />
        <link rel="preload" as="video" href="/hero.mp4" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
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
                <span className="lang-pillText">{lang}</span>{' '}
                <span className="pillIcon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="8.5" />
                    <path d="M3.5 12h17" />
                    <path d="M12 3.5c2.3 2.3 3.6 5.3 3.6 8.5S14.3 18.7 12 20.5C9.7 18.7 8.4 15.7 8.4 12S9.7 5.8 12 3.5z" />
                  </svg>
                </span>
              </button>
            </div>

            <div className="nav-center">
              <Link href="/" aria-label="Vanara">
                <Image src="/logo-white.png" alt="Vanara Resort & Spa" width={320} height={70} priority className="logo-top logo-white" />
                <Image src="/logo.png" alt="Vanara Resort & Spa" width={260} height={64} priority className="logo-top logo-dark" />
              </Link>
            </div>

            <div className="nav-right">
              <button type="button" className="reserve-pill" onClick={openBooking}>
                <span className="reserveText"><span className="reserveLong">Reserve</span><span className="reserveShort">Reserve</span></span>{' '}
                <span className="pillIcon pillIcon--after" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M9 15l6-6" />
                    <path d="M10 9h5v5" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </header>

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
                <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
                <Link href="/experience" onClick={() => setMenuOpen(false)}>Experience</Link>
                <Link href="/dine" onClick={() => setMenuOpen(false)}>Dine</Link>
                <Link href="/accommodation" onClick={() => setMenuOpen(false)}>Villas</Link>
                <Link href="/connect" onClick={() => setMenuOpen(false)}>Connect</Link>
              </nav>

              <div className="menu-foot" aria-hidden="true">
                <div>Uluwatu, Bali</div>
                <div className="dot">•</div>
                <div>For those who listen to the ocean — not over it.</div>
              </div>
            </div>
          </div>
        )}

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
                    <span className="lang-name">{code === 'EN' ? 'English' : code === 'ID' ? 'Bahasa Indonesia' : 'Русский'}</span>
                  </button>
                ))}
              </div>

              <div className="lang-hint">This changes the interface label only (text translation can be added next).</div>
            </div>
          </div>
        )}

        {bookingOpen && (
          <div className="reserveWidgetOverlay" onClick={closeBooking} role="dialog" aria-modal="true">
            <div className="reserveWidgetPanel reserveWidgetPanel--anchored" onClick={(e) => e.stopPropagation()}>
              <button className="reserveWidgetClose" type="button" onClick={closeBooking} aria-label="Close booking widget">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>

              <div className="reserveWidgetHead">
                <div className="reserveWidgetKicker">Direct booking</div>
                <div className="reserveWidgetTitle">Reserve your stay</div>
                <div className="reserveWidgetSub">Choose your dates and guests, then continue to our direct booking page.</div>
              </div>

              <div className="reserveWidgetMain">
                <div className="reserveWidgetFields reserveWidgetFields--inline">
                  <button type="button" className={`reserveField reserveField--button ${activeField === 'checkIn' && calendarOpen ? 'is-active' : ''}`} onClick={() => openCalendarFor('checkIn')}>
                    <span className="reserveFieldLabel">Check in</span>
                    <span className="reserveFieldValue">{formatDisplayDate(checkIn)}</span>
                  </button>

                  <button type="button" className={`reserveField reserveField--button ${activeField === 'checkOut' && calendarOpen ? 'is-active' : ''}`} onClick={() => openCalendarFor('checkOut')}>
                    <span className="reserveFieldLabel">Check out</span>
                    <span className="reserveFieldValue">{formatDisplayDate(checkOut)}</span>
                  </button>

                  <div className="reserveField reserveCounterField">
                    <span className="reserveFieldLabel">Rooms</span>
                    <div className="reserveCounter">
                      <button type="button" className="reserveCounterBtn" onClick={() => setRooms((v) => clampCount(v - 1, 1, 8))}>−</button>
                      <span className="reserveCounterValue">{rooms}</span>
                      <button type="button" className="reserveCounterBtn" onClick={() => setRooms((v) => clampCount(v + 1, 1, 8))}>+</button>
                    </div>
                  </div>

                  <div className="reserveField reserveCounterField">
                    <span className="reserveFieldLabel">Adults</span>
                    <div className="reserveCounter">
                      <button type="button" className="reserveCounterBtn" onClick={() => setAdults((v) => clampCount(v - 1, 1, 12))}>−</button>
                      <span className="reserveCounterValue">{adults}</span>
                      <button type="button" className="reserveCounterBtn" onClick={() => setAdults((v) => clampCount(v + 1, 1, 12))}>+</button>
                    </div>
                  </div>

                  <div className="reserveField reserveCounterField">
                    <span className="reserveFieldLabel">Children</span>
                    <div className="reserveCounter">
                      <button type="button" className="reserveCounterBtn" onClick={() => setChildrenGuests((v) => clampCount(v - 1, 0, 8))}>−</button>
                      <span className="reserveCounterValue">{childrenGuests}</span>
                      <button type="button" className="reserveCounterBtn" onClick={() => setChildrenGuests((v) => clampCount(v + 1, 0, 8))}>+</button>
                    </div>
                  </div>
                </div>

                {calendarOpen && (
                  <div className="rwCalendarPopover">
                    <div className="rwCalendarTopbar">
                      <div>
                        <div className="rwCalendarEyebrow">Selecting</div>
                        <div className="rwCalendarMode">{activeField === 'checkIn' ? 'Check in' : 'Check out'}</div>
                      </div>
                      <div className="rwCalendarNav">
                        <button type="button" className="rwCalendarNavBtn" onClick={() => setVisibleMonth((v) => addMonths(v, -1))}>‹</button>
                        <button type="button" className="rwCalendarNavBtn" onClick={() => setVisibleMonth((v) => addMonths(v, 1))}>›</button>
                      </div>
                    </div>

                    <div className="rwCalendarMonths">
                      {renderMonth(monthA, monthAGrid)}
                      {renderMonth(monthB, monthBGrid)}
                    </div>
                  </div>
                )}
              </div>

              <div className="reserveWidgetActions">
                <div className="reserveSummary">{nightsBetween(checkIn, checkOut)} night stay · {rooms} room · {adults} adult{adults > 1 ? 's' : ''}</div>
                <button type="button" className="reserveSubmit" onClick={() => { window.location.href = buildBookingUrl() }}>Check availability</button>
              </div>
            </div>
          </div>
        )}

        <main>{children}</main>

        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-brand">
              <div className="footer-name">Vanara Resort &amp; Spa</div>
              <div className="footer-sub">Uluwatu, Bali</div>

              <div className="footer-social" aria-label="Social media">
                <a href="#" aria-label="Instagram" className="social-btn"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg></a>
                <a href="#" aria-label="Facebook" className="social-btn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 9h3V6h-3c-2 0-4 2-4 4v3H7v3h3v5h3v-5h3l1-3h-4v-3c0-.6.4-1 1-1z" /></svg></a>
                <a href="#" aria-label="X" className="social-btn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4l16 16M20 4L4 20" /></svg></a>
              </div>
            </div>

            <div className="footer-col">
              <div className="footer-head">Contact</div>
              <div className="footer-text">VANARA Resort &amp; Spa</div>
              <div className="footer-text">PT. UWSUN ECO RESORT</div>
              <div className="footer-text">Jl. Batu Nunggalan No.9, Pecatu, Uluwatu, Bali 80361</div>
              <div className="footer-text">Phone / WhatsApp: <a className="footer-link" href="https://wa.me/628135356240">+62 813 5356 240</a></div>
              <a className="footer-link" href="mailto:info@vanara.life">Email: info@vanara.life</a>
            </div>

            <div className="footer-col">
              <div className="footer-head">Quick Links</div>
              <Link className="footer-link" href="/about">About</Link>
              <Link className="footer-link" href="/accommodation">Villas</Link>
              <Link className="footer-link" href="/#weddings">Weddings</Link>
              <Link className="footer-link" href="/dine">Dining</Link>
              <Link className="footer-link" href="/experience">Experiences</Link>
              <Link className="footer-link" href="/connect">Contact</Link>
            </div>

            <div className="footer-col">
              <div className="footer-head">Information</div>
              <Link className="footer-link" href="/factsheet">Factsheet</Link>
              <Link className="footer-link" href="/terms">Terms &amp; Conditions</Link>
              <Link className="footer-link" href="/privacy">Privacy Policy</Link>
              <Link className="footer-link" href="/legal">Legal Notice</Link>
            </div>
          </div>

          <div className="footer-copy">© {new Date().getFullYear()} Vanara Resort &amp; Spa</div>
        </footer>
      </body>
    </html>
  )
}
