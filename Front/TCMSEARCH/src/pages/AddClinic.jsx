import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClinic } from '../api/clinic';
import { getDistricts } from '../api/clinic'; // Assuming you have an API client

function AddClinic() {
    const [name, setName] = useState('');
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
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchDistricts() {
            try {
                const result = await getDistricts();
                setDistricts(result);
            } catch (error) {
                console.error('Error fetching districts:', error);
                setErrorMessage('เกิดข้อผิดพลาดในการดึงข้อมูลอำเภอ'); // Handle errors gracefully
            }
        }
        fetchDistricts();
    }, []);

    const handleAddClinic = async () => {
        try {
            const response = await createClinic(name, info, districtId);
            if (response.success) {
                // Redirect to clinic list page
                navigate('/clinics');
            } else {
                setErrorMessage(response.message);
            }
        } catch (error) {
            console.error('Error adding clinic:', error);
            setErrorMessage('เกิดข้อผิดพลาดในการเพิ่มคลินิก'); // Handle errors gracefully
        }
    };

    return (
        <div className="max-w-xl py-5  m-auto">
            <h1 className="text-2xl font-bold text-center gap-6">เพิ่มคลินิก</h1>
            <form className='flex flex-col px-5' onSubmit={handleAddClinic}>
                <label name="name">ชื่อคลินิก:</label>
                <input className="input input-bordered h-10" type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                <br />
                <label name="mobile">เบอร์โทรศัพท์:</label>
                <input className="input input-bordered h-10" type="tel" id="mobile" name="mobile" value={info.mobile} onChange={(e) => setInfo({ ...info, mobile: e.target.value })} />
                <br />
                <label name="working-hour">เวลาทำการ:</label>
                <input className="input input-bordered h-10" type="text" id="working-hour" name="working-hour" value={info.working_hour} onChange={(e) => setInfo({ ...info, working_hour: e.target.value })} />
                <br />
                <label name="website">เว็บไซต์:</label>
                <input className="input input-bordered h-10" type="text" id="website" name="website" value={info.website} onChange={(e) => setInfo({ ...info, website: e.target.value })} />
                <br />
                <label name="service">บริการ:</label>
                <input className="input input-bordered h-10" type="text" id="service" name="service" value={info.service} onChange={(e) => setInfo({ ...info, service: e.target.value })} />
                <br />
                <label name="others">อื่นๆ:</label>
                <input className="input input-bordered h-10" type="text" id="others" name="others" value={info.others} onChange={(e) => setInfo({ ...info, others: e.target.value })} />
                <br />
                <label name="district">อำเภอ:</label>
                <select className="select select-bordered" id="district" name="district" value={districtId} onChange={(e) => setDistrictId(e.target.value)}>
                    <option value="">เลือกอำเภอ</option>
                    {districts.map((district) => (
                        <option key={district.id} value={district.id}>
                            {district.name}
                        </option>
                    ))}
                </select>
                <br />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button className="btn btn-primary" type="submit">เพิ่มคลินิก</button>
            </form>

        </div>
    );
};

export default AddClinic;
