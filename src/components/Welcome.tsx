// src/components/Welcome.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../utils/axiosInstance'; // Import the custom axios instance
import { RootState, AppDispatch } from '../store';
import { fetchUserStart, fetchUserSuccess, fetchUserFailure } from '../slices/userSlice';
import Cookies from 'js-cookie';

const Welcome: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>(); // Use the Redux dispatch function
    const { data: user, loading, error } = useSelector((state: RootState) => state.user); // Access user data from the Redux store

    useEffect(() => {
        const fetchUserData = async () => {
            const token = Cookies.get('jwt'); // Retrieve the JWT token from cookies
            if (!token) return; // If no token, do nothing

            dispatch(fetchUserStart()); // Dispatch fetchUserStart to set loading state

            try {
                // Make the API call using the axios instance with automatic token handling
                const response = await axiosInstance.get('/user');
                dispatch(fetchUserSuccess(response.data)); // Dispatch fetchUserSuccess with user data
            } catch (error: any) {
                dispatch(fetchUserFailure('Failed to fetch user data')); // Dispatch fetchUserFailure with error message
            }
        };

        fetchUserData(); // Call fetchUserData on component mount
    }, [dispatch]);

    if (loading) return <p>Loading...</p>; // Show loading message
    if (error) return <p>{error}</p>; // Show error message

    return (
        <div>
            <h1>Welcome, {user?.username}!</h1>
            <p>Email: {user?.email}</p>
        </div>
    );
};

export default Welcome;
