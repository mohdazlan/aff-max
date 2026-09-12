"use client";

import { motion } from "framer-motion";
import { MONTHLY_TRENDS, CATEGORY_CONVERSIONS } from "@/lib/constants";
import { TrendingUp, ShieldAlert, Sparkles, ShoppingCart, Calendar } from "lucide-react";
import { useState } from "react";

export function MarketTrendsTab() {
  const [activeCategory, setActiveCategory] = useState<"skincare" | "homeDecor" | "tech" | "fashion">("skincare");

  const categoryLabels = {
    skincare: { name: "Skincare", color: "#ec4899", fill: "bg-pink-500" },
    homeDecor: { name: "Home Decor", color: "#eab308", fill: "bg-amber-500" },
    tech: { name: "Tech Gadgets", color: "#06b6d4", fill: "bg-cyan-500" },
    fashion: { name: "Modest Fashion", color: "#10b981", fill: "bg-emerald-500" },
  };

  const maxValue = 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-8"
    >
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold mb-3">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>SEA Demand Analytics</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">Market Trends & Peak Demand</h2>
        <p className="text-slate-400 text-sm mt-1 max-w-2xl">
          Discover what Southeast Asian shoppers are actively clicking. Time your affiliate campaigns around algorithmic spikes and holiday surges.
        </p>
      </div>

      {/* Annual Buyer Interest Chart Card */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              Annual Search & Click Volume (2026)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Notice high conversion velocity during Mega Sales (9.9 to 12.12) & Pre-Raya seasons.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {(Object.keys(categoryLabels) as Array<keyof typeof categoryLabels>).map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isSelected
                      ? "bg-slate-800 text-white border border-slate-600 shadow"
                      : "bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800"
                  }`}
                >
                  <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${categoryLabels[cat].fill}`} />
                  {categoryLabels[cat].name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="h-64 flex items-end justify-between gap-2 pt-8 pb-2 border-b border-slate-800">
          {MONTHLY_TRENDS.map((item, index) => {
            const val = item[activeCategory];
            const heightPercent = (val / maxValue) * 100;
            const isSpike = val >= 90;

            return (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group relative">
                {/* Tooltip on Hover */}
                <div className="absolute -top-8 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity border border-slate-700 pointer-events-none whitespace-nowrap z-20">
                  {item.month}: {val}% Interest
                </div>

                <div className="w-full max-w-[28px] bg-slate-950/80 rounded-t-lg h-full flex items-end p-0.5">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPercent}%` }}
                    transition={{ duration: 0.5, delay: index * 0.03, ease: "easeOut" }}
                    className={`w-full rounded-t-md transition-all ${
                      isSpike
                        ? "bg-gradient-to-t from-orange-500 to-fuchsia-500 shadow-[0_0_12px_rgba(249,115,22,0.4)]"
                        : "bg-gradient-to-t from-slate-700 to-slate-500 group-hover:from-cyan-500 group-hover:to-blue-500"
                    }`}
                  />
                </div>
                <span className={`text-[11px] font-medium ${isSpike ? "text-orange-400 font-bold" : "text-slate-500"}`}>
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid: Conversion Rates & Strategic Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Conversion Rates */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md shadow-xl">
          <h3 className="text-lg font-bold text-slate-100 mb-1">Conversion Velocity by Niche</h3>
          <p className="text-xs text-slate-400 mb-6">
            Lower impulse-price items (Stationery, Skincare) convert up to 3x higher on TikTok & Threads.
          </p>

          <div className="space-y-4">
            {CATEGORY_CONVERSIONS.map((cat, idx) => (
              <div key={cat.category}>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-300">{cat.category}</span>
                  <span className="text-cyan-400">{cat.rate}% Avg Conversion</span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(cat.rate / 7) * 100}%` }}
                    transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                    className={`h-full rounded-full bg-gradient-to-r ${cat.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Market Rules */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Strategic Affiliate Plays
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
                <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400 flex-shrink-0">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">The RM5 Cap Rule</h4>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    Standard Shopee commissions cap at RM5. Promoting high-turnover RM35 beauty items frequently beats struggling to sell a single RM180 gadget.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 flex-shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">The Pre-Raya Surge</h4>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    Modest fashion & home decor jump 150% in the 3-4 weeks *prior* to Raya. Push delivery cut-off angles before courier delays hit.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 flex-shrink-0">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">The 11.11 Halo Effect</h4>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    During Q4 Mega Days, visitors clicking your link for a RM10 pen frequently checkout an entire RM300 cart—granting you full attribution!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
