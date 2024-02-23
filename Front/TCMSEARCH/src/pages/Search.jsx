
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import head from '../assets/head.png';
import { getProvinces, getDistrictsByProvince, searchClinics } from '../api/clinic'; // Assuming you have an API client


export default function Search() {
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [searchType, setSearchType] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [clinicName, setClinicName] = useState('');
    const navigate = useNavigate();

    // เรียกใช้งาน getProvinces และ getDistrictsByProvince โดยใช้ useEffect
    //  Fetch provinces on initial load


    useEffect(() => {
        async function fetchProvinces() {
            try {
                const result = await getProvinces();
                setProvinces(result);
            } catch (error) {
                console.error('Error fetching provinces:', error);
                // Handle errors gracefully, e.g., display an error message
            }
        }
        fetchProvinces();
    }, []);

    // Fetch districts based on selected province
    useEffect(() => {
        async function fetchDistricts() {
            if (province) {
                try {
                    const result = await getDistrictsByProvince(province);
                    setDistricts(result);
                } catch (error) {
                    console.error('Error fetching districts:', error);
                    // Handle errors gracefully
                }
            } else {
                setDistricts([]); // Clear districts if province is not selected
            }
        }
        fetchDistricts();
    }, [province]);



    const handleSearch = async () => {
        try {
            let results;
            const searchParams = new URLSearchParams();
            if (searchType === 'clinic') {
                // Search clinics by clinic name
                if (clinicName) {
                    searchParams.append('clinicName', clinicName);
                }
            } else if (searchType === 'province') {
                // Search clinics by province
                if (province) {
                    searchParams.append('province', province);
                }
            } else if (searchType === 'district') {
                // Search clinics by district
                if (district) {
                    searchParams.append('district', district);
                }
            }
            // Call searchClinics API with the appropriate search parameters
            results = await searchClinics(searchParams);

            // Navigate to search results page with matched clinics (implement navigation logic)
            // ทำการนำผลลัพธ์ไปแสดงผลในหน้า search results โดยใช้ข้อมูล results

        } catch (error) {
            console.error('Error searching clinics:', error);
            // Handle errors gracefully
        }
    };

    const handleClickLogin = () => {
        navigate('auth/login');
    }




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
                    {province && province.map(province => (
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
                    {district && district.map(district => (
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

            <button className="btn-secondary btn" onClick={handleClickLogin}>
                เข้าสู่ระบบ / ลงทะเบียน</button>
        </div>
    );
}
