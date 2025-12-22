// import React from 'react';
// import StatCard from './StatCard';
// import RecentOrders from './RecentOrders';
// import { Clock, AlertTriangle } from 'lucide-react';

// const DashboardView = ({ orders, flagCount }) => {
//   const activeOrders = orders.filter(o => o.Status !== 'Delivered').length;

//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <StatCard
//           title="Active Orders"
//           value={activeOrders}
//           icon={<Clock className="w-12 h-12 text-orange-600" />}
//         />

//         {/* New Flags Card */}
//         <StatCard
//           title="Seller Reports"
//           value={flagCount}
//           icon={
//             <AlertTriangle 
//               className={`w-12 h-12 ${flagCount >= 2 ? 'text-red-600' : 'text-yellow-500'}`} 
//             />
//           }
//           subtitle={flagCount >= 2 ? "Warning: High flag count" : "Account Status: Good"}
//         />
//       </div>
//       <RecentOrders orders={orders}/>
//     </div>
//   );
// };


// export default DashboardView;
// import React from 'react';
// import RecentOrders from './RecentOrders';
// import { 
//   Clock, 
//   AlertTriangle, 
//   TrendingUp, 
//   DollarSign,
//   Package,
//   CheckCircle,
//   ArrowUpRight,
//   ShoppingBag,
//   BarChart3,
//   Calendar,
//   Users
// } from 'lucide-react';

// const DashboardView = ({ orders, flagCount }) => {
//   const activeOrders = orders.filter(o => o.Status !== 'Delivered').length;
//   const deliveredOrders = orders.filter(o => o.Status === 'Delivered').length;
//   const pendingOrders = orders.filter(o => o.Status === 'Pending').length;
//   const shippedOrders = orders.filter(o => o.Status === 'Shipped').length;
  
//   // Calculate total spent
//   const totalSpent = orders
//     .filter(o => o.Status === 'Delivered')
//     .reduce((sum, o) => sum + (Number(o.total_price) || 0), 0)
//     .toFixed(2);

//   // Calculate average order value
//   const avgOrderValue = deliveredOrders > 0 
//     ? (totalSpent / deliveredOrders).toFixed(2)
//     : '0.00';

//   // Get today's orders
//   const today = new Date().toISOString().split('T')[0];
//   const todaysOrders = orders.filter(o => 
//     o.Created_Date && o.Created_Date.includes(today)
//   ).length;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//           <div>
//             <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
//             <p className="text-gray-600">Welcome back! Here's your shopping activity summary</p>
//           </div>
          
//           <div className="mt-4 md:mt-0 flex items-center gap-3">
//             <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
//               <Calendar className="w-4 h-4" />
//               {new Date().toLocaleDateString('en-US', { 
//                 month: 'short',
//                 day: 'numeric',
//                 year: 'numeric'
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Warning Banner for High Flags */}
//         {flagCount >= 2 && (
//           <div className="mb-8 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-2xl p-5 shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
//                   <AlertTriangle className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-bold">Account Status Alert</h3>
//                   <p className="text-red-100 text-sm">
//                     You have {flagCount} seller report{flagCount > 1 ? 's' : ''}. 
//                     Consider reviewing your flagged sellers.
//                   </p>
//                 </div>
//               </div>
//               <button 
//                 onClick={() => window.location.href = '/flagged'}
//                 className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium backdrop-blur-sm transition-colors"
//               >
//                 View Reports
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Main Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {/* Active Orders Card */}
//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm font-medium">Active Orders</p>
//                 <p className="text-3xl font-bold text-gray-900 mt-2">{activeOrders}</p>
//                 <p className="text-xs text-gray-500 mt-1">
//                   {pendingOrders} pending • {shippedOrders} shipped
//                 </p>
//               </div>
//               <div className="p-3 bg-orange-50 rounded-xl">
//                 <Clock className="w-8 h-8 text-orange-600" />
//               </div>
//             </div>
//             <div className="mt-4 pt-4 border-t border-gray-100">
//               <div className="flex items-center justify-between text-sm">
//                 <span className="text-gray-600">Completion Rate</span>
//                 <span className="font-bold text-green-600 flex items-center gap-1">
//                   <ArrowUpRight className="w-4 h-4" />
//                   {orders.length > 0 ? 
//                     `${Math.round((deliveredOrders / orders.length) * 100)}%` : 
//                     '0%'}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Total Spent Card */}
//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm font-medium">Total Spent</p>
//                 <p className="text-3xl font-bold text-gray-900 mt-2">${totalSpent}</p>
//                 <p className="text-xs text-gray-500 mt-1">
//                   ${avgOrderValue} average per order
//                 </p>
//               </div>
//               <div className="p-3 bg-green-50 rounded-xl">
//                 <DollarSign className="w-8 h-8 text-green-600" />
//               </div>
//             </div>
//             <div className="mt-4 pt-4 border-t border-gray-100">
//               <div className="flex items-center justify-between text-sm">
//                 <span className="text-gray-600">Today's Orders</span>
//                 <span className="font-bold text-blue-600">{todaysOrders}</span>
//               </div>
//             </div>
//           </div>

