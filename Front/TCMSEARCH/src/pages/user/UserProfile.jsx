import React, { useState, useEffect } from "react";
import { fetchUser, editUser } from "../../api/auth";
import Button from "../../components/Button";
import Input from "../../components/Input";

export default function UserProfile() {

    const [userData, setUserData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
    });

    useEffect(() => {
        fetchUser().then((userData) => {
            console.log(userData);
            setUserData(userData.data.user);
            console.log(userData);
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            await editUser(userData.id, userData);
            console.log("User data updated successfully!");
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };


    return (
        <div>
            <h1>User Profile</h1>
            <div className="space-y-4">
                <h2>Personal Information</h2>
                <div className="flex flex-col">
                    <label>First Name</label>
                    <Input
                        label="First Name"
                        name="first_name"
                        value={userData.first_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col">
                    <label>Last Name</label>
                    <Input
                        label="Last Name"
                        name="last_name"
                        value={userData.last_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col">

                    <label>Email</label>
                    <Input
                        label="Email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col">
                    <label>Mobile</label>
                    <Input
                        label="Mobile"
                        name="mobile"
                        value={userData.mobile || ""}
                        onChange={handleChange}
                    />
                </div>
                <Button bg="green" onClick={handleSubmit}>Save Changes</Button>
            </div>
        </div>
    );
}