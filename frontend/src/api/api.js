import axios from 'axios'
import { jwtDecode } from 'jwt-decode'


let isRefreshing = false
let refreshSubscribers = []

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

function isTokenExpiringSoon(token) {
  try {
    const { exp } = jwtDecode(token)
    return exp - Date.now() / 1000 < 60
  } catch {
    return true
  }
}

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb)
}

function onTokenRefreshed(newToken) {
  refreshSubscribers.forEach((cb) => cb(newToken))
  refreshSubscribers = []
}

// Request interceptor
api.interceptors.request.use(async (config) => {
  // Skip intercepting login, register, and refresh requests
  const skipUrls = ['/login', '/register', '/refresh']
  if (skipUrls.some((url) => config.url.includes(url))) {
    return config
  }

  const token = localStorage.getItem('token')
  if (!token) return config

  if (isTokenExpiringSoon(token) && !isRefreshing) {
    isRefreshing = true
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/refresh`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      )
      const newToken = res.data.token
      localStorage.setItem('token', newToken)
      onTokenRefreshed(newToken)
      config.headers.Authorization = `Bearer ${newToken}`
    } catch (e) {
      console.error('Token pre-refresh failed:', e)
      localStorage.removeItem('token')
      localStorage.removeItem('user')

    } finally {
      isRefreshing = false
    }
  } else {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Skip handling 401s for login/register/refresh requests
    const skipUrls = ['/login', '/register', '/refresh']
    if (skipUrls.some((url) => originalRequest?.url?.includes(url))) {
      return Promise.reject(error)
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (!localStorage.getItem('token')) {
  
        return Promise.reject(error)
      }

      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`
            resolve(api(originalRequest))
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/refresh`,
          {},
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
        )
        const newToken = res.data.token
        localStorage.setItem('token', newToken)
        onTokenRefreshed(newToken)
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return api(originalRequest)
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
  
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

export default api
