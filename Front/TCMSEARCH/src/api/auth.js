import axios from "../config/axios";
// export const fetchAllUser = () => axios.get('/auth/allUser');
export const fetchAllUserByRole = role => axios.get(`/auth/user/${role}`);
export const fetchUser = () => axios.get('/auth/user');
export const getAllUser = () => axios.get('/user');

export const register = user => axios.post('/auth/register', user);
export const login = credential => axios.post('/auth/login', credential);

export const editUser = (id, data) => axios.patch(`/user/${id}`, data);
export const deleteUser = id => axios.delete(`/user/${id}`);

export const visibilityClinic = (id, visibility) => axios.patch(`/clinic/visibility/${id}`, visibility);
export const statusClinic = (id, status) => axios.patch(`/clinic/status/${id}`, status);

// export const getAdmin = () => axios.get('/admin');
// export const deleteClinicById = id => axios.delete(`/admin/delete/${id}`);
// export const login = credential => axios.post('/auth/login', credential);
// export const fetchUser = () => axios.get('/auth/user');
