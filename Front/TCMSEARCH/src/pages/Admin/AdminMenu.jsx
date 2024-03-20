import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { AuthContext } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function AdminMenu() {
    const { authUser } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!authUser) {
        return <Navigate to="/auth/login" />; // Redirect ไปหน้า login
    }

    const { role } = authUser; // ดึง role จาก user
    if (role !== 'ADMIN') {
        return <Navigate to="/admin-menu" />; // Redirect ไปหน้าหลัก
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/auth/login');
    };

    return (
        <div className="menu bg-white  rounded-lg shadow-lg p-4">
            <h1 className="text-xl font-bold mb-4">เมนูผู้ดูแลระบบ</h1>
            <ul className="flex flex-col gap-4">
                <Button className="btn btn-primary" onClick={() => navigate('/clinic/add')}>
                    เพิ่มคลินิก
                </Button>
                <Button onClick={() => navigate('/admin-list')} className="btn btn-secondary">
                    อนุมัติและแก้ไขคลินิก
                </Button>
                <Button onClick={() => navigate('/delete-clinic')} className="btn btn-secondary">
                    ลบคลินิก
                </Button>
                <Button onClick={() => navigate('/admin-user')} className="btn btn-secondary">
                    ดูข้อมูลผู้ใช้
                </Button>
                <Button onClick={handleLogout} className="btn btn-secondary">
                    ออกจากระบบ
                </Button>
            </ul>
        </div>
    );
}
