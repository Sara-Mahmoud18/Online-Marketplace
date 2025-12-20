import React, { useEffect, useState } from 'react';
import StatCard from './StatCard';
import RecentOrders from './RecentOrders';
import { Package, Clock, TrendingUp, DollarSign, AlertTriangle } from 'lucide-react'; 

const DashboardView = ({ products, orders, categories, addDemoOrder }) => {
  const activeOrders = orders.filter(o => o.Status !== 'Delivered').length;

  const totalEarnings = orders
    .filter(o => o.Status === 'Delivered')
    .reduce((sum, o) => sum + (Number(o.total_price) || 0), 0)
    .toFixed(2);

  const [sellerFlags, setSellerFlags] = useState(0);

  useEffect(() => {
    const flagsCount = parseInt(localStorage.getItem("sellerFlagsCount") || 0, 10);
    setSellerFlags(flagsCount);
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h2>

      {/*  Warning if flags >= 2 */}
      {sellerFlags >= 2 && (
        <div className="mb-6 p-4 flex items-center bg-red-100 text-red-700 rounded-lg">
          <AlertTriangle className="w-6 h-6 mr-2" />
          <span>
            Warning: Your account has {sellerFlags} flags. Access may be restricted.
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard
          title="Total Products"
          value={products.length}
          icon={<Package className="w-12 h-12 text-indigo-600" />}
        />
        <StatCard
          title="Active Orders"
          value={activeOrders}
          icon={<Clock className="w-12 h-12 text-orange-600" />}
        />
        <StatCard
          title="Categories"
          value={categories.length}
          icon={<TrendingUp className="w-12 h-12 text-green-600" />}
        />
        <StatCard
          title="Total Earnings"
          value={`$${totalEarnings}`}
          icon={<DollarSign className="w-12 h-12 text-green-600" />}
        />
      </div>

      <RecentOrders orders={orders} addDemoOrder={addDemoOrder} />
    </div>
  );
};

export default DashboardView;