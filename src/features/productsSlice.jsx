import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const URL = "https://fakestoreapi.com/products";
const options = {
  method: "GET",
  url: "https://real-time-product-search.p.rapidapi.com/search",
  params: {
    q: "Nike shoes",
    country: "us",
    language: "en",
    limit: "30",
    sort_by: "BEST_MATCH",
    product_condition: "ANY",
    min_rating: "ANY",
  },
  headers: {
    "x-rapidapi-key": "a3eb2719cfmshef19ce1681f4dcdp172284jsn003c7654d8a5",
    "x-rapidapi-host": "real-time-product-search.p.rapidapi.com",
  },
};

export const getProducts = createAsyncThunk("getProducts", async () => {
  try {
    const response = await axios.request(options);
    const data = await response.data.data;
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: true,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default productsSlice.reducer;
