import { api } from './api.js';

export const studyPlanService = {
  list: async () => {
    const { data } = await api.get('/api/study-plan');
    return data;
  },
  create: async (payload) => {
    const { data } = await api.post('/api/study-plan', payload);
    return data;
  },
  update: async (id, payload) => {
    const { data } = await api.put(`/api/study-plan/${id}`, payload);
    return data;
  },
};

