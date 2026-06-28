import React, { useEffect, useState } from 'react';
import ProductCard from '../../Components/ProductCard';
import { Link, NavLink, useParams } from 'react-router';




const CategoryLayout = () => {

    const [products,setProducts] = useState([]);
    console.log(products);

    const [loading, setLoading] = useState(false); // Data load hobar somoy loading dekhanor jonno
    
    // URL theke category name newar jonno
    const { categoryName } = useParams();
    console.log(categoryName);

useEffect(() => {
        

        // ১. Apnar backend API URL-ti ekhane hobe
        // dhore nicchi dynamically categoryName pathano jacche, jodi na thake tahole sob product asbe
        let apiUrl = 'http://localhost:4000/category'; 
        
        if (categoryName) {
            apiUrl = `http://localhost:4000/category/${categoryName}`; 
            
        }

        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Data fetch korte somossa hoyeche:", err);
                setLoading(false);
            });

    }, [categoryName]);

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
                    <input type="search" placeholder='🔍 Search your product' className='border-none outline outline-pink-400 rounded-full p-1 px-4' />

                    <div className='grid grid-cols-3 mt-3 gap-4'>
                        {/* ৩. Loading state rendering */}
                        {loading ? (
                            <p className="col-span-3 text-center text-gray-500 mt-5">Loading products...</p>
                        ) : products.length > 0 ? (
                            products?.map(product => <Link to={`/product/${product._id}`}><ProductCard key={product.id || product._id} product={product}></ProductCard></Link>)
                        ) : (
                            <p className="col-span-3 text-center text-gray-500 mt-5">No products found in this category.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryLayout;