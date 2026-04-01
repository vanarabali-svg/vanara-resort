'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

type LangCode = 'EN' | 'ID' | 'RU' | 'CN'

const languageStorageKey = 'vanara-language'
const localeMap: Record<LangCode, string> = {
  EN: 'en-US',
  ID: 'id-ID',
  RU: 'ru-RU',
  CN: 'zh-CN',
}

const pageTranslations: Record<LangCode, any> = {
  EN: {
    heroRegion: 'ULUWATU · BALI',
    heroTitle: 'VANARA RESORT & SPA',
    tapToPlay: 'Tap to play',
    resortEyebrow: 'THE RESORT',
    resortTitle: 'A refined escape above the ocean',
    resortCopy: [
      'Vanara Resort & Spa is a cliffside destination in Uluwatu, where modern villas, open space, and uninterrupted views of the Indian Ocean come together in a natural balance.',
      'Set above Nunggalan Beach, a rare stretch of untouched coastline, the resort is shaped by its surroundings, where land, sky, and ocean meet effortlessly.',
      'The atmosphere is private and unhurried, defined by architecture, light, and a strong connection to the landscape.',
    ],
    villasEyebrow: 'VILLAS',
    villasTitle: 'Private spaces shaped by design and landscape',
    villasCopy: [
      'Modern architecture, open space, and a strong connection to the surroundings define each villa at Vanara.',
      'Positioned across the cliffs and within carefully designed gardens, the villas offer privacy and a seamless flow between indoor and outdoor living.',
      'Some villas open toward the ocean, others are immersed in lush greenery, while select villas feature private pools and generous outdoor living areas.',
    ],
    villasCta: 'Explore villas',
    kokoonEyebrow: 'KOKOON',
    kokoonTitle: 'Cliffside dining shaped by light, flavour, and the ocean',
    kokoonCopy: [
      'Kokoon brings together modern cuisine with a refined atmosphere, where French and Japanese techniques meet Mediterranean influences, complemented by locally sourced Indonesian ingredients.',
      'From daytime dining to sunset and evening, the setting evolves naturally, defined by flavour, setting, and atmosphere.',
    ],
    kokoonCta: 'Explore Kokoon',
    experiencesEyebrow: 'EXPERIENCES',
    experiencesTitle: 'Moments shaped by the island',
    experiencesCopy: [
      'At Vanara, each day moves between moments of ease and exploration, shaped by the setting and the surrounding landscape.',
      'From the shoreline of Nunggalan Beach to the cultural and coastal experiences of Uluwatu, each activity unfolds naturally, connected to place and atmosphere.',
    ],
    experiencesCta: 'Discover all experiences',
    weddingsEyebrow: 'WEDDINGS',
    weddingsTitle: 'Celebrate above the ocean',
    weddingsCopy: [
      'Set along the cliffs above the Indian Ocean, Vanara offers a distinctive setting for weddings and private celebrations.',
      'Ceremonies unfold in open-air spaces with uninterrupted views, where the light transitions naturally into sunset and evening.',
      'Each celebration is shaped by the setting, with a focus on atmosphere, space, and seamless flow.',
    ],
    weddingsCta: 'Discover weddings',
    bookingTitle: 'Experience space, comfort, and the rhyhm of the ocean',
    bookingIntroCta: 'Book your stay',
    checkIn: 'Check in',
    checkOut: 'Check out',
    adults: 'Adults',
    rooms: 'Rooms',
    staySummary: 'Stay summary',
    night: 'night',
    nights: 'nights',
    checkAvailability: 'Check availability',
    locationEyebrow: 'LOCATION',
    locationTitle: 'Uluwatu, Bali',
    locationText: 'Set in Uluwatu, above the Indian Ocean and just moments from Nunggalan Beach, Vanara is positioned within one of Bali’s most sought-after coastal landscapes.',
    mapKicker: 'The Map',
    mapCardText: 'Clifftop setting in Uluwatu, Bali',
    openMap: 'Open map',
    getDirections: 'Get directions',
    newsletterEyebrow: 'NEWSLETTER',
    newsletterTitle: 'A note from the coast',
    newsletterText: 'Seasonal openings, villa stories, and experiences — sent rarely, always calm.',
    emailPlaceholder: 'Email address',
    subscribe: 'Subscribe',
    unsubscribe: 'No spam. Unsubscribe anytime.',
    diningSectionAria: 'Dining',
    diningCarouselAria: 'Dining carousel',
    prevDining: 'Previous dining photo',
    nextDining: 'Next dining photo',
    showDining: 'Show dining photo',
    villasCarouselAria: 'Villas carousel',
    prevVilla: 'Previous villa photo',
    nextVilla: 'Next villa photo',
    showVilla: 'Show villa photo',
    experiencesGalleryAria: 'Experiences gallery',
    experienceImageAria: 'Experience image',
    weddingImageAria: 'Wedding image',
    locationMapAria: 'Vanara location map',
    locationMapTitle: 'Vanara Resort & Spa map',
    experienceItems: [
      { title: 'Honeymoon & Romantic Experiences', alt: 'Honeymoon and romantic experiences at Vanara' },
      { title: 'In-Villa Dining', alt: 'In-villa dining' },
      { title: 'Sunset Moments', alt: 'Sunset moments' },
      { title: 'Paragliding', alt: 'Paragliding above the cliffs' },
      { title: 'Yoga', alt: 'Yoga at Vanara' },
      { title: 'Nunggalan Beach', alt: 'Nunggalan Beach' },
    ],
    diningPhotos: ['Dining at Vanara', 'Dining setting', 'Chef & fresh cuisine', 'Sunset dining'],
    villaPhotos: ['Villa at Vanara', 'Villa terrace', 'Ocean view villa'],
  },
  ID: {
    heroRegion: 'ULUWATU · BALI',
    heroTitle: 'VANARA RESORT & SPA',
    tapToPlay: 'Ketuk untuk memutar',
    resortEyebrow: 'RESOR',
    resortTitle: 'Pelarian elegan di atas samudra',
    resortCopy: [
      'Vanara Resort & Spa adalah destinasi di tebing Uluwatu, tempat vila modern, ruang terbuka, dan pemandangan Samudra Hindia yang tak terputus berpadu secara alami.',
      'Terletak di atas Pantai Nunggalan, bentang pantai alami yang masih murni, resor ini dibentuk oleh lingkungannya, tempat daratan, langit, dan laut bertemu dengan mudah.',
      'Suasananya privat dan tenang, ditentukan oleh arsitektur, cahaya, dan keterhubungan yang kuat dengan lanskap.',
    ],
    villasEyebrow: 'VILA',
    villasTitle: 'Ruang privat yang dibentuk oleh desain dan lanskap',
    villasCopy: [
      'Arsitektur modern, ruang terbuka, dan hubungan yang kuat dengan sekeliling mendefinisikan setiap vila di Vanara.',
      'Terletak di sepanjang tebing dan taman yang dirancang dengan cermat, vila-vila ini menawarkan privasi serta aliran mulus antara ruang dalam dan luar.',
      'Beberapa vila menghadap ke laut, yang lain tenggelam dalam hijaunya alam, sementara vila tertentu memiliki kolam pribadi dan area tinggal luar ruang yang luas.',
    ],
    villasCta: 'Jelajahi vila',
    kokoonEyebrow: 'KOKOON',
    kokoonTitle: 'Santap di tepi tebing yang dibentuk oleh cahaya, rasa, dan samudra',
    kokoonCopy: [
      'Kokoon memadukan hidangan modern dengan suasana yang anggun, tempat teknik Prancis dan Jepang bertemu pengaruh Mediterania, dilengkapi bahan lokal Indonesia.',
      'Dari siang hingga matahari terbenam dan malam hari, suasananya berkembang alami, ditentukan oleh cita rasa, latar, dan atmosfer.',
    ],
    kokoonCta: 'Jelajahi Kokoon',
    experiencesEyebrow: 'PENGALAMAN',
    experiencesTitle: 'Momen yang dibentuk oleh pulau',
    experiencesCopy: [
      'Di Vanara, setiap hari bergerak di antara momen rileks dan penjelajahan, dibentuk oleh tempat dan lanskap sekitarnya.',
      'Dari garis pantai Pantai Nunggalan hingga pengalaman budaya dan pesisir Uluwatu, setiap aktivitas berlangsung alami, terhubung dengan tempat dan suasana.',
    ],
    experiencesCta: 'Temukan semua pengalaman',
    weddingsEyebrow: 'PERNIKAHAN',
    weddingsTitle: 'Rayakan di atas samudra',
    weddingsCopy: [
      'Terletak di sepanjang tebing di atas Samudra Hindia, Vanara menawarkan latar yang khas untuk pernikahan dan perayaan privat.',
      'Upacara berlangsung di ruang terbuka dengan pemandangan tanpa hambatan, saat cahaya berubah alami menuju senja dan malam.',
      'Setiap perayaan dibentuk oleh tempat, dengan fokus pada atmosfer, ruang, dan alur yang mulus.',
    ],
    weddingsCta: 'Temukan pernikahan',
    bookingTitle: 'Rasakan ruang, kenyamanan, dan irama samudra',
    bookingIntroCta: 'Pesan masa inap',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    adults: 'Dewasa',
    rooms: 'Kamar',
    staySummary: 'Ringkasan inap',
    night: 'malam',
    nights: 'malam',
    checkAvailability: 'Cek ketersediaan',
    locationEyebrow: 'LOKASI',
    locationTitle: 'Uluwatu, Bali',
    locationText: 'Terletak di Uluwatu, di atas Samudra Hindia dan hanya beberapa saat dari Pantai Nunggalan, Vanara berada di salah satu lanskap pesisir paling dicari di Bali.',
    mapKicker: 'Peta',
    mapCardText: 'Lokasi tepi tebing di Uluwatu, Bali',
    openMap: 'Buka peta',
    getDirections: 'Petunjuk arah',
    newsletterEyebrow: 'NEWSLETTER',
    newsletterTitle: 'Sebuah kabar dari pesisir',
    newsletterText: 'Pembukaan musiman, kisah vila, dan pengalaman — jarang dikirim, selalu tenang.',
    emailPlaceholder: 'Alamat email',
    subscribe: 'Berlangganan',
    unsubscribe: 'Tanpa spam. Berhenti kapan saja.',
    diningSectionAria: 'Santapan',
    diningCarouselAria: 'Karusel santapan',
    prevDining: 'Foto santapan sebelumnya',
    nextDining: 'Foto santapan berikutnya',
    showDining: 'Tampilkan foto santapan',
    villasCarouselAria: 'Karusel vila',
    prevVilla: 'Foto vila sebelumnya',
    nextVilla: 'Foto vila berikutnya',
    showVilla: 'Tampilkan foto vila',
    experiencesGalleryAria: 'Galeri pengalaman',
    experienceImageAria: 'Gambar pengalaman',
    weddingImageAria: 'Gambar pernikahan',
    locationMapAria: 'Peta lokasi Vanara',
    locationMapTitle: 'Peta Vanara Resort & Spa',
    experienceItems: [
      { title: 'Honeymoon & Pengalaman Romantis', alt: 'Honeymoon dan pengalaman romantis di Vanara' },
      { title: 'Makan di Vila', alt: 'Makan di vila' },
      { title: 'Momen Senja', alt: 'Momen senja' },
      { title: 'Paragliding', alt: 'Paragliding di atas tebing' },
      { title: 'Yoga', alt: 'Yoga di Vanara' },
      { title: 'Pantai Nunggalan', alt: 'Pantai Nunggalan' },
    ],
    diningPhotos: ['Bersantap di Vanara', 'Suasana bersantap', 'Chef & hidangan segar', 'Santap saat senja'],
    villaPhotos: ['Vila di Vanara', 'Teras vila', 'Vila dengan pemandangan laut'],
  },
  RU: {
    heroRegion: 'УЛУВАТУ · БАЛИ',
    heroTitle: 'VANARA RESORT & SPA',
    tapToPlay: 'Нажмите, чтобы воспроизвести',
    resortEyebrow: 'КУРОРТ',
    resortTitle: 'Утончённый отдых над океаном',
    resortCopy: [
      'Vanara Resort & Spa — это курорт на утёсе в Улувату, где современные виллы, открытое пространство и бескрайние виды на Индийский океан соединяются в естественной гармонии.',
      'Расположенный над пляжем Нунггалан, редким нетронутым участком побережья, курорт сформирован своим окружением — местом, где земля, небо и океан встречаются без усилия.',
      'Атмосфера здесь приватная и неспешная, определяемая архитектурой, светом и сильной связью с ландшафтом.',
    ],
    villasEyebrow: 'ВИЛЛЫ',
    villasTitle: 'Приватные пространства, сформированные дизайном и ландшафтом',
    villasCopy: [
      'Современная архитектура, открытое пространство и тесная связь с окружением определяют каждую виллу Vanara.',
      'Расположенные на скалах и среди тщательно спроектированных садов, виллы дарят приватность и плавный переход между интерьером и внешним пространством.',
      'Одни виллы обращены к океану, другие утопают в зелени, а некоторые дополнены частными бассейнами и просторными открытыми зонами отдыха.',
    ],
    villasCta: 'Открыть виллы',
    kokoonEyebrow: 'KOKOON',
    kokoonTitle: 'Ресторан на утёсе, сформированный светом, вкусом и океаном',
    kokoonCopy: [
      'Kokoon объединяет современную кухню и изысканную атмосферу, где французские и японские техники встречаются со средиземноморскими влияниями и местными индонезийскими продуктами.',
      'От дневного времени до заката и вечера пространство естественно меняется, определяясь вкусом, окружением и атмосферой.',
    ],
    kokoonCta: 'Открыть Kokoon',
    experiencesEyebrow: 'ВПЕЧАТЛЕНИЯ',
    experiencesTitle: 'Моменты, созданные островом',
    experiencesCopy: [
      'В Vanara каждый день проходит между покоем и исследованием, формируясь самим местом и окружающим ландшафтом.',
      'От береговой линии пляжа Нунггалан до культурных и прибрежных впечатлений Улувату — каждое занятие раскрывается естественно, в связи с местом и атмосферой.',
    ],
    experiencesCta: 'Открыть все впечатления',
    weddingsEyebrow: 'СВАДЬБЫ',
    weddingsTitle: 'Празднуйте над океаном',
    weddingsCopy: [
      'Расположенный на утёсах над Индийским океаном, Vanara предлагает особенное пространство для свадеб и частных торжеств.',
      'Церемонии проходят на открытом воздухе с панорамными видами, где свет естественно переходит в закат и вечер.',
      'Каждое торжество формируется самим местом, с акцентом на атмосферу, пространство и плавный ход события.',
    ],
    weddingsCta: 'Открыть свадьбы',
    bookingTitle: 'Почувствуйте пространство, комфорт и ритм океана',
    bookingIntroCta: 'Забронировать проживание',
    checkIn: 'Заезд',
    checkOut: 'Выезд',
    adults: 'Взрослые',
    rooms: 'Номера',
    staySummary: 'Сводка проживания',
    night: 'ночь',
    nights: 'ночи',
    checkAvailability: 'Проверить наличие',
    locationEyebrow: 'ЛОКАЦИЯ',
    locationTitle: 'Улувату, Бали',
    locationText: 'Расположенный в Улувату, над Индийским океаном и всего в нескольких минутах от пляжа Нунггалан, Vanara находится в одном из самых желанных прибрежных уголков Бали.',
    mapKicker: 'Карта',
    mapCardText: 'Расположение на утёсе в Улувату, Бали',
    openMap: 'Открыть карту',
    getDirections: 'Построить маршрут',
    newsletterEyebrow: 'РАССЫЛКА',
    newsletterTitle: 'Записка с побережья',
    newsletterText: 'Сезонные открытия, истории о виллах и впечатления — редко, спокойно и по делу.',
    emailPlaceholder: 'Электронная почта',
    subscribe: 'Подписаться',
    unsubscribe: 'Без спама. Отписка в любой момент.',
    diningSectionAria: 'Ресторан',
    diningCarouselAria: 'Карусель ресторана',
    prevDining: 'Предыдущее фото ресторана',
    nextDining: 'Следующее фото ресторана',
    showDining: 'Показать фото ресторана',
    villasCarouselAria: 'Карусель вилл',
    prevVilla: 'Предыдущее фото виллы',
    nextVilla: 'Следующее фото виллы',
    showVilla: 'Показать фото виллы',
    experiencesGalleryAria: 'Галерея впечатлений',
    experienceImageAria: 'Изображение впечатлений',
    weddingImageAria: 'Изображение свадьбы',
    locationMapAria: 'Карта расположения Vanara',
    locationMapTitle: 'Карта Vanara Resort & Spa',
    experienceItems: [
      { title: 'Медовый месяц и романтика', alt: 'Романтические впечатления в Vanara' },
      { title: 'Ужин на вилле', alt: 'Ужин на вилле' },
      { title: 'Моменты заката', alt: 'Моменты заката' },
      { title: 'Параглайдинг', alt: 'Параглайдинг над утёсами' },
      { title: 'Йога', alt: 'Йога в Vanara' },
      { title: 'Пляж Нунггалан', alt: 'Пляж Нунггалан' },
    ],
    diningPhotos: ['Ужин в Vanara', 'Атмосфера ресторана', 'Шеф и свежая кухня', 'Ужин на закате'],
    villaPhotos: ['Вилла в Vanara', 'Терраса виллы', 'Вилла с видом на океан'],
  },
  CN: {
    heroRegion: '乌鲁瓦图 · 巴厘岛',
    heroTitle: 'VANARA RESORT & SPA',
    tapToPlay: '点击播放',
    resortEyebrow: '度假酒店',
    resortTitle: '悬崖之上的优雅栖居',
    resortCopy: [
      'Vanara Resort & Spa 坐落于乌鲁瓦图悬崖之上，现代别墅、开阔空间与一望无际的印度洋景观在这里自然融合。',
      '酒店位于 Nunggalan Beach 之上，这片罕见而原始的海岸线塑造了整个空间，让陆地、天空与海洋轻松交汇。',
      '这里的氛围私密而从容，由建筑、光线以及与自然地景的深度连接所定义。',
    ],
    villasEyebrow: '别墅',
    villasTitle: '由设计与地景塑造的私密空间',
    villasCopy: [
      '现代建筑、开阔空间以及与周围环境的紧密联系，定义了 Vanara 的每一栋别墅。',
      '别墅分布于悬崖与精心设计的花园之间，兼具私密性，并让室内外生活自然衔接。',
      '部分别墅面向海洋，部分沉浸在郁郁葱葱的绿意中，另有别墅配备私人泳池与宽敞的户外起居空间。',
    ],
    villasCta: '探索别墅',
    kokoonEyebrow: 'KOKOON',
    kokoonTitle: '由光线、风味与海洋塑造的悬崖餐饮',
    kokoonCopy: [
      'Kokoon 将现代料理与精致氛围融合在一起，法式与日式技法邂逅地中海灵感，并辅以印尼本地食材。',
      '从白天用餐到日落与夜晚，整个场景自然变化，由风味、环境与氛围共同定义。',
    ],
    kokoonCta: '探索 Kokoon',
    experiencesEyebrow: '体验',
    experiencesTitle: '由岛屿塑造的时刻',
    experiencesCopy: [
      '在 Vanara，每一天都在放松与探索之间自然流动，由这片环境与周围地景共同塑造。',
      '从 Nunggalan Beach 的海岸线到乌鲁瓦图的人文与海岸体验，每一项活动都与地点和氛围自然相连。',
    ],
    experiencesCta: '探索全部体验',
    weddingsEyebrow: '婚礼',
    weddingsTitle: '在海洋之上庆祝',
    weddingsCopy: [
      'Vanara 坐落于印度洋之上的悬崖边，是举办婚礼与私人庆典的独特场地。',
      '仪式在开阔的户外空间中展开，伴随无遮挡海景，光线自然过渡至日落与夜晚。',
      '每一场庆典都由环境本身塑造，专注于氛围、空间与流畅体验。',
    ],
    weddingsCta: '探索婚礼',
    bookingTitle: '感受空间、舒适与海洋的节奏',
    bookingIntroCta: '预订入住',
    checkIn: '入住',
    checkOut: '退房',
    adults: '成人',
    rooms: '房间',
    staySummary: '入住摘要',
    night: '晚',
    nights: '晚',
    checkAvailability: '查看可订情况',
    locationEyebrow: '位置',
    locationTitle: '乌鲁瓦图，巴厘岛',
    locationText: 'Vanara 位于乌鲁瓦图，俯瞰印度洋，距离 Nunggalan Beach 仅片刻之遥，坐拥巴厘岛最受向往的海岸景观之一。',
    mapKicker: '地图',
    mapCardText: '位于巴厘岛乌鲁瓦图的悬崖之上',
    openMap: '打开地图',
    getDirections: '获取路线',
    newsletterEyebrow: '通讯',
    newsletterTitle: '来自海岸的一封简讯',
    newsletterText: '季节性开放、别墅故事与精选体验——发送不频繁，始终安静从容。',
    emailPlaceholder: '电子邮箱',
    subscribe: '订阅',
    unsubscribe: '无垃圾邮件。可随时取消订阅。',
    diningSectionAria: '餐饮',
    diningCarouselAria: '餐饮轮播',
    prevDining: '上一张餐饮照片',
    nextDining: '下一张餐饮照片',
    showDining: '显示餐饮照片',
    villasCarouselAria: '别墅轮播',
    prevVilla: '上一张别墅照片',
    nextVilla: '下一张别墅照片',
    showVilla: '显示别墅照片',
    experiencesGalleryAria: '体验画廊',
    experienceImageAria: '体验图片',
    weddingImageAria: '婚礼图片',
    locationMapAria: 'Vanara 位置地图',
    locationMapTitle: 'Vanara Resort & Spa 地图',
    experienceItems: [
      { title: '蜜月与浪漫体验', alt: 'Vanara 的蜜月与浪漫体验' },
      { title: '别墅内用餐', alt: '别墅内用餐' },
      { title: '日落时刻', alt: '日落时刻' },
      { title: '滑翔伞', alt: '悬崖之上的滑翔伞体验' },
      { title: '瑜伽', alt: 'Vanara 瑜伽' },
      { title: 'Nunggalan 海滩', alt: 'Nunggalan 海滩' },
    ],
    diningPhotos: ['Vanara 餐饮', '用餐场景', '主厨与新鲜料理', '日落餐饮'],
    villaPhotos: ['Vanara 别墅', '别墅露台', '海景别墅'],
  },
}

