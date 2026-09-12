"use client";

import { motion } from "framer-motion";
import { 
  Sparkles, 
  TrendingUp, 
  Calendar, 
  Link2, 
  Calculator, 
  Target,
  Zap,
  FlaskConical
} from "lucide-react";
import Link from "next/link";

export type ActiveTab = "automator" | "trends" | "calendar" | "vault" | "calculator" | "goals";

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const navItems = [
    {
      id: "automator" as ActiveTab,
      label: "AI Studio & Mining",
      icon: Sparkles,
      badge: "Core",
      color: "from-cyan-400 to-blue-500",
    },
    {
      id: "trends" as ActiveTab,
      label: "Market Trends",
      icon: TrendingUp,
      badge: null,
      color: "from-pink-500 to-rose-500",
    },
    {
      id: "calendar" as ActiveTab,
      label: "Campaign Calendar",
      icon: Calendar,
      badge: "SEA",
      color: "from-amber-400 to-orange-500",
    },
    {
      id: "vault" as ActiveTab,
      label: "Link Vault",
      icon: Link2,
      badge: null,
      color: "from-emerald-400 to-teal-500",
    },
    {
      id: "calculator" as ActiveTab,
      label: "Cap Calculator",
      icon: Calculator,
      badge: "RM5 Alert",
      color: "from-fuchsia-400 to-purple-500",
    },
    {
      id: "goals" as ActiveTab,
      label: "Income Goals",
      icon: Target,
      badge: null,
      color: "from-blue-400 to-cyan-500",
    },
  ];

  return (
    <aside className="w-full md:w-72 bg-slate-900/70 border-b md:border-b-0 md:border-r border-slate-800 backdrop-blur-xl flex-shrink-0 flex flex-col justify-between p-4 md:p-6 z-20">
      <div>
        {/* Logo Section */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 via-fuchsia-500 to-orange-500 p-[2px] shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              AW<span className="text-cyan-400">Flow</span>
            </h1>
            <p className="text-[11px] text-slate-400 font-medium">Affiliate Maximizer v2.5</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`relative w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "text-white shadow-lg bg-slate-800/90 border border-slate-700/60"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/15 via-fuchsia-500/10 to-transparent pointer-events-none"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}

                <div className="flex items-center gap-3 relative z-10">
                  <div className={`p-1.5 rounded-lg ${isActive ? "bg-slate-950/80 text-cyan-400 shadow-sm" : "text-slate-500"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`relative z-10 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive 
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30" 
                      : "bg-slate-800 text-slate-400"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Dedicated Science-Backed Page Link */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <Link
            href="/aff-max/science-backed"
            className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-cyan-950/40 via-emerald-950/20 to-slate-900 border border-cyan-500/30 hover:border-cyan-400/60 text-slate-200 hover:text-white transition-all shadow-md group"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                <FlaskConical className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-white">Science Studio</span>
                <span className="block text-[10px] text-cyan-400 font-medium">X & Threads Engine</span>
              </div>
            </div>
            <span className="text-[10px] font-extrabold bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-md border border-cyan-500/30">
              NEW
            </span>
          </Link>
        </div>
      </div>

      {/* Footer Info Card */}
      <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800/80">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-300">Live SEA Engine</span>
          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Active
          </span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Optimized for TikTok Shop MY & Shopee Malaysia algorithm updates.
        </p>
      </div>
    </aside>
  );
}
