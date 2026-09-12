"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sidebar, ActiveTab } from "@/components/navigation/Sidebar";
import { WorkflowAutomatorTab } from "@/components/tabs/WorkflowAutomatorTab";
import { MarketTrendsTab } from "@/components/tabs/MarketTrendsTab";
import { CampaignCalendarTab } from "@/components/tabs/CampaignCalendarTab";
import { LinkVaultTab } from "@/components/tabs/LinkVaultTab";
import { CalculatorTab } from "@/components/tabs/CalculatorTab";
import { IncomeGoalsTab } from "@/components/tabs/IncomeGoalsTab";
import { MONTHLY_STRATEGIES } from "@/lib/constants";
import { Zap, Calendar, Target, ShieldCheck } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("automator");
  const [aiProduct, setAiProduct] = useState("");
  const [aiUrl, setAiUrl] = useState("");

  const currentMonth = new Date().getMonth();
  const currentStrategy = MONTHLY_STRATEGIES[currentMonth] || MONTHLY_STRATEGIES[8];

  const handleSendToAI = (productName: string, productUrl: string) => {
    setAiProduct(productName);
    setAiUrl(productUrl);
    setActiveTab("automator");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Background Ambience Glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-fuchsia-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Workspace */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        {/* Top Floating Header Ribbon */}
        <header className="px-6 md:px-10 py-4 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl sticky top-0 z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400">Current Sales Cycle:</span>
            <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 px-3 py-1 rounded-full text-xs font-bold text-orange-400">
              <Zap className="w-3.5 h-3.5" />
              <span>{currentStrategy.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>Next Payday: <strong className="text-white">25th</strong></span>
            </div>
            <div className="h-3 w-px bg-slate-800" />
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-300 font-semibold">Anti-Cap Protection: ON</span>
            </div>
          </div>
        </header>

        {/* Tab Content Rendering with Fluid Animation */}
        <div className="flex-1 p-6 md:p-10 max-w-6xl w-full mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === "automator" && (
              <WorkflowAutomatorTab
                key="automator"
                initialProduct={aiProduct}
                initialUrl={aiUrl}
              />
            )}
            {activeTab === "trends" && <MarketTrendsTab key="trends" />}
            {activeTab === "calendar" && <CampaignCalendarTab key="calendar" />}
            {activeTab === "vault" && <LinkVaultTab key="vault" onSendToAI={handleSendToAI} />}
            {activeTab === "calculator" && <CalculatorTab key="calculator" />}
            {activeTab === "goals" && <IncomeGoalsTab key="goals" />}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
