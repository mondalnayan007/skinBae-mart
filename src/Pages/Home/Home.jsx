import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import ProductCard from '../../Components/ProductCard';
import PopularCategories from '../../Components/PopularCategories';
import FeatureBanner from '../../Components/FeatureBanner';
import HeroSection from '../../Components/Header/HeroSection';
import TopBrands from '../../Components/TopBrands';

const Home = () => {
  const products = useLoaderData() || [];

  // ১. ট্যাব ফিল্টারিং স্টেট: ডিফল্টভাবে null থাকবে (কোনো ট্যাব সিলেক্টেড থাকবে না)
  const [activeTab, setActiveTab] = useState(null);

  // ২. স্লাইডারের কারেন্ট ইনডেক্স স্টেট
  const [currentIndex, setCurrentIndex] = useState(0);

  // ৩. ডাইনামিক ফিল্টারিং লজিক: 
  // activeTab যদি null হয় (কোনো ক্লিক না পড়ে), তবে সব প্রোডাক্ট দেখাবে। 
  // ক্লিক পড়লে কেবল সেই নির্দিষ্ট status অনুযায়ী ফিল্টার হবে।
  const filteredProducts = !activeTab
    ? products 
    : products.filter((product) => product.status?.toLowerCase() === activeTab.toLowerCase());

  // ==========================================
  // স্লাইডার লজিক ও ক্যালকুলেশন
  // ==========================================
  const visibleCards = 4; // একবারে ৪টি কার্ড দেখাবে
  const maxIndex = Math.max(0, filteredProducts.length - visibleCards);

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

  const handleTabChange = (tabName) => {
    setActiveTab(tabName); // ক্লিক করা ট্যাবটির নাম সেভ হবে
    setCurrentIndex(0);    // স্লাইডার শুরুতে ফিরবে
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 select-none overflow-hidden sm:overflow-visible">
      <div>
        <HeroSection></HeroSection>
      </div>
      <div className='mb-10'>
        <FeatureBanner></FeatureBanner>
      </div>
      
      <div>
        {/* Header Section with Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-950 tracking-tight text-center md:text-left">
            This Week's Top Selling
          </h1>
          
          {/* Tabs Container */}
          <ul className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-1 justify-start md:justify-end w-full md:w-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            {['Featured Products', 'New Products', 'Bestselling products'].map((tab) => (
              <li
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-full cursor-pointer whitespace-nowrap transition-all duration-300 ${
                  // শুধুমাত্র activeTab-এর সাথে নাম মিললেই অ্যাক্টিভ কালার পাবে, শুরুতে সব ফাঁকা থাকবে
                  activeTab === tab
                    ? 'bg-[#7C4DFF] text-white shadow-md shadow-[#7C4DFF]/20'
                    : 'text-gray-500 hover:text-gray-950 hover:bg-gray-50'
                }`}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>

        {/* Slider Main Container */}
        <div className="relative w-full group/slider px-0 sm:px-2">
          {filteredProducts.length > 0 ? (
            <>
              {/* Card Window Container */}
              <div className="overflow-x-auto sm:overflow-hidden w-full snap-x snap-mandatory sm:snap-none no-scrollbar py-2">
                <div
                  className="flex gap-4 transition-transform ease-[cubic-bezier(0.25,1,0.5,1)] duration-700 sm:will-change-transform"
                  style={{
                    transform: window.innerWidth >= 640 ? `translateX(-${currentIndex * (100 / visibleCards)}%)` : 'none',
                  }}
                >
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-12px)] lg:w-[calc(25%-12px)] flex-shrink-0 snap-center sm:snap-none"
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Left Navigation Button */}
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className={`absolute left-[-15px] lg:left-[-22px] top-1/2 -translate-y-1/2 w-11 h-11 bg-white text-gray-800 rounded-full border border-gray-100 hidden sm:flex items-center justify-center font-bold shadow-[0_4px_12px_rgba(0,0,0,0.08)] z-20 transition-all duration-300 active:scale-90 ${
                  currentIndex === 0
                    ? 'opacity-0 pointer-events-none'
                    : 'opacity-0 group-hover/slider:opacity-100 hover:bg-[#7C4DFF] hover:text-white hover:border-[#7C4DFF] hover:shadow-[#7C4DFF]/30'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              {/* Right Navigation Button */}
              <button
                onClick={nextSlide}
                disabled={currentIndex === maxIndex}
                className={`absolute right-[-15px] lg:right-[-22px] top-1/2 -translate-y-1/2 w-11 h-11 bg-white text-gray-800 rounded-full border border-gray-100 hidden sm:flex items-center justify-center font-bold shadow-[0_4px_12px_rgba(0,0,0,0.08)] z-20 transition-all duration-300 active:scale-90 ${
                  currentIndex === maxIndex
                    ? 'opacity-0 pointer-events-none'
                    : 'opacity-0 group-hover/slider:opacity-100 hover:bg-[#7C4DFF] hover:text-white hover:border-[#7C4DFF] hover:shadow-[#7C4DFF]/30'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </>
          ) : (
            <div className="w-full text-center py-12 text-gray-400 bg-gray-50 rounded-xl border border-dashed">
              No products found in this category.
            </div>
          )}
        </div>
      </div>


      <div>
        <PopularCategories></PopularCategories>
      </div>
      
      <div>
        <TopBrands></TopBrands>
      </div>

    </div>
  );
};

export default Home;