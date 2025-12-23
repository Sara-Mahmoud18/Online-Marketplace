import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const DemoOrderForm = ({ products, onSubmit, onClose }) => {
  const [buyerEmail, setBuyerEmail] = useState('testbuyer@example.com');
  const [selectedItems, setSelectedItems] = useState({});

  const handleQuantityChange = (productId, qty) => {
    if (qty === 0) {
      const newItems = { ...selectedItems };
      delete newItems[productId];
      setSelectedItems(newItems);
    } else {
      setSelectedItems({ ...selectedItems, [productId]: qty });
    }
  };

  const total = Object.entries(selectedItems).reduce((sum, [id, qty]) => {
    const product = products.find(p => p.id === id);
    return sum + (parseFloat(product.price) * qty);
  }, 0).toFixed(2);

  const handleSubmit = () => {
    const items = Object.entries(selectedItems).map(([id, quantity]) => {
      const product = products.find(p => p.id === id);
      return {
        name: product.name,
        price: parseFloat(product.price),
        quantity,
      };
    });

    if (items.length === 0) {
      alert('Please select at least one product');
      return;
    }

    onSubmit({
      buyerEmail,
      items,
      total,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Create Test Order</h3>
          <button onClick={onClose}><X className="w-6 h-6" /></button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Buyer Email / Name
          </label>
          <input
            type="text"
            value={buyerEmail}
            onChange={(e) => setBuyerEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="e.g. ahmed.mohamed@gmail.com"
          />
        </div>

        <h4 className="font-semibold mb-3">Select Products & Quantity</h4>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {products.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No products yet. Add some products first!</p>
          ) : (
            products.map(product => (
              <div key={product.id} className="flex items-center justify-between border-b pb-3">
                <div className="flex-1">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-600">${product.price} • Stock: {product.stock}</p>
                </div>
                <input
                  type="number"
                  min="0"
                  max={product.stock}
                  placeholder="0"
                  className="w-20 px-3 py-1 border rounded text-center"
                  onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 0)}
                />
              </div>
            ))
          )}
        </div>

        <div className="mt-6 text-xl font-bold text-right">
          Total: ${total}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            Create Test Order
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 py-3 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoOrderForm;