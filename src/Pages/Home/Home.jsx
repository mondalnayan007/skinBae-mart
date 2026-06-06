import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import ProductCard from '../../Components/ProductCard';

const Home = () => {
  const products = useLoaderData() || [];

  
  const [activeTab, setActiveTab] = useState('Featured Products');


  const [currentIndex, setCurrentIndex] = useState(0);

 
  const filteredProducts = products.filter(
    (product) => product.status?.toLowerCase() === activeTab.toLowerCase()
  );

 
  const visibleCards = 3; 
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
    setActiveTab(tabName);
    setCurrentIndex(0); 
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 select-none">
      <div>
        {/* Header Section with Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-950">This Week's Top Selling</h1>
          
          <ul className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-1">
            {['Featured Products', 'New Products', 'Bestselling products'].map((tab) => (
              <li
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full cursor-pointer whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'bg-[#7C4DFF] text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>

        {/* Slider Main Container */}
        <div className="relative group/slider w-full">
          {filteredProducts.length > 0 ? (
            <>
              {/* Card Window Slider */}
              <div className="overflow-hidden w-full rounded-xl">
                <div
                  className="flex gap-4 transition-transform duration-500 ease-in-out py-2"
                  style={{
                    transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
                  }}
                >
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="w-[calc(100%-12px)] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-12px)] flex-shrink-0"
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Left Navigation Button */}
              {currentIndex > 0 && (
                <button
                  onClick={prevSlide}
                  className="absolute left-[-15px] top-1/2 -translate-y-1/2 bg-white text-gray-800 w-10 h-10 rounded-full shadow-lg border border-gray-100 flex items-center justify-center font-bold hover:bg-gray-50 z-20 transition-all active:scale-95"
                >
                  &larr;
                </button>
              )}

              {/* Right Navigation Button */}
              {currentIndex < maxIndex && (
                <button
                  onClick={nextSlide}
                  className="absolute right-[-15px] top-1/2 -translate-y-1/2 bg-white text-gray-800 w-10 h-10 rounded-full shadow-lg border border-gray-100 flex items-center justify-center font-bold hover:bg-gray-50 z-20 transition-all active:scale-95"
                >
                  &rarr;
                </button>
              )}
            </>
          ) : (
            
            <div className="w-full text-center py-12 text-gray-400 bg-gray-50 rounded-xl border border-dashed">
              No products found in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;