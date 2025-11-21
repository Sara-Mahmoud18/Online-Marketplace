import React from 'react';
import StatCard from './StatCard';
import RecentOrders from './RecentOrders';
import { Package, Clock, TrendingUp } from 'lucide-react';

const DashboardView = ({ orders, categories, addDemoOrder }) => {
  const activeOrders = orders.filter(o => o.status !== 'delivered').length;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Active Orders"
          value={activeOrders}
          icon={<Clock className="w-12 h-12 text-orange-600" />}
        />
      </div>
      <RecentOrders orders={orders} addDemoOrder={addDemoOrder} />
    </div>
  );
};

export default DashboardView;