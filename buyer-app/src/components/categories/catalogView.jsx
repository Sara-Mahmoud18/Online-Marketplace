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
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import AICommentSummarizer from "../ai/AICommentSummarizer";
// import ProductComments from "../comments/ProductComments";
// import { 
//   ArrowLeft, 
//   Star, 
//   ShoppingCart, 
//   Package, 
//   DollarSign, 
//   MessageSquare, 
//   ChevronRight,
//   Shield,
//   Truck,
//   Clock,
//   Heart,
//   Share2,
//   ThumbsUp
// } from "lucide-react";

// const ProductDetailPage = ({ buyerId, products, onAddToCartHandler }) => {
//   const { productId } = useParams();
//   const navigate = useNavigate();

//   const product = products.find(p => p._id === productId);

//   if (!product) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
//         <div className="text-center max-w-md">
//           <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
//             <Package className="w-12 h-12 text-red-500" />
//           </div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-3">Product Not Found</h1>
//           <p className="text-gray-600 mb-6">Please select an item from the Categories view.</p>
//           <button
//             onClick={() => navigate("/catalog")}
//             className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
//           >
//             <ArrowLeft className="w-5 h-5" />
//             Back to Categories
//           </button>
//         </div>
//       </div>
//     );
//   }

//   /* ---------------- STATE ---------------- */
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const [comments, setComments] = useState([]);
//   const [quantity, setQuantity] = useState(1);
//   const [showComments, setShowComments] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(0);

//   const sum = product.sum_rating || 0;
//   const count = product.number_rating || 0;
//   const averageRating = count === 0 ? 0 : sum / count;

//   /* ---------------- FETCH COMMENTS ---------------- */
//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         setIsLoading(true);
//         const res = await fetch(
//           `http://localhost:5000/api/comments/${productId}`
//         );
//         const data = await res.json();
//         setComments(data);
//       } catch (err) {
//         console.error("Failed to fetch comments", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchComments();
//   }, [productId]);

//   /* ---------------- RATING ---------------- */
//   const handleRatingSubmit = async () => {
//     if (rating === 0) return alert("Please select a rating");

//     try {
//       await fetch(
//         `http://localhost:5000/api/products/${productId}/rate`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ rating })
//         }
//       );
//       alert("Rating submitted successfully");
//     } catch (err) {
//       console.error("Rating failed", err);
//     }
//   };

//   /* ---------------- COMMENT ---------------- */
//   const handleCommentSubmit = async () => {
//     if (!comment.trim()) return;

//     try {
//       const res = await fetch("http://localhost:5000/api/comments", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           b_id: buyerId,
//           text: comment,
//           productId
//         })
//       });

//       if (res.status === 201) {
//         const newComment = {
//           text: comment,
//           b_id: { _id: buyerId },
//           date: new Date().toISOString()
//         };

//         setComments(prev => [...prev, newComment]);
//         setComment("");
//       }
//     } catch (err) {
//       console.error("Comment failed", err);
//     }
//   };

//   /* ---------------- CART ---------------- */
//   const onAddToCart = () => {
//     if (quantity > product.quantity) {
//       return alert(`Maximum quantity available is ${product.quantity}`);
//     }

//     const newCartItem = {
//       S_ID: product.S_ID,
//       B_ID: buyerId,
//       Product: product._id,
//       Status: "pending",
//       price: product.price,
//       totalPrice: product.price * quantity,
//       quantity
//     };

//     onAddToCartHandler(newCartItem);
//     alert("Added to cart successfully!");
//   };

//   /* ---------------- NORMALIZE FOR AI ---------------- */
//   const normalizedComments = comments.map(c => ({
//     text: c.text,
//     date: c.date,
//     userId: c.b_id?._id || c.b_id
//   }));

//   const stockStatus = product.quantity > 10 ? 'In Stock' : product.quantity > 0 ? 'Low Stock' : 'Out of Stock';
//   const stockColor = product.quantity > 10 ? 'bg-green-100 text-green-700' : product.quantity > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700';

