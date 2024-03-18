import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import head from '../../assets/head.png';
import { getProvinces, getDistricts, getClinicPageByGuest } from '../../api/clinic';
import SearchClinicByProvince from '../../features/SearchClinicByProvince';

export default function HomePage() {
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [type, setType] = useState('');
    const [clinicName, setClinicName] = useState('');
    const navigate = useNavigate();
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);

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
            setDistricts(filteredDistricts);
        } catch (error) {
            console.error('Error fetching districts:', error);
            setDistricts([]);
        }
    }
    useEffect(() => {
        fetchProvinces();
    }, []);

    useEffect(() => {
        if (province) {
            fetchDistricts(province * 1);
        }
    }, [province]);

    const handleSearch = async () => {
        try {
            let queryParams = '';
            if (type === 'clinic') {
                queryParams = `?searchType=clinic&clinicName=${clinicName}`;
            } else if (type === 'province') {
                queryParams = `?searchType=province&province=${province}`;
            } else if (type === 'district') {
                queryParams = `?searchType=district&district=${district}`;
            }
            navigate(`/search-result${queryParams}`);
        } catch (error) {
            console.error('Error searching clinics:', error);
        }
    };




    return (
        <div className="container flex flex-col mx-auto p-4">
            <div className="hero h-96" style={{ backgroundImage: 'url("' + head + '")' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <button className="btn btn-primary" onClick={() => navigate('/search-result')}>คลินิกทั้งหมด</button>
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
            <SearchClinicByProvince />
            <br />
            <button className="btn-secondary btn" onClick={() => navigate('/auth/login')}>เข้าสู่ระบบ / ลงทะเบียน</button>
        </div>
    );
}
