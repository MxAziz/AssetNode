import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import JoinHr from "../Pages/Login/JoinHr";
import JoinEmployee from "../Pages/Login/JoinEmployee";


export const router = createBrowserRouter([
  {
    path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element:<Home></Home>
          },
          {
            path: "/login",
            element:<Login></Login>
          },
          {
            path: "/joinHr",
            element:<JoinHr></JoinHr>
          },
          {
            path: "/joinEmployee",
            element: <JoinEmployee></JoinEmployee>
          }
        ]
  },
]);