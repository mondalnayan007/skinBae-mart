import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";


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
        }
    ]
  },
]);