import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClinic } from '../api/clinic';
import { getDistricts, getProvinces } from '../api/clinic'


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
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [districtId, setDistrictId] = useState('');

    const navigate = useNavigate();

    async function fetchProvinces() {
        try {
            const result = await getProvinces();
            setProvinces(result.data.province);
        } catch (error) {
            console.error('Error fetching provinces:', error);
        }
    }
    useEffect(() => {
        fetchProvinces();
    }, []);

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
    useEffect(() => {
        if (province) {
            fetchDistricts(province * 1);
        }
    }, [province]);


    const handleAddClinic = async (e) => {
        try {
            e.preventDefault();

            const response = await createClinic({ name, mobile: info.mobile, working_hour: info.working_hour, website: info.website, service: info.service, others: info.others, photo: info.photo, district_id: districtId });
            if (response.success) {
                navigate('/');
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
                <label className="form-control w-full max-w-full">
                    <div className="label">
                        <span className="label-text">จังหวัด</span>
                    </div>
                    <select
                        className="select select-primary select-bordered join-item"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                    >
                        <option value="">เลือกจังหวัด</option>
                        {provinces && provinces.map(province => (
                            <option key={province.id} value={province.id}>{province.name}</option>
                        ))}
                    </select>
                </label>
                <label className="form-control w-full max-w-full">
                    <div className="label">
                        <span className="label-text">อำเภอ</span>
                    </div>
                    <select
                        className="select select-primary select-bordered join-item"
                        value={districtId}
                        onChange={(e) => {
                            setDistrictId(e.target.value);
                            setDistrict(e.target.value); // สั่งให้ state district แสดงค่าเป็น ID ของอำเภอ
                        }}
                    >
                        <option value="">เลือกอำเภอ</option>
                        {districts && districts.map(district => (
                            <option key={district.id} value={district.id}>{district.name}</option>
                        ))}
                    </select>
                </label>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button className="btn btn-primary mt-10" >เพิ่มคลินิก</button>
            </form>

        </div>
    );
}

export default AddClinic;
