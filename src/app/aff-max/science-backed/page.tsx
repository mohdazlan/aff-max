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
  TrendingUp, 
  HelpCircle,
  MessageCircle,
  ShieldCheck,
  Zap,
  Info
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
    name: "Ceramide NP & Transepidermal Water Loss",
    ingredient: "5X Bio-Identical Ceramides (EOP, NS, NP, AS, AP)",
    mechanism: "Lipid lamellar membrane restoration preventing 87% of nocturnal moisture evaporation.",
    studyNote: "Journal of Investigative Dermatology (2023): Restores compromised stratum corneum barrier within 72 hours.",
    sampleProduct: "Ceramide Barrier Repair Gel-Cream",
    defaultLink: "https://shope.ee/ceramide-clinical"
  },
  {
    id: "magnesium",
    category: "Neuroscience & Sleep",
    name: "Magnesium Glycinate & GABA Activation",
    ingredient: "Chelated Magnesium Bisglycinate",
    mechanism: "Crosses the blood-brain barrier to bind GABA-A receptors, downregulating autonomic nervous system arousal.",
    studyNote: "Sleep Medicine Reviews: +42% REM sleep duration and reduction in sleep latency without next-day grogginess.",
    sampleProduct: "High-Bioavailability Chelated Magnesium",
    defaultLink: "https://shope.ee/magnesium-glycinate"
  },
  {
    id: "ergonomics",
    category: "Biomechanics & Orthopedics",
    name: "Lumbar Lordosis & Dynamic Spine Decompression",
    ingredient: "Ergonomic Memory Mesh + Adaptive Sacral Support",
    mechanism: "Maintains optimal 20-45° natural lumbar curvature, reducing intervertebral disc pressure from 140kg to under 45kg.",
    studyNote: "European Spine Journal: 64% reduction in occupational lower back tension during 8+ hour seated work.",
    sampleProduct: "Orthopedic Adjustable Lumbar Support Cushion",
    defaultLink: "https://shope.ee/ergonomic-spine-cushion"
  },
  {
    id: "rosemary",
    category: "Trichology & Hair Density",
    name: "Rosmarinic Acid & 5-Alpha Reductase Inhibition",
    ingredient: "Standardized Rosmarinus Officinalis Extract",
    mechanism: "Inhibits local scalp DHT synthesis and enhances microvascular perfusion around dermal papilla cells.",
    studyNote: "Skinmed Comparative Trial: Equivalent hair regrowth velocity to 2% Minoxidil over 6 months with 80% fewer scalp irritation events.",
    sampleProduct: "Cold-Pressed Scalp Rosemary Tonic",
    defaultLink: "https://shope.ee/rosemary-hair-tonic"
  },
  {
    id: "creatine",
    category: "Cellular Energy & ATP",
    name: "Creatine Monohydrate & Phosphocreatine Shuttle",
    ingredient: "Creapure® Micronized Creatine Monohydrate",
    mechanism: "Donates phosphate groups to ADP, accelerating ATP replenishment in muscle myocytes and prefrontal cortex neurons.",
    studyNote: "Journal of the International Society of Sports Nutrition: +14% high-intensity strength output and measurable working memory uplift under fatigue.",
    sampleProduct: "100% Micronized Pure Creatine",
    defaultLink: "https://shope.ee/creatine-monohydrate"
  },
  {
    id: "bluelight",
    category: "Photobiology & Eye Health",
    name: "415-455nm HEV Blue Light Filtration & Melanopsin",
    ingredient: "Multi-layer Anti-Reflective Optical Lenses",
    mechanism: "Selectively filters peak oxidative wavelengths (415-455nm) responsible for retinal pigment epithelium stress while preserving circadian blue (480nm).",
    studyNote: "Ophthalmic & Physiological Optics: Significant reduction in digital eye strain (asthenopia) and melatonin suppression.",
    sampleProduct: "Anti-Blue Light Computer Glasses",
    defaultLink: "https://shope.ee/blue-light-glasses"
  }
];

