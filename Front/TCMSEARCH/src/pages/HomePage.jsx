
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import head from '../assets/head.png';
import { getProvinces, searchClinics, getDistricts, getAllClinic } from '../api/clinic'; // Assuming you have an API client
import useAuth from '../hooks/use-auth';


export default function HomePage() {
    const { authUser } = useAuth()
    console.log(authUser)
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [type, setType] = useState('');
    const [clinicName, setClinicName] = useState('');
    const navigate = useNavigate();


    const fetchDistricts = async (province) => {
        try {
            const districts = await getDistricts(province);
            setDistrict(districts);
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    }

    useEffect(() => {
        if (province) {
            fetchDistricts(province); // Fetch districts based on selected province
        } else {
            setDistrict([]); // Reset districts if no province is selected
        }
    }, [province]);


    const fetchAllClinic = async () => {
        try {
            const results = await getAllClinic();
            console.log(results);
        } catch (error) {
            console.error(error);
        }
    }


    const handleSearch = async () => {
        try {
            let results;
            const searchParams = new URLSearchParams();
            if (type === 'clinic') {
                // Search clinics by clinic name
                if (clinicName) {
                    searchParams.append('clinicName', clinicName);
                }
            } else if (type === 'province') {
                // Search clinics by province
                if (province) {
                    searchParams.append('province', province);
                }
                if (province) {
                    await fetchDistricts(province); // Fetch districts based on selected province
                }
            } else if (type === 'district') {
                // Search clinics by district
                if (district) {
                    searchParams.append('district', district);
                }
            }

            results = await searchClinics(searchParams);

        } catch (error) {
            console.error('Error searching clinics:', error);
        }
    };
    const handleClickLogin = () => {
        navigate('/auth/login');
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
                    value={type}
                    onChange={(e) => setType(e.target.value)}
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

            <select
                className="select select-primary select-bordered join-item"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
            >
                <option value="">เลือกอำเภอ</option>
                {district && district.map(district => (
                    district.province_id === parseInt(province) && (
                        <option key={district.id} value={district.name}>
                            {district.name}
                        </option>
                    )
                ))}
            </select>

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
                        district.province_id === parseInt(province) && (
                            <option key={district.id} value={district.name}>
                                {district.name}
                            </option>
                        )
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

            {!authUser && <button className="btn-secondary btn" onClick={handleClickLogin}>
                เข้าสู่ระบบ / ลงทะเบียน</button>}
        </div>
    );
}
