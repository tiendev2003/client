import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

const initialState = {
  cuahangs: [],
  cuahangDetail: {},
  loading: false,
  error: null,
  success: false,
};
export const fetchCuahangs = createAsyncThunk(
  "shop/fetchCuahangs",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/store");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCuahangDetail = createAsyncThunk(
  "shop/fetchCuahangDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/store-details/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCuahangs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCuahangs.fulfilled, (state, action) => {
        state.loading = false;
        state.cuahangs = action.payload.data;
        state.success = true;
      })
      .addCase(fetchCuahangs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCuahangDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCuahangDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.cuahangDetail = action.payload.data;
        state.success = true;
      })
      .addCase(fetchCuahangDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default shopSlice.reducer;
