import React from 'react';
import ProductCard from './ProductCard';

const CategoryCard = ({ category, products, viewProductDetail }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{category}</h3>

      <div className="space-y-4">
        {products.map((product, index) => (
          <ProductCard 
            key={product.id || index}
            product={product} 
            onClick={() => viewProductDetail(product.id)} 
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;