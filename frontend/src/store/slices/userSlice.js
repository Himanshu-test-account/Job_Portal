import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
    error: null,
    message: null,
  },
  reducers: {
    // Register
    registerRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
      state.error = null;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
      state.message = null;
    },

    // Login
    loginRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
      state.error = null;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
      state.message = null;
    },

    // Fetch User
    fetchUserRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    fetchUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },

    // Logout
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    logoutFailed(state, action) {
      state.error = action.payload;
    },

    // Clear Errors
    clearAllErrors(state) {
      state.error = null;
      state.message = null;
    },
  },
});

// Thunks

export const register = (data) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest());
  try {
    const response = await axios.post("http://localhost:4000/api/v1/user/register", data, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch(userSlice.actions.registerSuccess(response.data));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
    dispatch(userSlice.actions.registerFailed(errorMessage));
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const response = await axios.post("http://localhost:4000/api/v1/user/login", data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    dispatch(userSlice.actions.loginSuccess(response.data));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
    dispatch(userSlice.actions.loginFailed(errorMessage));
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchUserRequest());
  try {
    const response = await axios.get("http://localhost:4000/api/v1/user/getUser", {
      withCredentials: true,
    });
    dispatch(userSlice.actions.fetchUserSuccess(response.data.user));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    console.error("Error fetching user:", error);  // Log full error object
    const errorMessage = error.response?.data?.message || "Failed to fetch user data.";
    dispatch(userSlice.actions.fetchUserFailed(errorMessage));
  }
};

export const logout = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:4000/api/v1/user/logout", {
      withCredentials: true,
    });
    dispatch(userSlice.actions.logoutSuccess());
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Logout failed. Please try again.";
    dispatch(userSlice.actions.logoutFailed(errorMessage));
  }
};

export const clearAllUserErrors = () => (dispatch) => {
  dispatch(userSlice.actions.clearAllErrors());
};

export default userSlice.reducer;
