import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function SearchByName() {
    const [userName, setUserNameLocal] = useState('');
    const navigate = useNavigate();

    const handleSearch = async () => {
        console.log(userName);
        try {
            // ส่งคำค้นหาไปยังหน้า userGuestResultByName ผ่าน query parameter
            navigate(`/search-name/${userName}`);
        } catch (error) {
            console.error('Error searching users:', error);
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
                            placeholder="ค้นหาจากชื่อ"
                            value={userName}
                            onChange={(e) => setUserNameLocal(e.target.value)}
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
