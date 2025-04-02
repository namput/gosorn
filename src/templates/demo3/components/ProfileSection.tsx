// ProfileSection.tsx
import React, { useState } from "react";
import { TutorData } from "../types";

interface ProfileSectionProps {
  data: TutorData;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ data }) => {
  // State สำหรับเปิด/ปิด Modal รูปโปรไฟล์
  const [isImageModalOpen, setImageModalOpen] = useState(false);

  // กำหนด URL ของรูปโปรไฟล์และวิดีโอ (ถ้าไม่มีใน data ให้ใช้ค่า fallback)
  const profileImgUrl = data.profileImage || "https://via.placeholder.com/300x300";
  const introVideoUrl = data.introVideo || ""; // ถ้าไม่มีให้เป็น string ว่าง

  return (
    <section
      id="profile"
      className="relative pt-20 pb-32 bg-gradient-to-r from-blue-400 to-indigo-500 text-white"
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
          โปรไฟล์ติวเตอร์
        </h2>

        <div className="max-w-3xl mx-auto bg-white text-gray-800 rounded-xl shadow-xl p-8 md:flex">
          {/* รูปโปรไฟล์ - คลิกเพื่อเปิด Modal */}
          <div className="md:w-1/3 flex-shrink-0 flex items-center justify-center mb-6 md:mb-0">
            <img
              src={profileImgUrl}
              alt={data.name}
              className="w-40 h-40 rounded-full object-cover cursor-pointer ring-2 ring-indigo-400 hover:opacity-90 transition"
              onClick={() => setImageModalOpen(true)}
              title="คลิกเพื่อขยายรูป"
            />
          </div>

          {/* ข้อมูลโปรไฟล์ + วิดีโอ */}
          <div className="md:w-2/3 md:pl-6">
            <h3 className="text-2xl font-bold mb-3 text-indigo-600">
              {data.name}
            </h3>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">เบอร์โทร:</span> {data.phone || "N/A"}
            </p>
            <p className="text-gray-700 mb-3">
              <span className="font-semibold">ที่อยู่/Location:</span> {data.location || "-"}
            </p>
            {/* วิดีโอแนะนำตัว (ถ้ามี) */}
            {introVideoUrl ? (
              <div className="mt-4">
                <p className="font-semibold text-gray-800 mb-2">
                  วิดีโอแนะนำตัว:
                </p>
                <video
                  src={introVideoUrl}
                  controls
                  className="rounded-lg w-full max-h-[300px] border border-gray-300"
                >
                  ขออภัย เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอ.
                </video>
              </div>
            ) : (
              <p className="mt-4 text-gray-500 italic">
                ยังไม่มีวิดีโอแนะนำตัว
              </p>
            )}
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

      {/* Modal แสดงรูปโปรไฟล์แบบเต็มจอ (ถ้า isImageModalOpen = true) */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center">
          <div className="relative">
            <img
              src={profileImgUrl}
              alt={data.name}
              className="max-w-[90vw] max-h-[80vh] object-contain rounded shadow-lg"
            />
            <button
              onClick={() => setImageModalOpen(false)}
              className="absolute top-2 right-2 text-white bg-black/50 rounded-full p-2 hover:bg-black transition"
              title="ปิด"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 8.586l4.95-4.95 1.414 1.414L11.414 10l4.95 4.95-1.414 1.414L10 11.414l-4.95 4.95-1.414-1.414L8.586 10 3.636 5.05l1.414-1.414L10 8.586z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProfileSection;
