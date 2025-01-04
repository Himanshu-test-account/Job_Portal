import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Create a Redux slice for managing contact us page state
const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contactMessages: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    requestForContactFormSubmission(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    requestForContactMessages(state) {
      state.loading = true;
      state.error = null;
    },
    successForContactFormSubmission(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
    },
    successForContactMessages(state, action) {
      state.loading = false;
      state.error = null;
      state.contactMessages = action.payload;
    },
    failureForContactFormSubmission(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    failureForContactMessages(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearAllErrors(state) {
      state.error = null;
    },
    resetContactState(state) {
      state.loading = false;
      state.contactMessages = [];
      state.message = null;
      state.error = null;
    },
  },
});

// Thunks for async actions

export const submitContactForm = (formData) => async (dispatch) => {
  dispatch(contactSlice.actions.requestForContactFormSubmission());
  try {
    const response = await axios.post(`http://localhost:4000/api/v1/contact-us`, formData, {
      withCredentials: true,
    });
    dispatch(contactSlice.actions.successForContactFormSubmission(response.data));
  } catch (error) {
    const errorMessage = error?.response?.data?.message
      || error.message
      || "Failed to submit contact form";
    dispatch(contactSlice.actions.failureForContactFormSubmission(errorMessage));
  }
};

export const getContactMessages = () => async (dispatch) => {
  dispatch(contactSlice.actions.requestForContactMessages());
  try {
    const response = await axios.get(`http://localhost:4000/api/v1/admin/contact-messages`, {
      withCredentials: true,
    });

    if (response.data.messages && response.data.messages.length > 0) {
      dispatch(contactSlice.actions.successForContactMessages(response.data.messages));
    } else {
      dispatch(contactSlice.actions.failureForContactMessages("No contact messages available"));
    }
  } catch (error) {
    const errorMessage = error?.response?.data?.message
      || error.message
      || "Failed to fetch contact messages";
    dispatch(contactSlice.actions.failureForContactMessages(errorMessage));
  }
};

export const clearContactErrors = () => (dispatch) => {
  dispatch(contactSlice.actions.clearAllErrors());
};

export const resetContactState = () => (dispatch) => {
  dispatch(contactSlice.actions.resetContactState());
};

// Export the reducer
export default contactSlice.reducer;
