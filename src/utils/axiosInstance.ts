// src/utils/axiosInstance.ts
import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
});

// Add a request interceptor to attach the access token to every request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('jwt'); // Get the access token from cookies
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Attach the token to the Authorization header
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor to handle token refresh on 401 errors
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error is a 401 Unauthorized and it's not a retry, attempt to refresh the token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark the request as a retry to prevent infinite loops
            const refreshToken = Cookies.get('refreshToken'); // Get the refresh token from cookies

            if (refreshToken) {
                try {
                    // Attempt to get a new access token using the refresh token
                    const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/refresh-token`, { token: refreshToken });

                    const newToken = response.data.accessToken;
                    Cookies.set('jwt', newToken); // Save the new access token in cookies

                    // Update the Authorization header with the new access token
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

                    // Retry the original request with the new token
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    console.error('Token refresh failed:', refreshError);
                    // Handle token refresh failure (e.g., log out the user or redirect to login)
                    return Promise.reject(refreshError);
                }
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
