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

// Route Guards
import PrivateRoute from "./privateRoute/PrivateRoute";
import AdminRoute from "./privateRoute/AdminRoute";
import ProductDetail from "../home/dealsOfTheDay/Products/ProductDetail";
import AuthProvider from "../authProvider/Authprovider";
import { CartProvider } from "../Providers/CartProvider";
import { WishlistProvider } from "../Providers/WishlistProvider";
import CartPage from "../Pages/CartPage";
import WishlistPage from "../Pages/WishlistPage";
import CheckoutPage from "../Pages/CheckoutPage";

const router = createBrowserRouter([
  {
    path: "/",
    // ✅ লেআউটকে Provider দিয়ে wrap করা হয়েছে
    element: (
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <MainLayout />
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/product/:slug", element: <ProductDetail /> },
      { path: "/cart", element: <PrivateRoute><CartPage /></PrivateRoute> },
      { path: "/wishlist", element: <PrivateRoute><WishlistPage /></PrivateRoute> },
      { path: "/checkout", element: <PrivateRoute><CheckoutPage /></PrivateRoute> }
    ],
  },
  {
    path: "dashboard",
    // ✅ ড্যাশবোর্ড লেআউটকেও Provider দিয়ে wrap করা হয়েছে
    element: (
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          </CartProvider>
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
    ],
  },
]);

export default router;