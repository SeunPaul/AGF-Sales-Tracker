import Redirect from "./Redirect";

import Login from "../pages/Login/Login";
import OrderForm from "../pages/OrderForm/OrderForm";
import AdminLogin from "../pages/AdminLogin/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";

const pagesRoutes = [
  {
    path: "/",
    component: Login,
    meta: {
      redirectUrl: "/",
      protectedRoute: false,
      role: "user",
    },
  },
  {
    path: "/form",
    component: OrderForm,
    meta: {
      redirectUrl: "/",
      protectedRoute: true,
      role: "user",
    },
  },
  {
    path: "/admin",
    component: AdminLogin,
    meta: {
      redirectUrl: "/",
      protectedRoute: false,
      role: "admin",
    },
  },
  {
    path: "/admin/dashboard",
    component: AdminDashboard,
    meta: {
      redirectUrl: "/",
      protectedRoute: true,
      role: "admin",
    },
  },
  {
    path: "*",
    component: Redirect,
    meta: {
      redirectUrl: "/",
      protectedRoute: false,
      role: "",
    },
  },
];

export default pagesRoutes;
