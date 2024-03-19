import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { AuthContext } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
export default function AdminMenu() {

    const { authUser } = useContext(AuthContext);

    const navigate = useNavigate()
    if (!authUser) {
        return <Navigate to="/auth/login" />; // Redirect ไปหน้า login
    }
    const { role } = authUser; // ดึง role จาก user
    if (role !== 'ADMIN') {
        return <Navigate to="/admin-menu" />; // Redirect ไปหน้าหลัก
    }
    return (
        <div className="menu  rounded-box">
            <h1>เมนูผู้ดูแลระบบ</h1>
            <ul className="flex flex-col gap-5">
                <Button className="btn btn-primary" onClick={() => navigate('/clinic/add')}>เพิ่มคลินิก</Button>
                <Button onClick={() => navigate('/admin-list')}> อนุมัติและแก้ไขคลินิก </Button>
                <Button onClick={() => navigate('/delete-clinic')}>ลบคลินิก </Button>
                <Button onClick={() => navigate('/users')}>ดูข้อมูลผู้ใช้ </Button>
            </ul>
        </div >
    );
}

