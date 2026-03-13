import { api } from './api.js';

export const userService = {
  getProfile: async () => {
    const { data } = await api.get('/api/users/profile');
    return data;
  },
  updateProfile: async (payload) => {
    const { data } = await api.put('/api/users/profile', payload);
    return data;
  },
  getLeaderboard: async () => {
    const { data } = await api.get('/api/users/leaderboard');
    return data;
  },
};

