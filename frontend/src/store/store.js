// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import jobReducer from "./slices/jobSlice";
import userReducer from "./slices/userSlice";
import applicationReducer from "./slices/applicationSlice";
import updateProfileSlice from "./slices/updateProfileSlice";
import contactReducer from "./slices/contactSlice"; // Import the contactSlice

const store = configureStore({
    reducer: {
        user: userReducer,
        jobs: jobReducer,
        applications: applicationReducer,
        updateProfile: updateProfileSlice,
        contact: contactReducer, // Add contact reducer to the store
    },
});

export default store;
