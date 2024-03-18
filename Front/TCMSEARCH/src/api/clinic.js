import axios from "../config/axios";

// export const getClinicPageByUserAndAdmin = () => axios.get('/clinic');
export const createClinic = FormData => axios.post('/clinic/add', FormData);
export const editClinic = (id, data) => axios.patch(`/clinic/edit/${id}`, data);
export const deleteClinic = id => axios.delete(`/clinic/${id}`);


export const getProvinces = () => axios.get('/clinic/province');
export const getDistricts = () => axios.get('/clinic/district');


export const getAllClinic = () => axios.get('/clinic');
export const getClinicById = id => axios.get(`/clinic/search/${id}`)
//--------------------Guest---------------------------//
export const getClinicPageByGuest = () => axios.get('/clinic/all');
export const getGuestClinicById = id => axios.get(`/clinic/all/${id}`)