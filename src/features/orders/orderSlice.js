import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosConfig";

const initialState = {
  orders: [],
  order: {},
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/getAllOrder/${data}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const detailOrder = createAsyncThunk(
  "order/detailOrder",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/setOrder-detail/${data}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateStatusOrder = createAsyncThunk(
  "order/updateStatusOrder",
  async (data, { rejectWithValue }) => {
    try {
      await axiosInstance.put(`/setOrder-confirm/${data}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      return data;
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
        state.orders = action.payload.data;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.loading = false;
      })
      .addCase(detailOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(detailOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(detailOrder.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateStatusOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStatusOrder.fulfilled, (state, action) => {
        state.loading = false;
        // remove order by id
        state.orders = state.orders.filter(
          (order) => order.id !== action.payload
        );
      })
      .addCase(updateStatusOrder.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default orderSlice.reducer;
