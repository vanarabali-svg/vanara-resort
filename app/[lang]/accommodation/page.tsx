'use client'

import { use, useMemo, useState } from 'react'
import SiteShell from '../../../components/SiteShell'
import { getDictionary, normalizeLocale, type Locale } from '../../../lib/i18n'
import styles from './accommodation.module.css'

type PageCopy = {
  heroKicker: string
  title: string
  subtitle: string
  text1: string
  text2: string
  availability: string
  stayTitle: string
  oceanLabel: string
  oceanText: string
  poolLabel: string
  poolText: string
  gardenLabel: string
  gardenText: string
  villaTypesTitle: string
  oceanVillaName: string
  oceanVillaText: string
  detailsBedroom: string
  detailsSize: string
  detailsGuests: string
  detailsView: string
  oceanPoolVillaName: string
  oceanPoolVillaText: string
  oceanPoolDetailsBedroom: string
  oceanPoolDetailsSize: string
  oceanPoolDetailsGuests: string
  oceanPoolDetailsView: string
  infinityVillaName: string
  infinityVillaText: string
  detailsBedroomsTwo: string
  detailsSizeLarge: string
  detailsInfinityPool: string
  detailsPremiumView: string
  detailsGuestsSix: string
  gardenVillaName: string
  gardenVillaText: string
  detailsKingBed: string
  detailsSizeGarden: string
  detailsGardenView: string
  detailsGuestsThree: string
  bookNow: string
  insideTitle: string
  insideText: string
  amenitiesTitle: string
  amenitiesText: string
  amenitiesDetails: string[]
  livingTitle: string
  livingText: string
  finalTitle: string
  finalText: string
  finalCta: string
}

