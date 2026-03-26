'use client'

import './globals.css'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'

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
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
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
    return {
      date,
      inMonth: date.getMonth() === monthIndex,
    }
  })
}

function clampCount(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [lang, setLang] = useState<'EN' | 'ID' | 'RU'>('EN')

  const today = useMemo(() => startOfDay(new Date()), [])
  const bookingMerchantUrl = 'https://book-directonline.com/properties/vanararesortspa'

  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [adults, setAdults] = useState(2)
  const [rooms, setRooms] = useState(1)
  const [visibleMonth, setVisibleMonth] = useState(startOfMonth(today))
  const [calendarOpen, setCalendarOpen] = useState(true)
  const [activeField, setActiveField] = useState<'checkin' | 'checkout'>('checkin')
  const calendarRef = useRef<HTMLDivElement | null>(null)

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
        setBookingOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen || langOpen || bookingOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen, langOpen, bookingOpen])

  useEffect(() => {
    if (!bookingOpen) return
    const anchor = checkIn ? parseDateInput(checkIn) : today
    setVisibleMonth(startOfMonth(anchor))
  }, [bookingOpen, checkIn, today])

  const formattedCheckIn = checkIn
    ? new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(parseDateInput(checkIn))
    : 'Add date'

  const formattedCheckOut = checkOut
    ? new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(parseDateInput(checkOut))
    : 'Add date'

  const totalNights = nightsBetween(checkIn, checkOut)

  const bookingSummary = checkIn && checkOut
    ? `${totalNights} ${totalNights === 1 ? 'night' : 'nights'} · ${adults} ${adults === 1 ? 'adult' : 'adults'} · ${rooms} ${rooms === 1 ? 'room' : 'rooms'}`
    : 'Select your dates, then continue to live availability.'

  const openBooking = () => {
    setBookingOpen(true)
    setCalendarOpen(true)
    setActiveField(checkIn && !checkOut ? 'checkout' : 'checkin')
  }

  const openCalendarFor = (field: 'checkin' | 'checkout') => {
    setActiveField(field)
    setCalendarOpen(true)
    window.requestAnimationFrame(() => {
      calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const handleDaySelect = (date: Date) => {
    const candidate = startOfDay(date)
    if (candidate < today) return

    const value = formatDateInput(candidate)

    if (!checkIn || (checkIn && checkOut) || activeField === 'checkin') {
      setCheckIn(value)
      setCheckOut('')
      setActiveField('checkout')
      return
    }

    const start = parseDateInput(checkIn)
    if (candidate <= start) {
      setCheckIn(value)
      setCheckOut('')
      setActiveField('checkout')
      return
    }

    setCheckOut(value)
    setCalendarOpen(false)
  }

  const handleBookingRedirect = () => {
    if (!checkIn || !checkOut) return

    const safeAdults = clampCount(adults, 1, 8)
    const safeRooms = clampCount(rooms, 1, 4)

    if (safeAdults < safeRooms) {
      window.alert('Adults cannot be fewer than rooms.')
      return
    }

    const url = new URL(bookingMerchantUrl)
    url.searchParams.set('checkInDate', checkIn)
    url.searchParams.set('checkOutDate', checkOut)
    url.searchParams.set('locale', 'en')
    url.searchParams.set('trackPage', 'no')

    const baseAdultsPerRoom = Math.floor(safeAdults / safeRooms)
    const extraAdults = safeAdults % safeRooms

    for (let i = 0; i < safeRooms; i += 1) {
      const adultsForThisRoom = baseAdultsPerRoom + (i < extraAdults ? 1 : 0)
      url.searchParams.set(`items[${i}][adults]`, String(adultsForThisRoom))
      url.searchParams.set(`items[${i}][children]`, '0')
      url.searchParams.set(`items[${i}][infants]`, '0')
    }

    window.location.href = url.toString()
  }

  const renderMonth = (monthDate: Date) => {
    const cells = buildMonthGrid(monthDate)
    const checkInDate = checkIn ? parseDateInput(checkIn) : null
    const checkOutDate = checkOut ? parseDateInput(checkOut) : null
    const monthTitle = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(monthDate)

    return (
      <div className="booking-calendarMonth" key={monthTitle}>
        <div className="booking-calendarMonthTitle">{monthTitle}</div>

        <div className="booking-weekdays" aria-hidden="true">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="booking-days">
          {cells.map(({ date, inMonth }) => {
            const isDisabled = startOfDay(date) < today
            const isSelectedStart = !!checkInDate && isSameDay(date, checkInDate)
            const isSelectedEnd = !!checkOutDate && isSameDay(date, checkOutDate)
            const isInRange = !!checkInDate && !!checkOutDate && date > checkInDate && date < checkOutDate
            const isToday = isSameDay(date, today)

            return (
              <button
                key={date.toISOString()}
                type="button"
                className={[
                  'booking-day',
                  !inMonth ? 'is-outside' : '',
                  isDisabled ? 'is-disabled' : '',
                  isSelectedStart ? 'is-checkin' : '',
                  isSelectedEnd ? 'is-checkout' : '',
                  isInRange ? 'is-inrange' : '',
                  isToday ? 'is-today' : '',
                ].filter(Boolean).join(' ')}
                disabled={isDisabled}
                onClick={() => handleDaySelect(date)}
                aria-label={new Intl.DateTimeFormat('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                }).format(date)}
              >
                <span>{date.getDate()}</span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

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
              <button type="button" className="reserve-pill" onClick={openBooking} aria-label="Open reservation form">
                <span className="reserveText">
                  <span className="reserveLong">Reserve</span>
                  <span className="reserveShort">Reserve</span>
                </span>{' '}
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

        {bookingOpen && (
          <div className="booking-overlay" onClick={() => setBookingOpen(false)} role="dialog" aria-modal="true" aria-label="Reservation form">
            <div className="booking-panel booking-panel--calendar" onClick={(e) => e.stopPropagation()}>
              <button className="booking-x" type="button" onClick={() => setBookingOpen(false)} aria-label="Close reservation form">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>

              <div className="booking-topbar">
                <div>
                  <div className="booking-kicker">Reserve</div>
                  <div className="booking-title">Choose your dates</div>
                  <p className="booking-text">
                    A calmer, Airbnb-style date picker for arrivals and departures, followed by guests and room count before redirecting to DirectOnline.
                  </p>
                </div>

                <div className="booking-summaryCard">
                  <div className="booking-summaryLabel">Stay summary</div>
                  <div className="booking-summaryDates">{formattedCheckIn} — {formattedCheckOut}</div>
                  <div className="booking-summaryMeta">{bookingSummary}</div>
                </div>
              </div>

              <div className="booking-selectionRow">
                <button
                  type="button"
                  className={`booking-selection ${activeField === 'checkin' ? 'is-active' : ''}`}
                  onClick={() => {
                    setCheckIn('')
                    setCheckOut('')
                    openCalendarFor('checkin')
                  }}
                >
                  <span className="booking-selectionLabel">Check-in</span>
                  <span className="booking-selectionValue">{formattedCheckIn}</span>
                </button>

                <button
                  type="button"
                  className={`booking-selection ${activeField === 'checkout' ? 'is-active' : ''}`}
                  onClick={() => {
                    if (checkIn) {
                      setCheckOut('')
                      openCalendarFor('checkout')
                    } else {
                      openCalendarFor('checkin')
                    }
                  }}
                >
                  <span className="booking-selectionLabel">Check-out</span>
                  <span className="booking-selectionValue">{formattedCheckOut}</span>
                </button>
              </div>

              <div
                ref={calendarRef}
                className={`booking-calendarWrap ${calendarOpen ? 'is-open' : 'is-collapsed'}`}
              >
                <div className="booking-calendarNav">
                  <button
                    type="button"
                    className="booking-navBtn"
                    onClick={() => setVisibleMonth((current) => addMonths(current, -1))}
                    disabled={visibleMonth <= startOfMonth(today)}
                    aria-label="Show previous month"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>

                  <div className="booking-rangeHint">
                    {activeField === 'checkin' && 'Select check-in'}
                    {activeField === 'checkout' && !checkOut && 'Select check-out'}
                    {checkIn && checkOut && `${totalNights} ${totalNights === 1 ? 'night' : 'nights'} selected`}
                  </div>

                  <button
                    type="button"
                    className="booking-navBtn"
                    onClick={() => setVisibleMonth((current) => addMonths(current, 1))}
                    aria-label="Show next month"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </button>
                </div>

                {calendarOpen && (
                  <div className="booking-calendarGrid">
                    {renderMonth(visibleMonth)}
                    {renderMonth(addMonths(visibleMonth, 1))}
                  </div>
                )}
              </div>

              <div className="booking-controls">
                <div className="booking-counterCard">
                  <div>
                    <div className="booking-counterLabel">Adults</div>
                    <div className="booking-counterHint">Ages 13+</div>
                  </div>
                  <div className="booking-stepper">
                    <button type="button" onClick={() => setAdults((value) => clampCount(value - 1, 1, 8))} aria-label="Decrease adults">−</button>
                    <span>{adults}</span>
                    <button type="button" onClick={() => setAdults((value) => clampCount(value + 1, 1, 8))} aria-label="Increase adults">+</button>
                  </div>
                </div>

                <div className="booking-counterCard">
                  <div>
                    <div className="booking-counterLabel">Rooms</div>
                    <div className="booking-counterHint">Up to 4 rooms</div>
                  </div>
                  <div className="booking-stepper">
                    <button type="button" onClick={() => setRooms((value) => clampCount(value - 1, 1, 4))} aria-label="Decrease rooms">−</button>
                    <span>{rooms}</span>
                    <button type="button" onClick={() => setRooms((value) => clampCount(value + 1, 1, 4))} aria-label="Increase rooms">+</button>
                  </div>
                </div>
              </div>

              <div className="booking-actions booking-actions--split">
                <button
                  type="button"
                  className="booking-reset"
                  onClick={() => {
                    setCheckIn('')
                    setCheckOut('')
                    setAdults(2)
                    setRooms(1)
                    setVisibleMonth(startOfMonth(today))
                  }}
                >
                  Clear
                </button>

                <button
                  type="button"
                  className="booking-submit"
                  onClick={handleBookingRedirect}
                  disabled={!checkIn || !checkOut}
                >
                  Check availability
                </button>
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
              </Link>
            </div>
          </div>

          <div className="footer-copy">© {new Date().getFullYear()} Vanara Resort &amp; Spa</div>
        </footer>
      </body>
    </html>
  )
}
