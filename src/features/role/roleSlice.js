// viết redux cho phần này
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosConfig";

export const fetchRoles = createAsyncThunk(
  "roles/fetchRoles",
  async ({ rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/quyenTK", {
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

export const createRole = createAsyncThunk(
  "roles/createRole",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/quyenTK/store", data, {
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

export const fetchRoleById = createAsyncThunk(
  "roles/fetchRoleById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/quyenTK/detail/${id}`, {
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

export const updateRole = createAsyncThunk(
  "roles/updateRole",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const response = await axiosInstance.put(`/quyenTK/update/1`, data, {
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

export const deleteRole = createAsyncThunk(
  "roles/deleteRole",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/quyenTK/delete/${id}`, {
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
  roles: [],
  role: null,
  loading: false,
  error: null,
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchRoles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRoles.fulfilled, (state, action) => {
      state.roles = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchRoles.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(createRole.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createRole.fulfilled, (state, action) => {
      
      state.loading = false;
    });
    builder.addCase(createRole.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchRoleById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRoleById.fulfilled, (state, action) => {
      state.role = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchRoleById.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(updateRole.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateRole.fulfilled, (state, action) => {
      state.roles = state.roles.map((role) =>
        role.id === action.payload.id ? action.payload : role
      );
      state.loading = false;
    });
    builder.addCase(updateRole.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteRole.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteRole.fulfilled, (state, action) => {
      state.roles = state.roles.filter((role) => role.id !== action.payload);
      state.loading = false;
    });
    builder.addCase(deleteRole.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default roleSlice.reducer;