const copy: Record<Locale, PageCopy> = {
  en: {
    heroKicker: 'VILLAS · ULUWATU',
    title: 'VILLAS',
    subtitle: 'Architecture that opens to air, light, and horizon',
    text1: 'Each villa at Vanara is defined by a quiet material palette, generous proportions, and a seamless flow between interior and exterior living.',
    text2: 'Some open toward the Indian Ocean, while others are immersed in lush greenery. Select villas feature private pools and spacious terraces, creating a slower, more considered rhythm of stay.',
    availability: 'Check Availability',
    stayTitle: 'The way you stay',
    oceanLabel: 'Ocean Facing',
    oceanText: 'Villas that open toward the Indian Ocean, where light and horizon define each moment.',
    poolLabel: 'Private Pool Living',
    poolText: 'A slower rhythm of stay, centered around private pools, terraces, and open-air living.',
    gardenLabel: 'Garden & Secluded',
    gardenText: 'Spaces immersed in tropical greenery, offering privacy and a more grounded connection to the surroundings.',
    villaTypesTitle: 'Villa Types',
    oceanVillaName: 'One Bedroom Ocean View Villa',
    oceanVillaText: 'Designed to face open ocean, where light and water define each moment.',
    detailsBedroom: '1 Bedroom',
    detailsSize: '70 sq. m. / 753 sq. ft.',
    detailsGuests: 'Max guests: 3',
    detailsView: 'Ocean View',
    oceanPoolVillaName: 'One Bedroom Ocean Pool Villa',
    oceanPoolVillaText: 'A more immersive stay with a private pool and partial ocean views.',
    oceanPoolDetailsBedroom: '1 Bedroom',
    oceanPoolDetailsSize: '98 sq. m. / 1054 sq. ft.',
    oceanPoolDetailsGuests: 'Max guests: 3',
    oceanPoolDetailsView: 'Partial Ocean View',
    infinityVillaName: 'Two Bedroom Infinity Pool Villa',
    infinityVillaText: 'Expansive space with uninterrupted ocean views and a seamless connection to the horizon.',
    detailsBedroomsTwo: '2 Bedrooms',
    detailsSizeLarge: '210 sq.m / 2260 sq. ft.',
    detailsInfinityPool: 'Infinity Pool',
    detailsPremiumView: 'Premium Ocean View',
    detailsGuestsSix: 'Max guests: 6',
    gardenVillaName: 'One Bedroom Garden View Villa',
    gardenVillaText: 'A quieter stay surrounded by lush greenery and natural textures.',
    detailsKingBed: '1 Bedroom',
    detailsSizeGarden: '70 sq. m. / 753 sq. ft.',
    detailsGardenView: 'Garden View',
    detailsGuestsThree: 'Max guests: 3',
    bookNow: 'Book now',
    insideTitle: 'Inside the villa',
    insideText: 'Curved lines, natural materials, and soft light shape interiors that feel both refined and effortless. Spaces remain open and adaptable, allowing indoor and outdoor living to merge naturally.',
    amenitiesTitle: 'Villa amenities',
    amenitiesText: 'Each villa is designed with a focus on comfort, functionality, and refined living.',
    amenitiesDetails: [
      'Private terrace or outdoor living area',
      'Private pool (selected villas)',
      'King-sized bed with premium linens',
      'Spacious indoor and outdoor living areas',
      'Air conditioning and ceiling fan',
      'High-speed Wi‑Fi',
      'Coffee machine with curated selection',
      'Complimentary bottled water, refreshed daily',
      'Private bathroom with bathtub and rain shower',
      'Double vanity and premium toiletries',
      'Hair dryer',
      'Bathrobes and slippers',
      'In-room safe',
      'Work and dining space',
      'In-villa dining and room service',
    ],
    livingTitle: 'Living at Vanara',
    livingText: 'Days unfold between the villa, the ocean, and the surrounding landscape, from slow mornings by the pool to evenings shaped by light and atmosphere.',
    finalTitle: 'Final',
    finalText: 'Experience space, comfort, and the rhythm of the ocean.',
    finalCta: 'Book your Stay',
  },
  id: {
    heroKicker: 'VILA · ULUWATU',
    title: 'VILA',
    subtitle: 'Arsitektur yang terbuka pada udara, cahaya, dan horizon',
    text1: 'Setiap vila di Vanara didefinisikan oleh palet material yang tenang, proporsi yang lapang, dan alur yang menyatu antara ruang dalam dan luar.',
    text2: 'Sebagian menghadap Samudra Hindia, sementara yang lain tenggelam dalam kehijauan yang rimbun. Beberapa vila memiliki kolam privat dan teras luas, menciptakan ritme menginap yang lebih lambat dan lebih berkesan.',
    availability: 'Cek Ketersediaan',
    stayTitle: 'Cara Anda Menginap',
    oceanLabel: 'Menghadap Laut',
    oceanText: 'Vila-vila yang terbuka ke arah Samudra Hindia, tempat cahaya dan horizon menentukan setiap momen.',
    poolLabel: 'Hidup dengan Kolam Privat',
    poolText: 'Ritme menginap yang lebih lambat, berpusat pada kolam privat, teras, dan kehidupan terbuka.',
    gardenLabel: 'Taman & Tersembunyi',
    gardenText: 'Ruang yang tenggelam dalam kehijauan tropis, menawarkan privasi dan hubungan yang lebih membumi dengan sekitarnya.',
    villaTypesTitle: 'Tipe Vila',
    oceanVillaName: 'One Bedroom Ocean View Villa',
    oceanVillaText: 'Designed to face open ocean, where light and water define each moment.',
    detailsBedroom: '1 Bedroom',
    detailsSize: '70 sq. m. / 753 sq. ft.',
    detailsGuests: 'Max guests: 3',
    detailsView: 'Ocean View',
    oceanPoolVillaName: 'One Bedroom Ocean Pool Villa',
    oceanPoolVillaText: 'A more immersive stay with a private pool and partial ocean views.',
    oceanPoolDetailsBedroom: '1 Bedroom',
    oceanPoolDetailsSize: '98 sq. m. / 1054 sq. ft.',
    oceanPoolDetailsGuests: 'Max guests: 3',
    oceanPoolDetailsView: 'Partial Ocean View',
    infinityVillaName: 'Two Bedroom Infinity Pool Villa',
    infinityVillaText: 'Expansive space with uninterrupted ocean views and a seamless connection to the horizon.',
    detailsBedroomsTwo: '2 Bedrooms',
    detailsSizeLarge: '210 sq.m / 2260 sq. ft.',
    detailsInfinityPool: 'Infinity Pool',
    detailsPremiumView: 'Premium Ocean View',
    detailsGuestsSix: 'Max guests: 6',
    gardenVillaName: 'One Bedroom Garden View Villa',
    gardenVillaText: 'A quieter stay surrounded by lush greenery and natural textures.',
    detailsKingBed: '1 Bedroom',
    detailsSizeGarden: '70 sq. m. / 753 sq. ft.',
    detailsGardenView: 'Garden View',
    detailsGuestsThree: 'Max guests: 3',
    bookNow: 'Book now',
    insideTitle: 'Inside the villa',
    insideText: 'Curved lines, natural materials, and soft light shape interiors that feel both refined and effortless. Spaces remain open and adaptable, allowing indoor and outdoor living to merge naturally.',
    amenitiesTitle: 'Villa amenities',
    amenitiesText: 'Each villa is designed with a focus on comfort, functionality, and refined living.',
    amenitiesDetails: [
      'Private terrace or outdoor living area',
      'Private pool (selected villas)',
      'King-sized bed with premium linens',
      'Spacious indoor and outdoor living areas',
      'Air conditioning and ceiling fan',
      'High-speed Wi‑Fi',
      'Coffee machine with curated selection',
      'Complimentary bottled water, refreshed daily',
      'Private bathroom with bathtub and rain shower',
      'Double vanity and premium toiletries',
      'Hair dryer',
      'Bathrobes and slippers',
      'In-room safe',
      'Work and dining space',
      'In-villa dining and room service',
    ],
    livingTitle: 'Living at Vanara',
    livingText: 'Days unfold between the villa, the ocean, and the surrounding landscape, from slow mornings by the pool to evenings shaped by light and atmosphere.',
    finalTitle: 'Final',
    finalText: 'Experience space, comfort, and the rhythm of the ocean.',
    finalCta: 'Book your Stay',
  },
  ru: {
    heroKicker: 'ВИЛЛЫ · УЛУВАТУ',
    title: 'ВИЛЛЫ',
    subtitle: 'Архитектура, открытая воздуху, свету и горизонту',
    text1: 'Каждая вилла Vanara определяется сдержанной палитрой материалов, щедрыми пропорциями и плавным переходом между внутренним и внешним пространством.',
    text2: 'Одни обращены к Индийскому океану, другие утопают в пышной зелени. Некоторые виллы располагают частными бассейнами и просторными террасами, создавая более медленный и осмысленный ритм отдыха.',
    availability: 'Проверить наличие',
    stayTitle: 'Как вы отдыхаете',
    oceanLabel: 'Вид на океан',
    oceanText: 'Виллы, открытые к Индийскому океану, где свет и линия горизонта определяют каждый момент.',
    poolLabel: 'Приватная жизнь у бассейна',
    poolText: 'Более медленный ритм отдыха, выстроенный вокруг частных бассейнов, террас и жизни под открытым небом.',
    gardenLabel: 'Сад и уединение',
    gardenText: 'Пространства, утопающие в тропической зелени, дарят приватность и более глубокую связь с окружением.',
    villaTypesTitle: 'Типы вилл',
    oceanVillaName: 'One Bedroom Ocean View Villa',
    oceanVillaText: 'Designed to face open ocean, where light and water define each moment.',
    detailsBedroom: '1 Bedroom',
    detailsSize: '70 sq. m. / 753 sq. ft.',
    detailsGuests: 'Max guests: 3',
    detailsView: 'Ocean View',
    oceanPoolVillaName: 'One Bedroom Ocean Pool Villa',
    oceanPoolVillaText: 'A more immersive stay with a private pool and partial ocean views.',
    oceanPoolDetailsBedroom: '1 Bedroom',
    oceanPoolDetailsSize: '98 sq. m. / 1054 sq. ft.',
    oceanPoolDetailsGuests: 'Max guests: 3',
    oceanPoolDetailsView: 'Partial Ocean View',
    infinityVillaName: 'Two Bedroom Infinity Pool Villa',
    infinityVillaText: 'Expansive space with uninterrupted ocean views and a seamless connection to the horizon.',
    detailsBedroomsTwo: '2 Bedrooms',
    detailsSizeLarge: '210 sq.m / 2260 sq. ft.',
    detailsInfinityPool: 'Infinity Pool',
    detailsPremiumView: 'Premium Ocean View',
    detailsGuestsSix: 'Max guests: 6',
    gardenVillaName: 'One Bedroom Garden View Villa',
    gardenVillaText: 'A quieter stay surrounded by lush greenery and natural textures.',
    detailsKingBed: '1 Bedroom',
    detailsSizeGarden: '70 sq. m. / 753 sq. ft.',
    detailsGardenView: 'Garden View',
    detailsGuestsThree: 'Max guests: 3',
    bookNow: 'Book now',
    insideTitle: 'Inside the villa',
    insideText: 'Curved lines, natural materials, and soft light shape interiors that feel both refined and effortless. Spaces remain open and adaptable, allowing indoor and outdoor living to merge naturally.',
    amenitiesTitle: 'Villa amenities',
    amenitiesText: 'Each villa is designed with a focus on comfort, functionality, and refined living.',
    amenitiesDetails: [
      'Private terrace or outdoor living area',
      'Private pool (selected villas)',
      'King-sized bed with premium linens',
      'Spacious indoor and outdoor living areas',
      'Air conditioning and ceiling fan',
      'High-speed Wi‑Fi',
      'Coffee machine with curated selection',
      'Complimentary bottled water, refreshed daily',
      'Private bathroom with bathtub and rain shower',
      'Double vanity and premium toiletries',
      'Hair dryer',
      'Bathrobes and slippers',
      'In-room safe',
      'Work and dining space',
      'In-villa dining and room service',
    ],
    livingTitle: 'Living at Vanara',
    livingText: 'Days unfold between the villa, the ocean, and the surrounding landscape, from slow mornings by the pool to evenings shaped by light and atmosphere.',
    finalTitle: 'Final',
    finalText: 'Experience space, comfort, and the rhythm of the ocean.',
    finalCta: 'Book your Stay',
  },
  cn: {
    heroKicker: '别墅 · 乌鲁瓦图',
    title: '别墅',
    subtitle: '向空气、光线与地平线敞开的建筑',
    text1: 'Vanara 的每一栋别墅都以克制的材质语言、宽阔的比例，以及室内外生活之间自然流动的关系为特征。',
    text2: '有的面向印度洋，有的沉浸于繁茂绿意之中。部分别墅配有私人泳池与宽敞露台，营造出更从容、更值得细细体会的居停节奏。',
    availability: '查看房态',
    stayTitle: '居停方式',
    oceanLabel: '面向海洋',
    oceanText: '这些别墅面向印度洋敞开，让光线与地平线定义每一个时刻。',
    poolLabel: '私人泳池生活',
    poolText: '更缓慢的居停节奏，围绕私人泳池、露台与开放式生活展开。',
    gardenLabel: '花园与静谧',
    gardenText: '沉浸于热带绿意中的空间，带来私密感，也与周围环境建立更沉稳的联系。',
    villaTypesTitle: '别墅类型',
    oceanVillaName: 'One Bedroom Ocean View Villa',
    oceanVillaText: 'Designed to face open ocean, where light and water define each moment.',
    detailsBedroom: '1 Bedroom',
    detailsSize: '70 sq. m. / 753 sq. ft.',
    detailsGuests: 'Max guests: 3',
    detailsView: 'Ocean View',
    oceanPoolVillaName: 'One Bedroom Ocean Pool Villa',
    oceanPoolVillaText: 'A more immersive stay with a private pool and partial ocean views.',
    oceanPoolDetailsBedroom: '1 Bedroom',
    oceanPoolDetailsSize: '98 sq. m. / 1054 sq. ft.',
    oceanPoolDetailsGuests: 'Max guests: 3',
    oceanPoolDetailsView: 'Partial Ocean View',
    infinityVillaName: 'Two Bedroom Infinity Pool Villa',
    infinityVillaText: 'Expansive space with uninterrupted ocean views and a seamless connection to the horizon.',
    detailsBedroomsTwo: '2 Bedrooms',
    detailsSizeLarge: '210 sq.m / 2260 sq. ft.',
    detailsInfinityPool: 'Infinity Pool',
    detailsPremiumView: 'Premium Ocean View',
    detailsGuestsSix: 'Max guests: 6',
    gardenVillaName: 'One Bedroom Garden View Villa',
    gardenVillaText: 'A quieter stay surrounded by lush greenery and natural textures.',
    detailsKingBed: '1 Bedroom',
    detailsSizeGarden: '70 sq. m. / 753 sq. ft.',
    detailsGardenView: 'Garden View',
    detailsGuestsThree: 'Max guests: 3',
    bookNow: 'Book now',
    insideTitle: 'Inside the villa',
    insideText: 'Curved lines, natural materials, and soft light shape interiors that feel both refined and effortless. Spaces remain open and adaptable, allowing indoor and outdoor living to merge naturally.',
    amenitiesTitle: 'Villa amenities',
    amenitiesText: 'Each villa is designed with a focus on comfort, functionality, and refined living.',
    amenitiesDetails: [
      'Private terrace or outdoor living area',
      'Private pool (selected villas)',
      'King-sized bed with premium linens',
      'Spacious indoor and outdoor living areas',
      'Air conditioning and ceiling fan',
      'High-speed Wi‑Fi',
      'Coffee machine with curated selection',
      'Complimentary bottled water, refreshed daily',
      'Private bathroom with bathtub and rain shower',
      'Double vanity and premium toiletries',
      'Hair dryer',
      'Bathrobes and slippers',
      'In-room safe',
      'Work and dining space',
      'In-villa dining and room service',
    ],
    livingTitle: 'Living at Vanara',
    livingText: 'Days unfold between the villa, the ocean, and the surrounding landscape, from slow mornings by the pool to evenings shaped by light and atmosphere.',
    finalTitle: 'Final',
    finalText: 'Experience space, comfort, and the rhythm of the ocean.',
    finalCta: 'Book your Stay',
  },
}


