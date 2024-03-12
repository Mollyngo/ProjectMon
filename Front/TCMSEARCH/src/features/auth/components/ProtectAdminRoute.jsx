import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/use-auth";
import { getToken } from "../../../validators/localStorage";

export function ProtectAdminRoute({ children }) {
    const { authUser } = useAuth();
    if (getToken()) {
        if (authUser?.role === "ADMIN") {
            return children;
        } else if (authUser?.role === "USER") {
            return <Navigate to="/user" />;
        } else {
            return <Navigate to="/auth/login" />;
        }
    }
}


