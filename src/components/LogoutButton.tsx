import { useNavigate } from "react-router-dom";
// import { logoutUser } from "../services/authService";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // logoutUser(); // ✅ ล้าง Token
    navigate("/login"); // ✅ Redirect ไปหน้า Login
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
    >
      ออกจากระบบ
    </button>
  );
};

export default LogoutButton;
