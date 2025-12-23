import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ShoppingBag, Eye } from 'lucide-react';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const isLowStock = product.quantity <= 10;

  return (
    <div 
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-1"
      onClick={() => navigate(`/catalog/${product._id}`)}
    >
      {/* Product Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Flashing Badge for Low Stock */}
        {isLowStock && (
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 rounded-full text-[10px] tracking-tighter font-black bg-red-600 text-white animate-pulse shadow-lg shadow-red-200">
              Low Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-2">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description || 'No description available'}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
          </div>
          
          {/* Stock text turns red for visibility */}
          <div className={`flex items-center gap-2 text-sm font-medium ${isLowStock ? 'text-red-600' : 'text-gray-600'}`}>
            <Package className="w-4 h-4" />
            <span>{product.quantity} in stock</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Eye className="w-4 h-4" />
            <span>View Details</span>
          </div>
          <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 text-sm font-semibold rounded-lg group-hover:from-blue-100 group-hover:to-indigo-100 transition-all flex items-center gap-2">
            <span>View</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Bottom Gradient Hover Effect */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default ProductCard;