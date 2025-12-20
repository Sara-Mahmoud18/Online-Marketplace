import React, { useState, useEffect } from 'react';
import { Package, X } from 'lucide-react';

const ProductForm = ({ onSubmit, onClose, initialData = null }) => {
  const [formData, setFormData] = useState({
  name: '',
  description: '',
  category: '',
  Price: '',
  quantity: '',
  deliveryDays: '',
  image: '',
  _id: null,
});


  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
  if (initialData) {
    setFormData({
      name: initialData.name || '',
      description: initialData.description || '',
      category: initialData.category || '',
      Price: initialData.Price != null ? String(initialData.Price) : '',
      quantity: initialData.quantity != null ? String(initialData.quantity) : '',
      deliveryDays: initialData.deliveryDays != null
        ? String(initialData.deliveryDays)
        : '',
      image: initialData.image || '',
      _id: initialData._id,
    });
    setImagePreview(initialData.image || null);
  }
}, [initialData]);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      alert('Image too large. Max 3MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setFormData({ ...formData, image: '' });
    setImagePreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
  ...formData,
  Price: Number(formData.Price),
  quantity: Number(formData.quantity),
  deliveryDays: Number(formData.deliveryDays),
  _id: initialData?._id,
});


    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            {initialData ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* IMAGE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image
            </label>

            {!imagePreview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <label className="cursor-pointer">
                  <span className="text-indigo-600 font-semibold">
                    Click to upload image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 3MB</p>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-3 right-3 bg-red-600 text-white p-2 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* FORM FIELDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Product Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-3"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                rows="3"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-3"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Price ($)</label>
              <input
                type="text"
                value={formData.Price}
                onChange={(e) =>
                  setFormData({ ...formData, Price: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-3"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Stock Units</label>
              <input
                type="text"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-3"
                required
              />
            </div>

            {/* CATEGORY AS STRING */}
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <input
                type="text"
                placeholder="e.g. Electronics"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-3"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Estimated Delivery Days
              </label>
              <input
                type="text"
                //placeholder="e.g. 3"
                value={formData.deliveryDays}
                onChange={(e) =>
                 setFormData({ ...formData, deliveryDays: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-3"
                required
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 py-3 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-3 rounded-lg"
            >
              {initialData ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
