import React, { useState } from 'react';
import { BsCartCheck } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      brand: "COSRX",
      name: "Advanced Snail 96 Mucin Power Essence",
      size: "100ml",
      price: "1,450",
      inStock: true,
      image: "https://images.unsplash.com/photo-1608248597481-496100c80836?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      brand: "CERAVE",
      name: "Hydrating Facial Cleanser",
      size: "236ml",
      price: "1,850",
      inStock: true,
      image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      brand: "BEAUTY OF JOSEON",
      name: "Relief Sun : Rice + Probiotics SPF50+",
      size: "50ml",
      price: "1,350",
      inStock: false,
      image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=500&auto=format&fit=crop&q=80"
    }
  ]);

  const removeItem = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-[#111111] antialiased p-4 sm:p-8 lg:p-12">
      <div className="max-w-5xl mx-auto">
        
        {/* ========================================== */}
        {/* PREMIUM EDITORIAL HEADER ZONE */}
        {/* ========================================== */}
        <div className="pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200/60">
          <div>
            <h1 className="text-xl sm:text-2xl font-light tracking-wide text-gray-950 uppercase">
              Your Selection <span className="font-normal text-gray-400">({wishlist.length})</span>
            </h1>
            <p className="text-[11px] sm:text-xs text-gray-400 mt-1 tracking-wide">
              Curated premium skincare systems reserved for your routine.
            </p>
          </div>
          <a href="#shop" className="text-[11px] font-bold tracking-widest uppercase border-b border-gray-950 pb-0.5 hover:text-[#7E46FC] hover:border-[#7E46FC] transition-colors w-fit">
            Continue Shopping
          </a>
        </div>

        {/* ========================================== */}
        {/* RESPONSIVE PREMIUM SHADOW CARD LIST */}
        {/* ========================================== */}
        {wishlist.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            <p className="text-xs tracking-widest uppercase text-gray-400">Your wishlist is empty</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {wishlist.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100/40  shadow-xl transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 group"
              >
                
                {/* LEFT SIDE: IMAGE & METADATA CONTENT PACK */}
                <div className="flex items-center gap-4 sm:gap-6 w-full md:w-auto">
                  {/* Aspect Product Canvas */}
                  <div className="w-20 h-24 sm:w-24 sm:h-28 bg-[#F9F9F9] rounded-xl overflow-hidden flex-shrink-0 relative border border-gray-50">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Text Meta Fields */}
                  <div className="flex flex-col gap-0.5 sm:gap-1 flex-grow">
                    <span className="text-[10px] font-extrabold tracking-widest text-[#7E46FC] uppercase">
                      {item.brand}
                    </span>
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 leading-snug tracking-tight max-w-sm lg:max-w-md">
                      {item.name}
                    </h3>
                    <span className="text-[11px] text-gray-400 font-medium">
                      Size: {item.size}
                    </span>
                    
                    {/* Availability Badge */}
                    <div className="mt-1.5 w-fit">
                      {item.inStock ? (
                        <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md uppercase tracking-wider">In Stock</span>
                      ) : (
                        <span className="text-[9px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md uppercase tracking-wider">Restocking</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE: PRICE & CONTROL CTA WRAPPER */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center w-full md:w-auto gap-4 border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                  
                  {/* Price Block */}
                  <div className="text-left md:text-right">
                    <span className="text-xs font-bold text-gray-400 mr-0.5">৳</span>
                    <span className="text-base sm:text-lg font-black text-gray-950 tracking-tight">{item.price}</span>
                  </div>

                  {/* Actions Package */}
                  <div className="flex items-center gap-4 sm:gap-3">

                       <button className='text-3xl text-green-500 cursor-pointer hover:scale-110 transition-all' >
                      <BsCartCheck />
                    </button>




                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-3xl font-bold cursor-pointer hover:scale-110 transition-all text-rose-500  px-2 py-2 uppercase tracking-wider"
                      title="Remove Item"
                    >
                      <MdDelete />
                    </button>
                    
                    
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Wishlist;