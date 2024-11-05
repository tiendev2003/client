import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosConfig";

const initialState = {
  danhMucKhuyenMais: [],
  danhMucKhuyenMai: {},
  loading: false,
  error: null,
};
export const getDanhMucKhuyenMai = createAsyncThunk(
  "danhMucKhuyenMai/getDanhMucs",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/dmctkm/${id}`, {
        headers: {
          "Content-Type": "application/json",
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

export const createDanhMuc = createAsyncThunk(
  "danhMucKhuyenMai/createDanhMuc",
  async (danhMucData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/dmctkm/store/${danhMucData.id}`,
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

export const updateDanhMuc = createAsyncThunk(
  "danhMucKhuyenMai/updateDanhMuc",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/dmctkm/update/${data.id}/${data.idDanhMuc}`,
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
  "danhMucKhuyenMai/deleteDanhMuc",
  async (data, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/dmctkm/delete/${data.id}/${data.idDanhMuc}`, {
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

export const getDanhMucById = createAsyncThunk(
  "danhMucKhuyenMai/getDanhMucById",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/dmctkm/update/${data.id}/${data.idDanhMuc}`, {
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


const danhMucKhuyenMaiSlice = createSlice({
  name: "danhMucKhuyenMai",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDanhMucKhuyenMai.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDanhMucKhuyenMai.fulfilled, (state, action) => {
        state.loading = false;
        state.danhMucKhuyenMais = action.payload.data;
      })
      .addCase(getDanhMucKhuyenMai.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getDanhMucById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDanhMucById.fulfilled, (state, action) => {
        state.loading = false;
        state.danhMucKhuyenMai = action.payload.data;
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
        state.danhMucKhuyenMais.push(action.payload.data);
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
        state.danhMucKhuyenMais = state.danhMucKhuyenMais.map((danhMuc) =>
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
        state.danhMucKhuyenMais = state.danhMucKhuyenMais.filter(
          (danhMuc) => danhMuc.id !== action.payload
        );
      })
      .addCase(deleteDanhMuc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default danhMucKhuyenMaiSlice.reducer;
