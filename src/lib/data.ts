export interface GroupBuyProduct {
  id: string;
  slug: string;
  name: string;
  groupBuyName: string;
  description: string;
  images: string[];
  originalPrice: number;
  groupBuyPrice: number;
  combos: ProductCombo[];
  store: Store;
  endTime: string; // ISO date string
  totalSlots: number;
  filledSlots: number;
  category: string;
  tags: string[];
  specs: { label: string; value: string }[];
  shippingMethods: ShippingMethod[];
  paymentMethods: PaymentMethod[];
}

export interface ProductCombo {
  id: string;
  name: string;
  quantity: number;
  pricePerItem: number;
  discount: number; // percentage
}

export interface Store {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  location: string;
  responseRate: number;
}

export type ShippingMethod = "standard" | "express" | "store-pickup";
export type PaymentMethod = "cod" | "credit-card" | "bank-transfer";

export const shippingMethodLabels: Record<ShippingMethod, string> = {
  standard: "標準配送 (3-5天)",
  express: "快速到貨 (1-2天)",
  "store-pickup": "超商取貨",
};

export const paymentMethodLabels: Record<PaymentMethod, string> = {
  cod: "貨到付款",
  "credit-card": "信用卡付款",
  "bank-transfer": "銀行轉帳",
};

export const shippingCosts: Record<ShippingMethod, number> = {
  standard: 60,
  express: 120,
  "store-pickup": 45,
};

const now = new Date();

function futureDate(hours: number): string {
  return new Date(now.getTime() + hours * 60 * 60 * 1000).toISOString();
}

export const stores: Store[] = [
  {
    id: "store-1",
    name: "美食嚴選旗艦店",
    avatar: "",
    rating: 4.9,
    location: "台北市",
    responseRate: 98,
  },
  {
    id: "store-2",
    name: "3C科技生活館",
    avatar: "",
    rating: 4.8,
    location: "新北市",
    responseRate: 95,
  },
  {
    id: "store-3",
    name: "居家好物嚴選",
    avatar: "",
    rating: 4.7,
    location: "台中市",
    responseRate: 92,
  },
  {
    id: "store-4",
    name: "時尚穿搭集合店",
    avatar: "",
    rating: 4.6,
    location: "高雄市",
    responseRate: 90,
  },
];

export const categories = [
  "全部",
  "美食",
  "3C科技",
  "居家生活",
  "時尚穿搭",
  "美妝保養",
  "親子用品",
];

