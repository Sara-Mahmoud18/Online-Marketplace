
// import React, { useState, useEffect } from 'react';
// import Header from './components/layout/Header';
// import Sidebar from './components/layout/Navigation';   // ← this is the modern sidebar with icons (the one you have)
// import DashboardView from './components/dashboard/DashboardView';
// import ProductsView from './components/products/ProductsView';
// import OrdersView from './components/orders/OrdersView';
// // import CategoriesView from './components/categories/CategoriesView';
// import FlaggedView from './components/flagged/FlaggedView';
// import { loadFromStorage, saveToStorage } from './utils/storage';

// const App = () => {
//   const [currentView, setCurrentView] = useState('dashboard');
//   const [products, setProducts] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [flaggedBuyers, setFlaggedBuyers] = useState([]);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     const productsData = await loadFromStorage('seller_products');
//     const ordersData = await loadFromStorage('seller_orders');
//     const categoriesData = await loadFromStorage('seller_categories');
//     const flaggedData = await loadFromStorage('seller_flagged');

//     if (productsData) setProducts(productsData);
//     if (ordersData) setOrders(ordersData);
//     if (categoriesData) setCategories(categoriesData);
//     if (flaggedData) setFlaggedBuyers(flaggedData);
//   };

//   const addProduct = async (product) => {
//     const newProduct = { ...product, id: Date.now().toString(), createdAt: new Date().toISOString() };
//     const updatedProducts = [...products, newProduct];
//     setProducts(updatedProducts);
//     await saveToStorage('seller_products', updatedProducts);
//   };

//   const deleteProduct = async (productId) => {
//     const updatedProducts = products.filter(p => p.id !== productId);
//     setProducts(updatedProducts);
//     await saveToStorage('seller_products', updatedProducts);
//   };

//   const addCategory = async (categoryName) => {
//     if (categoryName && !categories.includes(categoryName)) {
//       const updatedCategories = [...categories, categoryName];
//       setCategories(updatedCategories);
//       await saveToStorage('seller_categories', updatedCategories);
//     }
//   };

//   const updateOrderStatus = async (orderId, newStatus) => {
//     const updatedOrders = orders.map(order =>
//       order.id === orderId ? { ...order, status: newStatus, lastUpdated: new Date().toISOString() } : order
//     );
//     setOrders(updatedOrders);
//     await saveToStorage('seller_orders', updatedOrders);
//   };

//   const flagBuyer = async (buyerEmail, reason) => {
//     const flag = {
//       id: Date.now().toString(),
//       buyerEmail,
//       reason,
//       date: new Date().toISOString()
//     };
//     const updatedFlags = [...flaggedBuyers, flag];
//     setFlaggedBuyers(updatedFlags);
//     await saveToStorage('seller_flagged', updatedFlags);
//   };

//   const createDemoOrder = async (orderData) => {
//     const demoOrder = {
//       id: Date.now().toString(),
//       buyerEmail: orderData.buyerEmail,
//       status: "pending",
//       date: new Date().toISOString(),
//       items: orderData.items,
//       total: orderData.total,
//     };

//     const updatedOrders = [...orders, demoOrder];
//     setOrders(updatedOrders);
//     await saveToStorage('seller_orders', updatedOrders);
//   };

//   const renderView = () => {
//     switch (currentView) {
//       case 'dashboard':
//         return <DashboardView products={products} orders={orders} categories={categories} />;
//       case 'products':
//         return <ProductsView products={products} categories={categories} addProduct={addProduct} deleteProduct={deleteProduct}  addCategory={addCategory}/>;
//       case 'orders':
//         return (
//           <OrdersView
//             orders={orders}
//             updateOrderStatus={updateOrderStatus}
//             flagBuyer={flagBuyer}
//             products={products}
//             createDemoOrder={createDemoOrder}
//           />
//         );
//       // case 'categories':
//       //   return <CategoriesView categories={categories} products={products} addCategory={addCategory} />;
//       case 'flagged':
//         return <FlaggedView flaggedBuyers={flaggedBuyers} />;
//       default:
//         return <DashboardView products={products} orders={orders} categories={categories} />;
//     }
//   };

//   // return (
//   //   <div className="min-h-screen bg-gray-50">
//   //     <Header />
//   //     <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

