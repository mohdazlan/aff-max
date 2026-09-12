"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Atom, 
  Sparkles, 
  Send, 
  Copy, 
  Check, 
  ExternalLink, 
  BookOpen, 
  FlaskConical, 
  ArrowLeft, 
  Share2, 
  ShieldCheck,
  MessageCircle,
  Info,
  AlertCircle
} from "lucide-react";

interface ScienceTopic {
  id: string;
  category: string;
  name: string;
  ingredient: string;
  mechanism: string;
  studyNote: string;
  sampleProduct: string;
  defaultLink: string;
}

const SCIENCE_TOPICS: ScienceTopic[] = [
  {
    id: "ceramides",
    category: "Dermatology & Skin Barrier",
    name: "Ceramide NP & Barrier Hydration",
    ingredient: "5X Bio-Identical Ceramides",
    mechanism: "Restores lipid lamellar matrix to stop nocturnal moisture evaporation.",
    studyNote: "J. Invest Dermatol (2023): Rebuilds skin barrier within 72 hours.",
    sampleProduct: "Ceramide Barrier Repair Gel",
    defaultLink: "https://shope.ee/ceramide-gel"
  },
  {
    id: "magnesium",
    category: "Neuroscience & Sleep",
    name: "Magnesium Glycinate & Deep Sleep",
    ingredient: "Chelated Magnesium Bisglycinate",
    mechanism: "Binds GABA-A receptors to calm central nervous system arousal.",
    studyNote: "Sleep Med Rev: +42% REM sleep duration without morning grogginess.",
    sampleProduct: "Chelated Magnesium Bisglycinate",
    defaultLink: "https://shope.ee/magnesium-glycinate"
  },
  {
    id: "ergonomics",
    category: "Biomechanics & Spine",
    name: "Lumbar Lordosis & Decompression",
    ingredient: "Adaptive Memory Ergonomic Support",
    mechanism: "Maintains natural 20-45° lumbar curve, cutting disc strain by 65%.",
    studyNote: "Eur Spine J: 64% reduction in lower back strain during 8h desk work.",
    sampleProduct: "Orthopedic Memory Lumbar Support",
    defaultLink: "https://shope.ee/lumbar-cushion"
  },
  {
    id: "rosemary",
    category: "Trichology & Hair Follicles",
    name: "Rosmarinic Acid & Follicle Density",
    ingredient: "Cold-Pressed Rosmarinus Extract",
    mechanism: "Inhibits scalp 5-alpha reductase & increases follicle blood flow.",
    studyNote: "Skinmed Trial: Regrowth rate on par with 2% Minoxidil without irritation.",
    sampleProduct: "Scalp Rosemary Follicle Tonic",
    defaultLink: "https://shope.ee/rosemary-tonic"
  },
  {
    id: "creatine",
    category: "Cellular Energy & ATP",
    name: "Creatine Monohydrate & ATP Shuttle",
    ingredient: "Creapure® Micronized Creatine",
    mechanism: "Replenishes cellular ATP in muscle tissue and prefrontal cortex.",
    studyNote: "JISSN: +14% power output and measurable working memory uplift.",
    sampleProduct: "100% Micronized Pure Creatine",
    defaultLink: "https://shope.ee/creatine-pure"
  },
  {
    id: "bluelight",
    category: "Photobiology & Eye Strain",
    name: "415-455nm HEV Blue Light Filter",
    ingredient: "Multi-layer Anti-Reflective Lenses",
    mechanism: "Filters peak oxidative 415-455nm light while protecting circadian 480nm.",
    studyNote: "Ophthalmic Physiol Opt: Dramatic reduction in digital eye fatigue.",
    sampleProduct: "Anti-Blue Light Computer Glasses",
    defaultLink: "https://shope.ee/blue-light-glasses"
  }
];

const THREADS_MAX_CHARS = 500;
const X_MAX_CHARS = 280;

