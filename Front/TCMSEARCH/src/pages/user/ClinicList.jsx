import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllClinic } from "../../api/clinic";

function ClinicList({ clinicName }) {
    const [clinics, setClinics] = useState([]);

    useEffect(() => {
        getAllClinic().then((data) => {
            const filteredClinics = clinicName ? data.data.filter(clinic => clinic.name.includes(clinicName)) : data.data;
            setClinics(filteredClinics);
        });
    }, [clinicName]);

    return (
        <div>
            <h1>Clinic List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Province</th>
                        <th>District</th>
                        {/* <th>Phone</th>
                        <th>Email</th>
                        <th>Website</th> */}
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
                                {/* <td>{clinic.info.mobile}</td>
                                <td>{clinic.info.email}</td>
                                <td>{clinic.info.website}</td> */}
                                <td>
                                    <Link to={`/clinic/edit/${clinic.id}`}>Edit</Link>
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

export default ClinicList;