//   //     {/* This div shifts everything to the right so it's not hidden under the fixed sidebar */}
//   //     <div className="lg:ml-60">
//   //       <main className="max-w-7xl mx-auto px-6 pt-8 pb-24">
//   //         {renderView()}
//   //       </main>
//   //     </div>
//   //   </div>
//   // );
// return (
//     <div className="min-h-screen bg-gray-50">
//       {/* 1. Header needs to have z-index higher than content, but compatible with Sidebar */}
//       <div className="fixed top-0 left-0 w-full z-50">
//         <Header setIsOpen={setIsSidebarOpen} />
//       </div>

//       {/* 2. Sidebar needs to handle its own positioning. 
//              If you want the sidebar BELOW the header, we add 'pt-16' or 'top-16' inside the Sidebar component. 
//              For now, we pass the logic here if possible, or see Step 2 below. */}
//       <Sidebar
//         isOpen={isSidebarOpen}
//         setIsOpen={setIsSidebarOpen}
//         currentView={currentView}
//         setCurrentView={setCurrentView}
//       />

//       {/* 3. Main Content Fix */}
//       {/* Added 'pt-16' (padding top) to push content down below the fixed header */}
//       <div className="pt-20 lg:ml-64 min-h-screen bg-gray-50">
//         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           {renderView()}
//         </main>
//       </div>
//     </div>
//   );
// };


// export default App;
import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Navigation';
import DashboardView from './components/dashboard/DashboardView';
import ProductsView from './components/products/ProductsView';
import OrdersView from './components/orders/OrdersView';
import FlaggedView from './components/flagged/FlaggedView';
import { loadFromStorage, saveToStorage } from './utils/storage';

const App = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [flaggedBuyers, setFlaggedBuyers] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const productsData = await loadFromStorage('seller_products');
    const ordersData = await loadFromStorage('seller_orders');
    const categoriesData = await loadFromStorage('seller_categories');
    const flaggedData = await loadFromStorage('seller_flagged');

    if (productsData) setProducts(productsData);
    if (ordersData) setOrders(ordersData);
    if (categoriesData) setCategories(categoriesData);
    if (flaggedData) setFlaggedBuyers(flaggedData);
  };

  const addProduct = async (product) => {
    const newProduct = { ...product, id: Date.now().toString(), createdAt: new Date().toISOString() };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    await saveToStorage('seller_products', updatedProducts);
  };

  // === NEW UPDATE FUNCTION ===
  const updateProduct = async (updatedProductData) => {
    const updatedList = products.map(p => 
      p.id === updatedProductData.id 
        ? { ...p, ...updatedProductData, lastUpdated: new Date().toISOString() } 
        : p
    );
    setProducts(updatedList);
    await saveToStorage('seller_products', updatedList);
  };
  // ===========================

  const deleteProduct = async (productId) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    setProducts(updatedProducts);
    await saveToStorage('seller_products', updatedProducts);
  };

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

  const createDemoOrder = async (orderData) => {
    const demoOrder = {
      id: Date.now().toString(),
      buyerEmail: orderData.buyerEmail,
      status: "pending",
      date: new Date().toISOString(),
      items: orderData.items,
      total: orderData.total,
    };

    const updatedOrders = [...orders, demoOrder];
    setOrders(updatedOrders);
    await saveToStorage('seller_orders', updatedOrders);
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView products={products} orders={orders} categories={categories} />;
      
      case 'products':
        return (
          <ProductsView 
            products={products} 
            categories={categories} 
            addProduct={addProduct} 
            deleteProduct={deleteProduct} 
            addCategory={addCategory}
            updateProduct={updateProduct} // <--- PASSED HERE
          />
        );
        
      case 'orders':
        return (
          <OrdersView
            orders={orders}
            updateOrderStatus={updateOrderStatus}
            flagBuyer={flagBuyer}
            products={products}
            createDemoOrder={createDemoOrder}
          />
        );
        
      case 'flagged':
        return <FlaggedView flaggedBuyers={flaggedBuyers} />;
        
      default:
        return <DashboardView products={products} orders={orders} categories={categories} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Header fixed at top with high z-index */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Header setIsOpen={setIsSidebarOpen} />
      </div>
      
      {/* 2. Sidebar handles its own padding/positioning internally */}
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {/* 3. Main Content: Pushed down by 5rem (pt-20) and pushed right by 16rem (ml-64) on large screens */}
      <div className="pt-20 lg:ml-64 min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;