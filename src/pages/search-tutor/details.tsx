import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const ageGroups = ["ประถม", "มัธยม", "มหาวิทยาลัย", "คนทำงาน"];
const availableTimes = ["จันทร์เย็น", "เสาร์เช้า", "อาทิตย์บ่าย"];
const urgencyOptions = ["ทันที", "เร็ว ๆ นี้", "ยังไม่แน่ใจ"];

const SearchDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { subject } = location.state || {};

  const [age, setAge] = useState("");
  const [times, setTimes] = useState<string[]>([]);
  const [startDate, setStartDate] = useState("");
  const [urgency, setUrgency] = useState("");

  const toggleTime = (time: string) => {
    setTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const handleSearch = () => {
    navigate("/search-tutor/match", {
      state: { subject, age, times, startDate, urgency },
    });
  };

  return (
    <div className="min-h-screen p-6 space-y-10 bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        บอกข้อมูลเพิ่มเติม
      </h1>

      <div className="max-w-3xl mx-auto space-y-8">
        {/* ช่วงวัย */}
        <div className="space-y-2">
          <h2 className="font-semibold text-gray-700">ช่วงวัยของคุณ</h2>
          <div className="flex flex-wrap gap-3">
            {ageGroups.map((a) => (
              <button
                key={a}
                onClick={() => setAge(a)}
                className={`px-4 py-2 rounded-full ${
                  age === a ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* วันเวลาสะดวก */}
        <div className="space-y-2">
          <h2 className="font-semibold text-gray-700">เวลาที่สะดวก</h2>
          <div className="flex flex-wrap gap-3">
            {availableTimes.map((time) => (
              <button
                key={time}
                onClick={() => toggleTime(time)}
                className={`px-4 py-2 rounded-full ${
                  times.includes(time) ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* วันเริ่มเรียน */}
        <div className="space-y-2">
          <h2 className="font-semibold text-gray-700">วันเริ่มเรียน</h2>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-200 text-gray-700 outline-none"
          />
        </div>

        {/* ความเร่งด่วน */}
        <div className="space-y-2">
          <h2 className="font-semibold text-gray-700">ต้องการเริ่มเรียนเมื่อใด?</h2>
          <div className="flex flex-wrap gap-3">
            {urgencyOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setUrgency(opt)}
                className={`px-4 py-2 rounded-full ${
                  urgency === opt ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Search Button */}
        <div className="text-center">
          <button
            onClick={handleSearch}
            disabled={!age || !urgency}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all disabled:opacity-50"
          >
            ค้นหาติวเตอร์ที่เหมาะสมที่สุด
          </button>
        </div>

      </div>
    </div>
  );
};

export default SearchDetailsPage;
