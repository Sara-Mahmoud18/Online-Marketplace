import React from "react";
import { LayoutDashboard, Package, ShoppingCart, Flag, User, X } from "lucide-react"; 

const Navigation = ({ isOpen, setIsOpen, currentView, setCurrentView }) => {
  const items = [
    { view: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { view: "products", label: "Catalog", icon: Package },
    { view: "orders", label: "Orders", icon: ShoppingCart },
    { view: "flagged", label: "Flagged Buyers", icon: Flag },
    { view: "profile", label: "Profile", icon: User }, 
  ];

  return (
    <>
      {/* Overlay when menu open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out
          bg-white border-r border-gray-200 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 
          pt-24
        `}
      >
        {/* Close button (Mobile Only) */}
        <div className="flex justify-end px-4 mb-4 lg:hidden">
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links - Vertical Layout */}
        <nav className="px-4 space-y-2">
          {items.map(({ view, label, icon: Icon }) => (
            <button
              key={view}
              onClick={() => {
                setCurrentView(view);
                setIsOpen(false); // Close menu on mobile when item clicked
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200
                ${
                  currentView === view
                    ? "bg-indigo-600 text-white shadow-md font-medium"
                    : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="text-base">{label}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Navigation;
