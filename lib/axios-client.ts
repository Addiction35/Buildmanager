import axios from "axios"

// Create an axios instance with default config
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.construction-management.com/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
})

// Request interceptor for adding auth token
axiosClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage or other storage mechanism
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor for handling common errors
axiosClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle 401 Unauthorized errors (token expired)
    if (error.response && error.response.status === 401) {
      // Redirect to login or refresh token
      if (typeof window !== "undefined") {
        // localStorage.removeItem('auth_token');
        // window.location.href = '/login';
        console.error("Authentication token expired")
      }
    }

    // Handle 500 server errors
    if (error.response && error.response.status >= 500) {
      console.error("Server error occurred:", error.response.data)
    }

    return Promise.reject(error)
  },
)

export default axiosClient

