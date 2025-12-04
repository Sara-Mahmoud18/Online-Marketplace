import React, { useState } from 'react';
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import DashboardView from './components/dashboard/DashboardView';
import OrdersView from './components/orders/OrdersView';
import CategoriesView from './components/categories/CategoriesView';
import FlaggedView from './components/flagged/FlaggedView';
import ProductDetailPage from './components/categories/catalogView';
import Cart from './components/cart/cart';

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
        serviceArea: ["US", "CA", "EU"],
        Status: "delivered",
        image: "https://m.media-amazon.com/images/I/71AcGKTe9+L._AC_SL1500_.jpg",
        S_ID: "SELLER_1001"
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
        serviceArea: ["US", "CA"],
        image: "https://m.media-amazon.com/images/I/81b1vgAABmL.jpg",
        S_ID: "SELLER_1002"
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
        serviceArea: ["US"],
        image: "https://tse1.mm.bing.net/th/id/OIP.r72RwXvjipWa97CWwMLxFgHaHa?pid=Api&P=0&h=220",
        S_ID: "SELLER_1003"
    },
    {
        id: 'prod_601',
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
        serviceArea: ["US", "CA", "EU"],
        image: "https://m.media-amazon.com/images/I/71AcGKTe9+L._AC_SL1500_.jpg",
        S_ID: "SELLER_1001"
    },
    {
        id: 'prod_701',
        name: "dddd Speaker",
        description: "Powerful bookshelf speakers with deep bass. Bluetooth 5.0 connectivity.",
        price: 199.50,
        quantity: 50,
        category: 'Electronics',
        sum_rating: 15,
        number_rating: 5,
        estimated_DT: '2025-12-05',
        deliveryTime: "2 days",
        stock: 50,
        serviceArea: ["US", "CA"],
        image: "https://m.media-amazon.com/images/I/81b1vgAABmL.jpg",
        S_ID: "SELLER_1004"
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
        serviceArea: ["EU"],
        Status: "delivered",
        image: "https://cdn11.bigcommerce.com/s-405b0/images/stencil/1920w/products/72/16844/2000-gildan-ultra-cotton-t-shirt-white-t-shirt.ca__52550.1654536407.jpg?c=2",
        S_ID: "SELLER_2001"
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
        serviceArea: ["EU", "UK"],
        image: "https://tse2.mm.bing.net/th/id/OIP.qtkknMSA7bSeLKuU5X1xvAHaJo?pid=Api&h=220&P=0",
        S_ID: "SELLER_2002"
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
        serviceArea: ["US", "MX"],
        Status: "delivered",
        image: "https://m.media-amazon.com/images/I/915tZ2+SYxL._AC_.jpg",
        S_ID: "SELLER_3001"
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
        serviceArea: ["MX"],
        Status: "pending",
        image: "https://m.media-amazon.com/images/I/71AfYTZo4PL._AC_SL1500_.jpg",
        S_ID: "SELLER_3002"
    }
];

const dummyCart = [
    {
        S_ID: "SELLER123",
        Product: "Wireless Headphones",
        Price: 120,
        quantity: 3
    },
    {
        S_ID: "SELLER123",
        Product: "TestP",
        Price: 10,
        quantity: 1
    },
    {
        S_ID: "SELLER789",
        Product: "Gaming Mouse",
        Price: 45,
        quantity: 3
    },
    {
        S_ID: "SELLER321",
        Product: "Mechanical Keyboard",
        Price: 85,
        quantity: 3
    }
];

const dummyOrders = [
    {
        id: "0",
        S_ID: "SUPP1001",
        Product: ["Laptop Pro X"],
        quantity: [1],
        Status: "Shipped",
        total_price: 1299,
        Delivery_Date: "2025-12-15T00:00:00.000Z",
        Created_Date: "2025-12-01T10:30:00.000Z"
    },
    {
        id: "60a7e0d8a5c3e7b1f8c9d0e2",
        S_ID: "SUPP1003",
        Product: ["Wireless Mouse M300"],
        quantity: [3],
        Status: "Pending",
        total_price: 75,
        Delivery_Date: null,
        Created_Date: "2025-12-02T08:15:00.000Z"
    },
    {
        id: "2",
        S_ID: "SUPP1002",
        Product: ["4K Monitor 27 inch"],
        quantity: [2],
        Status: "Delivered",
        total_price: 600,
        Delivery_Date: "2025-11-28T00:00:00.000Z",
        Created_Date: "2025-11-20T14:45:00.000Z"
    }
]

