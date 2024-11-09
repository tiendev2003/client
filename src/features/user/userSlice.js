import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosConfig";

const initialState = {
  users: [],
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

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/users", {
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

// active user
export const activeUser = createAsyncThunk(
  "user/activeUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/activate-user/${id}`, null, {
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

//  block user
export const blockUser = createAsyncThunk(
  "user/blockUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/blocked-user/${id}`, null, {
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
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.data;
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(activeUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(activeUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(activeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(blockUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(blockUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });


  },
});

export default userSlice.reducer;
