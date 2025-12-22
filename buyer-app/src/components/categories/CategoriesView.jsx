// import React, { useState, useEffect } from 'react';
// import CategoryCard from './CategoryCard';
// import { Filter, Search, ChevronLeft, ChevronRight } from 'lucide-react';



// const CategoriesView = ({ products = [] }) => {
//   const [search, setSearch] = useState("");
//   const [startIndexMap, setStartIndexMap] = useState({});

//   // Group products by category
//   const productsByCategory = products.reduce((acc, product) => {
//     if (!acc[product.category]) acc[product.category] = [];
//     acc[product.category].push(product);
//     return acc;
//   }, {});

//   // Filter products by search term
//   const filteredProductsByCategory = {};
//   Object.keys(productsByCategory).forEach(category => {
//     const filteredProducts = productsByCategory[category].filter(product =>
//       product.name.toLowerCase().includes(search.toLowerCase())
//     );
//     if (filteredProducts.length > 0) {
//       filteredProductsByCategory[category] = filteredProducts;
//     }
//   });

//   const categoryNames = Object.keys(filteredProductsByCategory);
//   const visibleCount = 4;
//   const gap = 24;

//   // Reset startIndex when filtered list changes
//   useEffect(() => {
//     const newStartIndexMap = {};
//     categoryNames.forEach(category => {
//       newStartIndexMap[category] = 0;
//     });
//     setStartIndexMap(newStartIndexMap);
//   }, [search, products]);

//   const handlePrev = (category) => {
//     setStartIndexMap(prev => {
//       const current = prev[category] || 0;
//       const maxIndex = Math.max(0, filteredProductsByCategory[category].length - visibleCount);
//       const newIndex = current - visibleCount < 0 ? maxIndex : current - visibleCount;
//       return { ...prev, [category]: newIndex };
//     });
//   };

//   const handleNext = (category) => {
//     setStartIndexMap(prev => {
//       const current = prev[category] || 0;
//       const maxIndex = Math.max(0, filteredProductsByCategory[category].length - visibleCount);
//       const newIndex = current + visibleCount > maxIndex ? 0 : current + visibleCount;
//       return { ...prev, [category]: newIndex };
//     });
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-900">Product Categories</h2>
//         <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-1 shadow-sm w-64">
//           <Search className="w-5 h-5 text-gray-500 mr-2" />
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={search}
//             onChange={e => setSearch(e.target.value)}
//             className="w-full outline-none text-gray-700"
//           />
//         </div>
//       </div>

//       {categoryNames.length === 0 ? (
//         <div className="bg-white rounded-lg shadow p-12 text-center">
//           <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//           <p className="text-gray-500 text-lg">No Products found.</p>
//         </div>
//       ) : (
//         <div className="space-y-12">
//           {categoryNames.map(categoryName => {
//             const allProducts = filteredProductsByCategory[categoryName];
//             const startIndex = startIndexMap[categoryName] || 0;

//             return (
//               <div key={categoryName} className="bg-white p-6 rounded-xl shadow">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-xl font-semibold text-gray-900">{categoryName}</h3>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleNext(categoryName)}
//                       className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
//                       aria-label={`Previous products in ${categoryName}`}
//                     >
//                       <ChevronLeft className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={() => handlePrev(categoryName)}
//                       className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
//                       aria-label={`Next products in ${categoryName}`}
//                     >
//                       <ChevronRight className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="overflow-hidden">
//                   <div
//                     className="flex transition-transform duration-300"
//                     style={{
//                       transform: `translateX(-${startIndex * (100 / visibleCount)}%)`,
//                       gap: `${gap}px`,
//                       width: `${(allProducts.length * 100) / visibleCount}%`,
//                     }}
//                   >
//                     {allProducts.map(product => (
//                       <div
//                         key={product._id}
//                         className="flex-shrink-0"
//                         style={{
//                           width: `${100 / allProducts.length}%`,
//                         }}
//                       >
//                         <CategoryCard
//                           products={[product]}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CategoriesView;
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Filter, Search, ChevronLeft, ChevronRight, Grid, List, Sparkles } from 'lucide-react';

const CategoriesView = ({ products = [] }) => {
  const [search, setSearch] = useState("");
  const [startIndexMap, setStartIndexMap] = useState({});
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

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
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description?.toLowerCase().includes(search.toLowerCase())
    );
    if (filteredProducts.length > 0) {
      filteredProductsByCategory[category] = filteredProducts;
    }
  });

  const categoryNames = Object.keys(filteredProductsByCategory);
  const visibleCount = viewMode === 'grid' ? 4 : 2;
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10">
        <div className="mb-6 lg:mb-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
              <Grid className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Product Categories</h1>
          </div>
          <p className="text-gray-600">Browse products by category</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative flex-1 md:flex-none md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products or descriptions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition shadow-sm hover:shadow-md"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-1">
            
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Categories</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{categoryNames.length}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl">
              <Filter className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Products</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{products.length}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-xl">
              <Sparkles className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">In Stock</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {products.filter(p => p.quantity > 0).length}
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-xl">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Avg Price</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                ${products.length > 0 ? (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2) : '0.00'}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-xl">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      {categoryNames.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Filter className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">No Products Found</h3>
            <p className="text-gray-500 mb-8">
              {search ? `No products match "${search}"` : 'No products available'}
            </p>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all duration-200"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {categoryNames.map(categoryName => {
            const allProducts = filteredProductsByCategory[categoryName];
            const startIndex = startIndexMap[categoryName] || 0;

            return (
              <div key={categoryName} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                {/* Category Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center">
                        <span className="text-xl font-bold text-blue-600">
                          {categoryName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{categoryName}</h3>
                        <p className="text-gray-500">
                          {allProducts.length} {allProducts.length === 1 ? 'product' : 'products'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handlePrev(categoryName)}
                        className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-gray-100 hover:to-gray-200 transition-all duration-200 shadow-sm hover:shadow-md"
                        aria-label={`Previous products in ${categoryName}`}
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                      </button>
                      <span className="text-sm font-medium text-gray-600">
                        {Math.min(startIndex + 1, allProducts.length)}-{Math.min(startIndex + visibleCount, allProducts.length)} of {allProducts.length}
                      </span>
                      <button
                        onClick={() => handleNext(categoryName)}
                        className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-gray-100 hover:to-gray-200 transition-all duration-200 shadow-sm hover:shadow-md"
                        aria-label={`Next products in ${categoryName}`}
                      >
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Products Carousel */}
                <div className="p-6 overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(-${startIndex * (100 / visibleCount)}%)`,
                      gap: `${gap}px`,
                      width: `${(allProducts.length * 100) / visibleCount}%`,
                    }}
                  >
                    {allProducts.map(product => (
                   <div
  key={product._id}
  className={`flex-shrink-0 ${viewMode === 'grid' ? 'w-1/3 md:w-1/4' : 'w-full md:w-1/2'}`} // Changed width classes
>
  <ProductCard product={product} />
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