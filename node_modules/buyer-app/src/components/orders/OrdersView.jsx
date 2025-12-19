import React from 'react';
import OrderCard from './OrderCard';
import { Package } from 'lucide-react';

const OrdersView = ({ orders, flagSeller }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
      </div>
      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No orders received yet</p>
          <p className="text-gray-400 text-sm mt-2">Click "Add Demo Order" to test</p>
        </div>
      ) : (
        <div className="space-y-4">
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
  );
};

export default OrdersView;

