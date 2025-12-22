// import React, { useState, useEffect } from "react";
// import Header from "./components/layout/Header";
// import Sidebar from "./components/layout/Navigation";
// import DashboardView from "./components/dashboard/DashboardView";
// import ProductsView from "./components/products/ProductsView";
// import OrdersView from "./components/orders/OrdersView";
// import FlaggedView from "./components/flagged/FlaggedView";
// import AuthPage from "./components/dashboard/login_seller";
// import ProfilePage from "./components/dashboard/ProfilePage";
// import "./App.css";
// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [hasAuthChecked, setHasAuthChecked] = useState(false);
//   const [currentView, setCurrentView] = useState("dashboard");

//   const [products, setProducts] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [flaggedBuyers, setFlaggedBuyers] = useState([]);

//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [currentSellerId, setCurrentSellerId] = useState(null);

//   const API = "http://localhost:5001";

//   // ================= PRODUCTS =================
//   const fetchProducts = async (token) => {
//     const res = await fetch(`${API}/seller/products`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     if (!res.ok) {
//       if (res.status === 401) {
//         localStorage.removeItem("token");
//         setIsLoggedIn(false);
//       }
//       setProducts([]);
//       setCategories([]);
//       return;
//     }

//     const data = await res.json();

//     if (!Array.isArray(data)) {
//       setProducts([]);
//       setCategories([]);
//       return;
//     }

//     setProducts(data);
//     setCategories([...new Set(data.map((p) => p.category))]);
//   };

//   // ================= ORDERS =================
//   const fetchOrders = async (token) => {
//     if (!token) {
//       console.error("No token provided");
//       return;
//     }

//     const res = await fetch(`${API}/seller/orders`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!res.ok) {
//       if (res.status === 401) {
//         console.error("Unauthorized: Token missing or invalid");
//         localStorage.removeItem("token");
//         setIsLoggedIn(false);
//       }
//       setOrders([]);
//       return;
//     }

//     const data = await res.json();
//     setOrders(Array.isArray(data) ? data : []);
//   };


//   // ================= FLAGGED BUYERS =================
//   const fetchFlaggedBuyers = async (token) => {
//     const res = await fetch(`${API}/seller/flags`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     if (!res.ok) {
//       if (res.status === 401) {
//         localStorage.removeItem("token");
//         setIsLoggedIn(false);
//       }
//       setFlaggedBuyers([]);
//       return;
//     }

//     const data = await res.json();
//     setFlaggedBuyers(Array.isArray(data) ? data : []);
//   };

//   // ================= AUTH CHECK =================
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       setIsLoggedIn(false);
//       setHasAuthChecked(true);
//       return;
//     }

//     try {
//       const decoded = JSON.parse(atob(token.split(".")[1]));
//       setCurrentSellerId(decoded.sellerId);

//       Promise.all([
//         fetchProducts(token),
//         fetchOrders(token),
//         fetchFlaggedBuyers(token),
//       ]).finally(() => setHasAuthChecked(true));

//       setIsLoggedIn(true);
//     } catch (err) {
//       localStorage.removeItem("token");
//       setIsLoggedIn(false);
//       setHasAuthChecked(true);
//     }
//   }, []);

//   if (!hasAuthChecked) return <div>Loading...</div>;

//   if (!isLoggedIn) {
//     return (
//       <AuthPage
//         setIsLoggedIn={(loggedIn) => {
//           setIsLoggedIn(loggedIn);
//           if (loggedIn) {
//             const token = localStorage.getItem("token");
//             fetchProducts(token);
//             fetchOrders(token);
//             fetchFlaggedBuyers(token);
//           }
//         }}
//       />
//     );
//   }

//   const renderView = () => {
//     switch (currentView) {
//       case "dashboard":
//         return (
//           <DashboardView
//             products={products}
//             orders={orders}
//             categories={categories}
//           />
//         );

//       case "products":
//         return (
//           <ProductsView
//             products={products}
//             categories={categories}
//           />
//         );

//       case "orders":
//         return (
//           <OrdersView
//             orders={orders}
//             setOrders={setOrders}
//             currentSellerId={currentSellerId}
//           />
//         );

//       case "flagged":
//         return <FlaggedView flaggedBuyers={flaggedBuyers} />;

//       case "profile":
//         return <ProfilePage setIsLoggedIn={setIsLoggedIn} />;

//       default:
//         return (
//           <DashboardView
//             products={products}
//             orders={orders}
//             categories={categories}
//           />
//         );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header setIsOpen={setIsSidebarOpen} />

//       <Sidebar
//         isOpen={isSidebarOpen}
//         setIsOpen={setIsSidebarOpen}
//         currentView={currentView}
//         setCurrentView={setCurrentView}
//       />

//       <div className="pt-20 lg:ml-64 min-h-screen">
//         <main className="max-w-7xl mx-auto p-6">
//           {renderView()}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default App;
import React, { useState, useEffect } from "react";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Navigation";
import DashboardView from "./components/dashboard/DashboardView";
import ProductsView from "./components/products/ProductsView";
import OrdersView from "./components/orders/OrdersView";
import FlaggedView from "./components/flagged/FlaggedView";
import AuthPage from "./components/dashboard/login_seller";
import ProfilePage from "./components/dashboard/ProfilePage";
import "./App.css";

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

  const API = "http://localhost:5001";

  // ================= PRODUCTS =================
  const fetchProducts = async (token) => {
    const res = await fetch(`${API}/seller/products`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
      setProducts([]);
      setCategories([]);
      return;
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      setProducts([]);
      setCategories([]);
      return;
    }

    setProducts(data);
    setCategories([...new Set(data.map((p) => p.category))]);
  };

  // ================= ORDERS =================
  const fetchOrders = async (token) => {
    if (!token) {
      console.error("No token provided");
      return;
    }

    const res = await fetch(`${API}/seller/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      if (res.status === 401) {
        console.error("Unauthorized: Token missing or invalid");
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
      setOrders([]);
      return;
    }

    const data = await res.json();
    setOrders(Array.isArray(data) ? data : []);
  };

  // ================= FLAGGED BUYERS =================
  const fetchFlaggedBuyers = async (token) => {
    const res = await fetch(`${API}/seller/flags`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
      setFlaggedBuyers([]);
      return;
    }

    const data = await res.json();
    setFlaggedBuyers(Array.isArray(data) ? data : []);
  };

  // ================= AUTH CHECK =================
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoggedIn(false);
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
      <Header setIsOpen={setIsSidebarOpen}
      
       setCurrentView={setCurrentView}  // This prop is required!

       />

      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      <div className="pt-20 lg:ml-64 min-h-screen">
        <main className="w-full p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;