import React, { useState, useRef, useEffect, use } from 'react';
import { Link } from 'react-router';
import { Menu, X, Search, User, Heart, ShoppingCart, ChevronDown } from 'lucide-react';
import logo from '/logo.png'
import AuthContext from '../../Context/AuthContext';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const mobileSearchRef = useRef(null);
    const [showDropdown, setShowDropdown] = useState(false);
    
    // ❤️ উইশলিস্টের জন্য স্টেট ম্যানেজমেন্ট
    const [wishlistCount, setWishlistCount] = useState(0);

    const { user, loading, handleLogout } = use(AuthContext);
    console.log(user);

    // 🔄 উইশলিস্ট কাউন্ট লোকাল স্টোরেজ থেকে রিড করার ফাংশন
    const updateWishlistCount = () => {
        const currentWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlistCount(currentWishlist.length);
    };

    // 🔔 পেজ লোড এবং গ্লোবাল ইভেন্ট লিসেনিং ট্র্যাকিং
    useEffect(() => {
        // প্রথমবার পেজ লোড হলে কাউন্ট সেট করবে
        updateWishlistCount();

        // ProductDetails থেকে আসা উইশলিস্ট ইভেন্ট লিসেন করবে
        window.addEventListener('wishlistUpdated', updateWishlistCount);
        
        // কম্পোনেন্ট আনমাউন্ট হলে লিসেনার রিমুভ করবে (মেমোরি লিক রোধে)
        return () => {
            window.removeEventListener('wishlistUpdated', updateWishlistCount);
        };
    }, []);

    const handleSignout = () => {
       handleLogout()
       .then(res => { console.log(res); })
       .catch(err => { console.log(err); })
    };

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
        <nav className="sticky top-0 left-0 w-full bg-white border-b border-gray-100 z-50">
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
                            <img
                                className="h-auto max-h-10 sm:max-h-14 md:max-h-20 w-auto max-w-[40px] sm:max-w-[64px] md:max-w-[96px] object-contain flex-shrink-0 object-left"
                                src={logo}
                                alt="SkinBae Mart Logo"
                            />
                            <p className="font-bold text-sm md:text-2xl text-black ">
                                SkinBae Mart
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Central Search Bar - Only Visible on Desktop (>= md) */}
                <div className="hidden md:flex flex-1 max-w-2xl items-center bg-[#F5F5F5] rounded-md pl-4 pr-1.5 py-1.5 mx-4">
                    <input
                        type="text"
                        placeholder="I am looking for..."
                        className="w-full bg-transparent p-2 text-sm outline outline-[#7C4DFF] rounded-l-md text-gray-700 placeholder-gray-400"
                    />
                    <button className="bg-[#7C4DFF] hover:bg-gray-800 transition-colors p-3 rounded-r-md flex items-center justify-center text-white">
                        <Search className="w-4 h-4" />
                    </button>
                </div>

                {/* Right Side Action Icons */}
                <div className="flex items-center gap-2 sm:gap-4 md:gap-6 text-gray-900">
                    {/* Mobile Search Icon Trigger */}
                    <button
                        onClick={toggleMobileSearch}
                        className={`md:hidden p-2 rounded-full transition-colors ${isSearchOpen ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                        aria-label="Toggle Search"
                    >
                        <Search className="h-6 w-6 stroke-[1.5]" />
                    </button>

                    {/* Router Links for both Mobile and Desktop */}
                    {
                        user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="focus:outline-none"
                                >
                                    <img
                                        src={user.photoURL}
                                        alt="User Profile"
                                        className="h-8 w-8 rounded-full object-cover cursor-pointer border border-gray-200 hover:opacity-80 transition-opacity"
                                    />
                                </button>

                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                                        <button
                                            onClick={handleSignout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <User className="h-6 w-6 stroke-[1.5]" />
                            </Link>
                        )
                    }

                    {/* ❤️ ডাইনামিক উইশলিস্ট হার্ট আইকন ও ব্যাজ */}
                    <Link to="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors group">
                        <Heart className="h-6 w-6 stroke-[1.5] group-hover:text-[#FF2E63] transition-colors" />
                        {wishlistCount > 0 && (
                            <span className="absolute top-1 right-1 bg-[#FF2E63] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-fade-in shadow-sm border border-white">
                                {wishlistCount}
                            </span>
                        )}
                    </Link>

                    {/* 🛒 কার্ট আইকন */}
                    <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ShoppingCart className="h-6 w-6 stroke-[1.5]" />
                        <span className="absolute top-1 right-1 bg-[#D11A2A] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                            0
                        </span>
                    </Link>
                </div>
            </div>

            {/* MOBILE TOP SEARCH DRAWER */}
            <div
                className={`md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 z-40 shadow-md transform transition-all duration-300 ease-in-out ${isSearchOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}
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

            {/* MOBILE LEFT SIDE DRAWER */}
            <div
                className={`md:hidden fixed top-0 left-0 h-full w-full sm:w-[320px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
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

            {/* Backdrop overlay */}
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