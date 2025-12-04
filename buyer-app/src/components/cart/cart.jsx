
import React from "react";

function groupBySeller(items = []) {
  return items.reduce((acc, item) => {
    const key = item.S_ID ?? "UNKNOWN_SELLER";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}

// function formatCurrency(value) {
//   try {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//       minimumFractionDigits: 0,
//     }).format(value);
//   } catch {
//     return `$${value}`;
//   }
// }

const Cart = ({
  CartArr,
  onRemoveItem,
  onRemoveSeller,
  onCompleteSellerOrder,
  getItemId = (item) => item.P_ID ?? `${item.S_ID}-${item.Product}-${item.Price}`,
}) => {
  const grouped = groupBySeller(CartArr);
  const sellerIds = Object.keys(grouped);

  if (sellerIds.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sellerIds.map((sellerId) => {
        const sellerItems = grouped[sellerId];
        const sellerSubtotal = sellerItems.reduce(
          (sum, item) => sum + (Number(item.Price) * Number(item.quantity) || 0),
          0
        );

        return (
          <div key={sellerId} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                Seller: <span className="text-indigo-600">{sellerId}</span>
              </h2>
            </div>

            <div className="divide-y">
              {sellerItems.map((item) => {
                const itemId = getItemId(item);
                const total = Number(item.Price) * Number(item.quantity);

                return (
                  <div
                    key={itemId}
                    className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                  >
                    <div>
                      <div className="font-medium text-gray-900">{item.Product}</div>
                      <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                      <div className="mt-2">
                        <button
                          className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100"
                          onClick={() => onRemoveItem?.(itemId)}
                          title="Remove this item"
                        >
                          Remove Item
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-gray-500">Total</div>
                      <div className="text-base font-semibold">
                        ${total}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <div className="text-sm text-gray-500">Seller Subtotal</div>
              <div className="text-lg font-semibold">
                ${sellerSubtotal}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {/* Complete Order for this seller */}
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                onClick={() =>
                  onCompleteSellerOrder?.(sellerId, sellerItems, sellerSubtotal)
                }
              >
                Complete Order
              </button>

              {/* Remove all items from this seller */}
              <button
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                onClick={() => onRemoveSeller?.(sellerId)}
              >
                Remove All from {sellerId}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cart
