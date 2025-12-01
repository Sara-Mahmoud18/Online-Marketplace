import React from 'react';

const ProductCard = ({ product, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition cursor-pointer" 
      onClick={onClick} 
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Price:</span>
            <span className="font-semibold text-gray-900">${product.price}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Stock:</span>
            <span className="font-semibold text-gray-900">{product.stock} units</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;