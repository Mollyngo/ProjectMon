import axios from "../config/axios";
export const fetchAllUser = () => axios.get('/auth/allUser');
export const fetchAllUserByRole = role => axios.get(`/auth/user/${role}`);
export const register = user => axios.post('/auth/register', user);
export const login = credential => axios.post('/auth/login', credential);
export const fetchUser = () => axios.get('/auth/user');
