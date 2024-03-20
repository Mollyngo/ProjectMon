import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDistricts, editClinic, getAllClinic, getProvinces } from '../../api/clinic'; // เพิ่มการนำเข้าฟังก์ชันที่เกี่ยวข้อง

function EditClinic() {
    const { clinic_id } = useParams();
    const navigate = useNavigate();
    const [clinic, setClinic] = useState(null);
    const [info, setInfo] = useState({
        mobile: '',
        working_hour: '',
        website: '',
        service: '',
        others: '',
        photo: '',
    });
    const [district_id, setDistrict_id] = useState('');
    const [districts, setDistricts] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [province_id, setProvince_id] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        async function fetchProvinces() {
            try {
                const result = await getProvinces();
                setProvinces(result.data.province);
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        }

        async function fetchDistricts(province_id) {
            try {
                const response = await getDistricts(province_id);
                const { data } = response;
                const filteredDistricts = data.district.filter(district => district.province_id === province_id);
                setDistricts(filteredDistricts); // Set filtered districts
            } catch (error) {
                console.error('Error fetching districts:', error);
                setDistricts([]); // Set empty array in case of error
            }
        }

        if (province_id) {
            fetchDistricts(province_id);
        } else {
            setDistricts([]); // Reset districts if no province is selected
        }

        fetchProvinces();
    }, [province_id]);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getAllClinic();
                const foundClinic = result && result.data.find((c) => c.id === parseInt(clinic_id));

                if (foundClinic) {
                    setClinic(foundClinic);
                    setInfo({
                        mobile: foundClinic.info.mobile,
                        working_hour: foundClinic.info.working_hour,
                        website: foundClinic.info.website,
                        service: foundClinic.info.service,
                        others: foundClinic.info.others,
                        photo: foundClinic.info.photo,
                    });

                    const districtResult = await getDistricts(foundClinic.district_id); // ดึงอำเภอที่เกี่ยวข้องกับคลินิก
                    setDistricts(districtResult.data.district);

                    // ดึงข้อมูลจังหวัดที่เกี่ยวข้องกับอำเภอ
                    const selectedDistrict = districtResult.data.district.find((d) => d.id === foundClinic.district_id);
                    const provinceResult = selectedDistrict && selectedDistrict.province;
                    setProvinces(provinceResult || []);

                    setDistrict_id(foundClinic.district_id.toString());
                    setProvince_id(selectedDistrict && selectedDistrict.province_id.toString());
                } else {
                    console.error('Clinic not found.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [clinic_id]);

    const handleEditClinic = async (e) => {
        e.preventDefault();
        try {
            if (!clinic) {
                console.error('Clinic not found.');
                return;
            }

            // ตรวจสอบความถูกต้องของข้อมูลก่อนส่งไปยัง editClinic
            if (!clinic.id || !clinic.name || !info.mobile || !district_id || !province_id) {
                console.error('Clinic id, name, mobile, district, or province is missing.');
                return;
            }

            // สร้าง Object ที่เกี่ยวข้องกับโครงสร้างข้อมูลที่ Backend ต้องการ
            const clinicData = {
                id: clinic.id, // เพิ่ม id ของคลินิกที่ต้องการแก้ไข
                name: clinic.name,
                mobile: info.mobile,
                working_hour: info.working_hour,
                website: info.website,
                service: info.service,
                others: info.others,
                photo: info.photo,
                district_id: district_id
            };

            // แก้ไขคลินิกโดยเรียกใช้ฟังก์ชัน editClinic โดยส่ง id ของคลินิกไปด้วย
            const response = await editClinic(clinic.id, clinicData);
            console.log(clinicData);
            console.log(response);

            // ตรวจสอบความสําเร็จของการแก้ไข
            if (response.success) {
                console.log('Clinic edited successfully.');
                navigate('/user/profile');
            } else {
                console.error('Error editing clinic:', response.message)
                console.log('data', response.data)
                console.log('success', response.success)
                console.log('error', response.error)
                console.log('clinicData', response, clinicData, clinic, info, district_id, province_id, clinicData.district_id);
                // ตั้งค่าข้อผิดพลาดในกรณีที่เกิดข้อผิดพลาดในการแก้ไขคลินิก
                setErrorMessage('An error occurred while editing clinic.');
            }
        } catch (error) {
            console.error('Error editing clinic:', error);
            // ตั้งค่าข้อผิดพลาดในกรณีที่เกิดข้อผิดพลาดในการแก้ไขคลินิก
            setErrorMessage('An error occurred while editing clinic.');
        }
    };



    return (
        <div className="flex flex-col w-full h-full p-8">
            <div className='pb-4'>
                <h1>แก้ไขคลินิก</h1>
                {clinic && (
                    <form className="flex flex-col gap-4" onSubmit={handleEditClinic}>
                        <label htmlFor="name">ชื่อคลินิก:</label>
                        <input
                            className="input input-bordered h-10"
                            type="text"
                            id="name"
                            name="name"
                            value={clinic?.name || ''}
                            onChange={(e) => setClinic({ ...clinic, name: e.target.value })}
                        />

                        <label htmlFor="mobile">เบอร์โทรศัพท์:</label>
                        <input
                            className="input input-bordered h-10"
                            type="text"
                            id="mobile"
                            name="mobile"
                            value={info?.mobile || ''}
                            onChange={(e) => setInfo({ ...info, mobile: e.target.value })}
                        />

                        <label htmlFor="working-hour">เวลาทำการ:</label>
                        <input
                            className="input input-bordered h-10"
                            type="text"
                            id="working-hour"
                            name="working-hour"
                            value={info?.working_hour || ''}
                            onChange={(e) => setInfo({ ...info, working_hour: e.target.value })}
                        />

                        <label htmlFor="website">เว็บไซต์:</label>
                        <input
                            className="input input-bordered h-10"
                            type="text"
                            id="website"
                            name="website"
                            value={info?.website || ''}
                            onChange={(e) => setInfo({ ...info, website: e.target.value })}
                        />

                        <label htmlFor="service">บริการ:</label>
                        <input
                            className="input input-bordered h-10"
                            type="text"
                            id="service"
                            name="service"
                            value={info?.service || ''}
                            onChange={(e) => setInfo({ ...info, service: e.target.value })}
                        />

                        <label htmlFor="others">อื่นๆ:</label>
                        <input
                            className="input input-bordered h-10"
                            type="text"
                            id="others"
                            name="others"
                            value={info?.others || ''}
                            onChange={(e) => setInfo({ ...info, others: e.target.value })}
                        />
                        {/* 
                        <label htmlFor="province">จังหวัด:</label>
                        <select className="input input-bordered h-10" id="province" name="province" value={province_id} onChange={(e) => setProvince_id(e.target.value)}>
                            <option value="">เลือกจังหวัด</option>
                            {provinces.map((province) => (
                                <option key={province.id} value={province.id}>
                                    {province.name}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="district">อำเภอ:</label>
                        <select className="input input-bordered h-10" id="district" name="district" value={district_id} onChange={(e) => setDistrict_id(e.target.value)}>
                            <option value="">เลือกอำเภอ</option>
                            {districts.map((district) => (
                                <option key={district.id} value={district.id}>
                                    {district.name}
                                </option>
                            ))}
                        </select> */}

                        <button className="btn btn-primary" type="submit">แก้ไขคลินิก</button>
                    </form>
                )}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
            <button className='btn btn-secondary' onClick={() => navigate('/user-menu')} >ย้อนกลับ</button>
        </div>
    );
}

export default EditClinic;

