import React from "react";
import { useState, useEffect } from "react";
import { removeSingleCartItem, clearCart } from "../helpers/cart";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  let getCart = () => {
    return JSON.parse(localStorage.getItem("cart_products")) || [];
  };
  let navigate = useNavigate();
  const [cartItems, setcartItems] = useState([]);
  useEffect(() => {
    setcartItems(getCart());
  }, []);

  return (
    <div className="bg-gray-100 h-content py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left font-semibold">Product</th>
                    <th className="text-left font-semibold">Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((product, index) => {
                    return (
                      <tr key={index}>
                        <td className="py-4">
                          <div className="flex items-center">
                            <img
                              className="h-16 w-16 mr-4"
                              src={product.product_photos[0]}
                              alt="Product image"
                            />
                            <span className="font-semibold">
                              {product.product_title}
                            </span>
                          </div>
                        </td>
                        <td className="py-4">
                          {product.typical_price_range
                            ? product.typical_price_range[0]
                            : "$60.00"}
                        </td>

                        <td
                          onClick={() => {
                            removeSingleCartItem(index);
                            setcartItems(getCart());
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>$19.99</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Taxes</span>
                <span>$1.99</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">$21.98</span>
              </div>

              <button
                onClick={() => {
                  navigate("/checkout");
                }}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
              >
                Checkout
              </button>

              <button
                onClick={() => {
                  clearCart();
                  setcartItems(getCart());
                }}
                disabled={cartItems.length === 0}
                className="bg-red-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
