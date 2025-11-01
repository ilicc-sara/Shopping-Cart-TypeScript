import { useState } from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

function ShoppingCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-5 text-white bg-[#1e1e1e] rounded-lg w-[400px]">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty 🛒</p>
      ) : (
        <ul className="space-y-2">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between items-center">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-400 hover:text-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 font-semibold">Total: ${total.toFixed(2)}</div>
      <button
        onClick={() =>
          addToCart({ id: 1, name: "Example Item", price: 19.99, quantity: 1 })
        }
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Add Example Item
      </button>
    </div>
  );
}

export default ShoppingCart;
