import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Auth/LoginPage";
import SignUp from "./Auth/SignUp";
import ProtectedRoutes from "./Auth/ProtectectRoutes";
import AuthLayout from "./Auth/AuthLayout";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPages from "./Pages/ErrorPage";
import HomePage from "./Pages/HomePage";

import { useState } from "react";

function App() {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />,
      errorElement: <ErrorPages />
    },
    {
      element: <ProtectedRoutes isLoggedIn={isLoggedIn} />,
      errorElement: <ErrorPages />,
      children: [
        {
          path: "HomePage",
          element: <HomePage />,
        },
      ],
    },
    {
      element: <AuthLayout />,
      errorElement: <ErrorPages />,
      children: [
        {
          path: "LoginPage",
          element: <LoginPage />,
        },
        {
          path: "SignUp",
          element: <SignUp />,
        },
      ],
    },
    {
      path: "*",
      element: <ErrorPages />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
