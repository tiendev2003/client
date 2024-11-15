import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosConfig";

const initialState = {
  banners: [],
  loading: false,
  error: null,
};

export const fetchBanners = createAsyncThunk(
  "banner/fetchBanners",
  async ({ rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/get-image-for-admin", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const bannerSlice = createSlice({
  name: "banner",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload.data;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default bannerSlice.reducer;