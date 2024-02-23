import axios from '../config/axios';

// admin
export const approveUser = (id, status) => axios.patch(`/admin/approve/${id}`, { status });
export const getAdmin = () => axios.get('/admin');
export const deleteClinicById = id => axios.delete(`/admin/delete/${id}`);
export const updateClinicStatus = (id, status) => axios.patch(`/admin/approve/${id}`, { status });
export const updateClinicVisibility = (id, visibility) => axios.patch(`/admin/visibility/${id}`, { visibility });

