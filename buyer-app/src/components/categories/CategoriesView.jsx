<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Filter, Search, ChevronLeft, ChevronRight, Grid, List } from 'lucide-react';

const CategoriesView = ({ products = [] }) => {
  const [search, setSearch] = useState("");
  const [startIndexMap, setStartIndexMap] = useState({});
  const [viewMode, setViewMode] = useState('grid'); 

  const visibleCount = viewMode === 'grid' ? 4 : 2;
  const gap = 24;

  // Grouping & Filtering
  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  const filteredProductsByCategory = {};
  Object.keys(productsByCategory).forEach(category => {
    const filtered = productsByCategory[category].filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description?.toLowerCase().includes(search.toLowerCase())
    );
    if (filtered.length > 0) filteredProductsByCategory[category] = filtered;
  });

  const categoryNames = Object.keys(filteredProductsByCategory);

  useEffect(() => {
    const newStartIndexMap = {};
    categoryNames.forEach(cat => { newStartIndexMap[cat] = 0; });
    setStartIndexMap(newStartIndexMap);
  }, [search, products, viewMode]);

  const handlePrev = (category) => {
    setStartIndexMap(prev => {
      const current = prev[category] || 0;
      const items = filteredProductsByCategory[category];
      const newIndex = current - 1 < 0 ? Math.max(0, items.length - visibleCount) : current - 1;
      return { ...prev, [category]: newIndex };
    });
  };

  const handleNext = (category) => {
    setStartIndexMap(prev => {
      const current = prev[category] || 0;
      const items = filteredProductsByCategory[category];
      const newIndex = current + 1 > items.length - visibleCount ? 0 : current + 1;
      return { ...prev, [category]: newIndex };
    });
=======
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AICommentSummarizer from "../ai/AICommentSummarizer";
import ProductComments from "../comments/ProductComments";

const ProductDetailPage = ({ buyerId, products, onAddToCartHandler }) => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const product = products.find(p => p._id === productId);

  if (!product) {
    return (
      <div className="p-10 text-center text-xl">
        Product not found. Please select an item from the Categories view.
      </div>
    );
  }

  /* ---------------- STATE ---------------- */
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showComments, setShowComments] = useState(false);

  const sum = product.sum_rating || 0;
  const count = product.number_rating || 0;
  const averageRating = count === 0 ? 0 : sum / count;

  /* ---------------- FETCH COMMENTS ---------------- */
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/comments/${productId}`
        );
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error("Failed to fetch comments", err);
      }
    };

    fetchComments();
  }, [productId]);

  /* ---------------- RATING ---------------- */
  const handleRatingSubmit = async () => {
    if (rating === 0) return alert("Please select a rating");

    try {
      await fetch(
        `http://localhost:5000/api/products/${productId}/rate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rating })
        }
      );
      alert("Rating submitted successfully");
    } catch (err) {
      console.error("Rating failed", err);
    }
  };

  /* ---------------- COMMENT ---------------- */
  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          b_id: buyerId,
          text: comment,
          productId
        })
      });

      if (res.status === 201) {
        const newComment = {
          text: comment,
          b_id: { _id: buyerId },
          date: new Date().toISOString()
        };

        setComments(prev => [...prev, newComment]);
        setComment("");
      }
    } catch (err) {
      console.error("Comment failed", err);
    }
