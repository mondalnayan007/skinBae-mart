import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
// Note: If you use lucide-react or react-icons, you can replace these SVGs with them.
// For native compatibility, raw SVGs are used below.

const ProductDetails = () => {

    const singleProductData = useLoaderData();
    console.log(singleProductData);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  // ডামি ইমেজ গ্যালারি (স্ক্রিনশটের ওপর ভিত্তি করে)
  const images = [
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop&q=80", // Main Product
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80", // Angle 1
    "https://images.unsplash.com/photo-1617897903246-719242758050?w=600&auto=format&fit=crop&q=80", // Angle 2
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80", // Texture
    "https://images.unsplash.com/photo-1608248597481-496100c80836?w=600&auto=format&fit=crop&q=80"  // Model
  ];

  const handleQuantityChange = (type) => {
    if (type === 'inc') setQuantity(prev => prev + 1);
    if (type === 'dec' && quantity > 1) setQuantity(prev => prev - 1);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 select-none antialiased text-gray-900">
      
      {/* ======================================================== */}
      {/* MAIN PRODUCT SECTION (Image Gallery + Details) */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start bg-white p-4 sm:p-6 rounded-2xl border border-gray-50 shadow-sm">
        
        {/* Left Side: Image Gallery (5 Columns on Large Screen) */}
        <div className="lg:col-span-6 xl:col-span-5 w-full flex flex-col gap-4">
          {/* Main Visual Display */}
          <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 group">
            <img 
              src={images[activeImage]} 
              alt="Dot & Key Vitamin C + E Sunscreen" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Promo Badge */}
            <div className="absolute top-4 left-4 bg-[#FF2E63] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm tracking-wide animate-pulse">
              45% OFF
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all duration-200 ${
                  activeImage === index 
                    ? 'border-[#7C4DFF] shadow-sm scale-95' 
                    : 'border-gray-100 hover:border-gray-300'
                }`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Product Meta & Purchase Controls (7 Columns on Large Screen) */}
        <div className="lg:col-span-6 xl:col-span-7 w-full flex flex-col">
          
          {/* Breadcrumb / Brand */}
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#7C4DFF]">
            Dot & Key Skincare
          </span>
          
          {/* Product Title */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-950 mt-2 tracking-tight leading-tight">
            Dot & Key Vitamin C + E Sunscreen SPF 50+ PA++++
          </h1>
          
          {/* Size Info */}
          <p className="text-xs sm:text-sm text-gray-400 mt-1 font-medium">
            Size: <span className="text-gray-600 font-semibold">80gm</span>
          </p>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-3 sm:gap-4 mt-4 flex-wrap">
            <span className="text-2xl sm:text-3xl font-black text-gray-950">
              ৳999.00
            </span>
            <span className="text-sm sm:text-base text-gray-400 line-through font-medium">
              ৳1800.00
            </span>
            <span className="text-xs sm:text-sm font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
              Save ৳801.00
            </span>
          </div>

          <hr className="border-gray-100 my-5" />

          {/* Brief Description Checklist */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-sm font-bold text-gray-900 tracking-wide uppercase">Brief Description</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 font-medium">
              {[
                "Reduces dullness & tan.",
                "Water-light fluid texture.",
                "Blocks UVA, UVB & Blue Light rays.",
                "Fades dark spots.",
                "Does not sting eyes."
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Urgency & Stock Alert */}
          <div className="mt-5 flex items-center gap-2 text-amber-600 bg-amber-50/70 border border-amber-100 px-3 py-2 rounded-xl w-fit text-xs sm:text-sm font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Only 9 items left in stock
          </div>

          {/* Action Row: Quantity + Add To Cart + Wishlist */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            
            {/* Quantity Selector */}
            <div className="flex items-center justify-between border border-gray-200 rounded-xl h-12 px-2 bg-gray-50/50 sm:w-32">
              <button 
                onClick={() => handleQuantityChange('dec')}
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-gray-500 hover:bg-white hover:text-gray-950 hover:shadow-sm transition-all"
              >
                —
              </button>
              <span className="font-bold text-sm text-gray-900 w-8 text-center">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange('inc')}
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-gray-500 hover:bg-white hover:text-gray-950 hover:shadow-sm transition-all"
              >
                +
              </button>
            </div>

            {/* Main Add to Cart Button */}
            <button className="flex-1 h-12 bg-[#FF2E63] text-white font-bold text-sm tracking-wider uppercase rounded-xl shadow-lg shadow-[#FF2E63]/20 hover:bg-[#e02452] active:scale-95 transition-all duration-200">
              Add to Cart
            </button>

            {/* Wishlist Heart Button */}
            <button className="w-12 h-12 border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#FF2E63] hover:border-[#FF2E63] hover:bg-[#FF2E63]/5 active:scale-90 transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
          </div>

          <hr className="border-gray-100 my-5" />

          {/* Product Meta Data (SKU & Categories) */}
          <div className="flex flex-col gap-2 text-xs sm:text-sm font-medium border-l-2 border-gray-100 pl-3">
            <p className="text-gray-400">SKU: <span className="text-gray-700 font-semibold">31954</span></p>
            <p className="text-gray-400 leading-relaxed">
              Categories: <span className="text-gray-600 hover:text-[#7C4DFF] cursor-pointer transition-colors">Sunscreen, Sun Protection, Anti Aging, Dull Skin Treatment</span>
            </p>
          </div>

        </div>
      </div>

      

    </div>
  );
};

export default ProductDetails;