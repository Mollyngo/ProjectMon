import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { AuthContext } from '../contexts/AuthContext';

function AdminMenu() {

    // const { authUser } = useContext(AuthContext);

    // const navigate = useNavigate()
    // if (!authUser) {
    //     return <Navigate to="/auth/login" />; // Redirect ไปหน้า login
    // }

    // const { role } = authUser; // ดึง role จาก user

    // if (role !== 'ADMIN') {
    //     return <Navigate to="/" />; // Redirect ไปหน้าหลัก
    // }

    return (
        <div className="admin-menu flex flex-col">
            <h1>เมนูผู้ดูแลระบบ</h1>
            <ul className="flex flex-col gap-5">
                <Button className="btn btn-primary" onClick={() => navigate('/add-clinic')}>เพิ่มคลินิก</Button>
                <Button onClick={() => navigate('/edit-clinic')}>แก้ไขคลินิก</Button>
                <Button onClick={() => navigate('/delete-clinic')}>ลบคลินิก</Button>
                <Button onClick={() => navigate('/clinic-approve')}>อนุมัติคลินิก</Button>
                <Button onClick={() => navigate('/users')}>ดูข้อมูลผู้ใช้</Button>
            </ul>
        </div>
    );
};

export default AdminMenu;