//           {/* Seller Reports Card */}
//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm font-medium">Seller Reports</p>
//                 <p className="text-3xl font-bold text-gray-900 mt-2">{flagCount}</p>
//                 <p className={`text-xs font-medium mt-1 ${
//                   flagCount >= 2 ? 'text-red-600' : 'text-green-600'
//                 }`}>
//                   {flagCount >= 2 ? '⚠️ Needs Attention' : '✅ All Good'}
//                 </p>
//               </div>
//               <div className={`p-3 rounded-xl ${
//                 flagCount >= 2 ? 'bg-red-50' : 'bg-yellow-50'
//               }`}>
//                 <AlertTriangle className={`w-8 h-8 ${
//                   flagCount >= 2 ? 'text-red-600' : 'text-yellow-600'
//                 }`} />
//               </div>
//             </div>
//             <div className="mt-4 pt-4 border-t border-gray-100">
//               <div className="flex items-center justify-between text-sm">
//                 <span className="text-gray-600">Status</span>
//                 <span className={`font-bold ${
//                   flagCount >= 2 ? 'text-red-600' : 'text-green-600'
//                 }`}>
//                   {flagCount >= 2 ? 'Review Needed' : 'Normal'}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Total Orders Card */}
//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm font-medium">Total Orders</p>
//                 <p className="text-3xl font-bold text-gray-900 mt-2">{orders.length}</p>
//                 <p className="text-xs text-gray-500 mt-1">
//                   {deliveredOrders} delivered successfully
//                 </p>
//               </div>
//               <div className="p-3 bg-purple-50 rounded-xl">
//                 <ShoppingBag className="w-8 h-8 text-purple-600" />
//               </div>
//             </div>
//             <div className="mt-4 pt-4 border-t border-gray-100">
//               <div className="flex items-center justify-between text-sm">
//                 <span className="text-gray-600">Success Rate</span>
//                 <span className="font-bold text-purple-600">
//                   {orders.length > 0 ? 
//                     `${Math.round((deliveredOrders / orders.length) * 100)}%` : 
//                     '0%'}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Additional Metrics */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//           <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h4 className="text-sm font-bold text-gray-700">Avg. Order Value</h4>
//                 <p className="text-2xl font-bold text-gray-900 mt-1">${avgOrderValue}</p>
//               </div>
//               <BarChart3 className="w-10 h-10 text-blue-600 opacity-50" />
//             </div>
//           </div>

//           <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h4 className="text-sm font-bold text-gray-700">Delivery Success</h4>
//                 <p className="text-2xl font-bold text-gray-900 mt-1">
//                   {orders.length > 0 ? 
//                     `${Math.round((deliveredOrders / orders.length) * 100)}%` : 
//                     '0%'}
//                 </p>
//               </div>
//               <CheckCircle className="w-10 h-10 text-green-600 opacity-50" />
//             </div>
//           </div>

