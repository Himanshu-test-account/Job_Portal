import { configureStore } from '@reduxjs/toolkit';
import jobReducer from "./slices/jobSlice";
import userReducer from "./slices/userSlice";
import applicationReducer from "./slices/applicationSlice";
import updateProfileSlice from "./slices/updateProfileSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        jobs: jobReducer,
        applications: applicationReducer,  // Ensure this is correctly set
        updateProfile: updateProfileSlice
    },
});

export default store;
