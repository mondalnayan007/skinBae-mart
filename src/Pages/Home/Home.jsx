import React from 'react';
import { useLoaderData } from 'react-router';

const Home = () => {

const products = useLoaderData();
console.log(products);



    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 select-none">
          <div>
           <div className='flex items-center justify-between'>
             <h1>This Week's Top Selling</h1>
              <ul className='flex items-center justify-between gap-3'>
                <li>Featured Products</li>
                <li>New Products</li>
                <li>Bestselling products</li>
              </ul>
           </div>

          </div>
        </div>
    );
};

export default Home;