import axios from "../config/axios";

export const getClinicPageByUserAndAdmin = () => axios.get('/clinic');
export const createClinic = FormData => axios.post('/clinic/add', FormData);
export const editClinic = (id, data) => axios.patch(`/clinic/${id}`, data);

export const getClinicFromBackend = () => axios.get('/clinic', { params: {} });
export const getClinicToShow = () =>
    axios.get('/clinic/', { params: {} }
        .then(response => response.data)
    );



// getProvinces, getDistrictsByProvince, searchClinics

export const getApprovedVisibleClinics = async (province, district, searchType) => {
    try {
        const response = await axios.get(`/clinic/search?province=${province}&district=${district}&searchType=${searchType}`);
        return response.data;
    } catch (error) {
        return error.response.data;

    }
}
export const getProvinces = () => axios.get('/clinic/province');

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


export const searchClinics = async (params) => {
    try {
        const response = await axios.get('/clinics', { params });
        return response.data;
    } catch (error) {
        throw new Error('Error searching clinics:', error);
    }
};



// // axios.get('http://localhost:3000/api/clinics')
// //     .then(response => {
// //         console.log(response.data); // ประมวลผลข้อมูลที่ได้รับจาก Backend
// //     })
// //     .catch(error => {
// //         console.error('Error fetching data:', error);
// //     });

// const newData = {
//     name: 'New Clinic',
//     mobile: '1234567890',
//     working_hour: '9:00 - 17:00',
//     // เพิ่มข้อมูลอื่นๆ ตามต้องการ
// };

// axios.post('http://localhost:3000/api/clinics', newData)
//     .then(response => {
//         console.log('Clinic created successfully:', response.data);
//     })
//     .catch(error => {
//         console.error('Error creating clinic:', error);
//     });

// axios.get('http://localhost:3000/api/clinics')
//     .then(response => {
//         const clinics = response.data;
//         // ทำอะไรกับข้อมูล clinics ที่ได้รับ เช่น แสดงผลบนหน้าเว็บ
//     })
//     .catch(error => {
//         console.error('Error fetching data:', error);
//     });


//     .catch (error => {
//     console.error('Error fetching data:', error);
// });