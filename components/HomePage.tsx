'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { type Locale, dateLocales, getDictionary, withLang } from '../lib/i18n'

function useScrollZoom(ref: any, opts?: { min?: number; max?: number; start?: number; end?: number }) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const min = opts?.min ?? 1.0
    const max = opts?.max ?? 1.06
    const start = opts?.start ?? 0.15
    const end = opts?.end ?? 0.85
    let raf: number | null = null
    const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n))
    const update = () => { raf = null; const rect = el.getBoundingClientRect(); const vh = window.innerHeight || 1; const raw = 1 - rect.top / vh; const t = clamp((raw - start) / (end - start), 0, 1); const eased = 1 - Math.pow(1 - t, 3); const scale = max - (max - min) * eased; el.style.setProperty('--scrollZoom', String(scale)) }
    const onScroll = () => { if (raf != null) return; raf = requestAnimationFrame(update) }
    update(); window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll)
    return () => { if (raf != null) cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [ref, opts?.min, opts?.max, opts?.start, opts?.end])
}
function startOfDay(date: Date) { const d = new Date(date); d.setHours(0, 0, 0, 0); return d }
function addDays(date: Date, amount: number) { const d = new Date(date); d.setDate(d.getDate() + amount); return d }
function formatDateInput(date: Date) { const y = date.getFullYear(); const m = String(date.getMonth() + 1).padStart(2, '0'); const d = String(date.getDate()).padStart(2, '0'); return `${y}-${m}-${d}` }
function parseDateInput(value: string) { const [y, m, d] = value.split('-').map(Number); return new Date(y, (m || 1) - 1, d || 1) }
function nightsBetween(start: string, end: string) { if (!start || !end) return 0; const a = startOfDay(parseDateInput(start)).getTime(); const b = startOfDay(parseDateInput(end)).getTime(); return Math.max(0, Math.round((b - a) / 86400000)) }
function formatDisplayDate(value: string, lang: Locale) { if (!value) return '—'; return new Intl.DateTimeFormat(dateLocales[lang], { month: 'short', day: 'numeric' }).format(parseDateInput(value)) }


function useAutoplayInView() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting && entry.intersectionRatio > 0.35)
      },
      {
        threshold: [0, 0.2, 0.35, 0.5, 0.7],
        rootMargin: '0px 0px -10% 0px',
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, isInView }
}

function useLockedSwipe(onPrev: () => void, onNext: () => void) {
  const touchRef = useRef<{ x: number; y: number; locked: boolean } | null>(null)
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0]
    touchRef.current = { x: t.clientX, y: t.clientY, locked: false }
  }
  const onTouchMove = (e: React.TouchEvent) => {
    const start = touchRef.current
    if (!start) return
    const t = e.touches[0]
    const dx = t.clientX - start.x
    const dy = t.clientY - start.y
    if (!start.locked && Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
      start.locked = true
    }
    if (start.locked) {
      e.preventDefault()
    }
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchRef.current
    touchRef.current = null
    if (!start) return
    const t = e.changedTouches[0]
    const dx = t.clientX - start.x
    const dy = t.clientY - start.y
    if (Math.abs(dx) < 44 || Math.abs(dx) < Math.abs(dy)) return
    if (dx < 0) onNext()
    else onPrev()
  }
  return { onTouchStart, onTouchMove, onTouchEnd }
}

