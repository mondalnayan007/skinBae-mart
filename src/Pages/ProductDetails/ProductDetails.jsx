import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  const apiURL1= "http://localhost:4000";
    const apiURL2 = "https://skin-bae-mart-server.vercel.app";


  useEffect(() => {
    // Vite/React প্রজেক্টে public ফোল্ডার অ্যাক্সেসের সঠিক পাথ
    fetch(`${apiURL1}/product/${id}`)
      .then(res => res.json())
      .then(data => {
        
       setProduct(data);

      })
      .catch(err => console.error("Data loading node error:", err));
  }, [id]);

  // =========================================================
  // 🛠️ সেফটি গার্ড: ডাটা লোড হওয়ার আগ পর্যন্ত রেন্ডারিং হোল্ড রাখবে
  // =========================================================
  if (!product || Object.keys(product).length === 0) {
    return (
      <div className="text-center py-20 font-bold text-gray-500 tracking-wide font-sans">
        Loading Product Data Node...
      </div>
    );
  }


  console.log(product);
  // আপনার নতুন ডাটা স্ট্রাকচার অনুযায়ী নিখুঁত ডিস্ট্রাকচারিং
  const {
    title,
    brand,
    size,
    sku,
    category,
    status,
    availability,
    pricing,
    briefDescription,
    tags,
    images
  } = product;

  // আপনার জেসন ফাইলে ইমেজ যদি একটি স্ট্রিং হয়, তবে সেটিকে অ্যারেতে কনভার্ট করার মেকানিজম


  // কোয়ান্টিটি চেঞ্জ হ্যান্ডলার (যা স্টক লিমিটকে ক্রস করতে দেবে না)
  const handleQuantityChange = (type) => {
    const maxStock = availability?.stockCount || 0;
    if (type === 'inc' && quantity < maxStock) setQuantity(prev => prev + 1);
    if (type === 'dec' && quantity > 1) setQuantity(prev => prev - 1);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 select-none antialiased text-gray-900">
      
      {/* ======================================================== */}
      {/* MAIN PRODUCT SECTION (Image Gallery + Details) */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start bg-white p-4 sm:p-6 rounded-2xl border border-gray-50 shadow-sm">
        
        {/* Left Side: Image Gallery */}
        <div className="lg:col-span-6 xl:col-span-5 w-full flex flex-col gap-4">
          {/* Main Visual Display */}
          <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 group">
            <img 
              src={images} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* ডাইনামিক ডিসকাউন্ট ব্যাজ */}
            {pricing?.discountPercentage > 0 && (
              <div className="absolute top-4 left-4 bg-[#FF2E63] text-white text-xs font-black px-3 py-1.5 rounded-full shadow-sm tracking-wide animate-pulse">
                {pricing.discountPercentage}% OFF
              </div>
            )}
            
            {/* স্টক না থাকলে সোল্ড আউট মোড */}
            {!availability?.inStock && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                <span className="bg-rose-600 text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl">SOLD OUT</span>
              </div>
            )}
          </div>

          {/* Thumbnail Strip (মাল্টিপল ইমেজ থাকলে ডাইনামিকালি দেখাবে) */}
      
            <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
              
                <button
                  
                  
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all duration-200
                    
                      border-[#7C4DFF] shadow-sm scale-95' 
                    
                  }`}
                >
                  <img src={images} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
             
            </div>
         
        </div>

        {/* Right Side: Product Meta & Purchase Controls */}
        <div className="lg:col-span-6 xl:col-span-7 w-full flex flex-col">
          
          {/* Breadcrumb / Brand */}
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#7C4DFF]">
            {brand} • {category}
          </span>
          
          {/* Product Title */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-950 mt-2 tracking-tight leading-tight">
            {title}
          </h1>
          
          {/* Size & Status Info */}
          <div className="flex items-center gap-4 mt-1 font-medium text-xs sm:text-sm">
            <p className="text-gray-400">
              Size: <span className="text-gray-600 font-semibold">{size}</span>
            </p>
            <span className="text-gray-300">|</span>
            <p className="text-[#FF2E63] font-bold uppercase tracking-wider text-[11px] bg-[#FF2E63]/5 px-2 py-0.5 rounded">
              {status}
            </p>
          </div>

          {/* ডাইনামিক প্রাইসিং রো */}
          <div className="flex items-baseline gap-3 sm:gap-4 mt-4 flex-wrap">
            <span className="text-2xl sm:text-3xl font-black text-gray-950">
              {pricing?.currency}{pricing?.currentPrice?.toLocaleString()}
            </span>
            {pricing?.originalPrice > pricing?.currentPrice && (
              <>
                <span className="text-sm sm:text-base text-gray-400 line-through font-medium">
                  {pricing?.currency}{pricing?.originalPrice?.toLocaleString()}
                </span>
                <span className="text-xs sm:text-sm font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                  Save {pricing?.currency}{pricing?.savings?.toLocaleString()}
                </span>
              </>
            )}
          </div>

          <hr className="border-gray-100 my-5" />

          {/* ডাইনামিক ব্রিফ ডেসক্রিপশন অ্যারে লুপিং */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-sm font-bold text-gray-900 tracking-wide uppercase">Brief Description</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 font-medium">
              {briefDescription?.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ডাইনামিক স্টক অ্যালার্ট */}
          <div className={`mt-5 flex items-center gap-2 border px-3 py-2 rounded-xl w-fit text-xs sm:text-sm font-semibold ${
            availability?.inStock && availability?.stockCount > 0
              ? 'text-amber-600 bg-amber-50/70 border-amber-100'
              : 'text-rose-600 bg-rose-50 border-rose-100'
          }`}>
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${availability?.inStock ? 'bg-amber-400' : 'bg-rose-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${availability?.inStock ? 'bg-amber-500' : 'bg-rose-500'}`}></span>
            </span>
            {availability?.inStock && availability?.stockCount > 0 
              ? `Only ${availability.stockCount} items left in stock` 
              : 'Out of Stock'}
          </div>

          {/* Action Row: Quantity + Add To Cart + Wishlist */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            
            {/* Quantity Selector */}
            <div className="flex items-center justify-between border border-gray-200 rounded-xl h-12 px-2 bg-gray-50/50 sm:w-32">
              <button 
                onClick={() => handleQuantityChange('dec')}
                disabled={!availability?.inStock}
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-gray-500 hover:bg-white hover:text-gray-950 hover:shadow-sm transition-all disabled:opacity-30"
              >
                —
              </button>
              <span className="font-bold text-sm text-gray-900 w-8 text-center">
                {availability?.inStock ? quantity : 0}
              </span>
              <button 
                onClick={() => handleQuantityChange('inc')}
                disabled={!availability?.inStock}
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-gray-500 hover:bg-white hover:text-gray-950 hover:shadow-sm transition-all disabled:opacity-30"
              >
                +
              </button>
            </div>

            {/* Main Add to Cart Button */}
            <button 
              disabled={!availability?.inStock}
              className="flex-1 h-12 bg-[#FF2E63] text-white font-bold text-sm tracking-wider uppercase rounded-xl shadow-lg shadow-[#FF2E63]/20 hover:bg-[#e02452] active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100"
            >
              {availability?.inStock ? 'Add to Cart' : 'Sold Out'}
            </button>

            {/* Wishlist Heart Button */}
            <button className="w-12 h-12 border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#FF2E63] hover:border-[#FF2E63] hover:bg-[#FF2E63]/5 active:scale-90 transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
          </div>

          <hr className="border-gray-100 my-5" />

          {/* Product Meta Data (SKU & Tags) */}
          <div className="flex flex-col gap-2 text-xs sm:text-sm font-medium border-l-2 border-gray-100 pl-3">
            <p className="text-gray-400">SKU: <span className="text-gray-700 font-mono font-bold">{sku}</span></p>
            <p className="text-gray-400 leading-relaxed">
              Tags: <span className="text-gray-600 hover:text-[#7C4DFF] cursor-pointer transition-colors">{tags?.join(', ')}</span>
            </p>
          </div>

        </div>
      </div>
      
    </div>
  );
};

export default ProductDetails;