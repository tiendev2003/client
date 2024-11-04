import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../api/axiosConfig";
const baseURL = import.meta.env.VITE_API_BASE_URL;
const initialState = {
  booking: [],
  loading: false,
  error: null,
  bookingDetails: {},
};

export const bookTable = createAsyncThunk(
  "book/bookTable",
  async ({ id_Cuahang, id_Ban }, { rejectWithValue }) => {
    try {
      const data = {
        Cart: [
          {
            id_CuaHang: id_Cuahang,
            id_Ban: id_Ban,
          },
        ],
      };
      const response = await axios.post(`${baseURL}/setOrder-store`, data, {
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

export const historyBook = createAsyncThunk(
  "book/historyBook",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/setOrder-history", {
        headers: {
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

export const cancelBooking = createAsyncThunk(
  "bookings/cancelBooking",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/setOrder-cancel/id-don-db=${id}`);
      return id;
    } catch (error) {
      console.error("Failed to cancel booking", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBookingDetails = createAsyncThunk(
  "bookings/fetchBookingDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/setOrder-detail/${id}`,{
        headers: {
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

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bookTable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookTable.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload;
      })
      .addCase(bookTable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(historyBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(historyBook.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload.data;
      })
      .addCase(historyBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(cancelBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = state.bookings.filter(
          (booking) => booking.id_DonDatBan !== action.payload
        );
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        console.error("Failed to cancel booking", action.payload);
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBookingDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingDetails = action.payload;
      })
      .addCase(fetchBookingDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookSlice.reducer;
