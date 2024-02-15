
import Register from '../pages/Register'
import Search from '../pages/Search'
import ClinicPage from '../pages/ClinicPage'
import AdminMenu from '../pages/AdminMenu'
import SearchResult from '../pages/SearchResult'
import UserMenu from '../pages/UserMenu'
import UserClinicPage from '../pages/UserClinicPage'
import Login from '../pages/Login'
import AdminApprove from '../pages/AdminApprove'
import UserSearchResult from '../pages/UserSearchResult'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
    {
        path: '/',
        element: <Search />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/clinic',
        element: <ClinicPage />
    },
    {
        path: '/admin',
        element: <AdminMenu />
    },
    {
        path: '/search',
        element: <SearchResult />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/user',
        element: <UserMenu />
    }

])

export default function AppRoute() {
    return (
        <RouterProvider router={router} />
    )
}