//   /* ---------------- RENDER ---------------- */
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Navigation */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <button
//             onClick={() => navigate("/catalog")}
//             className="flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5" />
//             Back to Categories
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-6 py-8">
//         {/* Product Details Card */}
//         <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
//           <div className="grid lg:grid-cols-2 gap-8 p-8">
//             {/* Image Gallery */}
//             <div className="space-y-4">
//               <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden h-96">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-full h-full object-contain p-8"
//                 />
//                 <button 
//                   onClick={() => setIsFavorite(!isFavorite)}
//                   className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200"
//                 >
//                   <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
//                 </button>
//               </div>
              
//               <div className="flex items-center justify-center gap-3">
//                 <button className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition">
//                   <Share2 className="w-5 h-5 text-gray-600" />
//                 </button>
//                 <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-medium hover:bg-blue-100 transition">
//                   Compare
//                 </button>
//               </div>
//             </div>

//             {/* Product Info */}
//             <div className="space-y-6">
//               <div>
//                 <div className="flex items-center justify-between mb-3">
//                   <span className={`px-3 py-1 rounded-full text-xs font-bold ${stockColor}`}>
//                     {stockStatus}
//                   </span>
//                   <div className="flex items-center gap-1">
//                     <span className="text-yellow-400">
//                       <Star className="w-5 h-5 fill-current" />
//                     </span>
//                     <span className="font-bold text-gray-900">
//                       {averageRating.toFixed(1)}
//                     </span>
//                     <span className="text-gray-500 text-sm">
//                       ({count} reviews)
//                     </span>
//                   </div>
//                 </div>

//                 <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
//                   {product.name}
//                 </h1>

//                 <div className="flex items-center gap-4 mb-6">
//                   <div className="flex items-center gap-2">
//                     <DollarSign className="w-6 h-6 text-green-600" />
//                     <span className="text-4xl font-bold text-gray-900">
//                       ${product.price.toFixed(2)}
//                     </span>
//                   </div>
//                   <div className="h-6 w-px bg-gray-300"></div>
//                   <div className="text-sm text-gray-600">
//                     <span className="font-bold text-gray-900">{product.quantity}</span> units available
//                   </div>
//                 </div>

//                 <p className="text-gray-600 text-lg leading-relaxed">
//                   {product.description}
//                 </p>
//               </div>

//               {/* Features */}
//               <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-100">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-blue-50 rounded-xl">
//                     <Truck className="w-5 h-5 text-blue-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">Free Shipping</p>
//                     <p className="text-xs text-gray-500">On orders over $50</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-green-50 rounded-xl">
//                     <Shield className="w-5 h-5 text-green-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">Secure Payment</p>
//                     <p className="text-xs text-gray-500">100% secure</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-purple-50 rounded-xl">
//                     <Clock className="w-5 h-5 text-purple-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">30-Day Returns</p>
//                     <p className="text-xs text-gray-500">Easy returns</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-orange-50 rounded-xl">
//                     <Package className="w-5 h-5 text-orange-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">In Stock</p>
//                     <p className="text-xs text-gray-500">Ready to ship</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Quantity & Add to Cart */}
//               <div className="space-y-6">
//                 <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4">
//                   <div className="flex items-center gap-4">
//                     <span className="font-medium text-gray-700">Quantity:</span>
//                     <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden">
//                       <button 
//                         onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
//                         className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition"
//                       >
//                         -
//                       </button>
//                       <input
//                         type="number"
//                         min="1"
//                         max={product.quantity}
//                         value={quantity}
//                         onChange={e => setQuantity(Math.max(1, Math.min(product.quantity, +e.target.value || 1)))}
//                         className="w-16 text-center bg-transparent outline-none font-semibold"
//                       />
//                       <button 
//                         onClick={() => setQuantity(prev => Math.min(product.quantity, prev + 1))}
//                         className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition"
//                       >
//                         +
//                       </button>
//                     </div>
//                     <span className="text-sm text-gray-500">
//                       Max: {product.quantity} units
//                     </span>
//                   </div>
                  
