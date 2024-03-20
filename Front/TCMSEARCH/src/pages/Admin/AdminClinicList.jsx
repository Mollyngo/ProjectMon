import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllClinic } from "../../api/clinic";
import useAuth from "../../hooks/use-auth";
import { statusClinic, visibilityClinic } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export default function AdminClinicList() {
    const [clinics, setClinics] = useState([]);
    const navigate = useNavigate
    useEffect(() => {
        getAllClinic().then((data) => {
            setClinics(data.data);
        });
    }, []);

    const handleStatusChange = (clinicId) => {
        if (clinicId && clinicId.id) {
            const newStatus = clinicId.status === "APPROVED" ? "PENDING" : "APPROVED";
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
        if (clinicId && clinicId.id) {
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
            <div className="my-8 ">

                <h1 className="text-xl text-center font-bold mb-4">รายชื่อคลินิก</h1>
                <table className="w-max min-w-full gap-y-4 text-sm">
                    <thead className="color-grey-500">
                        <tr  >
                            <th className="w-1/6 text-center">Name</th>
                            {/* <th className="w-1/6 text-center">District</th> */}
                            <th className="w-1/6 text-center">Province</th>
                            <th className="w-1/6 text-center">Status</th>
                            <th className="w-1/6 text-center">Visibility</th>
                            <th className="w-1/6 text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {clinics.length > 0 ? (
                            clinics.map((clinic) => (
                                <tr key={clinic.id}>
                                    <td className="text-center">{clinic.name}</td>
                                    {/* <td className="text-center">{clinic.district.name}</td> */}
                                    <td className="text-center">{clinic.district.province.name}</td>
                                    <td className="text-center">
                                        <button
                                            className={`badge ${clinic.status === 'APPROVED' ? 'badge-success' : 'badge-warning'}`}
                                            onClick={() => handleStatusChange(clinic)}
                                        >
                                            {clinic.status}
                                        </button>
                                    </td>
                                    <td className="text-center ">
                                        <button
                                            className={
                                                `badge ${clinic.visibility === 'VISIBLE' ? 'badge-success' : 'badge-warning'}`}
                                            onClick={() => handleVisibilityChange(clinic)}
                                        >
                                            {clinic.visibility}
                                        </button>
                                    </td>
                                    <td className="text-center text-red-800">
                                        <Link to={`/clinic/edit/${clinic.id}`} className="p-0">
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No clinics available</td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
        </div>
    );
}