function useScrollZoom(
  ref: any,
  opts?: { min?: number; max?: number; start?: number; end?: number }
) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const min = opts?.min ?? 1.0
    const max = opts?.max ?? 1.06
    const start = opts?.start ?? 0.15
    const end = opts?.end ?? 0.85

    let raf: number | null = null

    const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n))

    const update = () => {
      raf = null
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const raw = 1 - rect.top / vh
      const t = clamp((raw - start) / (end - start), 0, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      const scale = max - (max - min) * eased
      el.style.setProperty('--scrollZoom', String(scale))
    }

    const onScroll = () => {
      if (raf != null) return
      raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (raf != null) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ref, opts?.min, opts?.max, opts?.start, opts?.end])
}

function startOfDay(date: Date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
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

function formatDisplayDate(value: string, locale: string, emptyText: string) {
  if (!value) return emptyText
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
  }).format(parseDateInput(value))
}

function DiningUlamanCarousel4({ t }: { t: any }) {
  const photos = useMemo(
    () => [
      { src: '/dining-1.webp', alt: t.diningPhotos[0] },
      { src: '/dining-2.webp', alt: t.diningPhotos[1] },
      { src: '/dining-3.webp', alt: t.diningPhotos[2] },
      { src: '/dining-4.webp', alt: t.diningPhotos[3] },
    ],
    [t]
  )

  const [active, setActive] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const pausedRef = useRef(false)
  const touchRef = useRef<{ x: number; y: number } | null>(null)
  const zoomRef = useRef<HTMLDivElement | null>(null)
  useScrollZoom(zoomRef as any, { min: 1.0, max: 1.06, start: 0.15, end: 0.85 })

  const go = (i: number) => {
    const idx = (i + photos.length) % photos.length
    setPrev(active)
    setActive(idx)
    window.setTimeout(() => setPrev(null), 650)
  }

  const prevSlide = () => go(active - 1)
  const nextSlide = () => go(active + 1)

  useEffect(() => {
    const id = window.setInterval(() => {
      if (pausedRef.current) return
      go(active + 1)
    }, 5200)
    return () => window.clearInterval(id)
  }, [active, photos.length])

  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    touchRef.current = { x: touch.clientX, y: touch.clientY }
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchRef.current
    touchRef.current = null
    if (!start) return
    const touch = e.changedTouches[0]
    const dx = touch.clientX - start.x
    const dy = touch.clientY - start.y
    if (Math.abs(dx) < 44 || Math.abs(dx) < Math.abs(dy)) return
    if (dx < 0) nextSlide()
    else prevSlide()
  }

  return (
    <section className="uDining" aria-label={t.diningSectionAria}>
      <div
        className="uDiningCarousel revealBlock"
        ref={zoomRef}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-label={t.diningCarouselAria}
      >
        <div className="uDiningStage" aria-hidden="true">
          {photos.map((photo, i) => {
            const isActive = i === active
            const isPrev = prev !== null && i === prev
            return (
              <div key={photo.src} className={`uDiningSlide ${isActive ? 'is-active' : ''} ${isPrev ? 'is-prev' : ''}`}>
                <img className="uDiningImg" src={photo.src} alt={photo.alt} draggable={false} />
              </div>
            )
          })}
        </div>

        <div className="uDiningShade" aria-hidden="true" />

        <button type="button" className="carouselArrow carouselArrow--prev" aria-label={t.prevDining} onClick={prevSlide}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
        </button>

        <button type="button" className="carouselArrow carouselArrow--next" aria-label={t.nextDining} onClick={nextSlide}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
        </button>

        <div className="uDiningDots" aria-label={t.diningCarouselAria}>
          {photos.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`uDiningDot ${i === active ? 'is-active' : ''}`}
              aria-label={`${t.showDining} ${i + 1}`}
              onClick={() => go(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function VillasUlamanCarousel({ t }: { t: any }) {
  const photos = useMemo(
    () => [
      { src: '/villas-1.webp', alt: t.villaPhotos[0] },
      { src: '/villas-2.webp', alt: t.villaPhotos[1] },
      { src: '/villas-3.webp', alt: t.villaPhotos[2] },
    ],
    [t]
  )

  const [active, setActive] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const pausedRef = useRef(false)
  const touchRef = useRef<{ x: number; y: number } | null>(null)
  const zoomRef = useRef<HTMLDivElement | null>(null)
  useScrollZoom(zoomRef as any, { min: 1.0, max: 1.06, start: 0.15, end: 0.85 })

  const go = (i: number) => {
    const idx = (i + photos.length) % photos.length
    setPrev(active)
    setActive(idx)
    window.setTimeout(() => setPrev(null), 650)
  }

  const prevSlide = () => go(active - 1)
  const nextSlide = () => go(active + 1)

  useEffect(() => {
    const id = window.setInterval(() => {
      if (pausedRef.current) return
      go(active + 1)
    }, 5600)
    return () => window.clearInterval(id)
  }, [active, photos.length])

  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    touchRef.current = { x: touch.clientX, y: touch.clientY }
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchRef.current
    touchRef.current = null
    if (!start) return
    const touch = e.changedTouches[0]
    const dx = touch.clientX - start.x
    const dy = touch.clientY - start.y
    if (Math.abs(dx) < 44 || Math.abs(dx) < Math.abs(dy)) return
    if (dx < 0) nextSlide()
    else prevSlide()
  }

  return (
    <div
      className="uVillasCarousel revealBlock"
      ref={zoomRef}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-label={t.villasCarouselAria}
    >
      <div className="uVillasStage" aria-hidden="true">
        {photos.map((photo, i) => {
          const isActive = i === active
          const isPrev = prev !== null && i === prev
          return (
            <div key={photo.src} className={`uVillasSlide ${isActive ? 'is-active' : ''} ${isPrev ? 'is-prev' : ''}`}>
              <img className="uVillasImg" src={photo.src} alt={photo.alt} draggable={false} />
            </div>
          )
        })}
      </div>

      <div className="uVillasShade" aria-hidden="true" />

      <button type="button" className="carouselArrow carouselArrow--prev" aria-label={t.prevVilla} onClick={prevSlide}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
      </button>

      <button type="button" className="carouselArrow carouselArrow--next" aria-label={t.nextVilla} onClick={nextSlide}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
      </button>

      <div className="uVillasDots" aria-label={t.villasCarouselAria}>
        {photos.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`uVillasDot ${i === active ? 'is-active' : ''}`}
            aria-label={`${t.showVilla} ${i + 1}`}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </div>
  )
}

function ExperienceMosaicGrid({ t }: { t: any }) {
  const items = useMemo(
    () => [
      { src: '/experience-honeymoon.jpg', size: 'hero', ...t.experienceItems[0] },
      { src: '/experience-dining.jpg', size: 'square', ...t.experienceItems[1] },
      { src: '/experience-sunset.jpg', size: 'tall', ...t.experienceItems[2] },
      { src: '/experience-paragliding.jpg', size: 'square', ...t.experienceItems[3] },
      { src: '/experience-yoga.jpg', size: 'portrait', ...t.experienceItems[4] },
      { src: '/experience-nunggalan.jpg', size: 'portrait', ...t.experienceItems[5] },
    ],
    [t]
  )

  return (
    <div className="experienceMosaicWrap">
      <div className="experienceMosaic" aria-label={t.experiencesGalleryAria}>
        {items.map((item, index) => (
          <article className={`experienceMosaicItem experienceMosaicItem--${item.size} revealBlock`} key={`${item.title}-${index}`}>
            <img src={item.src} alt={item.alt} draggable={false} />
            <div className="experienceMosaicOverlay" aria-hidden="true" />
            <div className="experienceMosaicLabel">{item.title}</div>
          </article>
        ))}
      </div>

      <div className="experienceMosaicCtaWrap">
        <a className="experienceMosaicCta" href="/experience">{t.experiencesCta}</a>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [heroVideoOk, setHeroVideoOk] = useState(true)
  const [needsTap, setNeedsTap] = useState(false)
  const heroVideoRef = useRef<HTMLVideoElement | null>(null)
  const [lang, setLang] = useState<LangCode>('EN')

  const today = startOfDay(new Date())
  const [bookCheckIn, setBookCheckIn] = useState(formatDateInput(today))
  const [bookCheckOut, setBookCheckOut] = useState(formatDateInput(addDays(today, 1)))
  const [bookAdults, setBookAdults] = useState(2)
  const [bookRooms, setBookRooms] = useState(1)

  const t = pageTranslations[lang]
  const locale = localeMap[lang]

  const bookingUrl = useMemo(() => {
    const params = new URLSearchParams()
    params.set('arrival', bookCheckIn)
    params.set('departure', bookCheckOut)
    params.set('checkInDate', bookCheckIn)
    params.set('checkOutDate', bookCheckOut)
    params.set('rooms', String(bookRooms))
    params.set('adults', String(bookAdults))
    params.set('children', '0')
    params.set('items[0][adults]', String(bookAdults))
    params.set('items[0][children]', '0')
    params.set('items[0][infants]', '0')
    params.set('items[0][rooms]', String(bookRooms))
    params.set('currency', 'IDR')
    params.set('locale', lang === 'CN' ? 'zh-CN' : lang === 'ID' ? 'id' : lang === 'RU' ? 'ru' : 'en')
    return `https://book-directonline.com/properties/vanararesortspa?${params.toString()}`
  }, [bookAdults, bookCheckIn, bookCheckOut, bookRooms, lang])

  useEffect(() => {
    const readLanguage = () => {
      const saved = window.localStorage.getItem(languageStorageKey) as LangCode | null
      if (saved && saved in pageTranslations) setLang(saved)
    }
    readLanguage()
    window.addEventListener('storage', readLanguage)
    window.addEventListener('vanara-language-change', readLanguage as EventListener)
    return () => {
      window.removeEventListener('storage', readLanguage)
      window.removeEventListener('vanara-language-change', readLanguage as EventListener)
    }
  }, [])

  useEffect(() => {
    const v = heroVideoRef.current
    if (!v) return

    let resumeTimer: number | null = null
    const clearResumeTimer = () => {
      if (resumeTimer != null) window.clearTimeout(resumeTimer)
      resumeTimer = null
    }

    const tryPlay = async () => {
      clearResumeTimer()
      try {
        v.muted = true
        await v.play()
        setNeedsTap(false)
      } catch {
        setNeedsTap(true)
      }
    }

    const scheduleResume = () => {
      clearResumeTimer()
      resumeTimer = window.setTimeout(() => {
        if (document.hidden) return
        if (v.paused) tryPlay()
      }, 350)
    }

    const onVisibility = () => {
      if (!document.hidden) tryPlay()
    }

    const id = window.setTimeout(tryPlay, 60)

    document.addEventListener('visibilitychange', onVisibility)
    v.addEventListener('pause', scheduleResume)
    v.addEventListener('waiting', scheduleResume)
    v.addEventListener('stalled', scheduleResume)
    v.addEventListener('canplay', tryPlay)

    return () => {
      window.clearTimeout(id)
      clearResumeTimer()
      document.removeEventListener('visibilitychange', onVisibility)
      v.removeEventListener('pause', scheduleResume)
      v.removeEventListener('waiting', scheduleResume)
      v.removeEventListener('stalled', scheduleResume)
      v.removeEventListener('canplay', tryPlay)
    }
  }, [])

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.revealBlock')) as HTMLElement[]
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.classList.add('is-revealed')
            observer.unobserve(el)
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -8% 0px',
      }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="home">
      <section className="hero hero--video" aria-label="Hero">
        <div className="heroVideo" aria-label="Vanara hero media">
          {heroVideoOk ? (
            <video
              key="hero"
              ref={heroVideoRef}
              className="heroVideoEl"
              autoPlay
              muted
              playsInline
              loop
              preload="auto"
              controls={false}
              disablePictureInPicture
              // @ts-ignore
              controlsList="nodownload noplaybackrate noremoteplayback"
              poster="/hero-poster.jpg"
              onError={() => {
                setHeroVideoOk(false)
                setNeedsTap(false)
              }}
              onCanPlay={() => {
                setHeroVideoOk(true)
              }}
            >
              <source src="/hero.mp4" type="video/mp4" />
            </video>
          ) : (
            <img className="heroVideoFallback" src="/hero-fallback.jpg" alt="Vanara Resort & Spa" />
          )}

          {needsTap && heroVideoOk && (
            <button
              type="button"
              className="heroVideoTap"
              aria-label={t.tapToPlay}
              onClick={() => {
                const v = heroVideoRef.current
                if (!v) return
                v.play()
                  .then(() => setNeedsTap(false))
                  .catch(() => setNeedsTap(true))
              }}
            >
              {t.tapToPlay}
            </button>
          )}
        </div>

        <div className="heroShade" aria-hidden="true" />

        <div className="heroContent">
          <div className="heroKicker">{t.heroRegion}</div>
          <h1 className="heroTitle">{t.heroTitle}</h1>
        </div>
      </section>

      <section className="section sectionIntro">
        <div className="container">
          <div className="eyebrow">{t.resortEyebrow}</div>
          <h2 className="h2">{t.resortTitle}</h2>

          <div className="copy" style={{ marginTop: 22 }}>
            {t.resortCopy.map((paragraph: string) => <p key={paragraph}>{paragraph}</p>)}
          </div>

          <div className="rule" />
        </div>
      </section>

      <section className="section sectionVillasFeature">
        <div className="container">
          <div className="split split--rev">
            <VillasUlamanCarousel t={t} />

            <div>
              <div className="eyebrow">{t.villasEyebrow}</div>
              <h3 className="h3">{t.villasTitle}</h3>

              <div className="copy">
                {t.villasCopy.map((paragraph: string) => <p key={paragraph}>{paragraph}</p>)}
              </div>

              <a className="textCta" href="/accommodation">{t.villasCta}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section sectionDiningFeature">
        <div className="container">
          <div className="split split--rev">
            <DiningUlamanCarousel4 t={t} />

            <div>
              <div className="eyebrow">{t.kokoonEyebrow}</div>
              <h3 className="h3">{t.kokoonTitle}</h3>

              <div className="copy">
                {t.kokoonCopy.map((paragraph: string) => <p key={paragraph}>{paragraph}</p>)}
              </div>

              <a className="textCta" href="/dine">{t.kokoonCta}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section sectionYoga">
        <div className="container">
          <div className="split split--rev">
            <div className="imagePlaceholder revealBlock" aria-label={t.experienceImageAria}>
              <img className="experienceImg" src="/experiences-main.jpg" alt={t.experiencesTitle} />
            </div>

            <div>
              <div className="eyebrow">{t.experiencesEyebrow}</div>
              <h3 className="h3">{t.experiencesTitle}</h3>
              <div className="copy">
                {t.experiencesCopy.map((paragraph: string) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          </div>

          <ExperienceMosaicGrid t={t} />
        </div>
      </section>

      <section className="section sectionWeddings" id="weddings">
        <div className="container">
          <div className="split split--rev">
            <div className="imagePlaceholder revealBlock" aria-label={t.weddingImageAria}>
              <img className="experienceImg" src="/wedding.jpg" alt={t.weddingsTitle} />
            </div>

            <div>
              <div className="eyebrow">{t.weddingsEyebrow}</div>
              <h3 className="h3">{t.weddingsTitle}</h3>

              <div className="copy">
                {t.weddingsCopy.map((paragraph: string) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <a className="textCta" href="/connect">{t.weddingsCta}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section sectionBookingFeature" id="booking">
        <div className="container">
          <div className="bookingFeature revealBlock">
            <div className="bookingFeatureIntro">
              <h3 className="h3">{t.bookingTitle}</h3>
              <a className="bookingFeatureButton bookingFeatureButtonIntro" href={bookingUrl} target="_blank" rel="noreferrer">{t.bookingIntroCta}</a>
            </div>

            <div className="bookingFeatureCard">
              <div className="bookingFeatureGrid">
                <label className="bookingField bookingFieldCheckIn">
                  <span>{t.checkIn}</span>
                  <input
                    type="date"
                    min={formatDateInput(today)}
                    value={bookCheckIn}
                    onChange={(e) => {
                      const next = e.target.value
                      setBookCheckIn(next)
                      if (next && bookCheckOut && parseDateInput(bookCheckOut) <= parseDateInput(next)) {
                        setBookCheckOut(formatDateInput(addDays(parseDateInput(next), 1)))
                      }
                    }}
                  />
                </label>

                <label className="bookingField">
                  <span>{t.checkOut}</span>
                  <input
                    type="date"
                    min={formatDateInput(addDays(parseDateInput(bookCheckIn), 1))}
                    value={bookCheckOut}
                    onChange={(e) => setBookCheckOut(e.target.value)}
                  />
                </label>

                <label className="bookingField">
                  <span>{t.adults}</span>
                  <select value={bookAdults} onChange={(e) => setBookAdults(Number(e.target.value))}>
                    {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </label>

                <label className="bookingField">
                  <span>{t.rooms}</span>
                  <select value={bookRooms} onChange={(e) => setBookRooms(Number(e.target.value))}>
                    {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </label>
              </div>

              <div className="bookingFeatureMeta">
                <div>
                  <div className="bookingFeatureSmall">{t.staySummary}</div>
                  <div className="bookingFeatureSummary">
                    {formatDisplayDate(bookCheckIn, locale, t.checkIn)} — {formatDisplayDate(bookCheckOut, locale, t.checkOut)} · {nightsBetween(bookCheckIn, bookCheckOut)} {nightsBetween(bookCheckIn, bookCheckOut) === 1 ? t.night : t.nights}
                  </div>
                </div>

                <a className="bookingFeatureButton" href={bookingUrl} target="_blank" rel="noreferrer">{t.checkAvailability}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section sectionBottom">
        <div className="container">
          <div className="grid2">
            <div className="panel panel--mapLuxury">
              <div className="eyebrow">{t.locationEyebrow}</div>
              <h3 className="h3">{t.locationTitle}</h3>
              <p className="panelText">{t.locationText}</p>

              <div className="luxMapWrap" aria-label={t.locationMapAria}>
                <div className="luxMapFrame">
                  <iframe
                    src="https://www.google.com/maps?q=-8.8421164,115.1117122&z=16&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={t.locationMapTitle}
                  />
                  <div className="luxMapTone" aria-hidden="true" />
                  <div className="luxMapGrain" aria-hidden="true" />
                  <div className="luxMapPulse" aria-hidden="true" />
                  <div className="luxMapPin" aria-hidden="true"><span className="luxMapPinDot" /></div>
                  <div className="luxMapCard">
                    <div className="luxMapCardKicker">{t.mapKicker}</div>
                    <div className="luxMapCardTitle">Vanara Resort &amp; Spa</div>
                    <div className="luxMapCardText">{t.mapCardText}</div>
                  </div>
                </div>

                <div className="luxMapActions">
                  <a className="luxMapLink" href="https://www.google.com/maps/@-8.8421164,115.1117122,17z?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer">{t.openMap}</a>
                  <a className="luxMapButton" href="https://www.google.com/maps/dir/?api=1&destination=-8.8421164,115.1117122" target="_blank" rel="noreferrer">{t.getDirections}</a>
                </div>
              </div>
            </div>

            <div className="panel">
              <div className="eyebrow">{t.newsletterEyebrow}</div>
              <h3 className="h3">{t.newsletterTitle}</h3>
              <p className="panelText">{t.newsletterText}</p>

              <form className="newsletter" action="#" method="post">
                <input className="newsletterInput" type="email" placeholder={t.emailPlaceholder} />
                <button className="newsletterBtn" type="submit">{t.subscribe}</button>
              </form>

              <div className="smallprint">{t.unsubscribe}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
