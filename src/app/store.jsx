import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../features/productsSlice";
import SingleProductSlice from "../features/SingleProductSlice";
export const store = configureStore({
  reducer: {
    products: productsSlice,
    singleProduct: SingleProductSlice,
  },
});