function DiningCarousel() {
  const photos = useMemo(() => [
    { src: '/dining-1.webp', alt: 'Dining at Vanara' }, { src: '/dining-2.webp', alt: 'Dining setting' }, { src: '/dining-3.webp', alt: 'Chef & fresh cuisine' }, { src: '/dining-4.webp', alt: 'Sunset dining' },
  ], [])
  const [active, setActive] = useState(0); const [prev, setPrev] = useState<number | null>(null); const pausedRef = useRef(false); const { ref: inViewRef, isInView } = useAutoplayInView(); const zoomRef = useRef<HTMLDivElement | null>(null)
  useScrollZoom(zoomRef as any, { min: 1.0, max: 1.06, start: 0.15, end: 0.85 })
  const go = (i: number) => { const idx = (i + photos.length) % photos.length; setPrev(active); setActive(idx); window.setTimeout(() => setPrev(null), 650) }
  const prevSlide = () => go(active - 1); const nextSlide = () => go(active + 1)
  const { onTouchStart, onTouchMove, onTouchEnd } = useLockedSwipe(prevSlide, nextSlide)
  useEffect(() => { if (!isInView) return; const id = window.setInterval(() => { if (pausedRef.current || !isInView) return; go(active + 1) }, 5200); return () => window.clearInterval(id) }, [active, isInView, photos.length])
  return <section className="uDining" aria-label="Dining"><div className="uDiningCarousel revealBlock" ref={(node) => { zoomRef.current = node; inViewRef.current = node }} onMouseEnter={() => (pausedRef.current = true)} onMouseLeave={() => (pausedRef.current = false)} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} aria-label="Dining carousel"><div className="uDiningStage" aria-hidden="true">{photos.map((p, i) => { const isActive = i === active; const isPrev = prev !== null && i === prev; return <div key={p.src} className={`uDiningSlide ${isActive ? 'is-active' : ''} ${isPrev ? 'is-prev' : ''}`}><img className="uDiningImg" src={p.src} alt={p.alt} draggable={false} /></div> })}</div><div className="uDiningShade" aria-hidden="true" /><button type="button" className="carouselArrow carouselArrow--prev" aria-label="Previous dining photo" onClick={prevSlide}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg></button><button type="button" className="carouselArrow carouselArrow--next" aria-label="Next dining photo" onClick={nextSlide}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg></button><div className="uDiningDots" aria-label="Dining carousel navigation">{photos.map((_, i) => <button key={i} type="button" className={`uDiningDot ${i === active ? 'is-active' : ''}`} aria-label={`Show dining photo ${i + 1}`} onClick={() => go(i)} />)}</div></div></section>
}

function VillasCarousel() {
  const photos = useMemo(() => [{ src: '/villas-1.webp', alt: 'Villa at Vanara' }, { src: '/villas-2.webp', alt: 'Villa terrace' }, { src: '/villas-3.webp', alt: 'Ocean view villa' }], [])
  const [active, setActive] = useState(0); const [prev, setPrev] = useState<number | null>(null); const pausedRef = useRef(false); const { ref: inViewRef, isInView } = useAutoplayInView(); const zoomRef = useRef<HTMLDivElement | null>(null)
  useScrollZoom(zoomRef as any, { min: 1.0, max: 1.06, start: 0.15, end: 0.85 })
  const go = (i: number) => { const idx = (i + photos.length) % photos.length; setPrev(active); setActive(idx); window.setTimeout(() => setPrev(null), 650) }
  const prevSlide = () => go(active - 1); const nextSlide = () => go(active + 1)
  const { onTouchStart, onTouchMove, onTouchEnd } = useLockedSwipe(prevSlide, nextSlide)
  useEffect(() => { if (!isInView) return; const id = window.setInterval(() => { if (pausedRef.current || !isInView) return; go(active + 1) }, 5600); return () => window.clearInterval(id) }, [active, isInView, photos.length])
  return <div className="uVillasCarousel revealBlock" ref={(node) => { zoomRef.current = node; inViewRef.current = node }} onMouseEnter={() => (pausedRef.current = true)} onMouseLeave={() => (pausedRef.current = false)} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} aria-label="Villas carousel"><div className="uVillasStage" aria-hidden="true">{photos.map((p, i) => { const isActive = i === active; const isPrev = prev !== null && i === prev; return <div key={p.src} className={`uVillasSlide ${isActive ? 'is-active' : ''} ${isPrev ? 'is-prev' : ''}`}><img className="uVillasImg" src={p.src} alt={p.alt} draggable={false} /></div> })}</div><div className="uVillasShade" aria-hidden="true" /><button type="button" className="carouselArrow carouselArrow--prev" aria-label="Previous villa photo" onClick={prevSlide}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg></button><button type="button" className="carouselArrow carouselArrow--next" aria-label="Next villa photo" onClick={nextSlide}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg></button><div className="uVillasDots" aria-label="Villas carousel navigation">{photos.map((_, i) => <button key={i} type="button" className={`uVillasDot ${i === active ? 'is-active' : ''}`} aria-label={`Show villa photo ${i + 1}`} onClick={() => go(i)} />)}</div></div>
}

