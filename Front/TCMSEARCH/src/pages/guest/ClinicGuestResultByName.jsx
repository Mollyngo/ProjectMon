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
            <h1 className="text-2xl font-bold text-center m-4">ค้นหาจากชื่อคลินิก</h1>
            <input
                type="text"
                className="input input-primary w-full max-w-full join-item"
                placeholder="ค้นหาจากชื่อคลินิก"
                onChange={(e) => filterClinicsByName(e.target.value)}
            />
            <table className="mt-5 w-full">
                <thead>
                    <tr>
                        <th>ชื่อคลินิก</th>
                        <th>อำเภอ</th>
                        <th>จังหวัด</th>
                        {/* <th>Phone</th> */}
                        {/* <th>Action</th> */}
                    </tr>
                </thead>
                <tbody>
                    {filteredClinics.length > 0 ? (
                        filteredClinics.map((clinic) => (
                            <tr key={clinic.id}>
                                <td>{clinic.name}</td>
                                <td>{clinic.district.name}</td>
                                <td>{clinic.district.province.name}</td>
                                {/* <td>{clinic.info.mobile}</td> */}
                                <td className="text-center text-red-400 underline">
                                    <Link to={`/clinic-page/${clinic.id}`}>อื่นๆ</Link>
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
