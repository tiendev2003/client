import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosConfig";

const initialState = {
  banners: [],
  banner: {},
  loading: false,
  error: null,
};

export const fetchBanners = createAsyncThunk(
  "banner/fetchBanners",
  async ({ rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/anhquangcao", {
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

export const createBanners = createAsyncThunk(
  "banner/createBanner",
  async (data, { rejectWithValue }) => {
    console.log(JSON.stringify(data));
    try {
      const response = await axiosInstance.post("/anhquangcao", data, {
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

export const updateBanners = createAsyncThunk(
  "banner/updateBanner",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/anhquangcao/${data.id}`,
        data,
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

export const deleteBanners = createAsyncThunk(
  "banner/deleteBanner",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/anhquangcao/${id}`, {
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

export const fetchBannerById = createAsyncThunk(
  "banner/fetchBannerById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/anhquangcao/${id}`, {
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

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload.data;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createBanners.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateBanners.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteBanners.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = state.banners.filter(
          (banner) => banner.id !== action.payload.data.id
        );
      })
      .addCase(deleteBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchBannerById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchBannerById.fulfilled, (state, action) => {
        state.loading = false;
        state.banner = action.payload.data;
      })
      .addCase(fetchBannerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default bannerSlice.reducer;
