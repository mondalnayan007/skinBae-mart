import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { Menu, X, Search, User, Heart, ShoppingCart, ChevronDown } from 'lucide-react';
import logo from '/public/logo.png'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const mobileSearchRef = useRef(null);

    // Focus mobile input field when top search drawer opens
    useEffect(() => {
        if (isSearchOpen && mobileSearchRef.current) {
            mobileSearchRef.current.focus();
        }
    }, [isSearchOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (isSearchOpen) setIsSearchOpen(false);
    };

    const toggleMobileSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (isMenuOpen) setIsMenuOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-100 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-4">

                {/* Left Side: Hamburger (Mobile Only) & Logo */}
                <div className="flex items-center gap-2 md:gap-0">
                    {/* Hamburger Menu - Only Visible on Mobile/Tablet (< md) */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 -ml-2 rounded-md hover:bg-gray-100 transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? <X className="h-6 w-6 text-black" /> : <Menu className="h-6 w-6 text-black" />}
                    </button>

                    <Link to="/" className="flex-shrink-0 flex items-center select-none max-w-[60%] sm:max-w-none">
                        <div className="flex items-center justify-start gap-1.5 sm:gap-2 w-full">
                            {/* Image container using max-height to respect the navbar grid */}
                            <img
                                className="h-auto max-h-10 sm:max-h-14 md:max-h-20 w-auto max-w-[40px] sm:max-w-[64px] md:max-w-[96px] object-contain flex-shrink-0 object-left"
                                src={logo}
                                alt="SkinBae Mart Logo"
                            />

                            {/* Text adjusts size down to text-base/text-sm on tiny screens to avoid layout breaking */}
                            <p className="font-bold text-sm md:text-2xl text-black ">
                                SkinBae Mart
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Central Search Bar - Only Visible on Desktop (>= md) to match your image */}
                <div className="hidden md:flex flex-1 max-w-2xl items-center bg-[#F5F5F5] rounded-md pl-4 pr-1.5 py-1.5 mx-4">
                    <div className="flex items-center gap-1 cursor-pointer select-none pr-3 border-r border-gray-300">
                        <span className="text-sm font-medium text-gray-800 whitespace-nowrap">All Categories</span>
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                    </div>
                    <input
                        type="text"
                        placeholder="I am looking for..."
                        className="w-full bg-transparent px-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
                    />
                    <button className="bg-black hover:bg-gray-800 transition-colors p-2.5 rounded-md flex items-center justify-center text-white">
                        <Search className="w-4 h-4" />
                    </button>
                </div>

                {/* Right Side Action Icons */}
                <div className="flex items-center gap-2 sm:gap-4 md:gap-6 text-gray-900">
                    {/* Mobile Search Icon Trigger - Hidden on Desktop */}
                    <button
                        onClick={toggleMobileSearch}
                        className={`md:hidden p-2 rounded-full transition-colors ${isSearchOpen ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                        aria-label="Toggle Search"
                    >
                        <Search className="h-6 w-6 stroke-[1.5]" />
                    </button>

                    {/* Router Links for both Mobile and Desktop */}
                    <Link to="/profile" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <User className="h-6 w-6 stroke-[1.5]" />
                    </Link>

                    <Link to="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <Heart className="h-6 w-6 stroke-[1.5]" />
                        <span className="absolute top-1 right-1 bg-[#D11A2A] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                            0
                        </span>
                    </Link>

                    <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ShoppingCart className="h-6 w-6 stroke-[1.5]" />
                        <span className="absolute top-1 right-1 bg-[#D11A2A] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                            0
                        </span>
                    </Link>
                </div>
            </div>

            {/* ========================================================= */}
            {/* MOBILE TOP SEARCH DRAWER (Only active < md)               */}
            {/* ========================================================= */}
            <div
                className={`md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 z-40 shadow-md transform transition-all duration-300 ease-in-out ${isSearchOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
                    }`}
            >
                <div className="px-4 py-4 flex items-center gap-3">
                    <div className="flex-1 flex items-center bg-[#F5F5F5] rounded-md px-3 py-2">
                        <Search className="w-4 h-4 text-gray-400 mr-2" />
                        <input
                            ref={mobileSearchRef}
                            type="text"
                            placeholder="I am looking for..."
                            className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                        />
                    </div>
                    <button
                        onClick={() => setIsSearchOpen(false)}
                        className="p-2 text-gray-500 hover:text-black rounded-md"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* ========================================================= */}
            {/* MOBILE LEFT SIDE DRAWER (Only active < md)              */}
            {/* ========================================================= */}
            <div
                className={`md:hidden fixed top-0 left-0 h-full w-full sm:w-[320px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-4 border-b border-gray-100">
                        <span className="text-lg font-bold uppercase tracking-wider text-gray-900">Categories</span>
                        <button onClick={toggleMenu} className="p-2 rounded-md hover:bg-gray-100">
                            <X className="h-6 w-6 text-black" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-1">
                        {['New Arrivals', 'Skincare', 'Makeup', 'Hair Care', 'Fragrance', 'Deals'].map((item) => (
                            <Link
                                key={item}
                                to={`/category/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                className="block text-gray-700 font-medium hover:text-black hover:bg-gray-50 px-3 py-2.5 rounded-md transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Backdrop overlay for mobile triggers */}
            {(isMenuOpen || isSearchOpen) && (
                <div
                    className="md:hidden fixed inset-0 bg-black/40 z-30 transition-opacity"
                    onClick={() => {
                        setIsMenuOpen(false);
                        setIsSearchOpen(false);
                    }}
                />
            )}
        </nav>
    );
};

export default Navbar;