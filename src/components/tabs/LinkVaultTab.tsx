"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link2, Plus, Copy, Check, Sparkles, Trash2, ExternalLink } from "lucide-react";

export interface VaultLink {
  id: number;
  name: string;
  url: string;
  category: string;
  clicks: number;
}

interface LinkVaultTabProps {
  onSendToAI: (product: string, url: string) => void;
}

export function LinkVaultTab({ onSendToAI }: LinkVaultTabProps) {
  const [links, setLinks] = useState<VaultLink[]>([]);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("Skincare");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("awflow_saved_links");
    if (saved) {
      try {
        setLinks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved links", e);
      }
    } else {
      // Default initial mock links
      const defaultLinks: VaultLink[] = [
        { id: 1, name: "Skintific 5X Ceramide Moisturizer", url: "https://shopee.com.my/skintific-moisturizer", category: "Skincare", clicks: 42 },
        { id: 2, name: "Mini UV Capsule Umbrella", url: "https://shopee.com.my/capsule-umbrella", category: "Home & Living", clicks: 18 },
        { id: 3, name: "Silent Bluetooth Wireless Mouse", url: "https://shopee.com.my/wireless-mouse", category: "Tech Accessories", clicks: 31 },
      ];
      setLinks(defaultLinks);
      localStorage.setItem("awflow_saved_links", JSON.stringify(defaultLinks));
    }
  }, []);

  const saveLinksToStorage = (updated: VaultLink[]) => {
    setLinks(updated);
    localStorage.setItem("awflow_saved_links", JSON.stringify(updated));
  };

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;

    const newLink: VaultLink = {
      id: Date.now(),
      name,
      url,
      category,
      clicks: Math.floor(Math.random() * 20),
    };

    const updated = [newLink, ...links];
    saveLinksToStorage(updated);
    setName("");
    setUrl("");
  };

  const handleDelete = (id: number) => {
    const updated = links.filter((l) => l.id !== id);
    saveLinksToStorage(updated);
  };

  const handleCopy = (link: VaultLink) => {
    navigator.clipboard.writeText(link.url);
    setCopiedId(link.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-8"
    >
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
          <Link2 className="w-3.5 h-3.5" />
          <span>Affiliate Inventory Vault</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">Affiliate Link Vault</h2>
        <p className="text-slate-400 text-sm mt-1 max-w-2xl">
          Store, categorize, and track your customized Shopee & TikTok affiliate URLs. Auto-send any product directly to the AI Review-Mining Studio with 1 click.
        </p>
      </div>

      {/* Add Link Form */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md shadow-xl">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-emerald-400" />
          Add New Affiliate Link
        </h3>

        <form onSubmit={handleAddLink} className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-4">
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Product Title</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Muji Style Gel Pens (10-pack)"
              className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="md:col-span-4">
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Affiliate Link / Shortlink</label>
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://shope.ee/..."
              className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
            >
              <option>Skincare</option>
              <option>Home & Living</option>
              <option>Tech Accessories</option>
              <option>Modest Fashion</option>
              <option>Stationery</option>
              <option>General</option>
            </select>
          </div>

          <div className="md:col-span-2 flex items-end">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold py-2.5 px-4 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-1.5 text-sm"
            >
              Save Link
            </button>
          </div>
        </form>
      </div>

      {/* Links Table */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">Tracked Clicks</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <AnimatePresence>
                {links.map((link) => (
                  <motion.tr
                    key={link.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-slate-800/30 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-200 text-sm">{link.name}</div>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-cyan-400 hover:underline flex items-center gap-1 mt-0.5"
                      >
                        {link.url.length > 35 ? `${link.url.substring(0, 35)}...` : link.url}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {link.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-slate-300">
                      {link.clicks}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm space-x-2">
                      {/* Copy Link */}
                      <button
                        onClick={() => handleCopy(link)}
                        title="Copy Affiliate Link"
                        className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors inline-flex items-center justify-center"
                      >
                        {copiedId === link.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>

                      {/* 1-Click Send to AI Studio */}
                      <button
                        onClick={() => onSendToAI(link.name, link.url)}
                        title="Auto-Mine & Generate Campaign"
                        className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition-colors inline-flex items-center justify-center"
                      >
                        <Sparkles className="w-4 h-4" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(link.id)}
                        title="Delete from Vault"
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors inline-flex items-center justify-center"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>

          {links.length === 0 && (
            <div className="p-8 text-center text-slate-500 text-sm">
              Your link vault is empty. Save your first affiliate product link above!
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
