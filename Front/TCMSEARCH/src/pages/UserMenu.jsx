import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import { getProvinces, getDistrictsByProvince, searchClinics } from '../api/clinic'; // Assuming you have an API client


function UserMenu({ user }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user data
        setUser(null);
        setIsLoggedIn(false);
        // Redirect to Login page
        navigate('/auth/login');
    };
    return (
        <div className="flex flex-col gap-5" >
            <div className="flex flex-col items-center">
                {/* <img src={user.profile_picture} alt={user.name} /> */}
                {/* <p>{user.name}</p> */}
            </div>
            <div className="flex flex-col items-center ">
                <Button className="btn btn-primary" onClick={() => navigate('/profile')}>ข้อมูลส่วนตัว</Button>
                <Button className="btn btn-primary" onClick={() => navigate('/add-clinic')}>เพิ่มคลินิก</Button>
                <Button className="btn btn-primary" onClick={() => navigate('/edit-clinics')}>แก้ไขคลินิก</Button>
                <Button className="btn btn-primary" onClick={() => navigate('/settings')}>ตั้งค่า</Button>
                <Button className="btn btn-primary" onClick={handleLogout}>ออกจากระบบ</Button>
            </div>
        </div>
    );
}


export default UserMenu;
