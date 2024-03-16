import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllClinic } from "../api/clinic";
import useAuth from "../hooks/use-auth";
import { statusClinic, visibilityClinic } from "../api/auth";

export default function AdminClinicList() {
    const [clinics, setClinics] = useState([]);

    useEffect(() => {
        getAllClinic().then((data) => {
            setClinics(data.data);
        });
    }, []);

    const handleStatusChange = (clinicId) => {
        if (clinicId && clinicId.id) {
            const newStatus = clinicId.status === "APPROVED" ? "PENDING" : "APPROVED";
            console.log(newStatus);
            statusClinic(clinicId.id, { status: newStatus })
                .then(() => {
                    setClinics(
                        clinics.map((clinic) =>
                            clinic.id === clinicId.id ? { ...clinic, status: newStatus } : clinic
                        )
                    );
                })
                .catch((error) => {
                    console.error("Error updating clinic status:", error);
                });
        } else {
            console.error("Invalid clinicId:", clinicId);
        }
    };

    const handleVisibilityChange = (clinicId) => {
        if (clinicId && clinicId.id) { // ตรวจสอบว่า clinicId มีค่าและมีค่า id ด้วย
            const newVisibility = clinicId.visibility === "VISIBLE" ? "HIDDEN" : "VISIBLE";
            visibilityClinic(clinicId.id, { visibility: newVisibility })
                .then(() => {
                    setClinics(
                        clinics.map((clinic) =>
                            clinic.id === clinicId.id ? { ...clinic, visibility: newVisibility } : clinic
                        )
                    );
                })
                .catch((error) => {
                    console.error("Error updating clinic visibility:", error);
                });
        } else {
            console.error("Invalid clinicId:", clinicId);
        }
    };




    return (
        <div>
            <h1>Clinic List</h1>
            <table className="table w-[200px]">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Province</th>
                        <th>District</th>
                        <th>Status</th>
                        <th>Visibility</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {clinics.length > 0 ? (
                        clinics.map((clinic) => (
                            <tr key={clinic.id}>
                                <td>{clinic.name}</td>
                                <td>{clinic.district.name}</td>
                                <td>{clinic.district.province.name}</td>
                                <td>
                                    <button
                                        className={`badge ${clinic.status === 'APPROVED' ? 'badge-success' : 'badge-warning'}`}
                                        onClick={() => handleStatusChange(clinic)}
                                    >
                                        {clinic.status}
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className={`badge ${clinic.visibility === 'VISIBLE' ? 'badge-success' : 'badge-warning'}`}
                                        onClick={() => handleVisibilityChange(clinic)}
                                    >
                                        {clinic.visibility}
                                    </button>

                                </td>
                                <td>
                                    <Link to={`/clinic/edit/${clinic.id}`} className="btn btn-primary">
                                        Edit
                                    </Link>
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

