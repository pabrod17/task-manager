import axios from 'axios';

// const API_URL = 'http://localhost:8080/api/tasks';
const API_URL = 'https://keen-dedication-production.up.railway.app/api/tasks';

export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getTaskById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

export const markTaskCompleted = async (id) => {
  const response = await axios.patch(`${API_URL}/${id}/complete`);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
}