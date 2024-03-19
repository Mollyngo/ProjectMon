import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import head from '../../assets/head.png';
import SearchByName from '../../features/SearchByName';
import SearchClinicByProvince from '../../features/SearchClinicByProvince';

export default function HomePage() {

    const navigate = useNavigate();

    return (
        <div className="container flex flex-col mx-auto p-4">
            <div className="hero h-36" style={{ backgroundImage: 'url("' + head + '")' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                </div>
            </div>
            <br />
            <h2 className='text-3xl'>ค้นหาคลินิกตามชื่อ</h2>
            <button className="btn-secondary btn" onClick={() => navigate('/search-name')}>ค้นหา</button>

            <br />

            <h2 className='text-3xl'>ค้นหาคลินิกตามจังหวัด</h2>
            <SearchClinicByProvince />
            <br />
            <button className="btn-secondary btn" onClick={() => navigate('/auth/login')}>เข้าสู่ระบบ / ลงทะเบียน</button>
        </div>
    );
}
