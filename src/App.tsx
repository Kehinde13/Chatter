import { lazy, Suspense } from "react";
const LandingPage = lazy(() => import("./Pages/LandingPage"));
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
import Feed from "./Pages/HomePage/Feed/Feed";
import TextEditor from "./Pages/HomePage/Publish/TextEditor";
import Publish from "./Pages/HomePage/Publish/Publish";
import SinglePost from "./Pages/HomePage/Feed/SinglePost";
import ForgotPassword from "./Auth/ForgotPassword";
import EditPost from "./Pages/HomePage/Publish/EditPost";
import FilteredPosts from "./Pages/HomePage/FilteredPosts";
import Contact from "./Pages/Contact";
import Blogs from "./Pages/Blogs";
import Analytics from "./Pages/Analytics";
import Loading from "./components/Loading";


const Fallback = () => <Loading />


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
            },
            {
              path: "TextEditor",
              element: <TextEditor />
            },
            {
              path: "Publish",
              element: <Publish />
            },
            {
              path: "SinglePost/:postId",
              element: <SinglePost />
            }, 
            {
              path: "EditPost/:postId",
              element: <EditPost />
            },
            {
              path: "FilteredPosts/:tag",
              element: <FilteredPosts/>
            },
            {
              path: "Analytics/:postId",
              element: <Analytics />
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
        {
          path: "ForgotPassword",
          element: <ForgotPassword />
        },
        {
          path: "Contact",
          element: <Contact />
        },
        {
          path: "Blogs",
          element: <Blogs />
        }
      ],
    },
    {
      path: "*",
      element: <ErrorPages />,
    },
  ]);

  return (
    <Suspense fallback={<Fallback />}>
       <RouterProvider router={router}  />
       <ToastContainer />
    </Suspense>
  ) ;
  
}

export default App;
