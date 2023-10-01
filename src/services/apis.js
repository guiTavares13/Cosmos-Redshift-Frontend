import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost.com",
});

export default api;