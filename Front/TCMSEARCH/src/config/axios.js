import axios from 'axios';
import { getToken } from "../validators/localStorage";



axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axios.interceptors.response.use(
    (response) => {
        const token = response.headers['authorization'];
        if (token) {
            storeToken(token);
        }
        return response;
    },
    (error) => Promise.reject(error)
);

export default axios;