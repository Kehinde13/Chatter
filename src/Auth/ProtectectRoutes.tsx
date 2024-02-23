import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
    currentUser: boolean;
}



const ProtectedRoutes = ({currentUser}: Props) => {
  useEffect(() => {
  console.log(currentUser);
})
  return currentUser ? <Outlet /> : <Navigate to={'/LoginPage'} />;
};

export default ProtectedRoutes;