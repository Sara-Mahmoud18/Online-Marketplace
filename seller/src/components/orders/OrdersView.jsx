// import React from 'react';
// import OrderCard from './OrderCard';
// import { Package } from 'lucide-react';

// const OrdersView = ({ orders, updateOrderStatus, flagBuyer, addDemoOrder }) => {
//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
//         <button
//           onClick={addDemoOrder}
//           className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
//         >
//           + Add Demo Order
//         </button>
//       </div>
//       {orders.length === 0 ? (
//         <div className="bg-white rounded-lg shadow p-12 text-center">
//           <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//           <p className="text-gray-500 text-lg">No orders received yet</p>
//           <p className="text-gray-400 text-sm mt-2">Click "Add Demo Order" to test</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {orders.map(order => (
//             <OrderCard
//               key={order.id}
//               order={order}
//               updateOrderStatus={updateOrderStatus}
//               flagBuyer={flagBuyer}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrdersView;

import React, { useState } from 'react';
import OrderCard from './OrderCard';
import DemoOrderForm from './DemoOrderForm';
import { Package } from 'lucide-react';

const OrdersView = ({
  orders,
  updateOrderStatus,
  flagBuyer,
  products,
  createDemoOrder
}) => {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>

        <button
          onClick={() => setShowDemoModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium shadow-md"
        >
          + Create Order
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No orders received yet</p>
          <p className="text-gray-400 text-sm mt-2">
            Click the button above to create order manually
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              updateOrderStatus={updateOrderStatus}
              flagBuyer={flagBuyer}
            />
          ))}
        </div>
      )}

      
      {showDemoModal && (
        <DemoOrderForm
          products={products}
          onSubmit={createDemoOrder}
          onClose={() => setShowDemoModal(false)}
        />
      )}
    </div>
  );
};

export default OrdersView;