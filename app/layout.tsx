'use client'

import './globals.css'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'

type LangCode = 'EN' | 'ID' | 'RU' | 'CN'

const localeMap: Record<LangCode, string> = {
  EN: 'en-US',
  ID: 'id-ID',
  RU: 'ru-RU',
  CN: 'zh-CN',
}

const weekdayLabels: Record<LangCode, string[]> = {
  EN: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  ID: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
  RU: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
  CN: ['一', '二', '三', '四', '五', '六', '日'],
}

const layoutTranslations: Record<LangCode, any> = {
  EN: {
    languageTitle: 'Language',
    languageHint: 'This changes the visible site text across the homepage, menu, footer, and booking interface.',
    languageNames: { EN: 'English', ID: 'Bahasa Indonesia', RU: 'Русский', CN: '中文' },
    reserve: 'Reserve',
    menu: ['About', 'Experience', 'Dine', 'Villas', 'Connect'],
    menuFootLocation: 'Uluwatu, Bali',
    menuFootText: 'For those who listen to the ocean — not over it.',
    bookingKicker: 'Direct booking',
    bookingTitle: 'Reserve your stay',
    bookingSub: 'Choose your dates and guests, then continue to our direct booking page.',
    checkIn: 'Check in',
    checkOut: 'Check out',
    rooms: 'Rooms',
    adults: 'Adults',
    children: 'Children',
    selecting: 'Selecting',
    reserveSummary: 'night stay',
    room: 'room',
    roomsWord: 'rooms',
    adult: 'adult',
    adultsWord: 'adults',
    checkAvailability: 'Check availability',
    addDate: 'Add date',
    cookieEyebrow: 'Cookie Policy',
    cookieTitle: 'A calmer, more seamless visit',
    cookieText: 'We use cookies to improve performance, remember preferences, and understand how guests move through the site.',
    readPolicy: 'Read policy',
    decline: 'Decline',
    accept: 'Accept',
    cookiesButton: 'Cookies',
    footerName: 'Vanara Resort & Spa',
    footerSub: 'Uluwatu, Bali',
    contactHead: 'Contact',
    quickLinksHead: 'Quick Links',
    infoHead: 'Information',
    factsheet: 'Factsheet',
    terms: 'Terms & Conditions',
    privacy: 'Privacy Policy',
    legal: 'Legal Notice',
    quickLinks: ['About', 'Villas', 'Weddings', 'Dining', 'Experiences', 'Contact'],
    languageAria: 'Change language',
    menuAria: 'Open menu',
    closeMenu: 'Close menu',
    closeLanguage: 'Close language',
    closeBooking: 'Close booking widget',
    cookieAria: 'Cookie policy',
  },
  ID: {
    languageTitle: 'Bahasa',
    languageHint: 'Ini mengubah teks yang terlihat di homepage, menu, footer, dan antarmuka pemesanan.',
    languageNames: { EN: 'English', ID: 'Bahasa Indonesia', RU: 'Русский', CN: '中文' },
    reserve: 'Pesan',
    menu: ['Tentang', 'Pengalaman', 'Bersantap', 'Vila', 'Hubungi'],
    menuFootLocation: 'Uluwatu, Bali',
    menuFootText: 'Untuk mereka yang mendengarkan samudra — bukan melampauinya.',
    bookingKicker: 'Pemesanan langsung',
    bookingTitle: 'Pesan masa inap Anda',
    bookingSub: 'Pilih tanggal dan tamu, lalu lanjutkan ke halaman pemesanan langsung kami.',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    rooms: 'Kamar',
    adults: 'Dewasa',
    children: 'Anak',
    selecting: 'Memilih',
    reserveSummary: 'malam menginap',
    room: 'kamar',
    roomsWord: 'kamar',
    adult: 'dewasa',
    adultsWord: 'dewasa',
    checkAvailability: 'Cek ketersediaan',
    addDate: 'Tambah tanggal',
    cookieEyebrow: 'Kebijakan Cookie',
    cookieTitle: 'Kunjungan yang lebih tenang dan mulus',
    cookieText: 'Kami menggunakan cookie untuk meningkatkan performa, mengingat preferensi, dan memahami bagaimana tamu menavigasi situs.',
    readPolicy: 'Baca kebijakan',
    decline: 'Tolak',
    accept: 'Terima',
    cookiesButton: 'Cookie',
    footerName: 'Vanara Resort & Spa',
    footerSub: 'Uluwatu, Bali',
    contactHead: 'Kontak',
    quickLinksHead: 'Tautan Cepat',
    infoHead: 'Informasi',
    factsheet: 'Factsheet',
    terms: 'Syarat & Ketentuan',
    privacy: 'Kebijakan Privasi',
    legal: 'Pemberitahuan Hukum',
    quickLinks: ['Tentang', 'Vila', 'Pernikahan', 'Bersantap', 'Pengalaman', 'Kontak'],
    languageAria: 'Ubah bahasa',
    menuAria: 'Buka menu',
    closeMenu: 'Tutup menu',
    closeLanguage: 'Tutup bahasa',
    closeBooking: 'Tutup widget pemesanan',
    cookieAria: 'Kebijakan cookie',
  },
  RU: {
    languageTitle: 'Язык',
    languageHint: 'Это меняет видимый текст на главной странице, в меню, футере и интерфейсе бронирования.',
    languageNames: { EN: 'English', ID: 'Bahasa Indonesia', RU: 'Русский', CN: '中文' },
    reserve: 'Бронировать',
    menu: ['О нас', 'Впечатления', 'Ресторан', 'Виллы', 'Контакты'],
    menuFootLocation: 'Улувату, Бали',
    menuFootText: 'Для тех, кто слушает океан — а не перекрывает его.',
    bookingKicker: 'Прямое бронирование',
    bookingTitle: 'Забронируйте проживание',
    bookingSub: 'Выберите даты и гостей, затем перейдите на нашу страницу прямого бронирования.',
    checkIn: 'Заезд',
    checkOut: 'Выезд',
    rooms: 'Номера',
    adults: 'Взрослые',
    children: 'Дети',
    selecting: 'Выбор',
    reserveSummary: 'ночей проживания',
    room: 'номер',
    roomsWord: 'номера',
    adult: 'взрослый',
    adultsWord: 'взрослых',
    checkAvailability: 'Проверить наличие',
    addDate: 'Добавить дату',
    cookieEyebrow: 'Политика cookie',
    cookieTitle: 'Более спокойный и плавный визит',
    cookieText: 'Мы используем cookie, чтобы улучшать работу сайта, запоминать предпочтения и понимать, как гости перемещаются по сайту.',
    readPolicy: 'Читать политику',
    decline: 'Отклонить',
    accept: 'Принять',
    cookiesButton: 'Cookie',
    footerName: 'Vanara Resort & Spa',
    footerSub: 'Улувату, Бали',
    contactHead: 'Контакты',
    quickLinksHead: 'Быстрые ссылки',
    infoHead: 'Информация',
    factsheet: 'Фактшит',
    terms: 'Условия и положения',
    privacy: 'Политика конфиденциальности',
    legal: 'Юридическая информация',
    quickLinks: ['О нас', 'Виллы', 'Свадьбы', 'Ресторан', 'Впечатления', 'Контакты'],
    languageAria: 'Изменить язык',
    menuAria: 'Открыть меню',
    closeMenu: 'Закрыть меню',
    closeLanguage: 'Закрыть выбор языка',
    closeBooking: 'Закрыть окно бронирования',
    cookieAria: 'Политика cookie',
  },
  CN: {
    languageTitle: '语言',
    languageHint: '这会切换首页、菜单、页脚和预订界面的可见文字。',
    languageNames: { EN: 'English', ID: 'Bahasa Indonesia', RU: 'Русский', CN: '中文' },
    reserve: '预订',
    menu: ['关于', '体验', '餐饮', '别墅', '联系'],
    menuFootLocation: '乌鲁瓦图，巴厘岛',
    menuFootText: '献给真正聆听海洋的人，而不是盖过海洋的人。',
    bookingKicker: '直接预订',
    bookingTitle: '预订您的入住',
    bookingSub: '选择日期和入住人数，然后前往我们的官方预订页面。',
    checkIn: '入住',
    checkOut: '退房',
    rooms: '房间',
    adults: '成人',
    children: '儿童',
    selecting: '正在选择',
    reserveSummary: '晚入住',
    room: '间房',
    roomsWord: '间房',
    adult: '位成人',
    adultsWord: '位成人',
    checkAvailability: '查看可订情况',
    addDate: '添加日期',
    cookieEyebrow: 'Cookie 政策',
    cookieTitle: '更安静、更顺畅的访问体验',
    cookieText: '我们使用 Cookie 来提升性能、记住偏好，并了解访客如何浏览网站。',
    readPolicy: '阅读政策',
    decline: '拒绝',
    accept: '接受',
    cookiesButton: 'Cookie',
    footerName: 'Vanara Resort & Spa',
    footerSub: '乌鲁瓦图，巴厘岛',
    contactHead: '联系方式',
    quickLinksHead: '快捷链接',
    infoHead: '信息',
    factsheet: '资料页',
    terms: '条款与条件',
    privacy: '隐私政策',
    legal: '法律声明',
    quickLinks: ['关于', '别墅', '婚礼', '餐饮', '体验', '联系'],
    languageAria: '切换语言',
    menuAria: '打开菜单',
    closeMenu: '关闭菜单',
    closeLanguage: '关闭语言选择',
    closeBooking: '关闭预订窗口',
    cookieAria: 'Cookie 政策',
  },
}

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

