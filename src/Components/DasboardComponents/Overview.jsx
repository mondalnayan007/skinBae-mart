import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';

const Overview = () => {
  // ১. ক্যালেন্ডার ও ফিল্টার স্টেট
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('June');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [startDate, setStartDate] = useState(3); // Default 3
  const [endDate, setEndDate] = useState(15);   // Default 15

  // ২. Monthly Sales (Bar Chart Data)
  const monthlySalesData = [
    { name: 'Jan', sales: 160 }, { name: 'Feb', sales: 380 }, { name: 'Mar', sales: 200 },
    { name: 'Apr', sales: 290 }, { name: 'May', sales: 180 }, { name: 'Jun', sales: 190 },
    { name: 'Jul', sales: 285 }, { name: 'Aug', sales: 110 }, { name: 'Sep', stroke: 210 },
    { name: 'Oct', sales: 390 }, { name: 'Nov', sales: 275 }, { name: 'Dec', sales: 120 },
  ];

  // ৩. Statistics Full Raw Data (১ থেকে ৩০ তারিখ পর্যন্ত ডামি ডাটা)
  const fullDailyData = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    // একটি র্যান্ডমাইজড ট্রেন্ড তৈরি করার জন্য ম্যাথ লজিক
    return {
      name: `${day} Jun`,
      day: day,
      line1: 150 + Math.sin(day) * 40 + (day * 2),
      line2: 40 + Math.cos(day) * 20 + day
    };
  });

  // ক্যালেন্ডার রেঞ্জ অনুযায়ী ডাটা ফিল্টার করার লজিক
  const filteredStatisticsData = fullDailyData.filter(
    item => item.day >= startDate && item.day <= endDate
  );

  // ৪. Monthly Target Gauge Data
  const gaugeData = [
    { value: 75.55, color: '#5A57FF' },
    { value: 24.45, color: '#EAEFF8' }
  ];

  // ৫. Recent Orders Data
  const recentOrders = [
    { id: '#ORD-9942', name: 'নুসরাত জাহান', product: 'COSRX Snail Mucin', date: '27 June 2026', amount: '1,450 BDT', status: 'Delivered' },
    { id: '#ORD-9941', name: 'তাহসিন আহমেদ', product: 'CeraVe Facial Cleanser', date: '26 June 2026', amount: '1,850 BDT', status: 'Processing' },
    { id: '#ORD-9940', name: 'ফারহানা আক্তার', product: 'Beauty of Joseon Sunscreen', date: '25 June 2026', amount: '1,350 BDT', status: 'Delivered' },
    { id: '#ORD-9939', name: 'সায়েম আহমেদ', product: 'The Ordinary Niacinamide', date: '25 June 2026', amount: '2,200 BDT', status: 'Cancelled' },
  ];

  return (
    <div className="space-y-6 relative">
      
      {/* TOP ROW GRID (STAT CARDS + BAR CHART + GAUGE) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: STATS + BAR CHART */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Small Mini Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Customers Card */}
            <div className="bg-white p-6 rounded-[20px] border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-gray-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-gray-400">Customers</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">3,782</h3>
              </div>
              <div className="mt-4 flex justify-end">
                <span className="text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md">
                  ↑ 11.01%
                </span>
              </div>
            </div>

            {/* Orders Card */}
            <div className="bg-white p-6 rounded-[20px] border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-gray-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-gray-400">Orders</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">5,359</h3>
              </div>
              <div className="mt-4 flex justify-end">
                <span className="text-[11px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md">
                  ↓ 9.05%
                </span>
              </div>
            </div>
          </div>

          {/* Monthly Sales Bar Chart */}
          <div className="bg-white p-6 rounded-[20px] border border-gray-200 shadow-sm">
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
        <div className="bg-white p-6 rounded-[20px] border border-gray-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-800 tracking-tight">Monthly Target</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">Target you've set for each month</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 text-sm font-bold">•••</button>
          </div>

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
              
              <div className="absolute bottom-6 flex flex-col items-center">
                <span className="text-2xl font-black text-slate-800">75.55%</span>
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded-md mt-1">+10%</span>
              </div>
            </div>
            
            <p className="text-center text-xs text-gray-400 px-4 max-w-xs mt-2 leading-relaxed">
              You earn <span className="font-semibold text-slate-700">$3287</span> today, it's higher than last month. Keep up your good work!
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-4 mt-4 text-center">
            <div>
              <p className="text-[10px] font-medium text-gray-400">Target</p>
              <p className="text-xs font-bold text-slate-800 mt-0.5 flex items-center justify-center gap-0.5">$20K <span className="text-rose-500 text-[10px]">↓</span></p>
            </div>
            <div className="border-x border-gray-200">
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

      {/* MIDDLE ROW: STATISTICS LINE/AREA CHART SECTION */}
      <div className="bg-white p-6 rounded-[20px] border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h4 className="text-sm font-bold text-slate-800 tracking-tight">Statistics</h4>
            <p className="text-[11px] text-gray-400 mt-0.5">Target you've set for each month</p>
          </div>
          
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <div className="bg-gray-50 p-1 rounded-xl border border-gray-200 flex items-center text-xs font-semibold text-gray-500">
              <button className="bg-white text-slate-800 px-3 py-1.5 rounded-lg shadow-xs">Overview</button>
              <button className="px-3 py-1.5 hover:text-slate-700">Sales</button>
              <button className="px-3 py-1.5 hover:text-slate-700">Revenue</button>
            </div>
            
            {/* TRIGGER BUTTON FOR CALENDAR MODAL */}
            <button 
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="border border-gray-200 text-xs font-semibold text-slate-700 px-3 py-2 rounded-xl bg-white flex items-center gap-2 shadow-xs hover:bg-gray-50 transition-all"
            >
              <span>📅</span> {selectedMonth.substring(0,3)} {startDate} - {selectedMonth.substring(0,3)} {endDate}, {selectedYear}
            </button>
          </div>
        </div>

        {/* Double-layered Area Chart */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredStatisticsData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
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
      {/* DYNAMIC DATE RANGE PICKER MODAL */}
      {/* ======================================================== */}
      {isCalendarOpen && (
        <div className="absolute right-8 top-[380px] z-30 bg-white border border-gray-200 rounded-2xl p-5 shadow-xl w-72 space-y-4 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex justify-between items-center pb-2 border-b border-gray-100">
            <h5 className="text-xs font-bold text-gray-800">Select Custom Range</h5>
            <button onClick={() => setIsCalendarOpen(false)} className="text-gray-400 hover:text-gray-600 text-xs">✕</button>
          </div>
          
          {/* Month & Year Selectors */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 mb-1">Month</label>
              <select 
                value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-1.5 text-xs text-slate-700 outline-none"
              >
                <option value="June">June</option>
                <option value="July">July</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 mb-1">Year</label>
              <select 
                value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-1.5 text-xs text-slate-700 outline-none"
              >
                <option value="2026">2026</option>
                <option value="2027">2027</option>
              </select>
            </div>
          </div>

          {/* Date Picker Range Inputs */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 mb-1">From (Date)</label>
              <input 
                type="number" min="1" max={endDate - 1} value={startDate}
                onChange={(e) => setStartDate(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-1.5 text-xs font-bold text-slate-700 text-center outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 mb-1">To (Date)</label>
              <input 
                type="number" min={startDate + 1} max="30" value={endDate}
                onChange={(e) => setEndDate(Math.min(30, parseInt(e.target.value) || 30))}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-1.5 text-xs font-bold text-slate-700 text-center outline-none"
              />
            </div>
          </div>

          <button 
            onClick={() => setIsCalendarOpen(false)}
            className="w-full bg-[#5A57FF] hover:bg-[#4845e0] text-white text-xs font-semibold py-2 rounded-xl transition-all"
          >
            Apply Range Filter
          </button>
        </div>
      )}

      {/* BOTTOM ROW: RECENT ORDERS SECTION */}
      <div className="bg-white p-6 rounded-[20px] border border-gray-200 shadow-sm">
        <div className="mb-4">
          <h4 className="text-sm font-bold text-slate-800 tracking-tight">Recent Orders</h4>
          <p className="text-[11px] text-gray-400 mt-0.5">Real-time update of the latest system logs</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] text-gray-400 uppercase tracking-wider font-semibold">
                <th className="pb-3 pl-2">Order ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Product Name</th>
                <th className="pb-3">Date Ordered</th>
                <th className="pb-3 text-right">Amount</th>
                <th className="pb-3 pr-2 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs text-slate-700">
              {recentOrders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50/40 transition-colors">
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