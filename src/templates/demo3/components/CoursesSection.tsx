// CoursesSection.tsx
import React from "react";
import { TutorData } from "../types";

interface CoursesSectionProps {
  data: TutorData;
}

const CoursesSection: React.FC<CoursesSectionProps> = ({ data }) => {
  const courses = data.courses || [];

  return (
    <section
      id="courses"
      className="relative pt-20 pb-32 bg-gradient-to-r from-orange-400 via-pink-400 to-red-400 text-white"
    >
      {/* Wave Shape ด้านบน (กลับหัวด้วย rotate-180) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[80px]"
          fill="#fff"
          preserveAspectRatio="none"
          viewBox="0 0 1600 80"
        >
          <path d="M0,32L80,53.3C160,75,320,117,480,128C640,139,800,117,960,96C1120,75,1280,53,1360,42.7L1440,32L1440,80L1360,80C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80L0,80Z"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center drop-shadow-lg mb-10">
          คอร์สที่เปิดสอน
        </h2>

        {courses.length === 0 ? (
          <p className="text-center text-xl">ยังไม่มีคอร์ส</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, idx) => (
              <div
                key={idx}
                className="bg-white text-gray-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transition flex flex-col"
              >
                {/* ไอคอนแสดง “คอร์ส” อาจใช้รูปหนังสือ/กระดาน */}
                <div className="flex items-center mb-4 space-x-3">
                  <svg
                    className="w-10 h-10 text-pink-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {/* ตัวอย่าง Icon หนังสือ */}
                    <path d="M19 2H10c-1.654 0-3 1.346-3 3v1H5c-1.654 0-3 1.346-3 3v10a1 1 0 001 1h14a1 1 0 001-1V6c0-2.206-1.794-4-4-4zm-9 2h5c1.103 0 2 .897 2 2v10H6V8c0-.552.449-1 1-1h3V5c0-.552.449-1 1-1z"></path>
                  </svg>
                  <h3 className="text-2xl font-semibold">{course.name}</h3>
                </div>

                <p className="mb-2 text-gray-600">
                  <span className="font-semibold">รายละเอียด:</span> {course.details}
                </p>
                <p className="mb-2 text-gray-600">
                  <span className="font-semibold">ระยะเวลา:</span> {course.duration}
                </p>
                <p className="mt-auto text-lg font-bold text-pink-600">
                  ราคา: {course.price} บาท
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Wave Shape ด้านล่าง */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[80px]"
          fill="#fff"
          preserveAspectRatio="none"
          viewBox="0 0 1600 80"
        >
          <path d="M0,32L80,53.3C160,75,320,117,480,128C640,139,800,117,960,96C1120,75,1280,53,1360,42.7L1440,32L1440,80L1360,80C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80L0,80Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default CoursesSection;
