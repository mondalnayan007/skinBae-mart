import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';

const Overview = () => {
  // ১. Monthly Sales (Bar Chart Data)
  const monthlySalesData = [
    { name: 'Jan', sales: 160 }, { name: 'Feb', sales: 380 }, { name: 'Mar', sales: 200 },
    { name: 'Apr', sales: 290 }, { name: 'May', sales: 180 }, { name: 'Jun', sales: 190 },
    { name: 'Jul', sales: 285 }, { name: 'Aug', sales: 110 }, { name: 'Sep', sales: 210 },
    { name: 'Oct', sales: 390 }, { name: 'Nov', sales: 275 }, { name: 'Dec', sales: 120 },
  ];

  // ২. Statistics (Area Chart Data)
  const statisticsData = [
    { name: 'Jan', line1: 175, line2: 40 }, { name: 'Feb', line1: 185, line2: 30 },
    { name: 'Mar', line1: 160, line2: 50 }, { name: 'Apr', line1: 150, line2: 35 },
    { name: 'May', line1: 175, line2: 55 }, { name: 'Jun', line1: 160, line2: 38 },
    { name: 'Jul', line1: 165, line2: 70 }, { name: 'Aug', line1: 200, line2: 110 },
    { name: 'Sep', line1: 225, line2: 120 }, { name: 'Oct', line1: 210, line2: 130 },
    { name: 'Nov', line1: 240, line2: 155 }, { name: 'Dec', line1: 235, line2: 145 },
  ];

  // ৩. Monthly Target Gauge Data (75.55% achieved, 24.45% remaining)
  const gaugeData = [
    { value: 75.55, color: '#5A57FF' },
    { value: 24.45, color: '#EAEFF8' }
  ];

  // ৪. Recent Orders Table Data
  const recentOrders = [
    { id: '#ORD-9942', name: 'নুসরাত জাহান', product: 'COSRX Snail Mucin', date: '27 June 2026', amount: '1,450 BDT', status: 'Delivered' },
    { id: '#ORD-9941', name: 'তাহসিন আহমেদ', product: 'CeraVe Facial Cleanser', date: '26 June 2026', amount: '1,850 BDT', status: 'Processing' },
    { id: '#ORD-9940', name: 'ফারহানা আক্তার', product: 'Beauty of Joseon Sunscreen', date: '25 June 2026', amount: '1,350 BDT', status: 'Delivered' },
    { id: '#ORD-9939', name: 'সায়েম আহমেদ', product: 'The Ordinary Niacinamide', date: '25 June 2026', amount: '2,200 BDT', status: 'Cancelled' },
  ];

  return (
    <div className="space-y-6">
      
      {/* TOP ROW GRID (STAT CARDS + BAR CHART + GAUGE) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: STATS + BAR CHART */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Small Mini Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Customers Card */}
            <div className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.01)] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-gray-400">Customers</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">3,782</h3>
              </div>
              <div className="mt-4 flex justify-end">
                <span className="text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                  ↑ 11.01%
                </span>
              </div>
            </div>

            {/* Orders Card */}
            <div className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.01)] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-gray-400">Orders</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">5,359</h3>
              </div>
              <div className="mt-4 flex justify-end">
                <span className="text-[11px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                  ↓ 9.05%
                </span>
              </div>
            </div>
          </div>

          {/* Monthly Sales Bar Chart */}
          <div className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-sm font-bold text-slate-800 tracking-tight">Monthly Sales</h4>
              <button className="text-gray-400 hover:text-gray-600 text-sm font-bold">•••</button>
            </div>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlySalesData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="sales" fill="#5A57FF" radius={[4, 4, 0, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: MONTHLY TARGET GAUGE CARD */}
        <div className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.01)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-800 tracking-tight">Monthly Target</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">Target you've set for each month</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 text-sm font-bold">•••</button>
          </div>

          {/* Semicircular Gauge Chart Environment */}
          <div className="relative flex flex-col items-center justify-center my-auto pt-6">
            <div className="w-full h-36 flex items-center justify-center relative overflow-hidden">
              <ResponsiveContainer width="100%" height="200%">
                <PieChart>
                  <Pie
                    data={gaugeData}
                    cx="50%"
                    cy="70%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={70}
                    outerRadius={85}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    {gaugeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              
              {/* Absolute Center Stats */}
              <div className="absolute bottom-6 flex flex-col items-center">
                <span className="text-2xl font-black text-slate-800">75.55%</span>
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded-md mt-1">+10%</span>
              </div>
            </div>
            
            <p className="text-center text-xs text-gray-400 px-4 max-w-xs mt-2 leading-relaxed">
              You earn <span className="font-semibold text-slate-700">$3287</span> today, it's higher than last month. Keep up your good work!
            </p>
          </div>

          {/* Bottom Financial Parameters Summary */}
          <div className="grid grid-cols-3 gap-2 border-t border-gray-50 pt-4 mt-4 text-center">
            <div>
              <p className="text-[10px] font-medium text-gray-400">Target</p>
              <p className="text-xs font-bold text-slate-800 mt-0.5 flex items-center justify-center gap-0.5">$20K <span className="text-rose-500 text-[10px]">↓</span></p>
            </div>
            <div className="border-x border-gray-100">
              <p className="text-[10px] font-medium text-gray-400">Revenue</p>
              <p className="text-xs font-bold text-slate-800 mt-0.5 flex items-center justify-center gap-0.5">$20K <span className="text-emerald-500 text-[10px]">↑</span></p>
            </div>
            <div>
              <p className="text-[10px] font-medium text-gray-400">Today</p>
              <p className="text-xs font-bold text-slate-800 mt-0.5 flex items-center justify-center gap-0.5">$20K <span className="text-emerald-500 text-[10px]">↑</span></p>
            </div>
          </div>
        </div>

      </div>

      {/* MIDDLE ROW: STATISTICS LINE/AREA CHART */}
      <div className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h4 className="text-sm font-bold text-slate-800 tracking-tight">Statistics</h4>
            <p className="text-[11px] text-gray-400 mt-0.5">Target you've set for each month</p>
          </div>
          
          {/* Tabs and Date picker Controls */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <div className="bg-gray-50 p-1 rounded-xl border border-gray-100 flex items-center text-xs font-semibold text-gray-500">
              <button className="bg-white text-slate-800 px-3 py-1.5 rounded-lg shadow-xs">Overview</button>
              <button className="px-3 py-1.5 hover:text-slate-700">Sales</button>
              <button className="px-3 py-1.5 hover:text-slate-700">Revenue</button>
            </div>
            <button className="border border-gray-200 text-xs font-semibold text-slate-700 px-3 py-2 rounded-xl bg-white flex items-center gap-2 shadow-2xs">
              <span>📅</span> Jun 21 - Jun 27
            </button>
          </div>
        </div>

        {/* Double-layered Area/Line Chart */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={statisticsData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorLine1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5A57FF" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#5A57FF" stopOpacity={0.01}/>
                </linearGradient>
                <linearGradient id="colorLine2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#93C5FD" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#93C5FD" stopOpacity={0.01}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="line1" stroke="#5A57FF" strokeWidth={2.5} fillOpacity={1} fill="url(#colorLine1)" />
              <Area type="monotone" dataKey="line2" stroke="#93C5FD" strokeWidth={2} fillOpacity={1} fill="url(#colorLine2)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ======================================================== */}
      {/* BOTTOM ROW: RECENT ORDERS SECTION */}
      {/* ======================================================== */}
      <div className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
        <div className="mb-4">
          <h4 className="text-sm font-bold text-slate-800 tracking-tight">Recent Orders</h4>
          <p className="text-[11px] text-gray-400 mt-0.5">Real-time update of the latest system logs</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50 text-[11px] text-gray-400 uppercase tracking-wider font-semibold">
                <th className="pb-3 pl-2">Order ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Product Name</th>
                <th className="pb-3">Date Ordered</th>
                <th className="pb-3 text-right">Amount</th>
                <th className="pb-3 pr-2 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/60 text-xs text-slate-700">
              {recentOrders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3.5 pl-2 font-bold text-[#5A57FF]">{order.id}</td>
                  <td className="py-3.5 font-medium text-slate-800">{order.name}</td>
                  <td className="py-3.5 text-gray-500">{order.product}</td>
                  <td className="py-3.5 text-gray-400">{order.date}</td>
                  <td className="py-3.5 font-bold text-slate-800 text-right">{order.amount}</td>
                  <td className="py-3.5 pr-2 text-center">
                    <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' :
                      order.status === 'Processing' ? 'bg-amber-50 text-amber-600' :
                      'bg-rose-50 text-rose-600'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Overview;