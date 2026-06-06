import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  // Carousel Data
  const slides = [
    {
      id: 1,
      badge: "HOTTEST BEAUTY TRENDS",
      title: "Shop Best Skin Kit Makeup",
      subtitle: "Limited time offer!",
      price: "$39.00",
      originalPrice: "$49.00",
      image: "https://i.ibb.co.com/rG9hB4mn/girl-3033718-1280-removebg-preview.png",
      bgColor: "bg-[#F7C5D2]" 
    },
    {
      id: 2,
      badge: "NEW ARRIVALS",
      title: "Luxury Cosmetic Collections",
      subtitle: "Only for this weekend!",
      price: "$29.00",
      originalPrice: "$39.00",
      image: "https://i.ibb.co.com/S47fSgd2/shamblen-studios-xw-M61-TPMl-Yk-unsplash-removebg-preview.png",
      bgColor: "bg-[#EAD6DD]"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 select-none">
      {/* Main Responsive Grid:
        - lg (Desktop): 5 Columns
        - Base (Mobile/Tablet): 1 Column layout (Slider top, other 3 items group bottom)
      */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        
        {/* ========================================================= */}
        {/* LEFT SIDE: CAROUSEL SLIDER (col-span-3 on desktop)        */}
        {/* ========================================================= */}
        <div className="relative lg:col-span-3 h-[260px] sm:h-[340px] md:h-[380px] rounded-md overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full ${slide.bgColor} flex items-center justify-between transition-opacity duration-500 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* Text Area */}
              <div className="flex-1 max-w-[55%] pl-4 sm:pl-12 z-20">
                <span className="text-[9px] sm:text-xs font-semibold tracking-wider text-gray-800 block mb-1 sm:mb-2">
                  {slide.badge}
                </span>
                <h1 className="text-base sm:text-3xl lg:text-4xl font-bold text-gray-950 leading-tight mb-1 sm:mb-2">
                  {slide.title}
                </h1>
                <p className="hidden sm:block text-xs sm:text-sm text-gray-600 mb-4 font-normal">
                  {slide.subtitle}
                </p>
                <div className="flex items-baseline gap-2 mb-3 sm:mb-6">
                  <span className="text-base sm:text-2xl font-bold text-gray-950">{slide.price}</span>
                  <span className="text-xs sm:text-sm text-gray-400 line-through">{slide.originalPrice}</span>
                </div>
                <button className="bg-[#7C4DFF] hover:bg-[#651FFF] text-white text-[10px] sm:text-xs font-semibold px-3 py-1.5 sm:px-5 sm:py-2.5 rounded transition-all">
                  Shop Now
                </button>
              </div>

              {/* Right Side Half Image */}
              <div className="w-[45%] h-full flex items-end justify-center relative">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-[90%] sm:h-[95%] object-contain object-bottom"
                />
              </div>
            </div>
          ))}

          {/* Slider Indicators */}
          <div className="absolute bottom-3 left-4 sm:left-12 z-20 flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`rounded-full transition-all duration-300 ${
                  idx === currentSlide ? 'bg-black w-4 sm:w-5 h-2 sm:h-2.5' : 'bg-gray-400 w-2 h-2'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT SIDE PARTS CONTAINER                                */}
        {/* মোবাইলের জন্য ৩টি পার্টকে পাশাপাশি ১টি ডাইভের মধ্যে আনা হয়েছে   */}
        {/* ========================================================= */}
        <div className="lg:col-span-2 grid grid-cols-3 lg:grid-cols-2 gap-3 sm:gap-4 h-[160px] sm:h-[220px] lg:h-[380px]">
          
          {/* 1. MIDDLE CARD (Weekend Sale) - Takes 1 column on mobile, full width on desktop inside right group */}
          <div className="bg-[#E0ECF0] rounded-md p-2.5 sm:p-5 flex flex-col justify-between relative overflow-hidden lg:col-span-2 lg:h-[182px]">
            <div className="z-10">
              <h2 className="text-[11px] sm:text-lg font-bold text-gray-950 leading-tight max-w-[90%]">Get Gorgeous Now!</h2>
              <p className="hidden sm:block text-[10px] sm:text-xs text-gray-600 mt-0.5 sm:mt-1">Weekend Sale!</p>
              <p className="text-sm sm:text-2xl font-black text-gray-950 mt-0.5 sm:mt-2">25%</p>
            </div>
            <div className="z-10">
              <button className="bg-white hover:bg-gray-50 text-gray-950 text-[9px] sm:text-xs font-bold px-2 py-1 sm:px-4 sm:py-2 rounded shadow-sm transition-colors">
                Shop Now
              </button>
            </div>
            <img 
              src="https://i.ibb.co.com/LdY5T27v/ela-de-pure-c-N7ta-YOARQ8-unsplash-removebg-preview.png" 
              alt="Serum" 
              className="absolute right-0 bottom-0 w-[60%] sm:w-[50%] h-[120%] sm:h-[120%] lg:w-[100%] lg:h-[120%] object-contain object-right-bottom"
            />
          </div>

          {/* 2. Top Mini Card: Compact */}
          <div className="bg-[#EBE8F5] rounded-md p-2.5 sm:p-4 flex flex-col justify-between lg:flex-row lg:items-center relative overflow-hidden lg:h-[182px]">
            <div className="z-10 max-w-[80%] lg:max-w-[60%]">
              <h3 className="text-[11px] sm:text-base font-bold text-gray-950">Compact</h3>
              <p className="hidden sm:block text-[10px] sm:text-[11px] text-gray-500">Top Deals!</p>
              <p className="text-xs sm:text-lg font-black text-gray-950 mt-0.5">15%</p>
              <button className="text-[9px] sm:text-xs font-bold underline text-gray-950 mt-1 sm:mt-2 block hover:text-gray-700">
                Shop Now
              </button>
            </div>
            <img 
              src="https://i.ibb.co.com/Fbq3jnCw/pexels-cyrilcaiazzo-7353843-removebg-preview.png" 
              alt="Compact" 
              className="absolute right-0 bottom-0 w-[65%] sm:w-[50%] h-[50%] sm:h-[65%] lg:w-[55%] lg:h-[85%] object-contain object-right-bottom"
            />
          </div>

          {/* 3. Bottom Mini Card: Foundation */}
          <div className="bg-[#FADCE2] rounded-md p-2.5 sm:p-4 flex flex-col justify-between lg:flex-row lg:items-center relative overflow-hidden lg:h-[182px]">
            <div className="z-10 max-w-[80%] lg:max-w-[60%]">
              <h3 className="text-[11px] sm:text-base font-bold text-gray-950">Foundation</h3>
              <p className="hidden sm:block text-[10px] sm:text-[11px] text-gray-500">New Offer!</p>
              <p className="text-xs sm:text-lg font-black text-gray-950 mt-0.5">35%</p>
              <button className="text-[9px] sm:text-xs font-bold underline text-gray-950 mt-1 sm:mt-2 block hover:text-gray-700">
                Shop Now
              </button>
            </div>
            <img 
              src="https://i.ibb.co.com/RkWD9Vf9/pexels-dacapture-8981524-removebg-preview.png" 
              alt="Foundation" 
              className="absolute right-0 bottom-0 w-[65%] sm:w-[50%] h-[100%] sm:h-[100%] lg:w-[100%] lg:h-[100%] object-contain object-right-bottom"
            />
          </div>

        </div>

      </div>
    </div>
  );
};

export default HeroSection;