import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const createUser = (data) => axios.post('/users/', data);
export const removeUser = (id) => axios.delete(`/users/${id}`);
export const updateUser = (data, id) => axios.put(`/users/${id}`, data);
export const getUsers = () => axios.get('/users/');

export default api;