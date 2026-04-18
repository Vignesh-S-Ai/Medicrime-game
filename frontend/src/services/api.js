import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const startNewCase = async () => {
  const response = await api.get('/case/new');
  return response.data;
};

export const sendMessage = async (caseId, message) => {
  const response = await api.post('/chat', { caseId, message });
  return response.data;
};

export const submitDiagnosis = async (caseId, diagnosis) => {
  const response = await api.post('/diagnose', { caseId, diagnosis });
  return response.data;
};

export default api;
