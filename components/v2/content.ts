// 改版原型（/preview）的所有文案與示範資料。
// 示範畫面裡的店名、客人、價格都是假資料，改這裡即可。

export type Audience = 'owner' | 'merchant'

export const LINE_URL = 'https://line.me/R/ti/p/@058byofv'

// ⭐ 回饋比例（尚未定案，改這兩個數字，全站文字會一起更新）
const RATE_SELF = 2      // 自己消費，自己得到的回饋 %
const RATE_REFERRAL = 1  // 你邀請的朋友消費時，你另外得到的回饋 %

export const v2 = {
  brand: 'Carllection',

  nav: {
    switch: { owner: '車主', merchant: '店家' },
    cta: {
      owner: { label: '加入 LINE', href: LINE_URL, external: true },
      merchant: { label: '申請創始名額', href: '#join', external: false },
    },
  },

  hero: {
    owner: {
      eyebrow: '汽車美容預約平台',
      line1: '好的汽車美容，',
      line2: '不必再靠運氣找。',
      sub: '價格、評價、可預約時段一次看清楚。\n線上預約，到店才付款。',
      primary: { label: '加入 LINE 搶先體驗', href: LINE_URL, external: true },
      secondary: '我是店家',
      note: 'App 即將上架',
      // 車主模式只放車主手機，劇本全部是車主視角
      chapters: [
        { key: 'find', label: '找店', caption: '打開地圖，附近的汽車美容店一目了然。' },
        { key: 'book', label: '預約', caption: '價格先看清楚；已經排滿的時段，不會讓你選。' },
        { key: 'confirm', label: '確認', caption: '送出預約，店家確認後馬上通知你。' },
        { key: 'done', label: '完成', caption: '預約成功，到店才付款。' },
      ],
      // 手機左右兩側、隨章節出現的重點卡
      callouts: [
        [{ title: '★ 4.9', text: '真實車主評價' }, { title: '0.8 km', text: '依距離找附近的店' }],
        [{ title: 'NT$1,200', text: '價格先看清楚再預約' }, { title: '12:00 已滿', text: '排滿的時段不能選' }],
        [{ title: '信用卡驗證', text: '首次預約驗證，確保預約誠信' }, { title: '即時通知', text: '店家確認後馬上告訴你' }],
        [{ title: '到店付款', text: '平台不經手你的錢' }, { title: `${RATE_SELF}% 回饋`, text: '每次消費都能累積點數' }],
      ],
    },
    merchant: {
      eyebrow: '創始店家招募中',
      line1: '讓好技術，',
      line2: '被更多車主看見。',
      sub: '車主線上預約，系統依工位自動排程，你只要專心施工。\n前 50 家創始店家終生免月費。',
      primary: { label: '申請創始名額', href: '#join', external: false },
      secondary: '我是車主',
      note: '簽署意向書即可鎖定資格',
      // 店家模式保留雙手機：讓店家看到「車主在那邊下單，你這邊馬上收到」
      chapters: [
        { key: 'found', label: '被找到', caption: '車主在地圖上，找到附近的你。' },
        { key: 'booked', label: '被預約', caption: '車主選服務、選時段，排滿的時段不會被約走。' },
        { key: 'accept', label: '接單', caption: '你立刻收到通知，接不接由你決定。' },
        { key: 'schedule', label: '排程', caption: '確認後自動排進今日行程，車主到店付款給你。' },
      ],
    },
    phoneLabels: { owner: '車主 App', merchant: '店家 App' },
  },

  demo: {
    shop: { name: '晨光汽車美容', rating: '4.9', distance: '0.8 km' },
    customer: '林先生',
    date: '9/19（六）',
    service: { name: '精緻洗車', size: '中型車', price: 1200, duration: '1.5 小時' },
    otherService: { name: '奈米鍍膜', size: '中型車', price: 6800 },
    slots: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
    fullSlot: '12:00',
    pickedSlot: '14:00',
    merchantStart: { revenue: 800, orders: 1 },
    existingJob: { time: '10:00–11:30', who: '王小姐', service: '內裝清潔' },
    newJobTime: '14:00–15:30',
  },

  scheduler: {
    owner: {
      eyebrow: '預約一定有位',
      title: '看得到的時段，\n就一定有位。',
      sub: '時段跟著店內工位即時更新，不會預約了才發現排不進去。',
      panelTitle: '選擇時段',
      hint: '選一個服務，再點時段試試',
      booked: (time: string, svc: string) => `已預約 ${time} ${svc}，店家確認後會通知你`,
      rule: '不同服務的施工時間不同，所以同一家店，洗車和鍍膜能選的時段也不一樣。',
    },
    merchant: {
      eyebrow: '工位排程',
      title: '工位排滿，就不會再被預約。',
      sub: '設定工位數與施工時長，系統自動排入預約；現場客也記在同一份行事曆，不會超賣。',
      panelTitle: '車主端看到的時段',
      hint: '點一個時段，模擬車主預約',
      booked: (time: string, svc: string, bay: number) => `車主預約 ${time} ${svc}，已排入工位 ${bay}`,
      rule: '只要任一工位有足夠的連續空檔，時段就開放；所有工位都排不下，就顯示已滿。',
    },
    boardTitle: '今日工位',
    legend: { platform: '平台預約', walkin: '現場客' },
    services: [
      { key: 'wash', name: '精緻洗車', units: 3 },
      { key: 'wax', name: '打蠟', units: 2 },
      { key: 'interior', name: '內裝清潔', units: 4 },
      { key: 'coating', name: '奈米鍍膜', units: 8 },
    ],
  },

  // ════════════════════════════ 車主版區塊 ════════════════════════════
  price: {
    eyebrow: '價格透明',
    title: '同一項服務，\n價格先看清楚。',
    sub: '附近每家店的價格、評價、距離放在一起比，不用一家一家打電話問。',
    services: [
      { key: 'wash', name: '精緻洗車' },
      { key: 'wax', name: '打蠟' },
      { key: 'interior', name: '內裝清潔' },
      { key: 'coating', name: '奈米鍍膜' },
    ],
    sorts: [
      { key: 'distance', label: '距離最近' },
      { key: 'price', label: '價格最低' },
      { key: 'rating', label: '評價最高' },
    ],
    shops: [
      { name: '晨光汽車美容', rating: 4.9, reviews: 128, km: 0.8, prices: { wash: 1200, wax: 1800, interior: 2500, coating: 6800 } },
      { name: '北辰洗車站', rating: 4.5, reviews: 210, km: 0.5, prices: { wash: 600, wax: 1200, interior: 1800, coating: 5800 } },
      { name: '青木車體工坊', rating: 4.7, reviews: 86, km: 1.6, prices: { wash: 900, wax: 1500, interior: 2200, coating: 7500 } },
      { name: '鏡面美研所', rating: 5.0, reviews: 42, km: 2.3, prices: { wash: 1500, wax: 2200, interior: 3000, coating: 9800 } },
      { name: '光點汽車精品', rating: 4.8, reviews: 64, km: 3.1, prices: { wash: 1100, wax: 1700, interior: 2600, coating: 8200 } },
    ],
    note: '示範資料，實際價格以店家頁面為準。',
  },

  pay: {
    eyebrow: '到店付款',
    title: '到店才付款，\n預約更安心。',
    sub: '平台不經手你的錢。首次預約時驗證信用卡，是為了讓每一個預約都算數。',
    steps: [
      { title: '首次預約，驗證信用卡', text: '作為預約的誠信擔保，之後預約不用再驗證。' },
      { title: '準時到店，享受服務', text: '店家已經為你保留好工位，到了就能施工。' },
      { title: '現場付款給店家', text: '服務完成後直接付給店家，平台不經手金流。' },
    ],
    note: '若預約後無故未到，將收取違約保證金，比例以 App 公告為準。',
  },

  referral: {
    eyebrow: '邀請回饋',
    title: '邀請朋友，\n一起累積點數。',
    sub: `自己消費，回饋 ${RATE_SELF}%。朋友用你的邀請碼加入後，他每次消費，他自己得 ${RATE_SELF}%，你另外再得 ${RATE_REFERRAL}%。`,
    rates: { self: RATE_SELF, referral: RATE_REFERRAL },
    code: 'CL-8K2Q',
    you: '你',
    friend: '朋友',
    linkLabel: '用你的邀請碼加入',
    chips: { you: '你消費', friend: '朋友消費' },
    actions: { you: '模擬你消費', friend: '模擬朋友消費' },
    table: { who: '誰消費', you: '你得到', friend: '朋友得到' },
    diagramLabel: `你消費時你得到 ${RATE_SELF}% 回饋；朋友消費時朋友得到 ${RATE_SELF}%，你另外得到 ${RATE_REFERRAL}%`,
    steps: [
      '分享你的邀請碼給朋友',
      '朋友用邀請碼註冊加入',
      `你自己消費，得到 ${RATE_SELF}% 回饋`,
      `朋友消費，他得 ${RATE_SELF}%，你再得 ${RATE_REFERRAL}%`,
    ],
    note: '回饋比例以 App 公告為準。',
  },

  meets: {
    eyebrow: '車聚',
    title: '一個人開車，\n不如一群人。',
    sub: '在 App 發起車聚，或報名附近的活動，認識同樣愛車的人。',
    events: [
      { title: '灣岸', date: '9/19（六）14:00', place: '大黑 PA', tags: ['日系', '改裝車'], joined: 4, cap: 10 },
      { title: '北海岸晨間兜風', date: '9/20（日）06:30', place: '萬里遊客中心', tags: ['不限車種'], joined: 7, cap: 15 },
      { title: '歐系夜聚', date: '9/26（六）21:00', place: '內湖科學園區', tags: ['歐系'], joined: 9, cap: 12 },
      { title: '山路攝影日', date: '10/3（六）09:00', place: '陽明山擎天崗', tags: ['攝影', '新手友善'], joined: 3, cap: 8 },
    ],
    create: { title: '發起車聚', text: '在 App 裡設定時間、地點和人數上限，就能邀大家一起來。' },
  },

  ownerFaq: {
    eyebrow: '常見問題',
    title: '車主常見問題',
    items: [
      { q: '預約之後要怎麼付款？', a: '服務完成後，在店裡直接付款給店家。平台不經手金流。' },
      { q: '為什麼要驗證信用卡？', a: '首次預約需要驗證信用卡，作為預約的誠信擔保，避免有人預約後不到、讓時段被浪費。若預約後無故未到，會收取違約保證金，比例以 App 公告為準。' },
      { q: '回饋點數怎麼拿？', a: `自己在平台上消費，可獲得 ${RATE_SELF}% 回饋點數。朋友用你的邀請碼加入後，他每次消費，他自己得到 ${RATE_SELF}%，你另外再得到 ${RATE_REFERRAL}%。回饋比例以 App 公告為準。` },
      { q: '車聚是什麼？', a: '車主可以在 App 發起車聚活動，設定時間、地點和人數上限，其他車主就能報名參加。' },
      { q: 'App 什麼時候上架？', a: 'App 即將上架。加入 LINE 官方帳號，上架時會第一時間通知你。' },
    ],
  },

  ownerCta: {
    title: '找對的店，\n從這裡開始。',
    sub: 'App 即將上架。加入 LINE 官方帳號，上架第一時間通知你。',
    button: '加入 LINE 官方帳號',
    qrLabel: '手機掃描加入 LINE',
    lineId: '@058byofv',
  },

  // ════════════════════════════ 店家版區塊 ════════════════════════════
  idle: {
    eyebrow: '空檔成本',
    title: '空檔，\n是你看不見的成本。',
    sub: '師傅在、場地在、租金照付，就是沒有車。算算看，一年流失多少。',
    pains: [
      { title: '電話接不完', text: '施工中滿手泡沫接不了，客人打兩通沒人接就走了。' },
      { title: '新客找不到你', text: '除了熟客，只能靠 Google 地圖碰運氣。' },
      { title: '淡旺季落差大', text: '旺季忙到翻，淡季空到慌，客流無法預測。' },
      { title: '施工空檔＝純損失', text: '平日下午常常空著，成本卻一分不少。' },
    ],
    calc: {
      price: { label: '平均客單價', min: 500, max: 5000, step: 100, value: 2000 },
      slots: { label: '每週空檔時段', min: 1, max: 20, step: 1, value: 3 },
      weekly: '每週潛在流失',
      yearly: '一年約',
      note: '以每個空檔都補上一筆訂單計算，僅供參考。',
    },
  },

  storeApp: {
    eyebrow: '店家版 App',
    title: '接不接單，\n你說了算。',
    sub: '營業時間、可預約時段、要不要接單，全部由你設定。',
    cards: [
      { key: 'hours', title: '設定營業時間', text: '訂出每天可以被預約的範圍，公休日一鍵關閉。' },
      { key: 'accept', title: '接單自主決定', text: '收到預約通知，接或不接由你決定；逾時未回覆會自動取消。' },
      { key: 'block', title: '彈性封閉時段', text: '臨時有事，點一下就能關閉任一時段。' },
      { key: 'private', title: '私約行事曆', text: '平台外的客人也能登記在同一份行事曆，不計入平台服務費。' },
    ],
  },

  noShow: {
    eyebrow: '放鳥保護',
    title: '客人放鳥，\n不再是純損失。',
    sub: '車主首次預約就要驗證信用卡。惡意未到，平台收取違約保證金，並補償給你。',
    steps: [
      { title: '車主預約', text: '信用卡已驗證' },
      { title: '預約時間到', text: '工位已為他保留' },
      { title: '客人未到', text: '店家回報未到店' },
      { title: '補償店家', text: '違約保證金補償空檔損失' },
    ],
    replay: '重播',
    note: '違約保證金比例以合作契約為準。',
  },

  money: {
    eyebrow: '金流透明',
    title: '錢，直接進你的口袋。',
    sub: '客人到店付款給你，平台不經手金流；服務費每週依成交金額結算。',
    nodes: { owner: '車主', shop: '你的店', platform: 'Carllection' },
    flows: [
      { label: '現場付款', detail: '全額付給店家' },
      { label: '每週結算', detail: '成交金額 15%' },
    ],
    checks: ['平台不經手金流，你直接收款', '綠界科技信用卡驗證，安全合規', '每週固定結算，帳目清楚'],
  },

  plans: {
    eyebrow: '合作方案',
    title: '前 50 家，\n終生免月費。',
    sub: '創始店家與一般店家的服務費相同，差別在月費，以及誰先開始累積評價。',
    columns: { item: '項目', founder: '創始店家（前 50 名）', standard: '一般店家' },
    rows: [
      { item: '月費', founder: '終生免費', standard: 'NT$699 / 月' },
      { item: '平台服務費', founder: '成交訂單 15%（週結）', standard: '成交訂單 15%（週結）' },
      { item: '初期曝光', founder: '先行者曝光優勢', standard: '與既有店家共同競爭' },
      { item: '上線時機', founder: '最早進場、最早累積評價', standard: '正式上線後才進場' },
      { item: '專屬支援', founder: '一對一導入輔導', standard: '標準客服支援' },
    ],
    seatsTitle: '創始名額',
    seatsLeft: (left: number, total: number) => `剩餘 ${left} / ${total} 席`,
  },

  join: {
    eyebrow: '申請入駐',
    title: '留下資料，\n專員主動聯繫你。',
    sub: '不用準備任何文件。填完表單，專員會在 1–3 個工作天內聯繫你，後續流程一步步帶著你走。',
    steps: [
      { title: '填寫申請', text: '1 分鐘填完基本資料' },
      { title: '專員聯繫', text: '說明合作方式與上架流程' },
      { title: '簽署意向書', text: '鎖定創始店家資格' },
      { title: '上架接單', text: '店家頁面上線，開始接受預約' },
    ],
    form: {
      title: '店家入駐申請',
      shop: '店家名稱',
      contact: '聯絡人姓名',
      phone: '手機號碼',
      email: 'Email',
      service: '主要服務類型',
      // value 需與 Google 表單的選項一致，不能隨意修改
      options: [
        { value: '美容', label: '汽車美容' },
        { value: '保養', label: '保養維修' },
        { value: '改裝', label: '改裝' },
      ],
      submit: '送出申請',
      loading: '送出中…',
      consent: '送出即表示你同意我們以你提供的資訊聯繫你，詳見',
      privacy: '隱私權政策',
      errors: {
        shop: '請填寫店家名稱',
        contact: '請填寫聯絡人姓名',
        phone: '請填寫手機號碼',
        phoneInvalid: '手機號碼格式有誤',
        email: '請填寫 Email',
        emailInvalid: 'Email 格式有誤',
        service: '請選擇主要服務類型',
      },
      failed: '送出失敗，請稍後再試，或直接來電',
      fallbackPhone: { display: '0916-789-758', tel: 'tel:+886916789758' },
      success: { title: '申請已送出', body: '感謝你的申請，專員會在 1–3 個工作天內與你聯繫。', back: '再填一份' },
    },
  },

  merchantFaq: {
    eyebrow: '常見問題',
    title: '店家常見問題',
    items: [
      { q: '創始店家要付哪些費用？', a: '前 50 家創始店家終生免月費，只有成交訂單收取 15% 平台服務費，每週結算。' },
      { q: '一般店家怎麼收費？', a: '一般店家月費 NT$699，另收成交訂單 15% 平台服務費，每週結算。' },
      { q: '客人怎麼付款？平台會先收錢嗎？', a: '不會。客人到店直接付款給你，平台不經手金流。服務費每週依成交金額結算，由店家匯款給平台。' },
      { q: '客人預約了卻沒來怎麼辦？', a: '車主首次預約需驗證信用卡。惡意未到會收取違約保證金，其中一部分補償給店家，比例以合作契約為準。' },
      { q: '可以拒絕預約嗎？', a: '可以。收到預約後由你決定接或不接，逾時未回覆，預約會自動取消。' },
      { q: '平台外的客人也能管理嗎？', a: '可以。私約行事曆能登記現場客和熟客，和平台預約放在同一份行事曆，不計入平台服務費。' },
    ],
  },

  merchantCta: {
    line: '用 LINE 詢問',
  },

  footer: {
    tagline: '汽車美容預約平台。\n讓車主找到好店，讓好技術被看見。',
    groups: {
      audience: '身分',
      contact: '聯絡我們',
      company: '公司',
    },
    contact: [
      { label: 'carllectiontw@gmail.com', href: 'mailto:carllectiontw@gmail.com' },
      { label: 'LINE @058byofv', href: LINE_URL },
      { label: 'Instagram', href: 'https://www.instagram.com/carllection.tw/' },
      { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61590372430581' },
    ],
    company: '俥盛科技有限公司',
    address: '台北市中正區重慶南路一段57號10樓之17',
    privacy: { label: '隱私權政策', href: '/privacy' },
  },
} as const
