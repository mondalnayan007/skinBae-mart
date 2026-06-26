import React, { useState } from 'react';

const Reviews = () => {
  // ৫টি প্রিমিয়াম আনস্প্ল্যাশ ডাটা
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "আনিকা রহমান",
      profession: "সফটওয়্যার ইঞ্জিনিয়ার",
      rating: 5,
      description: "COSRX এর স্নেইল মিউসিনটা আসলেই ম্যাজিকের মতো কাজ করে! Skinbae Mart থেকে একদম অথেন্টিক প্রোডাক্ট পেয়েছি। তাদের ফাস্ট ডেলিভারি আর প্রিমিয়াম প্যাকেজিং মন কেড়ে নিয়েছে।",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      name: "সায়েম আহমেদ",
      profession: "ডিজিটাল মার্কেটার",
      rating: 5,
      description: "CeraVe ফেসিয়াল ক্লিনজারটি আমার ড্রাই স্কিনের জন্য লাইফসেভার ছিল। বাংলাদেশে অরিজিনাল কসমেটিকস পাওয়া যেখানে কঠিন, সেখানে Skinbae চোখ বন্ধ করে ভরসা করার মতো একটি প্ল্যাটফর্ম।",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      name: "নুসরাত জাহান",
      profession: "মেডিক্যাল স্টুডেন্ট",
      rating: 4,
      description: "Beauty of Joseon এর সানস্ক্রিনটা আমার ডেইলি রুটিনের অংশ হয়ে গেছে। কোনো হোয়াইট কাস্ট ছাড়ে না এবং স্কিনকে গ্লোয়িং রাখে। প্রিমিয়াম কোয়ালিটি এবং বেস্ট কাস্টমার সার্ভিস!",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 4,
      name: "রাইহান চৌধুরী",
      profession: "ইউআই/ইউএক্স ডিজাইনার",
      rating: 5,
      description: "The Ordinary এর নিয়াসিনামাইড ব্যবহার করে আমার স্কিনের টেক্সচার অনেক ইমপ্রুভ হয়েছে। Skinbae এর অ্যাপ ইন্টারফেস আর রিয়েল-টাইম ট্র্যাকিং সিস্টেমটা জাস্ট অসাধারণ!",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 5,
      name: "ফারহানা ইয়াসমিন",
      profession: "কনটেন্ট ক্রিয়েটর",
      rating: 5,
      description: "অনলাইনে স্কিনকেয়ার প্রোডাক্ট কিনতে সবসময় ভয় পেতাম। কিন্তু Skinbae Mart এর বারকোড ভেরিফিকেশন সিস্টেম দেখে আমি মুগ্ধ। প্রতিটা প্রোডাক্ট ১০০% জেনুইন।",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"
    }
  ]);

  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e) => {
    setDragStart(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - dragStart);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (dragOffset > 150) {
      handlePrev(); // ডানে ড্র্যাগ করলে আগের কার্ড আসবে
    } else if (dragOffset < -150) {
      handleNext(); // বামে ড্র্যাগ করলে পরের কার্ড আসবে
    }
    setDragOffset(0);
  };

  // নেক্সট স্লাইড (প্রথম কার্ড শেষে যাবে)
  const handleNext = () => {
    setReviews((prev) => {
      const updated = [...prev];
      const first = updated.shift();
      updated.push(first);
      return updated;
    });
  };

  // প্রিভিয়াস স্লাইড (শেষের কার্ড শুরুতে আসবে)
  const handlePrev = () => {
    setReviews((prev) => {
      const updated = [...prev];
      const last = updated.pop();
      updated.unshift(last);
      return updated;
    });
  };

  // ২য় ও ৩য় ইনডেক্সের ডাটা সাইড প্রিভিউ কার্ডে দেখানোর জন্য
  const prevReviewPreview = reviews[reviews.length - 1];
  const nextReviewPreview = reviews[1];

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] antialiased p-4 sm:p-8 lg:p-12 select-none flex flex-col justify-center overflow-hidden">
      <div className="max-w-6xl mx-auto w-full relative">
        
        {/* HEADER ZONE */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-2 bg-[#7E46FC]/5 px-3 py-1 rounded-full border border-[#7E46FC]/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7E46FC]"></span>
            <span className="text-[10px] font-extrabold tracking-[0.25em] uppercase text-[#7E46FC]">Glow Stack Reviews</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-950 uppercase">
            আমাদের হ্যাপি <span className="text-[#7E46FC]">কমিউনিটি</span>
          </h2>
          <p className="text-xs text-gray-400 mt-2 tracking-wide">
            কার্ডটি ড্র্যাগ করে ছুড়ে দিন অথবা দুই পাশের অ্যারো বাটন ব্যবহার করে স্লাইড করুন।
          </p>
        </div>

        {/* ======================================================= */}
        {/* INTERACTIVE STACK VIEW WITH ARROW CONTROLS */}
        {/* ======================================================= */}
        <div className="relative h-[420px] max-w-md mx-auto flex items-center justify-center px-4">
          
          {/* LEFT MANUAL ARROW BUTTON */}
          <button 
            onClick={handlePrev}
            className="absolute left-[-20px] md:left-[-70px] z-40 w-11 h-11 rounded-full bg-white border border-gray-100 shadow-[0_8px_24px_rgba(126,70,252,0.12)] flex items-center justify-center text-[#7E46FC] hover:bg-[#7E46FC] hover:text-white active:scale-90 transition-all duration-300"
            title="Previous Review"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* BACKGROUND LEFT CARD (TINTED BLURRED PREVIEW - NOW VISIBLE ON WHITE) */}
          <div className="absolute left-[-30%] sm:left-[-45%] w-[85%] h-[340px] bg-gradient-to-br from-[#7E46FC]/5 to-[#7E46FC]/10 rounded-[32px] p-6 border-2 border-white/80 opacity-60 blur-[2px] scale-[0.85] pointer-events-none transition-all duration-500 hidden sm:flex flex-col justify-between shadow-[0_12px_32px_rgba(126,70,252,0.06)]">
            <div>
              <div className="w-16 h-3 bg-[#7E46FC]/10 rounded-full mb-4"></div>
              <p className="text-[11px] text-gray-400 font-medium line-clamp-4">"{prevReviewPreview.description}"</p>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-[#7E46FC]/5">
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                <img src={prevReviewPreview.image} alt="" className="w-full h-full object-cover grayscale" />
              </div>
              <span className="text-xs font-bold text-gray-400">{prevReviewPreview.name}</span>
            </div>
          </div>

          {/* BACKGROUND RIGHT CARD (TINTED BLURRED PREVIEW - NOW VISIBLE ON WHITE) */}
          <div className="absolute right-[-30%] sm:right-[-45%] w-[85%] h-[340px] bg-gradient-to-br from-[#7E46FC]/5 to-[#7E46FC]/10 rounded-[32px] p-6 border-2 border-white/80 opacity-60 blur-[2px] scale-[0.85] pointer-events-none transition-all duration-500 hidden sm:flex flex-col justify-between shadow-[0_12px_32px_rgba(126,70,252,0.06)]">
            <div>
              <div className="w-16 h-3 bg-[#7E46FC]/10 rounded-full mb-4"></div>
              <p className="text-[11px] text-gray-400 font-medium line-clamp-4">"{nextReviewPreview.description}"</p>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-[#7E46FC]/5">
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                <img src={nextReviewPreview.image} alt="" className="w-full h-full object-cover grayscale" />
              </div>
              <span className="text-xs font-bold text-gray-400">{nextReviewPreview.name}</span>
            </div>
          </div>

          {/* REAR STACK UNDERLAY NODE */}
          <div className="absolute w-[92%] h-[375px] bg-white rounded-[32px] border border-gray-100 shadow-[0_12px_32px_-8px_rgba(126,70,252,0.04)] bottom-2 scale-[0.95] z-10 opacity-90 transition-all duration-300 pointer-events-none"></div>

          {/* ========================================== */}
          {/* PRIMARY ACTIVE INTERACTIVE CARD */}
          {/* ========================================== */}
          <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              transform: `translateX(${dragOffset}px) rotate(${dragOffset * 0.05}deg)`,
              transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
            className="absolute w-full h-[380px] bg-white rounded-[32px] p-6 sm:p-8 border border-gray-100 shadow-[0_24px_64px_-12px_rgba(126,70,252,0.15)] z-20 flex flex-col justify-between group overflow-hidden select-none"
          >
            {/* Decorative Big Quote Handle */}
            <div className="absolute -top-4 -right-1 text-gray-50 text-8xl font-serif pointer-events-none group-hover:text-[#7E46FC]/5 transition-colors duration-500">
              “
            </div>

            {/* Top Area: Rating Stars & Review Content */}
            <div>
              <div className="flex items-center gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-4 h-4 ${i < reviews[0].rating ? 'text-[#7E46FC]' : 'text-gray-200'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-xs sm:text-sm font-medium text-gray-600 leading-relaxed tracking-wide">
                "{reviews[0].description}"
              </p>
            </div>

            {/* Bottom Area: Identity Profile Mesh */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-50 flex-shrink-0 border-2 border-white shadow-[0_0_0_2px_rgba(126,70,252,0.15)] group-hover:shadow-[0_0_0_2px_#7E46FC] transition-all duration-300">
                <img 
                  src={reviews[0].image} 
                  alt={reviews[0].name} 
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-950 tracking-tight">
                  {reviews[0].name}
                </span>
                <span className="text-[11px] text-gray-400 font-bold tracking-wide mt-0.5">
                  {reviews[0].profession}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT MANUAL ARROW BUTTON */}
          <button 
            onClick={handleNext}
            className="absolute right-[-20px] md:right-[-70px] z-40 w-11 h-11 rounded-full bg-white border border-gray-100 shadow-[0_8px_24px_rgba(126,70,252,0.12)] flex items-center justify-center text-[#7E46FC] hover:bg-[#7E46FC] hover:text-white active:scale-90 transition-all duration-300"
            title="Next Review"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

        </div>

      </div>
    </div>
  );
};

export default Reviews;