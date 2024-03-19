import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function SearchByName() {
    const [clinicName, setClinicNameLocal] = useState('');
    const navigate = useNavigate();

    const handleSearch = async () => {
        console.log(clinicName);
        try {
            // ส่งคำค้นหาไปยังหน้า ClinicGuestResultByName ผ่าน query parameter
            navigate(`/search-name/${clinicName}`);
        } catch (error) {
            console.error('Error searching clinics:', error);
        }
    };

    return (
        <div className="container flex flex-col mx-auto">
            <br />
            <div className="join">
                <div className='w-full'>
                    <div className="join-item ">
                        <input
                            className="input input-primary w-full max-w-full join-item"
                            placeholder="ค้นหาจากชื่อคลินิก"
                            value={clinicName}
                            onChange={(e) => setClinicNameLocal(e.target.value)}
                        />
                    </div>
                </div>
                <div className="indicator">
                    {/* เมื่อคลิกปุ่ม ให้เรียกใช้ handleSearch */}
                    <button className="btn-primary btn join-item" onClick={handleSearch}>ค้นหา</button>
                </div>
            </div>
        </div>
    );
}
