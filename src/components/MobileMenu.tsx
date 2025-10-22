// ./MobileMenu.tsx
import React from "react";
import { Menu } from "@headlessui/react";
import { NavLink } from "react-router-dom";

type Props = {
  isLoggedIn: boolean;
  packages: string | null;
  userRole: string | null;
  userName: string;
  onLogout: () => void;
  linkClass: (args: { isActive: boolean }) => string;
};

const MobileMenu: React.FC<Props> = ({
  isLoggedIn, packages, userRole, userName, onLogout, linkClass
}) => {
  const tutorHasDash = ["standard", "premium", "business"].includes(packages ?? "") && userRole === "tutor";
  const isTutorBasic = packages === "basic" && userRole === "tutor";

  // ✅ ไม่ต้องมี <Menu.Items> ที่นี่แล้ว — RETURN แค่รายการภายใน
  return (
    <>
      {!isLoggedIn && (
        <Menu.Item>
          {() => (
            <NavLink to="/" className={linkClass}>
              <span className="inline-flex items-center gap-2">
                <span aria-hidden>🏠</span><span>หน้าแรก</span>
              </span>
            </NavLink>
          )}
        </Menu.Item>
      )}

      <Menu.Item>
        {() => (
          <NavLink to="/forum" className={linkClass}>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden>📚</span><span>คลับติวเตอร์</span>
            </span>
          </NavLink>
        )}
      </Menu.Item>

      <Menu.Item>
        {() => (
          <NavLink to="/blog" className={linkClass}>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden>📰</span><span>Blog</span>
            </span>
          </NavLink>
        )}
      </Menu.Item>
            <Menu.Item>
        {() => (
          <NavLink to="/บล็อก" className={linkClass}>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden>📰</span><span>บล็อก</span>
            </span>
          </NavLink>
        )}
      </Menu.Item>

      <Menu.Item>
        {() => (
          <NavLink to="/terms" className={linkClass}>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden>🔐</span><span>นโยบายความเป็นส่วนตัว</span>
            </span>
          </NavLink>
        )}
      </Menu.Item>
      <Menu.Item>
        {() => (
          <NavLink to="/elegant-qa" className={linkClass}>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden>❓</span><span>Q&A</span>
            </span>
          </NavLink>
        )}
      </Menu.Item>

      {isLoggedIn ? (
        <>
          {tutorHasDash && (
            <Menu.Item>
              {() => (
                <NavLink to="/dashboard" className={linkClass}>
                  <span className="inline-flex items-center gap-2">
                    <span aria-hidden>📊</span><span>แดชบอร์ด</span>
                  </span>
                </NavLink>
              )}
            </Menu.Item>
          )}

          {isTutorBasic && (
            <Menu.Item>
              {() => (
                <NavLink to="/create-profile" className={linkClass}>
                  <span className="inline-flex items-center gap-2">
                    <span aria-hidden>🧩</span><span>สร้างโปรไฟล์</span>
                  </span>
                </NavLink>
              )}
            </Menu.Item>
          )}

          {userRole === "admin" && (
            <Menu.Item>
              {() => (
                <NavLink to="/admin" className={linkClass}>
                  <span className="inline-flex items-center gap-2">
                    <span aria-hidden>🛡️</span><span>จัดการการอนุมัติ</span>
                  </span>
                </NavLink>
              )}
            </Menu.Item>
          )}

          <Menu.Item>
            {() => (
              <button
                onClick={onLogout}
                className="w-full text-left text-lg bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all duration-300 focus:ring-2 focus:ring-red-300 shadow-md"
              >
                <span className="inline-flex items-center gap-2">
                  <span aria-hidden>🚪</span><span>ออกจากระบบ</span>
                </span>
              </button>
            )}
          </Menu.Item>

          <Menu.Item>
            {() => (
              <NavLink to="/profile" className="w-full text-lg px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-all">
                <span className="inline-flex items-center gap-2">
                  <span aria-hidden>👤</span><span>{userName}</span>
                </span>
              </NavLink>
            )}
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item>
            {() => (
              <NavLink to="/register" className={linkClass}>
                <span className="inline-flex items-center gap-2">
                  <span aria-hidden>➕</span><span>สมัครสร้างเว็บติวเตอร์</span>
                </span>
              </NavLink>
            )}
          </Menu.Item>

          <Menu.Item>
            {() => (
              <NavLink to="/login" className={linkClass}>
                <span className="inline-flex items-center gap-2">
                  <span aria-hidden>🔑</span><span>เข้าสู่ระบบ</span>
                </span>
              </NavLink>
            )}
          </Menu.Item>
        </>
      )}
    </>
  );
};

export default MobileMenu;
