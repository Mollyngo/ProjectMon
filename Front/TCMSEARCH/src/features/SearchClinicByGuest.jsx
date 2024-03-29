import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getClinicPageByGuest } from "../api/clinic";
import { getProvinces, getDistricts } from "../api/clinic";



export const SearchClinicByGuest = () => {

    const [clinics, setClinics] = useState([]);
    const navigate = useNavigate();
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [type, setType] = useState('');
    const [clinicName, setClinicName] = useState('');
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
        async function fetchClinics() {
            try {
                const result = await getClinicPageByGuest();
                setClinics(result);
            } catch (error) {
                console.error('Error fetching clinics:', error);
            }
        }
        fetchClinics();
    }, []);

    const handleSearch = () => {
        try {

            let filteredClinics;
            if (clinic) {
                filteredClinics = [...clinic]
            } else {
                filteredClinics = [];
            }
            // กรองคลินิกตามจังหวัดที่เลือก
            if (province) {
                filteredClinics = filteredClinics.filter(clinicData => clinicData.district.province === province);
                console.log(province)
            }

            // กรองคลินิกตามอำเภอที่เลือก (หากมีการเลือก)
            if (district) {
                filteredClinics = filteredClinics.filter(clinicData => clinicData.district_id === district);
                console.log(filteredClinics)
            }

            setClinic(filteredClinics); // ตั้งค่ารายชื่อคลินิกใน state clinic

        } catch (error) {
            console.error('Error searching clinics:', error);
        }
    };



    return (
        <div>
            <div>
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
                <button className="btn-primary btn" onClick={handleSearch}>ค้นหาคลินิก</button>

            </div>
        </div>
    );

}