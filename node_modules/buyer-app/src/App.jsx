// App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';

import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import DashboardView from './components/dashboard/DashboardView';
import OrdersView from './components/orders/OrdersView';
import CategoriesView from './components/categories/CategoriesView';
import FlaggedView from './components/flagged/FlaggedView';
import ProductDetailPage from './components/categories/catalogView';
import Cart from './components/cart/cart';

const App = () => {
    const [orders, setOrders] = useState([]);
    const [flags, setFlag] = useState([]);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [logged, setlog] = useState(false);
    const [_id, setID] = useState("");



    // Fetch products
    useEffect(() => {
        if (!logged) return;
        fetch(`http://localhost:5000/api/products/all/${_id}`)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.log(err));
    }, [logged]);

    // Fetch cart
    useEffect(() => {
        if (!logged) return;
        fetch(`http://localhost:5000/api/cart/${_id}`)
            .then(res => res.ok ? res.json() : [])
            .then(data => setCart(Array.isArray(data) ? data : []))
            .catch(err => {
                console.log(err);
                setCart([]);
            });
    }, [logged]);


    // Fetch orders
    useEffect(() => {
        if (!logged) return;
        fetch(`http://localhost:5000/api/orders/${_id}`)
            .then(res => res.json())
            .then(data => setOrders(data))
            .catch(err => console.log(err));
    }, [logged]);

    // Fetch flagged sellers
    useEffect(() => {
        if (!logged) return;
        fetch(`http://localhost:5000/api/buyers/${_id}/flagged-sellers`)
            .then(res => res.json())
            .then(data => setFlag(data))
            .catch(err => console.log(err));
    }, [logged]);

    const getItemId = (item) => item._id;

    const handleRemoveItem = (itemId) => {
        fetch(`http://localhost:5000/api/cart/${_id}/item/${itemId}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => setCart(data))
            .catch(err => console.log(err));
    };

    const handleRemoveSeller = (sellerId) => {
        fetch(`http://localhost:5000/api/cart/${_id}/seller/${sellerId}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => setCart(data))
            .catch(err => console.log(err));
    };

    const onAddToCartHandler = (newCartItem) => {
        fetch(`http://localhost:5000/api/cart/${_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCartItem),
        })
            .then(res => res.json())
            .then(data => setCart(data))
            .catch(err => console.log(err));
    };

    const onRegisterHandler = async (newBuyer) => {
        try {
            const res = await fetch('http://localhost:5000/api/buyers/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBuyer),
            });

            if (res.status === 201) {
                const data = await res.json();
                setlog(true);
                setID(data.user.id);
                return { success: true, data };
            } else {
                const errData = await res.json();
                return { success: false, error: errData.message || 'Registration failed' };
            }
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const onLoginHandler = async (logInfo) => {
        try {
            const res = await fetch('http://localhost:5000/api/buyers/login', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(logInfo),
            });

            if (res.status === 200) {
                const data = await res.json();
                setlog(true);
                setID(data.user.id);
                // console.log("Logged in with ID:", data.user.id);
                return { success: true, data };
            } else {
                const errData = await res.json();
                return { success: false, error: errData.message || 'Logging failed' };
            }
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const handleLogout = () => {
        setlog(false);
        setID("");
        return true;
    }

    const handleCompleteOrder = async (sellerId, sellerItems) => {
        const nowISO = new Date().toISOString();

        // 1. Prepare the Data Arrays
        const productsArray = sellerItems.map((item) => item.Product);
        const quantitiesArray = sellerItems.map((item) => Number(item.quantity) || 1);

        // Calculate total price based on the items for this specific seller
        const totalPrice = sellerItems.reduce(
            (sum, item) => sum + (Number(item.price) * Number(item.quantity) || 0),
            0
        );

        const sellerOrder = {
            S_ID: sellerId,
            B_ID: _id,
            Product: productsArray,
            quantity: quantitiesArray,
            Status: "Pending",
            total_price: totalPrice,
            Delivery_Date: null,
            Created_Date: nowISO
        };

        try {
            // STEP 1: Create the Order in the database
            // This will trigger your backend logic to check and decrement quantity
            const orderResponse = await fetch(`http://localhost:5000/api/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sellerOrder)
            });

            const orderData = await orderResponse.json();

            if (!orderResponse.ok) {
                // If the backend returned an error (like "Insufficient quantity")
                throw new Error(orderData.message || "Failed to create order");
            }

            // STEP 2: Delete items from the Cart database
            // We use a loop or a bulk delete endpoint. 
            // Here, we loop through the items for this seller to delete them by ID.
            fetch(`http://localhost:5000/api/cart/${_id}/seller/${sellerId}`, {
                method: "DELETE",
            })
                .then(res => res.json())
                .then(data => setCart(data))
                .catch(err => console.log(err));

            // STEP 3: Update local UI State
            // Add the new order to the orders list
            setOrders(prev => [...prev, orderData]);

            // Remove only the items belonging to this seller from the local cart
            // setCart(prev =>
            //     prev.filter(it => it.S_ID !== sellerId && String(it.S_ID) !== String(sellerId))
            // );

            alert("Order placed successfully!");

        } catch (err) {
            console.error("Checkout Error:", err);
            alert(`Could not complete order: ${err.message}`);
        }
    };

    // Flag a seller in backend
    const flagSeller = (sellerId, reason) => {
        // console.log("Flagging seller:", sellerId._id, "for reason:", reason);
        fetch('http://localhost:5000/api/buyers/flagged-sellers', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ buyerId: _id, sellerId: sellerId._id, reason })
        })
            .then(res => {
                res.json();
                if (res.status === 200)
                    alert("Seller flagged successfully");
                else if (res.status === 220)
                    alert("You have already flagged this seller");
                return res;
            })
            .then(() => {
                fetch(`http://localhost:5000/api/buyers/${_id}/flagged-sellers`)
                    .then(res => res.json())
                    .then(data => setFlag(data));
            })
            .catch(err => console.log(err));

    };

    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <Header handleLogout={handleLogout} islogged={logged} />
                {logged && <Navigation />}
                <main className="max-w-7xl mx-auto px-4 py-8">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/login" element={<Login onLoginHandler={onLoginHandler} />} />
                        <Route path="/register" element={<Register onRegisterHandler={onRegisterHandler} />} />

                        {/* Protected Routes */}
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute islogged={logged}>
                                    <DashboardView orders={orders} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/orders"
                            element={
                                <ProtectedRoute islogged={logged}>

                                    <OrdersView orders={orders} flagSeller={flagSeller} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/catalog"
                            element={
                                <ProtectedRoute islogged={logged}>

                                    <CategoriesView products={products} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/catalog/:productId"
                            element={
                                <ProtectedRoute islogged={logged}>

                                    <ProductDetailPage
                                        buyerId={_id}
                                        products={products}
                                        onAddToCartHandler={onAddToCartHandler}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/cart"
                            element={
                                <ProtectedRoute islogged={logged}>

                                    <Cart
                                        CartArr={cart}
                                        onRemoveItem={handleRemoveItem}
                                        onRemoveSeller={handleRemoveSeller}
                                        onCompleteSellerOrder={handleCompleteOrder}
                                        getItemId={getItemId}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/flagged"
                            element={
                                <ProtectedRoute islogged={logged}>

                                    <FlaggedView FlaggedSellers={flags} />
                                </ProtectedRoute>
                            }
                        />

                        {/* Default Route */}
                        <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;