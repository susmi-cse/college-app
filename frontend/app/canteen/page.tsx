"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Star, Clock, Plus, Minus, X, Info, ChefHat, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import axios from "axios";

// TypeScript Interfaces
interface MenuItem {
    id: number;
    name: string;
    price: number | string;
    rating?: number;
    time?: string;
    image_url: string;
    shop_name: string;
    category?: string;
}

interface CartItem extends MenuItem {
    quantity: number;
}

const SHOPS = ["All", "Buggara Point", "Indiana", "Khawkchang", "Messua Ferrera", "Fruit Shop", "Snack Shop"];

export default function CanteenPage() {
    const [activeTab, setActiveTab] = useState("All");
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [activeMode, setActiveMode] = useState<"buyer" | "seller">("buyer");

    // Data State
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);

    // Seller Form State
    const [newItem, setNewItem] = useState({
        name: "",
        price: "",
        shop_name: "Buggara Point",
        category: "Lunch",
        image_url: ""
    });

    const fetchMenu = useCallback(async () => {
        try {
            const res = await axios.get("/api/canteen/menu");
            setMenuItems(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching menu:", err);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMenu();
    }, [fetchMenu]);

    // Filter Logic
    const filteredItems = activeTab === "All"
        ? menuItems
        : menuItems.filter(item => item.shop_name === activeTab);

    const addToCart = (item: MenuItem) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { ...item, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (id: number) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id: number, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : item;
            }
            return item;
        }));
    };

    const cartTotal = cart.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);

    const handleAddItem = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post("/api/canteen/menu", newItem);
            alert("Item Added Successfully!");
            setNewItem({ name: "", price: "", shop_name: "Buggara Point", category: "Lunch", image_url: "" });
            fetchMenu(); // Refresh list
        } catch (err) {
            alert("Failed to add item.");
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-white selection:bg-orange-500/30 font-sans">
            {/* Background Blobs */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-orange-600/10 blur-[130px]" />
                <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-red-600/10 blur-[130px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 py-8">
                {/* Header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <Link href="/" className="flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300 mb-2">
                            &larr; Dashboard
                        </Link>
                        <h1 className="text-4xl font-bold tracking-tight text-white flex items-center gap-3">
                            Canteen <span className="text-neutral-600 text-2xl font-light">| Super Eats</span>
                        </h1>
                    </div>

                    {/* Mode Toggle */}
                    <div className="flex bg-white/10 p-1 rounded-full backdrop-blur-md self-start md:self-center">
                        <button
                            onClick={() => setActiveMode("buyer")}
                            className={cn(
                                "flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all",
                                activeMode === "buyer" ? "bg-orange-500 text-black shadow-lg" : "text-gray-400 hover:text-white"
                            )}
                        >
                            <Utensils className="w-4 h-4" /> Order Food
                        </button>
                        <button
                            onClick={() => setActiveMode("seller")}
                            className={cn(
                                "flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all",
                                activeMode === "seller" ? "bg-orange-500 text-black shadow-lg" : "text-gray-400 hover:text-white"
                            )}
                        >
                            <ChefHat className="w-4 h-4" /> Kitchen Dashboard
                        </button>
                    </div>

                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="group relative flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 hover:bg-orange-500 hover:text-black transition-all"
                    >
                        <ShoppingBag className="h-5 w-5" />
                        <span className="font-medium">Cart</span>
                        {cart.length > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-black border-2 border-black group-hover:bg-white group-hover:text-orange-600">
                                {cart.length}
                            </span>
                        )}
                    </button>
                </div>

                {activeMode === "buyer" ? (
                    <>
                        {/* Shop Tabs */}
                        <div className="mb-8 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                            {SHOPS.map((shop) => (
                                <button
                                    key={shop}
                                    onClick={() => setActiveTab(shop)}
                                    className={cn(
                                        "whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
                                        activeTab === shop
                                            ? "border-orange-500 bg-orange-500/10 text-orange-400"
                                            : "border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                                    )}
                                >
                                    {shop}
                                </button>
                            ))}
                        </div>

                        {/* Menu Grid */}
                        {loading ? (
                            <div className="text-center py-20 text-gray-500">Loading Menu...</div>
                        ) : (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                <AnimatePresence mode="popLayout">
                                    {filteredItems.map((item) => (
                                        <MenuItemCard key={item.id} item={item} onAdd={() => addToCart(item)} />
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                        {!loading && filteredItems.length === 0 && (
                            <div className="text-center py-20 text-gray-500">
                                No items available in {activeTab}. Maybe ask the Kitchen to cook something?
                            </div>
                        )}
                    </>
                ) : (
                    /* Kitchen Dashboard */
                    <div className="max-w-2xl mx-auto bg-neutral-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/50">
                                <ChefHat className="w-8 h-8 text-orange-500" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">Add to Menu</h2>
                                <p className="text-gray-400">Cook up something new for the students!</p>
                            </div>
                        </div>

                        <form onSubmit={handleAddItem} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Dish Name</label>
                                    <input
                                        required
                                        value={newItem.name}
                                        onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                                        placeholder="e.g. Schezwan Noodles"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-orange-500 focus:outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Price (₹)</label>
                                    <input
                                        required
                                        type="number"
                                        value={newItem.price}
                                        onChange={e => setNewItem({ ...newItem, price: e.target.value })}
                                        placeholder="120"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-orange-500 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Shop Outlet</label>
                                    <select
                                        value={newItem.shop_name}
                                        onChange={e => setNewItem({ ...newItem, shop_name: e.target.value })}
                                        className="w-full bg-neutral-800 border border-white/10 rounded-xl py-3 px-4 focus:border-orange-500 focus:outline-none"
                                    >
                                        {SHOPS.filter(s => s !== "All").map(s => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Category</label>
                                    <input
                                        value={newItem.category}
                                        onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                                        placeholder="Lunch, Snack, Drink"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-orange-500 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Image URL (Optional)</label>
                                <input
                                    value={newItem.image_url}
                                    onChange={e => setNewItem({ ...newItem, image_url: e.target.value })}
                                    placeholder="https://..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-orange-500 focus:outline-none text-sm"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-orange-500 text-black font-bold rounded-xl hover:bg-orange-400 transition-colors shadow-lg shadow-orange-500/20"
                            >
                                Add Item to Menu
                            </button>
                        </form>
                    </div>
                )}
            </div>

            {/* Cart Drawer - Same as before but cleaner */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            className="fixed right-0 top-0 z-50 h-full w-full max-w-sm bg-neutral-900 border-l border-white/10 p-6 shadow-2xl flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <ShoppingBag className="w-6 h-6 text-orange-500" /> Your Order
                                </h2>
                                <button onClick={() => setIsCartOpen(false)} className="rounded-full p-2 hover:bg-white/10">
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                                {cart.length === 0 ? (
                                    <div className="text-center text-gray-500 mt-20">Your cart is empty. Hungry?</div>
                                ) : (
                                    cart.map(item => (
                                        <div key={item.id} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-800 flex-shrink-0">
                                                {item.image_url ? (
                                                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-600 font-bold text-xs">NO IMG</div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold line-clamp-1">{item.name}</h3>
                                                <div className="text-orange-400 font-bold text-sm">₹{Number(item.price) * item.quantity}</div>
                                                <div className="flex items-center gap-3 mt-2">
                                                    <button onClick={() => updateQuantity(item.id, -1)} className="p-1 rounded bg-white/10 hover:bg-white/20"><Minus className="w-3 h-3" /></button>
                                                    <span className="text-sm font-medium">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1 rounded bg-white/10 hover:bg-white/20"><Plus className="w-3 h-3" /></button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="mt-6 border-t border-white/10 pt-6">
                                <div className="flex justify-between text-xl font-bold mb-6">
                                    <span>Total</span>
                                    <span>₹{cartTotal}</span>
                                </div>
                                <button className="w-full py-4 bg-orange-500 text-black font-bold rounded-xl hover:bg-orange-400 transition-colors">
                                    Checkout Now
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </div>
    );
}

function MenuItemCard({ item, onAdd }: { item: MenuItem; onAdd: () => void }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-orange-500/30"
        >
            <div className="mb-4 aspect-square w-full overflow-hidden rounded-2xl bg-neutral-800 relative">
                {item.image_url && item.image_url.startsWith('http') ? (
                    <img
                        src={item.image_url}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => e.currentTarget.src = ''}
                    />
                ) : item.image_url ? (
                    /* Local image handling */
                    <img
                        src={item.image_url}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                        <Utensils className="w-12 h-12 opacity-20" />
                    </div>
                )}

                {/* Rating Badge */}
                <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs font-medium backdrop-blur-md text-yellow-500">
                    <Star className="w-3 h-3 fill-yellow-500" /> 4.5
                </div>
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-bold text-white line-clamp-1">{item.name}</h3>
                <p className="text-xs text-gray-400 mb-1">{item.shop_name}</p>
                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-orange-400">₹{item.price}</span>
                    <button
                        onClick={onAdd}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-orange-500 hover:text-black"
                    >
                        <Plus className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
