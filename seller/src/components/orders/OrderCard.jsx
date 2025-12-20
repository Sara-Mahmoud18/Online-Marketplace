import React from "react";

const OrderCard = ({ order, onClick }) => {
  return (
    <div
      onClick={() => onClick(order)}
      className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">
          Order #{order._id?.slice(-6)}
        </h3>
        <span className="text-sm text-gray-500">
          {order.Created_Date
            ? new Date(order.Created_Date).toLocaleDateString()
            : "—"}
        </span>
      </div>

      <p className="text-gray-600 mt-2">
        Status: <span className="font-medium">{order.Status}</span>
      </p>

      <p className="text-gray-600">
        Total:{" "}
        <span className="font-medium">
          ${order.total_price ?? 0}
        </span>
      </p>
    </div>
  );
};

export default OrderCard;
