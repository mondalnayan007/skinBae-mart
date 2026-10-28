import React, { useState, useEffect } from 'react';

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Order Status Update korar function (Pending, Processing, Shipped, Delivered, Cancelled)
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

      // Local state update kora jate bar bar page reload na korte hoy
      setOrders((prevOrders) =>
        prevOrders.map((ord) =>
          ord._id === orderId ? { ...ord, orderStatus: newStatus } : ord
        )
      );
      
      alert('Order status updated successfully!');
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500 font-medium">Loading orders...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500 font-medium">Error: {error}</div>;
  }

  return (
    <div className="space-y-6 p-4 md:p-8 bg-gray-50 min-h-screen">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Admin Order Management</h2>
        <p className="text-xs text-gray-500 mt-1">Manage customer purchases, delivery addresses, and real-time status updates.</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center text-gray-500">
          No orders found in the database.
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((ord) => (
            <div key={ord._id} className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm space-y-5">
              
              {/* Order Header: Transaction ID, Date & Status Dropdown */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 bg-gray-100 text-gray-700 rounded-md">
                      TRAN ID: {ord.tran_id}
                    </span>
                    <span className="text-xs text-gray-400">Mongo ID: {ord._id}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Ordered on: {new Date(ord.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Status Update Control */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-600">Order Status:</span>
                  <select
                    value={ord.orderStatus || 'pending'}
                    onChange={(e) => handleStatusChange(ord._id, e.target.value)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg border focus:outline-none cursor-pointer ${
                      ord.orderStatus === 'delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      ord.orderStatus === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
                      ord.orderStatus === 'shipped' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      ord.orderStatus === 'processing' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
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

              {/* Customer & Shipping Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-gray-50/80 p-4 rounded-xl border border-gray-100">
                <div>
                  <p className="font-bold text-gray-700 uppercase tracking-wide mb-1">Customer Details:</p>
                  <p className="text-gray-600">Name: <span className="font-semibold text-gray-800">{ord.shippingInfo?.fullName}</span></p>
                  <p className="text-gray-600 mt-0.5">Email: <span className="font-medium text-gray-800">{ord.userEmail}</span></p>
                  <p className="text-gray-600 mt-0.5">Phone: <span className="font-semibold text-gray-800">{ord.shippingInfo?.phone}</span></p>
                </div>
                <div>
                  <p className="font-bold text-gray-700 uppercase tracking-wide mb-1">Shipping Address:</p>
                  <p className="text-gray-600 font-medium text-gray-800">{ord.shippingInfo?.address}, {ord.shippingInfo?.city}</p>
                  <p className="text-gray-600 mt-1">Payment Method: <span className="uppercase font-bold text-[#C5A880]">{ord.shippingInfo?.paymentMethod}</span></p>
                </div>
              </div>

              {/* Ordered Items List (Mapping from items array) */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Ordered Items ({ord.items?.length || 0}):
                </p>
                <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden bg-white">
                  {ord.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3.5 hover:bg-gray-50/50 transition">
                      <div className="flex items-center gap-3.5">
                        <img 
                          src={item.images} 
                          alt={item.title} 
                          className="w-12 h-12 object-cover rounded-lg border border-gray-100 bg-gray-50 flex-shrink-0" 
                        />
                        <div>
                          <h4 className="text-xs font-semibold text-gray-800 line-clamp-1">{item.title}</h4>
                          <p className="text-[11px] text-gray-400 mt-0.5">
                            Qty: <span className="font-medium text-gray-600">{item.quantity}</span> × ৳{item.price}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs font-bold text-gray-900">৳{item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Footer / Financial Summary */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-3 border-t border-gray-100 gap-3 text-xs">
                <div>
                  <span className="text-gray-500">Payment Status: </span>
                  <span className={`font-bold px-2 py-0.5 rounded ${ord.paymentStatus === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {ord.paymentStatus?.toUpperCase()}
                  </span>
                </div>
                <div className="text-right w-full sm:w-auto">
                  <div className="text-gray-500 space-x-2">
                    <span>Subtotal: ৳{ord.subtotal}</span>
                    <span>+</span>
                    <span>Delivery: ৳{ord.deliveryCharge}</span>
                  </div>
                  <p className="text-sm font-bold text-gray-900 mt-1">
                    Total Amount: <span className="text-[#C5A880]">৳{ord.totalAmount}</span>
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};