import React from 'react';
import MarqueeComponent from 'react-fast-marquee';

// যদি লাইব্রেরিটি ডিফল্ট ইম্পোর্টে অবজেক্ট রিটার্ন করে, তবে .default দিয়ে আসল কম্পোনেন্ট আলাদা করার ট্রিক
const Marquee = MarqueeComponent.default || MarqueeComponent;

const TopBrands = () => {
  // আপনার লোকাল বা পাবলিক ফোল্ডারের লোগো ইমেজগুলোর পাথ
  const brands = [
    { id: 1, name: 'cosrx', logoUrl: '/brands/cosrx.png' },
    { id: 2, name: 'CeraVe', logoUrl: '/brands/cerave.png' },
    { id: 3, name: "Sunsilk", logoUrl: '/brands/Sunsilk.png' },
    { id: 4, name: 'Tresemme', logoUrl: '/brands/Tresemme.png' },
    { id: 5, name: 'Vaseline', logoUrl: '/brands/vaseline.png' },
    { id: 6, name: 'PINKFLASH', logoUrl: '/brands/pink.png' },
    { id: 7, name: 'ordinary', logoUrl: '/brands/ordinary.png' },
    { id: 8, name: 'himaloya', logoUrl: '/brands/himaloya.png' },
    { id: 9, name: 'avone', logoUrl: '/brands/avone.jpg' },
    { id: 10, name: 'simple', logoUrl: '/brands/simple.avif' },
    { id: 6, name: 'dove', logoUrl: '/brands/dove.png' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto py-12 select-none antialiased bg-white">
      
      {/* Section Title */}
      <div className="text-center mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-widest uppercase">
          Top Brands
        </h2>
        <div className="w-12 h-[3px] bg-[#7C4DFF] mx-auto mt-2 rounded-full" />
      </div>

      {/* Modern Infinite Marquee Wrapper */}
      <div className="w-full  py-4 border-y border-gray-100">
        <Marquee
          direction="left"        // বাম থেকে ডানে স্লাইড (Left to Right)
          pauseOnHover={true}      // মাউস এন্টার করলে স্লাইডার থেমে যাবে
          speed={60}               // স্লাইডারের স্পিড
          gradient={true} 
          gradientWidth={50}         // দুই পাশে শ্যাডো/ব্লার ইফেক্ট
              
        >
          {brands.map((brand) => (
            <div 
              key={brand.id} 
              className=" mx-5 sm:mx-8 flex flex-col items-center justify-center  group cursor-pointer"
            >
              {/* Logo Container Box */}
              <div className="w-32 h-20 sm:w-50 sm:h-36 flex items-center justify-center  p-3 rounded-xl bg-white border border-gray-100/80 shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-[0_8px_20px_rgba(124,77,255,0.06)] group-hover:border-[#7C4DFF]/20">
                <img 
                  src={brand.logoUrl} 
                  alt={`${brand.name} Logo`}
                  className="max-w-full max-h-full object-contain filter  opacity-70 transition-all duration-300 "
                  // ইমেজ পাথ ভুল থাকলে বা লোড না হলে টেক্সট দেখাবে
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) {
                      e.target.nextSibling.style.display = 'block';
                    }
                  }}
                />
                {/* Fallback Text */}
                <span className="hidden text-gray-400 font-bold tracking-wider text-sm group-hover:text-[#7C4DFF]">
                  {brand.name}
                </span>
              </div>
            </div>
          ))}
        </Marquee>
      </div>

    </div>
  );
};

export default TopBrands;