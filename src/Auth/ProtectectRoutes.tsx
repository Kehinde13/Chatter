import { Navigate, Outlet } from "react-router-dom";

type Props = {
    currentUser: object | boolean;
}



const ProtectedRoutes = ({currentUser}: Props) => {
  return currentUser ? <Outlet /> : <Navigate to={'/SignUp'} />;
};

export default ProtectedRoutes;