function formatDisplayDate(value: string, locale: string, emptyText: string) {
  if (!value) return emptyText
  return new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' }).format(parseDateInput(value))
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
  const [lang, setLang] = useState<LangCode>('EN')
  const languageStorageKey = 'vanara-language'
  const [cookieOpen, setCookieOpen] = useState(false)
  const cookieConsentKey = 'vanara-cookie-consent-v3'

  const t = layoutTranslations[lang]
  const locale = localeMap[lang]
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
    params.set('locale', lang === 'CN' ? 'zh-CN' : lang === 'ID' ? 'id' : lang === 'RU' ? 'ru' : 'en')
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
          {new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(month)}
        </div>
        <div className="rwCalendarWeekdays">
          {weekdayLabels[lang].map((day) => <span key={day}>{day}</span>)}
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

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(languageStorageKey) as LangCode | null
    if (savedLanguage && savedLanguage in layoutTranslations) {
      setLang(savedLanguage)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(languageStorageKey, lang)
    document.documentElement.lang = lang === 'CN' ? 'zh-CN' : lang === 'ID' ? 'id' : lang === 'RU' ? 'ru' : 'en'
    window.dispatchEvent(new CustomEvent('vanara-language-change', { detail: lang }))
  }, [lang])

  useEffect(() => {
    const saved = window.localStorage.getItem(cookieConsentKey)
    if (!saved) setCookieOpen(true)
  }, [])

  const saveCookieConsent = (value: 'accepted' | 'declined') => {
    window.localStorage.setItem(cookieConsentKey, value)
    setCookieOpen(false)
  }

  const roomsLabel = rooms === 1 ? t.room : t.roomsWord
  const adultsLabel = adults === 1 ? t.adult : t.adultsWord

  return (
    <html lang={lang === 'CN' ? 'zh-CN' : lang === 'ID' ? 'id' : lang === 'RU' ? 'ru' : 'en'}>
      <head>
        <link rel="preload" as="video" href="/hero-light.mp4" />
        <link rel="preload" as="video" href="/hero.mp4" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>

      <body>
        <header className="nav">
          <div className="nav-inner">
            <div className="nav-left">
              <button className="ss-menuBtn" type="button" onClick={() => setMenuOpen(true)} aria-label={t.menuAria}>
                <span className="ss-burger" aria-hidden="true"><span /><span /><span /></span>
              </button>

              <button className="lang-pill" type="button" onClick={() => setLangOpen(true)} aria-label={t.languageAria}>
                <span className="lang-pillText">{lang}</span>{' '}
                <span className="pillIcon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17" /><path d="M12 3.5c2.3 2.3 3.6 5.3 3.6 8.5S14.3 18.7 12 20.5C9.7 18.7 8.4 15.7 8.4 12S9.7 5.8 12 3.5z" /></svg>
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
                <span className="reserveText"><span className="reserveLong">{t.reserve}</span><span className="reserveShort">{t.reserve}</span></span>{' '}
                <span className="pillIcon pillIcon--after" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M9 15l6-6" /><path d="M10 9h5v5" /></svg>
                </span>
              </button>
            </div>
          </div>
        </header>

        {menuOpen && (
          <div className="menu-overlay" onClick={() => setMenuOpen(false)} role="dialog" aria-modal="true">
            <div className="menu-panel" onClick={(e) => e.stopPropagation()}>
              <button className="menu-x" type="button" onClick={() => setMenuOpen(false)} aria-label={t.closeMenu}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
              </button>

              <nav className="menu-links" aria-label="Primary">
                <Link href="/about" onClick={() => setMenuOpen(false)}>{t.menu[0]}</Link>
                <Link href="/experience" onClick={() => setMenuOpen(false)}>{t.menu[1]}</Link>
                <Link href="/dine" onClick={() => setMenuOpen(false)}>{t.menu[2]}</Link>
                <Link href="/accommodation" onClick={() => setMenuOpen(false)}>{t.menu[3]}</Link>
                <Link href="/connect" onClick={() => setMenuOpen(false)}>{t.menu[4]}</Link>
              </nav>

              <div className="menu-foot" aria-hidden="true">
                <div>{t.menuFootLocation}</div>
                <div className="dot">•</div>
                <div>{t.menuFootText}</div>
              </div>
            </div>
          </div>
        )}

        {langOpen && (
          <div className="lang-overlay" onClick={() => setLangOpen(false)} role="dialog" aria-modal="true">
            <div className="lang-panel" onClick={(e) => e.stopPropagation()}>
              <button className="lang-x" type="button" onClick={() => setLangOpen(false)} aria-label={t.closeLanguage}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
              </button>

              <div className="lang-title">{t.languageTitle}</div>

              <div className="lang-options" role="list">
                {(['EN', 'ID', 'RU', 'CN'] as const).map((code) => (
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
                    <span className="lang-name">{t.languageNames[code]}</span>
                  </button>
                ))}
              </div>

              <div className="lang-hint">{t.languageHint}</div>
            </div>
          </div>
        )}

        {bookingOpen && (
          <div className="reserveWidgetOverlay" onClick={closeBooking} role="dialog" aria-modal="true">
            <div className="reserveWidgetPanel reserveWidgetPanel--anchored" onClick={(e) => e.stopPropagation()}>
              <button className="reserveWidgetClose" type="button" onClick={closeBooking} aria-label={t.closeBooking}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
              </button>

              <div className="reserveWidgetHead">
                <div className="reserveWidgetKicker">{t.bookingKicker}</div>
                <div className="reserveWidgetTitle">{t.bookingTitle}</div>
                <div className="reserveWidgetSub">{t.bookingSub}</div>
              </div>

              <div className="reserveWidgetMain">
                <div className="reserveWidgetFields reserveWidgetFields--inline">
                  <button type="button" className={`reserveField reserveField--button ${activeField === 'checkIn' && calendarOpen ? 'is-active' : ''}`} onClick={() => openCalendarFor('checkIn')}>
                    <span className="reserveFieldLabel">{t.checkIn}</span>
                    <span className="reserveFieldValue">{formatDisplayDate(checkIn, locale, t.addDate)}</span>
                  </button>

                  <button type="button" className={`reserveField reserveField--button ${activeField === 'checkOut' && calendarOpen ? 'is-active' : ''}`} onClick={() => openCalendarFor('checkOut')}>
                    <span className="reserveFieldLabel">{t.checkOut}</span>
                    <span className="reserveFieldValue">{formatDisplayDate(checkOut, locale, t.addDate)}</span>
                  </button>

                  <div className="reserveField reserveCounterField">
                    <span className="reserveFieldLabel">{t.rooms}</span>
                    <div className="reserveCounter">
                      <button type="button" className="reserveCounterBtn" onClick={() => setRooms((v) => clampCount(v - 1, 1, 8))}>−</button>
                      <span className="reserveCounterValue">{rooms}</span>
                      <button type="button" className="reserveCounterBtn" onClick={() => setRooms((v) => clampCount(v + 1, 1, 8))}>+</button>
                    </div>
                  </div>

                  <div className="reserveField reserveCounterField">
                    <span className="reserveFieldLabel">{t.adults}</span>
                    <div className="reserveCounter">
                      <button type="button" className="reserveCounterBtn" onClick={() => setAdults((v) => clampCount(v - 1, 1, 12))}>−</button>
                      <span className="reserveCounterValue">{adults}</span>
                      <button type="button" className="reserveCounterBtn" onClick={() => setAdults((v) => clampCount(v + 1, 1, 12))}>+</button>
                    </div>
                  </div>

                  <div className="reserveField reserveCounterField">
                    <span className="reserveFieldLabel">{t.children}</span>
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
                        <div className="rwCalendarEyebrow">{t.selecting}</div>
                        <div className="rwCalendarMode">{activeField === 'checkIn' ? t.checkIn : t.checkOut}</div>
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
                <div className="reserveSummary">{nightsBetween(checkIn, checkOut)} {t.reserveSummary} · {rooms} {roomsLabel} · {adults} {adultsLabel}</div>
                <button type="button" className="reserveSubmit" onClick={() => { window.location.href = buildBookingUrl() }}>{t.checkAvailability}</button>
              </div>
            </div>
          </div>
        )}

        <main>{children}</main>

        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-brand">
              <div className="footer-name">{t.footerName}</div>
              <div className="footer-sub">{t.footerSub}</div>

              <div className="footer-social" aria-label="Social media">
                <a href="#" aria-label="Instagram" className="social-btn"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg></a>
                <a href="#" aria-label="Facebook" className="social-btn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 9h3V6h-3c-2 0-4 2-4 4v3H7v3h3v5h3v-5h3l1-3h-4v-3c0-.6.4-1 1-1z" /></svg></a>
                <a href="#" aria-label="X" className="social-btn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4l16 16M20 4L4 20" /></svg></a>
              </div>
            </div>

            <div className="footer-col">
              <div className="footer-head">{t.contactHead}</div>
              <div className="footer-text">VANARA Resort &amp; Spa</div>
              <div className="footer-text">PT. UWSUN ECO RESORT</div>
              <div className="footer-text">Jl. Batu Nunggalan No.9, Pecatu, Uluwatu, Bali 80361</div>
              <div className="footer-text">Phone / WhatsApp: <a className="footer-link" href="https://wa.me/628135356240">+62 813 5356 240</a></div>
              <a className="footer-link" href="mailto:info@vanara.life">Email: info@vanara.life</a>
            </div>

            <div className="footer-col">
              <div className="footer-head">{t.quickLinksHead}</div>
              <Link className="footer-link" href="/about">{t.quickLinks[0]}</Link>
              <Link className="footer-link" href="/accommodation">{t.quickLinks[1]}</Link>
              <Link className="footer-link" href="/#weddings">{t.quickLinks[2]}</Link>
              <Link className="footer-link" href="/dine">{t.quickLinks[3]}</Link>
              <Link className="footer-link" href="/experience">{t.quickLinks[4]}</Link>
              <Link className="footer-link" href="/connect">{t.quickLinks[5]}</Link>
            </div>

            <div className="footer-col">
              <div className="footer-head">{t.infoHead}</div>
              <Link className="footer-link" href="/factsheet">{t.factsheet}</Link>
              <Link className="footer-link" href="/terms">{t.terms}</Link>
              <Link className="footer-link" href="/privacy">{t.privacy}</Link>
              <Link className="footer-link" href="/legal">{t.legal}</Link>
            </div>
          </div>

          <div className="footer-copy">© {new Date().getFullYear()} Vanara Resort &amp; Spa</div>
        </footer>

        {cookieOpen && (
          <div className="cookiePopup" role="dialog" aria-live="polite" aria-label={t.cookieAria}>
            <div className="cookiePopupInner">
              <div className="cookiePopupEyebrow">{t.cookieEyebrow}</div>
              <div className="cookiePopupTitle">{t.cookieTitle}</div>
              <p className="cookiePopupText">{t.cookieText}</p>
              <div className="cookiePopupActions">
                <Link className="cookiePopupLink" href="/privacy">{t.readPolicy}</Link>
                <button type="button" className="cookiePopupButton cookiePopupButtonGhost" onClick={() => saveCookieConsent('declined')}>{t.decline}</button>
                <button type="button" className="cookiePopupButton" onClick={() => saveCookieConsent('accepted')}>{t.accept}</button>
              </div>
            </div>
          </div>
        )}

        <button type="button" className="cookieManageButton" onClick={() => setCookieOpen(true)}>{t.cookiesButton}</button>
      </body>
    </html>
  )
}
