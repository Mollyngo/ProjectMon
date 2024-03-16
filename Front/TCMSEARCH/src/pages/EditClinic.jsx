import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDistricts, editClinic, getAllClinic } from '../api/clinic'; // นำเข้าฟังก์ชันที่เกี่ยวข้อง


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

                    const districtResult = await getDistricts();
                    setDistricts(districtResult.data.district);

                    // ให้หาข้อมูลจังหวัดที่เกี่ยวข้องกับเขตตำบล
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
            if (!clinic.name || !info.mobile) {
                console.error('Clinic name or mobile is missing.');
                return;
            }

            // แก้ไขการส่งข้อมูลที่ไม่ถูกต้องไปยัง editClinic
            const response = await editClinic(clinic.id, {
                name: clinic.name,
                info: { ...info }, // ส่งข้อมูล info ทั้งหมด
                district_id: district_id
            });

            if (response.success) {
                navigate('/clinics');
            } else {
                setErrorMessage(response.message);
            }
        } catch (error) {
            console.error('Error editing clinic:', error);
            setErrorMessage('เกิดข้อผิดพลาดในการแก้ไขคลินิก');
        }
    };





    return (
        <div className="flex flex-col p-8">
            <div className='pb-4'>
                <h1 className="text-2xl font-bold">แก้ไขคลินิก</h1>
                {clinic && (
                    <form className="flex flex-col gap-4" onSubmit={handleEditClinic}>
                        <label htmlFor="name">ชื่อคลินิก:</label>
                        <input
                            className="input input-bordered h-10"
                            type="text"
                            id="name"
                            name="name"
                            value={clinic.name}
                            onChange={(e) => setClinic({ ...clinic, name: e.target.value })}
                        />

                        <label htmlFor="mobile">เบอร์โทรศัพท์:</label>
                        <input
                            className="input input-bordered h-10"
                            type="tel"
                            id="mobile"
                            name="mobile"
                            value={info.mobile}
                            onChange={(e) => setInfo({ ...info, mobile: e.target.value })}
                        />

                        <label htmlFor="working-hour">เวลาทำการ:</label>
                        <input
                            type="text"
                            id="working-hour"
                            name="working-hour"
                            value={info.working_hour}
                            onChange={(e) => setInfo({ ...info, working_hour: e.target.value })}
                        />

                        <label htmlFor="website">เว็บไซต์:</label>
                        <input
                            className="input input-bordered h-10"
                            type="text"
                            id="website"
                            name="website"
                            value={info.website}
                            onChange={(e) => setInfo({ ...info, website: e.target.value })}
                        />

                        <label htmlFor="service">บริการ:</label>
                        <input
                            className="input input-bordered h-10"
                            type="text"
                            id="service"
                            name="service"
                            value={info.service}
                            onChange={(e) => setInfo({ ...info, service: e.target.value })}
                        />

                        <label htmlFor="others">อื่นๆ:</label>
                        <input
                            className="input input-bordered h-10"
                            type="text"
                            id="others"
                            name="others"
                            value={info.others}
                            onChange={(e) => setInfo({ ...info, others: e.target.value })}
                        />

                        <label htmlFor="district">อำเภอ:</label>
                        <select
                            className="input input-bordered h-10"
                            id="district"
                            name="district"
                            value={district_id}
                            onChange={(e) => setDistrict_id(e.target.value)}
                        >
                            <option value="">เลือกอำเภอ</option>
                            {districts.map((district) => (
                                <option key={district.id} value={district.id}>
                                    {district.name}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="province">จังหวัด:</label>
                        <select className="input input-bordered h-10" id="province" name="province" value={province_id} onChange={(e) => setProvince_id(e.target.value)}>
                            <option value="">เลือกจังหวัด</option>
                            {provinces.map((province) => (
                                <option key={province.id} value={province.id}>
                                    {province.name}
                                </option>
                            ))}
                        </select>

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