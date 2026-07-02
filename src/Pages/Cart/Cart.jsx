import React, { useState, useEffect, use } from 'react';
import Swal from 'sweetalert2';
import AuthContext from '../../Context/AuthContext';


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);

  // Auth Context থেকে লগইন ইউজার নেওয়া হচ্ছে
  const { user } = use(AuthContext);
  const apiURL1 = "http://localhost:4000";

  // 🔄 ডাটাবেজ থেকে কার্ট ডাটা লোড করার ফাংশন
  const fetchCartData = () => {
    if (!user?.email) {
      setCartItems([]);
      setLoadingCart(false);
      return;
    }

    setLoadingCart(true);
    fetch(`${apiURL1}/api/cart/${user.email}`)
      .then(res => res.json())
      .then(data => {
        setCartItems(data);
        setLoadingCart(false);
      })
      .catch(err => {
        console.error("Error loading cart:", err);
        setLoadingCart(false);
      });
  };

  // ইউজার চেঞ্জ হলে বা পেজ ফার্স্ট টাইম লোড হলে ডাটা আসবে
  useEffect(() => {
    fetchCartData();
  }, [user]);

  // ➕/➖ কোয়ান্টিটি বাড়ানো বা কমানোর ফাংশন (ডাটাবেজ আপডেট সহ)
const updateQuantity = (productId, delta, currentQty) => {
  const newQty = currentQty + delta;
  if (newQty < 1) return; // ১ এর নিচে নামতে দেবে না

  // 🚀 ১. প্রথমে লোকাল স্টেট আপডেট করে দিন (যাতে রিফ্রেশ ভাবটা না আসে)
  setCartItems(prevItems =>
    prevItems.map(item =>
      item.productId === productId ? { ...item, quantity: newQty } : item
    )
  );

  // আপনার ব্যাকএন্ড রিকোয়েস্ট অবজেক্ট
  const updateData = {
    userEmail: user.email,
    productId: productId,
    quantity: delta, // কত বাড়লো (+1) বা কমলো (-1)
    maxStock: 20
  };

  // 📡 ২. ব্যাকএন্ডে সাইলেন্টলি ডাটা পাঠান (এখানে আর fetchCartData কল করার দরকার নেই)
  fetch(`${apiURL1}/api/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateData)
  })
    .then(res => res.json())
    .then(() => {
      // শুধু নেভবারের টোটাল কাউন্ট আপডেট করার জন্য ইভেন্ট ফায়ার করুন
      window.dispatchEvent(new Event('cartUpdated')); 
    })
    .catch(err => {
      console.error("Error updating quantity:", err);
      // যদি কোনো কারণে ব্যাকএন্ডে ফেইল করে, তবে আগের স্টেটে ফিরিয়ে নিয়ে যান (Fallback)
      fetchCartData();
    });
};

  // ❌ প্রোডাক্ট সম্পূর্ণ রিমুভ করার ফাংশন
  const removeItem = (productId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to remove this item from your bag?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7E46FC',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${apiURL1}/api/cart/remove`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userEmail: user.email, productId: productId })
        })
          .then(res => res.json())
          .then(() => {
            fetchCartData();
            window.dispatchEvent(new Event('cartUpdated')); // 🔔 নেভবার ব্যাজ আপডেট করবে
            Swal.fire({ title: 'Removed!', text: 'Item has been removed.', icon: 'success', timer: 1500, showConfirmButton: false });
          })
          .catch(err => console.error("Error removing item:", err));
      }
    });
  };




  const handlePayment =()=>{
    alert('Payment is processing......')
  }

  // 🧮 ডাইনামিক ক্যালকুলেশন (ডাটাবেজের স্কিমা স্ট্রাকচার অনুযায়ী মডিফাইড)
  // নোটে রাখুন: আপনার প্রোডাক্ট স্কিমায় 'price' এবং 'quantity' যেভাবে আছে সেভাবে গুণ করা হয়েছে।
  const subtotal = cartItems.reduce((acc, item) => acc + (Number(item.price || 0) * Number(item.quantity || 0)), 0);
  const shipping = subtotal > 0 ? 120 : 0; 
  const total = subtotal + shipping;

  // ইউজার লগইন না থাকলে মেসেজ দেখাবে
  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">Please login to see your shopping bag</p>
        <button onClick={() => window.location.href = '/login'} className="h-11 px-8 text-xs font-bold uppercase tracking-widest rounded-xl text-white shadow-lg transition-all" style={{ backgroundColor: '#7E46FC' }}>
          Login to Account
        </button>
      </div>
    );
  }

  // ডাটা লোড হওয়ার আগের লোডিং স্টেট
  if (loadingCart) {
    return (
      <div className="text-center py-32 font-bold text-gray-400 tracking-wide font-sans">
        Syncing Your Shopping Bag With Database...
      </div>
    );
  }

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
            <a href="/" className="inline-block h-10 px-6 pt-2.5 text-xs font-bold uppercase tracking-widest rounded-xl text-white transition-all hover:brightness-110" style={{ backgroundColor: '#7E46FC' }}>
              Shop New Glow
            </a>
          </div>
        ) : (
          
          /* TWO COLUMN LAYOUT: ITEMS & SUMMARY */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* LEFT COLUMN: SHOPPING CART LIST (2/3 Width) */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              {cartItems.map((item) => (
                <div 
                  key={item._id || item.productId} 
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100/40 shadow-[0_12px_32px_-8px_rgba(126,70,252,0.06)] hover:shadow-[0_16px_40px_-6px_rgba(126,70,252,0.12)] transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 group"
                >
                  
                  {/* Image & Main Info */}
                  <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
                    <div className="w-20 h-24 sm:w-24 sm:h-28 bg-[#F9F9F9] rounded-xl overflow-hidden flex-shrink-0 border border-gray-50">
                      <img src={item.images} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>

                    <div className="flex flex-col gap-0.5 sm:gap-1 flex-grow">
                      <span className="text-[10px] font-extrabold tracking-widest text-[#7E46FC] uppercase">SKINBAE</span>
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-900 leading-snug tracking-tight max-w-xs md:max-w-sm">{item.title}</h3>
                      <span className="text-xs font-bold text-gray-950 mt-1 sm:hidden">৳{(Number(item.price) * Number(item.quantity)).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Right Controls: Quantity & Price */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0">
                    
                    {/* QUANTITY CONTROLLER */}
                    <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50/50 h-8">
                      <button onClick={() => updateQuantity(item.productId, -1, item.quantity)} className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-[#7E46FC] font-medium text-sm transition-colors">-</button>
                      <span className="w-8 text-center text-xs font-bold text-gray-900">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productId, 1, item.quantity)} className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-[#7E46FC] font-medium text-sm transition-colors">+</button>
                    </div>

                    {/* PRICE & REMOVE ACTION */}
                    <div className="flex items-center sm:items-end gap-4 sm:flex-col min-w-[100px] text-right">
                      <span className="text-base font-black text-gray-950 tracking-tight hidden sm:block">
                        ৳{(Number(item.price) * Number(item.quantity)).toLocaleString()}
                      </span>
                      <button 
                        onClick={() => removeItem(item.productId)}
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

              <button
               onClick={handlePayment }
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