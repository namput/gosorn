import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../services/authService";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
    navigate("/login");
  };

  const getPageBackground = () => {
    if (location.pathname === "/register" || location.pathname === "/login") {
      return "bg-gradient-to-r from-blue-900 to-blue-700";
    }
    return "bg-gradient-to-r from-blue-500 to-blue-700";
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* ✅ โลโก้ */}
        <h1 className="text-2xl font-logo text-blue-900">GuSorn</h1>

        {/* ✅ เมนูในจอใหญ่ */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-blue-500 text-lg text-gray-700">หน้าแรก</Link>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-500 text-lg text-gray-700">แดชบอร์ด</Link>
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700">ออกจากระบบ</button>
            </>
          ) : (
            <>
              <Link to="/register" className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-700 text-lg">ลงทะเบียน</Link>
              <Link to="/login" className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-700 text-lg">เข้าสู่ระบบ</Link>
            </>
          )}
        </nav>

        {/* ✅ เมนูในมือถือ */}
        <Menu as="div" className="relative md:hidden">
          <Menu.Button className="text-gray-700 text-2xl">☰</Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg flex flex-col items-start py-4 px-4 text-gray-700">
              <Menu.Item>
                {({ active }) => (
                  <Link to="/" className={`hover:text-blue-500 w-full text-lg ${active && "text-blue-500"}`}>หน้าแรก</Link>
                )}
              </Menu.Item>
              {isLoggedIn ? (
                <>
                  <Menu.Item>
                    {({ active }) => (
                      <Link to="/dashboard" className={`hover:text-blue-500 w-full text-lg ${active && "text-blue-500"}`}>แดชบอร์ด</Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 w-full text-center text-lg">ออกจากระบบ</button>
                    )}
                  </Menu.Item>
                </>
              ) : (
                <>
                  <Menu.Item>
                    {({ active }) => (
                      <Link to="/register" className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full text-center text-lg ${active && "bg-blue-700"}`}>ลงทะเบียน</Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link to="/login" className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full text-center text-lg ${active && "bg-blue-700"}`}>เข้าสู่ระบบ</Link>
                    )}
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
