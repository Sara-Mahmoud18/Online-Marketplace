import React, { useState } from 'react';
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import DashboardView from './components/dashboard/DashboardView';
import OrdersView from './components/orders/OrdersView';
import CategoriesView from './components/categories/CategoriesView';
import FlaggedView from './components/flagged/FlaggedView';
import { loadFromStorage, saveToStorage } from './utils/storage';

const App = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [flaggedBuyers, setFlaggedBuyers] = useState([]);

  const addCategory = async (categoryName) => {
    if (categoryName && !categories.includes(categoryName)) {
      const updatedCategories = [...categories, categoryName];
      setCategories(updatedCategories);
      await saveToStorage('seller_categories', updatedCategories);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus, lastUpdated: new Date().toISOString() } : order
    );
    setOrders(updatedOrders);
    await saveToStorage('seller_orders', updatedOrders);
  };

  const flagBuyer = async (buyerEmail, reason) => {
    const flag = {
      id: Date.now().toString(),
      buyerEmail,
      reason,
      date: new Date().toISOString()
    };
    const updatedFlags = [...flaggedBuyers, flag];
    setFlaggedBuyers(updatedFlags);
    await saveToStorage('seller_flagged', updatedFlags);
  };

  const addDemoOrder = async () => {
    const demoOrder = {
      id: Date.now().toString(),
      buyerEmail: `buyer${Math.floor(Math.random() * 1000)}@example.com`,
      status: 'pending',
      date: new Date().toISOString(),
      items: products.length > 0 ? [products[0].name] : ['Sample Product'],
      total: products.length > 0 ? products[0].price : '50.00'
    };
    const updatedOrders = [...orders, demoOrder];
    setOrders(updatedOrders);
    await saveToStorage('seller_orders', updatedOrders);
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView orders={orders} categories={categories} addDemoOrder={addDemoOrder} />;
      case 'orders':
        return <OrdersView orders={orders} updateOrderStatus={updateOrderStatus} flagBuyer={flagBuyer} addDemoOrder={addDemoOrder} />;
      case 'categories':
        return <CategoriesView categories={categories} addCategory={addCategory} />;
      case 'flagged':
        return <FlaggedView flaggedBuyers={flaggedBuyers} />;
      default:
        return <DashboardView  orders={orders} categories={categories} addDemoOrder={addDemoOrder} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderView()}
      </main>
    </div>
  );
};

export default App;