import React, { useState } from "react";
import OrderCard from "./OrderCard";
import OrderDetailsModal from "./orderDetalies";
import { Search, Filter, Download, ShoppingBag, DollarSign, Clock, CheckCircle } from "lucide-react";

const OrdersView = ({ orders, setOrders, currentSellerId }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const handleExportOrders = () => {
    if (filteredOrders.length === 0) {
      alert("No orders to export!");
      return;
    }

    const headers = [
      'Order ID',
      'Buyer Username', 
      'Status',
      'Total Price ($)',
      'Items Count',
      'Order Date',
      'Delivery Date',
      'Buyer Notes'
    ];

    const csvData = filteredOrders.map(order => {
      const orderDate = order.Created_Date 
        ? new Date(order.Created_Date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })
        : 'N/A';
      
      const deliveryDate = order.Delivery_Date 
        ? new Date(order.Delivery_Date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })
        : 'Pending';

      return [
        order._id?.slice(-8).toUpperCase() || 'N/A',
        order.buyerUsername || 'Unknown',
        order.Status || 'Pending',
        order.total_price?.toFixed(2) || '0.00',
        order.Product?.length || 0,
        orderDate,
        deliveryDate,
        `"${order.buyerUsername || 'Customer'}'s Order"`
      ];
    });

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    const timestamp = new Date().toISOString().split('T')[0];
    
    a.href = url;
    a.download = `orders_export_${timestamp}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    alert(`✅ Successfully exported ${filteredOrders.length} orders!\nFile: orders_export_${timestamp}.csv`);
  };

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

    if (!res.ok) return alert("Failed to add flag, most probably already flagged");

    alert("Buyer flagged successfully");
  };

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

  // Filter and search logic
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      (order.buyerUsername?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (order._id?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (order.Status?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.Status === statusFilter;
    
    const matchesDate = dateFilter === "all" || 
                       (dateFilter === "today" && 
                        order.Created_Date && 
                        new Date(order.Created_Date).toDateString() === new Date().toDateString()) ||
                       (dateFilter === "week" && 
                        order.Created_Date &&
                        (new Date() - new Date(order.Created_Date)) < 7 * 24 * 60 * 60 * 1000);
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Calculate stats
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total_price || 0), 0);
  const pendingOrders = orders.filter(o => o.Status === 'Pending').length;
  const deliveredOrders = orders.filter(o => o.Status === 'Delivered').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Order Management</h1>
            <p className="text-gray-600">Manage and track all customer orders in one place</p>
          </div>
          
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <div className="bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              {filteredOrders.length} orders
            </div>
            <button
              onClick={handleExportOrders}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={filteredOrders.length === 0}
              title={filteredOrders.length === 0 ? "No orders to export" : "Export to CSV"}
            >
              <Download className="w-5 h-5" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">${totalRevenue.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{orders.length}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <ShoppingBag className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Pending Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{pendingOrders}</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-xl">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                placeholder="Search orders by ID, buyer, or status..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div className="flex gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="w-5 h-5 text-gray-400" />
                </div>
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none transition"
                >
                  <option value="all">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              <select
                value={dateFilter}
                onChange={e => setDateFilter(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500 flex items-center gap-4">
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded-full"></div>
              <span>Pending: {pendingOrders}</span>
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded-full"></div>
              <span>Shipped: {orders.filter(o => o.Status === 'Shipped').length}</span>
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-100 border border-green-300 rounded-full"></div>
              <span>Delivered: {deliveredOrders}</span>
            </span>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : 
        
        /* Orders Grid */
        filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <div className="max-w-md mx-auto">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {searchTerm || statusFilter !== 'all' || dateFilter !== 'all'
                  ? 'No matching orders found'
                  : orders.length === 0 
                  ? 'No orders yet'
                  : 'No orders match your criteria'}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || statusFilter !== 'all' || dateFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'Orders will appear here when customers place them'}
              </p>
              {(searchTerm || statusFilter !== 'all' || dateFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                    setDateFilter('all');
                  }}
                  className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-600">
                Showing <span className="font-bold">{filteredOrders.length}</span> of <span className="font-bold">{orders.length}</span> orders
              </p>
              <p className="text-sm text-gray-500">
                Click any order to view details
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOrders.map((order) => (
                <OrderCard
                  key={order._id}
                  order={order}
                  onClick={setSelectedOrder}
                />
              ))}
            </div>
          </>
        )}

        {/* Order Details Modal */}
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onEdit={handleEditOrder}
          onAddFlag={handleAddFlag}
          onRemoveFlag={handleRemoveFlag} 
        />
      </div>
    </div>
  );
};

export default OrdersView;