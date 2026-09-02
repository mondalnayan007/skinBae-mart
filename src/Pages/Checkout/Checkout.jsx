import React, { useState, use } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import AuthContext from '../../Context/AuthContext';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = use(AuthContext);

  // Cart পেজ থেকে পাঠানো state গ্রহণ
  const { cartItems, subtotal, shipping, total } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'cod', // Default: Cash on Delivery
  });


  const [isSubmitting, setIsSubmitting] = useState(false);
  const apiURL1 = "http://localhost:4000";

  // Cart ফাঁকা থাকলে বা সরাসরি লিঙ্ক ওপেন করলে কার্ট পেজে ব্যাক পাঠাবে
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">No order items found</p>
        <button 
          onClick={() => navigate('/cart')} 
          className="h-11 px-8 text-xs font-bold uppercase tracking-widest rounded-xl text-white shadow-lg"
          style={{ backgroundColor: '#7E46FC' }}
        >
          Return to Cart
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderData = {
      userEmail: user?.email,
      shippingInfo: formData,
      items: cartItems,
      subtotal,
      shippingFee: shipping,
      totalAmount: total,
      orderDate: new Date().toISOString(),
      status: 'Pending',
    };
    console.log(orderData);

    // 📡 ব্যাকএন্ডে অর্ডার ডাটা পাঠানো
    fetch(`${apiURL1}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsSubmitting(false);
        
         window.location.replace(data.url)
        
      })
      .catch((err) => {
        setIsSubmitting(false);
        console.error("Error placing order:", err);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to place order. Please try again.',
          icon: 'error',
          confirmButtonColor: '#7E46FC',
        });
      });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-[#111111] antialiased p-4 sm:p-8 lg:p-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-light tracking-wide text-gray-950 uppercase mb-8 border-b border-gray-200/60 pb-4">
          Checkout <span className="font-normal text-gray-400"> Shipping & Payment</span>
        </h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Shipping Details Form (2 Columns Width) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_12px_32px_-8px_rgba(126,70,252,0.06)]">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-950 border-b border-gray-100 pb-3 mb-5">
                Shipping Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full h-11 px-4 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#7E46FC]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    disabled
                    value={formData.email}
                    className="w-full h-11 px-4 text-xs bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="017XXXXXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full h-11 px-4 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#7E46FC]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">City / Region</label>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="e.g. Dhaka"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full h-11 px-4 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#7E46FC]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Full Address</label>
                  <textarea
                    name="address"
                    required
                    rows="3"
                    placeholder="House, Road, Area details..."
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-4 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#7E46FC]"
                  />
                </div>
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_12px_32px_-8px_rgba(126,70,252,0.06)]">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-950 border-b border-gray-100 pb-3 mb-4">
                Payment Method
              </h2>
              
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:border-[#7E46FC] transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                    className="accent-[#7E46FC]"
                  />
                  <span className="text-xs font-semibold text-gray-800">Cash on Delivery (COD)</span>
                </label>

                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:border-[#7E46FC] transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={formData.paymentMethod === 'online'}
                    onChange={handleChange}
                    className="accent-[#7E46FC]"
                  />
                  <span className="text-xs font-semibold text-gray-800">Online Payment (bKash / Card / Mobile Banking)</span>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Order Overview (1 Column Width) */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_12px_32px_-8px_rgba(126,70,252,0.06)] flex flex-col gap-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-950 border-b border-gray-100 pb-3">
              Order Summary
            </h2>

            <div className="flex flex-col gap-3 max-h-60 overflow-y-auto border-b border-gray-100 pb-3">
              {cartItems.map((item) => (
                <div key={item._id || item.productId} className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <img src={item.images} alt={item.title} className="w-10 h-10 rounded object-cover" />
                    <div>
                      <p className="font-semibold text-gray-800 line-clamp-1">{item.title}</p>
                      <span className="text-gray-400">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-bold text-gray-900">৳{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 text-xs font-medium text-gray-500 border-b border-gray-100 pb-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-gray-950 font-bold">৳{subtotal?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="text-gray-950 font-bold">৳{shipping?.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline pt-1">
              <span className="text-sm font-bold text-gray-950 uppercase">Total</span>
              <span className="text-xl font-black text-gray-950">৳{total?.toLocaleString()}</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{ backgroundColor: '#7E46FC' }}
              className="w-full h-11 text-xs font-bold uppercase tracking-widest text-white rounded-xl mt-4 transition-all hover:brightness-110 active:scale-[0.98] shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? 'Confirming Order...' : 'Confirm Order'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Checkout;