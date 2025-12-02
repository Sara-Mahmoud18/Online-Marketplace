import React from 'react';

const Navigation = ({ currentView, setCurrentView }) => {
  const views = ['dashboard','categories','cart','orders', 'flagged'];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-8">
          {views.map(view => (
            <button
              key={view}
              onClick={() => setCurrentView(view)}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition ${
                currentView === view
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
