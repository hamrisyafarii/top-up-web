import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import HomePage from "@/pages/home";
import NotFoundPage from "@/pages/not-found";
import ProfilePage from "@/pages/profile";
import TopupPage from "@/pages/topup";
import HistoryPage from "@/pages/transaction/history";
import PaymentSuccessPage from "@/pages/transaction/payment-success";
import {createBrowserRouter} from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFoundPage />,
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
  {
    path: "/history-transaction",
    element: <HistoryPage />,
  },
]);
