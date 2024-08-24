import { lazy, Suspense } from "react";
const LandingPage = lazy(() => import("./Pages/LandingPage"));
import LoginPage from "./Auth/LoginPage";
import SignUp from "./Auth/SignUp";
import ProtectedRoutes from "./Auth/ProtectectRoutes";
import AuthLayout from "./Auth/AuthLayout";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPages from "./Pages/ErrorPage";
import HomePage from "./Pages/HomePage/HomePage";
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
import { ThemeProvider } from "./components/shadcn/themeProvider"
import AboutPage from "./Pages/AboutPage";
import LandingPageContent from "./Pages/LandingPageContent";



const Fallback = () => <Loading />


function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />,
      errorElement: <ErrorPages />,
      children: [
        {
          element: <LandingPageContent />,
          index: true
        },
        {
          path: "aboutpage",
          element: <AboutPage />
        }, 
        {
          path: "contact",
          element: <Contact />
        },
        {
          path: "blogs",
          element: <Blogs />
        }
      ]
    },
    {
      element: <ProtectedRoutes />,
      errorElement: <ErrorPages />,
      children: [
        {
          path: "homepage",
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
              path: "texteditor",
              element: <TextEditor />
            },
            {
              path: "publish",
              element: <Publish />
            },
            {
              path: "singlepost/:postId",
              element: <SinglePost />
            }, 
            {
              path: "editPost/:postId",
              element: <EditPost />
            },
            {
              path: "filteredPosts/:tag",
              element: <FilteredPosts/>
            },
            {
              path: "analytics/:postId",
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
          path: "loginpage",
          element: <LoginPage />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "forgotpassword",
          element: <ForgotPassword />
        },
      ],
    },
    {
      path: "*",
      element: <ErrorPages />,
    },
  ]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Suspense fallback={<Fallback />}>
       <RouterProvider router={router}  />
       <ToastContainer />
    </Suspense>
    </ThemeProvider>
  ) ;
  
}

export default App;
