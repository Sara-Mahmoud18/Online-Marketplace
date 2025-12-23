import React from 'react';

const ProductCard = ({ product, deleteProduct, onEdit, onClick }) => {
  const handleDelete = (e) => {
    e.stopPropagation(); 
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      deleteProduct(product._id);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit && onEdit(product);
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer overflow-hidden border border-gray-100 hover:border-blue-100 hover:-translate-y-1"
    >
      {/* Card Badge */}
      {product.quantity <= 5 && (
        <div className="absolute top-3 left-3 z-10">
          <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full animate-pulse">
            Low Stock: {product.quantity}
          </span>
        </div>
      )}
      
      {/* Image Container with Gradient Overlay */}
      <div className="relative overflow-hidden h-56">
        <img
          src={product.image || 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col justify-between flex-grow">
        {/* Category Badge */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
            {product.category || 'Uncategorized'}
          </span>
        </div>

        {/* Product Name */}
        <h4 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h4>

        {/* Product Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {product.description || 'No description available'}
        </p>

        {/* Price and Quantity */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
            <span className="text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded">
              {product.quantity} in stock
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100">
          {onEdit && (
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Edit</span>
            </button>
          )}

          {deleteProduct && (
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Delete</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;