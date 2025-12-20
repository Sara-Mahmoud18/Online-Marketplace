export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed left-0 top-0 p-6">
      <h2 className="text-2xl font-bold mb-6">Seller Panel</h2>

      <ul className="space-y-4">
        <li className="cursor-pointer hover:bg-gray-700 p-3 rounded">Dashboard</li>
        <li className="cursor-pointer hover:bg-gray-700 p-3 rounded">Add Product</li>
        <li className="cursor-pointer hover:bg-gray-700 p-3 rounded">Manage Products</li>
        <li className="cursor-pointer hover:bg-gray-700 p-3 rounded">Orders</li>
        <li className="cursor-pointer hover:bg-gray-700 p-3 rounded">Flags</li>
      </ul>
    </div>
  );
}
