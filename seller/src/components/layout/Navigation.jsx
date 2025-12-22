// // import React from "react";
// // import { LayoutDashboard, Package, ShoppingCart, Flag, User, X } from "lucide-react"; 

// // const Navigation = ({ isOpen, setIsOpen, currentView, setCurrentView }) => {
// //   const items = [
// //     { view: "dashboard", label: "Dashboard", icon: LayoutDashboard },
// //     { view: "products", label: "Catalog", icon: Package },
// //     { view: "orders", label: "Orders", icon: ShoppingCart },
// //     { view: "flagged", label: "Flagged Buyers", icon: Flag },
// //     { view: "profile", label: "Profile", icon: User }, 
// //   ];

// //   return (
// //     <>
// //       {/* Overlay when menu open on mobile */}
// //       {isOpen && (
// //         <div
// //           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
// //           onClick={() => setIsOpen(false)}
// //         />
// //       )}

// //       <aside
// //         className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out
// //           bg-white border-r border-gray-200 
// //           ${isOpen ? "translate-x-0" : "-translate-x-full"} 
// //           lg:translate-x-0 
// //           pt-24
// //         `}
// //       >
// //         {/* Close button (Mobile Only) */}
// //         <div className="flex justify-end px-4 mb-4 lg:hidden">
// //           <button
// //             onClick={() => setIsOpen(false)}
// //             className="text-gray-500 hover:text-gray-700 p-2"
// //           >
// //             <X className="w-6 h-6" />
// //           </button>
// //         </div>

// //         {/* Navigation Links - Vertical Layout */}
// //         <nav className="px-4 space-y-2">
// //           {items.map(({ view, label, icon: Icon }) => (
// //             <button
// //               key={view}
// //               onClick={() => {
// //                 setCurrentView(view);
// //                 setIsOpen(false); // Close menu on mobile when item clicked
// //               }}
// //               className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200
// //                 ${
// //                   currentView === view
// //                     ? "bg-indigo-600 text-white shadow-md font-medium"
// //                     : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
// //                 }
// //               `}
// //             >
// //               <Icon className="w-5 h-5" />
// //               <span className="text-base">{label}</span>
// //             </button>
// //           ))}
// //         </nav>
// //       </aside>
// //     </>
// //   );
// // };

// // export default Navigation;
// import React from "react";
// import { LayoutDashboard, Package, ShoppingCart, Flag, User, X } from "lucide-react"; 

// const Navigation = ({ isOpen, setIsOpen, currentView, setCurrentView }) => {
//   const items = [
//     { view: "dashboard", label: "Dashboard", icon: LayoutDashboard },
//     { view: "products", label: "Catalog", icon: Package },
//     { view: "orders", label: "Orders", icon: ShoppingCart },
//     { view: "flagged", label: "Flagged Buyers", icon: Flag },
//     { view: "profile", label: "Profile", icon: User }, 
//   ];

//   return (
//     <>
//       {/* Overlay when menu open */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       <aside
//         className={`fixed top-0 left-0 z-50 w-72 h-screen transition-all duration-300 ease-in-out
//           bg-white shadow-2xl border-r border-slate-200
//           ${isOpen ? "translate-x-0" : "-translate-x-full"}
//         `}
//       >
//         {/* Sidebar Header - Matches main header height */}
//         <div className="h-[73px] flex items-center justify-between px-6 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-purple-50">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200">
//               <Package className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <h2 className="text-slate-800 font-bold text-base">SellerHub</h2>
//               <p className="text-slate-500 text-xs">Navigation</p>
//             </div>
//           </div>
          
//           {/* Close button */}
//           <button
//             onClick={() => setIsOpen(false)}
//             className="text-slate-500 hover:text-slate-800 hover:bg-white p-2 rounded-lg transition-all duration-200"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Navigation Links */}
//         <nav className="px-4 py-6 space-y-2">
//           {items.map(({ view, label, icon: Icon }) => (
//             <button
//               key={view}
//               onClick={() => {
//                 setCurrentView(view);
//                 setIsOpen(false);
//               }}
//               className={`group w-full flex items-center space-x-4 px-4 py-3.5 rounded-xl transition-all duration-200 relative overflow-hidden
//                 ${
//                   currentView === view
//                     ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-200"
//                     : "text-slate-600 hover:text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50"
//                 }
//               `}
//             >
//               {/* Active indicator line */}
//               {currentView === view && (
//                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full shadow-lg" />
//               )}
              
//               <div className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200
//                 ${
//                   currentView === view
//                     ? "bg-white/20"
//                     : "bg-slate-100 group-hover:bg-indigo-100"
//                 }
//               `}>
//                 <Icon className="w-5 h-5" />
//               </div>
//               <span className="text-base font-medium">{label}</span>
              
//               {/* Subtle shine effect on hover */}
//               {currentView !== view && (
//                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%]" />
//               )}
//             </button>
//           ))}
//         </nav>

//         {/* Bottom Account Info */}
//         <div className="absolute bottom-0 left-0 right-0 p-6">
//           <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-4 shadow-sm">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-200">
//                 S
//               </div>
//               <div>
//                 <p className="text-slate-800 text-sm font-semibold">Seller Account</p>
//                 <p className="text-slate-500 text-xs">Premium Member</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Navigation;
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
      {/* Overlay when menu open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 w-72 h-screen transition-all duration-300 ease-in-out
          bg-white shadow-2xl border-r border-slate-200
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Sidebar Header - Matches main header height */}
        <div className="h-[73px] flex items-center justify-between px-6 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-slate-800 font-bold text-base">SellerHub</h2>
              <p className="text-slate-500 text-xs">Navigation</p>
            </div>
          </div>
          
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-500 hover:text-slate-800 hover:bg-white p-2 rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="px-4 py-6 space-y-2">
          {items.map(({ view, label, icon: Icon }) => (
            <button
              key={view}
              onClick={() => {
                setCurrentView(view);
                setIsOpen(false);
              }}
              className={`group w-full flex items-center space-x-4 px-4 py-3.5 rounded-xl transition-all duration-200 relative overflow-hidden
                ${
                  currentView === view
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-200"
                    : "text-slate-600 hover:text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50"
                }
              `}
            >
              {/* Active indicator line */}
              {currentView === view && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full shadow-lg" />
              )}
              
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200
                ${
                  currentView === view
                    ? "bg-white/20"
                    : "bg-slate-100 group-hover:bg-indigo-100"
                }
              `}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-base font-medium">{label}</span>
              
              {/* Subtle shine effect on hover */}
              {currentView !== view && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%]" />
              )}
            </button>
          ))}
        </nav>

        {/* Bottom Account Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-200">
                S
              </div>
              <div>
                <p className="text-slate-800 text-sm font-semibold">Seller Account</p>
                <p className="text-slate-500 text-xs">Premium Member</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navigation;