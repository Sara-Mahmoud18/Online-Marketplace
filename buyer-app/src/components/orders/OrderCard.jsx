import React from 'react';
import { Flag } from 'lucide-react';

const OrderCard = ({ order, flagSeller }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleFlagSeller = () => {
    const reason = prompt('Enter reason for flagging this buyer:');
    if (reason?.trim())
      flagSeller(order.S_ID, reason.trim());
    //  console.log(reason.trim());
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Order #{order._id.slice(-8)}</h3>
          <p className="text-sm text-gray-600 mt-1">Seller Email: {order.S_ID.email}</p>
          <p>Products:</p>
          <div className="space-y-1 pb-2">
            {
              (order.Product || []).flat().map((item, i) => {
                const flatQuantities = (order.quantity || []).flat();

                // 2. Extract name safely whether it's an object or just a string
                const displayName = typeof item === 'object' ? (item?.name || "Unnamed Product") : item;

                return (
                  <p key={`${order._id}-item-${i}`} className="text-sm text-gray-600">
                    {displayName} — Qty: {flatQuantities[i] ?? "N/A"}
                  </p>
                );
              })
            }
          </div>
          <hr className='pb-2' />
          <p className="text-sm text-gray-600">Total Price: ${order.total_price}</p>
          <p className="text-sm text-gray-600">Created Date: {order.Created_Date}</p>
          {order.Delivery_Date !== null && (
            <p className="text-sm text-gray-600">
              Delivery Date: {order.Delivery_Date}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end space-y-4">
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.Status)}`}>
            {order.Status.toUpperCase()}
          </span>
          <button
            onClick={handleFlagSeller}
            className="flex items-center space-x-1 p-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition duration-150"
            aria-label={`Flag seller ${order.S_ID}`}
          >
            <Flag className="w-4 h-4" />
            <span className="text-xs font-medium">Flag Seller</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;