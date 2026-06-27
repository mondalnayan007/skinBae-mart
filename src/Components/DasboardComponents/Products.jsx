import React, { useState } from 'react';

const Products = () => {
  // ১. ডামি ডাটা (হুবহু স্ক্রিনশটের মতো করে সাজানো)
  const [products, setProducts] = useState([
    { id: 1, name: "COSRX Advanced Snail 96 Mucin Power Essence", category: "Essence", brand: "COSRX", price: 21, stock: 45, date: "2026-05-12", image: "https://images.unsplash.com/photo-1608248597481-496100c8c836?w=100&auto=format&fit=crop&q=80" },
    { id: 2, name: "CeraVe Moisturizing Cream for Normal to Dry Skin", category: "Moisturizer", brand: "CeraVe", price: 19, stock: 0, date: "2026-06-01", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&auto=format&fit=crop&q=80" },
    { id: 3, name: "Beauty of Joseon Relief Sun : Rice + Probiotics SPF50+", category: "Sunscreen", brand: "Beauty of Joseon", price: 18, stock: 65, date: "2026-04-20", image: "https://images.unsplash.com/photo-1556229174-5e42a09e45af?w=100&auto=format&fit=crop&q=80" },
    { id: 4, name: "The Ordinary Niacinamide 10% + Zinc 1%", category: "Serum", brand: "The Ordinary", price: 11, stock: 120, date: "2026-06-15", image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=100&auto=format&fit=crop&q=80" },
    { id: 5, name: "CeraVe Hydrating Facial Cleanser", category: "Cleanser", brand: "CeraVe", price: 17, stock: 0, date: "2026-03-10", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=100&auto=format&fit=crop&q=80" },
    { id: 6, name: "ANUA Heartleaf 77% Soothing Toner", category: "Toner", brand: "ANUA", price: 23, stock: 28, date: "2026-05-28", image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=100&auto=format&fit=crop&q=80" },
    { id: 7, name: "AXIS-Y Dark Spot Correcting Glow Serum", category: "Serum", brand: "AXIS-Y", price: 16, stock: 0, date: "2026-02-14", image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=100&auto=format&fit=crop&q=80" }
  ]);

  // ২. সার্চ ও ফিল্টার স্টেট সমূহ
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // ফিল্টারিং অপশনস স্টেট
  const [stockFilter, setStockFilter] = useState("all"); // all, inStock, outOfStock
  const [dateFilter, setDateFilter] = useState("newest"); // newest, oldest
  
  // নতুন প্রোডাক্ট অ্যাড করার স্টেট
  const [newProduct, setNewProduct] = useState({ name: '', category: '', brand: '', price: '', stock: '', date: '' });
  
  // পেজিনেশন স্টেট
  const [currentPage, setCurrentPage] = useState(1);

  // ৩. সার্চ এবং ফিল্টার অ্যাপ্লাই করার মূল লজিক
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (stockFilter === "inStock") return matchesSearch && product.stock > 0;
    if (stockFilter === "outOfStock") return matchesSearch && product.stock === 0;
    return matchesSearch;
  }).sort((a, b) => {
    if (dateFilter === "newest") return new Date(b.date) - new Date(a.date);
    if (dateFilter === "oldest") return new Date(a.date) - new Date(b.date);
    return 0;
  });

  // নতুন প্রোডাক্ট সাবমিট হ্যান্ডলার
  const handleAddProduct = (e) => {
    e.preventDefault();
    const productToAdd = {
      id: Date.now(),
      name: newProduct.name,
      category: newProduct.category,
      brand: newProduct.brand,
      price: parseFloat(newProduct.price) || 0,
      stock: parseInt(newProduct.stock) || 0,
      date: newProduct.date || new Date().toISOString().split('T')[0],
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&auto=format&fit=crop&q=80" // Sample default image
    };
    setProducts([productToAdd, ...products]);
    setIsModalOpen(false);
    setNewProduct({ name: '', category: '', brand: '', price: '', stock: '', date: '' });
  };

  // ডেট ফরম্যাট করার হেল্পার (যেমন: 01 Dec, 2027)
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="bg-white rounded-[20px] border border-gray-200 shadow-sm p-6 space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Products List</h2>
          <p className="text-xs text-gray-400 mt-0.5">Track your store's progress to boost your sales.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="border border-gray-200 hover:bg-gray-50 text-slate-700 font-semibold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all">
            <span>📤</span> Export
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#5A57FF] hover:bg-[#4845e0] text-white font-semibold text-xs px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-xs transition-all"
          >
            <span>+</span> Add Product
          </button>
        </div>
      </div>

      {/* SEARCH AND FILTER BUTTON CONTROLS */}
      <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input bar */}
        <div className="w-full sm:max-w-xs relative">
          <span className="absolute left-3.5 top-2.5 text-gray-400 text-sm">🔍</span>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products, brand or category..."
            className="w-full bg-white border border-gray-200 pl-10 pr-4 py-2 rounded-xl text-xs outline-none focus:border-[#5A57FF] text-slate-700 transition-all"
          />
        </div>

        {/* Filter Toggle Button */}
        <button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`border text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
            isFilterOpen ? 'bg-slate-50 border-[#5A57FF] text-[#5A57FF]' : 'border-gray-200 text-slate-700 hover:bg-gray-50'
          }`}
        >
          <span>🎛️</span> Filter
        </button>

        {/* EXPANDABLE ADVANCED FILTER PANEL */}
        {isFilterOpen && (
          <div className="absolute right-0 top-12 z-20 bg-white border border-gray-200 rounded-2xl p-4 shadow-lg w-64 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Stock Status & Quantity</label>
              <select 
                value={stockFilter} onChange={(e) => setStockFilter(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs text-slate-700 outline-none"
              >
                <option value="all">All Inventory</option>
                <option value="inStock">In Stock (Available)</option>
                <option value="outOfStock">Out of Stock</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Sort By Added Date</label>
              <select 
                value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs text-slate-700 outline-none"
              >
                <option value="newest">Latest Products First</option>
                <option value="oldest">Oldest Products First</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* PRODUCTS TABLE LIST AREA */}
      <div className="overflow-x-auto border border-gray-100 rounded-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100 text-[11px] text-gray-400 uppercase tracking-wider font-bold">
              <th className="py-3.5 pl-4 w-10">
                <input type="checkbox" className="rounded border-gray-300 text-[#5A57FF] focus:ring-[#5A57FF]" />
              </th>
              <th className="py-3.5 pl-2">Products ⇅</th>
              <th className="py-3.5">Category ⇅</th>
              <th className="py-3.5">Brand ⇅</th>
              <th className="py-3.5">Price ⇅</th>
              <th className="py-3.5">Stock</th>
              <th className="py-3.5">Created At</th>
              <th className="py-3.5 pr-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100/70 text-xs text-slate-700">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-8 text-gray-400 font-medium">No products found matching your criteria.</td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/40 transition-colors">
                  <td className="py-4 pl-4">
                    <input type="checkbox" className="rounded border-gray-300 text-[#5A57FF] focus:ring-[#5A57FF]" />
                  </td>
                  <td className="py-4 pl-2 font-medium text-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 border border-gray-100 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="truncate max-w-[180px]">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-gray-500 font-medium">{product.category}</td>
                  <td className="py-4 text-gray-500 font-medium">{product.brand}</td>
                  <td className="py-4 font-bold text-slate-800">${product.price.toLocaleString()}</td>
                  <td className="py-4">
                    {product.stock > 0 ? (
                      <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
                        In Stock ({product.stock})
                      </span>
                    ) : (
                      <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600">
                        Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="py-4 text-gray-400 font-medium">{formatDate(product.date)}</td>
                  <td className="py-4 pr-4 text-center">
                    <button className="text-gray-400 hover:text-gray-600 text-sm font-bold">•••</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION FOOTER */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-100 pt-4 gap-4">
        <span className="text-xs text-gray-400 font-medium">
          Showing <span className="text-slate-700 font-semibold">1</span> to <span className="text-slate-700 font-semibold">{filteredProducts.length}</span> of <span className="text-slate-700 font-semibold">{products.length}</span>
        </span>
        
        <div className="flex items-center gap-1">
          <button className="p-1.5 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 transition-all text-xs">&larr;</button>
          <button onClick={() => setCurrentPage(1)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${currentPage === 1 ? 'bg-[#5A57FF] text-white' : 'border border-transparent text-slate-600 hover:bg-gray-50'}`}>1</button>
          <button onClick={() => setCurrentPage(2)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${currentPage === 2 ? 'bg-[#5A57FF] text-white' : 'border border-transparent text-slate-600 hover:bg-gray-50'}`}>2</button>
          <button onClick={() => setCurrentPage(3)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${currentPage === 3 ? 'bg-[#5A57FF] text-white' : 'border border-transparent text-slate-600 hover:bg-gray-50'}`}>3</button>
          <button className="p-1.5 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 transition-all text-xs">&rarr;</button>
        </div>
      </div>

      {/* ADD NEW PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="text-sm font-bold text-slate-800">Add New Product to Base</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-sm">✕</button>
            </div>
            
            <form onSubmit={handleAddProduct} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Product Name</label>
                <input 
                  type="text" required value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  placeholder="e.g. ASUS ROG Gaming Laptop"
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#5A57FF]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Category</label>
                  <input 
                    type="text" required value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    placeholder="e.g. Laptop / Audio"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#5A57FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Brand</label>
                  <input 
                    type="text" required value={newProduct.brand}
                    onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
                    placeholder="e.g. Apple / ASUS"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#5A57FF]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Price ($)</label>
                  <input 
                    type="number" required value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    placeholder="e.g. 1299"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#5A57FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Stock Quantity</label>
                  <input 
                    type="number" required value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                    placeholder="e.g. 45"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#5A57FF]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Creation Date</label>
                <input 
                  type="date" value={newProduct.date}
                  onChange={(e) => setNewProduct({...newProduct, date: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#5A57FF] text-gray-500"
                />
              </div>
              
              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button 
                  type="button" onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-500 text-xs font-medium rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-[#5A57FF] hover:bg-[#4845e0] text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Products;