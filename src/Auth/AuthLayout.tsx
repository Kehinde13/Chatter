import { Navigate, Outlet } from "react-router-dom";
import { Blog } from "../Context/Context";
import Loading from "../components/Loading";

function AuthLayout() {
  const { currentUser, loading } = Blog();

  if (loading) {
    return <Loading />;
  }

  if (currentUser) {
    return <Navigate to="/HomePage" replace />;
  }

  return (
    <div className="p-0 mt-[-8px]">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
