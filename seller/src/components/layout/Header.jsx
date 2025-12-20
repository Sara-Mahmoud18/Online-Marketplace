// import React from 'react';
// import { ShoppingBag } from 'lucide-react';

// const Header = () => {
//   return (
//     <header className="bg-white shadow-sm border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
//         <div className="flex items-center space-x-3">
//           <ShoppingBag className="w-8 h-8 text-indigo-600" />
//           <div>
//             <h1 className="text-xl font-bold text-gray-900"></h1>
//             <p className="text-sm text-gray-600">Manage your marketplace</p>
//           </div>
//         </div>
//         <div className="text-sm text-gray-600">
        
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

// src/components/layout/Header.jsx
import React from "react";
import { ShoppingBag, Menu } from "lucide-react";

const Header = ({ setIsOpen }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md border-b border-gray-200 z-30">
      <div className="px-4 py-4 flex justify-between items-center">
        {/* Logo + Title */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsOpen(prev => !prev)}
            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            <Menu className="w-7 h-7 text-gray-700" />
          </button>

          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-9 h-9 text-indigo-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Marketplace</h1>
              <p className="text-sm text-gray-500 hidden sm:block">Seller Dashboard</p>
            </div>
          </div>
        </div>

        {/* Optional: Seller name or notifications here later */}
        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
          S
        </div>
      </div>
    </header>
  );
};

export default Header;