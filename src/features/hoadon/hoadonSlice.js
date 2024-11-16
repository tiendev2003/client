import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosConfig";

const initialState = {
  hoadon: [],
  hoadons: [],
  loading: false,
  error: null,
};

export const fetchHoadon = createAsyncThunk(
  "hoadon/fetchHoadon",
  async ({ rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/listOfInvoice-store/getAll",
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

// fetch id
export const fetchHoadonId = createAsyncThunk(
  "hoadon/fetchHoadonId",
  async ({ id, rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/search-invoice/${id}`,
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


const hoadonSlice = createSlice({
  name: "hoadon",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchHoadon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHoadon.fulfilled, (state, action) => {
        state.loading = false;
        state.hoadon = action.payload.data.statistics_per_store;
      })
      .addCase(fetchHoadon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchHoadonId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHoadonId.fulfilled, (state, action) => {
        state.loading = false;
        state.hoadons = action.payload.data;
      })
      .addCase(fetchHoadonId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default hoadonSlice.reducer;
