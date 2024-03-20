import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getClinicPageByGuest } from "../../api/clinic";

function ClinicGuestList() {
    const { province, district } = useParams();
    const [clinics, setClinics] = useState([]);

    useEffect(() => {
        const fetchClinicPageByGuest = async (province, district) => {
            try {
                const result = await getClinicPageByGuest(province, district);
                console.log(result.data);
                return result.data;
            } catch (error) {
                console.error('Error fetching clinics:', error);
                return [];
            }
        };

        const fetchClinics = async () => {
            try {
                const result = await fetchClinicPageByGuest(province, district);
                const filteredClinics = result.filter((clinic) => {
                    // กรองคลินิกที่ตรงกับ district และ province ที่ระบุ (ถ้ามีทั้ง province และ district)
                    if (province && district) {
                        return clinic.district.province.id === Number(province) &&
                            clinic.district.id === Number(district);
                    }
                    // กรองคลินิกที่ตรงกับ district ที่ระบุ (ถ้ามีเฉพาะ district)
                    else if (district) {
                        return clinic.district.id === Number(district);
                    }
                    // ไม่กรองเลย (ถ้าไม่มี province และ district)
                    else {
                        return true;
                    }
                });


                setClinics(filteredClinics);
            } catch (error) {
                console.error('Error fetching clinics:', error);
            }
        };

        fetchClinics();
    }, [province, district]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">ผลการค้นหา</h1>
            <table className="gap-5 w-full ">
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
                    {clinics.length > 0 ? (
                        clinics.map((clinic) => (
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

export default ClinicGuestList;
