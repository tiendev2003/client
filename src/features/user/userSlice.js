import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosConfig";

const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};

export const updateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/users/update", userData, {
        header: {
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

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/users/changePassword",
        passwordData,
        {
          header: {
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

export const uploadAvatar = createAsyncThunk(
  "user/uploadImage",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.data.url;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(uploadAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      }
      )
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.data;
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export default userSlice.reducer;
