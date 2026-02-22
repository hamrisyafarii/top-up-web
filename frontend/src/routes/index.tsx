import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import HomePage from "@/pages/home";
import ProfilePage from "@/pages/profile";
import TopupPage from "@/pages/topup";
import PaymentSuccessPage from "@/pages/transaction/payment-success";
import {createBrowserRouter} from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <div>Not Found</div>,
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/topup/:slug",
    element: <TopupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/payment-success",
    element: <PaymentSuccessPage />,
  },
]);
