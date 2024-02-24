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
    const [district_id, setDistrict_id] = useState('');
    const [district, setDistrict] = useState([]);
    // const [province, setProvince] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    async function fetchDistricts() {
        try {
            const result = await getDistricts();
            setDistrict(result.data.district);
            console.log(result.data.district)
        } catch (error) {
            console.error('Error fetching districts:', error);

        }
    }
    // async function fetchProvinces() {
    //     try {
    //         const result = await getProvinces();
    //         console.log(result)
    //         setProvince(result.data.province);
    //     } catch (error) {
    //         console.error('Error fetching provinces:', error);
    //     }
    // }
    useEffect(() => {
        fetchDistricts();
        // fetchProvinces();
    }, []);


    const handleAddClinic = async (e) => {
        try {
            e.preventDefault();

            const response = await createClinic({ name, mobile: info.mobile, working_hour: info.working_hour, website: info.website, service: info.service, others: info.others, photo: info.photo, district_id });
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
                <select className="select select-bordered"
                    id="district"
                    name="district"
                    value={district_id}
                    onChange={(e) => setDistrict_id(e.target.value)}>
                    <option value="">เลือกอำเภอ</option>
                    {district.map((district) => (
                        <option key={district.id} value={district.id}>
                            {district.name}
                        </option>
                    ))}
                </select>
                {/* <select
                    className="select select-bordered"
                    id='province'
                    name='province'
                    value={province}
                    onChange={(e) => setProvince(e.target.value)} >
                    <option value="">เลือกจังหวัด</option>
                    {province && province.map(province => (
                        <option key={province.id} value={province.id}>
                            {province.name}
                        </option>
                    ))}
                </select>
                <br /> */}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button className="btn btn-primary" >เพิ่มคลินิก</button>
            </form>

        </div>
    );
};

export default AddClinic;
