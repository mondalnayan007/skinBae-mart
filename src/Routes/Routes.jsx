import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import AdminDashboard from "../Layouts/AdminLayout/AdminDashboard";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import Login from "../Pages/Login/Login";


export const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayout,
    children:[
        {
            index: true,
            path:'/',
            loader: ()=>fetch('/products.json').then(res=>res.json()),
            Component:Home
        },
        {
          path:'product/:id',
          Component: ProductDetails
        },
        {
          path:'/login',
          Component: Login
        }

    ]
  },
  {
    path: '/admin',
    Component: AdminDashboard
  }
]);