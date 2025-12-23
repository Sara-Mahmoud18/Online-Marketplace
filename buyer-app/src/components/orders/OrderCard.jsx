import React from 'react';
import { Flag, Package, Truck, Calendar, DollarSign, User, AlertCircle } from 'lucide-react';

const OrderCard = ({ order, flagSeller }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'Shipped': return 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white';
      case 'Processing': return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
    }
  };

  const handleFlagSeller = () => {
    const reason = prompt('Please provide a reason for flagging this seller:');
    if (reason?.trim())
      flagSeller(order.S_ID, reason.trim());
  };

  // Calculate total items
  const totalItems = (order.quantity || []).flat().reduce((sum, qty) => sum + (Number(qty) || 0), 0);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Not available";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 overflow-hidden">
      <div className="p-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Order #{order._id.slice(-8).toUpperCase()}</h3>
              <p className="text-sm text-gray-600">Order placed on {formatDate(order.Created_Date)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(order.Status)} flex items-center gap-2 shadow-sm`}>
              {order.Status}
            </div>
            <button
              onClick={handleFlagSeller}
              className="px-4 py-2 bg-gradient-to-r from-red-50 to-rose-50 text-red-600 rounded-xl hover:from-red-100 hover:to-rose-100 transition-all duration-200 border border-red-100 hover:border-red-200 flex items-center gap-2 group/flag"
              aria-label={`Flag seller ${order.S_ID}`}
            >
              <Flag className="w-4 h-4 group-hover/flag:scale-110 transition-transform" />
              <span className="text-sm font-semibold">Report Seller</span>
            </button>
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Seller Info */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white rounded-lg">
                <User className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Seller</p>
                <p className="font-semibold text-gray-900 truncate">{order.S_ID.email}</p>
              </div>
            </div>
          </div>

          {/* Order Value */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white rounded-lg">
                <DollarSign className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Value</p>
                <p className="text-xl font-bold text-gray-900">${order.total_price?.toFixed(2) || '0.00'}</p>
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white rounded-lg">
                <Calendar className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  {order.Delivery_Date ? 'Delivered on' : 'Estimated Delivery'}
                </p>
                <p className="font-semibold text-gray-900">
                  {order.Delivery_Date ? formatDate(order.Delivery_Date) : 'Pending'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="border-t border-gray-100 pt-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-600" />
            Products Ordered ({totalItems} items)
          </h4>
          
          <div className="space-y-3">
            {(order.Product || []).flat().map((item, i) => {
              const flatQuantities = (order.quantity || []).flat();
              const displayName = typeof item === 'object' ? (item?.name || "Unnamed Product") : item;
              const quantity = flatQuantities[i] || 0;

              return (
                <div 
                  key={`${order._id}-item-${i}`}
                  className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group/item"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">{i + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{displayName}</p>
                      <p className="text-xs text-gray-500">Product #{i + 1}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Quantity</p>
                      <p className="font-bold text-gray-900">{quantity} units</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span className={`font-medium ${['Processing', 'Shipped', 'Delivered'].includes(order.Status) ? 'text-blue-600' : 'text-gray-400'}`}>
              Ordered
            </span>
            <span className={`font-medium ${['Shipped', 'Delivered'].includes(order.Status) ? 'text-blue-600' : 'text-gray-400'}`}>
              Shipped
            </span>
            <span className={`font-medium ${order.Status === 'Delivered' ? 'text-green-600' : 'text-gray-400'}`}>
              Delivered
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                order.Status === 'Delivered' 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 w-full' 
                  : order.Status === 'Shipped'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 w-2/3'
                  : 'bg-gradient-to-r from-yellow-500 to-orange-500 w-1/3'
              }`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;