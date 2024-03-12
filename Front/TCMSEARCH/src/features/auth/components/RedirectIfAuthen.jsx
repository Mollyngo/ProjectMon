import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/use-auth";
import { getToken } from "../../../validators/localStorage";

export function RedirectIfAuthen({ children }) {
    const { authUser } = useAuth();
    if (getToken()) {
        if (authUser?.role === "ADMIN") return <Navigate to="/admin" />;
        else if (authUser) return <Navigate to="/user" />;
    }
    return children;
}
