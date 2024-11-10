import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosConfig";

export const createDMA = createAsyncThunk(
  "dma/createDMA",
  async (dmaData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/dmHinhAnh/store", dmaData, {
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

export const fetchDMA = createAsyncThunk(
  "dma/fetchDMA",
  async ({ rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/dmHinhAnh", {
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

export const fetchDMAById = createAsyncThunk(
  "dma/fetchDMAById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/dmHinhAnh/details/${id}`, {
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

export const updateDMA = createAsyncThunk(
  "dma/updateDMA",
  async (dmaData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/dmHinhAnh/update/${dmaData.id}`,
        dmaData,
        {
          headers: {
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

export const deleteDMA = createAsyncThunk(
  "dma/deleteDMA",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/dmHinhAnh/delete/${id}`, {
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

const dmaSlice = createSlice({
  name: "dma",
  initialState: {
    danhmucAnhs: [],
    danhmucanh: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDMA.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createDMA.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.danhmucAnhs = action.payload.data;
      })
      .addCase(createDMA.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchDMA.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDMA.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.danhmucAnhs = action.payload.data;
      })
      .addCase(fetchDMA.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchDMAById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDMAById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.danhmucanh = action.payload.data;
      })
      .addCase(fetchDMAById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateDMA.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateDMA.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.danhmucanh = action.payload.data;
      })
      .addCase(updateDMA.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteDMA.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteDMA.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.danhmucAnhs = state.danhmucAnhs.filter(
          (dma) => dma.id !== action.payload
        );
      })
      .addCase(deleteDMA.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default dmaSlice.reducer;
