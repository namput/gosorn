import { useState } from "react";

interface Review {
  id: number;
  reviewer: string;
  rating: number;
  comment: string;
  date: string;
  isVisible: boolean;
}

const Reviews = ({ darkMode }: { darkMode: boolean }) => {
  const [reviews, setReviews] = useState<Review[]>([
    { id: 1, reviewer: "น้องนโม", rating: 5, comment: "สอนดี เข้าใจง่ายมาก ๆ!", date: "2025-04-26", isVisible: true },
    { id: 2, reviewer: "น้องพิมพ์", rating: 4.5, comment: "สอนดี แต่อยากได้แบบฝึกหัดเพิ่มอีกนิด", date: "2025-04-25", isVisible: true },
    { id: 3, reviewer: "น้องต้น", rating: 4.0, comment: "คุ้มค่ากับเงินที่จ่ายมาก", date: "2025-04-24", isVisible: true },
  ]);

  const handleToggleVisibility = (id: number) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, isVisible: !r.isVisible } : r
      )
    );
  };

  const averageRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0";

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<span key={i}>★</span>);
      } else if (rating >= i - 0.5) {
        stars.push(<span key={i}>⯨</span>); // ดาวครึ่ง
      } else {
        stars.push(<span key={i}>☆</span>);
      }
    }
    return stars;
  };

  return (
    <div className={`p-6 space-y-8 min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"} transition-all`}>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">🌟 รีวิวคอร์สเรียน</h2>
          <div className="text-gray-500 dark:text-gray-400">
            คะแนนเฉลี่ย: {averageRating} ⭐ ({reviews.length} รีวิว)
          </div>
        </div>
      </div>

      {/* Review List */}
      <div className="grid gap-6">
        {reviews.length > 0 ? (
          reviews.map((r) => (
            <div
              key={r.id}
              className={`p-6 rounded-2xl shadow-md transition-all space-y-4 ${
                r.isVisible
                  ? "bg-white dark:bg-gray-800 hover:shadow-lg"
                  : "bg-gray-200 dark:bg-gray-700 opacity-50"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-lg">{r.reviewer}</div>
                  <div className="flex items-center gap-1 text-yellow-400 text-sm mt-1">
                    {renderStars(r.rating)}
                  </div>
                </div>
                <div className="text-xs text-gray-400">{r.date}</div>
              </div>

              <div className="text-sm text-gray-700 dark:text-gray-300">
                {r.comment}
              </div>

              <div className="text-right">
                <button
                  onClick={() => handleToggleVisibility(r.id)}
                  className={`px-4 py-1 rounded-lg font-semibold text-sm ${
                    r.isVisible
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                >
                  {r.isVisible ? "ซ่อนรีวิว" : "แสดงรีวิว"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400">ยังไม่มีรีวิว</div>
        )}
      </div>

    </div>
  );
};

export default Reviews;
