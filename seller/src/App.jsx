import React, { useState, useEffect } from "react";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Navigation";
import DashboardView from "./components/dashboard/DashboardView";
import ProductsView from "./components/products/ProductsView";
import OrdersView from "./components/orders/OrdersView";
import FlaggedView from "./components/flagged/FlaggedView";
import AuthPage from "./components/dashboard/login_seller";
import ProfilePage from "./components/dashboard/ProfilePage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasAuthChecked, setHasAuthChecked] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [flaggedBuyers, setFlaggedBuyers] = useState([]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentSellerId, setCurrentSellerId] = useState(null);

  const API = "http://localhost:5000";

  // ================= PRODUCTS =================
  const fetchProducts = async (token) => {
    const res = await fetch(`${API}/seller/products`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setProducts(data);
    setCategories([...new Set(data.map((p) => p.category))]);
  };

  // ================= ORDERS =================
  const fetchOrders = async (token) => {
    const res = await fetch(`${API}/seller/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setOrders(data);
  };

  // ================= FLAGGED BUYERS =================
  const fetchFlaggedBuyers = async (token) => {
    const res = await fetch(`${API}/seller/flags`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setFlaggedBuyers(data);
  };

  // ================= AUTH CHECK =================
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setHasAuthChecked(true);
      return;
    }

    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      setCurrentSellerId(decoded.sellerId);

      Promise.all([
        fetchProducts(token),
        fetchOrders(token),
        fetchFlaggedBuyers(token),
      ]).finally(() => setHasAuthChecked(true));

      setIsLoggedIn(true);
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setHasAuthChecked(true);
    }
  }, []);

  if (!hasAuthChecked) return <div>Loading...</div>;

  if (!isLoggedIn) {
    return (
      <AuthPage
        setIsLoggedIn={(loggedIn) => {
          setIsLoggedIn(loggedIn);
          if (loggedIn) {
            const token = localStorage.getItem("token");
            fetchProducts(token);
            fetchOrders(token);
            fetchFlaggedBuyers(token);
          }
        }}
      />
    );
  }

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <DashboardView
            products={products}
            orders={orders}
            categories={categories}
          />
        );

      case "products":
        return (
          <ProductsView
            products={products}
            categories={categories}
          />
        );

      case "orders":
        return (
          <OrdersView
            orders={orders}
            setOrders={setOrders}
            currentSellerId={currentSellerId}
          />
        );

      case "flagged":
        return <FlaggedView flaggedBuyers={flaggedBuyers} />;

      case "profile":
        return <ProfilePage setIsLoggedIn={setIsLoggedIn} />;

      default:
        return (
          <DashboardView
            products={products}
            orders={orders}
            categories={categories}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header setIsOpen={setIsSidebarOpen} />

      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      <div className="pt-20 lg:ml-64 min-h-screen">
        <main className="max-w-7xl mx-auto p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
