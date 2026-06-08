import React, { useState } from 'react';

const AdminDashboard = () => {
  // Navigation & UI States
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Core Mock Databases (ThemeForest Schema Aligned)
  const [products, setProducts] = useState([
    { id: 'SKU-9021', name: 'COSRX Snail Mucin 96 Essence', category: 'Essence', price: 1450, cost: 900, stock: 42, vendor: 'Skin Care BD', status: 'Active', sales: 120 },
    { id: 'SKU-4412', name: 'CeraVe Hydrating Cleanser 8oz', category: 'Cleanser', price: 1650, cost: 1100, stock: 4, vendor: 'Seoul Cosmetics', status: 'Active', sales: 85 },
    { id: 'SKU-7751', name: 'Ribana Saffron Saffron Soap', category: 'Soap', price: 950, cost: 500, stock: 0, vendor: 'Ribana Ltd', status: 'Suspended', sales: 0 },
  ]);

  const [vendors, setVendors] = useState([
    { id: 'VND-01', name: 'Skin Care BD', email: 'scbd@gmail.com', commission: 10, totalPayout: 450000, pendingPayout: 35000, status: 'Verified' },
    { id: 'VND-02', name: 'Seoul Cosmetics', email: 'seoul@cosmetics.com', commission: 12, totalPayout: 280000, pendingPayout: 0, status: 'Verified' },
    { id: 'VND-03', name: 'Ribana Ltd', email: 'info@ribana.com', commission: 8, totalPayout: 120000, pendingPayout: 18500, status: 'Under Review' },
  ]);

  // Form State for CRUD Operations
  const [form, setForm] = useState({ id: '', name: '', category: '', price: '', cost: '', stock: '', vendor: '', status: 'Active' });

  // CRUD Logics
  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item.id);
      setForm(item);
    } else {
      setEditingItem(null);
      setForm({ id: `SKU-${Math.floor(1000 + Math.random() * 9000)}`, name: '', category: '', price: '', cost: '', stock: '', vendor: '', status: 'Active' });
    }
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (editingItem) {
      setProducts(products.map(p => p.id === editingItem ? form : p));
    } else {
      setProducts([...products, { ...form, sales: 0 }]);
    }
    setIsModalOpen(false);
  };

  const handleToggleStatus = (id) => {
    setProducts(products.map(p => p.id === id ? { ...p, status: p.status === 'Active' ? 'Suspended' : 'Active' } : p));
  };

  // Filtered Products based on Search Query
  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex h-screen bg-[#080B11] text-gray-200 font-sans antialiased overflow-hidden">
      
      {/* ========================================== */}
      {/* 1. COMPACT SIDEBAR HUB */}
      {/* ========================================== */}
      <aside className="w-64 bg-[#0F131A] border-r border-gray-800/80 hidden md:flex flex-col justify-between p-5 z-20">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C4DFF] to-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(124,77,255,0.4)]">
              <span className="text-white font-black text-xs">M</span>
            </div>
            <span className="text-sm font-black tracking-widest text-white uppercase">
              Martfury <span className="text-[#7C4DFF] font-medium text-[10px] normal-case tracking-normal">X</span>
            </span>
          </div>

          <nav className="flex flex-col gap-1">
            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest px-3 mb-2">Modules</span>
            {[
              { id: 'dashboard', label: 'Analytics Board', icon: '📊' },
              { id: 'products', label: 'Catalog Engine', icon: '🛒' },
              { id: 'vendors', label: 'Vendor Grid', icon: '👥' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === tab.id ? 'bg-[#7C4DFF]/15 text-[#B388FF] border border-[#7C4DFF]/30' : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                }`}
              >
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="bg-[#141A24] border border-gray-800/60 rounded-xl p-3 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
          <span className="text-[10px] font-mono font-bold text-gray-400">THEMEFOREST ENGINE</span>
        </div>
      </aside>

      {/* ========================================== */}
      {/* 2. MAIN DISPLAY SYSTEM */}
      {/* ========================================== */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Universal Sticky Glass Header */}
        <header className="h-20 bg-[#080B11]/90 backdrop-blur-md border-b border-gray-900 flex items-center justify-between px-8 z-10 flex-shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <span className="text-xs bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-lg text-gray-400 hidden sm:inline-block">ENVATO NODE</span>
            <input 
              type="text" 
              placeholder="Live Query Database (Name or SKU)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#0F131A] border border-gray-800/80 text-xs px-4 py-2.5 rounded-xl w-full max-w-sm focus:outline-none focus:border-[#7C4DFF] text-white"
            />
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => handleOpenModal()} className="bg-[#7C4DFF] text-white text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-xl shadow-[0_4px_15px_rgba(124,77,255,0.2)] hover:bg-[#6236ff] transition-all">
              + Add SKU
            </button>
          </div>
        </header>

        {/* Dynamic Viewport */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-6xl w-full mx-auto flex flex-col gap-6">

            {/* TAB 1: ANALYTICS BOARD */}
            {activeTab === 'dashboard' && (
              <>
                {/* ThemeForest Standard Counter Widget Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {[
                    { title: 'Gross Revenue', value: '৳8,50,000', label: 'E-Shop Platform', glow: 'shadow-[0_0_20px_rgba(16,185,129,0.05)] border-emerald-500/20' },
                    { title: 'Est Net Profit', value: '৳2,40,500', label: 'After Vendor Deductions', glow: 'shadow-[0_0_20px_rgba(124,77,255,0.05)] border-[#7C4DFF]/20' },
                    { title: 'Total SKUs Transacted', value: '205 Units', label: 'Across All Channels', glow: 'shadow-[0_0_20px_rgba(245,158,11,0.05)] border-amber-500/20' }
                  ].map((stat, i) => (
                    <div key={i} className={`bg-[#0F131A] p-6 rounded-2xl border ${stat.glow}`}>
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.title}</span>
                      <h3 className="text-2xl font-black text-white mt-1.5">{stat.value}</h3>
                      <p className="text-[11px] text-gray-400 mt-2 font-medium">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Performance Analytics Simulation */}
                <div className="bg-[#0F131A] rounded-2xl border border-gray-900 p-6">
                  <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-4">
                    <h4 className="text-xs font-black uppercase tracking-widest text-white">Live Channel Analytics</h4>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold">REALTIME</span>
                  </div>
                  <div className="flex flex-col gap-4">
                    {filteredProducts.map(p => {
                      const profit = (p.price - p.cost) * p.sales;
                      return (
                        <div key={p.id} className="flex items-center justify-between text-xs bg-[#141A24]/40 p-4 rounded-xl border border-gray-900">
                          <div>
                            <p className="font-bold text-white">{p.name}</p>
                            <p className="text-[10px] font-mono text-gray-500 mt-0.5">{p.id} • Sold: {p.sales} Units</p>
                          </div>
                          <div className="text-right">
                            <p className="font-mono font-bold text-emerald-400">+৳{profit.toLocaleString()}</p>
                            <p className="text-[10px] text-gray-500">Net Return Generated</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {/* TAB 2: PRODUCT CATALOG ENGINE */}
            {activeTab === 'products' && (
              <div className="bg-[#0F131A] rounded-2xl border border-gray-900 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-800 text-[10px] font-black text-gray-500 uppercase tracking-widest bg-gray-900/20">
                        <th className="p-4">SKU / Model</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Price Matrix</th>
                        <th className="p-4">Inventory Node</th>
                        <th className="p-4">Status Engine</th>
                        <th className="p-4 text-right">Operation</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs divide-y divide-gray-900 font-medium text-gray-400">
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-[#141A24]/30 transition-colors">
                          <td className="p-4">
                            <p className="font-bold text-white">{product.name}</p>
                            <p className="text-[10px] font-mono text-gray-500 mt-0.5">{product.id}</p>
                          </td>
                          <td className="p-4 text-gray-500">{product.category}</td>
                          <td className="p-4">
                            <p className="text-white font-bold">RRP: ৳{product.price}</p>
                            <p className="text-[10px] text-gray-500">Cost: ৳{product.cost}</p>
                          </td>
                          <td className="p-4">
                            <p className="font-mono font-bold text-white">{product.stock} Pcs</p>
                            {product.stock <= 5 ? <span className="text-[9px] text-amber-500 font-bold">⚠️ CRITICAL</span> : <span className="text-[9px] text-emerald-500 font-bold">✓ OPTIMAL</span>}
                          </td>
                          <td className="p-4">
                            <button 
                              onClick={() => handleToggleStatus(product.id)}
                              className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg border ${
                                product.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                              }`}
                            >
                              {product.status}
                            </button>
                          </td>
                          <td className="p-4 text-right">
                            <button onClick={() => handleOpenModal(product)} className="text-[#B388FF] hover:underline font-bold">Mutate</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: VENDOR GRID */}
            {activeTab === 'vendors' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {vendors.map((vendor) => (
                  <div key={vendor.id} className="bg-[#0F131A] border border-gray-900 rounded-2xl p-5 flex flex-col gap-4">
                    <div className="flex justify-between items-start border-b border-gray-900 pb-3">
                      <div>
                        <h4 className="text-sm font-bold text-white">{vendor.name}</h4>
                        <p className="text-[10px] font-mono text-gray-500 mt-0.5">{vendor.email} • {vendor.id}</p>
                      </div>
                      <span className="text-[10px] bg-[#7C4DFF]/10 text-[#B388FF] border border-[#7C4DFF]/20 px-2.5 py-0.5 rounded-md font-bold uppercase">{vendor.status}</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-[#141A24]/50 border border-gray-900 p-3 rounded-xl">
                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Commission</p>
                        <p className="text-white font-bold font-mono mt-1">{vendor.commission}%</p>
                      </div>
                      <div className="bg-[#141A24]/50 border border-gray-900 p-3 rounded-xl">
                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Paid Payout</p>
                        <p className="text-emerald-400 font-bold font-mono mt-1">৳{vendor.totalPayout.toLocaleString()}</p>
                      </div>
                      <div className="bg-[#141A24]/50 border border-gray-900 p-3 rounded-xl">
                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Owed Vault</p>
                        <p className="text-rose-400 font-bold font-mono mt-1">৳{vendor.pendingPayout.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        placeholder="Commission %"
                        value={vendor.commission}
                        onChange={(e) => setVendors(vendors.map(v => v.id === vendor.id ? { ...v, commission: Number(e.target.value) } : v))}
                        className="bg-[#141A24] border border-gray-900 rounded-xl px-3 py-2 text-xs w-28 text-white focus:outline-none"
                      />
                      <button 
                        disabled={vendor.pendingPayout === 0}
                        onClick={() => {
                          alert(`Disbursing ৳${vendor.pendingPayout} to ${vendor.name} via SSLCommerz.`);
                          setVendors(vendors.map(v => v.id === vendor.id ? { ...v, totalPayout: v.totalPayout + v.pendingPayout, pendingPayout: 0 } : v));
                        }}
                        className={`flex-1 font-bold text-xs uppercase tracking-widest py-2 rounded-xl transition-all ${
                          vendor.pendingPayout === 0 ? 'bg-gray-900 text-gray-600 border border-gray-800 cursor-not-allowed' : 'bg-gradient-to-r from-[#7C4DFF] to-[#6236ff] text-white shadow-md'
                        }`}
                      >
                        {vendor.pendingPayout === 0 ? 'Vault Cleared' : 'Disburse Capital'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </main>

      {/* ========================================== */}
      {/* 3. MUTATION HUD MODAL (THEMEFOREST DYNAMIC CRUD) */}
      {/* ========================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0F131A] w-full max-w-lg rounded-2xl border border-gray-900 shadow-2xl p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-xs font-black uppercase tracking-widest text-white">{editingItem ? 'Mutate Existing Node' : 'Provision New SKU'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white text-xl font-bold">×</button>
            </div>

            <form onSubmit={handleSaveProduct} className="flex flex-col gap-4 text-[10px] font-black uppercase tracking-widest text-gray-500">
              <div className="flex flex-col gap-1.5">
                <label>SKU Model Identifier</label>
                <input readOnly type="text" value={form.id} className="bg-[#080B11] border border-gray-900 p-3 rounded-xl font-mono text-gray-400 focus:outline-none" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label>Product Asset Label</label>
                <input required type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="bg-[#080B11] border border-gray-800 p-3 rounded-xl text-xs normal-case text-white focus:outline-none focus:border-[#7C4DFF]" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label>Category Router</label>
                  <input required type="text" value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="bg-[#080B11] border border-gray-800 p-3 rounded-xl text-xs normal-case text-white focus:outline-none focus:border-[#7C4DFF]" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label>Assigned Supplier Node</label>
                  <select value={form.vendor} onChange={(e) => setForm({...form, vendor: e.target.value})} className="bg-[#080B11] border border-gray-800 p-3 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-[#7C4DFF]">
                    <option value="Skin Care BD">Skin Care BD</option>
                    <option value="Seoul Cosmetics">Seoul Cosmetics</option>
                    <option value="Ribana Ltd">Ribana Ltd</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label>RRP Price</label>
                  <input required type="number" value={form.price} onChange={(e) => setForm({...form, price: Number(e.target.value)})} className="bg-[#080B11] border border-gray-800 p-3 rounded-xl text-xs text-white focus:outline-none focus:border-[#7C4DFF]" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label>Cost Price</label>
                  <input required type="number" value={form.cost} onChange={(e) => setForm({...form, cost: Number(e.target.value)})} className="bg-[#080B11] border border-gray-800 p-3 rounded-xl text-xs text-white focus:outline-none focus:border-[#7C4DFF]" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label>Stock Qty</label>
                  <input required type="number" value={form.stock} onChange={(e) => setForm({...form, stock: Number(e.target.value)})} className="bg-[#080B11] border border-gray-800 p-3 rounded-xl text-xs text-white focus:outline-none focus:border-[#7C4DFF]" />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-900 mt-2 text-xs">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2.5 bg-gray-950 border border-gray-900 text-gray-500 rounded-xl hover:text-white">Abort</button>
                <button type="submit" className="px-5 py-2.5 bg-[#7C4DFF] text-white rounded-xl shadow-lg font-bold uppercase tracking-wider">Commit Structure</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;