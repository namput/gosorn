// CalendarSection.tsx
import React from "react";
import { TutorWebsite } from "../../../Subdomain";

interface CalendarSectionProps {
  data: TutorWebsite;
}

const CalendarSection: React.FC<CalendarSectionProps> = ({ data }) => {
  const schedule = data.schedule || [];

  return (
    <section
      id="calendar"
      className="relative pt-20 pb-32 bg-gradient-to-r from-green-400 to-teal-500 text-white"
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
          ตารางสอน
        </h2>

        {schedule.length === 0 ? (
          <p className="text-center text-xl">ยังไม่มีตารางสอน</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schedule.map((item, idx) => (
              <div
                key={idx}
                className="bg-white text-gray-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transition flex flex-col space-y-3"
              >
                {/* ส่วนแสดง "วัน" */}
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {/* Icon Calendar ตัวอย่าง */}
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM5 9h14v10H5V9z" />
                  </svg>
                  <p className="text-lg font-semibold">
                    <span className="text-gray-500">วัน:</span> {item.day}
                  </p>
                </div>

                {/* ส่วนแสดง "เวลา" */}
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-8 h-8 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {/* Icon Clock ตัวอย่าง */}
                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 10.59V7h-2v6l5.26 3.15 1-1.73L13 12.59z" />
                  </svg>
                  <p className="text-lg font-semibold">
                    <span className="text-gray-500">เวลา:</span> {item.time}
                  </p>
                </div>
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

export default CalendarSection;