//           <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h4 className="text-sm font-bold text-gray-700">Sellers Used</h4>
//                 <p className="text-2xl font-bold text-gray-900 mt-1">
//                   {[...new Set(orders.map(o => o.S_ID?._id || o.S_ID))].length}
//                 </p>
//               </div>
//               <Users className="w-10 h-10 text-purple-600 opacity-50" />
//             </div>
//           </div>
//         </div>

//         {/* Recent Orders Section */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//           <div className="p-6 border-b border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
//                 <p className="text-sm text-gray-500">Latest {Math.min(5, orders.length)} of {orders.length} total orders</p>
//               </div>
//               <button 
//                 onClick={() => window.location.href = '/orders'}
//                 className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition text-sm"
//               >
//                 View All Orders
//               </button>
//             </div>
//           </div>
//           <div className="p-6">
//             <RecentOrders orders={orders} />
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="text-lg font-bold mb-2">Continue Shopping</h3>
//                 <p className="text-blue-100 text-sm mb-4">Browse more products in our catalog</p>
//                 <button 
//                   onClick={() => window.location.href = '/catalog'}
//                   className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition"
//                 >
//                   Go to Catalog
//                 </button>
//               </div>
//               <Package className="w-12 h-12 text-white/50" />
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-6 text-white">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="text-lg font-bold mb-2">Track Orders</h3>
//                 <p className="text-emerald-100 text-sm mb-4">Check your order status and updates</p>
//                 <button 
//                   onClick={() => window.location.href = '/orders'}
//                   className="px-6 py-2 bg-white text-green-600 font-semibold rounded-xl hover:bg-emerald-50 transition"
//                 >
//                   View Orders
//                 </button>
//               </div>
//               <TrendingUp className="w-12 h-12 text-white/50" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardView;
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import RecentOrders from './RecentOrders';
import { 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign,
  Package,
  CheckCircle,
  ArrowUpRight,
  ShoppingBag,
  BarChart3,
  Calendar,
  Users
} from 'lucide-react';

