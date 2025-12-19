import React from 'react';
import {useNavigate } from 'react-router-dom';


const ProductCard = ({ product}) => {
    const navigate = useNavigate();

  return (
    <div 
      className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition cursor-pointer" 
      onClick={() => navigate(`/catalog/${product._id}`)}
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
            <span className="font-semibold text-gray-900">{product.quantity} units</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;