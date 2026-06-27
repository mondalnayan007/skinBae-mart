import React, { useState } from 'react';
import Sidebar from '../../Components/DasboardComponents/Sidebar';
import Overview from '../../Components/DasboardComponents/Overview';
import Products from '../../Components/DasboardComponents/Products';
import { Orders } from '../../Components/DasboardComponents/Orders';
import { Customers } from '../../Components/DasboardComponents/Customers';


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans antialiased text-gray-800">
      {/* Sidebar Component */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Panel Content Area */}
      <div className="pl-64 min-h-screen">
        {/* Top Navbar */}
        <header className="bg-white h-16 border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-sm font-semibold text-gray-700 capitalize">
            Dashboard Panel / <span className="text-[#C5A880]">{activeTab}</span>
          </h2>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#F8DBE2] border border-white flex items-center justify-center font-bold text-xs text-gray-700 shadow-xs">
              AD
            </div>
            <span className="text-xs font-medium text-gray-600">Admin Owner</span>
          </div>
        </header>

        {/* Dynamic Component Switching Area */}
        <main className="p-8 max-w-6xl mx-auto w-full">
          {activeTab === 'dashboard' && <Overview />}
          {activeTab === 'products' && <Products />}
          {activeTab === 'orders' && <Orders />}
          {activeTab === 'customers' && <Customers />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;