import { createBrowserRouter } from "react-router-dom";

// Layouts & Providers
import MainLayout from "../mainLayout/MainLayout";
import Dashboard from "../../Dasboard/Dashboard";

// Public Pages
import Home from "../home/Home";
import Login from "../login/Login";
import SignUp from "../signUp/SignUp";

// Dashboard Pages
import AdminDashboard from "../../Dasboard/AdminDashboard/AdminDashboard";
import ManageProducts from "../../Dasboard/ContentManagement/ManageProducts ";
import AddProduct from "../../Dasboard/ContentManagement/addProudct/AddProduct";
import ManageOrders from "@/Dasboard/Orders/ManageOrders";
import ManageUsers from "@/Dasboard/Users/ManageUsers";
import ManageCategories from "@/Dasboard/categories/ManageCategories";
import MyProfilePage from "@/Dasboard/MyProfilePage";

// Route Guards
import PrivateRoute from "./privateRoute/PrivateRoute";
import AdminRoute from "./privateRoute/AdminRoute";
import ProductDetail from "../home/dealsOfTheDay/Products/ProductDetail";
import AuthProvider from "../authProvider/Authprovider";
import { WishlistProvider } from "../Providers/WishlistProvider";

import CartPage from "../Pages/CartPage";
import WishlistPage from "../Pages/WishlistPage";
import CheckoutPage from "../Pages/CheckoutPage";
import Deals from "../home/dealsOfTheDay/Deals";
// ✅ ফিক্সড ইমপোর্ট (অবশ্যই ফোল্ডার ও ফাইলের নাম এই অনুযায়ী হতে হবে)
import SteaksFillets from "../steaksFillets/SteaksFillets";

import ErrorPage from "../shared/ErrorPage";
import UserHome from "@/Dasboard/UserDashboard/UserHome";
import CategoryProductsPage from "../Pages/CategoryProductsPage";
import SearchResultsPage from "../Pages/SearchResultsPage";
import EditProduct from "@/Dasboard/ContentManagement/editProduct/EditProduct";


const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: (
      <AuthProvider>
        <WishlistProvider>
            <MainLayout />
        </WishlistProvider>
      </AuthProvider>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/product/:slug", element: <ProductDetail /> },
      { path: "/deals", element: <Deals/>},
      
      // আপডেটেড পাথ (URL এ & রাখা যাবে, কিন্তু ফাইলে না)
      
      { path: "/steaks/fillets", element: <SteaksFillets/>},
      
      
      
      { 
        path: "/category/:slug", 
        element: <CategoryProductsPage /> 
      },
      { 
        path: "/search", 
        element: <SearchResultsPage /> 
      },

      { path: "/cart", element: <PrivateRoute><CartPage /></PrivateRoute> },
      { path: "/wishlist", element: <PrivateRoute><WishlistPage /></PrivateRoute> },
      { path: "/checkout", element: <PrivateRoute><CheckoutPage /></PrivateRoute> }
    ],
  },
  {
    path: "dashboard",
    element: (
      <AuthProvider>
        <WishlistProvider>
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
        </WishlistProvider>
      </AuthProvider>
    ),
    children: [
      { path: 'admin-home', element: <AdminRoute><AdminDashboard /></AdminRoute> },
      { path: 'manage-product', element: <AdminRoute><ManageProducts /></AdminRoute> },
      { path: "add-product", element: <AdminRoute><AddProduct /></AdminRoute> },
      { path: "orders", element: <AdminRoute><ManageOrders /></AdminRoute> },
      { path: "users", element: <AdminRoute><ManageUsers /></AdminRoute> },
      { path: "categories", element: <AdminRoute><ManageCategories /></AdminRoute> },
      { path: "edit-product/:slug", element: <AdminRoute><EditProduct /></AdminRoute> },
      { path: "user-home", element: <UserHome/>},
      { path: "my-profile", element: <MyProfilePage/>},
      { path: "my-orders", element: <MyProfilePage/>}, 
    ],
  },
]);

export default router;