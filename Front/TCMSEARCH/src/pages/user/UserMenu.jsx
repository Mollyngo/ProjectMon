import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { AuthContext } from '../../contexts/AuthContext';


function UserMenu({ user }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        navigate('/auth/login');
    };
    return (
        <div className="menu  rounded-box flex flex-col gap-5" >
            <div className="flex flex-col items-center">
                {/* <img src={user.profile_picture} alt={user.name} /> */}
                {/* <p>ชื่อผู้ใช้: {user.name}</p> */}
            </div>
            <div className="flex flex-col items-center ">
                <Button bg="green" onClick={() => navigate('/profile')}>ข้อมูลส่วนตัว</Button>
                <Button className="btn btn-primary" onClick={() => navigate('/clinic/add')}>เพิ่มคลินิก</Button>
                <Button className="btn btn-primary" onClick={() => navigate('/clinic-list/')}>แก้ไขคลินิก</Button>
                <Button className="btn btn-primary" onClick={() => navigate('/settings')}>ตั้งค่า</Button>
                <Button className="btn btn-primary" onClick={handleLogout}>ออกจากระบบ</Button>
            </div>
        </div>
    );
}


export default UserMenu;
