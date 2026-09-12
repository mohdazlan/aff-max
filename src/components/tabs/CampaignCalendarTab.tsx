"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MONTHLY_STRATEGIES } from "@/lib/constants";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Flame, Clock, Lightbulb } from "lucide-react";

export function CampaignCalendarTab() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();

  const isCurrentMonth = month === today.getMonth() && year === today.getFullYear();
  const activeStrategy = MONTHLY_STRATEGIES[month] || {
    name: "Standard Seasonal Cycle",
    categories: "Essentials, Home, Tech",
    tip: "Focus on consistent evergreen problem-solving hooks."
  };

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleGoToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Malaysian Mega Sales & Paydays</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Campaign Calendar</h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Track double-digit flash sales, monthly paydays, and festive shopping waves to align your content schedules.
          </p>
        </div>

        {/* Month Navigation Controls */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 shadow-md">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleGoToday}
            className="px-3 py-1 text-xs font-bold hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors"
          >
            Today
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Grid Section */}
        <div className="lg:col-span-3 bg-slate-900/60 rounded-2xl border border-slate-800/80 shadow-xl overflow-hidden backdrop-blur-md">
          {/* Calendar Header Bar */}
          <div className="bg-slate-950/80 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              {monthNames[month]} {year}
            </h3>
            {isCurrentMonth && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
                Current Month
              </span>
            )}
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 border-b border-slate-800/80 bg-slate-950/40">
            {dayNames.map((d) => (
              <div key={d} className="py-2.5 text-center text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {d}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 border-slate-800 divide-y divide-slate-800/60">
            {/* Blank leading days */}
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`blank-${i}`} className="p-2 min-h-[90px] bg-slate-950/30 border-r border-slate-800/60 hidden sm:block" />
            ))}

            {/* Actual Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const d = i + 1;
              const isToday = isCurrentMonth && d === today.getDate();
              const isPayday = d === 25;
              const isDoubleDigit = d === month + 1;

              return (
                <div
                  key={`day-${d}`}
                  className={`p-2 min-h-[90px] flex flex-col justify-between border-r border-slate-800/60 transition-colors ${
                    isToday
                      ? "bg-cyan-950/20 shadow-[inset_0_0_0_2px_rgba(34,211,238,0.5)]"
                      : "hover:bg-slate-800/30"
                  }`}
                >
                  <span
                    className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${
                      isToday
                        ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                        : "text-slate-300"
                    }`}
                  >
                    {d}
                  </span>

                  <div className="flex flex-col gap-1 mt-1">
                    {isDoubleDigit && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30 truncate">
                        🔥 {d}.{d} Mega Sale
                      </span>
                    )}
                    {isPayday && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 truncate">
                        💰 Payday Sale
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar Strategy Box */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 rounded-2xl border border-amber-500/20 p-5 shadow-xl">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-amber-400 uppercase tracking-widest mb-2">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Monthly Playbook
            </span>
            <h3 className="text-xl font-bold text-white mb-2">{activeStrategy.name}</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">{activeStrategy.tip}</p>

            <div className="pt-4 border-t border-slate-800">
              <span className="block text-[11px] text-amber-400 font-bold mb-1">🔥 Hot Niches:</span>
              <p className="text-xs text-slate-200 font-medium">{activeStrategy.categories}</p>
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800/80 p-5 shadow-xl">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-cyan-400" />
              Timing Tactics
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>25th Payday:</strong> Peak impulse purchases for daily essentials & skincare.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Flame className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>T-3 Days:</strong> Start publishing "Add to Cart" teaser hooks 3 days before double-digit dates.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
