import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosConfig";

export const fetchDanhMucQCs = createAsyncThunk(
  "danhmucqcs/fetchDanhMucQCs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/dmanhqc", {
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

export const createDanhMucQC = createAsyncThunk(
  "danhmucqcs/createDanhMucQC",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/dmanhqc", data, {
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

export const fetchDanhMucQCById = createAsyncThunk(
  "danhmucqcs/fetchDanhMucQCById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/dmanhqc/${id}`, {
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

export const updateDanhMucQC = createAsyncThunk(
  "danhmucqcs/updateDanhMucQC",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data)
      const response = await axiosInstance.put(`/dmanhqc/${data.id}`, data, {
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

export const deleteDanhMucQC = createAsyncThunk(
  "danhmucqcs/deleteDanhMucQC",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/dmanhqc/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  danhmucqcs: [],
  danhmucqc: null,
  loading: false,
  error: null,
};

const danhmucaqcSlice = createSlice({
  name: "danhmucaqc",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchDanhMucQCs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDanhMucQCs.fulfilled, (state, action) => {
      state.danhmucqcs = action.payload.data;
      state.loading = false;
    });
    builder.addCase(fetchDanhMucQCs.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(createDanhMucQC.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createDanhMucQC.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createDanhMucQC.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchDanhMucQCById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDanhMucQCById.fulfilled, (state, action) => {
      state.danhmucqc = action.payload.data;
      state.loading = false;
    });
    builder.addCase(fetchDanhMucQCById.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(updateDanhMucQC.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateDanhMucQC.fulfilled, (state, action) => {
      state.danhmucqcs = state.danhmucqcs.map((danhmucqc) =>
        danhmucqc.id === action.payload.id ? action.payload : danhmucqc
      );
      state.loading = false;
    });
    builder.addCase(updateDanhMucQC.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteDanhMucQC.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteDanhMucQC.fulfilled, (state, action) => {
      state.danhmucqcs = state.danhmucqcs.filter((danhmucqc) => danhmucqc.id !== action.payload);
      state.loading = false;
    });
    builder.addCase(deleteDanhMucQC.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default danhmucaqcSlice.reducer;
