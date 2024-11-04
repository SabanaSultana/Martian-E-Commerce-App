import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../Redux/CartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate("/")}
          className="text-gray-700 dark:text-white font-semibold text-sm sm:text-base"
        >
          ← Back
        </button>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 flex-grow text-center">
          Cart Items
        </h2>
        <div className="w-6 sm:w-12"></div>
      </div>

      {cartItems.length > 0 ? (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-100"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded mb-3 sm:mb-0"
              />
              <div className="flex-1 text-center sm:text-left px-4">
                <h3 className="text-sm sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                  ${item.price.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => dispatch(remove(item.id))}
                className="bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm font-medium py-1 px-3 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-4 text-lg sm:text-2xl">
          Your cart is empty.
        </p>
      )}
    </div>
  );
};

export default Cart;
