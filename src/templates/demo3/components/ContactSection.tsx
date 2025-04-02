// ContactSection.tsx
import React from "react";
import { TutorData } from "../types";

interface ContactSectionProps {
  data: TutorData;
}

const ContactSection: React.FC<ContactSectionProps> = ({ data }) => {
  // สมมุติว่าใน TutorData มี: phone, email, lineId, location
  // หาก field ไหนไม่มี ให้ fallback เป็น "ไม่ระบุ" หรือปรับตามชอบ
  const phone = data.phone || "ไม่ระบุ";
  const email = data.email || "ไม่ระบุ";
  // ลองแคส data เป็น any ถ้ายังไม่มี lineId ใน types
  const lineId = (data as any).lineId || "ไม่ระบุ";
  const location = data.location || "ไม่ระบุ";

  return (
    <section
      id="contact"
      className="relative pt-20 pb-32 bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500 text-white"
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
        {/* หัวข้อหลัก */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6 drop-shadow-lg">
          ติดต่อเรา
        </h2>
        <p className="text-center text-lg max-w-2xl mx-auto mb-12 drop-shadow-sm">
          สนใจเรียนหรือสอบถามเพิ่มเติม ติดต่อได้ตามช่องทางด้านล่าง
        </p>

        {/* การ์ดข้อมูลติดต่อ */}
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl p-8 text-gray-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* โทรศัพท์ */}
            <div className="flex items-center space-x-3">
              {/* ไอคอนโทรศัพท์ (inline SVG) */}
              <svg
                className="w-8 h-8 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 16.92v3a2.07 2.07 0 0 1-2.27 2 20.5 20.5 0 0 1-8.94-3.09 20.29 20.29 0 0 1-6-6A20.5 20.5 0 0 1 2 4.27 2.07 2.07 0 0 1 4 2h3a2 2 0 0 1 2 1.72 13.35 13.35 0 0 0 .56 2.74 2 2 0 0 1-.45 2l-1.27 1.28a16 16 0 0 0 6 6l1.28-1.27a2 2 0 0 1 2-.45 13.35 13.35 0 0 0 2.74.56A2 2 0 0 1 22 14.92z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold">โทรศัพท์</h3>
                <p>{phone}</p>
              </div>
            </div>

            {/* อีเมล */}
            <div className="flex items-center space-x-3">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M2 4c0-1.1.89-2 2-2h16a2 2 0 0 1 2 2v0 16a2 2 0 0 1-2 2H4c-1.11 0-2-.9-2-2V4zm2 0l8 5 8-5H4zm16 16V8l-8 5-8-5v12h16z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold">อีเมล</h3>
                <p>{email}</p>
              </div>
            </div>

            {/* LINE ID */}
            <div className="flex items-center space-x-3">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                {/* ตัวอย่าง path ICON เรียบง่าย (line icon แบบ placeholder) */}
                <path d="M20 2H4C2.9 2 2 .9 2 2v12c0 1.1.9 2 2 2h2v3l3-3h11c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold">LINE ID</h3>
                <p>{lineId}</p>
              </div>
            </div>

            {/* ที่อยู่ */}
            <div className="flex items-center space-x-3">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                {/* Icon location */}
                <path d="M12 2C8.14 2 5 5.16 5 9c0 5.25 5.74 11.55 6.04 11.88.28.3.75.3 1.04 0 .3-.33 6.02-6.63 6.02-11.88 0-3.84-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold">ที่อยู่</h3>
                <p>{location}</p>
              </div>
            </div>
          </div>
        </div>
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

export default ContactSection;
