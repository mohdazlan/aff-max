export interface MonthlyTrendData {
  month: string;
  skincare: number;
  homeDecor: number;
  tech: number;
  fashion: number;
}

export const MONTHLY_TRENDS: MonthlyTrendData[] = [
  { month: "Jan", skincare: 65, homeDecor: 80, tech: 50, fashion: 40 },
  { month: "Feb", skincare: 68, homeDecor: 75, tech: 55, fashion: 60 },
  { month: "Mar", skincare: 75, homeDecor: 90, tech: 60, fashion: 95 },
  { month: "Apr", skincare: 80, homeDecor: 85, tech: 55, fashion: 100 },
  { month: "May", skincare: 85, homeDecor: 60, tech: 65, fashion: 50 },
  { month: "Jun", skincare: 90, homeDecor: 65, tech: 70, fashion: 45 },
  { month: "Jul", skincare: 85, homeDecor: 70, tech: 65, fashion: 50 },
  { month: "Aug", skincare: 80, homeDecor: 75, tech: 75, fashion: 65 },
  { month: "Sep", skincare: 95, homeDecor: 85, tech: 90, fashion: 70 },
  { month: "Oct", skincare: 90, homeDecor: 80, tech: 85, fashion: 65 },
  { month: "Nov", skincare: 100, homeDecor: 95, tech: 100, fashion: 80 },
  { month: "Dec", skincare: 90, homeDecor: 100, tech: 95, fashion: 75 },
];

export const CATEGORY_CONVERSIONS = [
  { category: "Stationery", rate: 6.5, color: "from-cyan-500 to-blue-600" },
  { category: "Skincare & Beauty", rate: 4.8, color: "from-fuchsia-500 to-pink-600" },
  { category: "Modest Fashion", rate: 3.9, color: "from-emerald-500 to-teal-600" },
  { category: "Home & Living", rate: 3.2, color: "from-amber-500 to-orange-600" },
  { category: "Tech Accessories", rate: 2.5, color: "from-purple-500 to-indigo-600" },
];

export const MONTHLY_STRATEGIES: Record<number, { name: string; categories: string; tip: string }> = {
  0: { name: "Refresh & Reset", categories: "Storage, Planners, Desk Setup", tip: "Push new year organization tools and health planners." },
  1: { name: "Festive Prep (CNY)", categories: "Red Fashion, Snack Gift Sets, Decor", tip: "CNY means high gifting spending. Push hampers & festive outfits." },
  2: { name: "Pre-Raya Rush", categories: "Modest Fashion, Telekung, Home Linens", tip: "Start pushing Raya fashion NOW before shipping cut-off dates!" },
  3: { name: "Raya Celebration", categories: "Kuih Raya, Beauty, Instant Hijabs", tip: "Focus on instant delivery beauty products and festive gifts." },
  4: { name: "Post-Festive Slump", categories: "Skincare, Budget Essentials, Snacks", tip: "Highlight low-ticket RM5-RM20 high-conversion deals." },
  5: { name: "Mid-Year Mega 6.6", categories: "Tech Gadgets, Luggage, Powerbanks", tip: "6.6 is massive for electronics and upcoming holiday travel gear." },
  6: { name: "Mid-Year Travel & Lifestyle", categories: "Sunscreen, Backpacks, Cute Cases", tip: "School holidays demand travel items and aesthetic accessories." },
  7: { name: "Merdeka / National Pride", categories: "Lokal Brands, Malaysian Snacks, Merdeka Tees", tip: "'Support Lokal' patriotic review angles generate high viral reach." },
  8: { name: "9.9 Kickoff Mega Sale", categories: "Beauty, Home Decor, Small Appliances", tip: "Build hype 3 days before double-digit day to capture Add-to-Cart intent." },
  9: { name: "10.10 Brand Fest", categories: "High-ticket Tech, Wireless Audio, Monitors", tip: "Publish 'Cart Reveal' breakdowns and unboxing previews early." },
  10: { name: "11.11 The Super Bowl", categories: "Everything! All-Category Bundles", tip: "Peak volume day of the year. Post 3x-4x daily across all platforms." },
  11: { name: "12.12 Year-End Clearance", categories: "Secret Santa Gifts, Planners, Holiday Sets", tip: "Push affordable gift guides under RM30 and 2027 calendars." },
};

export const MONTHLY_HOT_ITEMS: Record<number, string[]> = {
  0: ["Aesthetic 2026 Planner", "Muji-style Gel Pens", "Desktop Cable Organizer"],
  1: ["Mini Handheld Fan", "CNY Red Outfits", "Travel Toiletries Bag"],
  2: ["Baking Molds (Raya Prep)", "Affordable Pleated Shawls", "Baju Kurung Modern"],
  3: ["Long-lasting Setting Spray", "Instant Pinless Hijabs", "Aesthetic Kuih Jars"],
  4: ["Ergonomic Laptop Stand", "Noise-Cancelling Earbuds", "Minimalist Desk Lamp"],
  5: ["Waterproof Travel Backpack", "Local SPF50 Sunscreen", "20,000mAh Mini Powerbank"],
  6: ["Puffer iPad Case", "Corduroy Tote Bag", "Pastel Aesthetic Highlighters"],
  7: ["Local Brand Graphic Tees", "Salted Egg Snack Bundle", "Flexible Phone Tripod"],
  8: ["Mini Capsule UV Umbrella", "Silent Bluetooth Wireless Mouse", "Skintific Ceramide Moisturizer"],
  9: ["Custom Mechanical Keyboard", "Water-resistant Laptop Sleeve", "2L Motivational Water Bottle"],
  10: ["Room Fairy String Lights", "Viral COSRX Skincare Bundle", "1080P Smart Mini Projector"],
  11: ["RM20 Secret Santa Gift Box", "Insulated Ceramic Coffee Tumbler", "2027 Minimalist Desk Calendar"],
};

export const VIRAL_TEMPLATES = [
  "I spent RM___ testing the best ___ so you don't have to waste money. Here's the unfiltered winner:",
  "Unpopular opinion: this RM___ ___ from Shopee outperforms the viral RM150 brand everyone hypes.",
  "Stop scrolling! If you struggle with ___, this RM___ life-saver on Shopee is an absolute game-changer.",
  "TikTok made me buy this RM___ ___, and for once it actually exceeded all my expectations:",
  "3 hidden gems under RM25 on Shopee that genuinely upgraded my daily routine:",
];
