import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getClinicById } from '../api/clinic';
function ClinicPage() {


    const { clinicId } = useParams();
    const [clinic, setClinic] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        async function fetchClinic() {
            try {
                const result = await getClinicById(clinicId);
                setClinic(result);
            } catch (error) {
                console.error('Error fetching clinic:', error);
                setErrorMessage('ไม่พบคลินิก'); // Handle errors gracefully
            }
        }
        fetchClinic();
    }, [clinicId]);


    return (
        <div>
            <h1>รายละเอียดคลินิก</h1>
            <h1>{clinic?.name}</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {clinic && (
                <div>
                    <p>{clinic.info?.mobile}</p>
                    <p>{clinic.info?.working_hour}</p>
                    <p>{clinic.info?.website}</p>
                    <p>{clinic.info?.service}</p>
                    <p>{clinic.info?.others}</p>
                    <img src={clinic.info?.photo} alt={clinic.name} />
                    <p>{clinic.district?.name}</p>
                </div>
            )}
        </div>
    );
}

export default ClinicPage;