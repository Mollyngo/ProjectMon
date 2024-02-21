import React from "react";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import useAuth from "../hooks/use-auth";
import RedirectIfAuthenticate from "../validators/redirectIfAuthenticate";
import Search from "../pages/Search";
import UserMenu from "../pages/UserMenu";
import UserSearchResult from "../pages/UserSearchResult";
import UserClinicPage from "../pages/UserClinicPage";
import AdminMenu from "../pages/AdminMenu";
import AdminApprove from "../pages/AdminApprove";
import ClinicPage from "../pages/ClinicPage";
import AddClinic from "../pages/AddClinic";
import EditClinic from "../pages/EditClinic";
import SearchResult from "../pages/SearchResult";
import ClinicContextProvider from "../contexts/ClinicContext";
import { Navigate } from "react-router-dom";

const routerGuest = createBrowserRouter([
    {
        path: '/',
        element:
            <>
                {/* <Search /> */}
                <Outlet />
            </>,
        errorElement: <Navigate to="/" />,
        children: [
            { index: true, element: <Search /> },
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
        ]

    }
])

const routerUser = createBrowserRouter([
    {
        path: '/',
        element:
            <>
                {/* <UserMenu /> */}
                <Outlet />
            </>,
        errorElement: <Navigate to="/Login" />,
        children: [
            { index: true, element: <UserMenu /> },
            { path: '/clinic', element: <UserClinicPage /> },
            { path: '/search', element: <UserSearchResult /> },
            { path: '/edit', element: <EditClinic /> },
            { path: '/add', element: <AddClinic /> },
            { path: '/searchResult', element: <UserSearchResult /> },
        ]
    }
])

const routerAdmin = createBrowserRouter([
    {
        path: '/',
        element:
            <>
                {/* <AdminMenu /> */}
                <Outlet />
            </>
        ,
        errorElement: <Navigate to="/Login" />,
        children: [
            { index: true, element: <AdminMenu /> },
            { path: '/approve', element: <AdminApprove /> },
            { path: '/add', element: <AddClinic /> },
            { path: '/edit', element: <EditClinic /> },
            { path: '/searchResult', element: <UserSearchResult /> },
            { path: '/clinic', element: <UserClinicPage /> },
            { path: '/search', element: <UserSearchResult /> },

        ]
    }
])

export default function Routes() {
    const { user } = useAuth()
    const finalRouter = !user?.role
        ? routerGuest
        : user?.role === 'admin' ? routerAdmin : routerUser
    return (
        <RouterProvider router={finalRouter} />)
}