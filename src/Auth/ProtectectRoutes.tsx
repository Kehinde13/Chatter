import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoutes = ({isLoggedIn}) => {
  return isLoggedIn ? <Outlet /> : <Navigate to={'/LoginPage'} />;
};

export default ProtectedRoutes;