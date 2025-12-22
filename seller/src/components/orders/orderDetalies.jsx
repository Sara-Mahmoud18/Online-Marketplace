// import React, { useState, useEffect } from "react";
// import { X, Package, Calendar, CreditCard, User, Truck } from "lucide-react";

// const OrderDetailsModal = ({
//   order,
//   onClose,
//   onEdit,
//   onAddFlag,
//   onRemoveFlag,
// }) => {
//   if (!order) return null;

//   const [status, setStatus] = useState("");
  
//   // Logic: Disable editing if status is already "Delivered"
//   const isLocked = order.Status === "Delivered";

//   useEffect(() => {
//     if (order) setStatus(order.Status);
//   }, [order]);

//   return (
//     <div
//       className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="bg-gray-50 border-b px-6 py-4 flex justify-between items-center">
//           <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
//             <Package className="w-5 h-5 text-blue-600" />
//             Order Details
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-1 rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <div className="p-6 overflow-y-auto max-h-[80vh]">
//           {/* Info Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//             <div className="space-y-3">
//               <div className="flex items-center gap-2 text-sm">
//                 <User className="w-4 h-4 text-gray-400" />
//                 <span className="font-semibold text-gray-700">Buyer:</span>
//                 <span className="text-gray-600">{order.buyerUsername || "Unknown"}</span>
//               </div>
//               <div className="flex items-center gap-2 text-sm">
//                 <Truck className="w-4 h-4 text-gray-400" />
//                 <span className="font-semibold text-gray-700">Status:</span>
//                 <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
//                   isLocked ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
//                 }`}>
//                   {order.Status}
//                 </span>
//               </div>
//               <div className="flex items-center gap-2 text-sm">
//                 <CreditCard className="w-4 h-4 text-gray-400" />
//                 <span className="font-semibold text-gray-700">Total Price:</span>
//                 <span className="text-gray-900 font-bold">${order.total_price}</span>
//               </div>
//             </div>

//             <div className="space-y-3">
//               <div className="flex items-center gap-2 text-sm">
//                 <Calendar className="w-4 h-4 text-gray-400" />
//                 <span className="font-semibold text-gray-700">Created:</span>
//                 <span className="text-gray-600">
//                   {order.Created_Date ? new Date(order.Created_Date).toLocaleDateString() : "—"}
//                 </span>
//               </div>
//               <div className="flex items-center gap-2 text-sm">
//                 <Calendar className="w-4 h-4 text-gray-400" />
//                 <span className="font-semibold text-gray-700">Delivered:</span>
//                 <span className="text-gray-600">
//                   {order.Delivery_Date ? new Date(order.Delivery_Date).toLocaleDateString() : "Pending"}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Products Table */}
//           <h3 className="font-bold text-gray-800 mb-3 border-b pb-2">Items in Order</h3>
//           <div className="space-y-3 mb-8">
//             {order.Product?.length > 0 ? (
//               order.Product.map((item, index) => (
//                 <div key={index} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
//                   <div className="flex flex-col">
//                     <span className="font-medium text-gray-900">{item.name || "Product Name"}</span>
//                     <span className="text-xs text-gray-400">ID: {item._id}</span>
//                   </div>
//                   <div className="text-right">
//                     <span className="text-gray-600">
//                       {order.quantity ? order.quantity[index] : 1} × ${item.price || 0}
//                     </span>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 text-sm py-4 italic">No items found.</p>
//             )}
//           </div>

//           {/* Actions Section */}
//           <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
//             <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
//               <div className="flex-1">
//                 <label className="block text-sm font-bold text-gray-700 mb-2">
//                   Update Order Status
//                 </label>
//                 <select
//                   disabled={isLocked}
//                   value={status}
//                   onChange={(e) => setStatus(e.target.value)}
//                   className={`w-full border rounded-lg p-2.5 text-sm transition-all outline-none ${
//                     isLocked 
//                       ? "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed" 
//                       : "bg-white border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                   }`}
//                 >
//                   <option value="Pending">Pending</option>
//                   <option value="Shipped">Shipped</option>
//                   <option value="Delivered">Delivered</option>
//                 </select>
//                 {isLocked && (
//                   <p className="text-[10px] text-red-500 mt-1 font-medium italic">
//                     * Delivered orders are finalized and cannot be changed.
//                   </p>
//                 )}
//               </div>

//               <div className="flex gap-2">
//                 <button
//                   onClick={() => onEdit(order._id, status)}
//                   disabled={isLocked}
//                   className={`px-4 py-2 rounded-lg text-white text-sm font-semibold transition-all ${
//                     isLocked 
//                       ? "bg-gray-400 cursor-not-allowed" 
//                       : "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 active:scale-95"
//                   }`}
//                 >
//                   {isLocked ? "Order Finalized" : "Save Status"}
//                 </button>
//               </div>
//             </div>

//             <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-2">
//               <button
//                 onClick={() => onAddFlag(order)}
//                 className="flex-1 min-w-[120px] px-3 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors border border-red-100"
//               >
//                 Flag Buyer
//               </button>
//               <button
//                 onClick={() => onRemoveFlag(order)}
//                 className="flex-1 min-w-[120px] px-3 py-2 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors border border-gray-200"
//               >
//                 Clear Flag
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderDetailsModal;
import React, { useState, useEffect } from "react";
import { X, Package, Calendar, CreditCard, User, Truck, AlertCircle, CheckCircle, Clock, MapPin, ShoppingBag, Tag } from "lucide-react";