//                   <div className="text-right">
//                     <p className="text-sm text-gray-500">Total Price</p>
//                     <p className="text-2xl font-bold text-gray-900">
//                       ${(product.price * quantity).toFixed(2)}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex gap-4">
//                   <button
//                     onClick={onAddToCart}
//                     className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
//                   >
//                     <ShoppingCart className="w-5 h-5" />
//                     Add to Cart
//                   </button>
//                   <button className="px-8 bg-white border-2 border-blue-600 text-blue-600 font-semibold py-4 rounded-xl hover:bg-blue-50 transition-all duration-200">
//                     Buy Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* AI Summary & Comments Section */}
//         <div className="space-y-8">
//           {/* AI Summary */}
//           <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
//             <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
//               <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
//                 <ThumbsUp className="w-5 h-5 text-white" />
//               </div>
//               Customer Insights
//             </h2>
//             <AICommentSummarizer
//               productId={productId}
//               productName={product.name}
//               externalComments={normalizedComments}
//             />
//           </div>

//           {/* Comments Section */}
//           <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
//             <div className="border-b border-gray-100">
//               <button
//                 onClick={() => setShowComments(!showComments)}
//                 className="w-full p-8 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="p-3 bg-indigo-50 rounded-xl">
//                     <MessageSquare className="w-6 h-6 text-indigo-600" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-900">Customer Reviews</h3>
//                     <p className="text-gray-500">
//                       {comments.length} {comments.length === 1 ? 'review' : 'reviews'}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="font-medium text-gray-700">
//                     {showComments ? 'Hide Reviews' : 'Show Reviews'}
//                   </span>
//                   <ChevronRight className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${showComments ? 'rotate-90' : ''}`} />
//                 </div>
//               </button>
//             </div>

//             {showComments && (
//               <div className="p-8">
//                 {isLoading ? (
//                   <div className="text-center py-12">
//                     <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
//                     <p className="mt-4 text-gray-600">Loading reviews...</p>
//                   </div>
//                 ) : (
//                   <>
//                     <ProductComments comments={comments} />

//                     {/* Review Form - Only show if ordered before */}
//                     {product.orderedBefore && (
//                       <div className="mt-12 pt-8 border-t border-gray-100">
//                         <div className="max-w-2xl mx-auto bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200">
//                           <h3 className="text-2xl font-bold text-gray-900 mb-6">Share Your Experience</h3>
                          
//                           {/* Rating */}
//                           <div className="mb-8">
//                             <p className="text-gray-700 font-medium mb-4">Rate this product:</p>
//                             <div className="flex gap-2 mb-4">
//                               {[1, 2, 3, 4, 5].map(star => (
//                                 <button
//                                   key={star}
//                                   onClick={() => setRating(star)}
//                                   className={`text-4xl transition-transform duration-200 hover:scale-110 ${
//                                     star <= rating ? "text-yellow-400" : "text-gray-300"
//                                   }`}
//                                 >
//                                   <Star className={star <= rating ? "fill-current" : ""} />
//                                 </button>
//                               ))}
//                             </div>
//                             <button
//                               onClick={handleRatingSubmit}
//                               className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl"
//                             >
//                               Submit Rating
//                             </button>
//                           </div>

//                           {/* Comment */}
//                           <div className="space-y-4">
//                             <p className="text-gray-700 font-medium">Write a review:</p>
//                             <textarea
//                               value={comment}
//                               onChange={e => setComment(e.target.value)}
//                               className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none transition"
//                               placeholder="Share your thoughts about this product..."
//                             />
//                             <div className="flex justify-end">
//                               <button
//                                 onClick={handleCommentSubmit}
//                                 className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
//                               >
//                                 Post Review
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetailPage;