"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, AlertTriangle, TrendingUp, CheckCircle } from "lucide-react";

export function CalculatorTab() {
  const [price, setPrice] = useState<number>(150);
  const [rate, setRate] = useState<number>(6);
  const [sales, setSales] = useState<number>(25);
  const [isExtra, setIsExtra] = useState<boolean>(false);

  const standardCap = 5.0;
  const rawCommission = price * (rate / 100);
  const actualCommission = isExtra ? rawCommission : Math.min(rawCommission, standardCap);
  const isCapped = !isExtra && rawCommission > standardCap;
  const totalEarnings = actualCommission * sales;
  const uncappedTotal = rawCommission * sales;
  const lostEarnings = uncappedTotal - totalEarnings;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-8 max-w-4xl"
    >
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 text-xs font-semibold mb-3">
          <Calculator className="w-3.5 h-3.5" />
          <span>Commission Intelligence</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">Commission & Cap Calculator</h2>
        <p className="text-slate-400 text-sm mt-1 max-w-2xl">
          Simulate your actual take-home affiliate earnings. Visualize how standard RM5 commission caps impact high-ticket products versus Extra Commission programs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Input Parameters Box */}
        <div className="md:col-span-7 p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md shadow-xl space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Item Retail Price (RM)
            </label>
            <input
              type="number"
              min="1"
              value={price}
              onChange={(e) => setPrice(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-white font-bold text-lg focus:outline-none focus:border-fuchsia-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Commission Rate (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.5"
                value={rate}
                onChange={(e) => setRate(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-white font-bold text-lg focus:outline-none focus:border-fuchsia-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Expected Conversions (Qty)
              </label>
              <input
                type="number"
                min="1"
                value={sales}
                onChange={(e) => setSales(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-white font-bold text-lg focus:outline-none focus:border-fuchsia-500 transition-colors"
              />
            </div>
          </div>

          {/* Extra Commission Toggle */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setIsExtra(!isExtra)}
              className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                isExtra
                  ? "bg-fuchsia-950/30 border-fuchsia-500/50 text-fuchsia-200"
                  : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center gap-2.5 text-xs font-bold">
                {isExtra ? (
                  <CheckCircle className="w-4 h-4 text-fuchsia-400" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-600" />
                )}
                <span>Shopee Extra Commission Program (No RM5 Cap)</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isExtra ? "bg-fuchsia-500/20 text-fuchsia-300" : "bg-slate-800 text-slate-500"}`}>
                {isExtra ? "Uncapped" : "Standard"}
              </span>
            </button>
          </div>
        </div>

        {/* Dynamic Calculation Result Card */}
        <div className="md:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-fuchsia-900/60 via-slate-900 to-slate-950 border border-fuchsia-500/30 shadow-2xl flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-fuchsia-300 uppercase tracking-wider block mb-1">
              Commission Per Item
            </span>
            <div className="flex items-baseline gap-2">
              <h3 className="text-4xl font-extrabold text-white">RM {actualCommission.toFixed(2)}</h3>
              {isCapped && (
                <span className="text-[10px] bg-red-600 text-white font-extrabold px-2 py-0.5 rounded-md shadow-md animate-pulse flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  CAPPED
                </span>
              )}
            </div>

            {isCapped && (
              <p className="text-xs text-fuchsia-300/80 mt-1 font-medium">
                True raw commission: <span className="line-through text-slate-400">RM {rawCommission.toFixed(2)}</span> (Lost RM {(rawCommission - standardCap).toFixed(2)}/item)
              </p>
            )}
          </div>

          <div className="pt-6 mt-6 border-t border-fuchsia-500/20">
            <span className="text-xs font-bold text-fuchsia-300 uppercase tracking-wider block mb-1">
              Total Projected Payout
            </span>
            <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-pink-200 to-white">
              RM {totalEarnings.toFixed(2)}
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">Based on {sales} estimated conversions</p>
          </div>
        </div>
      </div>

      {/* Lost Earnings Visualizer Comparison */}
      {isCapped && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 rounded-2xl bg-slate-900/60 border border-red-500/30 backdrop-blur-md shadow-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                Lost Revenue Visualizer (Cap Penalty)
              </h3>
              <p className="text-xs text-slate-400">
                You are losing <strong className="text-red-400">RM {lostEarnings.toFixed(2)}</strong> across {sales} sales due to the standard Shopee affiliate RM5 cap!
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-red-400 bg-red-950/60 px-3 py-1 rounded-full border border-red-800/40">
                -RM {lostEarnings.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-400">Standard Capped Payout (RM5 max)</span>
                <span className="text-slate-200">RM {totalEarnings.toFixed(2)}</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(totalEarnings / uncappedTotal) * 100}%` }}
                  className="h-full rounded-full bg-slate-600"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-fuchsia-300 font-bold">Extra Commission (Uncapped Potential)</span>
                <span className="text-fuchsia-400 font-bold">RM {uncappedTotal.toFixed(2)}</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 shadow-[0_0_10px_rgba(217,70,239,0.5)]"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
