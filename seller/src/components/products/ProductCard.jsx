import React from 'react';

const ProductCard = ({ product, deleteProduct, onEdit, onClick }) => {
  const handleDelete = (e) => {
    e.stopPropagation(); 
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      deleteProduct(product._id);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit && onEdit(product);
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col cursor-pointer"
    >
      <img
        src={product.image || 'https://via.placeholder.com/300'}
        alt={product.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />

      <div className="p-4 flex flex-col justify-between flex-grow">
        <h4 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h4>

        <p className="text-gray-700 text-sm mb-4">
          Price: <span className="font-medium">${product.price}</span>
        </p>

        <div className="mt-auto flex justify-between items-center">
          {onEdit && (
            <button
              onClick={handleEdit}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Edit
            </button>
          )}

          {deleteProduct && (
            <button
              onClick={handleDelete}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;