"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Target, TrendingUp, Calendar, Zap, Award } from "lucide-react";

export function IncomeGoalsTab() {
  const [target, setTarget] = useState<number>(3000);
  const [current, setCurrent] = useState<number>(1250);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysLeft = Math.max(daysInMonth - day, 1);

  const percentage = Math.min((current / (target || 1)) * 100, 100);
  const dailyAvg = day > 0 ? current / day : 0;
  const projectedEOM = dailyAvg * daysInMonth;
  const isTargetAchieved = current >= target;
  const isPacingAhead = projectedEOM >= target;
  const requiredDaily = !isTargetAchieved ? Math.max((target - current) / daysLeft, 0) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-8 max-w-4xl"
    >
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
          <Target className="w-3.5 h-3.5" />
          <span>Performance Target Tracker</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">Monthly Income Goals</h2>
        <p className="text-slate-400 text-sm mt-1 max-w-2xl">
          Track month-to-date affiliate revenue, calculate daily required pacing, and forecast month-end commissions.
        </p>
      </div>

      <div className="p-6 md:p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md shadow-xl space-y-8">
        {/* Input Target Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Monthly Goal Target (RM)
            </label>
            <input
              type="number"
              min="100"
              step="100"
              value={target}
              onChange={(e) => setTarget(Math.max(1, parseFloat(e.target.value) || 0))}
              className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-white font-extrabold text-xl focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Current Month-to-Date Revenue (RM)
            </label>
            <input
              type="number"
              min="0"
              step="50"
              value={current}
              onChange={(e) => setCurrent(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-emerald-400 font-extrabold text-xl focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* Progress Bar & Stat Callout */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Progress</span>
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                {percentage.toFixed(1)}%
              </span>
            </div>
            <span className="text-sm font-bold text-slate-300">
              RM {current.toFixed(2)} / <span className="text-slate-500">RM {target.toFixed(2)}</span>
            </span>
          </div>

          <div className="w-full h-4 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800 shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`h-full rounded-full transition-colors ${
                percentage >= 100
                  ? "bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                  : "bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500"
              }`}
            />
          </div>
        </div>

        {/* Three Pacing Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Current Daily Average
            </span>
            <p className="text-2xl font-bold text-slate-100">RM {dailyAvg.toFixed(2)}</p>
            <span className="text-[10px] text-slate-500 mt-1 block">Based on day {day} of {daysInMonth}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Projected End of Month
            </span>
            <p className={`text-2xl font-bold ${isPacingAhead ? "text-emerald-400" : "text-amber-400"}`}>
              RM {projectedEOM.toFixed(2)}
            </p>
            <span className="text-[10px] text-slate-500 mt-1 block">
              {isPacingAhead ? "🔥 On track to beat target!" : "⚠️ Pacing slightly below target"}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/40 via-slate-950 to-slate-950 border border-cyan-500/30">
            <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider block mb-1">
              Required Daily Run-Rate
            </span>
            <p className="text-2xl font-bold text-cyan-400">
              {isTargetAchieved ? "Goal Met! 🎉" : `RM ${requiredDaily.toFixed(2)} / day`}
            </p>
            <span className="text-[10px] text-cyan-300/70 mt-1 block">
              {!isTargetAchieved ? `For remaining ${daysLeft} days this month` : "Set a stretch goal!"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
