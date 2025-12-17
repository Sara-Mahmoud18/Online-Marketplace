// Navigation.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const views = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Categories', path: '/catalog' },
    { name: 'Cart', path: '/cart' },
    { name: 'Orders', path: '/orders' },
    { name: 'Flagged', path: '/flagged' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-8">
          {views.map((view) => {
            const isActive = location.pathname.startsWith(view.path);
            return (
              <Link
                key={view.name}
                to={view.path}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition ${
                  isActive
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {view.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;