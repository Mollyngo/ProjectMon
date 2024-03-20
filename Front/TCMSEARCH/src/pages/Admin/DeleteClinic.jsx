import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getAllClinic, deleteClinic } from "../../api/clinic"

function DeleteClinic() {
    const [clinics, setClinics] = useState([]);

    useEffect(() => {
        getAllClinic().then((data) => {
            setClinics(data.data);
        });
    }, []);


    const handleDelete = (clinicId) => {
        if (clinicId && clinicId.id) {
            deleteClinic(clinicId.id)
                .then(() => {
                    setClinics(clinics.filter((clinic) => clinic.id !== clinicId.id));
                })
                .catch((error) => {
                    console.error("Error deleting clinic:", error);
                });
        } else {
            console.error("Invalid clinicId:", clinicId);
        }
    };

    return (
        <div>
            <h1 className="text-xl text-center p-4">ลบคลินิก</h1>
            <table className="w-full">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Visibility</th>
                        <th>ลบคลินิก</th>
                    </tr>
                </thead>
                <tbody>
                    {clinics.map((clinic) => (
                        <tr key={clinic.id}>
                            <td>{clinic.id}</td>
                            <td>{clinic.name}</td>
                            <td>{clinic.status}</td>
                            <td>{clinic.visibility}</td>
                            <td className="text-red-400 underline">
                                <button onClick={() => handleDelete(clinic)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


export default DeleteClinic