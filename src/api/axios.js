import axios from 'axios'

// IP Laptop Backend Go kamu
const BACKEND_IP = '192.168.69.247'

const api = axios.create({
  // Menggunakan template string dan double slash http://
  baseURL: `http://${BACKEND_IP}:8081/api`,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api