import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Auth/LoginPage";
import SignUp from "./Auth/SignUp";
import ProtectedRoutes from "./Auth/ProtectectRoutes";
import AuthLayout from "./Auth/AuthLayout";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPages from "./Pages/ErrorPage";
import HomePage from "./Pages/HomePage/HomePage";
import { Blog } from "./Context/Context";
import { ToastContainer } from "react-toastify";
import ProfilePage from "./Pages/HomePage/Profile/ProfilePage";
import Feed from "./Pages/HomePage/Feed";



function App() {
  const { currentUser } = Blog();
  
  

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />,
      errorElement: <ErrorPages />
    },
    {
      element: <ProtectedRoutes currentUser={currentUser} />,
      errorElement: <ErrorPages />,
      children: [
        {
          path: "HomePage",
          element: <HomePage />,
          children: [
            {
              element: <Feed />,
              index: true,
            },
            {
              path: "profile/:userId",
              element: <ProfilePage />
            }
          ]
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

  return (
    <>
       <RouterProvider router={router}  />
       <ToastContainer />
    </>
  ) ;
  
}

export default App;
