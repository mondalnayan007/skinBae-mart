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
    
    const [wishlistCount, setWishlistCount] = useState(0);
    // 🛒 কার্ট কাউন্ট স্টেট
    const [cartCount, setCartCount] = useState(0); 

    const { user, loading, handleLogout } = use(AuthContext);
    const apiURL1 = "http://localhost:4000";

    // 🔄 ডাটাবেজ থেকে কার্ট আইটেম কাউন্ট নিয়ে আসার ফাংশন
    const fetchCartCount = () => {
        if (user?.email) {
            fetch(`${apiURL1}/api/cart/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    // ব্যাকএন্ডে টোটাল আইটেমের সংখ্যা যোগফল আকারে কাউন্ট সেট করবে
                    const total = data.reduce((sum, item) => sum + item.quantity, 0);
                    setCartCount(total);
                })
                .catch(err => console.error("Error fetching cart count:", err));
        } else {
            setCartCount(0);
        }
    };

    const updateWishlistCount = () => {
        const currentWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlistCount(currentWishlist.length);
    };

    useEffect(() => {
        updateWishlistCount();
        fetchCartCount(); // ইউজার লগইন করলে ডাটাবেজ থেকে আনবে

        window.addEventListener('wishlistUpdated', updateWishlistCount);
        window.addEventListener('cartUpdated', fetchCartCount); // কার্ট আপডেটের গ্লোবাল লিসেনার
        
        return () => {
            window.removeEventListener('wishlistUpdated', updateWishlistCount);
            window.removeEventListener('cartUpdated', fetchCartCount);
        };
    }, [user]); // ইউজার লগইন/লগআউট স্টেট ট্র্যাকিং

    const handleSignout = () => {
       handleLogout().then(() => { setCartCount(0); }).catch(err => console.log(err));
    };

    useEffect(() => {
        if (isSearchOpen && mobileSearchRef.current) mobileSearchRef.current.focus();
    }, [isSearchOpen]);

    return (
        <nav className="sticky top-0 left-0 w-full bg-white border-b border-gray-100 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-4">

                {/* Left Side Logo */}
                <div className="flex items-center gap-2 md:gap-0">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 -ml-2 rounded-md hover:bg-gray-100"><Menu className="h-6 w-6 text-black" /></button>
                    <Link to="/" className="flex-shrink-0 flex items-center select-none">
                        <div className="flex items-center gap-2">
                            <img className="h-10 sm:h-14 md:h-20 w-auto" src={logo} alt="Logo" />
                            <p className="font-bold text-sm md:text-2xl text-black">SkinBae Mart</p>
                        </div>
                    </Link>
                </div>

                {/* Desktop Search */}
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

                {/* Right Actions */}
                <div className="flex items-center gap-2 sm:gap-4 md:gap-6 text-gray-900">
                    {user ? (
                        <div className="relative">
                            <img onClick={() => setShowDropdown(!showDropdown)} src={user.photoURL} alt="Profile" className="h-8 w-8 rounded-full cursor-pointer border" />
                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border z-50">
                                    <button onClick={handleSignout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="p-2 hover:bg-gray-100 rounded-full"><User className="h-6 w-6" /></Link>
                    )}

                    {/* Heart (Wishlist) */}
                    <Link to="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-full group">
                        <Heart className="h-6 w-6 group-hover:text-[#FF2E63] transition-colors" />
                        {wishlistCount > 0 && <span className="absolute top-1 right-1 bg-[#FF2E63] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">{wishlistCount}</span>}
                    </Link>

                    {/* 🛒 Cart with Dynamic DB Badge */}
                    <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full group">
                        <ShoppingCart className="h-6 w-6 group-hover:text-[#7C4DFF] transition-colors" />
                        {cartCount > 0 && (
                            <span className="absolute top-1 right-1 bg-[#7C4DFF] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white animate-bounce">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
            
            {/* ... (Mobile Search Drawer & Categories Menu unchanged) ... */}
        </nav>
    );
};

export default Navbar;