import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getClinics } from "../api/clinic";
import useAuth from "../hooks/use-auth";


function ClinicList() {
    const { auth } = useAuth();
    const [clinic, setClinic] = useState([]);

    useEffect(() => {
        getClinics().then((data) => {
            setClinic(data);
        });
    }, []);

    return (
        <div>
            <h1>Clinic List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Province</th>
                        <th>District</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Website</th>
                    </tr>
                </thead>
                <tbody>
                    {clinic.map((clinic) => (
                        <tr key={clinic.id}
                            value={clinic.id}
                        >
                            <td>{clinic.name}</td>
                            <td>{clinic.province}</td>
                            <td>{clinic.district}</td>
                            <td>{clinic.phone}</td>
                            <td>{clinic.email}</td>
                            <td>{clinic.website}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ClinicList