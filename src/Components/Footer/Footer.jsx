import React from 'react';
// Lucide আইকনগুলোর পিওর এসভিজি পাথ ব্যবহার করা হয়েছে যাতে কোনো এক্সটার্নাল প্যাকেজ ক্রাশ না করে
const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 antialiased select-none font-sans border-t border-gray-900">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main 4-Column Grid Structure */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          
          {/* Column 1: Logo, Address & Social Links */}
          <div className="flex flex-col gap-4">
            {/* Website Logo/Name */}
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-white tracking-wider uppercase">
                Skin<span className="text-[#7C4DFF]">bae</span>
              </span>
            </div>
            {/* Address & Contact Info */}
            <p className="text-sm text-gray-400 leading-relaxed">
              Your ultimate destination for authentic Korean and global skincare products in Bangladesh.
            </p>
            <div className="text-sm text-gray-400 flex flex-col gap-1.5 mt-2">
              <p><strong>Address:</strong> House 45, Road 12, Dhanmondi, Dhaka</p>
              <p><strong>Email:</strong> support@skinbae.com</p>
              <p><strong>Phone:</strong> +880 1712-345678</p>
            </div>
            {/* Social Media Links with Smooth Hover Effect */}
            <div className="flex items-center gap-4 mt-3">
              {/* Facebook */}
              <a href="#" className="w-9 h-9 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-[#7C4DFF] hover:border-[#7C4DFF]/50 transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.39-1 1-1h2V2h-3c-2.42 0-4 1.35-4 4v2z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" className="w-9 h-9 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-[#7C4DFF] hover:border-[#7C4DFF]/50 transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/></svg>
              </a>
              {/* YouTube */}
              <a href="#" className="w-9 h-9 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-[#7C4DFF] hover:border-[#7C4DFF]/50 transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Shop Categories */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Shop Categories</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-gray-400">
              <li><a href="#" className="hover:text-[#7C4DFF] transition-colors duration-200">Cleansers & Toners</a></li>
              <li><a href="#" className="hover:text-[#7C4DFF] transition-colors duration-200">Serums & Ampoules</a></li>
              <li><a href="#" className="hover:text-[#7C4DFF] transition-colors duration-200">Moisturizers & Creams</a></li>
              <li><a href="#" className="hover:text-[#7C4DFF] transition-colors duration-200">Sunscreen / Sun Protection</a></li>
              <li><a href="#" className="hover:text-[#7C4DFF] transition-colors duration-200">Korean Beauty Deals</a></li>
            </ul>
          </div>

          {/* Column 3: Top Brands (Based on your slider/grid) */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Top Brands</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-gray-400">
              <li><a href="#" className="hover:text-[#7C4DFF] transition-colors duration-200">COSRX</a></li>
              <li><a href="#" className="hover:text-[#7C4DFF] transition-colors duration-200">CeraVe</a></li>
              <li><a href="#" className="hover:text-[#7C4DFF] transition-colors duration-200">Skin Cafe</a></li>
              <li><a href="#" className="hover:text-[#7C4DFF] transition-colors duration-200">RIBANA</a></li>
              <li><a href="#" className="hover:text-[#7C4DFF] transition-colors duration-200">PINKFLASH</a></li>
            </ul>
          </div>

          {/* Column 4: Customer Service & Policies */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Customer Support</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-gray-400">
              <li><a href="#" className="hover:text-[#7C4DFF] transition-colors duration-200">Order Tracking</a></li>
              <li><a href="#" className="hover:text-[#7C4DFF] transition-colors duration-200">Shipping & Delivery Policy</a></li>
              <li><a href="#" className="hover:text-[#7C4DFF] transition-colors duration-200">30 Days Return & Exchange</a></li>
              <li><a href="#" className="hover:text-[#7C4DFF] transition-colors duration-200">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-[#7C4DFF] transition-colors duration-200">Privacy Policy</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Icons Fallback */}
        <div className="mt-12 pt-8 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Skinbae Mart. All Rights Reserved.</p>
          <div className="flex items-center gap-2 text-[10px] text-gray-600 font-medium tracking-wide uppercase">
            <span>bKash</span> • <span>Nagad</span> • <span>SSLCommerz</span> • <span>Cash on Delivery</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;