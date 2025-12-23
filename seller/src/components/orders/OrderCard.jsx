import React from "react";
import { Calendar, Package, DollarSign, ChevronRight } from "lucide-react";

const OrderCard = ({ order, onClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'Shipped': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const itemCount = order.Product?.length || 0;

  return (
    <div
      onClick={() => onClick(order)}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-1"
    >
      <div className="p-6">
        {/* Header with Order ID and Date */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                Order #{order._id?.slice(-8).toUpperCase()}
              </h3>
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                <Calendar className="w-3 h-3" />
                {order.Created_Date
                  ? new Date(order.Created_Date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })
                  : "—"}
              </p>
            </div>
          </div>
          
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
        </div>

        {/* Status and Stats */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.Status)}`}>
              {order.Status}
            </span>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900 flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              {order.total_price?.toFixed(2) || "0.00"}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>

        {/* Buyer and Items Preview */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-blue-600">
                  {order.buyerUsername?.[0]?.toUpperCase() || "?"}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {order.buyerUsername || "Unknown Buyer"}
                </p>
                <p className="text-xs text-gray-500">Buyer</p>
              </div>
            </div>
            
            <div className="flex -space-x-2">
              {order.Product?.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center shadow-sm"
                  title={item.name}
                >
                  <span className="text-xs font-bold text-gray-600">#{index + 1}</span>
                </div>
              ))}
              {itemCount > 3 && (
                <div className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center shadow-sm">
                  <span className="text-xs font-bold text-blue-600">+{itemCount - 3}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default OrderCard;