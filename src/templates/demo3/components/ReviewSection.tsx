// ReviewSection.tsx
import React, { useState } from "react";
import { TutorWebsite } from "../../../Subdomain";

interface ReviewSectionProps {
  data: TutorWebsite;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ data }) => {
  // สมมุติว่าใน data มี reviews เป็น array
  // ตัวอย่าง structure: [ { studentName, comment, rating }, ... ]
  const reviews: any[] = (data as any).reviews || [];

  // State สำหรับฟอร์ม (ให้ดาวและคอมเมนต์)
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  // Handler เมื่อกดปุ่มส่งรีวิว
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // ทำการส่งรีวิวไปยัง Back-end (API) หรือเก็บ state
    console.log("Review Submitted:", { rating, comment });
    // ล้างฟอร์มหลังส่งสำเร็จ
    setRating(0);
    setComment("");
    alert("ขอบคุณสำหรับรีวิว!");
  };

  // ฟังก์ชันเปลี่ยนดาวเมื่อคลิก
  const handleStarClick = (starValue: number) => {
    setRating(starValue);
  };

  // สร้าง array ไว้ render ดาว 5 ดวง
  const starElements = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <section id="reviews" className="relative pt-20 pb-32 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white">
      {/* Wave Shape ด้านบน */}
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
          รีวิวจากนักเรียน
        </h2>

        {/* แสดงรีวิว */}
        {reviews.length === 0 ? (
          <p className="text-center text-xl mb-10">ยังไม่มีรีวิว</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {reviews.map((rev, idx) => (
              <div key={idx} className="bg-white text-gray-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transition relative">
                {/* ดาว rating */}
                <div className="mb-2 flex">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-6 h-6 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.2c.969 0 1.371 1.24.588 1.81l-3.396 2.462a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.362 2.45c-.784.57-1.838-.197-1.54-1.118l1.287-3.967a1 1 0 00-.364-1.118L3.625 9.394c-.783-.57-.38-1.81.589-1.81h4.2a1 1 0 00.95-.69l1.285-3.967z" />
                    </svg>
                  ))}
                  {/* ถ้าต้องการดาวที่เหลือเป็นสีเทา/ว่างเปล่า ก็ทำได้เช่นกัน */}
                </div>

                <p className="text-lg font-semibold mb-1">“{rev.comment}”</p>
                <p className="text-sm text-gray-500">
                  - {rev.studentName} (ให้คะแนน {rev.rating}/5)
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ฟอร์มเพิ่มรีวิว */}
        <div className="max-w-xl mx-auto bg-white text-gray-800 p-8 rounded-xl shadow-xl">
          <h3 className="text-2xl font-bold mb-4 text-center">ให้รีวิวติวเตอร์</h3>
          <form onSubmit={handleSubmitReview}>
            {/* เลือกดาว (rating) */}
            <div className="mb-6 text-center">
              <p className="mb-2 font-semibold">ให้คะแนน:</p>
              <div className="flex justify-center">
                {starElements.map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(star)}
                    className="focus:outline-none"
                  >
                    <svg
                      className={`w-8 h-8 mx-1 ${
                        star <= rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.2c.969 0 1.371 1.24.588 1.81l-3.396 2.462a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.362 2.45c-.784.57-1.838-.197-1.54-1.118l1.287-3.967a1 1 0 00-.364-1.118L3.625 9.394c-.783-.57-.38-1.81.589-1.81h4.2a1 1 0 00.95-.69l1.285-3.967z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* คอมเมนต์ */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">ความเห็น</label>
              <textarea
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                placeholder="บอกความรู้สึกเกี่ยวกับติวเตอร์"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600 transition"
            >
              ส่งรีวิว
            </button>
          </form>
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

export default ReviewSection;
