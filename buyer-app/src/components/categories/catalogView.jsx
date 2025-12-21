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

          <p className="mb-4">{product.description}</p>

          <p className="mb-4">
            <strong>Available:</strong> {product.quantity}
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
                    className={`text-3xl ${
                      star <= rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
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

export default ProductDetailPage;