import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosConfig";

const intialState = {
  danhgia: [],
  loading: false,
  error: null,
};

export const createDanhgia = createAsyncThunk(
  "danhgia/createDanhgia",
  async (data, { rejectWithValue }) => {
    try {
      // data là form data
      // lấy id của sản phẩm từ data
      const id = data.get("id");

      const response = await axiosInstance.post(`/comment/${id}`, data, {
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

export const updateDanhGia = createAsyncThunk(
  "danhgia/updateDanhGia",
  async (data, { rejectWithValue }) => {
    try {
      const id = data.get("id");
      const response = await axiosInstance.patch(
        `/comment/${id}`,
        data,
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

export const deleteDanhGia = createAsyncThunk(
  "danhgia/deleteDanhGia",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/comment/${id}`, {
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

const danhgiaSlice = createSlice({
  name: "danhgia",
  initialState: intialState,
  extraReducers: (builder) => {
    builder
      .addCase(createDanhgia.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDanhgia.fulfilled, (state, action) => {
        state.danhgia = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(createDanhgia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateDanhGia.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDanhGia.fulfilled, (state, action) => {
        state.danhgia = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateDanhGia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteDanhGia.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDanhGia.fulfilled, (state, action) => {
        state.danhgia = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteDanhGia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default danhgiaSlice.reducer;
