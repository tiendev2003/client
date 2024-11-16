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
      const response = await axiosInstance.get(`/getAllOrder`, {
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
      const response = await axiosInstance.get(`/details-invoice/${data}`, {
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

// xuát hóa đơn

export const exportBill = createAsyncThunk(
  "order/exportBill",
  async (data, { rejectWithValue }) => {
    try {
      await axiosInstance.post(`/create-invoice/${data.id}`, data, {
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


export const addSanPhamToOrder = createAsyncThunk(
  "order/addSanPhamToOrder",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data)
      await axiosInstance.post(`/setOrder-addproduct/${data.id}`, data, {
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

export const  completeOrder = createAsyncThunk(
  "order/completeOrder",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.put(`/setOrder-finish/${id}`,  {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      return id;
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
        state.order = action.payload.invoice;
      })
      .addCase(detailOrder.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateStatusOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStatusOrder.fulfilled, (state) => {
        state.loading = false;
       
      })
      .addCase(updateStatusOrder.rejected, (state) => {
        state.loading = false;
      })
      .addCase(exportBill.pending, (state) => {
        state.loading = true;
      })
      .addCase(exportBill.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(exportBill.rejected, (state) => {
        state.loading = false;
      })
  },
});

export default orderSlice.reducer;
