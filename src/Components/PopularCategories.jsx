import React, { useState, useEffect } from 'react';

const PopularCategories = () => {
  const categories = [
    { id: 1, name: 'Cleanser', count: 120, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=150&auto=format&fit=crop&q=80' },
    { id: 2, name: 'Moisturizer', count: 85, image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?w=150&auto=format&fit=crop&q=80' },
    { id: 3, name: 'Sunscreen', count: 64, image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=150&auto=format&fit=crop&q=80' },
    { id: 4, name: 'Serum', count: 95, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=150&auto=format&fit=crop&q=80' },
    { id: 5, name: 'Toner', count: 42, image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=150&auto=format&fit=crop&q=80' },
    { id: 6, name: 'Lip Care', count: 38, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=150&auto=format&fit=crop&q=80' },
    { id: 7, name: 'Eye Cream', count: 29, image: 'https://images.unsplash.com/photo-1629732047847-50b7ecf0cbf1?w=150&auto=format&fit=crop&q=80' },
    { id: 8, name: 'Face Mask', count: 51, image: 'https://images.unsplash.com/photo-1567894340315-735d7c361db0?w=150&auto=format&fit=crop&q=80' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // উইন্ডো সাইজ চেঞ্জ ট্র্যাক করার জন্য (Responsiveness নিখুঁত রাখার জন্য)
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // স্ক্রিন সাইজ অনুযায়ী ডাইনামিক visibleCards ক্যালকুলেশন
  const getVisibleCards = () => {
    if (windowWidth >= 1024) return 6; // Desktop (lg)
    if (windowWidth >= 768) return 5;  // Tablet (md)
    if (windowWidth >= 640) return 4;  // Small Tablet/Mobile (sm)
    return 2.5;                        // Tiny Mobile (কার্ডের কিছু অংশ উঁকি দেবে)
  };

  const visibleCards = getVisibleCards();
  const maxIndex = Math.max(0, categories.length - Math.floor(visibleCards));

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 select-none overflow-hidden sm:overflow-visible">
      
      {/* Title Header */}
      <div className="border-b border-gray-100 pb-4 mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-950 tracking-tight text-center md:text-left">
          Popular Categories
        </h1>
        
      </div>

      {/* Slider Main Container */}
      <div className="relative w-full group/slider px-0 sm:px-2">
        
        {/* Carousel Window Container */}
        <div className="overflow-x-auto sm:overflow-hidden w-full snap-x snap-mandatory sm:snap-none no-scrollbar py-2">
          <div
            className="flex gap-4 transition-transform ease-[cubic-bezier(0.25,1,0.5,1)] duration-700 sm:will-change-transform"
            style={{
              // শুধু মোবাইল বাদে বাকি সব স্ক্রিনে ডাইনামিক স্লাইড ট্রান্সফর্ম কাজ করবে
              transform: windowWidth >= 640 ? `translateX(-${currentIndex * (100 / visibleCards)}%)` : 'none',
            }}
          >
            {categories.map((category) => (
              <div
                key={category.id}
                // প্রতিটি কলামের উইডথ স্ক্রিন সাইজ অনুযায়ী পারফেক্টলি রেসপনসিভ করা হয়েছে
                className="w-[calc(30%-12px)] sm:w-[calc(25%-12px)] md:w-[calc(20%-12px)] lg:w-[calc(16.666%-12px)] flex-shrink-0 snap-center sm:snap-none text-center"
              >
                {/* Individual Category Content Block */}
                <div className="group/item flex flex-col items-center cursor-pointer w-full">
                  
                  {/* Circle Image Wrapper - উইডথ ও হাইট কলামের সাথে ডাইনামিকলি রেসপনসিভ করা হয়েছে (w-full max-w) */}
                  <div className="w-full aspect-square max-w-[130px] sm:max-w-[140px] md:max-w-[150px] lg:max-w-[190px] rounded-full overflow-hidden border border-gray-100 p-1 bg-white shadow-sm transition-all duration-300">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gray-50">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/item:scale-110"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Texts Section */}
                  <div className="mt-3">
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-800 tracking-tight group-hover/item:text-[#7C4DFF] transition-colors duration-200 line-clamp-1">
                      {category.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 font-medium">
                      {category.count} Products
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ultra Smooth - Left Navigation Button */}
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className={`absolute left-[-15px] lg:left-[-22px] top-[30%] sm:top-[35%] w-10 h-10 bg-white text-gray-800 rounded-full border border-gray-100 hidden sm:flex items-center justify-center font-bold shadow-[0_4px_12px_rgba(0,0,0,0.08)] z-20 transition-all duration-300 active:scale-90 ${
            currentIndex === 0
              ? 'opacity-0 pointer-events-none'
              : 'opacity-0 group-hover/slider:opacity-100 hover:bg-[#7C4DFF] hover:text-white hover:border-[#7C4DFF] hover:shadow-[#7C4DFF]/30'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Ultra Smooth - Right Navigation Button */}
        <button
          onClick={nextSlide}
          disabled={currentIndex === maxIndex}
          className={`absolute right-[-15px] lg:right-[-22px] top-[30%] sm:top-[35%] w-10 h-10 bg-white text-gray-800 rounded-full border border-gray-100 hidden sm:flex items-center justify-center font-bold shadow-[0_4px_12px_rgba(0,0,0,0.08)] z-20 transition-all duration-300 active:scale-90 ${
            currentIndex === maxIndex
              ? 'opacity-0 pointer-events-none'
              : 'opacity-0 group-hover/slider:opacity-100 hover:bg-[#7C4DFF] hover:text-white hover:border-[#7C4DFF] hover:shadow-[#7C4DFF]/30'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

      </div>
    </div>
  );
};

export default PopularCategories;