import React, { useState } from 'react';
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import DashboardView from './components/dashboard/DashboardView';
import OrdersView from './components/orders/OrdersView';
import CategoriesView from './components/categories/CategoriesView';
import FlaggedView from './components/flagged/FlaggedView';
import ProductDetailPage from './components/categories/catalogView'; 

const DUMMY_PRODUCTS_DATA = [
    { 
        id: 'prod_501', 
        name: "Luxury Smartwatch X1", 
        description: "Premium smartwatch with health tracking and 5-day battery life. Aluminum casing with sapphire glass.", 
        price: 399.99, 
        quantity: 100, 
        category: 'Electronics', 
        sum_rating: 45, 
        number_rating: 10, 
        estimated_DT: '2025-12-10', 
        deliveryTime: "3 days", 
        stock: 100, 
        serviceArea: ["US", "CA", "EU"] 
    },
    { 
        id: 'prod_101', 
        name: "Speaker Set Alpha", 
        description: "Powerful bookshelf speakers with deep bass. Bluetooth 5.0 connectivity.", 
        price: 199.50, 
        quantity: 50, 
        category: 'Electronics', 
        sum_rating: 15, 
        number_rating: 5, 
        estimated_DT: '2025-12-05', 
        deliveryTime: "2 days", 
        stock: 50, 
        serviceArea: ["US", "CA"] 
    },
    { 
        id: 'prod_102', 
        name: "Noise-Cancelling Headphones", 
        description: "Over-ear headphones providing superior audio quality and comfort.", 
        price: 89.99, 
        quantity: 30, 
        category: 'Electronics', 
        sum_rating: 10, 
        number_rating: 3, 
        estimated_DT: '2025-12-06', 
        deliveryTime: "3 days", 
        stock: 30, 
        serviceArea: ["US"] 
    },
        { 
        id: 'prod_501', 
        name: "ssss Smartwatch X1", 
        description: "Premium smartwatch with health tracking and 5-day battery life. Aluminum casing with sapphire glass.", 
        price: 399.99, 
        quantity: 100, 
        category: 'Electronics', 
        sum_rating: 45, 
        number_rating: 10, 
        estimated_DT: '2025-12-10', 
        deliveryTime: "3 days", 
        stock: 100, 
        serviceArea: ["US", "CA", "EU"] 
    },
    { 
        id: 'prod_101', 
        name: "dddd Set Alpha", 
        description: "Powerful bookshelf speakers with deep bass. Bluetooth 5.0 connectivity.", 
        price: 199.50, 
        quantity: 50, 
        category: 'Electronics', 
        sum_rating: 15, 
        number_rating: 5, 
        estimated_DT: '2025-12-05', 
        deliveryTime: "2 days", 
        stock: 50, 
        serviceArea: ["US", "CA"] 
    },
    { 
        id: 'prod_102', 
        name: "Noise-Cancelling Headphones", 
        description: "Over-ear headphones providing superior audio quality and comfort.", 
        price: 89.99, 
        quantity: 30, 
        category: 'Electronics', 
        sum_rating: 10, 
        number_rating: 3, 
        estimated_DT: '2025-12-06', 
        deliveryTime: "3 days", 
        stock: 30, 
        serviceArea: ["US"] 
    },
    { 
        id: 'prod_201', 
        name: "Organic Cotton T-Shirt", 
        description: "Soft, breathable, and sustainably sourced organic cotton shirt.", 
        price: 29.00, 
        quantity: 400, 
        category: 'Apparel', 
        sum_rating: 40, 
        number_rating: 10, 
        estimated_DT: '2025-12-01', 
        deliveryTime: "1 day", 
        stock: 400, 
        serviceArea: ["EU"] 
    },
    { 
        id: 'prod_202', 
        name: "Fleece-Lined Running Jacket", 
        description: "Weather-resistant jacket perfect for cold-weather outdoor activities.", 
        price: 75.99, 
        quantity: 200, 
        category: 'Apparel', 
        sum_rating: 20, 
        number_rating: 5, 
        estimated_DT: '2025-12-04', 
        deliveryTime: "4 days", 
        stock: 200, 
        serviceArea: ["EU", "UK"] 
    },
    { 
        id: 'prod_301', 
        name: "Bamboo Cutting Board", 
        description: "Large, durable, and naturally antibacterial bamboo cutting surface.", 
        price: 45.00, 
        quantity: 60, 
        category: 'Home Goods', 
        sum_rating: 60, 
        number_rating: 15, 
        estimated_DT: '2025-12-02', 
        deliveryTime: "2 days", 
        stock: 60, 
        serviceArea: ["US", "MX"] 
    },
    { 
        id: 'prod_302', 
        name: "Aroma Diffuser", 
        description: "Ultrasonic diffuser with LED lighting and automatic shut-off.", 
        price: 35.00, 
        quantity: 10, 
        category: 'Home Goods', 
        sum_rating: 14, 
        number_rating: 4, 
        estimated_DT: '2025-12-07', 
        deliveryTime: "5 days", 
        stock: 10, 
        serviceArea: ["MX"] 
    }
];

const App = () => {
    const [currentView, setCurrentView] = useState('dashboard');
    const [selectedProductId, setSelectedProductId] = useState(null);   
    const [orders, setOrders] = useState([]);
    const [flaggedBuyers, setFlaggedBuyers] = useState([]);

    const handleViewChange = (newView) => {
        if (newView !== 'productDetail') {
            setSelectedProductId(null);
        }
        setCurrentView(newView);
    };

    const viewProductDetail = (productId) => {
        setSelectedProductId(productId);
        setCurrentView('productDetail');
    };

    const updateOrderStatus = (orderId, newStatus) => {
        const updatedOrders = orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus, lastUpdated: new Date().toISOString() } : order
        );
        setOrders(updatedOrders);
    };

    const flagBuyer = (buyerEmail, reason) => {
        const flag = {
            id: Date.now().toString(),
            buyerEmail,
            reason,
            date: new Date().toISOString()
        };
        const updatedFlags = [...flaggedBuyers, flag];
        setFlaggedBuyers(updatedFlags);
    };

    const renderView = () => {
        switch (currentView) {
            case 'dashboard':
                return <DashboardView orders={orders}/>;
            case 'orders':
                return <OrdersView orders={orders} updateOrderStatus={updateOrderStatus} flagBuyer={flagBuyer}/>;
            case 'categories':
                return <CategoriesView  
                            viewProductDetail={viewProductDetail} 
                            products={DUMMY_PRODUCTS_DATA} 
                        />;
            case 'flagged':
                return <FlaggedView flaggedBuyers={flaggedBuyers} />;
                
            case 'productDetail':
                return (
                    <ProductDetailPage 
                        productId={selectedProductId} 
                        products={DUMMY_PRODUCTS_DATA}
                        onBack={() => handleViewChange('categories')}
                    />
                );
                
            default:
                return <DashboardView orders={orders} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <Navigation currentView={currentView} setCurrentView={handleViewChange} /> 
            <main className="max-w-7xl mx-auto px-4 py-8">
                {renderView()}
            </main>
        </div>
    );
};

export default App;