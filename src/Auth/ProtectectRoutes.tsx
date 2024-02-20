import { Navigate, Outlet } from "react-router-dom";

type Props = {
    currentUser: boolean;
}

const ProtectedRoutes = ({currentUser}: Props) => {
  return currentUser ? <Outlet /> : <Navigate to={'/LoginPage'} />;
};

export default ProtectedRoutes;