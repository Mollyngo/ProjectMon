import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { searchClinics } from '../../api/clinic';


const UserClinicPage = () => {
    const { userId } = useParams();
    const [clinics, setClinics] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        async function fetchClinics() {
            try {
                const result = await searchClinics({ userId });
                setClinics(result);
            } catch (error) {
                console.error('Error fetching clinics:', error);
                setErrorMessage('เกิดข้อผิดพลาดในการดึงข้อมูลคลินิก'); // Handle errors gracefully
            }
        }
        fetchClinics();
    }, [userId]);

    return (
        <div>
            <h1>คลินิกของฉัน</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {clinics.map((clinic) => (
                <div key={clinic.id}>
                    <h2>{clinic.name}</h2>
                    <p>สถานะ: {clinic.status}</p>
                    <p>การมองเห็น: {clinic.visibility}</p>
                    <p>{clinic.info?.mobile}</p>
                    <p>{clinic.info?.working_hour}</p>
                    <p>{clinic.info?.website}</p>
                    <p>{clinic.info?.service}</p>
                    <p>{clinic.info?.others}</p>

                    <img src={clinic.info?.photo} alt={clinic.name} />

                    <p>{clinic.district?.name}</p>

                    <button onClick={() => navigate(`/edit-clinic/${clinic.id}`)}>แก้ไข</button>

                    {/* Add button to delete clinic if needed */}

                </div>
            ))}
        </div>
    );
};

export default UserClinicPage;
