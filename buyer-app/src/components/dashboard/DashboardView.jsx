import React from 'react';
import StatCard from './StatCard';
import RecentOrders from './RecentOrders';
import { Clock, AlertTriangle } from 'lucide-react';

const DashboardView = ({ orders, flagCount }) => {
  const activeOrders = orders.filter(o => o.Status !== 'delivered').length;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Active Orders"
          value={activeOrders}
          icon={<Clock className="w-12 h-12 text-orange-600" />}
        />

        {/* New Flags Card */}
        <StatCard
          title="Seller Reports"
          value={flagCount}
          icon={
            <AlertTriangle 
              className={`w-12 h-12 ${flagCount >= 2 ? 'text-red-600' : 'text-yellow-500'}`} 
            />
          }
          subtitle={flagCount >= 2 ? "Warning: High flag count" : "Account Status: Good"}
        />
      </div>
      <RecentOrders orders={orders}/>
    </div>
  );
};

<<<<<<< HEAD
<<<<<<< HEAD
export default DashboardView;
=======
export default DashboardView;
>>>>>>> 75cd1e026c71340e749b9e58fd7614d9fb4154cc
=======
export default DashboardView;
>>>>>>> 75cd1e026c71340e749b9e58fd7614d9fb4154cc
