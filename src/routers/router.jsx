import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../layouts/AuthLayout";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import AllSportsEquipment from "../pages/AllSportsEquipment";
import PrivateRoute from "./PrivateRoute";
import AddEquipment from "../pages/AddEquipment";
import MyEquipmentList from "../pages/MyEquipmentList";
import ViewAProductDetails from "../pages/ViewAProductDetails";
import UpdateProduct from "../pages/UpdateProduct";
import ErrorPage from "../pages/ErrorPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "/auth/signIn",
                element: <SignIn />,
            },
            {
                path: "/auth/signUp",
                element: <SignUp />,
            }
        ]
    },
    {
        path: '/addEquipment',
        element: <PrivateRoute>
            <AddEquipment />
        </PrivateRoute>
    },
    {
        path: '/myEquipmentList',
        element: <PrivateRoute>
            <MyEquipmentList />
        </PrivateRoute>,
        loader: () => fetch('https://equi-sports-server-shakir.vercel.app/products')
    },
    {
        path: '/products/:id',
        element: <PrivateRoute>
            <UpdateProduct />
        </PrivateRoute>,
        loader: ({ params }) => fetch(`https://equi-sports-server-shakir.vercel.app/products/${params.id}`)

    },
    {
        path: '/allSportsEquipment',
        element: <AllSportsEquipment />,
        loader: () => fetch('https://equi-sports-server-shakir.vercel.app/products'),
    },
    {
        path: '/product/:id',
        element: <PrivateRoute>
            <ViewAProductDetails />
        </PrivateRoute>,
        loader: ({ params }) => fetch(`https://equi-sports-server-shakir.vercel.app/products/${params.id}`)
    },


    {
        path: "*",
        element: <ErrorPage/>
    }
])