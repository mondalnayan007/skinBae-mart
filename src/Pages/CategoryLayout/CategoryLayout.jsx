import React, { useEffect, useState } from 'react';
import ProductCard from '../../Components/ProductCard';
import { Link, NavLink, useParams } from 'react-router';

const CategoryLayout = () => {
    const [products, setProducts] = useState([]);
    const [searchTerms, setSearchTerms] = useState('');
    const [loading, setLoading] = useState(false); 
    
    // URL থেকে category name নেওয়ার জন্য
    const { categoryName } = useParams();

    const handleSearch = (e) => {
        setSearchTerms(e.target.value);
    };

    useEffect(() => {
        // ডেটা ফেচ শুরু হওয়ার আগে লোডিং ট্রু করে দেওয়া হলো
        setLoading(true);

        let apiUrl = 'http://localhost:4000/category'; 
        
        if (categoryName) {
            apiUrl = `http://localhost:4000/category/${categoryName}`; 
        }

        // ব্যাকএন্ড সার্চ হ্যান্ডেল করার জন্য কুয়েরি প্যারামিটার তৈরি
        // যদি searchTerms থাকে, তাহলে URL-এর সাথে ?search=keyword যুক্ত হবে
        const queryParams = new URLSearchParams();
        if (searchTerms) {
            queryParams.append('search', searchTerms);
        }

        // ফাইনাল API URL তৈরি (যেমন: http://localhost:4000/category/makeup?search=lipstick)
        const finalUrl = queryParams.toString() ? `${apiUrl}?${queryParams.toString()}` : apiUrl;

        // ইউজার টাইপ করার সময় প্রতি অক্ষরেই যেন সাথে সাথে API কল না হয়,
        // সেজন্য ৫০০ মিলিসেকেন্ডের একটি Debounce/Timeout যোগ করা হলো
        const delayDebounceFn = setTimeout(() => {
            fetch(finalUrl)
                .then(res => res.json())
                .then(data => {
                    setProducts(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Data fetch korte somossa hoyeche:", err);
                    setLoading(false);
                });
        }, 500); // ইউজার টাইপিং থামালে ৫০০ms পর ব্যাকএন্ডে রিকোয়েস্ট যাবে

        // ক্লিয়ানআপ ফাংশন: নতুন টাইপ করলে আগের পেন্ডিং রিকোয়েস্ট টাইমার ক্লিয়ার হয়ে যাবে
        return () => clearTimeout(delayDebounceFn);

    }, [categoryName, searchTerms]); // searchTerms ডিপেন্ডেন্সি হিসেবে যুক্ত করা হলো

    const categories = [
        { name: "All Products", path: "/category/" },
        { name: "Makeup", path: "/category/makeup" },
        { name: "Skin", path: "/category/skin" },
        { name: "Hair", path: "/category/hair" },
        { name: "Personal care", path: "/category/personal-care" },
        { name: "Mom & Baby", path: "/category/mom-baby" },
        { name: "Fragrance", path: "/category/fragrance" },
        { name: "UNDERGARMENTS", path: "/category/undergarments" },
        { name: "COMBO", path: "/category/combo" },
        { name: "JEWELLERY", path: "/category/jewellery" },
        { name: "CLEARANCE SALE", path: "/category/clearance-sale" },
        { name: "MEN", path: "/category/men" }
    ];

    return (
        <div className='my-4'>
            <div className='grid grid-cols-5 gap-4'>
                <div className='col-span-1'>
                    <h3 className="font-bold mb-2">Popular Categories :-</h3>
                    <div>
                        <nav className="flex flex-col gap-1">
                            {categories.map((category, index) => (
                                <NavLink
                                    key={index}
                                    to={category.path}
                                    end={category.path === '/category/'}
                                    className={({ isActive }) => 
                                        `flex items-center px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
                                            isActive 
                                            ? 'bg-pink-100 text-pink-600' 
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                        }`
                                    }
                                >
                                    {category.name}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                </div>
                
                <div className='col-span-4 flex flex-col'>
                    <input 
                        type="search"
                        value={searchTerms}
                        onChange={handleSearch}
                        placeholder='🔍 Search your product' 
                        className='border-none outline outline-pink-400 rounded-full p-1 px-4' 
                    />

                    <div className='grid grid-cols-3 mt-3 gap-4'>
                        {loading ? (
                            <p className="col-span-3 text-center text-gray-500 mt-5">Loading products...</p>
                        ) : products.length > 0 ? (
                            products.map(product => (
                                <Link key={product.id || product._id} to={`/product/${product._id}`}>
                                    <ProductCard product={product}></ProductCard>
                                </Link>
                            ))
                        ) : (
                            <p className="col-span-3 text-center text-gray-500 mt-5">No products found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryLayout;