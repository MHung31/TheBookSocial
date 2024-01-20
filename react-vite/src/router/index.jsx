import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import LandingPage from "../components/LandingPage";
import HomePage from "../components/HomePage";

import Layout from "./Layout";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/favorites",
        element: <LandingPage />,
      },
      {
        path: "/all",
        element: <LandingPage />,
      },

      {
        path: "/clubs/:clubId",
        element: <LandingPage />,
      },
    ],
  },
]);
