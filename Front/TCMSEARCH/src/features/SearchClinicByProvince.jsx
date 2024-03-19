import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProvinces, getDistricts, getClinicPageByGuest } from '../api/clinic'; // Assuming you have an API client

export default function SearchClinicByProvince() {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const navigate = useNavigate();
    const [clinic, setClinic] = useState([]);

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

    useEffect(() => {
        const fetchAllClinicData = async () => {
            try {
                const result = await getClinicPageByGuest();
                setClinic(result.data.clinic);
            } catch (error) {
                console.error('Error fetching clinics:', error);
            }
        };

        fetchAllClinicData();
    }, [province, district]);

    const handleSearch = (e) => {
        e.preventDefault(); // Prevent form submission
        try {
            // Encode province and district values to be passed in URL
            const encodedProvince = encodeURIComponent(province);
            const encodedDistrict = encodeURIComponent(district);

            // Redirect to ClinicGuestList page with province and district parameters
            navigate(`/search-result/${encodedProvince}/${encodedDistrict}`);
        } catch (error) {
            console.error('Error searching clinics:', error);
        }
    };

    return (
        <div>
            <div>
                <form className="w-full" onSubmit={handleSearch}>
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
                    <button className="btn-primary mt-9 btn w-full mx-0" type='submit'>ค้นหาคลินิก</button>
                </form>
            </div>
        </div>
    );
}
