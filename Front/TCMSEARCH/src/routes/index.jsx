import React from "react";
import { Navigate } from "react-router-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import useAuth from "../hooks/use-auth";
import Search from "../pages/Search";
import UserMenu from "../pages/UserMenu";
import UserSearchResult from "../pages/UserSearchResult";
import UserClinicPage from "../pages/UserClinicPage";
import AdminMenu from "../pages/AdminMenu";
import AddClinic from "../pages/AddClinic";
import EditClinic from "../pages/EditClinic";
import ClinicPage from "../pages/ClinicPage";
import SearchResult from "../pages/SearchResult";
import ClinicList from "../pages/ClinicList";
import AdminClinicList from "../pages/AdminClinicList";
import HomePage from "../pages/HomePage";

const userRoutes = [
    { path: "/user-menu", element: <UserMenu /> },
    { path: "/user-search-result", element: <UserSearchResult /> },
    { path: "/user-clinic-page", element: <UserClinicPage /> },
];

const adminRoutes = [
    { path: "/admin-menu", element: <AdminMenu /> },
    { path: "/admin-list", element: <AdminClinicList /> },
];

const clinicRoutes = [
    { path: "/clinic/add", element: <AddClinic /> },
    { path: "/clinic/edit/:clinic_id", element: <EditClinic /> },
    { path: "/clinic-page", element: <ClinicPage /> },
    { path: "/clinic-list", element: <ClinicList /> },
];

const Routes = () => {
    const auth = useAuth();

    return (
        <RouterProvider
            router={createBrowserRouter([
                { path: "/", element: <HomePage /> },
                { path: "/auth/login", element: <Login /> },
                { path: "/auth/register", element: <Register /> },
                { path: "/search", element: <Search /> },
                ...userRoutes,
                ...adminRoutes,
                ...clinicRoutes,
                { path: "*", element: <Navigate to="/" /> },
            ])}
        />
    );
};

export default Routes;