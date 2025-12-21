import React from 'react';

const RecentOrders = ({ orders}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
      </div>
      {orders.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No orders yet. Click "Add Demo Order" to test!</p>
      ) : (
        <div className="space-y-3">
          {orders.slice(0, 5).map(order => (
            <div key={order._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Order #{order._id.slice(-6)}</p>
                <p className="text-sm text-gray-600">{order.S_ID.email}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.Status === 'Delivered' ? 'bg-green-100 text-green-800' :
                order.Status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {order.Status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentOrders;
