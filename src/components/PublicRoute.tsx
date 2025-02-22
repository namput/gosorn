import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/404" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
