import React, { useState, useEffect } from "react";
import { X, Package, Calendar, CreditCard, User, Truck } from "lucide-react";

const OrderDetailsModal = ({
  order,
  onClose,
  onEdit,
  onAddFlag,
  onRemoveFlag,
}) => {
  if (!order) return null;

  const [status, setStatus] = useState("");
  
  // Logic: Disable editing if status is already "Delivered"
  const isLocked = order.Status === "Delivered";

  useEffect(() => {
    if (order) setStatus(order.Status);
  }, [order]);

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gray-50 border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-600" />
            Order Details
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-gray-400" />
                <span className="font-semibold text-gray-700">Buyer:</span>
                <span className="text-gray-600">{order.buyerUsername || "Unknown"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Truck className="w-4 h-4 text-gray-400" />
                <span className="font-semibold text-gray-700">Status:</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  isLocked ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                }`}>
                  {order.Status}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CreditCard className="w-4 h-4 text-gray-400" />
                <span className="font-semibold text-gray-700">Total Price:</span>
                <span className="text-gray-900 font-bold">${order.total_price}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="font-semibold text-gray-700">Created:</span>
                <span className="text-gray-600">
                  {order.Created_Date ? new Date(order.Created_Date).toLocaleDateString() : "—"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="font-semibold text-gray-700">Delivered:</span>
                <span className="text-gray-600">
                  {order.Delivery_Date ? new Date(order.Delivery_Date).toLocaleDateString() : "Pending"}
                </span>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <h3 className="font-bold text-gray-800 mb-3 border-b pb-2">Items in Order</h3>
          <div className="space-y-3 mb-8">
            {order.Product?.length > 0 ? (
              order.Product.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{item.name || "Product Name"}</span>
                    <span className="text-xs text-gray-400">ID: {item._id}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-600">
                      {order.quantity ? order.quantity[index] : 1} × ${item.price || 0}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm py-4 italic">No items found.</p>
            )}
          </div>

          {/* Actions Section */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex-1">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Update Order Status
                </label>
                <select
                  disabled={isLocked}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={`w-full border rounded-lg p-2.5 text-sm transition-all outline-none ${
                    isLocked 
                      ? "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed" 
                      : "bg-white border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  }`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
                {isLocked && (
                  <p className="text-[10px] text-red-500 mt-1 font-medium italic">
                    * Delivered orders are finalized and cannot be changed.
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(order._id, status)}
                  disabled={isLocked}
                  className={`px-4 py-2 rounded-lg text-white text-sm font-semibold transition-all ${
                    isLocked 
                      ? "bg-gray-400 cursor-not-allowed" 
                      : "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 active:scale-95"
                  }`}
                >
                  {isLocked ? "Order Finalized" : "Save Status"}
                </button>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-2">
              <button
                onClick={() => onAddFlag(order)}
                className="flex-1 min-w-[120px] px-3 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors border border-red-100"
              >
                Flag Buyer
              </button>
              <button
                onClick={() => onRemoveFlag(order)}
                className="flex-1 min-w-[120px] px-3 py-2 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors border border-gray-200"
              >
                Clear Flag
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;