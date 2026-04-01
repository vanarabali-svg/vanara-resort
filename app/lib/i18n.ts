export const locales = ['en', 'id', 'ru', 'cn'] as const
export type Locale = (typeof locales)[number]

export function normalizeLocale(value: string | undefined): Locale {
  if (!value) return 'en'
  const v = value.toLowerCase()
  return (locales as readonly string[]).includes(v) ? (v as Locale) : 'en'
}

export function withLang(lang: Locale, href: string) {
  if (!href) return `/${lang}`
  if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')) return href
  if (href.startsWith('#')) return `/${lang}${href}`
  if (href === '/') return `/${lang}`
  return `/${lang}${href.startsWith('/') ? href : `/${href}`}`
}

export const languageNames: Record<Locale, string> = {
  en: 'English',
  id: 'Bahasa Indonesia',
  ru: 'Русский',
  cn: '中文',
}

export const languageCodes: Record<Locale, string> = {
  en: 'EN',
  id: 'ID',
  ru: 'RU',
  cn: 'CN',
}

export const languageHtml: Record<Locale, string> = {
  en: 'en',
  id: 'id',
  ru: 'ru',
  cn: 'zh-CN',
}

export const dateLocales: Record<Locale, string> = {
  en: 'en-US',
  id: 'id-ID',
  ru: 'ru-RU',
  cn: 'zh-CN',
}

export type Dictionary = ReturnType<typeof getDictionary>

export function getDictionary(lang: Locale) {
  const d = {
    en: {
      menu: { about: 'About', experience: 'Experience', dine: 'Dine', villas: 'Villas', connect: 'Connect', footerLine: 'For those who listen to the ocean — not over it.' },
      layout: {
        openMenu: 'Open menu', changeLanguage: 'Change language', reserve: 'Reserve',
        languageTitle: 'Language', languageHint: 'Choose a language version of the site.', closeLanguage: 'Close language',
        directBooking: 'Direct booking', reserveStay: 'Reserve your stay', reserveSub: 'Choose your dates and guests, then continue to our direct booking page.',
        checkIn: 'Check in', checkOut: 'Check out', rooms: 'Rooms', adults: 'Adults', children: 'Children',
        selecting: 'Selecting', nightStay: 'night stay', room: 'room', roomsWord: 'rooms', adult: 'adult', adultsWord: 'adults',
        checkAvailability: 'Check availability', closeBooking: 'Close booking widget',
        cookieEyebrow: 'Cookie Policy', cookieTitle: 'A calmer, more seamless visit', cookieText: 'We use cookies to improve performance, remember preferences, and understand how guests move through the site.',
        readPolicy: 'Read policy', decline: 'Decline', accept: 'Accept',
        footerContact: 'Contact', footerQuickLinks: 'Quick Links', footerInformation: 'Information',
        factsheet: 'Factsheet', terms: 'Terms & Conditions', privacy: 'Privacy Policy', legal: 'Legal Notice',
        weddings: 'Weddings', dining: 'Dining', experiences: 'Experiences',
        openMap: 'Open map', getDirections: 'Get directions', social: 'Social media',
      },
      home: {
        heroKicker: 'ULUWATU · BALI', heroTap: 'Tap to play',
        introEyebrow: 'THE RESORT', introTitle: 'A refined escape above the ocean',
        introP1: 'Vanara Resort & Spa is a cliffside destination in Uluwatu, where modern villas, open space, and uninterrupted views of the Indian Ocean come together in a natural balance.',
        introP2: 'Set above Nunggalan Beach, a rare stretch of untouched coastline, the resort is shaped by its surroundings, where land, sky, and ocean meet effortlessly.',
        introP3: 'The atmosphere is private and unhurried, defined by architecture, light, and a strong connection to the landscape.',
        villasEyebrow: 'VILLAS', villasTitle: 'Private spaces shaped by design and landscape', villasP1: 'Modern architecture, open space, and a strong connection to the surroundings define each villa at Vanara.', villasP2: 'Positioned across the cliffs and within carefully designed gardens, the villas offer privacy and a seamless flow between indoor and outdoor living.', villasP3: 'Some villas open toward the ocean, others are immersed in lush greenery, while select villas feature private pools and generous outdoor living areas.', villasCta: 'Explore villas',
        kokoonEyebrow: 'KOKOON', kokoonTitle: 'Cliffside dining shaped by light, flavour, and the ocean', kokoonP1: 'Kokoon brings together modern cuisine with a refined atmosphere, where French and Japanese techniques meet Mediterranean influences, complemented by locally sourced Indonesian ingredients.', kokoonP2: 'From daytime dining to sunset and evening, the setting evolves naturally, defined by flavour, setting, and atmosphere.', kokoonCta: 'Explore Kokoon',
        expEyebrow: 'EXPERIENCES', expTitle: 'Moments shaped by the island', expP1: 'At Vanara, each day moves between moments of ease and exploration, shaped by the setting and the surrounding landscape.', expP2: 'From the shoreline of Nunggalan Beach to the cultural and coastal experiences of Uluwatu, each activity unfolds naturally, connected to place and atmosphere.', expCta: 'Discover all experiences',
        weddingsEyebrow: 'WEDDINGS', weddingsTitle: 'Celebrate above the ocean', weddingsP1: 'Set along the cliffs above the Indian Ocean, Vanara offers a distinctive setting for weddings and private celebrations.', weddingsP2: 'Ceremonies unfold in open-air spaces with uninterrupted views, where the light transitions naturally into sunset and evening.', weddingsP3: 'Each celebration is shaped by the setting, with a focus on atmosphere, space, and seamless flow.', weddingsCta: 'Discover weddings',
        bookingTitle: 'Experience space, comfort, and the rhyhm of the ocean', bookingCta: 'Book your stay', staySummary: 'Stay summary',
        locationEyebrow: 'LOCATION', locationTitle: 'Uluwatu, Bali', locationText: 'Set in Uluwatu, above the Indian Ocean and just moments from Nunggalan Beach, Vanara is positioned within one of Bali’s most sought-after coastal landscapes.', mapKicker: 'The Map', mapTitle: 'Vanara Resort & Spa', mapText: 'Clifftop setting in Uluwatu, Bali',
        newsletterEyebrow: 'NEWSLETTER', newsletterTitle: 'A note from the coast', newsletterText: 'Seasonal openings, villa stories, and experiences — sent rarely, always calm.', newsletterPlaceholder: 'Email address', newsletterButton: 'Subscribe', newsletterSmall: 'No spam. Unsubscribe anytime.',
        mosaic: { honeymoon: 'Honeymoon & Romantic Experiences', dining: 'In-Villa Dining', sunset: 'Sunset Moments', paragliding: 'Paragliding', yoga: 'Yoga', beach: 'Nunggalan Beach' }
      }
    },
    id: {
      menu: { about: 'Tentang', experience: 'Pengalaman', dine: 'Bersantap', villas: 'Vila', connect: 'Kontak', footerLine: 'Bagi mereka yang mendengarkan laut — bukan menenggelamkannya.' },
      layout: {
        openMenu: 'Buka menu', changeLanguage: 'Ganti bahasa', reserve: 'Reservasi', languageTitle: 'Bahasa', languageHint: 'Pilih versi bahasa situs.', closeLanguage: 'Tutup bahasa',
        directBooking: 'Pemesanan langsung', reserveStay: 'Reservasi masa inap Anda', reserveSub: 'Pilih tanggal dan jumlah tamu, lalu lanjutkan ke halaman pemesanan langsung kami.',
        checkIn: 'Check-in', checkOut: 'Check-out', rooms: 'Kamar', adults: 'Dewasa', children: 'Anak', selecting: 'Memilih', nightStay: 'malam menginap', room: 'kamar', roomsWord: 'kamar', adult: 'dewasa', adultsWord: 'dewasa', checkAvailability: 'Cek ketersediaan', closeBooking: 'Tutup widget pemesanan',
        cookieEyebrow: 'Kebijakan Cookie', cookieTitle: 'Kunjungan yang lebih tenang dan lancar', cookieText: 'Kami menggunakan cookie untuk meningkatkan performa, mengingat preferensi, dan memahami bagaimana tamu menggunakan situs.', readPolicy: 'Baca kebijakan', decline: 'Tolak', accept: 'Terima',
        footerContact: 'Kontak', footerQuickLinks: 'Tautan Cepat', footerInformation: 'Informasi', factsheet: 'Lembar Fakta', terms: 'Syarat & Ketentuan', privacy: 'Kebijakan Privasi', legal: 'Pemberitahuan Hukum', weddings: 'Pernikahan', dining: 'Bersantap', experiences: 'Pengalaman', openMap: 'Buka peta', getDirections: 'Petunjuk arah', social: 'Media sosial',
      },
      home: {
        heroKicker: 'ULUWATU · BALI', heroTap: 'Ketuk untuk memutar', introEyebrow: 'RESOR', introTitle: 'Sebuah pelarian yang elegan di atas samudra',
        introP1: 'Vanara Resort & Spa adalah destinasi di tebing Uluwatu, tempat vila modern, ruang terbuka, dan pemandangan Samudra Hindia yang tanpa batas menyatu secara alami.', introP2: 'Terletak di atas Pantai Nunggalan, bentang pantai alami yang langka, resor ini dibentuk oleh lingkungan tempat daratan, langit, dan lautan bertemu dengan tenang.', introP3: 'Suasananya privat dan tidak tergesa, didefinisikan oleh arsitektur, cahaya, dan kedekatan dengan lanskap.',
        villasEyebrow: 'VILA', villasTitle: 'Ruang privat yang dibentuk oleh desain dan lanskap', villasP1: 'Arsitektur modern, ruang terbuka, dan hubungan kuat dengan lingkungan mendefinisikan setiap vila di Vanara.', villasP2: 'Terletak di sepanjang tebing dan taman yang dirancang dengan cermat, vila-vila ini menawarkan privasi dan alur hidup indoor-outdoor yang mulus.', villasP3: 'Beberapa vila menghadap laut, lainnya dikelilingi kehijauan, sementara vila tertentu memiliki kolam renang pribadi dan area hidup luar ruang yang luas.', villasCta: 'Jelajahi vila',
        kokoonEyebrow: 'KOKOON', kokoonTitle: 'Bersantap di tebing yang dibentuk oleh cahaya, rasa, dan samudra', kokoonP1: 'Kokoon menghadirkan kuliner modern dalam suasana elegan, saat teknik Prancis dan Jepang bertemu pengaruh Mediterania serta bahan lokal Indonesia.', kokoonP2: 'Dari siang hingga matahari terbenam dan malam, suasana berkembang secara alami, ditentukan oleh rasa, setting, dan atmosfer.', kokoonCta: 'Jelajahi Kokoon',
        expEyebrow: 'PENGALAMAN', expTitle: 'Momen yang dibentuk oleh pulau', expP1: 'Di Vanara, setiap hari bergerak antara momen santai dan eksplorasi, dibentuk oleh suasana dan lanskap sekitarnya.', expP2: 'Dari garis pantai Nunggalan Beach hingga pengalaman budaya dan pesisir Uluwatu, setiap aktivitas mengalir alami, terhubung dengan tempat dan atmosfer.', expCta: 'Temukan semua pengalaman',
        weddingsEyebrow: 'PERNIKAHAN', weddingsTitle: 'Merayakan di atas samudra', weddingsP1: 'Terletak di tebing di atas Samudra Hindia, Vanara menawarkan setting khas untuk pernikahan dan perayaan privat.', weddingsP2: 'Upacara berlangsung di ruang terbuka dengan pemandangan tanpa batas, saat cahaya beralih alami menuju senja dan malam.', weddingsP3: 'Setiap perayaan dibentuk oleh tempatnya, dengan fokus pada atmosfer, ruang, dan alur yang mulus.', weddingsCta: 'Temukan pernikahan',
        bookingTitle: 'Rasakan ruang, kenyamanan, dan ritme samudra', bookingCta: 'Pesan masa inap Anda', staySummary: 'Ringkasan inap', locationEyebrow: 'LOKASI', locationTitle: 'Uluwatu, Bali', locationText: 'Terletak di Uluwatu, di atas Samudra Hindia dan hanya beberapa saat dari Nunggalan Beach, Vanara berada di salah satu lanskap pesisir Bali yang paling dicari.', mapKicker: 'Peta', mapTitle: 'Vanara Resort & Spa', mapText: 'Lokasi di puncak tebing di Uluwatu, Bali', newsletterEyebrow: 'NEWSLETTER', newsletterTitle: 'Sebuah kabar dari pesisir', newsletterText: 'Pembukaan musiman, kisah vila, dan pengalaman — dikirim sesekali, selalu tenang.', newsletterPlaceholder: 'Alamat email', newsletterButton: 'Berlangganan', newsletterSmall: 'Tanpa spam. Berhenti kapan saja.', mosaic: { honeymoon: 'Honeymoon & Pengalaman Romantis', dining: 'Santap di Vila', sunset: 'Momen Senja', paragliding: 'Paragliding', yoga: 'Yoga', beach: 'Pantai Nunggalan' }
      }
    },
    ru: {
      menu: { about: 'О курорте', experience: 'Впечатления', dine: 'Гастрономия', villas: 'Виллы', connect: 'Контакты', footerLine: 'Для тех, кто слушает океан — а не перекрикивает его.' },
      layout: {
        openMenu: 'Открыть меню', changeLanguage: 'Изменить язык', reserve: 'Бронирование', languageTitle: 'Язык', languageHint: 'Выберите языковую версию сайта.', closeLanguage: 'Закрыть выбор языка', directBooking: 'Прямое бронирование', reserveStay: 'Забронируйте проживание', reserveSub: 'Выберите даты и количество гостей, затем перейдите на страницу прямого бронирования.', checkIn: 'Заезд', checkOut: 'Выезд', rooms: 'Номера', adults: 'Взрослые', children: 'Дети', selecting: 'Выбор', nightStay: 'ночей', room: 'номер', roomsWord: 'номеров', adult: 'взрослый', adultsWord: 'взрослых', checkAvailability: 'Проверить наличие', closeBooking: 'Закрыть окно бронирования', cookieEyebrow: 'Политика cookie', cookieTitle: 'Более спокойный и удобный визит', cookieText: 'Мы используем cookie, чтобы улучшать работу сайта, запоминать предпочтения и понимать, как гости взаимодействуют с сайтом.', readPolicy: 'Читать политику', decline: 'Отклонить', accept: 'Принять', footerContact: 'Контакты', footerQuickLinks: 'Быстрые ссылки', footerInformation: 'Информация', factsheet: 'Фактшит', terms: 'Условия и положения', privacy: 'Политика конфиденциальности', legal: 'Юридическая информация', weddings: 'Свадьбы', dining: 'Гастрономия', experiences: 'Впечатления', openMap: 'Открыть карту', getDirections: 'Маршрут', social: 'Социальные сети',
      },
      home: {
        heroKicker: 'УЛУВАТУ · БАЛИ', heroTap: 'Нажмите, чтобы включить', introEyebrow: 'КУРОРТ', introTitle: 'Изысканное уединение над океаном', introP1: 'Vanara Resort & Spa — курорт на утёсе в Улувату, где современные виллы, открытое пространство и бескрайние виды на Индийский океан соединяются в естественной гармонии.', introP2: 'Расположенный над пляжем Нунггалан, редким участком нетронутого побережья, курорт сформирован самим окружением — местом встречи земли, неба и океана.', introP3: 'Атмосфера здесь приватная и неторопливая, определяемая архитектурой, светом и тесной связью с ландшафтом.', villasEyebrow: 'ВИЛЛЫ', villasTitle: 'Приватные пространства, сформированные дизайном и ландшафтом', villasP1: 'Современная архитектура, открытое пространство и тесная связь с природой определяют каждую виллу Vanara.', villasP2: 'Расположенные на утёсах и среди тщательно продуманных садов, виллы дарят приватность и естественный переход между внутренним и внешним пространством.', villasP3: 'Одни виллы открываются к океану, другие утопают в зелени, а некоторые располагают частными бассейнами и просторными зонами на открытом воздухе.', villasCta: 'Открыть виллы', kokoonEyebrow: 'KOKOON', kokoonTitle: 'Ресторан на утёсе, сформированный светом, вкусом и океаном', kokoonP1: 'Kokoon объединяет современную кухню и утончённую атмосферу, где французские и японские техники встречаются со средиземноморскими влияниями и локальными индонезийскими продуктами.', kokoonP2: 'От дневного времени до заката и вечера пространство естественно меняется, раскрывая вкус, обстановку и настроение.', kokoonCta: 'Открыть Kokoon', expEyebrow: 'ВПЕЧАТЛЕНИЯ', expTitle: 'Моменты, сформированные островом', expP1: 'В Vanara каждый день проходит между отдыхом и исследованием, определяемый местом и окружающим ландшафтом.', expP2: 'От береговой линии пляжа Нунггалан до культурных и прибрежных впечатлений Улувату — каждое занятие развивается естественно, в связи с местом и атмосферой.', expCta: 'Открыть все впечатления', weddingsEyebrow: 'СВАДЬБЫ', weddingsTitle: 'Празднуйте над океаном', weddingsP1: 'Расположенный на утёсах над Индийским океаном, Vanara предлагает выразительное пространство для свадеб и частных торжеств.', weddingsP2: 'Церемонии проходят в открытых пространствах с бескрайними видами, где свет естественно переходит в закат и вечер.', weddingsP3: 'Каждое событие формируется самим местом, с акцентом на атмосферу, пространство и плавность.', weddingsCta: 'Открыть свадьбы', bookingTitle: 'Пространство, комфорт и ритм океана', bookingCta: 'Забронировать проживание', staySummary: 'Сводка проживания', locationEyebrow: 'ЛОКАЦИЯ', locationTitle: 'Улувату, Бали', locationText: 'Vanara расположен в Улувату, над Индийским океаном, всего в нескольких минутах от пляжа Нунггалан — в одном из самых желанных прибрежных ландшафтов Бали.', mapKicker: 'Карта', mapTitle: 'Vanara Resort & Spa', mapText: 'Утёсная локация в Улувату, Бали', newsletterEyebrow: 'NEWSLETTER', newsletterTitle: 'Весточка с побережья', newsletterText: 'Сезонные открытия, истории вилл и впечатления — редко, спокойно и по делу.', newsletterPlaceholder: 'Электронная почта', newsletterButton: 'Подписаться', newsletterSmall: 'Без спама. Отписка в любой момент.', mosaic: { honeymoon: 'Медовый месяц и романтика', dining: 'Ужин на вилле', sunset: 'Моменты заката', paragliding: 'Параглайдинг', yoga: 'Йога', beach: 'Пляж Нунггалан' }
      }
    },
    cn: {
      menu: { about: '关于', experience: '体验', dine: '餐饮', villas: '别墅', connect: '联系', footerLine: '献给那些倾听海洋，而不是盖过海浪的人。' },
      layout: {
        openMenu: '打开菜单', changeLanguage: '切换语言', reserve: '预订', languageTitle: '语言', languageHint: '选择网站语言版本。', closeLanguage: '关闭语言选择', directBooking: '直接预订', reserveStay: '预订您的入住', reserveSub: '选择日期和入住人数，然后前往我们的直订页面。', checkIn: '入住', checkOut: '退房', rooms: '房间', adults: '成人', children: '儿童', selecting: '正在选择', nightStay: '晚入住', room: '间房', roomsWord: '间房', adult: '位成人', adultsWord: '位成人', checkAvailability: '查看房态', closeBooking: '关闭预订窗口', cookieEyebrow: 'Cookie 政策', cookieTitle: '更从容、更顺畅的访问体验', cookieText: '我们使用 Cookie 来提升性能、记住偏好，并了解访客如何浏览网站。', readPolicy: '阅读政策', decline: '拒绝', accept: '接受', footerContact: '联系', footerQuickLinks: '快速链接', footerInformation: '信息', factsheet: '资料表', terms: '条款与条件', privacy: '隐私政策', legal: '法律声明', weddings: '婚礼', dining: '餐饮', experiences: '体验', openMap: '打开地图', getDirections: '获取路线', social: '社交媒体',
      },
      home: {
        heroKicker: '乌鲁瓦图 · 巴厘岛', heroTap: '点击播放', introEyebrow: '度假村', introTitle: '海天之上的精致栖居', introP1: 'Vanara Resort & Spa 坐落于乌鲁瓦图悬崖之上，现代别墅、开阔空间与无遮挡的印度洋景观在这里自然融合。', introP2: '度假村位于 Nunggalan Beach 上方，这片少见而原始的海岸线让土地、天空与海洋在此平静相遇。', introP3: '这里的氛围私密而从容，由建筑、光线与景观之间的深度联系所定义。', villasEyebrow: '别墅', villasTitle: '由设计与自然塑造的私享空间', villasP1: '现代建筑、开阔空间以及与环境的紧密联系，定义了 Vanara 的每一栋别墅。', villasP2: '别墅分布于悬崖与精心设计的花园之间，兼具私密性与室内外流动生活方式。', villasP3: '部分别墅面朝海洋，部分沉浸于绿意之中，另有部分配备私人泳池与宽敞的户外起居空间。', villasCta: '探索别墅', kokoonEyebrow: 'KOKOON', kokoonTitle: '由光线、风味与海洋塑造的悬崖餐饮体验', kokoonP1: 'Kokoon 将现代料理与精致氛围结合，在法式与日式技法中融入地中海灵感，并搭配本地印尼食材。', kokoonP2: '从白昼到日落再到夜晚，这里的氛围自然变化，由风味、场景与气息共同定义。', kokoonCta: '探索 Kokoon', expEyebrow: '体验', expTitle: '由岛屿塑造的时刻', expP1: '在 Vanara，每一天都在放松与探索之间自然流动，受到环境与周边景观的塑造。', expP2: '从 Nunggalan Beach 的海岸线到乌鲁瓦图的文化与海岸体验，每一项活动都与地点和氛围自然相连。', expCta: '探索全部体验', weddingsEyebrow: '婚礼', weddingsTitle: '在海洋之上庆祝', weddingsP1: 'Vanara 坐落于印度洋之上的悬崖边，为婚礼与私享庆典提供了独特场地。', weddingsP2: '仪式在开阔的户外空间展开，伴随无边海景，光线自然过渡到日落与夜晚。', weddingsP3: '每一场庆典都由场地本身塑造，聚焦氛围、空间与流畅感。', weddingsCta: '探索婚礼', bookingTitle: '感受空间、舒适与海洋的节奏', bookingCta: '预订您的入住', staySummary: '入住摘要', locationEyebrow: '位置', locationTitle: '乌鲁瓦图，巴厘岛', locationText: 'Vanara 位于乌鲁瓦图，俯瞰印度洋，距 Nunggalan Beach 仅数分钟，坐拥巴厘岛最受向往的海岸地景之一。', mapKicker: '地图', mapTitle: 'Vanara Resort & Spa', mapText: '位于巴厘岛乌鲁瓦图的悬崖之上', newsletterEyebrow: 'NEWSLETTER', newsletterTitle: '来自海岸的一封短信', newsletterText: '季节性开放、别墅故事与体验灵感——少量发送，始终从容。', newsletterPlaceholder: '电子邮箱', newsletterButton: '订阅', newsletterSmall: '无垃圾邮件，可随时取消订阅。', mosaic: { honeymoon: '蜜月与浪漫体验', dining: '别墅内用餐', sunset: '日落时刻', paragliding: '滑翔伞', yoga: '瑜伽', beach: 'Nunggalan 海滩' }
      }
    }
  } as const

  return d[lang]
}
