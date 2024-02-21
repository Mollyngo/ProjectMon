import axios from "../config/axios";

export const getClinicPageByUserAndAdmin = () => axios.get('/clinic');
export const createClinic = FormData => axios.post('/clinic/add', FormData);
export const editClinic = (id, data) => axios.patch(`/clinic/${id}`, data);

export const getClinicFromBackend = () => axios.get('/clinic', { params: {} });


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