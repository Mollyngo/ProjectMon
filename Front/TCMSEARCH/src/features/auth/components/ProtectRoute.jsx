import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export function ProtectRoute({ children }) {
    const { authUser } = useContext(AuthContext);
    if (!authUser) {
        return <Navigate to="/auth/login" />;
    }
    return children;
}