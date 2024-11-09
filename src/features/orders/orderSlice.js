import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosConfig";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async ({ rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/numberOfInvoice-cuahang/getAll",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data.statistics_per_store;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default orderSlice.reducer;
