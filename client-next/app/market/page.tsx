"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Tag, Plus, X, User } from "lucide-react";
import Link from "next/link";

interface MarketItem {
  id?: number;
  title: string;
  price: number;
  description: string;
  contact: string;
  image_url: string;
  created_at?: string;
}

export default function MarketPage() {
  const [items, setItems] = useState<MarketItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchItems = useCallback(async () => {
    try {
      setError("");
      const res = await axios.get("/api/market");
      setItems(res.data);
    } catch (err: any) {
      console.error("Error fetching items:", err);
      const backendError = err.response?.data?.error || err.message;
      setError(backendError || "Failed to fetch items");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-pink-500/30">
      {/* Background Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-pink-600/10 blur-[130px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/" className="mb-2 inline-block text-sm text-pink-400 hover:underline">
              &larr; Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              Marketplace
            </h1>
            <p className="mt-2 text-gray-400">
              Buy, sell, and trade with your peers.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="group mt-6 flex items-center gap-2 rounded-full bg-pink-500 px-6 py-3 font-medium text-black transition-all hover:bg-pink-400 md:mt-0"
          >
            <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
            Sell Item
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-10 relative max-w-lg">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search for books, gadgets..."
            className="w-full rounded-full border border-white/10 bg-white/5 py-4 pl-12 pr-6 text-white placeholder-gray-500 backdrop-blur-sm focus:border-pink-500 focus:outline-none"
          />
        </div>

        {/* Items Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence>
            {items.map((item, index) => (
              <ItemCard key={item.id || index} item={item} index={index} />
            ))}
          </AnimatePresence>
        </div>



        {loading && <div className="text-center text-gray-500">Loading items...</div>}
        {error && <div className="text-center text-red-500">Error: {error}. Is the backend running?</div>}
        {!loading && !error && items.length === 0 && (
          <div className="text-center text-gray-500">No items found. Start selling!</div>
        )}
      </div>

      {/* Sell Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <SellItemModal
            onClose={() => setIsModalOpen(false)}
            onSuccess={() => {
              setIsModalOpen(false);
              fetchItems();
            }}
          />
        )}
      </AnimatePresence>
    </div >
  );
}

function ItemCard({ item, index }: { item: MarketItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-all hover:border-pink-500/30 hover:bg-white/10 flex flex-col justify-between"
    >
      <div>
        <div className="mb-4 flex h-40 w-full items-center justify-center rounded-2xl bg-neutral-800 text-gray-600 overflow-hidden relative">
          {item.image_url ? (
            <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" onError={(e) => e.currentTarget.src = ''} />
          ) : (
            <ShoppingBag className="h-10 w-10 opacity-20" />
          )}
        </div>

        <div className="mb-3">
          <h3 className="text-lg font-bold text-white line-clamp-1">{item.title}</h3>
          <p className="text-xs text-gray-400 line-clamp-2 mb-2">{item.description}</p>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <User className="h-3 w-3" /> Contact: {item.contact}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <span className="text-lg font-bold text-pink-400">₹{item.price}</span>
        <button className="rounded-full bg-white/10 p-2 text-white hover:bg-pink-500 hover:text-black">
          <Tag className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}

function SellItemModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    contact: "",
    image_url: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post("/api/market", formData);
      onSuccess();
    } catch (err: any) {
      console.error("Failed to list item", err);
      const backendError = err.response?.data?.error || err.message;
      setError(backendError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-md rounded-3xl border border-white/10 bg-neutral-900 p-8 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-500 hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
        <h2 className="mb-6 text-2xl font-bold text-white">Sell an Item</h2>

        {error && <div className="mb-4 p-3 rounded-lg bg-red-500/20 text-red-200 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              required
              placeholder="Item Name (e.g. Physics Book)"
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:border-pink-500 focus:outline-none"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div>
            <input
              required
              type="number"
              placeholder="Price (₹)"
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:border-pink-500 focus:outline-none"
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: e.target.value })}
            />
          </div>
          <div>
            <input
              required
              placeholder="Contact Info (Phone/Email)"
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:border-pink-500 focus:outline-none"
              value={formData.contact}
              onChange={e => setFormData({ ...formData, contact: e.target.value })}
            />
          </div>
          <div>
            <textarea
              required
              placeholder="Description"
              rows={3}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:border-pink-500 focus:outline-none"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div>
            <input
              placeholder="Image URL (Optional)"
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white text-sm focus:border-pink-500 focus:outline-none"
              value={formData.image_url}
              onChange={e => setFormData({ ...formData, image_url: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-xl bg-pink-500 py-3 font-bold text-black hover:bg-pink-400 disabled:opacity-50"
          >
            {loading ? "Listing..." : "List Item"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
