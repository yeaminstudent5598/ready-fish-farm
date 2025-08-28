import { createBrowserRouter } from "react-router-dom";

// Layouts
import MainLayout from "../mainLayout/MainLayout";
import Dashboard from "../../Dasboard/Dashboard";

// Public Pages
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

// Dashboard Pages
import AdminDashboard from "../../Dasboard/AdminDashboard/AdminDashboard";
import ManageProducts from "../../Dasboard/ContentManagement/ManageProducts ";
import AddProduct from "../../Dasboard/ContentManagement/addProudct/AddProduct";
import CategoryTable from "@/Dasboard/categories/ManageCategories";
import ManageOrders from "@/Dasboard/Orders/ManageOrders";
import ManageUsers from "@/Dasboard/Users/ManageUsers";

// Route Guards
import PrivateRoute from "./privateRoute/PrivateRoute";
import AdminRoute from "./privateRoute/AdminRoute";
import ManageCategories from "@/Dasboard/categories/ManageCategories";

const router = createBrowserRouter([
  // ===============================================
  // Public Routes under MainLayout
  // ===============================================
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/fish&seafoods",
        element: <FishAndSeafoods />
      },
      {
        path: "/steaks/fillets",
        element: <SteaksFillets />
      },
      {
        path: "/chickenAndDuck",
        element: <ChickenAndDuck />
      },
      {
        path: "/beef-&-Mutton",
        element: <BeefMutton />
      },
      {
        path: "/combo-Pack",
        element: <ComboPack />
      },
      {
        path: "/dried-Fish",
        element: <DriedFish />
      },
      {
        path: "/marinatedCooked",
        element: <MarinatedCooked />
      },
      {
        path: "/pasteSpice",
        element: <PasteSpice />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <SignUp />
      }
    ]
  },
  // ===============================================
  // Dashboard Routes (Protected)
  // ===============================================
  {
    path: "/dashboard",
    // All dashboard routes are protected by PrivateRoute
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      // --- Admin Only Routes ---
      // These are further protected by AdminRoute
      {
        path: 'admin-home',
        element: <AdminRoute><AdminDashboard /></AdminRoute>
      },
      {
        path: 'manage-product',
        element: <AdminRoute><ManageProducts /></AdminRoute>
      },
      {
        path: "add-product",
        element: <AdminRoute><AddProduct /></AdminRoute>
      },
      {
        path: "categories",
        element: <AdminRoute><CategoryTable /></AdminRoute>
      },
      {
        path: "orders",
        element: <AdminRoute><ManageOrders /></AdminRoute>
      },
      {
        path: "users",
        element: <AdminRoute><ManageUsers /></AdminRoute>
      },
      {
            path: "categories",
            element: <AdminRoute><ManageCategories /></AdminRoute>
      },

      // --- Regular User Routes ---
      // Add user-specific dashboard routes here. They are already protected by PrivateRoute.
      // Example:
      // {
      //   path: 'user-home',
      //   element: <UserHomeComponent />
      // },
      // {
      //   path: 'my-orders',
      //   element: <MyOrdersComponent />
      // },
    ]
  }
]);

export default router;