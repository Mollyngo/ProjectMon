import React, { useState, useEffect } from "react";
import { getClinicPageByGuest } from "../../api/clinic";
import { Link } from "react-router-dom";
export default function ClinicGuestResultByName() {
    const [clinicList, setClinicList] = useState([]);
    const [filteredClinics, setFilteredClinics] = useState([]);

    useEffect(() => {
        getClinicPageByGuest()
            .then((response) => {
                setClinicList(response.data);
                setFilteredClinics(response.data); // เริ่มต้นด้วยข้อมูลทั้งหมด
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const filterClinicsByName = (searchText) => {
        const filtered = clinicList.filter(clinic =>
            clinic.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredClinics(filtered);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center">Clinic List</h1>
            <input
                type="text"
                className="input input-primary w-full max-w-full join-item"
                placeholder="ค้นหาจากชื่อคลินิก"
                onChange={(e) => filterClinicsByName(e.target.value)}
            />
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
                    {filteredClinics.length > 0 ? (
                        filteredClinics.map((clinic) => (
                            <tr key={clinic.id}>
                                <td>{clinic.name}</td>
                                <td>{clinic.district.name}</td>
                                <td>{clinic.district.province.name}</td>
                                <td>{clinic.info.mobile}</td>
                                <td className="text-center">
                                    <Link to={`/clinic-page/${clinic.id}`}>รายละเอียดเพิ่มเติม</Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No clinics available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
