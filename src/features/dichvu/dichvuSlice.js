import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./../../api/axiosConfig";

const initialState = {
  dichvus: [],
  loading: false,
  dichvu: {},
  error: null,
};

export const getDichVu = createAsyncThunk(
  "dichvu/getDichVu",
  async ({ rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/dichvu/show", {
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

export const createDichVu = createAsyncThunk(
  "dichvu/createDichVu",
  async (dichVuData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/dichvu/store", dichVuData, {
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

export const getDichVuById = createAsyncThunk(
  "dichvu/getDichVuById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/dichvu/show-details/${id}`, {
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

export const updateDichVu = createAsyncThunk(
  "dichvu/updateDichVu",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const response = await axiosInstance.put(
        `/dichvu/update/${data.id}`,
        {
          Ten_DV: data.Ten_DV,
          TrangThai: data.TrangThai,
        },
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

export const deleteDichVu = createAsyncThunk(
  "dichvu/deleteDichVu",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/dichvu/delete/${id}`, {
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

const dichvuSlice = createSlice({
  name: "dichvu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDichVu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDichVu.fulfilled, (state, action) => {
        state.loading = false;
        state.dichvus = action.payload.data;
      })
      .addCase(getDichVu.rejected, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createDichVu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDichVu.fulfilled, (state, action) => {
        state.loading = false;
        state.dichvus.push(action.payload.data);
      })
      .addCase(createDichVu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getDichVuById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDichVuById.fulfilled, (state, action) => {
        state.loading = false;
        state.dichvu = action.payload.data;
      })
      .addCase(getDichVuById.rejected, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateDichVu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDichVu.fulfilled, (state, action) => {
        state.loading = false;
        state.dichvus = state.dichvus.map((dichvu) =>
          dichvu.id === action.payload.data.id ? action.payload.data : dichvu
        );
      })
      .addCase(updateDichVu.rejected, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteDichVu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDichVu.fulfilled, (state, action) => {
        state.loading = false;
        state.dichvus = state.dichvus.filter(
          (dichvu) => dichvu.id !== action.payload
        );
      })
      .addCase(deleteDichVu.rejected, (state) => {
        state.loading = false;
        state.error = null; 
      });
  },
});

export default dichvuSlice.reducer;
