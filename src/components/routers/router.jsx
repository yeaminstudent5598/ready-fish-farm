import {
    createBrowserRouter,
   
  } from "react-router-dom";
import MainLayout from "../mainLayout/MainLayout";
import Home from "../home/Home";
import FishAndSeafoods from "../fish&Seafoods/Fish&Seafoods";
import SteaksFillets from "../steaksFillets/SteaksFillets";
import ChickenAndDuck from "../chicken&Duck/ChickenAndDuck";
import BeefMutton from "../beef&Mutton/Beef&Mutton";
import ComboPack from "../comboPack/ComboPack";
import DriedFish from "../driedFish/DriedFish";
import MarinatedCooked from "../marinatedCooked/MarinatedCooked";
import PasteSpice from "../pasteSpice/PasteSpice";
import Login from "../login/Login";
import SignUp from "../signUp/SignUp";
import PrivateRoute from "./privateRoute/PrivateRoute";
import Dashboard from "../../Dasboard/Dashboard";
import AdminDashboard from "../../Dasboard/AdminDashboard/AdminDashboard";
import ManageProducts from "../../Dasboard/ContentManagement/ManageProducts ";
import AddProduct from "../../Dasboard/ContentManagement/addProudct/AddProduct";
import CategoryTable from "@/Dasboard/categories/Categories";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/fish&seafoods",
        element: <FishAndSeafoods/>
      },
      {
        path: "/steaks/fillets",
        element: <SteaksFillets/>
      },
      {
        path: "/chickenAndDuck",
        element: <ChickenAndDuck/>
      },
      {
        path: "/beef-&-Mutton",
        element: <BeefMutton/>
      },
      {
        path: "/combo-Pack",
        element: <ComboPack/>
      },
      {
        path: "/dried-Fish",
        element: <DriedFish/>
      },
      {
        path: "/marinatedCooked",
        element: <MarinatedCooked/>
      },
      {
        path: "/pasteSpice",
        element: <PasteSpice/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/signup",
        element: <SignUp/>
      }
    ]
  },
  {
    path: "/dashboard",
    element:<Dashboard/>,
    children: [
        {
          path: 'admin-dashboard',
          element: <AdminDashboard/>
        },
        {
          path: 'manage-product',
          element: <ManageProducts/>
        },
        {
          path: "add-product",
          element: <AddProduct/>
        },
        {
          path: "categories",
          element: <CategoryTable/>
        }
    ]
  }
]);

export default router;