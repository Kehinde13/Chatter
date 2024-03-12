import { Navigate, Outlet } from "react-router-dom";
import {  User as FirebaseUser } from 'firebase/auth';

type Props = {
    currentUser: FirebaseUser | null;
}



const ProtectedRoutes = ({currentUser}: Props) => {
  return currentUser ? <Outlet /> : <Navigate to={'/SignUp'} />;
};

export default ProtectedRoutes;