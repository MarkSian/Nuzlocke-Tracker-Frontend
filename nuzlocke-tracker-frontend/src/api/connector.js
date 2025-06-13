import axios from 'axios';
// This file ensures that all API requests are made to the correct base URL
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    withCredentials: true, // Ensures requests include cookies
});


export default axiosInstance;