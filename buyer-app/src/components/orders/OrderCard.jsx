import React from 'react';
import { Flag } from 'lucide-react';

const OrderCard = ({ order, updateOrderStatus, flagBuyer }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Order #{order.id.slice(-8)}</h3>
          <p className="text-sm text-gray-600 mt-1">Buyer: {order.buyerEmail}</p>
          <p className="text-sm text-gray-600">Date: {new Date(order.date).toLocaleDateString()}</p>
          <p className="text-sm text-gray-600">Total: ${order.total}</p>
        </div>
        <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
          {order.status.toUpperCase()}
        </span>
      </div>
      <div className="border-t pt-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Update Status:</p>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => updateOrderStatus(order.id, 'processing')}
            className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition text-sm"
          >
            Processing
          </button>
          <button
            onClick={() => updateOrderStatus(order.id, 'shipped')}
            className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition text-sm"
          >
            Shipped
          </button>
          <button
            onClick={() => updateOrderStatus(order.id, 'delivered')}
            className="px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition text-sm"
          >
            Delivered
          </button>
          <button
            onClick={() => {
              const reason = prompt('Enter reason for flagging this buyer:');
              if (reason) flagBuyer(order.buyerEmail, reason);
            }}
            className="ml-auto px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition text-sm flex items-center gap-2"
          >
            <Flag className="w-4 h-4" />
            Flag Buyer
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;