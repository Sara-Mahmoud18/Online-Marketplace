import React from "react";

const RecentOrders = ({ orders }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Recent Orders
        </h3>
      </div>

      {!orders || orders.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No orders yet
        </p>
      ) : (
        <div className="space-y-3">
          {orders.slice(0, 5).map((order, index) => {
            const orderId =
              order._id || order.id || `order-${index}`;

            return (
              <div
                key={orderId}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    Order #
                    {orderId
                      ? orderId.toString().slice(-6)
                      : "N/A"}
                  </p>

                  <p className="text-sm text-gray-600">
                    Buyer: {order.buyerUsername ?? order.B_ID ?? "Unknown"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {order.createdDate
                      ? new Date(order.createdDate).toLocaleDateString()
                      : ""}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.Status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : order.Status === "Shipped"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.Status || "Pending"}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentOrders;
