import React, { useState, useEffect } from 'react';

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const serverURL = import.meta.env.VITE_SERVER_URL;

  // Backend theke orders fetch kora
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${serverURL}/api/orders`);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Order Status Update korar function
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${serverURL}/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderStatus: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      setOrders((prevOrders) =>
        prevOrders.map((ord) =>
          ord._id === orderId ? { ...ord, orderStatus: newStatus } : ord
        )
      );
      
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  // Filtered orders based on status tab
  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(ord => (ord.orderStatus || 'pending') === filterStatus);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-gray-500">Loading incoming orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 m-6 bg-red-50 border border-red-100 rounded-2xl text-center text-red-600">
        <p className="font-semibold">Failed to load orders</p>
        <p className="text-xs mt-1 text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-8 bg-slate-50/50 min-h-screen">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">Order Management</h2>
          <p className="text-xs text-slate-500 mt-1">Real-time tracking, customer shipping details, and status updates.</p>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all whitespace-nowrap ${
                filterStatus === status 
                  ? 'bg-slate-900 text-white shadow-sm' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-100 text-center space-y-2">
          <p className="text-slate-400 text-sm font-medium">No orders found for this filter.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((ord) => {
            const currentStatus = ord.orderStatus || 'pending';
            
            return (
              <div 
                key={ord._id} 
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                {/* Card Top Banner: Transaction ID & Status Controller */}
                <div className="bg-slate-50/70 px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-bold px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded-md shadow-2xs font-mono">
                      {ord.tran_id}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(ord.createdAt).toLocaleString('en-US', { 
                        month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' 
                      })}
                    </span>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-500">Status:</span>
                    <select
                      value={currentStatus}
                      onChange={(e) => handleStatusChange(ord._id, e.target.value)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border outline-none cursor-pointer transition-colors ${
                        currentStatus === 'delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        currentStatus === 'cancelled' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                        currentStatus === 'shipped' ? 'bg-sky-50 text-sky-700 border-sky-200' :
                        currentStatus === 'processing' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                        'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Grid Info: Customer & Shipping */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1.5">
                      <p className="font-bold text-slate-900 tracking-wider uppercase text-[10px] text-amber-600 mb-2">Customer Profile</p>
                      <p className="text-slate-700 font-semibold text-sm">{ord.shippingInfo?.fullName}</p>
                      <p className="text-slate-500">Email: <span className="text-slate-700 font-medium">{ord.userEmail}</span></p>
                      <p className="text-slate-500">Phone: <span className="text-slate-700 font-medium">{ord.shippingInfo?.phone}</span></p>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1.5">
                      <p className="font-bold text-slate-900 tracking-wider uppercase text-[10px] text-amber-600 mb-2">Shipping Destination</p>
                      <p className="text-slate-700 font-medium">{ord.shippingInfo?.address}, {ord.shippingInfo?.city}</p>
                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-slate-500">Payment Gateway:</span>
                        <span className="font-bold uppercase text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 text-[10px]">
                          {ord.shippingInfo?.paymentMethod || 'Online'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Items List Table/Cards */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Ordered Items ({ord.items?.length || 0})
                      </p>
                    </div>
                    <div className="border border-slate-100 rounded-xl overflow-hidden divide-y divide-slate-100 bg-white">
                      {ord.items?.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3.5 hover:bg-slate-50/50 transition">
                          <div className="flex items-center gap-3.5">
                            <img 
                              src={item.images} 
                              alt={item.title} 
                              className="w-13 h-13 object-cover rounded-xl border border-slate-100 bg-slate-50 flex-shrink-0" 
                            />
                            <div>
                              <h4 className="text-xs font-semibold text-slate-800 line-clamp-1">{item.title}</h4>
                              <p className="text-[11px] text-slate-400 mt-0.5">
                                Qty: <span className="font-bold text-slate-600">{item.quantity}</span> × ৳{item.price}
                              </p>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-xs font-bold text-slate-900">৳{item.price * item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Financial Footnote */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-slate-100 gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 font-medium">Payment Status:</span>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        ord.paymentStatus === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {ord.paymentStatus?.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex items-center gap-6 text-xs w-full sm:w-auto justify-between sm:justify-end">
                      <div className="text-slate-400 space-x-1">
                        <span>Subtotal: <strong className="text-slate-600">৳{ord.subtotal}</strong></span>
                        <span>+</span>
                        <span>Delivery: <strong className="text-slate-600">৳{ord.deliveryCharge}</strong></span>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-slate-400 block">Total Payable</span>
                        <span className="text-base font-extrabold text-slate-900">৳{ord.totalAmount}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};