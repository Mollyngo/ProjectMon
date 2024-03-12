import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import head from '../assets/head.png';
import { getProvinces, searchClinics, getDistricts, getAllClinic } from '../api/clinic'; // Assuming you have an API client


export default function Search() {
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState(" ");
    const [type, setType] = useState('');
    const [clinicName, setClinicName] = useState('');
    const navigate = useNavigate();
    const [clinic, setClinic] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);



    async function fetchAllClinic() {
        try {
            const result = await getAllClinic();
            setClinic(result.data.clinic);
        } catch (error) {
            console.error('Error fetching clinics:', error);
        }
    }
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
        fetchAllClinic();
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

    const handleSearch = async () => {
        try {
            let results;
            const searchParams = new URLSearchParams();
            if (type === 'clinic') {
                if (clinicName) {
                    searchParams.append('clinicName', clinicName);
                }
            } else if (type === 'province') {
                if (province) {
                    searchParams.append('province', province);
                }
            } else if (type === 'district') {
                if (district) {
                    searchParams.append('district', district);
                }
            }
            results = await searchClinics(searchParams);
            setClinic(results.data.clinic); // Set clinic results
        } catch (error) {
            console.error('Error searching clinics:', error);
        }
    };

    const handleClickLogin = () => {
        navigate('/login');
    }

    return (
        <div className="container flex flex-col mx-auto p-4">
            <div className="hero h-96" style={{ backgroundImage: 'url("' + head + '")' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
            <br />
            <div className="join">
                <div className='w-full'>
                    <div className="join-item ">
                        <input className="input input-primary w-full max-w-full join-item" placeholder="ค้นหา" />
                    </div>
                </div>
                <select
                    className="select select-primary select-bordered join-item"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="">เลือกประเภทของตาราง</option>
                    <option value="clinic">คลินิก</option>
                    <option value="district">อำเภอ</option>
                    <option value="province">จังหวัด</option>
                </select>
                <div className="indicator">
                    <button className="btn-primary btn join-item" onClick={handleSearch}>Search</button>
                </div>
            </div>
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
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                >
                    <option value="">เลือกอำเภอ</option>
                    {districts && districts.map(district => (
                        <option key={district.id} value={district.id}>{district.name}</option>
                    ))}
                </select>
            </label>
            {/* {console.log(province)}
            {console.log(district)} */}

            <br />
            <button className="btn-primary btn" onClick={handleSearch}>ค้นหาคลินิก</button>
            <br />
            <button className="btn-secondary btn" onClick={handleClickLogin}>เข้าสู่ระบบ / ลงทะเบียน</button>
        </div>
    );
}
