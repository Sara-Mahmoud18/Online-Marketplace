import React from 'react';
import { ShoppingBag } from 'lucide-react';

const Header = ({ handleLogout, islogged }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogout();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        <div className="flex items-center space-x-3">
          <ShoppingBag className="w-8 h-8 text-indigo-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">Buyer Dashboard</h1>
            <p className="text-sm text-gray-600">Manage your marketplace</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {islogged && (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;
