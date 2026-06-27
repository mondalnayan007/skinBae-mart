import React, { useState } from 'react';

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([
    { id: 1, name: "COSRX Advanced Snail Mucin", category: "Skincare", price: "1,450 BDT", stock: 85, image: "https://images.unsplash.com/photo-1608248597481-496100c80836?w=150&auto=format&fit=crop&q=80" },
    { id: 2, name: "CeraVe Hydrating Cleanser", category: "Cleanser", price: "1,850 BDT", stock: 110, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=150&auto=format&fit=crop&q=80" },
    { id: 3, name: "Beauty of Joseon Sunscreen", category: "Sunscreen", price: "1,350 BDT", stock: 0, image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=150&auto=format&fit=crop&q=80" }
  ]);

  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', stock: '', image: '' });

  const handleAddProduct = (e) => {
    e.preventDefault();
    const productToAdd = {
      id: Date.now(),
      name: newProduct.name,
      category: newProduct.category,
      price: `${newProduct.price} BDT`,
      stock: parseInt(newProduct.stock) || 0,
      image: "https://images.unsplash.com/photo-1608248597481-496100c80836?w=150&auto=format&fit=crop&q=80" // Default Static Sample Image
    };
    setProducts([productToAdd, ...products]);
    setIsModalOpen(false);
    setNewProduct({ name: '', category: '', price: '', stock: '', image: '' });
  };

  return (
    <div className="space-y-6 relative">
      {/* Header Area */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Inventory Management</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage stock details and product variations</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#C5A880] hover:bg-[#b3956d] text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-all duration-200 flex items-center gap-2"
        >
          <span>+</span> Add Product
        </button>
      </div>

      {/* Row Card List Environment */}
      <div className="space-y-3.5">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.005)] flex items-center justify-between transition-all hover:border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800">{product.name}</h4>
                <p className="text-xs text-gray-400 mt-0.5">{product.category}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-12 text-right">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Price</p>
                <p className="text-sm font-bold text-gray-800 mt-0.5">{product.price}</p>
              </div>
              <div className="w-24">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-medium text-center">Stock Status</p>
                <span className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full mt-1.5 w-full text-center ${
                  product.stock > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}>
                  {product.stock > 0 ? `${product.stock} In Stock` : 'Out of Stock'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ======================================================== */}
      {/* INPUT FIELD WALA MODAL COMPONENT */}
      {/* ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-50">
              <h3 className="text-sm font-bold text-gray-800">Add New Product to Base</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
            </div>
            <form onSubmit={handleAddProduct} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Product Name</label>
                <input 
                  type="text" required value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  placeholder="e.g. CeraVe Foaming Cleanser"
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#C5A880]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Category</label>
                <input 
                  type="text" required value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  placeholder="e.g. Skincare / Makeup"
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#C5A880]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Price (BDT)</label>
                  <input 
                    type="number" required value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    placeholder="e.g. 1500"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Stock Volume</label>
                  <input 
                    type="number" required value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                    placeholder="e.g. 50"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>
              <div className="pt-4 border-t border-gray-50 flex justify-end gap-3">
                <button 
                  type="button" onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-500 text-xs font-medium rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-[#C5A880] hover:bg-[#b3956d] text-white text-xs font-semibold rounded-xl transition-all"
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