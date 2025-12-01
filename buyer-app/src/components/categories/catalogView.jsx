import React, { useState } from 'react';

const ProductDetailPage = ({ productId, products, onBack }) => { 
    const product = products.find(p => p.id === productId);

    if (!product) {
        return (
            <div className="p-10 text-center text-xl">
                Product not found. Please select an item from the Categories view.
            </div>
        );
    }

    const sum = product.sum_rating || 0;
    const count = product.number_rating || 0;
    const averageRating = count === 0 ? 0 : sum / count;

    return (
        <div className="container mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
            {onBack && (
                <button 
                    onClick={onBack} 
                    className="mb-4 text-indigo-600 hover:text-indigo-800 font-semibold flex items-center"
                >
                    &larr; Back to Categories
                </button>
            )}

            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">

                <div className="p-8 md:flex gap-8">
                    <div className="md:w-2/3">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                            {product.name}
                        </h1>
                        <div className="flex items-center mb-4">
                            <span className="ml-2 text-sm font-medium text-gray-600">
                                {averageRating.toFixed(1)} / 5 ({count} reviews)
                            </span>
                        </div>
                        <p className="text-4xl font-bold text-indigo-700 mb-6">
                            ${product.price.toFixed(2)}
                        </p>
                        <p className="text-gray-700 mb-6 border-b pb-4">
                            {product.description}
                        </p>
                        <div className="space-y-2 text-gray-800">
                            <p><span className="font-semibold">Quantity:</span> {product.quantity}</p>
                            <p><span className="font-semibold">Estimated Delivery Time:</span> 
                                {product.estimated_DT 
                                    ? new Date(product.estimated_DT).toLocaleDateString() 
                                    : "N/A"}
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetailPage;