import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSingleProduct = createAsyncThunk(
  "getSingleProduct",
  async (url) => {
    try {
      let res = await axios.request(url);
      let product = res.data.data.product;
      return product;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  singleProduct: {},
  error: null,
  loading: true,
};

export const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSingleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default singleProductSlice.reducer;
