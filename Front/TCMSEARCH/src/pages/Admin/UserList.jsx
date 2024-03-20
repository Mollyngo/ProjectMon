import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllUser, deleteUser } from "../../api/auth";
import useAuth from "../../hooks/use-auth";


const UserList = () => {
    const [users, setUsers] = useState([]);
    const { authUser } = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            const { data } = await getAllUser();
            console.log(data);
            setUsers(data);
        };
        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        try {

            await deleteUser(userId.id);
            console.log("Deleted user with ID:", userId);

            setUsers(users.filter((user) => user.id !== userId.id));
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    return (
        <div className="container">
            <h1 className="text-center">User List</h1>
            <div className="row">
                {users.map((user) => (
                    <div className="col-md-4" key={user._id}>
                        <div className="table">
                            <div className="card-body">
                                <h5 className="card-title">{user.first_name}</h5>
                                <p className="card-text">{user.last_name}</p>
                                <p className="card-text">{user.email}</p>
                                <p className="card-text">{user.role}</p>
                                <button
                                    className="btn btn-danger"
                                    onClick={handleDeleteUser}
                                >
                                    Delete
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserList;