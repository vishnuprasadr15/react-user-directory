// src/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the user state
interface UserState {
    data: {
        username: string;
        email: string;
    } | null;
    loading: boolean;
    error: string | null;
}

// Initial state for the user slice
const initialState: UserState = {
    data: null,
    loading: false,
    error: null,
};

// Create a slice for user state management
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchUserStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchUserSuccess(state, action: PayloadAction<{ username: string; email: string }>) {
            state.data = action.payload;
            state.loading = false;
        },
        fetchUserFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

// Export actions and reducer
export const { fetchUserStart, fetchUserSuccess, fetchUserFailure } = userSlice.actions;
export default userSlice.reducer;
