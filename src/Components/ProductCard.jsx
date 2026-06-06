import React from 'react';

const ProductCard = ({ product }) => {
  const { title, brand, size, pricing, images, availability, status } = product;

  return (
    <div className="group relative flex flex-col w-full max-w-sm bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      
      {/* Top Badges (Status & Discount) */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10 pointer-events-none">
        {status && (
          <span className="bg-black/80 backdrop-blur-sm text-white text-[10px] font-medium px-2.5 py-1 rounded-full uppercase tracking-wider">
            {status.split(' ')[0]} {/* e.g., "Bestselling" or "Featured" */}
          </span>
        )}
        {pricing.discountPercentage > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
            {pricing.discountPercentage}% OFF
          </span>
        )}
      </div>

      {/* Product Image Area */}
      <div className="relative aspect-square w-full bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
        <img
          src={images}
          alt={title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 ease-in-out"
          loading="lazy"
        />
        {!availability.inStock && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center">
            <span className="bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-md shadow-sm">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Details Content */}
      <div className="flex flex-col flex-1 p-4">
        {/* Brand Name */}
        <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-1">
          {brand}
        </span>

        {/* Product Title */}
        <h3 className="text-sm sm:text-base font-medium text-gray-800 line-clamp-2 min-h-[40px] sm:min-h-[48px] hover:text-purple-600 transition-colors cursor-pointer">
          {title}
        </h3>

        {/* Size / Weight */}
        <div className="mt-1.5 flex items-center gap-1.5">
          <span className="text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
            Size: {size}
          </span>
        </div>

        {/* Pricing System */}
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-lg sm:text-xl font-bold text-gray-950">
            {pricing.currency}{pricing.currentPrice}
          </span>
          {pricing.originalPrice > pricing.currentPrice && (
            <span className="text-xs sm:text-sm text-gray-400 line-through">
              {pricing.currency}{pricing.originalPrice}
            </span>
          )}
        </div>

        {/* Stock Status Alert (Optional mini badge) */}
        {availability.inStock && availability.stockCount <= 10 && (
          <p className="text-[10px] text-amber-600 font-medium mt-1">
            ⚠️ {availability.message}
          </p>
        )}

        {/* Action Button */}
        <div className="mt-4">
          <button
            disabled={!availability.inStock}
            className={`w-full py-2 px-4 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 ${
              availability.inStock
                ? 'bg-[#7C4DFF] hover:bg-[#651FFF] text-white shadow-sm hover:shadow'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {availability.inStock ? 'Add to Cart' : 'Stock Out'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;