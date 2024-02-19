import { Navigate, Outlet } from "react-router-dom";

type Props = {
    isLoggedIn: boolean;
}

const ProtectedRoutes = ({isLoggedIn}: Props) => {
  return isLoggedIn ? <Outlet /> : <Navigate to={'/LoginPage'} />;
};

export default ProtectedRoutes;