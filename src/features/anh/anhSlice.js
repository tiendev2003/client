import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosConfig";

const initialState = {
  anhs: [],
  status: "idle",
  error: null,
  loading: false,
  anh: {},
};

// get all anh
export const fetchAnh = createAsyncThunk(
  "anh/fetchAnh",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/HinhAnh/${id}`, {
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

// get anh by id
export const fetchAnhById = createAsyncThunk(
  "anh/fetchAnhById",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/HinhAnh/details/${data.cuahang}/${data.id}`,
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

// create anh

export const createAnh = createAsyncThunk(
  "anh/createAnh",
  async (anhData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/HinhAnh/store", anhData, {
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

// update anh

export const updateAnh = createAsyncThunk(
  "anh/updateAnh",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/HinhAnh/update/${data.cuahang}/${data.id}`,
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

// delete anh

export const deleteAnh = createAsyncThunk(
  "anh/deleteAnh",
  async (data, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/HinhAnh/delete/${data.id}/${data.cuahang}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      return data.id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const anhSlice = createSlice({
  name: "anh",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnh.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAnh.fulfilled, (state, action) => {
        state.status = "success";
        state.anhs = action.payload;
      })
      .addCase(fetchAnh.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchAnhById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAnhById.fulfilled, (state, action) => {
        state.status = "success";
        state.anh = action.payload;
      })
      .addCase(fetchAnhById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createAnh.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createAnh.fulfilled, (state, action) => {
        state.status = "success";
        state.anhs = action.payload;
      })
      .addCase(createAnh.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateAnh.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAnh.fulfilled, (state, action) => {
        state.status = "success";
        //    remove anh by id
        state.anhs = state.anhs.filter((anh) => anh.id !== action.payload.id);
      })
      .addCase(updateAnh.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteAnh.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteAnh.fulfilled, (state, action) => {
        state.status = "success";
        state.anhs = action.payload;
      })
      .addCase(deleteAnh.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default anhSlice.reducer;
