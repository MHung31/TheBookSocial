import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import HomePage from "../components/HomePage";
import BookPage from "../components/BookPage";
import ProfilePage from "../components/ProfilePage";

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
      {
        path: "/books/:bookId",
        element: <BookPage />,
      },
      {
        path: "/users/:userId",
        element: <ProfilePage />,
      },
    ],
  },
]);