>>>>>>> b036f284ef86f9cad11b5271e9379a72099ec19c
  };

  /* ---------------- CART ---------------- */
  const onAddToCart = () => {
    if (quantity > product.quantity) {
      return alert(`Max quantity is ${product.quantity}`);
    }

    const newCartItem = {
      S_ID: product.S_ID,
      B_ID: buyerId,
      Product: product._id,
      Status: "pending",
      price: product.price,
      totalPrice: product.price * quantity,
      quantity
    };

    onAddToCartHandler(newCartItem);
    alert("Added to cart");
  };

  /* ---------------- NORMALIZE FOR AI ---------------- */
  const normalizedComments = comments.map(c => ({
    text: c.text,
    date: c.date,
    userId: c.b_id?._id || c.b_id
  }));
  // console.log(product.orderedBefore)
  /* ---------------- RENDER ---------------- */
  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10">
        <div className="mb-6 lg:mb-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg shadow-blue-200">
              <Grid className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Product Categories</h1>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative flex-1 md:flex-none md:w-80">
            <Search className="absolute inset-y-0 left-3 flex items-center w-5 h-5 text-gray-400 pointer-events-none mt-[14px]" />
            <input
              type="text"
              placeholder="Search products or descriptions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition shadow-sm hover:shadow-md"
            />
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      {categoryNames.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100">
          <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-700">No Products Found</h3>
        </div>
      ) : (
        <div className="space-y-8">
          {categoryNames.map(categoryName => {
            const allProducts = filteredProductsByCategory[categoryName];
            const startIndex = startIndexMap[categoryName] || 0;

            return (
              <div key={categoryName} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                {/* Category Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center border border-blue-100">
                        <span className="text-xl font-bold text-blue-600">{categoryName.charAt(0)}</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{categoryName}</h3>
                        <p className="text-gray-500 text-sm">{allProducts.length} items available</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handlePrev(categoryName)}
                        className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all border border-gray-100 shadow-sm"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                      </button>
                      <span className="text-sm font-semibold text-gray-500 min-w-[80px] text-center">
                        {startIndex + 1}-{Math.min(startIndex + visibleCount, allProducts.length)} of {allProducts.length}
                      </span>
                      <button
                        onClick={() => handleNext(categoryName)}
                        className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all border border-gray-100 shadow-sm"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Products Carousel */}
                <div className="p-6 overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(-${startIndex * (100 / visibleCount)}%)`,
                      gap: `${gap}px`,
                    }}
                  >
                    {allProducts.map(product => (
                      <div
                        key={product._id}
                        className="flex-shrink-0"
                        style={{
                          width: `calc((100% - ${(visibleCount - 1) * gap}px) / ${visibleCount})`
                        }}
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </div>
=======
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">

      <button
        onClick={() => navigate("/catalog")}
        className="mb-4 text-indigo-600 font-semibold"
      >
        ← Back to Categories
      </button>

      {/* PRODUCT CARD */}
      <div className="bg-white shadow rounded-xl p-8 mb-8 grid md:grid-cols-2 gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-96 object-contain mx-auto"
        />

        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

          <div className="flex items-center mb-3">
            <span className="text-yellow-400 text-xl">★</span>
            <span className="ml-2 text-gray-600">
              {averageRating.toFixed(1)} / 5 ({count})
            </span>
          </div>

          <p className="text-3xl text-indigo-700 font-bold mb-4">
            ${product.price.toFixed(2)}
          </p>

          <p className="mb-2">
            {product.description}
          </p>

          <p className="mb-2">
            <strong>Available:</strong> {product.quantity} units
          </p>

          <p className="mb-4">
            <strong>Delivered in:</strong> {product.estimated_DT} days
          </p>


          <input
            type="number"
            min="1"
            max={product.quantity}
            value={quantity}
            onChange={e => setQuantity(+e.target.value || 1)}
            className="w-20 border rounded p-2 mr-4"
          />

          <button
            onClick={onAddToCart}
            className="bg-indigo-600 text-white px-6 py-2 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* AI SUMMARY */}
      <AICommentSummarizer
        productId={productId}
        productName={product.name}
        externalComments={normalizedComments}
      />

      {/* COMMENTS */}
      <div className="mt-8 text-center">
        <button
          onClick={() => setShowComments(!showComments)}
          className="px-6 py-3 bg-gray-200 rounded"
        >
          {showComments ? "Hide Comments" : "Show Comments"} ({comments.length})
        </button>
      </div>

      {showComments && (
        <div className="mt-6">
          <ProductComments comments={comments} />

          {product.orderedBefore && (
            <div className="bg-white p-6 mt-8 rounded shadow">
              <h3 className="text-xl font-bold mb-4">Leave a Review</h3>

              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-3xl ${star <= rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                  >
                    ★
                  </button>
                ))}
>>>>>>> b036f284ef86f9cad11b5271e9379a72099ec19c
              </div>

              <button
                onClick={handleRatingSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded mb-4"
              >
                Submit Rating
              </button>

              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                className="w-full border rounded p-3 mb-4"
                placeholder="Write a comment..."
              />

              <button
                onClick={handleCommentSubmit}
                className="bg-blue-600 text-white px-6 py-2 rounded"
              >
                Post Comment
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

<<<<<<< HEAD
export default CategoriesView;
=======
export default ProductDetailPage;
>>>>>>> b036f284ef86f9cad11b5271e9379a72099ec19c
