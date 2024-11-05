import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosConfig";

const initialState = {
  ctkms: [],
  loading: false,
  error: null,
};
export const getCTKMs = createAsyncThunk(
  "ctkm/getCTKMs",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/ctkm/${id}`, {
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

export const createCTKM = createAsyncThunk(
  "ctkm/createCTKM",
  async (ctkmData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/ctkm/store/${ctkmData.id}`,
        ctkmData,
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

export const updateCTKM = createAsyncThunk(
  "ctkm/updateCTKM",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/ctkm/update/${data.id}/${data.idCtkm}`,
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

export const deleteCTKM = createAsyncThunk(
  "ctkm/deleteCTKM",
  async (data, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/ctkm/delete/${data.id}/${data.idCtkm}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      return data.idCtkm;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const ctkmSlice = createSlice({
  name: "ctkm",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCTKMs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCTKMs.fulfilled, (state, action) => {
        state.loading = false;
        state.ctkms = action.payload.data;
      })
      .addCase(getCTKMs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCTKM.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCTKM.fulfilled, (state, action) => {
        state.loading = false;
        state.ctkms.push(action.payload.data);
      })
      .addCase(createCTKM.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCTKM.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCTKM.fulfilled, (state, action) => {
        state.loading = false;
        state.ctkms = state.ctkms.map((ctkm) =>
          ctkm.id === action.payload.data.id ? action.payload.data : ctkm
        );
      })
      .addCase(updateCTKM.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCTKM.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCTKM.fulfilled, (state, action) => {
        state.loading = false;
        state.ctkms = state.ctkms.filter((ctkm) => ctkm.id !== action.payload);
      })
      .addCase(deleteCTKM.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ctkmSlice.reducer;