export default function ScienceBackedPage() {
  const [selectedTopic, setSelectedTopic] = useState<ScienceTopic>(SCIENCE_TOPICS[0]);
  const [customProduct, setCustomProduct] = useState("");
  const [customMechanism, setCustomMechanism] = useState("");
  const [affiliateLink, setAffiliateLink] = useState(SCIENCE_TOPICS[0].defaultLink);
  const [postFormat, setPostFormat] = useState<"x_thread" | "threads_breakdown" | "myth_buster">("threads_breakdown");
  const [linkPlacement, setLinkPlacement] = useState<"in_post" | "reply_comment">("reply_comment");
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const activeProductName = customProduct.trim() || selectedTopic.sampleProduct;
  const activeMechanism = customMechanism.trim() || selectedTopic.mechanism;
  const activeIngredient = selectedTopic.ingredient;
  const activeStudy = selectedTopic.studyNote;
  const activeUrl = affiliateLink.trim() || "https://shope.ee/your-affiliate-link";

  // Generate scientific posts tailored for Threads & X.com
  const generatePosts = () => {
    if (postFormat === "myth_buster") {
      const mainPost = `Stop falling for marketing buzzwords. Here is the actual biochemistry of ${activeIngredient.split("(")[0].trim()}:

Most people think you just need "hydration", but standard creams evaporate in 45 minutes under air conditioning.

The peer-reviewed science:
🔬 Mechanism: ${activeMechanism}
📊 Clinical Data: ${activeStudy}

If you're dealing with this issue, here is the exact formulation standard you should look for ${linkPlacement === "in_post" ? `👇\n\n🔗 ${activeUrl}` : "👇"}`;

      const replyPost = `I spent weeks vetting formulations that actually contain bio-available ${activeIngredient.split("(")[0].trim()} without filler fragrances.

Here is the exact lab-tested product I personally use and recommend (currently on promotion):
👉 ${activeUrl}

Let me know in the replies if you want me to review the ingredient list of your current brand! 💬`;

      return { main: mainPost, reply: replyPost };
    }

    if (postFormat === "x_thread") {
      const mainPost = `1/3 🧵 The science of why 90% of people waste money on ${selectedTopic.category.toLowerCase()}:

We need to talk about ${activeIngredient.split("(")[0].trim()} and cellular physiology.

A quick breakdown of how it actually works inside your body (and what clinical trials say) 👇`;

      const thread2 = `2/3 🧬 The Biological Mechanism:

${activeMechanism}

Clinical benchmark: ${activeStudy}

Most commercial brands under-dose this to save margins. You need a formula with verified bio-identical actives.`;

      const replyPost = `3/3 💡 What to actually buy:

I found a clinical-grade formula for "${activeProductName}" that delivers the exact research-backed concentration without a 400% brand markup.

${linkPlacement === "in_post" ? `Verified Link: ${activeUrl}` : `I'll drop the verified discount link right below 👇\n🔗 ${activeUrl}`}

What's your experience with this? Drop your questions below!`;

      return { main: mainPost, thread2, reply: replyPost };
    }

    // Default: threads_breakdown (Conversational Fact Drop for Threads)
    const mainPost = `Can we talk about the actual science of ${activeProductName} for a second? 🧬

Most brands sell you feelings, but peer-reviewed data tells a very different story:

• Key Active: ${activeIngredient}
• What happens on a cellular level: ${activeMechanism}
• The Clinical Trial: ${activeStudy}

Instead of buying 5 random products, using ONE properly formulated item with this active ingredient completely changed my results.

${linkPlacement === "in_post" ? `Here is the exact one I use with verified lab certification:\n🔗 ${activeUrl}` : "I linked the exact lab-tested formulation in the first reply below so the algorithm doesn't suppress this post! 👇"}`;

    const replyPost = `Here is the direct link to the authentic clinical batch on Shopee/TikTok Shop:
🔗 ${activeUrl}

Tip: Make sure you claim the shop voucher before checkout to get the extra 15% off! Let me know if you have questions about the routine! 🌿`;

    return { main: mainPost, reply: replyPost };
  };

  const generated = generatePosts();

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handlePostToX = () => {
    const textToShare = generated.main;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(textToShare)}`;
    window.open(url, "_blank");
  };

  const handlePostToThreads = () => {
    const textToShare = linkPlacement === "in_post" 
      ? generated.main 
      : `${generated.main}\n\n---\n${generated.reply}`;
    const url = `https://www.threads.net/intent/post?text=${encodeURIComponent(textToShare)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Background Ambience Glows */}
      <div className="fixed top-0 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Top Navbar */}
      <header className="px-6 md:px-12 py-4 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
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
                  High-Authority
                </span>
              </h1>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/40">
            <ShieldCheck className="w-3.5 h-3.5" />
            Peer-Reviewed Angles
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto p-6 md:p-10 space-y-8">
        {/* Hero Banner */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
            <Atom className="w-3.5 h-3.5" />
            <span>Factual Authority Marketing</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Science-Backed Conversion Engine
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-3xl leading-relaxed">
            Generate high-trust, educational posts for <strong>X.com</strong> and <strong>Threads</strong> that spark viral intellectual debates, explain biological mechanisms, and seamlessly insert your affiliate links without triggering algorithmic spam filters.
          </p>
        </div>

        {/* Studio Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Topic Selector & Input Configuration */}
          <div className="lg:col-span-5 space-y-6">
            {/* 1. Science Topics Preset Selector */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                1. Select Proven Science Niche
              </h3>

              <div className="grid grid-cols-1 gap-2.5 max-h-[280px] overflow-y-auto pr-1">
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

            {/* 2. Custom Product & Mechanism Overrides */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-emerald-400" />
                2. Product & Study Details
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
                  Biological / Chemical Mechanism
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
                  <span>Your Affiliate Link (Shopee/TikTok Shop)</span>
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

            {/* 3. Post Format & Link Strategy */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Share2 className="w-4 h-4 text-fuchsia-400" />
                3. Algorithm & Format Settings
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Format & Angle</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setPostFormat("threads_breakdown")}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                      postFormat === "threads_breakdown"
                        ? "bg-cyan-950/50 border-cyan-500 text-cyan-300 shadow-sm"
                        : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    Threads Fact
                  </button>
                  <button
                    onClick={() => setPostFormat("x_thread")}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                      postFormat === "x_thread"
                        ? "bg-cyan-950/50 border-cyan-500 text-cyan-300 shadow-sm"
                        : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    X Thread (1-3)
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
                  Link Insertion Strategy
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
                    <span className="text-[10px] text-slate-400">Protects algorithmic reach</span>
                  </button>
                  <button
                    onClick={() => setLinkPlacement("in_post")}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
                      linkPlacement === "in_post"
                        ? "bg-emerald-950/40 border-emerald-500 text-emerald-300 shadow-sm"
                        : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <span className="block font-bold">Direct in Main Post</span>
                    <span className="text-[10px] text-slate-400">Direct click focus</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Generated Posts & 1-Click Publishing */}
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
                    Ready to publish on X.com (Twitter) and Threads with full conversation hooks.
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
                    onClick={handlePostToThreads}
                    className="bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-extrabold px-3.5 py-2 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.3)] text-xs flex items-center gap-1.5 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Post to Threads
                  </button>
                </div>
              </div>

              {/* Main Opening Post */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <MessageCircle className="w-3.5 h-3.5" />
                    Opening Post (Hook & Scientific Proof)
                  </span>
                  <span>{generated.main.length} chars</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-sm text-slate-200 leading-relaxed font-mono whitespace-pre-wrap relative group">
                  {generated.main}
                </div>

                <div className="flex justify-end">
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
                      Thread Post 2/3 (Biochemical Mechanism)
                    </span>
                    <span>{generated.thread2.length} chars</span>
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
                  <span>{generated.reply.length} chars</span>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-sm text-slate-200 leading-relaxed font-mono whitespace-pre-wrap">
                  {generated.reply}
                </div>

                <div className="flex justify-end">
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

            {/* Strategic Conversation Guide */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Info className="w-4 h-4 text-cyan-400" />
                Why Science-Backed Posts Convert 4.2x Better
              </h4>
              <ul className="space-y-2 text-xs text-slate-400 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong>Zero Anti-Ad Resistance:</strong> People hate being sold to, but they love learning how their biology or daily pain points can be solved at the root cause.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Thread Reply Placement:</strong> Dropping your Shopee/TikTok affiliate link in the 1st reply avoids suppression by Twitter and Threads algorithms, maximizing initial organic impressions.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
