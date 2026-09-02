import React from 'react';
import { Link, useLocation } from 'react-router';

const PaymentSuccess = () => {
  const location = useLocation();

  // URL query params অথবা route state থেকে ডাটা নেওয়া (যদি ব্যাকএন্ড পাঠায়)
  const queryParams = new URLSearchParams(location.search);
  const tranId = queryParams.get('tran_id') || location.state?.tranId || 'TXN-' + Math.floor(100000 + Math.random() * 900000);
  const orderAmount = queryParams.get('amount') || location.state?.totalAmount || 0;

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-[#111111] antialiased flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-[0_20px_50px_-12px_rgba(126,70,252,0.12)] text-center relative overflow-hidden">
        
        {/* Top Decorative Circle Accent */}
        <div 
          className="absolute -top-12 -left-12 w-32 h-32 rounded-full opacity-10 pointer-events-none"
          style={{ backgroundColor: '#7E46FC' }}
        ></div>

        {/* Success Checkmark Icon */}
        <div className="mx-auto w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mb-6 relative">
          <div 
            className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-md transition-transform transform scale-100 animate-bounce"
            style={{ backgroundColor: '#7E46FC' }}
          >
            <svg 
              className="w-8 h-8" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>

        {/* Header Text */}
        <span className="text-[11px] font-extrabold tracking-widest uppercase text-[#7E46FC]">
          Payment Successful
        </span>
        <h1 className="text-2xl font-light text-gray-950 tracking-tight mt-1 mb-2">
          Thank You For Your Order!
        </h1>
        <p className="text-xs text-gray-500 max-w-xs mx-auto mb-6 leading-relaxed">
          Your payment has been successfully processed. We are preparing your order to ship soon!
        </p>

        {/* Order Info Card */}
        <div className="bg-[#F9F9FC] rounded-2xl p-4 border border-gray-100 mb-6 text-left space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400 font-medium">Transaction ID</span>
            <span className="font-mono font-bold text-gray-900 tracking-wide">{tranId}</span>
          </div>

          {orderAmount > 0 && (
            <div className="flex justify-between items-center text-xs border-t border-gray-200/50 pt-2">
              <span className="text-gray-400 font-medium">Amount Paid</span>
              <span className="font-black text-gray-950 text-sm">৳{Number(orderAmount).toLocaleString()}</span>
            </div>
          )}

          <div className="flex justify-between items-center text-xs border-t border-gray-200/50 pt-2">
            <span className="text-gray-400 font-medium">Payment Status</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
              PAID
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            to="/"
            style={{ backgroundColor: '#7E46FC' }}
            className="w-full h-11 flex items-center justify-center text-xs font-bold uppercase tracking-widest text-white rounded-xl transition-all hover:brightness-110 active:scale-[0.98] shadow-[0_4px_16px_rgba(126,70,252,0.25)]"
          >
            Continue Shopping
          </Link>

          <Link
            to="/orders" // আপনার যদি কোনো My Orders পেজ থাকে
            className="w-full h-11 flex items-center justify-center text-xs font-bold uppercase tracking-widest text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all border border-gray-200/60"
          >
            View My Orders
          </Link>
        </div>

        {/* Footer Support Text */}
        <p className="text-[10px] text-gray-400 mt-6">
          Need help with your order? <a href="#" className="underline hover:text-[#7E46FC]">Contact Support</a>
        </p>

      </div>
    </div>
  );
};

export default PaymentSuccess;