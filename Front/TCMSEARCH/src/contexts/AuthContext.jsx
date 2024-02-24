import { createContext, useState, useEffect } from 'react';

import * as auth from '../api/auth';
import * as user from '../api/user';
import * as clinic from '../api/clinic';
import { getToken, removeToken, storeToken } from '../validators/localStorage';


export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [authUser, setAuthUser] = useState(null);
    const [initialLoading, setInitialLoading] = useState(true);


    console.log(authUser)
    // ใน useEffect
    useEffect(() => {
        // const token = getToken();
        // console.log(token)
        if (getToken()) {
            auth
                .fetchUser()
                .then((response) => {
                    console.log(response.data.user)
                    setAuthUser(response.data.user);
                    console.log(authUser)
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setInitialLoading(false);
                });
        } else {
            setInitialLoading(false);
        }
    }, []);

    // ใน login และ register
    const register = async (user) => {
        try {
            const response = await auth.register(user);
            setAuthUser(response.data.newUser);
            storeToken(response.data.accessToken);
        } catch (error) {
            console.log(error);
        }
    };

    const login = async (credential) => {
        try {
            const response = await auth.login(credential);
            console.log(response)

            setAuthUser(response.data.user);
            storeToken(response.data.accessToken);

        } catch (error) {
            console.log(error);
        }
    };

    // ใน logout
    const logout = async () => {
        try {
            await auth.logout();
            setAuthUser(null);
            removeToken();
        } catch (error) {
            console.log(error);
        }
    };

    // ใน getClinicPageByUserAndAdmin, createClinic, editClinic
    const getClinicPageByUserAndAdmin = async () => {
        try {
            const token = getToken();
            const response = await clinic.getClinicPageByUserAndAdmin(token);
            setAuthUser(response.data.user);
        } catch (error) {
            console.log(error);
        }
    };

    const createClinic = async (FormData) => {
        try {
            const token = getToken();
            const response = await clinic.createClinic(FormData, token);
            setAuthUser(response.data.user);
        } catch (error) {
            console.log(error);
        }
    };

    const editClinic = async (id, data) => {
        try {
            const token = getToken();
            const response = await clinic.editClinic(id, data, token);
            setAuthUser(response.data.user);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                authUser,
                register,
                login,
                logout,
                createClinic,
                editClinic,
                getClinicPageByUserAndAdmin,
                initialLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    );



}








