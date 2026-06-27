import React, { useState } from 'react';

const Products = () => {
  // ১. আপনার ডাটা স্ট্রাকচার অনুযায়ী স্কিনকেয়ার প্রোডাক্টস ডামি ডাটা লিস্ট
  const [products, setProducts] = useState([
    {
      id: "15",
      title: "The Body Shop Tea Tree Skin Clearing Facial Wash",
      brand: "The Body Shop",
      size: "250ml",
      sku: "33061",
      category: "Skin",
      status: "Featured Products",
      availability: {
        inStock: true,
        stockCount: 4,
        message: "Only 4 items left in stock"
      },
      pricing: {
        currency: "৳",
        currentPrice: 1350.00,
        originalPrice: 1650.00,
        savings: 300.00,
        discountPercentage: 18
      },
      briefDescription: [
        "Gel-based cleanser suitable for blemished skin.",
        "Infused with Community Fair Trade tea tree oil."
      ],
      tags: ["Skin", "Facial Wash", "Tea Tree"],
      images: "https://bk.shajgoj.com/storage/2018/05/bodyshop-teatree-toner-600.jpg"
    },
    {
      id: "16",
      title: "COSRX Advanced Snail 96 Mucin Power Essence",
      brand: "COSRX",
      size: "100ml",
      sku: "22045",
      category: "Skin",
      status: "Featured Products",
      availability: {
        inStock: true,
        stockCount: 45,
        message: "Only 45 items left in stock"
      },
      pricing: {
        currency: "৳",
        currentPrice: 2100.00,
        originalPrice: 2500.00,
        savings: 400.00,
        discountPercentage: 16
      },
      briefDescription: ["Light-weight essence which absorbs into skin fast."],
      tags: ["Skin", "Essence", "Snail Mucin"],
      images: "https://images.unsplash.com/photo-1608248597481-496100c8c836?w=100&auto=format&fit=crop&q=80"
    },
    {
      id: "17",
      title: "CeraVe Hydrating Facial Cleanser",
      brand: "CeraVe",
      size: "473ml",
      sku: "11094",
      category: "Skin",
      status: "Regular",
      availability: {
        inStock: false,
        stockCount: 0,
        message: "Out of stock"
      },
      pricing: {
        currency: "৳",
        currentPrice: 1850.00,
        originalPrice: 1850.00,
        savings: 0,
        discountPercentage: 0
      },
      briefDescription: ["Cleanses, hydrates and helps restore the protective skin barrier."],
      tags: ["Skin", "Cleanser", "Hydrating"],
      images: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=100&auto=format&fit=crop&q=80"
    }
  ]);

  // ২. সার্চ, ফিল্টার ও পেজ কন্ট্রোল স্টেট
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [stockFilter, setStockFilter] = useState("all"); 
  const [statusFilter, setStatusFilter] = useState("all");

  // ৩. মডেল ফর্মের জন্য ডেডিকেটেড স্টেট (আপনার JSON আর্কিটেকচার অনুযায়ী)
  const [modalFormData, setModalFormData] = useState({
    title: '', brand: '', size: '', sku: '', category: 'Skin', status: 'Featured Products',
    inStock: true, stockCount: '', currentPrice: '', originalPrice: '',
    briefDescription: ['', '', '', ''], tags: '', images: ''
  });

  // ৪. সার্চ এবং ফিল্টারিং লজিক
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStock = stockFilter === "all" ? true :
                         stockFilter === "inStock" ? product.availability.inStock : 
                         !product.availability.inStock;

    const matchesStatus = statusFilter === "all" ? true : product.status === statusFilter;
    
    return matchesSearch && matchesStock && matchesStatus;
  });

  // ৫. মডেল ইনপুট হ্যান্ডলার
  const handleModalChange = (e) => {
    const { name, value, type, checked } = e.target;
    setModalFormData({
      ...modalFormData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleDescriptionChange = (index, value) => {
    const updatedDesc = [...modalFormData.briefDescription];
    updatedDesc[index] = value;
    setModalFormData({ ...modalFormData, briefDescription: updatedDesc });
  };

  // ৬. নতুন স্কিনকেয়ার প্রোডাক্ট যুক্ত করার সাবমিট লজিক
  const handleAddProductSubmit = (e) => {
    e.preventDefault();

    const currentPriceNum = parseFloat(modalFormData.currentPrice) || 0;
    const originalPriceNum = parseFloat(modalFormData.originalPrice) || 0;
    const savings = originalPriceNum > currentPriceNum ? originalPriceNum - currentPriceNum : 0;
    const discountPercentage = originalPriceNum > 0 ? Math.round((savings / originalPriceNum) * 100) : 0;
    const stockCountNum = parseInt(modalFormData.stockCount) || 0;

    const formattedProduct = {
      id: Date.now().toString(),
      title: modalFormData.title,
      brand: modalFormData.brand,
      size: modalFormData.size,
      sku: modalFormData.sku,
      category: modalFormData.category,
      status: modalFormData.status,
      availability: {
        inStock: stockCountNum > 0 ? modalFormData.inStock : false,
        stockCount: stockCountNum,
        message: stockCountNum > 0 ? `Only ${stockCountNum} items left in stock` : "Out of stock"
      },
      pricing: {
        currency: "৳",
        currentPrice: currentPriceNum,
        originalPrice: originalPriceNum,
        savings: savings,
        discountPercentage: discountPercentage
      },
      briefDescription: modalFormData.briefDescription.filter(desc => desc.trim() !== ''),
      tags: modalFormData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      images: modalFormData.images || "https://bk.shajgoj.com/storage/2018/05/bodyshop-teatree-toner-600.jpg"
    };

    setProducts([formattedProduct, ...products]); // লিস্টের শুরুতে অ্যাড হবে
    setIsModalOpen(false); // মডেল বন্ধ হবে
    
    // ফর্ম রিসেট
    setModalFormData({
      title: '', brand: '', size: '', sku: '', category: 'Skin', status: 'Featured Products',
      inStock: true, stockCount: '', currentPrice: '', originalPrice: '',
      briefDescription: ['', '', '', ''], tags: '', images: ''
    });
  };

  return (
    <div className="bg-white rounded-[20px] border border-gray-200 shadow-sm p-6 space-y-6 relative">
      
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
        <div className="w-full sm:max-w-xs relative">
          <span className="absolute left-3.5 top-2.5 text-gray-400 text-sm">🔍</span>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Body Shop, Cosrx, CeraVe..."
            className="w-full bg-white border border-gray-200 pl-10 pr-4 py-2 rounded-xl text-xs outline-none focus:border-[#5A57FF] text-slate-700 transition-all"
          />
        </div>

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
          <div className="absolute right-0 top-12 z-20 bg-white border border-gray-200 rounded-2xl p-4 shadow-lg w-64 space-y-3 to-top-animation">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Stock Status</label>
              <select 
                value={stockFilter} onChange={(e) => setStockFilter(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs text-slate-700 outline-none"
              >
                <option value="all">All Inventory</option>
                <option value="inStock">In Stock</option>
                <option value="outOfStock">Out of Stock</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Filter By Status</label>
              <select 
                value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs text-slate-700 outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="Featured Products">Featured Products</option>
                <option value="Regular">Regular</option>
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
                <input type="checkbox" className="rounded border-gray-300 text-[#5A57FF]" />
              </th>
              <th className="py-3.5 pl-2">Products ⇅</th>
              <th className="py-3.5">Category ⇅</th>
              <th className="py-3.5">Brand ⇅</th>
              <th className="py-3.5">Price ⇅</th>
              <th className="py-3.5">Stock</th>
              <th className="py-3.5">SKU / Size</th>
              <th className="py-3.5 pr-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100/70 text-xs text-slate-700">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-8 text-gray-400 font-medium">No skincare products found.</td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/40 transition-colors">
                  <td className="py-4 pl-4">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="py-4 pl-2 font-medium text-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 border border-gray-100 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={product.images} alt={product.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <span className="truncate max-w-[200px] font-semibold text-slate-800" title={product.title}>{product.title}</span>
                        <span className="text-[10px] text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded-md mt-0.5 self-start font-bold">{product.status}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-gray-500 font-medium">{product.category}</td>
                  <td className="py-4 text-gray-500 font-medium">{product.brand}</td>
                  <td className="py-4 font-bold text-slate-800">
                    {product.pricing.currency}{product.pricing.currentPrice.toLocaleString()} 
                    {product.pricing.discountPercentage > 0 && (
                      <span className="text-[10px] font-medium text-gray-400 line-through ml-1.5">
                        {product.pricing.currency}{product.pricing.originalPrice}
                      </span>
                    )}
                  </td>
                  <td className="py-4">
                    {product.availability.inStock ? (
                      <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
                        In Stock ({product.availability.stockCount})
                      </span>
                    ) : (
                      <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600">
                        Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="py-4 text-gray-400 font-medium">
                    <div>{product.sku}</div>
                    <div className="text-[10px] text-gray-500 font-semibold">{product.size}</div>
                  </td>
                  <td className="py-4 pr-4 text-center">
                    <button className="text-gray-400 hover:text-gray-600 text-sm font-bold">•••</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ======================================================== */}
      {/* INTEGRATED ADD SKINCARE PRODUCT MODAL */}
      {/* ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-gray-100 my-8 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Add New Product to Database</h3>
                <p className="text-[11px] text-gray-400">Payload strictly matches target nested schema properties.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-sm">✕</button>
            </div>
            
            <form onSubmit={handleAddProductSubmit} className="space-y-4 mt-4">
              
              {/* Title & Brand */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Product Title</label>
                  <input 
                    type="text" required name="title" value={modalFormData.title} onChange={handleModalChange}
                    placeholder="e.g. Tea Tree Skin Clearing Facial Wash"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#5A57FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Brand Name</label>
                  <input 
                    type="text" required name="brand" value={modalFormData.brand} onChange={handleModalChange}
                    placeholder="e.g. The Body Shop"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#5A57FF]"
                  />
                </div>
              </div>

              {/* Size, SKU, Category, Status */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Size</label>
                  <input 
                    type="text" name="size" value={modalFormData.size} onChange={handleModalChange}
                    placeholder="e.g. 250ml"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#5A57FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">SKU</label>
                  <input 
                    type="text" name="sku" value={modalFormData.sku} onChange={handleModalChange}
                    placeholder="e.g. 33061"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#5A57FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Category</label>
                  <select 
                    name="category" value={modalFormData.category} onChange={handleModalChange}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs bg-white text-slate-700 outline-none"
                  >
                    <option value="Skin">Skin</option>
                    <option value="Hair">Hair</option>
                    <option value="Makeup">Makeup</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Status</label>
                  <select 
                    name="status" value={modalFormData.status} onChange={handleModalChange}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs bg-white text-slate-700 outline-none"
                  >
                    <option value="Featured Products">Featured Products</option>
                    <option value="New Arrivals">New Arrivals</option>
                    <option value="Regular">Regular</option>
                  </select>
                </div>
              </div>

              {/* Pricing & Stock Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50/50 p-3 rounded-xl border border-gray-100">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Original Price (৳)</label>
                  <input 
                    type="number" required name="originalPrice" value={modalFormData.originalPrice} onChange={handleModalChange}
                    placeholder="1650"
                    className="w-full bg-white border border-gray-200 rounded-xl p-2.5 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Current Price (৳)</label>
                  <input 
                    type="number" required name="currentPrice" value={modalFormData.currentPrice} onChange={handleModalChange}
                    placeholder="1350"
                    className="w-full bg-white border border-gray-200 rounded-xl p-2.5 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Stock Count</label>
                  <input 
                    type="number" required name="stockCount" value={modalFormData.stockCount} onChange={handleModalChange}
                    placeholder="4"
                    className="w-full bg-white border border-gray-200 rounded-xl p-2.5 text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Image & Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Image URL</label>
                  <input 
                    type="url" name="images" value={modalFormData.images} onChange={handleModalChange}
                    placeholder="https://example.com/product.jpg"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Tags (Comma Separated)</label>
                  <input 
                    type="text" name="tags" value={modalFormData.tags} onChange={handleModalChange}
                    placeholder="Skin, Facial Wash, Tea Tree"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Bullet Descriptions Array */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-gray-500">Brief Description Points</label>
                {modalFormData.briefDescription.map((desc, index) => (
                  <input 
                    key={index} type="text" value={desc}
                    onChange={(e) => handleDescriptionChange(index, e.target.value)}
                    placeholder={`Bullet point ${index + 1}`}
                    className="w-full border border-gray-200 rounded-xl p-2 text-xs focus:outline-none focus:border-[#5A57FF]"
                  />
                ))}
              </div>

              {/* Form Actions */}
              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button 
                  type="button" onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-50 text-gray-500 text-xs font-medium rounded-xl hover:bg-gray-100 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-[#5A57FF] hover:bg-[#4845e0] text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
                >
                  Upload Product
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