export default function ScienceBackedPage() {
  const [selectedTopic, setSelectedTopic] = useState<ScienceTopic>(SCIENCE_TOPICS[0]);
  const [customProduct, setCustomProduct] = useState("");
  const [customMechanism, setCustomMechanism] = useState("");
  const [affiliateLink, setAffiliateLink] = useState(SCIENCE_TOPICS[0].defaultLink);
  const [postFormat, setPostFormat] = useState<"threads_breakdown" | "x_thread" | "myth_buster">("threads_breakdown");
  const [linkPlacement, setLinkPlacement] = useState<"reply_comment" | "in_post">("reply_comment");
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const activeProductName = customProduct.trim() || selectedTopic.sampleProduct;
  const activeMechanism = customMechanism.trim() || selectedTopic.mechanism;
  const activeIngredient = selectedTopic.ingredient;
  const activeStudy = selectedTopic.studyNote;
  const activeUrl = affiliateLink.trim() || "https://shope.ee/your-link";

  // Helper to ensure text strictly respects Threads 500-char limit
  const clampText = (text: string, maxLen: number = THREADS_MAX_CHARS): string => {
    if (text.length <= maxLen) return text;
    return text.substring(0, maxLen - 3) + "...";
  };

  // Generate scientific posts strictly optimized to stay under 500 chars for Threads & 280 for X
  const generatePosts = () => {
    if (postFormat === "myth_buster") {
      let mainPost = `Stop falling for marketing buzzwords. Here's the actual biochemistry of ${activeIngredient}:

Most people think standard creams work, but moisture evaporates in 45 mins under AC.

The peer-reviewed data:
🔬 Mechanism: ${activeMechanism}
📊 Study: ${activeStudy}

If you need a verified formula, check below ${linkPlacement === "in_post" ? `👇\n\n🔗 ${activeUrl}` : "👇"}`;

      let replyPost = `I vetted lab-tested formulations with pure ${activeIngredient} without filler fragrance.

Here is the authentic clinical batch on discount:
👉 ${activeUrl}

Drop your current routine in the replies if you want me to analyze your ingredient list! 💬`;

      return { 
        main: clampText(mainPost, THREADS_MAX_CHARS), 
        reply: clampText(replyPost, THREADS_MAX_CHARS) 
      };
    }

    if (postFormat === "x_thread") {
      let mainPost = `1/3 🧵 The science of why 90% of people waste money on ${selectedTopic.category.toLowerCase()}:

Let's look at ${activeIngredient} and cellular physiology.

A quick breakdown of how it works inside your body (and clinical data) 👇`;

      let thread2 = `2/3 🧬 The Biological Mechanism:

${activeMechanism}

Clinical benchmark: ${activeStudy}

Most commercial brands under-dose this. You need verified bio-identical actives.`;

      let replyPost = `3/3 💡 What to look for:

Found a lab-tested formula for "${activeProductName}" that delivers clinical concentrations without high markup.

${linkPlacement === "in_post" ? `🔗 Verified Link: ${activeUrl}` : `I linked the direct discount batch below 👇\n🔗 ${activeUrl}`}

What's your experience? Drop questions below!`;

      return { 
        main: clampText(mainPost, X_MAX_CHARS), 
        thread2: clampText(thread2, X_MAX_CHARS), 
        reply: clampText(replyPost, X_MAX_CHARS) 
      };
    }

    // Default: Threads Conversational Fact Drop (Strictly <= 500 chars)
    let mainPost = `Can we talk about the real science of ${activeProductName} for a sec? 🧬

Most brands sell hype, but clinical data tells a different story:

• Key Active: ${activeIngredient}
• Cellular Mechanism: ${activeMechanism}
• Clinical Trial: ${activeStudy}

Using ONE properly formulated item with this active completely beats buying 5 random hype products.

${linkPlacement === "in_post" ? `Verified lab-tested batch:\n🔗 ${activeUrl}` : "I dropped the verified lab link in the 1st reply so the algorithm doesn't throttle reach! 👇"}`;

    let replyPost = `Direct link to the authentic clinical batch on Shopee/TikTok Shop:
🔗 ${activeUrl}

Tip: Claim the shop voucher before checkout for the extra discount! Ask me anything in the replies! 🌿`;

    return { 
      main: clampText(mainPost, THREADS_MAX_CHARS), 
      reply: clampText(replyPost, THREADS_MAX_CHARS) 
    };
  };

  const generated = generatePosts();

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handlePostToX = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(generated.main)}`;
    window.open(url, "_blank");
  };

  const handlePostToThreads = (textToShare: string) => {
    const url = `https://www.threads.net/intent/post?text=${encodeURIComponent(textToShare)}`;
    window.open(url, "_blank");
  };

  const renderCharBadge = (len: number, max: number = THREADS_MAX_CHARS) => {
    const isOver = len > max;
    const isClose = len >= max - 30;

    return (
      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
        isOver 
          ? "bg-red-500/20 text-red-400 border border-red-500/30"
          : isClose
          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
          : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
      }`}>
        {isOver ? <AlertCircle className="w-3 h-3" /> : <Check className="w-3 h-3" />}
        {len} / {max} chars {isOver ? "(Exceeds Limit!)" : "(Threads Safe)"}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Background Glows */}
      <div className="fixed top-0 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Top Navbar */}
      <header className="px-6 md:px-12 py-4 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/aff-max"
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to AWFlow Hub
          </Link>

          <div className="h-4 w-px bg-slate-800" />

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-emerald-400 p-[1.5px]">
              <div className="w-full h-full bg-slate-950 rounded-[6.5px] flex items-center justify-center">
                <FlaskConical className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div>
              <h1 className="font-extrabold text-sm text-white tracking-tight flex items-center gap-2">
                Science-Backed Affiliate Studio
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                  500-Char Limit Enforced
                </span>
              </h1>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/40">
            <ShieldCheck className="w-3.5 h-3.5" />
            Threads & X Algorithm Safe
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto p-6 md:p-10 space-y-8">
        {/* Header Hero */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
            <Atom className="w-3.5 h-3.5" />
            <span>Factual Authority Marketing (500 Chars Limit)</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Science-Backed Conversion Engine
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-3xl leading-relaxed">
            Generate high-trust educational posts for <strong>Threads</strong> (strictly under 500 chars) and <strong>X.com</strong> (under 280 chars) that spark discussions, explain biological mechanisms, and seamlessly insert your affiliate links.
          </p>
        </div>

        {/* Studio Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Topics & Inputs */}
          <div className="lg:col-span-5 space-y-6">
            {/* 1. Science Topics Preset Selector */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                1. Select Proven Science Niche
              </h3>

              <div className="grid grid-cols-1 gap-2.5 max-h-[260px] overflow-y-auto pr-1">
                {SCIENCE_TOPICS.map((topic) => {
                  const isSelected = selectedTopic.id === topic.id;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => {
                        setSelectedTopic(topic);
                        setAffiliateLink(topic.defaultLink);
                        setCustomProduct("");
                        setCustomMechanism("");
                      }}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        isSelected
                          ? "bg-gradient-to-r from-cyan-950/60 to-slate-900 border-cyan-500/50 shadow-md"
                          : "bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-300"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-white">{topic.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-medium">
                          {topic.category.split("&")[0]}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{topic.ingredient}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Custom Product Details */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-emerald-400" />
                2. Product & Mechanism
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Product / Formulation Name
                </label>
                <input
                  type="text"
                  value={customProduct}
                  onChange={(e) => setCustomProduct(e.target.value)}
                  placeholder={`e.g. ${selectedTopic.sampleProduct}`}
                  className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Mechanism (Keep concise for 500-char limit)
                </label>
                <textarea
                  rows={2}
                  value={customMechanism}
                  onChange={(e) => setCustomMechanism(e.target.value)}
                  placeholder={selectedTopic.mechanism}
                  className="w-full px-3.5 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center justify-between">
                  <span>Your Affiliate Link</span>
                  <span className="text-[10px] text-cyan-400 font-bold">Auto-Inserted</span>
                </label>
                <input
                  type="url"
                  value={affiliateLink}
                  onChange={(e) => setAffiliateLink(e.target.value)}
                  placeholder="https://shope.ee/your-link"
                  className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors font-mono"
                />
              </div>
            </div>

            {/* 3. Format & Link Insertion Settings */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Share2 className="w-4 h-4 text-fuchsia-400" />
                3. Format & Strategy
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Target Platform Format</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setPostFormat("threads_breakdown")}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                      postFormat === "threads_breakdown"
                        ? "bg-cyan-950/50 border-cyan-500 text-cyan-300 shadow-sm"
                        : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    Threads Fact (&lt;500)
                  </button>
                  <button
                    onClick={() => setPostFormat("x_thread")}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                      postFormat === "x_thread"
                        ? "bg-cyan-950/50 border-cyan-500 text-cyan-300 shadow-sm"
                        : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    X Thread (&lt;280)
                  </button>
                  <button
                    onClick={() => setPostFormat("myth_buster")}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                      postFormat === "myth_buster"
                        ? "bg-cyan-950/50 border-cyan-500 text-cyan-300 shadow-sm"
                        : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    Myth Buster
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Link Placement
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setLinkPlacement("reply_comment")}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
                      linkPlacement === "reply_comment"
                        ? "bg-emerald-950/40 border-emerald-500 text-emerald-300 shadow-sm"
                        : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <span className="block font-bold">1st Reply Drop (Rec.)</span>
                    <span className="text-[10px] text-slate-400">Protects reach & char limit</span>
                  </button>
                  <button
                    onClick={() => setLinkPlacement("in_post")}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
                      linkPlacement === "in_post"
                        ? "bg-emerald-950/40 border-emerald-500 text-emerald-300 shadow-sm"
                        : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <span className="block font-bold">Direct in Post</span>
                    <span className="text-[10px] text-slate-400">Counts towards 500 chars</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Output with Character Limits */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 md:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-2xl space-y-6">
              {/* Output Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                    Generated Science Posts
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Strictly validated for Threads 500-character and X 280-character limitations.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePostToX}
                    className="bg-slate-950 hover:bg-black text-white font-bold px-3.5 py-2 rounded-xl border border-slate-700 shadow-md text-xs flex items-center gap-1.5 transition-all"
                  >
                    <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                    Post to X
                  </button>

                  <button
                    onClick={() => handlePostToThreads(generated.main)}
                    className="bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-extrabold px-3.5 py-2 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.3)] text-xs flex items-center gap-1.5 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Post Opener to Threads
                  </button>
                </div>
              </div>

              {/* Main Opening Post */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <MessageCircle className="w-3.5 h-3.5" />
                    Opening Post (Hook & Science Proof)
                  </span>
                  {renderCharBadge(generated.main.length, postFormat === "x_thread" ? X_MAX_CHARS : THREADS_MAX_CHARS)}
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-sm text-slate-200 leading-relaxed font-mono whitespace-pre-wrap relative">
                  {generated.main}
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handlePostToThreads(generated.main)}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                    1-Click Publish this Post to Threads
                  </button>

                  <button
                    onClick={() => handleCopy(generated.main, "main")}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
                  >
                    {copiedIndex === "main" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    Copy Post
                  </button>
                </div>
              </div>

              {/* Thread Part 2 (if X thread format) */}
              {generated.thread2 && (
                <div className="space-y-3 pt-3 border-t border-slate-800/60">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                    <span className="flex items-center gap-1.5 text-fuchsia-400">
                      <FlaskConical className="w-3.5 h-3.5" />
                      Thread Post 2/3 (Mechanism Breakdown)
                    </span>
                    {renderCharBadge(generated.thread2.length, X_MAX_CHARS)}
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-sm text-slate-200 leading-relaxed font-mono whitespace-pre-wrap">
                    {generated.thread2}
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => handleCopy(generated.thread2!, "thread2")}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
                    >
                      {copiedIndex === "thread2" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      Copy Thread 2
                    </button>
                  </div>
                </div>
              )}

              {/* Conversion Reply & Affiliate Link Drop */}
              <div className="space-y-3 pt-3 border-t border-slate-800/60">
                <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <ExternalLink className="w-3.5 h-3.5" />
                    {linkPlacement === "reply_comment" ? "1st Reply (Affiliate Link Drop)" : "Follow-Up Call To Action"}
                  </span>
                  {renderCharBadge(generated.reply.length, postFormat === "x_thread" ? X_MAX_CHARS : THREADS_MAX_CHARS)}
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-sm text-slate-200 leading-relaxed font-mono whitespace-pre-wrap">
                  {generated.reply}
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handlePostToThreads(generated.reply)}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                    1-Click Post Reply to Threads
                  </button>

                  <button
                    onClick={() => handleCopy(generated.reply, "reply")}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
                  >
                    {copiedIndex === "reply" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    Copy Link Drop
                  </button>
                </div>
              </div>
            </div>

            {/* Strategic Character Limit Tip */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Info className="w-4 h-4 text-cyan-400" />
                Threads 500-Character Constraint Strategy
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Threads strictly caps individual posts at <strong>500 characters</strong>. By splitting the scientific hook into the opening post and dropping the affiliate link in the <strong>1st reply</strong>, your post stays 100% compliant while avoiding algorithmic link throttling.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
