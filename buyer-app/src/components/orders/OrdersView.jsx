// import React from 'react';
// import OrderCard from './OrderCard';
// import { Package } from 'lucide-react';

// const OrdersView = ({ orders, flagSeller }) => {
//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
//       </div>
//       {orders.length === 0 ? (
//         <div className="bg-white rounded-lg shadow p-12 text-center">
//           <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//           <p className="text-gray-500 text-lg">No orders received yet</p>
//           <p className="text-gray-400 text-sm mt-2">Click "Add Demo Order" to test</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {orders.map(order => (
//             <OrderCard
//               key={order._id}
//               order={order}
//               flagSeller={flagSeller}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrdersView;

import React from 'react';
import OrderCard from './OrderCard';
import { Package, TrendingUp, ShoppingBag, DollarSign, Filter, Calendar } from 'lucide-react';

const OrdersView = ({ orders, flagSeller }) => {
  // Calculate statistics
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total_price || 0), 0);
  const deliveredOrders = orders.filter(o => o.Status === 'Delivered').length;
  const pendingOrders = orders.filter(o => o.Status === 'Processing' || o.Status === 'Pending').length;
  const shippedOrders = orders.filter(o => o.Status === 'Shipped').length;

  // Get recent orders (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentOrders = orders.filter(o => new Date(o.Created_Date) >= thirtyDaysAgo);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Order Management</h1>
            <p className="text-gray-600">Track and manage all your orders in one place</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {orders.length} orders
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{orders.length}</p>
                <p className="text-xs text-gray-500 mt-1">{recentOrders.length} recent</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <ShoppingBag className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Price Amount</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">${totalRevenue.toFixed(2)}</p>
                <p className="text-xs text-gray-500 mt-1">From all orders</p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Delivered</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{deliveredOrders}</p>
                <p className="text-xs text-gray-500 mt-1">Completed orders</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <Package className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">In Progress</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{pendingOrders + shippedOrders}</p>
                <p className="text-xs text-gray-500 mt-1">{pendingOrders} pending, {shippedOrders} shipped</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-xl">
                <TrendingUp className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">All Orders</h2>
                <p className="text-sm text-gray-500">
                  Showing {orders.length} {orders.length === 1 ? 'order' : 'orders'}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition text-sm flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {orders.length === 0 ? (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12 text-center border border-gray-200">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Package className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-700 mb-3">No Orders Yet</h3>
                  <p className="text-gray-500 mb-4">You haven't placed any orders yet</p>
                  <p className="text-sm text-gray-400">
                    Start shopping to see your orders here
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map(order => (
                  <OrderCard
                    key={order._id}
                    order={order}
                    flagSeller={flagSeller}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Summary Section */}
        {orders.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-gray-700">Avg. Order Value</h4>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    ${orders.length > 0 ? (totalRevenue / orders.length).toFixed(2) : '0.00'}
                  </p>
                </div>
                <TrendingUp className="w-10 h-10 text-blue-600 opacity-50" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-gray-700">Delivery Success</h4>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {orders.length > 0 ? Math.round((deliveredOrders / orders.length) * 100) : 0}%
                  </p>
                </div>
                <Package className="w-10 h-10 text-green-600 opacity-50" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-gray-700">Active Orders</h4>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{pendingOrders + shippedOrders}</p>
                </div>
                <ShoppingBag className="w-10 h-10 text-purple-600 opacity-50" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersView;