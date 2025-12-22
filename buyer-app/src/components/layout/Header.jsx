// import React from 'react';
// import { ShoppingBag } from 'lucide-react';

// const Header = ({ handleLogout, islogged }) => {
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await handleLogout();
//   };

//   return (
//     <header className="bg-white shadow-sm border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

//         <div className="flex items-center space-x-3">
//           <ShoppingBag className="w-8 h-8 text-indigo-600" />
//           <div>
//             <h1 className="text-xl font-bold text-gray-900">Buyer Dashboard</h1>
//             <p className="text-sm text-gray-600">Manage your marketplace</p>
//           </div>
//         </div>

//         <div className="flex items-center space-x-3">
//           {islogged && (
//             <button
//               onClick={handleSubmit}
//               className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//             >
//               Logout
//             </button>
//           )}
//         </div>

//       </div>
//     </header>
//   );
// };

// export default Header;
// import React, { useState, useEffect } from 'react';
// import { 
//   ShoppingBag, 
//   LogOut, 
//   User, 
//   Bell, 
//   Search,
//   ChevronDown,
//   Settings,
//   ShoppingCart,
//   Heart
// } from 'lucide-react';

// const Header = ({ handleLogout, islogged }) => {
//   const [buyerName, setBuyerName] = useState('Buyer');
//   const [buyerInitial, setBuyerInitial] = useState('B');
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [notifications, setNotifications] = useState(3); // Example count

//   useEffect(() => {
//     // Fetch buyer name from API or localStorage
//     const fetchBuyerInfo = async () => {
//       if (!islogged) return;

//       try {
//         // Try to get from localStorage first
//         const userData = localStorage.getItem('buyerData');
//         if (userData) {
//           const parsedData = JSON.parse(userData);
//           const name = parsedData.username || parsedData.email?.split('@')[0] || 'Buyer';
//           setBuyerName(name);
//           setBuyerInitial(name.charAt(0).toUpperCase());
//         } else {
//           // If not in localStorage, fetch from API
//           // This should match your buyer profile endpoint
//           const token = localStorage.getItem('token');
//           if (token) {
//             const response = await fetch('http://localhost:5000/api/buyers/profile', {
//               headers: { Authorization: `Bearer ${token}` },
//             });
            
//             if (response.ok) {
//               const data = await response.json();
//               const name = data.username || data.email?.split('@')[0] || 'Buyer';
//               setBuyerName(name);
//               setBuyerInitial(name.charAt(0).toUpperCase());
//               localStorage.setItem('buyerData', JSON.stringify(data));
//             }
//           }
//         }
//       } catch (error) {
//         console.error('Failed to fetch buyer info:', error);
//       }
//     };

//     fetchBuyerInfo();
//   }, [islogged]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await handleLogout();
//   };

//   // Navigation handlers
//   const navigateToCart = () => {
//     window.location.href = '/cart';
//   };

//   const navigateToProfile = () => {
//     // Could navigate to a profile page if you have one
//     // window.location.href = '/profile';
//   };

//   if (!islogged) {
//     return (
//       <header className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <ShoppingBag className="w-8 h-8 text-white" />
//             <div>
//               <h1 className="text-xl font-bold text-white">Marketplace</h1>
//               <p className="text-sm text-blue-100">Welcome to our marketplace</p>
//             </div>
//           </div>
//         </div>
//       </header>
//     );
//   }

//   return (
//     <header className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-6 py-4">
//         <div className="flex items-center justify-between">
//           {/* Left Section - Logo & Brand */}
//           <div className="flex items-center space-x-4">
//             <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
//               <ShoppingBag className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-white">Marketplace Hub</h1>
//               <p className="text-sm text-blue-100">Welcome back, {buyerName}!</p>
//             </div>
//           </div>

//           {/* Center Section - Search */}
//           <div className="hidden md:flex flex-1 max-w-xl mx-8">
//             <div className="relative w-full">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search className="w-5 h-5 text-blue-300" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search products, sellers, or categories..."
//                 className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-blue-400/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
//               />
//             </div>
//           </div>

//           {/* Right Section - Actions */}
//           <div className="flex items-center space-x-4">
//             {/* Quick Actions */}
//             <div className="hidden md:flex items-center space-x-2">
//               <button 
//                 onClick={navigateToCart}
//                 className="p-2 rounded-xl hover:bg-white/10 transition-colors relative"
//                 title="Cart"
//               >
//                 <ShoppingCart className="w-5 h-5 text-white" />
//                 <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-xs rounded-full flex items-center justify-center">
//                   2
//                 </span>
//               </button>
              
//               <button 
//                 className="p-2 rounded-xl hover:bg-white/10 transition-colors"
//                 title="Wishlist"
//               >
//                 <Heart className="w-5 h-5 text-white" />
//               </button>
              
//               <button className="p-2 rounded-xl hover:bg-white/10 transition-colors relative">
//                 <Bell className="w-5 h-5 text-white" />
//                 {notifications > 0 && (
//                   <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-xs rounded-full flex items-center justify-center">
//                     {notifications}
//                   </span>
//                 )}
//               </button>
//             </div>

//             {/* Profile Dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowDropdown(!showDropdown)}
//                 className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl px-4 py-2 transition-all duration-200"
//               >
//                 <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
//                   {buyerInitial}
//                 </div>
//                 <div className="hidden md:block text-left">
//                   <p className="text-sm font-semibold text-white">{buyerName}</p>
//                   <p className="text-xs text-blue-100">Buyer Account</p>
//                 </div>
//                 <ChevronDown className={`w-4 h-4 text-white transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
//               </button>

//               {/* Dropdown Menu */}
//               {showDropdown && (
//                 <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-fadeIn">
//                   <div className="p-4 border-b border-gray-100">
//                     <div className="flex items-center space-x-3">
//                       <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
//                         {buyerInitial}
//                       </div>
//                       <div>
//                         <p className="font-semibold text-gray-900">{buyerName}</p>
//                         <p className="text-sm text-gray-500">Buyer Account</p>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="p-2">
//                     <button 
//                       onClick={navigateToProfile}
//                       className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
//                     >
//                       <User className="w-4 h-4" />
//                       <span>My Profile</span>
//                     </button>
                    
//                     <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors">
//                       <Settings className="w-4 h-4" />
//                       <span>Account Settings</span>
//                     </button>
                    
//                     <div className="my-2 border-t border-gray-100"></div>
                    
//                     <button 
//                       onClick={handleSubmit}
//                       className="w-full flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                     >
//                       <LogOut className="w-4 h-4" />
//                       <span>Logout</span>
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Mobile Search */}
//         <div className="md:hidden mt-4">
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search className="w-5 h-5 text-blue-300" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search..."
//               className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-blue-400/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
//             />
//           </div>
//         </div>

//         {/* Mobile Quick Actions */}
//         <div className="md:hidden flex items-center justify-around mt-4 pt-4 border-t border-blue-500/30">
//           <button 
//             onClick={navigateToCart}
//             className="flex flex-col items-center space-y-1 p-2"
//           >
//             <div className="relative">
//               <ShoppingCart className="w-5 h-5 text-white" />
//               <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-xs rounded-full flex items-center justify-center">
//                 2
//               </span>
//             </div>
//             <span className="text-xs text-blue-100">Cart</span>
//           </button>
          
//           <button className="flex flex-col items-center space-y-1 p-2">
//             <Bell className="w-5 h-5 text-white" />
//             {notifications > 0 && (
//               <span className="absolute -top-0 -right-0 w-4 h-4 bg-red-500 text-xs rounded-full flex items-center justify-center mt-1">
//                 {notifications}
//               </span>
//             )}
//             <span className="text-xs text-blue-100">Alerts</span>
//           </button>
          
//           <button className="flex flex-col items-center space-y-1 p-2">
//             <Heart className="w-5 h-5 text-white" />
//             <span className="text-xs text-blue-100">Wishlist</span>
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import { 
  ShoppingBag, 
  LogOut, 
  Bell, 
  Search,
  ChevronDown,
  Settings,
  ShoppingCart,
  Heart,
  LayoutDashboard,
  ShoppingBasket
} from 'lucide-react';

const Header = ({ handleLogout, islogged, buyerName: propBuyerName }) => {
  const navigate = useNavigate(); // Add this hook
  const [buyerName, setBuyerName] = useState(propBuyerName || 'Buyer');
  const [buyerInitial, setBuyerInitial] = useState('B');
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState(3);

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

          {/* Center Section - Search */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-blue-300" />
              </div>
              <input
                type="text"
                placeholder="Search products, sellers, or categories..."
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-blue-400/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
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
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-xs rounded-full flex items-center justify-center">
                  2
                </span>
              </button>
              
              <button 
                onClick={navigateToCategories}
                className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                title="Categories"
              >
                <ShoppingBasket className="w-5 h-5 text-white" />
              </button>
              
              <button className="p-2 rounded-xl hover:bg-white/10 transition-colors relative">
                <Bell className="w-5 h-5 text-white" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
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

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-blue-300" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-blue-400/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
            />
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
          
          <button className="flex flex-col items-center space-y-1 p-2">
            <Bell className="w-5 h-5 text-white" />
            {notifications > 0 && (
              <span className="absolute -top-0 -right-0 w-4 h-4 bg-red-500 text-xs rounded-full flex items-center justify-center mt-1">
                {notifications}
              </span>
            )}
            <span className="text-xs text-blue-100">Alerts</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;