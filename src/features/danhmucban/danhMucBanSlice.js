import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosConfig";

const initialState = {
  danhMucs: [],
  danhMuc: null,
  loading: false,
  error: null,
};
export const getDanhMucs = createAsyncThunk(
  "danhMucBan/getDanhMucs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/dmban", {
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

export const getDanhMucById = createAsyncThunk(
  "danhMucBan/getDanhMucById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/dmban/show/${id}`, {
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

export const createDanhMuc = createAsyncThunk(
  "danhMucBan/createDanhMuc",
  async (danhMucData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/dmban/store", danhMucData, {
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

export const updateDanhMuc = createAsyncThunk(
  "danhMucBan/updateDanhMuc",
  async ({ id, ...danhMucData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/dmban/update/${id}`,
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

export const deleteDanhMuc = createAsyncThunk(
  "danhMucBan/deleteDanhMuc",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/dmban/delete/${id}`, {
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

const danhMucBanSlice = createSlice({
  name: "danhMucBan",
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
          danhMuc.id === action.payload.data.id ? action.payload.data : danhMuc
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
      })
      .addCase(getDanhMucById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDanhMucById.fulfilled, (state, action) => {
        state.loading = false;
        state.danhMuc = action.payload.data;
      })
      .addCase(getDanhMucById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default danhMucBanSlice.reducer;
