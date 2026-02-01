'use client'; // 👈 THIS IS MANDATORY FOR NEXT.JS APP ROUTER

import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define TypeScript interface for the Item (Optional but good practice)
interface CanteenItem {
  id?: number;
  name: string;
  price: string | number;
  category: string;
  shop_outlet?: string; // from DB
  shopOutlet?: string;  // from Form
  image_url: string;
}

export default function Canteen() {
  const [items, setItems] = useState<CanteenItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    category: 'Snacks',
    shopOutlet: 'Hexagon Canteen', // Default value
    image_url: ''
  });

  // 1. Fetch Menu Items safely
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      // ⚠️ ensure this matches your Next.js config rewrite
      const response = await axios.get('/api/canteen'); 
      setItems(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load menu:", err);
      setError("Failed to load menu. Is the backend running?");
      setLoading(false);
    }
  };

  // 2. Add New Item
  const handleAddItem = async () => {
    try {
      await axios.post('/api/canteen', newItem);
      alert('Item added!');
      setNewItem({ name: '', price: '', category: 'Snacks', shopOutlet: 'Hexagon Canteen', image_url: '' });
      fetchItems(); // Refresh list
    } catch (err) {
      alert('Failed to add item');
      console.error(err);
    }
  };

  if (loading) return <div className="p-10 text-center text-white">Loading yummy food... 🍔</div>;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-white">🍔 College Canteen</h1>

      {/* --- ADD ITEM FORM --- */}
      <div className="bg-gray-800 p-6 rounded-lg mb-8 text-white">
        <h3 className="text-xl mb-4">Add to Menu</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            placeholder="Dish Name" 
            className="p-2 rounded text-black"
            value={newItem.name}
            onChange={e => setNewItem({...newItem, name: e.target.value})}
          />
          <input 
            placeholder="Price (₹)" 
            type="number"
            className="p-2 rounded text-black"
            value={newItem.price}
            onChange={e => setNewItem({...newItem, price: e.target.value})}
          />
          
          {/* Shop Outlet Selector */}
          <select 
            className="p-2 rounded text-black"
            value={newItem.shopOutlet}
            onChange={e => setNewItem({...newItem, shopOutlet: e.target.value})}
          >
            <option value="Hexagon Canteen">Hexagon Canteen</option>
            <option value="Buggara Point">Buggara Point</option>
            <option value="Nescafe">Nescafe</option>
          </select>

          <input 
            placeholder="Image URL (Optional)" 
            className="p-2 rounded text-black"
            value={newItem.image_url}
            onChange={e => setNewItem({...newItem, image_url: e.target.value})}
          />
        </div>
        <button 
          onClick={handleAddItem}
          className="mt-4 bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 w-full font-bold transition-colors"
        >
          Add Item
        </button>
      </div>

      {/* --- MENU GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div key={item.id || index} className="border border-gray-700 rounded-lg overflow-hidden shadow-lg bg-gray-900 text-white">
            <img 
              src={item.image_url || 'https://via.placeholder.com/300?text=Yummy+Food'} 
              alt={item.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold">{item.name}</h3>
                <span className="bg-green-900 text-green-100 text-xs px-2 py-1 rounded-full border border-green-700">
                  {/* Handle snake_case from DB or camelCase from local state */}
                  {item.shop_outlet || item.shopOutlet || 'General'}
                </span>
              </div>
              <p className="text-gray-400 mt-1">{item.category}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-2xl font-bold text-orange-500">₹{item.price}</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                  Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
