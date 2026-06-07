export const content = {
  meta: {
    title: 'Carmate ｜ 養車大小事，App 全搞定',
    description: 'Carmate 是台灣車主的智慧養車生態系 App，串接汽車美容、保養維修、改裝升級三大服務。',
    lang: 'zh-Hant' as const,
    brandName: 'Carmate',
    brandNameZh: '卡媒',
  },

  nav: {
    links: [
      { label: '給車主', href: '#owners' },
      { label: '給店家', href: '#merchants' },
      { label: '招商方案', href: '#recruit' },
      { label: '合作流程', href: '#faq-anchor' },
    ],
    cta: { label: '我要入駐', href: '#form' },
  },

  hero: {
    badge: {
      number: 50,
      text: '限量前 50 名合作店家・終生免月費',
    },
    headline: {
      line1: '養車大小事，',
      accent: 'App 全搞定。',
    },
    lead: 'Carmate 是專為台灣車主打造的智慧養車生態系。從汽車美容、保養維修到改裝升級，一鍵比價、線上預約、即時回饋。',
    appStore: { url: '#' },
    googlePlay: { url: '#' },
    stats: [
      { value: 120, suffix: '', label: '合作店家＋' },
      { value: 3485, suffix: '', label: '註冊車主' },
      { value: 98, suffix: '%', label: '滿意回饋' },
    ],
    chips: [
      { text: '汽車美容', icon: 'Sparkles' },
      { text: '保養維修', icon: 'Wrench' },
      { text: '就近找店', icon: 'MapPin' },
      { text: '改裝升級', icon: 'Gauge' },
      { text: '點數回饋', icon: 'Gem' },
      { text: '車友圈', icon: 'UsersRound' },
    ],
    phoneScreen: {
      appName: 'Carmate',
      searchPlaceholder: '搜尋服務、店家或商品',
      login: {
        title: '請登入',
        sub: '登入享專屬會員優惠',
        bindCar: '綁定車輛',
        points: { label: '回饋點數', value: 0, cta: '立即賺點' },
      },
      tiles: [
        { label: '汽車美容', icon: 'Sparkles' },
        { label: '定期保養', icon: 'Wrench' },
        { label: '動力改裝', icon: 'Gauge' },
        { label: '車友圈', icon: 'UsersRound' },
      ],
      promo: {
        tag: '專業汽車美容',
        title: '極致潔淨・完美閃耀',
        cta: '立即預約',
      },
      shops: {
        title: '附近熱門店家',
        more: '查看更多',
        items: [
          { name: '極速車業 1 號店', meta: '營業中・彰化', rating: 5.0, distance: '2.6 km' },
        ],
      },
      tabBar: [
        { label: '首頁', icon: 'Home', active: true },
        { label: '店家預約', icon: 'CalendarClock', active: false },
        { label: '車友圈', icon: 'UsersRound', active: false },
        { label: '商城', icon: 'ShoppingBag', active: false },
        { label: '我的', icon: 'User', active: false },
      ],
    },
  },

  trust: [
    { value: 120, unit: '＋', label: '合作店家遍布全台' },
    { value: 3, unit: '大類服務', label: '美容・保養・改裝' },
    { value: 60, unit: '秒', label: '完成線上預約' },
    { value: 24, unit: '/7', label: '客服與通知' },
  ],

  owners: {
    eyebrow: 'FOR CAR OWNERS',
    title: '給車主，省時、省錢、省煩惱',
    sub: '不再為了找一間靠譜的店家打十通電話。所有報價、評價、可預約時段，都在 App 裡看得到。',
    features: [
      { icon: 'Search', title: '就近找店', desc: '定位附近的美容、保養、改裝專業店家，篩選服務、距離、價格、評分。' },
      { icon: 'Layers', title: '多家比價', desc: '同一服務一次比較多家報價與評價，做出最划算的決定。' },
      { icon: 'CalendarClock', title: '線上預約', desc: '查看店家可預約時段，60 秒完成預約，免電話、免來回確認。' },
      { icon: 'UsersRound', title: '車友圈互動', desc: '加入車友圈分享愛車、交流改裝心得，邀請好友還能賺回饋點數。' },
    ],
  },

  merchants: {
    eyebrow: 'FOR MERCHANTS',
    title: '給店家，把空檔變成穩定營收',
    sub: 'Carmate 把車主直接帶到您的店門口。我們處理曝光、預約與會員管理，您專心做擅長的事。',
    cards: [
      { num: '01', title: '精準流量曝光', desc: '在地車主搜尋服務時即見店家，依距離、評價、價格智慧排序，省下廣告投放成本。' },
      { num: '02', title: '填滿空檔時段', desc: '線上行事曆讓車主自助預約您的閒置工位，平日離峰時段也能穩定接單。' },
      { num: '03', title: '會員與回頭率', desc: '內建回饋點數、會員等級與行銷推播，把一次性客人，變成長期客戶。' },
    ],
  },

  recruit: {
    eyebrow: '早鳥優惠・名額限量',
    title: '前 50 間 合作店家，終生免月費。',
    body: 'Carmate 正在打造全台最完整的養車服務網絡。前 50 間入駐店家可享一輩子免月費合作方案，優先曝光、優先媒合、優先進駐商城。我們把最好的給最早相信我們的夥伴。',
    cta: '立即申請入駐',
    counter: {
      label: '剩餘名額',
      left: 48,   // ← 唯一需要手動更新的數字，其他文字自動換算
      total: 50,
    },
  },

  process: {
    eyebrow: '入駐流程',
    title: '3 步驟，最快 5 個工作天上架',
    sub: '流程精簡，專屬商務窗口協助您完成設定，您只需要專心服務客戶。',
    steps: [
      { icon: 'FileEdit', step: 'STEP 01', title: '填寫入駐表單', desc: '提供店家基本資訊、主要服務類型與聯絡方式，1 分鐘完成。' },
      { icon: 'BadgeCheck', step: 'STEP 02', title: '專員審核諮詢', desc: '商務窗口將於 1–3 個工作天聯繫，協助店家驗證並規劃服務上架。' },
      { icon: 'Rocket', step: 'STEP 03', title: '正式上架接單', desc: '店家頁面上線、開放預約、加入會員回饋體系，立即接單。' },
    ],
  },

  pricing: {
    eyebrow: '合作方案',
    title: '透明定價，沒有隱藏費用',
    sub: '早鳥前 50 名終生免月費，之後加入的店家可選擇彈性月費方案。',
    plans: [
      {
        featured: true,
        tag: '早鳥限量・前 50 名',
        name: '創始夥伴方案',
        currency: 'NT$',
        price: 0,
        per: '/ 月・終生',
        sub: '享有與標準方案完全相同的功能，永久免月費。',
        features: [
          '店家完整曝光與預約系統',
          '店家頁面與服務項目自主設定',
          '專屬「創始夥伴」標章',
          '優先推薦曝光與商城進駐權',
        ],
        note: '* 須於額滿前完成入駐與審核，名額用罄即不再開放。',
      },
      {
        featured: false,
        tag: '標準方案',
        name: '一般合作方案',
        currency: 'NT$',
        price: 799,
        per: '/ 月',
        sub: '適用於前 50 名額滿之後加入的合作店家。',
        features: [
          '店家完整曝光與預約系統',
          '店家頁面與服務項目自主設定',
          '專屬商務窗口與每月對帳報表',
          '免綁約・隨時暫停或退出',
        ],
        note: '* 訂單抽成另計，依服務類別合作合約為準。',
      },
    ],
  },

  form: {
    eyebrow: '我要入駐',
    title: '留下資訊，\n專員 1–3 個工作天內聯繫您。',
    sub: '您不需準備任何文件，先填表單，後續流程我們會帶著您一步步走。',
    bullets: [
      '免綁約、免上架費',
      '__QUOTA__',
      '您的聯絡資訊僅供 Carmate 商務專員使用',
    ],
    card: {
      title: '店家入駐申請',
      note: '＊ 為必填欄位',
    },
    fields: {
      shop:    { label: '店家名稱',   placeholder: '例：極速車業',        autocomplete: 'organization' },
      contact: { label: '聯絡人姓名', placeholder: '例：王小明',           autocomplete: 'name' },
      phone:   { label: '手機號碼',   placeholder: '例：0912 345 678',    autocomplete: 'tel' },
      email:   { label: 'Email',      placeholder: 'contact@example.com', autocomplete: 'email' },
      service: {
        label: '主要服務類型',
        options: [
          { value: '美容', label: '美容', icon: 'Sparkles' },
          { value: '保養', label: '保養', icon: 'Wrench' },
          { value: '改裝', label: '改裝', icon: 'Gauge' },
        ],
      },
    },
    submit:  { label: '送出申請', loading: '送出中...' },
    consent: '送出即表示您同意我們以您提供的資訊聯繫您。',
    errors: {
      shopRequired:    '請填寫店家名稱',
      contactRequired: '請填寫聯絡人姓名',
      phoneRequired:   '請填寫手機號碼',
      phoneInvalid:    '手機號碼格式有誤',
      emailRequired:   '請填寫 Email',
      emailInvalid:    'Email 格式有誤',
      serviceRequired: '請選擇主要服務類型',
    },
    success: {
      title: '申請已送出！',
      body:  '感謝您的申請。Carmate 商務專員將於 1–3 個工作天內透過 Email 與您聯繫，請留意您的收件匣。',
      back:  '回到表單',
    },
  },

  footer: {
    tagline: 'Carmate（卡媒）是台灣車主的智慧養車生態系。一個 App，搞定養車大小事。',
    columns: [
      {
        title: '產品',
        links: [
          { label: '下載 App Store',  href: '#' },
          { label: '下載 Google Play', href: '#' },
          { label: '給車主',           href: '#owners' },
          { label: '給店家',           href: '#merchants' },
        ],
      },
      {
        title: '合作',
        links: [
          { label: '招商方案', href: '#recruit' },
          { label: '店家入駐', href: '#form' },
          { label: '商城合作', href: '#' },
          { label: '媒體聯繫', href: '#' },
        ],
      },
    ],
    contact: [
      { icon: 'Mail',   value: 'partner@carmate.tw' },
      { icon: 'Phone',  value: '+886 2 2700 0000' },
      { icon: 'MapPin', value: '台北市中正區重慶南路一段57號10樓之17' },
    ],
    copy: '© 2026 Carmate Inc. 卡媒科技股份有限公司・統編 12345678',
    legal: [
      { label: '隱私權政策', href: '#' },
      { label: '服務條款',   href: '#' },
      { label: 'Cookie 設定', href: '#' },
    ],
  },
} as const
