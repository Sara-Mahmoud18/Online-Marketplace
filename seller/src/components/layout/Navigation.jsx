

// import React from "react";
// import { LayoutDashboard, Package, ShoppingCart, Layers, Flag } from "lucide-react";

// const Sidebar = ({ currentView, setCurrentView }) => {
//   const items = [
//     { view: "dashboard", label: "Dashboard", icon: LayoutDashboard },
//     { view: "products", label: "Products", icon: Package },
//     { view: "orders", label: "Orders", icon: ShoppingCart },
//     // { view: "categories", label: "Categories", icon: Layers },
//     { view: "flagged", label: "Flagged", icon: Flag },
//   ];

//   return (
//     <aside className="fixed left-0 top-0 h-full w-60 bg-white shadow-lg border-r border-gray-200 pt-20">
//       <nav className="mt-4">
//         {items.map(({ view, label, icon: Icon }) => (
//           <button
//             key={view}
//             onClick={() => setCurrentView(view)}
//             className={`w-full flex items-center space-x-3 px-5 py-3 text-left text-gray-700 hover:bg-gray-100 transition ${
//               currentView === view ? "bg-indigo-50 text-indigo-600 font-semibold border-r-4 border-indigo-600" : ""
//             }`}
//           >
//             <Icon className="w-5 h-5" />
//             <span>{label}</span>
//           </button>
//         ))}
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;

// src/components/layout/Sidebar.jsx
// import React from "react";
// import { LayoutDashboard, Package, ShoppingCart, Flag, X } from "lucide-react";

// const Navigation = ({ isOpen, setIsOpen, currentView, setCurrentView }) => {
//   const items = [
//     { view: "dashboard", label: "Dashboard", icon: LayoutDashboard },
//     { view: "products", label: "Catalog", icon: Package },
//     { view: "orders", label: "Orders", icon: ShoppingCart },
//     { view: "flagged", label: "Flagged Buyers", icon: Flag },
//   ];

//   return (
//     <>
//       {/* Overlay when menu open on mobile */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       {/* <aside
//         className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-50
//           ${isOpen ? "translate-x-0" : "-translate-x-full"}
//           lg:translate-x-0 lg:static lg:z-auto
//         `}
//       > */}

// <aside 
//       className={`fixed left-0 z-40 w-64 h-screen transition-transform 
//       ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
//       lg:translate-x-0 
//       bg-white border-r border-gray-200 
//       pt-20`} 
//     >
//         {/* Close button on mobile */}
//         <div className="flex justify-end p-4 lg:hidden">
//           <button
//             onClick={() => setIsOpen(false)}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//        <nav className="flex items-center space-x-6">

//           {items.map(({ view, label, icon: Icon }) => (
//             <button
//               key={view}
//               onClick={() => {
//                 setCurrentView(view);
//                 setIsOpen(false); // close on mobile after click
//               }}
//               className={`w-full flex items-center space-x-4 px-6 py-4 rounded-xl text-left transition-all mb-2
//                 ${
//                   currentView === view
//                     ? "bg-indigo-600 text-white shadow-lg font-semibold"
//                     : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
//                 }
//               `}
//             >
//               <Icon className="w-6 h-6" />
//               <span className="text-lg">{label}</span>
//             </button>
//           ))}
//         </nav>
//       </aside>
//     </>
//   );
// };

// export default Navigation;

import React from "react";
import { LayoutDashboard, Package, ShoppingCart, Flag, X } from "lucide-react";

const Navigation = ({ isOpen, setIsOpen, currentView, setCurrentView }) => {
  const items = [
    { view: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { view: "products", label: "Catalog", icon: Package },
    { view: "orders", label: "Orders", icon: ShoppingCart },
    { view: "flagged", label: "Flagged Buyers", icon: Flag },
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

      {/* Sidebar Component */}
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