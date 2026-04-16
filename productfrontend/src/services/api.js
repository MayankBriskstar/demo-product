import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5228/api',
  headers: { 'Content-Type': 'application/json' }
});

// Use interceptor to add token if exists
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const apiSvc = {
  async getItems() {
    const res = await api.get('/products');
    return res.data;
  },
  async getByColor(color) {
    const res = await api.get(`/products/color/${color}`);
    return res.data;
  },
  async add(item) {
    const res = await api.post('/products', item);
    return res.data;
  }
};

export const authSvc = {
  async login(user, pass) {
    const res = await api.post('/auth/login', { username: user, password: pass });
    if (res.data.token) localStorage.setItem('token', res.data.token);
    return res.data;
  },
  logout() {
    localStorage.removeItem('token');
  },
  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
};
