import axios from "../config/axios";

export const getClinicPageByUserAndAdmin = () => axios.get('/clinic');
export const createClinic = FormData => axios.post('/clinic/add', FormData);
export const editClinic = (id, data) => axios.patch(`/clinic/${id}`, data);
export const deleteClinic = id => axios.delete(`/clinic/${id}`);

export const getClinicFromBackend = () => axios.get('/clinic', { params: {} });
export const getClinicToShow = () =>
    axios.get('/clinic/', { params: {} }
        .then(response => response.data)
    );

export const getApprovedVisibleClinics = async (province, district, searchType) => {
    try {
        const response = await axios.get(`/clinic/search?province=${province}&district=${district}&searchType=${searchType}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
export const getProvinces = () => axios.get('/clinic/province');
// console.log(getProvinces())
export const getDistrictsByProvince = province => axios.get(`/clinic/district?province=${province}`);

export const getDistricts = () => axios.get('/clinic/district');


export const getClinicFromDistrict = district => axios.get(`/clinic/search?district=${district}`);

// // Guest
export const getClinicByNameDistrictProvince = async (name, district, province) => {
    try {
        const response = await axios.get(`/clinic/search?name=${name}&district=${district}&province=${province}`);
    } catch (error) {
        return error.response.data;
    }
}
export const getClinicByDistrict = async (district) => {
    try {
        const response = await axios.get(`/clinic/search?district=${district}`);
    } catch (error) {
        return error.response.data;
    }
}
export const getClinicByProvince = async (province) => {
    try {
        const response = await axios.get(`/clinic/search?province=${province}`);
    } catch (error) {
        return error.response.data;
    }
}
export const getClinicById = id => axios.get(`/clinic/${id}`);



export const getAllClinic = () => {
    return axios.get('/clinic');
}

export const searchClinics = async (params) => {
    try {
        const response = await axios.get('/clinics', { params });
        return response.data;
    } catch (error) {
        throw new Error('Error searching clinics:', error);
    }
};
