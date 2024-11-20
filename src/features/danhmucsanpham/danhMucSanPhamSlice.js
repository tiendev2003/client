import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosConfig";

const initialState = {
  danhMucs: [],
  danhMuc: {},
  loading: false,
  error: null,
};
export const getDanhMucs = createAsyncThunk(
  "danhMucSanPham/getDanhMucs",
  async (  { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/dmSP`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createDanhMuc = createAsyncThunk(
  "danhMucSanPham/createDanhMuc",
  async (danhMucData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `dmSP/store`,
        danhMucData,
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

export const getDanhMucById = createAsyncThunk(
  "danhMucSanPham/getDanhMucById",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/dmSP/details/${data.idDanhMuc}`,
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

export const updateDanhMuc = createAsyncThunk(
  "danhMucSanPham/updateDanhMuc",
  async (data, { rejectWithValue }) => {
    try {
        console.log(data)
      const response = await axiosInstance.put(
        `/dmSP/update/${data.idDanhMuc}`,
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

export const deleteDanhMuc = createAsyncThunk(
  "danhMucSanPham/deleteDanhMuc",
  async (data, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/dmSP/delete/${data.idDanhMuc}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      return data.idDanhMuc;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const danhMucSanPhamSlice = createSlice({
  name: "danhMucSanPham",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDanhMucs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDanhMucs.fulfilled, (state, action) => {
        state.loading = false;
        state.danhMucs = action.payload.data;
      })
      .addCase(getDanhMucs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getDanhMucById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDanhMucById.fulfilled, (state, action) => {
        state.loading = false;
        state.danhMuc = action.payload;
      })
      .addCase(getDanhMucById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createDanhMuc.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDanhMuc.fulfilled, (state, action) => {
        state.loading = false;
        state.danhMucs.push(action.payload.data);
      })
      .addCase(createDanhMuc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateDanhMuc.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDanhMuc.fulfilled, (state, action) => {
        state.loading = false;
        state.danhMucs = state.danhMucs.map((danhMuc) =>
          danhMuc.id === action.payload.category.id ? action.payload.category : danhMuc
        );
      })
      .addCase(updateDanhMuc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteDanhMuc.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDanhMuc.fulfilled, (state, action) => {
        state.loading = false;
        state.danhMucs = state.danhMucs.filter(
          (danhMuc) => danhMuc.id !== action.payload
        );
      })
      .addCase(deleteDanhMuc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default danhMucSanPhamSlice.reducer;
