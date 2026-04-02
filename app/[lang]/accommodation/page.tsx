import type { Metadata } from 'next'
import SiteShell from '../../../components/SiteShell'
import { getDictionary, locales, normalizeLocale, type Locale, withLang } from '../../../lib/i18n'
import styles from './accommodation.module.css'

type PageCopy = {
  heroKicker: string
  heroLead: string
  heroAvailability: string
  heroTitle: string
  heroText: string
  discover: string
  storyEyebrow: string
  storyTitle: string
  storyP1: string
  storyP2: string
  collectionEyebrow: string
  collectionTitle: string
  collectionText: string
  cards: Array<{ label: string; title: string; text: string; image: string }>
  detailsEyebrow: string
  detailsTitle: string
  detailsP1: string
  detailsP2: string
  ctaTitle: string
  ctaText: string
  ctaButton: string
}

const copy: Record<Locale, PageCopy> = {
  en: {
    heroKicker: 'VILLAS · ULUWATU',
    heroLead: 'Clifftop villas in Uluwatu, designed for space, privacy, and uninterrupted views of the Indian Ocean.',
    heroAvailability: 'Check Availability',
    heroTitle: 'Private villas above the ocean',
    heroText:
      'A calm collection of spaces shaped by light, landscape, and privacy — from garden hideaways to open ocean views.',
    discover: 'Discover the collection',
    storyEyebrow: 'THE VILLAS',
    storyTitle: 'Architecture that opens to air, light, and horizon',
    storyP1:
      'Each villa at Vanara is designed with a quiet material palette, generous proportions, and a natural flow between interior and exterior living.',
    storyP2:
      'Some open toward the Indian Ocean, others are immersed in lush greenery, while select villas offer private pools, terraces, and a slower rhythm of stay.',
    collectionEyebrow: 'COLLECTION',
    collectionTitle: 'A stay for every rhythm',
    collectionText:
      'A refined collection of spaces designed for couples, slow mornings, and uninterrupted time above the coastline.',
    cards: [
      {
        label: 'Ocean View',
        title: 'Clifftop Villa',
        text: 'Open views, warm light, and a calm atmosphere designed around the horizon.',
        image: '/villas-1.webp',
      },
      {
        label: 'Private Pool',
        title: 'Pool Villa',
        text: 'A quieter retreat with outdoor living, water, and privacy shaped into one space.',
        image: '/villas-2.webp',
      },
      {
        label: 'Garden Setting',
        title: 'Garden Villa',
        text: 'Immersed in greenery, with softer light and a more intimate connection to the landscape.',
        image: '/villas-3.webp',
      },
    ],
    detailsEyebrow: 'SPACE & ATMOSPHERE',
    detailsTitle: 'A calmer way to stay',
    detailsP1:
      'The villas are designed to feel open yet private, where architecture frames the landscape without competing with it.',
    detailsP2:
      'Materials, light, and proportion create a stay that feels both refined and effortless, from arrival to evening.',
    ctaTitle: 'Reserve your villa',
    ctaText: 'Continue to direct booking for availability, rates, and your preferred stay dates.',
    ctaButton: 'Check availability',
  },
  id: {
    heroKicker: 'VILA · ULUWATU',
    heroLead: 'Vila-vila di tepi tebing di Uluwatu, dirancang untuk ruang, privasi, dan pemandangan Samudra Hindia tanpa gangguan.',
    heroAvailability: 'Cek Ketersediaan',
    heroTitle: 'Vila privat di atas samudra',
    heroText:
      'Koleksi ruang yang tenang, dibentuk oleh cahaya, lanskap, dan privasi — dari sudut taman hingga panorama laut terbuka.',
    discover: 'Lihat koleksi',
    storyEyebrow: 'VILA',
    storyTitle: 'Arsitektur yang terbuka pada udara, cahaya, dan horizon',
    storyP1:
      'Setiap vila di Vanara dirancang dengan palet material yang tenang, proporsi yang lapang, dan alur alami antara ruang dalam dan luar.',
    storyP2:
      'Sebagian menghadap Samudra Hindia, sebagian dikelilingi kehijauan, sementara beberapa vila menawarkan kolam privat, teras, dan ritme menginap yang lebih lambat.',
    collectionEyebrow: 'KOLEKSI',
    collectionTitle: 'Masa inap untuk setiap ritme',
    collectionText:
      'Koleksi ruang yang elegan, dirancang untuk pasangan, pagi yang lambat, dan waktu tanpa gangguan di atas garis pantai.',
    cards: [
      {
        label: 'Pemandangan Laut',
        title: 'Vila Clifftop',
        text: 'Pemandangan terbuka, cahaya hangat, dan suasana tenang yang dirancang menghadap horizon.',
        image: '/villas-1.webp',
      },
      {
        label: 'Kolam Privat',
        title: 'Pool Villa',
        text: 'Tempat beristirahat yang lebih privat dengan ruang luar, air, dan ketenangan dalam satu kesatuan.',
        image: '/villas-2.webp',
      },
      {
        label: 'Nuansa Taman',
        title: 'Garden Villa',
        text: 'Dikelilingi kehijauan, dengan cahaya yang lebih lembut dan hubungan yang lebih intim dengan lanskap.',
        image: '/villas-3.webp',
      },
    ],
    detailsEyebrow: 'RUANG & SUASANA',
    detailsTitle: 'Cara menginap yang lebih tenang',
    detailsP1:
      'Vila-vila dirancang agar terasa terbuka namun tetap privat, di mana arsitektur membingkai lanskap tanpa mengalahkannya.',
    detailsP2:
      'Material, cahaya, dan proporsi menciptakan pengalaman menginap yang elegan sekaligus terasa natural, dari kedatangan hingga malam hari.',
    ctaTitle: 'Reservasi vila Anda',
    ctaText: 'Lanjutkan ke pemesanan langsung untuk melihat ketersediaan, harga, dan tanggal masa inap Anda.',
    ctaButton: 'Cek ketersediaan',
  },
  ru: {
    heroKicker: 'ВИЛЛЫ · УЛУВАТУ',
    heroLead: 'Виллы на утёсе в Улувату, созданные для простора, уединения и беспрепятственных видов на Индийский океан.',
    heroAvailability: 'Проверить наличие',
    heroTitle: 'Частные виллы над океаном',
    heroText:
      'Спокойная коллекция пространств, сформированных светом, ландшафтом и уединением — от садовых укрытий до открытых видов на океан.',
    discover: 'Смотреть коллекцию',
    storyEyebrow: 'ВИЛЛЫ',
    storyTitle: 'Архитектура, открытая воздуху, свету и горизонту',
    storyP1:
      'Каждая вилла Vanara создана с тихой палитрой материалов, щедрыми пропорциями и естественным переходом между интерьером и внешним пространством.',
    storyP2:
      'Одни виллы обращены к Индийскому океану, другие утопают в зелени, а некоторые предлагают частные бассейны, террасы и более медленный ритм отдыха.',
    collectionEyebrow: 'КОЛЛЕКЦИЯ',
    collectionTitle: 'Отдых в своём ритме',
    collectionText:
      'Утончённая коллекция пространств для пар, неспешных утр и безмятежного времени над побережьем.',
    cards: [
      {
        label: 'Вид на океан',
        title: 'Вилла на утёсе',
        text: 'Открытые виды, тёплый свет и спокойная атмосфера, построенная вокруг линии горизонта.',
        image: '/villas-1.webp',
      },
      {
        label: 'Частный бассейн',
        title: 'Pool Villa',
        text: 'Более уединённое пространство с внешней зоной отдыха, водой и приватностью в одной композиции.',
        image: '/villas-2.webp',
      },
      {
        label: 'Садовая среда',
        title: 'Garden Villa',
        text: 'Среди зелени, с мягким светом и более интимной связью с ландшафтом.',
        image: '/villas-3.webp',
      },
    ],
    detailsEyebrow: 'ПРОСТРАНСТВО И АТМОСФЕРА',
    detailsTitle: 'Более спокойный способ отдыхать',
    detailsP1:
      'Виллы спроектированы так, чтобы ощущаться открытыми, но приватными, где архитектура обрамляет природу, не споря с ней.',
    detailsP2:
      'Материалы, свет и пропорции создают утончённое и естественное ощущение пребывания — от прибытия до вечера.',
    ctaTitle: 'Забронировать виллу',
    ctaText: 'Перейдите к прямому бронированию, чтобы увидеть наличие, стоимость и выбрать даты пребывания.',
    ctaButton: 'Проверить наличие',
  },
  cn: {
    heroKicker: '别墅 · 乌鲁瓦图',
    heroLead: '位于乌鲁瓦图悬崖之上的别墅，为空间感、私密性与无遮挡印度洋景致而设计。',
    heroAvailability: '查看可订情况',
    heroTitle: '悬崖之上的私人别墅',
    heroText:
      '由光线、景观与私密感塑造的安静居停系列，从花园隐逸到开阔海景，呈现更从容的度假方式。',
    discover: '查看别墅系列',
    storyEyebrow: '别墅',
    storyTitle: '向空气、光线与海平线敞开的建筑',
    storyP1:
      'Vanara 的每一栋别墅都以克制的材质、宽阔的比例，以及室内外自然流动的方式来设计。',
    storyP2:
      '有的面向印度洋，有的沉浸于绿意之中，部分别墅则拥有私人泳池、露台与更从容的居停节奏。',
    collectionEyebrow: '系列',
    collectionTitle: '适合不同节奏的居停',
    collectionText: '为情侣、慢节奏清晨与不被打扰的海岸时光而设计的精致空间系列。',
    cards: [
      {
        label: '海景',
        title: '悬崖别墅',
        text: '开阔视野、温暖光线，以及围绕地平线展开的宁静氛围。',
        image: '/villas-1.webp',
      },
      {
        label: '私人泳池',
        title: '泳池别墅',
        text: '更私密的居停空间，将户外生活、水景与安静感融为一体。',
        image: '/villas-2.webp',
      },
      {
        label: '花园环境',
        title: '花园别墅',
        text: '沉浸在绿意之中，光线更柔和，与自然景观的联系更亲密。',
        image: '/villas-3.webp',
      },
    ],
    detailsEyebrow: '空间与氛围',
    detailsTitle: '更安静的居停方式',
    detailsP1: '这些别墅被设计得既开敞又私密，让建筑成为景观的框架，而不是喧宾夺主。',
    detailsP2: '材质、光线与比例共同营造出精致却自然的居停体验，从抵达一直延续到夜晚。',
    ctaTitle: '预订您的别墅',
    ctaText: '进入直订页面，查看房态、价格与您偏好的入住日期。',
    ctaButton: '查看可订情况',
  },
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params
  const lang = normalizeLocale(raw)
  const t = copy[lang]

  return {
    title: `Vanara Resort & Spa | ${t.heroTitle}`,
    description: t.heroText,
    alternates: {
      canonical: `/${lang}/accommodation`,
      languages: {
        en: '/en/accommodation',
        id: '/id/accommodation',
        ru: '/ru/accommodation',
        'zh-CN': '/cn/accommodation',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params
  const lang = normalizeLocale(raw)
  const dict = getDictionary(lang)
  const t = copy[lang]
  const bookingHref = 'https://book-directonline.com/properties/vanararesortspa'

  return (
    <SiteShell lang={lang}>
      <div className={styles.page}>
        <section className={styles.hero} aria-label="Accommodation hero">
          <video
            className={styles.heroVideo}
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
            poster="/villas-hero-poster.jpg"
          >
            <source src="/villas-hero.mp4" type="video/mp4" />
          </video>
          <div className={styles.heroShade} aria-hidden="true" />
          <div className={styles.heroContent}>
            <div className="eyebrow">{t.heroKicker}</div>
          </div>
        </section>

        <section className={`section ${styles.heroIntroSection}`}>
          <div className="container">
            <div className={styles.heroIntroGrid}>
              <div className={styles.heroIntroLeft}>
                <h1 className={styles.heroTitle}>{t.heroTitle}</h1>
                <p className={styles.heroLead}>{t.heroLead}</p>
              </div>
              <div className={styles.heroIntroRight}>
                <p className={styles.heroText}>{t.heroText}</p>
                <a className="textCta" href={bookingHref} target="_blank" rel="noreferrer">{t.heroAvailability}</a>
              </div>
            </div>
          </div>
        </section>

        <section className="section sectionVillasFeature">
          <div className="container">
            <div className={`split split--rev ${styles.homeSplit}`}>
              <div className={`${styles.imageFrame} revealBlock`}>
                <img src="/villas-main.webp" alt={t.heroTitle} />
              </div>
              <div className={styles.textCol}>
                <div className="eyebrow">{t.storyEyebrow}</div>
                <h2 className="h2">{t.storyTitle}</h2>
                <div className="copy">
                  <p>{t.storyP1}</p>
                  <p>{t.storyP2}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`section ${styles.collectionSection}`} id="villa-collection">
          <div className="container">
            <div className={styles.collectionHead}>
              <div className="eyebrow">{t.collectionEyebrow}</div>
              <h2 className="h2">{t.collectionTitle}</h2>
              <p className={styles.collectionText}>{t.collectionText}</p>
            </div>

            <div className={styles.cards}>
              {t.cards.map((card) => (
                <article className={styles.card} key={card.title}>
                  <div className={styles.cardMedia}>
                    <img src={card.image} alt={card.title} />
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.cardLabel}>{card.label}</div>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                    <p className={styles.cardText}>{card.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section sectionDiningFeature">
          <div className="container">
            <div className={`split split--rev ${styles.homeSplit}`}>
              <div className={`${styles.imageFrame} revealBlock`}>
                <img src="/villas-detail.webp" alt={t.detailsTitle} />
              </div>
              <div className={styles.textCol}>
                <div className="eyebrow">{t.detailsEyebrow}</div>
                <h2 className="h2">{t.detailsTitle}</h2>
                <div className="copy">
                  <p>{t.detailsP1}</p>
                  <p>{t.detailsP2}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`section ${styles.ctaSection}`}>
          <div className="container">
            <div className={styles.ctaBox}>
              <div>
                <div className="eyebrow">{t.ctaTitle}</div>
                <p className={styles.ctaText}>{t.ctaText}</p>
              </div>
              <a className={styles.ctaButton} href={bookingHref} target="_blank" rel="noreferrer">
                {t.ctaButton}
              </a>
            </div>
          </div>
        </section>

        <section className={`section ${styles.backSection}`}>
          <div className="container">
            <a className="textCta" href={withLang(lang, '/')}>
              {lang === 'id'
                ? 'Kembali ke beranda'
                : lang === 'ru'
                ? 'Назад на главную'
                : lang === 'cn'
                ? '返回首页'
                : 'Back to homepage'}
            </a>
          </div>
        </section>
      </div>
    </SiteShell>
  )
}
