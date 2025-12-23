import React from 'react';
import { Package, TrendingUp, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ products, viewMode = 'grid' }) => {
  const navigate = useNavigate();
  
  if (!products || products.length === 0) return null;
  
  const product = products[0];
  const stockStatus = product.quantity > 10 ? 'In Stock' : product.quantity > 0 ? 'Low Stock' : 'Out of Stock';
  const stockColor = product.quantity > 10 ? 'bg-green-100 text-green-700' : product.quantity > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700';

  return (
    <div 
      className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-1 ${viewMode === 'list' ? 'flex items-center' : ''}`}
      onClick={() => navigate(`/catalog/${product._id}`)}
    >
      {viewMode === 'grid' ? (
        <div className="p-6">
          {/* Image Container */}
          <div className="relative h-48 mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-4"
            />
            <div className="absolute top-3 right-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${stockColor}`}>
                {stockStatus}
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
              {product.name}
            </h3>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{product.quantity} units</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-900">
                  {product.sum_rating ? (product.sum_rating / product.number_rating).toFixed(1) : '0.0'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <div className="p-2 bg-blue-50 rounded-xl">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center p-6 w-full">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden flex-shrink-0 mr-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-2"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${stockColor}`}>
                {stockStatus}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {product.description || 'No description available'}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{product.quantity} in stock</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-900">
                    {product.sum_rating ? (product.sum_rating / product.number_rating).toFixed(1) : '0.0'}
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
                <p className="text-xs text-gray-500">Per unit</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryCard;