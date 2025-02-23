import { Navigate, Outlet } from "react-router-dom";

const AdminRoute: React.FC = () => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // 👈 ควรดึง role จากการ Login

  return token && userRole === "admin" ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default AdminRoute;
