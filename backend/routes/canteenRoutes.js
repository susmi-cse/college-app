import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Canteen() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      // ⚠️ Make sure this URL matches your Next.js config or is the full Render URL
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

  if (loading) return <div className="p-10 text-center">Loading yummy food... 🍔</div>;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">🍔 College Canteen</h1>

      {/* --- ADD ITEM FORM --- */}
      <div className="bg-gray-800 p-6 rounded-lg mb-8 text-white">
        <h3 className="text-xl mb-4">Add to Menu</h3>
        <div className="grid grid-cols-2 gap-4">
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
          className="mt-4 bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 w-full font-bold"
        >
          Add Item
        </button>
      </div>

      {/* --- MENU GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="border rounded-lg overflow-hidden shadow-lg bg-white">
            <img 
              src={item.image_url || 'https://via.placeholder.com/300?text=Yummy+Food'} 
              alt={item.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold">{item.name}</h3>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  {/* ⚠️ CRITICAL FIX: Use item.shop_outlet (snake_case from DB) */}
                  {item.shop_outlet || item.shopOutlet || 'General'}
                </span>
              </div>
              <p className="text-gray-600 mt-1">{item.category}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-2xl font-bold text-orange-600">₹{item.price}</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
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
