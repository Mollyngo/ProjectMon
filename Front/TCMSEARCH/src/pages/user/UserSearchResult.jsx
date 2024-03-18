import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import { getApprovedVisibleClinics } from '../api/clinic'; // Assuming you have an API client

function UserSearchResult() {
    const location = useLocation();
    const [clinics, setClinics] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Parse search params from URL
    const searchParams = new URLSearchParams(location.search);
    const searchType = searchParams.get('searchType');
    const clinicName = searchParams.get('clinicName');
    const provinceId = searchParams.get('province');
    const districtId = searchParams.get('district');

    // Fetch clinic list on initial load
    useEffect(() => {
        async function fetchClinics() {
            try {
                const result = await getApprovedVisibleClinics({
                    searchType,
                    clinicName,
                    provinceId,
                    districtId,
                });
                setClinics(result);
            } catch (error) {
                console.error('Error fetching clinics:', error);
                setErrorMessage('พบข้อผิดพลาดในการดึงข้อมูลคลินิก');
            }
        }
        fetchClinics();
    }, [searchType, clinicName, provinceId, districtId]);

    return (
        <div>
            <h1>ผลการค้นหา</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {clinics.length === 0 && <p>ไม่พบคลินิกที่ตรงกับเกณฑ์การค้นหา</p>}
            {clinics.length > 0 && (
                <ul>
                    {clinics.map((clinic) => (
                        <li key={clinic.id}>
                            <a href={`/clinic/${clinic.id}`}>{clinic.name}</a>
                            <p>{clinic.address}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default UserSearchResult;

