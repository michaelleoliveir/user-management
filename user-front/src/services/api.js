import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const createUser = (data) => api.post('/users', data);
export const removeUser = (id) => api.delete(`/users/${id}`);
export const updateUser = (data, id) => api.put(`/users/${id}`, data);
export const getUsers = () => api.get('/users');

export default api;