import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from './ProductCard';
import ProductForm from './ProductForm';

const ProductsView = () => {
  const [products, setProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const token = localStorage.getItem('token');

  // ===== Fetch Products =====
  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5001/seller/products', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ===== ✅ Categories derived from products =====
  const categories = useMemo(() => {
    return [...new Set(products.map(p => p.category))];
  }, [products]);

  // ===== Filters =====
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategoryFilter === 'all' ||
      p.category === selectedCategoryFilter)
  );

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowAddProduct(true);
  };

  const handleFormSubmit = async (productData) => {
    try {
      if (productData._id) {
        await fetch(
          `http://localhost:5001/seller/products/${productData._id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(productData),
          }
        );
      } else {
        await fetch('http://localhost:5001/seller/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(productData),
        });
      }

      await fetchProducts();
    } catch (err) {
      console.error(err);
    } finally {
      setShowAddProduct(false);
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5001/seller/products/${id}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        setProducts(prev => prev.filter(p => p._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Product Catalog</h2>
        <button
          onClick={() => {
            setEditingProduct(null);
            setShowAddProduct(true);
          }}
          className="bg-indigo-600 text-white px-5 py-3 rounded-xl"
        >
          Add Product
        </button>
      </div>

      {/* Search + Filter */}
      <input
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="border p-2 rounded mb-4"
      />

      <select
        value={selectedCategoryFilter}
        onChange={e => setSelectedCategoryFilter(e.target.value)}
        className="border p-2 rounded mb-4 ml-2"
      >
        <option value="all">All</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(p => (
            <ProductCard
              key={p._id}
              product={p}
              deleteProduct={handleDeleteProduct}
              onEdit={handleEditClick}
              onClick={() => setSelectedProduct(p)}
            />
          ))}
        </div>
      )}

      {/* Add / Edit Product */}
      {showAddProduct && (
        <ProductForm
          onSubmit={handleFormSubmit}
          onClose={() => setShowAddProduct(false)}
          initialData={editingProduct}
        />
      )}

      {/* Product Details */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96 relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold">{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            <p>Category: {selectedProduct.category}</p>
            <p>Quantity: {selectedProduct.quantity}</p>
            <p>Price: ${selectedProduct.price}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsView;
