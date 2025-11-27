
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import ProductForm from './ProductForm';
import CategoryForm from './CategoryForm';
import ProductFilters from './ProductFilters';
import { Plus, Package, Layers } from 'lucide-react';

const ProductsView = ({ products, categories, addProduct, updateProduct, deleteProduct, addCategory }) => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  
  // NEW: State to store the product currently being edited
  const [editingProduct, setEditingProduct] = useState(null);
  
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategoryFilter === 'all' || p.category === selectedCategoryFilter)
  );

  const groupedProducts = categories.reduce((acc, category) => {
    acc[category] = filteredProducts.filter(p => p.category === category);
    return acc;
  }, {});

  // NEW: Handler for clicking the Edit button on a card
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowAddProduct(true);
  };

  // NEW: Handler for submitting the form
  const handleFormSubmit = (productData) => {
    if (editingProduct) {
      updateProduct(productData); // Call the update function from App.js
    } else {
      addProduct(productData); // Call the add function
    }
    setShowAddProduct(false);
    setEditingProduct(null); // Reset editing state
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Product Catalog</h2>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAddCategory(true)}
            className="flex items-center gap-2 px-5 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition font-medium shadow-lg"
          >
            <Layers className="w-5 h-5" />
            New Category
          </button>
          <button
            onClick={() => {
              setEditingProduct(null); // Ensure we are in "Add" mode
              setShowAddProduct(true);
            }}
            className="flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition font-medium shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>
      </div>

      <ProductFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategoryFilter}
        setSelectedCategory={setSelectedCategoryFilter}
        categories={categories}
      />

      {products.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-20 text-center">
          <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <p className="text-xl text-gray-600 mb-2">Your store is empty</p>
          <p className="text-gray-500">Start by adding a category, then add your first product!</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-20 text-center">
          <p className="text-xl text-gray-600">No products match your search</p>
        </div>
      ) : (
        <div className="space-y-12">
          {categories.map(category => {
            const categoryProducts = groupedProducts[category] || [];
            if (categoryProducts.length === 0) return null;

            return (
              <div key={category} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-5">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Layers className="w-7 h-7" />
                    {category}
                    <span className="text-indigo-100 text-lg font-normal">
                      ({categoryProducts.length})
                    </span>
                  </h3>
                </div>

                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categoryProducts.map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        deleteProduct={deleteProduct}
                        onEdit={handleEditClick} // Pass the handler
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showAddProduct && (
        <ProductForm
          categories={categories}
          onSubmit={handleFormSubmit} // Use the wrapper handler
          onClose={() => {
            setShowAddProduct(false);
            setEditingProduct(null);
          }}
          initialData={editingProduct} // Pass existing data if editing
        />
      )}

      {showAddCategory && (
        <CategoryForm
          onSubmit={(name) => {
            addCategory(name);
            setShowAddCategory(false);
          }}
          onClose={() => setShowAddCategory(false)}
        />
      )}
    </div>
  );
};

export default ProductsView;
