import { createContext, useState, useEffect } from 'react';

import * as auth from '../api/auth';
import * as user from '../api/user';
import { getToken, removeToken, storeToken } from '../validators/localStorage';






export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [authUser, setAuthUser] = useState(null);
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        if (getToken()) {
            auth
                .fetchUser()
                .then((response) => {
                    setAuthUser(response.data.authUser);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setInitialLoading(false);
                })
        } else {
            setInitialLoading(false);
        }
    }, []);

    const register = async user => {
        const response = await auth.register(user);
        setAuthUser(response.data.newUser);
        storeToken(response.data.token);
    }

    const login = async credential => {
        const response = await auth.login(credential);
        setAuthUser(response.data.user);
        storeToken(response.data.token);
    }

    const logout = async () => {
        try {
            await auth.logout();
            setAuthUser(null);
            removeToken();
        } catch (error) {
            return error.response.data;
        }
    }

    const getClinicPageByUserAndAdmin = () => {
        try {
            const token = getToken();
            const response = clinic.getClinicPageByUserAndAdmin(token);
            setAuthUser(response.data.user);
        } catch (error) {
            return error.response.data;
        }
    }

    const createClinic = async (FormData) => {
        try {
            const token = getToken();
            const response = await clinic.createClinic(FormData, token);
            setAuthUser(response.data.user);
        } catch (error) {
            return error.response.data;
        }
    }

    const editClinic = async (id, data) => {
        try {
            const token = getToken();
            const response = await clinic.editClinic(id, data, token);
            setAuthUser(response.data.user);
        } catch (error) {
            return error.response.data;
        }

    }

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








