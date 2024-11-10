import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

const initialState = {
  cuahangs: [],
  cuahangDetail: {},
  searchResult: [],
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

export const updateStore = createAsyncThunk(
  "shop/updateStore",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const response = await axiosClient.put(`/store/update/${data.id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// đóng băng cửa hàng
export const blockStore = createAsyncThunk(
  "shop/blockStore",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`/freezeStore/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// kích hoạt cửa hàng

export const activeStore = createAsyncThunk(
  "shop/activeStore",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`/unfreezeStore/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//  create store
export const createStore = createAsyncThunk(
  "shop/createStore",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`/create-store`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchStore = createAsyncThunk(
  "shop/searchStore",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`/search-cua-hang`, data);
      console.log(response.data);
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
      })
      .addCase(updateStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStore.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(blockStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(blockStore.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(blockStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(activeStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(activeStore.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(activeStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStore.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(searchStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchStore.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResult = action.payload.data;
        state.success = true;
      })
      .addCase(searchStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default shopSlice.reducer;