const OrderDetailsModal = ({
  order,
  onClose,
  onEdit,
  onAddFlag,
  onRemoveFlag,
}) => {
  if (!order) return null;

  const [status, setStatus] = useState("");
  
  const isLocked = order.Status === "Delivered";

  useEffect(() => {
    if (order) setStatus(order.Status);
  }, [order]);

  const getStatusSteps = () => {
    const steps = ['Pending', 'Shipped', 'Delivered'];
    const currentIndex = steps.indexOf(order.Status);
    return steps.map((step, index) => ({
      name: step,
      completed: index <= currentIndex,
      current: index === currentIndex
    }));
  };

  const totalItems = order.Product?.reduce((sum, _, idx) => sum + (order.quantity?.[idx] || 1), 0) || 0;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden relative animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  Order Details
                  <span className="text-sm font-normal bg-white/20 px-3 py-1 rounded-full">
                    #{order._id?.slice(-8).toUpperCase()}
                  </span>
                </h2>
                <p className="text-blue-100 mt-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Placed on {order.Created_Date ? new Date(order.Created_Date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : "—"}
                </p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur-sm transition-all hover:rotate-90"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        <div className="p-8 overflow-y-auto max-h-[80vh]">
          {/* Order Status Timeline */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-600" />
              Order Journey
            </h3>
            <div className="relative">
              <div className="flex justify-between mb-2">
                {getStatusSteps().map((step, index) => (
                  <div key={step.name} className="flex flex-col items-center w-1/3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      step.completed 
                        ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg'
                        : step.current
                        ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {step.name === 'Pending' && <Clock className="w-5 h-5" />}
                      {step.name === 'Shipped' && <Truck className="w-5 h-5" />}
                      {step.name === 'Delivered' && <CheckCircle className="w-5 h-5" />}
                    </div>
                    <span className={`text-sm font-medium ${
                      step.completed || step.current ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </span>
                    {step.current && (
                      <div className="mt-1 px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full">
                        Current
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 -z-10">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 via-blue-500 to-blue-500 transition-all duration-500"
                  style={{ width: `${(getStatusSteps().filter(s => s.completed).length / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Order Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Summary Card */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-blue-600" />
                  Order Summary
                </h3>
                <div className="space-y-4">
                  {order.Product?.length > 0 ? (
                    order.Product.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-100 transition-colors group">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
                            <Tag className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                              {item.name || "Product Name"}
                            </div>
                            <div className="text-xs text-gray-500">SKU: {item._id?.slice(-6) || "N/A"}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">
                            ${(item.price || 0).toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-500">
                            Qty: {order.quantity?.[index] || 1}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <Package className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      No items found in this order
                    </div>
                  )}
                </div>
                
                {/* Totals */}
                <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">
                      ${order.total_price?.toFixed(2) || "0.00"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Items Total</span>
                    <span className="font-medium text-gray-900">{totalItems} items</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <span className="text-lg font-bold text-gray-900">Total Amount</span>
                    <span className="text-2xl font-bold text-gray-900">
                      ${order.total_price?.toFixed(2) || "0.00"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Actions & Info */}
            <div className="space-y-6">
              {/* Buyer Info Card */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Buyer Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                      <span className="text-lg font-bold text-blue-600">
                        {order.buyerUsername?.[0]?.toUpperCase() || "?"}
                      </span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{order.buyerUsername || "Unknown Buyer"}</div>
                      <div className="text-sm text-gray-500">Customer</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-700">Order Date:</span>
                      <span className="text-gray-600">
                        {order.Created_Date ? new Date(order.Created_Date).toLocaleDateString() : "—"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-700">Delivery Date:</span>
                      <span className={`${
                        order.Delivery_Date ? 'text-gray-600' : 'text-yellow-600 font-medium'
                      }`}>
                        {order.Delivery_Date ? new Date(order.Delivery_Date).toLocaleDateString() : "Pending"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Manage Order</h3>
                
                {/* Status Update */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Update Status
                  </label>
                  <select
                    disabled={isLocked}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className={`w-full rounded-xl p-3 font-medium transition-all outline-none appearance-none ${
                      isLocked 
                        ? "bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed" 
                        : "bg-white border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-blue-300"
                    }`}
                  >
                    <option value="Pending">⏳ Pending</option>
                    <option value="Shipped">🚚 Shipped</option>
                    <option value="Delivered">✅ Delivered</option>
                  </select>
                  {isLocked && (
                    <p className="text-xs text-red-500 mt-2 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Delivered orders are finalized and cannot be changed.
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => onEdit(order._id, status)}
                    disabled={isLocked || status === order.Status}
                    className={`w-full py-3 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                      isLocked || status === order.Status
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Save Status Update
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => onAddFlag(order)}
                      className="py-3 bg-gradient-to-r from-red-50 to-rose-50 text-red-600 rounded-xl font-bold hover:from-red-100 hover:to-rose-100 transition-all border border-red-100 hover:border-red-200 flex items-center justify-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4" />
                      Flag Buyer
                    </button>
                    <button
                      onClick={() => onRemoveFlag(order)}
                      className="py-3 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-xl font-bold hover:from-gray-100 hover:to-gray-200 transition-all border border-gray-200 hover:border-gray-300 flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Clear Flag
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;