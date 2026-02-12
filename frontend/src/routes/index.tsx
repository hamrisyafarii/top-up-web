import HomePage from "@/pages/home";
import TopupPage from "@/pages/topup";
import {createBrowserRouter} from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/topup/:slug",
    element: <TopupPage />,
  },
]);
