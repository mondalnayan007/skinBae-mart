import React, { useState } from 'react';

const AdminDashboard = () => {
  // সেন্ট্রাল মডিউল রাউটিং স্টেট
  const [currentSection, setCurrentSection] = useState('products');
  
  // প্রোডাক্ট লিস্ট স্টেট (CRUD অপারেশনের জন্য মক ডাটাবেজ)
  const [products, setProducts] = useState([
    { id: 1, name: 'COSRX Snail Mucin Essence', category: 'Essence', price: 1450, stock: 42, seller: 'Skin Care BD', status: 'Bestselling' },
    { id: 2, name: 'CeraVe Moisturizing Cream 16oz', category: 'Moisturizer', price: 1850, stock: 4, seller: 'Seoul Cosmetics', status: 'New' },
    { id: 3, name: 'Ribana Saffron Brightening Soap', category: 'Soap', price: 950, stock: 0, seller: 'Ribana Official', status: 'Featured' },
  ]);

  // সেলার বা ভেন্ডর ডাটা স্টেট
  const [sellers, setSellers] = useState([
    { id: 1, name: 'Skin Care BD', email: 'info@skincarebd.com', activeProducts: 120, totalSales: '৳4,50,000', payoutPending: '৳35,000', status: 'Approved' },
    { id: 2, name: 'Seoul Cosmetics', email: 'wholesale@seoul.com', activeProducts: 85, totalSales: '৳2,80,000', payoutPending: '৳0', status: 'Approved' },
    { id: 3, name: 'Ribana Official', email: 'sales@ribana.com', activeProducts: 14, totalSales: '৳1,20,000', payoutPending: '৳18,500', status: 'Pending Review' },
  ]);

  // Modal এবং Form states (নতুন প্রোডাক্ট অ্যাড এবং এডিটের জন্য)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductForm, setCurrentProductForm] = useState({ id: '', name: '', category: '', price: '', stock: '', seller: '', status: 'New' });

  // ==========================================
  // CRUD & MANAGEMENT LOGICS
  // ==========================================
  
  // ফর্ম ওপেন করার ফাংশন (Add New এর জন্য)
  const openAddModal = () => {
    setCurrentProductForm({ id: '', name: '', category: '', price: '', stock: '', seller: '', status: 'New' });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // ফর্ম ওপেন করার ফাংশন (Edit এর জন্য)
  const openEditModal = (product) => {
    setCurrentProductForm(product);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // ফর্ম সাবমিট হ্যান্ডলার (অ্যাড এবং এডিট দুইটাই হ্যান্ডেল করবে)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update Logic
      setProducts(products.map(p => p.id === currentProductForm.id ? currentProductForm : p));
    } else {
      // Create Logic
      const newProduct = { ...currentProductForm, id: Date.now() };
      setProducts([...products, newProduct]);
    }
    setIsModalOpen(false);
  };

  // প্রোডাক্ট ডিলিট করার লজিক
  const handleDeleteProduct = (id) => {
    if(window.confirm("Are you sure you want to delete this product from MongoDB?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="flex h-screen bg-[#F4F6F9] text-gray-800 font-sans antialiased select-none overflow-hidden">
      
      {/* ========================================== */}
      {/* SIDEBAR: NAVIGATION PANEL */}
      {/* ========================================== */}
      <aside className="w-72 bg-gray-950 text-gray-400 flex flex-col justify-between hidden lg:flex flex-shrink-0">
        <div className="flex flex-col overflow-y-auto">
          <div className="p-6 border-b border-gray-900 flex items-center justify-between">
            <span className="text-xl font-black text-white tracking-widest uppercase">
              Skin<span className="text-[#7C4DFF]">bae</span> <span className="text-xs font-normal text-purple-400">HQ</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
          </div>

          <nav className="p-4 flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600 px-3 mb-2">Core ERP Modules</span>
            
            <button onClick={() => setCurrentSection('products')} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${currentSection === 'products' ? 'bg-[#7C4DFF] text-white' : 'hover:bg-gray-900'}`}>
              📦 Products & CRUD
            </button>
            <button onClick={() => setCurrentSection('stock')} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${currentSection === 'stock' ? 'bg-[#7C4DFF] text-white' : 'hover:bg-gray-900'}`}>
              📊 Stock & Inventory
            </button>
            <button onClick={() => setCurrentSection('sellers')} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${currentSection === 'sellers' ? 'bg-[#7C4DFF] text-white' : 'hover:bg-gray-900'}`}>
              🤝 Seller Management
            </button>
            
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600 px-3 my-2">Frontend Control</span>
            <button onClick={() => alert('Redirecting to UI Settings...')} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold hover:bg-gray-900 text-left">
              ⚡ Marquee & Lottie Banner
            </button>
          </nav>
        </div>
        
        <div className="p-4 bg-black/20 border-t border-gray-900 text-xs text-center text-gray-500 font-mono">
          Logged in as: Super_Admin
        </div>
      </aside>

      {/* ========================================== */}
      {/* MAIN CONSOLE DISPLAY AREA */}
      {/* ========================================== */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Universal Top Header */}
        <header className="bg-white h-20 border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-20 flex-shrink-0">
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase text-gray-400">Operations Control</span>
            <h1 className="text-lg font-black text-gray-950 uppercase tracking-tight capitalize">{currentSection} Management Panel</h1>
          </div>
          
          {currentSection === 'products' && (
            <button onClick={openAddModal} className="bg-[#7C4DFF] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-[#7C4DFF]/20 hover:bg-[#6236ff] transition-all">
              + Insert New Product
            </button>
          )}
        </header>

        {/* Dynamic View Container */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-6xl w-full mx-auto">

            {/* -------------------------------------- */}
            {/* MODULE 1: PRODUCT CATALOG & CRUD TABLE */}
            {/* -------------------------------------- */}
            {currentSection === 'products' && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-50 bg-gray-50/50">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Live Inventory Array</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50/30">
                        <th className="p-4">Model Name</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Frontend Tab</th>
                        <th className="p-4">Price</th>
                        <th className="p-4 text-right">Database Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100 font-medium text-gray-600">
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50/60 transition-colors">
                          <td className="p-4 font-bold text-gray-900">{product.name}</td>
                          <td className="p-4 text-gray-400">{product.category}</td>
                          <td className="p-4">
                            <span className="px-2.5 py-0.5 bg-purple-50 text-purple-600 text-xs font-bold rounded-full">{product.status}</span>
                          </td>
                          <td className="p-4 text-gray-900 font-bold">৳{product.price}</td>
                          <td className="p-4 text-right flex items-center justify-end gap-3">
                            <button onClick={() => openEditModal(product)} className="text-xs font-bold text-[#7C4DFF] hover:underline">Edit</button>
                            <span className="text-gray-200">|</span>
                            <button onClick={() => handleDeleteProduct(product.id)} className="text-xs font-bold text-red-500 hover:underline">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* -------------------------------------- */}
            {/* MODULE 2: STOCK & INVENTORY METRICS */}
            {/* -------------------------------------- */}
            {currentSection === 'stock' && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-50 bg-gray-50/50">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Stock Control & Warehousing</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50/30">
                        <th className="p-4">Product</th>
                        <th className="p-4">Vendor</th>
                        <th className="p-4">Units in Hand</th>
                        <th className="p-4">Stock Status Alert</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100 font-medium text-gray-600">
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50/60">
                          <td className="p-4 font-bold text-gray-900">{product.name}</td>
                          <td className="p-4 text-gray-400">{product.seller}</td>
                          <td className="p-4 font-mono font-bold text-gray-900">{product.stock} Pcs</td>
                          <td className="p-4">
                            {product.stock === 0 ? (
                              <span className="px-2.5 py-1 bg-red-50 text-red-600 text-[11px] font-black uppercase rounded-lg border border-red-100">Out of Stock</span>
                            ) : product.stock <= 5 ? (
                              <span className="px-2.5 py-1 bg-amber-50 text-amber-600 text-[11px] font-black uppercase rounded-lg border border-amber-100 animate-pulse">Critical Low Stock</span>
                            ) : (
                              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-[11px] font-black uppercase rounded-lg border border-emerald-100">Stock Stable</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* -------------------------------------- */}
            {/* MODULE 3: SELLER & VENDOR CONTROLLER */}
            {/* -------------------------------------- */}
            {currentSection === 'sellers' && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-50 bg-gray-50/50">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Multi-Vendor Analytics</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50/30">
                        <th className="p-4">Seller Identity</th>
                        <th className="p-4">SKUs Listed</th>
                        <th className="p-4">Gross Revenue</th>
                        <th className="p-4">Pending Pay-out</th>
                        <th className="p-4 text-right">Clearance</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100 font-medium text-gray-600">
                      {sellers.map((seller) => (
                        <tr key={seller.id} className="hover:bg-gray-50/60">
                          <td className="p-4">
                            <p className="font-bold text-gray-900">{seller.name}</p>
                            <p className="text-[11px] text-gray-400 font-mono">{seller.email}</p>
                          </td>
                          <td className="p-4 font-bold text-gray-900">{seller.activeProducts} Items</td>
                          <td className="p-4 text-gray-900 font-bold">{seller.totalSales}</td>
                          <td className="p-4 text-rose-600 font-black">{seller.payoutPending}</td>
                          <td className="p-4 text-right">
                            {seller.payoutPending !== '৳0' ? (
                              <button onClick={() => alert(`Processing payout for ${seller.name}`)} className="bg-gray-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg hover:bg-gray-800">Release Cash</button>
                            ) : (
                              <span className="text-xs text-gray-400">Settled</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      {/* =================================================** = */}
      {/* GLOBAL MODAL COMPONENT: ADD / EDIT PRODUCT FORM */}
      {/* =================================================** = */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-100 p-6 flex flex-col gap-5 mx-4">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-black text-gray-950 uppercase">{isEditing ? 'Modify Product Data' : 'Insert Product into MongoDB'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700 font-bold text-lg">×</button>
            </div>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 text-xs font-bold text-gray-500">
              <div className="flex flex-col gap-1.5">
                <label className="uppercase">Product Name</label>
                <input required type="text" value={currentProductForm.name} onChange={(e) => setCurrentProductForm({...currentProductForm, name: e.target.value})} className="border border-gray-200 p-2.5 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:border-[#7C4DFF]" placeholder="e.g. COSRX BHA Liquid" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="uppercase">Category</label>
                  <input required type="text" value={currentProductForm.category} onChange={(e) => setCurrentProductForm({...currentProductForm, category: e.target.value})} className="border border-gray-200 p-2.5 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:border-[#7C4DFF]" placeholder="e.g. Essence" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="uppercase">Frontend Tab Placement</label>
                  <select value={currentProductForm.status} onChange={(e) => setCurrentProductForm({...currentProductForm, status: e.target.value})} className="border border-gray-200 p-2.5 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:border-[#7C4DFF]">
                    <option value="Featured Products">Featured Products</option>
                    <option value="New Products">New Products</option>
                    <option value="Bestselling products">Bestselling products</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="uppercase">Price (BDT)</label>
                  <input required type="number" value={currentProductForm.price} onChange={(e) => setCurrentProductForm({...currentProductForm, price: Number(e.target.value)})} className="border border-gray-200 p-2.5 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:border-[#7C4DFF]" placeholder="1450" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="uppercase">Initial Stock (Warehouse)</label>
                  <input required type="number" value={currentProductForm.stock} onChange={(e) => setCurrentProductForm({...currentProductForm, stock: Number(e.target.value)})} className="border border-gray-200 p-2.5 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:border-[#7C4DFF]" placeholder="50" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="uppercase">Assigned Seller/Vendor</label>
                <select value={currentProductForm.seller} onChange={(e) => setCurrentProductForm({...currentProductForm, seller: e.target.value})} className="border border-gray-200 p-2.5 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:border-[#7C4DFF]">
                  <option value="">Select Vendor</option>
                  <option value="Skin Care BD">Skin Care BD</option>
                  <option value="Seoul Cosmetics">Seoul Cosmetics</option>
                  <option value="Ribana Official">Ribana Official</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-[#7C4DFF] text-white rounded-xl shadow-lg shadow-[#7C4DFF]/20 hover:bg-[#6236ff] transition-all">
                  {isEditing ? 'Save System Changes' : 'Push Data Live'}
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