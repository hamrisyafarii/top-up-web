import RegisterPage from "@/features/auth/pages/RegisterPage";
import LoginPage from "@/pages/auth/login";
import HomePage from "@/pages/home";
import ProfilePage from "@/pages/profile";
import TopupPage from "@/pages/topup";
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
]);
