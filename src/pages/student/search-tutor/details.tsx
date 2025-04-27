import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const StudentDetailsForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const subject = (location.state as any)?.subject || "";

  const [studentName, setStudentName] = useState("");
  const [age, setAge] = useState("");
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [preferredTime, setPreferredTime] = useState("");

  const daysOfWeek = ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"];

  const handleToggleDay = (day: string) => {
    setAvailableDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleNext = () => {
    if (studentName && age && availableDays.length > 0 && preferredTime) {
      navigate("/student/search-tutor/match", {
        state: { subject, studentName, age, availableDays, preferredTime },
      });
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-yellow-50 to-white space-y-10">
      {/* Header */}
      <section className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">📋 ข้อมูลของคุณ</h1>
        <p className="text-gray-500 text-lg">ช่วยเราหาติวเตอร์ที่เหมาะกับคุณที่สุด</p>
      </section>

      {/* Form */}
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <div className="space-y-3">
          <label className="text-gray-700 font-semibold">ชื่อของคุณ</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="ชื่อนักเรียน"
            className="w-full p-4 rounded-lg bg-gray-100 focus:outline-none"
            required
          />
        </div>

        <div className="space-y-3">
          <label className="text-gray-700 font-semibold">อายุ</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="อายุ (ปี)"
            className="w-full p-4 rounded-lg bg-gray-100 focus:outline-none"
            required
          />
        </div>

        <div className="space-y-3">
          <label className="text-gray-700 font-semibold">วันสะดวกเรียน</label>
          <div className="flex flex-wrap gap-2">
            {daysOfWeek.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => handleToggleDay(day)}
                className={`px-4 py-2 rounded-full ${
                  availableDays.includes(day)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                } transition-all`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-gray-700 font-semibold">เวลาที่สะดวก</label>
          <select
            value={preferredTime}
            onChange={(e) => setPreferredTime(e.target.value)}
            className="w-full p-4 rounded-lg bg-gray-100 focus:outline-none"
            required
          >
            <option value="">เลือกช่วงเวลา</option>
            <option value="เช้า (08:00-12:00)">เช้า (08:00-12:00)</option>
            <option value="บ่าย (13:00-17:00)">บ่าย (13:00-17:00)</option>
            <option value="เย็น (18:00-21:00)">เย็น (18:00-21:00)</option>
          </select>
        </div>

        {/* Next Button */}
        <div className="text-center pt-6">
          <button
            onClick={handleNext}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg"
          >
            ถัดไป ➔ ดูผลการแมทช์
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsForm;
