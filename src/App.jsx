import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./pages/Home";
import OrderHistory from "./pages/OrderHistory";
import Products from "./pages/Products";
import { useEffect } from "react";
import { getProducts } from "./features/productsSlice";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Footer from "./components/footer";
import CheckoutForm from "./pages/CheckoutForm";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    if (!localStorage.getItem("cart_products")) {
      localStorage.setItem("cart_products", JSON.stringify([]));
    }
    if (!localStorage.getItem("order_list")) {
      localStorage.setItem("order_list", JSON.stringify([]));
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orderHistory" element={<OrderHistory />} />
        <Route path="/products" element={<Products />} />
        <Route path="/singleProduct/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutForm />} />

        <Route path="*" element="not found 404" />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
