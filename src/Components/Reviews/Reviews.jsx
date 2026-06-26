import React, { useState } from 'react';

const Reviews = () => {
  // ৫টি প্রিমিয়াম ডাটা
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "আনিকা রহমান",
      profession: "সফটওয়্যার ইঞ্জিনিয়ার",
      rating: 5,
      description: "COSRX এর স্নেইল মিউসিনটা আসলেই ম্যাজিকের মতো কাজ করে! Skinbae Mart থেকে একদম Authentic প্রোডাক্ট পেয়েছি। তাদের ফাস্ট ডেলিভারি আর প্রিমিয়াম প্যাকেজিং মন কেড়ে নিয়েছে।",
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
      name: "তাসমিয়া সুলতানা",
      profession: "হাউজওয়াইফ",
      rating: 5,
      description: "সংসার আর বাচ্চাদের সামলে নিজের যত্নে বাইরে গিয়ে কেনাকাটার সময় পাই না। Skinbae Mart এর অ্যাপ থেকে ঘরে বসেই অরিজিনাল প্রোডাক্ট পেয়ে যাই। আমার মতো গৃহিণীদের জন্য এটি বেস্ট!",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 5,
      name: "রাইহান চৌধুরী",
      profession: "ইউআই/ইউএক্স ডিজাইনার",
      rating: 5,
      description: "The Ordinary এর নিয়াসিনামাইড ব্যবহার করে আমার স্কিনের টেক্সচার অনেক ইমপ্রুভ হয়েছে। Skinbae এর অ্যাপ ইন্টারফেস আর রিয়েল-টাইম ট্র্যাকিং সিস্টেমটা জাস্ট অসাধারণ!",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80"
    }
  ]);

  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [exitDirection, setExitDirection] = useState(null); 
  const [isAnimating, setIsAnimating] = useState(false);

  const activeReview = reviews[0];
  const nextReview = reviews[1];

  const handleMouseDown = (e) => {
    if (isAnimating) return; 
    setDragStart(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || isAnimating) return;
    setDragOffset(e.clientX - dragStart);
  };

  const handleMouseUp = () => {
    if (!isDragging || isAnimating) return;
    setIsDragging(false);

    const threshold = 130; 

    if (dragOffset > threshold) {
      triggerVanish('right');
    } else if (dragOffset < -threshold) {
      triggerVanish('left');
    } else {
      setDragOffset(0);
    }
  };

  const triggerVanish = (direction) => {
    setIsAnimating(true);
    setExitDirection(direction);

    setTimeout(() => {
      setReviews((prev) => {
        const updated = [...prev];
        const first = updated.shift();
        updated.push(first);
        return updated;
      });
      setDragOffset(0);
      setExitDirection(null);
      setIsAnimating(false);
    }, 350);
  };

  const handleArrowNext = () => {
    if (isAnimating) return;
    triggerVanish('left');
  };

  const handleArrowPrev = () => {
    if (isAnimating) return;
    triggerVanish('right');
  };

  const prevReviewPreview = reviews[reviews.length - 1];
  const nextReviewPreview = reviews[1];

  return (
    <div className=" bg-[#FFFFFF] text-[#1D1D1F] antialiased p-4 sm:p-8 select-none flex flex-col justify-center overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto w-full relative">
        
        {/* EDITORIAL CHAMPAGNE HEADER */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3 bg-[#C5A880]/10 px-3 py-1 rounded-full border border-[#C5A880]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]"></span>
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C5A880]">Glow Collective</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-[#1D1D1F] uppercase">
            আমাদের হ্যাপি <span className="font-semibold text-[#C5A880]">কমিউনিটি</span>
          </h2>
          <p className="text-xs text-gray-400 mt-2 tracking-wide font-light">
            কার্ডটি সোয়াইপ করে ছুড়ে দিন অথবা দুই পাশের মিনিমাল অ্যারো বাটন ব্যবহার করুন।
          </p>
        </div>

        {/* INTERACTIVE STACK VIEW ENVIRONMENT */}
        <div className="relative h-[420px] max-w-md mx-auto flex items-center justify-center px-4">
          
          {/* LEFT ARROW BUTTON */}
          <button 
            onClick={handleArrowPrev}
            className="absolute left-[-20px] md:left-[-80px] z-40 w-11 h-11 rounded-full bg-white border border-gray-100 shadow-[0_8px_24px_rgba(197,168,128,0.15)] flex items-center justify-center text-[#1D1D1F] hover:text-[#C5A880] active:scale-90 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* ======================================================== */}
          {/* BACKGROUND SIDE PREVIEWS (60% TOP / 20% BOTTOM VISIBILITY WITH BLUR) */}
          {/* ======================================================== */}
          
          {/* LEFT SIDE PREVIEW */}
          <div className="absolute left-[-42%] sm:left-[-58%] w-[85%] h-[370px] bg-[#F8DBE2] rounded-[24px] p-6 border border-gray-100/40 opacity-60 blur-[2px] backdrop-blur-sm scale-[0.88] -rotate-[6deg] origin-bottom-right pointer-events-none transition-all duration-500 hidden sm:flex flex-col justify-between shadow-[0_12px_32px_rgba(197,168,128,0.03)]">
            <div>
              <div className="flex items-center gap-0.5 mb-5 opacity-40">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-[#C5A880]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                ))}
              </div>
              <p className="text-xs font-light text-gray-700 leading-relaxed line-clamp-5">"{prevReviewPreview.description}"</p>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-gray-200/40">
              <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden">
                <img src={prevReviewPreview.image} alt="" className="w-full h-full object-cover grayscale opacity-70" />
              </div>
              <span className="text-xs font-medium text-gray-600">{prevReviewPreview.name}</span>
            </div>
          </div>

          {/* RIGHT SIDE PREVIEW */}
          <div className="absolute right-[-42%] sm:right-[-58%] w-[85%] h-[370px] bg-[#F8DBE2] rounded-[24px] p-6 border border-gray-100/40 opacity-60 blur-[2px] backdrop-blur-sm scale-[0.88] rotate-[6deg] origin-bottom-left pointer-events-none transition-all duration-500 hidden sm:flex flex-col justify-between shadow-[0_12px_32px_rgba(197,168,128,0.03)]">
            <div>
              <div className="flex items-center gap-0.5 mb-5 opacity-40">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-[#C5A880]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                ))}
              </div>
              <p className="text-xs font-light text-gray-700 leading-relaxed line-clamp-5">"{nextReviewPreview.description}"</p>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-gray-200/40">
              <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden">
                <img src={nextReviewPreview.image} alt="" className="w-full h-full object-cover grayscale opacity-70" />
              </div>
              <span className="text-xs font-medium text-gray-600">{nextReviewPreview.name}</span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* UNDERLAY BASE CARD */}
          {/* ======================================================== */}
          <div 
            style={{
              transform: `scale(${Math.min(0.96 + Math.abs(dragOffset) * 0.0003, 1)})`,
              transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)'
            }}
            className="absolute w-full h-[380px] bg-[#F8DBE2] rounded-[24px] p-6 sm:p-8 border border-gray-100/80 shadow-[0_12px_32px_rgba(197,168,128,0.05)] z-10 flex flex-col justify-between pointer-events-none"
          >
            <div>
              <div className="flex items-center gap-0.5 mb-5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-4 h-4 ${i < nextReview.rating ? 'text-[#C5A880]' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                ))}
              </div>
              <p className="text-xs sm:text-sm font-light text-gray-700 leading-relaxed tracking-wide line-clamp-5">
                "{nextReview.description}"
              </p>
            </div>
            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
              <div className="w-11 h-11 rounded-full bg-gray-50 overflow-hidden border-2 border-white shadow-[0_0_0_1px_#EAE3D2]">
                <img src={nextReview.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#1D1D1F]">{nextReview.name}</span>
                <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase mt-0.5">{nextReview.profession}</span>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* PRIMARY ACTIVE INTERACTIVE CARD */}
          {/* ======================================================== */}
          <div
            key={activeReview.id}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              transform: exitDirection === 'right' 
                ? 'translateX(650px) rotate(25px)' 
                : exitDirection === 'left' 
                ? 'translateX(-650px) rotate(-25px)' 
                : `translateX(${dragOffset}px) rotate(${dragOffset * 0.04}deg)`,
              opacity: exitDirection ? 0 : 1,
              transition: isDragging 
                ? 'none' 
                : exitDirection 
                ? 'transform 0.35s ease-in, opacity 0.25s ease-in' 
                : 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.15)',
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
            className="absolute w-full h-[380px] bg-[#F8DBE2] rounded-[24px] p-6 sm:p-8 border border-gray-100/80 shadow-[0_24px_50px_-12px_rgba(197,168,128,0.12)] z-20 flex flex-col justify-between group overflow-hidden select-none"
          >
            {/* Minimalist Hearts */}
            <div>
              <div className="flex items-center gap-0.5 mb-5">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-4 h-4 ${i < activeReview.rating ? 'text-[#C5A880]' : 'text-gray-200'}`} 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                ))}
              </div>

              <p className="text-xs sm:text-sm font-light text-gray-700 leading-relaxed tracking-wide">
                "{activeReview.description}"
              </p>
            </div>

            {/* Bottom Profile Info */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
              <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-50 flex-shrink-0 border-2 border-white shadow-[0_0_0_1px_#EAE3D2]">
                <img 
                  src={activeReview.image} 
                  alt={activeReview.name} 
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#1D1D1F] tracking-tight">
                  {activeReview.name}
                </span>
                <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase mt-0.5">
                  {activeReview.profession}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT ARROW BUTTON */}
          <button 
            onClick={handleArrowNext}
            className="absolute right-[-20px] md:right-[-80px] z-40 w-11 h-11 rounded-full bg-white border border-gray-100 shadow-[0_8px_24px_rgba(197,168,128,0.15)] flex items-center justify-center text-[#1D1D1F] hover:text-[#C5A880] active:scale-90 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

        </div>

      </div>
    </div>
  );
};

export default Reviews;