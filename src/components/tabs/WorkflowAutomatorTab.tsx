"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroInput } from "@/components/ui/HeroInput";
import { FloatingCard, ExtractionData } from "@/components/ui/FloatingCard";
import { 
  Sparkles, 
  Share2, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Flame, 
  FileText, 
  MessageSquare, 
  Hash, 
  Send,
  Zap,
  Sliders
} from "lucide-react";
import { MONTHLY_HOT_ITEMS, VIRAL_TEMPLATES } from "@/lib/constants";

const mockExtractions: Record<string, ExtractionData[]> = {
  default: [
    { id: "1", type: "pain_point", title: "Flimsy Packaging / Leaks", count: 1420, snippet: "Bottle pump was damaged upon delivery, spilled inside parcel." },
    { id: "2", type: "praise", title: "Instant Hydration Glow", count: 3200, snippet: "Fixed my damaged skin barrier in just 4 days. Absolutely glowing." },
    { id: "3", type: "pain_point", title: "Small Volume for Price", count: 890, snippet: "Jar is only 30g, runs out in 3 weeks if used daily." },
    { id: "4", type: "praise", title: "Non-Sticky Finish", count: 2450, snippet: "Absorbs immediately without any greasy residue under Malaysian humidity." },
  ]
};

interface WorkflowAutomatorTabProps {
  initialProduct?: string;
  initialUrl?: string;
}

