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
import AdminApprove from "../pages/AdminApprove";
import AddClinic from "../pages/AddClinic";
import EditClinic from "../pages/EditClinic";
import ClinicPage from "../pages/ClinicPage";
import SearchResult from "../pages/SearchResult";
import ClinicList from "../pages/ClinicList";
import HomePage from "../pages/HomePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/search",
        element: <Search />,
    },
    {
        path: "/user-menu",
        element: <UserMenu />,

    },
    {
        path: "/user-search-result",
        element: <UserSearchResult />,
    },
    {
        path: "/user-clinic-page",
        element: <UserClinicPage />,
    },
    {
        path: "/admin-menu",
        element: <AdminMenu />,
    },
    {
        path: "/admin-approve",
        element: <AdminApprove />,
    },
    {
        path: "/add-clinic",
        element: <AddClinic />,
    },
    {
        path: "/edit-clinic",
        element: <EditClinic />,
    },
    {
        path: "/clinic-page",
        element: <ClinicPage />,
    },
    {
        path: "/search-result",
        element: <SearchResult />,
    },
    {
        path: "/clinic-list",
        element: <ClinicList />,
    },
    {
        path: "*",
        element: <Navigate to="/" />,
    }

]);

export default function Routes() {
    return <RouterProvider router={router} />;
}