function ExperienceMosaicGrid({ lang }: { lang: Locale }) {
  const t = getDictionary(lang)
  const items = useMemo(() => [
    { src: '/experience-honeymoon.jpg', alt: t.home.mosaic.honeymoon, title: t.home.mosaic.honeymoon, size: 'hero' },
    { src: '/experience-dining.jpg', alt: t.home.mosaic.dining, title: t.home.mosaic.dining, size: 'square' },
    { src: '/experience-sunset.jpg', alt: t.home.mosaic.sunset, title: t.home.mosaic.sunset, size: 'tall' },
    { src: '/experience-paragliding.jpg', alt: t.home.mosaic.paragliding, title: t.home.mosaic.paragliding, size: 'square' },
    { src: '/experience-yoga.jpg', alt: t.home.mosaic.yoga, title: t.home.mosaic.yoga, size: 'portrait' },
    { src: '/experience-nunggalan.jpg', alt: t.home.mosaic.beach, title: t.home.mosaic.beach, size: 'portrait' },
  ], [t])
  return <div className="experienceMosaicWrap"><div className="experienceMosaic" aria-label="Experiences gallery">{items.map((item, index) => <a className={`experienceMosaicItem experienceMosaicItem--${item.size} revealBlock`} key={`${item.title}-${index}`} href={withLang(lang, '/experience')} aria-label={`${item.title} — ${t.home.expCta}`}><img src={item.src} alt={item.alt} draggable={false} /><div className="experienceMosaicOverlay" aria-hidden="true" /><div className="experienceMosaicLabel">{item.title}</div></a>)}</div><div className="experienceMosaicCtaWrap"><a className="experienceMosaicCta" href={withLang(lang, '/experience')}>{t.home.expCta}</a></div></div>
}

