import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getClinicById, editClinic } from '../api/clinic'; // Assuming you have an API client
import { getDistricts } from '../api/clinic'; // Assuming you have an API client

function EditClinic() {
    const { clinicId } = useParams();
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
    const [districtId, setDistrictId] = useState('');
    const [districts, setDistricts] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        async function fetchClinic() {
            try {
                const result = await getClinicById(clinicId);
                setClinic(result);
                setInfo(result.info);
                setDistrictId(result.district_id);
            } catch (error) {
                console.error('Error fetching clinic:', error);
                setErrorMessage('เกิดข้อผิดพลาดในการดึงข้อมูลคลินิก'); // Handle errors gracefully
            }
        }
        async function fetchDistricts() {
            try {
                const result = await getDistricts();
                setDistricts(result);
            } catch (error) {
                console.error('Error fetching districts:', error);
                setErrorMessage('เกิดข้อผิดพลาดในการดึงข้อมูลอำเภอ'); // Handle errors gracefully
            }
        }
        fetchClinic();
        fetchDistricts();
    }, [clinicId]);

    const handleEditClinic = async () => {
        try {
            const response = await editClinic(clinicId, name, info, districtId);
            if (response.success) {
                // Redirect to clinic list page
                navigate('/clinics');
            } else {
                setErrorMessage(response.message);
            }
        } catch (error) {
            console.error('Error editing clinic:', error);
            setErrorMessage('เกิดข้อผิดพลาดในการแก้ไขคลินิก'); // Handle errors gracefully
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">แก้ไขคลินิก</h1>
            {clinic && (
                <form className="flex flex-col gap-4" onSubmit={handleEditClinic}>
                    <label name="name">ชื่อคลินิก:</label>
                    <input
                        className="input input-bordered h-10"
                        type="text"
                        id="name"
                        name="name"
                        value={clinic.name}
                        onChange={(e) => setClinic({ ...clinic, name: e.target.value })}
                    />

                    <label name="mobile">เบอร์โทรศัพท์:</label>
                    <input
                        className="input input-bordered h-10"
                        type="tel"
                        id="mobile"
                        name="mobile"
                        value={info.mobile}
                        onChange={(e) => setInfo({ ...info, mobile: e.target.value })}
                    />

                    <label name="working-hour">เวลาทำการ:</label>
                    <input
                        type="text"
                        id="working-hour"
                        name="working-hour"
                        value={info.working_hour}
                        onChange={(e) => setInfo({ ...info, working_hour: e.target.value })}
                    />

                    <label name="website">เว็บไซต์:</label>
                    <input
                        className="input input-bordered h-10"
                        type="text"
                        id="website"
                        name="website"
                        value={info.website}
                        onChange={(e) => setInfo({ ...info, website: e.target.value })}
                    />

                    <label name="service">บริการ:</label>
                    <input
                        className="input input-bordered h-10"
                        type="text"
                        id="service"
                        name="service"
                        value={info.service}
                        onChange={(e) => setInfo({ ...info, service: e.target.value })}
                    />

                    <label name="others">อื่นๆ:</label>
                    <input
                        className="input input-bordered h-10"
                        type="text"
                        id="others"
                        name="others"
                        value={info.others}
                        onChange={(e) => setInfo({ ...info, others: e.target.value })}
                    />

                    <label name="district">อำเภอ:</label>
                    <select
                        className="input input-bordered h-10"
                        id="district"
                        name="district"
                        value={districtId}
                        onChange={(e) => setDistrictId(e.target.value)}
                    >
                        <option value="">เลือกอำเภอ</option>
                        {districts.map((district) => (
                            <option key={district.id} value={district.id}>
                                {district.name}
                            </option>
                        ))}
                    </select>

                    <button className="btn btn-primary" type="submit">แก้ไขคลินิก</button>
                </form>
            )}

            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default EditClinic;

