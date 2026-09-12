"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";

export function HeroInput({ onExtract }: { onExtract: () => void }) {
  const [url, setUrl] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleExtract = () => {
    if (url.trim()) {
      onExtract();
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-2xl mx-auto"
    >
      <motion.div 
        className={`relative flex items-center p-2 rounded-2xl border-2 transition-colors duration-300 ${
          isFocused ? "border-cyan-400 bg-slate-900/80" : "border-slate-800 bg-slate-900/50"
        } backdrop-blur-md shadow-2xl`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <Search className="absolute left-4 text-slate-400 w-6 h-6" />
        <input
          type="text"
          placeholder="Paste Shopee/TikTok Shop Link..."
          className="w-full bg-transparent border-none outline-none pl-14 pr-36 py-4 text-lg text-white placeholder-slate-500"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleExtract();
          }}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-2 bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.5)] flex items-center gap-2"
          onClick={handleExtract}
        >
          Extract
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