function startOfDay(date: Date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
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

function nightsBetween(start: string, end: string) {
  if (!start || !end) return 0
  const a = startOfDay(parseDateInput(start)).getTime()
  const b = startOfDay(parseDateInput(end)).getTime()
  return Math.max(0, Math.round((b - a) / 86400000))
}

function formatDisplayDate(value: string) {
  if (!value) return 'Add date'
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(parseDateInput(value))
}

type DetailItemProps = { icon: 'bed' | 'size' | 'guests' | 'view' | 'pool'; text: string }

function DetailIcon({ icon }: { icon: DetailItemProps['icon'] }) {
  if (icon === 'bed') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13V8.5A1.5 1.5 0 0 1 5.5 7H10a2 2 0 0 1 2 2v4" /><path d="M4 13h16v4H4z" /><path d="M6 17v2" /><path d="M18 17v2" /><path d="M12 10h4a2 2 0 0 1 2 2v1" /></svg>
  if (icon === 'size') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5" /><path d="M20 9V4h-5" /><path d="M4 15v5h5" /><path d="M20 15v5h-5" /><path d="M9 4L4 9" /><path d="M15 4l5 5" /><path d="M9 20l-5-5" /><path d="M15 20l5-5" /></svg>
  if (icon === 'guests') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.5 20a4.5 4.5 0 0 0-9 0" /><circle cx="12" cy="8" r="3" /><path d="M20 20a3.8 3.8 0 0 0-3.2-3.75" /><path d="M17.5 5.5a2.5 2.5 0 1 1 0 5" /></svg>
  if (icon === 'view') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" /><circle cx="12" cy="12" r="2.5" /></svg>
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 14a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2H4z" /><path d="M7 9V7a2 2 0 0 1 2-2" /><path d="M17 9V7a2 2 0 0 0-2-2" /></svg>
}

function DetailItem({ icon, text }: DetailItemProps) {
  return <li className={styles.villaTypeDetailItem}><span className={styles.detailIconWrap}><DetailIcon icon={icon} /></span><span>{text}</span></li>
}

function InsideVillaGallery({ title }: { title: string }) {
  const images = useMemo(() => Array.from({ length: 8 }, (_, i) => `/${i + 1}.webp`), [])
  const [page, setPage] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const pageSize = 3
  const maxPage = Math.ceil(images.length / pageSize) - 1
  const visible = images.slice(page * pageSize, page * pageSize + pageSize)

  return (
    <>
      <div className={styles.insideGalleryShell}>
        <div className={styles.insideGalleryRow}>
          {visible.map((src, idx) => {
            const absoluteIndex = page * pageSize + idx
            return (
              <button
                key={src}
                type="button"
                className={styles.insideSlide}
                onClick={() => { if (typeof window !== 'undefined' && window.innerWidth <= 768) return; setLightboxIndex(absoluteIndex) }}
                aria-label={`Open ${title.toLowerCase()} photo ${absoluteIndex + 1}`}
              >
                <img src={src} alt={`${title} ${absoluteIndex + 1}`} />
              </button>
            )
          })}
        </div>
        <div className={styles.insideGalleryControls}>
          <button type="button" className={styles.insideArrow} onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} aria-label="Previous villa photos">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button type="button" className={styles.insideArrow} onClick={() => setPage((p) => Math.min(maxPage, p + 1))} disabled={page === maxPage} aria-label="Next villa photos">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>
      </div>

      {lightboxIndex !== null && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" onClick={() => setLightboxIndex(null)}>
          <button type="button" className={styles.lightboxClose} aria-label="Close image" onClick={() => setLightboxIndex(null)}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12" /><path d="M18 6 6 18" /></svg>
          </button>
          <div className={styles.lightboxInner} onClick={(e) => e.stopPropagation()}>
            <button type="button" className={styles.lightboxArrow} onClick={() => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + images.length) % images.length))} aria-label="Previous image">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <img className={styles.lightboxImage} src={images[lightboxIndex]} alt={`${title} ${lightboxIndex + 1}`} />
            <button type="button" className={styles.lightboxArrow} onClick={() => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % images.length))} aria-label="Next image">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}