const dummyFlaggedSellers = [
    {
        "username": "a_smith",
        "location": "Los Angeles, CA",
        "email": "asmith@webmail.org",
        "phone": "555-987-6543"
    },
    {
        "username": "tech_guru",
        "password": "hashed_password_789",
        "location": "Austin, TX",
        "email": "techguru@corp.net",
        "phone": "555-555-1212"
    },
    {
        "username": "user_2024",
        "password": "hashed_password_101",
        "location": "Miami, FL",
        "email": "user2024@mail.co",
        "phone": "555-222-3333"
    },
    {
        "username": "beta_boss",
        "password": "hashed_password_202",
        "location": "Seattle, WA",
        "email": "betaboss@test.dev",
        "phone": "555-444-5555"
    }
]

const b_id = "b444";

const App = () => {
    const [currentView, setCurrentView] = useState('dashboard');
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [cart, setCart] = useState(dummyCart);
    const [orders, setOrders] = useState(dummyOrders);
    const [flags, setFlag] = useState(dummyFlaggedSellers);

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

    const onAddToCartHandler = (newCartItem) => {
        dummyCart.push(newCartItem);
    }

    const getItemId = (item) => item.P_ID ?? `${item.S_ID}-${item.Product}-${item.Price}`;

    const handleRemoveItem = (itemId) => {
        setCart((prev) => prev.filter((item) => getItemId(item) !== itemId));
    };

    const handleRemoveSeller = (sellerId) => {
        setCart((prev) => prev.filter((item) => item.S_ID !== sellerId));
    };


    const handleCompleteSellerOrder = (sellerId, sellerItems) => {
        const nowISO = new Date().toISOString();
        const productsArray = sellerItems.map((item) => item.Product);
        const quantitiesArray = sellerItems.map((item) => Number(item.quantity) || 1);
        const totalPrice = sellerItems.reduce(
            (sum, item) => sum + (Number(item.Price) * Number(item.quantity) || 0),
            0
        );

        const sellerOrder = {
            id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            S_ID: sellerId,
            Product: productsArray,          
            quantity: quantitiesArray,    
            Status: "Pending",              
            total_price: totalPrice,
            Delivery_Date: null,             
            Created_Date: nowISO
        };
        // BACKEND !! REMOVE FROM PRODUCT'S QUANTITY IN PRODUCS COLLECTION
        setOrders((prev) => [...prev, sellerOrder]);     
        setCart((prev) => prev.filter((it) => it.S_ID !== sellerId));

        console.log(`Order completed for ${sellerId}:`, sellerOrder);
    }

    const flagSeller = (S_ID) => {
        // Backend
        const newflag = {
            "username": "test",
            "location": "t",
            "email": "t@webmail.org",
            "phone": "555-55555-5"
        };
        setFlag((prev) => [...prev, newflag]);
        console.log(flags);
    };

    const renderView = () => {
        switch (currentView) {
            case 'dashboard':
                return <DashboardView orders={orders} />;
            case 'orders':
                return <OrdersView orders={orders} flagSeller={flagSeller} />;
            case 'categories':
                return <CategoriesView
                    viewProductDetail={viewProductDetail}
                    products={DUMMY_PRODUCTS_DATA}
                />;
            case 'flagged':
                return <FlaggedView
                    FlaggedSellers={flags}
                />;

            case 'productDetail':
                return (
                    <ProductDetailPage
                        buyerId={b_id}
                        productId={selectedProductId}
                        products={DUMMY_PRODUCTS_DATA}
                        onBack={() => handleViewChange('categories')
                        }
                        onAddToCartHandler={onAddToCartHandler}
                    />
                );
            case 'cart':
                return (
                    <Cart

                        CartArr={cart}
                        onRemoveItem={handleRemoveItem}
                        onRemoveSeller={handleRemoveSeller}
                        onCompleteSellerOrder={handleCompleteSellerOrder}
                        getItemId={getItemId}

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