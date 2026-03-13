import { api } from './api.js';

export const aiService = {
  generateNotes: async ({ materialId }) => {
    const { data } = await api.post('/api/ai/generate-notes', { materialId });
    return data;
  },
  generateFlashcards: async ({ materialId }) => {
    const { data } = await api.post('/api/ai/generate-flashcards', { materialId });
    return data;
  },
  generateQuiz: async ({ materialId, numQuestions }) => {
    const { data } = await api.post('/api/ai/generate-quiz', { materialId, numQuestions });
    return data;
  },
};

