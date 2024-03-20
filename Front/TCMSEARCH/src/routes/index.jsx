import React from "react";
import { Navigate } from "react-router-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "../pages/guest/Login";
import Register from "../pages/guest/Register";
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
import ClinicGuestResultByName from "../pages/guest/ClinicGuestResultByName";
import DeleteClinic from "../pages/Admin/DeleteClinic";
import ProtectAdmin from "../validators/protectAdmin";
import RedirectIfAuthenticate from "../validators/redirectIfAuthenticate";
import AdminEditUser from "../pages/Admin/AdminEditUser";
import UserList from "../pages/Admin/UserList";
const userRoutes = [
    {
        path: "/user-menu", element:
            <RedirectIfAuthenticate>
                <UserMenu />
            </RedirectIfAuthenticate>
    },
    {
        path: "/user-search-result", element:
            <RedirectIfAuthenticate>
                <UserSearchResult />
            </RedirectIfAuthenticate>
    },
    {
        path: "/user-clinic-page", element:
            <RedirectIfAuthenticate>
                <UserClinicPage />
            </RedirectIfAuthenticate>
    },
    {
        path: "/clinic/edit/:clinic_id", element:
            <RedirectIfAuthenticate>
                <EditClinic />
            </RedirectIfAuthenticate>
    },
    {
        path: "/clinic-list", element:
            <RedirectIfAuthenticate>
                <ClinicList />
            </RedirectIfAuthenticate>
    },
    {
        path: "/profile", element:
            <RedirectIfAuthenticate>
                <UserProfile />
            </RedirectIfAuthenticate>
    },
    {
        path: "/clinic/add", element:
            <RedirectIfAuthenticate>
                <AddClinic />
            </RedirectIfAuthenticate>
    },
];

const adminRoutes = [

    {
        path: "/admin-menu", element:
            <ProtectAdmin>
                <AdminMenu />
            </ProtectAdmin>
    },
    {
        path: "/admin-list", element:
            <ProtectAdmin>
                <AdminClinicList />
            </ProtectAdmin>
    },
    {
        path: "/delete-clinic", element:
            <ProtectAdmin>
                <DeleteClinic />
            </ProtectAdmin>
    },
    {
        path: "/admin-user", element:
            <ProtectAdmin>
                <AdminEditUser />
            </ProtectAdmin>
    },
    {
        path: "/userlist", element:
            <ProtectAdmin>
                <UserList />
            </ProtectAdmin>
    }
];


const Routes = () => {
    return (
        <RouterProvider
            router={createBrowserRouter([
                { path: "/", element: <HomePage /> },
                { path: "/auth/login", element: <Login /> },
                { path: "/auth/register", element: <Register /> },
                {
                    path: "/search-result?${searchParams.toString()} ", element:
                        <SearchResult />
                },
                { path: "/search-result/:province/:district", element: <ClinicGuestList /> },
                { path: "/search-name", element: <ClinicGuestResultByName /> },
                { path: "/clinic-page/:clinic_id", element: <ClinicPage /> },
                ...userRoutes,
                ...adminRoutes,
                { path: "*", element: <Navigate to="/" /> },
            ])}
        />
    );
};

export default Routes;