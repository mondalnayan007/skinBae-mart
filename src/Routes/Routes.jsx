import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout/MainLayout";


export const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayout,
    children:[
        
    ]
  },
]);