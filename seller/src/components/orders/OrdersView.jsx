import React, { useState } from "react";
import OrderCard from "./OrderCard";
import OrderDetailsModal from "./orderDetalies";

const OrdersView = ({ orders, setOrders }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleEditOrder = async (orderId, newStatus) => {
    const order = orders.find((o) => o._id === orderId);
    if (!order) return;

    if (order.Status === newStatus) {
      alert(`Order status is already "${newStatus}"`);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5001/seller/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!res.ok) return alert("Failed to update order");

      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, Status: newStatus } : o
        )
      );

      if (selectedOrder?._id === orderId) {
        setSelectedOrder({ ...selectedOrder, Status: newStatus });
      }

      alert("Order status updated successfully");
    } catch {
      alert("Failed to update order");
    }
  };

  const handleAddFlag = async (order) => {
    const reason = prompt("Enter reason for flagging this buyer:");
    if (!reason) return;

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5001/seller/flag-buyer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ orderId: order._id, reason }),
    });

    if (!res.ok) return alert("Failed to add flag");

    alert("Buyer flagged successfully");
  };

  // Remove Flag
  const handleRemoveFlag = async (order) => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5001/seller/remove-flag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ orderId: order._id }),
    });

    if (!res.ok) return alert("Failed to remove flag");

    alert("Flag removed successfully");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Orders</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            onClick={setSelectedOrder}
          />
        ))}
      </div>

      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onEdit={handleEditOrder}
        onAddFlag={handleAddFlag}
        onRemoveFlag={handleRemoveFlag} 
      />
    </div>
  );
};

export default OrdersView;