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
// ❌ CartProvider ইম্পোর্ট এখান থেকে মুছে ফেলা হয়েছে
import { WishlistProvider } from "../Providers/WishlistProvider";

import CartPage from "../Pages/CartPage";
import WishlistPage from "../Pages/WishlistPage";
import CheckoutPage from "../Pages/CheckoutPage";
import Deals from "../home/dealsOfTheDay/Deals";
import FishAndSeafoods from "../fish&Seafoods/Fish&Seafoods";
import SteaksFillets from "../steaksFillets/SteaksFillets";
import ChickenAndDuck from "../chicken&Duck/ChickenAndDuck";
import BeefMutton from "../beef&Mutton/Beef&Mutton";
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
          {/* ❌ CartProvider এখান থেকে মুছে ফেলা হয়েছে */}
            <MainLayout />
          {/* ❌ */}
        </WishlistProvider>
      </AuthProvider>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/product/:slug", element: <ProductDetail /> },
      { path: "/deals", element: <Deals/>},
      { path: "/fish&seafoods", element: <FishAndSeafoods/>},
      { path: "/category/fish-and-seafood", element: <FishAndSeafoods/>},
      { path: "/steaks/fillets", element: <SteaksFillets/>},
      { path: "/category/steaks-&-fillets", element: <SteaksFillets/>},
      { path: "/chickenAndDuck", element: <ChickenAndDuck/>},
      { path: "/category/chicken-&-duck", element: <ChickenAndDuck/>},
      { path: "/beef-&-Mutton", element: <BeefMutton/>},
      { path: "/category/beef-&-mutton", element: <BeefMutton/>},
      { path: "/category/combo-pack", element: <BeefMutton/>},
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
          {/* ❌ CartProvider এখান থেকেও মুছে ফেলা হয়েছে */}
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          {/* ❌ */}
        </WishlistProvider>
      </AuthProvider>
    ),
    children: [
      // Admin Only Routes
      { path: 'admin-home', element: <AdminRoute><AdminDashboard /></AdminRoute> },
      { path: 'manage-product', element: <AdminRoute><ManageProducts /></AdminRoute> },
      { path: "add-product", element: <AdminRoute><AddProduct /></AdminRoute> },
      { path: "orders", element: <AdminRoute><ManageOrders /></AdminRoute> },
      { path: "users", element: <AdminRoute><ManageUsers /></AdminRoute> },
      { path: "categories", element: <AdminRoute><ManageCategories /></AdminRoute> },
      { 
        path: "edit-product/:slug", 
        element: <AdminRoute><EditProduct /></AdminRoute> 
      },
      // User Routes
      { path: "user-home", element: <UserHome/>},
      { path: "my-profile", element: <MyProfilePage/>},
      { path: "my-orders", element: <MyProfilePage/>}, 
    ],
  },
]);

export default router;