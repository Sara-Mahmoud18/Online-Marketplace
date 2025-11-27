import React from 'react';

const CategoryCard = ({ category, products }) => {
  const productCount = products.filter(p => p.category === category).length;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{category}</h3>
      <p className="text-sm text-gray-600">{productCount} products</p>
    </div>
  );
};

export default CategoryCard;