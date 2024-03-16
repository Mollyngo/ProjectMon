import React, { useState, useEffect } from 'react';
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
           

            const result = await getClinicPageByGuest(province, district, searchType);
            setClinics(result);
        }
        fetchData();
    }, [province, district, searchType]);

    return (
        <div>
            <div>
                <div className="overflow-x-auto mt-4">
                    <div>
                        <h1 className="text-2xl font-bold text-center">ผลการค้นหา</h1>
                    </div>
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>ชื่อคลินิก</th>
                                <th>อำเภอ</th>
                                <th>จังหวัด</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* rows */}
                            {clinics.map((clinic, index) => (
                                <tr key={clinic.id}>
                                    <th>{index + 1}</th>
                                    <td>{clinic.name}</td>
                                    <td>{clinic.district.name}</td>
                                    <td>{clinic.district.province.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