export const products: GroupBuyProduct[] = [
  {
    id: "1",
    slug: "premium-beef-noodle",
    name: "頂級紅燒牛肉麵禮盒 (6入裝)",
    groupBuyName: "🔥 年度最狂牛肉麵團購",
    description:
      "嚴選澳洲穀飼牛腱，搭配秘製紅燒湯頭，經過48小時慢燉。每一口都能感受到牛肉的鮮甜與湯頭的濃郁。禮盒包裝，送禮自用兩相宜。",
    images: [
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555126634-323283e090fa?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=600&h=600&fit=crop",
    ],
    originalPrice: 1280,
    groupBuyPrice: 888,
    combos: [
      { id: "c1-1", name: "單盒 (6入)", quantity: 1, pricePerItem: 888, discount: 31 },
      { id: "c1-2", name: "雙盒優惠 (12入)", quantity: 2, pricePerItem: 828, discount: 35 },
      { id: "c1-3", name: "家庭號 (18入)", quantity: 3, pricePerItem: 778, discount: 39 },
    ],
    store: stores[0],
    endTime: futureDate(47),
    totalSlots: 500,
    filledSlots: 387,
    category: "美食",
    tags: ["限時搶購", "免運費", "熱賣"],
    specs: [
      { label: "份量", value: "每包450g (麵+湯+肉)" },
      { label: "保存期限", value: "冷凍180天" },
      { label: "產地", value: "台灣" },
      { label: "過敏原", value: "含小麥、大豆" },
    ],
    shippingMethods: ["standard", "express"],
    paymentMethods: ["cod", "credit-card", "bank-transfer"],
  },
  {
    id: "2",
    slug: "wireless-earbuds-pro",
    name: "ANC 降噪藍牙耳機 Pro Max",
    groupBuyName: "💎 旗艦降噪耳機 限量團購",
    description:
      "搭載最新 ANC 3.0 主動降噪技術，40dB 深度降噪。Hi-Res 認證音質，藍牙 5.3 穩定連線。IPX5 防水等級，運動通勤皆適用。續航力高達 36 小時。",
    images: [
      "https://images.unsplash.com/photo-1549206464-82c129240d11?q=80&w=1170&fit=crop",
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
    ],
    originalPrice: 3990,
    groupBuyPrice: 2490,
    combos: [
      { id: "c2-1", name: "單入", quantity: 1, pricePerItem: 2490, discount: 38 },
      { id: "c2-2", name: "雙人同行價", quantity: 2, pricePerItem: 2290, discount: 43 },
    ],
    store: stores[1],
    endTime: futureDate(23),
    totalSlots: 300,
    filledSlots: 241,
    category: "3C科技",
    tags: ["限時搶購", "新品首發"],
    specs: [
      { label: "藍牙版本", value: "5.3" },
      { label: "降噪深度", value: "40dB" },
      { label: "續航力", value: "36小時 (含充電盒)" },
      { label: "防水等級", value: "IPX5" },
    ],
    shippingMethods: ["standard", "express", "store-pickup"],
    paymentMethods: ["credit-card", "bank-transfer"],
  },
  {
    id: "3",
    slug: "aroma-diffuser-set",
    name: "日式無印風香氛水氧機套組",
    groupBuyName: "🌿 療癒香氛 居家必備團購",
    description:
      "極簡木紋設計，融入居家風格。超音波霧化技術，靜音運轉不到 30dB。附贈三瓶天然精油 (薰衣草、尤加利、甜橙)。300ml 大容量，可連續使用 8 小時。",
    images: [
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=600&h=600&fit=crop",
    ],
    originalPrice: 1680,
    groupBuyPrice: 990,
    combos: [
      { id: "c3-1", name: "基本組 (機+3精油)", quantity: 1, pricePerItem: 990, discount: 41 },
      { id: "c3-2", name: "豪華組 (機+6精油)", quantity: 1, pricePerItem: 1280, discount: 24 },
      { id: "c3-3", name: "閨蜜分享組 (2機+6精油)", quantity: 2, pricePerItem: 920, discount: 45 },
    ],
    store: stores[2],
    endTime: futureDate(71),
    totalSlots: 200,
    filledSlots: 123,
    category: "居家生活",
    tags: ["好評推薦", "免運費"],
    specs: [
      { label: "容量", value: "300ml" },
      { label: "材質", value: "PP + 木紋飾面" },
      { label: "噪音值", value: "< 30dB" },
      { label: "附贈精油", value: "薰衣草 / 尤加利 / 甜橙" },
    ],
    shippingMethods: ["standard", "store-pickup"],
    paymentMethods: ["cod", "credit-card"],
  },
  {
    id: "4",
    slug: "korean-fashion-set",
    name: "韓系質感穿搭三件組",
    groupBuyName: "👗 春夏韓系穿搭 閨蜜團購",
    description:
      "韓國設計師聯名款，包含：棉麻襯衫 + 高腰寬褲 + 編織腰帶。舒適透氣面料，適合春夏穿搭。多色可選，尺寸 S-XL。",
    images: [
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=600&fit=crop",
    ],
    originalPrice: 2580,
    groupBuyPrice: 1580,
    combos: [
      { id: "c4-1", name: "三件組", quantity: 1, pricePerItem: 1580, discount: 39 },
      { id: "c4-2", name: "姊妹雙人組", quantity: 2, pricePerItem: 1380, discount: 47 },
      { id: "c4-3", name: "團隊三人組", quantity: 3, pricePerItem: 1280, discount: 50 },
    ],
    store: stores[3],
    endTime: futureDate(95),
    totalSlots: 150,
    filledSlots: 67,
    category: "時尚穿搭",
    tags: ["新品上架", "設計師聯名"],
    specs: [
      { label: "材質", value: "棉麻混紡" },
      { label: "尺寸", value: "S / M / L / XL" },
      { label: "顏色", value: "米白 / 淺藍 / 焦糖" },
      { label: "洗滌方式", value: "手洗或柔洗" },
    ],
    shippingMethods: ["standard", "express", "store-pickup"],
    paymentMethods: ["cod", "credit-card", "bank-transfer"],
  },
  {
    id: "5",
    slug: "skincare-set-premium",
    name: "CICA 積雪草修護精華套組",
    groupBuyName: "✨ 敏感肌救星 美妝團購",
    description:
      "韓國皮膚科醫師推薦，含積雪草萃取精華。套組包含：潔面乳 150ml + 化妝水 200ml + 精華液 50ml + 面霜 50ml。溫和不刺激，敏感肌適用。",
    images: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556227702-5ec9eb8df3ff?q=80&w=687&fit=crop",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=600&fit=crop",
    ],
    originalPrice: 2980,
    groupBuyPrice: 1880,
    combos: [
      { id: "c5-1", name: "基礎四件組", quantity: 1, pricePerItem: 1880, discount: 37 },
      { id: "c5-2", name: "加贈面膜組 (四件+5片面膜)", quantity: 1, pricePerItem: 2180, discount: 27 },
      { id: "c5-3", name: "雙人分享組", quantity: 2, pricePerItem: 1680, discount: 44 },
    ],
    store: stores[0],
    endTime: futureDate(35),
    totalSlots: 400,
    filledSlots: 356,
    category: "美妝保養",
    tags: ["即將售罄", "免運費", "熱賣"],
    specs: [
      { label: "膚質", value: "所有膚質，特別適合敏感肌" },
      { label: "主要成分", value: "積雪草萃取、玻尿酸、神經醯胺" },
      { label: "產地", value: "韓國" },
      { label: "保存期限", value: "未開封3年" },
    ],
    shippingMethods: ["standard", "express"],
    paymentMethods: ["credit-card", "bank-transfer"],
  },
  {
    id: "6",
    slug: "kids-learning-tablet",
    name: "兒童學習平板 KidsPad 10吋",
    groupBuyName: "📚 家長首選學習平板 團購",
    description:
      "專為 3-12 歲兒童設計，內建超過 500 款教育 APP。家長管控模式，設定使用時間。10 吋護眼螢幕，通過 SGS 低藍光認證。防摔矽膠保護殼。",
    images: [
      "https://images.unsplash.com/photo-1544256718-3bcf237f3974?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=600&fit=crop",
    ],
    originalPrice: 5990,
    groupBuyPrice: 3990,
    combos: [
      { id: "c6-1", name: "標準組 (平板+保護殼)", quantity: 1, pricePerItem: 3990, discount: 33 },
      { id: "c6-2", name: "學習組 (平板+殼+觸控筆)", quantity: 1, pricePerItem: 4290, discount: 28 },
      { id: "c6-3", name: "雙寶組 (2平板+2殼)", quantity: 2, pricePerItem: 3690, discount: 38 },
    ],
    store: stores[1],
    endTime: futureDate(59),
    totalSlots: 100,
    filledSlots: 45,
    category: "親子用品",
    tags: ["新品首發", "教育推薦"],
    specs: [
      { label: "螢幕", value: "10.1吋 IPS 護眼螢幕" },
      { label: "處理器", value: "八核心 2.0GHz" },
      { label: "儲存空間", value: "64GB (可擴充至256GB)" },
      { label: "電池", value: "6000mAh，續航約8小時" },
    ],
    shippingMethods: ["standard", "express", "store-pickup"],
    paymentMethods: ["cod", "credit-card"],
  },
  {
    id: "7",
    slug: "fitness-smartwatch",
    name: "多功能運動智能手錶 FitTrack Pro",
    groupBuyName: "⌚ 運動健身智能手錶 團購",
    description:
      "24/7 心率監測，內建 GPS 定位。超過 20 種運動模式，游泳防水等級 IP68。長達 10 天續航力，支援 iOS 和 Android。",
    images: [
      "https://images.unsplash.com/photo-1587400519568-1fe0329bfb2e?q=80&w=1170&fit=crop",
      "https://images.unsplash.com/photo-1609096458733-95b38583ac4e?q=80&w=774&fit=crop",
      "https://images.unsplash.com/photo-1548192422-d808605b392c?q=80&w=881&fit=crop",
    ],
    originalPrice: 4990,
    groupBuyPrice: 2990,
    combos: [
      { id: "c7-1", name: "單入", quantity: 1, pricePerItem: 2990, discount: 40 },
      { id: "c7-2", name: "雙人組", quantity: 2, pricePerItem: 2790, discount: 44 },
    ],
    store: stores[2],
    endTime: futureDate(83),
    totalSlots: 250,
    filledSlots: 198,
    category: "3C科技",
    tags: ["限時搶購", "運動推薦"],
    specs: [
      { label: "心率監測", value: "24/7 全天候監測" },
      { label: "運動模式", value: "超過20種運動類型" },
      { label: "防水等級", value: "IP68" },
      { label: "續航力", value: "長達10天" },
    ],
    shippingMethods: ["standard", "express"],
    paymentMethods: ["credit-card", "bank-transfer"],
  },
  {
    id: "8",
    slug: "eco-friendly-lunchbox",
    name: "環保無毒分隔便當盒",
    groupBuyName: "🍱 環保便當盒 團購",
    description:
      "採用食品級矽膠和不鏽鋼材質，無毒安全。分隔設計，適合多種菜色。微波爐和洗碗機安全使用。附贈專用餐具組。",
    images: [
      "https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?q=80&w=1025&fit=crop",
      "https://images.unsplash.com/photo-1501985361980-0805fb5d4b21?q=80&w=1170&fit=crop",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=600&fit=crop",
    ],
    originalPrice: 1280,
    groupBuyPrice: 890,
    combos: [
      { id: "c8-1", name: "單入", quantity: 1, pricePerItem: 890, discount: 30 },
      { id: "c8-2", name: "家庭組 (4入)", quantity: 4, pricePerItem: 790, discount: 38 },
    ],
    store: stores[3],
    endTime: futureDate(29),
    totalSlots: 350,
    filledSlots: 275,
    category: "居家生活",
    tags: ["環保推薦", "免運費"],
    specs: [
      { label: "材質", value: "食品級矽膠 + 不鏽鋼" },
      { label: "容量", value: "1200ml (分隔設計)" },
      { label: "適用", value: "微波爐、洗碗機" },
      { label: "附贈", value: "專用餐具組" },
    ],
    shippingMethods: ["standard", "store-pickup"],
    paymentMethods: ["cod", "credit-card"],
  },
  {
    id: "9",
    slug: "organic-tea-giftset",
    name: "有機花草茶禮盒組",
    groupBuyName: "🍵 有機花草茶 團購",
    description:
      "嚴選台灣本土有機花草，包含：玫瑰花茶、洋甘菊茶、薄荷茶。每款茶葉皆通過 SGS 認證，無農藥殘留。精美禮盒包裝，適合送禮或自用。",
    images: [
      "https://images.unsplash.com/photo-1728034261780-94beccf0eaec?q=80&w=870&fit=crop",
      "https://images.unsplash.com/photo-1728034261791-29837ce14109?q=80&w=870&fit=crop",
      "https://images.unsplash.com/photo-1728034261705-3881bdb1b247?q=80&w=870&fit=crop",
    ],
    originalPrice: 980,
    groupBuyPrice: 680,
    combos: [
      { id: "c9-1", name: "單盒 (3款茶葉)", quantity: 1, pricePerItem: 680, discount: 31 },
      { id: "c9-2", name: "雙盒優惠 (6款茶葉)", quantity: 2, pricePerItem: 620, discount: 37 },
    ],
    store: stores[0],
    endTime: futureDate(53),
    totalSlots: 150,
    filledSlots: 112,
    category: "美食",
    tags: ["有機認證", "送禮推薦"],
    specs: [
      { label: "內容物", value: "玫瑰花茶 / 洋甘菊茶 / 薄荷茶" },
      { label: "重量", value: "每款茶葉100g" },
      { label: "保存期限", value: "12個月" },
      { label: "產地", value: "台灣" },
    ],
    shippingMethods: ["standard", "store-pickup"],
    paymentMethods: ["cod", "credit-card"],
  },
  {
    id: "10",
    slug: "portable-blender-pro",
    name: "便攜式隨行果汁機 Pro",
    groupBuyName: "🍹 隨行果汁機 團購",
    description:
      "強勁馬達，輕鬆打碎冰塊和水果。USB-C 充電，續航力可製作15杯果汁。安全鎖設計，使用更安心。附贈清潔刷，方便清洗。",
    images: [
      "https://plus.unsplash.com/premium_photo-1717749801344-8ed38d55aead?q=80&w=870&fit=crop",
      "https://plus.unsplash.com/premium_photo-1727346922952-efa1433d946b?q=80&w=1170&fit=crop",
      "https://plus.unsplash.com/premium_photo-1727346922996-1a9bc6dd0e0e?q=80&w=1170&fit=crop",
    ],
    originalPrice: 1980,
    groupBuyPrice: 1280,
    combos: [
      { id: "c10-1", name: "單入", quantity: 1, pricePerItem: 1280, discount: 35 },
      { id: "c10-2", name: "雙人組", quantity: 2, pricePerItem: 1180, discount: 40 },
    ],
    store: stores[1],
    endTime: futureDate(17),
    totalSlots: 200,
    filledSlots: 156,
    category: "居家生活",
    tags: ["限時搶購", "夏日推薦"],
    specs: [
      { label: "容量", value: "500ml" },
      { label: "材質", value: "食品級塑料" },
      { label: "續航力", value: "可製作15杯果汁" },
      { label: "充電方式", value: "USB-C" },
    ],
    shippingMethods: ["standard", "express"],
    paymentMethods: ["credit-card", "bank-transfer"],
  }
];

export function getProductBySlug(slug: string): GroupBuyProduct | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): GroupBuyProduct | undefined {
  return products.find((p) => p.id === id);
}
