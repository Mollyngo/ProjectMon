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



const routerGuest = createBrowserRouter([
    {
        path: '/',
        children: [
            { path: '', element: <Search /> },
            { path: 'auth/login', element: <Login /> },
            { path: 'auth/register', element: <Register /> },
        ]
    }
]);

const routerUser = createBrowserRouter([
    {
        path: '/',
        children: [
            { path: '', element: <UserMenu /> },
            { path: 'clinic', element: <ClinicList /> },
            { path: 'search', element: <UserSearchResult /> },
            { path: 'clinic/edit', element: <EditClinic /> },
            { path: 'clinic/add', element: <AddClinic /> },
            { path: 'searchResult', element: <UserSearchResult /> },

        ]
    }
]);

const routerAdmin = createBrowserRouter([
    {
        path: '/',
        element: <AdminMenu />,
        errorElement: <Navigate to="/auth/login" />,
        children: [
            { path: 'approve', element: <AdminApprove /> },
            { path: 'add', element: <AddClinic /> },
            { path: 'edit', element: <EditClinic /> },
            { path: 'searchResult', element: <UserSearchResult /> },
            { path: 'clinic', element: <UserClinicPage /> },
            { path: 'search', element: <UserSearchResult /> },
        ]
    }
]);

export default function Routes() {
    const { authUser } = useAuth();
    console.log(authUser)
    const finalRouter = !authUser?.role ? routerGuest : authUser?.role === 'ADMIN' ? routerAdmin : routerUser;
    // const finalRouter = routerUser;
    return (
        <div>
            <RouterProvider router={finalRouter} />;
        </div>
    );
}