export default function HomePage({ lang }: { lang: Locale }) {
  const t = getDictionary(lang)
  const [heroVideoOk, setHeroVideoOk] = useState(true)
    const heroVideoRef = useRef<HTMLVideoElement | null>(null)
  const today = startOfDay(new Date())
  const [bookCheckIn, setBookCheckIn] = useState(formatDateInput(today))
  const [bookCheckOut, setBookCheckOut] = useState(formatDateInput(addDays(today, 1)))
  const [bookAdults, setBookAdults] = useState(2)
  const [bookRooms, setBookRooms] = useState(1)
  const bookingUrl = useMemo(() => { const params = new URLSearchParams(); params.set('arrival', bookCheckIn); params.set('departure', bookCheckOut); params.set('checkInDate', bookCheckIn); params.set('checkOutDate', bookCheckOut); params.set('rooms', String(bookRooms)); params.set('adults', String(bookAdults)); params.set('children', '0'); params.set('items[0][adults]', String(bookAdults)); params.set('items[0][children]', '0'); params.set('items[0][infants]', '0'); params.set('items[0][rooms]', String(bookRooms)); params.set('currency', 'IDR'); params.set('locale', lang === 'cn' ? 'zh' : lang); return `https://book-directonline.com/properties/vanararesortspa?${params.toString()}` }, [bookAdults, bookCheckIn, bookCheckOut, bookRooms, lang])

  useEffect(() => {
    const v = heroVideoRef.current
    if (!v) return

    let cancelled = false
    const timers: number[] = []

    const primeVideo = () => {
      v.muted = true
      v.defaultMuted = true
      v.playsInline = true
      v.autoplay = true
      v.loop = true
      v.preload = 'metadata'
      v.setAttribute('muted', '')
      v.setAttribute('playsinline', '')
      v.setAttribute('webkit-playsinline', 'true')
      v.removeAttribute('controls')
    }

    const isPlaying = () => !v.paused && !v.ended && v.currentTime > 0

    const tryPlay = () => {
      if (cancelled || document.hidden) return
      primeVideo()
      if (isPlaying()) {
        setHeroVideoOk(true)
        return
      }
      const playPromise = v.play()
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise
          .then(() => {
            if (cancelled) return
            setHeroVideoOk(true)
          })
          .catch(() => {
            if (cancelled) return
          })
      }
    }

    const queueTry = (delay: number) => {
      const id = window.setTimeout(() => {
        tryPlay()
      }, delay)
      timers.push(id)
    }

    primeVideo()
    tryPlay()
    ;[160, 700, 1600].forEach(queueTry)

    const onLoadedMetadata = () => tryPlay()
    const onCanPlay = () => tryPlay()
    const onPlaying = () => {
      setHeroVideoOk(true)
    }
    const onVisibility = () => {
      if (!document.hidden) {
        queueTry(120)
      }
    }

    v.addEventListener('loadedmetadata', onLoadedMetadata)
    v.addEventListener('canplay', onCanPlay)
    v.addEventListener('playing', onPlaying)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pageshow', onVisibility)

    return () => {
      cancelled = true
      timers.forEach((id) => window.clearTimeout(id))
      v.removeEventListener('loadedmetadata', onLoadedMetadata)
      v.removeEventListener('canplay', onCanPlay)
      v.removeEventListener('playing', onPlaying)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pageshow', onVisibility)
    }
  }, [lang])
  useEffect(() => { const elements = Array.from(document.querySelectorAll('.revealBlock')) as HTMLElement[]; if (!elements.length) return; const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { const el = entry.target as HTMLElement; el.classList.add('is-revealed'); observer.unobserve(el) } }) }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }); elements.forEach((el) => observer.observe(el)); return () => observer.disconnect() }, [])

  return <div className="home"><section className="hero hero--video" aria-label="Hero"><div className="heroVideo" aria-label="Vanara hero media">{heroVideoOk ? <video key={`hero-${lang}`} ref={heroVideoRef} className="heroVideoEl" autoPlay muted playsInline loop preload="metadata" controls={false} disablePictureInPicture poster="/hero-poster.jpg" onError={() => { setHeroVideoOk(false) }} onCanPlay={() => { setHeroVideoOk(true) }}><source src="/hero.mp4" type="video/mp4" /></video> : <img className="heroVideoFallback" src="/hero-fallback.jpg" alt="Vanara Resort & Spa" />}</div><div className="heroShade" aria-hidden="true" /><div className="heroContent"><div className="heroKicker">{t.home.heroKicker}</div><h1 className="heroTitle">VANARA RESORT &amp; SPA</h1></div></section>
    <section className="section sectionIntro"><div className="container"><div className="eyebrow">{t.home.introEyebrow}</div><h2 className="h2">{t.home.introTitle}</h2><div className="copy" style={{ marginTop: 22 }}><p>{t.home.introP1}</p><p>{t.home.introP2}</p><p>{t.home.introP3}</p></div><div className="rule" /></div></section>
    <section className="section sectionVillasFeature"><div className="container"><div className="split split--rev"><VillasCarousel /><div><div className="eyebrow">{t.home.villasEyebrow}</div><h3 className="h3">{t.home.villasTitle}</h3><div className="copy"><p>{t.home.villasP1}</p><p>{t.home.villasP2}</p><p>{t.home.villasP3}</p></div><a className="textCta" href={withLang(lang, '/accommodation')}>{t.home.villasCta}</a></div></div></div></section>
    <section className="section sectionDiningFeature"><div className="container"><div className="split split--rev"><DiningCarousel /><div><div className="eyebrow">{t.home.kokoonEyebrow}</div><h3 className="h3">{t.home.kokoonTitle}</h3><div className="copy"><p>{t.home.kokoonP1}</p><p>{t.home.kokoonP2}</p></div><a className="textCta" href={withLang(lang, '/kokoon')}>{t.home.kokoonCta}</a></div></div></div></section>
    <section className="section sectionYoga"><div className="container"><div className="split split--rev"><div className="imagePlaceholder revealBlock" aria-label="Experience image"><img className="experienceImg" src="/experiences-main.jpg" alt="Experiences at Vanara" /></div><div><div className="eyebrow">{t.home.expEyebrow}</div><h3 className="h3">{t.home.expTitle}</h3><div className="copy"><p>{t.home.expP1}</p><p>{t.home.expP2}</p></div></div></div><ExperienceMosaicGrid lang={lang} /></div></section>
    <section className="section sectionWeddings" id="weddings"><div className="container"><div className="split split--rev"><div className="imagePlaceholder revealBlock" aria-label="Wedding image"><img className="experienceImg" src="/wedding.jpg" alt="Wedding at Vanara" /></div><div><div className="eyebrow">{t.home.weddingsEyebrow}</div><h3 className="h3">{t.home.weddingsTitle}</h3><div className="copy"><p>{t.home.weddingsP1}</p><p>{t.home.weddingsP2}</p><p>{t.home.weddingsP3}</p></div><a className="textCta" href={withLang(lang, '/weddings')}>{t.home.weddingsCta}</a></div></div></div></section>
    <section className="section sectionBookingFeature" id="booking"><div className="container"><div className="bookingFeature revealBlock"><div className="bookingFeatureIntro"><h3 className="h3">{t.home.bookingTitle}</h3><a className="bookingFeatureButton bookingFeatureButtonIntro" href={bookingUrl} target="_blank" rel="noreferrer">{t.home.bookingCta}</a></div><div className="bookingFeatureCard"><div className="bookingFeatureGrid"><label className="bookingField bookingFieldCheckIn"><span>{t.layout.checkIn}</span><input type="date" min={formatDateInput(today)} value={bookCheckIn} onChange={(e) => { const next = e.target.value; setBookCheckIn(next); if (next && bookCheckOut && parseDateInput(bookCheckOut) <= parseDateInput(next)) setBookCheckOut(formatDateInput(addDays(parseDateInput(next), 1))) }} /></label><label className="bookingField"><span>{t.layout.checkOut}</span><input type="date" min={formatDateInput(addDays(parseDateInput(bookCheckIn), 1))} value={bookCheckOut} onChange={(e) => setBookCheckOut(e.target.value)} /></label><label className="bookingField"><span>{t.layout.adults}</span><select value={bookAdults} onChange={(e) => setBookAdults(Number(e.target.value))}>{[1,2,3,4,5,6].map((n) => <option key={n} value={n}>{n}</option>)}</select></label><label className="bookingField"><span>{t.layout.rooms}</span><select value={bookRooms} onChange={(e) => setBookRooms(Number(e.target.value))}>{[1,2,3,4].map((n) => <option key={n} value={n}>{n}</option>)}</select></label></div><div className="bookingFeatureMeta"><div><div className="bookingFeatureSmall">{t.home.staySummary}</div><div className="bookingFeatureSummary">{formatDisplayDate(bookCheckIn, lang)} — {formatDisplayDate(bookCheckOut, lang)} · {nightsBetween(bookCheckIn, bookCheckOut)} {t.layout.nightStay}</div></div><a className="bookingFeatureButton" href={bookingUrl} target="_blank" rel="noreferrer">{t.layout.checkAvailability}</a></div></div></div></div></section>
    <section className="section sectionBottom"><div className="container"><div className="grid2"><div className="panel panel--mapLuxury"><div className="eyebrow">{t.home.locationEyebrow}</div><h3 className="h3">{t.home.locationTitle}</h3><p className="panelText">{t.home.locationText}</p><div className="luxMapWrap" aria-label="Vanara location map"><div className="luxMapFrame"><iframe src="https://www.google.com/maps?q=-8.8421164,115.1117122&z=16&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Vanara Resort & Spa map" /><div className="luxMapTone" aria-hidden="true" /><div className="luxMapGrain" aria-hidden="true" /><div className="luxMapPulse" aria-hidden="true" /><div className="luxMapPin" aria-hidden="true"><span className="luxMapPinDot" /></div><div className="luxMapCard"><div className="luxMapCardKicker">{t.home.mapKicker}</div><div className="luxMapCardTitle">{t.home.mapTitle}</div><div className="luxMapCardText">{t.home.mapText}</div></div></div><div className="luxMapActions"><a className="luxMapLink" href="https://www.google.com/maps/@-8.8421164,115.1117122,17z?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer">{t.layout.openMap}</a><a className="luxMapButton" href="https://www.google.com/maps/dir/?api=1&destination=-8.8421164,115.1117122" target="_blank" rel="noreferrer">{t.layout.getDirections}</a></div></div></div><div className="panel"><div className="eyebrow">{t.home.newsletterEyebrow}</div><h3 className="h3">{t.home.newsletterTitle}</h3><p className="panelText">{t.home.newsletterText}</p><form className="newsletter" action="#" method="post"><input className="newsletterInput" type="email" placeholder={t.home.newsletterPlaceholder} /><button className="newsletterBtn" type="submit">{t.home.newsletterButton}</button></form><div className="smallprint">{t.home.newsletterSmall}</div></div></div></div></section></div>
}
