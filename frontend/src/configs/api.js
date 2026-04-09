import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
});

// Add a request interceptor to attach the JWT token automatically
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            // This adds the "Bearer " prefix that your protect middleware needs
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Optional: Add a response interceptor to handle global errors (like logging out on 401)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Optional: clear local storage and redirect to login if token is expired/invalid
            // localStorage.removeItem("token");
            // window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;