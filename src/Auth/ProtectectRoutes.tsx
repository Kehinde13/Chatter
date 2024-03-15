import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/Loading";
import { Blog } from "../Context/Context";





const ProtectedRoutes = () => {
  const { currentUser, loading } = Blog();

  
  return (
    <>
      {
        loading ? 
        <Loading /> :
        currentUser ? <Outlet /> : <Navigate to={'/SignUp'} />
      }
    </>
  );
};

export default ProtectedRoutes;