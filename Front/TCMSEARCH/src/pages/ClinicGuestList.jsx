import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getClinicPageByGuest } from "../api/clinic";
import useAuth from "../hooks/use-auth";

function ClinicGuestList() {
    const [clinics, setClinics] = useState([]);

    useEffect(() => {
        getClinicPageByGuest().then((data) => {
            console.log(data.data);
            setClinics(data.data);
            console.log(data);
        });
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center">Clinic List</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Province</th>
                        <th>District</th>
                        <th>Phone</th>

                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {clinics.length > 0 ? (
                        clinics.map((clinic) => (
                            console.log(clinic),
                            <tr key={clinic.id}>
                                <td>{clinic.name}</td>
                                <td>{clinic.district.name}</td>
                                <td>{clinic.district.province.name}</td>
                                <td>{clinic.info.mobile}</td>
                                <td>
                                    <Link to={`/clinic-page/${clinic.id}`}>รายละเอียดเพิ่มเติม</Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No clinics available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ClinicGuestList;
