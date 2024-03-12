import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { getProvinces, getDistrictsByProvince } from '../api/clinic';
import { useState, useEffect } from 'react';
// import { getClinicById } from '../api/clinic';

import Button from '../components/Button';

export default function AdminApprove() {
    const navigate = useNavigate();

    const [clinics, setClinics] = useState([]);

    const handleApprove = async (clinicId) => {
        // Implement logic to approve clinic
        // ...
        const updatedClinics = clinics.map((clinic) => {
            if (clinic.id === clinicId) {
                return { ...clinic, status: 'APPROVED', visibility: 'VISIBLE' };
            }
            return clinic;
        });
        setClinics(updatedClinics);
    };

    const handleReject = async (clinicId) => {
        // Implement logic to reject clinic
        // ...
        const updatedClinics = clinics.filter((clinic) => clinic.id !== clinicId);
        setClinics(updatedClinics);
    };

    return (
        <div className=" gap-6">
            <h1>อนุมัติคลินิก</h1>
            <table className="table table-striped text-center gap-3">
                <thead>
                    <tr>
                        <th>ชื่อคลินิก</th>
                        <th>สถานะ</th>
                        <th>การดำเนินการ</th>
                    </tr>
                </thead>
                <tbody>

                    {clinics.map((clinic) => (
                        <tr key={clinic.id}>
                            <td>{clinic.name}</td>
                            <td>{clinic.status}</td>
                            <td>
                                <Button onClick={() => handleApprove(clinic.id)}>อนุมัติ</Button>
                                <Button onClick={() => handleReject(clinic.id)}>ปฏิเสธ</Button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
}

