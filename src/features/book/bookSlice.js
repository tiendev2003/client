import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

export const bookTable = createAsyncThunk(
  "booking/bookTable",
  async ({ id_CuaHang, id_Ban, token }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(
        "/setOrder-store",
        {
          Cart: [{ id_CuaHang, id_Ban }],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);
const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bookTable.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(bookTable.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(bookTable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookingSlice.reducer;
