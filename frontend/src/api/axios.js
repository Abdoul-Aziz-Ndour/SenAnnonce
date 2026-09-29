import axios from 'axios';

export const API_BASE = import.meta.env.VITE_API_BASE || (window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://senannonce-backend.onrender.com');

const api = axios.create({
  baseURL: `${API_BASE}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

