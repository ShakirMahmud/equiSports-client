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

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout/>,
    },
    {
        path: "/auth",
        element: <AuthLayout/>,
        children: [
            {
                path: "/auth/signIn",
                element: <SignIn/>,
            },
            {
                path: "/auth/signUp",
                element: <SignUp/>,
            }
        ]
    },
    {
        path: '/allSportsEquipment',
        element: <AllSportsEquipment/>,
        loader: () => fetch('http://localhost:5000/products'),
    },
    {
        path: '/allSportsEquipment/:id',
        element: <PrivateRoute>
            <ViewAProductDetails/>
        </PrivateRoute>,
        loader: ({params}) => fetch(`http://localhost:5000/products/${params.id}`)
    },
    {
        path: '/addEquipment',
        element: <PrivateRoute>
            <AddEquipment/>
        </PrivateRoute>
    },
    {
        path: '/myEquipmentList',
        element: <PrivateRoute>
            <MyEquipmentList/>
        </PrivateRoute>,
        loader: () => fetch('http://localhost:5000/products')
    },
    {
        path: '/updateProduct/:id',
        element: <PrivateRoute>
            <UpdateProduct/>
        </PrivateRoute>,
        loader: ({params}) => fetch(`http://localhost:5000/products/${params.id}`)

    },
    
    {
        path: "*",
        element: <h1>404 Not Found</h1>
    }
])