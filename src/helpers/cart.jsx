export const addCartItem = (product) => {
  let products = JSON.parse(localStorage.getItem("cart_products"));
  if (!products) {
    products = [];
  }

  products.push(product);
  localStorage.setItem("cart_products", JSON.stringify(products));
};

export const removeSingleCartItem = (index) => {
  let products = JSON.parse(localStorage.getItem("cart_products"));

  products.splice(index, 1);

  localStorage.setItem("cart_products", JSON.stringify(products));
};

export const clearCart = function () {
  localStorage.setItem("cart_products", JSON.stringify([]));
};
