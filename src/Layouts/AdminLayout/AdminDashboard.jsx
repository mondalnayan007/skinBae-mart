import React, { useState } from 'react';

const AdminDashboard = () => {
  const [currentSection, setCurrentSection] = useState('products');
  
  // প্রোডাক্ট ডাটাবেজ স্টেট
  const [products, setProducts] = useState([
    { id: 1, name: 'COSRX Snail Mucin Essence', category: 'Essence', price: 1450, stock: 42, seller: 'Skin Care BD', status: 'Bestselling', img: 'https://images.unsplash.com/photo-1608248597481-496100c80836?w=150' },
    { id: 2, name: 'CeraVe Moisturizing Cream', category: 'Moisturizer', price: 1850, stock: 4, seller: 'Seoul Cosmetics', status: 'New', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=150' },
    { id: 3, name: 'Ribana Saffron Soap', category: 'Soap', price: 950, stock: 0, seller: 'Ribana Official', status: 'Featured', img: 'https://images.unsplash.com/photo-1607006342456-ba275550e60a?w=150' },
  ]);

  // সেলার ডাটা স্টেট
  const [sellers, setSellers] = useState([
    { id: 1, name: 'Skin Care BD', email: 'info@skincarebd.com', activeProducts: 120, totalSales: '4,50,000', payoutPending: '35,000', rating: 4.8 },
    { id: 2, name: 'Seoul Cosmetics', email: 'wholesale@seoul.com', activeProducts: 85, totalSales: '2,80,000', payoutPending: '0', rating: 4.5 },
    { id: 3, name: 'Ribana Official', email: 'sales@ribana.com', activeProducts: 14, totalSales: '1,20,000', payoutPending: '18,500', rating: 4.9 },
  ]);

  // Modal & Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ id: '', name: '', category: '', price: '', stock: '', seller: '', status: 'New', img: '' });

  const openForm = (product = null) => {
    if (product) {
      setForm(product);
      setIsEditing(true);
    } else {
      setForm({ id: '', name: '', category: '', price: '', stock: '', seller: '', status: 'New', img: 'https://images.unsplash.com/photo-1608248597481-496100c80836?w=150' });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (isEditing) {
      setProducts(products.map(p => p.id === form.id ? form : p));
    } else {
      setProducts([...products, { ...form, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#0B0F19] text-gray-100 font-sans antialiased overflow-hidden selection:bg-[#7C4DFF] selection:text-white">
      
      {/* ========================================== */}
      {/* SIDEBAR: ULTRA MODERN DARK HUD */}
      {/* ========================================== */}
      <aside className="w-72 bg-[#111827]/60 backdrop-blur-xl border-r border-gray-800/60 hidden lg:flex flex-col justify-between p-6">
        <div className="flex flex-col gap-8">
          {/* Brand Premium Identity */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7C4DFF] to-[#B388FF] flex items-center justify-center shadow-[0_0_20px_rgba(124,77,255,0.4)]">
              <span className="text-white font-black text-sm">SB</span>
            </div>
            <span className="text-lg font-black tracking-widest bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent uppercase">
              Skinbae<span className="text-[#7C4DFF] font-medium text-xs tracking-normal normal-case ml-1">OS</span>
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-3 mb-2">Management Core</span>
            
            {[
              { id: 'products', label: 'Product Inventory', icon: '💎' },
              { id: 'stock', label: 'Stock Logistics', icon: '🔥' },
              { id: 'sellers', label: 'Vendor Directory', icon: '👑' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentSection(item.id)}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  currentSection === item.id
                    ? 'bg-gradient-to-r from-[#7C4DFF]/20 to-[#7C4DFF]/5 text-[#B388FF] border border-[#7C4DFF]/30 shadow-[0_0_15px_rgba(124,77,255,0.1)]'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Admin Tag */}
        <div className="bg-[#1F2937]/40 border border-gray-800/60 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center font-bold text-xs text-[#B388FF]">💻</div>
          <div>
            <h4 className="text-xs font-bold text-white">Root Developer</h4>
            <p className="text-[10px] text-gray-500 font-mono">secure_session_active</p>
          </div>
        </div>
      </aside>

      {/* ========================================== */}
      {/* MAIN CONSOLE AREA */}
      {/* ========================================== */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Floating Glass Header */}
        <header className="h-20 bg-[#0B0F19]/80 backdrop-blur-md border-b border-gray-900 flex items-center justify-between px-8 z-10 flex-shrink-0">
          <div>
            <h1 className="text-lg font-black uppercase tracking-widest bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {currentSection} Hub
            </h1>
          </div>
          
          {currentSection === 'products' && (
            <button 
              onClick={() => openForm()}
              className="bg-gradient-to-r from-[#7C4DFF] to-[#6236ff] text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-xl shadow-[0_4px_20px_rgba(124,77,255,0.25)] hover:shadow-[0_4px_25px_rgba(124,77,255,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              + Create Product
            </button>
          )}
        </header>

        {/* Dynamic Viewport */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-6xl w-full mx-auto">

            {/* -------------------------------------- */}
            {/* MODULE 1: PRODUCTS INVENTORY (CARDS BASED) */}
            {/* -------------------------------------- */}
            {currentSection === 'products' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-[#111827]/40 border border-gray-800/80 rounded-2xl p-5 flex flex-col justify-between gap-4 hover:border-[#7C4DFF]/40 transition-all duration-300 group shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <img src={product.img} alt={product.name} className="w-16 h-16 rounded-xl object-cover border border-gray-800 bg-gray-900 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">{product.category}</span>
                        <h3 className="text-sm font-bold text-white mt-1.5 truncate group-hover:text-[#B388FF] transition-colors">{product.name}</h3>
                        <p className="text-[11px] text-gray-500 mt-0.5 truncate">Via {product.seller}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-900/60 pt-4 mt-2">
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Price</p>
                        <p className="text-base font-black text-white mt-0.5">৳{product.price}</p>
                      </div>
                      <div>
                        <span className="px-2.5 py-1 bg-[#7C4DFF]/10 text-[#B388FF] text-[10px] font-bold uppercase tracking-wider rounded-lg border border-[#7C4DFF]/20">
                          {product.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <button onClick={() => openForm(product)} className="w-full bg-gray-800/50 hover:bg-gray-800 border border-gray-800 text-white font-bold text-xs py-2 rounded-xl transition-all">Edit Asset</button>
                      <button onClick={() => setProducts(products.filter(p => p.id !== product.id))} className="w-full bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 text-xs font-bold py-2 rounded-xl transition-all">Wipe</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* -------------------------------------- */}
            {/* MODULE 2: STOCK LOGISTICS */}
            {/* -------------------------------------- */}
            {currentSection === 'stock' && (
              <div className="bg-[#111827]/30 border border-gray-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
                <div className="p-6 border-b border-gray-900 bg-gray-900/20 flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Warehouse Allocation</h3>
                  <span className="text-[11px] font-mono text-[#B388FF]">Live Sync Count</span>
                </div>
                <div className="divide-y divide-gray-900">
                  {products.map((product) => (
                    <div key={product.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-900/20 transition-all">
                      <div className="flex items-center gap-4">
                        <img src={product.img} alt="" className="w-10 h-10 rounded-lg object-cover border border-gray-800 bg-gray-900" />
                        <div>
                          <h4 className="text-sm font-bold text-white">{product.name}</h4>
                          <p className="text-xs text-gray-500 mt-0.5">Vendor Node: <span className="text-gray-400">{product.seller}</span></p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-sm font-mono font-bold text-gray-300">{product.stock} Units Avaialble</span>
                        <div className="w-32">
                          {product.stock === 0 ? (
                            <span className="w-full block text-center py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-[10px] font-black uppercase tracking-wider">Out of Stock</span>
                          ) : product.stock <= 5 ? (
                            <span className="w-full block text-center py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-lg text-[10px] font-black uppercase tracking-wider animate-pulse">Critical Low</span>
                          ) : (
                            <span className="w-full block text-center py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-[10px] font-black uppercase tracking-wider">Stable Buffer</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* -------------------------------------- */}
            {/* MODULE 3: VENDOR DIRECTORY */}
            {/* -------------------------------------- */}
            {currentSection === 'sellers' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sellers.map((seller) => (
                  <div key={seller.id} className="bg-[#111827]/40 border border-gray-800/80 rounded-2xl p-6 flex flex-col justify-between gap-5">
                    <div className="flex items-center justify-between border-b border-gray-900/80 pb-4">
                      <div>
                        <h3 className="text-sm font-black text-white tracking-wide">{seller.name}</h3>
                        <p className="text-xs font-mono text-gray-500 mt-0.5">{seller.email}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-amber-400">★ {seller.rating}</span>
                        <p className="text-[10px] text-gray-500 mt-0.5">Vendor Rating</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-3 bg-gray-900/30 border border-gray-900 rounded-xl">
                        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">SKUs</span>
                        <p className="text-sm font-bold text-white mt-1">{seller.activeProducts}</p>
                      </div>
                      <div className="p-3 bg-gray-900/30 border border-gray-900 rounded-xl">
                        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Gross Sales</span>
                        <p className="text-sm font-bold text-emerald-400 mt-1">৳{seller.totalSales}</p>
                      </div>
                      <div className="p-3 bg-gray-900/30 border border-gray-900 rounded-xl">
                        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Owed</span>
                        <p className="text-sm font-bold text-rose-400 mt-1">৳{seller.payoutPending}</p>
                      </div>
                    </div>

                    {seller.payoutPending !== '0' ? (
                      <button onClick={() => alert(`Clearing dues for ${seller.name}`)} className="w-full bg-gradient-to-r from-[#7C4DFF] to-[#6236ff] text-white font-bold text-xs uppercase tracking-widest py-2.5 rounded-xl shadow-lg shadow-[#7C4DFF]/10 hover:shadow-[#7C4DFF]/20 transition-all">
                        Clear Payout Vault
                      </button>
                    ) : (
                      <div className="text-center text-xs text-gray-500 border border-dashed border-gray-800 py-2 rounded-xl bg-gray-900/10">All Dues Settled</div>
                    )}
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </main>

      {/* ========================================== */}
      {/* HUD GLASS MODAL FORM */}
      {/* ========================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] w-full max-w-lg rounded-2xl border border-gray-800 shadow-2xl p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-gray-900 pb-3">
              <h3 className="text-sm font-black uppercase tracking-widest text-white">{isEditing ? 'Update Node Item' : 'Provision MongoDB Record'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white text-xl font-bold">×</button>
            </div>

            <form onSubmit={handleSave} className="flex flex-col gap-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">
              <div className="flex flex-col gap-1.5">
                <label>Product Label / Model</label>
                <input required type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="bg-[#0B0F19] border border-gray-800 p-3 rounded-xl text-sm normal-case text-white focus:outline-none focus:border-[#7C4DFF]" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label>Category Node</label>
                  <input required type="text" value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="bg-[#0B0F19] border border-gray-800 p-3 rounded-xl text-sm normal-case text-white focus:outline-none focus:border-[#7C4DFF]" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label>UI Tab Target</label>
                  <select value={form.status} onChange={(e) => setForm({...form, status: e.target.value})} className="bg-[#0B0F19] border border-gray-800 p-3 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-[#7C4DFF]">
                    <option value="Featured Products">Featured Products</option>
                    <option value="New Products">New Products</option>
                    <option value="Bestselling products">Bestselling products</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label>Price (BDT Value)</label>
                  <input required type="number" value={form.price} onChange={(e) => setForm({...form, price: Number(e.target.value)})} className="bg-[#0B0F19] border border-gray-800 p-3 rounded-xl text-sm text-white focus:outline-none focus:border-[#7C4DFF]" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label>Warehouse Volume</label>
                  <input required type="number" value={form.stock} onChange={(e) => setForm({...form, stock: Number(e.target.value)})} className="bg-[#0B0F19] border border-gray-800 p-3 rounded-xl text-sm text-white focus:outline-none focus:border-[#7C4DFF]" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label>Assigned Verified Seller</label>
                <select value={form.seller} onChange={(e) => setForm({...form, seller: e.target.value})} className="bg-[#0B0F19] border border-gray-800 p-3 rounded-xl text-sm text-white focus:outline-none focus:border-[#7C4DFF]">
                  <option value="">Choose Supplier</option>
                  <option value="Skin Care BD">Skin Care BD</option>
                  <option value="Seoul Cosmetics">Seoul Cosmetics</option>
                  <option value="Ribana Official">Ribana Official</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-900 mt-2 text-xs">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2.5 bg-gray-900 border border-gray-800 text-gray-400 rounded-xl hover:text-white">Abort</button>
                <button type="submit" className="px-5 py-2.5 bg-gradient-to-r from-[#7C4DFF] to-[#6236ff] text-white rounded-xl shadow-lg shadow-[#7C4DFF]/10">
                  {isEditing ? 'Commit Mutation' : 'Broadcast Asset Live'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;