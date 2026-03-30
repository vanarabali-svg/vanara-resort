'use client'

import './globals.css'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

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

function formatInputDate(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function parseInputDate(value: string) {
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
  const a = startOfDay(parseInputDate(start)).getTime()
  const b = startOfDay(parseInputDate(end)).getTime()
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

function formatDisplayDate(value: string) {
  if (!value) return 'Add date'
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(parseInputDate(value))
}

function clampCount(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function LuxuryBookingCalendar({
  visible,
  month,
  activeField,
  checkIn,
  checkOut,
  onPrev,
  onNext,
  onSelectDate,
}: {
  visible: boolean
  month: Date
  activeField: 'checkIn' | 'checkOut'
  checkIn: string
  checkOut: string
  onPrev: () => void
  onNext: () => void
  onSelectDate: (value: string) => void
}) {
  const months = useMemo(() => [month, addMonths(month, 1)], [month])
  const today = startOfDay(new Date())
  const startDate = checkIn ? startOfDay(parseInputDate(checkIn)) : null
  const endDate = checkOut ? startOfDay(parseInputDate(checkOut)) : null

  if (!visible) return null

  return (
    <div className="luxuryCalendar" role="group" aria-label="Booking calendar">
      <div className="luxuryCalendarHead">
        <div>
          <div className="luxuryCalendarKicker">Select dates</div>
          <div className="luxuryCalendarTitle">
            {activeField === 'checkIn' ? 'Choose your arrival' : 'Choose your departure'}
          </div>
        </div>

        <div className="luxuryCalendarNav">
          <button type="button" className="luxuryCalendarArrow" onClick={onPrev} aria-label="Previous month">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button type="button" className="luxuryCalendarArrow" onClick={onNext} aria-label="Next month">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="luxuryCalendarMonths">
        {months.map((monthDate) => {
          const cells = buildMonthGrid(monthDate)
          return (
            <div className="luxuryCalendarMonth" key={`${monthDate.getFullYear()}-${monthDate.getMonth()}`}>
              <div className="luxuryCalendarMonthTitle">
                {monthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>

              <div className="luxuryCalendarWeekdays">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>

              <div className="luxuryCalendarGrid">
                {cells.map(({ date, inMonth }) => {
                  const day = startOfDay(date)
                  const iso = formatInputDate(day)
                  const isPast = day.getTime() < today.getTime()
                  const isSelectedStart = startDate ? isSameDay(day, startDate) : false
                  const isSelectedEnd = endDate ? isSameDay(day, endDate) : false
                  const isInRange = !!(
                    startDate &&
                    endDate &&
                    day.getTime() > startDate.getTime() &&
                    day.getTime() < endDate.getTime()
                  )

                  let disabled = isPast
                  if (activeField === 'checkOut' && startDate) {
                    disabled = day.getTime() <= startDate.getTime()
                  }

                  return (
                    <button
                      key={iso}
                      type="button"
                      className={[
                        'luxuryCalendarDay',
                        !inMonth ? 'is-outside' : '',
                        disabled ? 'is-disabled' : '',
                        isSelectedStart ? 'is-start' : '',
                        isSelectedEnd ? 'is-end' : '',
                        isInRange ? 'is-in-range' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      disabled={disabled}
                      onClick={() => onSelectDate(iso)}
                      aria-label={day.toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    >
                      <span>{day.getDate()}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const today = startOfDay(new Date())
  const defaultCheckIn = formatInputDate(today)
  const defaultCheckOut = formatInputDate(addDays(today, 1))

  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [lang, setLang] = useState<'EN' | 'ID' | 'RU'>('EN')
  const [checkIn, setCheckIn] = useState(defaultCheckIn)
  const [checkOut, setCheckOut] = useState(defaultCheckOut)
  const [rooms, setRooms] = useState(1)
  const [adults, setAdults] = useState(2)
  const [childrenCount, setChildrenCount] = useState(0)
  const [calendarMonth, setCalendarMonth] = useState(startOfMonth(today))
  const [calendarField, setCalendarField] = useState<'checkIn' | 'checkOut'>('checkIn')
  const [calendarOpen, setCalendarOpen] = useState(false)

  const openBooking = () => {
    setBookingOpen(true)
    setCalendarField('checkIn')
    setCalendarOpen(false)
    setCalendarMonth(startOfMonth(checkIn ? parseInputDate(checkIn) : today))
  }

  const closeBooking = () => {
    setBookingOpen(false)
    setCalendarOpen(false)
  }

  const buildBookingUrl = () => {
    const params = new URLSearchParams()
    params.set('arrival', checkIn)
    params.set('departure', checkOut)
    params.set('checkInDate', checkIn)
    params.set('checkOutDate', checkOut)
    params.set('rooms', String(rooms))
    params.set('adults', String(adults))
    params.set('children', String(childrenCount))
    params.set('items[0][adults]', String(adults))
    params.set('items[0][children]', String(childrenCount))
    params.set('items[0][infants]', '0')
    params.set('items[0][rooms]', String(rooms))
    params.set('currency', 'IDR')
    params.set('locale', 'en')
    return `https://book-directonline.com/properties/vanararesortspa?${params.toString()}`
  }

  const handleBookingSubmit = () => {
    window.location.href = buildBookingUrl()
  }

  const handleDateSelect = (value: string) => {
    if (calendarField === 'checkIn') {
      setCheckIn(value)
      if (!checkOut || startOfDay(parseInputDate(checkOut)).getTime() <= startOfDay(parseInputDate(value)).getTime()) {
        setCheckOut(formatInputDate(addDays(parseInputDate(value), 1)))
      }
      setCalendarField('checkOut')
      setCalendarOpen(true)
      setCalendarMonth(startOfMonth(parseInputDate(value)))
      return
    }

    setCheckOut(value)
    setCalendarOpen(false)
  }

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
        closeBooking()
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
              <button
                type="button"
                className="reserve-pill"
                onClick={openBooking}
                aria-haspopup="dialog"
                aria-expanded={bookingOpen}
                aria-controls="reserve-widget"
              >
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
          <div
            className="reserveWidgetOverlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reserve-widget-title"
            id="reserve-widget"
            onClick={closeBooking}
          >
            <div className="reserveWidgetPanel" onClick={(e) => e.stopPropagation()}>
              <button className="reserveWidgetClose" type="button" onClick={closeBooking} aria-label="Close booking widget">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>

              <div className="reserveWidgetHead">
                <div className="reserveWidgetKicker">Direct booking</div>
                <div className="reserveWidgetTitle" id="reserve-widget-title">Reserve your stay</div>
                <div className="reserveWidgetSub">
                  Select your dates and guests, then continue to our direct booking page.
                </div>
              </div>

              <div className="reserveWidgetSummary">
                <button
                  type="button"
                  className={`reserveSummaryCard ${calendarField === 'checkIn' && calendarOpen ? 'is-active' : ''}`}
                  onClick={() => {
                    setCalendarField('checkIn')
                    setCalendarOpen(true)
                    setCalendarMonth(startOfMonth(parseInputDate(checkIn || defaultCheckIn)))
                  }}
                >
                  <span className="reserveSummaryLabel">Check in</span>
                  <span className="reserveSummaryValue">{formatDisplayDate(checkIn)}</span>
                </button>

                <button
                  type="button"
                  className={`reserveSummaryCard ${calendarField === 'checkOut' && calendarOpen ? 'is-active' : ''}`}
                  onClick={() => {
                    setCalendarField('checkOut')
                    setCalendarOpen(true)
                    setCalendarMonth(startOfMonth(parseInputDate(checkOut || checkIn || defaultCheckOut)))
                  }}
                >
                  <span className="reserveSummaryLabel">Check out</span>
                  <span className="reserveSummaryValue">{formatDisplayDate(checkOut)}</span>
                </button>

                <div className="reserveSummaryCard reserveSummaryCard--nights">
                  <span className="reserveSummaryLabel">Stay</span>
                  <span className="reserveSummaryValue">{nightsBetween(checkIn, checkOut)} nights</span>
                </div>
              </div>

              <LuxuryBookingCalendar
                visible={calendarOpen}
                month={calendarMonth}
                activeField={calendarField}
                checkIn={checkIn}
                checkOut={checkOut}
                onPrev={() => setCalendarMonth((prev) => addMonths(prev, -1))}
                onNext={() => setCalendarMonth((prev) => addMonths(prev, 1))}
                onSelectDate={handleDateSelect}
              />

              <div className="reserveWidgetGrid reserveWidgetGrid--compact">
                <div className="reserveField reserveCounterField">
                  <span className="reserveFieldLabel">Rooms</span>
                  <div className="reserveCounter">
                    <button
                      type="button"
                      className="reserveCounterBtn"
                      onClick={() => setRooms((v) => clampCount(v - 1, 1, 8))}
                    >
                      −
                    </button>
                    <span className="reserveCounterValue">{rooms}</span>
                    <button
                      type="button"
                      className="reserveCounterBtn"
                      onClick={() => setRooms((v) => clampCount(v + 1, 1, 8))}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="reserveField reserveCounterField">
                  <span className="reserveFieldLabel">Adults</span>
                  <div className="reserveCounter">
                    <button
                      type="button"
                      className="reserveCounterBtn"
                      onClick={() => setAdults((v) => clampCount(v - 1, 1, 12))}
                    >
                      −
                    </button>
                    <span className="reserveCounterValue">{adults}</span>
                    <button
                      type="button"
                      className="reserveCounterBtn"
                      onClick={() => setAdults((v) => clampCount(v + 1, 1, 12))}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="reserveField reserveCounterField">
                  <span className="reserveFieldLabel">Children</span>
                  <div className="reserveCounter">
                    <button
                      type="button"
                      className="reserveCounterBtn"
                      onClick={() => setChildrenCount((v) => clampCount(v - 1, 0, 8))}
                    >
                      −
                    </button>
                    <span className="reserveCounterValue">{childrenCount}</span>
                    <button
                      type="button"
                      className="reserveCounterBtn"
                      onClick={() => setChildrenCount((v) => clampCount(v + 1, 0, 8))}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="reserveWidgetActions">
                <button type="button" className="reserveSubmit" onClick={handleBookingSubmit}>
                  Check availability
                </button>

                <a
                  className="reserveDirectLink"
                  href="https://book-directonline.com/properties/vanararesortspa"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open direct booking
                </a>
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
