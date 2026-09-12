"use client";

import { motion } from "framer-motion";
import { Frown, Smile, TrendingUp } from "lucide-react";

export interface ExtractionData {
  id: string;
  type: "pain_point" | "praise";
  title: string;
  count: number;
  snippet: string;
}

export function FloatingCard({ data, index }: { data: ExtractionData; index: number }) {
  const isPain = data.type === "pain_point";
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 170,
        damping: 26,
        mass: 1,
        delay: index * 0.1,
      }}
      className={`p-4 rounded-xl border backdrop-blur-sm bg-slate-900/60 shadow-lg ${
        isPain ? "border-fuchsia-500/50 shadow-fuchsia-500/10" : "border-cyan-500/50 shadow-cyan-500/10"
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className={`flex items-center gap-2 ${isPain ? "text-fuchsia-400" : "text-cyan-400"}`}>
          {isPain ? <Frown className="w-5 h-5" /> : <Smile className="w-5 h-5" />}
          <h3 className="font-semibold text-slate-100">{data.title}</h3>
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <TrendingUp className="w-3 h-3" />
          <span>{data.count}</span>
        </div>
      </div>
      <p className="text-sm text-slate-300 line-clamp-2">
        "{data.snippet}"
      </p>
    </motion.div>
  );
}
