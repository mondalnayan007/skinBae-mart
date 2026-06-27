import React from 'react';

// Orders Section
export const Orders = () => {
  const sampleOrders = [
    { id: "#ORD-9821", name: "ফারহানা আক্তার", item: "COSRX Snail Mucin x1", total: "1,450 BDT", status: "Delivered" },
    { id: "#ORD-9822", name: "মাহমুদ হাসান", item: "CeraVe Cleanser x2", total: "3,700 BDT", status: "Processing" },
  ];
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-gray-800">Incoming Orders</h2>
        <p className="text-xs text-gray-400 mt-0.5">Track and update customer sales flow</p>
      </div>
      <div className="space-y-3">
        {sampleOrders.map((ord, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#C5A880]">{ord.id}</span>
              <h4 className="text-sm font-semibold text-gray-800 mt-0.5">{ord.name}</h4>
              <p className="text-xs text-gray-400">{ord.item}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-800">{ord.total}</p>
              <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 ${
                ord.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
              }`}>{ord.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};