import { api } from './api.js';

export const materialService = {
  create: async (payload) => {
    const { data } = await api.post('/api/materials', payload);
    return data;
  },
  list: async () => {
    const { data } = await api.get('/api/materials');
    return data;
  },
  getById: async (id) => {
    const { data } = await api.get(`/api/materials/${id}`);
    return data;
  },
  remove: async (id) => {
    const { data } = await api.delete(`/api/materials/${id}`);
    return data;
  },
};

