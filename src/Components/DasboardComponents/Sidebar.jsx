import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: '📊' },
    { id: 'products', label: 'Products', icon: '🛍️' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'customers', label: 'Customers', icon: '👥' },
  ];

  return (
    <div className="w-64 bg-white h-screen border-r border-gray-100 flex flex-col fixed left-0 top-0 z-20">
      <div className="p-6 border-b border-gray-50">
        <h1 className="text-xl font-bold tracking-tight text-gray-800 flex items-center gap-2">
          <span className="w-3 h-3 bg-[#C5A880] rounded-full"></span>
          Skinbae <span className="text-[#C5A880] font-light">Admin</span>
        </h1>
      </div>
      <nav className="flex-1 p-4 space-y-1.5 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeTab === item.id
                ? 'bg-[#C5A880]/10 text-[#C5A880]'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-50 text-xs text-gray-400 text-center">
        v1.0.0 © 2026 Skinbae Mart
      </div>
    </div>
  );
};

export default Sidebar;