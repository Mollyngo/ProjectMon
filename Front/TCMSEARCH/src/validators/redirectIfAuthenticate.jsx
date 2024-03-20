import { Navigate } from "react-router-dom";
import useAuth from "../hooks/use-auth";

export default function RedirectIfAuthenticate({ children }) {
    const { authUser } = useAuth();
    if (!authUser) {
        return <Navigate to="/auth/login" />;
    }
    return children;
}