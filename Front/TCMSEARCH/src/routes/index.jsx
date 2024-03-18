import React from "react";
import { Navigate } from "react-router-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "../pages/guest/Login";
import Register from "../pages/guest/Register";
import useAuth from "../hooks/use-auth";
import Search from "../pages/Search";
import UserMenu from "../pages/user/UserMenu";
import UserSearchResult from "../pages/user/UserSearchResult";
import UserClinicPage from "../pages/user/UserClinicPage";
import AdminMenu from "../pages/Admin/AdminMenu";
import AddClinic from "../pages/user/AddClinic";
import EditClinic from "../pages/user/EditClinic"
import ClinicPage from "../pages/guest/ClinicPage";
import SearchResult from "../pages/guest/SearchResult"
import ClinicList from "../pages/user/ClinicList"
import AdminClinicList from "../pages/Admin/AdminClinicList"
import HomePage from "../pages/guest/HomePage";
import ClinicGuestList from "../pages/guest/ClinicGuestList";
import UserProfile from "../pages/user/UserProfile";


const userRoutes = [
    { path: "/user-menu", element: <UserMenu /> },
    { path: "/user-search-result", element: <UserSearchResult /> },
    { path: "/user-clinic-page", element: <UserClinicPage /> },
    { path: "/clinic/edit/:clinic_id", element: <EditClinic /> },
    { path: "/clinic-list", element: <ClinicList /> },
    { path: "/profile", element: <UserProfile /> },
];

const adminRoutes = [
    { path: "/admin-menu", element: <AdminMenu /> },
    { path: "/admin-list", element: <AdminClinicList /> },
];

const clinicRoutes = [
    { path: "/clinic/add", element: <AddClinic /> },
    { path: "/clinic-page/:clinic_id", element: <ClinicPage /> },
    { path: "/search-result", element: <ClinicGuestList /> },
];

const Routes = () => {
    const auth = useAuth();

    return (
        <RouterProvider
            router={createBrowserRouter([
                { path: "/", element: <HomePage /> },
                { path: "/auth/login", element: <Login /> },
                { path: "/auth/register", element: <Register /> },
                { path: "/search-result?${searchParams.toString()} ", element: <SearchResult /> },
                ...userRoutes,
                ...adminRoutes,
                ...clinicRoutes,
                { path: "*", element: <Navigate to="/" /> },
            ])}
        />
    );
};

export default Routes;