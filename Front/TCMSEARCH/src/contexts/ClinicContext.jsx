import { createContext } from 'react';
import { useState, useEffect } from 'react';
import * as clinic from '../api/clinic'
import useAuth from '../hooks/use-auth';

export const ClinicContext = createContext();
export default function ClinicContextProvider({ children }) {
    const [clinicUserList, setClinicUserList] = useState([]);


    useEffect(() => {
        clinic
            .getClinicPageByUserAndAdmin()
            .then((response) => {
                setClinicUserList(response.data.clinics);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);
    const createClinic = async (FormData) => {
        await clinic.createClinic(FormData);
    };

    const editClinic = async (clinicId, data) => {
        await clinic.editClinic(clinicId, data);
    }

    return (
        <ClinicContext.Provider
            value={{ clinicUserList, createClinic, editClinic }}>
            {children}
        </ClinicContext.Provider>
    );
}
