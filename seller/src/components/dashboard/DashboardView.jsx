
import React, { useEffect, useState } from 'react';
import RecentOrders from './RecentOrders';
import { 
  Package, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  AlertTriangle,
  Users,
  BarChart3,
  Calendar,
  ArrowUpRight,
  MoreVertical
} from 'lucide-react'; 

const DashboardView = ({ products, orders, categories, setCurrentView }) => {
  const activeOrders = orders.filter(o => o.Status !== 'Delivered').length;
  const deliveredOrders = orders.filter(o => o.Status === 'Delivered').length;
  
  const totalEarnings = orders
    .filter(o => o.Status === 'Delivered')
    .reduce((sum, o) => sum + (Number(o.total_price) || 0), 0)
    .toFixed(2);

  const [sellerFlags, setSellerFlags] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [dailyRevenue, setDailyRevenue] = useState(0);

  useEffect(() => {
    const flagsCount = parseInt(localStorage.getItem("sellerFlagsCount") || 0, 10);
    setSellerFlags(flagsCount);

    // Calculate monthly revenue (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const monthlyRevenue = orders
      .filter(o => o.Status === 'Delivered' && new Date(o.Delivery_Date) >= thirtyDaysAgo)
      .reduce((sum, o) => sum + (Number(o.total_price) || 0), 0)
      .toFixed(2);
    
    setMonthlyRevenue(monthlyRevenue);

    // Calculate daily revenue (today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const dailyRevenue = orders
      .filter(o => o.Status === 'Delivered' && new Date(o.Delivery_Date) >= today)
      .reduce((sum, o) => sum + (Number(o.total_price) || 0), 0)
      .toFixed(2);
    
    setDailyRevenue(dailyRevenue);
  }, [orders]);

  // Get status distribution
  const statusDistribution = {
    pending: orders.filter(o => o.Status === 'Pending').length,
    shipped: orders.filter(o => o.Status === 'Shipped').length,
    delivered: orders.filter(o => o.Status === 'Delivered').length,
  };

  // Get recent 7 days revenue trend
  const getWeeklyTrend = () => {
    const weeklyData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const dayRevenue = orders
        .filter(o => o.Status === 'Delivered' && 
          new Date(o.Delivery_Date).toDateString() === date.toDateString())
        .reduce((sum, o) => sum + (Number(o.total_price) || 0), 0);
      
      weeklyData.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        revenue: dayRevenue
      });
    }
    return weeklyData;
  };

  const weeklyTrend = getWeeklyTrend();

  // Find maximum revenue for the week to calculate bar percentages
  const maxRevenue = Math.max(...weeklyTrend.map(d => d.revenue), 1); // Use 1 as minimum to avoid division by zero

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your store today.</p>
          </div>
          
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>

        {/* Warning Banner */}
        {sellerFlags >= 2 && (
          <div className="mb-8 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-2xl p-5 shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Account Status Alert</h3>
                  <p className="text-red-100 text-sm">
                    Your account has {sellerFlags} flag{sellerFlags > 1 ? 's' : ''}. 
                    Continued issues may result in restricted access.
                  </p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium backdrop-blur-sm transition-colors">
                View Details
              </button>
            </div>
          </div>
        )}

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Products</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{products.length}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {products.filter(p => p.quantity <= 5).length} low in stock
                </p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-xl">
                <Package className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center text-sm">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-indigo-600 h-1.5 rounded-full" 
                        style={{ width: `${Math.min(100, (products.length / 100) * 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{categories.length} categories</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Active Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{activeOrders}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {statusDistribution.pending} pending • {statusDistribution.shipped} shipped
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

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Earnings</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">${totalEarnings}</p>
                <p className="text-xs text-gray-500 mt-1">
                  ${dailyRevenue} today • ${monthlyRevenue} this month
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Categories</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{categories.length}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Products distributed across categories
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Performance</span>
                <span className="font-medium text-blue-600">
                  {categories.length > 5 ? 'Excellent' : 'Good'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Detailed Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Revenue Trend</h3>
                <p className="text-sm text-gray-500">Last 7 days performance</p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              {weeklyTrend.map((day, index) => {
                // Calculate percentage for the bar (minimum 3% for visibility when revenue is 0)
                const percentage = maxRevenue > 0 ? 
                  Math.max(3, (day.revenue / maxRevenue) * 100) : 3;
                
                return (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 w-16">{day.day}</span>
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gray-900 w-16 text-right">
                      ${day.revenue.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Weekly Total</span>
                <span className="text-lg font-bold text-gray-900">
                  ${weeklyTrend.reduce((sum, day) => sum + day.revenue, 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Order Status Distribution */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Order Status</h3>
                <p className="text-sm text-gray-500">Current order distribution</p>
              </div>
              <div className="text-sm font-medium text-gray-700">
                Total: {orders.length}
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                { status: 'Delivered', count: statusDistribution.delivered, color: 'bg-green-500', textColor: 'text-green-700', bgColor: 'bg-green-50' },
                { status: 'Shipped', count: statusDistribution.shipped, color: 'bg-blue-500', textColor: 'text-blue-700', bgColor: 'bg-blue-50' },
                { status: 'Pending', count: statusDistribution.pending, color: 'bg-yellow-500', textColor: 'text-yellow-700', bgColor: 'bg-yellow-50' },
              ].map((item, index) => {
                const percentage = orders.length > 0 ? (item.count / orders.length) * 100 : 0;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <span className="text-sm font-medium text-gray-700">{item.status}</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{item.count}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${item.color}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-gray-500 w-12 text-right">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Processing Rate</span>
                <span className="text-lg font-bold text-green-600">
                  {orders.length > 0 ? 
                    `${Math.round((statusDistribution.shipped + statusDistribution.delivered) / orders.length * 100)}%` : 
                    '0%'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                <p className="text-sm text-gray-500">Latest customer orders</p>
              </div>
              <button 
                onClick={() => setCurrentView("orders")}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg text-sm"
              >
                View All Orders
              </button>
            </div>
          </div>
          <div className="p-6">
            <RecentOrders orders={orders} />
          </div>
        </div>

        {/* Quick Stats Footer */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-gray-700">Avg. Order Value</h4>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ${deliveredOrders > 0 ? (Number(totalEarnings) / deliveredOrders).toFixed(2) : '0.00'}
                </p>
              </div>
              <BarChart3 className="w-10 h-10 text-blue-600 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-gray-700">Conversion Rate</h4>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {products.length > 0 && orders.length > 0 ? 
                    `${Math.round((orders.length / products.length) * 100)}%` : 
                    '0%'}
                </p>
              </div>
              <TrendingUp className="w-10 h-10 text-green-600 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-gray-700">Customer Satisfaction</h4>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {deliveredOrders > 0 ? 
                    `${Math.min(100, Math.round((deliveredOrders / orders.length) * 100))}%` : 
                    '0%'}
                </p>
              </div>
              <Users className="w-10 h-10 text-purple-600 opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
