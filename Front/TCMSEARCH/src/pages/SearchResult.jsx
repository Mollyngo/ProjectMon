
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getClinicPageByGuest } from '../api/clinic';

export default function SearchResult() {
    const [clinics, setClinics] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const province = queryParams.get('province');
    const district = queryParams.get('district');
    const searchType = queryParams.get('searchType');

    useEffect(() => {
        async function fetchData() {
            try {
                let filteredClinics = [];
                const result = await getClinicPageByGuest();

                // กรองคลินิกตามค่าที่รับมาจากหน้าอื่น
                if (province && district && searchType) {
                    filteredClinics = result.filter(clinic => {
                        return clinic.district.province.name === province &&
                            clinic.district.name === district &&
                            clinic.name === searchType;
                    });
                } else if (province && district) {
                    filteredClinics = result.filter(clinic => {
                        return clinic.district.province.name === province &&
                            clinic.district.name === district;
                    });
                } else if (province) {
                    filteredClinics = result.filter(clinic => {
                        return clinic.district.province.name === province;
                    });
                } else {
                    filteredClinics = result; // ไม่มีการกรอง
                }

                setClinics(filteredClinics);
            } catch (error) {
                console.error('Error fetching clinics:', error);
            }
        }

        fetchData();
    }, [province, district, searchType]);



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
                                <td className="text-center">
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
