import React from 'react';
import { Link } from 'react-router';

const Menubar = () => {
  // Plain text navigation categories
  const textLinks = [
    { name: 'Makeup', path: '/category/makeup' },
    { name: 'Skin', path: '/category/skin' },
    { name: 'Hair', path: '/category/hair' },
    { name: 'Personal care', path: '/category/personal-care' },
    { name: 'Mom & Baby', path: '/category/mom-baby' },
    { name: 'Fragrance', path: '/category/fragrance' },
  ];

  // Brightly colored pill badges matching your image
  const pillLinks = [
    { name: 'UNDERGARMENTS', path: '/category/undergarments', bg: 'bg-[#3B59E9]' },
    { name: 'COMBO', path: '/category/combo', bg: 'bg-[#E10098]' },
    { name: 'JEWELLERY', path: '/category/jewellery', bg: 'bg-[#A844D1]' },
    { name: 'CLEARANCE SALE', path: '/category/clearance-sale', bg: 'bg-[#31B5B5]' },
    { name: 'MEN', path: '/category/men', bg: 'bg-[#25633F]' },
  ];

  return (
    <div className="w-full bg-white border-b  border-gray-100 shadow-sm overflow-x-scroll md:visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Horizontal Container: 
          Uses 'overflow-x-auto' and 'scrollbar-none' to swipe smoothly on mobile 
        */}
        <div className="flex items-center gap-6 py-3 overflow-x-auto whitespace-nowrap scrollbar-hide select-none justify-start lg:justify-center">
          
          {/* Left Side: Text Links */}
          <div className="flex items-center gap-6 md:gap-8">
            {textLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium text-gray-800 hover:text-black transition-colors duration-200 tracking-wide"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side: Pill Highlight Buttons */}
          <div className="flex items-center gap-3 pl-2">
            {pillLinks.map((pill) => (
              <Link
                key={pill.name}
                to={pill.path}
                className={`${pill.bg} text-white text-xs font-bold px-4 py-2 rounded-full tracking-wider hover:opacity-90 transition-opacity duration-200 shadow-sm`}
              >
                {pill.name}
              </Link>
            ))}
          </div>

        </div>
      </div>
      
      {/* Optional CSS Injection to completely hide scrollbars across browsers while keeping swipe mechanics active */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Menubar;