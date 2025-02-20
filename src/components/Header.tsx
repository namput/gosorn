import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FaHome, FaUserPlus, FaSignInAlt, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ ลบ Token ออกจาก Storage
    setIsLoggedIn(false); // ✅ อัปเดตสถานะล็อกเอาท์
    toast.info("👋 ออกจากระบบเรียบร้อย!", { position: "top-right" });
    navigate("/login"); // ✅ กลับไปหน้า Login
  };
  

  // ✅ เช็คว่าหน้าไหนถูกเลือก (Active)
  const getActiveClass = (path: string) =>
    location.pathname === path
      ? "bg-blue-600 text-white shadow-md"
      : "text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-all duration-300";

  return (
    <header className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* ✅ โลโก้ */}
        <Link to="/" className="text-3xl font-bold text-blue-900 flex items-center gap-x-2">
          <FaHome /> <span>GuSorn</span>
        </Link>

        {/* ✅ เมนูในจอใหญ่ */}
        <nav className="hidden md:flex space-x-4 items-center">
          <Link to="/" className={`px-5 py-2 rounded-md flex items-center gap-x-2 ${getActiveClass("/")}`}>
            <FaHome /> <span>หน้าแรก</span>
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className={`px-5 py-2 rounded-md flex items-center gap-x-2 ${getActiveClass("/dashboard")}`}>
                <FaChartBar /> <span>แดชบอร์ด</span>
              </Link>
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-red-500 text-white rounded-md flex items-center gap-x-2 hover:bg-red-700 transition-all duration-300 focus:ring-2 focus:ring-red-300 shadow-md"
              >
                <FaSignOutAlt /> <span>ออกจากระบบ</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className={`px-5 py-2 rounded-md flex items-center gap-x-2 ${getActiveClass("/register")}`}>
                <FaUserPlus /> <span>ลงทะเบียน</span>
              </Link>
              <Link to="/login" className={`px-5 py-2 rounded-md flex items-center gap-x-2 ${getActiveClass("/login")}`}>
                <FaSignInAlt /> <span>เข้าสู่ระบบ</span>
              </Link>
            </>
          )}
        </nav>

        {/* ✅ เมนูในมือถือ */}
        <Menu as="div" className="relative md:hidden">
          <Menu.Button className="text-gray-700 text-2xl">☰</Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-3 w-56 bg-white shadow-xl rounded-lg flex flex-col items-start py-4 px-4 text-gray-700 backdrop-blur-lg">
              <Menu.Item>
                <Link to="/" className={`w-full text-lg px-4 py-2 flex items-center gap-x-2 rounded-md ${getActiveClass("/")}`}>
                  <FaHome /> <span>หน้าแรก</span>
                </Link>
              </Menu.Item>
              {isLoggedIn ? (
                <>
                  <Menu.Item>
                    <Link to="/dashboard" className={`w-full text-lg px-4 py-2 flex items-center gap-x-2 rounded-md ${getActiveClass("/dashboard")}`}>
                      <FaChartBar /> <span>แดชบอร์ด</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center gap-x-2 hover:bg-red-700 w-full text-center text-lg transition-all duration-300 focus:ring-2 focus:ring-red-300 shadow-md"
                    >
                      <FaSignOutAlt /> <span>ออกจากระบบ</span>
                    </button>
                  </Menu.Item>
                </>
              ) : (
                <>
                  <Menu.Item>
                    <Link to="/register" className={`w-full text-lg px-4 py-2 flex items-center gap-x-2 rounded-md ${getActiveClass("/register")}`}>
                      <FaUserPlus /> <span>ลงทะเบียน</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link to="/login" className={`w-full text-lg px-4 py-2 flex items-center gap-x-2 rounded-md ${getActiveClass("/login")}`}>
                      <FaSignInAlt /> <span>เข้าสู่ระบบ</span>
                    </Link>
                  </Menu.Item>
                </>
              )}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
