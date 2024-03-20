import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/use-auth';
import { editUser } from '../../api/auth';

const AdminEditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { authUser } = useAuth();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        mobile: '',
        address: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await editUser(id, formData);
            console.log(response);
            navigate('/admin/user');
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (authUser) {
            setFormData({
                first_name: authUser.first_name,
                last_name: authUser.last_name,
                email: authUser.email,
                mobile: authUser.mobile,
                address: authUser.address,
            });
        }
    }, [authUser]);

    return (
        <div>
            <h1>Edit User</h1>
            <form onSubmit={handleSubmit} className='form flex flex-col gap-5'>
                <label>
                    First Name:
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Mobile:
                    <input
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Address:
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AdminEditUser;