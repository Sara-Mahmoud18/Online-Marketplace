import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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

    const [rating, setRating] = useState(product.userRating || 0);
    const [comment, setComment] = useState('');
    // const [comments, setComments] = useState(product.comments || []);
    const [quantity, setQuantity] = useState(1);

    const sum = product.sum_rating || 0;
    const count = product.number_rating || 0;
    const averageRating = count === 0 ? 0 : sum / count;

    const handleRatingSubmit = async () => {
        if (rating === 0) return alert('Please select a rating first');

        try {
            const res = await fetch(
                `http://localhost:5000/api/products/${productId}/rate`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        b_id: buyerId,
                        rating: rating,
                    }),
                }
            );

            const data = await res.json();

            alert('Rating submitted successfully');
        } catch (error) {
            console.error('Failed to submit rating', error);
        }
    };


    const handleCommentSubmit = async () => {
        if (comment.trim() === '') return;

        try {
            const res = await fetch(
            `http://localhost:5000/api/comments`,
            {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                b_id: buyerId,
                text: comment,
                productId: productId,
                }),
            }
            );

            if (res.status === 201) {
                alert("Comment is added");
            }

        } catch (error) {
            console.error('Failed to add comment', error);
        }

    };


    const onAddToCart = () => {
        if (quantity <= product.quantity) {
            const newCartItem = {
                S_ID: product.S_ID,
                B_ID: buyerId,
                Product: product._id,
                Status: "pending",
                price: product.price,
                totalPrice: product.price * quantity,
                quantity: quantity
            };

            if (onAddToCartHandler) {
                onAddToCartHandler(newCartItem);
                alert(`Added ${quantity} x ${product.name} to cart successfully!`);
            } else {
                alert("Error: Cart update handler not provided.");
            }
        }
        else alert(`Please choose a quantity number equal to or smaller than the product's quantity (${product.quantity})`);

    };
    // console.log(products)
    return (
        <div className="container mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">

            <button
                onClick={() => navigate('/catalog')}
                className="mb-4 text-indigo-600 hover:text-indigo-800 font-semibold flex items-center"
            >
                &larr; Back to Categories
            </button>


            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8 p-8">
                    <div className="flex justify-center items-center bg-gray-100 rounded-lg p-4">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="max-h-96 object-contain rounded-lg shadow-md"
                        />
                    </div>

                    <div className="flex flex-col justify-between">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                                {product.name}
                            </h1>

                            <div className="flex items-center mb-4">
                                <span className="text-yellow-400 text-xl">★</span>
                                <span className="ml-2 text-sm font-medium text-gray-600">
                                    {averageRating.toFixed(1)} / 5 ({count} reviews)
                                </span>
                            </div>

                            <p className="text-3xl font-bold text-indigo-700 mb-6">
                                ${product.price.toFixed(2)}
                            </p>

                            <p className="text-gray-700 mb-6 border-b pb-4">
                                {product.description}
                            </p>

                            <div className="space-y-2 text-gray-800 mb-6">
                                <p><span className="font-semibold">Quantity Available:</span> {product.quantity}</p>
                                <p><span className="font-semibold">Estimated Delivery: </span>
                                    {product.estimated_DT ? product.estimated_DT : 1} days
                                </p>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-semibold mb-2" htmlFor="quantity-input">Quantity:</label>
                            <input
                                id="quantity-input"
                                type="number"
                                min="1"
                                max={product.quantity} // Added max attribute for better UX
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                className="w-20 border rounded-lg p-2 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <button
                            onClick={onAddToCart}
                            className="w-full md:w-auto bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition"
                        >
                            Add to Cart
                        </button>

                    </div>
                </div>

                {product.orderedBefore && (
                    <div>
                        <div className="mt-8 border-t pt-6 p-4">
                            <h2 className="text-xl font-bold mb-4">Rate this product</h2>
                            <div className="flex items-center gap-4 mb-4">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button
                                        key={star}
                                        onClick={() => setRating(star)}
                                        className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-500`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={handleRatingSubmit}
                                className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition"
                            >
                                Submit Rating
                            </button>
                        </div>

                        <div className="mt-8 border-t pt-6 p-4">
                            <h2 className="text-xl font-bold mb-4">Add a Comment</h2>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Leave a comment..."
                                className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button
                                onClick={handleCommentSubmit}
                                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                            >
                                Add Comment
                            </button>
                        </div>
                    </div>
                )
                }
            </div >
        </div >
    );
};

export default ProductDetailPage;