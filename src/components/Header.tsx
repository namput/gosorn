// Header.tsx
import React, { useState, useEffect, useCallback, Fragment, Suspense } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
// ลบ react-icons ออกเท่าที่ทำได้: แทนด้วย SVG เองสำหรับไอคอนที่ใช้บ่อย

const MobileMenu = React.lazy(() => import("./MobileMenu")); // ← แยกเมนูมือถือ

const Header = React.memo(() => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [packages, setPackages] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    const userData = userString ? JSON.parse(userString) : {};
    setPackages(userData?.package || null);
    setUserRole(userData?.role || null);
    setUserName(userData?.name || userData?.email || "ผู้ใช้");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = useCallback(async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setPackages(null);
    setUserRole(null);
    setIsLoggedIn(false);

    // โหลด toast เฉพาะตอนกด
    const { toast } = await import("react-toastify");
    toast.info("👋 ออกจากระบบเรียบร้อย!", { position: "top-right" });

    navigate("/login");
  }, [navigate]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-5 py-2 rounded-md flex items-center gap-x-2 transition-all duration-300 ${
      isActive ? "bg-blue-600 text-white shadow-md" : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
    }`;

  return (
    <header className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* โลโก้: อินไลน์ SVG เพื่อลด request และให้เบราว์เซอร์เรนเดอร์เร็ว */}
        <Link to="/" className="text-3xl font-bold text-blue-900 flex items-center gap-x-3">
         <img
            src="/logo.webp"
            alt="Guson Logo"
            className="h-10 w-10 object-contain transition-all duration-300 hover:rotate-6 hover:scale-110"
          />
          <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
            Guson
          </span>
        </Link>

        {/* เมนูเดสก์ท็อป */}
        <nav className="hidden md:flex space-x-4 items-center">
          {!isLoggedIn && (
            <NavLink to="/" className={linkClass}>
              <span>หน้าแรก</span>
            </NavLink>
          )}

          <NavLink to="/forum" className={linkClass}><span>คลับติวเตอร์</span></NavLink>
          <NavLink to="/blog" className={linkClass}><span>Blog</span></NavLink>
          <NavLink to="/บล็อก" className={linkClass}><span>บล็อก</span></NavLink>
          <NavLink to="/terms" className={linkClass}><span>นโยบายความเป็นส่วนตัว</span></NavLink>

          {isLoggedIn ? (
            <>
              {["standard", "premium", "business"].includes(packages ?? "") && userRole === "tutor" && (
                <NavLink to="/dashboard" className={linkClass}><span>แดชบอร์ด</span></NavLink>
              )}
              {packages === "basic" && userRole === "tutor" && (
                <NavLink to="/create-profile" className={linkClass}><span>สร้างโปรไฟล์</span></NavLink>
              )}
              {userRole === "admin" && (
                <NavLink to="/admin" className={linkClass}><span>จัดการการอนุมัติ</span></NavLink>
              )}
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition-all duration-300 focus:ring-2 focus:ring-red-300 shadow-md"
              >
                <span>ออกจากระบบ</span>
              </button>
              <NavLink to="/profile" className="px-5 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all">
                <span>{userName}</span>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/register" className={linkClass}><span>สมัครสร้างเว็บติวเตอร์</span></NavLink>
              <NavLink to="/login" className={linkClass}><span>เข้าสู่ระบบ</span></NavLink>
            </>
          )}
        </nav>

        {/* เมนูมือถือ: โหลดเมื่อจำเป็น */}

<Menu as="div" className="relative md:hidden">
  <Menu.Button aria-label="เปิดเมนู" className="text-gray-700 text-2xl">☰</Menu.Button>

  <Transition
    as={Fragment}
    enter="transition ease-out duration-200"
    enterFrom="transform opacity-0 scale-95"
    enterTo="transform opacity-100 scale-100"
    leave="transition ease-in duration-150"
    leaveFrom="transform opacity-100 scale-100"
    leaveTo="transform opacity-0 scale-95"
  >
    <Menu.Items className="absolute right-0 mt-3 w-64 bg-white shadow-xl rounded-lg py-4 px-4 text-gray-700 backdrop-blur-lg z-50 focus:outline-none">
      <Suspense
        fallback={
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
          </div>
        }
      >
        <MobileMenu
          isLoggedIn={isLoggedIn}
          packages={packages}
          userRole={userRole}
          userName={userName}
          onLogout={handleLogout}
          linkClass={linkClass}
        />
      </Suspense>
    </Menu.Items>
  </Transition>
</Menu>


      </div>
    </header>
  );
});

export default Header;
