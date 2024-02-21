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

import axios from '../config/axios';

// user Auth


// admin
export const approveUser = (id, status) => axios.patch(`/admin/approve/${id}`, { status });
export const getAdmin = () => axios.get('/admin');
export const deleteClinicById = id => axios.delete(`/admin/delete/${id}`);
export const updateClinicStatus = (id, status) => axios.patch(`/admin/approve/${id}`, { status });
export const updateClinicVisibility = (id, visibility) => axios.patch(`/admin/visibility/${id}`, { visibility });




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