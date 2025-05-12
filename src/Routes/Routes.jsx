import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import JoinHr from "../Pages/Login/JoinHr";
import JoinEmployee from "../Pages/Login/JoinEmployee";
import PrivateRoute from './PrivateRoute';
import Profile from "../Pages/common/Profile";
import UpdateUser from "../Pages/common/UpdateUser";
import AddAsset from "../Pages/HrManager/AddAsset";
import AssetList from "../Pages/HrManager/AssetList";
import RequestAsset from "../Pages/Employee/RequestAsset";
import MyAsset from "../Pages/Employee/MyAsset";
import MyTeam from "../Pages/Employee/MyTeam";
import AllRequest from "../Pages/HrManager/AllRequest";
import MyEmployee from "../Pages/HrManager/MyEmployee";
import AddEmployee from "../Pages/HrManager/AddEmployee";


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
            path: "/profile",
            element:<PrivateRoute><Profile></Profile></PrivateRoute>
          },
          {
            path: "/updateProfile",
            element: <PrivateRoute><UpdateUser></UpdateUser></PrivateRoute>
          },
          // hr routes
          {
            path: "/joinHr",
            element:<JoinHr></JoinHr>
          },
          {
            path: "/addAsset",
            element: <PrivateRoute><AddAsset></AddAsset></PrivateRoute>
          },
          {
            path: "/assetList",
            element: <PrivateRoute><AssetList></AssetList></PrivateRoute>
          },
          {
            path: "/allRequest",
            element: <PrivateRoute><AllRequest></AllRequest></PrivateRoute>
          },
          {
            path: "/myEmployee",
            element: <PrivateRoute><MyEmployee></MyEmployee></PrivateRoute>
          },
          {
            path: "/addEmployee",
            element: <PrivateRoute><AddEmployee></AddEmployee></PrivateRoute>
          },

          // employee routes
          {
            path: "/joinEmployee",
            element: <JoinEmployee></JoinEmployee>
          },
          {
            path: "/requestAsset",
            element: <PrivateRoute><RequestAsset></RequestAsset></PrivateRoute>
          },
          {
            path: "/myAssets",
            element: <PrivateRoute><MyAsset></MyAsset></PrivateRoute>
          },
          {
            path: "/myTeam",
            element: <PrivateRoute><MyTeam></MyTeam></PrivateRoute>
          }
        ]
  },
]);