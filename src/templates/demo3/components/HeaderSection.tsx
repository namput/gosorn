// HeaderSection.tsx
import React from "react";

const HeaderSection: React.FC = () => {
  return (
    <header className="relative z-50">
      {/* แถบเฮดเดอร์หลัก */}
      <div className="sticky top-0 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg text-white px-6 py-4 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="text-xl font-bold drop-shadow-lg">
          My Tutor Platform
        </div>

        {/* Nav Menu */}
        <nav>
          <ul className="hidden md:flex space-x-6 text-base font-medium">
            <li>
              <a href="#hero" className="hover:text-yellow-300 transition">
                หน้าแรก
              </a>
            </li>
            <li>
              <a href="#profile" className="hover:text-yellow-300 transition">
                โปรไฟล์
              </a>
            </li>
            <li>
              <a href="#courses" className="hover:text-yellow-300 transition">
                คอร์ส
              </a>
            </li>
            <li>
              <a href="#calendar" className="hover:text-yellow-300 transition">
                ตารางสอน
              </a>
            </li>
            <li>
              <a href="#reviews" className="hover:text-yellow-300 transition">
                รีวิว
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-yellow-300 transition">
                ติดต่อ
              </a>
            </li>
          </ul>
        </nav>
      </div>

    </header>
  );
};

export default HeaderSection;
