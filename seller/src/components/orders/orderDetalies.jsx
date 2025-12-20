import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const OrderDetailsModal = ({
  order,
  onClose,
  onEdit,
  onAddFlag,
  onRemoveFlag, 
}) => {
  if (!order) return null;

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (order) setStatus(order.Status);
  }, [order]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold mb-4">Order Details</h2>

        {/* Order info */}
        <div className="space-y-2 mb-4">
          <p><b>Buyer:</b> {order.buyerUsername || "Unknown Buyer"}</p>
          <p><b>Status:</b> {order.Status}</p>
          <p><b>Payment Method:</b> {order.payment_method}</p>
          <p><b>Total Price:</b> ${order.total_price}</p>
          <p>
            <b>Delivery Date:</b>{" "}
            {order.Delivery_Date
              ? new Date(order.Delivery_Date).toLocaleDateString()
              : "Not set"}
          </p>
          <p>
            <b>Created Date:</b>{" "}
            {order.Created_Date
              ? new Date(order.Created_Date).toLocaleDateString()
              : "—"}
          </p>
        </div>

        {/* Products */}
        <h3 className="font-semibold text-lg mb-2">Products</h3>
        <div className="space-y-3">
          {order.Cart?.length > 0 ? (
            order.Cart.map((item, index) => (
              <div key={index} className="flex justify-between border-b pb-2">
                <span>{item.name}</span>
                <span>{item.quantity} × ${item.price}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No products in this order</p>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3 items-center">
          <div className="mb-4">
            <label className="block font-semibold mb-1">Order Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-md p-2"
            >
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <button
            onClick={() => onEdit(order._id, status)}
            className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md shadow-md hover:from-blue-600 hover:to-blue-700 transition-all text-sm font-medium"
          >
            Save Status
          </button>

          <button
            onClick={() => onAddFlag(order)}
            className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md shadow-md hover:from-red-600 hover:to-red-700 transition-all text-sm font-medium"
          >
            Add Flag
          </button>

          {/* سRemove Flag */}
          <button
            onClick={() => onRemoveFlag(order)}
            className="px-3 py-1.5 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-md shadow-md hover:from-gray-700 hover:to-gray-800 transition-all text-sm font-medium"
          >
            Remove Flag
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;