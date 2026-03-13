import { api } from './api.js';

export const authService = {
  register: async (payload) => {
    const { data } = await api.post('/api/auth/register', payload);
    return data;
  },
  login: async (payload) => {
    const { data } = await api.post('/api/auth/login', payload);
    return data;
  },
};

