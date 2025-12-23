import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Truck, 
  Package, 
  CheckCircle,
  Clock,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

const RecentOrders = ({ orders }) => {
  const navigate = useNavigate();

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Shipped': return <Truck className="w-4 h-4 text-blue-600" />;
      case 'Pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-50 text-green-700 border-green-100';
      case 'Shipped': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Pending': return 'bg-yellow-50 text-yellow-700 border-yellow-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const truncateEmail = (email) => {
    if (!email) return 'Unknown Seller';
    if (email.length > 20) return email.substring(0, 20) + '...';
    return email;
  };

  const handleViewAllOrders = () => {
    navigate('/orders');
  };

  const handleStartShopping = () => {
    navigate('/catalog');
  };

  const handleViewOrderDetails = (orderId) => {
    navigate('/orders');
  };

  return (
    <div>
      {orders.length === 0 ? (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12 text-center border border-gray-200">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-3">No Orders Yet</h3>
            <p className="text-gray-500 mb-8">Start shopping to see your orders here</p>
            <button 
              onClick={handleStartShopping}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Shopping
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.slice(0, 5).map(order => (
            <div 
              key={order._id} 
              className="group bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Package className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Order #{order._id.slice(-8).toUpperCase()}</h4>
                        <p className="text-sm text-gray-600">
                          Seller: <span className="font-medium">{truncateEmail(order.S_ID?.email)}</span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Date:</span>
                        <span className="font-medium text-gray-900">{formatDate(order.Created_Date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Amount:</span>
                        <span className="font-bold text-gray-900">${order.total_price?.toFixed(2) || '0.00'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Items:</span>
                        <span className="font-medium text-gray-900">
                          {Array.isArray(order.Product) ? order.Product.length : 1}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(order.Status)}`}>
                      {getStatusIcon(order.Status)}
                      <span className="font-semibold">{order.Status}</span>
                    </div>
                    
                    <button 
                      onClick={() => handleViewOrderDetails(order._id)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Details
                    </button>
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className={`font-medium ${
                      ['Pending', 'Shipped', 'Delivered'].includes(order.Status) 
                        ? 'text-blue-600' 
                        : 'text-gray-400'
                    }`}>
                      Ordered
                    </span>
                    <span className={`font-medium ${
                      ['Shipped', 'Delivered'].includes(order.Status) 
                        ? 'text-blue-600' 
                        : 'text-gray-400'
                    }`}>
                      Shipped
                    </span>
                    <span className={`font-medium ${
                      order.Status === 'Delivered' 
                        ? 'text-green-600' 
                        : 'text-gray-400'
                    }`}>
                      Delivered
                    </span>
                  </div>
                  <div className="h-1 bg-gray-200 rounded-full mt-1">
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
          ))}

          {orders.length > 5 && (
            <div className="pt-4 border-t border-gray-200">
              <button 
                onClick={handleViewAllOrders}
                className="w-full py-3 text-center text-blue-600 font-semibold hover:text-blue-800 transition-colors flex items-center justify-center gap-2"
              >
                View all {orders.length} orders
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecentOrders;