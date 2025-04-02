// HeroSection.tsx
import React from "react";
import { TutorData } from "../types";

interface HeroSectionProps {
  data: TutorData;
}

const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  // ถ้าไม่มี bio ใน data ให้ fallback เป็นข้อความสั้น ๆ
  const bioText = data.bio
    ? `"${data.bio}"`
    : `"ร่วมเดินทางสู่โลกแห่งความรู้ไปกับเรา!"`;

  return (
    <section
      id="hero"
      className="relative w-full h-screen bg-gradient-to-br from-purple-700 via-blue-600 to-indigo-800 flex flex-col items-center justify-center text-white overflow-hidden"
    >
      {/* Wave Shape ด้านล่าง */}
      <div className="absolute bottom-0 left-0 w-full leading-[0]">
        <svg
          className="block w-[calc(100%+1.3px)] h-[120px]"
          viewBox="0 0 1600 120"
          preserveAspectRatio="none"
          fill="#fff"
        >
          <path d="M0,70L80,90C160,110,320,150,480,150C640,150,800,110,960,90C1120,70,1280,70,1360,70L1440,70L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>

      {/* Overlay ทับซ้อนเพื่อให้ตัวอักษรอ่านง่ายขึ้น (ถ้ามีภาพพื้นหลัง) */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* เนื้อหา Hero */}
      <div className="relative z-10 text-center px-4 max-w-3xl">
        {/* ชื่อติวเตอร์ */}
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg leading-tight animate-fadeInUp">
          ติวเตอร์ <span className="text-yellow-300">{data.name}</span>
        </h1>

        {/* ข้อความ Bio หรือข้อความสั้น ๆ สร้างแรงบันดาลใจ */}
        <p className="text-xl md:text-2xl mb-6 font-medium drop-shadow-sm animate-fadeInUp animation-delay-200">
          {bioText}
        </p>

        {/* ข้อความเพิ่มเติม เน้นคุณค่าและเป้าหมาย */}
        <p className="text-md md:text-lg mb-8 text-gray-100 leading-relaxed animate-fadeInUp animation-delay-300">
          ยกระดับทักษะของคุณอย่างมั่นใจ ไม่ว่าจะเป็นการเขียนโค้ด พัฒนาเว็บไซต์ 
          หรือเตรียมสอบเข้ามหาวิทยาลัย เราพร้อมเป็นผู้ช่วยให้คุณบรรลุเป้าหมาย 
          ด้วยเทคนิคการสอนที่เข้าใจง่ายและเป็นกันเอง
        </p>

        {/* ปุ่ม CTA */}
        <div className="flex flex-col sm:flex-row sm:justify-center gap-4 animate-fadeInUp animation-delay-400">
          <a
            href="#courses"
            className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition transform hover:-translate-y-1"
          >
            ดูคอร์สทั้งหมด
          </a>
          <a
            href="#contact"
            className="bg-white/10 border border-white/30 px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition transform hover:-translate-y-1"
          >
            ติดต่อเรา
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
