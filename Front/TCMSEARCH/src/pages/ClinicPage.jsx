import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGuestClinicById } from '../api/clinic';

function ClinicPage() {
    const { clinic_id } = useParams();
    const [clinic, setClinic] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        async function fetchClinic() {
            try {
                const result = await getGuestClinicById(clinic_id);
                if (result && result.data) {
                    console.log(result.data[0]);
                    setClinic(result.data[0]);
                } else {
                    setErrorMessage('ไม่พบข้อมูลคลินิก');
                }
            } catch (error) {
                console.error('Error fetching clinic:', error);
                setErrorMessage('เกิดข้อผิดพลาดในการดึงข้อมูลคลินิก');
            }
        }
        fetchClinic();
    }, [clinic_id]);



    return (
        <div className="h-screen flex flex-col  p-10">
            {/* <h1>รายละเอียดคลินิก</h1> */}
            {/* ตรวจสอบว่า clinic ไม่เป็น null ก่อนที่จะเรียกใช้ properties */}
            {clinic ? (
                <div>
                    <div className="card bg-base-100">
                        <div className="card  w-120 m-8 gap-y-5 flex flex-col">
                            <h1 className="card-title">ชื่อคลินิก: </h1>
                            <h1 className="card-title">{clinic.name}</h1>
                            <p>เบอร์โทร: {clinic.info && clinic.info.mobile}</p>
                            <p> อำเภอ/เขต: {clinic.district && clinic.district.name}</p>
                            <p> จังหวัด: {clinic.district && clinic.district.province.name}
                            </p>
                            <p>เวลาทําการ: {clinic.info && clinic.info.working_hour}</p>
                            <p>เว็บไซต์: {clinic.info && clinic.info.website}</p>
                            <p>บริการ: {clinic.info && clinic.info.service}</p>
                            <p>อื่นๆ: {clinic.info && clinic.info.others}</p>
                            {/* <img src={clinic.info && clinic.info.photo} alt={clinic.name} /> */}
                        </div>
                    </div>
                </div>
            ) : null}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
}

export default ClinicPage;
