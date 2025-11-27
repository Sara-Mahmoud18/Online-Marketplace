
// import React from 'react';
// import { Package } from 'lucide-react';

// const ProductCard = ({ product, deleteProduct }) => {
//   return (
//     <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
//       {/* Image or placeholder */}
//       {product.image ? (
//         <img
//           src={product.image}
//           alt={product.name}
//           className="w-full h-64 object-cover"
//         />
//       ) : (
//         <div className="bg-gray-200 border-2 border-dashed border-gray-300 w-full h-64 flex items-center justify-center">
//           <Package className="w-16 h-16 text-gray-400" />
//         </div>
//       )}

//       <div className="p-6">
//         <div className="flex justify-between items-start mb-4">
//           <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
//           <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
//             {product.category}
//           </span>
//         </div>

//         <p className="text-gray-600 text-sm mb-4">{product.description}</p>

//         <div className="space-y-2 text-sm">
//           <div className="flex justify-between">
//             <span className="text-gray-600">Price:</span>
//             <span className="font-semibold text-gray-900">${product.price}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600">Stock:</span>
//             <span className="font-semibold text-gray-900">{product.stock} units</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600">Delivery:</span>
//             <span className="font-semibold text-gray-900">{product.deliveryTime} days</span>
//           </div>
//           {product.serviceArea && (
//             <div className="flex justify-between">
//               <span className="text-gray-600">Service Area:</span>
//               <span className="font-semibold text-gray-900">{product.serviceArea}</span>
//             </div>
//           )}
//         </div>

//         <button
//           onClick={() => {
//             if (confirm('Are you sure you want to delete this product?')) {
//               deleteProduct(product.id);
//             }
//           }}
//           className="w-full mt-4 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-sm font-medium"
//         >
//           Delete Product
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import React from 'react';
import { Package, Pencil, Trash2 } from 'lucide-react'; // Added Pencil and Trash2

const ProductCard = ({ product, deleteProduct, onEdit }) => { // Added onEdit prop
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition flex flex-col h-full">
      {/* Image Section */}
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="bg-gray-100 border-b border-gray-200 w-full h-48 flex items-center justify-center">
          <Package className="w-12 h-12 text-gray-400" />
        </div>
      )}

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
          <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-md whitespace-nowrap ml-2">
            {product.category}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">{product.description}</p>

        <div className="space-y-2 text-sm border-t pt-4 mt-auto">
          <div className="flex justify-between">
            <span className="text-gray-500">Price:</span>
            <span className="font-bold text-gray-900">${product.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Stock:</span>
            <span className="font-medium text-gray-900">{product.stock} units</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Delivery:</span>
            <span className="font-medium text-gray-900">{product.deliveryTime} days</span>
          </div>
        </div>

        {/* BUTTONS SECTION */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition text-sm font-medium border border-indigo-200"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </button>
          
          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete this product?')) {
                deleteProduct(product.id);
              }
            }}
            className="flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-sm font-medium border border-red-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;