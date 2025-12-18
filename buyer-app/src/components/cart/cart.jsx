
import React from "react";
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

function groupBySeller(items = []) {
  return items.reduce((acc, item) => {
    const sellerId = item.S_ID?._id?.toString() ?? "UNKNOWN_SELLER";
    if (!acc[sellerId]) acc[sellerId] = [];
    acc[sellerId].push(item);
    return acc;
  }, {});
}

const Cart = ({
  CartArr = [],
  onRemoveItem,
  onRemoveSeller,
  onCompleteSellerOrder,
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

        // seller email comes from populated S_ID object
        const sellerEmail =
          sellerItems[0]?.S_ID?.email ?? "Unknown seller";

        const sellerSubtotal = sellerItems.reduce(
          (sum, item) =>
            sum + (Number(item.price) * Number(item.quantity) || 0),
          0
        );

        return (
          <div key={sellerId} className="bg-white rounded-lg shadow p-6">
            {/* SELLER HEADER */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                Seller:{" "}
                <span className="text-indigo-600">{sellerEmail}</span>
              </h2>
            </div>

            {/* ITEMS */}
            <div className="divide-y">
              {sellerItems.map((item) => {
                const itemId = item._id; // ✅ correct Mongo ID
                const total =
                  Number(item.price) * Number(item.quantity);

                return (
                  <div
                    key={itemId}
                    className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                  >
                    <div>
                      <div className="font-medium text-gray-900">
                        {item.Product?.name ?? "Unknown product"}
                      </div>

                      <div className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </div>

                      <div className="mt-2">
                        <button
                          className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100"
                          onClick={() => onRemoveItem?.(itemId)}
                        >
                          Remove Item
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-gray-500">Total</div>
                      <div className="text-base font-semibold">
                        ${total.toFixed(2)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* SUBTOTAL */}
            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <div className="text-sm text-gray-500">Seller Subtotal</div>
              <div className="text-lg font-semibold">
                ${sellerSubtotal.toFixed(2)}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                onClick={() =>
                  onCompleteSellerOrder?.(sellerId, sellerItems)
                }
              >
                Complete Order
              </button>

              <button
                className="px-4 py-2 bg-red-200 text-red-600 rounded hover:bg-red-300"
                onClick={() => onRemoveSeller?.(sellerId)}
              >
                Remove All Items
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
