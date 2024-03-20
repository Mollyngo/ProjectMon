import React from "react";
import useAuth from "../hooks/use-auth";
import { Navigate } from "react-router-dom";

export default function ProtectAdmin({ children }) {
    const { authUser } = useAuth();
    if (!authUser === "ADMIN") {
        return <Navigate to="/auth/login" />;
    }
    return children;
}