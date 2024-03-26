import { Navigate, Outlet } from "react-router-dom";
import { Blog } from "../Context/Context";

const ProtectedRoutes = () => {
  const { currentUser } = Blog();

  if (currentUser) {
    return <Outlet  />;
  } else {
    return <Navigate to="/LoginPage" />;
  }
};

export default ProtectedRoutes;