const DashboardView = ({ orders, flagCount }) => {
  const navigate = useNavigate(); // Add this hook

  const activeOrders = orders.filter(o => o.Status !== 'Delivered').length;
  const deliveredOrders = orders.filter(o => o.Status === 'Delivered').length;
  const pendingOrders = orders.filter(o => o.Status === 'Pending').length;
  const shippedOrders = orders.filter(o => o.Status === 'Shipped').length;
  
  const totalSpent = orders
    .filter(o => o.Status === 'Delivered')
    .reduce((sum, o) => sum + (Number(o.total_price) || 0), 0)
    .toFixed(2);

  const avgOrderValue = deliveredOrders > 0 
    ? (totalSpent / deliveredOrders).toFixed(2)
    : '0.00';

  const today = new Date().toISOString().split('T')[0];
  const todaysOrders = orders.filter(o => 
    o.Created_Date && o.Created_Date.includes(today)
  ).length;

  // Navigation handlers
  const handleGoToCatalog = () => {
    navigate('/catalog');
  };

  const handleViewOrders = () => {
    navigate('/orders');
  };

  const handleViewReports = () => {
    navigate('/flagged');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
            <p className="text-gray-600">Welcome back! Here's your shopping activity summary</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date().toLocaleDateString('en-US', { 
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
          </div>
        </div>

        {/* Warning Banner for High Flags */}
        {flagCount >= 2 && (
          <div className="mb-8 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-2xl p-5 shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Account Status Alert</h3>
                  <p className="text-red-100 text-sm">
                    You have {flagCount} seller report{flagCount > 1 ? 's' : ''}. 
                    Consider reviewing your flagged sellers.
                  </p>
                </div>
              </div>
              <button 
                onClick={handleViewReports}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium backdrop-blur-sm transition-colors"
              >
                View Reports
              </button>
            </div>
          </div>
        )}

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Active Orders Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Active Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{activeOrders}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {pendingOrders} pending • {shippedOrders} shipped
                </p>
              </div>
              <div className="p-3 bg-orange-50 rounded-xl">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Completion Rate</span>
                <span className="font-bold text-green-600 flex items-center gap-1">
                  <ArrowUpRight className="w-4 h-4" />
                  {orders.length > 0 ? 
                    `${Math.round((deliveredOrders / orders.length) * 100)}%` : 
                    '0%'}
                </span>
              </div>
            </div>
          </div>

          {/* Total Spent Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Spent</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">${totalSpent}</p>
                <p className="text-xs text-gray-500 mt-1">
                  ${avgOrderValue} average per order
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Today's Orders</span>
                <span className="font-bold text-blue-600">{todaysOrders}</span>
              </div>
            </div>
          </div>

          {/* Seller Reports Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Seller Reports</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{flagCount}</p>
                <p className={`text-xs font-medium mt-1 ${
                  flagCount >= 2 ? 'text-red-600' : 'text-green-600'
                }`}>
                  {flagCount >= 2 ? '⚠️ Needs Attention' : '✅ All Good'}
                </p>
              </div>
              <div className={`p-3 rounded-xl ${
                flagCount >= 2 ? 'bg-red-50' : 'bg-yellow-50'
              }`}>
                <AlertTriangle className={`w-8 h-8 ${
                  flagCount >= 2 ? 'text-red-600' : 'text-yellow-600'
                }`} />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Status</span>
                <span className={`font-bold ${
                  flagCount >= 2 ? 'text-red-600' : 'text-green-600'
                }`}>
                  {flagCount >= 2 ? 'Review Needed' : 'Normal'}
                </span>
              </div>
            </div>
          </div>

          {/* Total Orders Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{orders.length}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {deliveredOrders} delivered successfully
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <ShoppingBag className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Success Rate</span>
                <span className="font-bold text-purple-600">
                  {orders.length > 0 ? 
                    `${Math.round((deliveredOrders / orders.length) * 100)}%` : 
                    '0%'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-gray-700">Avg. Order Value</h4>
                <p className="text-2xl font-bold text-gray-900 mt-1">${avgOrderValue}</p>
              </div>
              <BarChart3 className="w-10 h-10 text-blue-600 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-gray-700">Delivery Success</h4>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {orders.length > 0 ? 
                    `${Math.round((deliveredOrders / orders.length) * 100)}%` : 
                    '0%'}
                </p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-600 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-gray-700">Sellers Used</h4>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {[...new Set(orders.map(o => o.S_ID?._id || o.S_ID))].length}
                </p>
              </div>
              <Users className="w-10 h-10 text-purple-600 opacity-50" />
            </div>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                <p className="text-sm text-gray-500">Latest {Math.min(5, orders.length)} of {orders.length} total orders</p>
              </div>
              <button 
                onClick={handleViewOrders}
                className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition text-sm"
              >
                View All Orders
              </button>
            </div>
          </div>
          <div className="p-6">
            <RecentOrders orders={orders} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold mb-2">Continue Shopping</h3>
                <p className="text-blue-100 text-sm mb-4">Browse more products in our catalog</p>
                <button 
                  onClick={handleGoToCatalog}
                  className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition"
                >
                  Go to Catalog
                </button>
              </div>
              <Package className="w-12 h-12 text-white/50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold mb-2">Track Orders</h3>
                <p className="text-emerald-100 text-sm mb-4">Check your order status and updates</p>
                <button 
                  onClick={handleViewOrders}
                  className="px-6 py-2 bg-white text-green-600 font-semibold rounded-xl hover:bg-emerald-50 transition"
                >
                  View Orders
                </button>
              </div>
              <TrendingUp className="w-12 h-12 text-white/50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;