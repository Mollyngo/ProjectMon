
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import head from '../assets/head.png';

export default function Search() {
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [searchType, setSearchType] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const navigate = useNavigate();
    // เรียกใช้งาน getProvinces และ getDistrictsByProvince โดยใช้ useEffect
    useEffect(() => {
        async function fetchData() {
            const result = await getProvinces();
            setProvinces(result);
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            if (province) {
                const result = await getDistrictsByProvince(province);
                setDistricts(result);
            }
        }
        fetchData();
    }, [province]);

    // handleSearch function
    const handleSearch = () => {
        const searchParams = new URLSearchParams();
        searchParams.append('province', province);
        searchParams.append('district', district);
        searchParams.append('searchType', searchType); // เพิ่มการส่งประเภทของตาราง
        history.push(`/searchResult?${searchParams.toString()}`);
    };


    return (
        <div className="container flex flex-col mx-auto p-4">
            <div className="hero h-96" style={{ backgroundImage: 'url("' + head + '")' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        {/* <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                        <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p> */}
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
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                >
                    <option value="">เลือกประเภทของตาราง</option>
                    <option value="clinic">คลินิก</option>
                    <option value="district">อำเภอ</option>
                    <option value="province">จังหวัด</option>
                </select>
                <div className="indicator">
                    {/* <span className="indicator-item badge badge-secondary">new</span> */}
                    <button className="btn-primary btn join-item">Search</button>
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
                    {provinces.map((province) => (
                        <option key={province.id} value={province.name}>
                            {province.name}
                        </option>
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
                    {districts.map((district) => (
                        <option key={district.id} value={district.name}>
                            {district.name}
                        </option>
                    ))}
                </select>
            </label>

            <br />
            <button
                className="btn-primary btn"
                onClick={handleSearch}
            >
                ค้นหาคลินิก
            </button>
            <br />

            <button className="btn-secondary btn" onClick={() => window.location.href = '/login'}>
                เข้าสู่ระบบ / ลงทะเบียน</button>
        </div>
    );
}