function LivingAtVanaraGallery({ title }: { title: string }) {
  const images = useMemo(() => Array.from({ length: 5 }, (_, i) => `/lv-${i + 1}.webp`), [])
  const [page, setPage] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const pageSize = 3
  const maxPage = Math.ceil(images.length / pageSize) - 1
  const visible = images.slice(page * pageSize, page * pageSize + pageSize)

  return (
    <>
      <div className={styles.insideGalleryShell}>
        <div className={styles.insideGalleryRow}>
          {visible.map((src, idx) => {
            const absoluteIndex = page * pageSize + idx
            return (
              <button
                key={src}
                type="button"
                className={styles.insideSlide}
                onClick={() => { if (typeof window !== 'undefined' && window.innerWidth <= 768) return; setLightboxIndex(absoluteIndex) }}
                aria-label={`Open ${title.toLowerCase()} photo ${absoluteIndex + 1}`}
              >
                <img src={src} alt={`${title} ${absoluteIndex + 1}`} />
              </button>
            )
          })}
        </div>
        <div className={styles.insideGalleryControls}>
          <button type="button" className={styles.insideArrow} onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} aria-label="Previous living photos">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button type="button" className={styles.insideArrow} onClick={() => setPage((p) => Math.min(maxPage, p + 1))} disabled={page === maxPage} aria-label="Next living photos">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>
      </div>

      {lightboxIndex !== null && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" onClick={() => setLightboxIndex(null)}>
          <button type="button" className={styles.lightboxClose} aria-label="Close image" onClick={() => setLightboxIndex(null)}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12" /><path d="M18 6 6 18" /></svg>
          </button>
          <div className={styles.lightboxInner} onClick={(e) => e.stopPropagation()}>
            <button type="button" className={styles.lightboxArrow} onClick={() => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + images.length) % images.length))} aria-label="Previous image">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <img className={styles.lightboxImage} src={images[lightboxIndex]} alt={`${title} ${lightboxIndex + 1}`} />
            <button type="button" className={styles.lightboxArrow} onClick={() => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % images.length))} aria-label="Next image">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = use(params)
  const lang = normalizeLocale(raw)
  const dict = getDictionary(lang)
  const t = copy[lang]
  const today = startOfDay(new Date())
  const [checkIn, setCheckIn] = useState(formatDateInput(today))
  const [checkOut, setCheckOut] = useState(formatDateInput(addDays(today, 1)))
  const [bookAdults, setBookAdults] = useState(2)
  const [bookRooms, setBookRooms] = useState(1)
  const bookingHref = 'https://book-directonline.com/properties/vanararesortspa'
  const bookingUrl = useMemo(() => {
    const params = new URLSearchParams()
    params.set('arrival', checkIn)
    params.set('departure', checkOut)
    params.set('checkInDate', checkIn)
    params.set('checkOutDate', checkOut)
    params.set('rooms', String(bookRooms))
    params.set('adults', String(bookAdults))
    params.set('children', '0')
    params.set('items[0][adults]', String(bookAdults))
    params.set('items[0][children]', '0')
    params.set('items[0][infants]', '0')
    params.set('items[0][rooms]', String(bookRooms))
    params.set('currency', 'IDR')
    params.set('locale', lang === 'cn' ? 'zh' : lang)
    return `${bookingHref}?${params.toString()}`
  }, [bookingHref, bookAdults, bookRooms, checkIn, checkOut, lang])

  return (
    <SiteShell lang={lang}>
      <div className={styles.page}>
        <section className={styles.hero} aria-label="Villas hero">
          <video className={styles.heroVideo} autoPlay muted playsInline loop preload="metadata" poster="/villas-hero-poster.jpg">
            <source src="/villas-hero.mp4" type="video/mp4" />
          </video>
          <div className={styles.heroShade} aria-hidden="true" />
          <div className={styles.heroContent}><div className="eyebrow">{t.heroKicker}</div></div>
        </section>

        <section className={`section ${styles.introSection}`}>
          <div className="container">
            <div className={styles.introWrap}>
              <div className="eyebrow">{t.title}</div>
              <h1 className={styles.subtitle}>{t.subtitle}</h1>
              <div className={styles.copy}><p>{t.text1}</p><p>{t.text2}</p></div>
              <a className={styles.introButton} href={bookingHref} target="_blank" rel="noreferrer">{t.availability}</a>
              <div className="rule" />
            </div>
          </div>
        </section>

        <section className={`section ${styles.staySection}`}>
          <div className="container">
            <div className="eyebrow">{t.stayTitle}</div>
            <div className={styles.stayStack}>
              <div className={styles.staySplit}>
                <div className={styles.stayPhotoWrap}><img className={styles.stayPhoto} src="/villas-ocean.webp" alt={t.oceanLabel} /></div>
                <div className={styles.stayTextWrap}><h2 className={styles.stayLabel}>{t.oceanLabel}</h2><p className={styles.stayText}>{t.oceanText}</p></div>
              </div>
              <div className={`${styles.staySplit} ${styles.staySplitReverse}`}>
                <div className={styles.stayTextWrap}><h2 className={styles.stayLabel}>{t.poolLabel}</h2><p className={styles.stayText}>{t.poolText}</p></div>
                <div className={styles.stayPhotoWrap}><img className={styles.stayPhoto} src="/villas-pool.webp" alt={t.poolLabel} /></div>
              </div>
              <div className={styles.staySplit}>
                <div className={styles.stayPhotoWrap}><img className={styles.stayPhoto} src="/villas-garden.webp" alt={t.gardenLabel} /></div>
                <div className={styles.stayTextWrap}><h2 className={styles.stayLabel}>{t.gardenLabel}</h2><p className={styles.stayText}>{t.gardenText}</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className={`section ${styles.villaTypesSection}`}>
          <div className="container">
            <div className="eyebrow">{t.villaTypesTitle}</div>
            <div className={styles.villaTypesGrid}>
              <div className={styles.villaTypeCard}><div className={styles.villaTypeContent}><h2 className={styles.villaTypeName}>{t.oceanVillaName}</h2><p className={styles.villaTypeText}>{t.oceanVillaText}</p><ul className={styles.villaTypeDetails}><DetailItem icon="bed" text={t.detailsBedroom} /><DetailItem icon="size" text={t.detailsSize} /><DetailItem icon="guests" text={t.detailsGuests} /><DetailItem icon="view" text={t.detailsView} /></ul><a className={styles.villaTypeButton} href={bookingHref} target="_blank" rel="noreferrer">{t.bookNow}</a></div></div>
              <div className={styles.villaTypeCard}><div className={styles.villaTypeContent}><h2 className={styles.villaTypeName}>{t.oceanPoolVillaName}</h2><p className={styles.villaTypeText}>{t.oceanPoolVillaText}</p><ul className={styles.villaTypeDetails}><DetailItem icon="bed" text={t.oceanPoolDetailsBedroom} /><DetailItem icon="size" text={t.oceanPoolDetailsSize} /><DetailItem icon="guests" text={t.oceanPoolDetailsGuests} /><DetailItem icon="view" text={t.oceanPoolDetailsView} /></ul><a className={styles.villaTypeButton} href={bookingHref} target="_blank" rel="noreferrer">{t.bookNow}</a></div></div>
              <div className={styles.villaTypeCard}><div className={styles.villaTypeContent}><h2 className={styles.villaTypeName}>{t.infinityVillaName}</h2><p className={styles.villaTypeText}>{t.infinityVillaText}</p><ul className={styles.villaTypeDetails}><DetailItem icon="bed" text={t.detailsBedroomsTwo} /><DetailItem icon="size" text={t.detailsSizeLarge} /><DetailItem icon="pool" text={t.detailsInfinityPool} /><DetailItem icon="view" text={t.detailsPremiumView} /><DetailItem icon="guests" text={t.detailsGuestsSix} /></ul><a className={styles.villaTypeButton} href={bookingHref} target="_blank" rel="noreferrer">{t.bookNow}</a></div></div>
              <div className={styles.villaTypeCard}><div className={styles.villaTypeContent}><h2 className={styles.villaTypeName}>{t.gardenVillaName}</h2><p className={styles.villaTypeText}>{t.gardenVillaText}</p><ul className={styles.villaTypeDetails}><DetailItem icon="bed" text={t.detailsKingBed} /><DetailItem icon="size" text={t.detailsSizeGarden} /><DetailItem icon="view" text={t.detailsGardenView} /><DetailItem icon="guests" text={t.detailsGuestsThree} /></ul><a className={styles.villaTypeButton} href={bookingHref} target="_blank" rel="noreferrer">{t.bookNow}</a></div></div>
            </div>
          </div>
        </section>

        <section className={`section ${styles.insideSection}`}>
          <div className="container">
            <div className="eyebrow">{t.insideTitle}</div>
            <div className={styles.insideIntro}><p>{t.insideText}</p></div>
            <InsideVillaGallery title={t.insideTitle} />
          </div>
        </section>

        <section className={`section ${styles.amenitiesSection}`}>
          <div className="container">
            <div className="eyebrow">{t.amenitiesTitle}</div>
            <div className={styles.amenitiesIntro}>
              <p>{t.amenitiesText}</p>
            </div>
            <div className={styles.amenitiesGrid}>
              {t.amenitiesDetails.map((item) => (
                <div key={item} className={styles.amenityItem}>
                  <span className={styles.amenityDot} aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`section ${styles.livingSection}`}>
          <div className="container">
            <div className="eyebrow">{t.livingTitle}</div>
            <div className={styles.livingIntro}><p>{t.livingText}</p></div>
            <LivingAtVanaraGallery title={t.livingTitle} />
          </div>
        </section>


        <section className={`section ${styles.finalSection}`}>
          <div className="container">
            <div className={styles.finalBox}>
              <div className={styles.finalIntro}>
                <h2 className={styles.finalHeadline}>{t.finalText}</h2>
                <a className={styles.finalButton} href={bookingUrl} target="_blank" rel="noreferrer">{t.finalCta}</a>
              </div>

              <div className={styles.finalBookingCard}>
                <div className={styles.finalBookingGrid}>
                  <label className={styles.finalField}>
                    <span>{dict.layout.checkIn}</span>
                    <input
                      type="date"
                      min={formatDateInput(today)}
                      value={checkIn}
                      onChange={(e) => {
                        const next = e.target.value
                        setCheckIn(next)
                        if (next && checkOut <= next) {
                          setCheckOut(formatDateInput(addDays(new Date(next), 1)))
                        }
                      }}
                    />
                  </label>

                  <label className={styles.finalField}>
                    <span>{dict.layout.checkOut}</span>
                    <input
                      type="date"
                      min={formatDateInput(addDays(new Date(checkIn), 1))}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                    />
                  </label>

                  <label className={styles.finalField}>
                    <span>Adults</span>
                    <select value={bookAdults} onChange={(e) => setBookAdults(Number(e.target.value))}>
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </label>

                  <label className={styles.finalField}>
                    <span>Rooms</span>
                    <select value={bookRooms} onChange={(e) => setBookRooms(Number(e.target.value))}>
                      {[1, 2, 3, 4].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className={styles.finalMeta}>
                  <div>
                    <div className={styles.finalSmall}>Stay summary</div>
                    <div className={styles.finalSummary}>
                      {formatDisplayDate(checkIn)} — {formatDisplayDate(checkOut)} · {nightsBetween(checkIn, checkOut)} night{nightsBetween(checkIn, checkOut) === 1 ? '' : 's'}
                    </div>
                  </div>

                  <a className={styles.finalButton} href={bookingUrl} target="_blank" rel="noreferrer">Check Availability</a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </SiteShell>
  )
}
