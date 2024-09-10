// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'; // Import the user slice reducer

// Configure the Redux store
const store = configureStore({
    reducer: {
        user: userReducer, // Register the user reducer
    },
});

// Define the types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
