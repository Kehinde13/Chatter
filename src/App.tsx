import LandingPage from "./Pages/LandingPage"
import LoginPage from "./Auth/LoginPage"
import SignUp from "./Auth/SignUp"; 

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPages from "./Pages/ErrorPage";
import HomePage from "./Pages/HomePage";


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
      errorElement: <ErrorPages />
    },
    {
      path: "LoginPage",
      element: <LoginPage />,
    },
    {
      path: "SignUp",
      element: <SignUp />
    },
    {
      path: "HomePage",
      element: <HomePage />
    },
    {
      path: "*",
      element: <ErrorPages />
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
