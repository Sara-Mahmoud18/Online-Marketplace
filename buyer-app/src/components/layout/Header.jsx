import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  LogOut,
  ChevronDown,
  ShoppingCart,
  LayoutDashboard,
  ShoppingBasket
} from 'lucide-react';

const Header = ({ handleLogout, islogged, buyerName: propBuyerName }) => {
  const navigate = useNavigate();
  const [buyerName, setBuyerName] = useState(propBuyerName || 'Buyer');
  const [buyerInitial, setBuyerInitial] = useState('B');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (propBuyerName) {
      setBuyerName(propBuyerName);
      setBuyerInitial(propBuyerName.charAt(0).toUpperCase());
    } else if (islogged) {
      const storedUser = localStorage.getItem('buyerData');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          const name = userData.username || userData.email?.split('@')[0] || 'Buyer';
          setBuyerName(name);
          setBuyerInitial(name.charAt(0).toUpperCase());
        } catch (error) {
          console.error('Error parsing stored user data:', error);
        }
      }
    }
  }, [propBuyerName, islogged]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowDropdown(false);
    await handleLogout();
  };

  const navigateToCart = () => {
    navigate('/cart');
  };

  const navigateToCategories = () => {
    navigate('/catalog');
  };

  const navigateToDashboard = () => {
    navigate('/dashboard');
    setShowDropdown(false);
  };

  if (!islogged) {
    return (
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-8 h-8 text-white" />
            <div>
              <h1 className="text-xl font-bold text-white">Marketplace</h1>
              <p className="text-sm text-blue-100">Welcome to our marketplace</p>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo & Brand */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={navigateToCategories}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <ShoppingBag className="w-6 h-6 text-white" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Marketplace Hub</h1>
              <p className="text-sm text-blue-100">Welcome back, {buyerName}!</p>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-4">
            {/* Quick Actions */}
            <div className="hidden md:flex items-center space-x-2">
              <button 
                onClick={navigateToCart}
                className="p-2 rounded-xl hover:bg-white/10 transition-colors relative"
                title="Cart"
              >
                <ShoppingCart className="w-5 h-5 text-white" />
              </button>
              
              <button 
                onClick={navigateToCategories}
                className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                title="Categories"
              >
                <ShoppingBasket className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl px-4 py-2 transition-all duration-200"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                  {buyerInitial}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-white">{buyerName}</p>
                  <p className="text-xs text-blue-100">Buyer Account</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-white transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-fadeIn z-50">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                        {buyerInitial}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{buyerName}</p>
                        <p className="text-sm text-gray-500">Buyer Account</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-2">
                    <button 
                      onClick={navigateToDashboard}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Dashboard</span>
                    </button>
                    
                    {/* Removed Account Settings button as requested */}
                    
                    <div className="my-2 border-t border-gray-100"></div>
                    
                    <button 
                      onClick={handleSubmit}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Quick Actions */}
        <div className="md:hidden flex items-center justify-around mt-4 pt-4 border-t border-blue-500/30">
          <button 
            onClick={navigateToCart}
            className="flex flex-col items-center space-y-1 p-2"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </div>
            <span className="text-xs text-blue-100">Cart</span>
          </button>
          
          <button 
            onClick={navigateToCategories}
            className="flex flex-col items-center space-y-1 p-2"
          >
            <ShoppingBasket className="w-5 h-5 text-white" />
            <span className="text-xs text-blue-100">Categories</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;