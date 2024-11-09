import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./../../api/axiosConfig";
const initialState = {
  banforstores: [],
  banforstore: null,
  loading: false,
  error: null,
};

export const getBanForStore = createAsyncThunk(
  "banforstore/getBanForStore",
  async ({ rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/ban", {
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

export const createBanForStore = createAsyncThunk(
  "banforstore/createBanForStore",
  async (banForStoreData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/ban/store",
        banForStoreData,
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

export const getBanForStoreById = createAsyncThunk(
  "banforstore/getBanForStoreById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/ban/show/${id}`,
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

export const updateBanForStore = createAsyncThunk(
  "banforstore/updateBanForStore",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/ban/update/${data.id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteBanForStore = createAsyncThunk(
  "banforstore/deleteBanForStore",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/ban/delete/${id}`, {
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

const banforstoreSlice = createSlice({
  name: "banforstore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBanForStore.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBanForStore.fulfilled, (state, action) => {
        state.loading = false;
        state.banforstores = action.payload;
      })
      .addCase(getBanForStore.rejected, (state) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(createBanForStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBanForStore.fulfilled, (state, action) => {
        state.loading = false;
        state.banforstores.push(action.payload.data);
      })
      .addCase(createBanForStore.rejected, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getBanForStoreById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBanForStoreById.fulfilled, (state, action) => {
        state.loading = false;
        state.banforstore = action.payload.data;
      })
      .addCase(getBanForStoreById.rejected, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateBanForStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBanForStore.fulfilled, (state, action) => {
        state.loading = false;
        state.banforstore = action.payload;
      })
      .addCase(updateBanForStore.rejected, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteBanForStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBanForStore.fulfilled, (state, action) => {
        state.loading = false;
        state.banforstores = state.banforstores.filter(
          (banforstore) => banforstore.id !== action.payload
        );
      })
      .addCase(deleteBanForStore.rejected, (state) => {
        state.loading = false;
        state.error = null;
      });
  },
});

export default banforstoreSlice.reducer;