export function WorkflowAutomatorTab({ initialProduct = "", initialUrl = "" }: WorkflowAutomatorTabProps) {
  const [product, setProduct] = useState(initialProduct);
  const [url, setUrl] = useState(initialUrl);
  const [vibe, setVibe] = useState("relatable and slightly unhinged");
  const [slangLevel, setSlangLevel] = useState("Manglish Infused (Lah/Sia/Gila)");
  const [isExtracting, setIsExtracting] = useState(false);
  const [hasExtracted, setHasExtracted] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string>("hook");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const currentMonth = new Date().getMonth();
  const hotItems = MONTHLY_HOT_ITEMS[currentMonth] || MONTHLY_HOT_ITEMS[8];

  const handleExtract = () => {
    setIsExtracting(true);
    setHasExtracted(false);
    setTimeout(() => {
      setIsExtracting(false);
      setHasExtracted(true);
    }, 1400);
  };

  const handleCopyText = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const currentProductName = product || "Viral Skintific Barrier Cream";

  // Dynamic campaign assets based on extracted angles
  const campaignAssets = {
    hook: `Stop buying RM180 serums until you test this RM38 holy grail. Everyone was complaining the packaging is small, but 2 pumps literally revived my skin under this insane KL heat. 10/10 unhinged recommendation.`,
    story: `[00:00 - 00:05] Hook: Show greasy face after being outside in 34°C weather. "I almost gave up on daytime moisturizer until I found this."\n[00:05 - 00:20] The Problem: "Most moisturizers in Shopee leave you looking like a frying pan after 1 hour."\n[00:20 - 00:45] The Proof: Apply 2 pumps. Show immediate velvet-matte absorption. "Zero stickiness, 5X ceramides, and actually survives Malaysian humidity."\n[00:45 - 00:60] CTA: "Grab it before the 9.9 vouchers run out below!"`,
    caption: `Honest review after 3 weeks: this is why it's breaking Shopee charts right now 👀 \n\nNo cap, the texture is insane for humid weather. Drop a 'LINK' in the comments and I'll DM you the official discounted store link! \n\n#ShopeeFinds #RacunShopee #SkincareMalaysia #TikTokShopMY #MalaysianBeauty`,
    dmReply: `Hey! 👋 Here is the official discount link with the extra 15% off voucher code applied: ${url || "https://shope.ee/sample-affiliate-link"} \n\nTip: Add to cart before 12AM tonight to claim free shipping!`,
  };

  const handlePostToThreads = () => {
    const text = encodeURIComponent(`${campaignAssets.hook}\n\n🔗 ${url || "https://shope.ee/..."}`);
    window.open(`https://www.threads.net/intent/post?text=${text}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-8 max-w-5xl"
    >
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Core AI Studio</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">Review-Mining & Hook Engine</h2>
        <p className="text-slate-400 text-sm mt-1 max-w-2xl">
          Extract consumer psychology triggers, scrape real customer complaints/praises, and morph them into high-converting multi-platform campaigns.
        </p>
      </div>

      {/* Persona Tone & Style Configuration Card */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Persona Synthesis ("You" Engine Preset)</span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/40">
            Cadence: Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Vibe / Angle Objective</label>
            <select
              value={vibe}
              onChange={(e) => setVibe(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
            >
              <option value="relatable and slightly unhinged">Relatable & Slightly Unhinged (High Viral)</option>
              <option value="brutally honest review">Brutally Honest Review (High Trust)</option>
              <option value="aesthetic and minimalist">Aesthetic & Minimalist (Aspirational)</option>
              <option value="life-hack / problem solver">Life-Hack & Problem Solver (High Utility)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Slang & Cadence</label>
            <select
              value={slangLevel}
              onChange={(e) => setSlangLevel(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
            >
              <option>Manglish Infused (Lah/Sia/Gila)</option>
              <option>Casual Urban Malaysian English</option>
              <option>Bahasa Melayu Santai / Racun TikTok</option>
              <option>Clean Global English</option>
            </select>
          </div>
        </div>
      </div>

      {/* Input Link Bar */}
      <div className="space-y-4">
        <HeroInput onExtract={handleExtract} />

        {/* Hot Trending Items Suggestions */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-bold text-cyan-400 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5" />
            Trending This Month:
          </span>
          {hotItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                setProduct(item);
                handleExtract();
              }}
              className="px-3 py-1 text-xs rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-white transition-all"
            >
              + {item}
            </button>
          ))}
        </div>

        {/* Viral Hooks Template Chips */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-2">
            💡 Quick Viral Starters
          </span>
          <div className="flex flex-wrap gap-2">
            {VIRAL_TEMPLATES.slice(0, 3).map((tmpl, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setProduct(tmpl);
                  handleExtract();
                }}
                className="text-left text-xs p-2.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-slate-100 transition-colors max-w-md"
              >
                "{tmpl}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mining Loading State */}
      {isExtracting && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 rounded-2xl bg-gradient-to-br from-cyan-950/30 via-slate-900 to-slate-950 border border-cyan-500/30 text-center space-y-3"
        >
          <div className="inline-block w-8 h-8 border-3 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <h3 className="text-lg font-bold text-white">Scraping Verified Buyer Reviews...</h3>
          <p className="text-xs text-slate-400">
            Synthesizing 4,200+ comments into psychological Pain Points and Praises for <strong>{currentProductName}</strong>.
          </p>
        </motion.div>
      )}

      {/* Extracted Floating Data Cards */}
      <AnimatePresence>
        {hasExtracted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Extracted Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-4">
                  <h3 className="text-sm font-bold text-fuchsia-400 uppercase tracking-wider">
                    Extracted Pain Points (To Solve)
                  </h3>
                  <span className="text-xs text-slate-500">2 Key Triggers</span>
                </div>
                <div className="flex flex-col gap-3">
                  {mockExtractions.default
                    .filter((d) => d.type === "pain_point")
                    .map((item, idx) => (
                      <FloatingCard key={item.id} data={item} index={idx} />
                    ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-4">
                  <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
                    Extracted Praises (To Amplify)
                  </h3>
                  <span className="text-xs text-slate-500">2 High-Conversion Signals</span>
                </div>
                <div className="flex flex-col gap-3">
                  {mockExtractions.default
                    .filter((d) => d.type === "praise")
                    .map((item, idx) => (
                      <FloatingCard key={item.id} data={item} index={idx} />
                    ))}
                </div>
              </div>
            </div>

            {/* "Campaign in a Box" Accordion Suite */}
            <div className="p-6 md:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-400" />
                    Campaign in a Box Suite
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Multi-asset content generated based on mined reviews & "{vibe}" tone.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePostToThreads}
                    className="bg-black hover:bg-slate-950 text-white font-bold px-4 py-2 rounded-xl border border-slate-700 shadow-md text-xs flex items-center gap-1.5 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    1-Click Post to Threads
                  </button>
                </div>
              </div>

              {/* Accordion Tabs */}
              <div className="space-y-3">
                {/* 1. Hook Script */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === "hook" ? "" : "hook")}
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-900/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                        <Flame className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-200">15s Anti-Sell Threads / Reel Hook</h4>
                        <p className="text-[11px] text-slate-400">High-curiosity hook built from top customer complaint</p>
                      </div>
                    </div>
                    {activeAccordion === "hook" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {activeAccordion === "hook" && (
                    <div className="p-4 pt-0 border-t border-slate-800/60 mt-3 space-y-3">
                      <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-200 leading-relaxed font-medium">
                        {campaignAssets.hook}
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleCopyText("hook", campaignAssets.hook)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
                        >
                          {copiedKey === "hook" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          Copy Hook
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Story Script */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === "story" ? "" : "story")}
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-900/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-fuchsia-500/10 text-fuchsia-400">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-200">60s Full TikTok / Reel Storyboard</h4>
                        <p className="text-[11px] text-slate-400">Timestamped script structure with visual directions</p>
                      </div>
                    </div>
                    {activeAccordion === "story" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {activeAccordion === "story" && (
                    <div className="p-4 pt-0 border-t border-slate-800/60 mt-3 space-y-3">
                      <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-wrap">
                        {campaignAssets.story}
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleCopyText("story", campaignAssets.story)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
                        >
                          {copiedKey === "story" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          Copy Storyboard
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. SEO Caption */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === "caption" ? "" : "caption")}
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-900/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                        <Hash className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-200">SEO Caption & Viral Hashtags</h4>
                        <p className="text-[11px] text-slate-400">Localized tags to rank in Malaysian search algorithms</p>
                      </div>
                    </div>
                    {activeAccordion === "caption" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {activeAccordion === "caption" && (
                    <div className="p-4 pt-0 border-t border-slate-800/60 mt-3 space-y-3">
                      <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                        {campaignAssets.caption}
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleCopyText("caption", campaignAssets.caption)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
                        >
                          {copiedKey === "caption" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          Copy Caption
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. DM Auto-Replies */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === "dm" ? "" : "dm")}
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-900/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-200">Automated DM Conversion Reply</h4>
                        <p className="text-[11px] text-slate-400">High-converting message template for 'LINK' comment triggers</p>
                      </div>
                    </div>
                    {activeAccordion === "dm" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {activeAccordion === "dm" && (
                    <div className="p-4 pt-0 border-t border-slate-800/60 mt-3 space-y-3">
                      <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                        {campaignAssets.dmReply}
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleCopyText("dm", campaignAssets.dmReply)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
                        >
                          {copiedKey === "dm" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          Copy DM Reply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
