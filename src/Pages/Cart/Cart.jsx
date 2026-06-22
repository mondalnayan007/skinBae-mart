import React, { useState } from 'react';

const Cart = () => {
  // ডামি কার্ট ডাটা
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      brand: "COSRX",
      name: "Advanced Snail 96 Mucin Power Essence",
      size: "100ml",
      price: 1450,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1608248597481-496100c80836?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      brand: "CERAVE",
      name: "Hydrating Facial Cleanser",
      size: "236ml",
      price: 1850,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=500&auto=format&fit=crop&q=80"
    }
  ]);

  // কোয়ান্টিটি বাড়ানোর ফাংশন
  const updateQuantity = (id, delta) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    }));
  };

  // প্রোডাক্ট রিমুভ করার ফাংশน
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // ডাইনামিক ক্যালকুলেশন
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 120 : 0; // ডামি শিপিং চার্জ (যেমন: ঢাকার বাইরে)
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-[#111111] antialiased p-4 sm:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* CART HEADER */}
        <div className="pb-6 mb-8 border-b border-gray-200/60">
          <h1 className="text-xl sm:text-2xl font-light tracking-wide text-gray-950 uppercase">
            Your Bag <span className="font-normal text-gray-400">({cartItems.length} items)</span>
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">Your shopping bag is empty</p>
            <a href="#shop" className="inline-block h-10 px-6 pt-2.5 text-xs font-bold uppercase tracking-widest rounded-xl text-white transition-all hover:brightness-110" style={{ backgroundColor: '#7E46FC' }}>
              Shop New Glow
            </a>
          </div>
        ) : (
          
          /* TWO COLUMN LAYOUT: MESH & SUMMARY */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* LEFT COLUMN: SHOPPING CART LIST (2/3 Width) */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100/40 shadow-[0_12px_32px_-8px_rgba(126,70,252,0.06)] hover:shadow-[0_16px_40px_-6px_rgba(126,70,252,0.12)] transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 group"
                >
                  
                  {/* Image & Main Info */}
                  <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
                    <div className="w-20 h-24 sm:w-24 sm:h-28 bg-[#F9F9F9] rounded-xl overflow-hidden flex-shrink-0 border border-gray-50">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>

                    <div className="flex flex-col gap-0.5 sm:gap-1 flex-grow">
                      <span className="text-[10px] font-extrabold tracking-widest text-[#7E46FC] uppercase">{item.brand}</span>
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-900 leading-snug tracking-tight max-w-xs md:max-w-sm">{item.name}</h3>
                      <span className="text-[11px] text-gray-400 font-medium">Size: {item.size}</span>
                      <span className="text-xs font-bold text-gray-950 mt-1 sm:hidden">৳{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Right Controls: Quantity & Price */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0">
                    
                    {/* QUANTITY TOGGLE CONTROLLER */}
                    <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50/50 h-8">
                      <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-[#7E46FC] font-medium text-sm transition-colors">-</button>
                      <span className="w-8 text-center text-xs font-bold text-gray-900">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-[#7E46FC] font-medium text-sm transition-colors">+</button>
                    </div>

                    {/* PRICE & REMOVE ACTION */}
                    <div className="flex items-center sm:items-end gap-4 sm:flex-col min-w-[100px] text-right">
                      <span className="text-base font-black text-gray-950 tracking-tight hidden sm:block">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </span>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-[11px] font-bold text-gray-400 hover:text-rose-500 uppercase tracking-wider transition-colors ml-auto sm:ml-0"
                      >
                        Remove
                      </button>
                    </div>

                  </div>

                </div>
              ))}
            </div>

            {/* RIGHT COLUMN: ORDER SUMMARY (1/3 Width) */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100/40 shadow-[0_12px_32px_-8px_rgba(126,70,252,0.06)] flex flex-col gap-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-950 border-b border-gray-100 pb-3">Order Summary</h2>
              
              <div className="flex flex-col gap-3 text-xs sm:text-sm font-medium text-gray-500 border-b border-gray-100 pb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-gray-950 font-bold">৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="text-gray-950 font-bold">৳{shipping.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-1">
                <span className="text-sm font-bold text-gray-950 uppercase tracking-wide">Total amount</span>
                <span className="text-xl font-black text-gray-950 tracking-tight">৳{total.toLocaleString()}</span>
              </div>

              {/* CHECKOUT BUTTON WITH #7E46FC GLOW */}
              <button 
                style={{ backgroundColor: '#7E46FC' }}
                className="w-full h-11 text-xs font-bold uppercase tracking-widest text-white rounded-xl mt-4 transition-all hover:brightness-110 active:scale-[0.98] shadow-[0_4px_16px_rgba(126,70,252,0.2)] hover:shadow-[0_6px_20px_rgba(126,70,252,0.35)]"
              >
                Proceed To Checkout
              </button>

              <p className="text-[10px] text-center text-gray-400 mt-2">
                🔒 Secure Checkout Guaranteed by Skinbae
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;