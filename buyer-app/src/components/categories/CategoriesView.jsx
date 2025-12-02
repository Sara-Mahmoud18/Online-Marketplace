import React, { useState, useEffect } from 'react';
import CategoryCard from './CategoryCard';
import { Filter, Search, ChevronLeft, ChevronRight } from 'lucide-react';



const CategoriesView = ({ products, viewProductDetail }) => {
  const [search, setSearch] = useState("");
  const [startIndexMap, setStartIndexMap] = useState({});

  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  // Filter products by search term
  const filteredProductsByCategory = {};
  Object.keys(productsByCategory).forEach(category => {
    const filteredProducts = productsByCategory[category].filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    if (filteredProducts.length > 0) {
      filteredProductsByCategory[category] = filteredProducts;
    }
  });

  const categoryNames = Object.keys(filteredProductsByCategory);
  const visibleCount = 4;
  const gap = 24;

  // Reset startIndex when filtered list changes
  useEffect(() => {
    const newStartIndexMap = {};
    categoryNames.forEach(category => {
      newStartIndexMap[category] = 0;
    });
    setStartIndexMap(newStartIndexMap);
  }, [search, products]);

  const handlePrev = (category) => {
    setStartIndexMap(prev => {
      const current = prev[category] || 0;
      const maxIndex = Math.max(0, filteredProductsByCategory[category].length - visibleCount);
      const newIndex = current - visibleCount < 0 ? maxIndex : current - visibleCount;
      return { ...prev, [category]: newIndex };
    });
  };

  const handleNext = (category) => {
    setStartIndexMap(prev => {
      const current = prev[category] || 0;
      const maxIndex = Math.max(0, filteredProductsByCategory[category].length - visibleCount);
      const newIndex = current + visibleCount > maxIndex ? 0 : current + visibleCount;
      return { ...prev, [category]: newIndex };
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Product Categories</h2>
        <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-1 shadow-sm w-64">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full outline-none text-gray-700"
          />
        </div>
      </div>

      {categoryNames.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No Products found.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {categoryNames.map(categoryName => {
            const allProducts = filteredProductsByCategory[categoryName];
            const startIndex = startIndexMap[categoryName] || 0;

            return (
              <div key={categoryName} className="bg-white p-6 rounded-xl shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{categoryName}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleNext(categoryName)}
                      className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                      aria-label={`Previous products in ${categoryName}`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handlePrev(categoryName)}
                      className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                      aria-label={`Next products in ${categoryName}`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-300"
                    style={{
                      transform: `translateX(-${startIndex * (100 / visibleCount)}%)`,
                      gap: `${gap}px`,
                      width: `${(allProducts.length * 100) / visibleCount}%`,
                    }}
                  >
                    {allProducts.map(product => (
                      <div
                        key={product.id}
                        className="flex-shrink-0"
                        style={{
                          width: `${100 / allProducts.length}%`,
                        }}
                      >
                        <CategoryCard
                          products={[product]}
                          viewProductDetail={viewProductDetail}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoriesView;
