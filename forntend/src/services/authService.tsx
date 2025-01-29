import axios from 'axios'

const API_URL = 'http://localhost:8080'
//localStorage.setItem('token', '122222')
export const authService = {
  register: async (username: string, password: string) => {

    
    
    try {
      const response = await axios.post(`${API_URL}/api/auth/signup`, { username, password })
      if (response.data) {
        console.log(response.data)
        
        localStorage.setItem('token', response.data.jwtToken)
        return response.data.jwtToken
      }
    } catch (error) {
      throw new Error('register failed')
    }

  },
  login: async (username: string, password: string) => {

    
    
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, { username, password })
      if (response.data) {
        console.log(response.data)
        localStorage.setItem('token', response.data.jwtToken)
        return response.data.jwtToken
      }
    } catch (error) {
      throw new Error('Login failed')
    }

  },

  logout: () => {
    localStorage.removeItem('token')
  },

  getToken: () => {
    return localStorage.getItem('token')
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token')
  },
}

// Create an axios instance with the token in the header
export const axiosAuth = axios.create()

axiosAuth.interceptors.request.use(
  (config) => {
    const token = authService.getToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)