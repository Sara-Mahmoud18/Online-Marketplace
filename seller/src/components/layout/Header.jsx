import React, { useState, useEffect } from "react";
import { Menu, User, Store, Settings } from "lucide-react";

const Header = ({ setIsOpen, setCurrentView, sellerName: propSellerName }) => {
  const [sellerName, setSellerName] = useState(propSellerName || "Seller");
  const [sellerInitial, setSellerInitial] = useState("S");
  const [marketplaceName, setMarketplaceName] = useState("My Marketplace");

  useEffect(() => {
    const fetchSellerName = async () => {
      if (propSellerName) {
        setSellerName(propSellerName);
        updateSellerDetails(propSellerName);
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5001/seller/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          const name = data.username || "Seller";
          setSellerName(name);
          updateSellerDetails(name);
        }
      } catch (err) {
        console.error("Failed to fetch seller name:", err);
      }
    };

    const updateSellerDetails = (name) => {
      setSellerInitial(name.charAt(0).toUpperCase());
      const firstName = name.replace(/[0-9_]/g, '').split(' ')[0];
      setMarketplaceName(`${firstName}'s Marketplace`);
    };

    fetchSellerName();
  }, [propSellerName]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const handleViewProfile = () => {
    setCurrentView("profile");
  };

  const handleViewCatalog = () => {
    setCurrentView("products");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 z-50">
      <div className="px-6 py-4 flex justify-between items-center">
        {/* Left Section: Menu + Logo */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsOpen(prev => !prev)}
            className="p-2.5 rounded-xl hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 transition-all duration-200 group"
          >
            <Menu className="w-6 h-6 text-slate-700 group-hover:text-indigo-600 transition-colors" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {marketplaceName}
              </h1>
              <div className="flex items-center gap-1">
                <span className="text-xs text-slate-500 font-medium">
                  {getGreeting()},
                </span>
                <span className="text-xs font-bold text-indigo-600">
                  {sellerName}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile */}
        <div className="flex items-center space-x-3">
          {/* Profile Section with Dropdown */}
          <div className="flex items-center gap-2 group relative">
            <div className="text-right hidden md:block">
              <p className="text-sm font-semibold text-slate-800">{sellerName}</p>
              <p className="text-xs text-slate-500">Seller Account</p>
            </div>

            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200 group-hover:from-indigo-600 group-hover:to-purple-700">
              {sellerInitial}

              {/* Dropdown indicator */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full border border-indigo-200 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
              </div>
            </div>

            {/* Dropdown Menu */}
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-4 border-b border-slate-100">
                <p className="font-semibold text-slate-800">{sellerName}</p>
                <p className="text-sm text-slate-500">Seller ID: {sellerName.toLowerCase()}</p>
              </div>
              <div className="p-2 space-y-1">
                <button
                  onClick={handleViewProfile}
                  className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  View Profile
                </button>
                <button
                  onClick={handleViewCatalog}
                  className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Store Settings
                </button>
                <div className="border-t border-slate-100 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;