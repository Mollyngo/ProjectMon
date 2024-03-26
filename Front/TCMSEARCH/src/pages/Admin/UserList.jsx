import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllUser, deleteUser } from "../../api/auth";
import useAuth from "../../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const { authUser } = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            const { data } = await getAllUser();
            console.log(data);
            setUsers(data);
            setFilteredUsers(data); // เริ่มต้นด้วยข้อมูลทั้งหมด
        };
        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        try {
            await deleteUser(userId.id);
            console.log("Deleted user with ID:", userId);
            setUsers(users.filter((user) => user.id !== userId.id));
            setFilteredUsers(filteredUsers.filter((user) => user.id !== userId.id)); // ต้องลบทั้งใน users และ filteredUsers
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    const filterUsersByKeyword = (searchKeyword) => {
        const filtered = users.filter((user) => {
            const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
            const email = user.email.toLowerCase();
            const keyword = searchKeyword.toLowerCase();
            return fullName.includes(keyword) || email.includes(keyword);
        });
        setFilteredUsers(filtered);
    };

    return (
        <div className="container">
            <h1 className="text-center text-2xl my-5 ">รายชื่อผู้ใช้งาน</h1>
            <Input
                type="text"
                className="form-control w-full "
                placeholder="ค้นหาจากชื่อ หรืออีเมล"
                onChange={(e) => filterUsersByKeyword(e.target.value)}
            />
            <div className="row">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <div className="col-md-4" key={user._id}>
                            <div className="table">
                                <div className=" flex justify-between py-5 px-2">
                                    <div className="">

                                        <h5 className="card-title"> ชื่อ {user.first_name} {user.last_name}</h5>
                                        <p className="card-text">email {user.email}</p>
                                        <p className="card-text">เบอร์โทร {user.mobile}</p>
                                    </div>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteUser(user)}
                                    >
                                        Delete
                                    </button>
                                </div>
                                <hr />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-md-12 text-center">
                        <p>No users available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserList;
